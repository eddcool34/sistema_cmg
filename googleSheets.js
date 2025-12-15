// URL de tu Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9XdqAP-HAZ3JiriptlZ6RlK3mJiI7A9DLUc47QEFpzCE07HcIZHVndqe57-9To5w1/exec';

// Función para guardar datos en Google Sheets
async function guardarEnGoogleSheets(hoja, valores) {
    try {
        const datos = {
            hoja: hoja,
            valores: valores
        };

        const respuesta = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        console.log('✅ Datos enviados a Google Sheets');
        return { exito: true };

    } catch (error) {
        console.error('❌ Error al enviar a Google Sheets:', error);
        return { exito: false, error: error };
    }
}

// Ejemplo de uso:
// guardarEnGoogleSheets('CLIENTES', ['CLI001', '2024-12-15', 'Juan Pérez', '2221234567', 'juan@email.com', 'Calle 123', 'Acatzingo', 'Puebla', '75050', 'PERJ850101']);
