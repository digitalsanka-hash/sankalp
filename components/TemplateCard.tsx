"use client";
// components/TemplateCard.tsx — kartu template premium (thumbnail live).
import Link from "next/link";
import { useState } from "react";
import type { TemplateMeta } from "@/lib/templates";
import { KATEGORI_LABEL } from "@/lib/types";
import MiniPreview from "./MiniPreview";
import ReviewList from "./ReviewList";

const KAT_STYLE: Record<string, string> = {
  digital: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  fisik: "bg-rose-50 text-rose-700 ring-rose-200",
  lead: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function TemplateCard({ t }: { t: TemplateMeta }) {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      {/* thumbnail live */}
      <Link href={`/studio?template=${t.id}`} className="relative block overflow-hidden border-b border-black/5">
        <MiniPreview templateId={t.id} icon={t.icon} />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {t.icon} {t.niche}
        </span>
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
          <span className="mb-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lift">
            Buka editor →
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span
          className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${KAT_STYLE[t.kategori]}`}
        >
          {KATEGORI_LABEL[t.kategori]}
        </span>
        <h3 className="mt-2 font-display text-[17px] font-extrabold leading-snug tracking-tight text-ink">
          {t.nama}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-500">{t.ringkas}</p>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/studio?template=${t.id}`}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-soft transition hover:bg-brand-700"
          >
            Pakai Template
          </Link>
          <button
            onClick={() => setShowReview((v) => !v)}
            className="rounded-xl border border-black/10 px-3 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-brand-300 hover:text-ink"
            aria-expanded={showReview}
            aria-label="Ulasan"
          >
            ⭐
          </button>
        </div>

        {showReview && (
          <div className="mt-4 border-t border-black/5 pt-4">
            <ReviewList templateId={t.id} />
          </div>
        )}
      </div>
    </div>
  );
}
