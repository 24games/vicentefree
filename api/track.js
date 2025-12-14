// ============================================================================
// API ROUTE: Server-Side Tracking (Meta CAPI + Supabase) - ETAPA 1
// ============================================================================
// Endpoint: POST /api/track
// 
// Recebe dados do cliente-side, salva no Supabase e envia para Meta CAPI
// ============================================================================

import { createClient } from '@supabase/supabase-js';

// ============================================================================
// CONFIGURAÇÃO - VARIÁVEIS DE AMBIENTE
// ============================================================================
// Configure estas variáveis no dashboard da Vercel:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY
// - META_PIXEL_ID
// - META_ACCESS_TOKEN
// - TRACKING_TABLE_NAME (opcional, padrão: tracking_vicente_perpetuo)
// ============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const META_PIXEL_ID = process.env.META_PIXEL_ID || '928212556030144';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const TRACKING_TABLE_NAME = process.env.TRACKING_TABLE_NAME || 'tracking_vicente_perpetuo';

// Inicializar cliente Supabase (usa Service Role Key para bypass RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ============================================================================
// FUNÇÃO: Extrair IP real do cliente
// ============================================================================
function getClientIP(req) {
  // Vercel passa o IP real via header
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return req.socket.remoteAddress || 'unknown';
}

// ============================================================================
// FUNÇÃO: Gerar Event ID único para deduplicação
// ============================================================================
function generateEventID(data) {
  // Usa timestamp + hash simples para garantir unicidade
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const userHash = data.email || data.phone || data.fbp || 'anonymous';
  return `${timestamp}_${random}_${Buffer.from(userHash).toString('base64').substring(0, 8)}`;
}

// ============================================================================
// FUNÇÃO: Enviar evento para Meta Conversion API
// ============================================================================
async function sendToMetaCAPI(data, clientIP) {
  try {
    const eventID = data.event_id || generateEventID(data);
    
    // Construir payload para Meta CAPI
    const payload = {
      data: [
        {
          event_name: 'PageView',
          event_time: Math.floor(new Date(data.timestamp || Date.now()).getTime() / 1000),
          event_id: eventID,
          event_source_url: data.page_url || '',
          action_source: 'website',
          
          // User Data (hashed/normalized)
          user_data: {
            em: data.email ? [hashSHA256(data.email.toLowerCase().trim())] : undefined,
            ph: data.phone ? [hashSHA256(normalizePhone(data.phone))] : undefined,
            fn: data.first_name ? [hashSHA256(data.first_name.toLowerCase().trim())] : undefined,
            ln: data.last_name ? [hashSHA256(data.last_name.toLowerCase().trim())] : undefined,
            ct: data.city ? [hashSHA256(data.city.toLowerCase().trim())] : undefined,
            st: data.state ? [hashSHA256(data.state.toLowerCase().trim())] : undefined,
            country: data.country ? [data.country.toUpperCase()] : undefined,
            zp: data.zip_code ? [hashSHA256(data.zip_code.replace(/\s+/g, ''))] : undefined,
            external_id: [hashSHA256(eventID)],
            client_ip_address: clientIP,
            client_user_agent: data.user_agent || '',
            fbp: data.fbp || undefined,
            fbc: data.fbc || undefined,
          },
          
          // Custom Data
          custom_data: {
            content_name: data.page_url || '',
            content_category: 'landing_page',
            utm_source: data.utm_source || undefined,
            utm_medium: data.utm_medium || undefined,
            utm_campaign: data.utm_campaign || undefined,
            utm_term: data.utm_term || undefined,
            utm_content: data.utm_content || undefined,
          },
        },
      ],
      access_token: META_ACCESS_TOKEN,
    };

    // Remover campos undefined do payload
    cleanPayload(payload);

    // Enviar para Meta CAPI
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    return {
      success: response.ok,
      event_id: eventID,
      response: result,
      error: response.ok ? null : result.error || 'Unknown error',
    };
  } catch (error) {
    return {
      success: false,
      event_id: data.event_id || generateEventID(data),
      response: null,
      error: error.message || 'Failed to send to Meta CAPI',
    };
  }
}

// ============================================================================
// FUNÇÃO: Hash SHA256 (requer crypto nativo do Node.js)
// ============================================================================
function hashSHA256(value) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(value).digest('hex');
}

// ============================================================================
// FUNÇÃO: Normalizar telefone (remover caracteres não numéricos)
// ============================================================================
function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

// ============================================================================
// FUNÇÃO: Limpar payload removendo campos undefined
// ============================================================================
function cleanPayload(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(item => cleanPayload(item));
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        cleanPayload(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    });
  }
}

// ============================================================================
// HANDLER PRINCIPAL
// ============================================================================
export default async function handler(req, res) {
  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validar configuração
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase configuration missing');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Extrair dados do body
    const trackingData = req.body;
    
    // Extrair IP real
    const clientIP = getClientIP(req);
    
    // Adicionar IP do servidor se não fornecido
    if (!trackingData.ip || trackingData.ip === 'unknown') {
      trackingData.ip = clientIP;
    }

    // Gerar event_id se não fornecido
    if (!trackingData.event_id) {
      trackingData.event_id = generateEventID(trackingData);
    }

    // Garantir timestamp
    if (!trackingData.timestamp) {
      trackingData.timestamp = new Date().toISOString();
    }

    // Enviar para Meta CAPI primeiro (não bloqueia resposta)
    const metaResult = await sendToMetaCAPI(trackingData, clientIP);

    // Preparar dados para Supabase
    const dbData = {
      ...trackingData,
      sent_to_meta: metaResult.success,
      meta_response: metaResult.response,
      error_message: metaResult.error || null,
    };

    // Salvar no Supabase
    const { data: dbResult, error: dbError } = await supabase
      .from(TRACKING_TABLE_NAME)
      .insert([dbData])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      // Ainda retornar sucesso se Meta CAPI funcionou
      if (metaResult.success) {
        return res.status(200).json({
          success: true,
          meta: metaResult,
          database: { error: dbError.message },
          warning: 'Data saved to Meta but failed to save to database',
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Failed to save tracking data',
        details: dbError.message,
      });
    }

    // Sucesso completo
    return res.status(200).json({
      success: true,
      event_id: trackingData.event_id,
      meta: metaResult,
      database: { id: dbResult.id },
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}


