# 📋 Instrucciones de Despliegue - Migración a MySQL API

## ✅ Estado Actual

- **GitHub**: Archivos actualizados y listos ✅
- **Servidor**: Requiere actualización ❌

## 📦 Archivos que Debes Subir al Servidor

### 1️⃣ Archivo Principal Actualizado
**Ubicación local**: `/home/user/sistema_cmg/sistema_cmg.html`
**Destino servidor**: `https://paqueteriacmg.com/sistema_cmg.html`

**Cambios incluidos**:
- ✅ Script de api-connector.js incluido (línea 11)
- ✅ Todas las llamadas a Google Sheets reemplazadas por API
- ✅ Mensajes actualizados a "MySQL API"
- ✅ 9 funciones migradas: guardarVenta, obtenerVentas, guardarTurno, cerrarTurno, guardarGasto, etc.

### 2️⃣ Conector de API (JavaScript)
**Ubicación local**: `/home/user/sistema_cmg/api/api-connector.js`
**Destino servidor**: `https://paqueteriacmg.com/api/api-connector.js`

**Características**:
- ✅ Clase CMGApiClient para comunicación con backend
- ✅ Funciones de compatibilidad (guardarVentaAPI, obtenerVentasAPI, etc.)
- ✅ Fallback automático a localStorage si la API falla
- ✅ Sincronización automática de datos pendientes
- ✅ URL configurada: `https://paqueteriacmg.com/api/`

## 🔧 Archivos PHP del Backend (Verificar en Servidor)

Según tu screenshot, deberías tener estos archivos en `https://paqueteriacmg.com/api/`:

### ✓ config.php
Debe contener:
- Configuración de conexión a MySQL
- Credenciales de base de datos
- Manejo de CORS

### ✓ index.php
Debe contener:
- Endpoint principal de la API
- Manejo de acciones: guardarVenta, obtenerVentas, guardarTurno, cerrarTurno, guardarGasto, guardarCliente, etc.
- Validación de datos
- Respuestas JSON

## 📝 Proceso de Despliegue

### Paso 1: Descargar Archivos Actualizados de GitHub

```bash
# Opción A: Si tienes acceso al repositorio localmente
git pull origin claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU

# Opción B: Descargar desde GitHub web
# 1. Ve a: https://github.com/eddcool34/sistema_cmg
# 2. Cambia a la rama: claude/investigate-api-sheets-storage-01QnXBi83T9i4ZGmQRzjzTLU
# 3. Descarga los archivos:
#    - sistema_cmg.html
#    - api/api-connector.js
```

### Paso 2: Subir Archivos al Servidor

**Usando FTP/SFTP o cPanel File Manager**:

1. **Subir sistema_cmg.html**:
   - Reemplaza el archivo existente en la raíz: `sistema_cmg.html`
   - ⚠️ **IMPORTANTE**: Haz un backup del archivo actual antes

2. **Subir api-connector.js**:
   - Sube a la carpeta: `api/api-connector.js`
   - Verifica que la ruta sea correcta: `https://paqueteriacmg.com/api/api-connector.js`

### Paso 3: Verificar Archivos PHP

Conecta a tu servidor y verifica que existan:

```
/api/
├── api-connector.js  ← NUEVO (subir este)
├── config.php        ← Debe existir
└── index.php         ← Debe existir
```

### Paso 4: Probar el Sistema

1. **Abrir el sistema**: `https://paqueteriacmg.com/sistema_cmg.html`

2. **Abrir la consola del navegador** (F12 → Console)

3. **Buscar estos mensajes**:
   - ✅ `"📡 API Connector cargado..."`
   - ✅ `"✅ Conexión con API establecida correctamente"`

4. **Realizar una venta de prueba** y verificar:
   - ✅ Consola muestra: `"✅ Venta guardada:"`
   - ✅ NO debe mostrar errores de Google Sheets
   - ✅ Los datos deben guardarse en MySQL

5. **Verificar en la base de datos**:
   - Revisa la tabla `ventas` en MySQL
   - Confirma que la nueva venta aparece

## 🚨 Solución de Problemas

### Error: "api-connector.js no se carga"
- Verifica la ruta: `view-source:https://paqueteriacmg.com/sistema_cmg.html`
- Busca la línea 11: `<script src="api/api-connector.js"></script>`
- Verifica que el archivo exista en: `https://paqueteriacmg.com/api/api-connector.js`

### Error: "API no responde"
- Verifica `config.php` tenga las credenciales correctas de MySQL
- Verifica que `index.php` esté funcionando: `https://paqueteriacmg.com/api/?action=obtenerVentas`
- Revisa los logs de PHP en el servidor

### Los datos se guardan en localStorage pero no en la API
- La API está caída o tiene errores
- Verifica la consola del navegador para ver errores HTTP
- Los datos se sincronizarán automáticamente cuando la API vuelva

## 📊 Comparación Antes/Después

| Aspecto | Antes (Google Sheets) | Después (MySQL API) |
|---------|----------------------|---------------------|
| **Almacenamiento** | Google Sheets | Base de datos MySQL |
| **Velocidad** | Lenta (requests externos) | Rápida (servidor propio) |
| **Límites** | Cuota de Google | Sin límites |
| **Offline** | No funciona | Funciona con localStorage |
| **Sincronización** | Manual | Automática |
| **CORS** | Problemas con no-cors | Sin problemas |

## 📌 Notas Importantes

1. **Backup**: Antes de reemplazar `sistema_cmg.html`, haz una copia del archivo actual
2. **Permisos**: Asegúrate que los archivos PHP tengan permisos correctos (644 para archivos, 755 para carpetas)
3. **Cache**: Después de subir, limpia el cache del navegador (Ctrl+F5)
4. **Base de datos**: Verifica que las tablas MySQL estén creadas correctamente

## ✅ Checklist de Despliegue

- [ ] Descargar `sistema_cmg.html` actualizado de GitHub
- [ ] Descargar `api/api-connector.js` de GitHub
- [ ] Hacer backup del `sistema_cmg.html` actual en el servidor
- [ ] Subir `sistema_cmg.html` al servidor
- [ ] Subir `api/api-connector.js` al servidor
- [ ] Verificar que `api/config.php` existe y está configurado
- [ ] Verificar que `api/index.php` existe y funciona
- [ ] Probar el sistema en el navegador
- [ ] Verificar consola del navegador (sin errores)
- [ ] Hacer una venta de prueba
- [ ] Confirmar que se guarda en MySQL
- [ ] Limpiar cache del navegador

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema durante el despliegue:
1. Revisa la consola del navegador (F12)
2. Revisa los logs de PHP en el servidor
3. Verifica que la base de datos MySQL esté accesible
4. Confirma que las credenciales en `config.php` sean correctas
