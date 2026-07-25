// data/templates/blocks.ts — potongan HTML marketing yang dipakai ulang di base.
// Di-interpolasi ke dalam body base (String.raw`... ${PROOF_HOOK} ...`).

// Strip bukti (rating + trust badges) + hook emosional. Taruh tepat setelah </header>.
export const PROOF_HOOK = `
<section class="proof-strip">
  <div class="wrap">
    <div class="rating-hero reveal"><span class="stars">★★★★★</span><b>{{ratingSkor}}</b><span>/5 · {{ratingJml}} ulasan puas</span></div>
    <div class="trust-badges">
      <!--REPEAT:trustBadges--><span class="tb"><b>{{ikon}}</b> {{teks}}</span><!--/REPEAT:trustBadges-->
    </div>
  </div>
</section>
<!--IF:hookAktif-->
<section class="hook"><div class="wrap-sm"><div class="hook-mark">“</div><p class="reveal">{{hookText}}</p></div></section>
<!--/IF:hookAktif-->`;

// Kotak garansi / risk-reversal. Taruh sebelum FAQ (atau sebelum form untuk lead).
export const GUARANTEE = `
<section class="guarantee-sec">
  <div class="wrap-sm">
    <div class="guarantee reveal"><div class="seal">✓</div><div><h3>{{garansiJudul}}</h3><p>{{garansiText}}</p></div></div>
  </div>
</section>`;

// Bagian "Kenapa Harus Beli" — alasan pendorong keputusan. Taruh sebelum harga.
export const REASONS = `
<!--IF:alasanList-->
<section class="reasons">
  <div class="wrap">
    <h2 class="reveal">{{alasanJudul}}</h2>
    <div class="reason-list">
      <!--REPEAT:alasanList--><div class="reason reveal"><span class="rn">{{ikon}}</span><div><b>{{judul}}</b><p>{{teks}}</p></div></div><!--/REPEAT:alasanList-->
    </div>
  </div>
</section>
<!--/IF:alasanList-->`;

// Blok Kreatif — elemen bebas susunan user. Taruh menjelang akhir halaman.
export const CUSTOM = `
<!--IF:customBlocks-->
<section class="custom-sec">
  <div class="wrap-sm"><!--BLOCKS:customBlocks--></div>
</section>
<!--/IF:customBlocks-->`;

// Bar sisa stok (scarcity). Taruh di dalam kotak harga.
export const STOCK = `<!--IF:stokSisa--><div class="stock-wrap"><div class="stock-bar" data-sisa="{{stokSisa}}" data-total="{{stokTotal}}"><div class="fill" style="width:8%"></div></div><div class="stock-txt">🔥 Tinggal {{stokSisa}} stok tersisa — cepat sebelum habis!</div></div><!--/IF:stokSisa-->`;
