# 🔍 Diagnóstico: Datos Diferentes en Dos Equipos

## ❌ Problema Identificado

**Síntoma**: Dos equipos registran ventas pero no ven la misma información.

**Causa Probable**: Cada equipo está usando una **fuente de datos diferente**.

## 🧩 Posibles Escenarios

### Escenario 1: Archivos Actualizados NO Subidos al Servidor ⚠️

**Situación Actual**:
- ✅ GitHub: Tiene los archivos actualizados (con MySQL API)
- ❌ Servidor (paqueteriacmg.com): TODAVÍA tiene la versión antigua (con Google Sheets)
- 📱 Equipo A: Accede desde `https://paqueteriacmg.com/sistema_cmg.html` → Usa Google Sheets
- 💻 Equipo B: Accede desde `https://paqueteriacmg.com/sistema_cmg.html` → Usa Google Sheets

**Resultado**:
- Ambos usan Google Sheets, PERO cada equipo puede tener cache diferente
- localStorage guarda datos localmente en cada navegador
- Las ventas están en localStorage de cada equipo, NO sincronizadas

**Solución**: Subir archivos actualizados al servidor (ver abajo)

---

### Escenario 2: Un Equipo USA Archivo Local, Otro Usa Servidor

**Situación**:
- 💻 Equipo A: Abre archivo local `file:///C:/Users/.../sistema_cmg.html` → localStorage local
- 📱 Equipo B: Abre desde servidor `https://paqueteriacmg.com/sistema_cmg.html` → Google Sheets

**Resultado**: Datos completamente diferentes

**Solución**: Ambos equipos deben usar la misma URL del servidor

---

### Escenario 3: Diferentes Navegadores/Cache

**Situación**:
- 💻 Equipo A: Chrome con cache antiguo
- 📱 Equipo B: Firefox con cache diferente

**Resultado**:
- Cada navegador tiene su propio localStorage
- Las ventas NO se comparten entre navegadores/equipos

**Solución**: Usar MySQL API para sincronizar todo

---

## 🔬 Cómo Diagnosticar

### Paso 1: Verificar QUÉ Sistema Está Usando Cada Equipo

**En EQUIPO A:**
1. Abre el sistema: `https://paqueteriacmg.com/sistema_cmg.html`
2. Presiona **F12** (abrir consola del navegador)
3. Ve a la pestaña **Console**
4. Busca uno de estos mensajes:

**Si usa MySQL API (versión nueva):**
```
📡 API Connector cargado. Cliente API disponible como "apiClient"
✅ Conexión con API establecida correctamente
```

**Si usa Google Sheets (versión antigua):**
```
(No verás el mensaje de API Connector)
```

5. Escribe en la consola:
```javascript
typeof apiClient
```

**Resultado esperado:**
- Si dice `"object"` → Está usando la versión nueva (MySQL API)
- Si dice `"undefined"` → Está usando la versión antigua (Google Sheets)

**Repite esto en EQUIPO B**

---

### Paso 2: Verificar Dónde Se Guardan Los Datos

**En cada equipo, en la consola escribe:**

```javascript
// Ver datos en localStorage
console.log('Ventas en localStorage:', localStorage.getItem('ventas'));
console.log('Turno actual:', localStorage.getItem('turnoActual'));

// Ver si hay api-connector
console.log('API Client:', typeof apiClient);
```

**Resultado:**
- Si hay ventas en localStorage pero no en MySQL → Datos locales no sincronizados
- Si no hay apiClient → Sistema antiguo (Google Sheets)

---

### Paso 3: Verificar Versión del Archivo en el Servidor

Abre en el navegador (desde cualquier equipo):
```
view-source:https://paqueteriacmg.com/sistema_cmg.html
```

Busca en las primeras líneas (línea 11):

**Si encuentra:**
```html
<script src="api/api-connector.js"></script>
```
✅ **Servidor tiene versión actualizada**

**Si NO encuentra esa línea:**
❌ **Servidor tiene versión antigua** → ESTE ES EL PROBLEMA

---

## ✅ Soluciones por Escenario

### Solución 1: Subir Archivos Actualizados al Servidor

**Si el servidor NO tiene los archivos actualizados:**

1. **Descargar archivos de GitHub:**
   - Ve a: https://github.com/eddcool34/sistema_cmg
   - Cambia a rama: `claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU`
   - Descarga:
     - `sistema_cmg.html`
     - `api/api-connector.js`

2. **Hacer BACKUP del servidor:**
   - Conecta via FTP/cPanel
   - Renombra: `sistema_cmg.html` → `sistema_cmg.html.OLD`

3. **Subir archivos nuevos:**
   - Sube `sistema_cmg.html` a la raíz
   - Sube `api-connector.js` a `/api/`

4. **Verificar backend PHP:**
   - Confirma que existe: `api/config.php`
   - Confirma que existe: `api/index.php`
   - Verifica credenciales MySQL en `config.php`

5. **Limpiar cache en AMBOS equipos:**
   ```
   Ctrl + Shift + Delete → Borrar cache
   O
   Ctrl + F5 (forzar recarga)
   ```

6. **Probar en ambos equipos:**
   - Equipo A: Registra una venta
   - Equipo B: Recarga la página → Debe ver la misma venta

---

### Solución 2: Migrar Datos de localStorage a MySQL

**Si ya tienes ventas en localStorage que quieres conservar:**

1. **En el equipo que tiene datos:**
   - Abre el sistema
   - Presiona F12 → Console
   - Ejecuta:
   ```javascript
   // Exportar ventas de localStorage
   const ventasLocal = JSON.parse(localStorage.getItem('ventas') || '[]');
   console.log('Total ventas en localStorage:', ventasLocal.length);

   // Copiar al portapapeles
   copy(JSON.stringify(ventasLocal, null, 2));
   ```

2. **Guardar en un archivo:**
   - Pega en un archivo de texto: `ventas_backup.json`

3. **Después de actualizar el servidor:**
   - Abre la consola nuevamente
   - Ejecuta:
   ```javascript
   // Pega aquí el contenido de ventas_backup.json
   const ventasBackup = [/* pegar aquí */];

   // Sincronizar a MySQL
   async function migrarVentas() {
       for (const venta of ventasBackup) {
           try {
               await guardarVentaAPI(venta);
               console.log('✅ Venta migrada:', venta.folio);
           } catch (error) {
               console.error('❌ Error:', venta.folio, error);
           }
       }
   }

   migrarVentas();
   ```

---

### Solución 3: Sincronización Inmediata (Temporal)

**Mientras subes los archivos actualizados, para sincronizar temporalmente:**

**Opción A: Exportar/Importar datos manualmente**

En EQUIPO A (con datos):
```javascript
// Exportar
const backup = {
    ventas: JSON.parse(localStorage.getItem('ventas') || '[]'),
    clientes: JSON.parse(localStorage.getItem('clientes') || '[]'),
    turnos: JSON.parse(localStorage.getItem('historialTurnos') || '[]')
};
copy(JSON.stringify(backup));
```

En EQUIPO B (sin datos):
```javascript
// Importar (pega el contenido copiado)
const backup = {/* pegar aquí */};
localStorage.setItem('ventas', JSON.stringify(backup.ventas));
localStorage.setItem('clientes', JSON.stringify(backup.clientes));
localStorage.setItem('historialTurnos', JSON.stringify(backup.turnos));
location.reload();
```

⚠️ **TEMPORAL** - Esto NO es una solución permanente

---

## 🎯 Plan de Acción Recomendado

### URGENTE - Para Sincronizar Hoy Mismo:

1. ✅ **Verificar qué versión está en el servidor**
   - Abre: `view-source:https://paqueteriacmg.com/sistema_cmg.html`
   - Busca: `<script src="api/api-connector.js"></script>`

2. ✅ **Si NO está la línea de arriba:**
   - Descarga archivos de GitHub (rama: `claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU`)
   - Sube `sistema_cmg.html` y `api/api-connector.js` al servidor
   - Verifica que `api/config.php` e `api/index.php` existan y funcionen

3. ✅ **Limpiar cache en TODOS los equipos:**
   - Ctrl + Shift + Delete
   - Seleccionar "Imágenes y archivos en cache"
   - Borrar

4. ✅ **Probar sincronización:**
   - Equipo A: Registrar venta de prueba
   - Equipo B: Recargar (F5) → Debe aparecer la venta

---

## 📊 Checklist de Verificación

### En el Servidor:
- [ ] `sistema_cmg.html` incluye `<script src="api/api-connector.js"></script>` en línea 11
- [ ] `api/api-connector.js` existe y es accesible
- [ ] `api/config.php` existe con credenciales MySQL correctas
- [ ] `api/index.php` existe y responde
- [ ] Base de datos MySQL tiene tablas creadas
- [ ] Endpoint funciona: `https://paqueteriacmg.com/api/?action=obtenerVentas`

### En Equipo A:
- [ ] Abre desde: `https://paqueteriacmg.com/sistema_cmg.html`
- [ ] Consola muestra: `"📡 API Connector cargado..."`
- [ ] `typeof apiClient` devuelve `"object"`
- [ ] Cache del navegador limpiado

### En Equipo B:
- [ ] Abre desde: `https://paqueteriacmg.com/sistema_cmg.html`
- [ ] Consola muestra: `"📡 API Connector cargado..."`
- [ ] `typeof apiClient` devuelve `"object"`
- [ ] Cache del navegador limpiado

### Prueba de Sincronización:
- [ ] Equipo A registra venta con folio único (ej: TEST-001)
- [ ] Equipo B recarga página (F5)
- [ ] Equipo B ve la venta TEST-001 en la lista
- [ ] ✅ SINCRONIZACIÓN FUNCIONANDO

---

## 🆘 Si Nada Funciona

Ejecuta estos comandos en la consola de CADA EQUIPO y comparte los resultados:

```javascript
console.log('=== DIAGNÓSTICO COMPLETO ===');
console.log('URL actual:', window.location.href);
console.log('API Client existe:', typeof apiClient);
console.log('Ventas en localStorage:', (JSON.parse(localStorage.getItem('ventas') || '[]')).length);
console.log('Turno actual:', localStorage.getItem('turnoActual'));
console.log('User Agent:', navigator.userAgent);

// Probar conexión API
if (typeof apiClient !== 'undefined') {
    apiClient.obtenerVentas({limite: 1})
        .then(ventas => console.log('✅ API funciona. Ventas en MySQL:', ventas.length))
        .catch(error => console.log('❌ API error:', error));
} else {
    console.log('⚠️ API Client no disponible');
}
```

---

**Próximos pasos**:
1. Verifica qué versión está en el servidor (view-source)
2. Comparte los resultados del diagnóstico de ambos equipos
3. Te guiaré para sincronizarlos correctamente
