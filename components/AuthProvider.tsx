"use client";
// components/AuthProvider.tsx — status AKSES berbasis KODE (gaya FinPlan).
// Tanpa email/password. Kode tersimpan di browser & diverifikasi ke Supabase.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { savedCode, saveCode, clearCode, verify, redeem } from "@/lib/access";

interface AccessCtx {
  code: string;
  role: "user" | "admin" | null;
  loading: boolean;
  configured: boolean;
  isAdmin: boolean;
  isActive: boolean; // boleh simpan & unduh
  activate: (code: string, label?: string) => Promise<{ ok: boolean; pesan: string }>;
  logout: () => void;
}

const Ctx = createContext<AccessCtx>({
  code: "", role: null, loading: true, configured: false,
  isAdmin: false, isActive: true,
  activate: async () => ({ ok: false, pesan: "Belum aktif" }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  // cek kode tersimpan saat app dibuka
  useEffect(() => {
    const c = savedCode();
    if (!c || !configured) { setLoading(false); return; }
    setCode(c);
    verify(c)
      .then((r) => { if (r.ok && r.role) setRole(r.role); else { clearCode(); setCode(""); } })
      .finally(() => setLoading(false));
  }, [configured]);

  const activate = useCallback(async (input: string, label?: string) => {
    const res = await redeem(input, label);
    if (res.ok && res.role) {
      saveCode(input);
      setCode(input.trim().toUpperCase());
      setRole(res.role);
    }
    return { ok: res.ok, pesan: res.pesan };
  }, []);

  const logout = useCallback(() => { clearCode(); setCode(""); setRole(null); }, []);

  const isAdmin = role === "admin";
  // Tanpa Supabase -> terbuka (mode lokal). Dengan Supabase -> butuh kode valid.
  const isActive = !configured ? true : role !== null;

  return (
    <Ctx.Provider value={{ code, role, loading, configured, isAdmin, isActive, activate, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
