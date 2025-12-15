# 📦 Guía de Instalación - Sistema CMG

Esta guía te ayudará a instalar y configurar el Sistema CMG de manera segura.

## 📋 Requisitos Previos

### Obligatorios
- **Navegador Web Moderno**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Servidor Web**: Apache, Nginx, o cualquier servidor que soporte archivos estáticos
- **JavaScript habilitado** en el navegador

### Opcionales (para funcionalidades avanzadas)
- **Google Sheets API** (para sincronización con hojas de cálculo)
- **HTTPS** (recomendado para producción)

---

## 🚀 Instalación Básica

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/eddcool34/sistema_cmg.git
cd sistema_cmg
```

### Paso 2: Configurar Credenciales (CRÍTICO)

⚠️ **MUY IMPORTANTE**: Este paso es OBLIGATORIO para la seguridad del sistema.

1. **Copiar el archivo de ejemplo:**
   ```bash
   cp config.example.js config.js
   ```

2. **Editar `config.js` con tus credenciales:**
   ```bash
   # En Linux/Mac
   nano config.js

   # En Windows
   notepad config.js
   ```

3. **Configurar usuarios con contraseñas SEGURAS:**

   ```javascript
   const CONFIG_USUARIOS = [
       {
           id: 1,
           usuario: 'admin',
           nombre: 'Administrador',
           contrasena: 'TU_CONTRASEÑA_SUPER_SEGURA_AQUÍ', // ⚠️ CAMBIAR
           rol: 'ADMINISTRADOR',
           activo: true,
           fechaCreacion: '2025-01-01'
       },
       // ... otros usuarios
   ];
   ```

   **Requisitos de contraseña segura:**
   - ✅ Mínimo 12 caracteres
   - ✅ Mayúsculas y minúsculas
   - ✅ Números
   - ✅ Símbolos especiales (@, #, $, !, etc.)
   - ❌ NO usar palabras del diccionario
   - ❌ NO reutilizar contraseñas de otros sitios

4. **Verificar que `config.js` NO esté en git:**
   ```bash
   git status
   # config.js NO debe aparecer en la lista
   ```

### Paso 3: Configurar Servidor Web

#### Opción A: Servidor Python Simple (Desarrollo)

```bash
# Python 3
python3 -m http.server 8000

# Abrir navegador en: http://localhost:8000/login.html
```

#### Opción B: Apache

1. Copiar archivos a la raíz del servidor:
   ```bash
   sudo cp -r * /var/www/html/sistema_cmg/
   ```

2. Configurar virtual host (opcional):
   ```apache
   <VirtualHost *:80>
       ServerName sistema-cmg.local
       DocumentRoot /var/www/html/sistema_cmg

       <Directory /var/www/html/sistema_cmg>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. Reiniciar Apache:
   ```bash
   sudo systemctl restart apache2
   ```

#### Opción C: Nginx

```nginx
server {
    listen 80;
    server_name sistema-cmg.local;
    root /var/www/sistema_cmg;
    index login.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Proteger archivos sensibles
    location ~ /\.git {
        deny all;
    }

    location ~ config\.js$ {
        deny all;
    }
}
```

---

## 🔧 Configuración Avanzada

### Integración con Google Sheets (Opcional)

Si deseas sincronizar datos con Google Sheets:

1. **Crear Google Apps Script:**
   - Ve a: https://script.google.com
   - Crear nuevo proyecto
   - Pega el código del script (consulta documentación)
   - Implementar como Web App

2. **Configurar en `config.js`:**
   ```javascript
   const CONFIG_GOOGLE_SHEETS = {
       SCRIPT_URL: 'https://script.google.com/macros/s/TU_SCRIPT_ID_REAL/exec',
       SPREADSHEET_ID: 'TU_SPREADSHEET_ID',
       TIMEOUT: 10000,
       MAX_RETRIES: 3
   };

   const CONFIG_SISTEMA = {
       // ...
       SYNC_ENABLED: true,  // Activar sincronización
       SYNC_AUTO: false,    // Sincronización manual
       // ...
   };
   ```

3. **Verificar conexión:**
   - Accede al sistema
   - Intenta sincronizar datos manualmente
   - Revisa la consola del navegador para errores

---

## 🎨 Personalización

### Cambiar Colores del Sistema

Edita en `config.js`:

```javascript
const CONFIG_UI = {
    COLOR_PRIMARY: '#667eea',    // Color principal
    COLOR_SECONDARY: '#764ba2',  // Color secundario
    COLOR_SUCCESS: '#28a745',    // Verde éxito
    COLOR_DANGER: '#dc3545',     // Rojo error
    COLOR_WARNING: '#ffc107',    // Amarillo advertencia
    COLOR_INFO: '#17a2b8',       // Azul información
    ITEMS_PER_PAGE: 50,
    ANIMATION_DURATION: 300
};
```

### Configurar Duración de Sesión

```javascript
const CONFIG_SISTEMA = {
    SESION_DURACION: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    // Para 1 hora: 1 * 60 * 60 * 1000
    // Para 8 horas: 8 * 60 * 60 * 1000
};
```

---

## 👥 Gestión de Usuarios

### Roles Disponibles

El sistema incluye 4 roles predefinidos:

1. **ADMINISTRADOR**
   - Acceso total al sistema
   - Gestión de usuarios
   - Configuración del sistema
   - Eliminar datos
   - Todos los reportes

2. **SUPERVISOR**
   - Ver todos los datos
   - Crear y editar ventas/entregas
   - Cierre de caja
   - Reportes avanzados
   - NO puede eliminar datos ni gestionar usuarios

3. **CAJERO**
   - Crear ventas
   - Registrar entregas
   - Ver reportes básicos
   - NO puede ver balance ni cortes de caja

4. **AUDITOR**
   - Solo lectura (ver todos los datos)
   - Exportar reportes
   - NO puede modificar nada

### Añadir Nuevo Usuario

Edita `config.js` y añade al array `CONFIG_USUARIOS`:

```javascript
{
    id: 5, // ID único incremental
    usuario: 'nuevo_usuario',
    nombre: 'Nombre Completo',
    contrasena: 'ContraseñaSegura123!',
    rol: 'CAJERO', // ADMINISTRADOR, SUPERVISOR, CAJERO, o AUDITOR
    activo: true,
    fechaCreacion: '2025-01-15'
}
```

### Desactivar Usuario

Cambia `activo: true` a `activo: false`:

```javascript
{
    id: 2,
    usuario: 'usuario1',
    // ...
    activo: false, // Usuario desactivado
}
```

---

## 🔒 Seguridad en Producción

### Lista de Verificación de Seguridad

- [ ] **Contraseñas seguras configuradas** en `config.js`
- [ ] **`config.js` NO está en el repositorio git**
- [ ] **HTTPS habilitado** (certificado SSL/TLS)
- [ ] **Firewall configurado** en el servidor
- [ ] **Backups automáticos** configurados
- [ ] **Registro de auditoría** activo
- [ ] **Acceso SSH protegido** con clave pública
- [ ] **Servidor actualizado** con últimos parches de seguridad

### Habilitar HTTPS (Let's Encrypt)

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-apache

# Obtener certificado
sudo certbot --apache -d tudominio.com

# Renovación automática
sudo certbot renew --dry-run
```

### Proteger Archivos Sensibles

Añade a tu configuración de servidor (Apache `.htaccess`):

```apache
# Denegar acceso a archivos sensibles
<FilesMatch "^(config\.js|\.git|\.env)">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## 🧪 Verificación de Instalación

### Prueba 1: Acceso al Sistema

1. Abre el navegador y ve a: `http://tu-servidor/login.html`
2. Deberías ver la pantalla de login
3. Si ves un error rojo "config.js no está configurado", revisa el Paso 2

### Prueba 2: Login

1. Ingresa usuario: `admin`
2. Ingresa la contraseña que configuraste
3. Deberías ingresar al sistema
4. Verifica que aparezca tu rol en la esquina superior derecha

### Prueba 3: Funcionalidades Básicas

- [ ] Crear una venta de prueba
- [ ] Ver el balance (si tienes permisos)
- [ ] Generar un reporte
- [ ] Cerrar sesión correctamente

### Prueba 4: Roles y Permisos

1. Crea un usuario CAJERO de prueba
2. Inicia sesión con ese usuario
3. Verifica que NO vea opciones de administrador
4. Intenta acceder a funciones restringidas

---

## ⚠️ Solución de Problemas

### Problema: "config.js no está configurado"

**Solución:**
```bash
# Verifica que config.js existe
ls -la config.js

# Si no existe, cópialo desde el ejemplo
cp config.example.js config.js

# Edita las credenciales
nano config.js
```

### Problema: "No puedo iniciar sesión"

**Posibles causas:**
1. Contraseña incorrecta (sensible a mayúsculas/minúsculas)
2. Usuario desactivado (`activo: false`)
3. config.js no cargado correctamente

**Solución:**
- Abre la consola del navegador (F12)
- Busca errores de JavaScript
- Verifica que config.js esté en el mismo directorio que los archivos HTML

### Problema: localStorage no persiste datos

**Solución:**
- Verifica que el navegador no esté en modo incógnito
- Revisa la configuración de privacidad del navegador
- Asegúrate de que localStorage esté habilitado

### Problema: Error CORS con Google Sheets

**Solución:**
- Verifica que el script de Google Apps esté implementado como "Web App"
- Configura permisos de acceso: "Cualquiera"
- Revisa que la URL del script sea correcta en config.js

---

## 📚 Siguientes Pasos

Después de completar la instalación:

1. **Lee la documentación completa**: Consulta los archivos `.md` del repositorio
2. **Configura backups**: Exporta datos periódicamente
3. **Capacita a los usuarios**: Explica roles y funcionalidades
4. **Monitorea el sistema**: Revisa logs de auditoría regularmente
5. **Mantén actualizado**: Revisa el repositorio para nuevas versiones

---

## 📞 Soporte

- **Documentación**: Consulta los archivos `*.md` en el repositorio
- **Issues**: https://github.com/eddcool34/sistema_cmg/issues
- **Seguridad**: Lee `SECURITY.md` para reportar vulnerabilidades

---

## 📄 Licencia

Consulta el archivo `LICENSE` en el repositorio para información sobre la licencia.

---

**¡Listo!** Tu Sistema CMG está instalado y configurado de manera segura. 🎉
