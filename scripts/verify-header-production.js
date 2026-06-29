const puppeteer = require('puppeteer');
const fs = require('fs');
(async ()=>{
  const url = process.env.URL || 'https://tod-project-theodundesign-1816-theodundesign-1816s-projects.vercel.app/';
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const viewports = [
    {name:'desktop', width:1440, height:900},
    {name:'tablet', width:820, height:900},
    {name:'mobile', width:375, height:812}
  ];

  const report = {url, runs:[]};

  for (const vp of viewports) {
    await page.setViewport({width: vp.width, height: vp.height});
    const logs = [];
    const requests = [];
    const responses = [];
    const failedRequests = [];

    page.on('console', msg => {
      try { logs.push({type: msg.type(), text: msg.text()}); } catch(e){}
    });
    page.on('request', req => { requests.push({url: req.url(), method: req.method(), resourceType: req.resourceType()}); });
    page.on('requestfailed', req => { failedRequests.push({url: req.url(), err: req.failure()?.errorText}); });
    page.on('response', async res => {
      try {
        responses.push({url: res.url(), status: res.status(), ok: res.ok(), resourceType: res.request().resourceType()});
      } catch(e){}
    });

    // Inject PerformanceObserver to capture layout-shift entries
    await page.evaluateOnNewDocument(() => {
      window.__layoutShiftEntries = [];
      try {
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.__layoutShiftEntries.push(entry);
        }).observe({type: 'layout-shift', buffered: true});
      } catch(e){}
    });

    const resp = await page.goto(url, {waitUntil: 'networkidle2', timeout: 45000});
    await new Promise(res => setTimeout(res, 700)); // allow any late console messages

    // DOM checks
    const dom = await page.evaluate(() => {
      const header = document.querySelector('header.header') || document.querySelector('header');
      const btns = Array.from(document.querySelectorAll('.icon-button, .menu-toggle, a.btn-secondary, a.btn-primary'));
      const headerRect = header ? header.getBoundingClientRect() : null;
      const viewportWidth = window.innerWidth;
      const body = document.body; const html = document.documentElement;
      const scrollWidth = Math.max(body.scrollWidth, html.scrollWidth);
      const noHorizontalScroll = scrollWidth <= viewportWidth + 1;
      // overlapping check among header children
      const headerChildren = header ? Array.from(header.querySelectorAll('*')) : [];
      const overlaps = [];
      const rects = headerChildren.map((el, i) => ({i, w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height, l: el.getBoundingClientRect().left, r: el.getBoundingClientRect().right, t: el.getBoundingClientRect().top, b: el.getBoundingClientRect().bottom, tag: el.tagName, cls: el.className}));
      for (let i=0;i<rects.length;i++){
        for (let j=i+1;j<rects.length;j++){
          const a = rects[i], b = rects[j];
          const horiz = !(a.r <= b.l || b.r <= a.l);
          const vert = !(a.b <= b.t || b.b <= a.t);
          if (horiz && vert && a.w>0 && b.w>0) overlaps.push({a:{tag:a.tag,cls:a.cls}, b:{tag:b.tag,cls:b.cls}});
        }
      }
      // clipped text detection: elements whose scrollWidth > clientWidth
      const clipped = Array.from(document.querySelectorAll('header *')).filter(el => el.scrollWidth > el.clientWidth + 2).map(el => ({tag: el.tagName, cls: el.className, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth}));
      const buttons = btns.map(b=>{const r=b.getBoundingClientRect(); return {text: b.innerText, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left), r: Math.round(r.right)} });
      return {noHorizontalScroll, overlaps, clipped, headerRect, buttons, viewportWidth};
    });

    // retrieve layout-shift entries captured
    const layoutShiftEntries = await page.evaluate(() => (window.__layoutShiftEntries || []).map(e=>({value: e.value, sources: e.sources ? e.sources.length : 0})) );

    // collect errors/warnings and failed responses
    const consoleErrors = logs.filter(l => ['error','warning'].includes(l.type));
    const hydrationWarnings = logs.filter(l => l.text && /hydration|hydrate|Warning: Text content did not match|did not match/.test(l.text));
    const badResponses = responses.filter(r => r.status >= 400);

    report.runs.push({viewport: vp.name, width: vp.width, status: resp ? resp.status() : null, dom, consoleErrors, hydrationWarnings, badResponses, failedRequests, layoutShiftEntries});

    // clear listeners
    page.removeAllListeners('console'); page.removeAllListeners('request'); page.removeAllListeners('response'); page.removeAllListeners('requestfailed');
  }

  const out = JSON.stringify(report, null, 2);
  console.log(out);
  try { fs.writeFileSync('scripts/verify-header-production.report.json', out); } catch(e){}
  await browser.close();
})();
