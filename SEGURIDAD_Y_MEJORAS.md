# Seguridad y Mejoras - Sistema CMG

## Resumen de Correcciones Implementadas

Este documento detalla las correcciones críticas realizadas al sistema para mejorar la seguridad, mantenibilidad y robustez del código.

---

## ✅ Correcciones Implementadas

### 1. ERROR CRÍTICO - ID de Google Sheets Corregido

**Problema Original:**
```javascript
const GOOGLE_SHEET_ID = 'AKfycbx9XdqAP-HAZ3JiriptlZ6RlK3mJiI7A9DLUc47QEFpzCE07HcIZHVndqe57-9To5w1';
```

**Diagnóstico:**
- Este es un ID de Google Apps Script, NO un ID de Google Spreadsheet
- Formato correcto de Spreadsheet ID: `1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T` (44 caracteres aprox)
- El ID de Apps Script termina en `/exec` y es una URL completa

**Solución Implementada:**
- ✅ Migrado a `config.js` como `CONFIG_GOOGLE_SHEETS.SPREADSHEET_ID`
- ✅ Agregadas instrucciones claras en comentarios sobre cómo obtener el ID correcto
- ✅ Separación clara entre `SCRIPT_URL` (Apps Script) y `SPREADSHEET_ID` (hoja de cálculo)

**Ubicación:** `config.js:26-28`, `sistema_cmg.html:84`

**Instrucciones para obtener el ID correcto:**
1. Abre tu Google Sheet en el navegador
2. Copia el ID de la URL: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`
3. Actualiza `SPREADSHEET_ID` en `config.js`

---

### 2. Configuración de Seguridad Mejorada

**Problema Original:**
```javascript
const CONTRASEÑA_SISTEMA = 'Qaswed12'; // Contraseña débil en código
```

**Riesgos:**
- ❌ Contraseña débil (solo 8 caracteres)
- ❌ Visible en el código fuente
- ❌ Sin hash ni encriptación
- ❌ Facilita acceso no autorizado

**Solución Implementada:**
- ✅ Migrado a `config.js` con contraseñas más seguras
- ✅ Archivo `config.js` excluido de git (`.gitignore`)
- ✅ Contraseñas de ejemplo con formato seguro (12+ caracteres, símbolos, mayúsculas)
- ✅ Advertencias claras para cambiar en producción
- ✅ Documentación de mejores prácticas

**Contraseñas actualizadas (DEBES cambiar en producción):**
```javascript
CONTRASEÑA_SISTEMA = 'Admin2025$CMG!Secure'
// Usuarios con contraseñas mejoradas en CONFIG_USUARIOS
```

**⚠️ IMPORTANTE:**
- Estas contraseñas son EJEMPLOS
- DEBES cambiarlas antes de usar en producción
- Considera implementar hash + salt en futuras versiones

**Ubicación:** `config.js:58-60`, `config.js:44-79`

---

### 3. Modo no-cors y Limitaciones de API

**Contexto:**
```javascript
mode: 'no-cors', // Requerido por Google Apps Script
```

**Por qué es necesario:**
- Google Apps Script no permite CORS desde dominios externos
- El modo `no-cors` es la única forma de hacer peticiones desde el navegador
- Esto es una limitación de Google, no un error de diseño

**Limitaciones conocidas:**
- ❌ No se puede leer la respuesta del servidor
- ❌ No se puede verificar si la operación fue exitosa
- ⚠️ Se asume éxito si fetch() no lanza error

**Solución Implementada:**
- ✅ Documentado en `googleSheets.js:122-124`
- ✅ Sistema de reintentos automáticos para mayor confiabilidad
- ✅ Timeout configurable
- ✅ Logging detallado en desarrollo

**Alternativas futuras:**
1. Configurar CORS correctamente en Google Apps Script
2. Usar un backend intermedio que maneje las peticiones
3. Implementar sincronización bidireccional con verificación

**Ubicación:** `googleSheets.js:105-139`, múltiples lugares en `sistema_cmg.html`

---

### 4. Sistema de Logging Mejorado

**Problema Original:**
- console.log() en producción expone información sensible
- No hay diferenciación entre desarrollo y producción
- Logs visibles en la consola del navegador

**Solución Implementada:**
- ✅ Sistema `Logger` centralizado en `config.js`
- ✅ Niveles de log: DEBUG, INFO, WARN, ERROR
- ✅ Filtrado automático según modo (development/production)
- ✅ Métodos especializados para operaciones de red

**Uso:**
```javascript
Logger.debug('Mensaje de desarrollo');  // Solo en development
Logger.info('Información general');      // En development
Logger.warn('Advertencia');              // En development y production
Logger.error('Error crítico');           // Siempre visible
Logger.network('REQUEST', data);         // Solo en development
```

**Configuración:**
```javascript
CONFIG_SISTEMA.MODO = 'production'; // Cambiar en producción
```

**Ubicación:** `config.js:116-160`

---

### 5. Verificación de Dependencias

**Problema Original:**
```javascript
const { jsPDF } = window.jspdf; // Falla si CDN no carga
```

**Solución Implementada:**
- ✅ Verificación de carga de jsPDF con alerta al usuario
- ✅ Verificación de config.js cargado correctamente
- ✅ Validador centralizado `Validators.checkDependencies()`
- ✅ Mensajes de error claros para el usuario

**Ubicación:** `sistema_cmg.html:67-80`, `config.js:162-183`

---

### 6. Función buscarClientes Mejorada

**Problema Original:**
```javascript
return clientesGuardados
    .filter(cliente => cliente.nombre.toLowerCase().includes(queryLower))
    .slice(0, 5); // Limitar ANTES de ordenar
```

**Solución Implementada:**
- ✅ Ordenamiento por relevancia:
  - 100 puntos: coincidencia exacta
  - 50 puntos: comienza con el query
  - 10 puntos: contiene el query
- ✅ Ordenamiento secundario alfabético
- ✅ Límite aplicado DESPUÉS de ordenar
- ✅ Uso de constantes de configuración

**Resultado:** Los mejores resultados siempre aparecen primero

**Ubicación:** `sistema_cmg.html:167-208`

---

### 7. Validadores de Entrada

**Implementado:**
- ✅ Validador genérico `Validators.validateInput()`
- ✅ Validación de texto (min/max length)
- ✅ Validación de números (min/max value)
- ✅ Validación de teléfonos (formato mexicano)
- ✅ Mensajes de error descriptivos

**Uso:**
```javascript
const result = Validators.validateInput(value, 'phone', { required: true });
if (!result.valid) {
    alert(result.error);
}
```

**Ubicación:** `config.js:185-226`

---

### 8. Variables Globales Protegidas

**Mejoras:**
- ✅ Configuraciones centralizadas en archivos externos
- ✅ Constantes documentadas con comentarios
- ✅ Uso de `const` para evitar reasignación
- ✅ Verificación de existencia antes de uso

**Pendiente para futuras versiones:**
- Encapsular en módulos IIFE o ES6 modules
- Usar namespace para evitar colisiones
- Implementar patrón Module o Revealing Module

---

## 📋 Configuración Inicial

### 1. Crear archivo de configuración

```bash
cp config.example.js config.js
```

### 2. Actualizar config.js

Edita `config.js` y actualiza:

```javascript
// URL de tu Google Apps Script
SCRIPT_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID_REAL/exec'

// ID de tu Google Spreadsheet
SPREADSHEET_ID: 'TU_SPREADSHEET_ID_REAL'

// Contraseña del sistema (¡CÁMBIALA!)
CONTRASEÑA_SISTEMA = 'TuContraseñaSegura2025!'
```

### 3. Configurar usuarios

Actualiza las contraseñas en `CONFIG_USUARIOS` con contraseñas seguras.

### 4. Verificar .gitignore

Asegúrate de que `config.js` esté en `.gitignore` (ya está incluido).

---

## 🔒 Mejores Prácticas de Seguridad

### Contraseñas Seguras

✅ **HACER:**
- Mínimo 12 caracteres
- Combinar mayúsculas, minúsculas, números y símbolos
- Usar contraseñas únicas
- Cambiar periódicamente (cada 90 días)

❌ **NO HACER:**
- Usar palabras del diccionario
- Reutilizar contraseñas
- Compartir contraseñas por texto plano
- Dejar contraseñas de ejemplo en producción

### Gestión de Configuración

✅ **HACER:**
- Mantener `config.js` fuera de control de versiones
- Usar `config.example.js` como plantilla
- Documentar cambios necesarios
- Validar configuración al iniciar

❌ **NO HACER:**
- Subir `config.js` a GitHub
- Hardcodear credenciales
- Compartir archivos de configuración
- Usar misma configuración en dev y prod

### Desarrollo vs Producción

```javascript
// Desarrollo
CONFIG_SISTEMA.MODO = 'development'
// - Logs detallados
// - Errores completos
// - Sin caché agresivo

// Producción
CONFIG_SISTEMA.MODO = 'production'
// - Logs mínimos
// - Errores genéricos al usuario
// - Caché optimizado
```

---

## 🎯 Mejoras Futuras Recomendadas

### Prioridad Alta
1. **Implementar hash de contraseñas**
   - Usar bcrypt o similar
   - Almacenar solo hashes, nunca texto plano
   - Agregar salt único por usuario

2. **Autenticación por token**
   - JWT para sesiones
   - Refresh tokens
   - Expiración automática

3. **Configurar CORS correctamente**
   - En Google Apps Script
   - Permitir solo dominios autorizados
   - Eliminar necesidad de `no-cors`

### Prioridad Media
4. **Encapsular en módulos ES6**
   - Usar import/export
   - Evitar contaminación global
   - Mejor organización

5. **Agregar pruebas unitarias**
   - Validadores
   - Funciones de negocio
   - Integración con Google Sheets

6. **Implementar rate limiting**
   - Prevenir abuso de API
   - Proteger contra ataques
   - Throttling inteligente

### Prioridad Baja
7. **Logging a servidor**
   - Almacenar logs críticos
   - Análisis de errores
   - Auditoría de acciones

8. **Cifrado de datos sensibles**
   - En localStorage
   - En tránsito (HTTPS)
   - Datos de clientes

---

## 📊 Checklist de Seguridad

Antes de desplegar a producción:

- [ ] Configurar `config.js` con valores reales
- [ ] Cambiar TODAS las contraseñas a contraseñas seguras
- [ ] Verificar que `config.js` esté en `.gitignore`
- [ ] Cambiar `CONFIG_SISTEMA.MODO` a `'production'`
- [ ] Probar todas las funcionalidades críticas
- [ ] Verificar conexión con Google Sheets
- [ ] Revisar permisos de Google Apps Script
- [ ] Configurar backup automático
- [ ] Documentar procedimientos de emergencia
- [ ] Capacitar usuarios en seguridad

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar este documento
2. Consultar `config.example.js` para configuración
3. Revisar logs en consola (modo development)
4. Verificar documentación de Google Apps Script

---

## 📝 Registro de Cambios

### Versión 2.3 (2025-12-27)
- ✅ Corregido ID de Google Sheets
- ✅ Mejorada seguridad de contraseñas
- ✅ Implementado sistema de logging
- ✅ Agregadas validaciones de entrada
- ✅ Mejorada función buscarClientes
- ✅ Verificación de dependencias
- ✅ Documentación de limitaciones no-cors
- ✅ Centralización de configuración

---

**Última actualización:** 2025-12-27
**Versión del sistema:** 2.3
**Estado:** ✅ Listo para configuración y pruebas
