"use client";
// components/EditorPanel.tsx — panel edit premium, ramah awam, accordion.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  Section, FieldDef, FormValues, FieldValue, ListValue, SubField,
} from "@/lib/types";
import EmojiPicker from "./EmojiPicker";
import { suggestionsFor } from "@/lib/copybank";

const INSP_W = 288;
const INSP_H = 300;

// Tombol "💡 Contoh" — daftar copy terbukti konversi. Popover via PORTAL + fixed
// supaya tidak terpotong oleh kartu (overflow-hidden) atau area scroll.
function InspirasiButton({ options, onPick }: { options: string[]; onPick: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    let left = Math.max(8, Math.min(r.left, window.innerWidth - INSP_W - 8));
    let top = r.bottom + 4;
    if (top + INSP_H > window.innerHeight) top = Math.max(8, r.top - INSP_H - 4);
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
      <button ref={btnRef} type="button" onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700 transition hover:bg-amber-100">
        💡 Contoh
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div ref={panelRef}
          style={{ position: "fixed", top: pos.top, left: pos.left, width: INSP_W, maxHeight: INSP_H, zIndex: 1000 }}
          className="overflow-y-auto rounded-2xl border border-black/10 bg-white p-2 shadow-lift">
          <div className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Pilih untuk pakai · edit lagi bebas</div>
          {options.map((o, i) => (
            <button key={i} type="button" onClick={() => { onPick(o); setOpen(false); }}
              className="mb-1 block w-full rounded-lg px-2.5 py-2 text-left text-[13px] leading-snug text-gray-700 transition last:mb-0 hover:bg-brand-50 hover:text-ink">
              {o}
            </button>
          ))}
        </div>, document.body)}
    </>
  );
}

interface Props {
  sections: Section[];
  values: FormValues;
  onChange: (key: string, value: FieldValue) => void;
  parts?: { id: string; label: string }[]; // untuk panel Susunan Halaman
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function HelpTip({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span
      title={text}
      className="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 align-middle text-[10px] font-bold text-gray-500 transition hover:bg-brand-500 hover:text-white"
      aria-label={text}
    >
      ?
    </span>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

function ImageField({
  value, onChange, compact,
}: { value: string; onChange: (v: string) => void; compact?: boolean }) {
  const size = compact ? "h-10 w-10" : "h-16 w-16";
  return (
    <div className="flex items-center gap-2.5">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="pratinjau" className={`rounded-xl border border-black/10 object-cover ${size}`} />
      ) : (
        <div className={`flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-300 ${size}`}>🖼️</div>
      )}
      <label className="cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-bold text-gray-600 shadow-sm transition hover:border-brand-300 hover:text-ink">
        Unggah
        <input type="file" accept="image/*" className="hidden"
          onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f)); }} />
      </label>
      {value && (
        <button type="button" onClick={() => onChange("")} className="text-xs font-semibold text-gray-400 transition hover:text-rose-500">Hapus</button>
      )}
    </div>
  );
}

function ListField({
  field, value, onChange,
}: { field: FieldDef; value: ListValue; onChange: (v: ListValue) => void }) {
  const subs = field.subFields ?? [];
  const updateRow = (i: number, key: string, v: string) =>
    onChange(value.map((row, idx) => (idx === i ? { ...row, [key]: v } : row)));
  const addRow = () => {
    const blank: Record<string, string> = {};
    subs.forEach((s) => (blank[s.key] = ""));
    onChange([...value, blank]);
  };
  const removeRow = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  // pindah posisi baris (↑/↓) — gaya ScaleV
  const moveRow = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2.5">
      {value.map((row, i) => (
        <div key={i} className="rounded-2xl border border-black/[0.07] bg-gray-50/80 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-brand-100 px-1.5 text-[11px] font-bold text-brand-700">{i + 1}</span>
              {/* atur posisi (gaya ScaleV) */}
              <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white">
                <button type="button" title="Pindah ke atas" aria-label="Pindah ke atas"
                  disabled={i === 0} onClick={() => moveRow(i, -1)}
                  className="px-1.5 py-0.5 text-[11px] font-bold text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-gray-200 disabled:hover:bg-white">↑</button>
                <span className="w-px bg-black/10" />
                <button type="button" title="Pindah ke bawah" aria-label="Pindah ke bawah"
                  disabled={i === value.length - 1} onClick={() => moveRow(i, 1)}
                  className="px-1.5 py-0.5 text-[11px] font-bold text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-gray-200 disabled:hover:bg-white">↓</button>
              </div>
            </div>
            <button type="button" onClick={() => removeRow(i)}
              className="text-[11px] font-semibold text-gray-400 transition hover:text-rose-500">✕ Hapus</button>
          </div>
          {subs.map((s: SubField) => (
            <div key={s.key} className="mb-2 last:mb-0">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">{s.label}</label>
              {s.type === "image" ? (
                <ImageField compact value={row[s.key] ?? ""} onChange={(v) => updateRow(i, s.key, v)} />
              ) : s.type === "textarea" ? (
                <textarea value={row[s.key] ?? ""} placeholder={s.placeholder} rows={2}
                  onChange={(e) => updateRow(i, s.key, e.target.value)} className={inputCls} />
              ) : s.type === "select" ? (
                <select
                  value={row[s.key] || (s.options?.[0] ?? "")}
                  onChange={(e) => updateRow(i, s.key, e.target.value)}
                  className={`${inputCls} cursor-pointer capitalize`}
                >
                  {(s.options ?? []).map((o) => (
                    <option key={o} value={o} className="capitalize">{o}</option>
                  ))}
                </select>
              ) : s.key === "ikon" ? (
                <div className="flex items-center gap-1.5">
                  <input value={row[s.key] ?? ""} placeholder={s.placeholder}
                    onChange={(e) => updateRow(i, s.key, e.target.value)} className={inputCls} />
                  <EmojiPicker onPick={(e) => updateRow(i, s.key, e)} label="😊"
                    title="Pilih ikon"
                    triggerClass="flex-none rounded-lg border border-black/10 bg-white px-2.5 py-2 text-base transition hover:border-brand-300" />
                </div>
              ) : (
                <input value={row[s.key] ?? ""} placeholder={s.placeholder}
                  onChange={(e) => updateRow(i, s.key, e.target.value)} className={inputCls} />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={addRow}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-brand-400 bg-brand-50/50 px-3 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50">
        <span className="text-lg leading-none">+</span> {field.addLabel ?? "Tambah baris"}
      </button>
    </div>
  );
}

function Field({
  field, value, onChange,
}: { field: FieldDef; value: FieldValue; onChange: (v: FieldValue) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-gray-700">
        {field.label}
        <HelpTip text={field.help} />
      </label>

      {field.type === "text" && (
        <input value={String(value ?? "")} placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
      {field.type === "textarea" && (
        <textarea value={String(value ?? "")} placeholder={field.placeholder} rows={3}
          onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
      {field.type === "color" && (
        <div className="flex items-center gap-2">
          <input type="color" value={String(value ?? "#000000")} onChange={(e) => onChange(e.target.value)}
            className="h-10 w-12 cursor-pointer rounded-lg border border-black/10 bg-white p-0.5" />
          <input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} w-28 font-mono`} />
        </div>
      )}
      {field.type === "image" && <ImageField value={String(value ?? "")} onChange={(v) => onChange(v)} />}
      {field.type === "toggle" && (
        <button type="button" onClick={() => onChange(!(value as boolean))} role="switch" aria-checked={Boolean(value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${value ? "bg-brand-500" : "bg-gray-300"}`}>
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${value ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      )}
      {field.type === "list" && (
        <ListField field={field} value={(value as ListValue) ?? []} onChange={(v) => onChange(v)} />
      )}

      {(field.type === "text" || field.type === "textarea") && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {suggestionsFor(field.key) && (
            <InspirasiButton options={suggestionsFor(field.key) as string[]} onPick={(s) => onChange(s)} />
          )}
          <EmojiPicker onPick={(e) => onChange(String(value ?? "") + e)} label="😊 Emoji" title="Sisipkan emoji" />
        </div>
      )}

      {field.example && field.type !== "list" && (
        <p className="mt-1.5 text-[11px] text-gray-400">{field.example}</p>
      )}
    </div>
  );
}

// ---------- Susunan Halaman (reorder bagian, gaya komponen ScaleV) ----------
function OrderPanel({
  parts, order, onOrder,
}: {
  parts: { id: string; label: string }[];
  order: string[];
  onOrder: (o: string[]) => void;
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const labelOf = (id: string) => parts.find((p) => p.id === id)?.label ?? id;

  function move(i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    onOrder(next);
  }
  function dropTo(from: number, to: number) {
    if (from === to) return;
    const next = [...order];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x);
    onOrder(next);
  }

  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-black/5 bg-gray-50/80 px-3.5 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-base text-white">🧱</span>
        <div className="min-w-0 flex-1">
          <span className="block font-display text-[14px] font-extrabold tracking-tight text-ink">Susunan Halaman</span>
          <span className="block text-[11px] text-gray-400">Tarik ⠿ atau pakai ↑↓ untuk mengatur urutan bagian</span>
        </div>
      </div>
      <div className="p-2">
        {order.map((id, i) => (
          <div
            key={id}
            draggable
            onDragStart={() => setDragIdx(i)}
            onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
            onDragOver={(e) => { e.preventDefault(); setOverIdx(i); }}
            onDrop={(e) => { e.preventDefault(); if (dragIdx !== null) dropTo(dragIdx, i); setDragIdx(null); setOverIdx(null); }}
            className={`mb-1 flex cursor-grab items-center gap-2 rounded-xl border px-2.5 py-2 transition last:mb-0 active:cursor-grabbing ${
              overIdx === i && dragIdx !== null && dragIdx !== i
                ? "border-brand-400 bg-brand-50"
                : dragIdx === i
                ? "border-brand-300 bg-brand-50/50 opacity-60"
                : "border-black/[0.06] bg-white hover:border-brand-200"
            }`}
          >
            <span className="select-none text-gray-300">⠿</span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{labelOf(id)}</span>
            <div className="flex overflow-hidden rounded-lg border border-black/10">
              <button type="button" aria-label="Naik" disabled={i === 0} onClick={() => move(i, -1)}
                className="px-1.5 py-0.5 text-[11px] font-bold text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-gray-200">↑</button>
              <span className="w-px bg-black/10" />
              <button type="button" aria-label="Turun" disabled={i === order.length - 1} onClick={() => move(i, 1)}
                className="px-1.5 py-0.5 text-[11px] font-bold text-gray-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-gray-200">↓</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  sec, isOpen, onToggle, values, onChange,
}: {
  sec: Section; isOpen: boolean; onToggle: () => void; values: FormValues;
  onChange: (key: string, value: FieldValue) => void;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-brand-200 bg-white shadow-soft" : "border-black/[0.06] bg-white/60"}`}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition hover:bg-black/[0.02]">
        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-lg transition ${isOpen ? "bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow" : "bg-gray-100"}`}>{sec.icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{sec.title}</span>
          <span className="block text-[11px] text-gray-400">{sec.fields.length} kolom untuk diisi</span>
        </span>
        <span className={`text-gray-400 transition ${isOpen ? "rotate-180 text-brand-600" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <div className="space-y-4 border-t border-black/5 px-3.5 pb-5 pt-4">
          {sec.fields.map((f) => (
            <Field key={f.key} field={f} value={values[f.key]} onChange={(v) => onChange(f.key, v)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditorPanel({ sections, values, onChange, parts }: Props) {
  const [open, setOpen] = useState<string>(sections[0]?.id ?? "");

  // urutan bagian aktif (fallback: urutan default parts)
  const rawOrder = values["_sectionOrder"];
  const order: string[] =
    Array.isArray(rawOrder) && typeof rawOrder[0] === "string"
      ? (rawOrder as string[])
      : (parts ?? []).map((p) => p.id);

  return (
    <div className="p-2.5">
      {parts && parts.length > 0 && (
        <OrderPanel parts={parts} order={order} onOrder={(o) => onChange("_sectionOrder", o)} />
      )}
      <div className="space-y-2">
        {sections.map((sec) => (
          <div key={sec.id}>
            {sec.id === "kreatif" && (
              <p className="mb-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-3 py-2 text-[12px] leading-relaxed text-brand-800">
                🧩 Di sini Anda <b>bebas berkreasi</b>: tambah judul, teks, poin, kutipan, gambar, tombol, atau garis pemisah — sebanyak apa pun.
              </p>
            )}
            <SectionCard
              sec={sec} isOpen={open === sec.id}
              onToggle={() => setOpen(open === sec.id ? "" : sec.id)}
              values={values} onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
