"use client";
// components/EmojiPicker.tsx — pemilih emoji kurasi. Popover via PORTAL + posisi
// fixed supaya tidak terpotong oleh container overflow-hidden / scroll.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GROUPS: { label: string; items: string[] }[] = [
  { label: "Marketing", items: ["🔥","💰","🚀","🎁","💎","✨","⭐","🏆","🎯","📈","💯","⚡","❤️","👍","🙌","🤩","🌟","💥"] },
  { label: "Kepercayaan", items: ["✓","✅","🛡️","🔒","🚚","💳","🏷️","⏰","⌛","📦","🤝","👌","🥇","🔖","📢","🧾"] },
  { label: "Produk", items: ["📘","📗","📱","💻","🎬","📷","🎤","🍳","🍜","☕","🍯","🌿","💊","🧴","💄","👗","👟","👜","⌚","🧕","🕌","🛏️","🧸","🎧","🔋","👓"] },
  { label: "Sehat & Alam", items: ["🌸","☀️","💧","🍃","🥗","🍵","🌴","🧘","💪","🩺"] },
  { label: "Wajah", items: ["😍","🥰","😊","😌","🤗","😎","🙂","😉","🤔","😮"] },
  { label: "Lainnya", items: ["💬","📲","🗓️","📝","📊","🎓","🙋","💡","👨‍👩‍👧","🏠","✈️","🎉"] },
];

const PANEL_W = 260;
const PANEL_H = 280;

export default function EmojiPicker({
  onPick, triggerClass, title = "Pilih emoji", label,
}: {
  onPick: (e: string) => void;
  triggerClass?: string;
  title?: string;
  label?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    let left = Math.min(r.right - PANEL_W, window.innerWidth - PANEL_W - 8);
    left = Math.max(8, left);
    let top = r.bottom + 4;
    if (top + PANEL_H > window.innerHeight) top = Math.max(8, r.top - PANEL_H - 4);
    setPos({ top, left });
  }, []);

  useEffect(() => {
    if (!open) return;
    place();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, place]);

  return (
    <>
      <button ref={btnRef} type="button" title={title} onClick={() => setOpen((v) => !v)}
        className={triggerClass ?? "inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white px-2 py-1 text-xs font-semibold text-gray-500 transition hover:border-brand-300 hover:text-ink"}>
        {label ?? "😊 Emoji"}
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div ref={panelRef}
          style={{ position: "fixed", top: pos.top, left: pos.left, width: PANEL_W, maxHeight: PANEL_H, zIndex: 1000 }}
          className="overflow-y-auto rounded-2xl border border-black/10 bg-white p-3 shadow-lift">
          {GROUPS.map((g) => (
            <div key={g.label} className="mb-2 last:mb-0">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">{g.label}</div>
              <div className="grid grid-cols-8 gap-0.5">
                {g.items.map((e, i) => (
                  <button key={g.label + i} type="button" title={e}
                    onClick={() => { onPick(e); setOpen(false); }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-lg transition hover:bg-brand-50">{e}</button>
                ))}
              </div>
            </div>
          ))}
        </div>, document.body)}
    </>
  );
}
