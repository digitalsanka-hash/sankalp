"use client";
// app/masuk/page.tsx — AKTIVASI dengan kode akses, layout gaya FinPlan:
// logo besar → field → tombol besar → "atau" → Coba Demo → footer beli.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

// ▼ Ganti dengan link checkout ScaleV Anda (tempat orang beli kode akses).
const BELI_URL = "/";
// ▼ Ganti dengan WhatsApp admin untuk bantuan "lupa kode".
const BANTUAN_URL = "/panduan";

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
    router.push(input.trim().toUpperCase().includes("ADMIN") ? "/admin" : "/proyek");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-sm flex-col items-center justify-center px-5 py-14">
      {/* logo besar */}
      <Image
        src="/branding/sankalp-logo.png"
        alt="SankaLP"
        width={88}
        height={88}
        priority
        className="h-22 w-22 rounded-[22px] shadow-lift"
        style={{ width: 88, height: 88 }}
      />
      <p className="mt-3 font-display text-xl font-extrabold tracking-tight text-ink">
        Sanka<span className="text-brand-600">LP</span>
      </p>

      {!configured ? (
        <div className="mt-8 w-full text-center">
          <p className="text-sm text-gray-500">
            Mode lokal — semua fitur terbuka tanpa kode.
          </p>
          <Link href="/" className="mt-5 inline-block w-full rounded-2xl bg-brand-600 px-6 py-3.5 font-display text-base font-extrabold text-white shadow-soft transition hover:bg-brand-700">
            Mulai Buat LP →
          </Link>
        </div>
      ) : isActive ? (
        <div className="mt-8 w-full">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-center text-sm text-brand-800">
            ✅ Akses <b>aktif</b>{isAdmin && " (Admin)"}
            <span className="mt-1 block font-mono text-xs opacity-75">{code}</span>
          </div>
          <Link href="/" className="mt-4 block w-full rounded-2xl bg-brand-600 px-6 py-3.5 text-center font-display text-base font-extrabold text-white shadow-soft transition hover:bg-brand-700">
            Mulai Buat LP →
          </Link>
          {isAdmin && (
            <Link href="/admin" className="mt-2.5 block w-full rounded-2xl bg-ink px-6 py-3.5 text-center font-display text-base font-extrabold text-white transition hover:bg-black">
              Panel Admin
            </Link>
          )}
          <button onClick={logout} className="mt-4 w-full text-center text-sm font-semibold text-gray-400 transition hover:text-rose-500">
            Keluar
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="mt-8 w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="Kode Akses (SANKA-XXXX-XXXX)"
              autoFocus
              className="w-full rounded-2xl border border-transparent bg-indigo-50/70 px-5 py-4 text-center font-mono text-[15px] font-bold tracking-[0.15em] text-ink outline-none transition placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama / no. WA Anda (opsional)"
              className="mt-3 w-full rounded-2xl border border-transparent bg-indigo-50/70 px-5 py-4 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            <div className="mt-2 text-right">
              <Link href={BANTUAN_URL} className="text-[13px] font-semibold text-brand-700 hover:underline">
                Lupa kode?
              </Link>
            </div>

            {err && (
              <p className="mt-2 rounded-xl bg-rose-50 p-3 text-center text-sm text-rose-600">{err}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-3 w-full rounded-2xl bg-brand-600 px-6 py-4 font-display text-base font-extrabold text-white shadow-soft transition hover:bg-brand-700 disabled:opacity-60"
            >
              {busy ? "Memeriksa…" : "Masuk"}
            </button>
          </form>

          {/* divider */}
          <div className="mt-6 flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-xs text-gray-400">atau</span>
            <span className="h-px flex-1 bg-black/10" />
          </div>

          {/* demo */}
          <Link
            href="/"
            className="mt-6 block w-full rounded-2xl border border-black/10 bg-white px-6 py-4 text-center font-display text-[15px] font-extrabold text-ink shadow-soft transition hover:border-brand-300 hover:text-brand-700"
          >
            👀 Coba Demo dulu (tanpa kode)
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Belum punya kode?{" "}
            <Link href={BELI_URL} className="font-bold text-brand-700 hover:underline">
              Beli Akses
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
