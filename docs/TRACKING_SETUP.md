# 🎯 Server-Side Tracking - ETAPA 1 (PageView)

## 📋 Visão Geral

Sistema completo de rastreamento server-side integrando **Meta Conversion API (CAPI)** e **Supabase** para captura de dados do usuário na landing page (PageView).

---

## 🏗️ Arquitetura

```
Cliente (Landing Page)
    ↓
[tracking.js] → Captura dados do usuário
    ↓
POST /api/track (Vercel API Route)
    ↓
    ├─→ Supabase (Armazenamento)
    └─→ Meta CAPI (PageView Event)
```

---

## 📦 Componentes

### 1. **Schema Supabase** (`supabase/schema_tracking_template.sql`)
- Tabela otimizada para match futuro (ETAPA 2)
- Índices para performance
- Campos críticos para identificação de usuários

### 2. **API Route** (`api/track.js`)
- Recebe dados do cliente-side
- Valida e sanitiza dados
- Salva no Supabase
- Envia para Meta CAPI
- Retorna confirmação

### 3. **Cliente-Side Script** (`public/tracking.js`)
- Captura automática de dados
- Integração com Meta Pixel
- Envio para endpoint server-side
- Suporte a formulários

---

## 🚀 Instalação

### Passo 1: Criar Tabela no Supabase

1. Acesse o **Supabase SQL Editor**
2. Abra o arquivo `supabase/schema_tracking_template.sql`
3. **Substitua** `tracking_vicente_perpetuo` pelo nome do seu projeto (se necessário)
4. Execute o script SQL

**OU** use o Supabase MCP:

```sql
-- Execute via Supabase MCP ou SQL Editor
-- O schema já está preparado para o projeto "vicente_perpetuo"
```

### Passo 2: Configurar Variáveis de Ambiente (Vercel)

1. Acesse seu projeto na **Vercel Dashboard**
2. Vá em **Settings** > **Environment Variables**
3. Adicione as seguintes variáveis:

```env
SUPABASE_URL=https://jhyekbtcywewzrviqlos.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
META_PIXEL_ID=928212556030144
META_ACCESS_TOKEN=EAADG88pNjVUBQNLMWtGTZAirrLD13Yq6tqFVW1CpYxUciPAv6keZBXJemeYvmqU7mI4CVpRKy96mlITUcEKPb19LNtpwvSGVpiRCxyfZCzrp7jUPZAS1a870ZArpNzTVmcCGVbvq3Inh7FNGhyfoO3VJMnZCxqC7H0yIPyDti37ZBDf1OmLIjnZAZBuawzZCXDJwZDZD
TRACKING_TABLE_NAME=tracking_vicente_perpetuo
```

**⚠️ IMPORTANTE:**
- `SUPABASE_SERVICE_ROLE_KEY`: Obtenha em **Supabase Dashboard** > **Settings** > **API** > **service_role key**
- `META_ACCESS_TOKEN`: Substitua pelo seu token atual se necessário

### Passo 3: Instalar Dependências

```bash
npm install
```

### Passo 4: Integrar Script na Landing Page

Adicione o script na sua landing page HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- ... outros elementos ... -->
</head>
<body>
  <!-- Seu conteúdo aqui -->
  
  <!-- Tracking Script -->
  <script src="/tracking.js"></script>
  
  <!-- OU se estiver em outra URL -->
  <script src="https://seu-dominio.com/tracking.js"></script>
</body>
</html>
```

**Para React/Vite:**

Adicione em `index.html`:

```html
<script src="/tracking.js"></script>
```

---

## 🔧 Configuração Avançada

### Personalizar Pixel ID

Edite `public/tracking.js`:

```javascript
const PIXEL_ID = 'SEU_PIXEL_ID_AQUI';
```

### Personalizar Endpoint da API

Edite `public/tracking.js`:

```javascript
const API_ENDPOINT = '/api/track'; // Relativo ao domínio
// OU
const API_ENDPOINT = 'https://seu-dominio.com/api/track'; // URL completa
```

### Personalizar Nome da Tabela

Edite `api/track.js` ou configure via variável de ambiente:

```env
TRACKING_TABLE_NAME=tracking_seu_projeto
```

---

## 📊 Dados Capturados

### Automáticos (Sempre Capturados)
- ✅ `fbp` - Cookie _fbp do Facebook
- ✅ `fbc` - Cookie _fbc do Facebook
- ✅ `user_agent` - User Agent do navegador
- ✅ `page_url` - URL completa da página
- ✅ `referrer` - URL de referência
- ✅ `language` - Idioma do navegador
- ✅ `timestamp` - Data/hora do evento
- ✅ `ip` - Endereço IP (adicionado pelo servidor)

### Parâmetros de URL (UTMs)
- ✅ `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- ✅ `fbclid` - Facebook Click ID
- ✅ `gclid` - Google Click ID

### Dados do Usuário (Quando Disponíveis)
Capturados via formulários ou atualização manual:
- ✅ `email` - Email do usuário
- ✅ `phone` - Telefone
- ✅ `first_name`, `last_name` - Nome completo
- ✅ `date_of_birth` - Data de nascimento
- ✅ `city`, `state`, `country`, `zip_code` - Localização

---

## 🎯 Match Futuro (ETAPA 2)

A estrutura foi otimizada para permitir match entre **ETAPA 1** (PageView) e **ETAPA 2** (Conversão) usando:

### Chaves de Match:
1. **Email** (Chave Principal) - Mais confiável
2. **Telefone** (Chave Secundária)
3. **FBP + FBC** (Combinados) - Meta CAPI matching
4. **IP + User Agent + Timestamp** (Janela de tempo) - Fingerprint

### Estrutura de Consulta (ETAPA 2):

```sql
-- Exemplo: Encontrar PageView por email
SELECT * FROM tracking_vicente_perpetuo
WHERE email = 'usuario@email.com'
ORDER BY timestamp DESC
LIMIT 1;

-- Exemplo: Encontrar por telefone
SELECT * FROM tracking_vicente_perpetuo
WHERE phone = '5511999999999'
ORDER BY timestamp DESC
LIMIT 1;
```

---

## 🧪 Testes

### Testar Endpoint Manualmente

```bash
curl -X POST https://seu-dominio.com/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "phone": "5511999999999",
    "page_url": "https://seu-dominio.com",
    "user_agent": "Mozilla/5.0...",
    "fbp": "fb.1.1234567890.1234567890",
    "fbc": "fb.1.1234567890.AbCdEfGhIjKlMnOpQrStUvWxYz"
  }'
```

### Verificar Dados no Supabase

```sql
-- Ver últimas 10 entradas
SELECT * FROM tracking_vicente_perpetuo
ORDER BY created_at DESC
LIMIT 10;

-- Verificar envios para Meta CAPI
SELECT 
  id,
  email,
  sent_to_meta,
  error_message,
  created_at
FROM tracking_vicente_perpetuo
WHERE sent_to_meta = false
ORDER BY created_at DESC;
```

---

## 🔍 Monitoramento

### Verificar Logs na Vercel
1. Acesse **Vercel Dashboard** > **Deployments**
2. Clique no deployment mais recente
3. Vá em **Functions** > **api/track**
4. Veja logs em tempo real

### Verificar Respostas da Meta CAPI

```sql
-- Ver respostas da Meta CAPI
SELECT 
  id,
  email,
  sent_to_meta,
  meta_response,
  error_message,
  created_at
FROM tracking_vicente_perpetuo
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

---

## ⚠️ Troubleshooting

### Erro: "Supabase configuration missing"
- Verifique se as variáveis de ambiente estão configuradas na Vercel
- Certifique-se de usar `SUPABASE_SERVICE_ROLE_KEY` (não anon key)

### Erro: "Failed to send to Meta CAPI"
- Verifique se `META_ACCESS_TOKEN` está correto
- Confirme que o token tem permissões para enviar eventos
- Verifique se o `META_PIXEL_ID` está correto

### Dados não aparecem no Supabase
- Verifique se a tabela foi criada corretamente
- Confirme que `TRACKING_TABLE_NAME` corresponde ao nome da tabela
- Verifique logs da Vercel para erros específicos

### Script não executa
- Verifique se o arquivo `tracking.js` está acessível via `/tracking.js`
- Abra o console do navegador (F12) para ver erros
- Verifique se há bloqueadores de script (AdBlock, etc)

---

## 📝 Próximos Passos (ETAPA 2)

Este sistema está preparado para integração com eventos de conversão:

- ✅ **Funil 1**: Webhook Perfect Pay (Purchase)
- ✅ **Funil 2**: Webhook 24games.cl (FTD)
- ✅ **Funil 3**: Webhook Telegram Mini App (Lead)

A estrutura de match já está implementada e pronta para uso.

---

## 📚 Referências

- [Meta Conversion API Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

---

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique os logs na Vercel
2. Consulte os comentários no código
3. Teste o endpoint manualmente
4. Verifique as variáveis de ambiente


