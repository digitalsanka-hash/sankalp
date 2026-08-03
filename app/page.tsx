"use client";
// app/page.tsx — Galeri 50 template + filter kategori + niche + pencarian.
import { useMemo, useState } from "react";
import { TEMPLATE_META } from "@/lib/templates";
import type { Kategori } from "@/lib/types";
import TemplateCard from "@/components/TemplateCard";

type Filter = "semua" | Kategori;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "digital", label: "Digital" },
  { id: "fisik", label: "Fisik" },
  { id: "lead", label: "Lead & Jasa" },
];

const NICHES = Array.from(new Set(TEMPLATE_META.map((t) => t.niche))).sort();

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("semua");
  const [niche, setNiche] = useState<string>("");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const key = q.trim().toLowerCase();
    return TEMPLATE_META.filter((t) => {
      if (filter !== "semua" && t.kategori !== filter) return false;
      if (niche && t.niche !== niche) return false;
      if (key && !(`${t.nama} ${t.niche} ${t.ringkas}`.toLowerCase().includes(key))) return false;
      return true;
    });
  }, [filter, niche, q]);

  return (
    <div className="bg-aura">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* HERO */}
        <section className="pt-14 pb-8 text-center sm:pt-20">
          <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            100+ template siap pakai · terus bertambah
          </div>

          <h1 className="fade-up fade-up-1 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl">
            Landing Page yang
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">Benar-benar Menjual</span>
          </h1>

          <p className="fade-up fade-up-2 mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-lg">
            Template profesional & interaktif untuk produk digital, fisik, jasa, dan
            lead magnet. Edit semudah mengisi formulir, unduh HTML — siap deploy ke ScaleV.
          </p>

          {/* kenapa Landing Page */}
          <div className="fade-up fade-up-3 mx-auto mt-8 max-w-3xl rounded-2xl border border-black/[0.07] bg-white/80 p-4 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-ink">
              Kenapa Landing Page? Karena di sanalah penjualan ditutup.
            </p>
            <div className="mt-3 grid gap-2 text-left text-[13px] leading-relaxed text-gray-600 sm:grid-cols-3">
              <p><b className="text-ink">🎯 Satu tujuan.</b> Tanpa menu & tautan lain — pengunjung cuma bisa beli atau tutup.</p>
              <p><b className="text-ink">🧠 Menjawab keraguan.</b> Harga, bukti, garansi dijelaskan sekali, bekerja 24 jam.</p>
              <p><b className="text-ink">💸 Iklan balik modal.</b> Konversi 1% → 3% artinya omzet 3x, budget iklan tetap.</p>
            </div>
          </div>
        </section>

        {/* BAR KONTROL — search + kategori + niche, satu baris ramping */}
        <div className="sticky top-16 z-30 mb-6 fade-up fade-up-3">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 rounded-2xl border border-black/[0.08] bg-white/95 p-2 shadow-soft backdrop-blur">
            {/* search */}
            <div className="relative min-w-[180px] flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari template…"
                className="w-full rounded-xl bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* kategori segmented */}
            <div className="flex rounded-xl bg-gray-100 p-0.5">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                    filter === f.id ? "bg-ink text-white shadow" : "text-gray-500 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* niche dropdown */}
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className={`cursor-pointer rounded-xl border-0 py-2.5 pl-3 pr-8 text-[13px] font-semibold outline-none transition ${
                niche ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:text-ink"
              }`}
            >
              <option value="">Semua niche</option>
              {NICHES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            {/* jumlah */}
            <span className="hidden whitespace-nowrap pl-1 pr-2 text-xs font-semibold text-gray-400 md:block">
              {list.length} template
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="pb-20 text-center text-gray-400">
            Tidak ada template yang cocok. Coba kata kunci lain.
          </p>
        )}
      </div>
    </div>
  );
}
