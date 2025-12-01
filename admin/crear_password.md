# Cómo Crear el Archivo de Contraseñas

Para proteger tu sistema con usuario y contraseña, sigue estos pasos:

## Método 1: Desde hPanel de Hostinger (MÁS FÁCIL)

1. Ve a hPanel → **Archivos** → **Administrador de archivos**
2. Navega a la carpeta `/public_html/admin/`
3. En el menú superior, busca **"Protección de directorio"** o **"Directory Privacy"**
4. Haz clic en la carpeta `/admin/`
5. Activa la protección
6. Crea un usuario y contraseña:
   - **Usuario**: `admin` (o el que quieras)
   - **Contraseña**: `cmg2025` (o la que quieras)
7. Guarda

✅ **Listo!** Ahora cuando alguien intente acceder a https://paqueteriacmg.com/admin/sistema_cmg.html pedirá usuario y contraseña.

---

## Método 2: Crear .htpasswd Manualmente

Si prefieres crear el archivo manualmente:

### Paso 1: Generar la contraseña encriptada

Ve a: https://hostingcanada.org/htpasswd-generator/

O usa esta herramienta: https://www.web2generators.com/apache-tools/htpasswd-generator

**Ingresa:**
- Usuario: `admin`
- Contraseña: `cmg2025` (o la que prefieras)

**Resultado:**
```
admin:$apr1$abc123$xyz789...
```

### Paso 2: Crear el archivo .htpasswd

1. En File Manager de Hostinger, ve a `/public_html/admin/`
2. Crea un nuevo archivo llamado `.htpasswd`
3. Pega la línea generada en el paso 1
4. Guarda

### Paso 3: Actualizar .htaccess

Verifica que el archivo `.htaccess` en `/admin/` tenga la ruta correcta:

```apache
AuthUserFile /home/u368112799/public_html/admin/.htpasswd
```

**IMPORTANTE:** Reemplaza `/home/u368112799/` con la ruta real de tu cuenta en Hostinger.

Para encontrar tu ruta real:
1. En File Manager, haz clic derecho en cualquier archivo
2. Verás la ruta completa, por ejemplo: `/home/u368112799/public_html/...`
3. Usa esa ruta base

---

## Método 3: Crear Múltiples Usuarios

Si quieres dar acceso a varios usuarios:

1. Genera cada usuario con la herramienta
2. Agrega una línea por usuario en `.htpasswd`:

```
admin:$apr1$abc123$xyz789...
mariana:$apr1$def456$uvw012...
edgar:$apr1$ghi789$rst345...
```

---

## Probar la Protección

1. Abre tu navegador en modo incógnito
2. Ve a: https://paqueteriacmg.com/admin/sistema_cmg.html
3. Deberías ver una ventana pidiendo usuario y contraseña
4. Ingresa las credenciales que creaste
5. ✅ Deberías poder acceder al sistema

---

## Ejemplo de Contraseñas Recomendadas

**Usuario:** admin
**Contraseña:** CMG2025!Segura

**Usuario:** mariana
**Contraseña:** Mariana@CMG2025

**Usuario:** edgar
**Contraseña:** Edgar@CMG2025

---

## Solución de Problemas

### Error 500 - Internal Server Error

**Causa:** Ruta incorrecta en AuthUserFile

**Solución:**
1. Edita `.htaccess`
2. Verifica la ruta en `AuthUserFile`
3. Debe ser la ruta ABSOLUTA de tu servidor

### La contraseña no funciona

**Causa:** Contraseña mal encriptada o archivo .htpasswd en lugar incorrecto

**Solución:**
1. Regenera la contraseña en el generador
2. Verifica que .htpasswd esté en `/public_html/admin/`
3. Verifica permisos del archivo (debe ser 644)

### No pide contraseña

**Causa:** .htaccess no está funcionando

**Solución:**
1. Verifica que el archivo se llame exactamente `.htaccess` (con el punto al inicio)
2. Verifica que esté en `/public_html/admin/`
3. Contacta soporte de Hostinger para verificar que mod_auth esté habilitado

---

## Cambiar la Contraseña

Para cambiar la contraseña de un usuario:

1. Genera nueva contraseña en la herramienta online
2. Reemplaza la línea del usuario en `.htpasswd`
3. Guarda
4. ✅ La nueva contraseña funcionará inmediatamente

---

**¡Tu sistema ahora está protegido!** Solo las personas con usuario y contraseña podrán acceder.
