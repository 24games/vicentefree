@echo off
chcp 65001 >nul
echo ========================================
echo    PUSH PARA GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo Removendo arquivo com token...
git rm --cached PUSH_AGORA.bat 2>nul

echo Adicionando arquivos limpos...
git add src/ package.json vercel.json .gitignore

echo Criando commit limpo...
git commit -m "feat: roteamento dinamico - WhatsApp fixo, Telegram por slug"

echo Enviando para GitHub...
git push origin main

echo.
echo ========================================
echo    CONCLUIDO!
echo ========================================
pause
