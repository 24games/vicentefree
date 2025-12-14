/**
 * Configuração de Links de Campanhas
 * 
 * WhatsApp: Link FIXO para todas as páginas
 * Telegram: Link DINÂMICO baseado na slug da URL
 */

// ============================================
// WHATSAPP - LINK FIXO (NÃO MUDA POR SLUG)
// ============================================
export const WHATSAPP_LINK = 'https://wa.me/message/OFJTC6W4P25EA1';

// ============================================
// TELEGRAM - LINKS DINÂMICOS POR SLUG
// ============================================
export const TELEGRAM_LINKS = {
  'cr1-a3f1': 'https://t.me/vicentetipstertelegrambot?start=w48123852',
  'cr2-a3f1': 'https://t.me/vicentetipstertelegrambot?start=w48123854',
  'cr3-a3f1': 'https://t.me/vicentetipstertelegrambot?start=w48123856',
};

// Link padrão (fallback) - usa o mesmo do cr1-a3f1
export const DEFAULT_TELEGRAM_LINK = TELEGRAM_LINKS['cr1-a3f1'];

// ============================================
// FUNÇÃO HELPER PARA OBTER LINK DO TELEGRAM
// ============================================
/**
 * Retorna o link do Telegram baseado na slug
 * @param {string} slug - A slug da URL (ex: 'cr1-a3f1')
 * @returns {string} - O link do Telegram correspondente ou o default
 */
export function getTelegramLink(slug) {
  return TELEGRAM_LINKS[slug] || DEFAULT_TELEGRAM_LINK;
}

// ============================================
// LISTA DE SLUGS VÁLIDAS (para validação)
// ============================================
export const VALID_SLUGS = Object.keys(TELEGRAM_LINKS);

/**
 * Verifica se uma slug é válida
 * @param {string} slug - A slug para verificar
 * @returns {boolean} - true se a slug existe no mapeamento
 */
export function isValidSlug(slug) {
  return VALID_SLUGS.includes(slug);
}


