const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const out = (m) => console.log('[RESP]', m);
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const url = 'http://127.0.0.1:8000/';
  const viewports = [
    {name:'mobile', width:375, height:812},
    {name:'tablet', width:768, height:1024},
    {name:'desktop-1366', width:1366, height:768},
    {name:'desktop-1440', width:1440, height:900},
    {name:'desktop-1600', width:1600, height:900}
  ];
  const results = [];
  for(const vp of viewports){
    try{
      out(`capture ${vp.name} ${vp.width}x${vp.height}`);
      await page.setViewport({width:vp.width, height:vp.height});
      await page.goto(url, {waitUntil:'networkidle2', timeout:30000});
      await page.waitForTimeout ? page.waitForTimeout(500) : new Promise(r=>setTimeout(r,500));
      const file = `resp-${vp.name}-${vp.width}x${vp.height}.png`;
      await page.screenshot({path:file, fullPage:true});
      results.push({viewport:vp, file, ok:true});
      out('saved ' + file);
    }catch(err){
      out('error ' + err.toString());
      results.push({viewport:vp, ok:false, reason:err.toString()});
    }
  }
  fs.writeFileSync('resp-results.json', JSON.stringify({url, results}, null, 2));
  out('wrote resp-results.json');
  await browser.close();
})();
