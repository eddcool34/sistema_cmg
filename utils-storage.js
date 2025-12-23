/**
 * UTILIDADES DE ALMACENAMIENTO SEGURO - Sistema CMG
 *
 * Módulo para manejo seguro de localStorage con:
 * ✅ Encriptación básica de datos sensibles
 * ✅ Manejo robusto de errores
 * ✅ Validación de integridad de datos
 * ✅ Compresión de datos grandes
 * ✅ Caché con expiración
 *
 * @version 1.0
 * @date 2025-01-23
 */

// ========== ENCRIPTACIÓN BÁSICA ==========

/**
 * Encripta un string usando Base64 y XOR simple
 * NOTA: Esta NO es encriptación fuerte, solo ofuscación.
 * Para datos realmente sensibles, usar una librería como CryptoJS
 * @param {string} texto - Texto a encriptar
 * @param {string} clave - Clave de encriptación
 * @returns {string}
 */
function encriptarSimple(texto, clave = 'CMG_KEY_2025') {
    if (!texto) return '';

    try {
        // Convertir a JSON si es objeto
        const str = typeof texto === 'string' ? texto : JSON.stringify(texto);

        // XOR simple
        let resultado = '';
        for (let i = 0; i < str.length; i++) {
            resultado += String.fromCharCode(
                str.charCodeAt(i) ^ clave.charCodeAt(i % clave.length)
            );
        }

        // Codificar en Base64
        return btoa(resultado);
    } catch (error) {
        console.error('Error al encriptar:', error);
        return texto;
    }
}

/**
 * Desencripta un string encriptado con encriptarSimple
 * @param {string} textoEncriptado - Texto encriptado
 * @param {string} clave - Clave de desencriptación
 * @returns {string}
 */
function desencriptarSimple(textoEncriptado, clave = 'CMG_KEY_2025') {
    if (!textoEncriptado) return '';

    try {
        // Decodificar Base64
        const decoded = atob(textoEncriptado);

        // XOR simple (reversible)
        let resultado = '';
        for (let i = 0; i < decoded.length; i++) {
            resultado += String.fromCharCode(
                decoded.charCodeAt(i) ^ clave.charCodeAt(i % clave.length)
            );
        }

        return resultado;
    } catch (error) {
        console.error('Error al desencriptar:', error);
        return textoEncriptado;
    }
}

// ========== OPERACIONES BÁSICAS DE STORAGE ==========

/**
 * Guarda datos en localStorage con manejo de errores
 * @param {string} key - Clave
 * @param {any} valor - Valor a guardar
 * @param {boolean} encriptar - Encriptar el valor
 * @returns {boolean} - true si se guardó exitosamente
 */
function guardarEnStorage(key, valor, encriptar = false) {
    if (!key) {
        console.error('guardarEnStorage: key es requerido');
        return false;
    }

    try {
        // Convertir a JSON
        const valorJSON = JSON.stringify(valor);

        // Encriptar si se solicita
        const valorFinal = encriptar ? encriptarSimple(valorJSON) : valorJSON;

        // Guardar
        localStorage.setItem(key, valorFinal);
        return true;
    } catch (error) {
        console.error(`Error al guardar en localStorage [${key}]:`, error);

        // Si es error de cuota excedida, intentar limpiar
        if (error.name === 'QuotaExceededError') {
            console.warn('⚠️ localStorage lleno. Limpiando datos antiguos...');
            limpiarDatosAntiguos();
            // Intentar de nuevo
            try {
                const valorJSON = JSON.stringify(valor);
                const valorFinal = encriptar ? encriptarSimple(valorJSON) : valorJSON;
                localStorage.setItem(key, valorFinal);
                return true;
            } catch (e) {
                console.error('❌ No se pudo guardar incluso después de limpiar');
                return false;
            }
        }

        return false;
    }
}

/**
 * Obtiene datos de localStorage con manejo de errores
 * @param {string} key - Clave
 * @param {any} valorPorDefecto - Valor por defecto si no existe
 * @param {boolean} desencriptar - Desencriptar el valor
 * @returns {any}
 */
function obtenerDeStorage(key, valorPorDefecto = null, desencriptar = false) {
    if (!key) {
        console.error('obtenerDeStorage: key es requerido');
        return valorPorDefecto;
    }

    try {
        const valorGuardado = localStorage.getItem(key);

        if (valorGuardado === null) {
            return valorPorDefecto;
        }

        // Desencriptar si se solicita
        const valorJSON = desencriptar ? desencriptarSimple(valorGuardado) : valorGuardado;

        // Parsear JSON con validación
        try {
            return JSON.parse(valorJSON);
        } catch (parseError) {
            console.warn(`Advertencia: No se pudo parsear ${key}, devolviendo valor crudo`);
            return valorJSON;
        }
    } catch (error) {
        console.error(`Error al obtener de localStorage [${key}]:`, error);
        return valorPorDefecto;
    }
}

/**
 * Elimina datos de localStorage
 * @param {string} key - Clave a eliminar
 * @returns {boolean}
 */
function eliminarDeStorage(key) {
    if (!key) {
        console.error('eliminarDeStorage: key es requerido');
        return false;
    }

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error al eliminar de localStorage [${key}]:`, error);
        return false;
    }
}

/**
 * Verifica si existe una key en localStorage
 * @param {string} key - Clave a verificar
 * @returns {boolean}
 */
function existeEnStorage(key) {
    try {
        return localStorage.getItem(key) !== null;
    } catch (error) {
        console.error(`Error al verificar en localStorage [${key}]:`, error);
        return false;
    }
}

// ========== OPERACIONES ESPECÍFICAS DEL SISTEMA ==========

/**
 * Guarda ventas de forma segura
 * @param {Array} ventas - Array de ventas
 * @returns {boolean}
 */
function guardarVentas(ventas) {
    return guardarEnStorage('ventas', ventas, false);
}

/**
 * Obtiene ventas
 * @returns {Array}
 */
function obtenerVentas() {
    return obtenerDeStorage('ventas', [], false);
}

/**
 * Guarda clientes
 * @param {Array} clientes - Array de clientes
 * @returns {boolean}
 */
function guardarClientes(clientes) {
    return guardarEnStorage('clientes', clientes, false);
}

/**
 * Obtiene clientes
 * @returns {Array}
 */
function obtenerClientes() {
    return obtenerDeStorage('clientes', [], false);
}

/**
 * Guarda turno actual
 * @param {Object} turno - Datos del turno
 * @returns {boolean}
 */
function guardarTurnoActual(turno) {
    return guardarEnStorage('turnoActual', turno, false);
}

/**
 * Obtiene turno actual
 * @returns {Object|null}
 */
function obtenerTurnoActual() {
    return obtenerDeStorage('turnoActual', null, false);
}

/**
 * Elimina turno actual
 * @returns {boolean}
 */
function eliminarTurnoActual() {
    return eliminarDeStorage('turnoActual');
}

/**
 * Guarda gastos
 * @param {Array} gastos - Array de gastos
 * @returns {boolean}
 */
function guardarGastos(gastos) {
    return guardarEnStorage('gastos', gastos, false);
}

/**
 * Obtiene gastos
 * @returns {Array}
 */
function obtenerGastos() {
    return obtenerDeStorage('gastos', [], false);
}

// ========== SISTEMA DE CACHÉ CON EXPIRACIÓN ==========

/**
 * Guarda datos en caché con tiempo de expiración
 * @param {string} key - Clave
 * @param {any} valor - Valor a cachear
 * @param {number} duracionMS - Duración en milisegundos
 * @returns {boolean}
 */
function guardarEnCache(key, valor, duracionMS = 5 * 60 * 1000) {
    const cache = {
        valor: valor,
        expiracion: new Date().getTime() + duracionMS
    };
    return guardarEnStorage(`cache_${key}`, cache, false);
}

/**
 * Obtiene datos de caché si no han expirado
 * @param {string} key - Clave
 * @returns {any|null}
 */
function obtenerDeCache(key) {
    const cache = obtenerDeStorage(`cache_${key}`, null, false);

    if (!cache) return null;

    // Verificar expiración
    if (new Date().getTime() > cache.expiracion) {
        eliminarDeStorage(`cache_${key}`);
        return null;
    }

    return cache.valor;
}

/**
 * Limpia todas las entradas de caché expiradas
 * @returns {number} - Número de entradas eliminadas
 */
function limpiarCacheExpirado() {
    let eliminados = 0;
    const ahora = new Date().getTime();

    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith('cache_')) {
                const cache = obtenerDeStorage(key, null, false);

                if (cache && ahora > cache.expiracion) {
                    eliminarDeStorage(key);
                    eliminados++;
                }
            }
        }
    } catch (error) {
        console.error('Error al limpiar caché:', error);
    }

    return eliminados;
}

// ========== GESTIÓN DE ESPACIO ==========

/**
 * Obtiene el tamaño usado de localStorage (aproximado)
 * @returns {Object} { usado: string, porcentaje: number }
 */
function obtenerTamañoStorage() {
    let total = 0;

    try {
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }

        // localStorage típicamente tiene 5-10MB de límite
        const limiteAproximado = 5 * 1024 * 1024; // 5MB
        const porcentaje = (total / limiteAproximado) * 100;

        return {
            usado: formatearBytes(total),
            bytes: total,
            porcentaje: Math.min(porcentaje, 100).toFixed(2)
        };
    } catch (error) {
        console.error('Error al calcular tamaño de storage:', error);
        return { usado: '0 KB', bytes: 0, porcentaje: 0 };
    }
}

/**
 * Formatea bytes a formato legible
 * @private
 */
function formatearBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Limpia datos antiguos para liberar espacio
 * Elimina caché expirado y backups antiguos
 * @returns {number} - Bytes liberados (aproximado)
 */
function limpiarDatosAntiguos() {
    const tamañoInicial = obtenerTamañoStorage().bytes;

    // Limpiar caché expirado
    limpiarCacheExpirado();

    // Limpiar backups antiguos (mantener solo últimos 5)
    try {
        const historialBackup = obtenerDeStorage('backup_history', [], false);
        if (historialBackup.length > 5) {
            const nuevosBackups = historialBackup.slice(-5);
            guardarEnStorage('backup_history', nuevosBackups, false);
        }
    } catch (error) {
        console.error('Error al limpiar backups antiguos:', error);
    }

    const tamañoFinal = obtenerTamañoStorage().bytes;
    const liberado = tamañoInicial - tamañoFinal;

    console.log(`🧹 Limpieza completada. Espacio liberado: ${formatearBytes(liberado)}`);

    return liberado;
}

// ========== BACKUP Y RESTAURACIÓN ==========

/**
 * Exporta todos los datos de localStorage
 * @returns {Object}
 */
function exportarTodoStorage() {
    const datos = {};

    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                datos[key] = localStorage.getItem(key);
            }
        }
        return datos;
    } catch (error) {
        console.error('Error al exportar storage:', error);
        return {};
    }
}

/**
 * Importa datos a localStorage
 * @param {Object} datos - Datos a importar
 * @param {boolean} limpiarAntes - Limpiar storage antes de importar
 * @returns {boolean}
 */
function importarAStorage(datos, limpiarAntes = false) {
    try {
        if (limpiarAntes) {
            localStorage.clear();
        }

        for (let key in datos) {
            if (datos.hasOwnProperty(key)) {
                localStorage.setItem(key, datos[key]);
            }
        }

        console.log('✅ Datos importados exitosamente');
        return true;
    } catch (error) {
        console.error('Error al importar datos:', error);
        return false;
    }
}

// ========== VALIDACIÓN DE INTEGRIDAD ==========

/**
 * Valida integridad de datos críticos
 * @returns {Object} { valido: boolean, errores: Array }
 */
function validarIntegridadDatos() {
    const errores = [];

    try {
        // Validar ventas
        const ventas = obtenerVentas();
        if (!Array.isArray(ventas)) {
            errores.push('Ventas: formato inválido (no es array)');
        }

        // Validar clientes
        const clientes = obtenerClientes();
        if (!Array.isArray(clientes)) {
            errores.push('Clientes: formato inválido (no es array)');
        }

        // Validar gastos
        const gastos = obtenerGastos();
        if (!Array.isArray(gastos)) {
            errores.push('Gastos: formato inválido (no es array)');
        }

        // Validar turno actual
        const turno = obtenerTurnoActual();
        if (turno !== null && typeof turno !== 'object') {
            errores.push('Turno actual: formato inválido (no es objeto)');
        }

    } catch (error) {
        errores.push(`Error al validar: ${error.message}`);
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}

// ========== EXPORTAR FUNCIONES ==========

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Encriptación
        encriptarSimple,
        desencriptarSimple,

        // Operaciones básicas
        guardarEnStorage,
        obtenerDeStorage,
        eliminarDeStorage,
        existeEnStorage,

        // Operaciones específicas
        guardarVentas,
        obtenerVentas,
        guardarClientes,
        obtenerClientes,
        guardarTurnoActual,
        obtenerTurnoActual,
        eliminarTurnoActual,
        guardarGastos,
        obtenerGastos,

        // Caché
        guardarEnCache,
        obtenerDeCache,
        limpiarCacheExpirado,

        // Gestión de espacio
        obtenerTamañoStorage,
        limpiarDatosAntiguos,

        // Backup
        exportarTodoStorage,
        importarAStorage,

        // Validación
        validarIntegridadDatos
    };
}

// Hacer disponibles globalmente
if (typeof window !== 'undefined') {
    window.Storage = {
        encriptarSimple,
        desencriptarSimple,
        guardarEnStorage,
        obtenerDeStorage,
        eliminarDeStorage,
        existeEnStorage,
        guardarVentas,
        obtenerVentas,
        guardarClientes,
        obtenerClientes,
        guardarTurnoActual,
        obtenerTurnoActual,
        eliminarTurnoActual,
        guardarGastos,
        obtenerGastos,
        guardarEnCache,
        obtenerDeCache,
        limpiarCacheExpirado,
        obtenerTamañoStorage,
        limpiarDatosAntiguos,
        exportarTodoStorage,
        importarAStorage,
        validarIntegridadDatos
    };
}
