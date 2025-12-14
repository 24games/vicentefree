@echo off
echo ========================================
echo FAZENDO PUSH PARA GITHUB
echo ========================================
echo.

REM Inicializa o repositorio git se necessario
if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    echo.
)

REM Remove remote antigo se existir
git remote remove origin 2>nul

REM Adiciona o remote correto
echo Configurando remote...
git remote add origin https://github.com/24games/vicentefree.git
echo.

REM Adiciona todos os arquivos
echo Adicionando arquivos...
git add .
echo.

REM Faz o commit
echo Fazendo commit...
git commit -m "Landing page completa - Espanhol chileno"
echo.

REM Renomeia a branch para main se necessario
git branch -M main
echo.

REM Faz o push
echo Fazendo push para GitHub...
git push -u origin main
echo.

echo ========================================
echo PUSH CONCLUIDO!
echo ========================================
echo.
pause



