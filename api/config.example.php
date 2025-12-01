<?php
/**
 * ARCHIVO DE EJEMPLO DE CONFIGURACIÓN
 *
 * INSTRUCCIONES:
 * 1. Copia este archivo y renómbralo a "config.php"
 * 2. Edita config.php con tus datos reales de Hostinger
 * 3. NUNCA subas config.php a un repositorio público
 */

// Configuración de base de datos - EJEMPLO
define('DB_HOST', 'localhost');  // Normalmente es 'localhost'
define('DB_USER', 'u123456789_cmg');  // Usuario de BD de Hostinger
define('DB_PASS', 'TuContraseñaSegura123!');  // Contraseña de BD
define('DB_NAME', 'u123456789_sistema_cmg');  // Nombre de BD
define('DB_CHARSET', 'utf8mb4');

// Configuración de CORS
$allowed_origins = [
    'https://tu-dominio.com',  // Tu dominio principal
    'https://www.tu-dominio.com',  // Con www
    'http://localhost',  // Para desarrollo local
];

// Zona horaria
date_default_timezone_set('America/Mexico_City');

// Modo debug (false en producción)
define('DEBUG_MODE', false);

// ... resto del código igual que config.php ...
