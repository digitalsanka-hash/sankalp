// lib/theme.ts
// ------------------------------------------------------------------
// Preset TEMA visual. Tiap tema = palet + font (Google Fonts) + token
// non-editable yang di-inject ke <style> base template saat sintesis.
// Warna utama & aksen menjadi DEFAULT field editor (tetap bisa diubah user).
// ------------------------------------------------------------------

export interface Theme {
  key: string;
  nama: string;
  mode: "light" | "dark";
  utama: string; // default warnaUtama (editable)
  aksen: string; // default warnaAksen (editable)
  // token non-editable (di-replace langsung ke html):
  bg: string;
  surface: string;
  tinta: string;
  lembut: string;
  kartu: string;
  radius: string;
  heroBg: string; // css background bagian hero
  fontLink: string; // <link> google fonts
  fontHead: string; // font-family judul
  fontBody: string; // font-family isi
}

const G = (families: string) =>
  `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?${families}&display=swap" rel="stylesheet">`;

export const THEMES: Record<string, Theme> = {
  emerald: {
    key: "emerald", nama: "Emerald Fresh", mode: "light",
    utama: "#0e9f6e", aksen: "#f59e0b",
    bg: "#ffffff", surface: "#f6f8f7", tinta: "#0f1b16", lembut: "#5b6b63", kartu: "#eef7f2", radius: "16px",
    heroBg: "linear-gradient(165deg,#0e9f6e,#063d2c)",
    fontLink: G("family=Plus+Jakarta+Sans:wght@400;600;800"), fontHead: "'Plus Jakarta Sans',sans-serif", fontBody: "'Plus Jakarta Sans',sans-serif",
  },
  midnight: {
    key: "midnight", nama: "Midnight Luxe", mode: "dark",
    utama: "#6366f1", aksen: "#22d3ee",
    bg: "#0b1020", surface: "#111834", tinta: "#eef1fb", lembut: "#8b93b0", kartu: "#141c3a", radius: "16px",
    heroBg: "radial-gradient(130% 100% at 50% 0,#3b3fb6,transparent 60%),#0b1020",
    fontLink: G("family=Sora:wght@400;600;800"), fontHead: "'Sora',sans-serif", fontBody: "'Sora',sans-serif",
  },
  sunset: {
    key: "sunset", nama: "Sunset Bold", mode: "light",
    utama: "#f43f5e", aksen: "#f97316",
    bg: "#fffaf7", surface: "#fff1ea", tinta: "#2a1512", lembut: "#7a5c53", kartu: "#ffe9df", radius: "18px",
    heroBg: "linear-gradient(160deg,#fb7185,#f97316)",
    fontLink: G("family=Poppins:wght@400;600;800"), fontHead: "'Poppins',sans-serif", fontBody: "'Poppins',sans-serif",
  },
  rose: {
    key: "rose", nama: "Rose Elegant", mode: "light",
    utama: "#be123c", aksen: "#d4a017",
    bg: "#fffdfb", surface: "#faf3ef", tinta: "#2b1d1f", lembut: "#7c6a68", kartu: "#f7e9e6", radius: "14px",
    heroBg: "linear-gradient(160deg,#9f1239,#3f0d1c)",
    fontLink: G("family=Playfair+Display:wght@600;800&family=Inter:wght@400;600"), fontHead: "'Playfair Display',serif", fontBody: "'Inter',sans-serif",
  },
  ocean: {
    key: "ocean", nama: "Ocean Trust", mode: "light",
    utama: "#0284c7", aksen: "#f59e0b",
    bg: "#ffffff", surface: "#f0f7fb", tinta: "#0c1a24", lembut: "#4f6472", kartu: "#e6f2f9", radius: "14px",
    heroBg: "linear-gradient(165deg,#0ea5e9,#0c4a6e)",
    fontLink: G("family=Inter:wght@400;600;800"), fontHead: "'Inter',sans-serif", fontBody: "'Inter',sans-serif",
  },
  violet: {
    key: "violet", nama: "Violet Gradient", mode: "dark",
    utama: "#a855f7", aksen: "#ec4899",
    bg: "#0f0a1e", surface: "#1a1230", tinta: "#f3eeff", lembut: "#a99bc4", kartu: "#1e1638", radius: "18px",
    heroBg: "radial-gradient(130% 100% at 50% 0,#7c3aed,transparent 62%),#0f0a1e",
    fontLink: G("family=Space+Grotesk:wght@400;600;700"), fontHead: "'Space Grotesk',sans-serif", fontBody: "'Space Grotesk',sans-serif",
  },
  cream: {
    key: "cream", nama: "Warm Cream", mode: "light",
    utama: "#b45309", aksen: "#16a34a",
    bg: "#fdfaf3", surface: "#f6efe1", tinta: "#2c241a", lembut: "#726a5a", kartu: "#f2e9d6", radius: "16px",
    heroBg: "linear-gradient(160deg,#d97706,#7c3f06)",
    fontLink: G("family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Nunito+Sans:wght@400;600;800"), fontHead: "'Fraunces',serif", fontBody: "'Nunito Sans',sans-serif",
  },
  neon: {
    key: "neon", nama: "Neon Cyber", mode: "dark",
    utama: "#22d3ee", aksen: "#a3e635",
    bg: "#07120f", surface: "#0d1c18", tinta: "#e6fff8", lembut: "#7fb3a6", kartu: "#0f231d", radius: "14px",
    heroBg: "radial-gradient(120% 100% at 50% 0,#0f766e,transparent 60%),#07120f",
    fontLink: G("family=Sora:wght@400;600;800"), fontHead: "'Sora',sans-serif", fontBody: "'Sora',sans-serif",
  },
  coral: {
    key: "coral", nama: "Coral Soft", mode: "light",
    utama: "#e11d48", aksen: "#0d9488",
    bg: "#fffbfa", surface: "#fdeef0", tinta: "#2a1a1d", lembut: "#7a6367", kartu: "#fbe3e7", radius: "18px",
    heroBg: "linear-gradient(160deg,#fb7185,#be123c)",
    fontLink: G("family=DM+Sans:wght@400;500;700"), fontHead: "'DM Sans',sans-serif", fontBody: "'DM Sans',sans-serif",
  },
  goldblack: {
    key: "goldblack", nama: "Gold & Black", mode: "dark",
    utama: "#d4af37", aksen: "#d4af37",
    bg: "#0c0c0d", surface: "#151517", tinta: "#f4f1e8", lembut: "#9c968a", kartu: "#191919", radius: "10px",
    heroBg: "linear-gradient(160deg,#1a1a1a,#000)",
    fontLink: G("family=Cormorant+Garamond:wght@500;700&family=Manrope:wght@400;600;800"), fontHead: "'Cormorant Garamond',serif", fontBody: "'Manrope',sans-serif",
  },
  sky: {
    key: "sky", nama: "Sky Minimal", mode: "light",
    utama: "#4f46e5", aksen: "#0ea5e9",
    bg: "#ffffff", surface: "#f5f6ff", tinta: "#101427", lembut: "#5a5f7a", kartu: "#eef0ff", radius: "14px",
    heroBg: "linear-gradient(165deg,#6366f1,#312e81)",
    fontLink: G("family=Inter:wght@400;600;800"), fontHead: "'Inter',sans-serif", fontBody: "'Inter',sans-serif",
  },
  berry: {
    key: "berry", nama: "Berry Pop", mode: "light",
    utama: "#c026d3", aksen: "#f59e0b",
    bg: "#fffbfe", surface: "#fbeefc", tinta: "#2a1229", lembut: "#7a5c78", kartu: "#f6dff7", radius: "20px",
    heroBg: "linear-gradient(160deg,#d946ef,#86198f)",
    fontLink: G("family=Poppins:wght@400;600;800"), fontHead: "'Poppins',sans-serif", fontBody: "'Poppins',sans-serif",
  },
  forest: {
    key: "forest", nama: "Forest Calm", mode: "light",
    utama: "#15803d", aksen: "#ca8a04",
    bg: "#fbfdf9", surface: "#eef4ea", tinta: "#16241a", lembut: "#5c6b5a", kartu: "#e2eede", radius: "16px",
    heroBg: "linear-gradient(160deg,#166534,#052e16)",
    fontLink: G("family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Nunito+Sans:wght@400;600;800"), fontHead: "'Fraunces',serif", fontBody: "'Nunito Sans',sans-serif",
  },
  sunrise: {
    key: "sunrise", nama: "Sunrise Warm", mode: "light",
    utama: "#ea580c", aksen: "#e11d48",
    bg: "#fffcf7", surface: "#fff2e6", tinta: "#2c1b10", lembut: "#7c6153", kartu: "#ffe6cc", radius: "18px",
    heroBg: "linear-gradient(160deg,#fb923c,#c2410c)",
    fontLink: G("family=Plus+Jakarta+Sans:wght@400;600;800"), fontHead: "'Plus Jakarta Sans',sans-serif", fontBody: "'Plus Jakarta Sans',sans-serif",
  },
};

export function getTheme(key: string): Theme {
  return THEMES[key] ?? THEMES.emerald;
}
