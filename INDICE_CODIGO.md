# 🔍 ÍNDICE DE CÓDIGO - Sistema CMG

> **Guía rápida para encontrar código y funcionalidades específicas**

---

## 📚 Tabla de Contenidos

1. [Buscar por Funcionalidad](#buscar-por-funcionalidad)
2. [Buscar por Archivo](#buscar-por-archivo)
3. [Buscar por Concepto](#buscar-por-concepto)
4. [Comandos de Búsqueda Útiles](#comandos-de-búsqueda-útiles)

---

## 🎯 Buscar por Funcionalidad

### Autenticación y Seguridad

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Login de usuario** | `login.html` | Todo | Pantalla de inicio de sesión |
| **Autenticación** | `rbac-config.js` | 256-275 | `autenticarUsuario()` |
| **Verificar sesión** | `rbac-config.js` | 522-532 | `verificarSesion()` |
| **Cerrar sesión** | `rbac-config.js` | 349-355 | `cerrarSesion()` |
| **Sistema RBAC** | `rbac-config.js` | 7-203 | Definición de roles y permisos |
| **Validación de permisos** | `rbac-config.js` | 283-303 | `tienePermiso()` |
| **Auditoría** | `rbac-config.js` | 365-414 | Sistema de logs |

### Gestión de Ventas

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Registrar venta** | `sistema_cmg.html` | ~2200-2300 | Formulario y lógica |
| **Editar venta** | `sistema_cmg.html` | 2113-2195 | `abrirModalEdicion()`, `guardarEdicion()` |
| **Calcular comisión** | `sistema_cmg.html` | 2022-2043 | `calcularComision()` |
| **Validar campos venta** | `utils-validacion.js` | 364-413 | `validarFormularioVenta()` |
| **Formatear precio** | `utils-formateo.js` | 18-30 | `formatearMoneda()` |

### Gestión de Turnos

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Abrir turno** | `sistema_cmg.html` | 1775-1853 | `abrirTurno()` |
| **Cerrar turno** | `sistema_cmg.html` | 1875-1951 | `cerrarTurno()` |
| **Balance de turno** | `sistema_cmg.html` | 3548-3577 | `calcularBalanceRealTurno()` |
| **Turno actual** | `utils-storage.js` | 231-250 | `guardarTurnoActual()`, `obtenerTurnoActual()` |

### Gestión de Gastos

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Registrar gasto** | `sistema_cmg.html` | 1954-2018 | `guardarGastoActualizado()` |
| **Validar gasto** | `utils-validacion.js` | 415-442 | `validarFormularioGasto()` |
| **Almacenar gastos** | `utils-storage.js` | 252-263 | `guardarGastos()`, `obtenerGastos()` |

### Exportación e Importación

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Exportar CSV** | `sistema_cmg.html` | 1647-1746 | `exportarVentasCSV()` |
| **Importar guías** | `sistema_cmg.html` | 1593-1630 | `handleGuiaFileSelect()` |
| **Generar PDF** | `sistema_cmg.html` | ~2500+ | Lógica de PDF con jsPDF |
| **Backup datos** | `backup_datos.html` | Todo | Sistema de backup completo |

### Sincronización Google Sheets

| Funcionalidad | Ubicación | Líneas | Descripción |
|---------------|-----------|--------|-------------|
| **Guardar en Sheets** | `googleSheets.js` | 27-88 | `guardarEnGoogleSheets()` |
| **Sincronizar múltiple** | `googleSheets.js` | 167-198 | `sincronizarMultiple()` |
| **Verificar configuración** | `googleSheets.js` | 204-223 | `googleSheetsEstaConfigurado()` |

### Validación de Datos

| Funcionalidad | Ubicación | Archivo | Función |
|---------------|-----------|---------|---------|
| **Validar teléfono** | `utils-validacion.js` | Línea 60 | `esTeléfonoValido()` |
| **Validar email** | `utils-validacion.js` | Línea 71 | `esEmailValido()` |
| **Validar precio** | `utils-validacion.js` | Línea 338 | `validarPrecio()` |
| **Validar nombre** | `utils-validacion.js` | Línea 307 | `validarNombre()` |
| **Sanitizar string** | `utils-validacion.js` | Línea 456 | `sanitizarString()` |

### Formateo de Datos

| Funcionalidad | Ubicación | Archivo | Función |
|---------------|-----------|---------|---------|
| **Formatear moneda** | `utils-formateo.js` | Línea 18 | `formatearMoneda()` |
| **Formatear fecha** | `utils-formateo.js` | Línea 70 | `formatearFechaCorta()` |
| **Formatear teléfono** | `utils-formateo.js` | Línea 212 | `formatearTelefono()` |
| **Formatear ID venta** | `utils-formateo.js` | Línea 247 | `formatearIdVenta()` |
| **Calcular tiempo transcurrido** | `utils-formateo.js` | Línea 141 | `tiempoTranscurrido()` |

### Almacenamiento (localStorage)

| Funcionalidad | Ubicación | Archivo | Función |
|---------------|-----------|---------|---------|
| **Guardar datos** | `utils-storage.js` | Línea 80 | `guardarEnStorage()` |
| **Obtener datos** | `utils-storage.js` | Línea 118 | `obtenerDeStorage()` |
| **Guardar ventas** | `utils-storage.js` | Línea 178 | `guardarVentas()` |
| **Caché con expiración** | `utils-storage.js` | Línea 273 | `guardarEnCache()` |
| **Validar integridad** | `utils-storage.js` | Línea 417 | `validarIntegridadDatos()` |

---

## 📁 Buscar por Archivo

### Archivos HTML (Interfaz)

#### `sistema_cmg.html` (8,826 líneas) ⭐ PRINCIPAL

**Estructura:**
- Líneas 1-63: Head, importaciones
- Líneas 64-1082: Scripts auxiliares y configuración
- Líneas 1083-8756: Componente React App (MONOLÍTICO)
  - 1094-1273: Estados (useState hooks)
  - 1274-1575: Efectos (useEffect hooks)
  - 1576-3579: Funciones de lógica de negocio
  - 3580-8756: Render JSX (interfaz completa)
- Líneas 8760-8789: Wrapper con autenticación
- Líneas 8793-8822: Scripts de depuración

**Funciones principales:**
```
abrirTurno()              → línea 1775
cerrarTurno()             → línea 1875
guardarGastoActualizado() → línea 1954
calcularComision()        → línea 2022
handleInputChange()       → línea 2045
abrirModalEdicion()       → línea 2113
guardarEdicion()          → línea 2158
exportarVentasCSV()       → línea 1647
```

#### `login.html` (602 líneas)

**Estructura:**
- Pantalla de autenticación completa
- Formulario de login
- Validación de credenciales
- Redirección post-login

#### `gestion_usuarios.html` (685 líneas)

**Funciones:**
- Crear usuarios
- Editar usuarios existentes
- Eliminar usuarios
- Gestión de roles

#### `clientes.html` (823 líneas)

**Funciones:**
- Registro de clientes
- Búsqueda de clientes
- Edición de información
- Historial de transacciones

---

### Archivos JavaScript (Lógica)

#### `rbac-config.js` (552 líneas) - Autenticación y RBAC

**Secciones:**
- Líneas 7-203: Definición de roles (ADMINISTRADOR, SUPERVISOR, CAJERO, AUDITOR)
- Líneas 205-246: Carga de usuarios desde config.js
- Líneas 248-355: Funciones de autenticación
- Líneas 357-414: Sistema de auditoría
- Líneas 416-516: Interfaz dinámica según rol
- Líneas 518-533: Validación de sesión

#### `googleSheets.js` (237 líneas) - Integración Google Sheets

**Secciones:**
- Líneas 12-19: Carga de configuración
- Líneas 27-88: `guardarEnGoogleSheets()` principal
- Líneas 94-139: Funciones de envío y timeout
- Líneas 167-198: Sincronización múltiple
- Líneas 204-223: Verificación de configuración

#### `config.example.js` (129 líneas) - Plantilla de configuración

**Secciones:**
- Líneas 14-32: CONFIG_GOOGLE_SHEETS
- Líneas 44-81: CONFIG_USUARIOS (credenciales)
- Líneas 84-102: CONFIG_SISTEMA
- Líneas 105-119: CONFIG_UI

#### `constantes.js` (NUEVO) - Constantes centralizadas

**Secciones:**
- Líneas 11-75: Constantes de negocio
- Líneas 77-88: Precios y comisiones
- Líneas 90-130: Validación
- Líneas 132-175: Sistema
- Líneas 177-200: Tiempo
- Líneas 202-245: Interfaz
- Líneas 247-263: Defaults

#### `utils-validacion.js` (NUEVO) - Validadores

**Funciones principales:**
- Líneas 38-67: Validaciones básicas
- Líneas 69-133: Validaciones de formato
- Líneas 135-177: Validaciones de rango
- Líneas 179-232: Validaciones de fecha
- Líneas 234-370: Validaciones de negocio
- Líneas 372-442: Validación de formularios
- Líneas 444-489: Sanitización

#### `utils-formateo.js` (NUEVO) - Formateo de datos

**Funciones principales:**
- Líneas 18-60: Formateo de moneda
- Líneas 62-167: Formateo de fechas
- Líneas 169-202: Formateo de texto
- Líneas 204-231: Formateo de teléfono
- Líneas 233-258: Formateo de IDs
- Líneas 260-291: Formateo de datos
- Líneas 293-309: Formateo de archivos
- Líneas 311-347: Cálculos con formato

#### `utils-storage.js` (NUEVO) - localStorage seguro

**Funciones principales:**
- Líneas 21-68: Encriptación básica
- Líneas 70-172: Operaciones básicas de storage
- Líneas 174-263: Operaciones específicas del sistema
- Líneas 265-311: Sistema de caché
- Líneas 313-382: Gestión de espacio
- Líneas 384-415: Backup y restauración
- Líneas 417-449: Validación de integridad

---

## 🔑 Buscar por Concepto

### ¿Dónde buscar...?

#### Precios y Comisiones

```
PRECIO_ENTREGA_FIJO      → constantes.js:68
TASAS_COMISION           → constantes.js:73-77
calcularComision()       → sistema_cmg.html:2022
calcularComisionFormateada() → utils-formateo.js:318
```

#### Roles y Permisos

```
Definición de roles      → rbac-config.js:7-203
tienePermiso()           → rbac-config.js:283
renderizarInterfazSegunRol() → rbac-config.js:444
```

#### Validación de Formularios

```
validarFormularioVenta() → utils-validacion.js:364
validarFormularioGasto() → utils-validacion.js:415
validarTelefono()        → utils-validacion.js:321
validarPrecio()          → utils-validacion.js:338
```

#### Mensajes de Notificación

```
MENSAJES (constantes)    → constantes.js:202-224
showNotification()       → sistema_cmg.html (buscar función)
```

#### Almacenamiento de Datos

```
guardarVentas()          → utils-storage.js:178
obtenerVentas()          → utils-storage.js:185
guardarTurnoActual()     → utils-storage.js:231
obtenerTurnoActual()     → utils-storage.js:239
```

#### Sincronización Google Sheets

```
guardarEnGoogleSheets()  → googleSheets.js:27
sincronizarMultiple()    → googleSheets.js:167
CONFIG_GOOGLE_SHEETS     → config.example.js:14
```

---

## 💻 Comandos de Búsqueda Útiles

### Búsqueda con grep (terminal)

```bash
# Buscar una función específica
grep -rn "function abrirTurno" .

# Buscar uso de una constante
grep -rn "PRECIO_ENTREGA_FIJO" .

# Buscar validaciones
grep -rn "Validadores\." .

# Buscar almacenamiento
grep -rn "Storage\." .

# Buscar formateo
grep -rn "Formateo\." .

# Buscar TODO o FIXME
grep -rn "TODO\|FIXME" .

# Buscar console.log (para limpiar antes de producción)
grep -rn "console\." .
```

### Búsqueda con VS Code

```
Ctrl/Cmd + Shift + F    → Buscar en todos los archivos
Ctrl/Cmd + P            → Buscar archivo por nombre
Ctrl/Cmd + Shift + O    → Buscar símbolos en archivo actual
```

### Patrones de búsqueda útiles

| Buscar | Regex | Ejemplo |
|--------|-------|---------|
| Funciones | `function\s+(\w+)` | `function abrirTurno` |
| Variables | `const\s+(\w+)` | `const ventas` |
| Estados React | `useState\(` | `useState([])` |
| Efectos React | `useEffect\(` | `useEffect(() => {` |
| Comentarios TODO | `//\s*TODO` | `// TODO: Fix this` |
| console.log | `console\.log` | `console.log(...)` |

---

## 📊 Mapa de Dependencias

```
sistema_cmg.html
├── config.js (credenciales)
├── rbac-config.js (autenticación)
├── googleSheets.js (sincronización)
├── constantes.js ⭐ NUEVO
├── utils-validacion.js ⭐ NUEVO
├── utils-formateo.js ⭐ NUEVO
└── utils-storage.js ⭐ NUEVO

login.html
├── config.js
└── rbac-config.js

gestion_usuarios.html
├── config.js
└── rbac-config.js

backup_datos.html
├── config.js
└── rbac-config.js
```

---

## 🎯 Flujos de Funcionalidad

### Flujo: Registrar una Venta

```
1. Usuario completa formulario (sistema_cmg.html JSX)
   ↓
2. Validación con utils-validacion.js
   validarFormularioVenta(formData)
   ↓
3. Sanitización de datos
   sanitizarString(), sanitizarNumero()
   ↓
4. Cálculo de comisión
   calcularComision() o calcularComisionFormateada()
   ↓
5. Formateo para display
   formatearMoneda(), formatearFecha()
   ↓
6. Almacenamiento
   Storage.guardarVentas(ventas)
   ↓
7. Sincronización (opcional)
   guardarEnGoogleSheets('VENTAS', datos)
   ↓
8. Auditoría
   registrarAccion(usuario, 'crear_venta', detalles)
```

### Flujo: Apertura de Turno

```
1. Usuario hace click en "Abrir Turno"
   ↓
2. Validación de permisos
   tienePermiso('apertura_caja', usuario)
   ↓
3. Validación de contraseña
   formApertura.contraseña === CONTRASEÑA_SISTEMA
   ↓
4. Generación de ID de turno
   generarIdTurno(new Date(), numero)
   ↓
5. Creación de objeto turno
   { turno_id, cajero, fecha, hora, fondoInicial }
   ↓
6. Almacenamiento
   Storage.guardarTurnoActual(turno)
   ↓
7. Sincronización
   guardarEnGoogleSheets('TURNOS', turno)
   ↓
8. Notificación
   showNotification(MENSAJES.TURNO_ABIERTO)
```

---

## 🔖 Etiquetas y Convenciones

### Etiquetas en comentarios

```javascript
// TODO: Tarea pendiente
// FIXME: Bug conocido que necesita arreglo
// HACK: Solución temporal
// NOTE: Nota importante
// DEPRECATED: Código obsoleto
// SECURITY: Consideración de seguridad
```

### Prefijos de funciones

```javascript
// Validación
validar*()      → Valida y retorna { valido, error }
es*()           → Retorna boolean

// Formateo
formatear*()    → Formatea y retorna string

// Storage
guardar*()      → Guarda datos
obtener*()      → Recupera datos
eliminar*()     → Elimina datos

// Cálculo
calcular*()     → Calcula y retorna número
```

---

## 📞 Ayuda Rápida

**¿Necesitas buscar algo específico?**

1. **Funcionalidad de negocio** → `sistema_cmg.html`
2. **Autenticación/Roles** → `rbac-config.js`
3. **Validación de datos** → `utils-validacion.js`
4. **Formateo visual** → `utils-formateo.js`
5. **Almacenamiento** → `utils-storage.js`
6. **Constantes/Configuración** → `constantes.js` o `config.js`
7. **Sincronización** → `googleSheets.js`

---

**Última actualización:** 2025-01-23
**Versión:** 1.0
