"use client";
// components/AccessGate.tsx — GERBANG AKSES.
// Tanpa kode akses yang sah, tidak ada halaman yang bisa dibuka (termasuk Galeri).
// Satu-satunya halaman terbuka: /masuk.
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { BUKA_DARURAT } from "@/lib/flags";

// Halaman yang boleh dibuka tanpa kode.
const TERBUKA = ["/masuk"];

function Layar({ judul, pesan, aksi }: { judul: string; pesan: string; aksi?: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-sm flex-col items-center justify-center px-5 py-14 text-center">
      <p className="font-display text-xl font-extrabold tracking-tight text-ink">{judul}</p>
      <p className="mt-2 text-sm text-gray-500">{pesan}</p>
      {aksi}
    </div>
  );
}

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const { loading, configured, isActive } = useAuth();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const bebas = TERBUKA.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const boleh = bebas || (configured && isActive);

  // dorong ke halaman aktivasi kalau belum punya akses
  useEffect(() => {
    if (BUKA_DARURAT) return;
    if (!loading && configured && !isActive && !bebas) router.replace("/masuk");
  }, [loading, configured, isActive, bebas, router]);

  // saklar darurat: lewati gerbang sepenuhnya
  if (BUKA_DARURAT) return <>{children}</>;

  if (bebas) return <>{children}</>;

  if (loading) {
    return <Layar judul="Memeriksa kode akses…" pesan="Sebentar ya." />;
  }

  // Supabase belum diatur -> KUNCI (dulu terbuka, sekarang sengaja ditutup).
  if (!configured) {
    return (
      <Layar
        judul="Aplikasi belum tersambung"
        pesan="Kode akses tidak bisa diperiksa karena koneksi database belum diatur. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local, lalu jalankan ulang."
      />
    );
  }

  if (!isActive) {
    return (
      <Layar
        judul="Butuh kode akses"
        pesan="Masukkan kode aksesmu dulu untuk membuka galeri template dan editor."
        aksi={
          <Link
            href="/masuk"
            className="mt-6 block w-full rounded-2xl bg-brand-600 px-6 py-3.5 font-display text-base font-extrabold text-white shadow-soft transition hover:bg-brand-700"
          >
            Masukkan Kode Akses →
          </Link>
        }
      />
    );
  }

  return <>{boleh ? children : null}</>;
}
