# 🚀 Guía de Deployment - paqueteriacmg.com

## ✅ Configuración Completada

- **Dominio**: paqueteriacmg.com
- **Base de datos**: u368112799_sistemacmg
- **Usuario BD**: u368112799_cmg
- **API URL**: https://paqueteriacmg.com/api/
- **CORS**: ✅ Configurado para tu dominio

---

## 📋 CHECKLIST DE DEPLOYMENT

### ☐ PASO 1: Importar Base de Datos (5 min)

1. Ve a: https://hpanel.hostinger.com
2. Abre **phpMyAdmin**
3. Selecciona base de datos: **u368112799_sistemacmg**
4. Pestaña **"SQL"**
5. Copia y pega todo el contenido de `database/schema.sql`
6. Ejecuta

**Verificación:**
```sql
SHOW TABLES;
```
Deberías ver: clientes, ventas, turnos, gastos, configuracion

---

### ☐ PASO 2: Subir Archivos (10 min)

#### Opción A: File Manager de Hostinger

1. hPanel → **Archivos** → **Administrador de archivos**
2. Ve a: **public_html/**
3. Crea la carpeta **api/** (si no existe)
4. Sube estos archivos:

```
public_html/
├── sistema_cmg.html           ← Archivo principal
├── clientes.html
├── backup_datos.html
├── index.html
├── debug.html
├── limpiar_datos.html
├── test_cache_turno.html
├── test_minimal.html
├── test_simple.html
├── test_turno.html
│
└── api/
    ├── index.php              ← API principal
    ├── config.php             ← ⚠️ IMPORTANTE: Con credenciales
    ├── .htaccess              ← Configuración servidor
    └── api-connector.js       ← Cliente JavaScript
```

#### Opción B: FTP (FileZilla)

**Datos de conexión FTP:**
- Host: ftp.paqueteriacmg.com (o lo que aparezca en hPanel)
- Usuario: (tu usuario FTP de Hostinger)
- Contraseña: (tu contraseña FTP)
- Puerto: 21

**Instrucciones:**
1. Descarga FileZilla: https://filezilla-project.org/
2. Conecta con los datos de arriba
3. Lado derecho: navega a **public_html/**
4. Lado izquierdo: navega a tu proyecto local
5. Arrastra los archivos del lado izquierdo al derecho

---

### ☐ PASO 3: Verificar Archivos Subidos

En File Manager de Hostinger, verifica que existan:

```
✓ public_html/sistema_cmg.html
✓ public_html/api/index.php
✓ public_html/api/config.php      ← ⚠️ MUY IMPORTANTE
✓ public_html/api/.htaccess
✓ public_html/api/api-connector.js
```

**IMPORTANTE:** Verifica permisos de archivos:
- `config.php` → 644 o 600
- `index.php` → 644
- `.htaccess` → 644

---

### ☐ PASO 4: Actualizar sistema_cmg.html

Tienes 2 opciones:

#### Opción A: Modificación Manual (Rápida)

1. Abre `sistema_cmg.html` en Hostinger File Manager
2. Busca la sección `<head>`
3. Después de las librerías de React (línea ~12), agrega:

```html
<script src="api/api-connector.js"></script>
```

4. Busca esta línea (aprox línea 63):
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/...';
```

5. Coméntala o elimínala:
```javascript
// const GOOGLE_SCRIPT_URL = 'https://script.google.com/...'; // Ya no se usa
```

6. Busca cada llamada a `fetch(GOOGLE_SCRIPT_URL, ...)` y reemplázala:

**ANTES:**
```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: 'guardarVenta',
        venta: venta
    })
});
```

**DESPUÉS:**
```javascript
const resultado = await guardarVentaAPI(venta);
```

#### Opción B: Déjame hacerlo a mí

Si prefieres, puedo editar tu archivo `sistema_cmg.html` automáticamente.
Solo dime: **"Edita mi sistema_cmg.html"**

---

### ☐ PASO 5: Probar la API

Abre tu navegador y ve a:

```
https://paqueteriacmg.com/api/?action=obtenerVentas
```

**Resultado esperado:**
```json
{
  "success": true,
  "ventas": []
}
```

**Si ves esto:** ✅ ¡API funcionando!

**Si ves error:**

1. **Error 404:** Verifica que `index.php` y `.htaccess` estén en `public_html/api/`
2. **Error 500:** Activa `DEBUG_MODE = true` en `config.php` para ver el error
3. **"Connection failed":** Verifica credenciales en `config.php`

---

### ☐ PASO 6: Probar Sistema Completo

1. Abre: https://paqueteriacmg.com/sistema_cmg.html
2. Presiona **F12** (Consola del navegador)
3. Busca estos mensajes:

```
✅ Conexión con API establecida correctamente
📡 API Connector cargado
```

4. **Prueba real:**
   - Abre un turno
   - Registra una venta de prueba
   - Ve a phpMyAdmin → tabla `ventas`
   - ✅ Deberías ver la venta guardada

---

### ☐ PASO 7: Activar HTTPS (SSL)

1. hPanel → **SSL/TLS**
2. Activa **SSL gratuito** para paqueteriacmg.com
3. Espera 5-10 minutos
4. Verifica: https://paqueteriacmg.com debe funcionar

---

### ☐ PASO 8: Configurar Backups

1. hPanel → **Backups**
2. Activa **backups automáticos**
3. Crea un backup manual inicial

---

## 🎯 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Sistema principal** | https://paqueteriacmg.com/sistema_cmg.html |
| **API** | https://paqueteriacmg.com/api/ |
| **Test API** | https://paqueteriacmg.com/api/?action=obtenerVentas |
| **phpMyAdmin** | Desde hPanel → Bases de datos |
| **File Manager** | Desde hPanel → Archivos |

---

## 🚨 Solución de Problemas

### Error: "Access to fetch blocked by CORS policy"

**Solución:**
1. Abre `api/config.php` en Hostinger
2. Verifica líneas 16-21:
   ```php
   $allowed_origins = [
       'https://paqueteriacmg.com',
       'https://www.paqueteriacmg.com',
       ...
   ];
   ```

### Error: "Could not connect to database"

**Solución:**
1. Verifica `api/config.php`:
   ```php
   define('DB_HOST', '127.0.0.1');
   define('DB_USER', 'u368112799_cmg');
   define('DB_PASS', 'Qaswed12@12');
   define('DB_NAME', 'u368112799_sistemacmg');
   ```
2. Verifica en phpMyAdmin que la BD exista

### Error 404 en /api/

**Solución:**
1. Verifica que exista: `public_html/api/.htaccess`
2. Contenido del .htaccess:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.php [QSA,L]
   ```

### Las ventas no se guardan

**Solución:**
1. F12 → Consola → Busca errores en rojo
2. Verifica que `api-connector.js` esté incluido en el HTML
3. Verifica que la URL de la API sea correcta (línea 18 del connector)

---

## 📞 Soporte

**Hostinger (24/7):**
- Chat en hPanel
- https://support.hostinger.com

**Errores comunes:**
- Revisa logs: hPanel → Archivos → Error Logs
- Activa DEBUG_MODE en config.php temporalmente
- Usa la consola del navegador (F12)

---

## ✅ Checklist Final

Antes de usar en producción:

- [ ] Tablas importadas en phpMyAdmin
- [ ] Todos los archivos subidos a public_html/
- [ ] API probada (obtenerVentas funciona)
- [ ] sistema_cmg.html actualizado con api-connector.js
- [ ] Turno de prueba completado exitosamente
- [ ] Venta de prueba guardada en BD
- [ ] HTTPS/SSL activado
- [ ] Backups automáticos configurados
- [ ] DEBUG_MODE = false en config.php

---

## 🎉 ¡Listo!

Tu Sistema CMG estará funcionando en:
**https://paqueteriacmg.com/sistema_cmg.html**

**Siguiente paso:** Dime cuando hayas completado los pasos 1-3 para ayudarte con cualquier problema que surja.
