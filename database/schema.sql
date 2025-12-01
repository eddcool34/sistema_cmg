-- ========================================
-- SISTEMA CMG - ESTRUCTURA DE BASE DE DATOS
-- ========================================
-- Este script crea todas las tablas necesarias para el sistema CMG
-- Ejecutar en tu panel de phpMyAdmin en Hostinger

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(255),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_telefono (telefono),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_operacion ENUM('envio', 'devolucion', 'entrega', 'servicio') NOT NULL,
    paqueteria VARCHAR(50),
    paqueteria_entrega VARCHAR(50),
    numero_guia VARCHAR(100),
    cliente_nombre VARCHAR(255),
    cliente_telefono VARCHAR(20),
    destinatario VARCHAR(255),
    telefono_destinatario VARCHAR(20),
    origen VARCHAR(255),
    destino VARCHAR(255),
    tipo_servicio ENUM('nacional', 'internacional'),
    peso_kg DECIMAL(10,2),
    precio DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia') DEFAULT 'efectivo',
    comision DECIMAL(10,2) DEFAULT 0,
    total_pago DECIMAL(10,2) NOT NULL,
    servicio_nombre VARCHAR(255),
    servicio_detalles TEXT,
    ruta_guia VARCHAR(500),
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    turno_id VARCHAR(100),
    cajero VARCHAR(100),
    INDEX idx_numero_guia (numero_guia),
    INDEX idx_tipo_operacion (tipo_operacion),
    INDEX idx_fecha_venta (fecha_venta),
    INDEX idx_turno_id (turno_id),
    INDEX idx_cajero (cajero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turno_id VARCHAR(100) UNIQUE NOT NULL,
    cajero VARCHAR(100) NOT NULL,
    fondo_inicial DECIMAL(10,2) NOT NULL DEFAULT 1000.00,
    fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP NULL,
    total_ventas_efectivo DECIMAL(10,2) DEFAULT 0,
    total_ventas_tarjeta DECIMAL(10,2) DEFAULT 0,
    total_ventas_transferencia DECIMAL(10,2) DEFAULT 0,
    total_gastos DECIMAL(10,2) DEFAULT 0,
    efectivo_final DECIMAL(10,2) DEFAULT 0,
    efectivo_esperado DECIMAL(10,2) DEFAULT 0,
    diferencia DECIMAL(10,2) DEFAULT 0,
    billetes_monedas JSON,
    estado ENUM('abierto', 'cerrado') DEFAULT 'abierto',
    notas TEXT,
    INDEX idx_turno_id (turno_id),
    INDEX idx_cajero (cajero),
    INDEX idx_estado (estado),
    INDEX idx_fecha_apertura (fecha_apertura)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de gastos
CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turno_id VARCHAR(100) NOT NULL,
    cajero VARCHAR(100) NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_gasto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT,
    INDEX idx_turno_id (turno_id),
    INDEX idx_cajero (cajero),
    INDEX idx_fecha_gasto (fecha_gasto),
    FOREIGN KEY (turno_id) REFERENCES turnos(turno_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    descripcion TEXT,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar configuración inicial
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('fondo_inicial_default', '1000', 'Fondo inicial por defecto para turnos'),
('contraseña_sistema', 'cmg2025', 'Contraseña para cerrar turnos'),
('cajeros', '["Mariana", "Edgar", "Cris"]', 'Lista de cajeros del sistema')
ON DUPLICATE KEY UPDATE valor=valor;

-- Vista para reporte de ventas
CREATE OR REPLACE VIEW v_reporte_ventas AS
SELECT
    v.id,
    v.tipo_operacion,
    v.numero_guia,
    v.cliente_nombre,
    v.destinatario,
    v.precio,
    v.metodo_pago,
    v.total_pago,
    v.fecha_venta,
    v.cajero,
    t.turno_id,
    t.fecha_apertura as turno_fecha_apertura,
    t.estado as turno_estado
FROM ventas v
LEFT JOIN turnos t ON v.turno_id = t.turno_id
ORDER BY v.fecha_venta DESC;

-- Vista para reporte de turnos
CREATE OR REPLACE VIEW v_reporte_turnos AS
SELECT
    t.*,
    COUNT(DISTINCT v.id) as total_operaciones,
    COALESCE(SUM(v.total_pago), 0) as total_ventas_real,
    COALESCE(SUM(CASE WHEN v.metodo_pago = 'efectivo' THEN v.total_pago ELSE 0 END), 0) as ventas_efectivo,
    COALESCE(SUM(CASE WHEN v.metodo_pago = 'tarjeta' THEN v.total_pago ELSE 0 END), 0) as ventas_tarjeta,
    COALESCE(SUM(CASE WHEN v.metodo_pago = 'transferencia' THEN v.total_pago ELSE 0 END), 0) as ventas_transferencia,
    COALESCE(SUM(g.monto), 0) as total_gastos_real
FROM turnos t
LEFT JOIN ventas v ON t.turno_id = v.turno_id
LEFT JOIN gastos g ON t.turno_id = g.turno_id
GROUP BY t.id
ORDER BY t.fecha_apertura DESC;
