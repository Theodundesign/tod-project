const puppeteer = require('puppeteer');
(async()=>{
  const url='https://tod-project-theodundesign-1816-theodundesign-1816s-projects.vercel.app/';
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  for(const vp of [{name:'tablet',width:820,height:900},{name:'mobile',width:375,height:812}]){
    await page.setViewport(vp);
    await page.goto(url,{waitUntil:'networkidle2',timeout:45000});
    const result = await page.evaluate(()=>{
      const doc = document.documentElement;
      const body = document.body;
      const viewportW = window.innerWidth;
      const overflowEls = Array.from(document.querySelectorAll('*')).map(el=>{
        const rect = el.getBoundingClientRect();
        if(el.scrollWidth > el.clientWidth + 1){
          return {tag: el.tagName, cls: el.className, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, x: Math.round(rect.left), r: Math.round(rect.right), width: Math.round(rect.width)};
        }
        return null;
      }).filter(Boolean).slice(0,50);
      return {scrollWidth: Math.max(body.scrollWidth, doc.scrollWidth), viewportW, overflowEls};
    });
    console.log('viewport',vp.name, result.viewportW, 'pageScroll', result.scrollWidth);
    console.log(JSON.stringify(result.overflowEls,null,2));
  }
  await browser.close();
})();
