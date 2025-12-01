-- Base de datos para Sistema CMG
-- Ejecutar este script en tu servidor MySQL/MariaDB

CREATE DATABASE IF NOT EXISTS sistema_cmg CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sistema_cmg;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    compras_totales INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre),
    INDEX idx_telefono (telefono)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_apertura DATETIME NOT NULL,
    fecha_cierre DATETIME,
    monto_inicial DECIMAL(10,2) DEFAULT 0,
    monto_final DECIMAL(10,2) DEFAULT 0,
    total_ventas DECIMAL(10,2) DEFAULT 0,
    total_gastos DECIMAL(10,2) DEFAULT 0,
    estado ENUM('abierto', 'cerrado') DEFAULT 'abierto',
    usuario VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_fecha_apertura (fecha_apertura),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    cliente_id VARCHAR(50),
    cliente_nombre VARCHAR(255),
    paqueteria VARCHAR(50),
    num_guia VARCHAR(100),
    costo_envio DECIMAL(10,2) DEFAULT 0,
    costo_paquete DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50),
    codigo_postal VARCHAR(10),
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    turno_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL,
    INDEX idx_fecha (fecha),
    INDEX idx_cliente (cliente_id),
    INDEX idx_paqueteria (paqueteria),
    INDEX idx_turno (turno_id),
    INDEX idx_num_guia (num_guia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de entregas
CREATE TABLE IF NOT EXISTS entregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT,
    fecha_entrega DATE NOT NULL,
    estado ENUM('pendiente', 'en_proceso', 'entregado', 'cancelado') DEFAULT 'pendiente',
    notas TEXT,
    turno_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL,
    INDEX idx_fecha_entrega (fecha_entrega),
    INDEX idx_estado (estado),
    INDEX idx_venta (venta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de gastos
CREATE TABLE IF NOT EXISTS gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) DEFAULT 'general',
    turno_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL,
    INDEX idx_fecha (fecha),
    INDEX idx_categoria (categoria),
    INDEX idx_turno (turno_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de ventas por paquetería (resumen mensual)
CREATE TABLE IF NOT EXISTS ventas_por_paqueteria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mes VARCHAR(7) NOT NULL, -- Formato: YYYY-MM
    paqueteria VARCHAR(50) NOT NULL,
    total_ventas DECIMAL(10,2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_mes_paqueteria (mes, paqueteria),
    INDEX idx_mes (mes),
    INDEX idx_paqueteria (paqueteria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de destinos frecuentes
CREATE TABLE IF NOT EXISTS destinos_frecuentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_postal VARCHAR(10) NOT NULL,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    frecuencia INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_codigo_postal (codigo_postal),
    INDEX idx_frecuencia (frecuencia DESC),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo (opcional)
-- INSERT INTO clientes (id, nombre, telefono, compras_totales) VALUES
-- ('CLI001', 'Juan Pérez', '5551234567', 5),
-- ('CLI002', 'María García', '5559876543', 3);
