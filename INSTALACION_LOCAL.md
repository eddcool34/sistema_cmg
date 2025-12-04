# 💻 Guía de Instalación Local - Sistema CMG

Esta guía te ayudará a ejecutar el Sistema CMG en tu computadora local.

---

## 📋 Requisitos Previos

- **Servidor web local**: XAMPP, WAMP, MAMP, o extensión Live Server de VSCode
- **PHP 7.4+** (opcional, para funcionalidad de API con base de datos)
- **Navegador moderno**: Chrome, Firefox, Edge o Safari
- **Git** (opcional, para clonar el repositorio)

---

## 🚀 Método 1: Con XAMPP (Recomendado)

### Paso 1: Instalar XAMPP

1. Descarga XAMPP desde: https://www.apachefriends.org/
2. Instala XAMPP (selecciona Apache y MySQL)
3. Inicia el panel de control de XAMPP

### Paso 2: Obtener el Sistema

**Opción A - Clonar con Git:**
```bash
cd C:/xampp/htdocs/
git clone https://github.com/eddcool34/sistema_cmg.git
```

**Opción B - Descargar ZIP:**
1. Ve a: https://github.com/eddcool34/sistema_cmg
2. Clic en "Code" → "Download ZIP"
3. Extrae el ZIP en: `C:/xampp/htdocs/sistema_cmg/`

### Paso 3: Iniciar Apache

1. Abre el Panel de Control de XAMPP
2. Haz clic en "Start" junto a Apache
3. Espera a que se ponga verde

### Paso 4: Abrir el Sistema

1. Abre tu navegador
2. Ve a: `http://localhost/sistema_cmg/index.html`
3. **¡Listo!** El sistema debería cargar

---

## 🖥️ Método 2: Con Live Server (VSCode)

### Paso 1: Instalar VSCode y Live Server

1. Descarga e instala VSCode: https://code.visualstudio.com/
2. Abre VSCode
3. Ve a Extensiones (Ctrl + Shift + X)
4. Busca "Live Server" de Ritwick Dey
5. Instala la extensión

### Paso 2: Obtener el Sistema

```bash
git clone https://github.com/eddcool34/sistema_cmg.git
cd sistema_cmg
code .
```

O descarga el ZIP y abre la carpeta en VSCode.

### Paso 3: Iniciar Live Server

1. En VSCode, abre `index.html`
2. Clic derecho en el editor
3. Selecciona "Open with Live Server"
4. Se abrirá automáticamente en tu navegador

---

## 🪟 Método 3: Con WAMP (Windows)

### Instalación:

1. Descarga WAMP: https://www.wampserver.com/
2. Instala WAMP
3. Copia la carpeta del sistema a: `C:/wamp64/www/sistema_cmg/`
4. Inicia WAMP (ícono debe estar verde)
5. Abre: `http://localhost/sistema_cmg/index.html`

---

## 🍎 Método 4: Con MAMP (Mac)

### Instalación:

1. Descarga MAMP: https://www.mamp.info/
2. Instala MAMP
3. Copia la carpeta del sistema a: `/Applications/MAMP/htdocs/sistema_cmg/`
4. Inicia MAMP
5. Abre: `http://localhost:8888/sistema_cmg/index.html`

---

## 🗄️ Configuración de Base de Datos (Opcional)

Si quieres usar MySQL en lugar de localStorage:

### Con XAMPP:

1. En el panel de XAMPP, inicia MySQL
2. Abre: `http://localhost/phpmyadmin`
3. Crea nueva base de datos: `sistema_cmg`
4. Crea el archivo `api/config.php`:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'sistema_cmg');
?>
```

5. Las tablas se crearán automáticamente

---

## ⚙️ Configuración de la API

El archivo `api/api-connector.js` ya está configurado para localhost:

```javascript
const API_URL = 'http://localhost/sistema_cmg/api/';
```

Si usas un puerto diferente (ej: MAMP usa 8888), cambia a:

```javascript
const API_URL = 'http://localhost:8888/sistema_cmg/api/';
```

---

## ✅ Verificación de Instalación

### 1. Prueba básica:
- Abre: `http://localhost/sistema_cmg/index.html`
- Deberías ver la página de login
- Ingresa contraseña: `cmg2025`

### 2. Prueba de sistema:
- Deberías ver la pantalla de apertura de turno
- Completa los datos de apertura
- Si todo funciona, ¡ya está listo!

### 3. Si hay problemas:
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que Apache esté corriendo
- Asegúrate de usar `http://localhost/` (no abrir el archivo directamente)

---

## 🔧 Solución de Problemas

### Error: "Cannot GET /"
**Solución:** Agrega `/index.html` a la URL:
```
http://localhost/sistema_cmg/index.html
```

### Error: "API not responding"
**Solución:**
- El sistema funcionará con localStorage
- O verifica que Apache y MySQL estén corriendo
- Revisa que la URL de API en `api-connector.js` sea correcta

### Página en blanco
**Solución:**
1. Abre la consola (F12) y busca errores
2. Limpia caché: Ctrl + Shift + Delete
3. Recarga sin caché: Ctrl + Shift + R
4. Asegúrate de NO abrir el archivo directamente (debe ser http://)

### "Cross-Origin" o CORS errors
**Solución:**
- NO abras archivos directamente (file:///)
- SIEMPRE usa un servidor local (http://localhost/)

---

## 📁 Estructura del Proyecto

```
sistema_cmg/
├── index.html              ← Página de login
├── sistema_cmg.html        ← Sistema principal
├── clientes.html           ← Gestión de clientes
├── backup_datos.html       ← Respaldo de datos
├── test_login.html         ← Test de contraseña
├── limpiar_datos.html      ← Limpiar cache
├── api/
│   ├── api-connector.js    ← Configuración de API
│   └── (archivos PHP)      ← Backend
├── README.md               ← Documentación principal
└── INSTALACION_LOCAL.md    ← Esta guía
```

---

## 🎯 Próximos Pasos

Una vez instalado:

1. **Lee el README.md** para entender las funcionalidades
2. **Prueba con datos de ejemplo** antes de usar en producción
3. **Configura backups** usando `backup_datos.html`
4. **Personaliza** según tus necesidades

---

## 🆘 ¿Necesitas Ayuda?

- Revisa el `README.md` para más información
- Consulta `DIAGNOSTICO_LOGIN.md` si tienes problemas de acceso
- Abre un issue en GitHub si encuentras bugs

---

## 📌 Notas Importantes

- ✅ El sistema funciona completamente offline con localStorage
- ✅ No necesitas conexión a internet después de descargarlo
- ✅ Los datos se guardan en tu navegador (localStorage)
- ⚠️ Haz backups regularmente con la herramienta incluida
- ⚠️ No abras archivos directamente, siempre usa un servidor local

---

¡Listo! Ahora tienes el Sistema CMG funcionando localmente. 🎉
