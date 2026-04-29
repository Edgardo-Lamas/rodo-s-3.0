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

### Modelo de negocio

| Plan | Tipo | Incluye |
|---|---|---|
| Instalación | Pago único | Hardware + configuración inicial en domicilio |
| Abono Básico | Mensual | Actualización de filtros + soporte WA + monitoreo remoto |
| Abono Completo | Mensual | Todo lo básico + VPN en móviles + reportes + ajustes incluidos |

### Reglas del servicio

- **Las restricciones las define el padre (cliente)**, no Rodrigo. El plan define la base; el padre pide ajustes.
- **Rodrigo no ve ni almacena datos de navegación.** Las credenciales del panel de reportes pertenecen al cliente.
- Al contratar se entrega un documento firmado que lo certifica (Ley 25.326 de Protección de Datos Personales, Argentina).

### Arquitectura técnica (interna — no comunicar al cliente)

- **Router:** NextDNS (recomendado, gestión remota) o Pi-hole en Raspberry Pi (self-hosted)
- **Windows:** script `.bat` que aplica la protección a nivel sistema y bloquea que el usuario la desactive sin contraseña admin
- **Android:** AdGuard o DNS Privado nativo (Android 9+)
- **iOS/iPadOS:** perfil de configuración `.mobileconfig` + Screen Time de Apple

### Qué construir (roadmap de herramientas)

| Componente | Qué es | Estado |
|---|---|---|
| Script Windows `.bat` | Configura protección DNS segura, bloquea desactivación sin admin | 🔲 Pendiente |
| Perfil iOS `.mobileconfig` | El padre lo instala en el iPhone/iPad del hijo desde Safari | 🔲 Pendiente |
| Guía PDF para padres | Qué hacer si algo no funciona, cómo pedir una excepción | 🔲 Pendiente |
| Panel Rodrigo — clientes | Vista de todos los clientes de abono: estado activo/inactivo, última vez con bloqueos | 🔲 Pendiente |
| Página de estado por familia | URL privada por familia: qué se bloqueó esta semana, por categoría | 🔲 Pendiente |

### Privacidad — cómo comunicarlo al cliente

Tres garantías verificables (sin explicar el mecanismo técnico):
1. **Tráfico invisible para terceros** — la navegación no es accesible para nadie fuera del hogar
2. **El panel es tuyo, con tu contraseña** — solo el padre accede; puede cambiar la clave cuando quiera
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
