# 🔍 DIAGNÓSTICO: Problema de Login Sistema CMG

**Fecha:** 03/12/2025
**Problema Reportado:** No se puede entrar al sistema con la contraseña "cmg2025"
**Estado:** ✅ **CÓDIGO CORRECTO** - Problema de deployment/acceso

---

## 📋 RESUMEN EJECUTIVO

Después de revisar exhaustivamente el código del sistema CMG, **NO se encontraron errores** en:
- ✅ Contraseña del sistema (línea 87: `cmg2025`)
- ✅ Validación de contraseña (línea 894)
- ✅ Formulario de apertura de turno (líneas 5172-5257)
- ✅ Configuración de estado inicial
- ✅ Sintaxis de JavaScript

**El problema NO es el código, sino cómo se está accediendo al sistema.**

---

## 🔐 INFORMACIÓN DE AUTENTICACIÓN

### Contraseña Actual Confirmada
```javascript
// Línea 87 de sistema_cmg.html
const CONTRASEÑA_SISTEMA = 'cmg2025';
```

### Cajeros Autorizados
```javascript
const CAJEROS = ['Mariana', 'Edgar', 'Cris'];
```

### Flujo de Autenticación
1. Abrir `sistema_cmg.html` o `index.html`
2. Sistema detecta que no hay turno abierto
3. Muestra modal de "Apertura de Turno"
4. Solicita:
   - **Cajero**: Seleccionar de la lista (Mariana, Edgar o Cris)
   - **Contraseña del Sistema**: `cmg2025`
   - **Fondo Inicial**: $1000 (solo editable los lunes)
5. Al validar correctamente, se abre el turno

---

## 🚨 PROBLEMAS IDENTIFICADOS Y SOLUCIONES

### 🔴 **PROBLEMA 1: Acceso Incorrecto desde GitHub**

**Síntoma:** "Falla cuando lo abro desde GitHub"

**Causa:** GitHub NO puede ejecutar archivos HTML con JavaScript dinámico directamente desde el repositorio. Los archivos se descargan o se muestran como código fuente.

**Soluciones:**

#### Opción A: Usar GitHub Pages (Recomendado)
```bash
# 1. Habilitar GitHub Pages en tu repositorio
# Ve a: Settings → Pages → Source → Deploy from a branch → main

# 2. El sitio estará disponible en:
https://eddcool34.github.io/sistema_cmg/

# 3. Accede a:
https://eddcool34.github.io/sistema_cmg/index.html
```

#### Opción B: Usar tu dominio en Hostinger (Actual)
```
URL de acceso: https://paqueteriacmg.com/
```

**Pasos para deployment en Hostinger:**
1. Conecta por FTP/SFTP o File Manager de Hostinger
2. Sube TODOS los archivos del repositorio a `public_html/` o la carpeta correspondiente
3. Asegúrate de subir también la carpeta `api/`
4. Accede a: `https://paqueteriacmg.com/index.html`

---

### 🟡 **PROBLEMA 2: Caché del Navegador**

**Síntoma:** La contraseña correcta no funciona después de actualizar el código

**Causa:** El navegador está usando una versión antigua del archivo HTML

**Soluciones:**

#### En Chrome/Edge:
1. Presiona `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
2. Selecciona "Todo el tiempo"
3. Marca "Archivos e imágenes en caché"
4. Clic en "Borrar datos"

#### Forzar recarga completa:
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

#### Modo incógnito (para probar):
```
Windows: Ctrl + Shift + N
Mac: Cmd + Shift + N
```

---

### 🟠 **PROBLEMA 3: Datos en localStorage Corruptos**

**Síntoma:** El sistema no responde o muestra comportamiento extraño

**Causa:** Datos antiguos o corruptos en el almacenamiento local del navegador

**Solución:**

#### Método 1: Usar herramienta de limpieza del sistema
1. Abre: `limpiar_datos.html`
2. Clic en "🗑️ Limpiar Todos los Datos"
3. Confirma la acción
4. Regresa a `sistema_cmg.html`

#### Método 2: Consola del navegador
1. Presiona `F12` para abrir DevTools
2. Ve a la pestaña "Console"
3. Ejecuta:
```javascript
localStorage.clear();
location.reload();
```

---

### 🔵 **PROBLEMA 4: Configuración de API**

**Síntoma:** El sistema muestra errores de red o no guarda datos

**Causa:** La API no está configurada correctamente en Hostinger

**Verificación:**

#### 1. Revisa la configuración actual:
```javascript
// En api/api-connector.js línea 18
const API_URL = 'https://paqueteriacmg.com/api/';
```

#### 2. Verifica que la API esté funcionando:
Abre en tu navegador:
```
https://paqueteriacmg.com/api/?action=health
```

Deberías ver algo como:
```json
{
  "success": true,
  "message": "API funcionando correctamente"
}
```

#### 3. Si la API NO responde:
- Verifica que los archivos PHP estén en `public_html/api/` en Hostinger
- Verifica que el servidor tenga PHP habilitado
- Revisa los logs de error en Hostinger

---

## 🛠️ PASOS DE DIAGNÓSTICO RÁPIDO

### Paso 1: Verificar Acceso
```bash
# ❌ INCORRECTO: Abrir desde repositorio GitHub
https://github.com/eddcool34/sistema_cmg/blob/main/sistema_cmg.html

# ✅ CORRECTO: Abrir desde dominio
https://paqueteriacmg.com/sistema_cmg.html

# ✅ CORRECTO: O desde GitHub Pages (si está habilitado)
https://eddcool34.github.io/sistema_cmg/sistema_cmg.html
```

### Paso 2: Limpiar Caché
```
1. Ctrl + Shift + Delete
2. Borrar caché
3. Ctrl + Shift + R (recarga completa)
```

### Paso 3: Verificar en Modo Incógnito
```
1. Ctrl + Shift + N (modo incógnito)
2. Abre https://paqueteriacmg.com/sistema_cmg.html
3. Intenta el login
```

### Paso 4: Revisar Consola del Navegador
```
1. Presiona F12
2. Ve a "Console"
3. Busca errores en rojo
4. Busca mensajes de "CORS" o "404"
```

---

## ✅ LISTA DE VERIFICACIÓN PARA DEPLOYMENT

### Archivos que DEBEN estar en Hostinger:
```
public_html/
├── index.html                    ✓
├── sistema_cmg.html              ✓
├── clientes.html                 ✓
├── backup_datos.html             ✓
├── test_cache_turno.html         ✓
├── limpiar_datos.html            ✓
├── test_turno.html               ✓
├── test_minimal.html             ✓
├── test_simple.html              ✓
├── debug.html                    ✓
├── api/
│   └── api-connector.js          ✓
└── api/                          ← Archivos PHP del backend
    ├── index.php
    ├── config.php
    └── (otros archivos PHP)
```

### Configuración de Hostinger:
- ✓ PHP versión 7.4 o superior habilitado
- ✓ Base de datos MySQL creada y configurada
- ✓ CORS habilitado si es necesario
- ✓ HTTPS habilitado (SSL activo)

---

## 🧪 PRUEBA DE VALIDACIÓN

### Test 1: Contraseña Correcta
1. Abre `sistema_cmg.html` desde tu dominio
2. Selecciona cajero: "Mariana"
3. Ingresa contraseña: `cmg2025`
4. ✅ Debería abrir el turno sin errores

### Test 2: Contraseña Incorrecta
1. Ingresa contraseña: `cmg2024`
2. ❌ Debería mostrar: "❌ Contraseña incorrecta"

### Test 3: Sin Cajero
1. Deja cajero vacío
2. Ingresa contraseña: `cmg2025`
3. ❌ Debería mostrar: "Selecciona un cajero"

---

## 🔧 INSTRUCCIONES DE DEPLOYMENT EN HOSTINGER

### Paso 1: Conectar a Hostinger
```
1. Inicia sesión en Hostinger
2. Ve a "File Manager" o usa FTP/SFTP
3. Navega a la carpeta de tu dominio (usualmente public_html/)
```

### Paso 2: Subir Archivos
```bash
# Usando FTP/SFTP:
Host: ftp.paqueteriacmg.com (o el que te proporcione Hostinger)
Usuario: tu_usuario
Contraseña: tu_contraseña
Puerto: 21 (FTP) o 22 (SFTP)

# Sube todos los archivos del repositorio manteniendo la estructura
```

### Paso 3: Verificar Permisos
```
- Archivos HTML: 644
- Carpeta api/: 755
- Archivos PHP: 644
```

### Paso 4: Configurar API
```php
// En api/config.php (si existe)
define('DB_HOST', 'localhost');
define('DB_NAME', 'tu_base_de_datos');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_contraseña');
```

### Paso 5: Probar Acceso
```
1. Abre: https://paqueteriacmg.com/index.html
2. Clic en "Ir al Sistema"
3. Debería mostrarte el modal de apertura de turno
4. Prueba con: cajero "Mariana" + contraseña "cmg2025"
```

---

## 📊 ANÁLISIS TÉCNICO

### Código de Validación (sistema_cmg.html)

#### Línea 87: Definición de Contraseña
```javascript
const CONTRASEÑA_SISTEMA = 'cmg2025'; // ⚠️ Cambiar por una contraseña segura
```
**Estado:** ✅ Correcto

#### Línea 469-472: Inicialización del Formulario
```javascript
const [formApertura, setFormApertura] = useState({
    cajero: '',
    contraseña: '',
    fondoInicial: FONDO_INICIAL_DEFAULT
});
```
**Estado:** ✅ Correcto

#### Línea 894: Validación de Contraseña
```javascript
if (formApertura.contraseña !== CONTRASEÑA_SISTEMA) {
    showNotification('❌ Contraseña incorrecta', 'error');
    console.warn(`Intento de apertura fallido - Cajero: ${formApertura.cajero}`);
    return;
}
```
**Estado:** ✅ Correcto (comparación exacta, case-sensitive)

#### Línea 5215: Input de Contraseña
```javascript
<input
    type="password"
    value={formApertura.contraseña}
    onChange={(e) => setFormApertura(prev => ({...prev, contraseña: e.target.value}))}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Ingresa la contraseña"
/>
```
**Estado:** ✅ Correcto

---

## ⚠️ NOTAS DE SEGURIDAD

### 🔴 CRÍTICO: Contraseña Hardcodeada
```javascript
// Línea 87
const CONTRASEÑA_SISTEMA = 'cmg2025';
```

**Problema:** La contraseña está visible en el código fuente del cliente.

**Riesgo:** Cualquier persona que vea el código HTML puede obtener la contraseña.

**Recomendación para el futuro:**
1. Mover la validación al backend (PHP)
2. Usar hash de contraseñas (bcrypt)
3. Implementar autenticación por usuario
4. Agregar rate limiting (límite de intentos)

**Para cambiar la contraseña ahora:**
1. Edita `sistema_cmg.html` línea 87
2. Cambia `'cmg2025'` por tu nueva contraseña
3. Guarda y sube a Hostinger
4. Limpia caché del navegador

---

## 📞 SOPORTE Y SIGUIENTES PASOS

### Si el problema persiste:

#### 1. Recopila información de debug:
```javascript
// En la consola del navegador (F12)
console.log('Contraseña del sistema:', CONTRASEÑA_SISTEMA);
console.log('Contraseña ingresada:', formApertura.contraseña);
console.log('Turno actual:', turnoActual);
console.log('localStorage:', localStorage);
```

#### 2. Verifica errores de red:
```
F12 → Pestaña "Network"
Refresca la página
Busca archivos con estado 404 o 500
```

#### 3. Prueba el sistema localmente:
```
1. Descarga el repositorio
2. Abre sistema_cmg.html desde tu computadora
3. Si funciona localmente, el problema es del servidor
```

---

## 🎯 SOLUCIÓN RÁPIDA (TL;DR)

1. **NO abras desde GitHub** → Usa `https://paqueteriacmg.com/`
2. **Limpia caché:** `Ctrl + Shift + Delete`
3. **Recarga completa:** `Ctrl + Shift + R`
4. **Prueba en modo incógnito:** `Ctrl + Shift + N`
5. **Contraseña correcta:** `cmg2025` (sin espacios, minúsculas)
6. **Verifica que elegiste un cajero** antes de ingresar la contraseña

---

## ✨ VERIFICACIÓN FINAL

**¿El código tiene errores?** ❌ NO
**¿La contraseña es correcta?** ✅ SÍ (`cmg2025`)
**¿Problema de deployment?** ✅ PROBABLEMENTE
**¿Problema de caché?** ✅ POSIBLE

**Siguiente acción recomendada:**
1. Accede a: `https://paqueteriacmg.com/limpiar_datos.html`
2. Limpia los datos
3. Accede a: `https://paqueteriacmg.com/sistema_cmg.html`
4. Prueba el login con:
   - Cajero: `Mariana`
   - Contraseña: `cmg2025`

---

**Documento creado:** 03/12/2025
**Última revisión:** 03/12/2025
**Versión del sistema:** v2.1
