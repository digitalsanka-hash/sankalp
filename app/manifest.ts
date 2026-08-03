import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SankaPage — Landing Page Builder",
    short_name: "SankaPage",
    description:
      "Buat Landing Page jualan high-conversion tanpa koding.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faf9",
    theme_color: "#07120e",
    icons: [
      {
        src: "/branding/sankalp-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/branding/sankalp-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
