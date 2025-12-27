/**
 * PLANTILLA DE CONFIGURACIÓN - Sistema CMG
 *
 * 📋 INSTRUCCIONES:
 * 1. Copia este archivo y renómbralo a 'config.js'
 * 2. Modifica los valores según tu entorno
 * 3. Asegúrate de que config.js esté en .gitignore
 * 4. NUNCA subas config.js al repositorio
 *
 * Comando: cp config.example.js config.js
 */

// ========== CONFIGURACIÓN DE GOOGLE SHEETS ==========
const CONFIG_GOOGLE_SHEETS = {
    // URL de tu Google Apps Script
    // Para obtenerla:
    // 1. Ve a https://script.google.com
    // 2. Abre tu proyecto
    // 3. Click en "Implementar" > "Nueva implementación"
    // 4. Copia la URL del Web App
    SCRIPT_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec',

    // ID de tu Google Spreadsheet (opcional)
    // Formato: 1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T
    SPREADSHEET_ID: 'TU_SPREADSHEET_ID_AQUI',

    // Configuración de timeout para requests (milisegundos)
    TIMEOUT: 10000, // 10 segundos

    // Reintentos en caso de error
    MAX_RETRIES: 3
};

// ========== CREDENCIALES DE USUARIOS ==========
// ⚠️ CRÍTICO: DEBES cambiar TODAS las contraseñas en producción
// ⚠️ NUNCA uses las contraseñas de ejemplo en un entorno real
// ⚠️ Las contraseñas aquí son solo EJEMPLOS de formato seguro
//
// RECOMENDACIONES DE SEGURIDAD:
// - Mínimo 12 caracteres
// - Combinar mayúsculas, minúsculas, números y símbolos
// - No usar palabras del diccionario
// - Cambiar periódicamente
const CONFIG_USUARIOS = [
    {
        id: 1,
        usuario: 'admin',
        nombre: 'Cris',
        contrasena: 'Qaswed12@1', // ⚠️ EJEMPLO - Usa tu propia contraseña segura
        rol: 'ADMINISTRADOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 2,
        usuario: 'cajero1',
        nombre: 'Edd',
        contrasena: 'Qaswed12', // ⚠️ EJEMPLO - Usa tu propia contraseña segura
        rol: 'CAJERO',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 3,
        usuario: 'supervisor1',
        nombre: 'Edd',
        contrasena: 'SuperCool', // ⚠️ EJEMPLO - Usa tu propia contraseña segura
        rol: 'SUPERVISOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 4,
        usuario: 'auditor1',
        nombre: 'Auditor',
        contrasena: 'Auditor$SecureKey24', // ⚠️ EJEMPLO - Usa tu propia contraseña segura
        rol: 'AUDITOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    }
];

// ========== CONFIGURACIÓN GENERAL DEL SISTEMA ==========
const CONFIG_SISTEMA = {
    // Nombre del sistema
    NOMBRE: 'Sistema CMG',
    VERSION: '2.2',

    // Configuración de sesión (en milisegundos)
    SESION_DURACION: 24 * 60 * 60 * 1000, // 24 horas

    // Configuración de auditoría
    MAX_REGISTROS_AUDITORIA: 1000,

    // Configuración de caché
    CACHE_DURACION: 5 * 60 * 1000, // 5 minutos

    // Configuración de sincronización con Google Sheets
    SYNC_ENABLED: true, // Activar/desactivar sincronización
    SYNC_AUTO: false, // Sincronización automática (requiere SYNC_ENABLED: true)
    SYNC_INTERVAL: 30 * 60 * 1000 // Intervalo de sincronización (30 minutos)
};

// ========== CONFIGURACIÓN DE UI ==========
const CONFIG_UI = {
    // Colores del tema (formato hexadecimal)
    COLOR_PRIMARY: '#667eea',
    COLOR_SECONDARY: '#764ba2',
    COLOR_SUCCESS: '#28a745',
    COLOR_DANGER: '#dc3545',
    COLOR_WARNING: '#ffc107',
    COLOR_INFO: '#17a2b8',

    // Configuración de tablas
    ITEMS_PER_PAGE: 50,

    // Duración de animaciones (milisegundos)
    ANIMATION_DURATION: 300
};

// ========== EXPORTAR CONFIGURACIONES ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG_GOOGLE_SHEETS,
        CONFIG_USUARIOS,
        CONFIG_SISTEMA,
        CONFIG_UI
    };
}
