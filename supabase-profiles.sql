-- ==================================================================
-- SankaPage — Profiles + Admin + Kontrol Akses (Fase 2)
-- Jalankan SETELAH supabase-schema.sql, di Supabase > SQL Editor.
-- Aman dijalankan ulang (idempoten).
-- ==================================================================

-- Tabel profil: 1 baris per user. status = aktif/tidak (dikontrol admin).
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  status     text not null default 'inactive' check (status in ('active','inactive')),
  role       text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- Auto-buat profil saat user baru mendaftar.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: apakah user yang login adalah admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- RLS
alter table public.profiles enable row level security;

drop policy if exists "profiles_read" on public.profiles;
create policy "profiles_read" on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update" on public.profiles for update
  using (public.is_admin()) with check (public.is_admin());

-- ==================================================================
-- BOOTSTRAP ADMIN (jalankan SEKALI setelah Anda login pertama):
--   Ganti email di bawah dengan email admin Anda, lalu Run.
--
--   update public.profiles
--   set role = 'admin', status = 'active'
--   where email = 'EMAIL_ADMIN_ANDA@contoh.com';
--
-- Kalau barisnya belum ada (belum pernah login), login dulu di aplikasi,
-- baru jalankan perintah update di atas.
-- ==================================================================

-- (opsional) backfill profil untuk user yang sudah terlanjur daftar
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;
