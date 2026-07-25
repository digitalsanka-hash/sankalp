"use client";
// components/AuthButton.tsx — status login + link admin di header.
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AuthButton() {
  const { configured, user, isAdmin, isActive, signOut, loading } = useAuth();

  if (!configured) return null;
  if (loading) return <span className="px-2 text-sm text-gray-400">…</span>;

  if (!user) {
    return (
      <Link href="/masuk" className="rounded-full border border-black/10 px-3.5 py-2 text-sm font-semibold text-gray-600 transition hover:border-brand-300 hover:text-ink">
        Masuk
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      {isAdmin && (
        <Link href="/admin" className="rounded-full bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-black">
          Admin
        </Link>
      )}
      {!isAdmin && !isActive && (
        <span className="hidden rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700 sm:inline">Belum aktif</span>
      )}
      <span className="hidden max-w-[130px] truncate text-xs font-semibold text-gray-500 md:block">{user.email}</span>
      <button onClick={() => signOut()} className="rounded-full border border-black/10 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-rose-300 hover:text-rose-500">
        Keluar
      </button>
    </div>
  );
}
