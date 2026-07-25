"use client";
// components/ReviewList.tsx
// Menampilkan review sebuah template + form tambah review.
// FASE 1: review disimpan di state lokal (seed dari data/reviews.json).
// FASE 2: ganti loadReviews()/addReview() dengan query Supabase — struktur
// objek Review sudah cocok dengan tabel "reviews".
import { useMemo, useState } from "react";
import type { Review } from "@/lib/types";
import seed from "@/data/reviews.json";
import StarRating from "./StarRating";

interface Props {
  templateId: string;
}

function formatTanggal(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ReviewList({ templateId }: Props) {
  const [reviews, setReviews] = useState<Review[]>(seed as Review[]);
  const [rating, setRating] = useState(5);
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");
  const [open, setOpen] = useState(false);

  const daftar = useMemo(
    () =>
      reviews
        .filter((r) => r.template_id === templateId)
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    [reviews, templateId]
  );

  const rataRata = useMemo(() => {
    if (daftar.length === 0) return 0;
    return daftar.reduce((s, r) => s + r.rating, 0) / daftar.length;
  }, [daftar]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim() || !komentar.trim()) return;
    const baru: Review = {
      // Fase 2: id & created_at akan dibuat oleh Supabase.
      id: `local-${daftar.length + 1}-${nama.slice(0, 4)}`,
      template_id: templateId,
      rating,
      nama: nama.trim(),
      komentar: komentar.trim(),
      created_at: new Date().toISOString(),
    };
    setReviews((prev) => [baru, ...prev]);
    setNama("");
    setKomentar("");
    setRating(5);
    setOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StarRating value={Math.round(rataRata)} size={18} />
          <span className="text-sm text-gray-600">
            {daftar.length > 0
              ? `${rataRata.toFixed(1)} · ${daftar.length} ulasan`
              : "Belum ada ulasan"}
          </span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-semibold text-brand-600 hover:underline"
        >
          {open ? "Tutup" : "Tulis ulasan"}
        </button>
      </div>

      {open && (
        <form
          onSubmit={submit}
          className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Nilai:</span>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            placeholder="Bagaimana pengalaman Anda memakai template ini?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Kirim ulasan
          </button>
        </form>
      )}

      <ul className="space-y-3">
        {daftar.map((r) => (
          <li key={r.id} className="rounded-xl border border-gray-100 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-ink">{r.nama}</span>
              <span className="text-xs text-gray-400">
                {formatTanggal(r.created_at)}
              </span>
            </div>
            <StarRating value={r.rating} size={14} />
            <p className="mt-1 text-sm text-gray-600">{r.komentar}</p>
          </li>
        ))}
        {daftar.length === 0 && (
          <li className="text-sm text-gray-400">
            Jadilah yang pertama memberi ulasan.
          </li>
        )}
      </ul>
    </div>
  );
}
