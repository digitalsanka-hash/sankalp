// data/templates/base_product.ts — Base "PRODUCT" fisik umum + paket bertingkat.
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, urgencySection, hookSection, trustSection,
  reasonsSection, creativeSection,
  txt, area, img, list, sub, AVATAR, PHOTO,
} from "@/lib/fields";
import { PROOF_HOOK, GUARANTEE, REASONS, CUSTOM } from "@/data/templates/blocks";

export const baseProduct: BaseLayout = {
  extraCss: `
.hero .num{color:#fff}
.galeri{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:440px;margin:22px auto 0}
.galeri img{border-radius:12px;aspect-ratio:1;object-fit:cover;width:100%}
.unggul-card{display:flex;gap:14px;align-items:flex-start;text-align:left}
.unggul-card .ic{font-size:26px;line-height:1}
.tier{text-align:center;position:relative;border:1px solid rgba(128,128,128,.16);background:var(--kartu)}
.tier-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--aksen);color:#fff;font-weight:800;font-size:11px;padding:4px 12px;border-radius:999px}
.tier-badge:empty{display:none}
.tier .tnama{font-weight:800;font-size:17px}
.tier .tharga{font-size:30px;font-weight:900;color:var(--utama);font-family:var(--fontHead);margin:4px 0 0}
.tier .tcoret{text-decoration:line-through;color:var(--lembut);font-size:14px}
.tier .tfitur{white-space:pre-line;color:var(--lembut);font-size:14px;text-align:left;margin:12px 0 16px;line-height:1.9}
.tier .btn{font-size:15px;padding:13px}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroBadge", "Label Kecil", "BEST SELLER"),
        area("heroHeadline", "Judul Besar", "Produk Berkualitas yang Bikin Harimu Lebih Mudah"),
        area("heroSub", "Kalimat Penjelas", "Dibuat dari bahan pilihan, tahan lama, dan sudah dipercaya ribuan pelanggan."),
        img("heroGambar", "Foto Utama Produk", PHOTO),
        txt("ctaBeliSub", "Teks Kecil di Tombol", "Bayar di tempat (COD), gratis ongkir"),
        list("galeriFoto", "Galeri Foto (3)", [{ foto: PHOTO }, { foto: PHOTO }, { foto: PHOTO }], [sub("foto", "Foto", "image")], "Tambah foto"),
        list("statList", "Angka Bukti", [
          { angka: "15000", satuan: "+", label: "Terjual" },
          { angka: "4", satuan: ".8", label: "Rating" },
          { angka: "99", satuan: "%", label: "Puas" },
        ], [sub("angka", "Angka"), sub("satuan", "Akhiran"), sub("label", "Keterangan")], "Tambah statistik"),
      ],
    },
    {
      id: "unggul", title: "Keunggulan Produk", icon: "✨",
      fields: [
        txt("unggulJudul", "Judul Bagian Keunggulan", "Kenapa Produk Kami Beda"),
        list("unggulPoin", "Daftar Keunggulan", [
          { ikon: "🏆", judul: "Kualitas Premium", teks: "Bahan pilihan, awet dipakai bertahun-tahun." },
          { ikon: "🚚", judul: "Kirim Cepat", teks: "Dikirim hari ini juga, sampai dengan aman." },
          { ikon: "💯", judul: "Garansi Asli", teks: "100% original atau uang kembali." },
          { ikon: "🤝", judul: "Layanan Ramah", teks: "Tim support siap membantu Anda." },
        ], [sub("ikon", "Ikon", "text", "🏆"), sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah keunggulan"),
      ],
    },
    {
      id: "detail", title: "Detail / Spesifikasi", icon: "📋",
      fields: [
        txt("detailJudul", "Judul Bagian Detail", "Yang Membuatnya Istimewa"),
        list("detailPoin", "Daftar Detail", [
          { item: "Material berkualitas tinggi, nyaman dipakai" },
          { item: "Desain modern, cocok untuk segala suasana" },
          { item: "Mudah dirawat & tahan lama" },
        ], [sub("item", "Detail")], "Tambah detail"),
      ],
    },
    {
      id: "testi", title: "Testimoni", icon: "💬",
      fields: [
        txt("testiJudul", "Judul Bagian Testimoni", "Apa Kata Pelanggan Kami"),
        list("testiList", "Daftar Testimoni", [
          { nama: "Rahmat, Jakarta", foto: AVATAR, teks: "Barang sesuai foto, kualitas mantap. Pengiriman cepat!" },
          { nama: "Lina, Semarang", foto: AVATAR, teks: "Suka banget! Sudah repeat order ke-3 kalinya." },
          { nama: "Toni, Makassar", foto: AVATAR, teks: "Recommended seller, produk ori, packing aman." },
        ], [sub("nama", "Nama & Kota"), sub("foto", "Foto", "image"), sub("teks", "Isi Testimoni", "textarea")], "Tambah testimoni"),
      ],
    },
    {
      id: "paket", title: "Pilihan Paket", icon: "📦",
      fields: [
        txt("paketJudul", "Judul Bagian Paket", "Pilih Paket Terbaikmu"),
        area("paketSub", "Kalimat Penjelas", "Makin banyak, makin hemat. Paket populer paling banyak dipilih."),
        list("paketList", "Daftar Paket", [
          { nama: "Paket Coba", tcoret: "Rp150.000", tharga: "Rp99.000", badge: "", fitur: "1 pcs produk\nGratis ongkir\nBisa COD", cta: "Pilih Paket", link: "#" },
          { nama: "Paket Hemat", tcoret: "Rp300.000", tharga: "Rp179.000", badge: "PALING LARIS", fitur: "2 pcs produk\nGratis ongkir\nBonus 1 hadiah\nBisa COD", cta: "Pilih Paket", link: "#" },
          { nama: "Paket Borong", tcoret: "Rp450.000", tharga: "Rp239.000", badge: "PALING HEMAT", fitur: "3 pcs produk\nGratis ongkir\nBonus 2 hadiah\nPrioritas kirim", cta: "Pilih Paket", link: "#" },
        ], [
          sub("nama", "Nama Paket"), sub("tcoret", "Harga Coret"), sub("tharga", "Harga Jual"),
          sub("badge", "Label (opsional)"), sub("fitur", "Isi Paket (1 baris = 1 poin)", "textarea"),
          sub("cta", "Teks Tombol"), sub("link", "Link Checkout Paket"),
        ], "Tambah paket"),
      ],
    },
    {
      id: "faq", title: "Tanya Jawab (FAQ)", icon: "❓",
      fields: [
        txt("faqJudul", "Judul Bagian FAQ", "Pertanyaan yang Sering Ditanya"),
        list("faqList", "Daftar FAQ", [
          { tanya: "Apakah bisa COD?", jawab: "Bisa. Bayar di tempat saat barang sampai di rumah Anda." },
          { tanya: "Berapa lama pengiriman?", jawab: "Umumnya 1-3 hari kerja, tergantung lokasi Anda." },
          { tanya: "Apakah bisa tukar/retur?", jawab: "Bisa. Jika ada cacat produksi, kami ganti baru." },
        ], [sub("tanya", "Pertanyaan"), sub("jawab", "Jawaban", "textarea")], "Tambah pertanyaan"),
      ],
    },
    hookSection(),
    trustSection(),
    reasonsSection(),
    creativeSection(),
    integrasiSection({ ctaDefault: "Pesan Sekarang - COD" }),
    urgencySection(),
  ],
  body: String.raw`
<header class="hero">
  <div class="wrap">
    <!--IF:logo--><img class="logo" src="{{logo}}" alt="{{brandNama}}" /><!--/IF:logo-->
    <span class="chip" style="background:rgba(255,255,255,.2)">{{heroBadge}}</span>
    <h1 class="reveal">{{heroHeadline}}</h1>
    <p class="lead reveal rd1">{{heroSub}}</p>
    <!--IF:heroGambar--><img class="foto reveal rd1" src="{{heroGambar}}" alt="produk" /><!--/IF:heroGambar-->
    <div class="btn-wrap reveal rd2"><a class="btn pulse" href="{{linkCheckout}}">{{ctaUtama}}<small>{{ctaBeliSub}}</small></a></div>
    <div class="galeri reveal rd2"><!--REPEAT:galeriFoto--><img src="{{foto}}" alt="foto produk" /><!--/REPEAT:galeriFoto--></div>
    <div class="stat-row" style="margin-top:30px;max-width:440px;margin-left:auto;margin-right:auto">
      <!--REPEAT:statList--><div class="reveal"><div class="num" data-to="{{angka}}" data-suf="{{satuan}}">0</div><div class="lbl">{{label}}</div></div><!--/REPEAT:statList-->
    </div>
  </div>
</header>
${PROOF_HOOK}

<section>
  <div class="wrap">
    <h2 class="reveal">{{unggulJudul}}</h2>
    <div class="grid-2" style="margin-top:24px">
      <!--REPEAT:unggulPoin--><div class="card unggul-card lift reveal"><div class="ic">{{ikon}}</div><div><h3 style="color:var(--utama);margin-bottom:4px">{{judul}}</h3><p style="color:var(--lembut);font-size:15px">{{teks}}</p></div></div><!--/REPEAT:unggulPoin-->
    </div>
  </div>
</section>

<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{detailJudul}}</h2>
    <ul class="check-list" style="margin-top:22px"><!--REPEAT:detailPoin--><li class="reveal">{{item}}</li><!--/REPEAT:detailPoin--></ul>
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

${REASONS}

<section style="background:var(--surface)" id="beli">
  <div class="wrap">
    <h2 class="reveal">{{paketJudul}}</h2>
    <p class="sub-h reveal">{{paketSub}}</p>
    <div class="grid-3" style="margin-top:28px">
      <!--REPEAT:paketList--><div class="tier card lift reveal"><span class="tier-badge">{{badge}}</span><div class="tnama">{{nama}}</div><div class="tcoret">{{tcoret}}</div><div class="tharga">{{tharga}}</div><div class="tfitur">{{fitur}}</div><div class="btn-wrap"><a class="btn" href="{{link}}">{{cta}}</a></div></div><!--/REPEAT:paketList-->
    </div>
    <!--IF:urgencyAktif--><div class="urg reveal" style="max-width:440px;margin:26px auto 0;background:var(--kartu);text-align:center"><div class="count" data-menit="{{countdownMenit}}" style="color:var(--utama)">--:--:--</div><p style="color:var(--lembut)">{{scarcityTeks}}</p></div><!--/IF:urgencyAktif-->
  </div>
</section>
${GUARANTEE}

<section class="faq">
  <div class="wrap-sm">
    <h2 class="reveal">{{faqJudul}}</h2>
    <div style="margin-top:22px"><!--REPEAT:faqList--><details class="reveal"><summary>{{tanya}}</summary><p>{{jawab}}</p></details><!--/REPEAT:faqList--></div>
  </div>
</section>
${CUSTOM}`,
};
