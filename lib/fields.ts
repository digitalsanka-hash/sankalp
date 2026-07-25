// lib/fields.ts — pembangun field & section (dipakai bersama semua base).
import type { FieldDef, Section, SubField } from "./types";

export const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%3E%3Crect%20width='96'%20height='96'%20rx='48'%20fill='%23c9d3cd'/%3E%3Ccircle%20cx='48'%20cy='38'%20r='16'%20fill='%23fff'/%3E%3Crect%20x='20'%20y='58'%20width='56'%20height='30'%20rx='15'%20fill='%23fff'/%3E%3C/svg%3E";
export const PHOTO =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='400'%3E%3Crect%20width='400'%20height='400'%20fill='%23e9e2db'/%3E%3Ctext%20x='200'%20y='210'%20font-size='22'%20text-anchor='middle'%20fill='%23a08f86'%20font-family='sans-serif'%3EFoto%20Produk%3C/text%3E%3C/svg%3E";

export const txt = (key: string, label: string, def: string, help?: string, example?: string): FieldDef =>
  ({ key, label, type: "text", default: def, help, example });
export const area = (key: string, label: string, def: string, help?: string): FieldDef =>
  ({ key, label, type: "textarea", default: def, help });
export const img = (key: string, label: string, def = "", help?: string): FieldDef =>
  ({ key, label, type: "image", default: def, help });
export const color = (key: string, label: string, def: string, help?: string): FieldDef =>
  ({ key, label, type: "color", default: def, help });
export const toggle = (key: string, label: string, def: boolean, help?: string): FieldDef =>
  ({ key, label, type: "toggle", default: def, help });
export const sub = (key: string, label: string, type: SubField["type"] = "text", placeholder?: string): SubField =>
  ({ key, label, type, placeholder });
export const list = (
  key: string, label: string, def: Record<string, string>[], subFields: SubField[], addLabel: string
): FieldDef => ({ key, label, type: "list", default: def, subFields, addLabel });

/** Bagian Branding (sama untuk semua). */
export const brandingSection = (): Section => ({
  id: "branding", title: "Branding", icon: "🎨",
  fields: [
    txt("brandNama", "Nama Brand / Produk", "Brand Anda", "Muncul di judul tab, footer, dan bar bawah."),
    img("logo", "Logo (opsional)", "", "Unggah logo PNG/JPG. Boleh dikosongkan."),
    color("warnaUtama", "Warna Utama", "#0e9f6e", "Warna aksen judul & ikon."),
    color("warnaAksen", "Warna Tombol", "#f59e0b", "Warna tombol ajakan. Pilih yang mencolok."),
  ],
});

/** Bagian CTA & Integrasi (ScaleV + Pixel + WA + teks tombol utama). */
export const integrasiSection = (opts: { ctaDefault: string; anchor?: boolean } ): Section => ({
  id: "integrasi", title: "CTA & Integrasi", icon: "🔗",
  fields: [
    txt("ctaUtama", "Teks Tombol Utama", opts.ctaDefault, "Muncul di tombol utama & bar melayang bawah."),
    txt("linkCheckout", "Link Checkout ScaleV", "",
      "Tempel URL checkout ScaleV Anda di sini. KOSONGKAN dulu bila belum punya — tombol tidak akan mengarah ke mana pun sampai Anda isi.", "https://checkout.scalev.id/xxxx"),
    txt("metaPixelId", "Meta Pixel ID (opsional)", "", "ID Pixel Facebook (angka). Cara ambil ada di halaman Panduan.", "1234567890"),
    txt("stickyNote", "Teks Bar Bawah", "Promo terbatas hari ini", "Kalimat kecil di bar melayang bawah."),
    txt("waTeks", "Teks Tombol WhatsApp", "Tanya via WhatsApp", "Teks bantuan (bila link WA diisi)."),
    txt("waLink", "Link WhatsApp (opsional)", "", "Format https://wa.me/62812xxxx. Kosongkan bila tak perlu.", "https://wa.me/6281234567890"),
  ],
});

/** Bagian "Kenapa Harus Beli" — alasan kuat pendorong keputusan. */
export const reasonsSection = (): Section => ({
  id: "alasan", title: "Kenapa Harus Beli", icon: "🎯",
  fields: [
    txt("alasanJudul", "Judul Bagian", "3 Alasan Kenapa Anda Harus Ambil Sekarang",
      "Bagian yang meyakinkan pembeli ragu-ragu. Pakai angka + alasan kuat."),
    list("alasanList", "Daftar Alasan", [
      { ikon: "⚡", judul: "Hasil Nyata, Bukan Janji", teks: "Sudah dibuktikan ribuan pengguna — Anda tinggal mengikuti langkahnya." },
      { ikon: "⏰", judul: "Menunda = Rugi", teks: "Harga promo terbatas. Besok bisa jadi sudah kembali normal." },
      { ikon: "🛡️", judul: "Tanpa Risiko Sama Sekali", teks: "Ada garansi uang kembali. Risiko kami yang tanggung, bukan Anda." },
    ], [sub("ikon", "Ikon (emoji)", "text", "⚡"), sub("judul", "Judul Alasan"), sub("teks", "Penjelasan", "textarea")], "Tambah alasan"),
  ],
});

/** Bagian Blok Kreatif — user menyusun elemen bebas (tak terikat struktur). */
export const creativeSection = (): Section => ({
  id: "kreatif", title: "Blok Kreatif (Bebas)", icon: "🧩",
  fields: [
    list("customBlocks", "Susun Elemen Sesukamu", [], [
      { key: "jenis", label: "Jenis Elemen", type: "select",
        options: ["teks", "judul", "poin", "kutipan", "gambar", "tombol", "pemisah"] },
      sub("teks", "Isi / Teks", "textarea", "Tulis isinya (untuk gambar/pemisah boleh kosong)"),
      sub("gambar", "Gambar (khusus jenis 'gambar')", "image"),
      sub("link", "Link (khusus jenis 'tombol')", "text", "https://... atau kosongkan"),
    ], "Tambah elemen"),
  ],
});

/** Bagian Hook Emosional. */
export const hookSection = (): Section => ({
  id: "hook", title: "Hook Emosional", icon: "🔥",
  fields: [
    toggle("hookAktif", "Tampilkan Kalimat Hook?", true, "Kalimat pembuka menyentuh emosi, muncul tepat di bawah hero."),
    area("hookText", "Kalimat Hook", "Berhenti membuang waktu & uang untuk cara yang salah. Ada jalan yang lebih mudah — dan Anda pantas mendapatkannya.", "Sentuh rasa sakit / impian pembaca. Buat mereka merasa dimengerti."),
  ],
});

/** Bagian Bukti & Jaminan (rating + trust badges + garansi). */
export const trustSection = (): Section => ({
  id: "trust", title: "Bukti & Jaminan", icon: "🛡️",
  fields: [
    txt("ratingSkor", "Skor Rating", "4.9", "Muncul sebagai ★★★★★ di bawah hero."),
    txt("ratingJml", "Jumlah Ulasan", "2.000+"),
    list("trustBadges", "Badge Kepercayaan", [
      { ikon: "✓", teks: "100% Original" },
      { ikon: "🚚", teks: "Gratis Ongkir" },
      { ikon: "💰", teks: "Garansi Uang Kembali" },
      { ikon: "🔒", teks: "Transaksi Aman" },
    ], [sub("ikon", "Ikon (emoji)", "text", "✓"), sub("teks", "Teks")], "Tambah badge"),
    txt("garansiJudul", "Judul Garansi", "Garansi 100% Uang Kembali"),
    area("garansiText", "Isi Garansi", "Coba dulu tanpa risiko. Jika dalam masa garansi Anda merasa tidak cocok, uang Anda kembali penuh — tanpa pertanyaan berbelit."),
    txt("stokSisa", "Sisa Stok (angka)", "8", "Untuk bar 'stok menipis'. Kosongkan bila tak perlu."),
    txt("stokTotal", "Stok Awal (angka)", "50"),
  ],
});

/** Bagian Transformasi "Bayangkan besok" (future pacing: dari -> jadi). */
export const transformSection = (
  judul = "Bayangkan Seminggu dari Sekarang…",
  rows: { dari: string; jadi: string }[] = [
    { dari: "Bingung mulai dari mana", jadi: "Punya langkah jelas yang tinggal diikuti" },
    { dari: "Ragu tiap mau mencoba", jadi: "Percaya diri karena hasil mulai terlihat" },
    { dari: "Jalan sendirian", jadi: "Didampingi sampai benar-benar bisa" },
  ]
): Section => ({
  id: "transformasi", title: "Transformasi (Bayangkan)", icon: "🦋",
  fields: [
    txt("transJudul", "Judul Bagian", judul, "Ajak pembaca membayangkan hidup SETELAH membeli."),
    list("transList", "Daftar Perubahan (dari → jadi)", rows,
      [sub("dari", "Kondisi Sekarang"), sub("jadi", "Kondisi Setelahnya")], "Tambah perubahan"),
  ],
});

/** Bagian Persimpangan (2 pilihan: tetap begini vs berubah). */
export const crossroadsSection = (
  judul = "Sekarang Ada Dua Pilihan di Depan Anda",
  kiriJudul = "Tetap Seperti Sekarang",
  kiriTeks = "Terus menunda\nHasil jalan di tempat\nMenyesal kenapa tidak mulai dari dulu",
  kananJudul = "Ambil Langkah Hari Ini",
  kananTeks = "Mulai dengan panduan jelas\nHasil mulai terasa minggu ini\nSetahun lagi berterima kasih pada diri sendiri"
): Section => ({
  id: "pilihan", title: "Dua Pilihan (Closing)", icon: "🔀",
  fields: [
    txt("crossJudul", "Judul Bagian", judul, "Bagian penutup yang mendorong keputusan."),
    txt("crossKiriJudul", "Judul Jalur Kiri (tetap)", kiriJudul),
    area("crossKiriTeks", "Poin Jalur Kiri (1 baris = 1 poin)", kiriTeks),
    txt("crossKananJudul", "Judul Jalur Kanan (berubah)", kananJudul),
    area("crossKananTeks", "Poin Jalur Kanan (1 baris = 1 poin)", kananTeks),
  ],
});

/** Bagian Urgency (countdown + scarcity). */
export const urgencySection = (): Section => ({
  id: "urgency", title: "Urgency (Batas Waktu)", icon: "⏰",
  fields: [
    toggle("urgencyAktif", "Tampilkan Hitung Mundur?", true, "Timer + teks keterbatasan di dekat tombol beli."),
    txt("countdownMenit", "Durasi Timer (menit)", "120", "60 = 1 jam, 1440 = 1 hari."),
    txt("scarcityTeks", "Teks Keterbatasan", "Harga promo berakhir saat timer habis!"),
  ],
});
