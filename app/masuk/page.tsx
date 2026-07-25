"use client";
// app/masuk/page.tsx — login via magic link email (Supabase Auth).
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function MasukPage() {
  const { configured, user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true); setErr(null);
    const { error } = await signInWithEmail(email.trim());
    setBusy(false);
    if (error) setErr(error); else setSent(true);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20">
      <div className="w-full rounded-3xl border border-black/[0.07] bg-white p-7 shadow-soft">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">Masuk ke SankaLP</h1>

        {!configured ? (
          <p className="mt-3 text-sm text-gray-500">
            Login belum aktif (Supabase belum dikonfigurasi). Proyek Anda tersimpan di browser ini.
            <Link href="/proyek" className="ml-1 font-semibold text-brand-600">Ke Proyek Saya →</Link>
          </p>
        ) : user ? (
          <div className="mt-3">
            <p className="text-sm text-gray-600">Anda sudah masuk sebagai <b>{user.email}</b>.</p>
            <Link href="/proyek" className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">
              Ke Proyek Saya →
            </Link>
          </div>
        ) : sent ? (
          <div className="mt-3">
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              ✅ Tautan masuk sudah dikirim ke <b>{email}</b>. Buka email Anda &amp; klik tautannya untuk masuk.
            </div>
            <p className="mt-3 text-xs text-gray-400">Tidak ada emailnya? Cek folder Spam/Promosi, atau kirim ulang.</p>
            <button onClick={() => setSent(false)} className="mt-2 text-sm font-semibold text-brand-600">← Ganti email</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <p className="text-sm text-gray-500">Masukkan email — kami kirim tautan masuk (tanpa password).</p>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="email@anda.com"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
            {err && <p className="text-sm text-rose-600">{err}</p>}
            <button
              type="submit" disabled={busy}
              className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {busy ? "Mengirim…" : "Kirim Tautan Masuk"}
            </button>
          </form>
        )}
      </div>
      <p className="mt-4 text-xs text-gray-400">Dengan masuk, proyek Anda tersimpan aman di cloud &amp; bisa dibuka lintas perangkat.</p>
    </div>
  );
}
