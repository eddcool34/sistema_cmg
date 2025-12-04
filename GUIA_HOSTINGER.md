# 🌐 Guía de Configuración de Hostinger para Sistema CMG

## Problema Actual
Tu dominio `paqueteriacmg.com` muestra la página de bienvenida de Hostinger porque los archivos HTML no están subidos al servidor.

---

## ✅ SOLUCIÓN: Subir archivos al servidor

### Método 1: Usando el Administrador de Archivos (Recomendado)

#### Paso 1: Acceder a Hostinger
1. Ve a: https://hpanel.hostinger.com
2. Inicia sesión con tu cuenta
3. Selecciona tu hosting de `paqueteriacmg.com`

#### Paso 2: Abrir Administrador de Archivos
1. En el panel principal, busca **"Administrador de archivos"**
2. O ve a: **Archivos → Administrador de archivos**
3. Se abrirá una ventana con tu estructura de carpetas

#### Paso 3: Localizar la carpeta correcta

**Si NO tienes WordPress instalado:**
- Ve a `/public_html/`
- Esta es tu carpeta raíz

**Si tienes WordPress instalado:**
Tienes 2 opciones:

**Opción A - WordPress en raíz (más complejo):**
- Crea una subcarpeta: `/public_html/sistema/`
- Sube los archivos ahí
- Accede con: `paqueteriacmg.com/sistema/index.html`

**Opción B - Eliminar WordPress (más simple):**
- En Hostinger, ve a **"Sitios web" → WordPress**
- Elimina la instalación de WordPress
- Limpia la carpeta `/public_html/`
- Sube los archivos HTML directamente

#### Paso 4: Subir archivos

**Archivos que DEBES subir a `/public_html/`:**
```
public_html/
├── index.html              ← Página principal
├── sistema_cmg.html        ← Sistema completo
├── clientes.html           ← Gestión de clientes
├── backup_datos.html
├── limpiar_datos.html
├── debug.html
├── test_login.html
└── api/
    ├── api-connector.js    ← IMPORTANTE: Carpeta API completa
    ├── (otros archivos de API)
```

**Cómo subir:**
1. En el Administrador de Archivos, haz clic en **"Subir archivos"**
2. Selecciona todos los archivos `.html` de tu computadora
3. Sube también la carpeta `api/` completa
4. Espera a que termine la carga

#### Paso 5: Verificar permisos
1. Selecciona todos los archivos subidos
2. Clic derecho → **"Cambiar permisos"** o **"Permissions"**
3. Asegúrate que tengan permisos: **644** para archivos y **755** para carpetas

#### Paso 6: Probar
1. Abre tu navegador
2. Ve a: `https://paqueteriacmg.com/index.html`
3. Deberías ver tu página de login

---

### Método 2: Usando FTP (Para usuarios avanzados)

#### Configuración FTP:
```
Host: ftp.paqueteriacmg.com (o la IP de tu servidor)
Usuario: Tu usuario de Hostinger
Contraseña: Tu contraseña de Hostinger
Puerto: 21
```

#### Software recomendado:
- **FileZilla** (Windows/Mac/Linux)
- **WinSCP** (Windows)

#### Pasos:
1. Descarga e instala FileZilla
2. Conecta con los datos FTP de arriba
3. Navega a `/public_html/`
4. Arrastra todos los archivos desde tu computadora
5. Espera a que terminen de subir

---

## 🔧 Configuración de la API

**MUY IMPORTANTE:** Tu archivo `/api/api-connector.js` debe tener la URL correcta:

```javascript
const API_URL = 'https://paqueteriacmg.com/api/';
```

Si instalaste WordPress y pusiste los archivos en una subcarpeta, cambia a:
```javascript
const API_URL = 'https://paqueteriacmg.com/sistema/api/';
```

---

## ⚠️ Problemas Comunes

### 1. "La página sigue mostrando bienvenida de Hostinger"
**Solución:**
- Limpia la caché del navegador (Ctrl + Shift + Delete)
- Intenta en modo incógnito
- Verifica que subiste `index.html` a la carpeta raíz correcta

### 2. "Error 404 - No encontrado"
**Solución:**
- Verifica que los archivos estén en `/public_html/` (no en subcarpetas)
- Revisa que el nombre sea exactamente `index.html` (minúsculas)

### 3. "La API no funciona"
**Solución:**
- Verifica que la carpeta `/api/` esté subida completamente
- Revisa la URL en `api-connector.js`
- Asegúrate que los archivos PHP tengan permisos correctos (644)

### 4. "WordPress interfiere"
**Solución:**
- Elimina WordPress desde el panel de Hostinger
- O mueve tu sistema a una subcarpeta

---

## 📁 Estructura Final Esperada en Hostinger

```
/public_html/                           ← Carpeta raíz
├── index.html                          ← paqueteriacmg.com/
├── sistema_cmg.html                    ← paqueteriacmg.com/sistema_cmg.html
├── clientes.html
├── backup_datos.html
├── limpiar_datos.html
├── debug.html
├── test_login.html
└── api/                                ← paqueteriacmg.com/api/
    ├── api-connector.js
    └── (otros archivos PHP)
```

---

## ✅ Checklist Final

- [ ] Accedí al panel de Hostinger (hpanel.hostinger.com)
- [ ] Abrí el Administrador de Archivos
- [ ] Localicé la carpeta `/public_html/`
- [ ] Subí todos los archivos `.html`
- [ ] Subí la carpeta `/api/` completa
- [ ] Verifiqué permisos (644 para archivos, 755 para carpetas)
- [ ] Limpié la caché del navegador
- [ ] Probé acceder a: `https://paqueteriacmg.com/index.html`
- [ ] El sistema carga correctamente ✨

---

## 🆘 Si sigues teniendo problemas

1. **Toma una captura de pantalla** de:
   - La estructura de carpetas en Hostinger
   - El error que ves en el navegador
   - La configuración de WordPress (si aplica)

2. **Verifica**:
   - ¿WordPress está instalado?
   - ¿En qué carpeta están los archivos HTML?
   - ¿Puedes ver los archivos en el Administrador de Archivos?

3. **Contacta soporte de Hostinger** si:
   - No puedes acceder al Administrador de Archivos
   - Los archivos desaparecen después de subirlos
   - Tienes problemas de permisos

---

## 📞 Recursos Útiles

- Panel Hostinger: https://hpanel.hostinger.com
- Soporte Hostinger: Chat en vivo desde el panel
- Documentación: https://support.hostinger.com

