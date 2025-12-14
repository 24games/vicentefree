# 🎯 Integração do Tracking na Landing Page

## ✅ Landing Page Integrada

A landing page completa foi salva em `public/landing-page.html` com **total integração do sistema de tracking**.

---

## 🔧 O Que Foi Integrado

### 1. **Script de Tracking**
```html
<!-- No <head> -->
<script src="/tracking.js"></script>
```

### 2. **Tracking de CTAs**
Todos os botões de CTA agora enviam eventos de tracking:

- **`scrollToTelegram()`** - Rastreia cliques no CTA do Hero
- **`openTelegram()`** - Rastreia quando o usuário abre o Telegram

### 3. **Tracking de Scroll Depth**
Sistema automático que envia eventos quando o usuário atinge:
- 25% da página
- 50% da página
- 75% da página
- 90% da página

### 4. **Eventos Personalizados**
- `CTAClick` - Clique em botão CTA
- `TelegramClick` - Abertura do link do Telegram
- `ScrollDepth` - Profundidade de scroll

---

## 📊 Eventos Rastreados

### Automáticos (PageView)
- ✅ Carregamento da página
- ✅ Dados do usuário (cookies, IP, User Agent)
- ✅ UTMs e parâmetros de URL

### Interações
- ✅ Cliques em CTAs
- ✅ Abertura do Telegram
- ✅ Scroll depth (25%, 50%, 75%, 90%)

---

## 🚀 Como Usar

### Opção 1: Usar HTML Direto (Estático)

1. Copie o conteúdo de `public/landing-page.html`
2. Renomeie para `index.html` na raiz do projeto
3. Ou coloque em `public/index.html` para servir via Vite

### Opção 2: Integrar no React (Recomendado)

Se quiser usar no React, você pode:

1. **Criar componente React** baseado no HTML
2. **Manter o tracking.js** carregado no `index.html`
3. **Adicionar event listeners** nos componentes React

---

## 🔍 Verificação

Após usar a landing page, verifique:

### 1. Console do Navegador
```
✅ Tracking enviado com sucesso: {success: true, ...}
```

### 2. Supabase
```sql
-- Ver eventos de tracking
SELECT 
    event_type,
    cta_location,
    scroll_percent,
    created_at
FROM tracking_vicente_perpetuo
WHERE event_type IN ('CTAClick', 'TelegramClick', 'ScrollDepth')
ORDER BY created_at DESC;
```

### 3. Meta Pixel Events
- Verifique no Meta Events Manager se os eventos PageView estão chegando

---

## 🎨 Personalização

### Alterar Link do Telegram
Procure por `https://t.me/tipstervicente` e substitua:
```javascript
window.open('https://t.me/SEU_GRUPO_AQUI', '_blank');
```

### Adicionar Mais Eventos
Você pode adicionar tracking em qualquer elemento:

```javascript
// Exemplo: Tracking em card de benefício
function trackBenefitClick(benefitName) {
    if (window.tracking) {
        const data = window.tracking.collect();
        data.event_type = 'BenefitClick';
        data.benefit_name = benefitName;
        window.tracking.send(data);
    }
}
```

---

## 📱 Funcionalidades da Landing Page

- ✅ **Responsive Design** - Mobile-first
- ✅ **Progress Bar** - Indicador de scroll
- ✅ **Animations** - Transições suaves
- ✅ **FAQ Accordion** - Seção de perguntas
- ✅ **Sticky CTA Mobile** - CTA fixo no mobile
- ✅ **Tracking Completo** - Todos os eventos rastreados

---

## ⚠️ Importante

1. **Script de Tracking**: O arquivo `tracking.js` deve estar acessível em `/tracking.js`
2. **API Endpoint**: Configure `API_ENDPOINT` em `tracking.js` se necessário
3. **Meta Pixel**: Verifique se o `PIXEL_ID` está correto em `tracking.js`

---

## 🔗 Próximos Passos

1. Teste a landing page localmente
2. Verifique se os eventos estão sendo enviados
3. Configure variáveis de ambiente na Vercel
4. Faça deploy e teste em produção
5. Monitore eventos no Supabase e Meta Events Manager

---

## 📚 Documentação Relacionada

- [TRACKING_SETUP.md](./TRACKING_SETUP.md) - Setup completo do sistema
- [QUICK_START.md](./QUICK_START.md) - Guia rápido
- [README_TRACKING.md](../README_TRACKING.md) - Visão geral




