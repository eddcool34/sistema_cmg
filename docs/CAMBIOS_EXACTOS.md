# CAMBIOS EXACTOS PARA SISTEMA_CMG.HTML
Busca estas líneas específicas y verifica que estén actualizadas correctamente

---

## 📍 UBICACIÓN DE LOS SCRIPTS

### En el HTML, ANTES de cerrar `</body>` (Líneas 8909-8911):

```html
<!-- Configuración de Supabase (NUEVO) -->
<script src="supabase-config.js"></script>

<!-- Google Sheets (ya lo tienes) -->
<script src="googleSheets.js"></script>

<!-- Integración DUAL (NUEVO) -->
<script src="supabase-integration.js"></script>
```

**✅ VERIFICADO:** Estos scripts ya están incluidos correctamente.

---

## 🔄 CAMBIO 1: Línea ~3006 - Guardar VENTA

### BUSCA ESTE CÓDIGO (aproximadamente línea 3006):

```javascript
try {
    await guardarEnGoogleSheets('VENTAS', datosVenta);
    console.log('✅ Venta guardada en Google Sheets (nuevo formato)');
} catch (error) {
    console.error('❌ Error al guardar venta en Google Sheets (nuevo formato):', error);
}
```

### DEBE SER REEMPLAZADO POR:

```javascript
try {
    await guardarDual('VENTAS', datosVenta);
    console.log('✅ Venta guardada en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar venta en Sistema DUAL:', error);
    // Nota: La venta YA está en localStorage, solo falló el respaldo en nube
}
```

**✅ VERIFICADO:** Este cambio ya está implementado correctamente.

---

## 🔄 CAMBIO 2: Línea ~3029 - Guardar CLIENTE

### BUSCA ESTE CÓDIGO (aproximadamente línea 3029):

```javascript
try {
    await guardarEnGoogleSheets('CLIENTES', datosCliente);
    console.log('✅ Cliente guardado en Google Sheets');
} catch (error) {
    console.error('❌ Error al guardar cliente en Google Sheets:', error);
}
```

### DEBE SER REEMPLAZADO POR:

```javascript
try {
    await guardarDual('CLIENTES', datosCliente);
    console.log('✅ Cliente guardado en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar cliente en Sistema DUAL:', error);
}
```

**✅ VERIFICADO:** Este cambio ya está implementado correctamente.

---

## 🔄 CAMBIO 3: Línea ~3052 - Guardar SERVICIO

### BUSCA ESTE CÓDIGO (aproximadamente línea 3052):

```javascript
await guardarEnGoogleSheets('SERVICIOS', datosServicio);
console.log('✅ Servicio guardado en Google Sheets (nuevo formato)');
```

### DEBE SER REEMPLAZADO POR:

```javascript
try {
    await guardarDual('SERVICIOS', datosServicio);
    console.log('✅ Servicio guardado en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar servicio en Sistema DUAL:', error);
}
```

**✅ VERIFICADO:** Este cambio ya está implementado correctamente.

---

## 📊 ESTRUCTURA DE DATOS

La función `guardarDual` espera recibir los datos en formato array (igual que antes):

### Para VENTAS:
```javascript
const datosVenta = [
    nuevaVenta.id,                              // ID_Venta
    new Date(nuevaVenta.fecha).toLocaleDateString('es-MX'), // Fecha
    new Date(nuevaVenta.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }), // Hora
    nuevaVenta.nombreRemitente || '-',          // Nombre_Cliente/Remitente
    nuevaVenta.telefonoRemitente || '-',        // Telefono
    nuevaVenta.paqueteria || '-',               // Paqueteria
    nuevaVenta.tipoServicio || '-',             // Servicio
    nuevaVenta.peso || '-',                     // Peso_KG
    nuevaVenta.colonia || '-',                  // Origen
    nuevaVenta.estado || '-',                   // Destino
    nuevaVenta.precio || '0',                   // Precio
    nuevaVenta.costo || '0',                    // Costo
    (parseFloat(nuevaVenta.precio || 0) - parseFloat(nuevaVenta.costo || 0)).toFixed(2), // Ganancia
    parseFloat(nuevaVenta.precio || 0).toFixed(2), // Total
    nuevaVenta.cajero || 'Sin turno',           // Usuario/Cajero
    nuevaVenta.metodoPago || 'efectivo',        // Metodo_Pago
    nuevaVenta.estadoVenta || 'activa'          // Status
];
```

### Para CLIENTES:
```javascript
const datosCliente = [
    `CLI-${Date.now()}`,                    // ID_Cliente
    new Date().toLocaleDateString('es-MX'), // Fecha_Registro
    nuevaVenta.nombreRemitente,             // Nombre
    nuevaVenta.telefonoRemitente,           // Telefono
    '-',                                    // Email
    nuevaVenta.direccion || '-',            // Direccion
    nuevaVenta.colonia || '-',              // Ciudad
    nuevaVenta.estado || '-',               // Estado
    nuevaVenta.codigoPostal || '-',         // CP
    '-'                                     // RFC
];
```

### Para SERVICIOS:
```javascript
const datosServicio = [
    nuevaVenta.id,                              // ID_Venta
    new Date(nuevaVenta.fecha).toLocaleDateString('es-MX'), // Fecha
    new Date(nuevaVenta.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }), // Hora
    nuevaVenta.nombreCliente || '-',            // Nombre_Cliente
    nuevaVenta.telefonoCliente || '-',          // Telefono_Cliente
    nuevaVenta.tipoServicioSeleccionado || '-', // Tipo_Servicio
    nuevaVenta.precio || '0',                   // Precio
    nuevaVenta.costo || '0',                    // Costo
    (parseFloat(nuevaVenta.precio || 0) - parseFloat(nuevaVenta.costo || 0)).toFixed(2), // Ganancia
    nuevaVenta.cajero || 'Sin turno',           // Usuario/Cajero
    nuevaVenta.metodoPago || 'efectivo',        // Metodo_Pago
    nuevaVenta.estadoVenta || 'activa'          // Status
];
```

---

## 🔍 CÓMO FUNCIONA guardarDual

La función `guardarDual` internamente:

1. **Recibe** un array de datos
2. **Convierte** el array a objeto usando `convertirArrayAObjeto()`
3. **Guarda** en Supabase (formato objeto)
4. **Guarda** en Google Sheets (formato array original)
5. **Retorna** resultados de ambas operaciones

```javascript
async function guardarDual(tabla, datos) {
    // 1. Convertir array a objeto para Supabase
    const objetoDatos = convertirArrayAObjeto(tabla, datos);

    // 2. Guardar en Supabase
    await window.supabaseClient
        .from(tabla.toLowerCase())
        .insert([objetoDatos]);

    // 3. Guardar en Google Sheets
    await guardarEnGoogleSheets(tabla, datos);
}
```

---

## ✅ VERIFICACIÓN DE CAMBIOS

Después de hacer los cambios, verifica:

### 1. Scripts cargados (líneas 8909-8911):
```
✅ supabase-config.js
✅ googleSheets.js
✅ supabase-integration.js
```

### 2. Función guardarDual usada en 3 lugares:
```
✅ Línea ~3006: VENTAS
✅ Línea ~3029: CLIENTES
✅ Línea ~3052: SERVICIOS
```

### 3. Consola del navegador muestra:
```
✅ Supabase conectado correctamente
📊 Google Sheets Integration cargado
📊 Sistema DUAL cargado
```

### 4. Al crear una venta, la consola muestra:
```
📊 DUAL: Guardando en VENTAS...
✅ Supabase: Guardado en VENTAS
✅ Google Sheets: Sincronizado en VENTAS
✅ DUAL: Guardado exitoso en ambos sistemas (VENTAS)
```

---

## 🎯 PRUEBA COMPLETA

1. Abre `sistema_cmg.html` en el navegador
2. Abre la consola (F12)
3. Ejecuta: `obtenerEstadoDual()`
4. Crea una venta de prueba
5. Verifica en Supabase que aparezca la venta
6. Verifica en Google Sheets que aparezca la venta
7. Si ambos tienen la venta: **✅ SISTEMA DUAL FUNCIONANDO**

---

## 📋 ESTADO ACTUAL

✅ Los 3 scripts están incluidos en el HTML
✅ Los 3 cambios están implementados (VENTAS, CLIENTES, SERVICIOS)
⏳ Falta verificar con `obtenerEstadoDual()`
⏳ Falta crear venta de prueba
⏳ Falta verificar en Supabase
⏳ Falta verificar en Google Sheets

---

## 📚 DOCUMENTACIÓN RELACIONADA

- `GUIA_MIGRACION_SISTEMA_DUAL.md` - Guía completa de migración
- `supabase-config.js` - Configuración de Supabase
- `supabase-integration.js` - Implementación del sistema DUAL
- `googleSheets.js` - Integración con Google Sheets
