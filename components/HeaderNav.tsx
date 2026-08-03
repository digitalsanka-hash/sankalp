"use client";
// components/HeaderNav.tsx — menu header. Tautan halaman disembunyikan
// selama akses belum aktif, biar tidak ada pintu yang kelihatan terbuka.
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import AuthButton from "@/components/AuthButton";
import { BUKA_DARURAT } from "@/lib/flags";

export default function HeaderNav() {
  const { configured, isActive, loading } = useAuth();
  const buka = BUKA_DARURAT || (configured && isActive && !loading);

  return (
    <nav className="flex items-center gap-1 sm:gap-2 text-sm font-semibold">
      {buka && (
        <>
          <Link href="/" className="rounded-full px-3 py-2 text-gray-600 transition hover:bg-black/5 hover:text-ink">
            Galeri
          </Link>
          <Link href="/proyek" className="rounded-full px-3 py-2 text-gray-600 transition hover:bg-black/5 hover:text-ink">
            Proyek Saya
          </Link>
          <Link href="/panduan" className="rounded-full px-3 py-2 text-gray-600 transition hover:bg-black/5 hover:text-ink">
            Panduan
          </Link>
          <Link
            href="/"
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-white shadow-soft transition hover:bg-black sm:inline-flex"
          >
            Mulai Buat
            <span aria-hidden>→</span>
          </Link>
        </>
      )}
      <AuthButton />
    </nav>
  );
}
