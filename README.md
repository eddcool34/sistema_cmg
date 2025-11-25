# 📦 Sistema CMG - Gestión de Paquetería

Sistema completo para registrar y gestionar ventas de envíos de paquetería con control de turnos, caja y reportes.

## 🚀 Inicio Rápido

1. Abre `sistema_cmg.html` en tu navegador
2. **Primera vez:** El sistema te pedirá abrir un turno (apertura obligatoria)
3. Ingresa las credenciales del cajero y el fondo inicial
4. ¡Comienza a trabajar!

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
- `test_cache_turno.html` - Herramienta de pruebas y debug
- `limpiar_datos.html` - Limpieza de cache
- `test_turno.html` - Tests de funcionalidad de turnos
- `index.html` - Página de inicio

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
