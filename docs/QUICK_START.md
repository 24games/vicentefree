# 🚀 Quick Start - Tracking Server-Side (ETAPA 1)

## ⚡ Setup Rápido em 5 Minutos

### 1️⃣ Criar Tabela no Supabase

Execute o SQL no **Supabase SQL Editor**:

```sql
-- Execute o arquivo: supabase/schema_tracking_template.sql
-- Ou copie e cole o conteúdo no SQL Editor do Supabase
```

### 2️⃣ Configurar Variáveis de Ambiente na Vercel

Acesse: **Vercel Dashboard** > **Seu Projeto** > **Settings** > **Environment Variables**

Adicione:

```
SUPABASE_URL = https://jhyekbtcywewzrviqlos.supabase.co
SUPABASE_SERVICE_ROLE_KEY = [sua_service_role_key]
META_PIXEL_ID = 928212556030144
META_ACCESS_TOKEN = [seu_access_token]
TRACKING_TABLE_NAME = tracking_vicente_perpetuo
```

**💡 Dica:** Obtenha `SUPABASE_SERVICE_ROLE_KEY` em:
- Supabase Dashboard > Settings > API > service_role key (secreta)

### 3️⃣ Instalar Dependências

```bash
npm install
```

### 4️⃣ Deploy na Vercel

```bash
git add .
git commit -m "Setup tracking server-side"
git push
```

A Vercel fará o deploy automaticamente.

### 5️⃣ Verificar Funcionamento

Abra sua landing page e:
1. Abra o **Console do Navegador** (F12)
2. Procure por: `✅ Tracking enviado com sucesso`
3. Verifique no Supabase:

```sql
SELECT * FROM tracking_vicente_perpetuo 
ORDER BY created_at DESC 
LIMIT 5;
```

---

## ✅ Checklist

- [ ] Tabela criada no Supabase
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Dependências instaladas (`npm install`)
- [ ] Script de tracking incluído no HTML (`/tracking.js`)
- [ ] Deploy realizado na Vercel
- [ ] Teste realizado e funcionando

---

## 🔍 Teste Rápido

Abra o console do navegador na sua landing page e execute:

```javascript
// Verificar se o tracking está carregado
console.log(window.tracking);

// Enviar tracking manualmente (se necessário)
window.tracking.send(window.tracking.collect());
```

---

## 📝 Próximos Passos

1. Personalize o `PIXEL_ID` em `public/tracking.js` se necessário
2. Configure o `API_ENDPOINT` se usar domínio customizado
3. Teste captura de dados de formulários
4. Monitore logs na Vercel Dashboard

---

## 🆘 Problemas Comuns

**Script não carrega?**
- Verifique se o arquivo está em `/public/tracking.js`
- Verifique o console do navegador para erros

**Erro 500 no endpoint?**
- Verifique variáveis de ambiente na Vercel
- Veja logs em Vercel Dashboard > Deployments > Functions

**Dados não aparecem no Supabase?**
- Verifique se a tabela existe
- Confirme nome da tabela em `TRACKING_TABLE_NAME`

---

Para documentação completa, veja: [TRACKING_SETUP.md](./TRACKING_SETUP.md)


