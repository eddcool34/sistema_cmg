# 🔒 Carpeta Protegida del Sistema CMG

Esta carpeta contiene el sistema administrativo de CMG, protegido con usuario y contraseña.

## 📁 ¿Qué va aquí?

Mueve estos archivos a esta carpeta `/admin/`:
- ✅ `sistema_cmg.html` (archivo principal del sistema)
- ✅ `clientes.html` (si lo tienes)
- ✅ `backup_datos.html` (si lo tienes)
- ✅ Cualquier otro archivo HTML del sistema

## 🔐 Protección con Contraseña

Esta carpeta está protegida con `.htaccess` y `.htpasswd`.

**URL protegida:** https://paqueteriacmg.com/admin/sistema_cmg.html

Cuando alguien intente acceder, se le pedirá:
- **Usuario**: (el que configures)
- **Contraseña**: (la que configures)

## ⚙️ Configuración

1. **Crear contraseña:**
   - Lee el archivo `crear_password.md` para instrucciones completas
   - Opción fácil: Usa la protección de directorio en hPanel
   - Opción manual: Crea el archivo `.htpasswd`

2. **Verificar rutas en `.htaccess`:**
   - Abre `.htaccess`
   - Verifica que la ruta sea correcta:
     ```
     AuthUserFile /home/u368112799/public_html/admin/.htpasswd
     ```
   - Reemplaza `/home/u368112799/` con TU ruta real

3. **Subir archivos a Hostinger:**
   - Sube toda la carpeta `/admin/` a `/public_html/admin/`

## 📂 Estructura Final en Hostinger

```
public_html/
├── index.html                    ← Tu sitio web público
├── (otros archivos públicos)
│
├── api/                          ← API del sistema
│   ├── index.php
│   ├── config.php
│   ├── .htaccess
│   └── api-connector.js
│
└── admin/                        ← 🔒 CARPETA PROTEGIDA
    ├── .htaccess                 ← Configuración de protección
    ├── .htpasswd                 ← Usuarios y contraseñas
    ├── sistema_cmg.html          ← Sistema principal
    ├── clientes.html
    └── backup_datos.html
```

## ✅ Ventajas de esta Configuración

1. **Sitio web público visible:** Tu página principal `index.html` es accesible a todos
2. **Sistema protegido:** Solo personal autorizado accede a `/admin/`
3. **API funcional:** La carpeta `/api/` funciona para ambos (público y admin)
4. **Fácil de gestionar:** Puedes agregar/quitar usuarios fácilmente

## 🚨 IMPORTANTE

- **NO subas** `.htpasswd.example` - es solo un ejemplo
- **SÍ crea** `.htpasswd` con contraseñas reales
- **Cambia** las contraseñas por defecto
- **Comparte** las credenciales solo con personal de confianza

## 🧪 Probar

1. Abre navegador en modo incógnito
2. Ve a: https://paqueteriacmg.com/admin/sistema_cmg.html
3. Debería pedir usuario y contraseña
4. Ingresa credenciales
5. ✅ Accede al sistema

Si NO pide contraseña, revisa `crear_password.md` para solución de problemas.

---

**Tu sistema ahora es privado y seguro.** 🔐
