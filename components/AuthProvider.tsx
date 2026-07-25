"use client";
// components/AuthProvider.tsx — state login + profil (status aktif / admin).
// Tanpa Supabase (.env kosong) semua no-op & app terbuka (isActive=true).
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface Profile {
  id: string;
  email: string | null;
  status: "active" | "inactive";
  role: "user" | "admin";
}

interface AuthCtx {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  isAdmin: boolean;
  isActive: boolean; // boleh simpan/unduh
  refreshProfile: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  session: null, user: null, profile: null, loading: true, configured: false,
  isAdmin: false, isActive: true,
  refreshProfile: async () => {},
  signInWithEmail: async () => ({ error: "Auth belum aktif" }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string | undefined) => {
    if (!supabase || !uid) { setProfile(null); return; }
    const { data } = await supabase
      .from("profiles").select("id,email,status,role").eq("id", uid).maybeSingle();
    setProfile((data as Profile) ?? null);
  }, []);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await fetchProfile(data.session?.user?.id);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
      setSession(s);
      await fetchProfile(s?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, [fetchProfile]);

  async function signInWithEmail(email: string) {
    if (!supabase) return { error: "Supabase belum dikonfigurasi." };
    const redirect = typeof window !== "undefined" ? `${window.location.origin}/proyek` : undefined;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect } });
    return { error: error ? error.message : null };
  }
  async function signOut() { await supabase?.auth.signOut(); setProfile(null); }

  const configured = isSupabaseConfigured();
  const isAdmin = profile?.role === "admin";
  // Tanpa Supabase -> terbuka. Dengan Supabase -> harus aktif / admin.
  const isActive = !configured ? true : (profile?.status === "active" || isAdmin);

  return (
    <Ctx.Provider
      value={{
        session, user: session?.user ?? null, profile, loading, configured,
        isAdmin, isActive,
        refreshProfile: () => fetchProfile(session?.user?.id),
        signInWithEmail, signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
