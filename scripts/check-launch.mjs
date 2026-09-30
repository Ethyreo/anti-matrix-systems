import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:4176';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    for (const [path, heading] of [['/', 'BUILD THE'], ['/control-deck', 'The Control Deck']]) {
      const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${path} should load`);
      assert(await page.getByRole('heading', { level: 1 }).first().isVisible(), `${path} needs a visible primary heading`);
      assert((await page.getByRole('heading', { level: 1 }).first().innerText()).includes(heading), `Unexpected heading on ${path}`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      assert.equal(canonical, `https://theantimatrixproject.com${path === '/' ? '/' : path}`);
    }
    await page.getByRole('link', { name: 'Back to Terminal' }).click();
    await page.waitForURL(`${base}/`);
    assert((await page.getByRole('heading', { level: 1 }).first().innerText()).includes('BUILD THE'));
    await page.goto(`${base}/control-deck`, { waitUntil: 'networkidle' });
    if (viewport.width < 768) await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Services' }).first().click();
    await page.waitForURL(`${base}/#systems`);
    assert((await page.getByRole('heading', { level: 1 }).first().innerText()).includes('BUILD THE'));
    assert.deepEqual(errors, [], `Browser errors at ${viewport.width}px`);
    results.push(`${viewport.width}px: home and archive rendered without console errors`);
    await page.close();
  }
  const missing = await fetch(`${base}/a-page-that-does-not-exist`, { redirect: 'manual' });
  assert.equal(missing.status, 404);
  const trailing = await fetch(`${base}/control-deck/`, { redirect: 'manual' });
  assert.equal(trailing.status, 307);
  assert.equal(trailing.headers.get('location'), '/control-deck');
  console.log(`PASS: ${results.join('; ')}; true 404 and canonical archive redirect.`);
} finally {
  await browser.close();
}
