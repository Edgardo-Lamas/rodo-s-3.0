# Rodo's 3.0 — Guía del proyecto

Landing page de Rodrigo, técnico informático en La Plata.
Stack: Next.js 14 App Router · TypeScript · Tailwind CSS · Vercel · Supabase

---

## Paleta de colores

| Variable | Valor |
|---|---|
| `brand-dark` | `#060d1f` |
| `brand-orange` | `#e8820a` |
| `brand-orangeDark` | color más oscuro del naranja |
| `brand-blue` | `#4a9eff` |

---

## Variables de entorno (.env.local)

```
AUTH_SECRET=...               # nextauth, generado con openssl rand -base64 32
NEXT_PUBLIC_SUPABASE_URL=     # completar con datos de Rodrigo
SUPABASE_SERVICE_ROLE_KEY=    # completar con datos de Rodrigo
ANTHROPIC_API_KEY=...         # clave Claude para el agente del dashboard
ADMIN_EMAIL=admin@rodos.com   # login demo hasta tener Supabase
ADMIN_PASSWORD=rodos2025
```

---

## Supabase — tablas

Correr `supabase/schema.sql` en el SQL Editor de Supabase al tener las credenciales.

| Tabla | Descripción |
|---|---|
| `actividad` | Eventos de visitas y clicks (pageview, click_whatsapp, descarga_herramienta) |
| `consultas` | Formulario de contacto público |
| `leads` | Captura de email antes de descargar herramientas |
| `users` | Solo admin (Rodrigo). Password en bcrypt. |

Para generar el hash bcrypt de la contraseña de Rodrigo:
```bash
node -e "const b=require('bcryptjs'); b.hash('PASSWORD',12).then(console.log)"
```

---

## Autenticación (NextAuth v5)

- Archivo: `src/auth.ts`
- Modo demo: si `NEXT_PUBLIC_SUPABASE_URL` está vacío, acepta `ADMIN_EMAIL` + `ADMIN_PASSWORD` del .env
- Modo producción: consulta tabla `users` con bcrypt
- Ruta protegida: `/admin` (middleware.ts)
- **Importante:** el export del route handler es `export const { GET, POST } = handlers` — no `export { handlers as GET, POST }`

---

## Dashboard admin (`/admin`)

Tres tabs:
- **Panel** — KPIs (visitas, clicks WA, descargas, leads, consultas, conversión) + gráfico 14 días
- **Consultas** — tarjetas expandibles con estados: nuevo / respondido / cerrado
- **Leads** — listado de emails capturados antes de descargar herramientas
- **✦ Agente** — Claude especializado en el negocio de Rodrigo, responde en streaming

Funciona en **modo demo** sin Supabase (muestra badge "DEMO" con datos ficticios).

---

## Agente Claude (`/api/admin/agente`)

- Modelo: `claude-opus-4-7` con streaming
- System prompt: especialista en servicios IT La Plata, conversión WA, SEO local, estacionalidad
- Formato de respuesta: 4 bloques — 📊 Resumen · 🔧 Servicio a destacar · 📞 Acciones · 📣 Campaña
- Demo mode: usa contexto mock cuando Supabase no está configurado

---

## Captura de leads (modal antes de descargar)

- Componente: `src/components/DescargaModal.tsx`
- API: `src/app/api/leads/route.ts` → tabla `leads` en Supabase
- Flujo: botón "Descargar gratis" → modal pide nombre + email → guarda lead → abre descarga → cierra

---

## Secciones de la landing

| Sección | Componente | Notas |
|---|---|---|
| Hero | `Hero.tsx` | |
| Servicios | `Servicios.tsx` | Desarrollo Web en ancho completo arriba, flip vertical; 6 cards en 3 columnas |
| Proceso | `Proceso.tsx` | 3 pasos de retiro a domicilio |
| Red Familiar | `RedFamiliar.tsx` | Fondo animado con zoom lento (8s alternate infinite) |
| Herramientas | `HerramientasGratuitas.tsx` | Client component, abre DescargaModal antes de descargar |
| Contacto | `Contacto.tsx` | |

---

## Servicio: Internet Segura para la Familia

### Roles — quién ve qué

| Rol | Acceso |
|---|---|
| **Rodrigo** | Solo configuración técnica. No ve historial de navegación ni datos de la familia. |
| **Los padres** | Dashboard propio con actividad en tiempo real, reportes, estado del filtro. Tienen todas las contraseñas. |
| **El hijo** | No puede desinstalar el filtro ni cambiar configuraciones sin la clave de los padres. |

### Modelo de negocio

| Plan | Tipo | Incluye |
|---|---|---|
| Instalación | Pago único | Configuración del router del hogar — cubre todos los dispositivos en casa |
| Abono Básico | Mensual | Mantenimiento del filtro del router + soporte por WhatsApp |
| Abono Completo | Mensual | Todo lo anterior + celulares y tablets protegidos **fuera del hogar** + dashboard para los padres |

### Cómo se bloquea la desinstalación por dispositivo

- **iOS/iPadOS** — Screen Time con código de acceso que solo conocen los padres. Impide eliminar el perfil y cambiar configuraciones de red.
- **Android** — Google Family Link vinculado a la cuenta Google de los padres. Sin su aprobación el hijo no puede desinstalar apps ni cambiar el DNS.
- **Windows** — El script requiere contraseña de administrador para revertirse. El hijo usa cuenta estándar sin privilegios.

### Arquitectura técnica (interna — no comunicar al cliente)

- **Tecnología principal:** NextDNS — es la única opción que protege los celulares fuera del hogar.
- **Pi-hole:** opción alternativa solo para clientes que lo pidan o que ya tengan el hardware. Cubre únicamente la red del hogar, no los dispositivos móviles fuera de casa.
- **Router:** cambio de DNS apuntando a NextDNS — cubre todos los dispositivos del hogar.
- **Windows:** script `.bat` — aplica filtro a nivel sistema, requiere admin para revertir.
- **iOS/iPadOS:** perfil `.mobileconfig` + Screen Time con clave de los padres — funciona en cualquier red.
- **Android:** Google Family Link + DNS Privado nativo (Android 9+) o app NextDNS.

### Qué construir (roadmap de herramientas)

| Componente | Qué es | Estado |
|---|---|---|
| Script Windows `.bat` | Configura filtro DNS, requiere admin para revertir | ✅ Hecho |
| Perfil iOS `.mobileconfig` | DNS-over-HTTPS para iPhone/iPad, funciona fuera del hogar | ✅ Hecho |
| Guía Android `.html` | Pasos para configurar DNS privado en Android 9+ | ✅ Hecho |
| Guía Router `.html` | Referencia interna por marca (TP-Link, Fibertel, Claro) | ✅ Hecho |
| Contrato de privacidad `.html` | Documento firmable Ley 25.326, un ejemplar por parte | ✅ Hecho |
| Dashboard para los padres | URL privada por familia: actividad en tiempo real + historial | 🔲 Pendiente |
| Panel Rodrigo — clientes | Vista de todos los clientes: estado activo/inactivo, alertas | 🔲 Pendiente |

### Privacidad — cómo comunicarlo al cliente

Tres garantías verificables (sin explicar el mecanismo técnico):
1. **Tráfico invisible para terceros** — la navegación no es accesible para nadie fuera del hogar
2. **El panel es tuyo, con tu contraseña** — solo los padres acceden; pueden cambiar la clave cuando quieran
3. **Sin historial almacenado** — los reportes son en tiempo real, no se archivan

---

## PageTracker

- Componente: `src/components/PageTracker.tsx`
- Funciones exportadas: `trackWhatsApp()`, `trackDescarga(nombre)`
- Usa `sessionStorage` para session_id
- Omite tracking en rutas `/admin`

---

## Notas de desarrollo

- Siempre reiniciar con `rm -rf .next && npm run dev` si aparece `ChunkLoadError`
- TypeScript strict: usar `LucideIcon` (no `React.ComponentType<...>`) para íconos de lucide-react
- El agente de Claude usa `cache_control: { type: "ephemeral" }` en el system prompt
