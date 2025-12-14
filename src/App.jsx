import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from './components/LandingPage';
import { getTelegramLink, DEFAULT_TELEGRAM_LINK, isValidSlug } from './config/campaignLinks';
import './App.css';

/**
 * Componente de Rota Dinâmica
 * Captura a slug da URL e passa o link correto do Telegram para a LandingPage
 */
function CampaignPage() {
  const { slug } = useParams();
  
  // Obtém o link do Telegram baseado na slug (ou usa o default)
  const telegramLink = getTelegramLink(slug);
  
  // Log para debug (remover em produção)
  console.log(`[CampaignPage] Slug: ${slug}, Telegram Link: ${telegramLink}`);
  
  return <LandingPage telegramLink={telegramLink} slug={slug} />;
}

/**
 * Página padrão (sem slug) - usa o link default do Telegram
 */
function DefaultPage() {
  return <LandingPage telegramLink={DEFAULT_TELEGRAM_LINK} slug="default" />;
}

/**
 * App Principal com Sistema de Rotas
 * 
 * Rotas suportadas:
 * - / → Página padrão (usa DEFAULT_TELEGRAM_LINK)
 * - /cr1-a3f1 → Link do Telegram: w48123852
 * - /cr2-a3f1 → Link do Telegram: w48123854
 * - /cr3-a3f1 → Link do Telegram: w48123856
 * - /qualquer-outra-slug → Usa DEFAULT_TELEGRAM_LINK
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão (home) */}
        <Route path="/" element={<DefaultPage />} />
        
        {/* Rotas dinâmicas com slug */}
        <Route path="/:slug" element={<CampaignPage />} />
      </Routes>
      
      {/* Vercel Analytics e Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
