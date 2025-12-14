-- ============================================================================
-- SCHEMA GENÉRICO PARA TRACKING SERVER-SIDE - ETAPA 1 (PageView)
-- ============================================================================
-- Este schema é otimizado para match futuro com eventos de conversão (ETAPA 2)
-- 
-- COMO USAR:
-- 1. Substitua {PROJECT_NAME} pelo nome do seu projeto (ex: 'vicente_perpetuo')
-- 2. Execute o script no Supabase SQL Editor
-- 3. A tabela será criada como: tracking_{PROJECT_NAME}
-- ============================================================================

-- ============================================================================
-- CONFIGURAÇÃO: Substitua {PROJECT_NAME} pelo nome do seu projeto
-- ============================================================================
-- Exemplos: 'vicente_perpetuo', 'landing_page_1', 'campaign_abc'
-- IMPORTANTE: Use apenas letras minúsculas, números e underscores
-- ============================================================================

CREATE TABLE IF NOT EXISTS tracking_vicente_perpetuo (
    -- ID único do registro
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- ========================================================================
    -- CHAVES DE MATCH PARA ETAPA 2 (CRÍTICAS)
    -- ========================================================================
    -- Email: Chave principal para match (mais confiável)
    email VARCHAR(255),
    
    -- Telefone: Chave secundária para match (formato internacional)
    phone VARCHAR(50),
    
    -- FBP + FBC: Cruciais para match com Meta CAPI
    fbp VARCHAR(255), -- Facebook Browser ID (_fbp cookie)
    fbc VARCHAR(255), -- Facebook Click ID (_fbc cookie)
    
    -- IP + User Agent + Timestamp: Match por fingerprint (janela de tempo)
    ip VARCHAR(45), -- Suporta IPv4 e IPv6
    user_agent TEXT,
    
    -- ========================================================================
    -- DADOS PESSOAIS (quando disponíveis)
    -- ========================================================================
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE, -- Formato: YYYY-MM-DD
    
    -- ========================================================================
    -- LOCALIZAÇÃO
    -- ========================================================================
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(2), -- Código ISO (ex: BR, US)
    zip_code VARCHAR(20),
    
    -- ========================================================================
    -- PARÂMETROS DE TRACKING / UTMs
    -- ========================================================================
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    fbclid VARCHAR(255), -- Facebook Click ID (URL parameter)
    gclid VARCHAR(255),  -- Google Click ID (URL parameter)
    
    -- ========================================================================
    -- METADADOS DA SESSÃO
    -- ========================================================================
    page_url TEXT, -- URL completa da página
    referrer TEXT, -- URL de referência
    language VARCHAR(10), -- Idioma do navegador (ex: pt-BR, en-US)
    timestamp TIMESTAMPTZ DEFAULT NOW(), -- Timestamp do evento
    
    -- ========================================================================
    -- META TRACKING
    -- ========================================================================
    event_type VARCHAR(50) DEFAULT 'PageView', -- Tipo de evento (PageView para ETAPA 1)
    event_id VARCHAR(255) UNIQUE, -- ID único do evento para deduplicação Meta CAPI
    
    -- ========================================================================
    -- STATUS DE ENVIO PARA META CAPI
    -- ========================================================================
    sent_to_meta BOOLEAN DEFAULT FALSE, -- Indica se foi enviado para Meta CAPI
    meta_response JSONB, -- Resposta completa da Meta CAPI
    error_message TEXT, -- Mensagem de erro (se houver)
    
    -- ========================================================================
    -- METADADOS DO SISTEMA
    -- ========================================================================
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ÍNDICES PARA OTIMIZAÇÃO DE MATCH (ETAPA 2)
-- ============================================================================

-- Índice para match por email (chave principal)
CREATE INDEX IF NOT EXISTS idx_tracking_email 
ON tracking_vicente_perpetuo(email) 
WHERE email IS NOT NULL;

-- Índice para match por telefone (chave secundária)
CREATE INDEX IF NOT EXISTS idx_tracking_phone 
ON tracking_vicente_perpetuo(phone) 
WHERE phone IS NOT NULL;

-- Índice composto para match por FBP + FBC (Meta matching)
CREATE INDEX IF NOT EXISTS idx_tracking_fb_cookies 
ON tracking_vicente_perpetuo(fbp, fbc) 
WHERE fbp IS NOT NULL;

-- Índice composto para match por IP + User Agent + Timestamp (fingerprint)
CREATE INDEX IF NOT EXISTS idx_tracking_ip_ua_time 
ON tracking_vicente_perpetuo(ip, user_agent, timestamp) 
WHERE ip IS NOT NULL AND user_agent IS NOT NULL;

-- Índice para event_id (deduplicação Meta CAPI)
CREATE INDEX IF NOT EXISTS idx_tracking_event_id 
ON tracking_vicente_perpetuo(event_id) 
WHERE event_id IS NOT NULL;

-- Índice para timestamp (consultas por período)
CREATE INDEX IF NOT EXISTS idx_tracking_timestamp 
ON tracking_vicente_perpetuo(timestamp DESC);

-- ============================================================================
-- FUNÇÃO PARA ATUALIZAR updated_at AUTOMATICAMENTE
-- ============================================================================

CREATE OR REPLACE FUNCTION update_tracking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_tracking_updated_at ON tracking_vicente_perpetuo;
CREATE TRIGGER trigger_update_tracking_updated_at
    BEFORE UPDATE ON tracking_vicente_perpetuo
    FOR EACH ROW
    EXECUTE FUNCTION update_tracking_updated_at();

-- ============================================================================
-- COMENTÁRIOS NA TABELA E COLUNAS (Documentação)
-- ============================================================================

COMMENT ON TABLE tracking_vicente_perpetuo IS 
'Tabela de tracking para ETAPA 1 (PageView) - Projeto VICENTE_PERPETUO. 
Otimizada para match futuro com eventos de conversão (ETAPA 2)';

COMMENT ON COLUMN tracking_vicente_perpetuo.email IS 
'Email do usuário - Chave principal para match com ETAPA 2';

COMMENT ON COLUMN tracking_vicente_perpetuo.phone IS 
'Telefone do usuário - Chave secundária para match com ETAPA 2';

COMMENT ON COLUMN tracking_vicente_perpetuo.fbp IS 
'Facebook Browser ID (_fbp cookie) - Crítico para matching com Meta CAPI';

COMMENT ON COLUMN tracking_vicente_perpetuo.fbc IS 
'Facebook Click ID (_fbc cookie) - Crítico para matching com Meta CAPI';

COMMENT ON COLUMN tracking_vicente_perpetuo.event_id IS 
'ID único do evento para deduplicação no Meta CAPI';

COMMENT ON COLUMN tracking_vicente_perpetuo.event_type IS 
'Tipo de evento. Para ETAPA 1: PageView. Para ETAPA 2: Purchase, Lead, FTD, etc.';




