/**
 * UTILIDADES DE FORMATEO - Sistema CMG
 *
 * Módulo centralizado de formateo de datos para:
 * ✅ Evitar duplicación de lógica de formateo
 * ✅ Consistencia en presentación de datos
 * ✅ Facilitar mantenimiento
 * ✅ Mejorar experiencia de usuario
 *
 * @version 1.0
 * @date 2025-01-23
 */

// Importar constantes si están disponibles
const MESES_NOMBRES = (typeof CONSTANTES !== 'undefined' && CONSTANTES.MESES)
    ? CONSTANTES.MESES
    : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const DIAS_NOMBRES = (typeof CONSTANTES !== 'undefined' && CONSTANTES.DIAS_SEMANA)
    ? CONSTANTES.DIAS_SEMANA
    : ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// ========== FORMATEO DE MONEDA ==========

/**
 * Formatea un número como moneda mexicana
 * @param {number} valor - Valor a formatear
 * @param {boolean} incluirSimbolo - Incluir símbolo de pesos
 * @returns {string}
 */
function formatearMoneda(valor, incluirSimbolo = true) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return incluirSimbolo ? '$0.00' : '0.00';
    }

    const numero = Number(valor);
    const formateado = numero.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return incluirSimbolo ? `$${formateado}` : formateado;
}

/**
 * Alias de formatearMoneda para compatibilidad
 * @param {number} valor - Valor a formatear
 * @returns {string}
 */
function formatCurrency(valor) {
    return formatearMoneda(valor, true);
}

/**
 * Formatea un número con separadores de miles
 * @param {number} valor - Valor a formatear
 * @param {number} decimales - Número de decimales
 * @returns {string}
 */
function formatearNumero(valor, decimales = 2) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return '0';
    }

    const numero = Number(valor);
    return numero.toFixed(decimales).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Convierte número a porcentaje
 * @param {number} valor - Valor decimal (ej: 0.10 para 10%)
 * @param {number} decimales - Decimales a mostrar
 * @returns {string}
 */
function formatearPorcentaje(valor, decimales = 2) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return '0%';
    }

    const porcentaje = Number(valor) * 100;
    return `${porcentaje.toFixed(decimales)}%`;
}

// ========== FORMATEO DE FECHAS ==========

/**
 * Formatea fecha a formato corto (DD/MM/YYYY)
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string}
 */
function formatearFechaCorta(fecha) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

/**
 * Formatea fecha a formato largo (Día DD de Mes de YYYY)
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string}
 */
function formatearFechaLarga(fecha) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const dia = date.getDate();
    const mes = MESES_NOMBRES[date.getMonth()];
    const anio = date.getFullYear();
    const diaSemana = DIAS_NOMBRES[date.getDay()];

    return `${diaSemana} ${dia} de ${mes} de ${anio}`;
}

/**
 * Formatea fecha y hora (DD/MM/YYYY HH:MM)
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string}
 */
function formatearFechaHora(fecha) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

/**
 * Formatea solo la hora (HH:MM:SS o HH:MM)
 * @param {string|Date} fecha - Fecha a formatear
 * @param {boolean} incluirSegundos - Incluir segundos
 * @returns {string}
 */
function formatearHora(fecha, incluirSegundos = false) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    if (!incluirSegundos) {
        return `${horas}:${minutos}`;
    }

    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

/**
 * Formatea fecha en formato ISO (YYYY-MM-DD)
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string}
 */
function formatearFechaISO(fecha) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();

    return `${anio}-${mes}-${dia}`;
}

/**
 * Calcula tiempo transcurrido desde una fecha (ej: "hace 2 horas")
 * @param {string|Date} fecha - Fecha a calcular
 * @returns {string}
 */
function tiempoTranscurrido(fecha) {
    if (!fecha) return '';

    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';

    const ahora = new Date();
    const diferencia = ahora - date;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(dias / 365);

    if (años > 0) return `hace ${años} año${años > 1 ? 's' : ''}`;
    if (meses > 0) return `hace ${meses} mes${meses > 1 ? 'es' : ''}`;
    if (dias > 0) return `hace ${dias} día${dias > 1 ? 's' : ''}`;
    if (horas > 0) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (minutos > 0) return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    return 'hace unos segundos';
}

// ========== FORMATEO DE TEXTO ==========

/**
 * Capitaliza la primera letra de un string
 * @param {string} texto - Texto a capitalizar
 * @returns {string}
 */
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Capitaliza cada palabra de un string
 * @param {string} texto - Texto a capitalizar
 * @returns {string}
 */
function capitalizarPalabras(texto) {
    if (!texto) return '';
    return texto
        .split(' ')
        .map(palabra => capitalizar(palabra))
        .join(' ');
}

/**
 * Trunca un texto a una longitud máxima
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @param {string} sufijo - Sufijo a agregar (ej: "...")
 * @returns {string}
 */
function truncar(texto, longitud = 50, sufijo = '...') {
    if (!texto) return '';
    if (texto.length <= longitud) return texto;
    return texto.substring(0, longitud).trim() + sufijo;
}

/**
 * Limpia espacios múltiples de un texto
 * @param {string} texto - Texto a limpiar
 * @returns {string}
 */
function limpiarEspacios(texto) {
    if (!texto) return '';
    return texto.replace(/\s+/g, ' ').trim();
}

// ========== FORMATEO DE TELÉFONO ==========

/**
 * Formatea teléfono mexicano (XXX XXX XXXX)
 * @param {string} telefono - Teléfono a formatear
 * @returns {string}
 */
function formatearTelefono(telefono) {
    if (!telefono) return '';

    // Limpiar caracteres no numéricos
    const limpio = telefono.replace(/\D/g, '');

    // Si tiene lada +52, quitarla para el formato
    const numeroLocal = limpio.startsWith('52') && limpio.length === 12
        ? limpio.substring(2)
        : limpio;

    // Formatear según longitud
    if (numeroLocal.length === 10) {
        return `${numeroLocal.substring(0, 3)} ${numeroLocal.substring(3, 6)} ${numeroLocal.substring(6)}`;
    }

    return numeroLocal;
}

/**
 * Formatea teléfono con lada internacional
 * @param {string} telefono - Teléfono a formatear
 * @returns {string}
 */
function formatearTelefonoInternacional(telefono) {
    if (!telefono) return '';

    const limpio = telefono.replace(/\D/g, '');

    if (limpio.length === 10) {
        return `+52 ${limpio.substring(0, 3)} ${limpio.substring(3, 6)} ${limpio.substring(6)}`;
    }

    return telefono;
}

// ========== FORMATEO DE IDENTIFICADORES ==========

/**
 * Formatea ID de venta (ej: #0001234)
 * @param {number} id - ID a formatear
 * @param {number} longitud - Longitud total con ceros
 * @returns {string}
 */
function formatearIdVenta(id, longitud = 7) {
    if (!id) return '';
    return `#${String(id).padStart(longitud, '0')}`;
}

/**
 * Genera ID de turno (ej: T-20250123-001)
 * @param {Date} fecha - Fecha del turno
 * @param {number} numero - Número del turno en el día
 * @returns {string}
 */
function generarIdTurno(fecha = new Date(), numero = 1) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const num = String(numero).padStart(3, '0');

    return `T-${anio}${mes}${dia}-${num}`;
}

// ========== FORMATEO DE DATOS ==========

/**
 * Formatea peso con unidad (ej: 2.5 kg)
 * @param {number} peso - Peso en kilogramos
 * @returns {string}
 */
function formatearPeso(peso) {
    if (!peso || isNaN(peso)) return '0 kg';
    return `${Number(peso).toFixed(2)} kg`;
}

/**
 * Formatea dimensiones (ej: 30x20x10 cm)
 * @param {number} largo - Largo en cm
 * @param {number} ancho - Ancho en cm
 * @param {number} alto - Alto en cm
 * @returns {string}
 */
function formatearDimensiones(largo, ancho, alto) {
    if (!largo || !ancho || !alto) return '';
    return `${largo}x${ancho}x${alto} cm`;
}

/**
 * Formatea número de paquetes
 * @param {number} cantidad - Cantidad de paquetes
 * @returns {string}
 */
function formatearCantidadPaquetes(cantidad) {
    if (!cantidad || isNaN(cantidad)) return '0 paquetes';
    const num = Number(cantidad);
    return `${num} paquete${num !== 1 ? 's' : ''}`;
}

// ========== FORMATEO DE ARCHIVOS ==========

/**
 * Formatea tamaño de archivo (bytes a KB, MB, GB)
 * @param {number} bytes - Tamaño en bytes
 * @param {number} decimales - Decimales a mostrar
 * @returns {string}
 */
function formatearTamañoArchivo(bytes, decimales = 2) {
    if (bytes === 0) return '0 Bytes';
    if (!bytes || isNaN(bytes)) return '';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimales)) + ' ' + sizes[i];
}

// ========== UTILIDADES DE CÁLCULO CON FORMATO ==========

/**
 * Calcula y formatea comisión
 * @param {number} precio - Precio base
 * @param {number} tasa - Tasa de comisión (decimal, ej: 0.10 para 10%)
 * @returns {Object} { comision: number, comisionFormateada: string }
 */
function calcularComisionFormateada(precio, tasa) {
    const comision = Number(precio) * Number(tasa);
    return {
        comision: comision,
        comisionFormateada: formatearMoneda(comision)
    };
}

/**
 * Calcula y formatea total con IVA
 * @param {number} subtotal - Subtotal sin IVA
 * @param {number} tasaIVA - Tasa de IVA (decimal, ej: 0.16 para 16%)
 * @returns {Object}
 */
function calcularTotalConIVA(subtotal, tasaIVA = 0.16) {
    const iva = Number(subtotal) * Number(tasaIVA);
    const total = Number(subtotal) + iva;

    return {
        subtotal: subtotal,
        iva: iva,
        total: total,
        subtotalFormateado: formatearMoneda(subtotal),
        ivaFormateado: formatearMoneda(iva),
        totalFormateado: formatearMoneda(total)
    };
}

// ========== EXPORTAR FUNCIONES ==========

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Formateo de moneda
        formatearMoneda,
        formatCurrency,
        formatearNumero,
        formatearPorcentaje,

        // Formateo de fechas
        formatearFechaCorta,
        formatearFechaLarga,
        formatearFechaHora,
        formatearHora,
        formatearFechaISO,
        tiempoTranscurrido,

        // Formateo de texto
        capitalizar,
        capitalizarPalabras,
        truncar,
        limpiarEspacios,

        // Formateo de teléfono
        formatearTelefono,
        formatearTelefonoInternacional,

        // Formateo de identificadores
        formatearIdVenta,
        generarIdTurno,

        // Formateo de datos
        formatearPeso,
        formatearDimensiones,
        formatearCantidadPaquetes,
        formatearTamañoArchivo,

        // Cálculos con formato
        calcularComisionFormateada,
        calcularTotalConIVA
    };
}

// Hacer disponibles globalmente
if (typeof window !== 'undefined') {
    window.Formateo = {
        formatearMoneda,
        formatCurrency,
        formatearNumero,
        formatearPorcentaje,
        formatearFechaCorta,
        formatearFechaLarga,
        formatearFechaHora,
        formatearHora,
        formatearFechaISO,
        tiempoTranscurrido,
        capitalizar,
        capitalizarPalabras,
        truncar,
        limpiarEspacios,
        formatearTelefono,
        formatearTelefonoInternacional,
        formatearIdVenta,
        generarIdTurno,
        formatearPeso,
        formatearDimensiones,
        formatearCantidadPaquetes,
        formatearTamañoArchivo,
        calcularComisionFormateada,
        calcularTotalConIVA
    };
}
