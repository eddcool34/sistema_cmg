/**
 * CONSTANTES DEL SISTEMA - Sistema CMG
 *
 * Centralización de todas las constantes del sistema para:
 * ✅ Evitar duplicación
 * ✅ Facilitar mantenimiento
 * ✅ Mejorar búsqueda y referencia
 * ✅ Consistencia en toda la aplicación
 *
 * @version 1.0
 * @date 2025-01-23
 */

// ========== CONSTANTES DE NEGOCIO ==========

/**
 * Catálogo de paqueterías disponibles
 */
const PAQUETERIAS = {
    FEDEX: 'FedEx',
    DHL: 'DHL',
    ESTAFETA: 'Estafeta',
    PAQUETEXPRESS: 'Paquetexpress',
    REDPACK: 'Redpack',
    TRESGUERRAS: '3Guerras',
    JT: 'J&T',
    OTRO: 'Otro'
};

/**
 * Tipos de operación disponibles
 */
const TIPOS_OPERACION = {
    ENVIO: 'envio',
    RECEPCION: 'recepcion',
    SERVICIO: 'servicio'
};

/**
 * Estados de venta
 */
const ESTADOS_VENTA = {
    PENDIENTE: 'pendiente',
    ENTREGADA: 'entregada',
    CANCELADA: 'cancelada',
    EN_TRANSITO: 'en_transito'
};

/**
 * Tipos de pago
 */
const TIPOS_PAGO = {
    EFECTIVO: 'efectivo',
    TARJETA: 'tarjeta',
    TRANSFERENCIA: 'transferencia',
    MIXTO: 'mixto'
};

/**
 * Denominaciones de billetes mexicanos
 */
const DENOMINACIONES_MXN = {
    1000: 1000,
    500: 500,
    200: 200,
    100: 100,
    50: 50,
    20: 20,
    10: 10,
    5: 5,
    2: 2,
    1: 1,
    0.50: 0.50
};

/**
 * Denominaciones principales para cierre de caja
 */
const DENOMINACIONES_PRINCIPALES = {
    1000: 'Billetes de $1000',
    500: 'Billetes de $500',
    200: 'Billetes de $200',
    100: 'Billetes de $100',
    50: 'Billetes de $50',
    20: 'Billetes de $20'
};

// ========== CONSTANTES DE PRECIOS Y COMISIONES ==========

/**
 * Precio fijo de entregas (actualización 2025-01-23)
 */
const PRECIO_ENTREGA_FIJO = 10.00;

/**
 * Tasas de comisión por tipo de operación (%)
 */
const TASAS_COMISION = {
    ENVIO: 0.10,        // 10%
    RECEPCION: 0.10,    // 10%
    SERVICIO: 0.15      // 15%
};

/**
 * IVA (Impuesto al Valor Agregado)
 */
const IVA = 0.16; // 16%

// ========== CONSTANTES DE VALIDACIÓN ==========

/**
 * Límites de caracteres para campos
 */
const LIMITES_CARACTERES = {
    NOMBRE_MIN: 2,
    NOMBRE_MAX: 100,
    TELEFONO_MIN: 10,
    TELEFONO_MAX: 15,
    DIRECCION_MAX: 200,
    NOTAS_MAX: 500,
    CONCEPTO_MAX: 100
};

/**
 * Expresiones regulares para validación
 */
const REGEX_VALIDACION = {
    // Teléfono mexicano: 10 dígitos, opcionalmente con lada +52
    TELEFONO: /^(\+?52)?[1-9]\d{9}$/,

    // Email estándar
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Solo números
    SOLO_NUMEROS: /^\d+$/,

    // Números decimales (precio, peso)
    DECIMAL: /^\d+(\.\d{1,2})?$/,

    // Alfanumérico con espacios
    ALFANUMERICO: /^[a-zA-Z0-9\s]+$/,

    // Solo letras con espacios
    SOLO_LETRAS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
};

// ========== CONSTANTES DE SISTEMA ==========

/**
 * Keys de localStorage
 */
const STORAGE_KEYS = {
    VENTAS: 'ventas',
    CLIENTES: 'clientes',
    GASTOS: 'gastos',
    TURNOS: 'turnos',
    TURNO_ACTUAL: 'turnoActual',
    SESION: 'sesion_cmg',
    AUDITORIA: 'auditoria_cmg',
    USUARIOS: 'usuarios_cmg',
    CONFIGURACION: 'config_cmg',
    BACKUP_HISTORY: 'backup_history',
    ULTIMO_BACKUP: 'ultimo_backup',
    CACHE_PREFIX: 'cache_'
};

/**
 * Códigos de color por tipo de operación
 */
const COLORES_OPERACION = {
    ENVIO: '#3b82f6',      // Azul
    RECEPCION: '#10b981',  // Verde
    SERVICIO: '#f59e0b'    // Amarillo/Naranja
};

/**
 * Iconos por tipo de operación (Font Awesome)
 */
const ICONOS_OPERACION = {
    ENVIO: 'fa-paper-plane',
    RECEPCION: 'fa-box',
    SERVICIO: 'fa-tools'
};

// ========== CONSTANTES DE TIEMPO ==========

/**
 * Intervalos de tiempo en milisegundos
 */
const TIEMPO = {
    SEGUNDO: 1000,
    MINUTO: 60 * 1000,
    HORA: 60 * 60 * 1000,
    DIA: 24 * 60 * 60 * 1000,
    SEMANA: 7 * 24 * 60 * 60 * 1000,
    MES: 30 * 24 * 60 * 60 * 1000
};

/**
 * Configuración de timeouts para operaciones
 */
const TIMEOUTS = {
    NOTIFICACION: 3000,        // 3 segundos
    DEBOUNCE_BUSQUEDA: 300,    // 300ms
    AUTOSAVE: 30000,           // 30 segundos
    SYNC_CHECK: 60000          // 1 minuto
};

// ========== CONSTANTES DE INTERFAZ ==========

/**
 * Mensajes de notificación estándar
 */
const MENSAJES = {
    // Éxito
    VENTA_GUARDADA: '✅ Venta registrada exitosamente',
    ENTREGA_REGISTRADA: '✅ Entrega registrada',
    TURNO_ABIERTO: '✅ Turno abierto correctamente',
    TURNO_CERRADO: '✅ Turno cerrado. Balance guardado',
    DATOS_EXPORTADOS: '✅ Datos exportados correctamente',
    SINCRONIZADO: '✅ Sincronizado con Google Sheets',

    // Error
    ERROR_CAMPOS_VACIOS: '❌ Completa todos los campos obligatorios',
    ERROR_FORMATO_TELEFONO: '❌ Formato de teléfono inválido',
    ERROR_MONTO_INVALIDO: '❌ El monto debe ser mayor a 0',
    ERROR_SIN_TURNO: '❌ Debes abrir un turno primero',
    ERROR_CONTRASEÑA: '❌ Contraseña incorrecta',
    ERROR_SINCRONIZACION: '❌ Error al sincronizar con Google Sheets',
    ERROR_CONEXION: '❌ Error de conexión. Intenta nuevamente',

    // Advertencia
    WARN_TURNO_ABIERTO: '⚠️ Ya hay un turno abierto',
    WARN_SIN_VENTAS: '⚠️ No hay ventas para exportar',
    WARN_DATOS_INCOMPLETOS: '⚠️ Algunos datos están incompletos',

    // Información
    INFO_CARGANDO: '⏳ Cargando datos...',
    INFO_PROCESANDO: '⏳ Procesando...',
    INFO_SINCRONIZANDO: '🔄 Sincronizando...'
};

/**
 * Títulos de pestañas
 */
const TABS = {
    REGISTRO: 'registro',
    VENTAS: 'ventas',
    ENTREGAS: 'entregas',
    BALANCE: 'balance',
    CORTES: 'cortes',
    REPORTES: 'reportes',
    CONFIGURACION: 'configuracion'
};

/**
 * Nombres de meses en español
 */
const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Días de la semana en español
 */
const DIAS_SEMANA = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// ========== CONSTANTES DE CONFIGURACIÓN POR DEFECTO ==========

/**
 * Valores por defecto para configuración
 */
const DEFAULTS = {
    ITEMS_POR_PAGINA: 50,
    REGISTROS_AUDITORIA_MAX: 1000,
    DURACION_SESION: TIEMPO.DIA,
    BACKUP_FRECUENCIA: TIEMPO.DIA,
    MONEDA_SIMBOLO: '$',
    MONEDA_CODIGO: 'MXN',
    DECIMALES_MONEDA: 2
};

// ========== EXPORTAR CONSTANTES ==========

// Exportar para uso en módulos Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PAQUETERIAS,
        TIPOS_OPERACION,
        ESTADOS_VENTA,
        TIPOS_PAGO,
        DENOMINACIONES_MXN,
        DENOMINACIONES_PRINCIPALES,
        PRECIO_ENTREGA_FIJO,
        TASAS_COMISION,
        IVA,
        LIMITES_CARACTERES,
        REGEX_VALIDACION,
        STORAGE_KEYS,
        COLORES_OPERACION,
        ICONOS_OPERACION,
        TIEMPO,
        TIMEOUTS,
        MENSAJES,
        TABS,
        MESES,
        DIAS_SEMANA,
        DEFAULTS
    };
}

// Hacer disponibles globalmente para uso en navegador
if (typeof window !== 'undefined') {
    window.CONSTANTES = {
        PAQUETERIAS,
        TIPOS_OPERACION,
        ESTADOS_VENTA,
        TIPOS_PAGO,
        DENOMINACIONES_MXN,
        DENOMINACIONES_PRINCIPALES,
        PRECIO_ENTREGA_FIJO,
        TASAS_COMISION,
        IVA,
        LIMITES_CARACTERES,
        REGEX_VALIDACION,
        STORAGE_KEYS,
        COLORES_OPERACION,
        ICONOS_OPERACION,
        TIEMPO,
        TIMEOUTS,
        MENSAJES,
        TABS,
        MESES,
        DIAS_SEMANA,
        DEFAULTS
    };
}
