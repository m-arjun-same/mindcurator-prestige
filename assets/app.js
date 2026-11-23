/* MindCurator Prestige — own code. Data islands + scroll-scrubbed scenes. */
'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const small=()=>matchMedia('(max-width:760px)').matches;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

const HERO=[
 {slug:'cafe',title:'Café Breizh',label:'2026',what:'Bakery site crowned by a real 3D croissant',film:'media/cafe.mp4',poster:'media/posters/cafe.jpg'},
 {slug:'citypaws',title:'CityPaws Grooming',label:'Houston',what:'Full-motion site for a Houston grooming salon',film:'media/citypaws.mp4',poster:'media/posters/citypaws.jpg'},
 {slug:'queens',title:"Queen's Bakery",label:'Los Angeles',what:'The Crown Box — an ordering site for a Chinatown bakery',film:'media/queens.mp4',poster:'media/posters/queens.jpg'},
 {slug:'mayuri',title:'Mayuri Footwears',label:'Hyderabad',what:'The Showcase — a footwear house, shown like a gallery',film:'media/mayuri.mp4',poster:'media/posters/mayuri.jpg'},
 {slug:'moonmelt',title:'Moonmelt Café',label:'Night Café',what:'The Night Café — an own-design café site',film:'media/moonmelt.mp4',poster:'media/posters/moonmelt.jpg'}
];
const SERVICES=[
 {t:'Landing pages',price:'₹4,999',slug:'velmara',title:'Velmara',label:'Fashion',film:'media/velmara.mp4',poster:'media/posters/velmara.jpg',s:'One page that says it all: who you are, what you sell, and one clear way to reach you.',ex:[['Velmara','Fashion'],['Zarnika','Saree house'],['Moonmelt Café','Night Café']]},
 {t:'Portfolio sites',price:'₹6,999',slug:'mayuri',title:'Mayuri Footwears',label:'Showcase',film:'media/mayuri.mp4',poster:'media/posters/mayuri.jpg',s:'Your work, shown like a gallery: projects first, words second, enquiries one tap away.',ex:[['Mayuri Footwears','Showcase'],['Vivant Vintage','Boston'],['Dark Horse Tattoo','Los Angeles']]},
 {t:'Business websites',price:'₹9,999',slug:'citypaws',title:'CityPaws Grooming',label:'Houston',film:'media/citypaws.mp4',poster:'media/posters/citypaws.jpg',s:'The full site for a working business: services, story, gallery, and every way to book or buy.',ex:[['CityPaws Grooming','Houston'],['Stoneforge Construction','Bengaluru'],['Café Breizh','Las Vegas']]},
 {t:'Full business sites',price:'₹19,999',slug:'cafe',title:'Café Breizh',label:'Las Vegas',film:'media/cafe.mp4',poster:'media/posters/cafe.jpg',s:'Everything above, plus the moving parts: video heroes, real 3D, and pages that feel alive.',ex:[['Café Breizh','3D hero'],['CityPaws Grooming','Video hero'],['Kapiloka Coffee','Tumbler 360']]},
 {t:'Ordering & e-commerce',price:'₹29,999',slug:'queens',title:"Queen's Bakery",label:'Ordering',film:'media/queens.mp4',poster:'media/posters/queens.jpg',s:'A shop that takes orders while you sleep: catalogue, cart, and a checkout customers finish.',ex:[["Queen's Bakery",'Ordering'],['Sri Ganesha Fireworks','Hyderabad'],['Mariglow Salon','Booking']]},
 {t:'Consulting',price:'₹999',slug:'kapiloka',title:'Kapiloka Coffee',label:'Tumbler 360',film:'media/kapiloka.mp4',poster:'media/posters/kapiloka.jpg',s:'One honest hour on your current site: what is losing you customers, and what to fix first.',ex:[['Site audits','Session'],['Rebuild plans','Session'],['Launch checks','Session']]}
];
const FULL=[
 {title:'Café Breizh',meta:'Las Vegas · Bakery site',film:'media/cafe.mp4',poster:'media/posters/cafe.jpg',what:'Bakery site crowned by a real 3D croissant'},
 {title:'CityPaws Grooming',meta:'Houston · Grooming site',film:'media/citypaws.mp4',poster:'media/posters/citypaws.jpg',what:'Full-motion site for a Houston grooming salon'},
 {title:"Queen's Bakery",meta:'Los Angeles · Ordering site',film:'media/queens.mp4',poster:'media/posters/queens.jpg',what:'The Crown Box — an ordering site for a Chinatown bakery'},
 {title:'Mayuri Footwears',meta:'Hyderabad · Showcase site',film:'media/mayuri.mp4',poster:'media/posters/mayuri.jpg',what:'The Showcase — a footwear house, shown like a gallery'},
 {title:'Moonmelt Café',meta:'Night Café · Café site',film:'media/moonmelt.mp4',poster:'media/posters/moonmelt.jpg',what:'The Night Café — an own-design café site'},
 {title:'Stoneforge Construction',meta:'Bengaluru · Company site',film:'media/stoneforge.mp4',poster:'media/posters/stoneforge.jpg',what:'Builders & architects — a construction company site'},
 {title:'Kapiloka Coffee House',meta:'Coffee house · Tumbler 360',film:'media/kapiloka.mp4',poster:'media/posters/kapiloka.jpg',what:'A coffee house site with a turning tumbler hero'},
 {title:'Velmara',meta:'Fashion · Thread to Runway',film:'media/velmara.mp4',poster:'media/posters/velmara.jpg',what:'Thread to Runway — a fashion house site'},
 {title:'Dark Horse Tattoo',meta:'Los Angeles · Tattoo studio site',film:'media/darkhorse.mp4',poster:'media/posters/darkhorse.jpg',what:'Ink & Bone — a tattoo studio site in Los Angeles'},
 {title:'The Nursery Garden',meta:'Los Angeles · Garden Table',film:'media/nursery.mp4',poster:'media/posters/nursery.jpg',what:'Garden Table — a reservation builder for a garden café'},
 {title:'Vivant Vintage',meta:'Boston · Vintage store site',poster:'media/posters/vivant.jpg',what:'The Basement Dive — a vintage store site in Boston'},
 {title:'Sri Ganesha Fireworks',meta:'Hyderabad · Ordering site',poster:'media/posters/ganesha.jpg',what:'An ordering site for a Hyderabad fireworks house'},
 {title:'Zarnika',meta:'Saree house · Website',poster:'media/posters/zarnika.png',what:'The Zari System — a saree house website'},
 {title:'Mariglow Salon',meta:'Salon · Booking site',what:'A salon site with booking built in'},
 {title:'Elite Image Barber Lounge',meta:'Burlington · Barbershop site',what:'A barbershop site for a Burlington lounge'}
];

/* ---------- build DOM ---------- */
const playSVG='<svg class="gate__ic" viewBox="0 0 58 58" aria-hidden="true"><path d="M21.9 19.5V38.5L39 29Z"/></svg>';
const gf=$('#gate-frame'), dots=$('#dots');
const rowsWrap=document.createElement('div'); rowsWrap.className='gate__rows'; gf.appendChild(rowsWrap);
HERO.forEach((p,i)=>{
  const v=document.createElement('video');
  v.className='gate__v'+(i===0?' is-on':''); v.dataset.src=p.film; v.poster=p.poster;
  v.muted=true; v.loop=true; v.playsInline=true; v.preload='none'; v.setAttribute('aria-hidden','true');
  gf.appendChild(v);
  const row=document.createElement('div');
  row.className='gate__row'+(i===0?' is-on':'');
  row.innerHTML=`<span class="gate__tab"><b>${p.title}</b> <span>${p.label}</span></span><button class="gate__play" type="button" aria-label="Watch: ${p.title}"><span class="gate__pl" aria-hidden="true">${i===0?'Watch with sound':'Watch'}</span>${playSVG}</button>`;
  row.querySelector('.gate__play').addEventListener('click',e=>{e.stopPropagation();openViewer(p);});
  rowsWrap.appendChild(row);
  const d=document.createElement('button');
  d.className='dots__b'; d.type='button'; d.setAttribute('aria-label',p.title);
  if(i===0)d.setAttribute('aria-current','true');
  d.addEventListener('click',()=>goTo(heroSeg(i)));
  dots.appendChild(d);
});
gf.addEventListener('click',()=>openViewer(HERO[heroIdx<0?0:heroIdx]));
const gateVids=$$('.gate__v',gf), gateRows=$$('.gate__row',gf), dotBtns=$$('.dots__b',dots);

const ml=$('#make-list'), wins=$('#make-wins');
SERVICES.forEach((s,i)=>{
  const li=document.createElement('li');
  li.className='make__item'+(i===0?' is-on':'');
  li.innerHTML=`<button class="make__b" type="button"><span class="make__n">0${i+1}</span><span class="make__t">${s.t}</span><span class="make__price">${s.price}</span></button>
  <div class="make__more"><div>
    <a class="make__mw" href="#" aria-label="${s.title} ${s.label}"><video class="make__v" data-src="${s.film}" poster="${s.poster}" muted loop playsinline preload="none" aria-hidden="true"></video><span class="make__tab"><b>${s.title}</b> <span>${s.label}</span></span><span class="make__go" aria-hidden="true">${playSVG}</span></a>
    <p class="make__s">${s.s}</p>
    <p class="make__ex">${s.ex.map(e=>`<a href="#" data-ex="${e[0]}">${e[0]}</a> <span class="make__lab">${e[1]}</span>`).join(', ')}</p>
  </div></div>`;
  li.querySelector('.make__b').addEventListener('click',()=>goTo(makeSeg(i)));
  li.querySelector('.make__mw').addEventListener('click',e=>{e.preventDefault();openViewer(s);});
  ml.appendChild(li);
  const w=document.createElement('a');
  w.className='make__win'+(i===0?' is-on':''); w.href='#';
  w.innerHTML=`<video class="make__v" data-src="${s.film}" poster="${s.poster}" muted loop playsinline preload="none" aria-hidden="true"></video><span class="make__tab"><b>${s.title}</b> <span>${s.label}</span></span><span class="make__go" aria-hidden="true">${playSVG}</span>`;
  w.addEventListener('click',e=>{e.preventDefault();openViewer(s);});
  wins.appendChild(w);
});
const makeItems=$$('.make__item',ml), makeWins=$$('.make__win',wins);
$$('[data-ex]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); const p=FULL.find(f=>f.title===a.dataset.ex)||HERO.find(f=>f.title===a.dataset.ex); if(p) openViewer(p); }));

/* op planes */
const OP=JSON.parse($('#op-data').textContent).ch;
const planesWrap=$('#op-planes');
OP.forEach((c,i)=>{
  const pl=document.createElement('div'); pl.className='op-pl';
  pl.innerHTML=`<p class="op-yr">Step ${c.n}</p><h3 class="op-tt">${c.t}</h3><p class="op-bd">${c.b}</p>`+
   (c.media?`<div class="op-media"><img src="${c.media.poster}" alt="" loading="lazy"><span class="op-tab"><b>${c.media.t}</b><span> ${c.media.l}</span></span><span class="op-cnt">${c.n} / 06</span></div>`:'');
  planesWrap.appendChild(pl);
});
const planes=$$('.op-pl',planesWrap);

/* full ring items */
const fl=$('#full-list');
FULL.forEach((p,i)=>{
  const li=document.createElement('li');
  const a=document.createElement('a');
  a.className='full__it'; a.href='#'; a.dataset.i=i;
  a.innerHTML=`<span class="full__t">${p.title}</span><span class="full__m">${p.meta}</span>`;
  a.addEventListener('click',e=>{e.preventDefault();openViewer(p);});
  a.addEventListener('mouseenter',()=>selectFull(i));
  li.appendChild(a); fl.appendChild(li);
});
const fullItems=$$('.full__it',fl), fullGroup=$('.full__g');

/* ---------- state ---------- */
let soundOn=false, entered=false, motionOn=!reduced;
const heroEl=$('.hero'), makeScene=$('.make__scene'), opTrack=$('.op-track'), opStage=$('.op-stage');
const vh=()=>innerHeight;
function heroSeg(i){const top=heroEl.offsetTop;const h=heroEl.offsetHeight-vh();return top+(i+0.5)*(h/5);}
function makeSeg(i){const top=makeScene.offsetTop;const h=makeScene.offsetHeight-vh();return top+(i+0.5)*(h/6);}
function goTo(y){ if(window.__lenis) window.__lenis.scrollTo(y,{duration:1.1}); else scrollTo({top:y,behavior:'smooth'}); }

/* ---------- Lenis ---------- */
if(window.Lenis && !reduced){ const lenis=new Lenis({lerp:.1,smoothWheel:true,wheelMultiplier:1}); window.__lenis=lenis;
  function raf(t){lenis.raf(t);requestAnimationFrame(raf);} requestAnimationFrame(raf);
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href'); if(id.length>1&&$(id)){e.preventDefault(); lenis.scrollTo(id==='#top'?0:$(id),{duration:1.1}); closeMenu();}}));
}

/* ---------- lazy video ---------- */
const vio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){const v=e.target; if(!v.src&&v.dataset.src){v.src=v.dataset.src;} vio.unobserve(v);} }),{rootMargin:'600px'});
$$('video[data-src]').forEach(v=>vio.observe(v));
function playOnly(list,idx){ list.forEach((v,i)=>{ if(i===idx){ if(v.src) v.play().catch(()=>{}); } else v.pause(); }); }

/* ---------- scroll scenes ---------- */
let heroIdx=-1, makeIdx=-1, opFin=null, lastY=scrollY, scrollVel=0;
function progress(el){ const r=el.getBoundingClientRect(); const h=el.offsetHeight-vh(); if(h<=0) return r.top<0?1:0; return Math.min(1,Math.max(0,-r.top/h)); }
function setHero(i){ if(i===heroIdx)return; heroIdx=i;
  gateVids.forEach((v,j)=>{v.classList.toggle('is-on',j===i); if(j===i) setTimeout(()=>v.classList.add('is-graded'),120); else v.classList.remove('is-graded');});
  gateRows.forEach((r,j)=>r.classList.toggle('is-on',j===i));
  dotBtns.forEach((d,j)=>{ if(j===i)d.setAttribute('aria-current','true'); else d.removeAttribute('aria-current'); });
  playOnly(gateVids,i);
}
function setMake(i){ if(i===makeIdx)return; const first=makeIdx<0; makeIdx=i;
  if(!first&&window.MCSnd&&soundOn) MCSnd.tick(1,i%2?-.5:.5);
  makeItems.forEach((it,j)=>it.classList.toggle('is-on',j===i));
  makeWins.forEach((w,j)=>w.classList.toggle('is-on',j===i));
  playOnly($$('.make__win .make__v'),i);
  if(small()) playOnly($$('.make__item .make__v'),i);
}
/* op: chapters occupy first 44% of the track (reference timing), final holds after */
const OP_END=0.44;
function renderOp(p){
  const fin=p>=OP_END;
  if(fin!==opFin){ opFin=fin; opStage.classList.toggle('fin',fin); $('#op-final').classList.toggle('is-on',fin); }
  const W=opStage.clientWidth,H=opStage.clientHeight,lx=W/2;
  if(!fin){
    const phase=p/OP_END*6, idx=Math.min(5,Math.floor(phase));
    $('#op-n').textContent=OP[idx].n+' / 06'; $('#op-ct2').textContent=OP[idx].t; $('#op-year').textContent=OP[idx].yr;
    planes.forEach((pl,i)=>{
      const d=phase-i, pw=pl.offsetWidth, ph=pl.offsetHeight;
      if(d<=-0.6||d>=1.6){ pl.style.visibility='hidden'; pl.style.opacity=0; return; }
      const q=(d+0.6)/2.2, y=(1-q)*(H*1.12)-ph*0.55, x=(i%2===0)? lx-pw-16 : lx+16;
      const op=Math.max(0,Math.min(1, q<0.12? q/0.12 : q>0.88? (1-q)/0.12 : 1));
      pl.style.visibility='visible'; pl.style.opacity=op.toFixed(3);
      pl.style.transform=`translate(${x}px,${y}px) scale(${0.88+0.2*Math.sin(q*Math.PI)})`;
    });
    drawLine(lx,H,phase);
  } else {
    planes.forEach(pl=>{pl.style.visibility='hidden';pl.style.opacity=0;});
  }
}
const lineCv=$('.op-line'), lineCtx=lineCv.getContext('2d');
function drawLine(lx,H,phase){
  const w=lineCv.width=opStage.clientWidth, h=lineCv.height=opStage.clientHeight;
  lineCtx.clearRect(0,0,w,h);
  const idx=Math.min(5,Math.floor(phase)), d=phase-idx;
  const q=(d+0.6)/2.2, dotY=(1-q)*(H*1.12)+40;
  lineCtx.strokeStyle='rgba(242,242,239,.55)'; lineCtx.lineWidth=1.2; lineCtx.beginPath();
  lineCtx.moveTo(lx,-10);
  lineCtx.bezierCurveTo(lx,dotY-130, lx-30,dotY-50, lx,dotY);
  lineCtx.lineTo(lx,dotY); lineCtx.stroke();
  lineCtx.strokeStyle='rgba(242,242,239,.14)'; lineCtx.beginPath(); lineCtx.moveTo(lx,dotY); lineCtx.lineTo(lx,h+10); lineCtx.stroke();
  lineCtx.font='500 11px "Martian Grotesk",sans-serif'; lineCtx.fillStyle='rgba(154,160,170,.9)';
  planes.forEach((pl,i)=>{ if(pl.style.visibility==='visible'){ const y=parseFloat((pl.style.transform.match(/translate\([^,]+,\s*([\d.-]+)px/)||[])[1]); if(!isNaN(y)){ lineCtx.fillText(OP[i].yr, lx+12, y+4); lineCtx.fillRect(lx-7,y,6,1);} } });
  lineCtx.save(); lineCtx.shadowColor='#fb5e28'; lineCtx.shadowBlur=16;
  lineCtx.fillStyle='#fb5e28'; lineCtx.beginPath(); lineCtx.arc(lx,dotY,4.5,0,6.29); lineCtx.fill(); lineCtx.restore();
}
const back=$('#back'), fab=$('.fab');
function onScroll(){
  scrollVel=Math.min(1,Math.abs(scrollY-lastY)/50); lastY=scrollY;
  const hp=progress(heroEl);
  setHero(Math.min(4,Math.floor(hp*5)));
  heroEl.classList.toggle('is-top',hp===0);
  if(!small()) setMake(Math.min(5,Math.floor(progress(makeScene)*6))); else setMake(makeIdx<0?0:makeIdx);
  renderOp(progress(opTrack));
  back.classList.toggle('is-on', scrollY>heroEl.offsetHeight-vh()*0.6 && scrollY<opTrack.offsetTop-vh()*0.5);
  fab.classList.toggle('is-on', small() || scrollY>heroEl.offsetHeight-vh());
}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});
addEventListener('resize',onScroll);
if(small()) makeItems.forEach((it,i)=>it.querySelector('.make__b').addEventListener('click',()=>setMake(i)));

/* ---------- enter gate ---------- */
const words=$('#enter').dataset.words.split('|'); let wi=0;
const wInt=setInterval(()=>{ if(entered){clearInterval(wInt);return;} wi=(wi+1)%words.length; $('#enter-word').textContent=words[wi]; },900);
/* gate waits for a click (reference has no auto-entry) and blocks scroll until then */
document.body.classList.add('lock'); if(window.__lenis)window.__lenis.stop();
function enter(withSound,instant){ if(entered)return; entered=true; soundOn=withSound; syncSound();
  document.body.classList.remove('lock'); if(window.__lenis)window.__lenis.start();
  if(withSound&&window.MCSnd){ MCSnd.enable(true); MCSnd.tune(); MCSnd.charge(1.05); }
  const charged=!instant&&window.Dial&&Dial.release();
  const offAt=charged?1250:0;
  setTimeout(()=>{ $('#enter').classList.add('is-off'); $('.veil').classList.add('is-off'); },offAt);
  setTimeout(()=>{ $('#enter').hidden=true; $('.veil').hidden=true; if(window.Dial)Dial.stop(); },offAt+480);
  onScroll();
}
$('.enter__go').addEventListener('click',()=>enter(true));
$('.enter__mute').addEventListener('click',()=>enter(false));

/* ---------- sound dock ---------- */
function syncSound(){ const b=$('#dock-sound'); b.setAttribute('aria-pressed',String(soundOn)); b.querySelector('.dock__st').textContent=soundOn?'Sound on':'Sound off'; b.classList.toggle('is-on',soundOn); }
$('#dock-sound').addEventListener('click',()=>{ soundOn=!soundOn; syncSound(); if(window.MCSnd) MCSnd.enable(soundOn); const vv=$('#viewer-frame video'); if(vv) vv.muted=!soundOn; });
syncSound();

/* ---------- menu / view / full ---------- */
const menu=$('#menu');
function openMenu(){ menu.hidden=false; requestAnimationFrame(()=>menu.classList.add('is-on')); $$('.bar__menu,.back__menu').forEach(b=>b.setAttribute('aria-expanded','true')); }
function closeMenu(){ if(menu.hidden)return; menu.classList.remove('is-on'); $$('.bar__menu,.back__menu').forEach(b=>b.setAttribute('aria-expanded','false')); setTimeout(()=>menu.hidden=true,300); }
$$('.bar__menu,.back__menu').forEach(b=>b.addEventListener('click',openMenu));
$('.menu__x').addEventListener('click',closeMenu);
const full=$('#full');
function setView(v){ $$('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));
  if(v==='full'){ full.hidden=false; requestAnimationFrame(()=>full.classList.add('is-on')); document.body.classList.add('lock'); if(window.__lenis)window.__lenis.stop();
    if(window.MCSnd&&soundOn) MCSnd.open();
    startFlow(); setTimeout(()=>{ full.classList.add('is-up'); layoutFull(); selectFull(fullSel); },450); }
  else { full.classList.remove('is-on','is-up'); document.body.classList.remove('lock'); if(window.__lenis)window.__lenis.start(); setTimeout(()=>full.hidden=true,420); }
  closeMenu();
}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));

/* full ring layout */
let fullSel=0, fullRot=0;
function ringGeom(){ const w=innerWidth,h=innerHeight; return {cx:w/2, cy:h*0.47, rx:Math.min(w*0.26,400), ry:Math.min(h*0.37,340)}; }
const SLOT0=-58, SLOTSTEP=360/(FULL.length+1);
function layoutFull(){ if(small())return; const {cx,cy,rx,ry}=ringGeom();
  fullItems.forEach((a,i)=>{ const deg=SLOT0 + fullRot + SLOTSTEP*(i+1), ang=deg*Math.PI/180;
    const x=cx+rx*Math.cos(ang), y=cy+ry*Math.sin(ang), left=Math.cos(ang)<0;
    a.dataset.side=left?'l':'r';
    a.style.left=x+'px'; a.style.top=y+'px';
    a.style.transform=left?'translate(-100%,-50%)':'translate(0,-50%)';
    a.dataset.ang=deg;
  });
  const gang=(SLOT0 + fullRot)*Math.PI/180;
  fullGroup.style.left=(cx+rx*Math.cos(gang))+'px'; fullGroup.style.top=(cy+ry*Math.sin(gang))+'px';
  fullGroup.style.transform=Math.cos(gang)<0?'translate(-100%,-50%)':'translate(0,-50%)';
  drawDial();
}
const fwin=$('#full-win'), fimg=$('.full__img',fwin), fvid=$('.full__v',fwin);
function selectFull(i){ fullSel=i; const p=FULL[i];
  fullItems.forEach((a,j)=>a.classList.toggle('is-on',j===i));
  $('#full-hs').textContent=p.what;
  if(p.film){ fvid.src=p.film; fvid.poster=p.poster||''; fimg.style.opacity=0; fvid.style.opacity=1; fwin.classList.add('is-on'); fvid.play().catch(()=>{}); }
  else if(p.poster){ fvid.pause(); fvid.removeAttribute('src'); fvid.style.opacity=0; fimg.src=p.poster; fimg.style.opacity=1; fwin.classList.add('is-on'); }
  else fwin.classList.remove('is-on');
  drawDial();
}
const dialCv=$('.full__dial'), dialCtx=dialCv.getContext('2d');
function drawDial(){ if(small()||full.hidden)return; const w=dialCv.width=innerWidth,h=dialCv.height=innerHeight; const {cx,cy,rx,ry}=ringGeom();
  dialCtx.clearRect(0,0,w,h); dialCtx.save(); dialCtx.translate(cx,cy); dialCtx.scale(1,ry/rx);
  for(let a=0;a<360;a+=3){ const r=a*Math.PI/180, long=a%15===0, R=Math.min(innerWidth,innerHeight)*0.37;
    dialCtx.strokeStyle='rgba(242,242,239,.16)'; dialCtx.lineWidth=1;
    dialCtx.beginPath(); dialCtx.moveTo(Math.cos(r)*R,Math.sin(r)*R); dialCtx.lineTo(Math.cos(r)*(R+(long?9:5)),Math.sin(r)*(R+(long?9:5))); dialCtx.stroke(); }
  const sa=(parseFloat(fullItems[fullSel]?.dataset.ang||-58))*Math.PI/180, R=Math.min(innerWidth,innerHeight)*0.37;
  dialCtx.strokeStyle='#fb5e28'; dialCtx.lineWidth=2;
  dialCtx.beginPath(); dialCtx.moveTo(Math.cos(sa)*(R-3),Math.sin(sa)*(R-3)); dialCtx.lineTo(Math.cos(sa)*(R+12),Math.sin(sa)*(R+12)); dialCtx.stroke();
  dialCtx.restore();
}
/* flow particle ring (own 2D rendition of the reference WebGL flow) */
const flowCv=$('.full__flow'), flowCtx=flowCv.getContext('2d'); let flowT0=0, flowRun=false;
const flowP=Array.from({length:850},()=>({a:Math.random()*6.283, r:0.94+Math.random()*0.12, s:0.15+Math.random()*0.5, l:0.5+Math.random()*1.6, o:Math.random()<0.14?'#fb5e28':(Math.random()<0.5?'242,242,239':'154,160,170')}));
function startFlow(){ if(small())return; flowRun=true; flowT0=performance.now();
  (function tick(now){ if(!flowRun||full.hidden)return; const t=(now-flowT0)/1000;
    const w=flowCv.width=innerWidth,h=flowCv.height=innerHeight, cx=w/2, cy=h*0.47, R=Math.min(w,h)*0.365;
    const fade=t<0.25? t/0.25 : Math.max(0,1-(t-0.7)/1.1);
    flowCtx.clearRect(0,0,w,h);
    if(fade<=0){ flowRun=false; return; }
    flowP.forEach(p=>{ const a=p.a + t*0.05*p.s, r=R*p.r, x=cx+Math.cos(a)*r*1.12, y=cy+Math.sin(a)*r;
      const tx=-Math.sin(a), ty=Math.cos(a)*0.9, L=p.l*10;
      flowCtx.strokeStyle=p.o==='#fb5e28'?`rgba(251,94,40,${0.75*fade})`:`rgba(${p.o},${0.5*fade})`;
      flowCtx.lineWidth=1.1; flowCtx.beginPath(); flowCtx.moveTo(x,y); flowCtx.lineTo(x+tx*L,y+ty*L); flowCtx.stroke(); });
    requestAnimationFrame(tick); })(flowT0);
}
let dragX=null;
full.addEventListener('pointerdown',e=>{dragX=e.clientX;});
addEventListener('pointermove',e=>{ if(dragX!==null&&!full.hidden&&!small()){ fullRot+=(e.clientX-dragX)*0.05; dragX=e.clientX; layoutFull(); }});
addEventListener('pointerup',()=>dragX=null);
full.addEventListener('wheel',e=>{ if(!small()){ e.preventDefault(); fullRot+=e.deltaY*0.01; layoutFull(); } },{passive:false});

/* ---------- viewer ---------- */
const viewer=$('#viewer');
function openViewer(p){ const fr=$('#viewer-frame'); fr.innerHTML='';
  if(p.film){ const v=document.createElement('video'); v.src=p.film; v.poster=p.poster||''; v.controls=true; v.autoplay=true; v.muted=!soundOn; v.playsInline=true; fr.appendChild(v); }
  else if(p.poster){ const im=document.createElement('img'); im.src=p.poster; im.alt=p.title; fr.appendChild(im); }
  $('#viewer-t').textContent=p.title; $('#viewer-label').textContent=p.label||p.meta||''; $('#viewer-w').textContent=p.what||'';
  viewer.hidden=false; requestAnimationFrame(()=>viewer.classList.add('is-on')); document.body.classList.add('lock'); if(window.__lenis)window.__lenis.stop();
}
function closeViewer(){ viewer.classList.remove('is-on'); document.body.classList.remove('lock'); if(window.__lenis)window.__lenis.start(); setTimeout(()=>{ viewer.hidden=true; $('#viewer-frame').innerHTML=''; },300); }
$('#viewer-x').addEventListener('click',closeViewer);
viewer.addEventListener('click',e=>{ if(e.target===viewer) closeViewer(); });
addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeViewer(); closeMenu(); if(!full.hidden) setView('featured'); }});

/* ---------- op again / motion ---------- */
$('#op-again').addEventListener('click',()=>goTo(opTrack.offsetTop+2));
$('#motion-sw').addEventListener('click',function(){ motionOn=!motionOn; this.setAttribute('aria-pressed',String(motionOn)); document.body.classList.toggle('still',!motionOn);
  if(!motionOn&&window.__lenis){window.__lenis.destroy();window.__lenis=null;} });

/* ---------- custom cursor ---------- */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){ document.documentElement.classList.add('cur-on'); const cur=$('.cur'); let x=0,y=0,cx=0,cy=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;
    const watch=e.target.closest('.gate__frame,.make__win,.make__mw,.full__it');
    const link=e.target.closest('a,button');
    cur.dataset.mode=watch?'watch':(link?'link':'dot');
  });
  (function loop(){ requestAnimationFrame(loop); cx+=(x-cx)*.2; cy+=(y-cy)*.2; cur.style.transform=`translate(${cx}px,${cy}px)`; })();
}
onScroll();

/* ---------- enter-gate dial (traced mechanism, SKHILADZE-ENGINE §A) ----------
   Static ring: load sweep -> words/panes appear; charge sweep after release;
   tick ring 2deg steps; hover sector lit lerp .14 / neighbour glow .32 (tau .22);
   beat rings 2400ms while waiting; flock of poster-cell birds flies to the bar mark. */
window.Dial=(function(){
  const cv=$('#dial-cv'); if(!cv) return {release:()=>false,stop:()=>{}};
  const ctx=cv.getContext('2d');
  const WORDS=['WEBSITES',...($('#enter').dataset.words||'').split('|').map(s=>s.toUpperCase())].slice(0,12);
  const O=WORDS.length, TAU=Math.PI*2, TOP=-Math.PI/2;
  const PANES=['cafe','citypaws','queens','mayuri','moonmelt','stoneforge','kapiloka','velmara','darkhorse','nursery','vivant','zarnika'];
  const EXT={zarnika:'.png'};
  const imgs=PANES.map(s=>{ const im=new Image(); im.src='media/posters/'+s+(EXT[s]||'.jpg'); return im; });
  const avgCol=PANES.map(()=>null);
  imgs.forEach((im,i)=>{ im.onload=()=>{ try{ const c=document.createElement('canvas'); c.width=c.height=8; const x=c.getContext('2d'); x.drawImage(im,0,0,8,8); const d=x.getImageData(0,0,8,8).data; let r=0,g=0,b=0; for(let j=0;j<d.length;j+=4){r+=d[j];g+=d[j+1];b+=d[j+2];} const n=d.length/4; avgCol[i]=[r/n|0,g/n|0,b/n|0]; }catch(e){} }; });
  let W=0,H=0,DPR=1, running=true, released=false, chargeT0=0, birds=[], flockAt=0;
  const t0=performance.now();
  const segs=WORDS.map((w,i)=>({w, a:TOP+i*TAU/O, lit:0, glow:0, at:-1, hit:-1}));
  const ee=segs.map((s,i)=>{ const n=segs[(i+1)%O]; let a=(s.a+n.a)/2; if(i===O-1)a=(s.a+n.a+TAU)/2; return a; });
  let hover=-1, pointer={x:0,y:0,on:false};
  const ot=new Float32Array(180);
  function geom(){
    const small=Math.min(innerWidth,innerHeight)<560;
    const sz=small?9:12, tlH=small?9:12, gapW=small?9:16, gap=small?14:18;
    ctx.font='500 '+sz+'px "Martian Grotesk",sans-serif';
    let sum=0; const widths=segs.map(s=>{ let w=0; for(const ch of s.w) w+=ctx.measureText(ch).width+sz*.2; w-=sz*.2; s.sw=w; sum+=w; return w; });
    const minR=(sum+O*gap)/TAU-(tlH+gapW+sz/2);
    const cx=W/2, cy=H*.44;
    let R=small? Math.max(minR, Math.min(innerWidth,innerHeight)*.19) : Math.min(300, Math.max(96, Math.min(innerWidth,innerHeight)*.3));
    R=Math.max(small?56:70, Math.min(R, Math.min(cx,W-cx,cy,H-cy)-(small?49:73)));
    return {small,sz,tlH,gapW,cx,cy,R, rw:R+tlH+gapW+sz/2};
  }
  function size(){ DPR=Math.min(2,devicePixelRatio||1); W=innerWidth; H=innerHeight; cv.width=W*DPR; cv.height=H*DPR; }
  size(); addEventListener('resize',size);
  const enterEl=$('#enter');
  enterEl.addEventListener('pointermove',e=>{ pointer={x:e.clientX,y:e.clientY,on:true};
    const g=geom(); const dx=e.clientX-g.cx, dy=e.clientY-g.cy, d=Math.hypot(dx,dy);
    hover=-1;
    if(d>g.rw-40){ let a=Math.atan2(dy,dx); if(a<TOP)a+=TAU;
      for(let i=0;i<O;i++){ let a0=segs[i].a, a1=a0+TAU/O; if(a>=a0&&a<a1){ hover=i; break; } } }
  });
  enterEl.addEventListener('pointerleave',()=>{ pointer.on=false; hover=-1; });
  const clamp01=v=>Math.max(0,Math.min(1,v));
  const sstep=(a,b,x)=>{ const t=clamp01((x-a)/(b-a)); return t*t*(3-2*t); };
  const eio=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const eco=t=>1-Math.pow(1-t,3);
  function loadAt(now){ return sstep(920,2420,now-t0); }
  function frame(now){
    if(!running) return; requestAnimationFrame(frame);
    const dt=1/60, g=geom(), load=loadAt(now);
    const charge=released? eio(clamp01((now-chargeT0)/1050)) : 0;
    const gate=(!released&&load>=1)? clamp01((now-(t0+2420))/420) : (released? Math.max(0,1-(now-chargeT0)/240) : 0);
    ctx.setTransform(DPR,0,0,DPR,0,0); ctx.clearRect(0,0,W,H);
    const Ft=g.small?.19:.165;
    /* panes */
    segs.forEach((s,i)=>{
      const target=(hover===i)?1:0;
      s.lit+=(target-s.lit)*(1-Math.exp(-dt/.14));
      const nb=(hover>=0&&(i===(hover+1)%O||i===(hover+O-1)%O))?.32:0;
      s.glow+=(Math.max(nb,target)-s.glow)*(1-Math.exp(-dt/.22));
      const u=(s.a-TOP)/TAU;
      const appear=sstep(u,u+.02,load);
      if(appear<=0&&s.lit<.01) return;
      const ye=now-(t0+920+u*1500);
      const pulse=ye>0&&ye<900? sstep(0,60,ye)*(1-sstep(160,900,ye)):0;
      let tn=Math.max( Ft*appear*(.3+.7*sstep(0,300,Math.max(0,ye))), Ft+(.94-Ft)*s.lit, .62*pulse );
      tn=Math.min(1,tn);
      if(tn<.004) return;
      const a0=ee[(i+O-1)%O]-(i===0?0:0), a1=ee[i];
      const start=(i===0)? TOP-TAU/O/2 : ee[i-1], end=ee[i];
      const im=imgs[i%imgs.length]; if(!im.complete||!im.naturalWidth) return;
      const rIn=g.rw+4, rOut=g.rw+88, mid=(start+end)/2, rm=(rIn+rOut)/2;
      const px=g.cx+Math.cos(mid)*rm + (pointer.on? Math.max(-9,Math.min(9,(pointer.x-g.cx)*.025))*s.lit:0);
      const py=g.cy+Math.sin(mid)*rm + (pointer.on? Math.max(-9,Math.min(9,(pointer.y-g.cy)*.025))*s.lit:0);
      ctx.save();
      ctx.beginPath(); ctx.arc(g.cx,g.cy,rOut,start,end); ctx.arc(g.cx,g.cy,rIn,end,start,true); ctx.closePath(); ctx.clip();
      ctx.translate(px,py); ctx.rotate(mid+Math.PI/2);
      const arcLen=(end-start)*rm, iw=arcLen*1.06, ih=iw*9/16;
      ctx.globalAlpha=tn;
      const sat=.62+.38*Math.max(s.lit,pulse), br=.86+.14*Math.max(s.lit,pulse);
      ctx.filter='saturate('+sat.toFixed(2)+') brightness('+br.toFixed(2)+')';
      ctx.drawImage(im,-iw/2,-ih/2,iw,ih);
      ctx.restore(); ctx.globalAlpha=1; ctx.filter='none';
    });
    /* threads */
    ctx.strokeStyle='rgba(242,242,239,.22)'; ctx.lineWidth=1; ctx.beginPath();
    ee.forEach(a=>{ ctx.moveTo(g.cx+Math.cos(a)*(g.rw+3), g.cy+Math.sin(a)*(g.rw+3)); ctx.lineTo(g.cx+Math.cos(a)*(g.rw+90), g.cy+Math.sin(a)*(g.rw+90)); });
    ctx.stroke();
    /* concentric echo arcs */
    [1.42,1.95,2.68,3.68,5.05].forEach((m,ri)=>{ if(load<1)return;
      const rr=g.R*m*.36; if(rr>g.rw*1.7) return;
      ctx.strokeStyle='rgba(242,242,239,'+(0.10-0.013*ri)+')'; ctx.beginPath(); ctx.arc(g.cx,g.cy,g.rw+10+ri*16,0,TAU); ctx.stroke(); });
    /* tick ring */
    for(let k=0;k<180;k++){
      const deg=k*2, a=TOP+deg*Math.PI/180, frac=deg/360;
      const major=deg%30===0, base=g.small?(major?9:5):(major?12:7);
      let dAng=a-(pointer.on?Math.atan2(pointer.y-g.cy,pointer.x-g.cx):0); dAng=Math.atan2(Math.sin(dAng),Math.cos(dAng));
      const pdist=pointer.on?Math.hypot(pointer.x-g.cx,pointer.y-g.cy):1e9;
      const dentT=pointer.on? gate*(1-sstep(g.R*.4,g.R*2.4,Math.abs(pdist-g.R))*.75)*Math.exp(-Math.pow(dAng/.32,2)) : 0;
      ot[k]+=(dentT-ot[k])*.2; if(!pointer.on) ot[k]*=.85;
      let len=base+(g.small?6:9)*ot[k];
      let col,alpha;
      if(released&&frac<=charge){ col='251,94,40'; alpha=1; }
      else if(frac<=load){ col='242,242,239'; alpha=.62; }
      else { col='242,242,239'; alpha=.16; }
      ctx.strokeStyle='rgba('+col+','+alpha+')'; ctx.lineWidth=(released&&frac<=charge)?1.4:1;
      ctx.beginPath();
      ctx.moveTo(g.cx+Math.cos(a)*g.R, g.cy+Math.sin(a)*g.R);
      ctx.lineTo(g.cx+Math.cos(a)*(g.R+len), g.cy+Math.sin(a)*(g.R+len));
      ctx.stroke();
    }
    /* beat rings while waiting */
    if(gate>0&&!released){ const ph=((now-(t0+2420))%2400)/2400;
      [0,.62].forEach((off,bi)=>{ const p=(ph+off)%1, rr=7+(g.small?30:40)*eco(p);
        ctx.strokeStyle='rgba(251,94,40,'+(Math.pow(1-p,1.6)*gate*(bi?.34:1)*.9).toFixed(3)+')'; ctx.lineWidth=1.2;
        ctx.beginPath(); ctx.arc(g.cx, g.cy-g.R-(g.small?2.5:3.5), rr, 0, TAU); ctx.stroke(); }); }
    /* words */
    ctx.textAlign='center'; ctx.textBaseline='middle';
    segs.forEach((s,i)=>{
      const u=(s.a-TOP)/TAU;
      if(load<u) return;
      if(s.at<0) s.at=now;
      if(released&&charge>=u&&s.hit<0){ s.hit=now; if(window.MCSnd&&soundOn) MCSnd.mark(i); }
      const rev=clamp01((now-s.at)/420);
      const hn=s.hit>=0? Math.exp(-(now-s.hit)/380):0;
      const alpha=(.35+.55*rev+.1*hn)*(hover===i?1:.85)+ .1*s.lit;
      const rC=Math.round(242+(251-242)*hn), gC=Math.round(242+(94-242)*hn), bC=Math.round(239+(40-239)*hn);
      ctx.save(); ctx.translate(g.cx+Math.cos(s.a)*g.rw, g.cy+Math.sin(s.a)*g.rw); ctx.rotate(s.a+Math.PI/2);
      ctx.font='500 '+g.sz+'px "Martian Grotesk",sans-serif';
      let txt=s.w;
      if(rev<1){ const n=Math.floor(s.w.length*rev); txt=s.w.slice(0,n)+s.w.slice(n).split('').map((c,j)=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[(Math.floor(now/55)*7+j*13)%36]).join(''); }
      ctx.fillStyle='rgba('+rC+','+gC+','+bC+','+Math.min(1,alpha).toFixed(3)+')';
      ctx.fillText(txt.split('').join(' '),0,0);
      ctx.restore();
    });
    /* centre label */
    if(gate>0){ ctx.font='500 '+(g.small?10.5:11.5)+'px "Martian Grotesk",sans-serif';
      ctx.fillStyle='rgba(242,242,239,'+(gate*.9).toFixed(3)+')';
      ctx.fillText((soundOn?'CLICK TO TUNE IN':'CLICK TO ENTER').split('').join(' '), g.cx, g.cy-g.R+(g.small?18:26)); }
    /* flock birds (after release, from 360ms) */
    if(released&&now>=flockAt&&birds.length){
      const mark=$('.bar__mark'); const mr=mark?mark.getBoundingClientRect():{left:W/2,top:20,width:60,height:20};
      const tx=mr.left+mr.width/2, ty=mr.top+mr.height/2;
      let alive=false;
      birds.forEach(b=>{
        const t=now-flockAt-b.d; if(t<0){ alive=true; return; }
        const u=clamp01(t/b.D); if(u<1) alive=true;
        const ft=sstep(0,.26,u)*(1-sstep(.74,1,u));
        const bx=(1-ft)* (b.sx+(b.tx-b.sx)*u) + ft*( Math.pow(1-u,3)*b.sx + 3*Math.pow(1-u,2)*u*b.p1x + 3*(1-u)*u*u*b.p2x + Math.pow(u,3)*b.tx );
        const by=(1-ft)* (b.sy+(b.ty-b.sy)*u) + ft*( Math.pow(1-u,3)*b.sy + 3*Math.pow(1-u,2)*u*b.p1y + 3*(1-u)*u*u*b.p2y + Math.pow(u,3)*b.ty );
        const flap=Math.sin(u*b.w*10+b.ph)*3;
        const fade=u>.9? 1-(u-.9)/.1 : 1;
        ctx.strokeStyle='rgba('+(b.c?b.c.join(','):'242,242,239')+','+(.9*fade).toFixed(2)+')'; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.moveTo(bx-5,by-flap); ctx.lineTo(bx,by+2); ctx.lineTo(bx+5,by-flap); ctx.stroke();
      });
      if(!alive) birds=[];
    }
  }
  requestAnimationFrame(frame);
  return {
    release(){ if(released) return false; released=true; chargeT0=performance.now(); flockAt=chargeT0+360;
      if(window.MCSnd&&soundOn) MCSnd.press();
      /* build birds from pane ring */
      const g=geom(); const mark=$('.bar__mark'); const mr=mark?mark.getBoundingClientRect():{left:W/2,top:20,width:60,height:20};
      const tx=mr.left+mr.width/2, ty=mr.top+mr.height/2;
      birds=[];
      for(let i=0;i<110;i++){ const a=Math.random()*TAU, r=g.rw+20+Math.random()*60;
        const w=Math.random();
        birds.push({ sx:g.cx+Math.cos(a)*r, sy:g.cy+Math.sin(a)*r, tx, ty,
          p1x:g.cx-W*.06, p1y:Math.max(H*.08, g.cy-H*.42), p2x:tx+Math.min(W*.3, W*.08), p2y:ty+H*.035,
          d:30+300*w+170+ (Math.random()*50-25), D:880+(Math.random()*170-85), w:19+8*Math.random(), ph:Math.random()*TAU,
          c:avgCol[i%avgCol.length] }); }
      return true; },
    stop(){ running=false; }
  };
})();
