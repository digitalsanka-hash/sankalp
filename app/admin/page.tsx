"use client";
// app/admin/page.tsx — Panel Admin: buat & kelola KODE AKSES pembeli.
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { adminList, adminCreate, adminSetStatus, type CodeRow } from "@/lib/access";

function fmt(iso: string | null) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return "—"; }
}

export default function AdminPage() {
  const { configured, loading, isAdmin, code } = useAuth();
  const [rows, setRows] = useState<CodeRow[] | null>(null);
  const [q, setQ] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");
  const [baru, setBaru] = useState<CodeRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!code) return;
    adminList(code).then(setRows).catch((e) => setErr(e instanceof Error ? e.message : String(e)));
  }, [code]);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  async function buat() {
    setBusy(true); setErr(null);
    try {
      const res = await adminCreate(code, jumlah, catatan);
      setBaru(res); setCatatan(""); load();
    } catch (e) { setErr(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }

  async function toggle(r: CodeRow) {
    try {
      await adminSetStatus(code, r.code, r.status === "active" ? "revoked" : "active");
      setRows((x) => x?.map((y) => (y.code === r.code ? { ...y, status: y.status === "active" ? "revoked" : "active" } : y)) ?? null);
    } catch (e) { alert(e instanceof Error ? e.message : String(e)); }
  }

  function salin(text: string, tag: string) {
    navigator.clipboard?.writeText(text);
    setCopied(tag); setTimeout(() => setCopied(null), 1600);
  }

  const pesanWA = (kode: string) =>
    `Halo! Terima kasih sudah membeli SankaLP 🎉\n\nBerikut KODE AKSES Anda:\n${kode}\n\nCara pakai:\n1. Buka https://sankalp-rho-gold.vercel.app/masuk\n2. Tempel kode di atas\n3. Klik "Aktifkan Sekarang"\n\nSelamat berkarya! 🚀`;

  if (!configured) return <Gate title="Panel admin belum aktif" msg="Supabase belum dikonfigurasi." />;
  if (loading) return <div className="py-24 text-center text-gray-400">Memuat…</div>;
  if (!isAdmin) return <Gate title="Khusus Admin" msg="Masukkan kode admin untuk membuka panel ini." cta />;

  const list = (rows ?? []).filter((r) =>
    `${r.code} ${r.catatan ?? ""} ${r.dipakai_oleh ?? ""}`.toLowerCase().includes(q.trim().toLowerCase()));
  const aktif = (rows ?? []).filter((r) => r.status === "active" && r.role === "user").length;
  const terpakai = (rows ?? []).filter((r) => r.redeemed_at).length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Panel Admin</h1>
      <p className="mt-1 text-gray-500">Buat kode akses untuk pembeli, lalu kirim lewat WhatsApp/email.</p>

      {/* statistik */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[["Total kode", rows?.length ?? 0], ["Aktif (user)", aktif], ["Sudah dipakai", terpakai]].map(([l, v]) => (
          <div key={l as string} className="rounded-2xl border border-black/[0.07] bg-white px-4 py-3 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{l}</div>
            <div className="font-display text-2xl font-extrabold text-ink">{v as number}</div>
          </div>
        ))}
      </div>

      {/* buat kode */}
      <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
        <h2 className="font-display text-lg font-extrabold text-ink">Buat Kode Baru</h2>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-gray-600">Jumlah</span>
            <input type="number" min={1} max={100} value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-24 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="min-w-[200px] flex-1 text-sm">
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
              <b className="text-sm text-ink">Kode baru dibuat ({baru.length})</b>
              <button onClick={() => salin(baru.map((b) => b.code).join("\n"), "all")}
                className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-brand-300">
                {copied === "all" ? "✓ Tersalin" : "Salin semua"}
              </button>
            </div>
            <div className="space-y-1.5">
              {baru.map((b) => (
                <div key={b.code} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-ink">{b.code}</span>
                  <button onClick={() => salin(b.code, b.code)}
                    className="rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:border-brand-300">
                    {copied === b.code ? "✓" : "Salin"}
                  </button>
                  <button onClick={() => salin(pesanWA(b.code), "wa" + b.code)}
                    className="rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                    {copied === "wa" + b.code ? "✓ Tersalin" : "💬 Salin pesan WA"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {err && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{err}</p>}

      {/* daftar kode */}
      <div className="mt-6 flex items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kode / nama pembeli…"
          className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400" />
        <button onClick={load} className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:border-brand-300">↻</button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-black/5 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
            <tr><th className="px-4 py-3">Kode</th><th className="px-4 py-3">Catatan</th><th className="px-4 py-3">Dipakai</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Aksi</th></tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.code} className="border-b border-black/[0.04] last:border-0">
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="font-mono font-bold text-ink">{r.code}</span>
                  {r.role === "admin" && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">ADMIN</span>}
                </td>
                <td className="px-4 py-3 text-gray-500">{r.catatan || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{r.redeemed_at ? `${fmt(r.redeemed_at)}${r.dipakai_oleh ? ` · ${r.dipakai_oleh}` : ""}` : "belum"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.status === "active" ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-500"}`}>
                    {r.status === "active" ? "AKTIF" : "DINONAKTIFKAN"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button onClick={() => salin(pesanWA(r.code), "w" + r.code)}
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
            {list.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">Belum ada kode. Buat di atas.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
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
