# API del Sistema CMG

## Configuración

### 1. Crear la base de datos

Ejecuta el archivo `schema.sql` en tu servidor MySQL:

```bash
mysql -u tu_usuario -p < schema.sql
```

O desde phpMyAdmin:
- Importa el archivo `schema.sql`

### 2. Configurar la conexión

Edita el archivo `config.php` y actualiza las credenciales de tu base de datos:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario_db');
define('DB_PASS', 'tu_password_db');
define('DB_NAME', 'sistema_cmg');
```

### 3. Subir archivos al servidor

Sube toda la carpeta `api/` a tu hosting en `public_html/api/`

La estructura debe quedar así:
```
public_html/
├── api/
│   ├── .htaccess
│   ├── config.php
│   ├── database.php
│   ├── index.php
│   ├── api-connector.js
│   ├── schema.sql
│   └── README.md
├── sistema_cmg.html (versión Google Sheets)
└── sistema_cmg_local.html (versión API PHP - próximamente)
```

### 4. Permisos

Asegúrate de que los archivos tengan los permisos correctos:
- Archivos PHP: 644
- Directorios: 755

## Endpoints disponibles

Todos los endpoints se acceden vía `POST` a `/api/index.php` con un parámetro `action`:

### Ventas
- `guardarVenta` - Guardar una nueva venta
- `obtenerVentas` - Obtener ventas (GET también soportado)

### Clientes
- `guardarCliente` - Guardar/actualizar cliente

### Turnos
- `openTurno` - Abrir un nuevo turno
- `cerrarTurno` - Cerrar turno actual

### Entregas
- `guardarEntrega` - Registrar una entrega

### Gastos
- `guardarGasto` - Registrar un gasto

### Otros
- `guardarVentaPorPaqueteria` - Estadísticas mensuales
- `guardarDestinoFrecuente` - Registrar destinos frecuentes

## Ejemplo de uso desde JavaScript

```javascript
// Inicializar conector
const api = new APIConnector('/api/');

// Guardar una venta
const venta = {
    fecha: '2024-12-01',
    clienteNombre: 'Juan Pérez',
    paqueteria: 'DHL',
    total: 150.00,
    metodoPago: 'efectivo'
};

api.guardarVenta(venta)
    .then(response => {
        console.log('Venta guardada:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Pruebas

Para probar que la API funciona correctamente, puedes hacer una petición simple:

```bash
curl -X GET "https://tudominio.com/api/index.php?action=obtenerVentas"
```

## Solución de problemas

### Error de conexión a la base de datos
- Verifica las credenciales en `config.php`
- Asegúrate de que la base de datos existe
- Verifica que el usuario tenga permisos

### Error 500
- Revisa los logs de PHP de tu hosting
- Verifica que todos los archivos se subieron correctamente
- Asegúrate de que tu hosting soporte PHP 7.0 o superior

### CORS errors
- Verifica que el archivo `.htaccess` se haya subido correctamente
- Si tu hosting no soporta `.htaccess`, contacta al soporte técnico
