"use client";
// components/AuthProvider.tsx — state login (Supabase Auth, magic link email).
// Kalau Supabase belum dikonfigurasi (.env kosong), semua no-op & app tetap
// jalan pakai penyimpanan lokal.
import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthCtx {
  session: Session | null;
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  session: null, user: null, loading: true, configured: false,
  signInWithEmail: async () => ({ error: "Auth belum aktif" }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithEmail(email: string) {
    if (!supabase) return { error: "Supabase belum dikonfigurasi." };
    const redirect = typeof window !== "undefined" ? `${window.location.origin}/proyek` : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirect },
    });
    return { error: error ? error.message : null };
  }

  async function signOut() {
    await supabase?.auth.signOut();
  }

  return (
    <Ctx.Provider
      value={{
        session, user: session?.user ?? null, loading,
        configured: isSupabaseConfigured(), signInWithEmail, signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
