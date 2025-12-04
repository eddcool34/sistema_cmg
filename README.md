# 📦 Sistema CMG - Gestión de Paquetería

Sistema completo para registrar y gestionar ventas de envíos de paquetería con control de turnos, caja y reportes.

## 🚀 Inicio Rápido - USO LOCAL

### Requisitos:
- Servidor web local (XAMPP, WAMP, MAMP, o Live Server de VSCode)
- PHP 7.4 o superior (para funcionalidad de API)
- Navegador moderno (Chrome, Firefox, Edge)

### Instalación:

1. **Clona o descarga el repositorio:**
   ```bash
   git clone https://github.com/eddcool34/sistema_cmg.git
   ```

2. **Mueve la carpeta al directorio de tu servidor:**
   - XAMPP: `C:/xampp/htdocs/sistema_cmg/`
   - WAMP: `C:/wamp64/www/sistema_cmg/`
   - MAMP: `/Applications/MAMP/htdocs/sistema_cmg/`

3. **Inicia tu servidor local**

4. **Abre en el navegador:**
   ```
   http://localhost/sistema_cmg/index.html
   ```

5. **Primera vez:** El sistema te pedirá abrir un turno (apertura obligatoria)
6. Ingresa las credenciales del cajero y el fondo inicial
7. ¡Comienza a trabajar!

## 🔐 Sistema de Turnos

El sistema implementa un **control obligatorio de turnos** que garantiza:

- ✅ **Apertura obligatoria**: No se puede acceder al sistema sin abrir un turno
- ✅ **Validación por fecha**: Los turnos expiran automáticamente al día siguiente
- ✅ **Control de caja**: Registro de fondo inicial y cierre con arqueo
- ✅ **Trazabilidad**: Historial completo de turnos y transacciones

### 📋 Flujo de Trabajo

1. **Sin turno abierto** → Pantalla de apertura obligatoria
2. **Apertura de turno** → Acceso completo al sistema
3. **Trabajo diario** → Registro de ventas y operaciones
4. **Cierre de turno** → Arqueo de caja y generación de reporte

## 🧪 Herramientas de Prueba

### test_login.html ⭐ NUEVO
Herramienta para verificar que la contraseña del sistema funciona correctamente:
- Prueba la contraseña en tiempo real
- Información de debug detallada
- Diagnóstico de problemas de acceso
- **Contraseña actual: `cmg2025`**

### test_cache_turno.html
Herramienta interactiva para verificar y limpiar la cache del sistema:
- Ver estado actual del turno
- Ver estadísticas de datos almacenados
- Limpiar cache completa
- Consola de debug en tiempo real

### limpiar_datos.html
Herramienta simple para limpiar todos los datos del localStorage:
- Ver datos almacenados
- Eliminar cache completa
- Redirección automática al sistema

## 📁 Archivos del Sistema

- `sistema_cmg.html` - Sistema principal
- `test_login.html` - Test de contraseña ⭐ NUEVO
- `test_cache_turno.html` - Herramienta de pruebas y debug
- `limpiar_datos.html` - Limpieza de cache
- `test_turno.html` - Tests de funcionalidad de turnos
- `index.html` - Página de inicio
- `DIAGNOSTICO_LOGIN.md` - Guía de solución de problemas de login ⭐ NUEVO

## 🔧 Cómo Probar la Apertura de Turno

1. Abre `test_cache_turno.html`
2. Haz clic en "🗑️ Limpiar Cache Completa"
3. Confirma la acción
4. Haz clic en "🚀 Ir al Sistema CMG"
5. ✅ Verás la pantalla de apertura de turno obligatoria

## 💡 Consejos

- **Cache limpia**: Usa las herramientas de prueba para limpiar la cache entre sesiones
- **Turnos diarios**: Los turnos se invalidan automáticamente al cambiar de día
- **Debug**: Revisa la consola del navegador para ver logs detallados del sistema

## 🔐 Problemas con el Login

Si no puedes entrar al sistema con la contraseña `cmg2025`, sigue estos pasos:

1. **Verifica la contraseña**: Usa `test_login.html` para verificar que la contraseña funciona
2. **Limpia caché del navegador**: Presiona `Ctrl + Shift + Delete` y limpia la caché
3. **Recarga completa**: Presiona `Ctrl + Shift + R` para recargar sin caché
4. **Lee el diagnóstico**: Revisa `DIAGNOSTICO_LOGIN.md` para soluciones detalladas

### Acceso correcto al sistema:
- ✅ Desde servidor local: `http://localhost/sistema_cmg/sistema_cmg.html`
- ✅ Con Live Server en VSCode
- ❌ NO abriendo archivos HTML directamente (file:///)
- ❌ NO desde el repositorio de GitHub directamente

**Contraseña actual:** `cmg2025` (sin espacios, todo en minúsculas)

## 🗄️ Configuración de Base de Datos (Opcional)

Si deseas usar la funcionalidad completa con base de datos MySQL:

1. Crea una base de datos MySQL llamada `sistema_cmg`
2. Configura las credenciales en `api/config.php` (crear archivo)
3. Las tablas se crearán automáticamente en el primer uso

Sin base de datos, el sistema funciona con localStorage (almacenamiento local del navegador).
