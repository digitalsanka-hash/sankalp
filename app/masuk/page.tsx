"use client";
// app/masuk/page.tsx — AKTIVASI dengan kode akses (gaya FinPlan).
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function AktivasiPage() {
  const router = useRouter();
  const { configured, isActive, isAdmin, code, activate, logout } = useAuth();
  const [input, setInput] = useState("");
  const [nama, setNama] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setBusy(true); setErr(null);
    const res = await activate(input, nama.trim() || undefined);
    setBusy(false);
    if (!res.ok) { setErr(res.pesan); return; }
    router.push(isAdminCode(input) ? "/admin" : "/proyek");
  }
  // heuristik kecil untuk arah setelah aktivasi (role asli tetap dari server)
  function isAdminCode(c: string) { return c.trim().toUpperCase().includes("ADMIN"); }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <div className="w-full rounded-3xl border border-black/[0.07] bg-white p-7 shadow-soft">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">Aktivasi Akses</h1>

        {!configured ? (
          <p className="mt-3 text-sm text-gray-500">
            Sistem kode belum aktif. Aplikasi berjalan mode lokal — semua fitur terbuka.
            <Link href="/" className="ml-1 font-semibold text-brand-600">Ke Galeri →</Link>
          </p>
        ) : isActive ? (
          <div className="mt-3">
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              ✅ Akses <b>aktif</b>{isAdmin && " (Admin)"}.<br />
              <span className="text-xs opacity-80">Kode: <b className="font-mono">{code}</b></span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/" className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white">Mulai Buat LP →</Link>
              {isAdmin && <Link href="/admin" className="rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white">Panel Admin</Link>}
              <button onClick={logout} className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:border-rose-300 hover:text-rose-500">Keluar</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed text-gray-500">
              Masukkan <b className="text-ink">kode akses</b> yang Anda terima setelah pembelian.
              Tanpa email, tanpa password.
            </p>
            <input
              value={input} onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="SANKA-XXXX-XXXX" autoFocus
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-center font-mono text-lg font-bold tracking-widest outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
            <input
              value={nama} onChange={(e) => setNama(e.target.value)}
              placeholder="Nama / no. WA Anda (opsional)"
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
            {err && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{err}</p>}
            <button type="submit" disabled={busy}
              className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
              {busy ? "Memeriksa…" : "Aktifkan Sekarang"}
            </button>
            <p className="pt-1 text-center text-xs text-gray-400">
              Belum punya kode? <Link href="/" className="font-semibold text-brand-600">Lihat template dulu</Link> — bebas edit &amp; pratinjau.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
