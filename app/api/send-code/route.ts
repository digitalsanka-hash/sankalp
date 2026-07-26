// app/api/send-code/route.ts — kirim email KODE AKSES ke pembeli via Resend.
// Kunci API disimpan di server (env RESEND_API_KEY), TIDAK pernah ke browser.
//
// ENV yang dipakai (set di Vercel > Settings > Environment Variables):
//   RESEND_API_KEY   : kunci dari resend.com  (WAJIB)
//   MAIL_FROM        : pengirim, mis. "SankaPage <noreply@domainanda.com>"
//                      (default: onboarding@resend.dev — hanya untuk uji coba)
//   APP_URL          : URL aplikasi (default: https://www.sankapage.com)
//   ADMIN_CODE       : kode admin, untuk memastikan hanya admin yang bisa kirim
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  adminCode?: string;
  nama?: string;
  email?: string;
  kode?: string;
  masa?: string; // 'lifetime' | '1' | '3' | '6' | '12'
}

function labelMasa(m?: string) {
  if (!m || m === "lifetime") return "Selamanya (lifetime)";
  return `${m} bulan`;
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, pesan: "RESEND_API_KEY belum diatur di Vercel." },
      { status: 500 }
    );
  }

  let b: Body;
  try { b = (await req.json()) as Body; }
  catch { return NextResponse.json({ ok: false, pesan: "Body tidak valid" }, { status: 400 }); }

  const expected = process.env.ADMIN_CODE;
  if (expected && (b.adminCode ?? "").trim().toUpperCase() !== expected.trim().toUpperCase()) {
    return NextResponse.json({ ok: false, pesan: "Kode admin tidak valid." }, { status: 401 });
  }

  const nama = (b.nama ?? "").trim() || "Sahabat SankaPage";
  const email = (b.email ?? "").trim();
  const kode = (b.kode ?? "").trim().toUpperCase();
  if (!email || !kode) {
    return NextResponse.json({ ok: false, pesan: "Email & kode wajib diisi." }, { status: 400 });
  }

  const appUrl = process.env.APP_URL || "https://www.sankapage.com";
  const from = process.env.MAIL_FROM || "SankaPage <onboarding@resend.dev>";
  const masa = labelMasa(b.masa);

  const html = `<!DOCTYPE html><html><body style="margin:0;background:#f5f6f4;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0f0d">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
  <div style="background:#fff;border:1px solid rgba(10,15,13,.08);border-radius:20px;padding:28px">
    <p style="margin:0 0 6px;font-size:16px">Halo <b>${escapeHtml(nama)}</b> 👋</p>
    <p style="margin:0 0 20px;font-size:15px;color:#5b6b63">Terima kasih sudah membeli <b>SankaPage</b> 🎉</p>

    <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:16px;padding:20px;text-align:center">
      <div style="font-size:12px;font-weight:700;letter-spacing:1px;color:#047857">KODE AKSES ANDA</div>
      <div style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:26px;font-weight:800;letter-spacing:3px;color:#065f46;margin:8px 0">${escapeHtml(kode)}</div>
      <div style="font-size:13px;color:#047857">⏳ Masa aktif: <b>${escapeHtml(masa)}</b></div>
    </div>

    <p style="margin:22px 0 8px;font-weight:700;font-size:15px">Cara aktifkan (1 menit):</p>
    <ol style="margin:0;padding-left:20px;font-size:14.5px;color:#3f4a44;line-height:1.9">
      <li>Buka <a href="${appUrl}/masuk" style="color:#059669;font-weight:600">${appUrl}/masuk</a></li>
      <li>Tempel <b>Kode Akses</b> di atas</li>
      <li>Klik <b>Aktifkan Sekarang</b> — selesai!</li>
    </ol>

    <div style="text-align:center;margin:26px 0 6px">
      <a href="${appUrl}/masuk" style="display:inline-block;background:#059669;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:12px">Aktifkan Sekarang →</a>
    </div>

    <p style="margin:22px 0 0;font-size:13px;color:#7a857f;line-height:1.7">
      Simpan email ini baik-baik — kode hanya diberikan sekali.<br/>
      Ada kendala? Balas email ini, kami bantu.
    </p>
  </div>
  <p style="text-align:center;font-size:12px;color:#9aa5a0;margin:16px 0 0">© SankaPage — Landing page high-conversion tanpa koding</p>
</div></body></html>`;

  const text = `Halo ${nama}!

Terima kasih sudah membeli SankaPage.

KODE AKSES: ${kode}
Masa aktif: ${masa}

Cara aktifkan:
1. Buka ${appUrl}/masuk
2. Tempel kode di atas
3. Klik "Aktifkan Sekarang"

Simpan email ini baik-baik.`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [email],
        subject: `🔑 Kode Akses SankaPage Anda — ${kode}`,
        html, text,
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(
        {
          ok: false,
          pesan:
            ((data as { message?: string })?.message || `Gagal kirim (${r.status})`) +
            ` — pengirim: ${from}`,
        },
        { status: 502 }
      );
    }
    const id = (data as { id?: string })?.id ?? null;
    // Peringatkan bila masih memakai pengirim uji Resend (hanya bisa ke email
    // pemilik akun Resend). Ini penyebab paling umum "terkirim tapi tak sampai".
    const pakaiSandbox = from.includes("resend.dev");
    return NextResponse.json({
      ok: true,
      id,
      from,
      catatan: pakaiSandbox
        ? "PERINGATAN: MAIL_FROM belum diatur — memakai onboarding@resend.dev, hanya bisa mengirim ke email pemilik akun Resend. Set MAIL_FROM ke noreply@domain-anda lalu Redeploy."
        : null,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, pesan: e instanceof Error ? e.message : "Gagal menghubungi Resend" },
      { status: 502 }
    );
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
