import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve('artifacts/responsive');
const siteBaseUrl = process.env.SITE_BASE_URL || 'http://127.0.0.1:4173';
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const selected=process.argv.find(arg=>arg.startsWith('--sizes='));
const sizes = selected ? selected.slice(8).split(',').map(size=>size.split('x').map(Number)) : process.argv.includes('--full')
  ? [[320,568],[360,640],[375,667],[390,844],[430,932],[600,960],[768,1024],[820,1180],[1024,768],[1280,720],[1440,900],[1920,1080],[2560,1440],[844,390],[1024,600]]
  : [[1440,900],[390,844],[375,667],[768,1024]];
const results = [];
for (const [width,height] of sizes) {
  const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:width<=820,isMobile:width<=600});
  const page = await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${siteBaseUrl}/`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const reading = await page.locator('html').evaluate(el=>el.classList.contains('reading-layout'));
  const frames=[];
  const stops = [['home',0],['story',0],['story',.60],['systems',.6],['lab',.40],['lab',.90],['builds',0],['builds',.6],['builds',1],['contact',0]];
  for (const [id,phase] of stops) {
    if(reading && phase && id!=='systems') continue;
    await page.evaluate(({id,phase,reading})=>{
      const section=document.getElementById(id);
      window.scrollTo({top:section.offsetTop+(reading?0:Math.max(0,section.offsetHeight-innerHeight)*phase),behavior:'instant'});
    },{id,phase,reading});
    await page.waitForTimeout(700);
    const data=await page.evaluate(({id,phase})=>{
      const bounds=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
      const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.visibility!=='hidden'&&Number(s.opacity)>.1&&s.display!=='none'&&r.width>0&&r.bottom>0&&r.top<innerHeight;};
      const scope=document.getElementById(id);
      const tokens=[...scope.querySelectorAll('.code-token')].filter(visible).map(bounds);
      const overlaps=(a,b)=>Math.min(a.right,b.right)>Math.max(a.x,b.x)&&Math.min(a.bottom,b.bottom)>Math.max(a.y,b.y);
      const tokenOverlap=tokens.some((a,i)=>tokens.slice(i+1).some(b=>overlaps(a,b)));
      const heading=scope.querySelector('.builds-heading');
      const firstPiece=scope.querySelector('.piece-index');
      const galleryOverlap=!!(heading&&firstPiece&&visible(heading)&&visible(firstPiece)&&overlaps(bounds(heading),bounds(firstPiece)));
      const reading=scope.querySelector('.lab-reading'),prototype=scope.querySelector('.prototype-window');
      const labOverlap=!!(reading&&prototype&&visible(reading)&&visible(prototype)&&overlaps(bounds(reading),bounds(prototype)));
      const relevant=[...scope.querySelectorAll('.hero-proof,.lab-reading,.prototype-window,.systems-resolved,.system-map,.piece-label,.piece-footer')].filter(visible).map(el=>({class:el.className,...bounds(el)}));
      const dog=document.querySelector('.trail-companion');
      return {id,phase,scrollY,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,tokenOverlap,galleryOverlap,labOverlap,relevant,dog:{hidden:dog.hidden,...bounds(dog),facing:dog.dataset.facing}};
    },{id,phase});
    frames.push(data);
    await page.screenshot({path:path.join(out,`${width}x${height}-${id}-${phase}.png`)});
  }
  // Open each added project through the keyboard-accessible archive and return.
  await page.locator('.index-button').click();
  await page.getByRole('tab',{name:'The builds',exact:true}).click();
  for(const key of ['pos','revlift']){
    await page.locator(`#archive-panel [data-detail="${key}"]`).click();
    await page.locator('#detail-title').waitFor({state:'visible'});
    await page.keyboard.press('Escape');
  }
  await page.keyboard.press('Escape');
  const result={width,height,reading,errors,frames};results.push(result);
  console.log(JSON.stringify({width,height,reading,errors,overflow:Math.max(...frames.map(x=>x.overflow)),overlap:frames.some(x=>x.tokenOverlap||x.galleryOverlap||x.labOverlap)}));
  await context.close();
}
const previous=selected?JSON.parse(await fs.readFile(path.join(out,'report.json'),'utf8')):[];
const updated=previous.filter(old=>!results.some(item=>item.width===old.width&&item.height===old.height)).concat(results);
await fs.writeFile(path.join(out,'report.json'),JSON.stringify(updated,null,2));
await browser.close();
if(results.some(r=>r.errors.length||r.frames.some(f=>f.overflow>1||f.tokenOverlap||f.galleryOverlap||f.labOverlap)))process.exitCode=1;
