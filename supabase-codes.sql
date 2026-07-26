-- ==================================================================
-- SankaPage — SISTEM KODE AKSES (gaya FinPlan)
-- Jalankan di Supabase > SQL Editor. Aman dijalankan berulang.
--
-- Konsep:
--   - Admin membuat KODE (mis. SANKA-9F3K-2LM8).
--   - Pembeli bayar -> Anda kirim kodenya.
--   - Pembeli tempel kode di halaman /aktivasi -> akun aktif (tanpa email).
--   - Kode admin (role='admin') dipakai untuk membuka Panel Admin.
-- ==================================================================

create extension if not exists "pgcrypto";

create table if not exists public.access_codes (
  code        text primary key,
  role        text not null default 'user' check (role in ('user','admin')),
  status      text not null default 'active' check (status in ('active','revoked')),
  catatan     text,                       -- nama pembeli / no. WA / no. order
  dipakai_oleh text,                      -- diisi otomatis saat kode ditebus
  redeemed_at timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.access_codes enable row level security;
-- Tidak ada policy untuk anon: tabel TIDAK bisa dibaca/ditulis langsung.
-- Semua akses lewat fungsi RPC di bawah (security definer).

-- ---------- util: generator kode acak ----------
create or replace function public.gen_code()
returns text language plpgsql as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- tanpa I,O,0,1 (biar tak salah baca)
  p1 text := ''; p2 text := ''; i int;
begin
  for i in 1..4 loop p1 := p1 || substr(chars, floor(random()*32)::int + 1, 1); end loop;
  for i in 1..4 loop p2 := p2 || substr(chars, floor(random()*32)::int + 1, 1); end loop;
  return 'SANKA-' || p1 || '-' || p2;
end; $$;

-- ---------- USER: tebus kode ----------
-- Mengembalikan: {ok, role, pesan}
create or replace function public.redeem_code(p_code text, p_label text default null)
returns json
language plpgsql security definer set search_path = public as $$
declare r public.access_codes;
begin
  select * into r from public.access_codes
   where upper(code) = upper(trim(p_code));

  if not found then
    return json_build_object('ok', false, 'pesan', 'Kode tidak ditemukan. Periksa kembali penulisannya.');
  end if;
  if r.status = 'revoked' then
    return json_build_object('ok', false, 'pesan', 'Kode ini sudah dinonaktifkan. Hubungi penjual.');
  end if;

  -- tandai pemakaian pertama
  if r.redeemed_at is null then
    update public.access_codes
       set redeemed_at = now(),
           dipakai_oleh = coalesce(p_label, dipakai_oleh)
     where code = r.code;
  end if;

  return json_build_object('ok', true, 'role', r.role, 'pesan', 'Kode valid. Akses dibuka.');
end; $$;

-- ---------- cek ulang kode (dipanggil app saat dibuka) ----------
create or replace function public.check_code(p_code text)
returns json
language plpgsql security definer set search_path = public stable as $$
declare r public.access_codes;
begin
  select * into r from public.access_codes where upper(code) = upper(trim(p_code));
  if not found or r.status = 'revoked' then
    return json_build_object('ok', false);
  end if;
  return json_build_object('ok', true, 'role', r.role);
end; $$;

-- ---------- ADMIN: daftar semua kode ----------
create or replace function public.admin_list_codes(p_admin text)
returns setof public.access_codes
language plpgsql security definer set search_path = public stable as $$
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  return query select * from public.access_codes order by created_at desc;
end; $$;

-- ---------- ADMIN: buat kode baru (bisa banyak sekaligus) ----------
create or replace function public.admin_create_codes(p_admin text, p_jumlah int default 1, p_catatan text default null)
returns setof public.access_codes
language plpgsql security definer set search_path = public as $$
declare i int; c text;
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  if p_jumlah < 1 or p_jumlah > 100 then
    raise exception 'Jumlah harus 1 sampai 100';
  end if;

  for i in 1..p_jumlah loop
    loop
      c := public.gen_code();
      exit when not exists (select 1 from public.access_codes where code = c);
    end loop;
    insert into public.access_codes (code, catatan) values (c, p_catatan);
  end loop;

  return query select * from public.access_codes
    where created_at > now() - interval '10 seconds' order by created_at desc;
end; $$;

-- ---------- ADMIN: aktif/nonaktifkan kode ----------
create or replace function public.admin_set_status(p_admin text, p_code text, p_status text)
returns json
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  if p_status not in ('active','revoked') then
    raise exception 'Status tidak valid';
  end if;
  update public.access_codes set status = p_status where upper(code)=upper(trim(p_code));
  return json_build_object('ok', true);
end; $$;

-- izinkan pemanggilan RPC oleh pengunjung (anon) & user login
grant execute on function public.redeem_code(text, text)          to anon, authenticated;
grant execute on function public.check_code(text)                 to anon, authenticated;
grant execute on function public.admin_list_codes(text)           to anon, authenticated;
grant execute on function public.admin_create_codes(text,int,text) to anon, authenticated;
grant execute on function public.admin_set_status(text,text,text) to anon, authenticated;

-- ==================================================================
-- BUAT KODE ADMIN PERTAMA (ganti sesuai selera, huruf besar):
-- ==================================================================
insert into public.access_codes (code, role, catatan)
values ('SANKA-ADMIN-2026', 'admin', 'Kode admin utama')
on conflict (code) do nothing;

-- Segarkan cache API (WAJIB, agar fungsi langsung dikenali aplikasi).
notify pgrst, 'reload schema';

-- Lihat hasilnya:
select code, role, status, catatan from public.access_codes order by created_at desc;
