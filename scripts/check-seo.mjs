import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const read = path => readFile(resolve(dist, path), 'utf8');
const home = await read('index.html');
const deck = await read('control-deck/index.html');
const robots = await read('robots.txt');
const sitemap = await read('sitemap.xml');
const llms = await read('llms.txt');
const notFound = await read('404.html');

function assertPage(html, canonical, title) {
  assert.match(html, /<html lang="en"/);
  assert.match(html, new RegExp(`<title>${title}</title>`));
  assert(html.includes(`<link rel="canonical" href="${canonical}"`), `Missing canonical for ${canonical}`);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<meta name="robots" content="index, follow/);
  assert.match(html, /<meta property="og:image" content="https:\/\/theantimatrixproject\.com\/assets\/threshold\.webp"/);
  assert.match(html, /<h1[\s>]/);
}

assertPage(home, 'https://theantimatrixproject.com/', 'The Anti-Matrix Project | Founder’s Office, BizOps & AI Strategy');
assertPage(deck, 'https://theantimatrixproject.com/control-deck', 'Control Deck | The Anti-Matrix Project');
assert.match(home, /Fractional Founder’s Office/);
assert.match(home, /Business<br>systems/);
assert.match(home, /href="\/control-deck"/);
assert.match(robots, /^User-agent: \*\r?\nAllow: \/\s/m);
assert.match(robots, /Sitemap: https:\/\/theantimatrixproject\.com\/sitemap\.xml/);
assert.match(sitemap, /<loc>https:\/\/theantimatrixproject\.com\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/theantimatrixproject\.com\/control-deck<\/loc>/);
assert.match(llms, /Gurman Singh/);
assert(!llms.includes('advanced AI agent systems'));
assert.match(notFound, /<meta name="robots" content="noindex"/);
for (const match of home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
  const graph = JSON.parse(match[1]);
  assert(graph['@graph'].some(item => item['@type'] === 'Organization'));
  assert(graph['@graph'].some(item => item['@type'] === 'Person'));
}
await access(resolve(dist, 'assets/threshold.webp'));
await access(resolve(dist, 'assets/music/ai/the-light.mp3'));
console.log('PASS: production metadata, structured data, crawl files, preserved archive URL and music assets.');
