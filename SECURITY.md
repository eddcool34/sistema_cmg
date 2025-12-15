# 🔒 Política de Seguridad - Sistema CMG

Este documento describe las prácticas de seguridad, vulnerabilidades conocidas, y cómo reportar problemas de seguridad.

---

## 📋 Tabla de Contenidos

1. [Versiones Soportadas](#versiones-soportadas)
2. [Reportar Vulnerabilidades](#reportar-vulnerabilidades)
3. [Mejores Prácticas de Seguridad](#mejores-prácticas-de-seguridad)
4. [Arquitectura de Seguridad](#arquitectura-de-seguridad)
5. [Vulnerabilidades Conocidas](#vulnerabilidades-conocidas)
6. [Lista de Verificación de Seguridad](#lista-de-verificación-de-seguridad)

---

## 🛡️ Versiones Soportadas

| Versión | Soportada          | Actualizaciones de Seguridad |
| ------- | ------------------ | ---------------------------- |
| 2.2.x   | ✅ Sí              | Sí                          |
| 2.1.x   | ⚠️ Parcial         | Solo críticas               |
| 2.0.x   | ⚠️ Parcial         | Solo críticas               |
| < 2.0   | ❌ No              | No                          |

**Recomendación**: Actualiza siempre a la última versión para obtener las últimas correcciones de seguridad.

---

## 🚨 Reportar Vulnerabilidades

### ¿Encontraste una vulnerabilidad de seguridad?

**NO** abras un issue público. En su lugar:

1. **Contacta de forma privada:**
   - Envía un email a: [AGREGAR EMAIL DE SEGURIDAD]
   - Usa el asunto: `[SECURITY] Vulnerabilidad en Sistema CMG`

2. **Incluye en tu reporte:**
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir el problema
   - Versión afectada del sistema
   - Impacto potencial (CVSS score si es posible)
   - Proof of Concept (PoC) si está disponible
   - Tu información de contacto para seguimiento

3. **Tiempo de respuesta esperado:**
   - Confirmación inicial: **48 horas**
   - Evaluación preliminar: **7 días**
   - Corrección y publicación: **30 días** (vulnerabilidades críticas: 7 días)

4. **Divulgación responsable:**
   - Por favor, no divulgues la vulnerabilidad públicamente hasta que se haya lanzado un parche
   - Se te acreditará en el changelog si lo deseas

---

## 🔐 Mejores Prácticas de Seguridad

### 1. Gestión de Contraseñas

#### ✅ HACER

```javascript
// Contraseñas seguras con alta entropía
const contrasena = 'CMG_System2024!Secure#Pass';

// Características de una contraseña segura:
// - Mínimo 12 caracteres (recomendado: 16+)
// - Mayúsculas y minúsculas
// - Números
// - Símbolos especiales
// - Sin patrones predecibles
```

#### ❌ NO HACER

```javascript
// ❌ Contraseñas débiles
const contrasena = 'admin123';       // Muy débil
const contrasena = 'password';       // Palabra común
const contrasena = '12345678';       // Solo números
const contrasena = 'Admin2024';      // Predecible

// ❌ Contraseñas expuestas en código
const password = 'mi_contraseña';    // Hardcoded
console.log('Password:', password);  // Logging de credenciales
```

#### Herramientas Recomendadas

- **Generadores de contraseñas**:
  - LastPass Password Generator
  - 1Password Strong Password Generator
  - Bitwarden Password Generator

- **Gestores de contraseñas**:
  - Bitwarden (Open Source)
  - 1Password
  - LastPass
  - KeePass

### 2. Configuración Segura

#### Archivo config.js

```javascript
// ✅ CORRECTO: config.js NO versionado en git
// Verificar con: git status (no debe aparecer)

// ✅ CORRECTO: Permisos restrictivos
// chmod 600 config.js  (solo owner puede leer/escribir)

// ✅ CORRECTO: Validación de datos
const CONFIG_USUARIOS = [
    {
        usuario: 'admin',
        contrasena: process.env.ADMIN_PASSWORD || 'FALLBACK_SEGURO', // Variable de entorno
        rol: 'ADMINISTRADOR'
    }
];

// ❌ INCORRECTO: Credenciales en código versionado
// ❌ INCORRECTO: Permisos 777 (todos pueden leer)
// ❌ INCORRECTO: Sin validación
```

### 3. Protección de Archivos Sensibles

#### Apache (.htaccess)

```apache
# Denegar acceso a archivos sensibles
<FilesMatch "^(config\.js|\.git.*|\.env.*|database\.php)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Prevenir listado de directorios
Options -Indexes

# Proteger archivos de backup
<FilesMatch "\.(bak|backup|sql|log)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

#### Nginx

```nginx
# Denegar acceso a archivos sensibles
location ~ /(config\.js|\.git|\.env|database\.php) {
    deny all;
    return 404;
}

# Proteger archivos de backup
location ~ \.(bak|backup|sql|log)$ {
    deny all;
    return 404;
}

# Deshabilitar listado de directorios
autoindex off;
```

### 4. HTTPS/TLS

#### ¿Por qué es importante HTTPS?

- ✅ Encripta datos en tránsito (contraseñas, tokens, datos sensibles)
- ✅ Previene ataques Man-in-the-Middle (MITM)
- ✅ Mejora SEO y confianza del usuario
- ✅ Requerido para APIs modernas

#### Configuración con Let's Encrypt (Gratis)

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-apache

# Obtener certificado
sudo certbot --apache -d tudominio.com -d www.tudominio.com

# Renovación automática (crontab)
0 0 1 * * certbot renew --quiet
```

#### Verificar calidad del certificado SSL

- SSL Labs Test: https://www.ssllabs.com/ssltest/
- Meta objetivo: Calificación A o A+

### 5. Control de Acceso Basado en Roles (RBAC)

#### Principio de Mínimo Privilegio

```javascript
// ✅ CORRECTO: Verificar permisos antes de cada acción
function eliminarVenta(ventaId) {
    const usuario = obtenerSesionActual();

    if (!tienePermiso('eliminar_ventas', usuario)) {
        console.error('Acceso denegado');
        mostrarError('No tienes permisos para eliminar ventas');
        return;
    }

    // Proceder con la eliminación
    eliminarVentaDB(ventaId);
    registrarAccion(usuario, 'eliminar_venta', `ID: ${ventaId}`);
}

// ❌ INCORRECTO: No verificar permisos
function eliminarVenta(ventaId) {
    eliminarVentaDB(ventaId); // Cualquiera puede eliminar
}
```

#### Auditoría de Acciones

```javascript
// ✅ CORRECTO: Registrar todas las acciones sensibles
registrarAccion(usuario, 'login', 'Inicio de sesión exitoso');
registrarAccion(usuario, 'eliminar_datos', 'Eliminó ventas del mes');
registrarAccion(usuario, 'exportar_datos', 'Exportó reporte de balance');

// Revisar logs periódicamente
const auditoria = obtenerAuditoria(100);
console.table(auditoria);
```

### 6. Validación de Entradas

```javascript
// ✅ CORRECTO: Validar y sanitizar inputs
function buscarCliente(nombre) {
    // Validar tipo
    if (typeof nombre !== 'string') {
        throw new Error('Nombre debe ser string');
    }

    // Sanitizar (remover caracteres peligrosos)
    nombre = nombre.trim().replace(/[<>]/g, '');

    // Validar longitud
    if (nombre.length > 100) {
        throw new Error('Nombre demasiado largo');
    }

    // Proceder con la búsqueda
    return buscarEnBD(nombre);
}

// ❌ INCORRECTO: Usar input directamente
function buscarCliente(nombre) {
    return buscarEnBD(nombre); // Vulnerable a XSS/injection
}
```

### 7. Gestión de Sesiones

```javascript
// ✅ CORRECTO: Sesiones con timeout
const CONFIG_SISTEMA = {
    SESION_DURACION: 4 * 60 * 60 * 1000, // 4 horas (no 24+)
};

function verificarSesion() {
    const sesion = obtenerSesionActual();

    // Verificar expiración
    const ahora = new Date().getTime();
    if (ahora - sesion.timestamp > CONFIG_SISTEMA.SESION_DURACION) {
        cerrarSesion();
        window.location.href = 'login.html';
        return null;
    }

    return sesion.usuario;
}

// ❌ INCORRECTO: Sesiones sin expiración
// localStorage.setItem('sesion', usuario); // Sin timestamp
```

---

## 🏗️ Arquitectura de Seguridad

### Capas de Seguridad

```
┌─────────────────────────────────────────┐
│   1. HTTPS/TLS (Transporte)            │ ← Encriptación en tránsito
├─────────────────────────────────────────┤
│   2. Autenticación (Login)              │ ← Verificar identidad
├─────────────────────────────────────────┤
│   3. Autorización (RBAC)                │ ← Verificar permisos
├─────────────────────────────────────────┤
│   4. Validación de Entradas             │ ← Sanitizar datos
├─────────────────────────────────────────┤
│   5. Auditoría y Logging                │ ← Rastrear acciones
├─────────────────────────────────────────┤
│   6. localStorage (Persistencia)        │ ← Almacenamiento local
└─────────────────────────────────────────┘
```

### Modelo de Amenazas

| Amenaza | Impacto | Probabilidad | Mitigación |
|---------|---------|--------------|------------|
| Contraseñas débiles | Alto | Alto | Política de contraseñas fuertes |
| XSS (Cross-Site Scripting) | Medio | Medio | Sanitización de inputs |
| Session Hijacking | Alto | Bajo | Timeout de sesión, HTTPS |
| Acceso no autorizado | Alto | Medio | RBAC estricto |
| Pérdida de datos | Alto | Medio | Backups regulares |
| Exposición de credenciales | Crítico | Bajo | .gitignore, permisos de archivos |

---

## ⚠️ Vulnerabilidades Conocidas

### localStorage - Almacenamiento No Encriptado

**Descripción**: Los datos se almacenan en texto plano en localStorage del navegador.

**Impacto**:
- ❌ Un atacante con acceso físico a la máquina puede leer los datos
- ❌ Scripts maliciosos pueden acceder a localStorage

**Mitigación**:
1. No almacenar datos extremadamente sensibles (números de tarjetas, etc.)
2. Implementar timeout de sesión corto
3. Educar usuarios sobre seguridad física
4. Considerar migrar a backend con base de datos real

**Estado**: ⚠️ Limitación de diseño - A considerar para v3.0

### Contraseñas en Texto Plano (localStorage)

**Descripción**: Las contraseñas se comparan directamente sin hashing.

**Impacto**:
- ❌ Si alguien accede a localStorage, puede leer contraseñas
- ❌ No hay protección criptográfica

**Mitigación**:
1. **CRÍTICO**: Implementar hashing de contraseñas (bcrypt, scrypt, Argon2)
2. Ejemplo de implementación:

```javascript
// Implementar en próxima versión
async function hashPassword(password) {
    // Usar Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

async function autenticarUsuario(usuario, contrasena) {
    const hashedInput = await hashPassword(contrasena);
    const usuarioEncontrado = USUARIOS.find(u =>
        u.usuario === usuario &&
        u.contrasenaHash === hashedInput
    );
    return usuarioEncontrado || null;
}
```

**Estado**: 🔴 Pendiente de implementación - Prioridad Alta

### Sin Protección CSRF

**Descripción**: No hay tokens CSRF para prevenir ataques Cross-Site Request Forgery.

**Impacto**:
- ⚠️ Bajo (aplicación de página única, no hace requests cross-origin)
- ⚠️ Podría ser relevante si se integra con backend

**Mitigación**:
1. Si se implementa backend, añadir tokens CSRF
2. Usar SameSite cookies
3. Verificar Origin headers

**Estado**: 🟡 No crítico actualmente

---

## ✅ Lista de Verificación de Seguridad

### Instalación Inicial

- [ ] `config.js` creado y configurado con contraseñas seguras
- [ ] `config.js` NO está en el repositorio git (`git status`)
- [ ] `.gitignore` incluye `config.js`, `.env`, y archivos sensibles
- [ ] Permisos de `config.js` configurados: `chmod 600 config.js`
- [ ] Servidor web protege archivos sensibles (.htaccess o nginx.conf)

### Configuración del Servidor

- [ ] HTTPS habilitado con certificado válido (Let's Encrypt o comercial)
- [ ] Certificado SSL con calificación A o A+ en SSL Labs
- [ ] Firewall configurado (UFW, iptables, cloud firewall)
- [ ] Solo puertos necesarios abiertos (80, 443)
- [ ] SSH con autenticación por clave pública (no password)
- [ ] Servidor actualizado (`apt update && apt upgrade`)
- [ ] Fail2ban o similar instalado para prevenir brute force

### Seguridad de la Aplicación

- [ ] Todos los usuarios tienen contraseñas seguras (12+ caracteres)
- [ ] Usuario admin por defecto deshabilitado o renombrado
- [ ] Roles y permisos configurados correctamente
- [ ] Timeout de sesión configurado (máximo 8 horas)
- [ ] Auditoría habilitada y funcionando
- [ ] Logs revisados periódicamente

### Backups y Recuperación

- [ ] Sistema de backup automatizado configurado
- [ ] Backups probados (restore exitoso)
- [ ] Backups almacenados en ubicación segura (fuera del servidor)
- [ ] Backups encriptados si contienen datos sensibles
- [ ] Plan de recuperación ante desastres documentado

### Monitoreo Continuo

- [ ] Logs de acceso revisados semanalmente
- [ ] Auditoría de cambios revisada mensualmente
- [ ] Actualizaciones de seguridad aplicadas mensualmente
- [ ] Pruebas de penetración básicas realizadas trimestralmente
- [ ] Usuarios inactivos deshabilitados regularmente

---

## 🔄 Proceso de Actualización Segura

### Antes de Actualizar

1. **Backup completo**:
   ```bash
   cp -r /var/www/sistema_cmg /backups/sistema_cmg_$(date +%Y%m%d)
   ```

2. **Leer changelog**: Revisar cambios de seguridad

3. **Probar en staging**: No actualizar directamente en producción

### Durante la Actualización

1. **Modo mantenimiento**: Informar a usuarios
2. **Actualizar archivos**:
   ```bash
   git pull origin main
   ```
3. **Revisar config**: Verificar si hay nuevas opciones en `config.example.js`

### Después de Actualizar

1. **Verificar funcionalidad**: Probar login y funciones principales
2. **Revisar logs**: Buscar errores
3. **Monitorear**: Observar comportamiento por 24 horas

---

## 📚 Recursos Adicionales

### Guías de Seguridad

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Vulnerabilidades web más críticas
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) - Guías prácticas de seguridad
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security) - Mejores prácticas

### Herramientas de Auditoría

- **Lighthouse** (Chrome DevTools) - Auditoría de seguridad y performance
- **Mozilla Observatory** - Análisis de headers de seguridad
- **Snyk** - Escaneo de vulnerabilidades en dependencias
- **OWASP ZAP** - Proxy de penetración testing

### Normativas y Compliance

- **GDPR** (Europa) - Protección de datos personales
- **CCPA** (California) - Privacidad del consumidor
- **PCI-DSS** - Si manejas datos de tarjetas de crédito
- **ISO 27001** - Estándar de gestión de seguridad de la información

---

## 📝 Changelog de Seguridad

### v2.2.0 (2025-01-15)

#### 🔒 Mejoras de Seguridad
- ✅ Eliminada contraseña débil de fallback en `rbac-config.js`
- ✅ Mejorado `.gitignore` para proteger archivos sensibles
- ✅ Añadidas advertencias visibles si `config.js` no está configurado
- ✅ Documentación de seguridad completa (SECURITY.md)
- ✅ Guía de instalación segura (INSTALL.md)

#### ⚠️ Cambios que Rompen Compatibilidad
- ❗ `config.js` ahora es OBLIGATORIO (no hay usuario por defecto)
- ❗ Sistema no funcionará sin configuración adecuada

### v2.1.0 (2024-12-15)

#### 🔒 Mejoras de Seguridad
- Implementación de sistema RBAC completo
- Auditoría de acciones de usuarios
- Separación de configuración en `config.js`

---

## 🤝 Contribuciones de Seguridad

Si deseas contribuir a mejorar la seguridad del sistema:

1. Reporta vulnerabilidades de forma responsable (ver arriba)
2. Propón mejoras a través de Pull Requests
3. Documenta tus hallazgos de seguridad
4. Respeta la divulgación responsable

---

## 📞 Contacto de Seguridad

- **Email de Seguridad**: [AGREGAR EMAIL]
- **Issues de GitHub**: Solo para problemas no sensibles
- **Tiempo de respuesta**: 48 horas para reportes de seguridad

---

**Última actualización**: 2025-12-15
**Versión del documento**: 1.0.0

**Recuerda**: La seguridad es un proceso continuo, no un destino. Mantén el sistema actualizado y sigue las mejores prácticas. 🛡️
