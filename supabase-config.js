/**
 * CONFIGURACIÓN DE SUPABASE
 * ========================================
 * Este archivo configura la conexión a Supabase.
 *
 * IMPORTANTE: Reemplaza estos valores con tu configuración real de Supabase:
 * 1. Ve a https://app.supabase.com
 * 2. Selecciona tu proyecto
 * 3. Ve a Settings > API
 * 4. Copia la URL y la anon key
 */

// 🔧 CONFIGURACIÓN - Reemplaza con tus valores reales
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key-here';

// ✅ Crear cliente de Supabase
let supabaseClient = null;

try {
    // Verificar si la librería de Supabase está cargada
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase: Cliente creado correctamente');
    } else {
        console.warn('⚠️ Supabase: Librería no cargada. Carga desde CDN: https://cdn.jsdelivr.net/npm/@supabase/supabase-js');
    }
} catch (error) {
    console.error('❌ Supabase: Error al crear cliente:', error);
}

// Exportar cliente para uso global
window.supabaseClient = supabaseClient;

console.log('%c📊 Supabase Config cargado', 'font-weight: bold; color: #3ECF8E;');
