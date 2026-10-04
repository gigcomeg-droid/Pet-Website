(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hd=d.querySelector('.site-header'),bar=d.querySelector('.progress span');
  var mb=d.querySelector('.menu-btn'),mp=d.querySelector('.mobile-panel');
  if(mb&&mp){mb.addEventListener('click',function(){var o=mp.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
    mp.addEventListener('click',function(e){if(e.target.closest('a')){mp.classList.remove('open');mb.setAttribute('aria-expanded','false');}});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&mp.classList.contains('open')){mp.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.focus();}});}
  /* split headings into words (text is unchanged) */
  [].forEach.call(d.querySelectorAll('[data-split]'),function(el){
    var full=el.textContent.trim(),words=full.split(/\s+/);el.textContent='';var hv=d.createElement('span');hv.className='vh';hv.textContent=full;el.appendChild(hv);
    words.forEach(function(w,i){var o=d.createElement('span');o.className='w';o.setAttribute('aria-hidden','true');var n=d.createElement('span');n.style.setProperty('--wi',i);n.textContent=w;o.appendChild(n);el.appendChild(o);if(i<words.length-1)el.appendChild(d.createTextNode(' '));});
    el.classList.add('splitting');});
  function count(el){
    var t=el.textContent,m=t.match(/[\d,]+/);if(!m||reduce)return;
    var end=parseInt(m[0].replace(/,/g,''),10),t0=null,dur=1000;
    el.setAttribute('aria-label',t);
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3),v=Math.round(end*e);
      el.textContent=t.replace(m[0],v.toLocaleString('en-US'));if(p<1)requestAnimationFrame(step);else el.textContent=t;}
    requestAnimationFrame(step);
  }
  var els=[].slice.call(d.querySelectorAll('.rv,.clip,.steps,.stat,.splitting'));
  if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in')});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;
      var e=en.target;e.classList.add('in');if(e.classList.contains('stat'))e.classList.add('pulse');
      if(e.hasAttribute('data-count'))count(e);e.querySelectorAll('[data-count]').forEach(count);io.unobserve(e);});},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e)});

    /* every section's own animations (loops, arrows, shines) wait until it is on screen */
    var blocks=[].slice.call(d.querySelectorAll('section,.hero,.closing,.marquee-wrap,footer'));
    var vio=new IntersectionObserver(function(es){es.forEach(function(en){en.target.classList.toggle('vis',en.isIntersecting)})},{threshold:0,rootMargin:'0px 0px -8% 0px'});
    blocks.forEach(function(b){vio.observe(b)});}
  /* column highlight on the comparison table */
  var cmp=d.querySelector('.cmp');
  if(cmp){var cols=function(i){[].forEach.call(cmp.querySelectorAll('tr'),function(r){[].forEach.call(r.children,function(c,j){c.classList.toggle('hl',i>0&&j===i)})})};
    cmp.addEventListener('mouseover',function(e){var c=e.target.closest('td,th');if(c)cols(c.cellIndex)});
    cmp.addEventListener('mouseleave',function(){cols(-1)});
    cmp.addEventListener('focusin',function(e){var c=e.target.closest('td,th');if(c)cols(c.cellIndex)});
    cmp.addEventListener('focusout',function(){cols(-1)});
    [].forEach.call(cmp.querySelectorAll('td'),function(c){c.tabIndex=0});}
  /* card spotlight follows the pointer */
  d.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});
  /* scroll spy */
  var map={why:'why',who:'who',packages:'packages',compare:'packages',pricing:'packages','their-care':'their-care',interruption:'their-care',cyber:'cyber',benefit:'benefit',how:'how'};
  var links=[].slice.call(d.querySelectorAll('.nav a'));
  if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var k=map[en.target.id];
      links.forEach(function(a){var on=a.getAttribute('href')==='#'+k;a.classList.toggle('cur',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});});},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var s=d.getElementById(id);if(s)so.observe(s);});}
  /* typewriter for the closing screen: starts when the screen appears, replays on re-entry */
  var tys=[].slice.call(d.querySelectorAll('[data-type]')),closing=d.querySelector('.closing');
  if(tys.length&&!reduce&&'IntersectionObserver' in window&&closing){
    tys.forEach(function(el){var t=el.textContent.trim();el.textContent='';
      var vh=d.createElement('span');vh.className='vh';vh.textContent=t;
      var g=d.createElement('span');g.className='ty-ghost';g.setAttribute('aria-hidden','true');g.textContent=t;
      var l=d.createElement('span');l.className='ty-live';l.setAttribute('aria-hidden','true');
      el.appendChild(vh);el.appendChild(g);el.appendChild(l);el._t=t;el._l=l;});
    var run=0,ready=true,timers=[];
    function later(fn,ms){timers.push(setTimeout(fn,ms));}
    function reset(){run++;timers.forEach(clearTimeout);timers=[];closing.classList.remove('slogan-go');tys.forEach(function(el){el._l.textContent='';el._l.classList.remove('typing');});}
    function typeEl(el,next,id){var t=el._t,l=el._l,sp=parseInt(el.getAttribute('data-type'),10)||40,i=0;l.classList.add('typing');
      (function tick(){if(id!==run)return;i++;l.textContent=t.slice(0,i);
        if(i<t.length){var ch=t.charAt(i-1);later(tick,sp+(/[.,]/.test(ch)?200:0)+Math.random()*sp*.4);}
        else{later(function(){l.classList.remove('typing')},next?150:900);if(next)later(next,350);}})();}
    function start(){var id=++run;timers.forEach(clearTimeout);timers=[];
      typeEl(tys[0],function(){typeEl(tys[1],function(){if(id===run)closing.classList.add('slogan-go');},id);},id);}
    var tio=new IntersectionObserver(function(es){es.forEach(function(en){
      if(en.intersectionRatio>=.2&&ready){ready=false;start();}
      else if(en.intersectionRatio<=0.01&&!ready){ready=true;reset();}});},{threshold:[0,.2]});
    tio.observe(closing);
  }
  /* hero: image and icons lean toward the pointer */
  var hero=d.querySelector('.hero'),himg=d.querySelector('.hero-img');
  if(hero&&himg&&!reduce&&matchMedia('(hover: hover)').matches){
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      himg.style.rotate=(x*4).toFixed(2)+'deg';himg.style.scale=1+Math.abs(x)*.03;});
    hero.addEventListener('pointerleave',function(){himg.style.rotate='0deg';himg.style.scale='1';});}
  /* pinned scroll sequences (HOW IT WORKS, COVERAGE PACKAGES) */
  var seqUps=[];
  var seqUpdate=function(){seqUps.forEach(function(f){f()})};
  [].forEach.call(d.querySelectorAll('.how-seq,.pk-seq'),function(seq){
    if(reduce)return;
    seq.classList.add('anim');
    var st=[].slice.call(seq.querySelectorAll('.step,.pk-card')),fill=seq.querySelector('.fill'),dots=[].slice.call(seq.querySelectorAll('.seq-rail .d')),n=st.length;
    st.forEach(function(s){[].forEach.call(s.querySelectorAll('.list li'),function(li,k){li.style.setProperty('--li',k)})});
    var mq=matchMedia('(min-width:821px) and (min-height:640px)');
    var update=function(){
      if(!mq.matches)return;
      var r=seq.getBoundingClientRect(),H=r.height,vh=innerHeight,p=Math.max(0,Math.min(1,(84-r.top)/(H-vh+84))),f=p*n,idx=Math.min(n-1,Math.floor(f));
      st.forEach(function(s,i){s.classList.toggle('on',f>=i);s.classList.toggle('now',i===idx);s.classList.toggle('done',i<idx);});
      dots.forEach(function(x,k){x.classList.toggle('on',f>=k)});
      if(fill)fill.style.width=(Math.min(f,n-1)/(n-1)*100)+'%';};
    function setMode(){seq.classList.toggle('pinned',mq.matches);st.forEach(function(s){s.classList.remove('now','done');if(mq.matches)s.classList.remove('on');});update();}
    if('IntersectionObserver' in window){var sio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!mq.matches){en.target.classList.add('on');sio.unobserve(en.target);}});},{threshold:.2,rootMargin:'0px 0px -8% 0px'});st.forEach(function(s){sio.observe(s)});}
    else st.forEach(function(s){s.classList.add('on')});
    seqUps.push(update);
    mq.addEventListener?mq.addEventListener('change',setMode):mq.addListener(setMode);
    setMode();
  });
  /* scroll-linked: progress bar, header, parallax */
  var par=[].slice.call(d.querySelectorAll('[data-parallax]')),tick=false;
  function frame(){tick=false;var y=window.scrollY,h=root.scrollHeight-innerHeight;
    if(bar)bar.style.setProperty('--prog',h>0?Math.min(y/h,1):0);
    if(hd)hd.classList.toggle('scrolled',y>80);seqUpdate();
    if(!reduce){var vh=innerHeight;par.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
      var off=(r.top+r.height/2-vh/2)*parseFloat(el.getAttribute('data-parallax'));el.style.translate='0 '+(-off).toFixed(1)+'px';});}}
  function req(){if(!tick){tick=true;requestAnimationFrame(frame);}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();
})();
