/**
 * RBAC - Sistema de Control de Acceso Basado en Roles
 * Sistema CMG - Configuración de Roles y Permisos
 */

// ========== DEFINICIÓN DE ROLES Y PERMISOS ==========
const ROLES = {
    ADMINISTRADOR: {
        nombre: 'Administrador',
        descripcion: 'Dueño del sistema - Acceso total',
        permisos: {
            // Permisos de visualización
            ver_todo: true,
            ver_ventas: true,
            ver_entregas: true,
            ver_servicios: true,
            ver_balance: true,
            ver_cortes: true,
            ver_reportes: true,

            // Permisos de modificación
            modificar_todo: true,
            modificar_ventas: true,
            modificar_entregas: true,
            modificar_precios: true,
            modificar_servicios: true,
            crear_ventas: true,
            editar_ventas: true,
            eliminar_ventas: true,

            // Permisos de configuración
            configuracion: true,
            gestionar_usuarios: true,
            cambiar_configuracion: true,

            // Permisos de caja
            cierre_caja: true,
            apertura_caja: true,
            ver_caja: true,
            modificar_caja: true,

            // Permisos de datos
            eliminar_datos: true,
            exportar_datos: true,
            importar_datos: true,
            backup_datos: true,

            // Permisos de reportes
            reportes: true,
            reportes_avanzados: true,
            ver_utilidades: true,
            ver_comisiones: true
        },
        color: '#dc2626' // Rojo
    },

    SUPERVISOR: {
        nombre: 'Supervisor',
        descripcion: 'Gerente/Encargado - Acceso amplio',
        permisos: {
            // Permisos de visualización
            ver_todo: true,
            ver_ventas: true,
            ver_entregas: true,
            ver_servicios: true,
            ver_balance: true,
            ver_cortes: true,
            ver_reportes: true,

            // Permisos de modificación
            modificar_todo: false,
            modificar_ventas: true,
            modificar_entregas: true,
            modificar_precios: false,
            modificar_servicios: true,
            crear_ventas: true,
            editar_ventas: true,
            eliminar_ventas: false,

            // Permisos de configuración
            configuracion: false,
            gestionar_usuarios: false,
            cambiar_configuracion: false,

            // Permisos de caja
            cierre_caja: true,
            apertura_caja: true,
            ver_caja: true,
            modificar_caja: true,

            // Permisos de datos
            eliminar_datos: false,
            exportar_datos: true,
            importar_datos: false,
            backup_datos: true,

            // Permisos de reportes
            reportes: true,
            reportes_avanzados: true,
            ver_utilidades: true,
            ver_comisiones: true
        },
        color: '#f59e0b' // Amarillo/Naranja
    },

    CAJERO: {
        nombre: 'Cajero',
        descripcion: 'Empleado normal - Acceso limitado',
        permisos: {
            // Permisos de visualización
            ver_todo: false,
            ver_ventas: true,
            ver_entregas: true,
            ver_servicios: true,
            ver_balance: false,
            ver_cortes: false,
            ver_reportes: false,

            // Permisos de modificación
            modificar_todo: false,
            modificar_ventas: false,
            modificar_entregas: true,
            modificar_precios: false,
            modificar_servicios: false,
            crear_ventas: true,
            editar_ventas: false,
            eliminar_ventas: false,

            // Permisos de configuración
            configuracion: false,
            gestionar_usuarios: false,
            cambiar_configuracion: false,

            // Permisos de caja
            cierre_caja: false,
            apertura_caja: false,
            ver_caja: false,
            modificar_caja: false,

            // Permisos de datos
            eliminar_datos: false,
            exportar_datos: false,
            importar_datos: false,
            backup_datos: false,

            // Permisos de reportes
            reportes: true,
            reportes_avanzados: false,
            ver_utilidades: false,
            ver_comisiones: false
        },
        color: '#3b82f6' // Azul
    },

    AUDITOR: {
        nombre: 'Auditor',
        descripcion: 'Contador/Auditor - Solo lectura',
        permisos: {
            // Permisos de visualización
            ver_todo: true,
            ver_ventas: true,
            ver_entregas: true,
            ver_servicios: true,
            ver_balance: true,
            ver_cortes: true,
            ver_reportes: true,

            // Permisos de modificación
            modificar_todo: false,
            modificar_ventas: false,
            modificar_entregas: false,
            modificar_precios: false,
            modificar_servicios: false,
            crear_ventas: false,
            editar_ventas: false,
            eliminar_ventas: false,

            // Permisos de configuración
            configuracion: false,
            gestionar_usuarios: false,
            cambiar_configuracion: false,

            // Permisos de caja
            cierre_caja: false,
            apertura_caja: false,
            ver_caja: true,
            modificar_caja: false,

            // Permisos de datos
            eliminar_datos: false,
            exportar_datos: true,
            importar_datos: false,
            backup_datos: false,

            // Permisos de reportes
            reportes: true,
            reportes_avanzados: true,
            ver_utilidades: true,
            ver_comisiones: true
        },
        color: '#8b5cf6' // Púrpura
    }
};

// ========== BASE DE DATOS DE USUARIOS ==========
// NOTA: En producción, esto debería estar en una base de datos segura con contraseñas hasheadas
const USUARIOS = [
    {
        id: 1,
        usuario: 'admin',
        nombre: 'Administrador',
        contrasena: 'admin123', // ⚠️ Cambiar en producción
        rol: 'ADMINISTRADOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 2,
        usuario: 'mariana',
        nombre: 'Mariana',
        contrasena: 'mariana123', // ⚠️ Cambiar en producción
        rol: 'CAJERO',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 3,
        usuario: 'edgar',
        nombre: 'Edgar',
        contrasena: 'edgar123', // ⚠️ Cambiar en producción
        rol: 'SUPERVISOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    },
    {
        id: 4,
        usuario: 'contador',
        nombre: 'Contador',
        contrasena: 'contador123', // ⚠️ Cambiar en producción
        rol: 'AUDITOR',
        activo: true,
        fechaCreacion: '2025-01-01'
    }
];

// ========== FUNCIONES DE AUTENTICACIÓN ==========

/**
 * Autentica un usuario con sus credenciales
 * @param {string} usuario - Nombre de usuario
 * @param {string} contrasena - Contraseña
 * @returns {Object|null} Usuario autenticado o null
 */
function autenticarUsuario(usuario, contrasena) {
    const usuarioEncontrado = USUARIOS.find(u =>
        u.usuario.toLowerCase() === usuario.toLowerCase() &&
        u.contrasena === contrasena &&
        u.activo
    );

    if (usuarioEncontrado) {
        // Registrar inicio de sesión
        registrarAccion(usuarioEncontrado, 'login', 'Inicio de sesión exitoso');

        // No devolver la contraseña
        const { contrasena: _, ...usuarioSinPassword } = usuarioEncontrado;
        return usuarioSinPassword;
    }

    // Registrar intento fallido
    console.warn(`❌ Intento de login fallido - Usuario: ${usuario}`);
    return null;
}

/**
 * Verifica si un usuario tiene un permiso específico
 * @param {string} accion - Acción/permiso a verificar
 * @param {Object} usuario - Usuario actual
 * @returns {boolean} True si tiene permiso, false si no
 */
function tienePermiso(accion, usuario) {
    if (!usuario || !usuario.rol) {
        return false;
    }

    const rol = ROLES[usuario.rol];
    if (!rol) {
        console.error(`❌ Rol no encontrado: ${usuario.rol}`);
        return false;
    }

    const permiso = rol.permisos[accion];

    // Si no tiene permiso, registrar intento
    if (!permiso) {
        console.warn(`⚠️ Acceso denegado - Usuario: ${usuario.nombre}, Acción: ${accion}`);
        registrarAccion(usuario, 'acceso_denegado', `Intento de: ${accion}`);
    }

    return permiso || false;
}

/**
 * Obtiene la sesión actual del usuario
 * @returns {Object|null} Usuario en sesión o null
 */
function obtenerSesionActual() {
    const sesionString = localStorage.getItem('sesion_cmg');
    if (!sesionString) return null;

    try {
        const sesion = JSON.parse(sesionString);

        // Verificar que la sesión no haya expirado (24 horas)
        const ahora = new Date().getTime();
        const tiempoSesion = 24 * 60 * 60 * 1000; // 24 horas

        if (ahora - sesion.timestamp > tiempoSesion) {
            cerrarSesion();
            return null;
        }

        return sesion.usuario;
    } catch (e) {
        console.error('Error al obtener sesión:', e);
        return null;
    }
}

/**
 * Guarda la sesión del usuario
 * @param {Object} usuario - Usuario autenticado
 */
function guardarSesion(usuario) {
    const sesion = {
        usuario: usuario,
        timestamp: new Date().getTime()
    };
    localStorage.setItem('sesion_cmg', JSON.stringify(sesion));
}

/**
 * Cierra la sesión del usuario actual
 */
function cerrarSesion() {
    const usuario = obtenerSesionActual();
    if (usuario) {
        registrarAccion(usuario, 'logout', 'Cierre de sesión');
    }
    localStorage.removeItem('sesion_cmg');
}

// ========== SISTEMA DE AUDITORÍA ==========

/**
 * Registra una acción del usuario en el sistema
 * @param {Object} usuario - Usuario que realizó la acción
 * @param {string} accion - Tipo de acción
 * @param {string} detalles - Detalles adicionales
 */
function registrarAccion(usuario, accion, detalles) {
    const registro = {
        timestamp: new Date().toISOString(),
        usuario: usuario.nombre,
        rol: usuario.rol,
        accion: accion,
        detalles: detalles
    };

    // Obtener historial de auditoría
    const auditoria = JSON.parse(localStorage.getItem('auditoria_cmg') || '[]');

    // Agregar nuevo registro
    auditoria.push(registro);

    // Mantener solo los últimos 1000 registros
    if (auditoria.length > 1000) {
        auditoria.shift();
    }

    // Guardar en localStorage
    localStorage.setItem('auditoria_cmg', JSON.stringify(auditoria));

    // Log en consola
    console.log(`📝 [${registro.timestamp}] ${registro.usuario} (${registro.rol}): ${registro.accion} - ${registro.detalles}`);
}

/**
 * Obtiene el historial de auditoría
 * @param {number} limite - Número máximo de registros a devolver
 * @returns {Array} Registros de auditoría
 */
function obtenerAuditoria(limite = 100) {
    const auditoria = JSON.parse(localStorage.getItem('auditoria_cmg') || '[]');
    return auditoria.slice(-limite).reverse();
}

/**
 * Filtra el historial de auditoría por usuario
 * @param {string} nombreUsuario - Nombre del usuario
 * @returns {Array} Registros filtrados
 */
function obtenerAuditoriaPorUsuario(nombreUsuario) {
    const auditoria = JSON.parse(localStorage.getItem('auditoria_cmg') || '[]');
    return auditoria.filter(r => r.usuario === nombreUsuario).reverse();
}

// ========== FUNCIONES DE INTERFAZ DINÁMICA ==========

/**
 * Oculta un elemento HTML
 * @param {string} selector - Selector CSS del elemento
 */
function ocultarElemento(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.style.display = 'none';
    }
}

/**
 * Muestra un elemento HTML
 * @param {string} selector - Selector CSS del elemento
 */
function mostrarElemento(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.style.display = '';
    }
}

/**
 * Renderiza la interfaz según el rol del usuario
 * @param {Object} usuario - Usuario actual
 */
function renderizarInterfazSegunRol(usuario) {
    if (!usuario || !usuario.rol) return;

    const rol = ROLES[usuario.rol];
    if (!rol) return;

    // Ocultar elementos según permisos
    if (!tienePermiso('ver_balance', usuario)) {
        ocultarElemento('#tab-balance');
        ocultarElemento('[data-tab="balance"]');
    }

    if (!tienePermiso('ver_cortes', usuario)) {
        ocultarElemento('#tab-cortes');
        ocultarElemento('[data-tab="cortes"]');
    }

    if (!tienePermiso('configuracion', usuario)) {
        ocultarElemento('#btn-configuracion');
        ocultarElemento('[data-action="configuracion"]');
    }

    if (!tienePermiso('eliminar_datos', usuario)) {
        ocultarElemento('#btn-eliminar-datos');
        ocultarElemento('[data-action="eliminar"]');
    }

    if (!tienePermiso('backup_datos', usuario)) {
        ocultarElemento('#btn-backup');
        ocultarElemento('[data-action="backup"]');
    }

    if (!tienePermiso('gestionar_usuarios', usuario)) {
        ocultarElemento('#btn-usuarios');
        ocultarElemento('[data-action="usuarios"]');
    }

    // Mostrar badge de rol
    mostrarBadgeRol(usuario);
}

/**
 * Muestra el badge del rol del usuario
 * @param {Object} usuario - Usuario actual
 */
function mostrarBadgeRol(usuario) {
    const rol = ROLES[usuario.rol];
    if (!rol) return;

    // Crear badge si no existe
    let badge = document.querySelector('#badge-rol-usuario');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'badge-rol-usuario';
        badge.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 8px 16px;
            background: ${rol.color};
            color: white;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(badge);
    }

    badge.textContent = `${usuario.nombre} - ${rol.nombre}`;
}

// ========== VALIDACIÓN DE SESIÓN ==========

/**
 * Verifica que haya una sesión activa, de lo contrario redirige al login
 */
function verificarSesion() {
    const usuario = obtenerSesionActual();

    // Si no hay sesión y no estamos en login.html, redirigir
    if (!usuario && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return null;
    }

    return usuario;
}

// ========== EXPORTAR FUNCIONES ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ROLES,
        USUARIOS,
        autenticarUsuario,
        tienePermiso,
        obtenerSesionActual,
        guardarSesion,
        cerrarSesion,
        registrarAccion,
        obtenerAuditoria,
        obtenerAuditoriaPorUsuario,
        renderizarInterfazSegunRol,
        verificarSesion,
        ocultarElemento,
        mostrarElemento
    };
}
