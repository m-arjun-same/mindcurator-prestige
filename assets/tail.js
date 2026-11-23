/* MindCurator Prestige — tail interactions (rebuild 2026-11-23): reveals, FAQ, process progress, form */
'use strict';
(function(){
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });},{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(el){ io.observe(el); });
  } else { rv.forEach(function(el){ el.classList.add('in'); }); }

  document.querySelectorAll('.t-faq-it').forEach(function(it){
    var q=it.querySelector('.t-faq-q'), a=it.querySelector('.t-faq-a');
    q.addEventListener('click',function(){
      var open=it.classList.toggle('open');
      q.setAttribute('aria-expanded',String(open));
      a.style.maxHeight=open? a.scrollHeight+'px' : '0px';
    });
  });

  var proc=document.querySelector('.t-proc'), fill=document.getElementById('t-prog-fill');
  if(proc&&fill){
    var upd=function(){
      var r=proc.getBoundingClientRect(), h=proc.offsetHeight-innerHeight;
      var p=h>0? Math.min(1,Math.max(0,-r.top/h)) : (r.top<0?1:0);
      fill.style.width=(p*100).toFixed(1)+'%';
    };
    addEventListener('scroll',function(){ requestAnimationFrame(upd); },{passive:true});
    addEventListener('resize',upd); upd();
  }

  var form=document.getElementById('t-form');
  if(form) form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(form);
    var lines=['New enquiry from the website:','Name: '+(d.get('name')||'')];
    if(d.get('business')) lines.push('Business: '+d.get('business'));
    if(d.get('phone')) lines.push('Phone/WhatsApp: '+d.get('phone'));
    lines.push('What I need: '+(d.get('need')||''));
    open('https://wa.me/919398359538?text='+encodeURIComponent(lines.join('\n')),'_blank');
  });
})();

/* tail v2: services scroll scene + parallax band */
(function(){
  var scene=document.getElementById('t-scene'); if(!scene) return;
  var panels=[].slice.call(scene.querySelectorAll('.t-panel'));
  var vids=[].slice.call(scene.querySelectorAll('.t-fv'));
  var dots=[].slice.call(scene.querySelectorAll('.t-dot'));
  var tab=document.getElementById('t-frame-tab');
  var TABS=['Mayuri Footwears · Showcase','CityPaws Grooming · Houston','Café Breizh · Las Vegas','Moonmelt Café · Night Café','Velmara · Fashion'];
  var cur=-1;
  function set(i){ if(i===cur) return; cur=i;
    panels.forEach(function(p,j){ p.classList.toggle('is-on',j===i); });
    dots.forEach(function(d,j){ d.classList.toggle('is-on',j===i); });
    vids.forEach(function(v,j){ v.classList.toggle('is-on',j===i); if(j===i){ if(!v.src&&v.dataset.src) v.src=v.dataset.src; if(v.src) v.play().catch(function(){}); } else v.pause(); });
    if(tab) tab.textContent=TABS[i];
  }
  var mobile=matchMedia('(max-width:760px)');
  function onScroll(){
    if(mobile.matches) return;
    var r=scene.getBoundingClientRect(), h=scene.offsetHeight-innerHeight;
    var p=h>0? Math.min(1,Math.max(0,-r.top/h)) : 0;
    set(Math.min(4,Math.floor(p*5)));
  }
  addEventListener('scroll',function(){ requestAnimationFrame(onScroll); },{passive:true});
  dots.forEach(function(d,i){ d.addEventListener('click',function(){
    var h=scene.offsetHeight-innerHeight;
    var y=scene.offsetTop + (i+0.5)*(h/5);
    if(window.__lenis) window.__lenis.scrollTo(y,{duration:1.1}); else scrollTo({top:y,behavior:'smooth'});
  }); });
  if('IntersectionObserver' in window){
    var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) set(panels.indexOf(e.target)); }); },{rootMargin:'-42% 0px -42% 0px'});
    panels.forEach(function(p){ io2.observe(p); });
    var band=document.querySelector('.t-band-v');
    if(band){ var io3=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ if(!band.src&&band.dataset.src){ band.src=band.dataset.src; band.play().catch(function(){}); } } else band.pause(); }); },{rootMargin:'300px'});
      io3.observe(band);
      var bandWrap=band.parentElement;
      addEventListener('scroll',function(){ requestAnimationFrame(function(){
        var r=bandWrap.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
        var p=(r.top+r.height/2-innerHeight/2)/innerHeight;
        band.style.transform='translateY('+(p*-26)+'px)';
      }); },{passive:true});
    }
  }
  onScroll(); set(0);
})();

/* tail v3: fan deal + CTA film */
(function(){
  var fan=document.getElementById('t-fan');
  if(fan && !matchMedia('(max-width:760px)').matches){
    var cards=[].slice.call(fan.querySelectorAll('.t-card'));
    var ROT=[-4,2.5,-1.5,3.5];
    function upd(){
      var r=fan.getBoundingClientRect(), h=fan.offsetHeight-innerHeight;
      var p=h>0? Math.min(1,Math.max(0,-r.top/h)) : 0;
      cards.forEach(function(c,i){
        var q=Math.min(1,Math.max(0,p*4-i));
        var e=1-Math.pow(1-q,3);
        var x=-375+i*250, y=(1-e)*115;
        c.style.transform='translate(calc(-50% + '+x+'px), calc(-50% + '+y+'%)) rotate('+(ROT[i]*e)+'deg)';
        c.style.opacity=e<=0? '0':'1';
      });
    }
    addEventListener('scroll',function(){ requestAnimationFrame(upd); },{passive:true});
    addEventListener('resize',upd); upd();
  }
  var cta=document.querySelector('.t-cta-v');
  if(cta && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(en){
      if(en.isIntersecting){ if(!cta.src&&cta.dataset.src) cta.src=cta.dataset.src; if(cta.src) cta.play().catch(function(){}); }
      else cta.pause();
    }); },{rootMargin:'200px'});
    io.observe(cta);
  }
})();
