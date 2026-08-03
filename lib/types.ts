// lib/types.ts — tipe data bersama seluruh aplikasi.

export type Kategori = "digital" | "fisik" | "lead";

/** Jenis field yang bisa dirender editor untuk user awam. */
export type FieldType =
  | "text"
  | "textarea"
  | "color"
  | "image"
  | "toggle"
  | "list";

/** Sub-field untuk field bertipe "list" (mis. baris testimoni). */
export interface SubField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "select";
  placeholder?: string;
  options?: string[]; // untuk type "select"
}

/** Definisi satu field di panel editor. */
export interface FieldDef {
  key: string;
  label: string; // bahasa manusia, ramah awam
  type: FieldType;
  help?: string; // teks tooltip bantuan
  placeholder?: string;
  example?: string; // contoh isian
  default: string | boolean | ListValue; // nilai awal
  subFields?: SubField[]; // hanya untuk type "list"
  addLabel?: string; // teks tombol tambah baris (list)
}

/** Satu grup field (accordion/tab) di editor. */
export interface Section {
  id: string;
  title: string;
  icon: string; // emoji, ramah awam
  fields: FieldDef[];
}

export type ListValue = Record<string, string>[];
export type FieldValue = string | boolean | ListValue | string[];
export type FormValues = Record<string, FieldValue>;

/** Bagian halaman yang bisa diatur urutannya (gaya komponen ScaleV). */
export interface PagePart {
  id: string;
  label: string; // nama ramah awam di panel "Susunan Halaman"
  html: string;  // potongan HTML (placeholder {{field}}/REPEAT/IF)
}

/** Registry satu template Landing Page. */
export interface TemplateDef {
  id: string;
  nama: string;
  kategori: Kategori;
  ringkas: string; // deskripsi singkat di kartu galeri
  thumbnail: string; // path gambar/emoji preview
  html: string; // shell dokumen ber-tema dengan marker <!--__PARTS__-->
  parts: PagePart[]; // bagian halaman (urutan default)
  sections: Section[];
}

/** Struktur review — SENGAJA dibuat cocok dengan tabel Supabase Fase 2. */
export interface Review {
  id: string;
  template_id: string;
  rating: number; // 1..5
  nama: string;
  komentar: string;
  created_at: string; // ISO string
}

export const KATEGORI_LABEL: Record<Kategori, string> = {
  digital: "Produk Digital",
  fisik: "Produk Fisik",
  lead: "Lead Magnet / Webinar",
};

/** Layout dasar (kerangka HTML + skema field). Template = varian dari base. */
export interface BaseLayout {
  sections: Section[];
  parts: PagePart[]; // bagian halaman berurut — bisa diatur ulang user
  extraCss?: string;
}

/** Spesifikasi satu varian template (base + tema + copy niche). */
export interface Variant {
  id: string;
  nama: string;
  kategori: Kategori;
  niche: string; // tag pencarian, mis. "Skincare", "Kopi", "Coaching"
  ringkas: string;
  icon: string; // emoji thumbnail fallback
  base: string; // key base layout
  theme: string; // key tema
  overrides?: FormValues; // copy khusus niche (menimpa default base)
}
