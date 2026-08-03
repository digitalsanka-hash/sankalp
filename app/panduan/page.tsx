// app/panduan/page.tsx — Panduan lengkap untuk user awam.
import Link from "next/link";

function Shot({ label }: { label: string }) {
  return (
    <div className="my-3 flex h-40 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-gray-50 text-sm text-gray-400">
      🖼️ {label}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display font-black text-white shadow-glow">{n}</div>
      <div className="flex-1 pb-6">
        <h3 className="mb-1 font-display font-extrabold tracking-tight text-ink">{title}</h3>
        <div className="space-y-2 text-[15px] leading-relaxed text-gray-600">{children}</div>
      </div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 font-display text-2xl font-extrabold tracking-tight text-ink">{children}</h2>;
}

const faq: { q: string; a: string }[] = [
  { q: "Apakah saya perlu bisa koding?", a: "Tidak sama sekali. Anda hanya mengisi kolom teks & mengunggah gambar. File HTML dibuat otomatis." },
  { q: "Di mana proyek saya tersimpan?", a: "Untuk sekarang, proyek tersimpan di browser yang Anda pakai (penyimpanan lokal). Jangan hapus data/cache browser jika ingin proyek tetap ada. Simpan cloud lintas perangkat hadir di Fase 2." },
  { q: "Apakah gambar yang saya unggah ikut ke file HTML?", a: "Ya. Gambar ditanam langsung di dalam file, jadi halaman tetap tampil walau tanpa hosting gambar terpisah." },
  { q: "Kalau tombol CTA belum saya isi linknya?", a: "Tombol akan diam (tidak mengarah ke mana pun) sampai Anda mengisi link checkout di bagian 'CTA & Integrasi'. Ini disengaja agar tidak salah arah." },
  { q: "Bisa untuk banyak produk?", a: "Bisa. Buat proyek baru dari template untuk tiap produk, atau duplikat proyek yang sudah ada lalu ubah isinya." },
];

export default function PanduanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Panduan Lengkap</h1>
      <p className="mt-2 text-gray-500">Dibuat untuk pemula total. Ikuti langkah demi langkah — tidak ada yang perlu dihafal.</p>

      {/* ringkas alur */}
      <div className="mt-6 grid gap-2 rounded-2xl border border-black/[0.07] bg-white p-4 text-sm shadow-soft sm:grid-cols-4">
        {[
          ["1", "Pilih template di Galeri"],
          ["2", "Edit & Simpan Proyek"],
          ["3", "Download HTML"],
          ["4", "Pasang di ScaleV"],
        ].map(([n, t]) => (
          <div key={n} className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">{n}</span>
            <span className="font-semibold text-ink">{t}</span>
          </div>
        ))}
      </div>

      {/* 0 — kenapa Landing Page */}
      <section className="mt-10">
        <H2>Kenapa Landing Page Itu Kunci Jualan yang Cuan</H2>
        <p className="text-[15px] leading-relaxed text-gray-600">
          <b>Landing Page</b> adalah satu halaman yang dibuat khusus untuk menjual <b>satu</b> produk. Beda dengan
          toko online, link bio, atau feed sosmed — di sana pengunjung punya banyak jalan keluar. Di Landing Page,
          mereka hanya punya dua pilihan: <b>beli</b>, atau tutup. Fokus itulah yang menaikkan penjualan.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["🎯", "Satu halaman, satu tujuan", "Tanpa menu & tautan lain yang menggoda pengunjung pergi. Semua isi halaman mengarah ke satu tombol: pesan sekarang."],
            ["🧠", "Menjawab sebelum ditanya", "Harga, kualitas, garansi, cara pesan, bukti pembeli lain — dijelaskan sekali, lalu bekerja 24 jam tanpa Anda balas chat satu per satu."],
            ["💸", "Bikin iklan balik modal", "Trafik makin mahal. Naik dari 1% jadi 3% konversi berarti omzet 3x lipat — dengan budget iklan yang sama."],
            ["🏷️", "Lepas dari perang harga", "Di marketplace Anda diadu harga dengan penjual sebelah. Di Landing Page sendiri Anda menjual nilai, bonus, dan garansi."],
            ["📈", "Data untuk iklan ulang", "Meta Pixel merekam tiap pengunjung, jadi yang belum beli bisa dikejar lagi dengan iklan. Link bio & marketplace tidak memberi data itu."],
            ["🏠", "Aset milik Anda sendiri", "Link dan file halamannya milik Anda. Algoritma sosmed berubah atau akun kena limit, halaman jualan Anda tetap jalan."],
          ].map(([e, t, d]) => (
            <div key={t} className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-soft">
              <div className="text-2xl">{e}</div>
              <h3 className="mt-1 font-display font-extrabold tracking-tight text-ink">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-[15px] font-semibold text-brand-800">
          Iklan mencari orang. Konten menarik perhatian. Tapi yang menutup penjualan adalah Landing Page.
          Tanpa itu, trafik cuma lewat.
        </p>
      </section>

      {/* 1 */}
      <section className="mt-10">
        <H2>1. Memilih & Mengedit Template</H2>
        <Step n={1} title="Buka Galeri Template">
          <p>Di halaman <Link href="/" className="font-semibold text-brand-600">Galeri</Link>, ada 100+ template. Gunakan pencarian atau filter (kategori & niche) untuk menemukan yang cocok. <b>Template di galeri hanya contoh</b> — mengeditnya tidak mengubah galeri.</p>
        </Step>
        <Step n={2} title="Klik 'Pakai Template'">
          <p>Anda masuk ke <b>Studio Editor</b>. Kiri = kolom isian, kanan = pratinjau langsung (persis tampilan aslinya). Setiap ketikan langsung terlihat di pratinjau.</p>
          <Shot label="Studio: kiri form, kanan pratinjau HP" />
        </Step>
        <Step n={3} title="Isi Kolom dari Atas ke Bawah">
          <p>Kolom dikelompokkan (Branding, Hero, Hook Emosional, Bukti & Jaminan, Harga, dst). Klik judul kelompok untuk buka/tutup.</p>
          <p>Untuk daftar (manfaat, testimoni, dll) pakai <b>+ Tambah</b> untuk menambah baris, atau <b>✕ Hapus</b> untuk membuang.</p>
        </Step>
        <Step n={4} title="Ganti Warna, Logo, & Foto">
          <p>Di bagian <b>Branding</b> pilih warna lewat kotak warna & unggah logo. Di bagian Hero/produk unggah foto Anda (klik <b>Unggah</b>).</p>
        </Step>
      </section>

      {/* 2 — PROYEK */}
      <section className="mt-6">
        <H2>2. Menyimpan & Mengelola Proyek</H2>
        <div className="mb-4 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Galeri = template contoh (tetap). <b>Proyek Saya</b> = salinan milik Anda yang bisa disimpan & diedit ulang kapan saja.
        </div>
        <Step n={1} title="Beri Nama Proyek">
          <p>Di kiri atas Studio ada nama proyek (bisa diklik untuk diubah). Beri nama yang mudah dikenali, misal “Landing Page Serum – Promo Agustus”.</p>
        </Step>
        <Step n={2} title="Klik 'Simpan Proyek'">
          <p>Proyek tersimpan di browser Anda. Muncul tanda <b>✓ Tersimpan</b>. Anda bisa menutup halaman dan melanjutkannya nanti.</p>
        </Step>
        <Step n={3} title="Buka 'Proyek Saya'">
          <p>Di menu atas klik <Link href="/proyek" className="font-semibold text-brand-600">Proyek Saya</Link> untuk melihat semua Landing Page tersimpan. Tiap proyek bisa: <b>Lanjut Edit</b>, <b>Download</b> (⬇️), <b>Duplikat</b> (⧉), atau <b>Hapus</b> (🗑️).</p>
        </Step>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <b>Penting:</b> proyek disimpan di penyimpanan lokal browser. Jika Anda menghapus data/cache browser atau ganti perangkat, proyek bisa hilang. Selalu <b>Download HTML</b> untuk berjaga-jaga.
        </div>
      </section>

      {/* 3 — Pixel */}
      <section className="mt-6">
        <H2>3. Memasang Meta Pixel ID (Opsional)</H2>
        <p className="mb-4 text-gray-600">Meta Pixel dipakai agar Anda bisa melacak & mengoptimalkan iklan Facebook/Instagram. Bisa dilewati bila belum beriklan.</p>
        <Step n={1} title="Buka Meta Events Manager">
          <p>Masuk ke <span className="font-mono text-[13px]">business.facebook.com/events_manager</span> dengan akun bisnis Anda.</p>
        </Step>
        <Step n={2} title="Salin ID Pixel (angka)">
          <p>Pilih Pixel Anda. ID-nya berupa angka panjang (contoh <span className="font-mono">1234567890</span>).</p>
          <Shot label="Lokasi Pixel ID di Events Manager" />
        </Step>
        <Step n={3} title="Tempel di Editor">
          <p>Di bagian <b>CTA & Integrasi</b> → kolom <b>Meta Pixel ID</b>, tempel angka tadi. Kode pelacakan otomatis terpasang di file saat diunduh.</p>
        </Step>
      </section>

      {/* 4 — link checkout */}
      <section className="mt-6">
        <H2>4. Memasang Link Checkout ScaleV di Tombol</H2>
        <Step n={1} title="Siapkan Link Checkout">
          <p>Di dashboard ScaleV, buka produk Anda → salin URL halaman checkout (biasanya diawali <span className="font-mono">https://checkout…</span>).</p>
        </Step>
        <Step n={2} title="Tempel di Editor">
          <p>Buka <b>CTA & Integrasi</b> → kolom <b>Link Checkout ScaleV</b>, tempel URL tadi. Semua tombol beli/pesan otomatis mengarah ke sana. (Sebelum diisi, tombol sengaja dibuat diam.)</p>
        </Step>
        <Step n={3} title="Tombol WhatsApp (opsional)">
          <p>Isi <b>Link WhatsApp</b> dengan format <span className="font-mono">https://wa.me/62812xxxxxxx</span> untuk tombol tanya-jawab melayang.</p>
        </Step>
      </section>

      {/* 5 — DEPLOY ScaleV DETAIL */}
      <section className="mt-6">
        <H2>5. Deploy ke ScaleV (Paling Detail)</H2>
        <p className="mb-4 text-gray-600">Anggap Anda belum pernah memakai ScaleV. Ikuti pelan-pelan. Ada 2 cara — pilih salah satu.</p>

        <div className="mb-3 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">Cara A — Tempel Kode HTML (paling umum)</div>
        <Step n={1} title="Download File HTML Anda">
          <p>Di Studio, setelah semua terisi, klik <b>⬇️ Download HTML</b>. Sebuah file berakhiran <span className="font-mono">.html</span> tersimpan (biasanya di folder <b>Downloads</b>).</p>
        </Step>
        <Step n={2} title="Login ke ScaleV">
          <p>Buka <span className="font-mono">scalev.id</span> → masuk / daftar (gratis untuk mulai).</p>
        </Step>
        <Step n={3} title="Buat Halaman / Landing Page Baru">
          <p>Cari menu <b>Halaman</b> atau <b>Landing Page</b> → klik <b>Buat Baru</b>. Beri nama halaman.</p>
          <Shot label="Menu 'Buat Landing Page Baru' di ScaleV" />
        </Step>
        <Step n={4} title="Pilih Mode 'Custom HTML / Kode Sendiri'">
          <p>ScaleV menyediakan editor visual <i>atau</i> tempel kode HTML sendiri. Pilih opsi <b>Custom HTML / Embed / Kode</b> (bukan builder drag-and-drop).</p>
        </Step>
        <Step n={5} title="Salin Seluruh Isi File HTML">
          <p>Klik kanan file <span className="font-mono">.html</span> tadi → <b>Open with</b> → <b>Notepad</b> (atau text editor apa pun). Tekan <span className="font-mono">Ctrl+A</span> (pilih semua) lalu <span className="font-mono">Ctrl+C</span> (salin).</p>
          <Shot label="Buka file .html dengan Notepad lalu Ctrl+A, Ctrl+C" />
        </Step>
        <Step n={6} title="Tempel ke Kotak Custom HTML ScaleV">
          <p>Kembali ke ScaleV, klik di dalam kotak kode, tekan <span className="font-mono">Ctrl+V</span> (tempel). Pastikan seluruh kode masuk — dari <span className="font-mono">&lt;!DOCTYPE html&gt;</span> paling atas sampai <span className="font-mono">&lt;/html&gt;</span> paling bawah.</p>
        </Step>
        <Step n={7} title="Simpan & Publish">
          <p>Klik <b>Simpan</b> lalu <b>Publish</b>. ScaleV memberi Anda sebuah <b>link (URL)</b> halaman. Itulah Landing Page Anda yang siap disebar ke iklan / WhatsApp / bio sosmed.</p>
        </Step>

        <div className="my-5 mb-3 rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-ink">Cara B — Hubungkan Tombol ke Produk ScaleV</div>
        <Step n={1} title="Kalau Anda Hanya Butuh Checkout">
          <p>Jika halaman sudah jadi, Anda cukup memastikan tombol CTA mengarah ke link checkout produk ScaleV (lihat langkah 4 di atas). Saat pembeli klik tombol, mereka langsung masuk ke form order ScaleV.</p>
        </Step>
        <Step n={2} title="Uji Coba Dulu">
          <p>Buka link halaman Anda di HP, klik tombol beli, pastikan masuk ke halaman checkout yang benar sebelum menyebar iklan.</p>
        </Step>

        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <b>Jika ScaleV tidak punya opsi Custom HTML:</b> Anda tetap bisa hosting file di layanan statis gratis (mis. Netlify Drop — tarik file .html ke situsnya, dapat link), lalu pakai link itu sebagai halaman iklan, dengan tombol tetap mengarah ke checkout ScaleV.
        </div>
        <div className="mt-3 rounded-2xl border border-black/[0.07] bg-white p-4 text-sm text-gray-600 shadow-soft">
          <b className="text-ink">Checklist sebelum publish:</b>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Link Checkout ScaleV sudah diisi & benar</li>
            <li>Meta Pixel ID terpasang (bila beriklan)</li>
            <li>Nomor WhatsApp benar</li>
            <li>Foto & harga sudah sesuai</li>
            <li>Sudah dicek tampilannya di HP</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <H2>FAQ Singkat</H2>
        <div className="space-y-2">
          {faq.map((f, i) => (
            <details key={i} className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-soft">
              <summary className="cursor-pointer font-bold text-ink">{f.q}</summary>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center">
        <Link href="/" className="inline-block rounded-xl bg-brand-600 px-6 py-3 font-bold text-white shadow-soft transition hover:bg-brand-700">
          Mulai Buat Landing Page →
        </Link>
      </div>
    </div>
  );
}
