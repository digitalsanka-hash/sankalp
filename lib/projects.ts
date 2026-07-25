// lib/projects.ts
// ------------------------------------------------------------------
// Penyimpanan PROYEK milik user (LP hasil edit).
//  - Bila Supabase dikonfigurasi & user LOGIN  -> tabel `projects` (cloud).
//  - Bila tidak                                 -> localStorage (per-browser).
// Struktur Project cocok dengan tabel Supabase `projects`.
// Semua fungsi ASYNC.
// ------------------------------------------------------------------
import type { FormValues } from "./types";
import { supabase } from "./supabase";

export interface Project {
  id: string;
  nama: string;
  template_id: string;
  data_json: FormValues;
  created_at: string;
  updated_at: string;
}

const KEY = "sankalp_projects_v1";

// ---------- util ----------
function nowIso() { return new Date().toISOString(); }
function uid() {
  try { if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID(); } catch (_) {}
  return "p_" + Math.abs(Date.now() ^ Math.floor(Math.random() * 1e9)).toString(36);
}
async function currentUserId(): Promise<string | null> {
  // Sistem akses berbasis KODE (bukan auth user) -> proyek disimpan lokal.
  return null;
}
/** true bila harus pakai cloud (Supabase aktif + user login). */
export async function usingCloud(): Promise<boolean> {
  return !!supabase && !!(await currentUserId());
}

// ---------- localStorage ----------
function localAll(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: Project[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  } catch (_) { return []; }
}
function localWrite(list: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

// map baris DB -> Project
type Row = { id: string; nama: string; template_id: string; data_json: FormValues; created_at: string; updated_at: string };
const rowToProject = (r: Row): Project => ({
  id: r.id, nama: r.nama, template_id: r.template_id,
  data_json: r.data_json, created_at: r.created_at, updated_at: r.updated_at,
});

// ---------- API ----------
export async function getProjects(): Promise<Project[]> {
  if (supabase && (await currentUserId())) {
    const { data, error } = await supabase
      .from("projects").select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(rowToProject);
  }
  return localAll();
}

export async function getProject(id: string): Promise<Project | undefined> {
  if (supabase && (await currentUserId())) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? rowToProject(data as Row) : undefined;
  }
  return localAll().find((p) => p.id === id);
}

export async function createProject(nama: string, template_id: string, data_json: FormValues): Promise<Project> {
  const cleanName = nama.trim() || "Proyek Tanpa Nama";
  const userId = await currentUserId();
  if (supabase && userId) {
    const { data, error } = await supabase
      .from("projects")
      .insert({ user_id: userId, nama: cleanName, template_id, data_json })
      .select("*").single();
    if (error) throw error;
    return rowToProject(data as Row);
  }
  const p: Project = { id: uid(), nama: cleanName, template_id, data_json, created_at: nowIso(), updated_at: nowIso() };
  const list = localAll(); list.unshift(p); localWrite(list);
  return p;
}

export async function updateProject(id: string, patch: Partial<Pick<Project, "nama" | "data_json">>): Promise<void> {
  if (supabase && (await currentUserId())) {
    const { error } = await supabase
      .from("projects")
      .update({ ...patch, updated_at: nowIso() })
      .eq("id", id);
    if (error) throw error;
    return;
  }
  const list = localAll();
  const i = list.findIndex((p) => p.id === id);
  if (i === -1) return;
  list[i] = { ...list[i], ...patch, updated_at: nowIso() };
  localWrite(list);
}

export async function deleteProject(id: string): Promise<void> {
  if (supabase && (await currentUserId())) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  localWrite(localAll().filter((p) => p.id !== id));
}

export async function duplicateProject(id: string): Promise<Project | undefined> {
  const src = await getProject(id);
  if (!src) return undefined;
  return createProject(`${src.nama} (Salinan)`, src.template_id, JSON.parse(JSON.stringify(src.data_json)));
}
