"use client";
// components/LivePreview.tsx — iframe pratinjau real-time (srcDoc) premium.
import { useEffect, useRef, useState } from "react";

interface Props { html: string }
type Mode = "mobile" | "desktop";

export default function LivePreview({ html }: Props) {
  const [mode, setMode] = useState<Mode>("mobile");
  const [debounced, setDebounced] = useState(html);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(html), 300);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [html]);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-brand-500" />
          <span className="text-sm font-bold text-gray-500">Pratinjau Langsung</span>
        </div>
        <div className="inline-flex rounded-xl bg-gray-100 p-0.5">
          <button onClick={() => setMode("mobile")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${mode === "mobile" ? "bg-white text-ink shadow" : "text-gray-500"}`}>📱 HP</button>
          <button onClick={() => setMode("desktop")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${mode === "desktop" ? "bg-white text-ink shadow" : "text-gray-500"}`}>💻 Laptop</button>
        </div>
      </div>

      <div
        className="flex flex-1 justify-center overflow-auto p-5"
        style={{
          background:
            "radial-gradient(circle at 1px 1px, rgba(10,15,13,.06) 1px, transparent 0) 0 0/22px 22px, #eef1ef",
        }}
      >
        <div
          className="bg-white transition-all"
          style={{
            width: mode === "mobile" ? 390 : "100%",
            maxWidth: mode === "mobile" ? 390 : 940,
            height: "100%",
            borderRadius: mode === "mobile" ? 28 : 12,
            overflow: "hidden",
            boxShadow: "0 24px 60px -18px rgba(10,15,13,.4), 0 0 0 1px rgba(10,15,13,.06)",
            border: mode === "mobile" ? "8px solid #0a0f0d" : "1px solid rgba(10,15,13,.08)",
          }}
        >
          <iframe
            title="Pratinjau"
            srcDoc={debounced}
            className="h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
