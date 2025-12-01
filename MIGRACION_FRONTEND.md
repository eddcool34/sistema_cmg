# 🔄 Guía de Migración del Frontend

Esta guía te ayudará a actualizar tu archivo `sistema_cmg.html` para que use la nueva API en lugar de Google Sheets.

---

## 📝 **Método 1: Usar el API Connector (Recomendado - Más Fácil)**

### Paso 1: Incluir el archivo API Connector

Agrega esta línea en el `<head>` de tu `sistema_cmg.html`, justo después de las otras librerías:

```html
<script src="api/api-connector.js"></script>
```

### Paso 2: Configurar la URL de tu API

En `api/api-connector.js`, cambia la línea 15:

```javascript
// ANTES
const API_URL = 'https://tu-dominio.com/api/';

// DESPUÉS (con tu dominio real)
const API_URL = 'https://www.midominio.com/api/';
```

### Paso 3: Reemplazar las llamadas a Google Sheets

Busca en `sistema_cmg.html` todas las funciones que usan `GOOGLE_SCRIPT_URL` y reemplázalas:

#### **Guardar Venta**

**ANTES:**
```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarVenta',
        venta: venta
    })
});
```

**DESPUÉS:**
```javascript
const resultado = await guardarVentaAPI(venta);
```

#### **Obtener Ventas**

**ANTES:**
```javascript
const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=obtenerVentas`);
const data = await response.json();
const ventas = data.ventas || [];
```

**DESPUÉS:**
```javascript
const ventas = await obtenerVentasAPI();
// O con filtros:
const ventas = await obtenerVentasAPI({ turno_id: miTurnoId });
```

#### **Guardar Turno**

**ANTES:**
```javascript
await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarTurno',
        turno: nuevoTurno
    })
});
```

**DESPUÉS:**
```javascript
await guardarTurnoAPI(nuevoTurno);
```

#### **Obtener Turno Actual**

**ANTES:**
```javascript
const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=obtenerTurnoActual`);
const data = await response.json();
const turno = data.turno;
```

**DESPUÉS:**
```javascript
const turno = await obtenerTurnoActualAPI();
```

#### **Cerrar Turno**

**ANTES:**
```javascript
await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'cerrarTurno',
        turno: datoscierre
    })
});
```

**DESPUÉS:**
```javascript
await cerrarTurnoAPI(datoscierre);
```

#### **Guardar Gasto**

**ANTES:**
```javascript
await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarGasto',
        gasto: nuevoGasto
    })
});
```

**DESPUÉS:**
```javascript
await guardarGastoAPI(nuevoGasto);
```

#### **Guardar Cliente**

**ANTES:**
```javascript
await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarCliente',
        cliente: cliente
    })
});
```

**DESPUÉS:**
```javascript
await guardarClienteAPI(cliente);
```

---

## 📝 **Método 2: Actualización Manual (Más Control)**

Si prefieres no usar el API Connector y actualizar directamente, sigue estos pasos:

### Paso 1: Cambiar la constante de URL

Busca en `sistema_cmg.html` (línea ~63):

```javascript
// ANTES
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...';

// DESPUÉS
const API_URL = 'https://www.midominio.com/api/';
```

### Paso 2: Actualizar función de guardar venta

**ANTES:**
```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarVenta',
        venta: venta
    })
});
```

**DESPUÉS:**
```javascript
const response = await fetch(`${API_URL}?action=guardarVenta`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(venta)  // Ya no necesita envolver en {action, venta}
});
```

### Paso 3: Actualizar función de obtener ventas

**ANTES:**
```javascript
const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=obtenerVentas`);
const data = await response.json();
const ventas = data.ventas || [];
```

**DESPUÉS:**
```javascript
const response = await fetch(`${API_URL}?action=obtenerVentas`);
const data = await response.json();

if (!data.success) {
    throw new Error(data.error || 'Error obteniendo ventas');
}

const ventas = data.ventas || [];
```

### Paso 4: Agregar manejo de errores

Todas las respuestas ahora tienen un formato estándar:

```javascript
{
    "success": true,
    "ventas": [...]
}
// O en caso de error:
{
    "success": false,
    "error": "Mensaje de error"
}
```

Actualiza tu código para verificar `success`:

```javascript
const response = await fetch(`${API_URL}?action=guardarVenta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta)
});

const data = await response.json();

if (!data.success) {
    throw new Error(data.error || 'Error guardando venta');
}

console.log('Venta guardada con ID:', data.venta_id);
```

---

## 🔍 **Cambios Clave a Tener en Cuenta**

### 1. Headers de Content-Type

Ahora SIEMPRE debes incluir el header:

```javascript
headers: {
    'Content-Type': 'application/json'
}
```

### 2. Estructura de Datos

**Google Sheets** esperaba:
```javascript
{
    action: 'guardarVenta',
    venta: { ... }
}
```

**Nueva API** espera:
```javascript
// La acción va en la URL:
API_URL + '?action=guardarVenta'

// Los datos van directamente:
{ ... }
```

### 3. Respuestas de la API

Todas las respuestas tienen el formato:

```javascript
{
    success: true/false,
    [data],         // datos solicitados
    error: "..."    // solo si success = false
}
```

### 4. Fechas

La API maneja fechas en formato MySQL: `YYYY-MM-DD HH:MM:SS`

Asegúrate de convertir:

```javascript
const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
// Resultado: "2024-12-01 15:30:45"
```

---

## 🧪 **Probar la Migración**

### 1. Abrir Consola del Navegador

Presiona `F12` en tu navegador y ve a la pestaña "Console"

### 2. Verificar Conexión

El API Connector mostrará mensajes como:

```
✅ Conexión con API establecida correctamente
📡 API Connector cargado. Cliente API disponible como "apiClient"
```

### 3. Probar Funciones Básicas

En la consola, prueba:

```javascript
// Verificar conexión
await verificarConexionAPI();

// Obtener ventas
const ventas = await obtenerVentasAPI();
console.log(ventas);

// Obtener turno actual
const turno = await obtenerTurnoActualAPI();
console.log(turno);
```

### 4. Realizar Prueba Completa

1. Abre un turno
2. Registra una venta de prueba
3. Agrega un gasto
4. Cierra el turno
5. Verifica en phpMyAdmin que todo se guardó

---

## 🚨 **Solución de Problemas**

### Error de CORS

Si ves: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solución:**
1. Verifica que tu dominio esté en la lista `$allowed_origins` en `api/config.php`
2. Asegúrate de usar HTTPS (no HTTP)

### Error 404 Not Found

Si la API devuelve 404:

**Solución:**
1. Verifica que el archivo `api/.htaccess` esté presente
2. Verifica que `mod_rewrite` esté habilitado (Hostinger lo tiene por defecto)
3. Verifica la URL: debe ser `/api/` no `/api/index.php`

### Error de Conexión a Base de Datos

Si ves: `Could not connect to database`

**Solución:**
1. Verifica las credenciales en `api/config.php`
2. Activa `DEBUG_MODE = true` temporalmente para ver el error exacto
3. Verifica que la base de datos exista en phpMyAdmin

### Las ventas no se muestran

**Solución:**
1. Verifica que la tabla `ventas` tenga datos (phpMyAdmin)
2. Abre la consola del navegador (F12) para ver errores
3. Prueba la URL directamente: `https://tu-dominio.com/api/?action=obtenerVentas`

---

## ✅ **Checklist de Migración**

- [ ] Archivo `api-connector.js` subido a Hostinger
- [ ] URL de API configurada correctamente
- [ ] `api-connector.js` incluido en el HTML
- [ ] Todas las llamadas a `GOOGLE_SCRIPT_URL` reemplazadas
- [ ] Headers de `Content-Type` agregados
- [ ] Manejo de errores actualizado
- [ ] Pruebas de conexión exitosas
- [ ] Turno de prueba funciona
- [ ] Ventas de prueba se guardan
- [ ] Datos visibles en phpMyAdmin
- [ ] Cierre de turno funciona correctamente

---

## 📞 **¿Necesitas Ayuda?**

Si tienes problemas con la migración:

1. Activa la consola del navegador (F12) y busca errores en rojo
2. Verifica los logs de PHP en Hostinger (hPanel → Error Logs)
3. Activa `DEBUG_MODE = true` en `config.php` para ver errores detallados
4. Compara tu código con los ejemplos de esta guía

---

**¡Felicidades! Tu frontend ahora está conectado al backend en Hostinger.** 🎉
