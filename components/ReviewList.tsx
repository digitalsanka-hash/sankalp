"use client";
// components/ReviewList.tsx — ulasan per template.
//  - Supabase aktif  -> baca/tulis tabel `reviews` (tulis butuh login).
//  - Tidak           -> seed JSON + state lokal.
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Review } from "@/lib/types";
import seed from "@/data/reviews.json";
import StarRating from "./StarRating";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

function formatTanggal(iso: string): string {
  try { return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return ""; }
}

export default function ReviewList({ templateId }: { templateId: string }) {
  const { configured, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(
    (seed as Review[]).filter((r) => r.template_id === templateId)
  );
  const [rating, setRating] = useState(5);
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    if (!supabase) return; // pakai seed lokal
    supabase.from("reviews").select("*").eq("template_id", templateId)
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setReviews(data as Review[]); });
  }, [templateId]);
  useEffect(() => { load(); }, [load]);

  const daftar = useMemo(
    () => [...reviews].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    [reviews]
  );
  const rataRata = useMemo(
    () => (daftar.length ? daftar.reduce((s, r) => s + r.rating, 0) / daftar.length : 0),
    [daftar]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim() || !komentar.trim()) return;
    setBusy(true);
    try {
      if (supabase) {
        const { error } = await supabase.from("reviews").insert({
          template_id: templateId, rating, nama: nama.trim(), komentar: komentar.trim(),
        });
        if (error) throw error;
        load();
      } else {
        setReviews((prev) => [{
          id: `local-${prev.length + 1}`, template_id: templateId, rating,
          nama: nama.trim(), komentar: komentar.trim(), created_at: new Date().toISOString(),
        }, ...prev]);
      }
      setNama(""); setKomentar(""); setRating(5); setOpen(false);
    } catch (err) {
      alert("Gagal mengirim ulasan: " + (err instanceof Error ? err.message : String(err)));
    } finally { setBusy(false); }
  }

  const needLogin = configured && !user;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarRating value={Math.round(rataRata)} size={18} />
          <span className="text-sm text-gray-600">
            {daftar.length > 0 ? `${rataRata.toFixed(1)} · ${daftar.length} ulasan` : "Belum ada ulasan"}
          </span>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="text-sm font-semibold text-brand-600 hover:underline">
          {open ? "Tutup" : "Tulis ulasan"}
        </button>
      </div>

      {open && (
        needLogin ? (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Masuk dulu untuk menulis ulasan. <Link href="/masuk" className="font-bold underline">Masuk →</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mb-4 space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Nilai:</span>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Anda"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <textarea value={komentar} onChange={(e) => setKomentar(e.target.value)} rows={3}
              placeholder="Bagaimana pengalaman Anda memakai template ini?"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            <button type="submit" disabled={busy}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
              {busy ? "Mengirim…" : "Kirim ulasan"}
            </button>
          </form>
        )
      )}

      <ul className="space-y-3">
        {daftar.map((r) => (
          <li key={r.id} className="rounded-xl border border-gray-100 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{r.nama}</span>
              <span className="text-xs text-gray-400">{formatTanggal(r.created_at)}</span>
            </div>
            <StarRating value={r.rating} size={14} />
            <p className="mt-1 text-sm text-gray-600">{r.komentar}</p>
          </li>
        ))}
        {daftar.length === 0 && <li className="text-sm text-gray-400">Jadilah yang pertama memberi ulasan.</li>}
      </ul>
    </div>
  );
}
