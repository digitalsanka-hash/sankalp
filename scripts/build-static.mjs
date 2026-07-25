// scripts/build-static.mjs — build versi STATIS (folder out/) untuk BUKA-APP.bat.
// Route API (/api/*) tidak didukung mode export, jadi disingkirkan sementara
// saat build, lalu dikembalikan lagi.
import { existsSync, renameSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const API = "app/api";
const TMP = ".api-hold";
const moved = existsSync(API);

try {
  if (moved) renameSync(API, TMP);
  rmSync(".next", { recursive: true, force: true });
  rmSync("out", { recursive: true, force: true });
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, NEXT_EXPORT: "1" } });
  console.log("\n✅ Selesai. Folder out/ siap dipakai (jalankan BUKA-APP.bat).");
  console.log("   Catatan: fitur kirim email TIDAK aktif di versi statis — hanya di Vercel.");
} finally {
  if (moved && existsSync(TMP)) renameSync(TMP, API);
}
