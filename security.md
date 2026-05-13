# Security Audit — Rodo's 3.0

Fecha: 2026-05-14

---

## 🔴 CRÍTICO

### C1 — ANTHROPIC_API_KEY expuesta en contexto de conversación
- **Archivo:** `.env.local`
- **Problema:** La clave real fue leída durante la sesión de Claude Code y quedó visible en el contexto. El archivo está correctamente en `.gitignore` y nunca se commitea, pero la clave pudo haberse expuesto.
- **Fix:** Rotar la clave en console.anthropic.com → API Keys → Revoke y generar una nueva. Actualizar `.env.local` con la nueva clave y en Vercel → Settings → Environment Variables.
- **Estado:** ⚠️ PENDIENTE — requiere acción manual

---

## 🟠 ALTO

### A1 — Sin validación de inputs en `/api/leads` (ruta pública)
- **Archivo:** `src/app/api/leads/route.ts`
- **Problema:** Acepta cualquier valor en `nombre`, `email`, `herramienta` sin validar formato, longitud ni tipo. Permite insertar datos basura o payloads maliciosos en la tabla `leads`.
- **Fix aplicado:** Validación con Zod — email válido, strings con límite de longitud, herramienta en lista permitida.

### A2 — Sin validación de inputs en `/api/track` (ruta pública)
- **Archivo:** `src/app/api/track/route.ts`
- **Problema:** Acepta `tipo`, `page`, `payload`, `session_id` sin restricciones. `tipo` podría ser cualquier string; `payload` acepta JSON arbitrario sin límite.
- **Fix aplicado:** Zod schema — `tipo` enum de valores permitidos, longitudes máximas en todos los campos.

### A3 — Contraseña demo débil comparada en plaintext
- **Archivo:** `src/auth.ts`
- **Problema:** El modo demo compara `ADMIN_PASSWORD` directamente como string (no bcrypt). La contraseña `rodos2025` es débil.
- **Fix aplicado:** Cambiar a una contraseña más fuerte en `.env.local`. El modo demo es aceptable sin bcrypt porque es solo para desarrollo local, pero la contraseña debe ser robusta.
- **Recomendación:** Cuando Supabase esté activo, el modo demo se desactiva y usa bcrypt. Cambiar `ADMIN_PASSWORD` en `.env.local` y en Vercel a algo más fuerte.

---

## 🟡 MEDIO

### M1 — `/api/admin/consultas` PATCH sin validar `estado`
- **Archivo:** `src/app/api/admin/consultas/route.ts`
- **Problema:** El campo `estado` se pasa directo a Supabase sin verificar que sea uno de los valores válidos (`nuevo`, `respondido`, `cerrado`). Un admin malicioso podría insertar valores arbitrarios.
- **Fix aplicado:** Validación con Zod enum.

### M2 — `/api/admin/red-familiar` PATCH sin validar tipos
- **Archivo:** `src/app/api/admin/red-familiar/route.ts`
- **Problema:** `id` y `activo` se usan directamente sin validar que `id` sea UUID y `activo` sea boolean.
- **Fix aplicado:** Zod schema con `uuid()` y `boolean()`.

### M3 — Sin rate limiting en rutas públicas
- **Archivos:** `/api/leads`, `/api/track`, `/api/familia/[token]`
- **Problema:** Sin rate limiting, un bot puede spammear leads falsos o llenar la tabla `actividad`.
- **Fix recomendado:** Activar Vercel's Edge Rate Limiting (plan Pro) o usar `@upstash/ratelimit` con Redis. Por ahora las tablas de Supabase tienen RLS que limita el impacto. Prioridad media para cuando el sitio tenga tráfico real.
- **Estado:** ⚠️ PENDIENTE — requiere Redis/Upstash

### M4 — No hay headers de seguridad HTTP
- **Archivo:** `next.config.mjs`
- **Problema:** Faltan `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`.
- **Fix aplicado:** Headers de seguridad en `next.config.mjs`.

---

## 🟢 INFO / BAJO

### B1 — Token de familia como único factor de auth
- **Archivo:** `src/app/api/familia/[token]/route.ts`
- **Problema:** El token en la URL es el único mecanismo de autenticación del dashboard familiar. Si se filtra la URL, cualquiera puede ver los datos.
- **Evaluación:** Aceptable por diseño — el token tiene 32 bytes de entropía (256 bits), imposible de adivinar por fuerza bruta. Documentado como decisión intencional.

### B2 — `SUPABASE_SERVICE_ROLE_KEY` usada en rutas públicas
- **Archivos:** `/api/leads`, `/api/track`, `/api/familia/[token]`
- **Evaluación:** Correcto para rutas server-side en Next.js — la service role key nunca llega al cliente. Sin embargo, estas rutas deben tener validación de inputs (ver A1/A2) para no abusar del acceso privilegiado a Supabase.

---

## Checklist de estado

| ID | Descripción | Estado |
|----|-------------|--------|
| C1 | Rotar ANTHROPIC_API_KEY | ⚠️ Manual |
| A1 | Validación en /api/leads | ✅ Aplicado |
| A2 | Validación en /api/track | ✅ Aplicado |
| A3 | Contraseña demo más fuerte | ⚠️ Manual |
| M1 | Validar `estado` en consultas | ✅ Aplicado |
| M2 | Validar `id`/`activo` en red-familiar | ✅ Aplicado |
| M3 | Rate limiting rutas públicas | ⚠️ Pendiente |
| M4 | Headers de seguridad HTTP | ✅ Aplicado |
