"use client";
// components/AuthButton.tsx — tombol status login di header.
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AuthButton() {
  const { configured, user, signOut, loading } = useAuth();

  if (!configured) return null; // Supabase belum aktif -> sembunyikan
  if (loading) return <span className="px-2 text-sm text-gray-400">…</span>;

  if (!user) {
    return (
      <Link
        href="/masuk"
        className="rounded-full border border-black/10 px-3.5 py-2 text-sm font-semibold text-gray-600 transition hover:border-brand-300 hover:text-ink"
      >
        Masuk
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[140px] truncate text-xs font-semibold text-gray-500 sm:block">{user.email}</span>
      <button
        onClick={() => signOut()}
        className="rounded-full border border-black/10 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-rose-300 hover:text-rose-500"
      >
        Keluar
      </button>
    </div>
  );
}
