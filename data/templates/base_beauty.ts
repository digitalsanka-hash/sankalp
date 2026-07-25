// data/templates/base_beauty.ts — Base "BEAUTY" produk fisik + before/after slider.
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, urgencySection, hookSection, trustSection,
  reasonsSection, creativeSection, transformSection,
  txt, area, img, list, sub, AVATAR, PHOTO,
} from "@/lib/fields";
import { PROOF_STRIP, HOOK_BLOCK, GUARANTEE, STOCK, REASONS, CUSTOM, TRANSFORM } from "@/data/templates/blocks";

export const baseBeauty: BaseLayout = {
  extraCss: `
.hero .num{color:#fff}
.galeri{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:440px;margin:22px auto 0}
.galeri img{border-radius:12px;aspect-ratio:1;object-fit:cover;width:100%}
.unggul-card{display:flex;gap:14px;align-items:flex-start;text-align:left}
.unggul-card .ic{font-size:26px;line-height:1}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroBadge", "Label Kecil", "TERLARIS BULAN INI"),
        area("heroHeadline", "Judul Besar", "Kulit Cerah & Sehat dalam 14 Hari, Tanpa Ribet"),
        area("heroSub", "Kalimat Penjelas", "Formula alami yang lembut di kulit, dipercaya ribuan pelanggan di seluruh Indonesia."),
        img("heroGambar", "Foto Utama Produk", PHOTO),
        txt("ctaBeliSub", "Teks Kecil di Tombol", "Bayar di tempat (COD), gratis ongkir"),
        list("galeriFoto", "Galeri Foto (3)", [{ foto: PHOTO }, { foto: PHOTO }, { foto: PHOTO }], [sub("foto", "Foto", "image")], "Tambah foto"),
        list("statList", "Angka Bukti", [
          { angka: "25000", satuan: "+", label: "Terjual" },
          { angka: "4", satuan: ".9", label: "Rating" },
          { angka: "14", satuan: " hari", label: "Terlihat" },
        ], [sub("angka", "Angka"), sub("satuan", "Akhiran"), sub("label", "Keterangan")], "Tambah statistik"),
      ],
    },
    {
      id: "unggul", title: "Keunggulan Produk", icon: "✨",
      fields: [
        txt("unggulJudul", "Judul Bagian Keunggulan", "Kenapa Memilih Produk Kami"),
        list("unggulPoin", "Daftar Keunggulan", [
          { ikon: "🌿", judul: "100% Bahan Alami", teks: "Aman, tanpa bahan berbahaya, cocok semua jenis kulit." },
          { ikon: "🔬", judul: "Sudah Teruji", teks: "Terdaftar BPOM & lulus uji keamanan." },
          { ikon: "⚡", judul: "Hasil Cepat", teks: "Perubahan terlihat mulai minggu pertama." },
          { ikon: "❤️", judul: "Ribuan Puas", teks: "Rating bintang 5 dari pelanggan setia." },
        ], [sub("ikon", "Ikon", "text", "🌿"), sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah keunggulan"),
      ],
    },
    {
      id: "ba", title: "Before / After", icon: "🔄",
      fields: [
        txt("baJudul", "Judul Bagian Before/After", "Geser & Lihat Perbedaannya"),
        area("baSub", "Kalimat Penjelas", "Tarik garis di tengah untuk membandingkan sebelum & sesudah pemakaian."),
        img("fotoBefore", "Foto Sebelum", PHOTO),
        img("fotoAfter", "Foto Sesudah", PHOTO),
      ],
    },
    {
      id: "testi", title: "Testimoni", icon: "💬",
      fields: [
        txt("testiJudul", "Judul Bagian Testimoni", "Testimoni Pelanggan Asli"),
        list("testiList", "Daftar Testimoni", [
          { nama: "Sari, Bandung", foto: AVATAR, teks: "Baru pakai 2 minggu, kulit jadi lebih halus. Recommended!" },
          { nama: "Dewi, Surabaya", foto: AVATAR, teks: "Packing rapi, produk ori, hasil nyata. Bakal repeat order." },
          { nama: "Nabila, Medan", foto: AVATAR, teks: "Teksturnya enak, nggak lengket. Jerawat pelan-pelan mereda." },
        ], [sub("nama", "Nama & Kota"), sub("foto", "Foto", "image"), sub("teks", "Isi Testimoni", "textarea")], "Tambah testimoni"),
      ],
    },
    {
      id: "bonus", title: "Bonus", icon: "🎁",
      fields: [
        txt("bonusJudul", "Judul Bagian Bonus", "Bonus Khusus Hari Ini"),
        list("bonusList", "Daftar Bonus", [
          { item: "Gratis ongkir seluruh Indonesia" },
          { item: "Free pouch cantik untuk 50 pembeli pertama" },
          { item: "Panduan pemakaian lengkap" },
        ], [sub("item", "Bonus")], "Tambah bonus"),
      ],
    },
    {
      id: "order", title: "Harga & Order", icon: "💰",
      fields: [
        txt("orderJudul", "Judul Bagian Order", "Pesan Sekarang, Stok Terbatas"),
        txt("hargaCoret", "Harga Coret", "Rp250.000"),
        txt("hargaJual", "Harga Jual", "Rp149.000"),
        txt("hargaSave", "Label Hemat (opsional)", "HEMAT 40%"),
        list("bonusOrder", "Rincian Paket", [
          { item: "1 botol isi 30ml (pemakaian 1 bulan)" },
          { item: "Gratis ongkir + bisa COD" },
        ], [sub("item", "Rincian")], "Tambah rincian"),
        txt("garansi", "Teks Garansi (opsional)", "Garansi uang kembali bila produk rusak"),
      ],
    },
    {
      id: "faq", title: "Tanya Jawab (FAQ)", icon: "❓",
      fields: [
        txt("faqJudul", "Judul Bagian FAQ", "Pertanyaan yang Sering Ditanya"),
        list("faqList", "Daftar FAQ", [
          { tanya: "Apakah aman untuk kulit sensitif?", jawab: "Aman. Formula lembut, tanpa alkohol keras, sudah teruji dermatologi." },
          { tanya: "Berapa lama hasil terlihat?", jawab: "Rata-rata perubahan mulai terlihat dalam 1-2 minggu pemakaian rutin." },
          { tanya: "Bisa bayar di tempat (COD)?", jawab: "Bisa. Anda cukup bayar saat barang sampai di rumah." },
        ], [sub("tanya", "Pertanyaan"), sub("jawab", "Jawaban", "textarea")], "Tambah pertanyaan"),
      ],
    },
    hookSection(),
    trustSection(),
    reasonsSection(),
    transformSection("Bayangkan 14 Hari dari Sekarang…", [
      { dari: "Minder lihat cermin", jadi: "Percaya diri tanpa filter" },
      { dari: "Makeup tebal buat nutupi", jadi: "Cukup tampil apa adanya" },
      { dari: "Coba-coba produk tanpa hasil", jadi: "Satu rutinitas yang terbukti cocok" },
    ]),
    creativeSection(),
    integrasiSection({ ctaDefault: "Pesan Sekarang - COD" }),
    urgencySection(),
  ],
  parts: [
    { id: "hero", label: "Bagian Atas (Hero)", html: String.raw`
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
</header>` },
    { id: "proof", label: "Bukti & Rating", html: PROOF_STRIP },
    { id: "hook", label: "Hook Emosional", html: HOOK_BLOCK },
    { id: "unggul", label: "Keunggulan", html: String.raw`
<section>
  <div class="wrap">
    <h2 class="reveal">{{unggulJudul}}</h2>
    <div class="grid-2" style="margin-top:24px">
      <!--REPEAT:unggulPoin--><div class="card unggul-card lift reveal"><div class="ic">{{ikon}}</div><div><h3 style="color:var(--utama);margin-bottom:4px">{{judul}}</h3><p style="color:var(--lembut);font-size:15px">{{teks}}</p></div></div><!--/REPEAT:unggulPoin-->
    </div>
  </div>
</section>` },
    { id: "ba", label: "Before / After", html: String.raw`
<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{baJudul}}</h2>
    <p class="sub-h reveal">{{baSub}}</p>
    <div class="ba-wrap reveal rd1">
      <img src="{{fotoBefore}}" alt="sebelum" />
      <img class="after-img" src="{{fotoAfter}}" alt="sesudah" />
      <div class="bar"></div><div class="knob">⇄</div>
      <span class="tagb">SEBELUM</span><span class="taga">SESUDAH</span>
    </div>
  </div>
</section>` },
    { id: "testi", label: "Testimoni", html: String.raw`
<section>
  <div class="wrap">
    <h2 class="reveal">{{testiJudul}}</h2>
    <div class="tslider" style="margin-top:22px">
      <!--REPEAT:testiList--><div class="testi-card reveal"><div class="top"><img src="{{foto}}" alt="{{nama}}" /><div><div class="nama">{{nama}}</div><div class="stars">★★★★★</div></div></div><p>"{{teks}}"</p></div><!--/REPEAT:testiList-->
    </div>
  </div>
</section>` },
    { id: "bonus", label: "Bonus", html: String.raw`
<section style="background:var(--surface)">
  <div class="wrap-sm" style="text-align:center">
    <h2 class="reveal">{{bonusJudul}}</h2>
    <ul class="check-list" style="margin-top:20px;text-align:left"><!--REPEAT:bonusList--><li class="reveal">{{item}}</li><!--/REPEAT:bonusList--></ul>
  </div>
</section>` },
    { id: "alasan", label: "Kenapa Harus Beli", html: REASONS },
    { id: "transformasi", label: "Transformasi (Bayangkan)", html: TRANSFORM },
    { id: "harga", label: "Harga & Order", html: String.raw`
<section class="price-sec" id="beli">
  <div class="wrap">
    <h2 class="reveal" style="color:#fff">{{orderJudul}}</h2>
    <div class="price-box reveal rd1">
      <div class="coret">{{hargaCoret}}</div>
      <div class="jual">{{hargaJual}}</div>
      <!--IF:hargaSave--><span class="save">{{hargaSave}}</span><!--/IF:hargaSave-->
      <ul class="bonus-list"><!--REPEAT:bonusOrder--><li>{{item}}</li><!--/REPEAT:bonusOrder--></ul>
      <div class="btn-wrap"><a class="btn pulse" href="{{linkCheckout}}">{{ctaUtama}}<small>{{ctaBeliSub}}</small></a></div>
      <!--IF:garansi--><div class="garansi">🛡️ {{garansi}}</div><!--/IF:garansi-->
      <!--IF:urgencyAktif--><div class="urg"><div class="count" data-menit="{{countdownMenit}}">--:--:--</div><p>{{scarcityTeks}}</p></div><!--/IF:urgencyAktif-->
      ${STOCK}
    </div>
  </div>
</section>` },
    { id: "garansi", label: "Garansi", html: GUARANTEE },
    { id: "faq", label: "Tanya Jawab (FAQ)", html: String.raw`
<section class="faq">
  <div class="wrap-sm">
    <h2 class="reveal">{{faqJudul}}</h2>
    <div style="margin-top:22px"><!--REPEAT:faqList--><details class="reveal"><summary>{{tanya}}</summary><p>{{jawab}}</p></details><!--/REPEAT:faqList--></div>
  </div>
</section>` },
    { id: "kreatif", label: "Blok Kreatif", html: CUSTOM },
  ],
};
