/* MindCurator sound — own WebAudio engine following the traced mechanism:
   master comp(-14,3) -> gain .9 -> soft-clip shaper -> destination; generated
   2.6s IR reverb (send .32); pad chords; cue set scan/form/word/tune/charge/press/beat/open/tick. */
'use strict';
window.MCSnd=(function(){
  let ctx=null,master=null,verb=null,noiseBuf=null,on=false,padTimer=null,padNodes=[],beatTimer=null,chargeNodes=null;
  const Dn=m=>440*Math.pow(2,(m-69)/12);
  function build(){
    ctx=new (window.AudioContext||window.webkitAudioContext)();
    const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-14; comp.ratio.value=3; comp.connect(ctx.destination);
    const shaper=ctx.createWaveShaper(); const curve=new Float32Array(512);
    for(let i=0;i<512;i++){ const x=i/256-1, T=.85, a=Math.abs(x); curve[i]=(a<=T? x : Math.sign(x)*(T+.15*Math.tanh((a-T)/.15)))/2; }
    shaper.curve=curve; shaper.oversample='4x';
    const gOut=ctx.createGain(); gOut.gain.value=2; shaper.connect(gOut); gOut.connect(comp);
    const gIn=ctx.createGain(); gIn.gain.value=.5; gIn.connect(shaper);
    master=ctx.createGain(); master.gain.value=0; master.connect(gIn);
    // generated IR 2.6s, (1-t)^3.4 integrated noise
    const sr=ctx.sampleRate, len=Math.floor(sr*2.6), ir=ctx.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ const d=ir.getChannelData(ch); let v=0; for(let i=0;i<len;i++){ const t=i/len; v+=(Math.random()*2-1)*Math.pow(1-t,3.4)*.5; v*=.92; d[i]=v; } }
    const conv=ctx.createConvolver(); conv.buffer=ir; const send=ctx.createGain(); send.gain.value=.32;
    verb=ctx.createGain(); verb.gain.value=1; verb.connect(conv); conv.connect(send); send.connect(gIn);
    noiseBuf=ctx.createBuffer(1,sr,sr); const nd=noiseBuf.getChannelData(0); for(let i=0;i<sr;i++) nd[i]=Math.random()*2-1;
  }
  function env(g,t,peak,dur,atk){ g.gain.setValueAtTime(1e-4,t); g.gain.exponentialRampToValueAtTime(Math.max(peak,1e-4),t+(atk||.004)); g.gain.exponentialRampToValueAtTime(1e-4,t+dur); }
  function pan(node,p){ if(ctx.createStereoPanner){ const pn=ctx.createStereoPanner(); pn.pan.value=Math.max(-1,Math.min(1,p)); node.connect(pn); pn.connect(master); if(verb) pn.connect(verb); } else node.connect(master); }
  function noise(t,f0,f1,Q,peak,dur,type){ if(!ctx)return; const s=ctx.createBufferSource(); s.buffer=noiseBuf; s.loop=true;
    const f=ctx.createBiquadFilter(); f.type=type||'bandpass'; f.Q.value=Q; f.frequency.setValueAtTime(f0,t); f.frequency.exponentialRampToValueAtTime(Math.max(f1,1),t+dur);
    const g=ctx.createGain(); env(g,t,peak,dur); s.connect(f); f.connect(g); pan(g,0); s.start(t); s.stop(t+dur+.1); }
  function drop(t,f0,f1,peak,dur,type,drive){ if(!ctx)return; const o=ctx.createOscillator(); o.type=type||'sine'; o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(Math.max(f1,1),t+dur);
    const g=ctx.createGain(); env(g,t,peak,dur); o.connect(g); pan(g,0); o.start(t); o.stop(t+dur+.1); }
  function bell(t,midi,peak,dur,p){ if(!ctx)return; const f=Dn(midi);
    const car=ctx.createOscillator(); car.frequency.value=f; const mod=ctx.createOscillator(); mod.frequency.value=f*2.76;
    const mg=ctx.createGain(); mg.gain.setValueAtTime(f*3.4,t); mg.gain.exponentialRampToValueAtTime(f*.04,t+dur);
    mod.connect(mg); mg.connect(car.frequency); const g=ctx.createGain(); env(g,t,peak,dur); car.connect(g);
    const pn=ctx.createStereoPanner?ctx.createStereoPanner():null;
    if(pn){ pn.pan.value=p||0; g.connect(pn); pn.connect(master); const vs=ctx.createGain(); vs.gain.value=.55; pn.connect(vs); vs.connect(verb); }
    else g.connect(master);
    car.start(t); mod.start(t); car.stop(t+dur+.1); mod.stop(t+dur+.1); }
  /* pad: chords [[57,60,64],[53,57,60],[48,55,60],[55,59,62]]-12, every 3.871s */
  const CHORDS=[[57,60,64],[53,57,60],[48,55,60],[55,59,62]]; let chordI=0;
  function padChord(){ if(!ctx||!on)return; const t=ctx.currentTime+.05; padNodes.forEach(n=>{try{n.stop(t)}catch(e){}}); padNodes=[];
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=700; lp.Q.value=.4;
    const g=ctx.createGain(); g.gain.setTargetAtTime(.05,t,.8); lp.connect(g); g.connect(master);
    CHORDS[chordI%4].forEach(m=>{ const f=Dn(m-12);
      const saw=ctx.createOscillator(); saw.type='sawtooth'; saw.frequency.value=f; saw.detune.value=-7; const sg=ctx.createGain(); sg.gain.value=.33; saw.connect(sg); sg.connect(lp);
      const tri=ctx.createOscillator(); tri.type='triangle'; tri.frequency.value=f*2; tri.detune.value=6; const tg=ctx.createGain(); tg.gain.value=.33; tri.connect(tg); tg.connect(lp);
      saw.start(t); tri.start(t); saw.stop(t+4.4); tri.stop(t+4.4); padNodes.push(saw,tri); });
    chordI++; }
  /* background music: a real track, looped low (replaced the synth pads 2026-11-23, Buddy's order) */
  const music=new Audio('media/studio-music.mp3'); music.loop=true; music.volume=.32; music.preload='auto';
  function padStart(){ music.play().catch(()=>{}); }
  function padStop(){ music.pause(); }
  const SCALE=[57,60,62,64,67,69,72,74,76,79,81,84];
  return {
    get on(){return on;},
    enable(v){ on=v; if(v){ if(!ctx) build(); if(ctx.state==='suspended') ctx.resume();
        master.gain.setTargetAtTime(.9,ctx.currentTime,.15); padStart();
        const t=ctx.currentTime+.05; drop(t,880,880,.05,.5); drop(t+.09,1318.5,1318.5,.03,.6); }
      else if(ctx){ master.gain.setTargetAtTime(0,ctx.currentTime,.08); padStop(); this.beatStop(); } },
    word(i,ang){ if(!ctx||!on)return; const t=ctx.currentTime+.01; bell(t,SCALE[i%12],.05,.9,Math.cos(ang||0)*.7); drop(t,120,46,.14,.24); noise(t,5200,5200,1.5,.05,.012); },
    mark(i){ if(!ctx||!on)return; const t=ctx.currentTime+.01; bell(t,SCALE[i%12]-12,.07,.9,0); drop(t,150,55,.16,.22); },
    tick(k,side){ if(!ctx||!on)return; const t=ctx.currentTime+.005; const s=ctx.createBufferSource(); s.buffer=noiseBuf;
      const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=2600+Math.random()*2200; f.Q.value=3;
      const g=ctx.createGain(); env(g,t,.14*Math.min(1,(k||1)*1.6),.03); s.connect(f); f.connect(g); pan(g,(side||0)*.55); s.start(t); s.stop(t+.08); },
    tune(){ if(!ctx||!on)return; const t=ctx.currentTime+.01; this.beatStop();
      noise(t,2600,2600,.9,.12,.06); drop(t,84,34,.42,.6); bell(t+.003,45,.07,1.2,0);
      noise(t,420,3200,2.5,.09,.22); const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.setValueAtTime(Dn(45)*.93,t+.1); o.frequency.exponentialRampToValueAtTime(Dn(45),t+1.1);
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=3; lp.frequency.setValueAtTime(1800,t+.1); lp.frequency.exponentialRampToValueAtTime(380,t+1.2);
      const g=ctx.createGain(); g.gain.setValueAtTime(1e-4,t+.1); g.gain.exponentialRampToValueAtTime(.08,t+.28); g.gain.exponentialRampToValueAtTime(1e-4,t+1.3);
      o.connect(lp); lp.connect(g); g.connect(master); o.start(t+.1); o.stop(t+1.4); },
    charge(dur){ if(!ctx||!on)return; dur=dur||1.05; const t=ctx.currentTime+.01;
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=6; lp.frequency.setValueAtTime(260,t); lp.frequency.exponentialRampToValueAtTime(3800,t+dur);
      const g=ctx.createGain(); g.gain.setValueAtTime(1e-4,t); g.gain.exponentialRampToValueAtTime(.11,t+dur);
      const lfo=ctx.createOscillator(); lfo.frequency.setValueAtTime(6,t); lfo.frequency.exponentialRampToValueAtTime(22,t+dur);
      const lg=ctx.createGain(); lg.gain.value=.45; lfo.connect(lg); lg.connect(g.gain);
      lp.connect(g); g.connect(master); chargeNodes={g,lp};
      [[45,-10],[45,9],[52,0],[33,0]].forEach(([m,d])=>{ const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.value=Dn(m); o.detune.value=d; o.connect(lp); o.start(t); o.stop(t+dur+.7); });
      lfo.start(t); lfo.stop(t+dur+.1);
      setTimeout(()=>{ if(!ctx)return; const n=ctx.currentTime; g.gain.setTargetAtTime(1e-4,n,.08); },dur*1000+600); },
    press(){ if(!ctx||!on)return; const t=ctx.currentTime+.01,g=.36;
      noise(t,500,5200,1.2,.09,g); drop(t,110,52,.12,g*.9,'sawtooth'); },
    beatStart(){ if(!ctx||!on||beatTimer)return; const hit=()=>{ if(!ctx||!on)return; const t=ctx.currentTime+.01;
        drop(t,74,36,.42,.42); drop(t+.19,74,36,.42*.58,.42*.58); bell(t+.01,81,.02,.9,0); };
      hit(); beatTimer=setInterval(hit,2400); },
    beatStop(){ clearInterval(beatTimer); beatTimer=null; },
    open(){ if(!ctx||!on)return; const t=ctx.currentTime+.01; drop(t,70,28,.42,1.6); noise(t,240,1900,2.2,.13,.15);
      [33,40,45,48,52].forEach(m=>{ drop(t+.05,Dn(m),Dn(m),.07,2.4,'sawtooth'); }); },
    away(){ if(!ctx||!on)return; const t=ctx.currentTime+.01; noise(t,2600,180,1.2,.08,.9); drop(t+.05,130,32,.22,1); }
  };
})();
