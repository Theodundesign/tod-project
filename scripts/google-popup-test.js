const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 30, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.auth-card button.btn-ghost', { timeout: 30000 });
  const targetPromise = new Promise((resolve) => {
    browser.once('targetcreated', resolve)
    setTimeout(() => resolve(null), 10000)
  })
  await page.click('.auth-card button.btn-ghost')
  const popupTarget = await targetPromise
  console.log('Popup opened:', !!popupTarget)
  if (popupTarget) console.log('Popup URL:', popupTarget.url())
  await browser.close();
})();
