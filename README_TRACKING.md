# 🎯 Sistema de Tracking Server-Side - ETAPA 1

## ✅ Status: IMPLEMENTADO E PRONTO PARA USO

Sistema completo de rastreamento server-side integrando **Meta Conversion API (CAPI)** e **Supabase** para captura de PageView events.

---

## 📦 O Que Foi Criado

### ✅ 1. Schema Supabase
- **Tabela criada**: `tracking_vicente_perpetuo`
- **Índices otimizados** para match futuro (ETAPA 2)
- **Campos críticos** para identificação de usuários

### ✅ 2. API Route Vercel
- **Endpoint**: `POST /api/track`
- **Integração Supabase**: Salva dados automaticamente
- **Integração Meta CAPI**: Envia eventos PageView
- **Validação e sanitização** de dados

### ✅ 3. Cliente-Side Script
- **Arquivo**: `public/tracking.js`
- **Captura automática** de dados do usuário
- **Meta Pixel** integrado
- **Suporte a formulários**

### ✅ 4. Documentação
- **Setup completo**: `docs/TRACKING_SETUP.md`
- **Quick Start**: `docs/QUICK_START.md`
- **Comentários** em todo o código

---

## 🚀 Próximos Passos (Configuração)

### 1. Configurar Variáveis de Ambiente na Vercel

Acesse: **Vercel Dashboard** > **Seu Projeto** > **Settings** > **Environment Variables**

Adicione estas variáveis:

```env
SUPABASE_URL=https://jhyekbtcywewzrviqlos.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[OBTENHA NO SUPABASE DASHBOARD]
META_PIXEL_ID=928212556030144
META_ACCESS_TOKEN=EAADG88pNjVUBQNLMWtGTZAirrLD13Yq6tqFVW1CpYxUciPAv6keZBXJemeYvmqU7mI4CVpRKy96mlITUcEKPb19LNtpwvSGVpiRCxyfZCzrp7jUPZAS1a870ZArpNzTVmcCGVbvq3Inh7FNGhyfoO3VJMnZCxqC7H0yIPyDti37ZBDf1OmLIjnZAZBuawzZCXDJwZDZD
TRACKING_TABLE_NAME=tracking_vicente_perpetuo
```

**⚠️ IMPORTANTE:** 
- Obtenha `SUPABASE_SERVICE_ROLE_KEY` em: **Supabase Dashboard** > **Settings** > **API** > **service_role key** (secret)
- Use a Service Role Key, NÃO a anon key (para bypass de RLS)

### 2. Instalar Dependências

```bash
npm install
```

### 3. Deploy na Vercel

```bash
git add .
git commit -m "Add server-side tracking system"
git push
```

### 4. Testar

1. Abra sua landing page
2. Abra o **Console do Navegador** (F12)
3. Procure por: `✅ Tracking enviado com sucesso`
4. Verifique no Supabase:

```sql
SELECT * FROM tracking_vicente_perpetuo 
ORDER BY created_at DESC 
LIMIT 5;
```

---

## 📁 Estrutura de Arquivos

```
vicente-perpetuo/
├── api/
│   └── track.js                    # API Route (Vercel Serverless Function)
├── public/
│   └── tracking.js                 # Script cliente-side
├── supabase/
│   └── schema_tracking_template.sql # Schema SQL (já aplicado)
├── docs/
│   ├── TRACKING_SETUP.md          # Documentação completa
│   └── QUICK_START.md             # Guia rápido
├── index.html                      # HTML principal (script já incluído)
└── package.json                    # Dependências (já atualizado)
```

---

## 🔍 Verificação Rápida

### Tabela no Supabase ✅
```sql
-- Verificar se a tabela existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'tracking_vicente_perpetuo'
);

-- Ver últimas entradas
SELECT id, email, phone, sent_to_meta, created_at 
FROM tracking_vicente_perpetuo 
ORDER BY created_at DESC 
LIMIT 10;
```

### API Route ✅
- Arquivo criado: `api/track.js`
- Endpoint: `POST /api/track`
- Método: POST apenas
- Retorna JSON

### Script Cliente ✅
- Arquivo criado: `public/tracking.js`
- Incluído em: `index.html`
- Executa automaticamente ao carregar página

---

## 🎯 Match Futuro (ETAPA 2)

A estrutura está **100% preparada** para match entre ETAPA 1 (PageView) e ETAPA 2 (Conversão):

### Chaves de Match Disponíveis:
1. **Email** (Chave Principal) ⭐
2. **Telefone** (Chave Secundária)
3. **FBP + FBC** (Meta CAPI Matching)
4. **IP + User Agent + Timestamp** (Fingerprint)

### Exemplo de Consulta (ETAPA 2):

```sql
-- Encontrar PageView por email
SELECT * FROM tracking_vicente_perpetuo
WHERE email = 'usuario@email.com'
ORDER BY timestamp DESC
LIMIT 1;

-- Encontrar por telefone
SELECT * FROM tracking_vicente_perpetuo
WHERE phone = '5511999999999'
ORDER BY timestamp DESC
LIMIT 1;
```

---

## 📊 Dados Capturados Automaticamente

### Sempre Capturados:
- ✅ Cookies Facebook (_fbp, _fbc)
- ✅ User Agent
- ✅ URL da página
- ✅ Referrer
- ✅ Idioma
- ✅ Timestamp
- ✅ IP (adicionado pelo servidor)

### Parâmetros de URL:
- ✅ UTMs (source, medium, campaign, term, content)
- ✅ fbclid, gclid

### Dados do Usuário (quando disponíveis via formulário):
- ✅ Email, Telefone
- ✅ Nome completo
- ✅ Data de nascimento
- ✅ Localização

---

## 🔧 Personalização

### Alterar Pixel ID
Edite `public/tracking.js`:
```javascript
const PIXEL_ID = 'SEU_PIXEL_ID';
```

### Alterar Endpoint da API
Edite `public/tracking.js`:
```javascript
const API_ENDPOINT = '/api/track';
```

### Alterar Nome da Tabela
Configure via variável de ambiente:
```env
TRACKING_TABLE_NAME=tracking_outro_projeto
```

---

## 📚 Documentação

- **Setup Completo**: `docs/TRACKING_SETUP.md`
- **Quick Start**: `docs/QUICK_START.md`
- **Código**: Comentários detalhados em todos os arquivos

---

## ⚠️ Checklist Final

Antes de considerar o sistema pronto:

- [ ] ✅ Tabela criada no Supabase
- [ ] ⏳ Variáveis de ambiente configuradas na Vercel
- [ ] ⏳ Dependências instaladas (`npm install`)
- [ ] ✅ Script de tracking incluído no HTML
- [ ] ⏳ Deploy realizado na Vercel
- [ ] ⏳ Teste realizado e funcionando

---

## 🆘 Suporte

Problemas? Consulte:
1. `docs/TRACKING_SETUP.md` - Documentação completa
2. `docs/QUICK_START.md` - Guia rápido
3. Logs da Vercel - Dashboard > Deployments > Functions
4. Console do navegador - F12

---

**Status:** ✅ Sistema implementado e tabela criada. Aguardando configuração de variáveis de ambiente e deploy.


