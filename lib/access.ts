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
  masa_aktif?: string | null;   // 'lifetime' | '1' | '3' | '6' | '12'
  expires_at?: string | null;
  email_pembeli?: string | null;
  dikirim_at?: string | null;
}

export const MASA_OPSI = [
  { v: "lifetime", label: "Selamanya" },
  { v: "1", label: "1 bulan" },
  { v: "3", label: "3 bulan" },
  { v: "6", label: "6 bulan" },
  { v: "12", label: "12 bulan" },
] as const;

export function labelMasa(m?: string | null): string {
  if (!m || m === "lifetime") return "Selamanya";
  return `${m} bulan`;
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

export async function adminCreate(
  adminCode: string, jumlah: number, catatan?: string, masa: string = "lifetime"
): Promise<CodeRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("admin_create_codes", {
    p_admin: adminCode, p_jumlah: jumlah, p_catatan: catatan || null, p_masa: masa,
  });
  if (error) throw error;
  return (data ?? []) as CodeRow[];
}

/** Kirim kode ke email pembeli (lewat API route + Resend). */
export async function sendCodeEmail(args: {
  adminCode: string; nama: string; email: string; kode: string; masa: string;
}): Promise<{ ok: boolean; pesan?: string }> {
  const r = await fetch("/api/send-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.ok) return { ok: false, pesan: d.pesan || `Gagal (${r.status})` };
  // catat pengiriman di DB (abaikan bila gagal)
  try {
    await supabase?.rpc("admin_mark_sent", {
      p_admin: args.adminCode, p_code: args.kode, p_email: args.email,
    });
  } catch (_) {}
  return { ok: true };
}

export async function adminSetStatus(adminCode: string, code: string, status: "active" | "revoked"): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.rpc("admin_set_status", {
    p_admin: adminCode, p_code: code, p_status: status,
  });
  if (error) throw error;
}
