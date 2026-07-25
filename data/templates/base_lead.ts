// data/templates/base_lead.ts — Base "LEAD" webinar / optin (countdown + form).
import type { BaseLayout } from "@/lib/types";
import {
  brandingSection, integrasiSection, hookSection, trustSection,
  reasonsSection, creativeSection,
  txt, area, img, toggle, list, sub, AVATAR,
} from "@/lib/fields";
import { PROOF_STRIP, HOOK_BLOCK, GUARANTEE, REASONS, CUSTOM } from "@/data/templates/blocks";

export const baseLead: BaseLayout = {
  extraCss: `
.count-box{display:flex;gap:10px;justify-content:center;margin:24px 0}
.count-box .u{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:12px;padding:12px 14px;min-width:64px}
.count-box .n{font-size:28px;font-weight:900;font-variant-numeric:tabular-nums;color:#fff}
.count-box .l{font-size:11px;opacity:.82;text-transform:uppercase;letter-spacing:.5px;color:#fff}
.materi-card{padding:16px 18px 16px 54px;position:relative}
.materi-card .num{position:absolute;left:16px;top:16px;width:28px;height:28px;border-radius:9px;background:var(--utama);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:14px}
.materi-card b{display:block;margin-bottom:2px}
.host-card{display:flex;gap:16px;align-items:center;max-width:560px;margin:0 auto;text-align:left}
.host-card img{width:76px;height:76px;border-radius:999px;object-fit:cover;flex:none}
.form-card{max-width:460px;margin:0 auto;text-align:center}
.form-card input{width:100%;background:var(--bg);border:1px solid rgba(128,128,128,.3);color:var(--tinta);padding:14px 16px;border-radius:12px;font-size:16px;margin-bottom:12px;font-family:inherit}
.form-card .btn{width:100%}`,
  sections: [
    brandingSection(),
    {
      id: "hero", title: "Bagian Atas (Hero)", icon: "⭐",
      fields: [
        txt("heroBadge", "Label Kecil", "WEBINAR GRATIS"),
        area("heroHeadline", "Judul Besar", "Rahasia Mendapatkan Pelanggan Pertama Tanpa Iklan Mahal"),
        area("heroJanji", "Janji Hasil", "Dalam 90 menit, Anda tahu langkah praktis mendatangkan pembeli pertama — walau mulai dari nol."),
        txt("jadwalTeks", "Jadwal Acara", "Sabtu, 30 Agustus 2026 - Pukul 19.00 WIB"),
        toggle("countdownAktif", "Tampilkan Hitung Mundur?", true),
        txt("countdownMenit", "Sisa Waktu (menit)", "2880", "1440 = 1 hari, 2880 = 2 hari."),
      ],
    },
    {
      id: "materi", title: "Poin Materi", icon: "📝",
      fields: [
        txt("materiJudul", "Judul Bagian Materi", "Yang Akan Anda Pelajari"),
        list("materiList", "Daftar Materi", [
          { judul: "Kesalahan umum pemula", teks: "3 hal yang bikin jualan sepi & cara menghindarinya." },
          { judul: "Strategi tanpa modal besar", teks: "Cara promosi efektif memakai tools gratis." },
          { judul: "Skrip closing", teks: "Kata-kata yang membuat calon pembeli yakin." },
        ], [sub("judul", "Judul Poin"), sub("teks", "Penjelasan", "textarea")], "Tambah materi"),
      ],
    },
    {
      id: "manfaat", title: "Manfaat Ikut", icon: "🎁",
      fields: [
        txt("manfaatJudul", "Judul Bagian Manfaat", "Kenapa Anda Wajib Ikut"),
        list("manfaatList", "Daftar Manfaat", [
          { item: "Dapat rekaman & materi (khusus peserta)" },
          { item: "Sesi tanya-jawab langsung dengan pembicara" },
          { item: "E-sertifikat kehadiran" },
        ], [sub("item", "Manfaat")], "Tambah manfaat"),
      ],
    },
    {
      id: "host", title: "Pembicara", icon: "🙋",
      fields: [
        txt("hostJudul", "Judul Bagian Pembicara", "Dipandu Oleh"),
        img("hostFoto", "Foto Pembicara", AVATAR),
        txt("hostNama", "Nama Pembicara", "Budi Santoso"),
        txt("hostPeran", "Peran / Titel", "Praktisi Bisnis Online"),
        area("hostBio", "Bio Singkat", "Sudah membantu 1.000+ pemula memulai bisnis dari nol sejak 2018."),
      ],
    },
    {
      id: "form", title: "Form Pendaftaran", icon: "📩",
      fields: [
        txt("formJudul", "Judul Form", "Amankan Kursi Anda"),
        txt("formSub", "Sub Judul Form", "Gratis, tapi kuota terbatas. Isi data di bawah."),
        txt("formAction", "Link Tujuan Form", "#", "URL tempat data pendaftar dikirim (mis. form ScaleV / Google Form).", "https://forms.gle/xxxx"),
        txt("formCta", "Teks Tombol Daftar", "Daftar Sekarang - Gratis"),
        txt("formCatatan", "Catatan di Bawah Form", "Data Anda aman. Link masuk dikirim via email & WhatsApp."),
      ],
    },
    hookSection(),
    trustSection(),
    reasonsSection(),
    creativeSection(),
    integrasiSection({ ctaDefault: "Daftar Gratis Sekarang", anchor: true }),
  ],
  parts: [
    { id: "hero", label: "Bagian Atas (Hero)", html: String.raw`
<header class="hero">
  <div class="wrap">
    <!--IF:logo--><img class="logo" src="{{logo}}" alt="{{brandNama}}" /><!--/IF:logo-->
    <span class="chip" style="background:var(--aksen)">{{heroBadge}}</span>
    <h1 class="reveal">{{heroHeadline}}</h1>
    <p class="lead reveal rd1">{{heroJanji}}</p>
    <div class="reveal rd1" style="font-weight:800;color:#fff;opacity:.95;margin-top:8px">🗓️ {{jadwalTeks}}</div>
    <!--IF:countdownAktif-->
    <div class="count-box reveal rd2" data-menit="{{countdownMenit}}">
      <div class="u"><div class="n" data-h>00</div><div class="l">Jam</div></div>
      <div class="u"><div class="n" data-m>00</div><div class="l">Menit</div></div>
      <div class="u"><div class="n" data-s>00</div><div class="l">Detik</div></div>
    </div>
    <!--/IF:countdownAktif-->
    <div class="btn-wrap reveal rd2"><a class="btn pulse" href="{{linkCheckout}}" style="max-width:360px">{{ctaUtama}}</a></div>
  </div>
</header>` },
    { id: "proof", label: "Bukti & Rating", html: PROOF_STRIP },
    { id: "hook", label: "Hook Emosional", html: HOOK_BLOCK },
    { id: "materi", label: "Poin Materi", html: String.raw`
<section>
  <div class="wrap">
    <h2 class="reveal">{{materiJudul}}</h2>
    <div style="margin-top:22px;max-width:600px;margin-left:auto;margin-right:auto">
      <!--REPEAT:materiList--><div class="card materi-card reveal" style="margin-bottom:12px"><span class="num">•</span><b>{{judul}}</b><span style="color:var(--lembut)">{{teks}}</span></div><!--/REPEAT:materiList-->
    </div>
  </div>
</section>` },
    { id: "manfaat", label: "Manfaat Ikut", html: String.raw`
<section style="background:var(--surface)">
  <div class="wrap-sm">
    <h2 class="reveal">{{manfaatJudul}}</h2>
    <ul class="check-list" style="margin-top:20px"><!--REPEAT:manfaatList--><li class="reveal">{{item}}</li><!--/REPEAT:manfaatList--></ul>
  </div>
</section>` },
    { id: "host", label: "Pembicara", html: String.raw`
<section>
  <div class="wrap">
    <h2 class="reveal">{{hostJudul}}</h2>
    <div class="card host-card reveal rd1" style="margin-top:22px">
      <img src="{{hostFoto}}" alt="{{hostNama}}" />
      <div><div style="font-weight:900;font-size:18px">{{hostNama}}</div><div style="color:var(--aksen);font-weight:700;font-size:14px">{{hostPeran}}</div><p style="color:var(--lembut);font-size:14px;margin-top:6px">{{hostBio}}</p></div>
    </div>
  </div>
</section>` },
    { id: "alasan", label: "Kenapa Harus Beli", html: REASONS },
    { id: "garansi", label: "Garansi", html: GUARANTEE },
    { id: "kreatif", label: "Blok Kreatif", html: CUSTOM },
    { id: "daftar", label: "Form Pendaftaran", html: String.raw`
<section class="price-sec" id="daftar">
  <div class="wrap">
    <div class="form-card card reveal" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18)">
      <h3 style="font-size:22px;font-weight:900;color:#fff;margin-bottom:6px">{{formJudul}}</h3>
      <p style="color:rgba(255,255,255,.8);font-size:14px;margin-bottom:18px">{{formSub}}</p>
      <form action="{{formAction}}" method="get" target="_blank">
        <input type="text" name="nama" placeholder="Nama lengkap" required />
        <input type="email" name="email" placeholder="Alamat email aktif" required />
        <input type="tel" name="wa" placeholder="Nomor WhatsApp" required />
        <button class="btn" type="submit">{{formCta}}</button>
      </form>
      <p style="color:rgba(255,255,255,.7);font-size:12px;margin-top:12px">{{formCatatan}}</p>
    </div>
  </div>
</section>` },
  ],
};
