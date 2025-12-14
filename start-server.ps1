# Script para iniciar o servidor Vite
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Iniciando Servidor Vite" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Iniciar servidor
Write-Host "🌐 Iniciando servidor na porta 5173..." -ForegroundColor Cyan
Write-Host "⏳ Aguarde alguns segundos..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Quando aparecer 'ready', acesse:" -ForegroundColor White
Write-Host "http://localhost:5173/landing-page.html" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Iniciar servidor e abrir navegador após 8 segundos
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 8
    Start-Process "http://localhost:5173/landing-page.html"
} | Out-Null

# Iniciar servidor
npm run dev




