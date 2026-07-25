// sales-page/build.mjs — rakit sanka-sales.html final: _shell.html + LP asli
// (tpl/*.html) di-embed sebagai iframe base64 scrollable pada carousel bukti.
import { readFileSync, writeFileSync } from "node:fs";

const dir = "sales-page";
const shell = readFileSync(`${dir}/_shell.html`, "utf8");
const meta = JSON.parse(readFileSync(`${dir}/tpl/manifest.json`, "utf8"));

const cards = meta.map((m) => {
  const html = readFileSync(`${dir}/tpl/${m.id}.html`, "utf8");
  const b64 = Buffer.from(html, "utf8").toString("base64");
  return (
    `<div class="tpl">` +
      `<div class="phone">` +
        `<iframe loading="lazy" scrolling="yes" sandbox="allow-scripts" src="data:text/html;base64,${b64}"></iframe>` +
      `</div>` +
      `<div class="tpl-cap"><b>${m.nama}</b><span>${m.niche}</span></div>` +
    `</div>`
  );
}).join("\n");

const out = shell.replace("<!--BUKTI-->", cards);
writeFileSync(`${dir}/sanka-sales.html`, out, "utf8");
console.log("built sanka-sales.html", out.length, "bytes,", meta.length, "template");
