const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const requests = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('accounts:sendOobCode')) {
      requests.push({ url, method: request.method(), postData: request.postData(), headers: request.headers() });
    }
  });
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('accounts:sendOobCode')) {
      const status = response.status();
      let text = '';
      try {
        text = await response.text();
      } catch (err) {
        text = `unable to read body: ${err.message}`;
      }
      requests.push({ url, status, text });
    }
  });
  page.on('requestfailed', (request) => {
    const url = request.url();
    if (url.includes('accounts:sendOobCode')) {
      requests.push({ url, failed: true, failure: request.failure() });
    }
  });

  const targetUrl = 'http://localhost:3000/forgot';
  console.log('Opening', targetUrl);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  await page.type('input[type=email]', 'debug-reset@example.com');
  await page.click('button.btn-primary');
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const content = await page.evaluate(() => document.body.innerText);

  console.log('Captured requests:', JSON.stringify(requests, null, 2));
  console.log('Page text after submit:', content);
  await browser.close();
})();
