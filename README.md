# Vicente Perpétuo

Projeto React + Vite configurado para deploy na Vercel.

## 🚀 Tecnologias

- **React** 18.3.1
- **Vite** 5.4.2
- **Vercel Analytics** - Monitoramento de analytics
- **Vercel Speed Insights** - Análise de performance

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 🚢 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel.

### Configuração na Vercel:

1. Conecte seu repositório Git à Vercel
2. A Vercel detectará automaticamente que é um projeto Vite
3. Os Analytics e Speed Insights serão habilitados automaticamente na dashboard da Vercel

### Habilitar Analytics e Speed Insights:

Os componentes já estão integrados no código (`src/main.jsx`). Para ativar os recursos:

1. Acesse o dashboard do seu projeto na Vercel
2. Vá em **Settings** > **Analytics**
3. Ative **Web Analytics**
4. Vá em **Settings** > **Speed Insights**
5. Ative **Speed Insights**

### Deploy Manual:

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Deploy
vercel
```

## 📊 Analytics e Speed Insights

- **Analytics**: Coleta dados sobre visitantes, páginas visitadas, etc.
- **Speed Insights**: Monitora Core Web Vitals e performance da aplicação

Ambos estão integrados automaticamente e começam a funcionar assim que você ativa nas configurações da Vercel.


