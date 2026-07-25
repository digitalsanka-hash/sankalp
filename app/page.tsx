"use client";
// app/page.tsx — Galeri 50 template + filter kategori + niche + pencarian.
import { useMemo, useState } from "react";
import { TEMPLATE_META } from "@/lib/templates";
import type { Kategori } from "@/lib/types";
import TemplateCard from "@/components/TemplateCard";

type Filter = "semua" | Kategori;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "digital", label: "Produk Digital" },
  { id: "fisik", label: "Produk Fisik" },
  { id: "lead", label: "Lead / Jasa" },
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
            50+ template siap pakai · terus bertambah
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

          {/* SEARCH */}
          <div className="fade-up fade-up-3 mx-auto mt-8 max-w-lg">
            <div className="group relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                🔍
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari template… (mis. skincare, kelas, jasa)"
                className="w-full rounded-2xl border border-black/10 bg-white/90 py-3.5 pl-12 pr-4 text-sm shadow-soft outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </div>
        </section>

        {/* FILTER kategori — segmented */}
        <div className="sticky top-16 z-30 -mx-4 mb-4 bg-[color:var(--paper)]/80 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:px-3">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-black/10 bg-white p-1 shadow-soft">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === f.id
                      ? "bg-ink text-white shadow-soft"
                      : "text-gray-500 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* niche chips */}
            <div className="flex max-w-4xl flex-wrap justify-center gap-1.5">
              <button
                onClick={() => setNiche("")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  niche === ""
                    ? "bg-brand-600 text-white"
                    : "border border-black/10 bg-white text-gray-500 hover:border-brand-300 hover:text-ink"
                }`}
              >
                Semua niche
              </button>
              {NICHES.map((n) => (
                <button
                  key={n}
                  onClick={() => setNiche(n === niche ? "" : n)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    niche === n
                      ? "bg-brand-600 text-white"
                      : "border border-black/10 bg-white text-gray-500 hover:border-brand-300 hover:text-ink"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mb-5 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
          {list.length} template ditemukan
        </p>

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
