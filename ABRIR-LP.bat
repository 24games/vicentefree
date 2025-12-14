@echo off
color 0A
echo.
echo ========================================
echo   INICIANDO LANDING PAGE
echo ========================================
echo.

cd /d "%~dp0"

REM Copia o arquivo
copy /Y landing-page-completa.html public\landing-page.html >nul 2>&1

REM Verifica se servidor está rodando
netstat -an | find "8080" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo [OK] Servidor ja esta rodando!
    echo.
    echo Abrindo navegador...
    start http://localhost:8080/landing-page.html
    timeout /t 2 >nul
    exit
)

REM Inicia o servidor
echo [*] Iniciando servidor...
echo.
start "Servidor Local - Porta 8080" /MIN cmd /c "node simple-server.js"

REM Aguarda servidor iniciar
timeout /t 3 >nul

REM Abre navegador
echo [OK] Abrindo navegador...
start http://localhost:8080/landing-page.html

echo.
echo ========================================
echo   PRONTO! Pagina aberta no navegador
echo ========================================
echo.
timeout /t 3 >nul
exit



