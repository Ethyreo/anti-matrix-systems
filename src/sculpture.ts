import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';

export function createSculpture(canvas: HTMLCanvasElement, reduced: () => boolean) {
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' }); }
  catch { document.documentElement.classList.add('webgl-unavailable'); return { update: (_time: number, _phase: number) => {}, dispose: () => {} }; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x090c10, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, .1, 60);
  camera.position.z = 9;
  const group = new Group();
  scene.add(group);
  const mobile = () => innerWidth <= 600;
  const count = mobile() ? 11000 : 24000;
  const positions = new Float32Array(count * 3);
  const loose = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  let rng = 719;
  const random = () => { rng = (rng * 16807) % 2147483647; return (rng - 1) / 2147483646; };
  for (let i = 0; i < count; i++) {
    const t = random() * Math.PI * 2, u = random() * Math.PI * 2;
    const radius = .48 + random() * .16;
    const x = (1.6 + radius * Math.cos(u)) * Math.cos(t);
    const y = (1.6 + radius * Math.cos(u)) * Math.sin(t);
    const z = radius * Math.sin(u) + .42 * Math.sin(t * 3);
    positions.set([x, y, z], i * 3);
    const r = Math.pow(random(), .4) * 3.25, a = random() * Math.PI * 2, b = Math.acos(2 * random() - 1);
    loose.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)], i * 3);
    grid.set([(i % 130) / 129 * 4.2 - 2.1, Math.floor(i / 130) / (count / 130) * 2.8 - 1.4, (random() - .5) * .1], i * 3);
    seed[i] = random();
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aLoose', new BufferAttribute(loose, 3));
  geometry.setAttribute('aGrid', new BufferAttribute(grid, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(seed, 1));
  const uniforms = {
    uTime: { value: 0 }, uPhase: { value: 0 }, uPointer: { value: new Vector2(20, 20) },
    uDpr: { value: renderer.getPixelRatio() }, uCyan: { value: new Color('#8fcede') }, uAmber: { value: new Color('#f3a965') }
  };
  const material = new ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending,
    vertexShader: `
      attribute vec3 aLoose; attribute vec3 aGrid; attribute float aSeed;
      uniform float uTime; uniform float uPhase; uniform float uDpr; uniform vec2 uPointer;
      varying float vSeed; varying float vDepth; varying float vPhase;
      void main(){
        float gather=smoothstep(0.0,0.40,uPhase);
        float assemble=smoothstep(0.48,0.90,uPhase);
        vec3 p=mix(aLoose,position,gather);
        p=mix(p,aGrid,assemble);
        p+=vec3(sin(uTime*.3+aSeed*17.),cos(uTime*.23+aSeed*19.),sin(uTime*.2+aSeed*13.))*.028;
        vec2 d=p.xy-uPointer;
        float force=exp(-dot(d,d)*2.4);
        p.xy+=normalize(d+vec2(.001))*force*.5;
        p.z+=force*.4;
        vec4 mv=modelViewMatrix*vec4(p,1.);
        gl_Position=projectionMatrix*mv;
        gl_PointSize=clamp((1.2+aSeed*1.2)*uDpr*(7./-mv.z),.8,5.);
        vSeed=aSeed;vDepth=clamp((p.z+2.)*.3,.25,1.);vPhase=uPhase;
      }`,
    fragmentShader: `
      uniform vec3 uCyan; uniform vec3 uAmber;
      varying float vSeed;varying float vDepth;varying float vPhase;
      void main(){
        float d=length(gl_PointCoord-.5);if(d>.5)discard;
        vec3 col=mix(uCyan,uAmber,smoothstep(.93,1.,vSeed));
        col=mix(col,vec3(.82,.92,.93),step(.65,vSeed)*.55);
        float alpha=(1.-smoothstep(.12,.5,d))*(.35+.6*vDepth);
        alpha*=1.-smoothstep(.73,.97,vPhase)*.84;
        gl_FragColor=vec4(col,alpha);
      }`
  });
  const points = new Points(geometry, material); group.add(points);
  let visible = false, last = -1, wasReduced = false, previousPhase = -1;
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { rootMargin: '120px' });
  observer.observe(canvas);
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    group.position.set(mobile() ? 0 : 1.95, mobile() ? -1.1 : -.05, 0);
    group.scale.setScalar(mobile() ? .77 : 1.0);
    last = -1;
  };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  const pointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || reduced()) return;
    const r = canvas.getBoundingClientRect();
    const height = 2 * Math.tan(42 * Math.PI / 360) * camera.position.z;
    uniforms.uPointer.value.set(((event.clientX-r.left)/r.width-.5)*height*camera.aspect-group.position.x, -((event.clientY-r.top)/r.height-.5)*height-group.position.y);
  };
  window.addEventListener('pointermove', pointer, { passive: true });
  canvas.addEventListener('webglcontextlost', () => document.documentElement.classList.add('webgl-unavailable'));
  function update(time: number, phase: number) {
    if (!visible || document.hidden) return;
    const simple = reduced();
    if (simple && wasReduced && previousPhase === phase) return;
    if (!simple && time-last < 1/45 && last >= 0) return;
    last = time; wasReduced = simple; previousPhase = phase;
    uniforms.uTime.value = simple ? 0 : time;
    uniforms.uPhase.value = simple ? .4 : phase;
    group.rotation.y = simple ? .2 : .32 - phase * .7;
    group.rotation.z = simple ? -.23 : -.24 + phase * .42;
    group.rotation.x = simple ? .2 : .2 - phase * .13;
    renderer.render(scene, camera);
  }
  return { update, dispose() { observer.disconnect(); ro.disconnect(); window.removeEventListener('pointermove',pointer); geometry.dispose(); material.dispose(); renderer.dispose(); } };
}
