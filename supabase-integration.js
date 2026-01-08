/**
 * SISTEMA DE INTEGRACIÓN DUAL
 * ========================================
 * Este archivo implementa el sistema DUAL que guarda datos
 * tanto en Supabase como en Google Sheets para redundancia.
 *
 * Ventajas:
 * - ✅ Redundancia de datos (2 sistemas)
 * - ✅ Fallback automático si uno falla
 * - ✅ Sincronización transparente
 */

/**
 * Guarda datos en AMBOS sistemas: Supabase Y Google Sheets
 * @param {string} tabla - Nombre de la tabla ('VENTAS', 'CLIENTES', 'SERVICIOS')
 * @param {Array} datos - Array de datos a guardar
 * @returns {Promise<Object>} Resultado de ambas operaciones
 */
async function guardarDual(tabla, datos) {
    console.log(`📊 DUAL: Guardando en ${tabla}...`);

    const resultados = {
        supabase: { exito: false, error: null },
        googleSheets: { exito: false, error: null }
    };

    // 1. Intentar guardar en Supabase
    if (window.supabaseClient) {
        try {
            // Convertir array a objeto para Supabase
            const objetoDatos = convertirArrayAObjeto(tabla, datos);

            const { data, error } = await window.supabaseClient
                .from(tabla.toLowerCase())
                .insert([objetoDatos]);

            if (error) throw error;

            resultados.supabase.exito = true;
            console.log(`✅ Supabase: Guardado en ${tabla}`);
        } catch (error) {
            resultados.supabase.error = error;
            console.error(`❌ Supabase: Error en ${tabla}:`, error);
        }
    } else {
        console.warn('⚠️ Supabase no disponible, solo guardará en Google Sheets');
    }

    // 2. Intentar guardar en Google Sheets
    try {
        if (typeof guardarEnGoogleSheets === 'function') {
            await guardarEnGoogleSheets(tabla, datos);
            resultados.googleSheets.exito = true;
            console.log(`✅ Google Sheets: Sincronizado en ${tabla}`);
        } else {
            throw new Error('Función guardarEnGoogleSheets no disponible');
        }
    } catch (error) {
        resultados.googleSheets.error = error;
        console.error(`❌ Google Sheets: Error en ${tabla}:`, error);
    }

    // Resumen de resultados
    if (resultados.supabase.exito && resultados.googleSheets.exito) {
        console.log(`✅ DUAL: Guardado exitoso en ambos sistemas (${tabla})`);
    } else if (resultados.supabase.exito || resultados.googleSheets.exito) {
        console.warn(`⚠️ DUAL: Guardado parcial en ${tabla}`);
    } else {
        console.error(`❌ DUAL: Falló guardado en ambos sistemas (${tabla})`);
    }

    return resultados;
}

/**
 * Convierte array de datos a objeto para Supabase
 * @param {string} tabla - Nombre de la tabla
 * @param {Array} datos - Array de datos
 * @returns {Object} Objeto con propiedades nombradas
 */
function convertirArrayAObjeto(tabla, datos) {
    switch(tabla) {
        case 'VENTAS':
            return {
                id_venta: datos[0],
                fecha: datos[1],
                hora: datos[2],
                nombre_remitente: datos[3],
                telefono_remitente: datos[4],
                paqueteria: datos[5],
                tipo_servicio: datos[6],
                peso_kg: datos[7],
                origen: datos[8],
                destino: datos[9],
                precio: parseFloat(datos[10]),
                costo: parseFloat(datos[11]),
                ganancia: parseFloat(datos[12]),
                total: parseFloat(datos[13]),
                cajero: datos[14],
                metodo_pago: datos[15],
                status: datos[16]
            };

        case 'CLIENTES':
            return {
                id_cliente: datos[0],
                fecha_registro: datos[1],
                nombre: datos[2],
                telefono: datos[3],
                email: datos[4],
                direccion: datos[5],
                ciudad: datos[6],
                estado: datos[7],
                cp: datos[8],
                rfc: datos[9]
            };

        case 'SERVICIOS':
            return {
                id_venta: datos[0],
                fecha: datos[1],
                hora: datos[2],
                nombre_cliente: datos[3],
                telefono_cliente: datos[4],
                tipo_servicio: datos[5],
                precio: parseFloat(datos[6]),
                costo: parseFloat(datos[7]),
                ganancia: parseFloat(datos[8]),
                cajero: datos[9],
                metodo_pago: datos[10],
                status: datos[11]
            };

        default:
            throw new Error(`Tabla desconocida: ${tabla}`);
    }
}

/**
 * Obtiene el estado actual del sistema DUAL
 * @returns {Object} Estado de ambos sistemas
 */
function obtenerEstadoDual() {
    const estado = {
        supabase: {
            disponible: !!window.supabaseClient,
            configurado: typeof SUPABASE_URL !== 'undefined' &&
                         SUPABASE_URL !== 'https://your-project.supabase.co'
        },
        googleSheets: {
            disponible: typeof guardarEnGoogleSheets === 'function',
            configurado: typeof GOOGLE_SCRIPT_URL !== 'undefined' &&
                         GOOGLE_SCRIPT_URL !== ''
        }
    };

    console.log('📊 Estado del Sistema DUAL:');
    console.log(`  Supabase: ${estado.supabase.disponible ? '✅' : '❌'} disponible, ${estado.supabase.configurado ? '✅' : '❌'} configurado`);
    console.log(`  Google Sheets: ${estado.googleSheets.disponible ? '✅' : '❌'} disponible, ${estado.googleSheets.configurado ? '✅' : '❌'} configurado`);

    return estado;
}

// Hacer funciones disponibles globalmente
window.guardarDual = guardarDual;
window.obtenerEstadoDual = obtenerEstadoDual;

console.log('%c📊 Sistema DUAL cargado', 'font-weight: bold; color: #4CAF50;');
