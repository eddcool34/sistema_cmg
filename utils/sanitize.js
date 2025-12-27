/**
 * escapeHTML - Escapa caracteres HTML especiales en cadenas para evitar XSS
 * Uso: const safe = escapeHTML(unsafeString);
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Export (CommonJS / Browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { escapeHTML };
} else {
  window.escapeHTML = escapeHTML;
}
