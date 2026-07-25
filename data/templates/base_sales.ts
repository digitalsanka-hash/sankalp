// data/templates/base_sales.ts — Base "SALES" untuk produk digital.
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, urgencySection, hookSection, trustSection,
  txt, area, img, list, sub, AVATAR,
} from "@/lib/fields";
import { PROOF_HOOK, GUARANTEE, STOCK } from "@/data/templates/blocks";

export const baseSales: BaseLayout = {
  extraCss: `.hero .num{color:#fff}.hero .stat-row{max-width:440px;margin-left:auto;margin-right:auto}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroEyebrow", "Label Kecil di Atas Judul", "KELAS ONLINE UNTUK PEMULA"),
        area("heroHeadline", "Judul Besar", "Kuasai Skill Baru Hanya dalam 7 Hari, Tanpa Bingung Mulai dari Mana"),
        area("heroSub", "Kalimat Penjelas", "Panduan langkah demi langkah yang sudah membantu ratusan pemula belajar cepat dan langsung praktik."),
        txt("ctaBeliSub", "Teks Kecil di Tombol", "Akses seumur hidup, langsung setelah bayar"),
        img("heroGambar", "Foto/Mockup Produk (opsional)", ""),
        list("statList", "Angka Bukti (statistik)", [
          { angka: "1200", satuan: "+", label: "Alumni" },
          { angka: "4", satuan: ".9", label: "Rating" },
          { angka: "98", satuan: "%", label: "Puas" },
        ], [sub("angka", "Angka", "text", "1200"), sub("satuan", "Akhiran", "text", "+ / % / .9"), sub("label", "Keterangan")], "Tambah statistik"),
      ],
    },
    {
      id: "proof", title: "Social Proof", icon: "🏅",
      fields: [
        txt("proofJudul", "Kalimat Kepercayaan", "Sudah dipercaya ribuan orang di seluruh Indonesia"),
        list("logoList", "Daftar Nama/Media (berjalan)", [
          { teks: "★ 1.200+ Alumni" }, { teks: "Dibahas di Komunitas" }, { teks: "Garansi Uang Kembali" }, { teks: "Update Gratis Selamanya" },
        ], [sub("teks", "Teks")], "Tambah item"),
      ],
    },
    {
      id: "pain", title: "Masalah Pembaca", icon: "😩",
      fields: [
        txt("painJudul", "Judul Bagian Masalah", "Apakah Anda Mengalami Ini?"),
        list("painPoin", "Daftar Masalah", [
          { item: "Sudah coba belajar sendiri tapi malah makin bingung" },
          { item: "Buang waktu dan uang untuk cara yang salah" },
          { item: "Tidak ada yang membimbing langkah demi langkah" },
        ], [sub("item", "Masalah")], "Tambah masalah"),
      ],
    },
    {
      id: "benefit", title: "Manfaat / Keunggulan", icon: "✅",
      fields: [
        txt("benefitJudul", "Judul Bagian Manfaat", "Yang Akan Anda Dapatkan"),
        list("benefitPoin", "Daftar Manfaat", [
          { ikon: "⏱️", judul: "Hemat Waktu", teks: "Materi ringkas & terstruktur, tak perlu cari-cari sendiri." },
          { ikon: "🎯", judul: "Langsung Praktik", teks: "Setiap bab ada contoh nyata yang bisa langsung ditiru." },
          { ikon: "🧩", judul: "Cocok Pemula", teks: "Bahasa sederhana, tanpa istilah rumit." },
          { ikon: "♾️", judul: "Akses Selamanya", teks: "Bisa dibuka kapan saja, seumur hidup." },
        ], [sub("ikon", "Ikon (emoji)", "text", "🎯"), sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah manfaat"),
      ],
    },
    {
      id: "isi", title: "Isi Produk", icon: "📦",
      fields: [
        txt("isiJudul", "Judul Bagian Isi", "Apa Saja yang Ada di Dalamnya"),
        list("isiPoin", "Daftar Isi / Modul", [
          { item: "Modul 1: Fondasi & persiapan dari nol" },
          { item: "Modul 2: Langkah inti step-by-step" },
          { item: "Modul 3: Trik mempercepat hasil" },
          { item: "Bonus: Template & checklist siap pakai" },
        ], [sub("item", "Isi")], "Tambah isi"),
      ],
    },
    {
      id: "testi", title: "Testimoni", icon: "💬",
      fields: [
        txt("testiJudul", "Judul Bagian Testimoni", "Kata Mereka yang Sudah Coba"),
        list("testiList", "Daftar Testimoni", [
          { nama: "Rina, Ibu Rumah Tangga", foto: AVATAR, teks: "Materinya gampang dipahami. Baru 3 hari sudah kelihatan hasilnya!" },
          { nama: "Andi, Karyawan", foto: AVATAR, teks: "Worth it banget. Penjelasannya runut, cocok buat yang sibuk." },
          { nama: "Maya, Mahasiswa", foto: AVATAR, teks: "Awalnya ragu, ternyata isinya padat & aplikatif. Recommended!" },
        ], [sub("nama", "Nama"), sub("foto", "Foto", "image"), sub("teks", "Isi Testimoni", "textarea")], "Tambah testimoni"),
      ],
    },
    {
      id: "harga", title: "Harga & Penawaran", icon: "💰",
      fields: [
        txt("hargaJudul", "Judul Bagian Harga", "Ambil Sekarang Sebelum Harga Naik"),
        txt("hargaCoret", "Harga Coret", "Rp299.000"),
        txt("hargaJual", "Harga Jual", "Rp99.000"),
        txt("hargaSave", "Label Hemat (opsional)", "HEMAT 67%"),
        list("bonusList", "Daftar Bonus", [
          { item: "Bonus 1: Checklist praktis (PDF)" },
          { item: "Bonus 2: Grup diskusi eksklusif" },
          { item: "Bonus 3: Update materi gratis" },
        ], [sub("item", "Bonus")], "Tambah bonus"),
        txt("garansi", "Teks Garansi (opsional)", "Garansi 7 hari uang kembali"),
      ],
    },
    {
      id: "faq", title: "Tanya Jawab (FAQ)", icon: "❓",
      fields: [
        txt("faqJudul", "Judul Bagian FAQ", "Pertanyaan yang Sering Ditanya"),
        list("faqList", "Daftar FAQ", [
          { tanya: "Apakah cocok untuk pemula total?", jawab: "Sangat cocok. Dirancang dari nol, tanpa asumsi Anda sudah tahu apa pun." },
          { tanya: "Bagaimana cara mengaksesnya?", jawab: "Setelah bayar, link akses dikirim otomatis ke email/WhatsApp Anda." },
          { tanya: "Apakah ada garansi?", jawab: "Ada. Jika tidak sesuai, uang kembali sesuai ketentuan." },
        ], [sub("tanya", "Pertanyaan"), sub("jawab", "Jawaban", "textarea")], "Tambah pertanyaan"),
      ],
    },
    hookSection(),
    trustSection(),
    integrasiSection({ ctaDefault: "Saya Mau Mulai Sekarang" }),
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
    <div class="stat-row" style="margin-top:32px">
      <!--REPEAT:statList--><div class="reveal"><div class="num" data-to="{{angka}}" data-suf="{{satuan}}">0</div><div class="lbl">{{label}}</div></div><!--/REPEAT:statList-->
    </div>
    <!--IF:heroGambar--><img class="foto reveal rd2" src="{{heroGambar}}" alt="produk" /><!--/IF:heroGambar-->
  </div>
</header>
${PROOF_HOOK}

<section style="padding:30px 0">
  <div class="wrap">
    <p class="sub-h" style="margin-bottom:16px">{{proofJudul}}</p>
    <div class="marquee"><div class="track">
      <!--REPEAT:logoList--><span>{{teks}}</span><!--/REPEAT:logoList-->
      <!--REPEAT:logoList--><span>{{teks}}</span><!--/REPEAT:logoList-->
    </div></div>
  </div>
</section>

<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{painJudul}}</h2>
    <ul class="pain-list">
      <!--REPEAT:painPoin--><li class="reveal">{{item}}</li><!--/REPEAT:painPoin-->
    </ul>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="reveal">{{benefitJudul}}</h2>
    <div class="grid-2" style="margin-top:24px">
      <!--REPEAT:benefitPoin--><div class="card feat lift reveal"><div class="ic">{{ikon}}</div><h3>{{judul}}</h3><p>{{teks}}</p></div><!--/REPEAT:benefitPoin-->
    </div>
  </div>
</section>

<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{isiJudul}}</h2>
    <ul class="check-list" style="margin-top:22px">
      <!--REPEAT:isiPoin--><li class="reveal">{{item}}</li><!--/REPEAT:isiPoin-->
    </ul>
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
      <ul class="bonus-list">
        <!--REPEAT:bonusList--><li>{{item}}</li><!--/REPEAT:bonusList-->
      </ul>
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
    <div style="margin-top:22px">
      <!--REPEAT:faqList--><details class="reveal"><summary>{{tanya}}</summary><p>{{jawab}}</p></details><!--/REPEAT:faqList-->
    </div>
  </div>
</section>`,
};
