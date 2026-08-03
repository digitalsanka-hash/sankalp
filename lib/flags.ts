// lib/flags.ts — SAKLAR DARURAT.
//
// BUKA_DARURAT = true  -> gerbang kode akses DIMATIKAN, semua orang bisa masuk.
// BUKA_DARURAT = false -> gerbang normal, wajib kode akses yang sah.
//
// Dinyalakan 3 Agustus 2026 karena project Supabase SankaPage
// (mqivmiijewvdwrxzbrzt) tidak bisa dihubungi, sehingga kode akses tidak bisa
// diperiksa dan pembeli yang sah ikut terkunci.
//
// ▼ KEMBALIKAN KE false BEGITU SUPABASE PULIH ▼
export const BUKA_DARURAT = true;
