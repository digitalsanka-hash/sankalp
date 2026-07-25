// lib/supabase.ts
// ------------------------------------------------------------------
// Klien Supabase — DISIAPKAN untuk Fase 2 (auth + database), TAPI di
// Fase 1 belum dipakai secara live. Aplikasi tetap jalan walau env
// kosong: fungsi isSupabaseConfigured() dipakai komponen untuk memutuskan
// apakah harus baca dari Supabase atau dari data lokal (JSON).
//
// Cara mengaktifkan (Fase 2):
//   1. Buat project di https://supabase.com
//   2. Salin .env.local.example -> .env.local
//   3. Isi NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
//   4. Jalankan supabase-schema.sql di SQL Editor Supabase
// ------------------------------------------------------------------
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Bersihkan URL Supabase: buang spasi, path ekstra (mis. /rest/v1), dan
 * trailing slash. Yang benar hanya origin: https://xxxx.supabase.co
 * Ini mencegah error "Invalid path specified in request URL" saat user
 * menempel URL dari halaman Data API.
 */
function cleanUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  try {
    return new URL(v).origin;
  } catch {
    return v.replace(/\/+$/, "");
  }
}

const url = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

/** true bila kredensial Supabase sudah diisi di .env.local */
export function isSupabaseConfigured(): boolean {
  return url.length > 0 && anonKey.length > 0;
}

/**
 * Mengembalikan klien Supabase, atau null bila belum dikonfigurasi.
 * Di Fase 1 nilainya null -> komponen otomatis pakai data lokal.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(url, anonKey)
  : null;
