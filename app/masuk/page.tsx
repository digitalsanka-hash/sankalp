"use client";
// app/masuk/page.tsx — AKTIVASI dengan kode akses, layout gaya FinPlan:
// logo besar → field → tombol besar → "atau" → Coba Demo → footer beli.
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { cekUsername } from "@/lib/access";

// ▼ Ganti dengan link checkout ScaleV Anda (tempat orang beli kode akses).
const BELI_URL = "/";
// ▼ Ganti dengan WhatsApp admin untuk bantuan "lupa kode".
const BANTUAN_URL = "/panduan";

export default function AktivasiPage() {
  const router = useRouter();
  const { configured, isActive, isAdmin, code, identitas, activate, logout } = useAuth();
  const [input, setInput] = useState("");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [uStat, setUStat] = useState<{ ok: boolean; pesan?: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // cek ketersediaan username (debounce 500ms)
  useEffect(() => {
    const u = username.trim();
    if (!u) { setUStat(null); return; }
    const t = setTimeout(() => { cekUsername(u).then(setUStat); }, 500);
    return () => clearTimeout(t);
  }, [username]);

  const namaValid = nama.trim().length >= 2;
  const userValid = /^[a-z0-9._]{3,20}$/.test(username.trim().toLowerCase());
  const bisaKirim = input.trim() && namaValid && userValid && uStat?.ok !== false;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    if (!namaValid) { setErr("Nama wajib diisi (minimal 2 huruf)."); return; }
    if (!userValid) { setErr("Username 3-20 karakter: huruf kecil, angka, titik, atau garis bawah."); return; }
    setBusy(true); setErr(null);
    const res = await activate(input, nama.trim(), username.trim().toLowerCase());
    setBusy(false);
    if (!res.ok) { setErr(res.pesan); return; }
    router.push(input.trim().toUpperCase().includes("ADMIN") ? "/admin" : "/proyek");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-sm flex-col items-center justify-center px-5 py-14">
      {/* logo besar */}
      <Image
        src="/branding/sankalp-logo.png"
        alt="SankaPage"
        width={88}
        height={88}
        priority
        className="h-22 w-22 rounded-[22px] shadow-lift"
        style={{ width: 88, height: 88 }}
      />
      <p className="mt-3 font-display text-xl font-extrabold tracking-tight text-ink">
        Sanka<span className="text-brand-600">Page</span>
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
            {identitas && (
              <span className="mt-1 block font-semibold">
                {identitas.nama} <span className="opacity-70">@{identitas.username}</span>
              </span>
            )}
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
            {/* NAMA — wajib */}
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama lengkap Anda *"
              required
              className="mt-3 w-full rounded-2xl border border-transparent bg-indigo-50/70 px-5 py-4 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />

            {/* USERNAME — wajib & unik */}
            <div className="relative mt-3">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">@</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))}
                placeholder="username (unik) *"
                required
                className={`w-full rounded-2xl border bg-indigo-50/70 py-4 pl-10 pr-11 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  username && uStat?.ok === false
                    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                    : username && uStat?.ok
                    ? "border-brand-300 focus:border-brand-400 focus:ring-brand-100"
                    : "border-transparent focus:border-brand-400 focus:ring-brand-100"
                }`}
              />
              {username && uStat && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base">
                  {uStat.ok ? "✅" : "❌"}
                </span>
              )}
            </div>
            <p className={`mt-1.5 px-1 text-[12px] ${username && uStat?.ok === false ? "text-rose-600" : "text-gray-400"}`}>
              {username && uStat?.pesan
                ? uStat.pesan
                : username && uStat?.ok
                ? "Username tersedia 🎉"
                : "3–20 karakter: huruf kecil, angka, titik, garis bawah."}
            </p>

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
              disabled={busy || !bisaKirim}
              className="mt-3 w-full rounded-2xl bg-brand-600 px-6 py-4 font-display text-base font-extrabold text-white shadow-soft transition hover:bg-brand-700 disabled:opacity-50"
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
