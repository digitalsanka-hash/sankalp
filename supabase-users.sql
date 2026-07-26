-- ==================================================================
-- SankaPage — IDENTITAS PENGGUNA (nama + username unik)
-- Jalankan di Supabase > SQL Editor SETELAH supabase-codes.sql & v2.
-- Aman dijalankan berulang.
--
-- Konsep:
--   Saat menebus kode, user WAJIB isi Nama + Username.
--   Username unik global (case-insensitive) -> mudah dilacak.
-- ==================================================================

create table if not exists public.app_users (
  username    text primary key,          -- disimpan huruf kecil
  nama        text not null,
  kode        text not null references public.access_codes(code) on delete cascade,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz
);

create index if not exists idx_app_users_kode on public.app_users(kode);

alter table public.app_users enable row level security;
-- tanpa policy anon: hanya lewat RPC security definer di bawah.

-- kolom bantu di access_codes
alter table public.access_codes add column if not exists username text;

-- ---------- cek ketersediaan username ----------
create or replace function public.username_tersedia(p_username text)
returns json
language plpgsql security definer set search_path = public stable as $$
declare u text := lower(trim(p_username));
begin
  if u !~ '^[a-z0-9._]{3,20}$' then
    return json_build_object('ok', false,
      'pesan', 'Username 3-20 karakter, hanya huruf/angka/titik/garis bawah.');
  end if;
  if exists (select 1 from public.app_users where username = u) then
    return json_build_object('ok', false, 'pesan', 'Username sudah dipakai. Coba yang lain.');
  end if;
  return json_build_object('ok', true);
end; $$;

-- ---------- tebus kode + daftar identitas (WAJIB nama & username) ----------
create or replace function public.redeem_code_v2(p_code text, p_nama text, p_username text)
returns json
language plpgsql security definer set search_path = public as $$
declare
  r public.access_codes;
  u text := lower(trim(p_username));
  n text := trim(p_nama);
  bulan int;
begin
  -- validasi identitas
  if n is null or length(n) < 2 then
    return json_build_object('ok', false, 'pesan', 'Nama wajib diisi (minimal 2 huruf).');
  end if;
  if u !~ '^[a-z0-9._]{3,20}$' then
    return json_build_object('ok', false,
      'pesan', 'Username 3-20 karakter, hanya huruf/angka/titik/garis bawah.');
  end if;

  -- validasi kode
  select * into r from public.access_codes where upper(code) = upper(trim(p_code));
  if not found then
    return json_build_object('ok', false, 'pesan', 'Kode tidak ditemukan. Periksa penulisannya.');
  end if;
  if r.status = 'revoked' then
    return json_build_object('ok', false, 'pesan', 'Kode ini sudah dinonaktifkan. Hubungi penjual.');
  end if;
  if r.expires_at is not null and r.expires_at < now() then
    return json_build_object('ok', false, 'pesan', 'Masa aktif kode sudah habis.');
  end if;

  -- username sudah dipakai orang lain?
  if exists (select 1 from public.app_users where username = u and kode <> r.code) then
    return json_build_object('ok', false, 'pesan', 'Username sudah dipakai. Coba yang lain.');
  end if;

  -- kode sudah terpakai username lain? (1 kode = 1 identitas)
  if r.username is not null and lower(r.username) <> u then
    return json_build_object('ok', false,
      'pesan', 'Kode ini sudah dipakai akun lain (' || r.username || ').');
  end if;

  -- simpan identitas
  insert into public.app_users (username, nama, kode, last_seen)
  values (u, n, r.code, now())
  on conflict (username) do update
    set nama = excluded.nama, last_seen = now();

  -- pemakaian pertama: mulai hitung masa aktif
  if r.redeemed_at is null then
    bulan := case when r.masa_aktif ~ '^\d+$' then r.masa_aktif::int else null end;
    update public.access_codes
       set redeemed_at = now(),
           username = u,
           dipakai_oleh = n,
           expires_at = case when bulan is null then null else now() + (bulan || ' months')::interval end
     where code = r.code;
  else
    update public.access_codes set username = u, dipakai_oleh = n where code = r.code;
  end if;

  return json_build_object('ok', true, 'role', r.role, 'username', u, 'nama', n,
                           'pesan', 'Selamat datang, ' || n || '!');
end; $$;

-- ---------- ADMIN: daftar pengguna ----------
create or replace function public.admin_list_users(p_admin text)
returns table (username text, nama text, kode text, created_at timestamptz, last_seen timestamptz,
               status text, masa_aktif text, expires_at timestamptz)
language plpgsql security definer set search_path = public stable as $$
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  return query
    select u.username, u.nama, u.kode, u.created_at, u.last_seen,
           c.status, c.masa_aktif, c.expires_at
      from public.app_users u
      join public.access_codes c on c.code = u.kode
     order by u.created_at desc;
end; $$;

grant execute on function public.username_tersedia(text)              to anon, authenticated;
grant execute on function public.redeem_code_v2(text, text, text)     to anon, authenticated;
grant execute on function public.admin_list_users(text)               to anon, authenticated;

notify pgrst, 'reload schema';

select 'OK — tabel app_users & fungsi siap' as hasil;
