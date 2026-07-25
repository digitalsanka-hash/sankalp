// data/templates/base_saas.ts — Base "SAAS" untuk aplikasi/tool digital.
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, urgencySection, hookSection, trustSection,
  txt, area, img, list, sub, AVATAR,
} from "@/lib/fields";
import { PROOF_HOOK, GUARANTEE, STOCK } from "@/data/templates/blocks";

export const baseSaas: BaseLayout = {
  extraCss: `
.hero .num{color:#fff}
.steps{counter-reset:st}
.steps .card{position:relative;padding-top:44px}
.steps .card::before{counter-increment:st;content:counter(st);position:absolute;top:16px;left:20px;
  width:30px;height:30px;border-radius:9px;background:var(--utama);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center}
.plan-feat{list-style:none;text-align:left;max-width:340px;margin:16px auto;padding:0}
.plan-feat li{padding:8px 0 8px 28px;position:relative;border-bottom:1px solid rgba(255,255,255,.14)}
.plan-feat li::before{content:"✓";position:absolute;left:0;color:var(--aksen);font-weight:900}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroEyebrow", "Label Kecil", "APLIKASI #1 UNTUK UMKM"),
        area("heroHeadline", "Judul Besar", "Kelola Bisnis Anda dari Satu Aplikasi, Tanpa Ribet"),
        area("heroSub", "Kalimat Penjelas", "Catat penjualan, stok, dan laporan otomatis. Hemat waktu berjam-jam setiap minggu."),
        txt("ctaBeliSub", "Teks Kecil di Tombol", "Coba gratis, tanpa kartu kredit"),
        img("heroGambar", "Screenshot Aplikasi (opsional)", ""),
        list("statList", "Angka Bukti", [
          { angka: "10000", satuan: "+", label: "Pengguna" },
          { angka: "4", satuan: ".8", label: "Rating" },
          { angka: "5", satuan: " jt+", label: "Transaksi" },
        ], [sub("angka", "Angka"), sub("satuan", "Akhiran"), sub("label", "Keterangan")], "Tambah statistik"),
      ],
    },
    {
      id: "pain", title: "Masalah", icon: "😩",
      fields: [
        txt("painJudul", "Judul Bagian Masalah", "Masih Mengerjakan Ini Secara Manual?"),
        list("painPoin", "Daftar Masalah", [
          { item: "Catat penjualan pakai buku, sering hilang & keliru" },
          { item: "Stok berantakan, tak tahu barang mana yang laku" },
          { item: "Bikin laporan makan waktu berjam-jam" },
        ], [sub("item", "Masalah")], "Tambah masalah"),
      ],
    },
    {
      id: "fitur", title: "Fitur Unggulan", icon: "⚙️",
      fields: [
        txt("fiturJudul", "Judul Bagian Fitur", "Semua yang Anda Butuhkan, Jadi Satu"),
        list("fiturPoin", "Daftar Fitur", [
          { ikon: "🧾", judul: "Kasir Otomatis", teks: "Transaksi cepat, struk digital, hitung otomatis." },
          { ikon: "📦", judul: "Kelola Stok", teks: "Notifikasi stok menipis, tak ada lagi kehabisan." },
          { ikon: "📊", judul: "Laporan Instan", teks: "Untung rugi terlihat real-time, kapan saja." },
          { ikon: "☁️", judul: "Aman di Cloud", teks: "Data tersimpan aman, akses dari mana saja." },
        ], [sub("ikon", "Ikon", "text", "⚙️"), sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah fitur"),
      ],
    },
    {
      id: "langkah", title: "Cara Kerja", icon: "🪜",
      fields: [
        txt("langkahJudul", "Judul Bagian Cara Kerja", "Mulai dalam 3 Langkah Mudah"),
        list("langkahList", "Langkah", [
          { judul: "Daftar Gratis", teks: "Buat akun dalam 1 menit, langsung bisa dipakai." },
          { judul: "Atur Produk", teks: "Masukkan produk & harga. Kami bantu impor cepat." },
          { judul: "Mulai Jualan", teks: "Catat transaksi, pantau laporan otomatis." },
        ], [sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah langkah"),
      ],
    },
    {
      id: "testi", title: "Testimoni", icon: "💬",
      fields: [
        txt("testiJudul", "Judul Bagian Testimoni", "Dipakai & Dicintai Ribuan Pebisnis"),
        list("testiList", "Daftar Testimoni", [
          { nama: "Pak Budi, Toko Sembako", foto: AVATAR, teks: "Sejak pakai aplikasi ini, laporan tinggal klik. Hemat waktu banget." },
          { nama: "Sinta, Owner Boutique", foto: AVATAR, teks: "Stok jadi rapi, nggak pernah kehabisan barang laris lagi." },
          { nama: "Rudi, Cafe Owner", foto: AVATAR, teks: "Kasirnya cepat, karyawan gampang belajar. Mantap." },
        ], [sub("nama", "Nama"), sub("foto", "Foto", "image"), sub("teks", "Isi Testimoni", "textarea")], "Tambah testimoni"),
      ],
    },
    {
      id: "harga", title: "Harga & Paket", icon: "💰",
      fields: [
        txt("hargaJudul", "Judul Bagian Harga", "Harga Terjangkau untuk Semua"),
        txt("hargaCoret", "Harga Coret", "Rp150.000/bln"),
        txt("hargaJual", "Harga Jual", "Rp49.000/bln"),
        txt("hargaSave", "Label Hemat (opsional)", "HEMAT 67%"),
        list("bonusList", "Fitur dalam Paket", [
          { item: "Semua fitur tanpa batas" },
          { item: "Dukungan prioritas 24/7" },
          { item: "Update fitur gratis selamanya" },
        ], [sub("item", "Fitur")], "Tambah fitur"),
        txt("garansi", "Teks Garansi (opsional)", "Garansi 14 hari uang kembali"),
      ],
    },
    {
      id: "faq", title: "Tanya Jawab (FAQ)", icon: "❓",
      fields: [
        txt("faqJudul", "Judul Bagian FAQ", "Pertanyaan yang Sering Ditanya"),
        list("faqList", "Daftar FAQ", [
          { tanya: "Apakah butuh install?", jawab: "Tidak. Cukup buka lewat HP atau laptop, langsung jalan." },
          { tanya: "Data saya aman?", jawab: "Sangat aman. Semua tersimpan terenkripsi di cloud & dibackup otomatis." },
          { tanya: "Bisa coba dulu?", jawab: "Bisa. Ada masa coba gratis tanpa perlu kartu kredit." },
        ], [sub("tanya", "Pertanyaan"), sub("jawab", "Jawaban", "textarea")], "Tambah pertanyaan"),
      ],
    },
    hookSection(),
    trustSection(),
    integrasiSection({ ctaDefault: "Coba Gratis Sekarang" }),
    urgencySection(),
  ],
  body: String.raw`
<header class="hero">
  <div class="wrap">
    <!--IF:logo--><img class="logo" src="{{logo}}" alt="{{brandNama}}" /><!--/IF:logo-->
    <span class="eyebrow">{{heroEyebrow}}</span>
    <h1 class="reveal">{{heroHeadline}}</h1>
    <p class="lead reveal rd1">{{heroSub}}</p>
    <div class="btn-wrap reveal rd2"><a class="btn pulse" href="{{linkCheckout}}">{{ctaUtama}}<small>{{ctaBeliSub}}</small></a></div>
    <div class="stat-row" style="margin-top:32px;max-width:440px;margin-left:auto;margin-right:auto">
      <!--REPEAT:statList--><div class="reveal"><div class="num" data-to="{{angka}}" data-suf="{{satuan}}">0</div><div class="lbl">{{label}}</div></div><!--/REPEAT:statList-->
    </div>
    <!--IF:heroGambar--><img class="foto reveal rd2" src="{{heroGambar}}" alt="aplikasi" /><!--/IF:heroGambar-->
  </div>
</header>
${PROOF_HOOK}

<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{painJudul}}</h2>
    <ul class="pain-list"><!--REPEAT:painPoin--><li class="reveal">{{item}}</li><!--/REPEAT:painPoin--></ul>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="reveal">{{fiturJudul}}</h2>
    <div class="grid-2" style="margin-top:24px">
      <!--REPEAT:fiturPoin--><div class="card feat lift reveal"><div class="ic">{{ikon}}</div><h3>{{judul}}</h3><p>{{teks}}</p></div><!--/REPEAT:fiturPoin-->
    </div>
  </div>
</section>

<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{langkahJudul}}</h2>
    <div class="grid-3 steps" style="margin-top:24px">
      <!--REPEAT:langkahList--><div class="card reveal"><h3>{{judul}}</h3><p style="color:var(--lembut)">{{teks}}</p></div><!--/REPEAT:langkahList-->
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="reveal">{{testiJudul}}</h2>
    <div class="tslider" style="margin-top:22px">
      <!--REPEAT:testiList--><div class="testi-card reveal"><div class="top"><img src="{{foto}}" alt="{{nama}}" /><div><div class="nama">{{nama}}</div><div class="stars">★★★★★</div></div></div><p>"{{teks}}"</p></div><!--/REPEAT:testiList-->
    </div>
  </div>
</section>

<section class="price-sec" id="beli">
  <div class="wrap">
    <h2 class="reveal" style="color:#fff">{{hargaJudul}}</h2>
    <div class="price-box reveal rd1">
      <div class="coret">{{hargaCoret}}</div>
      <div class="jual">{{hargaJual}}</div>
      <!--IF:hargaSave--><span class="save">{{hargaSave}}</span><!--/IF:hargaSave-->
      <ul class="plan-feat"><!--REPEAT:bonusList--><li>{{item}}</li><!--/REPEAT:bonusList--></ul>
      <div class="btn-wrap"><a class="btn pulse" href="{{linkCheckout}}">{{ctaUtama}}<small>{{ctaBeliSub}}</small></a></div>
      <!--IF:garansi--><div class="garansi">🛡️ {{garansi}}</div><!--/IF:garansi-->
      <!--IF:urgencyAktif--><div class="urg"><div class="count" data-menit="{{countdownMenit}}">--:--:--</div><p>{{scarcityTeks}}</p></div><!--/IF:urgencyAktif-->
      ${STOCK}
    </div>
  </div>
</section>
${GUARANTEE}

<section class="faq">
  <div class="wrap-sm">
    <h2 class="reveal">{{faqJudul}}</h2>
    <div style="margin-top:22px"><!--REPEAT:faqList--><details class="reveal"><summary>{{tanya}}</summary><p>{{jawab}}</p></details><!--/REPEAT:faqList--></div>
  </div>
</section>`,
};
