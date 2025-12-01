<?php
/**
 * API PRINCIPAL DEL SISTEMA CMG
 *
 * Este archivo maneja todas las peticiones del frontend
 * Endpoints disponibles:
 * - POST /api/?action=guardarVenta
 * - POST /api/?action=guardarCliente
 * - GET  /api/?action=obtenerVentas
 * - POST /api/?action=guardarTurno
 * - POST /api/?action=cerrarTurno
 * - POST /api/?action=guardarGasto
 * - GET  /api/?action=obtenerTurnoActual
 * - GET  /api/?action=obtenerGastos&turno_id=xxx
 */

require_once 'config.php';

setupCORS();

try {
    $db = Database::getInstance()->getConnection();

    // Obtener acción
    $action = $_GET['action'] ?? $_POST['action'] ?? '';

    if (empty($action)) {
        sendError('No se especificó ninguna acción');
    }

    // Procesar según la acción
    switch ($action) {

        // ============================================
        // VENTAS
        // ============================================
        case 'guardarVenta':
            $data = json_decode(file_get_contents('php://input'), true);

            validateInput($data, ['tipo_operacion', 'precio', 'total_pago']);

            $stmt = $db->prepare("
                INSERT INTO ventas (
                    tipo_operacion, paqueteria, paqueteria_entrega, numero_guia,
                    cliente_nombre, cliente_telefono, destinatario, telefono_destinatario,
                    origen, destino, tipo_servicio, peso_kg, precio, metodo_pago,
                    comision, total_pago, servicio_nombre, servicio_detalles,
                    ruta_guia, turno_id, cajero, fecha_venta
                ) VALUES (
                    :tipo_operacion, :paqueteria, :paqueteria_entrega, :numero_guia,
                    :cliente_nombre, :cliente_telefono, :destinatario, :telefono_destinatario,
                    :origen, :destino, :tipo_servicio, :peso_kg, :precio, :metodo_pago,
                    :comision, :total_pago, :servicio_nombre, :servicio_detalles,
                    :ruta_guia, :turno_id, :cajero, :fecha_venta
                )
            ");

            $fecha_venta = $data['fecha_venta'] ?? date('Y-m-d H:i:s');

            $stmt->execute([
                ':tipo_operacion' => $data['tipo_operacion'],
                ':paqueteria' => $data['paqueteria'] ?? null,
                ':paqueteria_entrega' => $data['paqueteria_entrega'] ?? null,
                ':numero_guia' => $data['numero_guia'] ?? null,
                ':cliente_nombre' => $data['cliente_nombre'] ?? null,
                ':cliente_telefono' => $data['cliente_telefono'] ?? null,
                ':destinatario' => $data['destinatario'] ?? null,
                ':telefono_destinatario' => $data['telefono_destinatario'] ?? null,
                ':origen' => $data['origen'] ?? null,
                ':destino' => $data['destino'] ?? null,
                ':tipo_servicio' => $data['tipo_servicio'] ?? null,
                ':peso_kg' => $data['peso_kg'] ?? null,
                ':precio' => $data['precio'],
                ':metodo_pago' => $data['metodo_pago'] ?? 'efectivo',
                ':comision' => $data['comision'] ?? 0,
                ':total_pago' => $data['total_pago'],
                ':servicio_nombre' => $data['servicio_nombre'] ?? null,
                ':servicio_detalles' => $data['servicio_detalles'] ?? null,
                ':ruta_guia' => $data['ruta_guia'] ?? null,
                ':turno_id' => $data['turno_id'] ?? null,
                ':cajero' => $data['cajero'] ?? null,
                ':fecha_venta' => $fecha_venta
            ]);

            sendJSON([
                'success' => true,
                'message' => 'Venta guardada correctamente',
                'venta_id' => $db->lastInsertId()
            ]);
            break;

        case 'obtenerVentas':
            $turno_id = $_GET['turno_id'] ?? null;
            $fecha_inicio = $_GET['fecha_inicio'] ?? null;
            $fecha_fin = $_GET['fecha_fin'] ?? null;

            $sql = "SELECT * FROM ventas WHERE 1=1";
            $params = [];

            if ($turno_id) {
                $sql .= " AND turno_id = :turno_id";
                $params[':turno_id'] = $turno_id;
            }

            if ($fecha_inicio) {
                $sql .= " AND fecha_venta >= :fecha_inicio";
                $params[':fecha_inicio'] = $fecha_inicio;
            }

            if ($fecha_fin) {
                $sql .= " AND fecha_venta <= :fecha_fin";
                $params[':fecha_fin'] = $fecha_fin;
            }

            $sql .= " ORDER BY fecha_venta DESC";

            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $ventas = $stmt->fetchAll();

            sendJSON([
                'success' => true,
                'ventas' => $ventas
            ]);
            break;

        // ============================================
        // CLIENTES
        // ============================================
        case 'guardarCliente':
            $data = json_decode(file_get_contents('php://input'), true);

            validateInput($data, ['nombre']);

            // Verificar si el cliente ya existe por teléfono
            if (!empty($data['telefono'])) {
                $stmt = $db->prepare("SELECT id FROM clientes WHERE telefono = :telefono");
                $stmt->execute([':telefono' => $data['telefono']]);

                if ($stmt->fetch()) {
                    // Actualizar cliente existente
                    $stmt = $db->prepare("
                        UPDATE clientes
                        SET nombre = :nombre, email = :email, direccion = :direccion
                        WHERE telefono = :telefono
                    ");
                    $stmt->execute([
                        ':nombre' => $data['nombre'],
                        ':email' => $data['email'] ?? null,
                        ':direccion' => $data['direccion'] ?? null,
                        ':telefono' => $data['telefono']
                    ]);

                    sendJSON([
                        'success' => true,
                        'message' => 'Cliente actualizado correctamente'
                    ]);
                    break;
                }
            }

            // Insertar nuevo cliente
            $stmt = $db->prepare("
                INSERT INTO clientes (nombre, telefono, email, direccion)
                VALUES (:nombre, :telefono, :email, :direccion)
            ");

            $stmt->execute([
                ':nombre' => $data['nombre'],
                ':telefono' => $data['telefono'] ?? null,
                ':email' => $data['email'] ?? null,
                ':direccion' => $data['direccion'] ?? null
            ]);

            sendJSON([
                'success' => true,
                'message' => 'Cliente guardado correctamente',
                'cliente_id' => $db->lastInsertId()
            ]);
            break;

        case 'buscarClientes':
            $busqueda = $_GET['q'] ?? '';

            $stmt = $db->prepare("
                SELECT * FROM clientes
                WHERE nombre LIKE :busqueda
                   OR telefono LIKE :busqueda
                   OR email LIKE :busqueda
                ORDER BY fecha_registro DESC
                LIMIT 20
            ");

            $stmt->execute([':busqueda' => "%$busqueda%"]);
            $clientes = $stmt->fetchAll();

            sendJSON([
                'success' => true,
                'clientes' => $clientes
            ]);
            break;

        // ============================================
        // TURNOS
        // ============================================
        case 'guardarTurno':
            $data = json_decode(file_get_contents('php://input'), true);

            validateInput($data, ['turno_id', 'cajero', 'fondo_inicial']);

            // Verificar si ya existe un turno abierto
            $stmt = $db->prepare("SELECT id FROM turnos WHERE estado = 'abierto'");
            $stmt->execute();

            if ($stmt->fetch()) {
                sendError('Ya existe un turno abierto. Debe cerrarlo antes de abrir uno nuevo.');
            }

            $stmt = $db->prepare("
                INSERT INTO turnos (
                    turno_id, cajero, fondo_inicial, fecha_apertura,
                    billetes_monedas, estado
                ) VALUES (
                    :turno_id, :cajero, :fondo_inicial, :fecha_apertura,
                    :billetes_monedas, 'abierto'
                )
            ");

            $fecha_apertura = $data['fecha_apertura'] ?? date('Y-m-d H:i:s');
            $billetes_monedas = isset($data['billetes_monedas']) ?
                json_encode($data['billetes_monedas']) : null;

            $stmt->execute([
                ':turno_id' => $data['turno_id'],
                ':cajero' => $data['cajero'],
                ':fondo_inicial' => $data['fondo_inicial'],
                ':fecha_apertura' => $fecha_apertura,
                ':billetes_monedas' => $billetes_monedas
            ]);

            sendJSON([
                'success' => true,
                'message' => 'Turno abierto correctamente',
                'turno_id' => $data['turno_id']
            ]);
            break;

        case 'obtenerTurnoActual':
            $stmt = $db->prepare("
                SELECT * FROM turnos
                WHERE estado = 'abierto'
                ORDER BY fecha_apertura DESC
                LIMIT 1
            ");
            $stmt->execute();
            $turno = $stmt->fetch();

            if ($turno && !empty($turno['billetes_monedas'])) {
                $turno['billetes_monedas'] = json_decode($turno['billetes_monedas'], true);
            }

            sendJSON([
                'success' => true,
                'turno' => $turno ?: null
            ]);
            break;

        case 'cerrarTurno':
            $data = json_decode(file_get_contents('php://input'), true);

            validateInput($data, ['turno_id']);

            $stmt = $db->prepare("
                UPDATE turnos SET
                    fecha_cierre = :fecha_cierre,
                    total_ventas_efectivo = :total_ventas_efectivo,
                    total_ventas_tarjeta = :total_ventas_tarjeta,
                    total_ventas_transferencia = :total_ventas_transferencia,
                    total_gastos = :total_gastos,
                    efectivo_final = :efectivo_final,
                    efectivo_esperado = :efectivo_esperado,
                    diferencia = :diferencia,
                    billetes_monedas = :billetes_monedas,
                    notas = :notas,
                    estado = 'cerrado'
                WHERE turno_id = :turno_id
            ");

            $fecha_cierre = $data['fecha_cierre'] ?? date('Y-m-d H:i:s');
            $billetes_monedas = isset($data['billetes_monedas']) ?
                json_encode($data['billetes_monedas']) : null;

            $stmt->execute([
                ':turno_id' => $data['turno_id'],
                ':fecha_cierre' => $fecha_cierre,
                ':total_ventas_efectivo' => $data['total_ventas_efectivo'] ?? 0,
                ':total_ventas_tarjeta' => $data['total_ventas_tarjeta'] ?? 0,
                ':total_ventas_transferencia' => $data['total_ventas_transferencia'] ?? 0,
                ':total_gastos' => $data['total_gastos'] ?? 0,
                ':efectivo_final' => $data['efectivo_final'] ?? 0,
                ':efectivo_esperado' => $data['efectivo_esperado'] ?? 0,
                ':diferencia' => $data['diferencia'] ?? 0,
                ':billetes_monedas' => $billetes_monedas,
                ':notas' => $data['notas'] ?? null
            ]);

            sendJSON([
                'success' => true,
                'message' => 'Turno cerrado correctamente'
            ]);
            break;

        case 'obtenerTurnos':
            $limite = $_GET['limite'] ?? 50;

            $stmt = $db->prepare("
                SELECT * FROM v_reporte_turnos
                ORDER BY fecha_apertura DESC
                LIMIT :limite
            ");
            $stmt->bindValue(':limite', (int)$limite, PDO::PARAM_INT);
            $stmt->execute();
            $turnos = $stmt->fetchAll();

            // Decodificar JSON de billetes_monedas
            foreach ($turnos as &$turno) {
                if (!empty($turno['billetes_monedas'])) {
                    $turno['billetes_monedas'] = json_decode($turno['billetes_monedas'], true);
                }
            }

            sendJSON([
                'success' => true,
                'turnos' => $turnos
            ]);
            break;

        // ============================================
        // GASTOS
        // ============================================
        case 'guardarGasto':
            $data = json_decode(file_get_contents('php://input'), true);

            validateInput($data, ['turno_id', 'cajero', 'concepto', 'monto']);

            $stmt = $db->prepare("
                INSERT INTO gastos (turno_id, cajero, concepto, monto, notas, fecha_gasto)
                VALUES (:turno_id, :cajero, :concepto, :monto, :notas, :fecha_gasto)
            ");

            $fecha_gasto = $data['fecha_gasto'] ?? date('Y-m-d H:i:s');

            $stmt->execute([
                ':turno_id' => $data['turno_id'],
                ':cajero' => $data['cajero'],
                ':concepto' => $data['concepto'],
                ':monto' => $data['monto'],
                ':notas' => $data['notas'] ?? null,
                ':fecha_gasto' => $fecha_gasto
            ]);

            sendJSON([
                'success' => true,
                'message' => 'Gasto registrado correctamente',
                'gasto_id' => $db->lastInsertId()
            ]);
            break;

        case 'obtenerGastos':
            $turno_id = $_GET['turno_id'] ?? null;

            if (!$turno_id) {
                sendError('Se requiere el turno_id');
            }

            $stmt = $db->prepare("
                SELECT * FROM gastos
                WHERE turno_id = :turno_id
                ORDER BY fecha_gasto DESC
            ");
            $stmt->execute([':turno_id' => $turno_id]);
            $gastos = $stmt->fetchAll();

            sendJSON([
                'success' => true,
                'gastos' => $gastos
            ]);
            break;

        // ============================================
        // REPORTES
        // ============================================
        case 'reporteVentas':
            $fecha_inicio = $_GET['fecha_inicio'] ?? date('Y-m-d 00:00:00');
            $fecha_fin = $_GET['fecha_fin'] ?? date('Y-m-d 23:59:59');

            $stmt = $db->prepare("
                SELECT
                    COUNT(*) as total_operaciones,
                    SUM(total_pago) as total_ventas,
                    SUM(CASE WHEN metodo_pago = 'efectivo' THEN total_pago ELSE 0 END) as efectivo,
                    SUM(CASE WHEN metodo_pago = 'tarjeta' THEN total_pago ELSE 0 END) as tarjeta,
                    SUM(CASE WHEN metodo_pago = 'transferencia' THEN total_pago ELSE 0 END) as transferencia,
                    tipo_operacion
                FROM ventas
                WHERE fecha_venta BETWEEN :fecha_inicio AND :fecha_fin
                GROUP BY tipo_operacion
            ");

            $stmt->execute([
                ':fecha_inicio' => $fecha_inicio,
                ':fecha_fin' => $fecha_fin
            ]);

            $reporte = $stmt->fetchAll();

            sendJSON([
                'success' => true,
                'reporte' => $reporte
            ]);
            break;

        default:
            sendError('Acción no válida: ' . $action);
    }

} catch (PDOException $e) {
    sendError('Error de base de datos', 500, $e->getMessage());
} catch (Exception $e) {
    sendError('Error del servidor', 500, $e->getMessage());
}
