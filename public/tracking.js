// ============================================================================
// CLIENTE-SIDE TRACKING SCRIPT - ETAPA 1 (PageView)
// ============================================================================
// Este script captura dados do usuário e envia para o endpoint server-side
// 
// COMO USAR:
// 1. Adicione este script na sua landing page HTML
// 2. Configure PIXEL_ID e API_ENDPOINT abaixo
// 3. O script será executado automaticamente quando a página carregar
// ============================================================================

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURAÇÃO - ALTERE ESTES VALORES
  // ============================================================================
  const PIXEL_ID = '928212556030144'; // Substitua pelo seu Meta Pixel ID
  const API_ENDPOINT = '/api/track'; // Endpoint da sua API Vercel
  
  // Opcional: Projeto específico (padrão: tracking_vicente_perpetuo)
  const PROJECT_NAME = null; // Deixe null para usar padrão do servidor
  // ============================================================================

  // ============================================================================
  // FUNÇÃO: Obter cookie por nome
  // ============================================================================
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // ============================================================================
  // FUNÇÃO: Obter parâmetro da URL
  // ============================================================================
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // ============================================================================
  // FUNÇÃO: Obter UTM parameters
  // ============================================================================
  function getUTMParameters() {
    return {
      utm_source: getURLParameter('utm_source'),
      utm_medium: getURLParameter('utm_medium'),
      utm_campaign: getURLParameter('utm_campaign'),
      utm_term: getURLParameter('utm_term'),
      utm_content: getURLParameter('utm_content'),
      fbclid: getURLParameter('fbclid'),
      gclid: getURLParameter('gclid'),
    };
  }

  // ============================================================================
  // FUNÇÃO: Obter dados do usuário
  // ============================================================================
  function collectTrackingData() {
    const data = {
      // Cookies do Facebook (CRÍTICOS para match)
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      
      // User Agent
      user_agent: navigator.userAgent,
      
      // URL e Referrer
      page_url: window.location.href,
      referrer: document.referrer || '',
      
      // Idioma
      language: navigator.language || navigator.userLanguage,
      
      // Timestamp
      timestamp: new Date().toISOString(),
      
      // Event Type
      event_type: 'PageView',
    };

    // Adicionar UTMs
    const utms = getUTMParameters();
    Object.assign(data, utms);

    // Se PROJECT_NAME estiver definido, adicionar ao payload
    if (PROJECT_NAME) {
      data.project_name = PROJECT_NAME;
    }

    return data;
  }

  // ============================================================================
  // FUNÇÃO: Enviar dados para server-side
  // ============================================================================
  async function sendTrackingData(data) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Tracking enviado com sucesso:', result);
      } else {
        console.warn('⚠️ Tracking enviado com avisos:', result);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar tracking:', error);
      return { success: false, error: error.message };
    }
  }

  // ============================================================================
  // FUNÇÃO: Inicializar Meta Pixel (Base Code)
  // ============================================================================
  function initMetaPixel() {
    // Evitar duplicação
    if (window.fbq) {
      return;
    }

    // Criar script do Meta Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Criar noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
  }

  // ============================================================================
  // FUNÇÃO: Capturar dados de formulário (quando disponíveis)
  // ============================================================================
  function captureFormData(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    
    // Campos comuns
    const fields = ['email', 'phone', 'first_name', 'last_name', 'date_of_birth', 
                    'city', 'state', 'country', 'zip_code'];
    
    fields.forEach(field => {
      const value = formData.get(field) || formData.get(field.toLowerCase()) || 
                    formData.get(field.replace('_', '-'));
      if (value) {
        data[field] = value;
      }
    });
    
    return Object.keys(data).length > 0 ? data : null;
  }

  // ============================================================================
  // FUNÇÃO: Atualizar tracking quando dados do usuário estiverem disponíveis
  // ============================================================================
  function updateTrackingWithUserData(userData) {
    const trackingData = collectTrackingData();
    const completeData = { ...trackingData, ...userData };
    sendTrackingData(completeData);
  }

  // ============================================================================
  // INICIALIZAÇÃO AUTOMÁTICA
  // ============================================================================
  
  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Inicializar Meta Pixel
    initMetaPixel();
    
    // Enviar PageView inicial (sem dados do usuário ainda)
    const initialData = collectTrackingData();
    sendTrackingData(initialData);
    
    // Observar formulários para capturar dados quando preenchidos
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const formData = captureFormData(form);
        if (formData) {
          updateTrackingWithUserData(formData);
        }
      });
    });
  }

  // ============================================================================
  // EXPORTAR FUNÇÕES PÚBLICAS (para uso manual se necessário)
  // ============================================================================
  window.tracking = {
    send: sendTrackingData,
    update: updateTrackingWithUserData,
    collect: collectTrackingData,
  };

})();




