// lib/access.ts — sistem KODE AKSES (gaya FinPlan). Tanpa email/password.
//  - Pembeli menempel kode -> tersimpan di browser -> fitur terbuka.
//  - Kode role 'admin' membuka Panel Admin.
// Semua akses DB lewat RPC security-definer (tabel tak bisa dibaca langsung).
import { supabase } from "./supabase";

const KEY = "sankalp_access_code";

export interface CodeRow {
  code: string;
  role: "user" | "admin";
  status: "active" | "revoked";
  catatan: string | null;
  dipakai_oleh: string | null;
  redeemed_at: string | null;
  created_at: string;
}

export function savedCode(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(KEY) ?? "";
}
export function saveCode(code: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, code.trim().toUpperCase());
}
export function clearCode() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}

/** Tebus kode (aktivasi pertama). */
export async function redeem(code: string, label?: string): Promise<{ ok: boolean; role?: "user" | "admin"; pesan: string }> {
  if (!supabase) return { ok: false, pesan: "Sistem kode belum aktif (Supabase belum dikonfigurasi)." };
  const { data, error } = await supabase.rpc("redeem_code", {
    p_code: code.trim(),
    p_label: label ?? null,
  });
  if (error) return { ok: false, pesan: error.message };
  return data as { ok: boolean; role?: "user" | "admin"; pesan: string };
}

/** Cek ulang kode yang tersimpan (dipanggil saat app dibuka). */
export async function verify(code: string): Promise<{ ok: boolean; role?: "user" | "admin" }> {
  if (!supabase || !code) return { ok: false };
  const { data, error } = await supabase.rpc("check_code", { p_code: code });
  if (error) return { ok: false };
  return data as { ok: boolean; role?: "user" | "admin" };
}

// ---------- ADMIN ----------
export async function adminList(adminCode: string): Promise<CodeRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("admin_list_codes", { p_admin: adminCode });
  if (error) throw error;
  return (data ?? []) as CodeRow[];
}

export async function adminCreate(adminCode: string, jumlah: number, catatan?: string): Promise<CodeRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("admin_create_codes", {
    p_admin: adminCode, p_jumlah: jumlah, p_catatan: catatan || null,
  });
  if (error) throw error;
  return (data ?? []) as CodeRow[];
}

export async function adminSetStatus(adminCode: string, code: string, status: "active" | "revoked"): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.rpc("admin_set_status", {
    p_admin: adminCode, p_code: code, p_status: status,
  });
  if (error) throw error;
}
