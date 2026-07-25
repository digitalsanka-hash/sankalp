// lib/templates.ts
// ------------------------------------------------------------------
// Sintesis 50 template dari: base layout + tema + copy varian.
// getTemplate(id) menghasilkan TemplateDef siap dipakai editor & preview.
// ------------------------------------------------------------------
import type { TemplateDef, FormValues, Section } from "./types";
import { generateHtml } from "./generateHtml";
import { VARIANTS } from "./variants";
import { getTheme, type Theme } from "./theme";
import { THEME_ASSIGN } from "./theme-assign";
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
  h = repl(h, "{{__themeCss}}", t.css ?? "");
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
  // Tema: peta penugasan (theme-assign) menang atas bawaan varian.
  const theme = getTheme(THEME_ASSIGN[variant.id] ?? variant.theme);

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

  // 2) HTML shell ber-tema dengan marker — bagian dirakit saat render
  //    (renderTemplate) mengikuti urutan pilihan user.
  const html = injectTheme(wrapDoc("<!--__PARTS__-->", base.extraCss ?? ""), theme);

  const def: TemplateDef = {
    id: variant.id,
    nama: variant.nama,
    kategori: variant.kategori,
    ringkas: variant.ringkas,
    thumbnail: variant.icon,
    html,
    parts: base.parts,
    sections,
  };
  cache.set(id, def);
  return def;
}

/** Kunci penyimpan urutan bagian di FormValues. */
export const ORDER_KEY = "_sectionOrder";

/** Urutan bagian efektif: ambil pilihan user, buang id asing, tambah id baru. */
export function resolveOrder(def: TemplateDef, values: FormValues): string[] {
  const all = def.parts.map((p) => p.id);
  const raw = values[ORDER_KEY];
  if (!Array.isArray(raw) || raw.length === 0 || typeof raw[0] !== "string") return all;
  const chosen = (raw as string[]).filter((id) => all.includes(id));
  for (const id of all) if (!chosen.includes(id)) chosen.push(id);
  return chosen;
}

/**
 * Render final: rakit bagian sesuai urutan -> masukkan ke shell -> inject nilai.
 * SEMUA pratinjau/unduhan harus lewat fungsi ini.
 */
export function renderTemplate(def: TemplateDef, values: FormValues): string {
  const order = resolveOrder(def, values);
  const byId = new Map(def.parts.map((p) => [p.id, p.html] as const));
  const bodyHtml = order.map((id) => byId.get(id) ?? "").join("\n");
  const full = def.html.replace("<!--__PARTS__-->", bodyHtml);
  return generateHtml(full, values);
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
  v[ORDER_KEY] = t.parts.map((p) => p.id);
  return v;
}
