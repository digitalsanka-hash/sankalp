// lib/templates.ts
// ------------------------------------------------------------------
// Sintesis 50 template dari: base layout + tema + copy varian.
// getTemplate(id) menghasilkan TemplateDef siap dipakai editor & preview.
// ------------------------------------------------------------------
import type { TemplateDef, FormValues, Section } from "./types";
import { VARIANTS } from "./variants";
import { getTheme, type Theme } from "./theme";
import { wrapDoc } from "@/data/templates/frame";
import { sharedCss, sharedJs } from "@/data/templates/shared";
import { baseSales } from "@/data/templates/base_sales";
import { baseSaas } from "@/data/templates/base_saas";
import { baseBeauty } from "@/data/templates/base_beauty";
import { baseProduct } from "@/data/templates/base_product";
import { baseLead } from "@/data/templates/base_lead";
import { baseService } from "@/data/templates/base_service";
import type { BaseLayout } from "./types";

const BASES: Record<string, BaseLayout> = {
  sales: baseSales,
  saas: baseSaas,
  beauty: baseBeauty,
  product: baseProduct,
  lead: baseLead,
  service: baseService,
};

// split/join agar aman dari karakter khusus regex ($&, dll) di nilai token.
function repl(html: string, key: string, val: string): string {
  return html.split(key).join(val);
}

/** Inject token tema non-editable (__*) + lapisan shared ke HTML. */
function injectTheme(html: string, t: Theme): string {
  let h = html;
  h = repl(h, "{{__fontLink}}", t.fontLink);
  h = repl(h, "{{__bg}}", t.bg);
  h = repl(h, "{{__surface}}", t.surface);
  h = repl(h, "{{__tinta}}", t.tinta);
  h = repl(h, "{{__lembut}}", t.lembut);
  h = repl(h, "{{__kartu}}", t.kartu);
  h = repl(h, "{{__radius}}", t.radius);
  h = repl(h, "{{__heroBg}}", t.heroBg);
  h = repl(h, "{{__fontHead}}", t.fontHead);
  h = repl(h, "{{__fontBody}}", t.fontBody);
  h = repl(h, "{{__sharedCss}}", sharedCss);
  h = repl(h, "{{__sharedJs}}", sharedJs);
  return h;
}

// cache hasil sintesis
const cache = new Map<string, TemplateDef>();

export function getTemplate(id: string): TemplateDef | undefined {
  if (cache.has(id)) return cache.get(id);
  const variant = VARIANTS.find((v) => v.id === id);
  if (!variant) return undefined;
  const base = BASES[variant.base];
  if (!base) return undefined;
  const theme = getTheme(variant.theme);

  // 1) clone sections + terapkan default: warna tema + override niche
  const sections: Section[] = JSON.parse(JSON.stringify(base.sections));
  const merged: FormValues = {
    warnaUtama: theme.utama,
    warnaAksen: theme.aksen,
    ...(variant.overrides ?? {}),
  };
  for (const sec of sections) {
    for (const f of sec.fields) {
      if (Object.prototype.hasOwnProperty.call(merged, f.key)) {
        f.default = merged[f.key] as typeof f.default;
      }
    }
  }

  // 2) HTML: bungkus body + inject tema
  const html = injectTheme(wrapDoc(base.body, base.extraCss ?? ""), theme);

  const def: TemplateDef = {
    id: variant.id,
    nama: variant.nama,
    kategori: variant.kategori,
    ringkas: variant.ringkas,
    thumbnail: variant.icon,
    html,
    sections,
  };
  cache.set(id, def);
  return def;
}

/** Metadata ringan untuk galeri (tanpa membangun HTML penuh). */
export const TEMPLATE_META = VARIANTS.map((v) => ({
  id: v.id,
  nama: v.nama,
  kategori: v.kategori,
  niche: v.niche,
  ringkas: v.ringkas,
  icon: v.icon,
}));

export type TemplateMeta = (typeof TEMPLATE_META)[number];

/** Bangun nilai awal form dari default tiap field (sudah termasuk override). */
export function defaultValues(t: TemplateDef): FormValues {
  const v: FormValues = {};
  for (const sec of t.sections) {
    for (const f of sec.fields) {
      v[f.key] = Array.isArray(f.default)
        ? f.default.map((row) => ({ ...row }))
        : f.default;
    }
  }
  return v;
}
