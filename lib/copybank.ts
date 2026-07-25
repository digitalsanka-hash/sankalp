// lib/copybank.ts
// ------------------------------------------------------------------
// Pustaka "Inspirasi" — contoh copy TERBUKTI KONVERSI (Bahasa Indonesia)
// per key field. Tombol 💡 di editor menampilkan daftar ini; klik = pakai.
// Placeholder [dalam kurung] mengingatkan user untuk mengganti.
// ------------------------------------------------------------------

export const SUGGESTIONS: Record<string, string[]> = {
  // ---- Label kecil / badge ----
  heroEyebrow: [
    "KHUSUS PEMULA — MULAI DARI NOL",
    "DISKON TERBATAS HARI INI",
    "SUDAH DIPERCAYA 1.000+ ORANG",
    "PROMO SPESIAL BULAN INI",
    "METODE TERBUKTI & PRAKTIS",
  ],
  heroBadge: [
    "BEST SELLER 🔥",
    "TERLARIS BULAN INI",
    "STOK TERBATAS",
    "PROMO HARI INI",
    "BARU! EDISI TERBATAS",
  ],

  // ---- Headline (formula terbukti) ----
  heroHeadline: [
    "Cara [Hasil yang Diinginkan] dalam [Waktu], Tanpa [Rasa Sakit]",
    "Akhirnya, Solusi [Masalah] yang Benar-benar Bekerja untuk [Target]",
    "Rahasia [Hasil] yang Jarang Diketahui, Kini Terbuka untuk Anda",
    "Berhenti [Kebiasaan Buruk]. Mulai [Hasil Baik] Hari Ini Juga",
    "Dari [Kondisi Awal] Menjadi [Kondisi Impian] dalam [Waktu]",
    "[Angka] Cara Praktis [Hasil] yang Bisa Anda Mulai Malam Ini",
  ],
  heroSub: [
    "Sudah membantu ratusan orang meraih [hasil]. Praktis, jelas, dan langsung bisa dipraktikkan.",
    "Tanpa ribet, tanpa pengalaman, tanpa alat mahal. Cocok untuk pemula total.",
    "Metode langkah-demi-langkah yang terbukti — bukan teori, tapi praktik nyata.",
  ],
  heroJanji: [
    "Dalam [waktu], Anda akan tahu persis cara [hasil] — walau mulai dari nol.",
    "Anda akan pulang membawa langkah nyata yang bisa langsung dijalankan hari itu juga.",
    "Bukan sekadar teori. Anda dapat strategi, contoh, dan template siap pakai.",
  ],

  // ---- Hook emosional ----
  hookText: [
    "Bayangkan [kondisi impian Anda]. Itu bukan mimpi — itu bisa jadi kenyataan Anda mulai sekarang.",
    "Anda sudah cukup lama berjuang sendirian. Saatnya ada yang membimbing, langkah demi langkah.",
    "Setiap hari menunda, impian Anda terasa makin jauh. Padahal jalannya ada di depan mata.",
    "Bukan Anda yang gagal — tapi caranya yang selama ini keliru. Sekarang saatnya cara yang benar.",
    "Capek mencoba dan selalu kembali ke titik nol? Anda pantas dapat hasil yang bertahan.",
  ],

  // ---- CTA ----
  ctaUtama: [
    "Saya Mau Mulai Sekarang",
    "Ya, Saya Mau!",
    "Ambil Sekarang — Stok Terbatas",
    "Klaim Diskon Saya",
    "Pesan Sekarang - COD",
    "Amankan Tempat Saya",
    "Dapatkan Sekarang Juga",
  ],
  ctaBeli: ["Beli Sekarang", "Pesan Sekarang", "Checkout Sekarang", "Ambil Penawaran Ini"],
  ctaOrder: ["Pesan Sekarang - COD", "Order Sekarang", "Bayar di Tempat (COD)"],
  formCta: ["Daftar Sekarang - Gratis", "Amankan Kursi Saya", "Kirim ke Email Saya", "Ya, Saya Mau Ikut!"],

  // ---- Sub tombol ----
  ctaBeliSub: [
    "Akses seumur hidup, langsung setelah bayar",
    "Bayar di tempat (COD), gratis ongkir",
    "Garansi uang kembali — tanpa risiko",
  ],

  // ---- Urgency / scarcity ----
  scarcityTeks: [
    "Harga promo berakhir saat timer habis!",
    "Diskon hanya berlaku hari ini.",
    "Harga naik setelah 100 pembeli pertama.",
    "Penawaran ini tidak akan diulang.",
    "Buruan, sebelum kembali ke harga normal.",
  ],

  // ---- Garansi / risk reversal ----
  garansi: [
    "Garansi 30 hari uang kembali",
    "Garansi uang kembali 100% tanpa ditanya alasan",
    "Tidak puas? Uang Anda kembali penuh",
  ],
  garansiJudul: [
    "Garansi 100% Uang Kembali",
    "Coba Tanpa Risiko",
    "Jaminan Puas atau Uang Kembali",
  ],
  garansiText: [
    "Coba dulu tanpa risiko. Jika dalam masa garansi Anda tidak cocok, uang Anda kembali penuh — tanpa pertanyaan berbelit.",
    "Kami sangat yakin dengan produk ini. Kalau Anda tidak puas, cukup hubungi kami dan uang Anda kembali.",
  ],

  // ---- Judul bagian ----
  proofJudul: [
    "Sudah dipercaya ribuan orang di seluruh Indonesia",
    "Bergabung dengan ribuan pelanggan yang puas",
    "Dipercaya oleh mereka yang sudah membuktikan",
  ],
  hargaJudul: [
    "Ambil Sekarang Sebelum Harga Naik",
    "Penawaran Terbaik, Khusus Hari Ini",
    "Investasi Kecil, Hasil Besar",
  ],
  orderJudul: [
    "Pesan Sekarang, Stok Terbatas",
    "Amankan Milik Anda Sebelum Kehabisan",
    "Penawaran Spesial — Hari Ini Saja",
  ],
  painJudul: [
    "Apakah Anda Mengalami Ini?",
    "Jangan-jangan Ini yang Anda Rasakan…",
    "Kenapa Usaha Anda Selama Ini Terasa Sia-sia?",
  ],
  alasanJudul: [
    "3 Alasan Kenapa Anda Harus Ambil Sekarang",
    "Kenapa Ribuan Orang Memilih Produk Ini",
    "Masih Ragu? Ini Faktanya",
    "Keputusan Kecil Hari Ini, Perubahan Besar Besok",
  ],
  testiJudul: [
    "Kata Mereka yang Sudah Membuktikan",
    "Jangan Percaya Kami — Percaya Mereka",
    "Testimoni Asli dari Pembeli",
  ],
  faqJudul: [
    "Pertanyaan yang Sering Ditanya",
    "Masih Ada yang Mengganjal? Ini Jawabannya",
  ],
};

export function suggestionsFor(key: string): string[] | undefined {
  return SUGGESTIONS[key];
}
