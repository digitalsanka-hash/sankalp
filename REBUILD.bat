@echo off
title SankaLP - Build Ulang Versi Statis
cd /d "%~dp0"
echo ============================================
echo   Membangun ulang versi statis (folder out)
echo   PASTIKAN 'npm run dev' TIDAK sedang jalan.
echo ============================================
set NEXT_EXPORT=1
call npx next build
echo.
echo Selesai. Jalankan BUKA-APP.bat untuk membuka aplikasi.
pause
