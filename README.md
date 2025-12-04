# 📦 Sistema CMG - Gestión de Paquetería

Sistema completo para registrar y gestionar ventas de envíos de paquetería con control de turnos, caja y reportes.

## 🚀 Inicio Rápido

### Método 1: Abrir directamente desde GitHub (Recomendado)

1. **Descarga el repositorio:**
   - Ve a: https://github.com/eddcool34/sistema_cmg
   - Clic en "Code" → "Download ZIP"
   - Extrae el ZIP en tu computadora

2. **Abre el archivo:**
   - Navega a la carpeta extraída
   - Abre `index.html` directamente con tu navegador
   - O arrastra `index.html` a tu navegador

3. **¡Listo!** El sistema funciona completamente en tu navegador

### Método 2: Clonar con Git

```bash
git clone https://github.com/eddcool34/sistema_cmg.git
cd sistema_cmg
# Abre index.html en tu navegador
```

### Primera vez:
- El sistema te pedirá abrir un turno (apertura obligatoria)
- Ingresa las credenciales del cajero y el fondo inicial
- ¡Comienza a trabajar!

### 💾 Almacenamiento de Datos

- **Todos los datos se guardan en tu navegador** (localStorage)
- **No requiere servidor** ni base de datos
- **Funciona offline** completamente
- **Los datos persisten** mientras no limpies el caché del navegador
- **Haz backups regularmente** usando la herramienta incluida

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

### Acceso al sistema:
- ✅ Abriendo archivos HTML directamente desde tu computadora
- ✅ Desde cualquier navegador moderno (Chrome, Firefox, Edge, Safari)
- ✅ Desde GitHub Pages (si está habilitado)
- ✅ Sin necesidad de servidor web

**Contraseña actual:** `cmg2025` (sin espacios, todo en minúsculas)

## 📂 Archivos Importantes

- `index.html` - Página de inicio y login
- `sistema_cmg.html` - Sistema principal (gestión completa)
- `clientes.html` - Gestión de clientes
- `backup_datos.html` - Herramienta de respaldo
- `limpiar_datos.html` - Limpieza de datos
- `test_login.html` - Verificar contraseña

## ⚠️ Notas Importantes sobre Datos

- **Los datos se guardan en localStorage** del navegador
- **NO se sincronizan entre dispositivos** (cada navegador tiene sus propios datos)
- **Haz backups regularmente** usando `backup_datos.html`
- **Si limpias el caché del navegador** perderás todos los datos
- **Usa el mismo navegador** siempre para mantener tus datos
