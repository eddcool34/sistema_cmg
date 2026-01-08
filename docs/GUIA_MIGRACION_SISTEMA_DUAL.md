# GUÍA DE MIGRACIÓN AL SISTEMA DUAL
Sistema CMG - Supabase + Google Sheets

Esta guía te muestra EXACTAMENTE qué cambiar en tu código para implementar el sistema DUAL que guarda datos simultáneamente en Supabase y Google Sheets.

---

## 📋 PASO 1: INCLUIR LOS SCRIPTS EN TU HTML

En tu archivo `sistema_cmg.html`, ANTES de cerrar `</body>`, verifica que tengas estos scripts en ESTE ORDEN:

```html
<!-- Configuración de Supabase (NUEVO) -->
<script src="supabase-config.js"></script>

<!-- Google Sheets (ya lo tienes) -->
<script src="googleSheets.js"></script>

<!-- Integración DUAL (NUEVO) -->
<script src="supabase-integration.js"></script>
```

---

## 🔄 PASO 2: CAMBIOS EN LAS FUNCIONES DE GUARDADO

### CAMBIO 1: Guardar VENTAS/ENVÍOS

#### ❌ CÓDIGO ANTIGUO (Línea ~2872):
```javascript
const datosVenta = [
    nuevaVenta.id,
    nuevaVenta.fecha,
    // ... más campos
];

try {
    await guardarEnGoogleSheets('VENTAS', datosVenta);
    console.log('✅ Venta guardada en Google Sheets');
} catch (error) {
    console.error('❌ Error al guardar venta:', error);
}
```

#### ✅ CÓDIGO NUEVO:
```javascript
const datosVenta = [
    nuevaVenta.id,
    nuevaVenta.fecha,
    // ... resto de campos (igual que antes)
];

try {
    // Guardar en sistema DUAL (Supabase + Google Sheets)
    await guardarDual('VENTAS', datosVenta);
    console.log('✅ Venta guardada en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar venta:', error);
    // Nota: La venta YA está en localStorage, solo falló el respaldo en nube
}
```

---

### CAMBIO 2: Guardar CLIENTES

#### ❌ CÓDIGO ANTIGUO (Línea ~2895):
```javascript
const datosCliente = [
    nuevaVenta.nombreRemitente,
    nuevaVenta.telefonoRemitente,
    // ... más campos
];

try {
    await guardarEnGoogleSheets('CLIENTES', datosCliente);
} catch (error) {
    console.error('❌ Error al guardar cliente:', error);
}
```

#### ✅ CÓDIGO NUEVO:
```javascript
const datosCliente = [
    `CLI-${Date.now()}`,                    // ID_Cliente
    new Date().toLocaleDateString('es-MX'), // Fecha_Registro
    nuevaVenta.nombreRemitente,             // Nombre
    nuevaVenta.telefonoRemitente,           // Telefono
    // ... resto de campos
];

try {
    await guardarDual('CLIENTES', datosCliente);
    console.log('✅ Cliente guardado en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar cliente:', error);
}
```

---

### CAMBIO 3: Guardar SERVICIOS

#### ❌ CÓDIGO ANTIGUO (Línea ~2918):
```javascript
const datosServicio = [
    nuevaVenta.id,
    nuevaVenta.fecha,
    // ... más campos
];

try {
    await guardarEnGoogleSheets('SERVICIOS', datosServicio);
} catch (error) {
    console.error('❌ Error al guardar servicio:', error);
}
```

#### ✅ CÓDIGO NUEVO:
```javascript
const datosServicio = [
    nuevaVenta.id,
    nuevaVenta.fecha,
    // ... resto de campos (igual que antes)
];

try {
    await guardarDual('SERVICIOS', datosServicio);
    console.log('✅ Servicio guardado en Sistema DUAL (Supabase + Google Sheets)');
} catch (error) {
    console.error('❌ Error al guardar servicio:', error);
}
```

---

## 🛠️ PASO 3: FUNCIÓN AUXILIAR guardarDual

La función `guardarDual` está definida en `supabase-integration.js` y funciona así:

```javascript
async function guardarDual(tabla, datos) {
    // 1. Convierte el array a objeto para Supabase
    // 2. Guarda en Supabase
    // 3. Guarda en Google Sheets
    // 4. Retorna resultados de ambas operaciones
}
```

**Características:**
- ✅ Guarda en AMBOS sistemas automáticamente
- ✅ Si uno falla, el otro sigue funcionando
- ✅ Logs detallados en consola
- ✅ No necesitas cambiar tu formato de datos

---

## 📊 PASO 4: VERIFICAR ESTADO DEL SISTEMA

Para ver si todo está configurado correctamente, abre la consola del navegador (F12) y ejecuta:

```javascript
obtenerEstadoDual()
```

Deberías ver algo como:

```
📊 Estado del Sistema DUAL:
  Supabase: ✅ disponible, ✅ configurado
  Google Sheets: ✅ disponible, ✅ configurado
```

También puedes usar:

```javascript
console.table(obtenerEstadoDual())
```

---

## 📋 RESUMEN DE CAMBIOS

1. ✅ Incluir 2 scripts nuevos (`supabase-config.js` y `supabase-integration.js`)

2. ✅ Cambiar todas las llamadas de:
   ```javascript
   await guardarEnGoogleSheets('TABLA', datos);
   ```

   Por:
   ```javascript
   await guardarDual('TABLA', datos);
   ```

3. ✅ Los datos siguen siendo un array (NO necesitas cambiar el formato)

4. ✅ La conversión a objeto para Supabase es automática

---

## 🔍 VERIFICACIÓN FINAL

Después de hacer los cambios:

1. **Guarda** el archivo `sistema_cmg.html`

2. **Recarga** la página en el navegador (Ctrl + Shift + R para forzar recarga)

3. **Abre la consola** (F12)

4. **Verifica** que veas estos mensajes al cargar:
   ```
   ✅ Supabase conectado correctamente
   📊 Google Sheets Integration cargado
   📊 Sistema DUAL cargado
   ```

5. **Prueba** crear una venta nueva

6. **En la consola** deberías ver:
   ```
   📊 DUAL: Guardando en VENTAS...
   ✅ Supabase: Guardado en VENTAS
   ✅ Google Sheets: Sincronizado en VENTAS
   ✅ DUAL: Guardado exitoso en ambos sistemas (VENTAS)
   ```

7. **Verifica** que aparezca tanto en Supabase como en Google Sheets

---

## ❓ ¿NECESITAS AYUDA?

Si algo no funciona:

1. **Abre la consola** del navegador (F12)
2. **Revisa si hay errores** en rojo
3. **Ejecuta:** `obtenerEstadoDual()`
4. **Verifica** que los 3 scripts estén cargados en el orden correcto
5. **Revisa** que `supabase-config.js` tenga las credenciales correctas

---

## 📚 ARCHIVOS RELACIONADOS

- `supabase-config.js` - Configuración de Supabase
- `supabase-integration.js` - Lógica del sistema DUAL
- `googleSheets.js` - Integración con Google Sheets
- `CAMBIOS_EXACTOS.md` - Cambios específicos línea por línea

---

## ✅ CHECKLIST FINAL

- [ ] Los 3 scripts están incluidos en el HTML
- [ ] Los 3 cambios están hechos (VENTAS, CLIENTES, SERVICIOS)
- [ ] `obtenerEstadoDual()` muestra todo en verde
- [ ] Una venta de prueba aparece en Supabase
- [ ] La misma venta aparece en Google Sheets
- [ ] No hay errores en la consola
