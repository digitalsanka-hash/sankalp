// lib/theme.ts
// ------------------------------------------------------------------
// 50 preset TEMA visual premium. Tiap tema = palet + font (Google Fonts)
// + token non-editable + CSS khas opsional (neumorphic/glass/brutal/glow)
// yang di-inject ke template saat sintesis. Warna utama & aksen jadi
// DEFAULT field editor (tetap bisa diubah user).
// ------------------------------------------------------------------

export interface Theme {
  key: string;
  nama: string;
  mode: "light" | "dark";
  utama: string; // default warnaUtama (editable)
  aksen: string; // default warnaAksen (editable)
  bg: string;
  surface: string;
  tinta: string;
  lembut: string;
  kartu: string;
  radius: string;
  heroBg: string;
  fontLink: string;
  fontHead: string;
  fontBody: string;
  css?: string; // gaya khas tema (di-inject paling akhir, menang atas base)
}

const G = (families: string) =>
  `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?${families}&display=swap" rel="stylesheet">`;

// ---------- CSS khas (dipakai ulang beberapa tema) ----------
const NEU_LIGHT = (dark: string, lite = "#ffffff") => `
.card,.reason,.testi-card,.tier,.faq details{box-shadow:8px 8px 20px ${dark},-8px -8px 18px ${lite};border:none}
.btn{box-shadow:6px 6px 16px ${dark},-4px -4px 12px ${lite}}
.hero{border-radius:0 0 42px 42px}`;
const GLASS_DARK = `
.card,.reason,.testi-card,.tier,.faq details{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(12px)}
.price-box{backdrop-filter:blur(14px)}`;
const BRUTAL = `
.card,.reason,.testi-card,.tier,.faq details,.price-box{border:2px solid #111!important;box-shadow:6px 6px 0 #111;border-radius:12px}
.btn{border:2px solid #111;box-shadow:5px 5px 0 #111;border-radius:12px}
h2::after{width:64px;height:6px;border-radius:0}`;
const GLOW = (c: string) => `
.btn{box-shadow:0 0 26px ${c},0 12px 30px rgba(0,0,0,.35)}
.hero h1{text-shadow:0 0 34px ${c}}`;
const LINES = (c: string) => `
.card,.reason,.testi-card,.tier,.faq details{border:1px solid ${c};box-shadow:none}
h2{letter-spacing:0}`;

export const THEMES: Record<string, Theme> = {
  /* ================= 14 TEMA AWAL ================= */
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
    css: GLOW("rgba(163,230,53,.35)"),
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

  /* ============ FAMILI SOFT 3D / PASTEL (ref: kit 3D doux) ============ */
  zen: {
    key: "zen", nama: "Zen Soft 3D", mode: "light",
    utama: "#6f8f7d", aksen: "#d98e6f",
    bg: "#f3efe6", surface: "#ece6d9", tinta: "#3d4038", lembut: "#8b8878", kartu: "#f7f3ea", radius: "26px",
    heroBg: "linear-gradient(160deg,#a9c0b2,#6f8f7d)",
    fontLink: G("family=Quicksand:wght@500;700&family=Karla:wght@400;700"), fontHead: "'Quicksand',sans-serif", fontBody: "'Karla',sans-serif",
    css: NEU_LIGHT("rgba(151,142,120,.4)"),
  },
  cloud: {
    key: "cloud", nama: "Cloud Pastel", mode: "light",
    utama: "#7c9fd8", aksen: "#f09bb0",
    bg: "#f4f7fc", surface: "#e9eef8", tinta: "#3a4356", lembut: "#8d97ab", kartu: "#fdfeff", radius: "24px",
    heroBg: "linear-gradient(160deg,#a9c3ee,#7c9fd8)",
    fontLink: G("family=Baloo+2:wght@500;700&family=Nunito+Sans:wght@400;700"), fontHead: "'Baloo 2',sans-serif", fontBody: "'Nunito Sans',sans-serif",
    css: NEU_LIGHT("rgba(147,163,196,.4)"),
  },
  sakura: {
    key: "sakura", nama: "Sakura Blush", mode: "light",
    utama: "#d4667e", aksen: "#7ea87f",
    bg: "#fff6f7", surface: "#fdeef0", tinta: "#43303a", lembut: "#987f89", kartu: "#fff", radius: "22px",
    heroBg: "linear-gradient(160deg,#f2b8c6,#d4667e)",
    fontLink: G("family=Prata&family=Karla:wght@400;700"), fontHead: "'Prata',serif", fontBody: "'Karla',sans-serif",
  },
  lavender: {
    key: "lavender", nama: "Lavender Mist", mode: "light",
    utama: "#8b7cc8", aksen: "#e59bbb",
    bg: "#f8f6fd", surface: "#efecf9", tinta: "#3c3653", lembut: "#8e88a8", kartu: "#fff", radius: "22px",
    heroBg: "linear-gradient(160deg,#b6aae4,#8b7cc8)",
    fontLink: G("family=Josefin+Sans:wght@400;600;700&family=Karla:wght@400;700"), fontHead: "'Josefin Sans',sans-serif", fontBody: "'Karla',sans-serif",
    css: NEU_LIGHT("rgba(160,150,200,.35)"),
  },
  matcha: {
    key: "matcha", nama: "Matcha Cream", mode: "light",
    utama: "#7a9a4e", aksen: "#c98f4e",
    bg: "#f7f9ef", surface: "#eef2e0", tinta: "#333a26", lembut: "#7f876b", kartu: "#fdfef8", radius: "20px",
    heroBg: "linear-gradient(160deg,#a3bd77,#5d7a37)",
    fontLink: G("family=Outfit:wght@400;600;800"), fontHead: "'Outfit',sans-serif", fontBody: "'Outfit',sans-serif",
  },
  glacier: {
    key: "glacier", nama: "Glacier Ice", mode: "light",
    utama: "#4a7ba6", aksen: "#e0906e",
    bg: "#f4f8fa", surface: "#e8f0f4", tinta: "#28323b", lembut: "#7b8a95", kartu: "#fdfeff", radius: "18px",
    heroBg: "linear-gradient(160deg,#9dc3dd,#4a7ba6)",
    fontLink: G("family=Lexend:wght@400;600;800"), fontHead: "'Lexend',sans-serif", fontBody: "'Lexend',sans-serif",
  },

  /* ============ FAMILI ORGANIK / NATURE (ref: hijau-daun) ============ */
  rainforest: {
    key: "rainforest", nama: "Rainforest Luxe", mode: "dark",
    utama: "#d3a95c", aksen: "#7fb069",
    bg: "#0f231a", surface: "#143024", tinta: "#eef4ea", lembut: "#93a996", kartu: "#1b3a2b", radius: "20px",
    heroBg: "linear-gradient(160deg,#1d4a33,#0a1c12)",
    fontLink: G("family=Marcellus&family=Karla:wght@400;700"), fontHead: "'Marcellus',serif", fontBody: "'Karla',sans-serif",
    css: LINES("rgba(211,169,92,.25)"),
  },
  terra: {
    key: "terra", nama: "Terracotta Craft", mode: "light",
    utama: "#b3592e", aksen: "#3f6b4f",
    bg: "#f8f0e7", surface: "#f1e5d6", tinta: "#3a2a1f", lembut: "#8a7462", kartu: "#fbf6ee", radius: "16px",
    heroBg: "linear-gradient(160deg,#c96f42,#8a3e1d)",
    fontLink: G("family=Bitter:wght@500;700;800&family=Karla:wght@400;700"), fontHead: "'Bitter',serif", fontBody: "'Karla',sans-serif",
  },
  olive: {
    key: "olive", nama: "Olive Editorial", mode: "light",
    utama: "#5a6b3b", aksen: "#c77e4a",
    bg: "#f5f3ea", surface: "#ebe8da", tinta: "#2e3122", lembut: "#7d7f68", kartu: "#faf9f1", radius: "12px",
    heroBg: "linear-gradient(160deg,#75894e,#414f26)",
    fontLink: G("family=Spectral:wght@500;700;800&family=Work+Sans:wght@400;600"), fontHead: "'Spectral',serif", fontBody: "'Work Sans',sans-serif",
  },
  desert: {
    key: "desert", nama: "Desert Dune", mode: "light",
    utama: "#a8683b", aksen: "#2f6f6a",
    bg: "#faf3e7", surface: "#f3e8d3", tinta: "#3b2c1c", lembut: "#8f7c64", kartu: "#fdf8ee", radius: "18px",
    heroBg: "linear-gradient(160deg,#d19a63,#8f5427)",
    fontLink: G("family=Epilogue:wght@400;600;800"), fontHead: "'Epilogue',sans-serif", fontBody: "'Epilogue',sans-serif",
  },
  moss: {
    key: "moss", nama: "Moss & Stone", mode: "dark",
    utama: "#9cb380", aksen: "#d9a05b",
    bg: "#171c14", surface: "#20281b", tinta: "#eef1e6", lembut: "#9aa48c", kartu: "#242e1f", radius: "18px",
    heroBg: "linear-gradient(160deg,#3a4a2c,#141a0f)",
    fontLink: G("family=Hanken+Grotesk:wght@400;600;800"), fontHead: "'Hanken Grotesk',sans-serif", fontBody: "'Hanken Grotesk',sans-serif",
  },

  /* ============ FAMILI FANTASY / GLASS (ref: ungu-pink) ============ */
  fantasia: {
    key: "fantasia", nama: "Fantasia Glass", mode: "dark",
    utama: "#b48bf2", aksen: "#f26ba8",
    bg: "#171231", surface: "#1f1841", tinta: "#f2edff", lembut: "#a79cc9", kartu: "#251d4d", radius: "24px",
    heroBg: "radial-gradient(120% 90% at 50% 0,#5b3fa8,transparent 62%),#171231",
    fontLink: G("family=Syne:wght@500;700;800&family=Karla:wght@400;700"), fontHead: "'Syne',sans-serif", fontBody: "'Karla',sans-serif",
    css: GLASS_DARK,
  },
  aurora: {
    key: "aurora", nama: "Aurora Borealis", mode: "dark",
    utama: "#5eead4", aksen: "#c084fc",
    bg: "#0a1220", surface: "#101b2e", tinta: "#e9f6f4", lembut: "#8ba3ad", kartu: "#132238", radius: "20px",
    heroBg: "radial-gradient(120% 90% at 30% 0,#0d9488,transparent 55%),radial-gradient(120% 90% at 80% 10%,#7c3aed,transparent 55%),#0a1220",
    fontLink: G("family=Albert+Sans:wght@400;600;800"), fontHead: "'Albert Sans',sans-serif", fontBody: "'Albert Sans',sans-serif",
    css: GLASS_DARK,
  },
  nebula: {
    key: "nebula", nama: "Nebula Space", mode: "dark",
    utama: "#818cf8", aksen: "#fb7185",
    bg: "#0b0d1c", surface: "#12152b", tinta: "#eceefb", lembut: "#8e93b4", kartu: "#171b36", radius: "18px",
    heroBg: "radial-gradient(100% 80% at 70% 0,#4338ca,transparent 60%),radial-gradient(80% 60% at 20% 20%,#9d174d,transparent 55%),#0b0d1c",
    fontLink: G("family=Urbanist:wght@400;600;800"), fontHead: "'Urbanist',sans-serif", fontBody: "'Urbanist',sans-serif",
    css: GLOW("rgba(129,140,248,.3)"),
  },
  hologram: {
    key: "hologram", nama: "Hologram Iridescent", mode: "light",
    utama: "#7b6cf6", aksen: "#2dd4bf",
    bg: "#f6f6fd", surface: "#eef0fb", tinta: "#26243d", lembut: "#7d7d9c", kartu: "#ffffff", radius: "22px",
    heroBg: "linear-gradient(130deg,#a5b4fc,#f0abfc 40%,#99f6e4 80%)",
    fontLink: G("family=Figtree:wght@400;600;800"), fontHead: "'Figtree',sans-serif", fontBody: "'Figtree',sans-serif",
  },

  /* ============ FAMILI DARK LUXE / 3D (ref: neomorphic & lampu) ============ */
  obsidianluxe: {
    key: "obsidianluxe", nama: "Obsidian Luxe", mode: "dark",
    utama: "#e8c9a0", aksen: "#e88fae",
    bg: "#101014", surface: "#17171d", tinta: "#f5f1ea", lembut: "#9d99a3", kartu: "#1c1c24", radius: "22px",
    heroBg: "radial-gradient(110% 80% at 50% 0,#3a2f3f,transparent 60%),#101014",
    fontLink: G("family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Manrope:wght@400;600;800"), fontHead: "'Bodoni Moda',serif", fontBody: "'Manrope',sans-serif",
    css: LINES("rgba(232,201,160,.18)"),
  },
  noir: {
    key: "noir", nama: "Noir Statement", mode: "dark",
    utama: "#f5f5f5", aksen: "#ef4444",
    bg: "#0a0a0a", surface: "#141414", tinta: "#f7f7f7", lembut: "#9a9a9a", kartu: "#191919", radius: "8px",
    heroBg: "linear-gradient(160deg,#1c1c1c,#000)",
    fontLink: G("family=Archivo:wght@500;700;900&family=Inter:wght@400;600"), fontHead: "'Archivo',sans-serif", fontBody: "'Inter',sans-serif",
  },
  velvet: {
    key: "velvet", nama: "Velvet Bordeaux", mode: "dark",
    utama: "#e3b04b", aksen: "#e35d7c",
    bg: "#1d0d14", surface: "#28131c", tinta: "#f8eef1", lembut: "#b193a0", kartu: "#301722", radius: "18px",
    heroBg: "linear-gradient(160deg,#4e1a2c,#170a10)",
    fontLink: G("family=Gloock&family=Manrope:wght@400;600;800"), fontHead: "'Gloock',serif", fontBody: "'Manrope',sans-serif",
  },
  navybrass: {
    key: "navybrass", nama: "Navy & Brass", mode: "dark",
    utama: "#d9b26a", aksen: "#3fa7d6",
    bg: "#0d1526", surface: "#13203a", tinta: "#eef2f9", lembut: "#8d9ab3", kartu: "#182642", radius: "14px",
    heroBg: "linear-gradient(160deg,#1b2f55,#0a1122)",
    fontLink: G("family=IBM+Plex+Serif:wght@500;700&family=IBM+Plex+Sans:wght@400;600"), fontHead: "'IBM Plex Serif',serif", fontBody: "'IBM Plex Sans',sans-serif",
  },
  carbon: {
    key: "carbon", nama: "Carbon Lime", mode: "dark",
    utama: "#a3e635", aksen: "#a3e635",
    bg: "#111315", surface: "#191c1f", tinta: "#f2f5f0", lembut: "#9aa39b", kartu: "#1e2226", radius: "12px",
    heroBg: "linear-gradient(160deg,#22272b,#0d0f10)",
    fontLink: G("family=Chivo:wght@400;700;900"), fontHead: "'Chivo',sans-serif", fontBody: "'Chivo',sans-serif",
    css: GLOW("rgba(163,230,53,.28)"),
  },

  /* ============ FAMILI RETRO / POP ============ */
  retro70: {
    key: "retro70", nama: "Retro 70s", mode: "light",
    utama: "#b5451b", aksen: "#d9a404",
    bg: "#f7ecd9", surface: "#f0e1c5", tinta: "#3d2b16", lembut: "#8a744f", kartu: "#fbf3e1", radius: "22px",
    heroBg: "linear-gradient(160deg,#d9a404,#b5451b)",
    fontLink: G("family=Abril+Fatface&family=Karla:wght@400;700"), fontHead: "'Abril Fatface',serif", fontBody: "'Karla',sans-serif",
  },
  memphis: {
    key: "memphis", nama: "Memphis Fun", mode: "light",
    utama: "#5b46f6", aksen: "#ffb703",
    bg: "#fffdf5", surface: "#fdf3dd", tinta: "#241f3d", lembut: "#6d688a", kartu: "#fff", radius: "24px",
    heroBg: "linear-gradient(140deg,#5b46f6,#ef476f 70%)",
    fontLink: G("family=Baloo+2:wght@600;800&family=Rubik:wght@400;600"), fontHead: "'Baloo 2',sans-serif", fontBody: "'Rubik',sans-serif",
    css: `.card,.reason,.testi-card,.tier{border:2px solid #241f3d;box-shadow:5px 5px 0 #241f3d}`,
  },
  vaporwave: {
    key: "vaporwave", nama: "Vaporwave", mode: "dark",
    utama: "#ff71ce", aksen: "#01cdfe",
    bg: "#160a2b", surface: "#1f1039", tinta: "#f7ecff", lembut: "#ab93cf", kartu: "#291548", radius: "16px",
    heroBg: "linear-gradient(160deg,#7b2ff7,#ff71ce)",
    fontLink: G("family=Unbounded:wght@500;700&family=Karla:wght@400;700"), fontHead: "'Unbounded',sans-serif", fontBody: "'Karla',sans-serif",
    css: GLOW("rgba(1,205,254,.3)"),
  },
  popcandy: {
    key: "popcandy", nama: "Pop Candy", mode: "light",
    utama: "#f43f8e", aksen: "#7c3aed",
    bg: "#fff", surface: "#fff0f7", tinta: "#331528", lembut: "#8a6379", kartu: "#ffe4f0", radius: "26px",
    heroBg: "linear-gradient(140deg,#fb7185,#f43f8e 55%,#a855f7)",
    fontLink: G("family=Paytone+One&family=Nunito+Sans:wght@400;700"), fontHead: "'Paytone One',sans-serif", fontBody: "'Nunito Sans',sans-serif",
  },
  arcade: {
    key: "arcade", nama: "Arcade Night", mode: "dark",
    utama: "#22d3ee", aksen: "#f43f5e",
    bg: "#0d0d17", surface: "#14142a", tinta: "#eefbff", lembut: "#8b95b5", kartu: "#1a1a33", radius: "12px",
    heroBg: "radial-gradient(100% 80% at 50% 0,#312e81,transparent 60%),#0d0d17",
    fontLink: G("family=Righteous&family=Rubik:wght@400;600"), fontHead: "'Righteous',sans-serif", fontBody: "'Rubik',sans-serif",
    css: GLOW("rgba(34,211,238,.3)"),
  },

  /* ============ FAMILI EDITORIAL / SERIF ============ */
  paper: {
    key: "paper", nama: "Paper Press", mode: "light",
    utama: "#1c1d1f", aksen: "#c0392b",
    bg: "#f8f7f2", surface: "#efeee6", tinta: "#1c1d1f", lembut: "#6d6e66", kartu: "#fffef8", radius: "6px",
    heroBg: "linear-gradient(160deg,#2b2c2e,#151517)",
    fontLink: G("family=Crimson+Pro:wght@500;700;800&family=Inter:wght@400;600"), fontHead: "'Crimson Pro',serif", fontBody: "'Inter',sans-serif",
    css: LINES("rgba(28,29,31,.16)"),
  },
  magazine: {
    key: "magazine", nama: "Magazine Bold", mode: "light",
    utama: "#111111", aksen: "#fde047",
    bg: "#ffffff", surface: "#f4f4f4", tinta: "#111111", lembut: "#666", kartu: "#fafafa", radius: "4px",
    heroBg: "#111111",
    fontLink: G("family=Archivo:wght@600;800;900&family=Inter:wght@400;600"), fontHead: "'Archivo',sans-serif", fontBody: "'Inter',sans-serif",
    css: `.btn{color:#111!important}` ,
  },
  ivory: {
    key: "ivory", nama: "Ivory Couture", mode: "light",
    utama: "#8c7851", aksen: "#b08d57",
    bg: "#faf8f3", surface: "#f2eee4", tinta: "#2e2a22", lembut: "#847c6b", kartu: "#fefdf9", radius: "10px",
    heroBg: "linear-gradient(160deg,#5c5343,#2b2620)",
    fontLink: G("family=Marcellus&family=Jost:wght@400;500;600"), fontHead: "'Marcellus',serif", fontBody: "'Jost',sans-serif",
    css: LINES("rgba(140,120,81,.25)"),
  },

  /* ============ FAMILI BRUTAL / UTILITY ============ */
  brutal: {
    key: "brutal", nama: "Neo Brutalist", mode: "light",
    utama: "#111111", aksen: "#3b82f6",
    bg: "#f5f5f0", surface: "#ececdf", tinta: "#111", lembut: "#555", kartu: "#ffffff", radius: "12px",
    heroBg: "#3b82f6",
    fontLink: G("family=Archivo:wght@500;700;900&family=Space+Mono:wght@400;700"), fontHead: "'Archivo',sans-serif", fontBody: "'Space Mono',monospace",
    css: BRUTAL,
  },
  industrial: {
    key: "industrial", nama: "Industrial Safety", mode: "light",
    utama: "#26272b", aksen: "#f97316",
    bg: "#eeeeef", surface: "#e2e3e5", tinta: "#1c1d20", lembut: "#63656b", kartu: "#f8f8f9", radius: "8px",
    heroBg: "repeating-linear-gradient(45deg,#26272b,#26272b 26px,#3a3b40 26px,#3a3b40 52px)",
    fontLink: G("family=Chivo:wght@400;700;900"), fontHead: "'Chivo',sans-serif", fontBody: "'Chivo',sans-serif",
  },

  /* ============ FAMILI MODERN WARNA ============ */
  royal: {
    key: "royal", nama: "Royal Indigo", mode: "light",
    utama: "#3730a3", aksen: "#f59e0b",
    bg: "#fbfbff", surface: "#f0f1fd", tinta: "#191a3d", lembut: "#61638a", kartu: "#e9eafc", radius: "16px",
    heroBg: "linear-gradient(160deg,#4338ca,#1e1b4b)",
    fontLink: G("family=Schibsted+Grotesk:wght@400;600;800"), fontHead: "'Schibsted Grotesk',sans-serif", fontBody: "'Schibsted Grotesk',sans-serif",
  },
  citrus: {
    key: "citrus", nama: "Citrus Energy", mode: "light",
    utama: "#65a30d", aksen: "#f97316",
    bg: "#fdfff5", surface: "#f3f9e4", tinta: "#232b12", lembut: "#6f7b58", kartu: "#eef7d8", radius: "20px",
    heroBg: "linear-gradient(140deg,#84cc16,#3f6212)",
    fontLink: G("family=Jost:wght@400;600;800"), fontHead: "'Jost',sans-serif", fontBody: "'Jost',sans-serif",
  },
  flamingo: {
    key: "flamingo", nama: "Flamingo Chic", mode: "light",
    utama: "#db2777", aksen: "#0f766e",
    bg: "#fff9fb", surface: "#fceef4", tinta: "#33121f", lembut: "#8a5c6e", kartu: "#fbe2ec", radius: "20px",
    heroBg: "linear-gradient(160deg,#ec4899,#9d174d)",
    fontLink: G("family=Gabarito:wght@500;700;900"), fontHead: "'Gabarito',sans-serif", fontBody: "'Gabarito',sans-serif",
  },
  cacao: {
    key: "cacao", nama: "Cacao Roast", mode: "light",
    utama: "#6b4226", aksen: "#c9803a",
    bg: "#f9f4ee", surface: "#f1e7db", tinta: "#33241a", lembut: "#82705f", kartu: "#fbf7f0", radius: "16px",
    heroBg: "linear-gradient(160deg,#7c4a2a,#3a1f10)",
    fontLink: G("family=Bitter:wght@500;700;800&family=Work+Sans:wght@400;600"), fontHead: "'Bitter',serif", fontBody: "'Work Sans',sans-serif",
  },
  emeraldnight: {
    key: "emeraldnight", nama: "Emerald Night", mode: "dark",
    utama: "#34d399", aksen: "#fbbf24",
    bg: "#07130e", surface: "#0c1d15", tinta: "#e9f7f0", lembut: "#87a496", kartu: "#11271c", radius: "18px",
    heroBg: "radial-gradient(110% 85% at 50% 0,#065f46,transparent 60%),#07130e",
    fontLink: G("family=Hanken+Grotesk:wght@400;600;800"), fontHead: "'Hanken Grotesk',sans-serif", fontBody: "'Hanken Grotesk',sans-serif",
    css: GLASS_DARK,
  },
  ruby: {
    key: "ruby", nama: "Ruby Passion", mode: "dark",
    utama: "#fb7185", aksen: "#fbbf24",
    bg: "#1c0a0e", surface: "#291016", tinta: "#fdeef1", lembut: "#b58f97", kartu: "#33141c", radius: "16px",
    heroBg: "linear-gradient(160deg,#9f1239,#3b0a18)",
    fontLink: G("family=Prata&family=Manrope:wght@400;600;800"), fontHead: "'Prata',serif", fontBody: "'Manrope',sans-serif",
  },
  denim: {
    key: "denim", nama: "Denim Casual", mode: "light",
    utama: "#1e5f8a", aksen: "#e07a3f",
    bg: "#f6f8fa", surface: "#e9eef3", tinta: "#1d2a35", lembut: "#64798a", kartu: "#fdfeff", radius: "14px",
    heroBg: "linear-gradient(160deg,#2d7bb0,#123a56)",
    fontLink: G("family=Rubik:wght@400;600;800"), fontHead: "'Rubik',sans-serif", fontBody: "'Rubik',sans-serif",
  },
  blush: {
    key: "blush", nama: "Blush Minimal", mode: "light",
    utama: "#c2748c", aksen: "#8c9f84",
    bg: "#fdf8f7", surface: "#f8edeb", tinta: "#3f3234", lembut: "#94807f", kartu: "#fffcfb", radius: "18px",
    heroBg: "linear-gradient(160deg,#dba2b2,#a55a74)",
    fontLink: G("family=Cormorant+Garamond:wght@500;700&family=Karla:wght@400;700"), fontHead: "'Cormorant Garamond',serif", fontBody: "'Karla',sans-serif",
  },
  mint: {
    key: "mint", nama: "Mint Fresh", mode: "light",
    utama: "#0d9488", aksen: "#f472b6",
    bg: "#f4fbf9", surface: "#e5f5f0", tinta: "#173733", lembut: "#5f807a", kartu: "#d9f0e8", radius: "22px",
    heroBg: "linear-gradient(160deg,#2dd4bf,#0f766e)",
    fontLink: G("family=Comfortaa:wght@500;700&family=Nunito+Sans:wght@400;700"), fontHead: "'Comfortaa',sans-serif", fontBody: "'Nunito Sans',sans-serif",
  },
  slate: {
    key: "slate", nama: "Slate Pro", mode: "light",
    utama: "#334155", aksen: "#0ea5e9",
    bg: "#f8fafc", surface: "#eef2f6", tinta: "#0f172a", lembut: "#64748b", kartu: "#ffffff", radius: "12px",
    heroBg: "linear-gradient(160deg,#334155,#0f172a)",
    fontLink: G("family=Familjen+Grotesk:wght@400;600;700"), fontHead: "'Familjen Grotesk',sans-serif", fontBody: "'Familjen Grotesk',sans-serif",
    css: LINES("rgba(51,65,85,.14)"),
  },
  honey: {
    key: "honey", nama: "Honey Amber", mode: "light",
    utama: "#b45309", aksen: "#78350f",
    bg: "#fffaf0", surface: "#fdf2dc", tinta: "#3d2c12", lembut: "#8b754f", kartu: "#fef6e4", radius: "20px",
    heroBg: "linear-gradient(160deg,#f59e0b,#92400e)",
    fontLink: G("family=Gabarito:wght@500;700;900"), fontHead: "'Gabarito',sans-serif", fontBody: "'Gabarito',sans-serif",
  },
  orchid: {
    key: "orchid", nama: "Orchid Premium", mode: "dark",
    utama: "#d8b4fe", aksen: "#f0abfc",
    bg: "#150f1e", surface: "#1e1629", tinta: "#f6f0fd", lembut: "#a795bd", kartu: "#251b33", radius: "20px",
    heroBg: "radial-gradient(110% 85% at 50% 0,#6b21a8,transparent 62%),#150f1e",
    fontLink: G("family=Sora:wght@400;600;800"), fontHead: "'Sora',sans-serif", fontBody: "'Sora',sans-serif",
    css: GLASS_DARK,
  },
  tangerine: {
    key: "tangerine", nama: "Tangerine Punch", mode: "light",
    utama: "#ea580c", aksen: "#0891b2",
    bg: "#fffbf7", surface: "#ffefe2", tinta: "#361a09", lembut: "#8c6a55", kartu: "#ffe9d6", radius: "24px",
    heroBg: "linear-gradient(140deg,#fb923c,#ea580c 60%,#c2410c)",
    fontLink: G("family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800"), fontHead: "'Bricolage Grotesque',sans-serif", fontBody: "'Bricolage Grotesque',sans-serif",
  },
};

export function getTheme(key: string): Theme {
  return THEMES[key] ?? THEMES.emerald;
}
