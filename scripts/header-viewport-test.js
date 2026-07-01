const puppeteer = require('puppeteer');
const fs = require('fs');
(async ()=>{
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const url = process.env.URL || 'http://127.0.0.1:4001/';
  const viewports = [320,375,390,414,768,820,1024,1280,1440];
  const results = [];
  for (const width of viewports) {
    await page.setViewport({width, height: 900});
    await page.goto(url, {waitUntil:'networkidle0', timeout: 30000});
    const data = await page.evaluate(() => {
      const header = document.querySelector('header.header');
      const logo = document.querySelector('.logo-link');
      const searchBtn = document.querySelector('.search-icon-button');
      const loginBtn = document.querySelector('a.btn-secondary');
      const registerBtn = document.querySelector('a.btn-primary');
      const menuToggle = document.querySelector('.menu-toggle');
      const btns = Array.from(document.querySelectorAll('.icon-button, .menu-toggle, a.btn-secondary, a.btn-primary'));
      const body = document.body;
      const html = document.documentElement;
      const scrollWidth = Math.max(body.scrollWidth, html.scrollWidth);
      const viewportWidth = window.innerWidth;
      const headerRect = header?.getBoundingClientRect();
      const logoRect = logo?.getBoundingClientRect();
      const searchRect = searchBtn?.getBoundingClientRect();
      const loginRect = loginBtn?.getBoundingClientRect();
      const registerRect = registerBtn?.getBoundingClientRect();
      const menuRect = menuToggle?.getBoundingClientRect();
      const rightRect = document.querySelector('.header-right')?.getBoundingClientRect();
      const leftRect = document.querySelector('.header-left')?.getBoundingClientRect();
      const headerStyle = header ? window.getComputedStyle(header) : null;
      const headerPaddingLeft = headerStyle ? parseFloat(headerStyle.paddingLeft) : null;
      const headerPaddingRight = headerStyle ? parseFloat(headerStyle.paddingRight) : null;
      const equalPadding = headerPaddingLeft === headerPaddingRight;
      const buttons = btns.map(btn => {
        const rect = btn.getBoundingClientRect();
        return {selector: btn.className, width: Math.round(rect.width), height: Math.round(rect.height), minSize: Math.round(rect.width) >= 44 && Math.round(rect.height) >= 44, x: Math.round(rect.x), right: Math.round(rect.right)};
      });
      const fullWidth = headerRect ? Math.abs(headerRect.left) < 2 && Math.abs(headerRect.width - viewportWidth) <= 12 : false;
      const logoAlignedLeft = logoRect && headerRect ? Math.abs(logoRect.left - (headerRect.left + headerPaddingLeft)) <= 6 : false;
      const noHorizontalScroll = scrollWidth <= viewportWidth + 1;
      const anyClipped = [searchRect, loginRect, registerRect, menuRect].some(r => !r || r.right > viewportWidth + 1 || r.left < -1);
      const wrappingElements = Array.from(document.querySelectorAll('.nav-link, .logo-title, .logo-tagline, a.btn-secondary, a.btn-primary')).map(el => {
        const cs = window.getComputedStyle(el);
        const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
        return {selector: el.className, clientHeight: Math.round(el.clientHeight), lineHeight: Math.round(lineHeight), wraps: el.clientHeight > lineHeight * 1.4};
      }).filter(x => x.wraps);
      return {viewportWidth, fullWidth, equalPadding, logoAlignedLeft, noHorizontalScroll, anyClipped, headerPaddingLeft, headerPaddingRight, buttons, wrappingElements};
    });
    results.push({width, data});
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
