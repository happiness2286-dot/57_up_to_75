@echo off
chcp 65001 > nul
cd /d "%~dp0"

title Auto Update XSMB va Push to GitHub 2026
echo =================================================================
echo   HE THONG TU DONG CAP NHAT KET QUA XSMB VA PUSH GITHUB HANG NGAY
echo =================================================================
echo.

:: 1. Chay script python tu dong cao ket qua, cap nhat cache va push GitHub
python update_daily.py

echo.
pause
