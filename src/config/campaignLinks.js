/**
 * Configuração de Links de Campanhas
 * 
 * WhatsApp: Link FIXO e ÚNICO para todas as páginas
 * 
 * IMPORTANTE: O link do WhatsApp não muda baseado na slug.
 * Todas as slugs permitidas usam o mesmo link do WhatsApp.
 */

// ============================================
// WHATSAPP - LINK FIXO E ÚNICO
// ============================================
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/I7QZyc64ZHYIaCNvQMMnTs';

// ============================================
// LISTA DE SLUGS VÁLIDAS
// ============================================
export const VALID_SLUGS = [
  'cr1-a1f1',
  'cr2-a1f1',
  'cr3-a1f1',
  'cr1-a1f2',
  'cr2-a1f2',
  'cr3-a1f2',
  'cr1-a3f1',
  'cr2-a3f1',
  'cr3-a3f1',
  'cr1-a3f2',
  'cr2-a3f2',
  'cr3-a3f2',
  'a6f2',
  'cr1a7f1',
  'cr2a7f1',
  'cr3a7f1',
];

/**
 * Verifica se uma slug é válida
 * @param {string} slug - A slug para verificar
 * @returns {boolean} - true se a slug está na lista de slugs permitidas
 */
export function isValidSlug(slug) {
  return VALID_SLUGS.includes(slug);
}





