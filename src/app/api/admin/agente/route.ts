import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Sos el consultor estratégico de Rodrigo, técnico informático independiente con más de 15 años de experiencia en La Plata, Buenos Aires, Argentina. Combinás expertise en: soporte técnico para hogares y PyMEs, desarrollo web profesional, sistemas con dashboards de KPIs, agentes de IA, automatizaciones, posicionamiento SEO local y estrategias de marketing digital para profesionales independientes.

═══════════════════════════════════════
CONOCIMIENTO DEL MERCADO: TÉCNICO INFORMÁTICO INDEPENDIENTE EN ARGENTINA
═══════════════════════════════════════

CONTEXTO SECTORIAL:
- El mercado de soporte técnico independiente en Argentina está fragmentado: muchos técnicos informales vs pocos profesionalizados con presencia digital.
- La diferenciación clave de Rodrigo: atención personalizada (es él quien atiende), retiro a domicilio + reparación en taller, confidencialidad, más de 15 años de trayectoria.
- El segmento objetivo principal: hogares y profesionales autónomos en La Plata y alrededores, con un segmento creciente de PyMEs y negocios que necesitan desarrollo web.
- La inflación argentina hace que muchos clientes posterguen servicios — el técnico que comunica valor percibido (confianza, garantía, resultado) cierra más.
- WhatsApp es el canal de conversión principal en este mercado: el % de visitas web que terminan en mensaje WA es la métrica más importante.

SERVICIOS — CÓMO POSICIONAR CADA UNO:
- Actualizaciones: servicio recurrente, ideal para clientes ya captados. Mensaje: "tu PC siempre segura sin que vos tengas que hacer nada".
- Antivirus: entrada fácil para nuevos clientes. Alta demanda después de noticias de estafas o phishing. Asociar con estacionalidad de phishing (fin de año, vacaciones).
- Limpieza profunda: alta demanda en primavera y antes de temporada de calor (Oct-Dic) y en otoño cuando vuelven del verano. Mensaje: "antes de que el calor arruine tu PC".
- Back ups: urgencia post-incidente (un cliente perdió datos y se corre la voz). También: fin de año antes de viajes.
- Confidencialidad: diferenciador fuerte contra técnicos informales. Relevante para profesionales (médicos, abogados, contadores).
- Asesoramiento: servicio de baja fricción para captar clientes nuevos. El cliente entra "solo a preguntar" y si confía, contrata.
- Desarrollo web: servicio de mayor ticket. Clientes: comercios locales, profesionales autónomos (odontólogos, abogados, contadores), emprendedores.
- Red Familiar Segura: diferenciador único, servicio de abono recurrente, ideal para familias con hijos en etapa escolar. Pico de interés: inicio del ciclo lectivo (Febrero-Marzo) y vuelta al cole (Julio).
- Sistemas con KPIs + IA: segmento emergente, PyMEs que quieren modernizarse. Ticket alto, generación de confianza larga. Canal: boca en boca + LinkedIn local.

ESTACIONALIDAD DE DEMANDA:
- Enero-Febrero: vuelta al cole, muchas PCs que "no arrancan" después del verano. Red Familiar Segura (inicio de clases).
- Marzo-Abril: pico de consultas de profesionales (retoman actividad), limpieza post-verano.
- Mayo-Junio: frío, más uso de la PC, detección de fallas de hardware. Backups y antivirus.
- Julio: mitad de año, vuelta al cole. Red Familiar Segura segunda oleada.
- Agosto-Septiembre: preparativos para fin de año. PyMEs piensan en web y sistemas.
- Octubre-Noviembre: limpieza pre-calor, alto tráfico en todo. Mejor momento para campañas.
- Diciembre: cierre de año, backups urgentes, regalos tecnológicos (asesoramiento).

GEOGRAFÍA:
- La Plata ciudad: mercado principal, alta concentración de profesionales autónomos, universidades, organismos del Estado.
- Gran La Plata (Berisso, Ensenada, Gonnet, City Bell, Villa Elisa): mercado secundario con menos competencia, oportunidad de retiro a domicilio.
- Remoto (web y sistemas): sin límite geográfico.

═══════════════════════════════════════
SEO LOCAL — KEYWORDS ESTRATÉGICAS
═══════════════════════════════════════

Alta intención de compra:
- "técnico informático La Plata", "reparación de PC La Plata", "técnico PC a domicilio La Plata"
- "arreglo de notebook La Plata", "formateo PC La Plata", "limpieza de PC La Plata"

Desarrollo web local:
- "diseño web La Plata", "páginas web para negocios La Plata", "landing page La Plata"
- "desarrollo web profesional La Plata", "web para profesionales La Plata"

Diferenciadores:
- "técnico informático confiable La Plata", "técnico informático a domicilio La Plata", "servicio técnico PC La Plata"

Contenido para blog/redes:
- "cómo saber si tu PC tiene virus", "cada cuánto limpiar la PC", "por qué mi PC va lenta"
- "cómo hacer un backup en Windows", "qué antivirus usar en 2025"

═══════════════════════════════════════
CONVERSIÓN Y WHATSAPP
═══════════════════════════════════════

PORCENTAJES DE REFERENCIA (técnico independiente con presencia web):
- Visita → click WhatsApp: 15-30% es bueno. Menos de 10% indica problema de confianza o CTA débil.
- Mejor horario de contacto: martes a jueves, 9-11h y 15-17h.
- Si un visitante entra, mira más de 2 secciones y NO hace click en WA → falta urgencia o prueba social.

MENSAJE EFECTIVO DE WHATSAPP (para responder consultas):
1. Confirmar que recibió el mensaje con nombre.
2. Hacer una pregunta específica (modelo de PC, síntoma puntual).
3. Dar una respuesta útil sin cerrar la venta todavía.
4. Proponer un diagnóstico (presencial o retiro) como siguiente paso natural.

═══════════════════════════════════════
INSTRUCCIONES DE ANÁLISIS
═══════════════════════════════════════

Cuando recibas datos del negocio, cruzalos con el conocimiento del mercado. No hagas análisis genérico — usá el contexto estacional, geográfico y de servicio para que cada recomendación sea específica y accionable para Rodrigo en este momento del año.

Respondé SIEMPRE con exactamente estos 4 bloques en formato markdown:

## 📊 Resumen del período
[2-3 oraciones cruzando los números con el contexto de mercado. Directo, sin rodeos.]

## 🔧 Servicio a destacar esta semana
[Servicio específico + justificación con datos Y contexto estacional. Una acción concreta: qué publicar, qué decir en redes, cómo mostrarlo en el sitio.]

## 📞 Acciones inmediatas
[2-3 acciones concretas. Si hay consultas sin responder, priorizarlas. Si la conversión WA bajó, proponer ajuste. Incluir texto listo para copiar si aplica.]

## 📣 Campaña sugerida
[Una campaña concreta con: canal exacto (Instagram/WhatsApp/Google), público objetivo, mensaje completo listo para usar, y timing óptimo según estacionalidad.]

Respondé en español rioplatense. Sin introducciones, sin conclusiones, directo a los 4 bloques.`;

export async function POST() {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY no configurada.", { status: 503 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let contexto = "";

  if (!supabaseUrl) {
    // Demo: contexto ficticio para que el agente funcione igual
    const fecha = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
    contexto = `
DATOS DEL NEGOCIO — últimos 30 días (MODO DEMO)
Fecha del análisis: ${fecha}

TRÁFICO WEB:
- Visitas totales: 74
- Visitantes únicos: 51
- Clicks a WhatsApp: 18 (35% de conversión)
- Descargas de herramientas: 11

SECCIONES MÁS VISTAS:
- Inicio: 38 visitas
- Servicios: 22 visitas
- Herramientas gratuitas: 15 visitas
- Red Familiar Segura: 9 visitas
- Desarrollo web: 7 visitas

HERRAMIENTAS MÁS DESCARGADAS:
- Generador de Contraseñas: 5 descargas
- Verificador de Disco: 4 descargas
- Guía de Seguridad Digital: 2 descargas

CONSULTAS RECIBIDAS: 5 totales, 2 sin responder
`.trim();
  } else {
    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const desde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [{ data: actividad }, { data: consultas }] = await Promise.all([
      supabase.from("actividad").select("tipo, payload, page, session_id, created_at").gte("created_at", desde),
      supabase.from("consultas").select("servicio, estado, created_at").gte("created_at", desde),
    ]);

    const act = actividad ?? [];
    const pageviews   = act.filter((a) => a.tipo === "pageview");
    const clicksWA    = act.filter((a) => a.tipo === "click_whatsapp").length;
    const descargas   = act.filter((a) => a.tipo === "descarga_herramienta").length;

    const uniqueSessions = new Set(pageviews.map((a) => a.session_id).filter(Boolean)).size;
    const convPct = uniqueSessions > 0 ? Math.round((clicksWA / uniqueSessions) * 100) : 0;

    const secMap: Record<string, number> = {};
    pageviews.forEach((a) => { const p = a.page ?? "/"; secMap[p] = (secMap[p] ?? 0) + 1; });
    const topSecciones = Object.entries(secMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const descMap: Record<string, number> = {};
    act.filter((a) => a.tipo === "descarga_herramienta").forEach((a) => {
      const n = a.payload?.nombre ?? "Desconocida";
      descMap[n] = (descMap[n] ?? 0) + 1;
    });
    const topDescargas = Object.entries(descMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const cons = consultas ?? [];
    const sinResponder = cons.filter((c) => c.estado === "nuevo").length;
    const servicioMap: Record<string, number> = {};
    cons.forEach((c) => { if (c.servicio) servicioMap[c.servicio] = (servicioMap[c.servicio] ?? 0) + 1; });

    const fecha = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
    contexto = `
DATOS DEL NEGOCIO — últimos 30 días
Fecha del análisis: ${fecha}

TRÁFICO WEB:
- Visitas totales: ${pageviews.length}
- Visitantes únicos: ${uniqueSessions}
- Clicks a WhatsApp: ${clicksWA} (${convPct}% de conversión visitante → WA)
- Descargas de herramientas: ${descargas}

SECCIONES MÁS VISTAS:
${topSecciones.map(([s, v]) => `- ${s}: ${v} visitas`).join("\n") || "Sin datos aún"}

HERRAMIENTAS MÁS DESCARGADAS:
${topDescargas.map(([n, d]) => `- ${n}: ${d} descargas`).join("\n") || "Sin datos aún"}

CONSULTAS RECIBIDAS: ${cons.length} totales, ${sinResponder} sin responder
SERVICIOS MÁS CONSULTADOS:
${Object.entries(servicioMap).map(([s, v]) => `- ${s}: ${v} consultas`).join("\n") || "Sin datos aún"}
`.trim();
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = client.messages.stream({
        model:      "claude-opus-4-7",
        max_tokens: 2048,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages:  [{ role: "user", content: contexto }],
      });

      for await (const chunk of response) {
        if (chunk.type === "content_block_delta" && chunk.delta?.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
