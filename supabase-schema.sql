-- ==================================================================
-- SankaLP — Skema Database (FASE 2)
-- ------------------------------------------------------------------
-- JANGAN dijalankan di Fase 1. Ini disiapkan untuk nanti saat Supabase
-- + auth diaktifkan. Jalankan di Supabase Dashboard > SQL Editor.
-- ==================================================================

-- Ekstensi untuk uuid
create extension if not exists "pgcrypto";

-- ---------- templates ----------------------------------------------
-- Katalog template. Di Fase 1 masih di-hardcode di lib/templates.ts;
-- di Fase 2 bisa dipindah ke tabel ini agar admin bisa tambah template
-- tanpa deploy ulang.
create table if not exists public.templates (
  id            text primary key,          -- mis. 'digital-ebook'
  nama          text not null,
  kategori      text not null check (kategori in ('digital','fisik','lead')),
  thumbnail_url text,
  html_content  text not null,             -- HTML mentah dengan placeholder
  created_at    timestamptz not null default now()
);

-- ---------- reviews ------------------------------------------------
-- Struktur SAMA PERSIS dengan data/reviews.json Fase 1.
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  template_id text not null references public.templates(id) on delete cascade,
  rating      int  not null check (rating between 1 and 5),
  nama        text not null,
  komentar    text not null,
  created_at  timestamptz not null default now()
);
create index if not exists idx_reviews_template on public.reviews(template_id);

-- ---------- projects (Fase 2) --------------------------------------
-- Menyimpan hasil edit user (nilai form) agar bisa dibuka & diedit lagi.
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  template_id text not null references public.templates(id),
  data_json   jsonb not null,              -- FormValues dari editor
  created_at  timestamptz not null default now()
);
create index if not exists idx_projects_user on public.projects(user_id);

-- ---------- subscriptions (Fase 2) ---------------------------------
-- Status langganan SaaS per user.
create table if not exists public.subscriptions (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  status              text not null default 'inactive'
                        check (status in ('active','inactive','trialing','past_due','canceled')),
  plan                text,                -- mis. 'starter', 'pro'
  current_period_end  timestamptz,
  created_at          timestamptz not null default now()
);
create unique index if not exists idx_subs_user on public.subscriptions(user_id);

-- ==================================================================
-- Row Level Security (Fase 2) — contoh kebijakan.
-- ==================================================================
alter table public.reviews       enable row level security;
alter table public.projects      enable row level security;
alter table public.subscriptions enable row level security;

-- Reviews: siapa saja boleh baca; hanya user login boleh menulis.
create policy "reviews_read_all"   on public.reviews for select using (true);
create policy "reviews_insert_auth" on public.reviews for insert
  with check (auth.role() = 'authenticated');

-- Projects: user hanya boleh mengakses miliknya sendiri.
create policy "projects_owner" on public.projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Subscriptions: user hanya boleh membaca miliknya sendiri.
create policy "subs_owner_read" on public.subscriptions
  for select using (auth.uid() = user_id);
