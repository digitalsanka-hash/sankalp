// lib/profile.ts — operasi profil untuk ADMIN (kelola user).
// RLS: hanya admin yang bisa baca semua & update (lihat supabase-profiles.sql).
import { supabase } from "./supabase";

export interface Profile {
  id: string;
  email: string | null;
  status: "active" | "inactive";
  role: "user" | "admin";
  created_at: string;
}

/** Daftar semua user (khusus admin — RLS memblokir non-admin). */
export async function listProfiles(): Promise<Profile[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("profiles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Profile[];
}

/** Aktif/nonaktifkan akun user (khusus admin). */
export async function setUserStatus(id: string, status: "active" | "inactive"): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
  if (error) throw error;
}
