import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#053d2c",
        },
        ink: "#0a0f0d",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,15,13,.04), 0 8px 24px -12px rgba(10,15,13,.18)",
        lift: "0 12px 40px -12px rgba(10,15,13,.28)",
        glow: "0 8px 30px -6px rgba(16,185,129,.45)",
      },
      borderRadius: {
        "2xl": "1.1rem",
      },
    },
  },
  plugins: [],
};

export default config;
