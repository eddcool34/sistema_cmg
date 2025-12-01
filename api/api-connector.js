/**
 * API Connector para Sistema CMG
 * Conecta el frontend con la API PHP
 */

class APIConnector {
    constructor(baseUrl = '/api/') {
        this.baseUrl = baseUrl;
    }

    /**
     * Realizar petición a la API
     */
    async request(action, data = {}, method = 'POST') {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let url = this.baseUrl;

            if (method === 'GET') {
                const params = new URLSearchParams({ action, ...data });
                url += `?${params.toString()}`;
            } else {
                options.body = JSON.stringify({ action, ...data });
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Error desconocido');
            }

            return result;

        } catch (error) {
            console.error('Error en petición API:', error);
            throw error;
        }
    }

    // ========== MÉTODOS ESPECÍFICOS ==========

    async guardarVenta(venta) {
        return this.request('guardarVenta', venta);
    }

    async guardarCliente(cliente) {
        return this.request('guardarCliente', cliente);
    }

    async obtenerVentas(fechaInicio = null, fechaFin = null) {
        const params = {};
        if (fechaInicio) params.fechaInicio = fechaInicio;
        if (fechaFin) params.fechaFin = fechaFin;
        return this.request('obtenerVentas', params, 'GET');
    }

    async guardarVentaPorPaqueteria(data) {
        return this.request('guardarVentaPorPaqueteria', data);
    }

    async guardarDestinoFrecuente(destino) {
        return this.request('guardarDestinoFrecuente', destino);
    }

    async guardarEntrega(entrega) {
        return this.request('guardarEntrega', entrega);
    }

    async openTurno(montoInicial = 0, usuario = 'Sistema') {
        return this.request('openTurno', { montoInicial, usuario });
    }

    async cerrarTurno(turnoId, montoInicial = 0) {
        return this.request('cerrarTurno', { turnoId, montoInicial });
    }

    async guardarGasto(gasto) {
        return this.request('guardarGasto', gasto);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.APIConnector = APIConnector;
}
