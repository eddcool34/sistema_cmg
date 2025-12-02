# 🚨 SOLUCIÓN: Sincronizar Equipos con `/api/sistema_cmg.html`

## ⚠️ Problema Detectado

Estás accediendo desde: **`paqueteriacmg.com/api/sistema_cmg.html`**

Este archivo está **dentro de la carpeta `/api/`** y probablemente es una versión antigua que:
- ❌ Usa Google Sheets
- ❌ Guarda datos en localStorage de cada navegador
- ❌ NO sincroniza entre equipos

## 🎯 Solución en 3 Pasos

### Paso 1: Descargar Archivo Actualizado de GitHub

1. Ve a: https://github.com/eddcool34/sistema_cmg
2. Cambia a la rama: `claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU`
3. Descarga: `sistema_cmg.html`

### Paso 2: Subir al Servidor en la Ubicación Correcta

**IMPORTANTE**: Debes subirlo a `/api/sistema_cmg.html` (no a la raíz)

**Usando FTP/SFTP o cPanel File Manager:**

1. **Hacer backup del archivo actual:**
   ```
   Navega a: /public_html/api/
   Renombra: sistema_cmg.html → sistema_cmg.html.OLD
   ```

2. **Subir archivo actualizado:**
   ```
   Sube el nuevo sistema_cmg.html a: /public_html/api/
   ```

3. **Verificar que api-connector.js exista:**
   ```
   Verifica que existe: /public_html/api/api-connector.js
   ```

   Si NO existe, también descárgalo de GitHub y súbelo.

### Paso 3: Limpiar Cache en Ambos Equipos

**En EQUIPO A:**
1. Presiona: `Ctrl + Shift + Delete`
2. Selecciona: "Imágenes y archivos en cache"
3. Borra todo
4. Cierra y abre el navegador
5. Accede: `https://paqueteriacmg.com/api/sistema_cmg.html`

**En EQUIPO B:**
1. Repite los mismos pasos

## 🔬 Verificar que Funciona

### Test 1: Verificar Nueva Versión

**En cualquier equipo:**
1. Abre: `https://paqueteriacmg.com/api/sistema_cmg.html`
2. Presiona **F12** (abrir consola)
3. Busca este mensaje:
   ```
   📡 API Connector cargado. Cliente API disponible como "apiClient"
   ```

**Si lo ves:** ✅ Versión actualizada cargada correctamente
**Si NO lo ves:** ❌ Todavía está la versión antigua

### Test 2: Verificar API Connector

**En la consola, escribe:**
```javascript
typeof apiClient
```

**Resultado esperado:** `"object"`
**Si dice:** `"undefined"` → Aún usa versión antigua

### Test 3: Probar Sincronización

1. **EQUIPO A:**
   - Registra una venta con un folio único: `TEST-SYNC-001`
   - Anota la hora exacta

2. **EQUIPO B:**
   - Espera 5 segundos
   - Presiona F5 (recargar)
   - Ve a "Historial de Ventas"
   - **¿Aparece la venta TEST-SYNC-001?**

**Si aparece:** ✅ ¡SINCRONIZACIÓN FUNCIONANDO!
**Si NO aparece:** ❌ Ver "Solución de Problemas" abajo

## 🔧 Solución de Problemas

### Problema 1: Archivo Actualizado pero API No Carga

**Causa**: `api-connector.js` no está en el servidor

**Solución:**
1. Descarga `api/api-connector.js` de GitHub
2. Súbelo a: `/public_html/api/api-connector.js`
3. Verifica URL: `https://paqueteriacmg.com/api/api-connector.js`
4. Debe mostrar el código JavaScript (no error 404)

### Problema 2: API Carga pero Datos No Se Guardan

**Causa**: Backend PHP no funciona o MySQL no está configurado

**Solución:**
1. Prueba el endpoint directamente:
   ```
   https://paqueteriacmg.com/api/?action=obtenerVentas
   ```

2. **Respuesta esperada:**
   ```json
   {
       "success": true,
       "ventas": []
   }
   ```

3. **Si ves error o página en blanco:**
   - Verifica que existe: `/api/index.php`
   - Verifica que existe: `/api/config.php`
   - Revisa el archivo `BACKEND_PHP_REQUERIDO.md` para crear estos archivos

### Problema 3: Backend Funciona pero Sigue Sin Sincronizar

**Causa**: La ruta del API_URL es incorrecta

**Solución:**
1. Descarga y abre `api-connector.js`
2. Verifica la línea 1:
   ```javascript
   const API_URL = 'https://paqueteriacmg.com/api/';
   ```
3. Debe terminar con `/api/` (no `/api/api/`)
4. Si está mal, corrígelo y sube de nuevo

### Problema 4: Cache No Se Borra

**Solución Nuclear:**
1. Abre en modo incógnito: `Ctrl + Shift + N` (Chrome) o `Ctrl + Shift + P` (Firefox)
2. Accede: `https://paqueteriacmg.com/api/sistema_cmg.html`
3. Si funciona en modo incógnito → Es problema de cache
4. Solución:
   - Cierra TODOS los navegadores
   - Abre nuevamente
   - Ctrl + F5 (forzar recarga sin cache)

## 📋 Estructura de Archivos en el Servidor

Después de subir todo correctamente, tu servidor debe tener:

```
/public_html/
├── api/
│   ├── sistema_cmg.html          ← ✅ ACTUALIZADO (versión MySQL)
│   ├── api-connector.js          ← ✅ NUEVO
│   ├── config.php                ← ⚠️ Verificar existe
│   └── index.php                 ← ⚠️ Verificar existe
└── (otros archivos)
```

## 🎯 Checklist de Despliegue

- [ ] Descargado `sistema_cmg.html` de GitHub (rama: claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU)
- [ ] Descargado `api/api-connector.js` de GitHub
- [ ] Hecho backup de `/api/sistema_cmg.html` actual
- [ ] Subido `sistema_cmg.html` a `/api/` en el servidor
- [ ] Verificado que `/api/api-connector.js` existe en el servidor
- [ ] Verificado que `/api/config.php` existe
- [ ] Verificado que `/api/index.php` existe
- [ ] Probado endpoint: `https://paqueteriacmg.com/api/?action=obtenerVentas`
- [ ] Limpiado cache en EQUIPO A (Ctrl + Shift + Delete)
- [ ] Limpiado cache en EQUIPO B (Ctrl + Shift + Delete)
- [ ] Verificado mensaje en consola: "📡 API Connector cargado..."
- [ ] Verificado en consola: `typeof apiClient` → "object"
- [ ] EQUIPO A: Registrado venta de prueba TEST-SYNC-001
- [ ] EQUIPO B: Recargado (F5) y visto la venta TEST-SYNC-001
- [ ] ✅ **SINCRONIZACIÓN CONFIRMADA**

## ⚡ Diagnóstico Rápido

**En la consola de cada equipo (F12), ejecuta:**

```javascript
console.log('=== DIAGNÓSTICO RÁPIDO ===');
console.log('URL:', window.location.href);
console.log('API disponible:', typeof apiClient);
console.log('Versión:', typeof apiClient !== 'undefined' ? 'NUEVA (MySQL)' : 'ANTIGUA (Google Sheets)');

// Si API disponible, probar
if (typeof apiClient !== 'undefined') {
    apiClient.obtenerVentas({limite: 5})
        .then(result => console.log('✅ Ventas en MySQL:', result.length))
        .catch(err => console.log('❌ Error API:', err.message));
}

// Ver datos locales
const ventasLocal = JSON.parse(localStorage.getItem('ventas') || '[]');
console.log('📦 Ventas en localStorage:', ventasLocal.length);
```

**Comparte el resultado de ambos equipos si sigues con problemas.**

## 🆘 Ayuda Adicional

Si después de seguir estos pasos **aún no sincroniza**, necesito que me compartas:

1. **Resultado del diagnóstico rápido** (código de arriba) en ambos equipos
2. **Captura de pantalla** de la consola (F12) mostrando errores
3. **Respuesta de:** `https://paqueteriacmg.com/api/?action=obtenerVentas`
4. **¿Existe el archivo?** `https://paqueteriacmg.com/api/api-connector.js` (abre en el navegador)

---

## 💡 Explicación Simple

**Antes (actual):**
```
EQUIPO A → paqueteriacmg.com/api/sistema_cmg.html (versión vieja)
          ↓
          Guarda en localStorage del EQUIPO A
          ❌ No sincroniza

EQUIPO B → paqueteriacmg.com/api/sistema_cmg.html (versión vieja)
          ↓
          Guarda en localStorage del EQUIPO B
          ❌ No sincroniza
```

**Después (objetivo):**
```
EQUIPO A → paqueteriacmg.com/api/sistema_cmg.html (versión nueva)
          ↓
          Guarda en MySQL Database ←─────┐
          ✅ Sincroniza                  │
                                         │
EQUIPO B → paqueteriacmg.com/api/sistema_cmg.html (versión nueva)
          ↓
          Lee/Escribe en MySQL Database ─┘
          ✅ Sincroniza
```

---

**La clave es actualizar el archivo `/api/sistema_cmg.html` en el servidor con la versión de GitHub.**
