// data/templates/base_service.ts — Base "SERVICE" jasa / konsultasi / booking.
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, urgencySection, hookSection, trustSection,
  reasonsSection, creativeSection, crossroadsSection,
  txt, area, img, list, sub, AVATAR, PHOTO,
} from "@/lib/fields";
import { PROOF_STRIP, HOOK_BLOCK, GUARANTEE, REASONS, CUSTOM, CROSSROADS } from "@/data/templates/blocks";

export const baseService: BaseLayout = {
  extraCss: `
.hero .num{color:#fff}
.steps{counter-reset:st}
.steps .card{position:relative;padding-top:44px}
.steps .card::before{counter-increment:st;content:counter(st);position:absolute;top:16px;left:20px;
  width:30px;height:30px;border-radius:9px;background:var(--utama);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center}
.tier{text-align:center;position:relative;border:1px solid rgba(128,128,128,.16);background:var(--kartu)}
.tier-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--aksen);color:#fff;font-weight:800;font-size:11px;padding:4px 12px;border-radius:999px}
.tier-badge:empty{display:none}
.tier .tnama{font-weight:800;font-size:17px}
.tier .tharga{font-size:28px;font-weight:900;color:var(--utama);font-family:var(--fontHead);margin:4px 0 0}
.tier .tfitur{white-space:pre-line;color:var(--lembut);font-size:14px;text-align:left;margin:12px 0 16px;line-height:1.9}
.tier .btn{font-size:15px;padding:13px}
.unggul-card{display:flex;gap:14px;align-items:flex-start;text-align:left}
.unggul-card .ic{font-size:26px;line-height:1}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroBadge", "Label Kecil", "JASA PROFESIONAL & TERPERCAYA"),
        area("heroHeadline", "Judul Besar", "Serahkan pada Ahlinya, Hasil Rapi & Tepat Waktu"),
        area("heroSub", "Kalimat Penjelas", "Layanan profesional dengan pengalaman bertahun-tahun. Konsultasi gratis, tanpa kewajiban."),
        img("heroGambar", "Foto Utama (opsional)", PHOTO),
        txt("ctaBeliSub", "Teks Kecil di Tombol", "Respon cepat via WhatsApp"),
        list("statList", "Angka Bukti", [
          { angka: "500", satuan: "+", label: "Klien" },
          { angka: "8", satuan: " thn", label: "Pengalaman" },
          { angka: "4", satuan: ".9", label: "Rating" },
        ], [sub("angka", "Angka"), sub("satuan", "Akhiran"), sub("label", "Keterangan")], "Tambah statistik"),
      ],
    },
    {
      id: "layanan", title: "Layanan Kami", icon: "🛠️",
      fields: [
        txt("layananJudul", "Judul Bagian Layanan", "Apa yang Bisa Kami Bantu"),
        list("layananPoin", "Daftar Layanan", [
          { ikon: "✅", judul: "Konsultasi", teks: "Kami dengarkan kebutuhan & beri solusi terbaik." },
          { ikon: "⚡", judul: "Pengerjaan Cepat", teks: "Tepat waktu sesuai kesepakatan, tanpa molor." },
          { ikon: "🎯", judul: "Hasil Berkualitas", teks: "Detail diperhatikan, hasil memuaskan." },
          { ikon: "🤝", judul: "Garansi Revisi", teks: "Revisi sampai Anda benar-benar puas." },
        ], [sub("ikon", "Ikon", "text", "✅"), sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah layanan"),
      ],
    },
    {
      id: "proses", title: "Proses Kerja", icon: "🪜",
      fields: [
        txt("prosesJudul", "Judul Bagian Proses", "Cara Kerja Kami"),
        list("prosesList", "Langkah", [
          { judul: "Konsultasi", teks: "Ceritakan kebutuhan Anda, gratis." },
          { judul: "Penawaran", teks: "Kami beri estimasi harga & waktu yang jelas." },
          { judul: "Pengerjaan", teks: "Tim ahli mulai bekerja, Anda dapat update rutin." },
          { judul: "Selesai", teks: "Hasil diserahkan, plus garansi revisi." },
        ], [sub("judul", "Judul"), sub("teks", "Penjelasan", "textarea")], "Tambah langkah"),
      ],
    },
    {
      id: "paket", title: "Paket Harga", icon: "💰",
      fields: [
        txt("paketJudul", "Judul Bagian Paket", "Pilihan Paket Layanan"),
        area("paketSub", "Kalimat Penjelas", "Harga transparan, tanpa biaya tersembunyi."),
        list("paketList", "Daftar Paket", [
          { nama: "Basic", tharga: "Rp500.000", badge: "", fitur: "Layanan dasar\nRevisi 1x\nSupport chat", cta: "Pilih Paket", link: "#" },
          { nama: "Pro", tharga: "Rp1.200.000", badge: "PALING DIPILIH", fitur: "Semua di Basic\nRevisi 3x\nPrioritas pengerjaan\nGaransi hasil", cta: "Pilih Paket", link: "#" },
          { nama: "Premium", tharga: "Rp2.500.000", badge: "", fitur: "Semua di Pro\nRevisi tanpa batas\nKonsultasi lanjutan\nDukungan 30 hari", cta: "Pilih Paket", link: "#" },
        ], [
          sub("nama", "Nama Paket"), sub("tharga", "Harga"), sub("badge", "Label (opsional)"),
          sub("fitur", "Isi Paket (1 baris = 1 poin)", "textarea"), sub("cta", "Teks Tombol"), sub("link", "Link Checkout Paket"),
        ], "Tambah paket"),
      ],
    },
    {
      id: "testi", title: "Testimoni", icon: "💬",
      fields: [
        txt("testiJudul", "Judul Bagian Testimoni", "Kata Klien Kami"),
        list("testiList", "Daftar Testimoni", [
          { nama: "Bpk. Andre", foto: AVATAR, teks: "Profesional, komunikatif, hasil rapi. Puas banget!" },
          { nama: "Ibu Wati", foto: AVATAR, teks: "Cepat & sesuai brief. Pasti pakai jasa mereka lagi." },
          { nama: "CV. Maju Jaya", foto: AVATAR, teks: "Partner andalan kami. Recommended!" },
        ], [sub("nama", "Nama"), sub("foto", "Foto", "image"), sub("teks", "Isi Testimoni", "textarea")], "Tambah testimoni"),
      ],
    },
    {
      id: "faq", title: "Tanya Jawab (FAQ)", icon: "❓",
      fields: [
        txt("faqJudul", "Judul Bagian FAQ", "Pertanyaan yang Sering Ditanya"),
        list("faqList", "Daftar FAQ", [
          { tanya: "Apakah konsultasi gratis?", jawab: "Ya, konsultasi awal 100% gratis tanpa kewajiban apa pun." },
          { tanya: "Bagaimana cara pembayaran?", jawab: "Bisa DP di awal, pelunasan setelah pekerjaan selesai." },
          { tanya: "Apakah ada garansi?", jawab: "Ada garansi revisi sesuai paket yang Anda pilih." },
        ], [sub("tanya", "Pertanyaan"), sub("jawab", "Jawaban", "textarea")], "Tambah pertanyaan"),
      ],
    },
    hookSection(),
    trustSection(),
    reasonsSection(),
    crossroadsSection(
      "Urus Sendiri, atau Serahkan pada Ahlinya?",
      "Kalau Urus Sendiri",
      "Habis waktu & tenaga\nHasil belum tentu rapi\nSalah langkah malah tambah biaya",
      "Kalau Serahkan pada Kami",
      "Beres tanpa Anda pusing\nHasil rapi & bergaransi\nWaktu Anda untuk hal yang lebih penting"
    ),
    creativeSection(),
    integrasiSection({ ctaDefault: "Konsultasi Gratis Sekarang" }),
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
    <!--IF:heroGambar--><img class="foto reveal rd1" src="{{heroGambar}}" alt="jasa" /><!--/IF:heroGambar-->
    <div class="btn-wrap reveal rd2"><a class="btn pulse" href="{{linkCheckout}}">{{ctaUtama}}<small>{{ctaBeliSub}}</small></a></div>
    <div class="stat-row" style="margin-top:30px;max-width:440px;margin-left:auto;margin-right:auto">
      <!--REPEAT:statList--><div class="reveal"><div class="num" data-to="{{angka}}" data-suf="{{satuan}}">0</div><div class="lbl">{{label}}</div></div><!--/REPEAT:statList-->
    </div>
  </div>
</header>` },
    { id: "proof", label: "Bukti & Rating", html: PROOF_STRIP },
    { id: "hook", label: "Hook Emosional", html: HOOK_BLOCK },
    { id: "layanan", label: "Layanan", html: String.raw`
<section>
  <div class="wrap">
    <h2 class="reveal">{{layananJudul}}</h2>
    <div class="grid-2" style="margin-top:24px">
      <!--REPEAT:layananPoin--><div class="card unggul-card lift reveal"><div class="ic">{{ikon}}</div><div><h3 style="color:var(--utama);margin-bottom:4px">{{judul}}</h3><p style="color:var(--lembut);font-size:15px">{{teks}}</p></div></div><!--/REPEAT:layananPoin-->
    </div>
  </div>
</section>` },
    { id: "proses", label: "Proses Kerja", html: String.raw`
<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{prosesJudul}}</h2>
    <div class="grid-2 steps" style="margin-top:24px">
      <!--REPEAT:prosesList--><div class="card reveal"><h3>{{judul}}</h3><p style="color:var(--lembut)">{{teks}}</p></div><!--/REPEAT:prosesList-->
    </div>
  </div>
</section>` },
    { id: "alasan", label: "Kenapa Harus Beli", html: REASONS },
    { id: "paket", label: "Paket Harga", html: String.raw`
<section id="beli">
  <div class="wrap">
    <h2 class="reveal">{{paketJudul}}</h2>
    <p class="sub-h reveal">{{paketSub}}</p>
    <div class="grid-3" style="margin-top:28px">
      <!--REPEAT:paketList--><div class="tier card lift reveal"><span class="tier-badge">{{badge}}</span><div class="tnama">{{nama}}</div><div class="tharga">{{tharga}}</div><div class="tfitur">{{fitur}}</div><div class="btn-wrap"><a class="btn" href="{{link}}">{{cta}}</a></div></div><!--/REPEAT:paketList-->
    </div>
    <!--IF:urgencyAktif--><div class="urg reveal" style="max-width:440px;margin:26px auto 0;background:var(--surface);text-align:center"><div class="count" data-menit="{{countdownMenit}}" style="color:var(--utama)">--:--:--</div><p style="color:var(--lembut)">{{scarcityTeks}}</p></div><!--/IF:urgencyAktif-->
  </div>
</section>` },
    { id: "garansi", label: "Garansi", html: GUARANTEE },
    { id: "testi", label: "Testimoni", html: String.raw`
<section style="background:var(--surface)">
  <div class="wrap">
    <h2 class="reveal">{{testiJudul}}</h2>
    <div class="tslider" style="margin-top:22px">
      <!--REPEAT:testiList--><div class="testi-card reveal"><div class="top"><img src="{{foto}}" alt="{{nama}}" /><div><div class="nama">{{nama}}</div><div class="stars">★★★★★</div></div></div><p>"{{teks}}"</p></div><!--/REPEAT:testiList-->
    </div>
  </div>
</section>` },
    { id: "faq", label: "Tanya Jawab (FAQ)", html: String.raw`
<section class="faq">
  <div class="wrap-sm">
    <h2 class="reveal">{{faqJudul}}</h2>
    <div style="margin-top:22px"><!--REPEAT:faqList--><details class="reveal"><summary>{{tanya}}</summary><p>{{jawab}}</p></details><!--/REPEAT:faqList--></div>
  </div>
</section>` },
    { id: "pilihan", label: "Dua Pilihan (Closing)", html: CROSSROADS },
    { id: "kreatif", label: "Blok Kreatif", html: CUSTOM },
  ],
};
