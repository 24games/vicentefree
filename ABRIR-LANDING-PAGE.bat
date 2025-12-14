@echo off
echo ========================================
echo  Iniciando servidor para Landing Page
echo ========================================
echo.
echo Aguarde alguns segundos...
echo.

REM Tentar usar Node.js se disponivel
where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Usando Node.js...
    echo.
    start "Servidor Landing Page" cmd /k "node server.js & timeout /t 3 /nobreak >nul && start http://localhost:5173/landing-page.html"
    exit
)

REM Tentar usar Python se disponivel
where python >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Usando Python...
    echo.
    start "Servidor Landing Page" cmd /k "cd public && python -m http.server 5173 && timeout /t 3 /nobreak >nul && start http://localhost:5173/landing-page.html"
    exit
)

REM Se nada funcionar, abrir arquivo diretamente
echo Abrindo arquivo HTML diretamente...
start index-standalone.html
pause



