# 🔒 Sistema de Backup Automático - Sistema CMG

## 📋 Descripción General

El Sistema CMG ahora cuenta con un **sistema de backup automático multicapa** que garantiza que NUNCA pierdas tus datos importantes (ventas, clientes, gastos, turnos, etc.), incluso si tu computadora se daña, formateas o hay un error del sistema.

## 🎯 Características Principales

### ✅ Sistema de 4 Niveles de Protección

1. **Nivel 1: Backup Local Automático** (cada 5 minutos)
   - Se crea automáticamente en localStorage del navegador
   - No requiere intervención del usuario
   - Historial completo de versiones

2. **Nivel 2: Sincronización con Google Sheets** (cada hora)
   - Respaldo automático en la nube
   - Accesible desde cualquier dispositivo
   - Sincronización inteligente (solo datos nuevos)

3. **Nivel 3: Backup Descargable** (cada 24 horas)
   - Descarga automática de archivo JSON
   - Puedes guardarlo en USB, disco externo o nube
   - Formato portable e importable

4. **Nivel 4: Backups Manuales** (cuando lo necesites)
   - Crear backup en cualquier momento
   - Descargar backup específico
   - Importar backup desde archivo

## 🚀 ¿Cómo Funciona?

### Inicio Automático

El sistema de backup se inicia automáticamente cuando abres el Sistema CMG:

```
1. Se crea un backup inicial al cargar la aplicación
2. Se programa backup automático cada 5 minutos
3. Se programa descarga diaria cada 24 horas
4. Se programa sincronización con Google Sheets cada hora
5. Se actualizan estadísticas cada minuto
```

### Datos Respaldados

El sistema respalda **TODOS** tus datos importantes:

- ✅ **Ventas** (envíos, devoluciones, entregas, servicios)
- ✅ **Clientes** (nombre, teléfono, historial)
- ✅ **Gastos y Entradas** (movimientos de caja)
- ✅ **Turno Actual** (turno abierto)
- ✅ **Turnos Cerrados** (historial de cortes)
- ✅ **Vuelos Pendientes**
- ✅ **Tareas Pendientes**

### Verificación de Integridad

Cada backup incluye:

- **Checksum** (huella digital única del backup)
- **Validación automática** de estructura de datos
- **Marcador de integridad** (válido/advertencia)
- **Estadísticas** (cantidad de ventas, clientes, gastos, etc.)

## 📱 Interfaz de Usuario

### Acceso al Sistema de Backup

1. Abre el Sistema CMG
2. En el header superior derecho, verás el botón **"Backups"**
3. Haz clic para abrir el panel de gestión

### Panel de Gestión de Backups

El panel muestra:

#### 📊 Estadísticas

- **Total Backups**: Cantidad total de backups almacenados
- **Hoy**: Backups creados hoy
- **Esta Semana**: Backups de los últimos 7 días
- **Tamaño Total**: Espacio ocupado por los backups

#### 🎛️ Acciones Rápidas

1. **Crear Backup Manual**
   - Crea un backup inmediato del estado actual
   - Útil antes de hacer cambios importantes

2. **Descargar Backup Actual**
   - Descarga archivo JSON con todos los datos
   - Guárdalo en lugar seguro

3. **Importar Backup**
   - Restaura datos desde archivo JSON descargado
   - Crea backup de seguridad antes de importar

4. **Limpiar Antiguos**
   - Elimina backups de más de 30 días
   - Libera espacio en localStorage

5. **Sincronizar con Google Sheets**
   - Sincronización manual inmediata
   - Muestra cuántas ventas se respaldaron

#### 📜 Historial de Backups

Tabla completa con todos los backups:

- **Fecha/Hora**: Cuándo se creó el backup
- **Ventas/Clientes/Gastos**: Cantidad de datos en ese backup
- **Estado**: Integridad del backup (válido/advertencia)
- **Acciones**:
  - **Restaurar** (↻): Vuelve a ese punto en el tiempo
  - **Descargar** (↓): Descarga ese backup específico

## 🔧 Configuración

### Parámetros del Sistema

Puedes modificar estos valores en el código (líneas 463-469):

```javascript
config: {
    INTERVALO_BACKUP_LOCAL: 5 * 60 * 1000,      // 5 minutos
    INTERVALO_BACKUP_DIARIO: 24 * 60 * 60 * 1000, // 24 horas
    DIAS_HISTORIAL: 30,                          // 30 días
    MAX_BACKUPS_LOCAL: 100,                      // Máximo 100 backups
    PREFIJO_BACKUP: 'cmg_backup_',
    PREFIJO_HISTORIAL: 'cmg_historial_backups'
}
```

### Sincronización con Google Sheets

La sincronización automática se ejecuta cada hora y respaldo solo las ventas nuevas que no han sido respaldadas.

## 🛡️ Seguridad y Confiabilidad

### Protección de Datos

- **Backup de Seguridad**: Antes de restaurar o importar, se crea un backup automático
- **Validación**: Cada backup es validado antes de usarse
- **Versiones**: Mantiene múltiples versiones para recuperar datos antiguos

### Límites del Sistema

- **localStorage**: Aproximadamente 5-10 MB (depende del navegador)
- **Máximo de backups**: 100 backups locales
- **Retención**: 30 días de historial
- **Limpieza automática**: Se eliminan backups antiguos automáticamente

## 📖 Casos de Uso

### 1. Error al Registrar Venta

**Problema**: Registraste una venta por error o con datos incorrectos.

**Solución**:
1. Abre el panel de Backups
2. Busca el backup anterior al error
3. Haz clic en "Restaurar"
4. Confirma la restauración
5. El sistema se recarga con los datos anteriores

### 2. Cambio de Computadora

**Problema**: Necesitas cambiar de computadora o navegador.

**Solución**:
1. En la computadora original:
   - Abre Backups
   - Haz clic en "Descargar Backup Actual"
   - Guarda el archivo JSON

2. En la nueva computadora:
   - Abre el Sistema CMG
   - Ve a Backups
   - Haz clic en "Importar Backup"
   - Selecciona el archivo JSON
   - ¡Listo! Todos tus datos están disponibles

### 3. Formateo de Disco

**Problema**: Necesitas formatear tu computadora.

**Solución**:
- **Antes de formatear**: Descarga el backup actual (archivo JSON)
- **Después de formatear**: Importa el backup descargado
- **Alternativa**: Si tienes Google Sheets configurado, tus ventas ya están respaldadas en la nube

### 4. Pérdida Accidental de Datos

**Problema**: Se eliminaron datos por error.

**Solución**:
1. El sistema tiene backups cada 5 minutos
2. Busca el último backup antes de la eliminación
3. Restaura ese backup
4. Los datos estarán de vuelta

## 🔍 Monitoreo

### Indicadores Visuales

En el header del sistema:

- **Botón "Backups"**: Acceso rápido al panel
- **"Último backup"**: Hora del último backup exitoso
- **"Respaldando..."**: Cuando está en progreso (con ícono giratorio)

### Notificaciones

El sistema muestra notificaciones para:

- ✅ Backup creado exitosamente
- ✅ Backup descargado
- ✅ Backup importado
- ✅ Backup restaurado
- ✅ Sincronización completada
- ❌ Errores (con descripción del problema)

## 🐛 Solución de Problemas

### Problema: "No se crean backups automáticos"

**Posibles causas**:
- El navegador está en modo privado/incógnito
- localStorage está deshabilitado
- Espacio insuficiente en localStorage

**Solución**:
- Usa el navegador en modo normal (no privado)
- Verifica configuración del navegador
- Limpia backups antiguos

### Problema: "Error al descargar backup"

**Posibles causas**:
- Bloqueador de descargas activo
- Permisos del navegador

**Solución**:
- Permite descargas del sitio
- Verifica permisos del navegador

### Problema: "Error al importar backup"

**Posibles causas**:
- Archivo JSON corrupto
- Formato inválido

**Solución**:
- Verifica que el archivo sea un backup válido del Sistema CMG
- Intenta con otro backup

### Problema: "Sincronización con Google Sheets falla"

**Posibles causas**:
- Sin conexión a internet
- URL de Google Script inválida
- Permisos de Google Sheets

**Solución**:
- Verifica conexión a internet
- Revisa configuración de Google Sheets (líneas 63-68)
- Verifica permisos del script

## 📊 Mejores Prácticas

### Recomendaciones

1. **Descarga semanal**: Descarga un backup cada semana y guárdalo en USB o nube
2. **Antes de cambios grandes**: Crea backup manual antes de hacer cambios importantes
3. **Verifica Google Sheets**: Asegúrate de que la sincronización funcione correctamente
4. **Limpia regularmente**: Elimina backups antiguos para liberar espacio
5. **Múltiples copias**: Guarda backups en diferentes lugares (USB, nube, disco)

### Frecuencia Sugerida

- **Backup local**: Automático cada 5 minutos ✅
- **Google Sheets**: Automático cada hora ✅
- **Descarga manual**: Semanal (recomendado)
- **Almacenamiento externo**: Mensual (USB/disco)

## 🎓 Preguntas Frecuentes

### ¿Los backups ocupan mucho espacio?

No. Un backup típico ocupa entre 50-200 KB dependiendo de la cantidad de datos. Con 100 backups, ocuparías aproximadamente 5-20 MB.

### ¿Puedo usar backups en otro navegador?

Sí. Los archivos JSON descargados son portables y pueden importarse en cualquier navegador que ejecute el Sistema CMG.

### ¿Qué pasa si se llena el localStorage?

El sistema limpia automáticamente backups antiguos (más de 30 días) y mantiene máximo 100 backups.

### ¿Los backups incluyen imágenes o PDFs?

No. Los backups solo incluyen datos (texto, números, fechas). Las imágenes y PDFs deben respaldarse por separado.

### ¿Puedo deshabilitar los backups automáticos?

Técnicamente sí, pero **NO es recomendable**. Los backups automáticos son tu protección contra pérdida de datos.

## 🔐 Seguridad

### Datos Sensibles

Los backups contienen información sensible (ventas, clientes, gastos). Recomendaciones:

- **No compartas** archivos de backup públicamente
- **Protege** los archivos descargados con contraseña
- **Almacena** en lugares seguros
- **Elimina** backups de computadoras compartidas

### Privacidad

- Los backups locales solo están en tu navegador
- Google Sheets requiere tu cuenta de Google
- Los archivos descargados están bajo tu control

## 📞 Soporte

### Logs del Sistema

Para diagnóstico, abre la consola del navegador (F12) y busca mensajes:

- 🔒 Sistema de backup iniciado
- ✅ Backup creado
- 📥 Backup descargado
- ☁️ Sincronización con Google Sheets
- ❌ Errores (con descripción)

### Reportar Problemas

Si encuentras problemas:

1. Abre consola del navegador (F12)
2. Copia mensajes de error
3. Reporta con captura de pantalla
4. Incluye: navegador, versión, sistema operativo

---

## ✨ Resumen

El Sistema de Backup Automático del Sistema CMG te proporciona:

- ✅ **Tranquilidad**: Tus datos están seguros
- ✅ **Automatización**: No tienes que acordarte de hacer backups
- ✅ **Flexibilidad**: Múltiples opciones de respaldo y restauración
- ✅ **Recuperación**: Vuelve a cualquier punto en el tiempo
- ✅ **Portabilidad**: Lleva tus datos a cualquier lugar

**¡Tus datos están seguros con el Sistema CMG!** 🎉

---

*Última actualización: Diciembre 2025*
*Versión del Sistema: 2.0*
