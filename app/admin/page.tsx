"use client";
// app/admin/page.tsx — dashboard admin: kelola akses user (aktif/nonaktif).
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { listProfiles, setUserStatus, type Profile } from "@/lib/profile";

function fmt(iso: string) {
  try { return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return ""; }
}

export default function AdminPage() {
  const { configured, loading, isAdmin, user } = useAuth();
  const [rows, setRows] = useState<Profile[] | null>(null);
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(() => {
    listProfiles().then(setRows).catch((e) => setErr(e instanceof Error ? e.message : String(e)));
  }, []);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  async function toggle(p: Profile) {
    setBusyId(p.id);
    try {
      const next = p.status === "active" ? "inactive" : "active";
      await setUserStatus(p.id, next);
      setRows((r) => r?.map((x) => (x.id === p.id ? { ...x, status: next } : x)) ?? null);
    } catch (e) { alert("Gagal: " + (e instanceof Error ? e.message : String(e))); }
    finally { setBusyId(null); }
  }

  if (!configured) {
    return <Gate title="Admin belum aktif" msg="Supabase belum dikonfigurasi." />;
  }
  if (loading) return <div className="py-24 text-center text-gray-400">Memuat…</div>;
  if (!user) return <Gate title="Harus masuk" msg="Login sebagai admin untuk mengakses halaman ini." cta />;
  if (!isAdmin) return <Gate title="Akses ditolak" msg="Halaman ini khusus admin." />;

  const list = (rows ?? []).filter((p) => (p.email ?? "").toLowerCase().includes(q.trim().toLowerCase()));
  const aktif = (rows ?? []).filter((p) => p.status === "active").length;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Admin — Kelola Akses</h1>
      <p className="mt-1 text-gray-500">Aktifkan akun user setelah pembayaran diverifikasi.</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-black/[0.07] bg-white px-4 py-3 text-sm shadow-soft">
          <b className="text-ink">{rows?.length ?? 0}</b> total user · <b className="text-brand-600">{aktif}</b> aktif
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari email…"
          className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
        <button onClick={load} className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:border-brand-300">↻ Muat ulang</button>
      </div>

      {err && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{err}</p>}

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-black/5 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
            <tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Daftar</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Aksi</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-black/[0.04] last:border-0">
                <td className="px-4 py-3">
                  <span className="font-semibold text-ink">{p.email ?? "—"}</span>
                  {p.role === "admin" && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">ADMIN</span>}
                </td>
                <td className="px-4 py-3 text-gray-500">{fmt(p.created_at)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.status === "active" ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.status === "active" ? "AKTIF" : "BELUM AKTIF"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.role === "admin" ? (
                    <span className="text-xs text-gray-400">—</span>
                  ) : (
                    <button disabled={busyId === p.id} onClick={() => toggle(p)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50 ${p.status === "active" ? "bg-gray-400 hover:bg-gray-500" : "bg-brand-600 hover:bg-brand-700"}`}>
                      {busyId === p.id ? "…" : p.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Belum ada user.</td></tr>}
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
      {cta && <Link href="/masuk" className="mt-5 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">Masuk →</Link>}
    </div>
  );
}
