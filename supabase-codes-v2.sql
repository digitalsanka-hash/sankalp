-- ==================================================================
-- SankaLP — TAMBAHAN v2: masa aktif kode + catatan email pembeli
-- Jalankan SETELAH supabase-codes.sql. Aman dijalankan berulang.
-- ==================================================================

alter table public.access_codes add column if not exists masa_aktif text;   -- 'lifetime' | '1' | '3' | '6' | '12' (bulan)
alter table public.access_codes add column if not exists expires_at timestamptz;
alter table public.access_codes add column if not exists email_pembeli text;
alter table public.access_codes add column if not exists dikirim_at timestamptz;

-- ---------- USER: tebus kode (versi masa aktif) ----------
create or replace function public.redeem_code(p_code text, p_label text default null)
returns json
language plpgsql security definer set search_path = public as $$
declare r public.access_codes; bulan int;
begin
  select * into r from public.access_codes where upper(code) = upper(trim(p_code));

  if not found then
    return json_build_object('ok', false, 'pesan', 'Kode tidak ditemukan. Periksa kembali penulisannya.');
  end if;
  if r.status = 'revoked' then
    return json_build_object('ok', false, 'pesan', 'Kode ini sudah dinonaktifkan. Hubungi penjual.');
  end if;
  if r.expires_at is not null and r.expires_at < now() then
    return json_build_object('ok', false, 'pesan', 'Masa aktif kode sudah habis. Silakan perpanjang.');
  end if;

  -- pemakaian pertama: mulai hitung masa aktif
  if r.redeemed_at is null then
    bulan := case when r.masa_aktif ~ '^\d+$' then r.masa_aktif::int else null end;
    update public.access_codes
       set redeemed_at = now(),
           dipakai_oleh = coalesce(p_label, dipakai_oleh),
           expires_at = case when bulan is null then null else now() + (bulan || ' months')::interval end
     where code = r.code;
  end if;

  return json_build_object('ok', true, 'role', r.role, 'pesan', 'Kode valid. Akses dibuka.');
end; $$;

-- ---------- cek ulang kode ----------
create or replace function public.check_code(p_code text)
returns json
language plpgsql security definer set search_path = public stable as $$
declare r public.access_codes;
begin
  select * into r from public.access_codes where upper(code) = upper(trim(p_code));
  if not found or r.status = 'revoked' then return json_build_object('ok', false); end if;
  if r.expires_at is not null and r.expires_at < now() then
    return json_build_object('ok', false, 'pesan', 'kadaluarsa');
  end if;
  return json_build_object('ok', true, 'role', r.role, 'expires_at', r.expires_at);
end; $$;

-- ---------- ADMIN: buat kode (dengan masa aktif) ----------
create or replace function public.admin_create_codes(
  p_admin text, p_jumlah int default 1, p_catatan text default null, p_masa text default 'lifetime')
returns setof public.access_codes
language plpgsql security definer set search_path = public as $$
declare i int; c text;
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  if p_jumlah < 1 or p_jumlah > 100 then raise exception 'Jumlah harus 1 sampai 100'; end if;

  for i in 1..p_jumlah loop
    loop
      c := public.gen_code();
      exit when not exists (select 1 from public.access_codes where code = c);
    end loop;
    insert into public.access_codes (code, catatan, masa_aktif)
    values (c, p_catatan, coalesce(nullif(trim(p_masa),''),'lifetime'));
  end loop;

  return query select * from public.access_codes
    where created_at > now() - interval '10 seconds' order by created_at desc;
end; $$;

-- ---------- ADMIN: catat pengiriman email ----------
create or replace function public.admin_mark_sent(p_admin text, p_code text, p_email text)
returns json
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.access_codes
                  where upper(code)=upper(trim(p_admin)) and role='admin' and status='active') then
    raise exception 'Kode admin tidak valid';
  end if;
  update public.access_codes
     set email_pembeli = p_email, dikirim_at = now()
   where upper(code) = upper(trim(p_code));
  return json_build_object('ok', true);
end; $$;

grant execute on function public.redeem_code(text, text)                 to anon, authenticated;
grant execute on function public.check_code(text)                        to anon, authenticated;
grant execute on function public.admin_create_codes(text,int,text,text)  to anon, authenticated;
grant execute on function public.admin_mark_sent(text,text,text)         to anon, authenticated;

notify pgrst, 'reload schema';

select code, role, status, masa_aktif, catatan from public.access_codes order by created_at desc limit 5;
