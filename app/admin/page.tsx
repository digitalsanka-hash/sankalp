"use client";
// app/admin/page.tsx — Panel Admin: tab Kode & Email (kirim kode ke pembeli).
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import {
  adminList, adminCreate, adminSetStatus, sendCodeEmail,
  MASA_OPSI, labelMasa, type CodeRow,
} from "@/lib/access";

const APP_URL = "https://www.sankapage.com";

function fmt(iso: string | null | undefined) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return "—"; }
}

export default function AdminPage() {
  const { configured, loading, isAdmin, code } = useAuth();
  const [tab, setTab] = useState<"kode" | "email">("kode");
  const [rows, setRows] = useState<CodeRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!code) return;
    adminList(code).then(setRows).catch((e) => setErr(e instanceof Error ? e.message : String(e)));
  }, [code]);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  if (!configured) return <Gate title="Panel admin belum aktif" msg="Supabase belum dikonfigurasi." />;
  if (loading) return <div className="py-24 text-center text-gray-400">Memuat…</div>;
  if (!isAdmin) return <Gate title="Khusus Admin" msg="Masukkan kode admin untuk membuka panel ini." cta />;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Panel Admin</h1>
      <p className="mt-1 text-gray-500">Buat kode akses & kirim ke pembeli.</p>

      {/* Tab */}
      <div className="mt-6 inline-flex rounded-2xl border border-black/10 bg-white p-1 shadow-soft">
        {([["kode", "🔑 Kode"], ["email", "✉️ Email"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${tab === k ? "bg-ink text-white shadow-soft" : "text-gray-500 hover:text-ink"}`}>
            {l}
          </button>
        ))}
      </div>

      {err && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{err}</p>}

      <div className="mt-5">
        {tab === "kode"
          ? <TabKode code={code} rows={rows} reload={load} setErr={setErr} />
          : <TabEmail code={code} rows={rows} reload={load} />}
      </div>
    </div>
  );
}

/* ============================ TAB: KODE ============================ */
function TabKode({ code, rows, reload, setErr }: {
  code: string; rows: CodeRow[] | null; reload: () => void; setErr: (s: string | null) => void;
}) {
  const [q, setQ] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");
  const [masa, setMasa] = useState<string>("lifetime");
  const [baru, setBaru] = useState<CodeRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function salin(text: string, tag: string) {
    navigator.clipboard?.writeText(text);
    setCopied(tag); setTimeout(() => setCopied(null), 1600);
  }
  const pesanWA = (kode: string, m?: string | null) =>
    `Halo! Terima kasih sudah membeli SankaPage 🎉\n\n🔑 KODE AKSES: ${kode}\n⏳ Masa aktif: ${labelMasa(m)}\n\nCara aktifkan (1 menit):\n1. Buka ${APP_URL}/masuk\n2. Tempel kode di atas\n3. Klik "Aktifkan Sekarang"\n\nSelamat berkarya! 🚀`;

  async function buat() {
    setBusy(true); setErr(null);
    try { const res = await adminCreate(code, jumlah, catatan, masa); setBaru(res); setCatatan(""); reload(); }
    catch (e) { setErr(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }
  async function toggle(r: CodeRow) {
    try {
      await adminSetStatus(code, r.code, r.status === "active" ? "revoked" : "active");
      reload();
    } catch (e) { alert(e instanceof Error ? e.message : String(e)); }
  }

  const list = (rows ?? []).filter((r) =>
    `${r.code} ${r.catatan ?? ""} ${r.dipakai_oleh ?? ""} ${r.email_pembeli ?? ""}`
      .toLowerCase().includes(q.trim().toLowerCase()));
  const aktif = (rows ?? []).filter((r) => r.status === "active" && r.role === "user").length;
  const terpakai = (rows ?? []).filter((r) => r.redeemed_at).length;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        {[["Total kode", rows?.length ?? 0], ["Aktif (user)", aktif], ["Sudah dipakai", terpakai]].map(([l, v]) => (
          <div key={l as string} className="rounded-2xl border border-black/[0.07] bg-white px-4 py-3 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{l}</div>
            <div className="font-display text-2xl font-extrabold text-ink">{v as number}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
        <h2 className="font-display text-lg font-extrabold text-ink">Buat Kode Baru</h2>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-gray-600">Jumlah</span>
            <input type="number" min={1} max={100} value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-24 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-gray-600">Masa aktif</span>
            <select value={masa} onChange={(e) => setMasa(e.target.value)}
              className="cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400">
              {MASA_OPSI.map((m) => <option key={m.v} value={m.v}>{m.label}</option>)}
            </select>
          </label>
          <label className="min-w-[180px] flex-1 text-sm">
            <span className="mb-1 block font-semibold text-gray-600">Catatan (nama/WA pembeli)</span>
            <input value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="mis. Budi - 0812xxxx"
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand-400" />
          </label>
          <button onClick={buat} disabled={busy}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
            {busy ? "Membuat…" : "+ Buat Kode"}
          </button>
        </div>

        {baru.length > 0 && (
          <div className="mt-4 rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <b className="text-sm text-ink">Kode baru ({baru.length})</b>
              <button onClick={() => salin(baru.map((b) => b.code).join("\n"), "all")}
                className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-brand-300">
                {copied === "all" ? "✓ Tersalin" : "Salin semua"}
              </button>
            </div>
            <div className="space-y-1.5">
              {baru.map((b) => (
                <div key={b.code} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-ink">{b.code}</span>
                  <span className="text-xs font-semibold text-gray-400">{labelMasa(b.masa_aktif)}</span>
                  <button onClick={() => salin(b.code, b.code)}
                    className="rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:border-brand-300">
                    {copied === b.code ? "✓" : "Salin"}
                  </button>
                  <button onClick={() => salin(pesanWA(b.code, b.masa_aktif), "wa" + b.code)}
                    className="rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                    {copied === "wa" + b.code ? "✓ Tersalin" : "💬 Pesan WA"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kode / nama / email…"
          className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400" />
        <button onClick={reload} className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:border-brand-300">↻</button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-black/5 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
            <tr>
              <th className="px-4 py-3">Kode</th><th className="px-4 py-3">Masa</th>
              <th className="px-4 py-3">Catatan / Email</th><th className="px-4 py-3">Dipakai</th>
              <th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.code} className="border-b border-black/[0.04] last:border-0">
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="font-mono font-bold text-ink">{r.code}</span>
                  {r.role === "admin" && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">ADMIN</span>}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">{labelMasa(r.masa_aktif)}</td>
                <td className="px-4 py-3 text-gray-500">
                  {r.catatan || "—"}
                  {r.email_pembeli && <span className="block text-xs text-brand-600">✉️ {r.email_pembeli}</span>}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">{r.redeemed_at ? fmt(r.redeemed_at) : "belum"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.status === "active" ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-500"}`}>
                    {r.status === "active" ? "AKTIF" : "NONAKTIF"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button onClick={() => salin(pesanWA(r.code, r.masa_aktif), "w" + r.code)}
                    className="mr-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:border-brand-300">
                    {copied === "w" + r.code ? "✓" : "💬"}
                  </button>
                  {r.role !== "admin" && (
                    <button onClick={() => toggle(r)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold text-white ${r.status === "active" ? "bg-gray-400 hover:bg-gray-500" : "bg-brand-600 hover:bg-brand-700"}`}>
                      {r.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">Belum ada kode.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ============================ TAB: EMAIL ============================ */
function TabEmail({ code, rows, reload }: { code: string; rows: CodeRow[] | null; reload: () => void }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kode, setKode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // kode siap kirim: user, aktif, belum ditebus
  const tersedia = useMemo(
    () => (rows ?? []).filter((r) => r.role === "user" && r.status === "active" && !r.redeemed_at),
    [rows]
  );
  useEffect(() => { if (!kode && tersedia.length) setKode(tersedia[0].code); }, [tersedia, kode]);

  const dipilih = tersedia.find((r) => r.code === kode) ?? (rows ?? []).find((r) => r.code === kode);
  const masa = dipilih?.masa_aktif ?? "lifetime";

  const preview = `Halo ${nama || "[nama pembeli]"} 👋 Terima kasih sudah membeli SankaPage 🎉

Ini akses kamu:

🔑 Kode Akses: ${kode || "—"}
⏳ Masa aktif: ${labelMasa(masa)}
🌐 Aplikasi: ${APP_URL}

Cara aktifkan (1 menit):
1. Buka ${APP_URL}/masuk
2. Tempel Kode Akses di atas
3. Klik "Aktifkan Sekarang" — selesai!

Simpan email ini baik-baik. Selamat berkarya! 🚀`;

  async function kirim() {
    if (!email.trim() || !kode) { setMsg({ ok: false, t: "Email & kode wajib diisi." }); return; }
    setBusy(true); setMsg(null);
    const res = await sendCodeEmail({ adminCode: code, nama, email: email.trim(), kode, masa: masa ?? "lifetime" });
    setBusy(false);
    if (res.ok) { setMsg({ ok: true, t: `Email terkirim ke ${email}` }); setEmail(""); setNama(""); reload(); }
    else setMsg({ ok: false, t: res.pesan ?? "Gagal mengirim." });
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">Kirim kode + cara aktivasi ke email pembeli. Isi nama, email, pilih kode, cek pratinjau, lalu kirim.</p>

      <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1.5 block font-semibold text-gray-600">Nama pembeli</span>
            <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="mis. Reza Asqalani"
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-semibold text-gray-600">Email pembeli</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mis. reza@gmail.com"
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
          </label>
        </div>

        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block font-semibold text-gray-600">Pilih kode ({tersedia.length} tersedia)</span>
          <select value={kode} onChange={(e) => setKode(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-black/10 bg-white px-4 py-2.5 font-mono text-sm outline-none focus:border-brand-400">
            {tersedia.length === 0 && <option value="">— belum ada kode, buat di tab Kode —</option>}
            {tersedia.map((r) => (
              <option key={r.code} value={r.code}>{r.code} — {labelMasa(r.masa_aktif)}{r.catatan ? ` · ${r.catatan}` : ""}</option>
            ))}
          </select>
        </label>

        <button onClick={kirim} disabled={busy || !kode}
          className="mt-5 w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto sm:px-8">
          {busy ? "Mengirim…" : "✉️ Kirim Email Sekarang"}
        </button>

        {msg && (
          <p className={`mt-3 rounded-xl p-3 text-sm ${msg.ok ? "bg-brand-50 text-brand-700" : "bg-rose-50 text-rose-600"}`}>
            {msg.ok ? "✅ " : "⚠️ "}{msg.t}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-ink">Pratinjau Email</h3>
          <button onClick={() => { navigator.clipboard?.writeText(preview); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
            className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-brand-300">
            {copied ? "✓ Tersalin" : "⧉ Salin teks"}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-black/[0.07] bg-white p-5 text-[13.5px] leading-relaxed text-gray-700 shadow-soft">{preview}</pre>
      </div>
    </>
  );
}

function Gate({ title, msg, cta }: { title: string; msg: string; cta?: boolean }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold text-ink">{title}</h1>
      <p className="mt-2 text-gray-500">{msg}</p>
      {cta && <Link href="/masuk" className="mt-5 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">Masukkan Kode →</Link>}
    </div>
  );
}
