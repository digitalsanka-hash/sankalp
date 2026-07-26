# SankaPage

Platform template **Landing Page (LP) high-conversion** yang bisa diedit orang awam (tanpa koding), lalu diunduh sebagai HTML mandiri untuk di-deploy ke **ScaleV**.

Target pengguna: penjual produk **digital** & **fisik** di Indonesia yang gaptek.

> **Status: Fase 1 (lokal).** Berjalan sepenuhnya di `localhost` dengan data lokal (JSON). Struktur sudah disiapkan untuk disambung ke **Supabase** (auth + database) dan di-deploy ke **Vercel** di Fase 2.

---

## Cara Menjalankan (localhost)

Butuh **Node.js 18+**.

```bash
cd sankalp
npm install
npm run dev
```

Buka <http://localhost:3000>.

Tidak perlu mengisi `.env.local` di Fase 1 — aplikasi jalan tanpa Supabase.

---

## Fitur Fase 1

| Halaman | Rute | Isi |
|---|---|---|
| Galeri Template | `/` | Grid kartu + filter kategori (Digital / Fisik / Lead) + sistem ulasan bintang per template |
| Editor / Customizer | `/edit/[templateId]` | Form ramah-awam (kiri) + pratinjau langsung dalam iframe (kanan), debounce 300ms |
| Panduan | `/panduan` | Langkah edit, pasang Meta Pixel, link ScaleV, dan **cara deploy ke ScaleV** |

**50 template siap pakai** (copywriting persuasif Indonesia, mobile-first, interaktif — bukan lorem ipsum).

Template dibangun dari **6 base layout premium** × **14 tema visual** × **copy per niche**:

| Base | Untuk | Fitur khas |
|---|---|---|
| `sales` | Kelas/ebook/template digital | stats counter, social proof marquee, harga+bonus, urgency |
| `saas` | Aplikasi/tool | fitur grid, langkah bernomor, paket langganan |
| `beauty` | Skincare/bodycare | **before/after slider (geser)**, galeri, order COD |
| `product` | Fashion/gadget/F&B/kesehatan | galeri, **paket bertingkat** (bundling) |
| `lead` | Webinar/optin | **countdown box** + form pendaftaran |
| `service` | Jasa/konsultasi | proses kerja, paket harga, booking |

**Lapisan interaktif** (dipakai semua template, tanpa library): scroll-reveal animasi, animated counter, sticky CTA bar, tombol shine + pulse, testimonial slider, logo marquee, before/after drag, floating WhatsApp, FAQ accordion, countdown. Tema memakai Google Fonts + palet (light/dark/gradient/cream).

Galeri: **thumbnail = pratinjau ASLI** (iframe di-skala, lazy-load) + pencarian + filter kategori & niche.

**Tombol aksi di editor:**

- **Download HTML** — menghasilkan 1 file `.html` mandiri: CSS inline, Meta Pixel di `<head>`, link ScaleV pada tombol CTA, gambar tertanam (base64). Siap diunggah ke ScaleV.
- **Pratinjau Penuh** — buka hasil full-screen di tab baru.
- **Simpan Project** & **Publish** — sengaja *dinonaktifkan* (slot Fase 2).

---

## Cara Kerja Template (untuk developer)

Arsitektur **"1 engine, N kulit"** — 50 template = data, bukan 50 file HTML tangan:

- **Base layout** (`data/templates/base_*.ts`) = kerangka HTML + skema field editor. Memakai token `{{__namaTema}}` (non-editable, mis. `{{__bg}}`, `{{__fontHead}}`) dan `{{field}}` (editable user).
- **Tema** (`lib/theme.ts`) = 14 preset palet + font. **Shared** (`data/templates/shared.ts`) = CSS/JS interaktif. **Frame** (`data/templates/frame.ts`) = `wrapDoc()` membungkus body jadi dokumen lengkap (head, Meta Pixel, sticky CTA, FAB).
- **Varian** (`lib/variants.ts`) = 50 entri `{ base, theme, overrides (copy niche) }`.
- [`lib/templates.ts`](lib/templates.ts) → `getTemplate(id)` men-sintesis: clone skema base, terapkan default warna tema + override niche, lalu inject token tema → **TemplateDef** siap pakai (di-cache).

Placeholder di HTML:
- `{{namaField}}` — nilai skalar.
- `<!--REPEAT:key-->...{{sub}}...<!--/REPEAT:key-->` — blok berulang (list).
- `<!--IF:key-->...<!--/IF:key-->` — kondisional (toggle ON / teks terisi).

- [`lib/generateHtml.ts`](lib/generateHtml.ts) inject nilai form → HTML final (dengan escaping).
- Nilai form disimpan di **React state** (bukan localStorage), pratinjau via `iframe srcDoc` (debounce 300ms).

---

## Struktur Folder

```
sankalp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Galeri
│   ├── edit/[templateId]/page.tsx  # Editor (inti)
│   └── panduan/page.tsx            # Panduan
├── components/
│   ├── TemplateCard.tsx
│   ├── EditorPanel.tsx
│   ├── LivePreview.tsx
│   ├── ReviewList.tsx
│   └── StarRating.tsx
├── lib/
│   ├── supabase.ts                 # client (aman walau env kosong)
│   ├── types.ts
│   ├── templates.ts                # registry + skema field
│   └── generateHtml.ts             # inject nilai -> HTML final
├── data/
│   ├── templates/                  # digital.ts, fisik.ts, lead.ts (HTML+placeholder)
│   └── reviews.json                # ulasan lokal Fase 1
├── .env.local.example
├── supabase-schema.sql             # skema Fase 2 (jangan dijalankan sekarang)
└── README.md
```

---

## Menuju Fase 2

Struktur sudah disiapkan; berikut langkah mengaktifkannya nanti.

1. **Supabase**
   - Buat project di <https://supabase.com>.
   - Salin `.env.local.example` → `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Jalankan `supabase-schema.sql` di SQL Editor (tabel `templates`, `reviews`, `projects`, `subscriptions`).
   - `lib/supabase.ts` otomatis aktif begitu env terisi (`isSupabaseConfigured()` → true).
   - Ganti seed di `ReviewList.tsx` (baca/tulis JSON) menjadi query tabel `reviews`.

2. **Auth** — pakai Supabase Auth (email/OAuth). Aktifkan tombol **Simpan Project** (tulis ke `projects.data_json`).

3. **Langganan** — integrasi pembayaran → isi tabel `subscriptions`; gerbang tombol **Publish** berdasarkan `status = 'active'`.

4. **Deploy Vercel** — import repo, set env yang sama, deploy. Tidak ada dependensi yang gagal di serverless (semua render sisi klien / statis).

---

## Catatan Teknis

- Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- Semua teks UI Bahasa Indonesia, diarahkan untuk pengguna awam.
- Nilai form tidak memakai `localStorage`/`sessionStorage` (sesuai spesifikasi Fase 1).
