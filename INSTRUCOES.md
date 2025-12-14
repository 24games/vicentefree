# 🚀 Como Visualizar a Landing Page

## Método 1: Script Automático (Mais Fácil)

1. Clique com botão direito no arquivo `start-server.ps1`
2. Selecione "Executar com PowerShell"
3. Aguarde alguns segundos
4. O navegador abrirá automaticamente!

## Método 2: Manual

1. Abra o PowerShell ou Terminal neste diretório
2. Execute:
   ```bash
   npm install
   ```
3. Aguarde instalar as dependências
4. Execute:
   ```bash
   npm run dev
   ```
5. Aguarde aparecer: `ready`
6. Acesse: **http://localhost:5173/landing-page.html**

## Método 3: Se o Vite não funcionar

Use um servidor HTTP simples:

1. Se tiver Python instalado:
   ```bash
   python -m http.server 8000
   ```
   Acesse: http://localhost:8000/landing-page.html

2. Ou instale o `http-server`:
   ```bash
   npm install -g http-server
   http-server public -p 8000
   ```
   Acesse: http://localhost:8000/landing-page.html

---

## ✅ Checklist

- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor rodando (`npm run dev`)
- [ ] Ver mensagem "ready" no terminal
- [ ] Acessar http://localhost:5173/landing-page.html

---

## 🆘 Problemas?

Se algo não funcionar:
1. Verifique se a porta 5173 está livre
2. Tente outra porta: `npm run dev -- --port 3000`
3. Verifique se node_modules existe
4. Veja os erros no terminal




