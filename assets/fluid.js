const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile=window.matchMedia('(max-width:820px)').matches;

(function(){
  if(!window.THREE || reduce){ const c=document.getElementById('bg-canvas'); if(c)c.style.display='none'; return; }
  const canvas=document.getElementById('bg-canvas');
  let renderer;
  try{ renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:true,powerPreference:'low-power'}); }catch(e){ canvas.style.display='none'; return; }
  renderer.setPixelRatio(isMobile?1:Math.min(window.devicePixelRatio,1.5));
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const uniforms={
    uTime:{value:0},
    uRes:{value:new THREE.Vector2(1,1)},
    uMouse:{value:new THREE.Vector2(.5,.5)},
    uScroll:{value:0}
  };
  const frag=`
    precision mediump float;
    #define OCT ${isMobile?3:6}
    uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uScroll;
    varying vec2 vUv;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
    float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<OCT;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
    void main(){
      vec2 uv=vUv;
      vec2 p=uv; p.x*=uRes.x/uRes.y;
      float t=uTime*.045;
      vec2 q=vec2(fbm(p*2.4+t),fbm(p*2.4-t+5.0));
      vec2 r=vec2(fbm(p*2.4+q*1.6+t*1.3),fbm(p*2.4+q*1.6-t));
      float f=fbm(p*2.2+r*1.4+uScroll*.6);
      float caustic=pow(abs(sin((r.x+r.y)*3.14159 + uTime*.25)),3.0);
      vec3 deep=vec3(0.015,0.03,0.08);
      vec3 mid=vec3(0.05,0.16,0.42);
      vec3 hi=vec3(0.28,0.62,1.0);
      vec3 col=mix(deep,mid,smoothstep(.1,.9,f));
      col+=hi*caustic*.5*smoothstep(.2,1.0,f);
      // mouse light
      float md=distance(uv,uMouse);
      col+=hi*.10*smoothstep(.45,0.,md);
      // top glow
      col+=vec3(0.06,0.16,0.4)*smoothstep(.9,0.,uv.y)*.5;
      // vignette
      float vg=smoothstep(1.25,.25,distance(uv,vec2(.5)));
      col*=vg;
      gl_FragColor=vec4(col,1.0);
    }`;
  const vert=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
  const mat=new THREE.ShaderMaterial({uniforms,vertexShader:vert,fragmentShader:frag});
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat));
  function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h,false);uniforms.uRes.value.set(w,h);}
  window.addEventListener('resize',resize);resize();
  let mx=.5,my=.5,cmx=.5,cmy=.5;
  window.addEventListener('pointermove',e=>{mx=e.clientX/window.innerWidth;my=1-e.clientY/window.innerHeight;});
  const clock=new THREE.Clock();
  let visible=true, inView=true;
  document.addEventListener('visibilitychange',()=>visible=!document.hidden);
  // solo renderiza mientras el fondo está en pantalla (ahorra GPU en el resto de la página)
  const heroEl=document.getElementById('hero');
  if('IntersectionObserver' in window && heroEl){
    new IntersectionObserver(es=>{inView=es[0].isIntersecting;},{rootMargin:'200px'}).observe(heroEl);
  }
  const minDelta=isMobile?1/30:1/60;   // tope de FPS: 30 en móvil, 60 en escritorio
  let acc=0, prev=0;
  function loop(now){
    requestAnimationFrame(loop);
    if(!visible||!inView) return;
    const t=(now||0)/1000; const dt=t-prev; prev=t;
    acc+=dt; if(acc<minDelta) return; acc=0;
    cmx+=(mx-cmx)*.05;cmy+=(my-cmy)*.05;
    uniforms.uMouse.value.set(cmx,cmy);
    uniforms.uTime.value=clock.getElapsedTime();
    uniforms.uScroll.value=(window.scrollY||0)/1200;
    renderer.render(scene,camera);
  }
  requestAnimationFrame(loop);
})();

