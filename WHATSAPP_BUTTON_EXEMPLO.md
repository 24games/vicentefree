# Componente WhatsAppButton - Documentação

## 📱 Descrição
Componente de botão refatorado do Telegram para WhatsApp, seguindo as diretrizes de design e UX do WhatsApp.

## ✨ Características

### 🎨 Design
- **Cor de fundo**: `#25D366` (verde oficial do WhatsApp)
- **Cor hover**: `#128C7E` (verde escuro do WhatsApp)
- **Ícone**: SVG oficial do WhatsApp
- **Sombra**: Box-shadow com cor do WhatsApp

### 🔗 Funcionalidade
- **Link**: Usa `WHATSAPP_LINK` da configuração (`https://wa.me/message/OFJTC6W4P25EA1`)
- **Target**: `_blank` (abre em nova aba)
- **Aria-label**: "Conversar no WhatsApp" (acessibilidade)

## 💻 Como Usar

### No React (LandingPage.jsx)

```jsx
import { WHATSAPP_LINK } from '../config/campaignLinks';

// Dentro do componente LandingPage:
const WhatsAppButton = ({ href = WHATSAPP_LINK, className = "cta-whatsapp" }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    aria-label="Conversar no WhatsApp"
  >
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    Conversar no WhatsApp
  </a>
);

// Uso no JSX:
<WhatsAppButton />

// Com link customizado:
<WhatsAppButton href="https://wa.me/5511999999999" />

// Com classe customizada:
<WhatsAppButton className="cta-whatsapp-custom" />
```

### Estilos CSS

```css
/* WhatsApp Button */
.cta-whatsapp {
    background: #25D366;
    color: #fff;
    border: none;
    padding: 1.2rem 3rem;
    font-size: 1.3rem;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
}

.cta-whatsapp:hover {
    background: #128C7E;
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(37, 211, 102, 0.5);
}

.cta-whatsapp svg {
    width: 22px;
    height: 22px;
    fill: #fff;
}

/* Responsivo */
@media (max-width: 768px) {
    .cta-whatsapp {
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }
}
```

## 🎯 Comparação: Telegram vs WhatsApp

| Propriedade | Telegram | WhatsApp |
|-------------|----------|----------|
| **Cor de fundo** | `#0088cc` | `#25D366` |
| **Cor hover** | `#0077b5` | `#128C7E` |
| **Ícone** | Avião de papel | Logo WhatsApp |
| **Texto** | "Entrar al Grupo Ahora" | "Conversar no WhatsApp" |
| **Link** | Dinâmico (t.me) | Fixo (wa.me) |
| **Aria-label** | - | "Conversar no WhatsApp" |

## 📦 Arquivos Modificados

1. ✅ `src/components/LandingPage.jsx` - Adicionado componente WhatsAppButton
2. ✅ `src/components/LandingPage.css` - Adicionado estilos .cta-whatsapp

## 🚀 Deploy

Para ver as mudanças no deploy:

```bash
git add .
git commit -m "feat: adicionar componente WhatsAppButton"
git push origin main
```

O Vercel fará o deploy automaticamente.

## 🔗 Links de Configuração

O link do WhatsApp é gerenciado centralmente em:
- `src/config/campaignLinks.js`

```javascript
export const WHATSAPP_LINK = 'https://wa.me/message/OFJTC6W4P25EA1';
```

## ✨ Benefícios

1. ✅ **Consistência visual**: Usa as cores oficiais do WhatsApp
2. ✅ **Acessibilidade**: Inclui aria-label
3. ✅ **Reutilizável**: Pode ser usado em qualquer parte da aplicação
4. ✅ **Responsivo**: Adapta-se a diferentes tamanhos de tela
5. ✅ **Manutenível**: Link gerenciado centralmente







