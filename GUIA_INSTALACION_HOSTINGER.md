# 🚀 Guía de Instalación en Hostinger - Sistema CMG

Esta guía te ayudará a instalar tu Sistema CMG en Hostinger paso a paso.

---

## 📋 **Requisitos Previos**

1. Cuenta activa en Hostinger
2. Un dominio configurado (ej: `tu-dominio.com`)
3. Acceso a hPanel (panel de control de Hostinger)
4. Cliente FTP (FileZilla) o usar el File Manager de Hostinger

---

## 🗄️ **PASO 1: Crear la Base de Datos en Hostinger**

### 1.1 Acceder a MySQL Databases

1. Inicia sesión en [hPanel de Hostinger](https://hpanel.hostinger.com)
2. Busca la sección **"Bases de datos"** o **"MySQL Databases"**
3. Haz clic en **"Crear nueva base de datos"**

### 1.2 Configurar la Base de Datos

1. **Nombre de la base de datos**: `sistema_cmg` (o el que prefieras)
2. **Usuario**: Se creará automáticamente (guárdalo)
3. **Contraseña**: Crea una contraseña segura (guárdala)
4. Haz clic en **"Crear"**

### 1.3 Anotar los Datos de Conexión

Guarda estos datos en un lugar seguro:

```
Host: localhost (o el que te proporcione Hostinger)
Usuario: u123456789_cmg (ejemplo)
Contraseña: [tu_contraseña]
Nombre BD: u123456789_sistema_cmg (ejemplo)
Puerto: 3306
```

### 1.4 Importar la Estructura de Tablas

1. En hPanel, ve a **phpMyAdmin** (en la sección de bases de datos)
2. Selecciona tu base de datos recién creada
3. Haz clic en la pestaña **"SQL"**
4. Abre el archivo `database/schema.sql` de tu proyecto
5. Copia TODO el contenido y pégalo en phpMyAdmin
6. Haz clic en **"Continuar"** o **"Go"**
7. ✅ Deberías ver el mensaje "X queries executed successfully"

---

## 📁 **PASO 2: Subir los Archivos a Hostinger**

### Opción A: Usar File Manager de Hostinger (Más Fácil)

1. En hPanel, ve a **"Archivos"** → **"Administrador de archivos"**
2. Navega a la carpeta `public_html` de tu dominio
3. Sube los siguientes archivos y carpetas:
   ```
   public_html/
   ├── sistema_cmg.html (tu archivo principal)
   ├── clientes.html
   ├── index.html
   └── api/
       ├── index.php
       ├── config.php (lo crearás en el siguiente paso)
       └── .htaccess
   ```

### Opción B: Usar FileZilla (FTP)

1. Descarga [FileZilla](https://filezilla-project.org/)
2. Conecta con estos datos (encuéntralos en hPanel → FTP Accounts):
   - **Host**: ftp.tu-dominio.com
   - **Usuario**: tu usuario FTP
   - **Contraseña**: tu contraseña FTP
   - **Puerto**: 21
3. Arrastra los archivos desde tu computadora a `public_html/`

---

## ⚙️ **PASO 3: Configurar el Archivo config.php**

### 3.1 Crear el Archivo de Configuración

1. Ve a la carpeta `api/` en el File Manager
2. Encuentra el archivo `config.example.php`
3. **Cópialo** y renómbralo a `config.php`
4. Edita `config.php` con el editor de Hostinger

### 3.2 Editar las Credenciales

Reemplaza estos valores con los datos que anotaste en el PASO 1:

```php
// ANTES (ejemplo)
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario_db');
define('DB_PASS', 'tu_contraseña_db');
define('DB_NAME', 'tu_nombre_db');

// DESPUÉS (con tus datos reales)
define('DB_HOST', 'localhost');
define('DB_USER', 'u123456789_cmg');  // ⚠️ Tu usuario real
define('DB_PASS', 'MiContraseñaSegura123!');  // ⚠️ Tu contraseña real
define('DB_NAME', 'u123456789_sistema_cmg');  // ⚠️ Tu BD real
```

### 3.3 Configurar CORS

Reemplaza `tu-dominio.com` con tu dominio real:

```php
$allowed_origins = [
    'https://tu-dominio.com',  // ⚠️ Cambia esto
    'https://www.tu-dominio.com',
];
```

### 3.4 Desactivar Debug Mode

Para producción, cambia:

```php
define('DEBUG_MODE', false);  // ⚠️ IMPORTANTE: false en producción
```

Guarda el archivo.

---

## 🔗 **PASO 4: Actualizar el Frontend**

### 4.1 Editar sistema_cmg.html

1. Abre `sistema_cmg.html` en el editor
2. Busca esta línea (aproximadamente línea 63):

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...';
```

3. **Reemplázala** con la URL de tu API:

```javascript
const API_URL = 'https://tu-dominio.com/api/';  // ⚠️ Cambia tu-dominio.com
```

4. Busca todas las referencias a `GOOGLE_SCRIPT_URL` y reemplázalas con `API_URL`

### 4.2 Actualizar las Llamadas fetch()

Busca en el código las llamadas `fetch(GOOGLE_SCRIPT_URL, ...)` y actualízalas:

**ANTES:**
```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data)
});
```

**DESPUÉS:**
```javascript
const response = await fetch(`${API_URL}?action=guardarVenta`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

**Nota:** He creado un archivo auxiliar `api-connector.js` que puedes usar para facilitar esta migración.

---

## 🧪 **PASO 5: Probar la Instalación**

### 5.1 Probar la Conexión a la BD

1. Abre tu navegador
2. Ve a: `https://tu-dominio.com/api/?action=obtenerVentas`
3. Deberías ver algo como:

```json
{
  "success": true,
  "ventas": []
}
```

✅ Si ves esto, ¡la API funciona correctamente!

❌ Si ves un error, revisa:
- Los datos de conexión en `config.php`
- Que la base de datos esté creada
- Los logs de error en hPanel

### 5.2 Probar el Sistema Completo

1. Abre: `https://tu-dominio.com/sistema_cmg.html`
2. Intenta abrir un turno
3. Registra una venta de prueba
4. Verifica en phpMyAdmin que los datos se guardaron

---

## 🔒 **PASO 6: Seguridad (IMPORTANTE)**

### 6.1 Verificar Permisos de Archivos

En File Manager, establece estos permisos:

```
api/config.php → 600 (solo lectura para el servidor)
api/.htaccess → 644
api/index.php → 644
```

### 6.2 Activar HTTPS

1. En hPanel, ve a **"SSL/TLS"**
2. Activa el **certificado SSL gratuito** para tu dominio
3. Espera unos minutos a que se active
4. En tu sitio, asegúrate de usar `https://` en todas las URLs

### 6.3 Configurar Backups Automáticos

1. En hPanel, ve a **"Backups"**
2. Activa backups automáticos diarios
3. También puedes crear backups manuales antes de hacer cambios

---

## 📊 **PASO 7: Migrar Datos de Google Sheets (Opcional)**

Si ya tienes datos en Google Sheets, puedes exportarlos:

### 7.1 Exportar desde Google Sheets

1. Abre tu Google Sheet
2. Ve a **Archivo** → **Descargar** → **CSV**
3. Descarga cada hoja (ventas, clientes, turnos, gastos)

### 7.2 Importar a MySQL

1. En phpMyAdmin, selecciona tu base de datos
2. Selecciona la tabla correspondiente (ej: `ventas`)
3. Ve a la pestaña **"Importar"**
4. Selecciona tu archivo CSV
5. Configura:
   - Formato: CSV
   - Codificación: utf8mb4
   - Delimitador de campos: coma (,)
6. Haz clic en **"Continuar"**

---

## 🎉 **¡Listo! Tu Sistema CMG está en la Nube**

### URLs Importantes

- **Sistema principal**: `https://tu-dominio.com/sistema_cmg.html`
- **API**: `https://tu-dominio.com/api/`
- **phpMyAdmin**: Accesible desde hPanel → Bases de datos

### Solución de Problemas Comunes

#### Error: "Could not connect to database"
- Verifica las credenciales en `config.php`
- Asegúrate de que el usuario tenga permisos en la BD

#### Error: "Access denied"
- Revisa los permisos del archivo `config.php`
- Verifica que el dominio esté en la lista `$allowed_origins`

#### Las ventas no se guardan
- Abre la consola del navegador (F12) para ver errores
- Verifica que la URL de `API_URL` sea correcta
- Revisa los logs de PHP en hPanel

#### Error 500 Internal Server Error
- Activa `DEBUG_MODE = true` temporalmente en `config.php`
- Revisa el error específico
- Verifica que el archivo `.htaccess` esté presente

---

## 📞 **Soporte**

Si tienes problemas:

1. **Hostinger**: Usa el chat de soporte 24/7 de Hostinger
2. **Logs**: Revisa los logs en hPanel → Archivos → Error Logs
3. **phpMyAdmin**: Verifica que las tablas existan y tengan datos

---

## 🔄 **Mantenimiento**

### Backups Regulares

1. **Base de datos**: Exporta desde phpMyAdmin semanalmente
2. **Archivos**: Descarga la carpeta `public_html` mensualmente
3. **Automático**: Hostinger hace backups automáticos si está activado

### Actualizaciones

Cuando hagas cambios:

1. Haz un backup antes
2. Prueba en local si es posible
3. Sube los archivos modificados
4. Prueba inmediatamente después

---

**¡Felicidades! Ahora tu Sistema CMG funciona completamente en la nube con Hostinger.** 🎊
