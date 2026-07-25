@echo off
title SankaLP - Aplikasi Lokal
echo ============================================
echo   SankaLP - Membuka aplikasi...
echo   Browser akan terbuka otomatis.
echo   JANGAN tutup jendela hitam ini selama pakai.
echo ============================================
node "%~dp0serve-local.js"
echo.
echo Server berhenti. Tekan tombol apa saja untuk keluar.
pause >nul
