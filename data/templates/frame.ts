// data/templates/frame.ts
// wrapDoc(body) -> dokumen HTML lengkap (standalone) memakai token tema.
// Token non-editable diawali __ (di-replace saat sintesis di lib/templates.ts):
//   {{__fontLink}} {{__bg}} {{__surface}} {{__tinta}} {{__lembut}} {{__kartu}}
//   {{__radius}} {{__heroBg}} {{__fontHead}} {{__fontBody}} {{__sharedCss}} {{__sharedJs}}
// Token editable tetap: {{warnaUtama}} {{warnaAksen}} {{brandNama}} dll.

const baseCss = String.raw`
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--fontBody);color:var(--tinta);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
h1,h2,h3,.head{font-family:var(--fontHead)}
.wrap{max-width:800px;margin:0 auto;padding:0 20px}
.wrap-sm{max-width:600px;margin:0 auto;padding:0 20px}
section{padding:56px 0}
h2{font-size:28px;font-weight:800;letter-spacing:-.4px;text-align:center;margin-bottom:8px;line-height:1.15}
.sub-h{text-align:center;color:var(--lembut);max-width:520px;margin:0 auto 30px}
.btn{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:460px;
  text-align:center;background:var(--aksen);color:#fff;font-weight:800;font-size:18px;padding:17px 24px;
  border-radius:var(--radius);text-decoration:none;box-shadow:0 12px 30px rgba(0,0,0,.18);cursor:pointer;border:0}
.btn small{font-weight:600;font-size:13px;opacity:.9;margin-top:2px}
.btn-wrap{display:flex;justify-content:center}
.eyebrow{display:inline-block;background:rgba(255,255,255,.16);color:#fff;font-weight:700;font-size:12.5px;
  letter-spacing:.5px;padding:6px 14px;border-radius:999px;margin-bottom:16px}
.chip{display:inline-block;background:var(--utama);color:#fff;font-weight:700;font-size:12.5px;padding:6px 14px;border-radius:999px;margin-bottom:14px}
.grid-2{display:grid;gap:16px}.grid-3{display:grid;gap:16px}
.card{background:var(--kartu);border-radius:var(--radius);padding:20px}
.hero{background:var(--heroBg);color:#fff;text-align:center;padding:52px 0 56px;position:relative}
.hero .logo{height:38px;margin:0 auto 22px;object-fit:contain}
.hero h1{font-size:36px;font-weight:800;line-height:1.12;letter-spacing:-.6px;max-width:640px;margin:0 auto}
.hero .lead{font-size:18px;opacity:.94;margin:16px auto 26px;max-width:560px}
.hero .foto{border-radius:var(--radius);margin:28px auto 0;max-width:440px;box-shadow:0 26px 60px rgba(0,0,0,.34)}
.pain-list{list-style:none;max-width:580px;margin:0 auto}
.pain-list li{background:var(--kartu);border-radius:12px;padding:14px 16px 14px 48px;position:relative;margin-bottom:12px;font-weight:600}
.pain-list li::before{content:"✕";position:absolute;left:16px;top:14px;color:#ef4444;font-weight:900}
.check-list{list-style:none;max-width:580px;margin:0 auto}
.check-list li{background:var(--kartu);border-radius:12px;padding:14px 16px 14px 48px;position:relative;margin-bottom:10px;font-weight:600}
.check-list li::before{content:"✓";position:absolute;left:16px;top:14px;color:var(--utama);font-weight:900}
.feat h3{font-size:17px;margin-bottom:6px;color:var(--utama)}
.feat .ic{font-size:28px;line-height:1;margin-bottom:8px}
.feat p{color:var(--lembut);font-size:15px}
.testi-card{background:var(--kartu);border-radius:var(--radius);padding:20px;height:100%}
.testi-card .top{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.testi-card img{width:48px;height:48px;border-radius:999px;object-fit:cover}
.testi-card .nama{font-weight:800}.testi-card .stars{color:var(--aksen);font-size:14px}
.faq details{background:var(--kartu);border-radius:12px;padding:16px 18px;margin-bottom:10px}
.faq summary{font-weight:800;cursor:pointer;list-style:none}.faq summary::-webkit-details-marker{display:none}
.faq p{color:var(--lembut);margin-top:10px}
.price-sec{background:var(--heroBg);color:#fff}
.price-box{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.2);border-radius:calc(var(--radius) + 4px);padding:30px 22px;max-width:470px;margin:0 auto;text-align:center;backdrop-filter:blur(6px)}
.price-box .coret{opacity:.7;text-decoration:line-through;font-size:20px}
.price-box .jual{font-size:46px;font-weight:900;margin:2px 0 6px;font-family:var(--fontHead)}
.price-box .save{display:inline-block;background:var(--aksen);color:#fff;font-weight:800;font-size:13px;padding:5px 12px;border-radius:999px;margin-bottom:14px}
.bonus-list{list-style:none;text-align:left;max-width:360px;margin:18px auto;padding:0}
.bonus-list li{padding:9px 0 9px 30px;position:relative;border-bottom:1px dashed rgba(255,255,255,.22)}
.bonus-list li::before{content:"🎁";position:absolute;left:0}
.garansi{background:rgba(255,255,255,.12);border-radius:12px;padding:13px;margin-top:18px;font-weight:600;font-size:14px}
.urg{background:rgba(0,0,0,.22);border-radius:12px;padding:14px;margin-top:16px}
.urg .count{font-size:28px;font-weight:900;font-variant-numeric:tabular-nums;letter-spacing:1px}
.urg p{font-size:13.5px;opacity:.92;margin-top:4px}
footer{text-align:center;color:var(--lembut);font-size:13px;padding:32px 20px 90px}
/* ---------- elemen marketing (dipakai semua template) ---------- */
.proof-strip{padding:22px 0;border-bottom:1px solid rgba(128,128,128,.12);background:var(--bg)}
.rating-hero{display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;margin-bottom:14px;flex-wrap:wrap}
.rating-hero .stars{color:var(--aksen);letter-spacing:1px;font-size:17px}
.rating-hero b{font-size:18px;color:var(--utama)}
.rating-hero span{color:var(--lembut);font-size:13px}
.trust-badges{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.trust-badges .tb{display:inline-flex;align-items:center;gap:6px;background:var(--kartu);border:1px solid rgba(128,128,128,.14);border-radius:999px;padding:8px 14px;font-size:13px;font-weight:600;color:var(--tinta)}
.trust-badges .tb b{color:var(--utama)}
.hook{background:var(--surface);text-align:center}
.hook .hook-mark{font-family:var(--fontHead);font-size:56px;line-height:.5;color:var(--utama);opacity:.28;margin-bottom:10px}
.hook p{font-size:21px;font-weight:700;font-family:var(--fontHead);line-height:1.45;max-width:600px;margin:0 auto;letter-spacing:-.3px}
.hook .hl{color:var(--utama)}
.guarantee-sec{background:var(--bg)}
.guarantee{display:flex;gap:16px;align-items:center;background:var(--kartu);border:1px dashed var(--utama);border-radius:calc(var(--radius) + 2px);padding:20px 22px;max-width:560px;margin:0 auto}
.guarantee .seal{flex:none;width:54px;height:54px;border-radius:50%;background:var(--utama);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.guarantee h3{font-size:17px;margin-bottom:3px}
.guarantee p{color:var(--lembut);font-size:14px}
.stock-wrap{max-width:340px;margin:16px auto 0}
.stock-bar{height:9px;border-radius:999px;background:rgba(0,0,0,.14);overflow:hidden}
.stock-bar .fill{height:100%;background:linear-gradient(90deg,var(--aksen),#ef4444);border-radius:999px;transition:width .8s}
.stock-txt{font-size:12.5px;margin-top:6px;font-weight:700;opacity:.92}
/* ---------- aksen judul & polish premium ---------- */
h2::after{content:"";display:block;width:44px;height:4px;border-radius:99px;background:var(--aksen);margin:12px auto 0;opacity:.9}
.price-box{box-shadow:0 24px 60px -18px rgba(0,0,0,.35)}
.testi-card{border:1px solid rgba(128,128,128,.1)}
/* ---------- Kenapa Harus Beli ---------- */
.reasons{background:var(--surface)}
.reason-list{display:grid;gap:14px;max-width:640px;margin:28px auto 0}
.reason{display:flex;gap:14px;align-items:flex-start;background:var(--kartu);border:1px solid rgba(128,128,128,.1);border-radius:var(--radius);padding:18px 20px}
.reason .rn{font-size:26px;line-height:1.1;flex:none}
.reason b{font-size:16.5px;font-family:var(--fontHead)}
.reason p{color:var(--lembut);font-size:14.5px;margin-top:3px}
/* ---------- Blok Kreatif (elemen bebas user) ---------- */
.custom-sec{padding:52px 0}
.cb-h{font-size:26px;font-weight:800;font-family:var(--fontHead);text-align:center;margin:20px 0 4px;letter-spacing:-.3px}
.cb-h::after{content:"";display:block;width:44px;height:4px;border-radius:99px;background:var(--aksen);margin:12px auto 0;opacity:.9}
.cb-p{color:var(--lembut);max-width:580px;margin:12px auto;text-align:center;font-size:15.5px}
.cb-poin{display:flex;gap:12px;align-items:flex-start;max-width:540px;margin:10px auto;background:var(--kartu);border-radius:12px;padding:13px 16px}
.cb-poin span{color:var(--utama);font-weight:900;flex:none}
.cb-poin p{font-weight:600;font-size:15px}
.cb-quote{font-family:var(--fontHead);font-size:21px;font-weight:700;text-align:center;max-width:560px;margin:22px auto;color:var(--utama);line-height:1.5}
.cb-img{border-radius:var(--radius);max-width:460px;width:100%;margin:18px auto;box-shadow:0 16px 40px rgba(0,0,0,.16)}
.cb-hr{border:0;height:1px;background:rgba(128,128,128,.22);max-width:220px;margin:30px auto}
@media(min-width:640px){.hero h1{font-size:46px}.grid-2{grid-template-columns:1fr 1fr}.grid-3{grid-template-columns:repeat(3,1fr)}.hook p{font-size:26px}}
`;

const metaPixel = String.raw`<!--IF:metaPixelId-->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','{{metaPixelId}}');fbq('track','PageView');
</script>
<!--/IF:metaPixelId-->`;

// Sticky CTA + floating WA, dipakai semua template.
const stickyAndFab = String.raw`
<div class="sticky-cta">
  <div class="info"><b>{{brandNama}}</b><span>{{stickyNote}}</span></div>
  <a href="{{linkCheckout}}">{{ctaUtama}}</a>
</div>
<!--IF:waLink--><a class="fab-wa" href="{{waLink}}" aria-label="WhatsApp">💬</a><!--/IF:waLink-->`;

/** Bungkus body menjadi dokumen HTML lengkap. */
export function wrapDoc(body: string, extraCss = ""): string {
  return String.raw`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{{brandNama}}</title>
{{__fontLink}}
${metaPixel}
<style>
:root{
  --utama:{{warnaUtama}};--aksen:{{warnaAksen}};
  --bg:{{__bg}};--surface:{{__surface}};--tinta:{{__tinta}};--lembut:{{__lembut}};--kartu:{{__kartu}};
  --radius:{{__radius}};--heroBg:{{__heroBg}};--fontHead:{{__fontHead}};--fontBody:{{__fontBody}};
}
${baseCss}
{{__sharedCss}}
${extraCss}
{{__themeCss}}
</style>
</head>
<body>
${body}
<footer>© {{brandNama}} — Semua hak dilindungi.</footer>
${stickyAndFab}
<script>{{__sharedJs}}</script>
</body>
</html>`;
}
