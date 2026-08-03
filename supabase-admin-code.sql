-- ==================================================================
-- SankaPage — BUAT KODE ADMIN
-- Jalankan di Supabase → SQL Editor, SETELAH:
--   supabase-codes.sql → supabase-codes-v2.sql → supabase-users.sql
-- Aman dijalankan berulang (tidak akan menggandakan).
-- ==================================================================

insert into public.access_codes (code, role, status, masa_aktif, catatan)
values ('SANKA-ADMN-MGYX-HXEF', 'admin', 'active', 'lifetime', 'Kode admin utama — Irsan')
on conflict (code) do update
  set role = 'admin', status = 'active', masa_aktif = 'lifetime';

-- Periksa hasilnya:
select code, role, status, masa_aktif, redeemed_at, expires_at
from public.access_codes
where role = 'admin';

-- ------------------------------------------------------------------
-- CATATAN KEAMANAN
-- 1. Kode admin ini membuka panel /admin (buat kode, lihat user, kirim email).
--    Perlakukan seperti kata sandi. Jangan ditempel di chat, gambar, atau repo publik.
-- 2. Kalau bocor, cabut lalu buat yang baru:
--      update public.access_codes set status = 'revoked' where code = 'SANKA-ADMN-MGYX-HXEF';
--    lalu ulangi insert di atas dengan kode baru.
-- 3. RPC admin (admin_create_codes, admin_list_codes, admin_list_users, admin_set_status)
--    diberikan ke peran `anon` dan hanya dijaga oleh pemeriksaan "kode ini admin atau bukan".
--    Artinya siapa pun yang tahu kode ini bisa memanggilnya langsung ke Supabase,
--    tanpa lewat aplikasi. Kode ini satu-satunya kunci — jaga baik-baik.
-- ==================================================================
