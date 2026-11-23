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
HERO.forEach((p,i)=>{
  const v=document.createElement('video');
  v.className='gate__v'+(i===0?' is-on':''); v.dataset.src=p.film; v.poster=p.poster;
  v.muted=true; v.loop=true; v.playsInline=true; v.preload='none'; v.setAttribute('aria-hidden','true');
  gf.appendChild(v);
  const row=document.createElement('div');
  row.className='gate__row'+(i===0?' is-on':'');
  row.innerHTML=`<span class="gate__tab"><b>${p.title}</b> <span>${p.label}</span></span><button class="gate__play" type="button" aria-label="Watch: ${p.title}"><span class="gate__pl" aria-hidden="true">${i===0?'Watch with sound':'Watch'}</span>${playSVG}</button>`;
  row.querySelector('.gate__play').addEventListener('click',()=>openViewer(p));
  gf.appendChild(row);
  const d=document.createElement('button');
  d.className='dots__b'; d.type='button'; d.setAttribute('aria-label',p.title);
  if(i===0)d.setAttribute('aria-current','true');
  d.addEventListener('click',()=>goTo(heroSeg(i)));
  dots.appendChild(d);
});
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

const fl=$('#full-list');
FULL.forEach(p=>{
  const li=document.createElement('li');
  const a=document.createElement('a');
  a.className='full__it'; a.href='#';
  a.innerHTML=`<span class="full__t">${p.title}</span><span class="full__m">${p.meta}</span>`;
  a.addEventListener('click',e=>{e.preventDefault();openViewer(p);});
  a.addEventListener('mouseenter',()=>showPreview(p));
  li.appendChild(a); fl.appendChild(li);
});

/* ---------- state ---------- */
let soundOn=false, entered=false, motionOn=!reduced;
const heroEl=$('.hero'), makeScene=$('.make__scene'), opTrack=$('.op-track');
const vh=()=>innerHeight;
function seg(el,k){const r=el.getBoundingClientRect();const top=r.top+scrollY;const h=el.offsetHeight-vh();return p=>top+ (h>0? (p/ (k)) *h : 0);}
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
let heroIdx=-1, makeIdx=-1, opState='';
function progress(el){ const r=el.getBoundingClientRect(); const h=el.offsetHeight-vh(); if(h<=0) return r.top<0?1:0; return Math.min(1,Math.max(0,-r.top/h)); }
function setHero(i){ if(i===heroIdx)return; heroIdx=i;
  gateVids.forEach((v,j)=>v.classList.toggle('is-on',j===i));
  gateRows.forEach((r,j)=>r.classList.toggle('is-on',j===i));
  dotBtns.forEach((d,j)=>{ if(j===i)d.setAttribute('aria-current','true'); else d.removeAttribute('aria-current'); });
  playOnly(gateVids,i);
}
function setMake(i){ if(i===makeIdx)return; makeIdx=i;
  makeItems.forEach((it,j)=>it.classList.toggle('is-on',j===i));
  makeWins.forEach((w,j)=>w.classList.toggle('is-on',j===i));
  playOnly($$('.make__win .make__v'),i);
  if(small()) playOnly($$('.make__item .make__v'),i);
}
const OP=JSON.parse($('#op-data').textContent).ch;
function setOp(p){ const fin=p>0.865; const idx=Math.min(5,Math.floor(p*6/0.865));
  const key=fin?'fin':idx; if(key===opState)return; opState=key;
  $('.op-stage').classList.toggle('fin',fin);
  $('#op-final').classList.toggle('is-on',fin);
  $('#op-chapter').classList.toggle('is-off',fin);
  $('#op-year').classList.toggle('is-off',fin);
  if(!fin){ $('#op-n').textContent=OP[idx].n+' / 06'; $('#op-ct').textContent=OP[idx].t; $('#op-cb').textContent=OP[idx].b; $('#op-year').textContent=OP[idx].n;
    const ch=$('#op-chapter'); ch.classList.remove('swap'); void ch.offsetWidth; ch.classList.add('swap'); }
}
const back=$('#back');
function onScroll(){
  setHero(Math.min(4,Math.floor(progress(heroEl)*5)));
  if(!small()) setMake(Math.min(5,Math.floor(progress(makeScene)*6))); else setMake(makeIdx<0?0:makeIdx);
  setOp(progress(opTrack));
  back.classList.toggle('is-on', scrollY>heroEl.offsetHeight-vh()*0.6 && scrollY<opTrack.offsetTop-vh()*0.5);
}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});
addEventListener('resize',onScroll);

/* make items clickable on mobile (unpinned) */
if(small()) makeItems.forEach((it,i)=>it.querySelector('.make__b').addEventListener('click',()=>setMake(i)));

/* ---------- enter gate ---------- */
const words=$('#enter').dataset.words.split('|'); let wi=0;
const wInt=setInterval(()=>{ if(entered){clearInterval(wInt);return;} wi=(wi+1)%words.length; $('#enter-word').textContent=words[wi]; },900);
function enter(withSound){ if(entered)return; entered=true; soundOn=withSound; syncSound();
  $('#enter').classList.add('is-off'); $('.veil').classList.add('is-off');
  setTimeout(()=>{ $('#enter').hidden=true; $('.veil').hidden=true; },480);
  onScroll();
}
$('.enter__go').addEventListener('click',()=>enter(true));
$('.enter__mute').addEventListener('click',()=>enter(false));
setTimeout(()=>enter(false),6000); /* loader failsafe */

/* ---------- sound dock ---------- */
function syncSound(){ const b=$('#dock-sound'); b.setAttribute('aria-pressed',String(soundOn)); b.querySelector('.dock__st').textContent=soundOn?'Sound on':'Sound off'; b.classList.toggle('is-on',soundOn); }
$('#dock-sound').addEventListener('click',()=>{ soundOn=!soundOn; syncSound(); const vv=$('#viewer-frame video'); if(vv) vv.muted=!soundOn; });
syncSound();

/* ---------- menu / view / full ---------- */
const menu=$('#menu');
function openMenu(){ menu.hidden=false; requestAnimationFrame(()=>menu.classList.add('is-on')); $$('.bar__menu,.back__menu').forEach(b=>b.setAttribute('aria-expanded','true')); }
function closeMenu(){ menu.classList.remove('is-on'); $$('.bar__menu,.back__menu').forEach(b=>b.setAttribute('aria-expanded','false')); setTimeout(()=>menu.hidden=true,300); }
$$('.bar__menu,.back__menu').forEach(b=>b.addEventListener('click',openMenu));
$('.menu__x').addEventListener('click',closeMenu);
const full=$('#full');
function setView(v){ $$('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));
  if(v==='full'){ full.hidden=false; requestAnimationFrame(()=>full.classList.add('is-on')); document.body.classList.add('lock'); if(window.__lenis)window.__lenis.stop(); }
  else { full.classList.remove('is-on'); document.body.classList.remove('lock'); if(window.__lenis)window.__lenis.start(); setTimeout(()=>full.hidden=true,420); }
  closeMenu();
}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
const fwin=$('#full-win'), fimg=$('.full__img',fwin);
function showPreview(p){ if(!p.poster){fwin.classList.remove('is-on');return;} fimg.src=p.poster; fwin.classList.add('is-on'); }
full.addEventListener('mousemove',e=>{ fwin.style.transform=`translate(${Math.min(innerWidth-420,e.clientX+36)}px,${Math.max(90,Math.min(innerHeight-300,e.clientY-120))}px)`; });

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
  if(!motionOn&&window.__lenis){window.__lenis.destroy();window.__lenis=null;} location.hash=''; });

/* ---------- canvases (own 2D fields: drifting rounded tiles / plane lines) ---------- */
function field(cv,mode){ const ctx=cv.getContext('2d'); let w,h,t=0;
  function size(){ const r=cv.parentElement.getBoundingClientRect(); w=cv.width=Math.max(2,r.width); h=cv.height=Math.max(2,r.height); } size(); addEventListener('resize',size);
  const tiles=[]; for(let i=0;i<48;i++) tiles.push({o:Math.random()*6.28,s:.5+Math.random()});
  (function draw(){ requestAnimationFrame(draw); if(!motionOn||cv.offsetParent===null&&mode!=='strip')return; t+=0.008;
    ctx.clearRect(0,0,w,h);
    if(mode==='line'){ ctx.strokeStyle='rgba(242,242,239,.028)'; ctx.beginPath(); for(let i=0;i<=8;i++){ const y=h*0.62+i*i*2.4; ctx.moveTo(0,y); ctx.lineTo(w,y);} for(let i=-6;i<=6;i++){ ctx.moveTo(w/2+i*w*0.045,h*0.62); ctx.lineTo(w/2+i*w*0.16,h);} ctx.stroke(); return; }
    const tw=Math.min(190,Math.max(74,w/7.5)), th=tw*0.6, cols=Math.ceil(w/tw)+1, rows=Math.ceil(h/th)+1;
    tiles.forEach((tl,i)=>{ const cx=i%cols, cy=(i/cols)|0; if(cy>=rows)return; const a=.007+.005*Math.sin(t*tl.s+tl.o); ctx.fillStyle=`rgba(242,242,239,${a})`;
      const x=cx*tw+tw*.14, y=cy*th+th*.14+Math.sin(t*.7+tl.o)*3;
      ctx.beginPath(); ctx.roundRect(x,y,tw*.72,th*.66,10); ctx.fill(); });
  })();
}
field($('.strip'),'strip'); field($('.make__field'),'tiles'); field($('.op-field'),'tiles'); field($('.op-line'),'line');
(function(){ const cv=$('.full__flow'); const ctx=cv.getContext('2d'); function size(){cv.width=innerWidth;cv.height=innerHeight; ctx.strokeStyle='rgba(242,242,239,.05)'; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.arc(innerWidth-140,innerHeight-120,60+i*44,0,6.29); ctx.stroke(); } } size(); addEventListener('resize',size); })();

/* ---------- custom cursor dot ---------- */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){ const cur=$('.cur'); let x=0,y=0,cx=0,cy=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;});
  (function loop(){ requestAnimationFrame(loop); cx+=(x-cx)*.2; cy+=(y-cy)*.2; cur.style.transform=`translate(${cx}px,${cy}px)`; })();
}
onScroll();
