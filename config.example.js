/**
 * Plantilla segura de configuración - Sistema CMG
 *
 * INSTRUCCIONES:
 * 1) Copia este archivo a 'config.js' o, preferiblemente, configura variables de entorno.
 * 2) NO subas config.js con valores reales al repositorio.
 * 3) En producción usa un secret manager o variables de entorno.
 */

// Configuración de Google Sheets / Apps Script
const CONFIG_GOOGLE_SHEETS = {
  // URL del Web App (si usas Apps Script). Mejor usar un servicio autenticado.
  SCRIPT_URL: typeof process !== 'undefined' ? (process.env.GS_SCRIPT_URL || 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec') : 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec',
  SPREADSHEET_ID: typeof process !== 'undefined' ? (process.env.GS_SPREADSHEET_ID || 'TU_SPREADSHEET_ID') : 'TU_SPREADSHEET_ID',
  TIMEOUT: Number(typeof process !== 'undefined' ? (process.env.GS_TIMEOUT_MS || 10000) : 10000),
  MAX_RETRIES: Number(typeof process !== 'undefined' ? (process.env.GS_MAX_RETRIES || 3) : 3)
};

// Usuarios: solo identificadores y roles. No incluyas contraseñas en claro.
// En producción mantén usuarios y contraseñas hashed en el servidor o en una DB.
const CONFIG_USUARIOS = [
  // Ejemplo de estructura; NO poner contraseñas en claro aquí.
  // {
  //   id: 1,
  //   usuario: 'admin',
  //   nombre: 'Cris',
  //   // contrasena: '***'  <-- NO usar
  //   rol: 'ADMINISTRADOR',
  //   activo: true,
  //   fechaCreacion: '2025-01-01'
  // }
];

// Exportar (si se usa bundler/node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG_GOOGLE_SHEETS,
    CONFIG_USUARIOS
  };
}
