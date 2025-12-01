<?php
require_once 'config.php';
require_once 'database.php';

try {
    // Obtener datos de la petición
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $action = $_GET['action'] ?? '';
        $data = $_GET;
    } else {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        $action = $data['action'] ?? '';
    }

    // Crear conexión a la base de datos
    $db = new Database();
    $conn = $db->connect();

    // Respuesta por defecto
    $response = ['success' => false, 'message' => 'Acción no válida'];

    // Manejar las diferentes acciones
    switch ($action) {
        case 'guardarVenta':
            $response = guardarVenta($conn, $data);
            break;

        case 'guardarCliente':
            $response = guardarCliente($conn, $data);
            break;

        case 'obtenerVentas':
            $response = obtenerVentas($conn, $data);
            break;

        case 'guardarVentaPorPaqueteria':
            $response = guardarVentaPorPaqueteria($conn, $data);
            break;

        case 'guardarDestinoFrecuente':
            $response = guardarDestinoFrecuente($conn, $data);
            break;

        case 'guardarEntrega':
            $response = guardarEntrega($conn, $data);
            break;

        case 'openTurno':
            $response = openTurno($conn, $data);
            break;

        case 'cerrarTurno':
            $response = cerrarTurno($conn, $data);
            break;

        case 'guardarGasto':
            $response = guardarGasto($conn, $data);
            break;

        default:
            $response = ['success' => false, 'message' => "Acción '$action' no reconocida"];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

// ========== FUNCIONES DE LA API ==========

function guardarVenta($conn, $data) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO ventas (
                fecha, cliente_id, cliente_nombre, paqueteria, num_guia,
                costo_envio, costo_paquete, total, metodo_pago,
                codigo_postal, estado, ciudad, turno_id, created_at
            ) VALUES (
                :fecha, :cliente_id, :cliente_nombre, :paqueteria, :num_guia,
                :costo_envio, :costo_paquete, :total, :metodo_pago,
                :codigo_postal, :estado, :ciudad, :turno_id, NOW()
            )
        ");

        $stmt->execute([
            ':fecha' => $data['fecha'] ?? date('Y-m-d'),
            ':cliente_id' => $data['clienteId'] ?? null,
            ':cliente_nombre' => $data['clienteNombre'] ?? '',
            ':paqueteria' => $data['paqueteria'] ?? '',
            ':num_guia' => $data['numGuia'] ?? '',
            ':costo_envio' => $data['costoEnvio'] ?? 0,
            ':costo_paquete' => $data['costoPaquete'] ?? 0,
            ':total' => $data['total'] ?? 0,
            ':metodo_pago' => $data['metodoPago'] ?? '',
            ':codigo_postal' => $data['codigoPostal'] ?? '',
            ':estado' => $data['estado'] ?? '',
            ':ciudad' => $data['ciudad'] ?? '',
            ':turno_id' => $data['turnoId'] ?? null
        ]);

        return [
            'success' => true,
            'message' => 'Venta guardada correctamente',
            'id' => $conn->lastInsertId()
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error al guardar venta: ' . $e->getMessage()];
    }
}

function guardarCliente($conn, $data) {
    try {
        // Verificar si el cliente existe
        $stmt = $conn->prepare("SELECT id FROM clientes WHERE id = :id");
        $stmt->execute([':id' => $data['idCliente']]);
        $existe = $stmt->fetch();

        if ($existe) {
            // Actualizar cliente existente
            $stmt = $conn->prepare("
                UPDATE clientes SET
                    nombre = :nombre,
                    telefono = :telefono,
                    compras_totales = :compras_totales,
                    updated_at = NOW()
                WHERE id = :id
            ");
        } else {
            // Insertar nuevo cliente
            $stmt = $conn->prepare("
                INSERT INTO clientes (
                    id, nombre, telefono, compras_totales, created_at
                ) VALUES (
                    :id, :nombre, :telefono, :compras_totales, NOW()
                )
            ");
        }

        $stmt->execute([
            ':id' => $data['idCliente'],
            ':nombre' => $data['nombre'] ?? '',
            ':telefono' => $data['telefono'] ?? '',
            ':compras_totales' => $data['comprasTotales'] ?? 0
        ]);

        return [
            'success' => true,
            'message' => 'Cliente guardado correctamente'
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error al guardar cliente: ' . $e->getMessage()];
    }
}

function obtenerVentas($conn, $data) {
    try {
        $fechaInicio = $data['fechaInicio'] ?? date('Y-m-d', strtotime('-30 days'));
        $fechaFin = $data['fechaFin'] ?? date('Y-m-d');

        $stmt = $conn->prepare("
            SELECT * FROM ventas
            WHERE fecha BETWEEN :fecha_inicio AND :fecha_fin
            ORDER BY created_at DESC
        ");

        $stmt->execute([
            ':fecha_inicio' => $fechaInicio,
            ':fecha_fin' => $fechaFin
        ]);

        $ventas = $stmt->fetchAll();

        return [
            'success' => true,
            'ventas' => $ventas
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error al obtener ventas: ' . $e->getMessage()];
    }
}

function guardarVentaPorPaqueteria($conn, $data) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO ventas_por_paqueteria (
                mes, paqueteria, total_ventas, created_at
            ) VALUES (
                :mes, :paqueteria, :total_ventas, NOW()
            )
            ON DUPLICATE KEY UPDATE
                total_ventas = total_ventas + :total_ventas,
                updated_at = NOW()
        ");

        $stmt->execute([
            ':mes' => $data['mes'] ?? date('Y-m'),
            ':paqueteria' => $data['paqueteria'] ?? '',
            ':total_ventas' => $data['totalVentas'] ?? 0
        ]);

        return [
            'success' => true,
            'message' => 'Venta por paquetería guardada'
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function guardarDestinoFrecuente($conn, $data) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO destinos_frecuentes (
                codigo_postal, ciudad, estado, frecuencia, created_at
            ) VALUES (
                :codigo_postal, :ciudad, :estado, 1, NOW()
            )
            ON DUPLICATE KEY UPDATE
                frecuencia = frecuencia + 1,
                updated_at = NOW()
        ");

        $stmt->execute([
            ':codigo_postal' => $data['codigoPostal'] ?? '',
            ':ciudad' => $data['ciudad'] ?? '',
            ':estado' => $data['estado'] ?? ''
        ]);

        return [
            'success' => true,
            'message' => 'Destino frecuente actualizado'
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function guardarEntrega($conn, $data) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO entregas (
                venta_id, fecha_entrega, estado, notas, turno_id, created_at
            ) VALUES (
                :venta_id, :fecha_entrega, :estado, :notas, :turno_id, NOW()
            )
        ");

        $stmt->execute([
            ':venta_id' => $data['ventaId'] ?? null,
            ':fecha_entrega' => $data['fechaEntrega'] ?? date('Y-m-d'),
            ':estado' => $data['estado'] ?? 'pendiente',
            ':notas' => $data['notas'] ?? '',
            ':turno_id' => $data['turnoId'] ?? null
        ]);

        return [
            'success' => true,
            'message' => 'Entrega guardada correctamente',
            'id' => $conn->lastInsertId()
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function openTurno($conn, $data) {
    try {
        // Verificar si hay un turno abierto
        $stmt = $conn->prepare("
            SELECT id FROM turnos
            WHERE estado = 'abierto'
            ORDER BY fecha_apertura DESC
            LIMIT 1
        ");
        $stmt->execute();
        $turnoAbierto = $stmt->fetch();

        if ($turnoAbierto) {
            return [
                'success' => false,
                'message' => 'Ya existe un turno abierto',
                'turnoId' => $turnoAbierto['id']
            ];
        }

        // Crear nuevo turno
        $stmt = $conn->prepare("
            INSERT INTO turnos (
                fecha_apertura, monto_inicial, estado, usuario, created_at
            ) VALUES (
                NOW(), :monto_inicial, 'abierto', :usuario, NOW()
            )
        ");

        $stmt->execute([
            ':monto_inicial' => $data['montoInicial'] ?? 0,
            ':usuario' => $data['usuario'] ?? 'Sistema'
        ]);

        $turnoId = $conn->lastInsertId();

        return [
            'success' => true,
            'message' => 'Turno abierto correctamente',
            'turnoId' => $turnoId
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function cerrarTurno($conn, $data) {
    try {
        $turnoId = $data['turnoId'] ?? null;

        if (!$turnoId) {
            return ['success' => false, 'message' => 'ID de turno no proporcionado'];
        }

        // Calcular totales del turno
        $stmt = $conn->prepare("
            SELECT
                COALESCE(SUM(total), 0) as total_ventas,
                COUNT(*) as num_ventas
            FROM ventas
            WHERE turno_id = :turno_id
        ");
        $stmt->execute([':turno_id' => $turnoId]);
        $totales = $stmt->fetch();

        // Calcular gastos
        $stmt = $conn->prepare("
            SELECT COALESCE(SUM(monto), 0) as total_gastos
            FROM gastos
            WHERE turno_id = :turno_id
        ");
        $stmt->execute([':turno_id' => $turnoId]);
        $gastos = $stmt->fetch();

        // Cerrar turno
        $stmt = $conn->prepare("
            UPDATE turnos SET
                fecha_cierre = NOW(),
                monto_final = :monto_final,
                total_ventas = :total_ventas,
                total_gastos = :total_gastos,
                estado = 'cerrado',
                updated_at = NOW()
            WHERE id = :turno_id
        ");

        $montoFinal = ($data['montoInicial'] ?? 0) + $totales['total_ventas'] - $gastos['total_gastos'];

        $stmt->execute([
            ':turno_id' => $turnoId,
            ':monto_final' => $montoFinal,
            ':total_ventas' => $totales['total_ventas'],
            ':total_gastos' => $gastos['total_gastos']
        ]);

        return [
            'success' => true,
            'message' => 'Turno cerrado correctamente',
            'resumen' => [
                'totalVentas' => $totales['total_ventas'],
                'numVentas' => $totales['num_ventas'],
                'totalGastos' => $gastos['total_gastos'],
                'montoFinal' => $montoFinal
            ]
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function guardarGasto($conn, $data) {
    try {
        $stmt = $conn->prepare("
            INSERT INTO gastos (
                fecha, concepto, monto, categoria, turno_id, created_at
            ) VALUES (
                :fecha, :concepto, :monto, :categoria, :turno_id, NOW()
            )
        ");

        $stmt->execute([
            ':fecha' => $data['fecha'] ?? date('Y-m-d'),
            ':concepto' => $data['concepto'] ?? '',
            ':monto' => $data['monto'] ?? 0,
            ':categoria' => $data['categoria'] ?? 'general',
            ':turno_id' => $data['turnoId'] ?? null
        ]);

        return [
            'success' => true,
            'message' => 'Gasto guardado correctamente',
            'id' => $conn->lastInsertId()
        ];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}
?>
