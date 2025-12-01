<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario_db');  // Cambiar por tu usuario de MySQL
define('DB_PASS', 'tu_password_db'); // Cambiar por tu password de MySQL
define('DB_NAME', 'sistema_cmg');    // Nombre de la base de datos

// Configuración de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Zona horaria
date_default_timezone_set('America/Mexico_City');
?>
