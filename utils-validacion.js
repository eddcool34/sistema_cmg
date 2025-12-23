/**
 * UTILIDADES DE VALIDACIÓN - Sistema CMG
 *
 * Módulo centralizado de validación de datos para:
 * ✅ Evitar duplicación de lógica de validación
 * ✅ Mejorar seguridad con validación consistente
 * ✅ Facilitar mantenimiento y testing
 * ✅ Prevenir inyección y datos maliciosos
 *
 * @version 1.0
 * @date 2025-01-23
 */

// Importar constantes si están disponibles
const REGEX = (typeof CONSTANTES !== 'undefined' && CONSTANTES.REGEX_VALIDACION)
    ? CONSTANTES.REGEX_VALIDACION
    : {
        TELEFONO: /^(\+?52)?[1-9]\d{9}$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        SOLO_NUMEROS: /^\d+$/,
        DECIMAL: /^\d+(\.\d{1,2})?$/,
        SOLO_LETRAS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    };

const LIMITES = (typeof CONSTANTES !== 'undefined' && CONSTANTES.LIMITES_CARACTERES)
    ? CONSTANTES.LIMITES_CARACTERES
    : {
        NOMBRE_MIN: 2,
        NOMBRE_MAX: 100,
        TELEFONO_MIN: 10,
        TELEFONO_MAX: 15,
        DIRECCION_MAX: 200,
        NOTAS_MAX: 500
    };

// ========== VALIDACIONES BÁSICAS ==========

/**
 * Valida que un campo no esté vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean}
 */
function esRequerido(valor) {
    return valor !== null &&
           valor !== undefined &&
           String(valor).trim().length > 0;
}

/**
 * Valida longitud mínima de un campo
 * @param {string} valor - Valor a validar
 * @param {number} min - Longitud mínima
 * @returns {boolean}
 */
function longitudMinima(valor, min) {
    return String(valor).trim().length >= min;
}

/**
 * Valida longitud máxima de un campo
 * @param {string} valor - Valor a validar
 * @param {number} max - Longitud máxima
 * @returns {boolean}
 */
function longitudMaxima(valor, max) {
    return String(valor).trim().length <= max;
}

/**
 * Valida que un valor esté dentro de un rango
 * @param {string} valor - Valor a validar
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @returns {boolean}
 */
function longitudEnRango(valor, min, max) {
    const longitud = String(valor).trim().length;
    return longitud >= min && longitud <= max;
}

// ========== VALIDACIONES DE FORMATO ==========

/**
 * Valida formato de teléfono mexicano
 * @param {string} telefono - Número de teléfono
 * @returns {boolean}
 */
function esTeléfonoValido(telefono) {
    if (!telefono) return false;

    // Limpiar caracteres especiales
    const telefonoLimpio = telefono.replace(/[\s\-\(\)]/g, '');

    // Validar con regex
    return REGEX.TELEFONO.test(telefonoLimpio);
}

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function esEmailValido(email) {
    if (!email) return false;
    return REGEX.EMAIL.test(email.trim().toLowerCase());
}

/**
 * Valida que un valor sea numérico
 * @param {any} valor - Valor a validar
 * @returns {boolean}
 */
function esNumerico(valor) {
    if (valor === null || valor === undefined || valor === '') return false;
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}

/**
 * Valida que un valor sea un número entero
 * @param {any} valor - Valor a validar
 * @returns {boolean}
 */
function esEntero(valor) {
    if (!esNumerico(valor)) return false;
    return Number.isInteger(Number(valor));
}

/**
 * Valida formato de precio/decimal
 * @param {string} valor - Valor a validar
 * @returns {boolean}
 */
function esPrecioValido(valor) {
    if (!valor) return false;
    return REGEX.DECIMAL.test(String(valor));
}

/**
 * Valida que solo contenga letras
 * @param {string} valor - Valor a validar
 * @returns {boolean}
 */
function soloLetras(valor) {
    if (!valor) return false;
    return REGEX.SOLO_LETRAS.test(valor);
}

/**
 * Valida que solo contenga números
 * @param {string} valor - Valor a validar
 * @returns {boolean}
 */
function soloNumeros(valor) {
    if (!valor) return false;
    return REGEX.SOLO_NUMEROS.test(String(valor));
}

// ========== VALIDACIONES DE RANGO ==========

/**
 * Valida que un número esté en un rango
 * @param {number} valor - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean}
 */
function enRango(valor, min, max) {
    if (!esNumerico(valor)) return false;
    const num = Number(valor);
    return num >= min && num <= max;
}

/**
 * Valida que un número sea positivo
 * @param {number} valor - Valor a validar
 * @returns {boolean}
 */
function esPositivo(valor) {
    if (!esNumerico(valor)) return false;
    return Number(valor) > 0;
}

/**
 * Valida que un número sea mayor o igual a cero
 * @param {number} valor - Valor a validar
 * @returns {boolean}
 */
function esNoNegativo(valor) {
    if (!esNumerico(valor)) return false;
    return Number(valor) >= 0;
}

// ========== VALIDACIONES DE FECHA ==========

/**
 * Valida que una fecha sea válida
 * @param {string|Date} fecha - Fecha a validar
 * @returns {boolean}
 */
function esFechaValida(fecha) {
    if (!fecha) return false;
    const date = new Date(fecha);
    return date instanceof Date && !isNaN(date);
}

/**
 * Valida que una fecha no sea futura
 * @param {string|Date} fecha - Fecha a validar
 * @returns {boolean}
 */
function noEsFutura(fecha) {
    if (!esFechaValida(fecha)) return false;
    return new Date(fecha) <= new Date();
}

/**
 * Valida que una fecha esté dentro de un rango
 * @param {string|Date} fecha - Fecha a validar
 * @param {string|Date} fechaMin - Fecha mínima
 * @param {string|Date} fechaMax - Fecha máxima
 * @returns {boolean}
 */
function fechaEnRango(fecha, fechaMin, fechaMax) {
    if (!esFechaValida(fecha)) return false;
    const f = new Date(fecha);
    const min = new Date(fechaMin);
    const max = new Date(fechaMax);
    return f >= min && f <= max;
}

// ========== VALIDACIONES ESPECÍFICAS DE NEGOCIO ==========

/**
 * Valida nombre de persona (remitente, destinatario)
 * @param {string} nombre - Nombre a validar
 * @returns {Object} { valido: boolean, error: string }
 */
function validarNombre(nombre) {
    if (!esRequerido(nombre)) {
        return { valido: false, error: 'El nombre es requerido' };
    }

    if (!longitudMinima(nombre, LIMITES.NOMBRE_MIN)) {
        return { valido: false, error: `El nombre debe tener al menos ${LIMITES.NOMBRE_MIN} caracteres` };
    }

    if (!longitudMaxima(nombre, LIMITES.NOMBRE_MAX)) {
        return { valido: false, error: `El nombre no puede exceder ${LIMITES.NOMBRE_MAX} caracteres` };
    }

    return { valido: true, error: null };
}

/**
 * Valida número de teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {Object} { valido: boolean, error: string }
 */
function validarTelefono(telefono) {
    if (!esRequerido(telefono)) {
        return { valido: false, error: 'El teléfono es requerido' };
    }

    if (!esTeléfonoValido(telefono)) {
        return { valido: false, error: 'Formato de teléfono inválido (10 dígitos)' };
    }

    return { valido: true, error: null };
}

/**
 * Valida precio/monto
 * @param {string|number} precio - Precio a validar
 * @param {boolean} permitirCero - Permitir valor cero
 * @returns {Object} { valido: boolean, error: string }
 */
function validarPrecio(precio, permitirCero = false) {
    if (!esRequerido(precio)) {
        return { valido: false, error: 'El precio es requerido' };
    }

    if (!esPrecioValido(precio)) {
        return { valido: false, error: 'Formato de precio inválido' };
    }

    if (!permitirCero && !esPositivo(precio)) {
        return { valido: false, error: 'El precio debe ser mayor a 0' };
    }

    if (permitirCero && !esNoNegativo(precio)) {
        return { valido: false, error: 'El precio no puede ser negativo' };
    }

    return { valido: true, error: null };
}

/**
 * Valida dirección
 * @param {string} direccion - Dirección a validar
 * @returns {Object} { valido: boolean, error: string }
 */
function validarDireccion(direccion) {
    if (!esRequerido(direccion)) {
        return { valido: false, error: 'La dirección es requerida' };
    }

    if (!longitudMaxima(direccion, LIMITES.DIRECCION_MAX)) {
        return { valido: false, error: `La dirección no puede exceder ${LIMITES.DIRECCION_MAX} caracteres` };
    }

    return { valido: true, error: null };
}

// ========== VALIDACIÓN DE FORMULARIOS COMPLETOS ==========

/**
 * Valida formulario de venta/envío
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { valido: boolean, errores: Array }
 */
function validarFormularioVenta(formData) {
    const errores = [];

    // Validar remitente
    const validacionNombreRemitente = validarNombre(formData.nombreRemitente);
    if (!validacionNombreRemitente.valido) {
        errores.push({ campo: 'nombreRemitente', error: validacionNombreRemitente.error });
    }

    const validacionTelefonoRemitente = validarTelefono(formData.telefonoRemitente);
    if (!validacionTelefonoRemitente.valido) {
        errores.push({ campo: 'telefonoRemitente', error: validacionTelefonoRemitente.error });
    }

    // Validar destinatario
    const validacionNombreDestinatario = validarNombre(formData.nombreDestinatario);
    if (!validacionNombreDestinatario.valido) {
        errores.push({ campo: 'nombreDestinatario', error: validacionNombreDestinatario.error });
    }

    const validacionTelefonoDestinatario = validarTelefono(formData.telefonoDestinatario);
    if (!validacionTelefonoDestinatario.valido) {
        errores.push({ campo: 'telefonoDestinatario', error: validacionTelefonoDestinatario.error });
    }

    // Validar dirección destino
    const validacionDireccion = validarDireccion(formData.direccionDestino);
    if (!validacionDireccion.valido) {
        errores.push({ campo: 'direccionDestino', error: validacionDireccion.error });
    }

    // Validar paquetería
    if (!esRequerido(formData.paqueteria)) {
        errores.push({ campo: 'paqueteria', error: 'La paquetería es requerida' });
    }

    // Validar precio
    const validacionPrecio = validarPrecio(formData.precio);
    if (!validacionPrecio.valido) {
        errores.push({ campo: 'precio', error: validacionPrecio.error });
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}

/**
 * Valida formulario de gasto
 * @param {Object} gastoData - Datos del gasto
 * @returns {Object} { valido: boolean, errores: Array }
 */
function validarFormularioGasto(gastoData) {
    const errores = [];

    // Validar concepto
    if (!esRequerido(gastoData.concepto)) {
        errores.push({ campo: 'concepto', error: 'El concepto es requerido' });
    } else if (!longitudMaxima(gastoData.concepto, 100)) {
        errores.push({ campo: 'concepto', error: 'El concepto no puede exceder 100 caracteres' });
    }

    // Validar monto
    const validacionMonto = validarPrecio(gastoData.monto);
    if (!validacionMonto.valido) {
        errores.push({ campo: 'monto', error: validacionMonto.error });
    }

    // Validar tipo
    if (!esRequerido(gastoData.tipo)) {
        errores.push({ campo: 'tipo', error: 'El tipo de gasto es requerido' });
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}

// ========== SANITIZACIÓN ==========

/**
 * Sanitiza un string eliminando caracteres peligrosos
 * @param {string} valor - Valor a sanitizar
 * @returns {string}
 */
function sanitizarString(valor) {
    if (!valor) return '';

    return String(valor)
        .trim()
        .replace(/[<>]/g, '') // Eliminar < y > para prevenir XSS
        .replace(/['"]/g, '') // Eliminar comillas
        .slice(0, 500); // Limitar longitud máxima
}

/**
 * Sanitiza un número
 * @param {any} valor - Valor a sanitizar
 * @param {number} decimales - Número de decimales
 * @returns {number|null}
 */
function sanitizarNumero(valor, decimales = 2) {
    if (!esNumerico(valor)) return null;
    return Number(Number(valor).toFixed(decimales));
}

/**
 * Sanitiza un teléfono eliminando caracteres especiales
 * @param {string} telefono - Teléfono a sanitizar
 * @returns {string}
 */
function sanitizarTelefono(telefono) {
    if (!telefono) return '';
    return telefono.replace(/[^\d+]/g, '').slice(0, 15);
}

// ========== EXPORTAR FUNCIONES ==========

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Validaciones básicas
        esRequerido,
        longitudMinima,
        longitudMaxima,
        longitudEnRango,

        // Validaciones de formato
        esTeléfonoValido,
        esEmailValido,
        esNumerico,
        esEntero,
        esPrecioValido,
        soloLetras,
        soloNumeros,

        // Validaciones de rango
        enRango,
        esPositivo,
        esNoNegativo,

        // Validaciones de fecha
        esFechaValida,
        noEsFutura,
        fechaEnRango,

        // Validaciones específicas
        validarNombre,
        validarTelefono,
        validarPrecio,
        validarDireccion,

        // Validaciones de formularios
        validarFormularioVenta,
        validarFormularioGasto,

        // Sanitización
        sanitizarString,
        sanitizarNumero,
        sanitizarTelefono
    };
}

// Hacer disponibles globalmente
if (typeof window !== 'undefined') {
    window.Validadores = {
        esRequerido,
        longitudMinima,
        longitudMaxima,
        longitudEnRango,
        esTeléfonoValido,
        esEmailValido,
        esNumerico,
        esEntero,
        esPrecioValido,
        soloLetras,
        soloNumeros,
        enRango,
        esPositivo,
        esNoNegativo,
        esFechaValida,
        noEsFutura,
        fechaEnRango,
        validarNombre,
        validarTelefono,
        validarPrecio,
        validarDireccion,
        validarFormularioVenta,
        validarFormularioGasto,
        sanitizarString,
        sanitizarNumero,
        sanitizarTelefono
    };
}
