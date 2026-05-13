import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

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

═══════════════════════════════════════
CONVERSIÓN Y WHATSAPP
═══════════════════════════════════════

PORCENTAJES DE REFERENCIA (técnico independiente con presencia web):
- Visita → click WhatsApp: 15-30% es bueno. Menos de 10% indica problema de confianza o CTA débil.
- Mejor horario de contacto: martes a jueves, 9-11h y 15-17h.

═══════════════════════════════════════
INSTRUCCIONES DE COMPORTAMIENTO
═══════════════════════════════════════

Cuando recibas el mensaje especial de análisis de negocio, respondé SIEMPRE con exactamente estos 4 bloques en formato markdown:

## 📊 Resumen del período
## 🔧 Servicio a destacar esta semana
## 📞 Acciones inmediatas
## 📣 Campaña sugerida

Para cualquier otra pregunta, respondé de forma directa y conversacional. Podés usar markdown cuando ayude a la claridad (listas, negritas). Sé concreto y accionable. Respondé en español rioplatense. Sin introducciones largas.`;

const MessageSchema = z.object({
  mensaje:  z.string().min(1).max(2000),
  historial: z.array(z.object({
    role:    z.enum(["user", "assistant"]),
    content: z.string().max(10000),
  })).max(20).optional(),
});

async function buildBusinessContext(supabaseUrl: string | undefined): Promise<string> {
  const fecha = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });

  if (!supabaseUrl) {
    return `ANÁLISIS DEL NEGOCIO — últimos 30 días (MODO DEMO)
Fecha: ${fecha}

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

CONSULTAS RECIBIDAS: 5 totales, 2 sin responder`;
  }

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const desde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const hace7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: actividad }, { data: consultas }] = await Promise.all([
    supabase.from("actividad").select("tipo, payload, page, session_id, created_at").gte("created_at", desde),
    supabase.from("consultas").select("servicio, estado, created_at").gte("created_at", desde),
  ]);

  const act = actividad ?? [];
  const pageviews = act.filter((a) => a.tipo === "pageview");
  const clicksWA  = act.filter((a) => a.tipo === "click_whatsapp").length;
  const descargas = act.filter((a) => a.tipo === "descarga_herramienta").length;
  const uniqueSessions = new Set(pageviews.map((a) => a.session_id).filter(Boolean)).size;
  const convPct = uniqueSessions > 0 ? Math.round((clicksWA / uniqueSessions) * 100) : 0;

  const secMap: Record<string, number> = {};
  pageviews.forEach((a) => { const p = a.page ?? "/"; secMap[p] = (secMap[p] ?? 0) + 1; });
  const topSecciones = Object.entries(secMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const cons = consultas ?? [];
  const sinResponder = cons.filter((c) => c.estado === "nuevo").length;

  const act7d = act.filter((a) => a.created_at >= hace7d);
  const clicksWA7d = act7d.filter((a) => a.tipo === "click_whatsapp").length;

  return `ANÁLISIS DEL NEGOCIO — últimos 30 días
Fecha: ${fecha}

TRÁFICO WEB:
- Visitas totales: ${pageviews.length}
- Visitantes únicos: ${uniqueSessions}
- Clicks a WhatsApp: ${clicksWA} (${convPct}% conversión)
- Clicks WhatsApp últimos 7 días: ${clicksWA7d}
- Descargas de herramientas: ${descargas}

SECCIONES MÁS VISTAS:
${topSecciones.map(([s, v]) => `- ${s}: ${v} visitas`).join("\n") || "Sin datos"}

CONSULTAS: ${cons.length} totales, ${sinResponder} sin responder`;
}

export async function POST(req: Request) {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response("ANTHROPIC_API_KEY no configurada.", { status: 503 });

  const body = await req.json();
  const parsed = MessageSchema.safeParse(body);
  if (!parsed.success) return new Response("Mensaje inválido.", { status: 400 });

  const { mensaje, historial = [] } = parsed.data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const userContent = mensaje === "__analisis__"
    ? await buildBusinessContext(supabaseUrl)
    : mensaje;

  const messages: Anthropic.MessageParam[] = [
    ...historial.map((m) => ({ role: m.role, content: m.content } as Anthropic.MessageParam)),
    { role: "user", content: userContent },
  ];

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = client.messages.stream({
        model:      "claude-opus-4-7",
        max_tokens: 2048,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages,
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
