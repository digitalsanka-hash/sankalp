"use client";
// app/proyek/page.tsx — "Proyek Saya": daftar LP tersimpan milik user.
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProjects, deleteProject, duplicateProject, type Project,
} from "@/lib/projects";
import { getTemplate, defaultValues } from "@/lib/templates";
import { generateHtml, safeFileName } from "@/lib/generateHtml";
import MiniPreview from "@/components/MiniPreview";

function fmt(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch { return ""; }
}

export default function ProyekPage() {
  const [list, setList] = useState<Project[] | null>(null);
  const refresh = () => setList(getProjects());
  useEffect(() => { refresh(); }, []);

  function download(p: Project) {
    const t = getTemplate(p.template_id);
    if (!t) return;
    const html = generateHtml(t.html, { ...defaultValues(t), ...p.data_json });
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = safeFileName(String(p.data_json.brandNama ?? p.nama));
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Proyek Saya</h1>
          <p className="mt-1 text-gray-500">Semua landing page yang Anda simpan. Lanjut edit kapan saja.</p>
        </div>
        <Link href="/" className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-700">
          + Buat dari Galeri
        </Link>
      </div>

      {/* info penyimpanan lokal */}
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
        💾 Proyek tersimpan di <b>browser ini</b> (penyimpanan lokal). Jangan hapus data browser bila ingin proyek tetap ada.
        Untuk simpan permanen lintas perangkat, tersedia di Fase 2 (akun + cloud).
      </div>

      {list === null ? (
        <p className="py-16 text-center text-gray-400">Memuat…</p>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
          <div className="text-5xl">🗂️</div>
          <p className="mt-3 font-semibold text-ink">Belum ada proyek</p>
          <p className="mt-1 text-sm text-gray-500">Pilih template di galeri, edit, lalu klik “Simpan Proyek”.</p>
          <Link href="/" className="mt-5 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">
            Buka Galeri →
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const t = getTemplate(p.template_id);
            return (
              <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-soft transition hover:shadow-lift">
                <Link href={`/studio?project=${p.id}`} className="relative block border-b border-black/5">
                  <MiniPreview templateId={p.template_id} icon={t?.thumbnail ?? "📄"} values={p.data_json} />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-extrabold leading-snug tracking-tight text-ink">{p.nama}</h3>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {t?.nama ?? p.template_id} · diperbarui {fmt(p.updated_at)}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Link href={`/studio?project=${p.id}`}
                      className="flex-1 rounded-xl bg-brand-600 px-3 py-2 text-center text-sm font-bold text-white transition hover:bg-brand-700">
                      Lanjut Edit
                    </Link>
                    <button onClick={() => download(p)} title="Download HTML"
                      className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-brand-300 hover:text-ink">⬇️</button>
                    <button onClick={() => { duplicateProject(p.id); refresh(); }} title="Duplikat"
                      className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-brand-300 hover:text-ink">⧉</button>
                    <button
                      onClick={() => { if (confirm(`Hapus proyek "${p.nama}"? Tindakan ini tidak bisa dibatalkan.`)) { deleteProject(p.id); refresh(); } }}
                      title="Hapus"
                      className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold text-gray-400 transition hover:border-rose-300 hover:text-rose-500">🗑️</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
