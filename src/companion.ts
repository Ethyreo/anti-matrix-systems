type Landmark = { element: HTMLElement; top: number; height: number };
const clamp = (n: number) => Math.max(0, Math.min(1, n));

/** The route follows document progress, so wheel, touch, keys and reverse travel agree. */
export function createCompanion(isStatic: () => boolean) {
  const hero = document.querySelector<HTMLButtonElement>('.companion')!;
  const trail = document.querySelector<HTMLButtonElement>('.trail-companion')!;
  const canvas = hero.querySelector('canvas')!;
  const c = canvas.getContext('2d')!;
  const trailContext = trail.querySelector('canvas')!.getContext('2d')!;
  const landmarks: Landmark[] = [...document.querySelectorAll<HTMLElement>('main>section')].map(element => ({element, top: 0, height: 0}));
  // Neighbouring routes share an endpoint. Rest stops give the dog time to look ahead.
  const routes = [[.12,.12], [.12,.46,.78,.50,.85], [.85,.62,.30,.68], [.68,.42,.20,.75], [.75,.28,.65,.24,.83], [.83,.60,.30,.30]];
  const hints = ['GOOD COMPANY.', 'NEXT: THE OPERATING LAYER', 'NEXT: AI WITH A JOB TO DO', 'NEXT: THE EXPERIMENTS', 'NEXT: A NEW BEGINNING', 'YOU MADE IT. SAY HELLO.'];
  let petUntil = 0, lastScroll = scrollY, lastTime = 0, stride = 0, speed = 0, facing = 1;
  let previousX = 0, lastChapter = -1, stationarySince = 0;
  let width = innerWidth, height = innerHeight, dogWidth = 88;
  const refresh = () => {
    width = document.documentElement.clientWidth; height = innerHeight;
    dogWidth = trail.offsetWidth || (width <= 600 ? 70 : 88);
    landmarks.forEach(item => { item.top = item.element.offsetTop; item.height = item.element.offsetHeight; });
  };
  const pet = (event: Event) => {
    petUntil = performance.now() + 1500;
    const button = event.currentTarget as HTMLElement;
    button.classList.add('petted');
    window.setTimeout(() => button.classList.remove('petted'), 1500);
  };
  hero.addEventListener('click', pet); trail.addEventListener('click', pet);
  refresh();

  function update(time: number) {
    const dt = Math.min(.05, time - lastTime || 1 / 60); lastTime = time;
    const delta = scrollY - lastScroll; lastScroll = scrollY;
    trail.hidden = isStatic() || scrollY < landmarks[1].top - height * .12;
    if (isStatic()) return;
    const index = Math.max(1, landmarks.reduce((found, item, i) => scrollY + height * .12 >= item.top ? i : found, 0));
    const landmark = landmarks[index];
    const progress = clamp((scrollY + height * .12 - landmark.top) / landmark.height);
    const path = routes[index];
    const step = progress * (path.length - 1), segment = Math.min(path.length - 2, Math.floor(step));
    const local = step - segment;
    const t = clamp((local - .08) / .80);
    const eased = t * t * (3 - 2 * t);
    const x = 16 + (path[segment] + (path[segment + 1] - path[segment]) * eased) * (width - dogWidth - 32);
    const dx = x - previousX; previousX = x;
    const velocity = Math.abs(delta) / Math.max(1, height) / dt;
    speed += (velocity - speed) * Math.min(1, dt * 12);
    const moving = speed > .015;
    if (Math.abs(dx) > .08 && !trail.hidden) facing = Math.sign(dx);
    else if (trail.hidden && Math.abs(delta) > .1) facing = Math.sign(delta);
    if (moving) { stride += Math.min(20, 6 + speed * 9) * dt; stationarySince = time; }
    const sniff = !moving && time - stationarySince > 1.8 && Math.sin(time * 1.3) > .3;
    const hop = moving ? Math.sin(Math.PI * clamp((local - .40) / .22)) * (width <= 600 ? 8 : 15) : 0;
    trail.style.transform = `translate3d(${x.toFixed(1)}px,${(-hop).toFixed(1)}px,0)`;
    trail.dataset.facing = facing > 0 ? 'right' : 'left';
    trail.dataset.activity = moving ? 'running' : sniff ? 'sniffing' : 'waiting';
    trail.classList.toggle('note-left', x > width * .55);
    if (index !== lastChapter) {
      lastChapter = index;
      trail.querySelector('.companion-note')!.textContent = hints[index];
      trail.classList.toggle('on-paper', index === 1);
    }
    c.clearRect(0, 0, 104, 80); c.save();
    if (facing < 0) { c.translate(104, 0); c.scale(-1, 1); }
    c.fillStyle = '#080a0d55'; c.beginPath(); c.ellipse(51, 68, 24, 3, 0, 0, Math.PI * 2); c.fill();
    c.translate(0, moving ? Math.sin(stride * 2) * 1.5 : Math.sin(time * 2) * .3);
    const rect = (x: number, y: number, w: number, h: number, color: string) => { c.fillStyle = color; c.fillRect(Math.round(x), Math.round(y), w, h); };
    const cream = '#e8c599', shadow = '#9d6f42', dark = '#453329', white = '#f3dfbe';
    for (let leg = 0; leg < 4; leg++) {
      const phase = stride + (leg % 2) * Math.PI;
      const offset = moving ? Math.sin(phase) * 6 : 0;
      const lift = moving ? Math.max(0, Math.cos(phase)) * 4 : 0;
      const x = leg < 2 ? 35 : 62;
      rect(x + (leg % 2) * 4, 49, 5, 10, leg % 2 ? cream : shadow);
      rect(x + offset, 57 - lift, 5, 10, leg % 2 ? cream : shadow);
      rect(x + offset, 64 - lift, 8, 3, dark);
    }
    rect(28,39,38,18,cream); rect(30,50,31,6,shadow); rect(34,36,28,6,cream); rect(33,38,18,10,shadow);
    c.save(); if (sniff) { c.translate(64,44); c.rotate(.24); c.translate(-64,-44); }
    rect(60,27,17,24,cream); rect(65,22,12,12,cream); rect(62,19,6,13,dark); rect(72,20,5,9,dark);
    rect(75,33,10,9,white); rect(82,33,4,5,dark); rect(73,29,3,3,dark);
    rect(59,44,16,4,'#6bcbe6'); rect(68,48,3,3,'#f2b575'); c.restore();
    const wag = Math.round(Math.sin(time * (performance.now() < petUntil ? 20 : 7)) * 3);
    rect(22,37+wag,9,6,cream); rect(19,31+wag,6,9,cream); rect(18,28+wag,5,5,white);
    c.restore();
    if (!trail.hidden) { trailContext.clearRect(0,0,104,80); trailContext.drawImage(canvas,0,0); }
  }
  return { update, refresh, dispose() { hero.removeEventListener('click', pet); trail.removeEventListener('click', pet); } };
}
