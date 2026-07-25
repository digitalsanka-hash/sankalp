// lib/projects.ts
// ------------------------------------------------------------------
// Penyimpanan PROYEK milik user (LP hasil edit). FASE 1: localStorage.
// Struktur objek Project SENGAJA cocok dengan tabel Supabase `projects`
// (id, template_id, data_json, created_at) supaya mudah dipindah di Fase 2.
//
// Galeri (lib/templates.ts) = TEMPLATE bawaan, read-only. Proyek = salinan
// milik user yang bisa disimpan & diedit ulang.
// ------------------------------------------------------------------
import type { FormValues } from "./types";

export interface Project {
  id: string;
  nama: string; // nama proyek yang diberi user
  template_id: string; // template asal
  data_json: FormValues; // nilai form editor
  created_at: string;
  updated_at: string;
}

const KEY = "sankalp_projects_v1";

function nowIso(): string {
  return new Date().toISOString();
}
function uid(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch (_) {}
  return "p_" + Math.abs(Date.now() ^ Math.floor(Math.random() * 1e9)).toString(36);
}

/** Baca semua proyek (terbaru dulu). Aman di server (kembalikan []). */
export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: Project[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  } catch (_) {
    return [];
  }
}

function writeAll(list: Project[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

/** Buat proyek baru, kembalikan id. */
export function createProject(nama: string, template_id: string, data_json: FormValues): Project {
  const p: Project = {
    id: uid(),
    nama: nama.trim() || "Proyek Tanpa Nama",
    template_id,
    data_json,
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  const list = getProjects();
  list.unshift(p);
  writeAll(list);
  return p;
}

/** Perbarui proyek yang ada. */
export function updateProject(id: string, patch: Partial<Pick<Project, "nama" | "data_json">>): void {
  const list = getProjects();
  const i = list.findIndex((p) => p.id === id);
  if (i === -1) return;
  list[i] = { ...list[i], ...patch, updated_at: nowIso() };
  writeAll(list);
}

export function deleteProject(id: string): void {
  writeAll(getProjects().filter((p) => p.id !== id));
}

/** Duplikat proyek (mis. untuk membuat varian). */
export function duplicateProject(id: string): Project | undefined {
  const src = getProject(id);
  if (!src) return undefined;
  return createProject(`${src.nama} (Salinan)`, src.template_id, JSON.parse(JSON.stringify(src.data_json)));
}
