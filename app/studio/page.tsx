"use client";
// app/studio/page.tsx — editor via query:
//   /studio?template=<id>  -> mulai proyek baru dari template
//   /studio?project=<id>   -> lanjut edit proyek tersimpan
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EditorClient from "@/components/EditorClient";

function StudioInner() {
  const sp = useSearchParams();
  const template = sp.get("template") || undefined;
  const project = sp.get("project") || undefined;

  if (!template && !project) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-gray-500">Belum ada template dipilih.</p>
        <Link href="/" className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white">
          Pilih dari Galeri →
        </Link>
      </div>
    );
  }
  return <EditorClient templateId={template} projectId={project} />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-400">Memuat editor…</div>}>
      <StudioInner />
    </Suspense>
  );
}
