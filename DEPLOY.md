# Panduan Deploy SankaPage — Supabase + Vercel

> Aplikasi **sudah bisa langsung di-deploy ke Vercel apa adanya** (proyek user tersimpan di browser via localStorage).
> **Supabase belum wajib** untuk online — itu untuk Fase 2 (simpan proyek di cloud + login lintas perangkat). Ikuti Bagian A dulu kalau mau tabelnya siap, atau langsung Bagian B untuk online cepat.

---

## BAGIAN A — Supabase (siapkan database)

### 1. Buat project
1. Buka <https://supabase.com> → **Sign in** (pakai GitHub/Google).
2. **New project** → beri nama (mis. `sankalp`) → pilih region **Southeast Asia (Singapore)** → buat password database (catat) → **Create**.
3. Tunggu ±1–2 menit sampai project aktif.

### 2. Jalankan skema tabel
1. Di sidebar kiri: **SQL Editor** → **+ New query**.
2. Buka file [`supabase-schema.sql`](supabase-schema.sql) di project ini, **salin semua isinya**, tempel ke editor.
3. Klik **Run** (atau `Ctrl+Enter`). Harus muncul **Success**.
   - Ini membuat tabel: `templates`, `reviews`, `projects`, `subscriptions` + kebijakan keamanan (RLS).

### 3. Ambil kunci API
1. Sidebar: **Project Settings** (ikon gerigi) → **API**.
2. Salin 2 nilai ini (dipakai nanti di Vercel & lokal):
   - **Project URL** → untuk `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys → anon public** → untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> Kunci **anon public** aman ditaruh di frontend (memang untuk itu). Jangan pakai `service_role`.

### 4. Aktifkan Login Email (magic link) — WAJIB untuk simpan cloud
1. Sidebar: **Authentication** → **Providers** → pastikan **Email** **ON** (default sudah ON).
   - Boleh matikan "Confirm email" kalau mau link langsung login (opsional).
2. **Authentication** → **URL Configuration**:
   - **Site URL**: isi URL Vercel Anda nanti, mis. `https://sankalp-xxxx.vercel.app`
   - **Redirect URLs** → **Add URL** untuk masing-masing:
     - `http://localhost:3005/**`
     - `https://sankalp-xxxx.vercel.app/**`
   - **Save**.
   > Tanpa Redirect URL yang benar, tautan magic link tidak bisa balik ke aplikasi.

### 5. (Opsional) coba lokal
1. Salin `.env.local.example` → ganti nama jadi `.env.local`.
2. Isi kedua nilai di atas.
3. `npm run dev` → `lib/supabase.ts` otomatis aktif (`isSupabaseConfigured()` = true).

---

## BAGIAN B — Vercel (bikin online)

Aplikasi ini ada di folder **`sankalp/`** (di dalam repo yang lebih besar). Pilih **satu** cara di bawah.

### Cara 1 — Vercel CLI (tercepat, tanpa GitHub)

```bash
npm i -g vercel
cd "D:/ASDP/02. PROJEK/files/sankalp"
vercel
```

Saat ditanya:
- **Set up and deploy?** → `Y`
- **Which scope?** → pilih akun Anda
- **Link to existing project?** → `N`
- **Project name?** → `sankalp` (enter)
- **In which directory is your code located?** → `./` (enter)
- Biarkan setting lain default → deploy jalan.

Setelah selesai, tambah environment variable lalu deploy production:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

(Tempel nilai dari Bagian A langkah 3 saat diminta. Pilih environment: **Production** — enter.)

### Cara 2 — GitHub + Dashboard (visual)

1. Push kode ke GitHub (repo baru). Karena `sankalp` ada di dalam repo besar, paling mudah **jadikan `sankalp` repo sendiri**:
   ```bash
   cd "D:/ASDP/02. PROJEK/files/sankalp"
   git init
   git add .
   git commit -m "SankaPage"
   git branch -M main
   git remote add origin https://github.com/USERNAME/sankalp.git
   git push -u origin main
   ```
2. Buka <https://vercel.com> → **Add New → Project** → **Import** repo `sankalp`.
3. **Framework Preset**: Next.js (auto).
4. **Environment Variables** → tambah 2 var:
   - `NEXT_PUBLIC_SUPABASE_URL` = (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (anon public)
5. **Deploy**.

> Kalau Anda push **repo besar** (bukan folder sankalp saja), di Vercel set **Root Directory = `sankalp`** pada langkah import.

---

## Setelah online

- Anda dapat URL `https://sankalp-xxxx.vercel.app`.
- Galeri, editor (studio), proyek (localStorage), panduan — semua jalan.
- **Sales page** (`sales-page/sanka-sales.html`) adalah file terpisah untuk ScaleV — **bukan** bagian yang di-deploy ke Vercel. Tempel isinya ke ScaleV Custom HTML (lihat halaman Panduan).

## Catatan penting

- Build Vercel memakai perintah default `next build` (mode aplikasi normal). **Jangan** set env `NEXT_EXPORT` di Vercel — itu khusus untuk membuat versi statis `out/` lokal.
- Update ke depan: setiap `git push` (Cara 2) atau `vercel --prod` (Cara 1) akan re-deploy otomatis.
- Fase 2 lanjutan (setelah Supabase aktif): ganti penyimpanan proyek dari localStorage (`lib/projects.ts`) ke tabel `projects`, dan review dari JSON ke tabel `reviews`. Struktur data sudah dibuat cocok, tinggal ganti fungsi baca/tulis.
