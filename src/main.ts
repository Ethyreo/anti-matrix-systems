import './brand-fonts.css';
import './style.css';
import './operating-layer.css';
import './refinements.css';
import './identity-theme.css';
import { createCompanion } from './companion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { details, music, notes, projects } from './content';
import { services, currentToolkit as toolkit } from './identity';

gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration = 'manual';
document.documentElement.classList.remove('no-js');
const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const $$ = <T extends Element = HTMLElement>(selector: string) => [...document.querySelectorAll<T>(selector)];
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const archiveArrow = '<svg class="archive-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11"/></svg>';
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = preference.matches;
try { const saved = localStorage.getItem('am-reduced-motion'); if (saved !== null) reduced = saved === 'true'; } catch { /* Storage is optional. */ }
let readingLayout = reduced || innerHeight < 620 || innerWidth < 360;
let lenis: Lenis | undefined;
let motionContext: gsap.Context | undefined;
const state = { phase: 0, hero: 0, systems: 0 };
let sculpture: {update:(time:number,phase:number)=>void;dispose:()=>void}|undefined;
const sceneObserver = new IntersectionObserver(entries=>{
  if(!entries[0].isIntersecting)return;
  sceneObserver.disconnect();
  import('./sculpture').then(({createSculpture})=>{sculpture=createSculpture($('#sculpture'),()=>readingLayout);}).catch(()=>document.documentElement.classList.add('webgl-unavailable'));
},{rootMargin:'700px'});
sceneObserver.observe($('#lab'));
const cloud = $('.code-cloud');
const fragments = ['context :: gathered', 'signals → structure', 'workflow [ draft_01 ]', 'human.review { required }', 'connect → test → learn'];
cloud.innerHTML = fragments.map((text,i) => `<span class="code-token"><i>0${i+1}</i>${escape(text)}</span>`).join('');
const traveller = createCompanion(() => readingLayout);
ScrollTrigger.addEventListener('refresh', traveller.refresh);

function createMotion() {
  motionContext?.revert();
  lenis?.destroy(); lenis = undefined;
  readingLayout = reduced || innerHeight < 620 || innerWidth < 360;
  document.documentElement.classList.toggle('reduced-motion',reduced);
  document.documentElement.classList.toggle('reading-layout',readingLayout);
  const motionButton = $('#motion-toggle');
  motionButton.textContent = `REDUCED MOTION: ${reduced?'ON':'OFF'}`;
  motionButton.setAttribute('aria-pressed',String(reduced));
  if (!readingLayout && innerWidth > 600) {
    lenis = new Lenis({ lerp: .12, smoothWheel: true, syncTouch: false, prevent: node => !!node.closest('dialog') });
    lenis.on('scroll', ScrollTrigger.update);
  }
  state.phase = readingLayout ? .4 : 0;
  motionContext = gsap.context(() => {
    if (readingLayout) return;
    const hero = gsap.timeline({ defaults:{ease:'none'}, scrollTrigger:{trigger:'.opening',start:'top top',end:'bottom bottom',scrub:.2,invalidateOnRefresh:true} });
    hero.to(state,{hero:1,duration:1},0)
      .to('.hero-art',{scale:2.8,xPercent:-9,yPercent:6,duration:.95},0)
      .to('.hero-title',{yPercent:-45,scale:1.18,opacity:0,duration:.36},.03)
      .to(['.hero-bottom','.hero-topline','.hero-proof'],{opacity:0,y:-25,duration:.2},.02)
      .to('.hero-shade',{opacity:.28,duration:.4},0)
      .to('.companion',{left:'64%',top:'55%',scale:.32,opacity:.7,duration:.7},0)
      .to('.threshold-copy',{opacity:1,y:0,duration:.2},.35)
      .to('.threshold-copy',{color:'#29261f',duration:.08},.9)
      .to('.threshold-copy em',{color:'#a45427',duration:.08},.9)
      .to('.iris',{clipPath:'circle(130% at 67% 46%)',duration:.16},.84);
    gsap.to('.story-track',{x:()=>-($('.story-track').scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.story',start:'top top',end:'bottom bottom',scrub:.18,invalidateOnRefresh:true,onUpdate:self=>{ $('.story-counter').textContent=`${String(Math.min(4,Math.floor(self.progress*4)+1)).padStart(2,'0')} / 04`; }}});
    gsap.to('.system-orbit',{rotation:40,ease:'none',scrollTrigger:{trigger:'.story',start:'top top',end:'bottom bottom',scrub:true}});
    const systems=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'.systems',start:'top top',end:'bottom bottom',scrub:.24,invalidateOnRefresh:true,onUpdate:self=>{
      $$('.working-method li').forEach((item,i)=>item.classList.toggle('active',i<=Math.min(4,Math.floor(self.progress*5))));
    }}});
    systems.to(state,{systems:1,duration:1},0)
      .from('.system-map',{rotationX:32,rotationY:-18,scale:.7,duration:.62},0)
      .from('.system-node',{x:i=>i%2?-70:95,y:i=>[-95,70,-50,105,60,-90][i],rotation:i=>[-12,8,5,-8,12,-5][i],opacity:.45,duration:.58},0)
      .fromTo('.system-connections path',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:.3},.3)
      .from('.system-heart',{opacity:0,scale:.5,duration:.2},.3)
      .to('.systems-intro',{autoAlpha:0,y:-30,duration:.12},.18)
      .fromTo('.systems-resolved',{autoAlpha:0,y:25},{autoAlpha:1,y:0,duration:.09},.3);
    const lab = gsap.timeline({ defaults:{ease:'none'}, scrollTrigger:{trigger:'.lab',start:'top top',end:'bottom bottom',scrub:.22,invalidateOnRefresh:true,onUpdate:self=>{
      const p=self.progress; $('.lab-status').textContent=p<.27?'01 / QUESTION':p<.58?'02 / EXPLORE':'03 / MAKE IT TANGIBLE';
      $('#sculpture').setAttribute('data-phase',p.toFixed(3));
    }} });
    lab.to(state,{phase:1,duration:1},0)
      .to('.lab-opening',{y:-70,opacity:0,duration:.10},.16)
      .to('.code-cloud',{opacity:1,duration:.18},.08)
      .fromTo('.code-token',{y:18,opacity:0},{y:0,opacity:1,stagger:.035,duration:.14},.12)
      .fromTo('.lab-reading',{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:.08},.25)
      .to('.code-cloud',{autoAlpha:0,y:-12,duration:.12},.54)
      .to('.prototype-window',{autoAlpha:1,duration:.1},.68)
      .to('.prototype-window',{y:0,rotateY:0,rotateX:0,duration:.22},.68);
    gsap.to('.build-track',{x:()=>-Math.max(0,$('.build-track').scrollWidth-innerWidth+innerWidth*.07),ease:'none',scrollTrigger:{trigger:'.builds',start:'top top',end:'bottom bottom',scrub:.2,invalidateOnRefresh:true}});
    if (innerWidth>600) gsap.to('.builds-heading',{opacity:0,x:-120,ease:'none',scrollTrigger:{trigger:'.builds',start:'top top',end:'top -50%',scrub:.2}});
    gsap.fromTo('.invitation h2',{y:90,opacity:.25},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:'.invitation',start:'top 85%',end:'top 25%',scrub:.25}});
  });
  ScrollTrigger.refresh();
}

function jumpTo(id: string, immediate = false) {
  const target = document.getElementById(id); if (!target) return;
  const position = target.getBoundingClientRect().top + scrollY;
  if (lenis) lenis.scrollTo(position, { immediate, duration:1.4 });
  else window.scrollTo({top:position,behavior:reduced||immediate?'instant':'smooth'});
  history.replaceState(null,'',`#${id}`);
}

const indexDialog = $<HTMLDialogElement>('#index-dialog');
const detailDialog = $<HTMLDialogElement>('#detail-dialog');
function openDialog(dialog: HTMLDialogElement) {
  if (dialog.open) return;
  lenis?.stop(); document.body.style.overflow='hidden';
  const position = scrollY;
  dialog.showModal(); dialog.scrollTop=0;
  if(dialog===indexDialog)dialog.querySelector('[role="tab"][aria-selected="true"]')?.scrollIntoView({block:'nearest',inline:'nearest'});
  dialog.querySelector<HTMLButtonElement>('[data-close-dialog]')?.focus({preventScroll:true});
  window.scrollTo({top:position,behavior:'instant'});
}
function pauseAudio() { $$<HTMLAudioElement>('audio').forEach(audio=>audio.pause()); }
for (const dialog of [indexDialog,detailDialog]) {
  dialog.addEventListener('close',()=>{pauseAudio();if (!$('dialog[open]')) {document.body.style.overflow='';lenis?.start();}});
  dialog.addEventListener('click',event=>{if(event.target===dialog){ const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
function showDetail(key: string) {
  const item=details[key];if(!item)return;
  const article=['hiring','reporting','knowledge'].includes(key);
  const action=article?'<a class="text-link" href="/control-deck">READ THE FULL ESSAY <span>↗</span></a>':'<a class="text-link" href="mailto:admin@theantimatrixproject.com?subject=Founder%20systems%20conversation">LET’S DIAGNOSE THE CHAOS <span>↗</span></a>';
  $('#detail-content').innerHTML=`<article class="detail-body"><span class="mono">${escape(item.kicker)}</span><h2 id="detail-title">${escape(item.title)}</h2><div class="detail-tags">${item.tags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div><p class="detail-lead">${escape(item.lead)}</p>${item.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}${item.bullets?`<ul class="detail-list">${item.bullets.map(point=>`<li>${escape(point)}</li>`).join('')}</ul>`:''}${item.note?`<p class="detail-meta mono">${escape(item.note)}</p>`:''}${action}</article>`;
  openDialog(detailDialog);
}
function showTab(tab: string) {
  pauseAudio();
  $$('[data-tab]').forEach(button=>{const active=button.dataset.tab===tab;button.setAttribute('aria-selected',String(active));button.setAttribute('tabindex',active?'0':'-1');});
  if(indexDialog.open)indexDialog.querySelector('[role="tab"][aria-selected="true"]')?.scrollIntoView({block:'nearest',inline:'nearest'});
  const panel=$('#archive-panel');panel.setAttribute('aria-labelledby',`tab-${tab}`);
  if(tab==='journey') {
    panel.innerHTML=[['home','Build the dream','Founder’s Office · Business Ops · AI Strategy'],['story','Out in the field','The experience behind the work'],['systems','The operating layer','Six ways to work together'],['lab','The possibility engine','AI workflows with a practical purpose'],['builds','Made to find out','Internal tools and experiments'],['contact','The next beginning','Let’s diagnose the chaos']].map(([id,title,note],i)=>`<a href="#${id}" class="archive-row" data-index-jump><span class="mono">0${i}</span><span><strong>${title}</strong><small>${note}</small></span><b aria-hidden="true">${archiveArrow}</b></a>`).join('')+`<button class="archive-row" data-open-index="music"><span class="mono">♫</span><span><strong>Music from the margins</strong><small>Five songs and an alternate take</small></span><b aria-hidden="true">${archiveArrow}</b></button><button class="archive-row" data-detail="about"><span class="mono">GS</span><span><strong>The person behind the project</strong><small>Gurman Singh · experience and background</small></span><b aria-hidden="true">${archiveArrow}</b></button>`;
  } else if (tab==='builds'||tab==='notes'||tab==='services') {
    const rows=tab==='builds'?projects:tab==='services'?services:notes;
    const intro=tab==='builds'?'Personal builds and operating experiments, each at its own stage.':tab==='services'?'For founder-led teams with momentum and not enough structure. Start with the problem; choose the shape of support around it.':'Ideas about the work behind a business. Open a short introduction.';
    panel.innerHTML=`<p class="archive-note">${intro}</p>`+rows.map(([id,title,note],i)=>`<button class="archive-row" data-detail="${id}"><span class="mono">0${i+1}</span><span><strong>${title}</strong><small>${note}</small></span><b aria-hidden="true">${archiveArrow}</b></button>`).join('')+(tab==='services'?`<a class="archive-row" href="/work"><span class="mono">↳</span><span><strong>All the ways to work together</strong><small>Services, approach, and selected proof</small></span><b aria-hidden="true">${archiveArrow}</b></a>`:'');
  } else if(tab==='tools') {
    panel.innerHTML='<p class="archive-note">A changing toolkit for thinking, building, and connecting the work.</p><div class="toolkit-grid">'+toolkit.map(group=>`<article><span class="mono">${escape(group.label)}</span><h3>${escape(group.title)}</h3><ul>${group.tools.map(tool=>`<li>${escape(tool)}</li>`).join('')}</ul></article>`).join('')+'</div>';
  } else if(tab==='music') {
    panel.innerHTML='<p class="archive-note">Five songs, six recordings. Music made in collaboration with AI using Suno.</p>'+music.map((song,i)=>`<article class="music-item"><div class="music-item-heading"><span class="mono">0${i+1} / 05</span><div><h3>${escape(song.title)}</h3><p>${escape(song.date)} / ${escape(song.genre)}</p></div></div><div class="music-recordings">${song.recordings.map(recording=>`<div class="music-recording"><span class="mono">${escape(recording.label)}</span><audio controls preload="metadata" aria-label="Play ${escape(song.title)}, ${escape(recording.label)}" src="/assets/music/ai/${escape(recording.file)}"></audio></div>`).join('')}</div></article>`).join('');
    $$<HTMLAudioElement>('audio').forEach(audio=>audio.addEventListener('play',()=>{$$<HTMLAudioElement>('audio').forEach(other=>{if(other!==audio)other.pause();});}));
  }
}

document.addEventListener('click',event=>{
  const target=event.target as Element;
  const opener=target.closest<HTMLElement>('[data-open-index]');if(opener){showTab(opener.dataset.openIndex||'journey');openDialog(indexDialog);return;}
  const closer=target.closest('[data-close-dialog]');if(closer){closer.closest('dialog')?.close();return;}
  const detail=target.closest<HTMLElement>('[data-detail]');if(detail){showDetail(detail.dataset.detail!);return;}
  const tab=target.closest<HTMLElement>('[data-tab]');if(tab){showTab(tab.dataset.tab!);return;}
  const anchor=target.closest<HTMLAnchorElement>('a[href^="#"]');
  if(anchor){event.preventDefault();if(anchor.hasAttribute('data-index-jump')){detailDialog.close();indexDialog.close();document.body.style.overflow='';lenis?.start();}jumpTo(anchor.hash.slice(1));}
});
$('.index-tabs').addEventListener('keydown',event=>{
  const e=event as KeyboardEvent;if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
  const tabs=$$<HTMLButtonElement>('[data-tab]');let index=tabs.indexOf(document.activeElement as HTMLButtonElement);
  if(index<0)return;e.preventDefault();index=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  showTab(tabs[index].dataset.tab!);tabs[index].focus();
});
$('#motion-toggle').addEventListener('click',()=>{
  const current=$$<HTMLElement>('main>section').filter(section=>section.getBoundingClientRect().top<innerHeight/2).at(-1);
  reduced=!reduced;try{localStorage.setItem('am-reduced-motion',String(reduced));}catch{/* Storage is optional. */}
  createMotion();if(current)jumpTo(current.id,true);if(indexDialog.open)lenis?.stop();
});

const cursor=$('#cursor');let cursorX=-100,cursorY=-100;
const pointerMove=(event:PointerEvent)=>{
  if(event.pointerType!=='mouse'||!matchMedia('(pointer:fine)').matches)return;
  document.documentElement.classList.add('cursor-enabled');cursorX=event.clientX;cursorY=event.clientY;
  cursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0)`;
  const interactive=(event.target as Element).closest('button,a,audio');cursor.classList.toggle('hot',!!interactive);
  cursor.style.opacity=(event.target as Element).closest('audio')?'0':'1';
};
window.addEventListener('pointermove',pointerMove,{passive:true});
document.addEventListener('pointerout',event=>{if(!event.relatedTarget)cursor.style.opacity='0';});


const chapters=$$<HTMLElement>('main>section');const navLinks=$$<HTMLAnchorElement>('.journey-nav a');
let lastChapter='';
function updateFrame(time:number) {
  lenis?.raf(time*1000);sculpture?.update(time,state.phase);traveller.update(time);
  const max=document.documentElement.scrollHeight-innerHeight;
  $('.reading-progress i').style.transform=`scaleX(${max>0?scrollY/max:0})`;
  const active=chapters.filter(section=>section.getBoundingClientRect().top<=innerHeight*.45).at(-1)?.id??'home';
  if(active!==lastChapter){lastChapter=active;navLinks.forEach(link=>{const selected=link.hash===`#${active}`;link.classList.toggle('active',selected);if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  $('.hero-bottom').inert=!readingLayout&&state.hero>.24;
  $$<HTMLElement>('.story-panel,.build-piece').forEach(panel=>{const r=panel.getBoundingClientRect();panel.inert=!readingLayout&&(r.right<80||r.left>innerWidth-80||r.bottom<0||r.top>innerHeight);});
}
gsap.ticker.lagSmoothing(0);gsap.ticker.add(updateFrame);
createMotion();showTab('journey');
document.fonts.ready.then(()=>ScrollTrigger.refresh());
window.addEventListener('load',()=>{ScrollTrigger.refresh();if(location.hash&&document.getElementById(location.hash.slice(1)))jumpTo(location.hash.slice(1),true);},{once:true});
let resizeTimer=0,lastMobile=innerWidth<=600;
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{if(lastMobile!==(innerWidth<=600)||readingLayout!==(reduced||innerHeight<620||innerWidth<360)){lastMobile=innerWidth<=600;createMotion();}else ScrollTrigger.refresh();},250);});
preference.addEventListener('change',event=>{let saved:string|null=null;try{saved=localStorage.getItem('am-reduced-motion');}catch{/* Storage is optional. */}if(saved===null){reduced=event.matches;createMotion();}});
if(import.meta.hot)import.meta.hot.dispose(()=>{gsap.ticker.remove(updateFrame);traveller.dispose();ScrollTrigger.removeEventListener('refresh',traveller.refresh);motionContext?.revert();lenis?.destroy();sculpture?.dispose();sceneObserver.disconnect();window.removeEventListener('pointermove',pointerMove);});
