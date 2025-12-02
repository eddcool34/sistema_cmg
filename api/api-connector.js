/**
 * API CONNECTOR - Sistema CMG
 *
 * Este archivo facilita la conexión del frontend con el backend PHP
 * Reemplaza las llamadas a Google Sheets
 *
 * INSTRUCCIONES DE USO:
 * 1. Incluye este archivo en tu HTML:
 *    <script src="api/api-connector.js"></script>
 *
 * 2. Configura la URL de tu API:
 *    const API_URL = 'https://tu-dominio.com/api/';
 *
 * 3. Usa las funciones proporcionadas en lugar de fetch directo
 */

// Configuración de la API
const API_URL = 'https://paqueteriacmg.com/api/';

/**
 * Clase para manejar todas las operaciones de la API
 */
class CMGApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Método genérico para hacer peticiones a la API
     */
    async request(action, data = null, method = 'GET') {
        try {
            const url = method === 'GET' && data
                ? `${this.baseUrl}?action=${action}&${new URLSearchParams(data).toString()}`
                : `${this.baseUrl}?action=${action}`;

            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (method === 'POST' && data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Error desconocido');
            }

            return result;

        } catch (error) {
            console.error(`Error en API (${action}):`, error);
            throw error;
        }
    }

    // ==========================================
    // MÉTODOS DE VENTAS
    // ==========================================

    /**
     * Guardar una nueva venta
     */
    async guardarVenta(venta) {
        return await this.request('guardarVenta', venta, 'POST');
    }

    /**
     * Obtener ventas (opcionalmente filtradas)
     */
    async obtenerVentas(filtros = {}) {
        const response = await this.request('obtenerVentas', filtros, 'GET');
        return response.ventas || [];
    }

    // ==========================================
    // MÉTODOS DE CLIENTES
    // ==========================================

    /**
     * Guardar un nuevo cliente
     */
    async guardarCliente(cliente) {
        return await this.request('guardarCliente', cliente, 'POST');
    }

    /**
     * Buscar clientes
     */
    async buscarClientes(query) {
        const response = await this.request('buscarClientes', { q: query }, 'GET');
        return response.clientes || [];
    }

    // ==========================================
    // MÉTODOS DE TURNOS
    // ==========================================

    /**
     * Abrir un nuevo turno
     */
    async guardarTurno(turno) {
        return await this.request('guardarTurno', turno, 'POST');
    }

    /**
     * Obtener el turno actual (abierto)
     */
    async obtenerTurnoActual() {
        const response = await this.request('obtenerTurnoActual', null, 'GET');
        return response.turno || null;
    }

    /**
     * Cerrar turno actual
     */
    async cerrarTurno(datoscierre) {
        return await this.request('cerrarTurno', datoscierre, 'POST');
    }

    /**
     * Obtener historial de turnos
     */
    async obtenerTurnos(limite = 50) {
        const response = await this.request('obtenerTurnos', { limite }, 'GET');
        return response.turnos || [];
    }

    // ==========================================
    // MÉTODOS DE GASTOS
    // ==========================================

    /**
     * Guardar un nuevo gasto
     */
    async guardarGasto(gasto) {
        return await this.request('guardarGasto', gasto, 'POST');
    }

    /**
     * Obtener gastos de un turno
     */
    async obtenerGastos(turnoId) {
        const response = await this.request('obtenerGastos', { turno_id: turnoId }, 'GET');
        return response.gastos || [];
    }

    // ==========================================
    // MÉTODOS DE REPORTES
    // ==========================================

    /**
     * Generar reporte de ventas
     */
    async reporteVentas(fechaInicio, fechaFin) {
        const response = await this.request('reporteVentas', {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin
        }, 'GET');
        return response.reporte || [];
    }
}

// Crear instancia global del cliente API
const apiClient = new CMGApiClient(API_URL);

/**
 * FUNCIONES DE COMPATIBILIDAD CON EL CÓDIGO ANTIGUO
 * Estas funciones mantienen la misma interfaz que las llamadas a Google Sheets
 */

/**
 * Guardar venta (compatible con código anterior)
 */
async function guardarVentaAPI(venta) {
    try {
        const resultado = await apiClient.guardarVenta(venta);
        console.log('✅ Venta guardada:', resultado);
        return resultado;
    } catch (error) {
        console.error('❌ Error guardando venta:', error);
        // Fallback a localStorage si falla la API
        guardarEnLocalStorage('ventas', venta);
        throw error;
    }
}

/**
 * Obtener ventas (compatible con código anterior)
 */
async function obtenerVentasAPI(filtros = {}) {
    try {
        const ventas = await apiClient.obtenerVentas(filtros);
        console.log(`✅ ${ventas.length} ventas obtenidas`);
        return ventas;
    } catch (error) {
        console.error('❌ Error obteniendo ventas:', error);
        // Fallback a localStorage si falla la API
        return obtenerDeLocalStorage('ventas') || [];
    }
}

/**
 * Guardar turno
 */
async function guardarTurnoAPI(turno) {
    try {
        const resultado = await apiClient.guardarTurno(turno);
        console.log('✅ Turno guardado:', resultado);
        // También guardar en localStorage como backup
        localStorage.setItem('turnoActual', JSON.stringify(turno));
        return resultado;
    } catch (error) {
        console.error('❌ Error guardando turno:', error);
        localStorage.setItem('turnoActual', JSON.stringify(turno));
        throw error;
    }
}

/**
 * Obtener turno actual
 */
async function obtenerTurnoActualAPI() {
    try {
        const turno = await apiClient.obtenerTurnoActual();
        if (turno) {
            console.log('✅ Turno actual obtenido:', turno.turno_id);
            localStorage.setItem('turnoActual', JSON.stringify(turno));
        }
        return turno;
    } catch (error) {
        console.error('❌ Error obteniendo turno:', error);
        // Fallback a localStorage
        const turnoLocal = localStorage.getItem('turnoActual');
        return turnoLocal ? JSON.parse(turnoLocal) : null;
    }
}

/**
 * Cerrar turno
 */
async function cerrarTurnoAPI(datoscierre) {
    try {
        const resultado = await apiClient.cerrarTurno(datoscierre);
        console.log('✅ Turno cerrado correctamente');
        // Limpiar localStorage
        localStorage.removeItem('turnoActual');
        return resultado;
    } catch (error) {
        console.error('❌ Error cerrando turno:', error);
        throw error;
    }
}

/**
 * Guardar gasto
 */
async function guardarGastoAPI(gasto) {
    try {
        const resultado = await apiClient.guardarGasto(gasto);
        console.log('✅ Gasto guardado:', resultado);
        return resultado;
    } catch (error) {
        console.error('❌ Error guardando gasto:', error);
        guardarEnLocalStorage('gastos', gasto);
        throw error;
    }
}

/**
 * Obtener gastos de un turno
 */
async function obtenerGastosAPI(turnoId) {
    try {
        const gastos = await apiClient.obtenerGastos(turnoId);
        console.log(`✅ ${gastos.length} gastos obtenidos`);
        return gastos;
    } catch (error) {
        console.error('❌ Error obteniendo gastos:', error);
        return obtenerDeLocalStorage('gastos') || [];
    }
}

/**
 * Guardar cliente
 */
async function guardarClienteAPI(cliente) {
    try {
        const resultado = await apiClient.guardarCliente(cliente);
        console.log('✅ Cliente guardado:', resultado);
        return resultado;
    } catch (error) {
        console.error('❌ Error guardando cliente:', error);
        guardarEnLocalStorage('clientes', cliente);
        throw error;
    }
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Guardar en localStorage como fallback
 */
function guardarEnLocalStorage(clave, item) {
    try {
        const items = JSON.parse(localStorage.getItem(clave) || '[]');
        items.push({
            ...item,
            _id: Date.now(),
            _pendienteSincronizar: true
        });
        localStorage.setItem(clave, JSON.stringify(items));
        console.log(`💾 Guardado en localStorage (${clave}) como backup`);
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
    }
}

/**
 * Obtener de localStorage
 */
function obtenerDeLocalStorage(clave) {
    try {
        const items = localStorage.getItem(clave);
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error('Error obteniendo de localStorage:', error);
        return [];
    }
}

/**
 * Sincronizar datos pendientes de localStorage a la API
 */
async function sincronizarDatosPendientes() {
    const claves = ['ventas', 'clientes', 'gastos'];

    for (const clave of claves) {
        try {
            const items = obtenerDeLocalStorage(clave);
            const pendientes = items.filter(item => item._pendienteSincronizar);

            if (pendientes.length > 0) {
                console.log(`🔄 Sincronizando ${pendientes.length} ${clave} pendientes...`);

                for (const item of pendientes) {
                    try {
                        // Eliminar flags internos antes de enviar
                        const { _id, _pendienteSincronizar, ...itemLimpio } = item;

                        // Guardar según el tipo
                        if (clave === 'ventas') {
                            await apiClient.guardarVenta(itemLimpio);
                        } else if (clave === 'clientes') {
                            await apiClient.guardarCliente(itemLimpio);
                        } else if (clave === 'gastos') {
                            await apiClient.guardarGasto(itemLimpio);
                        }

                        // Marcar como sincronizado
                        item._pendienteSincronizar = false;

                    } catch (error) {
                        console.error(`Error sincronizando item de ${clave}:`, error);
                    }
                }

                // Actualizar localStorage
                localStorage.setItem(clave, JSON.stringify(items));
                console.log(`✅ Sincronización de ${clave} completada`);
            }
        } catch (error) {
            console.error(`Error sincronizando ${clave}:`, error);
        }
    }
}

/**
 * Verificar conexión con la API
 */
async function verificarConexionAPI() {
    try {
        await apiClient.obtenerVentas({ limite: 1 });
        console.log('✅ Conexión con API establecida correctamente');
        return true;
    } catch (error) {
        console.error('❌ No se pudo conectar con la API:', error);
        return false;
    }
}

// Intentar sincronizar datos pendientes al cargar
window.addEventListener('load', async () => {
    const conectado = await verificarConexionAPI();
    if (conectado) {
        await sincronizarDatosPendientes();
    } else {
        console.warn('⚠️ Trabajando en modo offline. Los datos se guardarán localmente.');
    }
});

// Intentar sincronizar al recuperar conexión
window.addEventListener('online', async () => {
    console.log('🌐 Conexión restablecida. Sincronizando datos...');
    await sincronizarDatosPendientes();
});

console.log('📡 API Connector cargado. Cliente API disponible como "apiClient"');
