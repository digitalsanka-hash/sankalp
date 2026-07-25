// serve-local.js — server statis kecil untuk membuka SankaLP secara lokal.
// Menyajikan folder ./out (hasil build). Tanpa internet / tanpa install apa pun
// (cukup Node.js). Jalankan lewat BUKA-APP.bat.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const root = path.join(__dirname, "out");
const port = 4173;

if (!fs.existsSync(root)) {
  console.log("\n  Folder 'out' belum ada. Jalankan dulu: npm run build\n");
  process.exit(1);
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json",
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\.\.+/g, "");
  let fp = path.join(root, clean);
  try {
    if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
      fp = path.join(fp, "index.html");
    }
    if (fs.existsSync(fp)) return fp;
    if (fs.existsSync(fp + ".html")) return fp + ".html";
    const idx = path.join(root, clean, "index.html");
    if (fs.existsSync(idx)) return idx;
  } catch (_) {}
  return null;
}

http
  .createServer((req, res) => {
    const fp = resolveFile(req.url === "/" ? "/index.html" : req.url);
    if (!fp) {
      const notFound = path.join(root, "404.html");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      if (fs.existsSync(notFound)) return fs.createReadStream(notFound).pipe(res);
      return res.end("404 - Halaman tidak ditemukan");
    }
    res.writeHead(200, { "Content-Type": mime[path.extname(fp)] || "application/octet-stream" });
    fs.createReadStream(fp).pipe(res);
  })
  .listen(port, () => {
    const url = "http://localhost:" + port;
    console.log("\n  SankaLP jalan di: " + url);
    console.log("  (Biarkan jendela ini terbuka. Tutup jendela = matikan aplikasi.)\n");
    exec('start "" ' + url); // buka browser otomatis (Windows)
  });
