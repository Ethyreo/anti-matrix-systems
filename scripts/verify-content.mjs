import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createServer } from 'vite';

// Check the interactive content graph without launching or automating a browser.
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
const server=await createServer({server:{middlewareMode:true},optimizeDeps:{noDiscovery:true,entries:[]},logLevel:'error'});
try {
  const {details,projects,notes,music}=await server.ssrLoadModule('/src/content.ts');
  const {services}=await server.ssrLoadModule('/src/identity.ts');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length,'HTML IDs must be unique');
  for(const [,target] of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(target),`Missing chapter: ${target}`);
  for(const [,key] of html.matchAll(/data-detail="([^"]+)"/g))assert(details[key],`Missing detail: ${key}`);
  for(const [key] of [...projects,...notes,...services])assert(details[key],`Missing archive entry: ${key}`);
  assert.equal(services.length,6);
  assert.equal(music.length,5);
  for(const item of Object.values(details))assert(item.title&&item.lead&&item.paragraphs.length,`Incomplete detail: ${item.title}`);
  for(const asset of ['threshold.webp','fieldwork.webp','gurman.jpg'])await fs.access(new URL(`../public/assets/${asset}`,import.meta.url));
  console.log(`PASS: ${ids.length} unique IDs; chapter links and detail actions resolve; 6 services, ${projects.length} projects, ${notes.length} notes, 5 music tracks.`);
} finally {await server.close();}
