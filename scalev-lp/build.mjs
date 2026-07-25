import { readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

// ================================================================
// GANTI 3 NILAI INI, lalu jalankan: node scalev-lp/build.mjs
// ================================================================
const CONFIG = {
  CHECKOUT_URL: "https://checkout.scalev.id/GANTI-DENGAN-LINK-CHECKOUT",
  WHATSAPP_URL: "",
  META_PIXEL_ID: "",
};

const root = "scalev-lp";
const source = readFileSync(join(root, "sankalp-scalev.source.html"), "utf8");

function dataUrl(file, mime) {
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
}

const images = {
  "__IMG_HOOK__": dataUrl(join(root, "assets", "hook-diagnostic.jpg"), "image/jpeg"),
  "__IMG_VALUE__": dataUrl(join(root, "assets", "produk-layak.jpg"), "image/jpeg"),
  "__IMG_FUTURE__": dataUrl(join(root, "assets", "besok-tayang.jpg"), "image/jpeg"),
};

const previewIds = [
  "skincare-glow",
  "course-bisnis",
  "tws-earbuds",
  "fashion-hijab",
  "webinar-bisnis",
  "jasa-wo",
];

const manifest = JSON.parse(
  readFileSync(join("sales-page", "tpl", "manifest.json"), "utf8")
);

const cards = previewIds
  .map((id, index) => {
    const item = manifest.find((entry) => entry.id === id);
    const html = readFileSync(join("sales-page", "tpl", `${id}.html`), "utf8");
    const src = dataUrl(join("sales-page", "tpl", `${id}.html`), "text/html;charset=utf-8");
    return `<article class="preview-card" aria-label="${item?.nama ?? id}">
      <div class="phone-shell">
        <div class="phone-top"><i></i><span></span><i></i></div>
        <iframe loading="${index < 2 ? "eager" : "lazy"}" sandbox="allow-scripts" title="Preview ${item?.nama ?? id}" src="${src}"></iframe>
      </div>
      <div class="preview-caption"><span>${item?.niche ?? "Template"}</span><b>${item?.nama ?? id}</b><small>Gulir di dalam layar untuk melihat halaman penuh</small></div>
    </article>`;
  })
  .join("\n");

const pixel =
  /^\d{5,30}$/.test(CONFIG.META_PIXEL_ID)
    ? `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${CONFIG.META_PIXEL_ID}');fbq('track','PageView');</script>`
    : "";

let output = source
  .replaceAll("__CHECKOUT_URL__", CONFIG.CHECKOUT_URL)
  .replaceAll("__WHATSAPP_URL__", CONFIG.WHATSAPP_URL)
  .replace("<!--META_PIXEL-->", pixel)
  .replace("<!--TEMPLATE_CARDS-->", cards);

for (const [token, value] of Object.entries(images)) {
  output = output.replaceAll(token, value);
}

const outputFile = join(root, "sankalp-scalev-FINAL.html");
writeFileSync(outputFile, output, "utf8");

console.log(`Built ${outputFile}`);
console.log(`Size ${(Buffer.byteLength(output) / 1024 / 1024).toFixed(2)} MB`);
console.log(`Checkout: ${CONFIG.CHECKOUT_URL}`);
console.log(`Previews: ${previewIds.length} template aktual`);
