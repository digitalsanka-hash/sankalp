// scripts/gen-previews.ts — generate HTML Landing Page ASLI (dari engine) untuk bukti
// di sales page. Dibundel esbuild lalu dijalankan node.
import { getTemplate, defaultValues, renderTemplate } from "@/lib/templates";

import { VARIANTS } from "@/lib/variants";
import { writeFileSync, mkdirSync } from "node:fs";

const IDS = [
  "skincare-glow", "course-bisnis", "tws-earbuds", "fashion-hijab",
  "webinar-bisnis", "jasa-wo", "kopi-kemasan", "mukena",
];

mkdirSync("sales-page/tpl", { recursive: true });

const meta: { id: string; nama: string; niche: string }[] = [];
for (const id of IDS) {
  const t = getTemplate(id);
  const v = VARIANTS.find((x) => x.id === id);
  if (!t || !v) { console.error("SKIP", id); continue; }
  const html = renderTemplate(t, defaultValues(t));
  writeFileSync(`sales-page/tpl/${id}.html`, html, "utf8");
  meta.push({ id, nama: v.nama, niche: v.niche });
  console.log("wrote", id, html.length);
}
writeFileSync("sales-page/tpl/manifest.json", JSON.stringify(meta), "utf8");
console.log("DONE", meta.length);
