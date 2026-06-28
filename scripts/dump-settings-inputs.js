const puppeteer = require('puppeteer');
const base = process.env.BASE_URL || 'http://localhost:3002';
(async ()=>{
  const browser = await puppeteer.launch({ headless: false, slowMo: 30, args:['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(base + '/dashboard/settings', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  const inputs = await page.evaluate(()=> Array.from(document.querySelectorAll('input')).map(i=>({name:i.name,type:i.type,outerHTML:i.outerHTML})).slice(0,200));
  console.log('inputs:', JSON.stringify(inputs, null, 2));
  await browser.close();
})();
