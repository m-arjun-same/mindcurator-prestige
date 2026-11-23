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
