import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const siteBaseUrl = process.env.SITE_BASE_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]) {
    const page=await browser.newPage({viewport,hasTouch:viewport.width<600});
    await page.goto(`${siteBaseUrl}/`,{waitUntil:'networkidle'});
    async function go(id,phase){
      await page.evaluate(({id,phase})=>{const el=document.getElementById(id);window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*phase,behavior:'instant'});},{id,phase});
      await page.waitForTimeout(600);
    }
    // Every gallery card can open and return to the same scroll position.
    for(const key of ['tenant','maos','pdf','pos','revlift']){
      const phase=await page.evaluate(key=>{
        const piece=document.querySelector(`.build-piece[data-detail="${key}"]`),track=document.querySelector('.build-track');
        const travel=track.scrollWidth-innerWidth+innerWidth*.07;
        return Math.max(0,Math.min(1,(piece.offsetLeft+piece.offsetWidth/2-innerWidth/2)/travel));
      },key);
      await go('builds',phase);
      const before=await page.evaluate(()=>scrollY);
      await page.locator(`.build-piece[data-detail="${key}"]`).click();
      assert(await page.locator('#detail-dialog').evaluate(el=>el.open));
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const after=await page.evaluate(()=>scrollY);
      assert(Math.abs(before-after)<3,`Scroll changed after ${key}: ${before} -> ${after}`);
    }
    // The dog travels in every chapter; reversing over the same route reverses it.
    const routes=[];
    for(const id of ['story','systems','lab','builds']){
      const samples=[];
      for(const phase of [.12,.25,.45,.70,.90]){
        await go(id,phase);
        samples.push(await page.locator('.trail-companion').evaluate(el=>({x:el.getBoundingClientRect().x,hidden:el.hidden,facing:el.dataset.facing})));
      }
      assert(samples.every(s=>!s.hidden));
      assert(Math.max(...samples.map(s=>s.x))-Math.min(...samples.map(s=>s.x))>viewport.width*.2,`Dog route too small: ${id}`);
      routes.push({id,samples});
    }
    await go('lab',.12);
    await go('lab',.25);const forward=await page.locator('.trail-companion').getAttribute('data-facing');
    await go('lab',.15);const backward=await page.locator('.trail-companion').getAttribute('data-facing');
    assert.notEqual(forward,backward,'Dog does not turn on reverse travel');
    await page.locator('.trail-companion').click();
    assert(await page.locator('.trail-companion').evaluate(el=>el.classList.contains('petted')));
    // Keyboard tabs, nested dialogs, motion preference and reload persistence.
    await page.locator('.index-button').click();
    await page.getByRole('tab',{name:'The journey',exact:true}).focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.getByRole('tab',{name:'Work together',exact:true}).getAttribute('aria-selected'),'true');
    await page.locator('#motion-toggle').click();
    assert(await page.locator('html').evaluate(el=>el.classList.contains('reading-layout')));
    await page.keyboard.press('Escape');
    await page.reload({waitUntil:'networkidle'});
    assert(await page.locator('html').evaluate(el=>el.classList.contains('reduced-motion')));
    await page.screenshot({path:`artifacts/responsive/${viewport.width}-reduced-home.png`});
    await page.locator('#lab').scrollIntoViewIfNeeded();
    assert(await page.locator('.prototype-window').isVisible());
    await page.screenshot({path:`artifacts/responsive/${viewport.width}-reduced-lab.png`});
    results.push({viewport,passed:true,routes});
    console.log(`PASS ${viewport.width}: 5 gallery dialogs and scroll return, 4 dog routes, reverse, pet, keyboard tabs, reduced motion and reload`);
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await page.goto(`${siteBaseUrl}/`,{waitUntil:'networkidle'});
  assert(await page.locator('html').evaluate(el=>el.classList.contains('reduced-motion')));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForTimeout(300);
  assert(!(await page.locator('html').evaluate(el=>el.classList.contains('reading-layout'))));
  await page.setViewportSize({width:844,height:390});await page.waitForTimeout(500);
  assert(await page.locator('html').evaluate(el=>el.classList.contains('reading-layout')));
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
  assert(!(await page.locator('html').evaluate(el=>el.classList.contains('reading-layout'))));
  assert.equal(await page.locator('.build-track').evaluate(el=>getComputedStyle(el).display),'flex');
  console.log('PASS system motion preference changes and landscape/portrait resize');
  await page.close();
  await fs.writeFile('artifacts/responsive/interactions.json',JSON.stringify(results,null,2));
} finally { await browser.close(); }
