# ☁️ Sistema CMG - Configuración para Hostinger

¡Bienvenido! Este documento te guiará para desplegar tu Sistema CMG en Hostinger con base de datos MySQL.

---

## 📦 **¿Qué incluye esta configuración?**

### Archivos Backend (PHP + MySQL)

```
📁 api/
├── index.php              # API principal con todos los endpoints
├── config.php             # Configuración de BD (debes crear este)
├── config.example.php     # Plantilla de configuración
├── .htaccess              # Configuración de servidor
└── api-connector.js       # Cliente JS para conectar frontend con API
```

### Archivos de Base de Datos

```
📁 database/
└── schema.sql             # Estructura completa de tablas MySQL
```

### Documentación

```
📄 GUIA_INSTALACION_HOSTINGER.md   # Guía paso a paso detallada
📄 MIGRACION_FRONTEND.md           # Cómo actualizar tu HTML
📄 README_CLOUD.md                 # Este archivo
```

---

## 🚀 **Inicio Rápido (5 pasos)**

### 1️⃣ Crear Base de Datos en Hostinger

1. Entra a [hPanel de Hostinger](https://hpanel.hostinger.com)
2. Ve a **"Bases de datos MySQL"**
3. Crea una nueva base de datos y **anota los datos**:
   - Host (normalmente `localhost`)
   - Usuario
   - Contraseña
   - Nombre de la base de datos

### 2️⃣ Importar Estructura de Tablas

1. En hPanel, abre **phpMyAdmin**
2. Selecciona tu base de datos
3. Ve a la pestaña **"SQL"**
4. Abre el archivo `database/schema.sql`
5. Copia TODO el contenido y pégalo
6. Clic en **"Continuar"**

✅ Deberías ver: "7 queries executed successfully"

### 3️⃣ Subir Archivos a Hostinger

Sube a tu `public_html/`:

```
public_html/
├── sistema_cmg.html
├── clientes.html
├── index.html
└── api/
    ├── index.php
    ├── config.php (crear en el siguiente paso)
    ├── .htaccess
    └── api-connector.js
```

**Método A:** Usa el File Manager de Hostinger (más fácil)
**Método B:** Usa FileZilla (FTP)

### 4️⃣ Configurar Conexión a BD

1. En la carpeta `api/`, copia `config.example.php` → `config.php`
2. Edita `config.php` con tus datos:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario_real');      // ⚠️ CAMBIAR
define('DB_PASS', 'tu_contraseña_real');   // ⚠️ CAMBIAR
define('DB_NAME', 'tu_base_datos_real');   // ⚠️ CAMBIAR

$allowed_origins = [
    'https://tu-dominio.com',              // ⚠️ CAMBIAR
];

define('DEBUG_MODE', false);  // false en producción
```

3. Guarda el archivo

### 5️⃣ Actualizar Frontend

**Opción A - Fácil (recomendada):**

1. Abre `sistema_cmg.html`
2. Agrega en el `<head>`:
   ```html
   <script src="api/api-connector.js"></script>
   ```

3. En `api/api-connector.js`, cambia la línea 15:
   ```javascript
   const API_URL = 'https://tu-dominio.com/api/';
   ```

4. Reemplaza las llamadas a Google Sheets:
   ```javascript
   // ANTES
   fetch(GOOGLE_SCRIPT_URL, {...})

   // DESPUÉS
   await guardarVentaAPI(venta)
   await obtenerVentasAPI()
   await guardarTurnoAPI(turno)
   ```

**Opción B - Manual:**

Ver guía completa en `MIGRACION_FRONTEND.md`

---

## 🧪 **Probar la Instalación**

### Paso 1: Verificar API

Abre en tu navegador:

```
https://tu-dominio.com/api/?action=obtenerVentas
```

Deberías ver:

```json
{
  "success": true,
  "ventas": []
}
```

✅ **¡Funciona!** La API está conectada correctamente.

### Paso 2: Verificar Sistema Completo

1. Abre: `https://tu-dominio.com/sistema_cmg.html`
2. Presiona `F12` para abrir la consola
3. Deberías ver:
   ```
   ✅ Conexión con API establecida correctamente
   📡 API Connector cargado
   ```

4. Prueba:
   - Abrir un turno
   - Registrar una venta
   - Agregar un gasto
   - Cerrar el turno

5. Verifica en phpMyAdmin que los datos se guardaron

---

## 📚 **Documentación Completa**

### Para Instalación Detallada

Lee: **`GUIA_INSTALACION_HOSTINGER.md`**

Incluye:
- Configuración paso a paso con capturas de pantalla
- Solución de problemas comunes
- Configuración de seguridad
- Activación de HTTPS
- Configuración de backups
- Migración de datos de Google Sheets

### Para Migración del Frontend

Lee: **`MIGRACION_FRONTEND.md`**

Incluye:
- Dos métodos de migración (fácil y manual)
- Ejemplos de código antes/después
- Cambios en la estructura de datos
- Manejo de errores
- Pruebas y debugging
- Solución de problemas de CORS

---

## 🗄️ **Estructura de la Base de Datos**

### Tablas Principales

| Tabla | Descripción | Campos Clave |
|-------|-------------|--------------|
| **ventas** | Todas las operaciones | tipo_operacion, numero_guia, total_pago, turno_id |
| **turnos** | Control de turnos/caja | turno_id, cajero, estado, fecha_apertura |
| **gastos** | Gastos por turno | turno_id, concepto, monto |
| **clientes** | Base de clientes | nombre, telefono, email |
| **configuracion** | Settings del sistema | clave, valor |

### Vistas (Reports)

- **v_reporte_ventas**: Ventas con información del turno
- **v_reporte_turnos**: Turnos con totales calculados

---

## 🔌 **Endpoints de la API**

### Ventas

```
POST /api/?action=guardarVenta
GET  /api/?action=obtenerVentas&turno_id=xxx
```

### Clientes

```
POST /api/?action=guardarCliente
GET  /api/?action=buscarClientes&q=nombre
```

### Turnos

```
POST /api/?action=guardarTurno
GET  /api/?action=obtenerTurnoActual
POST /api/?action=cerrarTurno
GET  /api/?action=obtenerTurnos&limite=50
```

### Gastos

```
POST /api/?action=guardarGasto
GET  /api/?action=obtenerGastos&turno_id=xxx
```

### Reportes

```
GET /api/?action=reporteVentas&fecha_inicio=xxx&fecha_fin=xxx
```

---

## 🔒 **Seguridad**

### ✅ Medidas Implementadas

- **Prepared Statements**: Protección contra SQL Injection
- **CORS configurado**: Solo dominios autorizados
- **Headers de seguridad**: XSS Protection, Content-Type Options
- **Validación de inputs**: Campos requeridos verificados
- **config.php protegido**: No accesible vía web (.htaccess)

### ⚠️ Recomendaciones Adicionales

1. **Cambia la contraseña del sistema**:
   ```sql
   UPDATE configuracion SET valor = 'tu_nueva_contraseña' WHERE clave = 'contraseña_sistema';
   ```

2. **Desactiva DEBUG_MODE en producción**:
   ```php
   define('DEBUG_MODE', false);
   ```

3. **Activa HTTPS** en Hostinger (certificado SSL gratuito)

4. **Configura backups automáticos** en hPanel

5. **Cambia permisos de archivos**:
   ```
   config.php → 600
   .htaccess  → 644
   index.php  → 644
   ```

---

## 🚨 **Solución de Problemas**

### Error: "Could not connect to database"

❌ **Causa**: Credenciales incorrectas en `config.php`

✅ **Solución**:
1. Verifica usuario, contraseña y nombre de BD
2. Asegúrate que sean exactamente iguales a los de hPanel
3. Verifica que el host sea `localhost`

### Error: CORS Policy

❌ **Causa**: Tu dominio no está en `$allowed_origins`

✅ **Solución**:
1. Abre `api/config.php`
2. Agrega tu dominio a la lista:
   ```php
   $allowed_origins = [
       'https://tu-dominio.com',
       'https://www.tu-dominio.com',
   ];
   ```

### Error 404 en la API

❌ **Causa**: `.htaccess` no está funcionando

✅ **Solución**:
1. Verifica que `api/.htaccess` exista
2. Contacta soporte de Hostinger para verificar `mod_rewrite`

### Las ventas no se guardan

❌ **Causa**: Frontend aún apunta a Google Sheets

✅ **Solución**:
1. Verifica que `api-connector.js` esté incluido
2. Verifica que `API_URL` apunte a tu dominio
3. Abre la consola (F12) para ver errores

---

## 📊 **Funcionalidades Incluidas**

### ✅ Sistema de Ventas

- Envíos (Fedex, Estafeta, DHL)
- Devoluciones
- Entregas (ML, Amazon, Shein, etc.)
- Servicios (Visa, Pasaportes, etc.)

### ✅ Control de Caja

- Apertura de turno con fondo inicial
- Registro de ventas por método de pago
- Registro de gastos
- Cierre de turno con arqueo
- Historial de turnos

### ✅ Gestión de Clientes

- Registro de clientes
- Búsqueda por nombre/teléfono
- Historial de operaciones

### ✅ Reportes

- Ventas por período
- Ventas por turno
- Ventas por método de pago
- Gastos por turno

---

## 🔄 **Migración de Datos Existentes**

Si ya tienes datos en Google Sheets:

1. **Exporta** cada hoja como CSV
2. En **phpMyAdmin**, selecciona la tabla
3. Ve a **"Importar"**
4. Selecciona tu CSV
5. Configura formato y delimitadores
6. Importa

Ver guía detallada en `GUIA_INSTALACION_HOSTINGER.md` (Paso 7)

---

## 📞 **Soporte**

### Hostinger

- Chat 24/7 en hPanel
- [Base de conocimientos](https://support.hostinger.com)

### Sistema CMG

- Revisa los logs en hPanel → Error Logs
- Activa `DEBUG_MODE = true` temporalmente
- Verifica la consola del navegador (F12)

---

## 🎉 **¡Todo Listo!**

Tu Sistema CMG ahora funciona completamente en la nube con:

✅ Base de datos MySQL en Hostinger
✅ API PHP para operaciones
✅ Frontend conectado
✅ Sistema de seguridad implementado
✅ Backup automático configurado (si lo activaste)

### URLs Importantes

- **Sistema**: `https://tu-dominio.com/sistema_cmg.html`
- **API**: `https://tu-dominio.com/api/`
- **phpMyAdmin**: Accede desde hPanel

---

## 📝 **Checklist Final**

Antes de empezar a usar el sistema en producción:

- [ ] Base de datos creada e importada
- [ ] Archivos subidos a Hostinger
- [ ] `config.php` configurado con credenciales reales
- [ ] API funciona (probada con navegador)
- [ ] Frontend actualizado con nueva API
- [ ] Conexión exitosa (mensaje en consola)
- [ ] Turno de prueba completado exitosamente
- [ ] Venta de prueba guardada y visible en BD
- [ ] HTTPS activado
- [ ] DEBUG_MODE = false
- [ ] Backups automáticos configurados
- [ ] Contraseña del sistema cambiada
- [ ] Todo el equipo probó el sistema

---

**¡Felicidades! Tu Sistema CMG está listo para producción.** 🚀

Para cualquier duda, consulta las guías detalladas:
- `GUIA_INSTALACION_HOSTINGER.md`
- `MIGRACION_FRONTEND.md`
