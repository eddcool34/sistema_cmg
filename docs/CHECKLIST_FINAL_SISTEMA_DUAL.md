# ✅ CHECKLIST FINAL - SISTEMA DUAL
Sistema CMG - Verificación completa de Supabase + Google Sheets

---

## 📋 PARTE 1: VERIFICACIÓN DE ARCHIVOS

### 1.1 Scripts en sistema_cmg.html

Abre `sistema_cmg.html` y busca antes de `</body>` (líneas ~8909-8911):

```html
<script src="supabase-config.js"></script>
<script src="googleSheets.js"></script>
<script src="supabase-integration.js"></script>
```

- [ ] ✅ `supabase-config.js` está incluido
- [ ] ✅ `googleSheets.js` está incluido
- [ ] ✅ `supabase-integration.js` está incluido
- [ ] ✅ Los scripts están en el ORDEN correcto

---

### 1.2 Archivos existen en el sistema

Verifica que estos archivos existan:

```bash
ls -la /home/user/sistema_cmg/supabase-config.js
ls -la /home/user/sistema_cmg/googleSheets.js
ls -la /home/user/sistema_cmg/supabase-integration.js
```

- [ ] ✅ `supabase-config.js` existe
- [ ] ✅ `googleSheets.js` existe
- [ ] ✅ `supabase-integration.js` existe

---

## 📋 PARTE 2: VERIFICACIÓN DE CÓDIGO

### 2.1 Cambio en VENTAS (Línea ~3006)

Busca en `sistema_cmg.html` la línea ~3006:

```javascript
await guardarDual('VENTAS', datosVenta);
console.log('✅ Venta guardada en Sistema DUAL (Supabase + Google Sheets)');
```

- [ ] ✅ Usa `guardarDual` (NO `guardarEnGoogleSheets`)
- [ ] ✅ El mensaje dice "Sistema DUAL"

---

### 2.2 Cambio en CLIENTES (Línea ~3029)

Busca en `sistema_cmg.html` la línea ~3029:

```javascript
await guardarDual('CLIENTES', datosCliente);
console.log('✅ Cliente guardado en Sistema DUAL (Supabase + Google Sheets)');
```

- [ ] ✅ Usa `guardarDual` (NO `guardarEnGoogleSheets`)
- [ ] ✅ El mensaje dice "Sistema DUAL"

---

### 2.3 Cambio en SERVICIOS (Línea ~3052)

Busca en `sistema_cmg.html` la línea ~3052:

```javascript
await guardarDual('SERVICIOS', datosServicio);
console.log('✅ Servicio guardado en Sistema DUAL (Supabase + Google Sheets)');
```

- [ ] ✅ Usa `guardarDual` (NO `guardarEnGoogleSheets`)
- [ ] ✅ El mensaje dice "Sistema DUAL"

---

## 📋 PARTE 3: VERIFICACIÓN EN NAVEGADOR

### 3.1 Abrir el sistema

1. Abre `sistema_cmg.html` en tu navegador
2. Abre la consola del navegador (F12)

- [ ] ✅ La página carga sin errores
- [ ] ✅ No hay errores rojos en la consola

---

### 3.2 Verificar mensajes de carga

En la consola deberías ver:

```
✅ Supabase conectado correctamente
📊 Google Sheets Integration cargado
📊 Sistema DUAL cargado
```

- [ ] ✅ Mensaje de Supabase aparece
- [ ] ✅ Mensaje de Google Sheets aparece
- [ ] ✅ Mensaje de Sistema DUAL aparece

---

### 3.3 Verificar estado del sistema

En la consola, ejecuta:

```javascript
obtenerEstadoDual()
```

Deberías ver:

```
📊 Estado del Sistema DUAL:
  Supabase: ✅ disponible, ✅ configurado
  Google Sheets: ✅ disponible, ✅ configurado
```

También puedes ejecutar:

```javascript
console.table(obtenerEstadoDual())
```

Para ver una tabla con:

| Sistema | Disponible | Configurado |
|---------|------------|-------------|
| Supabase | true | true |
| Google Sheets | true | true |

- [ ] ✅ Supabase disponible: true
- [ ] ✅ Supabase configurado: true
- [ ] ✅ Google Sheets disponible: true
- [ ] ✅ Google Sheets configurado: true

---

## 📋 PARTE 4: PRUEBA CON VENTA REAL

### 4.1 Crear venta de prueba

1. Inicia sesión en el sistema
2. Abre un turno
3. Crea una nueva venta con estos datos:

```
Nombre Remitente: Juan Pérez TEST
Teléfono: 5512345678
Paquetería: FedEx
Tipo Servicio: Nacional
Precio: 150
Costo: 100
```

- [ ] ✅ Venta creada sin errores

---

### 4.2 Verificar consola del navegador

Después de crear la venta, en la consola deberías ver:

```
📊 DUAL: Guardando en VENTAS...
✅ Supabase: Guardado en VENTAS
✅ Google Sheets: Sincronizado en VENTAS
✅ DUAL: Guardado exitoso en ambos sistemas (VENTAS)
```

- [ ] ✅ Mensaje "DUAL: Guardando en VENTAS..." aparece
- [ ] ✅ Mensaje "Supabase: Guardado" aparece
- [ ] ✅ Mensaje "Google Sheets: Sincronizado" aparece
- [ ] ✅ Mensaje "Guardado exitoso en ambos sistemas" aparece
- [ ] ✅ NO hay errores rojos

---

### 4.3 Verificar en Supabase

1. Abre tu proyecto de Supabase: https://supabase.com/dashboard
2. Ve a la tabla `ventas`
3. Busca la venta con "Juan Pérez TEST"

- [ ] ✅ La venta aparece en Supabase
- [ ] ✅ Los datos son correctos
- [ ] ✅ La fecha/hora es la correcta

---

### 4.4 Verificar en Google Sheets

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/{TU_ID}
2. Ve a la hoja "VENTAS"
3. Busca la venta con "Juan Pérez TEST"

- [ ] ✅ La venta aparece en Google Sheets
- [ ] ✅ Los datos son correctos
- [ ] ✅ La fecha/hora es la correcta

---

### 4.5 Verificar sincronización

Compara la venta en ambos sistemas:

| Campo | Supabase | Google Sheets | ¿Coinciden? |
|-------|----------|---------------|-------------|
| ID | ENV-xxxxx | ENV-xxxxx | [ ] ✅ |
| Nombre | Juan Pérez TEST | Juan Pérez TEST | [ ] ✅ |
| Teléfono | 5512345678 | 5512345678 | [ ] ✅ |
| Precio | 150 | 150 | [ ] ✅ |
| Costo | 100 | 100 | [ ] ✅ |

- [ ] ✅ TODOS los campos coinciden en ambos sistemas

---

## 📋 PARTE 5: PRUEBA DE CLIENTES Y SERVICIOS

### 5.1 Crear cliente nuevo

Si la venta anterior era de un cliente nuevo:

1. Ve a Supabase → tabla `clientes`
2. Ve a Google Sheets → hoja "CLIENTES"

- [ ] ✅ El cliente aparece en Supabase
- [ ] ✅ El cliente aparece en Google Sheets
- [ ] ✅ Los datos coinciden

---

### 5.2 Crear servicio de prueba

1. En el sistema, cambia a tipo "Servicio"
2. Crea un servicio de prueba:

```
Nombre Cliente: María López TEST
Teléfono: 5598765432
Tipo Servicio: Copia
Precio: 50
Costo: 20
```

- [ ] ✅ Servicio creado sin errores

---

### 5.3 Verificar servicio en ambos sistemas

1. Ve a Supabase → tabla `servicios`
2. Ve a Google Sheets → hoja "SERVICIOS"

- [ ] ✅ El servicio aparece en Supabase
- [ ] ✅ El servicio aparece en Google Sheets
- [ ] ✅ Los datos coinciden

---

## 📋 PARTE 6: PRUEBA DE RESILIENCIA

### 6.1 Prueba sin conexión a Supabase

1. En `supabase-config.js`, comenta temporalmente las credenciales
2. Recarga la página
3. Crea una venta

Deberías ver:

```
⚠️ Supabase no disponible, solo guardará en Google Sheets
✅ Google Sheets: Sincronizado en VENTAS
⚠️ DUAL: Guardado parcial en VENTAS
```

- [ ] ✅ La venta se guarda en Google Sheets
- [ ] ✅ Aparece advertencia de Supabase no disponible
- [ ] ✅ El sistema sigue funcionando

---

### 6.2 Prueba sin conexión a Google Sheets

1. Restaura las credenciales de Supabase
2. Desconecta internet temporalmente
3. Crea una venta

Deberías ver:

```
✅ Supabase: Guardado en VENTAS
❌ Google Sheets: Error en VENTAS
⚠️ DUAL: Guardado parcial en VENTAS
```

- [ ] ✅ La venta se guarda en Supabase
- [ ] ✅ Aparece error de Google Sheets
- [ ] ✅ El sistema sigue funcionando

---

## ✅ RESULTADO FINAL

### Resumen de verificación:

| Categoría | Estado | Notas |
|-----------|--------|-------|
| **Archivos** | [ ] ✅ | Los 3 scripts están incluidos |
| **Código** | [ ] ✅ | Los 3 cambios están hechos |
| **Consola** | [ ] ✅ | No hay errores, mensajes correctos |
| **Estado** | [ ] ✅ | obtenerEstadoDual() todo verde |
| **Supabase** | [ ] ✅ | Datos se guardan correctamente |
| **Google Sheets** | [ ] ✅ | Datos se sincronizan correctamente |
| **Sincronización** | [ ] ✅ | Datos coinciden en ambos sistemas |

---

## 🎉 SI TODOS LOS CHECKS ESTÁN EN ✅

**¡FELICIDADES! El Sistema DUAL está funcionando correctamente.**

Tu sistema ahora:
- ✅ Guarda en Supabase (base de datos moderna)
- ✅ Guarda en Google Sheets (respaldo y análisis)
- ✅ Tiene redundancia de datos
- ✅ Sigue funcionando si uno falla
- ✅ Sincroniza automáticamente

---

## ❌ SI ALGO FALLÓ

### Pasos de diagnóstico:

1. **Revisa la consola del navegador (F12)**
   - Busca errores en rojo
   - Lee los mensajes de advertencia

2. **Ejecuta el diagnóstico:**
   ```javascript
   obtenerEstadoDual()
   ```

3. **Verifica las credenciales:**
   - `supabase-config.js` tiene las URL y KEY correctas
   - `config.js` tiene el SCRIPT_URL de Google correcto

4. **Revisa los archivos:**
   - `GUIA_MIGRACION_SISTEMA_DUAL.md` - Guía completa
   - `CAMBIOS_EXACTOS.md` - Cambios específicos

---

## 📞 SOPORTE

Si después de revisar todo sigue sin funcionar:

1. Toma captura de la consola con errores
2. Verifica el resultado de `obtenerEstadoDual()`
3. Revisa que los archivos de configuración tengan las credenciales correctas
4. Consulta la documentación en `/docs/`
