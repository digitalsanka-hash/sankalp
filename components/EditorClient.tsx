"use client";
// components/EditorClient.tsx — INTI produk: editor + live preview + simpan proyek.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTemplate, defaultValues } from "@/lib/templates";
import { generateHtml, safeFileName } from "@/lib/generateHtml";
import {
  getProject, createProject, updateProject, type Project,
} from "@/lib/projects";
import type { FieldValue, FormValues } from "@/lib/types";
import EditorPanel from "@/components/EditorPanel";
import LivePreview from "@/components/LivePreview";

interface Props {
  templateId?: string; // mode: mulai baru dari template
  projectId?: string; // mode: lanjut edit proyek tersimpan
}

export default function EditorClient({ templateId, projectId }: Props) {
  const router = useRouter();

  // muat proyek bila projectId (client-only)
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  useEffect(() => {
    if (projectId) setProject(getProject(projectId) ?? null);
    else setProject(null);
  }, [projectId]);

  const effTemplateId = projectId ? project?.template_id : templateId;
  const template = effTemplateId ? getTemplate(effTemplateId) : undefined;

  const [values, setValues] = useState<FormValues | null>(null);
  const [nama, setNama] = useState("");
  const [savedId, setSavedId] = useState<string | null>(projectId ?? null);
  const [status, setStatus] = useState<"idle" | "saved" | "dirty">("idle");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  // inisialisasi nilai form saat template/proyek siap
  useEffect(() => {
    if (values !== null || !template) return;
    if (projectId) {
      if (project === undefined) return; // masih memuat
      if (project === null) return; // tidak ketemu (ditangani di render)
      setValues({ ...defaultValues(template), ...project.data_json });
      setNama(project.nama);
      setSavedId(project.id);
    } else {
      setValues(defaultValues(template));
      setNama(`${template.nama}`);
    }
  }, [template, project, projectId, values]);

  const html = useMemo(
    () => (template && values ? generateHtml(template.html, values) : ""),
    [template, values]
  );

  // proyek tak ditemukan
  if (projectId && project === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-gray-500">Proyek tidak ditemukan (mungkin sudah dihapus).</p>
        <Link href="/proyek" className="mt-4 inline-block font-semibold text-brand-600">← Ke Proyek Saya</Link>
      </div>
    );
  }
  if (!template || values === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center text-gray-400">Memuat editor…</div>
    );
  }

  function setField(key: string, value: FieldValue) {
    setValues((prev) => ({ ...(prev as FormValues), [key]: value }));
    setStatus("dirty");
  }

  function saveProject() {
    if (!values) return;
    if (savedId) {
      updateProject(savedId, { nama, data_json: values });
      setStatus("saved");
    } else {
      const p = createProject(nama, effTemplateId as string, values);
      setSavedId(p.id);
      setStatus("saved");
      router.replace(`/studio?project=${p.id}`);
    }
    setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 2200);
  }

  function downloadHtml() {
    const brand = String(values?.brandNama ?? nama ?? "landing-page");
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = safeFileName(brand);
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function previewFull() {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 bg-white/80 px-4 py-2.5 backdrop-blur">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/proyek" className="flex-none rounded-lg px-2 py-1 text-sm font-semibold text-gray-500 transition hover:bg-black/5 hover:text-ink">← Proyek</Link>
          <input
            value={nama}
            onChange={(e) => { setNama(e.target.value); setStatus("dirty"); }}
            className="min-w-0 max-w-[220px] rounded-lg border border-transparent bg-transparent px-2 py-1 font-display text-[15px] font-extrabold tracking-tight text-ink outline-none transition hover:border-black/10 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            title="Nama proyek — klik untuk ubah"
          />
          {status === "saved" && <span className="text-xs font-semibold text-brand-600">✓ Tersimpan</span>}
          {status === "dirty" && savedId && <span className="text-xs text-gray-400">• belum disimpan</span>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={previewFull}
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:border-brand-300 hover:text-ink">🔍 Pratinjau</button>
          <button onClick={saveProject}
            className="rounded-xl border border-brand-600 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 shadow-sm transition hover:bg-brand-100">💾 Simpan Proyek</button>
          <button onClick={downloadHtml}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-brand-700">⬇️ Download HTML</button>
          <button disabled title="Tersedia di Fase 2 (butuh login + langganan)"
            className="hidden cursor-not-allowed rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold text-gray-300 sm:block">🚀 Publish</button>
        </div>
      </div>

      {/* Toggle mobile */}
      <div className="flex border-b border-black/5 bg-white lg:hidden">
        <button onClick={() => setTab("edit")}
          className={`flex-1 py-2.5 text-sm font-bold ${tab === "edit" ? "border-b-2 border-brand-600 text-brand-700" : "text-gray-400"}`}>✏️ Edit</button>
        <button onClick={() => setTab("preview")}
          className={`flex-1 py-2.5 text-sm font-bold ${tab === "preview" ? "border-b-2 border-brand-600 text-brand-700" : "text-gray-400"}`}>👁️ Pratinjau</button>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className={`w-full overflow-y-auto border-r border-black/5 bg-[color:var(--paper)] lg:block lg:w-[440px] ${tab === "edit" ? "block" : "hidden"}`}>
          <div className="flex items-start gap-2.5 border-b border-black/5 bg-gradient-to-r from-brand-50 to-transparent px-4 py-3.5 text-[13px] leading-relaxed text-brand-800">
            <span className="text-base">💡</span>
            <span>Isi kolom di bawah — pratinjau berubah otomatis. Klik <b>Simpan Proyek</b> untuk menyimpan, atau <b>Download HTML</b> untuk file siap deploy.</span>
          </div>
          <EditorPanel sections={template.sections} values={values} onChange={setField} />
        </div>

        <div className={`min-w-0 flex-1 lg:block ${tab === "preview" ? "block" : "hidden"}`}>
          <LivePreview html={html} />
        </div>
      </div>
    </div>
  );
}
