/** Small, dependency-free WebGL scene: refractive sphere and local water flow.
 * Typography, coins, foliage and navigation remain ordinary DOM layers. */
const vertexSource = `attribute vec2 position; varying vec2 uv;
void main(){ uv=position*.5+.5; gl_Position=vec4(position,0.,1.); }`;
const fragmentSource = `
precision highp float;
varying vec2 uv;
uniform sampler2D landscape;
uniform vec2 resolution;
uniform vec2 imageSize;
uniform float time;
uniform float mobile;

vec2 cover(vec2 p) {
  float viewAspect=resolution.x/resolution.y;
  float imageAspect=imageSize.x/imageSize.y;
  vec2 scale=vec2(min(viewAspect/imageAspect,1.),min(imageAspect/viewAspect,1.));
  return (p-.5)*scale+.5+vec2(.22*mobile*(1.-scale.x),0.);
}
vec3 scene(vec2 p) { return texture2D(landscape,cover(clamp(p,.001,.999))).rgb; }
float hash(vec3 p) { p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise(vec3 p) {
 vec3 i=floor(p), f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
void main() {
 vec2 p=cover(uv);
 // Local deformations are defined in landscape coordinates, so their masks
 // stay on the river, canopy and flower beds even when the image is cropped.
 float riverWidth=mix(.225,.085,smoothstep(0.,.25,p.y));
 float water=(1.-smoothstep(.20,.27,p.y))*(1.-smoothstep(riverWidth*.70,riverWidth,abs(p.x-.565)));
 float depth=1.-smoothstep(0.,.3,p.y);
 float wave=sin(p.y*205.+time*1.05+sin(p.x*17.)*1.4);
 float fineWave=sin(p.y*465.-time*.8+p.x*14.);
 p.x+=(wave*.0023+fineWave*.0008)*water*(.35+depth);
 p.y+=sin(p.x*39.+p.y*87.-time*.75)*.00105*water;
 float canopy=smoothstep(.01,.06,p.x)*(1.-smoothstep(.23,.30,p.x))*smoothstep(.36,.46,p.y)*(1.-smoothstep(.68,.75,p.y));
 float branches=sin(time*.75+p.y*19.)+sin(time*1.31+p.x*42.)*.28;
 p.x+=branches*.0022*canopy;
 p.y+=sin(time*.9+p.x*45.)*.00075*canopy;
 float flowers=(1.-smoothstep(.25,.42,p.y))*(1.-smoothstep(.30,.41,p.x)+smoothstep(.76,.88,p.x));
 p.x+=sin(time*.9+p.y*36.+p.x*20.)*.00085*flowers;
 p.y+=sin(time*1.17+p.x*55.)*.00065*flowers;
 // Slow drift in distant clouds, with no abrupt edges at the horizon.
 p.x+=sin(time*.045)*.0017*smoothstep(.45,.8,p.y);
 vec3 color=texture2D(landscape,clamp(p,.001,.999)).rgb;
 float glimmer=pow(max(0.,sin(p.y*330.+time*.9+sin(p.x*28.))),12.);
 color+=vec3(.045,.035,.065)*water*(glimmer-.18);
 // Sphere coordinates are normalized by width to stay round at every viewport.
 vec2 sphereCenter=vec2(mix(.74,.52,mobile),.50);
 vec2 q=(uv-sphereCenter)*vec2(1.,resolution.y/resolution.x);
 q.y-=sin(time*.22)*.0018;
 float radius=mix(.12,.22,mobile);
 float d=length(q)/radius;
 if(d<1.) {
   vec3 n=vec3(q/radius,sqrt(max(0.,1.-d*d)));
   float angle=time*.042;
   mat3 rot=mat3(cos(angle),0.,sin(angle),0.,1.,0.,-sin(angle),0.,cos(angle));
   vec3 r=rot*n;
   float cloud=noise(r*5.5)*.45+noise(r*16.)*.30+noise(r*39.)*.17+noise(r*91.)*.08;
   vec3 refracted=scene(sphereCenter+q*vec2(.72,.72*resolution.x/resolution.y)+n.xy*.06);
   vec3 reflected=scene(sphereCenter+vec2(n.x*.16,.10+n.y*.23));
   float fresnel=pow(1.-n.z,2.1);
   vec3 glass=mix(refracted,vec3(.47,.30,.71),.48);
   glass=mix(glass,reflected,.22+fresnel*.42);
   glass+=vec3(.24,.17,.32)*(cloud-.42);
   glass=mix(glass,vec3(.42,.27,.65),smoothstep(.44,.60,cloud)*.48);
   float flecks=smoothstep(.70,.79,noise(r*125.))*smoothstep(.45,.58,cloud);
   glass+=vec3(.57,.47,.71)*flecks*.28;
   float light=pow(max(dot(n,normalize(vec3(-.55,.67,1.))),0.),155.);
   float rim=exp(-pow((d-.964)*85.,2.));
   glass+=vec3(.83,.76,.99)*light*.65+vec3(.8,.7,.98)*rim*(.10+max(n.y*.20-n.x*.17,0.));
   glass+=vec3(.10,.055,.16)*fresnel;
   float edge=1.-smoothstep(.992,1.,d);
   color=mix(color,glass,edge);
 }
 gl_FragColor=vec4(color,1.);
}`;

export function initLivingHero() {
  const hero = document.querySelector<HTMLElement>('[data-living-hero]');
  const scene = hero?.querySelector<HTMLElement>('[data-living-scene]');
  const canvas = hero?.querySelector<HTMLCanvasElement>('[data-living-canvas]');
  const picture = hero?.querySelector<HTMLImageElement>('[data-scene-image]');
  const toggle = hero?.querySelector<HTMLButtonElement>('[data-living-motion]');
  if (!hero || !scene || !canvas || !picture || !toggle) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let visible = true;
  let frame = 0;
  let elapsed = 0;
  let last = 0;
  let draw: ((time: number) => void) | undefined;
  let size: (() => void) | undefined;
  const paused = () => userPaused || reduced.matches || !visible || document.hidden;
  const tick = (now: number) => {
    frame = 0;
    // A media preference can change before its change event is delivered.
    // Keep the DOM control and CSS layers in sync when the render loop stops.
    if (paused()) { sync(); return; }
    if (now - last >= 1000 / 30) {
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      draw?.(elapsed / 1000);
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    hero.toggleAttribute('data-paused', paused());
    const stopped = userPaused || reduced.matches;
    toggle.setAttribute('aria-pressed', String(stopped));
    toggle.setAttribute('aria-label', reduced.matches ? 'Анімацію вимкнено у налаштуваннях пристрою' : stopped ? 'Увімкнути анімацію' : 'Призупинити анімацію');
    toggle.querySelector('[data-motion-label]')!.textContent = reduced.matches ? 'Без руху' : stopped ? 'Відтворити' : 'Пауза';
    toggle.querySelector('[data-motion-icon]')!.textContent = stopped ? '▷' : 'Ⅱ';
    toggle.disabled = reduced.matches;
    if (paused()) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    else if (!frame) frame = requestAnimationFrame(tick);
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
  observer.observe(hero);
  const finePointer = matchMedia('(pointer: fine)');
  hero.addEventListener('pointermove', event => {
    if (paused() || !finePointer.matches) return;
    const bounds = hero.getBoundingClientRect();
    scene.style.setProperty('--scene-x', `${((event.clientX - bounds.left) / bounds.width - .5) * -9}px`);
    scene.style.setProperty('--scene-y', `${((event.clientY - bounds.top) / bounds.height - .5) * -7}px`);
  });
  hero.addEventListener('pointerleave', () => { scene.style.setProperty('--scene-x', '0px'); scene.style.setProperty('--scene-y', '0px'); });
  window.addEventListener('scroll', () => {
    if (paused()) return;
    scene.style.setProperty('--scene-y', `${Math.min(10, Math.max(-10, -hero.getBoundingClientRect().top * .018))}px`);
  }, { passive: true });

  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (gl) {
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      shaders.push(shader); return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (program && vertex && fragment) {
      gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);
        const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const timeUniform = gl.getUniformLocation(program, 'time');
        const resolutionUniform = gl.getUniformLocation(program, 'resolution');
        const imageUniform = gl.getUniformLocation(program, 'imageSize');
        const mobileUniform = gl.getUniformLocation(program, 'mobile');
        gl.uniform1i(gl.getUniformLocation(program, 'landscape'), 0);
        let loaded = false;
        size = () => {
          const bounds = canvas.getBoundingClientRect();
          const ratio = Math.min(devicePixelRatio, 1.5, 1800 / bounds.width);
          canvas.width = Math.max(1, Math.round(bounds.width * ratio));
          canvas.height = Math.max(1, Math.round(bounds.height * ratio));
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
          gl.uniform1f(mobileUniform, matchMedia('(max-width: 700px)').matches ? 1 : 0);
          if (loaded) draw?.(elapsed / 1000);
        };
        draw = time => { if (!loaded) return; gl.uniform1f(timeUniform, time); gl.drawArrays(gl.TRIANGLES, 0, 6); };
        const upload = () => {
          if (!picture.naturalWidth) return;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, picture);
          gl.uniform2f(imageUniform, picture.naturalWidth, picture.naturalHeight);
          loaded = true; size?.(); draw?.(elapsed / 1000); scene.setAttribute('data-rendered', '');
        };
        picture.addEventListener('load', upload);
        if (picture.complete) upload();
        const resizeObserver = new ResizeObserver(() => size?.()); resizeObserver.observe(scene);
        canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); scene.removeAttribute('data-rendered'); draw = undefined; });
        // A restored context reloads the small module's scene on the next visit;
        // the DOM illustration stays visible if a device loses its GPU context.
        window.addEventListener('pagehide', event => {
          if (event.persisted) return;
          cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
          gl.deleteBuffer(buffer); gl.deleteTexture(texture); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
        }, { once: true });
      }
    }
  }
  window.addEventListener('pageshow', sync);
  sync();
}
