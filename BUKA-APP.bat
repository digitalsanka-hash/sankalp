@echo off
title SankaPage - Aplikasi Lokal
echo ============================================
echo   SankaPage - Membuka aplikasi...
echo   Browser akan terbuka otomatis.
echo   JANGAN tutup jendela hitam ini selama pakai.
echo ============================================
node "%~dp0serve-local.js"
echo.
echo Server berhenti. Tekan tombol apa saja untuk keluar.
pause >nul
