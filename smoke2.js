const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const out = (p) => console.log('[SMOKE]', p);
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', (msg) => out('PAGE_CONSOLE ' + msg.text()));
  page.on('pageerror', (err) => out('PAGE_ERROR ' + err.toString()));
  page.on('error', (err) => out('BROWSER_ERROR ' + err.toString()));

  const url = 'http://127.0.0.1:8000/';
  out('navigating to ' + url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  await page.waitForSelector('body');

  const wait = async (ms) => new Promise((res) => setTimeout(res, ms));

  const tests = [
    { name: 'Open Category Selector', sel: '[data-open-modal="categorySelectionModal"]' },
    { name: 'Open Training Preview', sel: '[data-open-modal="trainingPreviewModal"]' },
    { name: 'Open Contact CTA', sel: '[data-open-modal="contact-cta-modal"]' },
    { name: 'Click WhatsApp FAB', sel: 'a[href*="wa.me"]' },
  ];

  const results = [];

  for (const t of tests) {
    try {
      out('trying: ' + t.name + ' -> ' + t.sel);
      const el = await page.$(t.sel);
      if (!el) {
        out('MISSING SELECTOR ' + t.sel);
        results.push({ name: t.name, ok: false, reason: 'missing-selector' });
        continue;
      }
      await el.click().catch(() => {});
      await wait(600);
      const screenshotPath = `smoke-${t.name.replace(/[^a-z0-9]/ig, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      out('screenshot saved ' + screenshotPath);
      results.push({ name: t.name, ok: true, screenshot: screenshotPath });
    } catch (err) {
      out('ERROR during ' + t.name + ' -> ' + err.toString());
      results.push({ name: t.name, ok: false, reason: err.toString() });
    }
  }

  const modalIds = ['categorySelectionModal', 'trainingPreviewModal', 'contact-cta-modal', 'serviceModal'];
  for (const id of modalIds) {
    const exists = (await page.$(`#${id}`)) !== null;
    out(`modal ${id} exists: ${exists}`);
  }

  fs.writeFileSync('smoke-results.json', JSON.stringify({ url, results }, null, 2));
  out('wrote smoke-results.json');
  await browser.close();
  out('done');
})();
