# 🔐 Sistema RBAC - Control de Acceso Basado en Roles

## 📋 Descripción General

El Sistema CMG ahora cuenta con un sistema completo de **RBAC (Role-Based Access Control)** que controla quién puede hacer qué en el sistema. Los usuarios deben autenticarse con usuario y contraseña antes de acceder, y sus permisos están determinados por el rol asignado.

---

## 🎭 Roles Disponibles

### 1. **ADMINISTRADOR** 👑
- **Descripción**: Dueño del sistema - Acceso total
- **Color**: Rojo (#dc2626)
- **Permisos**:
  - ✅ Ver todo
  - ✅ Modificar todo
  - ✅ Configuración del sistema
  - ✅ Gestionar usuarios
  - ✅ Cierre/Apertura de caja
  - ✅ Eliminar datos
  - ✅ Exportar/Importar datos
  - ✅ Reportes avanzados
  - ✅ Ver utilidades y comisiones

### 2. **SUPERVISOR** 🎓
- **Descripción**: Gerente/Encargado - Acceso amplio
- **Color**: Amarillo/Naranja (#f59e0b)
- **Permisos**:
  - ✅ Ver todo
  - ✅ Modificar ventas y entregas
  - ✅ Cierre/Apertura de caja
  - ✅ Exportar datos y backups
  - ✅ Reportes avanzados
  - ✅ Ver utilidades y comisiones
  - ❌ No puede configurar el sistema
  - ❌ No puede eliminar datos
  - ❌ No puede gestionar usuarios
  - ❌ No puede modificar precios

### 3. **CAJERO** 💼
- **Descripción**: Empleado normal - Acceso limitado
- **Color**: Azul (#3b82f6)
- **Permisos**:
  - ✅ Ver ventas, entregas y servicios
  - ✅ Crear ventas
  - ✅ Modificar entregas
  - ✅ Reportes básicos
  - ❌ No puede ver balance general
  - ❌ No puede ver cortes de caja
  - ❌ No puede cerrar/abrir caja
  - ❌ No puede editar/eliminar ventas
  - ❌ No puede exportar datos
  - ❌ No puede ver utilidades

### 4. **AUDITOR** 📊
- **Descripción**: Contador/Auditor - Solo lectura
- **Color**: Púrpura (#8b5cf6)
- **Permisos**:
  - ✅ Ver todo (solo lectura)
  - ✅ Exportar datos
  - ✅ Reportes avanzados
  - ✅ Ver utilidades y comisiones
  - ❌ No puede modificar nada
  - ❌ No puede crear ventas
  - ❌ No puede cerrar/abrir caja
  - ❌ No puede configurar el sistema

---

## 🚀 Flujo de Uso

### 1. **Inicio de Sesión**
1. Los usuarios acceden a `login.html`
2. Ingresan su **usuario** y **contraseña**
3. El sistema verifica las credenciales
4. Si son correctas, se crea una sesión válida por 24 horas
5. Se registra el login en la auditoría
6. El usuario es redirigido a `sistema_cmg.html`

### 2. **Uso del Sistema**
1. El sistema verifica automáticamente la sesión
2. La interfaz se adapta según el rol del usuario
3. Los elementos sin permisos se ocultan automáticamente
4. Cada acción importante se registra en auditoría
5. El usuario puede ver su información en el header

### 3. **Cierre de Sesión**
1. El usuario hace clic en el botón "Cerrar Sesión"
2. El sistema confirma la acción
3. Se registra el logout en auditoría
4. La sesión se elimina
5. El usuario es redirigido al login

---

## 👥 Usuarios de Prueba

| Usuario   | Contraseña    | Rol           | Descripción                    |
|-----------|---------------|---------------|--------------------------------|
| `admin`   | `admin123`    | ADMINISTRADOR | Acceso total al sistema        |
| `edgar`   | `edgar123`    | SUPERVISOR    | Gerente con acceso amplio      |
| `mariana` | `mariana123`  | CAJERO        | Empleado con acceso limitado   |
| `contador`| `contador123` | AUDITOR       | Solo lectura para contabilidad |

> ⚠️ **IMPORTANTE**: Cambiar estas contraseñas en producción

---

## 📂 Archivos del Sistema RBAC

### 1. **rbac-config.js** - Configuración Principal
- Define roles y permisos
- Base de datos de usuarios
- Funciones de autenticación
- Sistema de auditoría
- Funciones de interfaz dinámica

### 2. **login.html** - Pantalla de Login
- Formulario de autenticación
- Vista previa de usuarios (solo desarrollo)
- Validación de credenciales
- Manejo de sesiones

### 3. **gestion_usuarios.html** - Gestión de Usuarios
- Lista de usuarios del sistema
- Crear/editar usuarios
- Activar/desactivar usuarios
- Historial de auditoría
- Exportar logs

### 4. **sistema_cmg.html** - Sistema Principal (Modificado)
- Verificación automática de sesión
- Interfaz adaptada según rol
- Información de usuario en header
- Botón de cerrar sesión
- Registros de auditoría

---

## 🔧 Funciones Principales

### Autenticación
```javascript
// Autenticar usuario
const usuario = autenticarUsuario('admin', 'admin123');

// Verificar sesión actual
const sesion = obtenerSesionActual();

// Guardar sesión
guardarSesion(usuario);

// Cerrar sesión
cerrarSesion();
```

### Verificación de Permisos
```javascript
// Verificar si tiene permiso
if (tienePermiso('crear_ventas', usuario)) {
    // Permitir crear venta
}

// Ejemplo: Verificar si puede ver balance
if (tienePermiso('ver_balance', usuario)) {
    // Mostrar tab de balance
}
```

### Auditoría
```javascript
// Registrar acción
registrarAccion(usuario, 'crear_venta', 'Venta VENT-001 creada');

// Obtener historial
const auditoria = obtenerAuditoria(100);

// Filtrar por usuario
const auditoriaCajero = obtenerAuditoriaPorUsuario('Mariana');
```

### Interfaz Dinámica
```javascript
// Renderizar interfaz según rol
renderizarInterfazSegunRol(usuario);

// Ocultar elemento
ocultarElemento('#tab-balance');

// Mostrar elemento
mostrarElemento('#tab-cortes');
```

---

## 📊 Sistema de Auditoría

### ¿Qué se Registra?
- ✅ Inicios de sesión
- ✅ Cierres de sesión
- ✅ Creación de ventas
- ✅ Edición de ventas
- ✅ Eliminación de datos
- ✅ Exportación de datos
- ✅ Cambios de configuración
- ✅ Intentos de acceso denegados

### Información Capturada
```javascript
{
    timestamp: "2025-12-11T10:30:45.123Z",
    usuario: "Mariana",
    rol: "CAJERO",
    accion: "crear_venta",
    detalles: "Venta VENT-001 creada por $500.00"
}
```

### Consultar Auditoría
- Acceso desde `gestion_usuarios.html` (solo ADMINISTRADOR)
- Filtrar por usuario
- Exportar a CSV
- Ver últimos 1000 registros

---

## 🔒 Seguridad

### Sesiones
- **Duración**: 24 horas
- **Almacenamiento**: localStorage (sesion_cmg)
- **Verificación**: Al cargar cada página
- **Expiración**: Automática después de 24h

### Contraseñas
> ⚠️ **PRODUCCIÓN**: Implementar hash de contraseñas (bcrypt, SHA-256)

Actualmente las contraseñas se almacenan en texto plano. Para producción:
```javascript
// Ejemplo con bcrypt (requiere implementación backend)
const hash = bcrypt.hashSync(password, 10);
const match = bcrypt.compareSync(password, hash);
```

### Protección de Rutas
```javascript
// Verificar sesión en cada página
const usuario = verificarSesion();
if (!usuario) {
    window.location.href = 'login.html';
}
```

---

## 🎨 Personalización de Roles

### Agregar Nuevo Rol
1. Editar `rbac-config.js`
2. Agregar definición en `ROLES`:
```javascript
NUEVO_ROL: {
    nombre: 'Nombre del Rol',
    descripcion: 'Descripción del rol',
    permisos: {
        ver_ventas: true,
        crear_ventas: false,
        // ... más permisos
    },
    color: '#hexcolor'
}
```

### Agregar Nuevo Permiso
1. Agregar el permiso en todos los roles de `ROLES`
2. Implementar la verificación en el código:
```javascript
if (tienePermiso('nuevo_permiso', usuario)) {
    // Ejecutar acción
}
```

### Crear Nuevo Usuario
1. Acceder a `gestion_usuarios.html` como ADMINISTRADOR
2. Click en "Nuevo Usuario"
3. Completar formulario
4. El usuario queda activo inmediatamente

---

## 🛠️ Gestión de Usuarios

### Crear Usuario
- Solo ADMINISTRADOR puede crear usuarios
- Campos requeridos:
  - Usuario (único)
  - Nombre completo
  - Contraseña
  - Rol

### Activar/Desactivar Usuario
- Click en el botón de estado
- Los usuarios inactivos no pueden iniciar sesión
- Se registra el cambio en auditoría

### Modificar Usuario
- Actualmente: Solo activar/desactivar
- Futuro: Editar nombre, contraseña, rol

---

## 📱 Interfaz Adaptativa

### Elementos que se Ocultan Según Rol

#### Para CAJERO:
- Tab "Balance General"
- Tab "Cortes"
- Tab "Resumen de Cortes"
- Botón "Gestión de Usuarios"
- Botón "Configuración"
- Opciones de eliminar datos

#### Para AUDITOR:
- Botones de edición
- Botones de eliminación
- Formularios de creación
- Opciones de modificación
- Cierre/Apertura de caja

#### Para SUPERVISOR:
- Botón "Gestión de Usuarios"
- Opciones de configuración
- Opciones de eliminar datos

---

## 🐛 Depuración

### Ver Sesión Actual
```javascript
// En consola del navegador
console.log(obtenerSesionActual());
```

### Ver Auditoría
```javascript
// Ver últimos 50 registros
console.table(obtenerAuditoria(50));
```

### Limpiar Sesión (Forzar logout)
```javascript
localStorage.removeItem('sesion_cmg');
window.location.reload();
```

### Ver Todos los Roles
```javascript
console.log(ROLES);
```

---

## 📝 Notas Importantes

1. **Sesiones Locales**: El sistema usa localStorage, no hay backend. Las sesiones son locales al navegador.

2. **Sin Servidor**: No hay autenticación en servidor. Para producción se recomienda implementar un backend.

3. **Auditoría Local**: Los logs de auditoría se guardan en localStorage (máximo 1000 registros).

4. **Contraseñas**: Cambiar las contraseñas de prueba antes de usar en producción.

5. **Compatibilidad**: Funciona en navegadores modernos que soportan localStorage y ES6.

---

## 🔄 Migración de Datos

### Si ya tenías datos en el sistema:
1. Los datos de ventas, turnos y gastos se mantienen intactos
2. El sistema RBAC no modifica datos existentes
3. Solo agrega la capa de autenticación y permisos
4. Los cajeros existentes (Mariana, Edgar, Cris) ahora tienen usuarios

---

## 🚀 Próximas Mejoras

### Recomendaciones para Producción:
1. ✅ Implementar backend con Node.js + Express
2. ✅ Base de datos (MongoDB, PostgreSQL)
3. ✅ JWT para autenticación
4. ✅ Hash de contraseñas con bcrypt
5. ✅ Logs de auditoría en base de datos
6. ✅ Recuperación de contraseñas
7. ✅ Doble factor de autenticación (2FA)
8. ✅ Sesiones con expiración automática
9. ✅ Bloqueo por intentos fallidos

---

## 📞 Soporte

Para dudas o problemas con el sistema RBAC:
1. Revisar esta documentación
2. Verificar la consola del navegador
3. Comprobar que los archivos estén en la misma carpeta
4. Verificar que rbac-config.js se carga correctamente

---

## 📄 Licencia

Sistema desarrollado para **CMG Paquetería** - 2025
Control de Acceso Basado en Roles v1.0

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0
**Autor**: Sistema CMG - RBAC Implementation
