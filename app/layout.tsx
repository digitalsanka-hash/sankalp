import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import AccessGate from "@/components/AccessGate";
import HeaderNav from "@/components/HeaderNav";

export const metadata: Metadata = {
  title: "SankaPage — Buat Landing Page Jualan Tanpa Koding",
  description:
    "Pilih template Landing Page high-conversion, edit dengan mudah, unduh HTML siap deploy ke ScaleV. Untuk penjual produk digital & fisik.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans antialiased">
        <AuthProvider>
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">
            <Link href="/" className="group flex items-center gap-2.5">
              <Image
                src="/branding/sankalp-logo.png"
                alt=""
                width={40}
                height={40}
                priority
                className="h-10 w-10 rounded-[13px] shadow-glow transition duration-300 group-hover:-rotate-3 group-hover:scale-105"
              />
              <span className="hidden font-display text-xl font-extrabold tracking-tight text-ink sm:inline">
                Sanka<span className="text-brand-600">Page</span>
              </span>
            </Link>

            <HeaderNav />
          </div>
        </header>

        <main>
          <AccessGate>{children}</AccessGate>
        </main>

        <footer className="border-t border-black/5 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/branding/sankalp-logo.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg"
              />
              <span className="font-display font-extrabold text-ink">SankaPage</span>
            </div>
            <p className="text-sm text-gray-400">
              Landing Page high-conversion tanpa koding
            </p>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
