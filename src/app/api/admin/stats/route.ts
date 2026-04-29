import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

// Datos demo cuando Supabase no está configurado
function demoData() {
  const hoy = new Date();
  const visitasPorDia = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(hoy);
    d.setDate(d.getDate() - (13 - i));
    return {
      fecha:   d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }),
      visitas: Math.floor(Math.random() * 30 + 5),
      unicos:  Math.floor(Math.random() * 20 + 3),
    };
  });

  return {
    kpis: {
      visitasHoy: 12, visitasUnicasHoy: 8,
      visitas7d: 74, visitasUnicas7d: 51,
      clicksWAHoy: 3, clicksWA7d: 18,
      descargasHoy: 2, descargas7d: 11,
      consultasTotal: 5, consultasNuevas: 2,
      leadsTotal: 8, leads7d: 3,
      conversionPct: 24,
    },
    visitasPorDia,
    seccionesMasVistas: [
      { seccion: "/", visitas: 38 },
      { seccion: "/servicios", visitas: 22 },
      { seccion: "/herramientas", visitas: 15 },
      { seccion: "/red-familiar", visitas: 9 },
      { seccion: "/desarrollo-web", visitas: 7 },
    ],
    herramientasMasDescargadas: [
      { nombre: "Generador de Contraseñas", descargas: 5 },
      { nombre: "Verificador de Disco", descargas: 4 },
      { nombre: "Guía de Seguridad Digital", descargas: 2 },
    ],
    consultas: [],
    leads: [],
    demo: true,
  };
}

export async function GET() {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json(demoData());

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const now      = new Date();
  const hace30d  = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const hace7d   = new Date(now.getTime() -  7 * 24 * 60 * 60 * 1000).toISOString();
  const hoy      = new Date(now.setHours(0, 0, 0, 0)).toISOString();

  const [{ data: actividad }, { data: consultas }, { data: leads }] = await Promise.all([
    supabase.from("actividad").select("*").gte("created_at", hace30d).order("created_at", { ascending: false }),
    supabase.from("consultas").select("id,nombre,email,telefono,servicio,mensaje,estado,created_at").order("created_at", { ascending: false }).limit(20),
    supabase.from("leads").select("id,nombre,email,herramienta,created_at").order("created_at", { ascending: false }).limit(50),
  ]);

  const act    = actividad ?? [];
  const act7d  = act.filter((a) => a.created_at >= hace7d);
  const actHoy = act.filter((a) => a.created_at >= hoy);

  const pageviews     = act.filter((a) => a.tipo === "pageview");
  const pageviews7d   = act7d.filter((a) => a.tipo === "pageview");
  const pageviewsHoy  = actHoy.filter((a) => a.tipo === "pageview");

  function uniqueSessions(list: { session_id?: string }[]) {
    return new Set(list.map((a) => a.session_id).filter(Boolean)).size;
  }

  // Visitas por día — últimos 14 días
  const visitasPorDia = Array.from({ length: 14 }, (_, i) => {
    const fecha = new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000);
    const label = fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
    const delDia = pageviews.filter(
      (a) => new Date(a.created_at).toDateString() === fecha.toDateString()
    );
    return { fecha: label, visitas: delDia.length, unicos: uniqueSessions(delDia) };
  });

  // Secciones más vistas
  const secMap: Record<string, number> = {};
  pageviews7d.forEach((a) => {
    const p = a.page ?? "/";
    secMap[p] = (secMap[p] ?? 0) + 1;
  });
  const seccionesMasVistas = Object.entries(secMap)
    .map(([seccion, visitas]) => ({ seccion, visitas }))
    .sort((a, b) => b.visitas - a.visitas)
    .slice(0, 6);

  // Herramientas descargadas
  const descMap: Record<string, number> = {};
  act7d.filter((a) => a.tipo === "descarga_herramienta").forEach((a) => {
    const n = a.payload?.nombre ?? "Desconocida";
    descMap[n] = (descMap[n] ?? 0) + 1;
  });
  const herramientasMasDescargadas = Object.entries(descMap)
    .map(([nombre, descargas]) => ({ nombre, descargas }))
    .sort((a, b) => b.descargas - a.descargas);

  const clicksWA7d   = act7d.filter((a) => a.tipo === "click_whatsapp").length;
  const clicksWAHoy  = actHoy.filter((a) => a.tipo === "click_whatsapp").length;
  const descargas7d  = act7d.filter((a) => a.tipo === "descarga_herramienta").length;
  const descargasHoy = actHoy.filter((a) => a.tipo === "descarga_herramienta").length;

  const visitantesUnicos7d = uniqueSessions(pageviews7d);
  const conversionPct = visitantesUnicos7d > 0
    ? Math.round((clicksWA7d / visitantesUnicos7d) * 100)
    : 0;

  const consultasTotal  = (consultas ?? []).length;
  const consultasNuevas = (consultas ?? []).filter((c) => c.estado === "nuevo").length;

  const leadsAll  = leads ?? [];
  const leadsTotal = leadsAll.length;
  const leads7d    = leadsAll.filter((l) => l.created_at >= hace7d).length;

  return NextResponse.json({
    kpis: {
      visitasHoy: pageviewsHoy.length,
      visitasUnicasHoy: uniqueSessions(pageviewsHoy),
      visitas7d: pageviews7d.length,
      visitasUnicas7d: visitantesUnicos7d,
      clicksWAHoy, clicksWA7d,
      descargasHoy, descargas7d,
      consultasTotal, consultasNuevas,
      leadsTotal, leads7d,
      conversionPct,
    },
    visitasPorDia,
    seccionesMasVistas,
    herramientasMasDescargadas,
    consultas: (consultas ?? []).slice(0, 10),
    leads: leadsAll.slice(0, 20),
    demo: false,
  });
}
