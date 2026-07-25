"use client";
// components/AuthButton.tsx — status akses (kode) di header.
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AuthButton() {
  const { configured, isAdmin, isActive, logout, loading } = useAuth();

  if (!configured) return null;
  if (loading) return <span className="px-2 text-sm text-gray-400">…</span>;

  if (!isActive) {
    return (
      <Link href="/masuk" className="rounded-full bg-brand-600 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-brand-700">
        Aktivasi
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      {isAdmin && (
        <Link href="/admin" className="rounded-full bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-black">Admin</Link>
      )}
      <span className="hidden rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 sm:inline">✓ Aktif</span>
      <button onClick={logout} className="rounded-full border border-black/10 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-rose-300 hover:text-rose-500">
        Keluar
      </button>
    </div>
  );
}
