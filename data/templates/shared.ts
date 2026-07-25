// data/templates/shared.ts
// ------------------------------------------------------------------
// Lapisan PREMIUM & INTERAKTIF yang dipakai SEMUA template.
// Disuntikkan lewat token {{__sharedCss}} (dalam <style>) dan
// {{__sharedJs}} (sebelum </body>) saat sintesis template.
//
// Fitur: scroll-reveal, animated counter, sticky mobile CTA, tombol
// pulse+shine, testimonial slider, logo marquee, before/after slider
// (drag), floating WhatsApp, countdown. Semua murni tanpa library.
// ------------------------------------------------------------------

export const sharedCss = String.raw`
/* ---------- animasi masuk saat discroll ---------- */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:none}
.rd1{transition-delay:.08s}.rd2{transition-delay:.16s}.rd3{transition-delay:.24s}.rd4{transition-delay:.32s}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}

/* ---------- tombol CTA premium (shine + pulse) ---------- */
.btn{position:relative;overflow:hidden;isolation:isolate}
.btn::after{content:"";position:absolute;top:0;left:-120%;width:60%;height:100%;
  background:linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent);
  transform:skewX(-20deg);animation:shine 3.2s ease-in-out infinite;z-index:1}
.btn>*{position:relative;z-index:2}
@keyframes shine{0%,60%{left:-120%}100%{left:130%}}
.pulse{animation:pulse 2.2s infinite}
@keyframes pulse{0%{box-shadow:0 10px 26px rgba(0,0,0,.16),0 0 0 0 var(--aksen)}
  70%{box-shadow:0 10px 26px rgba(0,0,0,.16),0 0 0 14px transparent}100%{box-shadow:0 10px 26px rgba(0,0,0,.16),0 0 0 0 transparent}}

/* ---------- hover lift kartu ---------- */
.lift{transition:transform .25s ease,box-shadow .25s ease}
.lift:hover{transform:translateY(-4px)}

/* ---------- sticky CTA bar (muncul saat scroll) ---------- */
.sticky-cta{position:fixed;left:0;right:0;bottom:0;z-index:60;transform:translateY(120%);
  transition:transform .35s cubic-bezier(.16,1,.3,1);background:rgba(255,255,255,.96);
  backdrop-filter:blur(10px);border-top:1px solid rgba(0,0,0,.08);
  padding:10px 14px;display:flex;gap:10px;align-items:center;box-shadow:0 -8px 24px rgba(0,0,0,.1)}
.sticky-cta.show{transform:translateY(0)}
.sticky-cta .info{flex:1;min-width:0}
.sticky-cta .info b{display:block;font-size:14px;color:var(--tinta);line-height:1.2}
.sticky-cta .info span{font-size:12px;color:var(--lembut)}
.sticky-cta a{flex:none;background:var(--aksen);color:#fff;font-weight:800;font-size:14px;
  padding:12px 18px;border-radius:12px;text-decoration:none}

/* ---------- floating WhatsApp ---------- */
.fab-wa{position:fixed;right:16px;bottom:84px;z-index:55;width:54px;height:54px;border-radius:50%;
  background:#25d366;display:flex;align-items:center;justify-content:center;font-size:26px;
  box-shadow:0 8px 22px rgba(37,211,102,.5);text-decoration:none;animation:bob 2.6s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

/* ---------- angka statistik ---------- */
.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center}
.stat-row .num{font-size:30px;font-weight:900;color:var(--utama);font-variant-numeric:tabular-nums;line-height:1}
.stat-row .lbl{font-size:12px;color:var(--lembut);margin-top:4px}

/* ---------- logo/trust marquee ---------- */
.marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.marquee .track{display:flex;gap:34px;width:max-content;animation:scrollx 22s linear infinite}
.marquee span{font-weight:800;color:var(--lembut);opacity:.7;white-space:nowrap;font-size:15px}
@keyframes scrollx{to{transform:translateX(-50%)}}

/* ---------- testimonial slider (scroll-snap) ---------- */
.tslider{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;
  scrollbar-width:none}
.tslider::-webkit-scrollbar{display:none}
.tslider>*{scroll-snap-align:center;flex:0 0 86%;max-width:340px}
/* desktop: grid rapi, tak ada kartu terpotong; mobile tetap slider geser */
@media(min-width:700px){
.tslider{display:grid;grid-template-columns:repeat(3,1fr);overflow:visible;padding-bottom:0}
.tslider>*{flex:none;max-width:none}
}

/* ---------- before/after slider ---------- */
.ba-wrap{position:relative;max-width:460px;margin:0 auto;border-radius:var(--radius);overflow:hidden;
  user-select:none;touch-action:pan-y;box-shadow:0 16px 40px rgba(0,0,0,.14)}
.ba-wrap img{display:block;width:100%;pointer-events:none}
.ba-wrap .after-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;clip-path:inset(0 0 0 50%)}
.ba-wrap .bar{position:absolute;top:0;bottom:0;left:50%;width:3px;background:#fff;transform:translateX(-50%);box-shadow:0 0 0 1px rgba(0,0,0,.1)}
.ba-wrap .knob{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;
  border-radius:50%;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:16px;color:#333}
.ba-wrap .tagb,.ba-wrap .taga{position:absolute;bottom:12px;font-size:11px;font-weight:800;color:#fff;
  background:rgba(0,0,0,.55);padding:4px 10px;border-radius:999px}
.ba-wrap .tagb{left:12px}.ba-wrap .taga{right:12px}

/* ---------- FAQ accordion halus ---------- */
.faq details{transition:background .2s}
.faq details[open]{background:var(--kartu)}
.faq summary{position:relative;padding-right:28px}
.faq summary::after{content:"+";position:absolute;right:6px;top:-2px;font-size:22px;color:var(--utama);transition:transform .2s}
.faq details[open] summary::after{transform:rotate(45deg)}
`;

export const sharedJs = String.raw`
(function(){
  // CTA yang BELUM diisi link (kosong / "#") dibuat inert: klik tak melakukan
  // apa pun (tidak reload, tidak pindah halaman). Aktif otomatis setelah user
  // mengisi link checkout / WhatsApp / form.
  document.querySelectorAll('a').forEach(function(a){
    var h=(a.getAttribute('href')||'').trim();
    if(h===''||h==='#'){ a.style.cursor='default'; a.addEventListener('click',function(e){e.preventDefault();}); }
  });
  document.querySelectorAll('form').forEach(function(f){
    var ac=(f.getAttribute('action')||'').trim();
    if(ac===''||ac==='#'){ f.addEventListener('submit',function(e){e.preventDefault();}); }
  });
  // bar sisa stok
  document.querySelectorAll('.stock-bar[data-sisa]').forEach(function(b){
    var sisa=parseFloat(b.getAttribute('data-sisa'))||0, total=parseFloat(b.getAttribute('data-total'))||100;
    var pct=Math.max(4,Math.min(100,Math.round((sisa/total)*100)));
    var f=b.querySelector('.fill'); if(f) setTimeout(function(){f.style.width=pct+'%';},200);
  });
  // reveal saat discroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  // animated counter
  function animateCount(el){var to=parseFloat(el.getAttribute('data-to'))||0;
    var suf=el.getAttribute('data-suf')||'';var dur=1200,t0=null;
    function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);
      var v=Math.floor((0.5-Math.cos(Math.PI*p)/2)*to);
      el.textContent=v.toLocaleString('id-ID')+suf;if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step)}
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target)}})},{threshold:.5});
  document.querySelectorAll('[data-to]').forEach(function(el){cio.observe(el)});

  // sticky CTA bar muncul setelah lewat hero
  var bar=document.querySelector('.sticky-cta');
  if(bar){var hero=document.querySelector('header');
    var sio=new IntersectionObserver(function(es){es.forEach(function(e){
      bar.classList.toggle('show',!e.isIntersecting)})},{threshold:0});
    if(hero)sio.observe(hero);}

  // countdown (jam:menit:detik atau box)
  document.querySelectorAll('[data-menit]').forEach(function(box){
    var menit=parseInt(box.getAttribute('data-menit'),10)||60;var target=Date.now()+menit*60000;
    var one=box.matches('.count')?box:null;
    var H=box.querySelector('[data-h]'),M=box.querySelector('[data-m]'),S=box.querySelector('[data-s]');
    function tick(){var s=Math.max(0,Math.floor((target-Date.now())/1000));
      var h=String(Math.floor(s/3600)).padStart(2,'0'),m=String(Math.floor((s%3600)/60)).padStart(2,'0'),d=String(s%60).padStart(2,'0');
      if(one){one.textContent=h+':'+m+':'+d}else{if(H)H.textContent=h;if(M)M.textContent=m;if(S)S.textContent=d}
      if(s>0)setTimeout(tick,500)}tick();});

  // before/after slider
  document.querySelectorAll('.ba-wrap').forEach(function(w){
    var after=w.querySelector('.after-img'),bar=w.querySelector('.bar'),knob=w.querySelector('.knob');
    function setp(x){var r=w.getBoundingClientRect();var p=Math.max(0,Math.min(1,(x-r.left)/r.width));
      var pct=(p*100).toFixed(1);after.style.clipPath='inset(0 0 0 '+pct+'%)';bar.style.left=pct+'%';knob.style.left=pct+'%';}
    var drag=false;
    function down(e){drag=true;setp((e.touches?e.touches[0]:e).clientX)}
    function move(e){if(drag)setp((e.touches?e.touches[0]:e).clientX)}
    function up(){drag=false}
    w.addEventListener('mousedown',down);w.addEventListener('touchstart',down,{passive:true});
    window.addEventListener('mousemove',move);window.addEventListener('touchmove',move,{passive:true});
    window.addEventListener('mouseup',up);window.addEventListener('touchend',up);});
})();
`;
