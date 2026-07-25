/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  // Mode "export" (situs statis ke ./out) HANYA saat build statis:
  //   NEXT_EXPORT=1 next build
  // `npm run dev` biasa TIDAK memakai export -> editor dinamis jalan mulus.
  ...(isExport ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
