import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from './components/LandingPage';
import { isValidSlug } from './config/campaignLinks';
import './App.css';

/**
 * Componente de Rota Dinâmica
 * Valida a slug e renderiza a LandingPage apenas se a slug for válida
 */
function CampaignPage() {
  const { slug } = useParams();
  
  // Valida se a slug está na lista de slugs permitidas
  if (!isValidSlug(slug)) {
    // Redireciona para home se a slug não for válida
    return <Navigate to="/" replace />;
  }
  
  // Log para debug (remover em produção se necessário)
  console.log(`[CampaignPage] Slug válida: ${slug}`);
  
  // Renderiza a LandingPage (WhatsApp link é fixo, não precisa passar via props)
  return <LandingPage slug={slug} />;
}

/**
 * Página padrão (sem slug)
 */
function DefaultPage() {
  return <LandingPage slug="default" />;
}

/**
 * App Principal com Sistema de Rotas
 * 
 * Rotas suportadas:
 * - / → Página padrão
 * - /cr1-a1f1, /cr2-a1f1, /cr3-a1f1 → Slugs válidas
 * - /cr1-a1f2, /cr2-a1f2, /cr3-a1f2 → Slugs válidas
 * - /cr1-a3f1, /cr2-a3f1, /cr3-a3f1 → Slugs válidas
 * - /cr1-a3f2, /cr2-a3f2, /cr3-a3f2 → Slugs válidas
 * - /a6f2 → Slug válida
 * - /cr1a7f1, /cr2a7f1, /cr3a7f1 → Slugs válidas
 * - /qualquer-outra-slug → Redireciona para home (/)
 * 
 * IMPORTANTE: O link do WhatsApp é FIXO e ÚNICO para todas as rotas.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão (home) */}
        <Route path="/" element={<DefaultPage />} />
        
        {/* Rotas dinâmicas com slug - validação automática */}
        <Route path="/:slug" element={<CampaignPage />} />
      </Routes>
      
      {/* Vercel Analytics e Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
