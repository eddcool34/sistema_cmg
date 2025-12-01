# ⚙️ Configuración Personal - Sistema CMG

## ✅ Credenciales de Base de Datos (Ya configuradas)

```
Host: 127.0.0.1
Puerto: 3306
Usuario: u368112799_cmg
Base de datos: u368112799_sistemacmg
Contraseña: ********** (ya configurada en config.php)
```

---

## 📋 **CHECKLIST - Pasos que DEBES hacer ahora:**

### ✅ PASO 1: Importar las tablas en phpMyAdmin

1. Ve a tu **hPanel de Hostinger**: https://hpanel.hostinger.com
2. Busca **"phpMyAdmin"** en la sección de bases de datos
3. Inicia sesión (usa las credenciales de arriba si te las pide)
4. En el panel izquierdo, selecciona la base de datos: **`u368112799_sistemacmg`**
5. Haz clic en la pestaña **"SQL"** en la parte superior
6. Abre el archivo **`database/schema.sql`** de tu proyecto local
7. Copia **TODO** el contenido del archivo
8. Pégalo en el cuadro de texto de phpMyAdmin
9. Haz clic en **"Continuar"** o **"Go"** (abajo a la derecha)
10. ✅ Deberías ver: **"X queries executed successfully"**

**Verificación:**
- Ve a la pestaña "Estructura"
- Deberías ver estas tablas:
  - ✅ clientes
  - ✅ ventas
  - ✅ turnos
  - ✅ gastos
  - ✅ configuracion
  - ✅ v_reporte_ventas (vista)
  - ✅ v_reporte_turnos (vista)

---

### ✅ PASO 2: Dominio configurado

**Tu dominio:** `paqueteriacmg.com`

✅ **Ya está configurado** en los archivos:
- `api/config.php` (líneas 16-21): CORS configurado para tu dominio
- `api/api-connector.js` (línea 18): URL de API configurada

**No necesitas hacer nada en este paso.** Solo asegúrate de subir estos archivos a Hostinger.

---

### 📤 PASO 3: Subir archivos a Hostinger

Sube estos archivos a tu servidor en la carpeta **`public_html`**:

**Usando File Manager de Hostinger:**

1. En hPanel, ve a **"Archivos"** → **"Administrador de archivos"**
2. Navega a la carpeta **`public_html`** (o la carpeta de tu dominio)
3. Sube estos archivos/carpetas:

```
public_html/
├── sistema_cmg.html          ← Tu archivo principal
├── clientes.html
├── index.html
├── backup_datos.html
├── (otros archivos HTML que tengas)
│
├── 📁 api/
│   ├── index.php            ← API principal
│   ├── config.php           ← ⚠️ El que acabamos de crear
│   ├── .htaccess            ← Configuración del servidor
│   └── api-connector.js     ← Cliente JavaScript
│
└── 📁 database/
    └── schema.sql           ← (opcional, ya lo usaste en phpMyAdmin)
```

**Importante:**
- **NO subas** `config.example.php` (solo es una plantilla)
- **SÍ sube** `config.php` (el que tiene tus credenciales reales)

---

### 🔗 PASO 4: Actualizar sistema_cmg.html

Tienes **2 opciones**:

#### **Opción A - Fácil (Recomendada):**

1. Abre **`sistema_cmg.html`** en un editor
2. Busca la sección `<head>` (primeras líneas del archivo)
3. Después de las líneas de React y otras librerías (línea ~12), agrega:

```html
<script src="api/api-connector.js"></script>
```

4. Abre el archivo **`api/api-connector.js`**
5. Verifica que en la **línea 18** diga:

```javascript
const API_URL = 'https://paqueteriacmg.com/api/';  // ✅ Ya configurado
```

6. Busca en `sistema_cmg.html` todas las funciones que llaman a `GOOGLE_SCRIPT_URL`
7. Reemplázalas según esta tabla:

| **ANTES (Google Sheets)** | **DESPUÉS (Tu API)** |
|---------------------------|---------------------|
| `fetch(GOOGLE_SCRIPT_URL, {action: 'guardarVenta', venta})` | `guardarVentaAPI(venta)` |
| `fetch(GOOGLE_SCRIPT_URL + '?action=obtenerVentas')` | `obtenerVentasAPI()` |
| `fetch(GOOGLE_SCRIPT_URL, {action: 'guardarTurno', turno})` | `guardarTurnoAPI(turno)` |
| `fetch(GOOGLE_SCRIPT_URL + '?action=obtenerTurnoActual')` | `obtenerTurnoActualAPI()` |
| `fetch(GOOGLE_SCRIPT_URL, {action: 'cerrarTurno', ...})` | `cerrarTurnoAPI(datos)` |
| `fetch(GOOGLE_SCRIPT_URL, {action: 'guardarGasto', gasto})` | `guardarGastoAPI(gasto)` |

**Para más detalles**, lee el archivo: **`MIGRACION_FRONTEND.md`**

#### **Opción B - Quieres que lo haga yo:**

Si prefieres, puedo editar directamente tu archivo `sistema_cmg.html` para hacer todos estos cambios. Solo dime **cuál es tu dominio** y lo hago por ti.

---

### 🧪 PASO 5: Probar que funcione

Una vez subidos los archivos:

1. **Probar la API directamente:**
   - Abre tu navegador
   - Ve a: `https://paqueteriacmg.com/api/?action=obtenerVentas`
   - Deberías ver algo como:
   ```json
   {
     "success": true,
     "ventas": []
   }
   ```
   ✅ Si ves esto = **¡API funcionando!**

   ❌ Si ves un error = Revisa:
   - Que hayas importado las tablas en phpMyAdmin
   - Que `config.php` tenga las credenciales correctas
   - Que el archivo esté en la carpeta `public_html/api/`

2. **Probar el sistema completo:**
   - Abre: `https://paqueteriacmg.com/sistema_cmg.html`
   - Presiona **F12** para abrir la consola del navegador
   - Deberías ver:
   ```
   ✅ Conexión con API establecida correctamente
   📡 API Connector cargado
   ```

3. **Hacer una prueba real:**
   - Abre un turno
   - Registra una venta de prueba
   - Ve a phpMyAdmin
   - Selecciona la tabla `ventas`
   - Haz clic en **"Examinar"**
   - ✅ Deberías ver tu venta de prueba guardada

---

## ❓ **Preguntas Frecuentes**

### ¿Cuál es mi dominio?

Puedes encontrarlo en:
- **hPanel** → Sección "Dominios"
- O es el dominio que compraste/configuraste en Hostinger

### ¿Dónde encuentro phpMyAdmin?

En **hPanel**:
1. Busca la sección **"Bases de datos"**
2. Haz clic en **"Administrar"** junto a tu base de datos
3. O busca directamente **"phpMyAdmin"** en el buscador de hPanel

### ¿Qué hago si veo "Error de conexión a la base de datos"?

1. Verifica que las credenciales en `config.php` sean exactas
2. Verifica que hayas importado las tablas en phpMyAdmin
3. Contacta al soporte de Hostinger (chat 24/7) para verificar que la BD esté activa

### ¿Puedo probar localmente primero?

No directamente, porque necesitas PHP y MySQL instalados localmente. Es más fácil probar directo en Hostinger.

---

## 📞 **Siguiente paso**

**Dime:**
1. ✅ **¿Ya importaste las tablas en phpMyAdmin?** (PASO 1)
2. 🌐 **¿Cuál es tu dominio de Hostinger?** (para configurar CORS)
3. 🤔 **¿Quieres que edite yo el archivo sistema_cmg.html por ti?** (o prefieres hacerlo tú)

Una vez que me confirmes esto, terminamos la configuración y tu sistema estará 100% funcional en la nube! 🚀
