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

  return (
    <div className="space-y-2.5">
      {value.map((row, i) => (
        <div key={i} className="rounded-2xl border border-black/[0.07] bg-gray-50/80 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-brand-100 px-1.5 text-[11px] font-bold text-brand-700">{i + 1}</span>
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

// Pengelompokan section jadi fase yang jelas (biar tak terasa campur).
const GROUPS: { key: string; label: string; num: string; ids: string[] }[] = [
  { key: "brand", label: "Tampilan & Brand", num: "1", ids: ["branding"] },
  {
    key: "konten", label: "Isi Halaman", num: "2",
    ids: ["hero", "proof", "pain", "benefit", "unggul", "fitur", "layanan", "langkah", "proses", "isi", "detail", "materi", "ba", "testi", "host", "bonus", "faq"],
  },
  { key: "market", label: "Hook & Kepercayaan", num: "3", ids: ["hook", "trust"] },
  { key: "tawar", label: "Harga & Urgensi", num: "4", ids: ["harga", "order", "paket", "urgency", "countdown"] },
  { key: "publish", label: "CTA, Form & Integrasi", num: "5", ids: ["integrasi", "form"] },
];

function groupOf(id: string): string {
  const g = GROUPS.find((gr) => gr.ids.includes(id));
  return g ? g.key : "konten";
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

export default function EditorPanel({ sections, values, onChange }: Props) {
  const [open, setOpen] = useState<string>(sections[0]?.id ?? "");

  return (
    <div className="p-2.5">
      {GROUPS.map((grp) => {
        const secs = sections.filter((s) => groupOf(s.id) === grp.key);
        if (secs.length === 0) return null;
        return (
          <div key={grp.key} className="mb-4">
            {/* header grup */}
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-ink text-[11px] font-black text-white">{grp.num}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">{grp.label}</span>
              <span className="h-px flex-1 bg-black/[0.07]" />
            </div>
            <div className="space-y-2">
              {secs.map((sec) => (
                <SectionCard
                  key={sec.id} sec={sec} isOpen={open === sec.id}
                  onToggle={() => setOpen(open === sec.id ? "" : sec.id)}
                  values={values} onChange={onChange}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
