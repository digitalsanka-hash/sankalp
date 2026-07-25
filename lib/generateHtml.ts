// lib/generateHtml.ts
// ------------------------------------------------------------------
// Mesin inject: mengubah HTML template (berisi placeholder) + nilai form
// menjadi HTML final yang siap tampil / diunduh.
//
// Sintaks placeholder di file template:
//   {{namaField}}                         -> nilai skalar (teks/warna/gambar)
//   <!--REPEAT:benefit-->...{{item}}...<!--/REPEAT:benefit-->
//                                         -> diulang untuk tiap baris list
//   <!--IF:urgencyAktif-->...<!--/IF:urgencyAktif-->
//                                         -> tampil hanya bila toggle ON / teks terisi
//
// Di dalam blok REPEAT, sub-field diakses lewat {{subKey}} (mis. {{nama}}).
// ------------------------------------------------------------------
import type { FormValues, FieldValue, ListValue } from "./types";

/** Escape supaya nilai user tak merusak struktur / tak jadi lubang XSS di export. */
function esc(v: string): string {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Nilai yang aman ditaruh di dalam href/atribut. */
function escAttr(v: string): string {
  return esc(v);
}

function isTruthy(v: FieldValue | undefined): boolean {
  if (v === undefined) return false;
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return false;
}

function replaceScalars(html: string, scope: Record<string, string>): string {
  return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, key: string) => {
    const val = scope[key];
    return val === undefined ? "" : val;
  });
}

/**
 * Bangun peta skalar dari FormValues (list & boolean dikeluarkan).
 * Warna & teks di-escape; kolom khusus yang memang berisi angka/id dibiarkan.
 */
function scalarScope(values: FormValues): Record<string, string> {
  const scope: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) {
    if (typeof v === "string") {
      // metaPixelId & link tetap di-escape ringan (aman untuk atribut & script id numerik)
      scope[k] = esc(v);
    } else if (typeof v === "boolean") {
      scope[k] = v ? "true" : "";
    }
  }
  return scope;
}

/** Proses semua blok REPEAT. */
function processRepeats(html: string, values: FormValues): string {
  const re = /<!--REPEAT:(\w+)-->([\s\S]*?)<!--\/REPEAT:\1-->/g;
  return html.replace(re, (_m, key: string, inner: string) => {
    const list = values[key];
    if (!Array.isArray(list)) return "";
    return (list as ListValue)
      .map((row) => {
        const scope: Record<string, string> = {};
        for (const [rk, rv] of Object.entries(row)) scope[rk] = esc(rv);
        return replaceScalars(inner, scope);
      })
      .join("");
  });
}

/** Proses semua blok IF (nested aman karena non-greedy + nama unik). */
function processConditionals(html: string, values: FormValues): string {
  const re = /<!--IF:(\w+)-->([\s\S]*?)<!--\/IF:\1-->/g;
  return html.replace(re, (_m, key: string, inner: string) => {
    return isTruthy(values[key]) ? inner : "";
  });
}

/**
 * Fungsi utama. Mengembalikan HTML final lengkap (standalone).
 */
export function generateHtml(templateHtml: string, values: FormValues): string {
  let out = templateHtml;
  out = processRepeats(out, values);
  out = processConditionals(out, values);
  out = replaceScalars(out, scalarScope(values));
  return out;
}

/** Nama file unduhan yang aman. */
export function safeFileName(brand: string): string {
  const base = (brand || "landing-page")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40);
  return `${base || "landing-page"}.html`;
}

export { escAttr };
