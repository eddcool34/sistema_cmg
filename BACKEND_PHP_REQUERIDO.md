# 🔧 Archivos PHP del Backend - Sistema CMG

## 📁 Estructura Requerida en el Servidor

```
/api/
├── api-connector.js    ← JavaScript (Frontend)
├── config.php          ← Configuración de BD
├── index.php           ← Endpoint principal
└── .htaccess          ← Configuración Apache (opcional)
```

## 📄 config.php

Este archivo debe contener la configuración de conexión a MySQL:

```php
<?php
// config.php - Configuración de Base de Datos

// Configuración de CORS (permitir requests desde el frontend)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
define('DB_HOST', 'localhost');           // Host de MySQL
define('DB_NAME', 'tu_base_de_datos');    // Nombre de la BD
define('DB_USER', 'tu_usuario');          // Usuario MySQL
define('DB_PASS', 'tu_contraseña');       // Contraseña MySQL
define('DB_CHARSET', 'utf8mb4');

// Configuración de zona horaria
date_default_timezone_set('America/Mexico_City');

// Función para conectar a la base de datos
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error de conexión a la base de datos'
        ]);
        exit();
    }
}

// Función para enviar respuesta JSON
function sendResponse($success, $data = null, $error = null) {
    $response = ['success' => $success];

    if ($data !== null) {
        $response = array_merge($response, $data);
    }

    if ($error !== null) {
        $response['error'] = $error;
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit();
}
?>
```

## 📄 index.php

Este archivo es el endpoint principal que maneja todas las acciones:

```php
<?php
// index.php - API Principal del Sistema CMG

require_once 'config.php';

// Obtener la acción solicitada
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

// Obtener datos del body (para POST)
$requestData = null;
if ($method === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
}

// Router principal
try {
    $db = getDBConnection();

    switch ($action) {
        // ==========================================
        // VENTAS
        // ==========================================

        case 'guardarVenta':
            if ($method !== 'POST') {
                sendResponse(false, null, 'Método no permitido');
            }

            $stmt = $db->prepare("
                INSERT INTO ventas (
                    fecha, hora, folio, rastreo, nombre_remitente, telefono_remitente,
                    direccion_remitente, nombre_destinatario, telefono_destinatario,
                    direccion_destinatario, estado_destino, peso, precio, tipo_pago,
                    observaciones, tipo_operacion, turno_id, created_at
                ) VALUES (
                    :fecha, :hora, :folio, :rastreo, :nombre_remitente, :telefono_remitente,
                    :direccion_remitente, :nombre_destinatario, :telefono_destinatario,
                    :direccion_destinatario, :estado_destino, :peso, :precio, :tipo_pago,
                    :observaciones, :tipo_operacion, :turno_id, NOW()
                )
            ");

            $stmt->execute([
                ':fecha' => $requestData['fecha'],
                ':hora' => $requestData['hora'],
                ':folio' => $requestData['folio'],
                ':rastreo' => $requestData['rastreo'],
                ':nombre_remitente' => $requestData['nombreRemitente'],
                ':telefono_remitente' => $requestData['telefonoRemitente'],
                ':direccion_remitente' => $requestData['direccionRemitente'],
                ':nombre_destinatario' => $requestData['nombreDestinatario'],
                ':telefono_destinatario' => $requestData['telefonoDestinatario'],
                ':direccion_destinatario' => $requestData['direccionDestinatario'],
                ':estado_destino' => $requestData['estadoDestino'],
                ':peso' => $requestData['peso'],
                ':precio' => $requestData['precio'],
                ':tipo_pago' => $requestData['tipoPago'],
                ':observaciones' => $requestData['observaciones'] ?? '',
                ':tipo_operacion' => $requestData['tipoOperacion'] ?? 'paqueteria',
                ':turno_id' => $requestData['turnoId']
            ]);

            $ventaId = $db->lastInsertId();
            sendResponse(true, ['venta_id' => $ventaId, 'message' => 'Venta guardada correctamente']);
            break;

        case 'obtenerVentas':
            $limite = $_GET['limite'] ?? 100;
            $fecha = $_GET['fecha'] ?? null;
            $turnoId = $_GET['turno_id'] ?? null;

            $sql = "SELECT * FROM ventas WHERE 1=1";
            $params = [];

            if ($fecha) {
                $sql .= " AND fecha = :fecha";
                $params[':fecha'] = $fecha;
            }

            if ($turnoId) {
                $sql .= " AND turno_id = :turno_id";
                $params[':turno_id'] = $turnoId;
            }

            $sql .= " ORDER BY created_at DESC LIMIT :limite";

            $stmt = $db->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limite', (int)$limite, PDO::PARAM_INT);
            $stmt->execute();

            $ventas = $stmt->fetchAll();
            sendResponse(true, ['ventas' => $ventas]);
            break;

        // ==========================================
        // CLIENTES
        // ==========================================

        case 'guardarCliente':
            if ($method !== 'POST') {
                sendResponse(false, null, 'Método no permitido');
            }

            $stmt = $db->prepare("
                INSERT INTO clientes (
                    nombre, telefono, direccion, email, created_at
                ) VALUES (
                    :nombre, :telefono, :direccion, :email, NOW()
                )
                ON DUPLICATE KEY UPDATE
                    direccion = VALUES(direccion),
                    email = VALUES(email),
                    updated_at = NOW()
            ");

            $stmt->execute([
                ':nombre' => $requestData['nombre'],
                ':telefono' => $requestData['telefono'],
                ':direccion' => $requestData['direccion'] ?? '',
                ':email' => $requestData['email'] ?? ''
            ]);

            sendResponse(true, ['message' => 'Cliente guardado correctamente']);
            break;

        case 'buscarClientes':
            $query = $_GET['q'] ?? '';

            $stmt = $db->prepare("
                SELECT * FROM clientes
                WHERE nombre LIKE :query
                   OR telefono LIKE :query
                ORDER BY nombre
                LIMIT 50
            ");

            $stmt->execute([':query' => "%{$query}%"]);
            $clientes = $stmt->fetchAll();

            sendResponse(true, ['clientes' => $clientes]);
            break;

        // ==========================================
        // TURNOS
        // ==========================================

        case 'guardarTurno':
            if ($method !== 'POST') {
                sendResponse(false, null, 'Método no permitido');
            }

            $stmt = $db->prepare("
                INSERT INTO turnos (
                    turno_id, usuario, fecha_apertura, hora_apertura,
                    monto_inicial, estado, created_at
                ) VALUES (
                    :turno_id, :usuario, :fecha_apertura, :hora_apertura,
                    :monto_inicial, 'abierto', NOW()
                )
            ");

            $stmt->execute([
                ':turno_id' => $requestData['turnoId'],
                ':usuario' => $requestData['usuario'],
                ':fecha_apertura' => $requestData['fechaApertura'],
                ':hora_apertura' => $requestData['horaApertura'],
                ':monto_inicial' => $requestData['montoInicial']
            ]);

            sendResponse(true, ['message' => 'Turno abierto correctamente']);
            break;

        case 'obtenerTurnoActual':
            $stmt = $db->prepare("
                SELECT * FROM turnos
                WHERE estado = 'abierto'
                ORDER BY created_at DESC
                LIMIT 1
            ");

            $stmt->execute();
            $turno = $stmt->fetch();

            sendResponse(true, ['turno' => $turno]);
            break;

        case 'cerrarTurno':
            if ($method !== 'POST') {
                sendResponse(false, null, 'Método no permitido');
            }

            $stmt = $db->prepare("
                UPDATE turnos SET
                    fecha_cierre = :fecha_cierre,
                    hora_cierre = :hora_cierre,
                    monto_final = :monto_final,
                    total_ventas = :total_ventas,
                    total_gastos = :total_gastos,
                    efectivo = :efectivo,
                    tarjeta = :tarjeta,
                    transferencia = :transferencia,
                    estado = 'cerrado',
                    updated_at = NOW()
                WHERE turno_id = :turno_id
            ");

            $stmt->execute([
                ':turno_id' => $requestData['turnoId'],
                ':fecha_cierre' => $requestData['fechaCierre'],
                ':hora_cierre' => $requestData['horaCierre'],
                ':monto_final' => $requestData['montoFinal'],
                ':total_ventas' => $requestData['totalVentas'],
                ':total_gastos' => $requestData['totalGastos'],
                ':efectivo' => $requestData['efectivo'],
                ':tarjeta' => $requestData['tarjeta'],
                ':transferencia' => $requestData['transferencia']
            ]);

            sendResponse(true, ['message' => 'Turno cerrado correctamente']);
            break;

        case 'obtenerTurnos':
            $limite = $_GET['limite'] ?? 50;

            $stmt = $db->prepare("
                SELECT * FROM turnos
                ORDER BY created_at DESC
                LIMIT :limite
            ");

            $stmt->bindValue(':limite', (int)$limite, PDO::PARAM_INT);
            $stmt->execute();

            $turnos = $stmt->fetchAll();
            sendResponse(true, ['turnos' => $turnos]);
            break;

        // ==========================================
        // GASTOS
        // ==========================================

        case 'guardarGasto':
            if ($method !== 'POST') {
                sendResponse(false, null, 'Método no permitido');
            }

            $stmt = $db->prepare("
                INSERT INTO gastos (
                    fecha, hora, concepto, monto, turno_id, created_at
                ) VALUES (
                    :fecha, :hora, :concepto, :monto, :turno_id, NOW()
                )
            ");

            $stmt->execute([
                ':fecha' => $requestData['fecha'],
                ':hora' => $requestData['hora'],
                ':concepto' => $requestData['concepto'],
                ':monto' => $requestData['monto'],
                ':turno_id' => $requestData['turnoId']
            ]);

            $gastoId = $db->lastInsertId();
            sendResponse(true, ['gasto_id' => $gastoId, 'message' => 'Gasto guardado correctamente']);
            break;

        case 'obtenerGastos':
            $turnoId = $_GET['turno_id'] ?? null;

            if (!$turnoId) {
                sendResponse(false, null, 'turno_id requerido');
            }

            $stmt = $db->prepare("
                SELECT * FROM gastos
                WHERE turno_id = :turno_id
                ORDER BY created_at DESC
            ");

            $stmt->execute([':turno_id' => $turnoId]);
            $gastos = $stmt->fetchAll();

            sendResponse(true, ['gastos' => $gastos]);
            break;

        // ==========================================
        // REPORTES
        // ==========================================

        case 'reporteVentas':
            $fechaInicio = $_GET['fecha_inicio'] ?? null;
            $fechaFin = $_GET['fecha_fin'] ?? null;

            $sql = "SELECT * FROM ventas WHERE 1=1";
            $params = [];

            if ($fechaInicio) {
                $sql .= " AND fecha >= :fecha_inicio";
                $params[':fecha_inicio'] = $fechaInicio;
            }

            if ($fechaFin) {
                $sql .= " AND fecha <= :fecha_fin";
                $params[':fecha_fin'] = $fechaFin;
            }

            $sql .= " ORDER BY fecha DESC, hora DESC";

            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            $reporte = $stmt->fetchAll();
            sendResponse(true, ['reporte' => $reporte]);
            break;

        default:
            sendResponse(false, null, 'Acción no válida');
    }

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    sendResponse(false, null, 'Error en la base de datos');
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    sendResponse(false, null, 'Error en el servidor');
}
?>
```

## 📄 .htaccess (Opcional)

Para mejorar la seguridad y configuración:

```apache
# Permitir solo archivos PHP
<FilesMatch "\.(php|js)$">
    Order allow,deny
    Allow from all
</FilesMatch>

# Denegar acceso directo a archivos de configuración
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>

# Habilitar CORS
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type"

# Configurar index por defecto
DirectoryIndex index.php

# Ocultar errores de PHP en producción
php_flag display_errors Off
php_flag log_errors On
```

## 🗄️ Estructura de Base de Datos

Las tablas necesarias en MySQL:

```sql
-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    folio VARCHAR(50),
    rastreo VARCHAR(100),
    nombre_remitente VARCHAR(255),
    telefono_remitente VARCHAR(20),
    direccion_remitente TEXT,
    nombre_destinatario VARCHAR(255),
    telefono_destinatario VARCHAR(20),
    direccion_destinatario TEXT,
    estado_destino VARCHAR(100),
    peso DECIMAL(10,2),
    precio DECIMAL(10,2),
    tipo_pago VARCHAR(50),
    observaciones TEXT,
    tipo_operacion VARCHAR(50) DEFAULT 'paqueteria',
    turno_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha),
    INDEX idx_turno (turno_id),
    INDEX idx_rastreo (rastreo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion TEXT,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY unique_telefono (telefono),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turno_id VARCHAR(100) NOT NULL UNIQUE,
    usuario VARCHAR(100),
    fecha_apertura DATE,
    hora_apertura TIME,
    fecha_cierre DATE,
    hora_cierre TIME,
    monto_inicial DECIMAL(10,2),
    monto_final DECIMAL(10,2),
    total_ventas DECIMAL(10,2),
    total_gastos DECIMAL(10,2),
    efectivo DECIMAL(10,2),
    tarjeta DECIMAL(10,2),
    transferencia DECIMAL(10,2),
    estado ENUM('abierto', 'cerrado') DEFAULT 'abierto',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    INDEX idx_turno_id (turno_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha (fecha_apertura)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de gastos
CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    concepto VARCHAR(255),
    monto DECIMAL(10,2),
    turno_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_turno (turno_id),
    INDEX idx_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## ✅ Checklist de Verificación Backend

- [ ] config.php existe y tiene credenciales correctas
- [ ] index.php existe y maneja todas las acciones
- [ ] Base de datos MySQL creada
- [ ] Tablas creadas (ventas, clientes, turnos, gastos)
- [ ] Usuario MySQL tiene permisos correctos
- [ ] CORS configurado correctamente
- [ ] .htaccess configurado (opcional)
- [ ] Permisos de archivos correctos (644)
- [ ] PHP versión 7.4+ instalada
- [ ] PDO MySQL habilitado en PHP

## 🔍 Probar el Backend

Prueba directamente desde el navegador:

```
https://paqueteriacmg.com/api/?action=obtenerVentas&limite=1
```

Deberías ver una respuesta JSON como:
```json
{
    "success": true,
    "ventas": []
}
```

## 📝 Notas de Seguridad

1. **Nunca subas config.php a GitHub** - contiene credenciales
2. Usa HTTPS en producción
3. Valida y sanitiza todos los inputs
4. Usa prepared statements (PDO) para prevenir SQL injection
5. Mantén los logs de errores fuera del webroot
6. Considera usar variables de entorno para credenciales
