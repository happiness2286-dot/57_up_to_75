@echo off
chcp 65001 > nul

title Auto Update XSMB va Push to GitHub 2026
echo =================================================================
echo   HE THONG TU DONG CAP NHAT KET QUA XSMB VA PUSH GITHUB HANG NGAY
echo =================================================================
echo.

:: 1. Chay script python cao ket qua tu ketqua16.net
python update_daily.py

echo.
echo -----------------------------------------------------------------
echo   DANG KIEM TRA THAY DOI VA PUSH LEN GITHUB...
echo -----------------------------------------------------------------

:: 2. Them tat ca file thay doi vao git
git add .

:: 3. Kiem tra xem co thay doi staged nao de commit khong
git diff --cached --quiet
if %errorlevel%==0 (
    echo.
    echo [INFO] Khong co du lieu moi nao thay doi. System up-to-date!
) else (
    echo.
    echo [SUCCESS] Co du lieu moi! Dang tao commit va day len GitHub...
    git commit -m "auto: Cap nhat ket qua XSMB tu ketqua16.net va tai toi uu Dan 60 So N1"
    git push origin main
    echo.
    echo =================================================================
    echo   DA TU DONG CAP NHAT VA PUSH LEN GITHUB THANH CONG!
    echo =================================================================
)

echo.
pause

