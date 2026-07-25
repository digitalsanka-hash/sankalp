"use client";
// components/MiniPreview.tsx
// Thumbnail = pratinjau ASLI template (iframe di-skala kecil). Lazy-mount saat
// kartu masuk viewport agar galeri tetap ringan walau berisi 50 template.
import { useEffect, useRef, useState } from "react";
import { getTemplate, defaultValues, renderTemplate } from "@/lib/templates";

import type { FormValues } from "@/lib/types";

const IFRAME_W = 420; // lebar virtual (tampilan mobile)
const BOX_H = 210; // tinggi area thumbnail

export default function MiniPreview({
  templateId, icon, values,
}: { templateId: string; icon: string; values?: FormValues }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0.9);
  const [html, setHtml] = useState<string>("");

  // lazy: hanya render iframe saat mendekati viewport
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // hitung skala sesuai lebar kartu
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / IFRAME_W));
    ro.observe(el);
    setScale(el.clientWidth / IFRAME_W);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || html) return;
    const t = getTemplate(templateId);
    if (t) setHtml(renderTemplate(t, { ...defaultValues(t), ...(values ?? {}) }));
  }, [visible, html, templateId, values]);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ height: BOX_H }}
    >
      {html ? (
        <iframe
          title="pratinjau"
          srcDoc={html}
          scrolling="no"
          sandbox="allow-scripts"
          className="border-0"
          style={{
            width: IFRAME_W,
            height: Math.ceil(BOX_H / scale) + 40,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-5xl">
          {icon}
        </div>
      )}
      {/* gradasi bawah agar potongan halus */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
