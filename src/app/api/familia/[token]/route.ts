import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CATEGORIA_COLORES: Record<string, string> = {
  "Contenido adulto":    "#ef4444",
  "Malware / Phishing":  "#f59e0b",
  "Apuestas online":     "#8b5cf6",
  "Redes sociales":      "#3b82f6",
  "Juegos online":       "#10b981",
  "Violencia":           "#f97316",
  "Otro":                "#6b7280",
};

function demoData(nombre: string) {
  const categorias = [
    { nombre: "Contenido adulto",   bloqueados: 483, porcentaje: 57 },
    { nombre: "Malware / Phishing", bloqueados: 201, porcentaje: 24 },
    { nombre: "Apuestas online",    bloqueados:  98, porcentaje: 12 },
    { nombre: "Redes sociales",     bloqueados:  61, porcentaje:  7 },
  ].map((c) => ({ ...c, color: CATEGORIA_COLORES[c.nombre] ?? "#6b7280" }));

  const ultimosBloqueos = [
    { hora: "14:32", categoria: "Contenido adulto",   dispositivo: "Teléfono de Lucía" },
    { hora: "14:18", categoria: "Malware / Phishing", dispositivo: "Notebook familiar" },
    { hora: "13:55", categoria: "Apuestas online",    dispositivo: "Tablet" },
    { hora: "13:21", categoria: "Contenido adulto",   dispositivo: "Teléfono de Lucía" },
    { hora: "12:44", categoria: "Malware / Phishing", dispositivo: "PC del estudio" },
    { hora: "11:30", categoria: "Redes sociales",     dispositivo: "Tablet" },
  ].map((b) => ({ ...b, color: CATEGORIA_COLORES[b.categoria] ?? "#6b7280" }));

  return {
    nombre,
    activo: true,
    bloqueadosHoy: 127,
    bloqueadosSemana: 843,
    dispositivosActivos: 4,
    ultimaActualizacion: new Date().toISOString(),
    categorias,
    ultimosBloqueos,
    demo: true,
  };
}

async function fetchNextDNS(profileId: string, apiKey: string) {
  const headers = { "X-Api-Key": apiKey, "Content-Type": "application/json" };
  const desde7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const desde1d = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [resWeek, resToday] = await Promise.all([
    fetch(`https://api.nextdns.io/profiles/${profileId}/analytics/queries?from=${desde7d}&status=blocked`, { headers }),
    fetch(`https://api.nextdns.io/profiles/${profileId}/analytics/queries?from=${desde1d}&status=blocked`, { headers }),
  ]);

  const [week, today] = await Promise.all([resWeek.json(), resToday.json()]);
  return { week, today };
}

export async function GET(_req: Request, { params }: { params: { token: string } }) {
  const { token } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json(demoData("Mi Familia"));

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: familia } = await supabase
    .from("clientes_red_familiar")
    .select("*")
    .eq("token", token)
    .single();

  if (!familia) return NextResponse.json({ error: "no_encontrado" }, { status: 404 });
  if (!familia.activo) return NextResponse.json({ error: "inactivo" }, { status: 403 });

  const nextdnsKey = process.env.NEXTDNS_API_KEY;
  if (!nextdnsKey || !familia.nextdns_profile_id) {
    return NextResponse.json(demoData(familia.nombre_familia));
  }

  try {
    const { week, today } = await fetchNextDNS(familia.nextdns_profile_id, nextdnsKey);

    const categorias = (week.data?.categories ?? [])
      .map((c: { name: string; queries: number }) => ({
        nombre: c.name,
        bloqueados: c.queries,
        porcentaje: Math.round((c.queries / (week.data?.total ?? 1)) * 100),
        color: CATEGORIA_COLORES[c.name] ?? "#6b7280",
      }))
      .slice(0, 5);

    const ultimosBloqueos = (today.data?.queries ?? [])
      .slice(0, 8)
      .map((q: { timestamp: string; reason: string; device: { name: string } }) => ({
        hora: new Date(q.timestamp).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        categoria: q.reason ?? "Otro",
        dispositivo: q.device?.name ?? "Dispositivo",
        color: CATEGORIA_COLORES[q.reason] ?? "#6b7280",
      }));

    return NextResponse.json({
      nombre: familia.nombre_familia,
      activo: true,
      bloqueadosHoy: today.data?.total ?? 0,
      bloqueadosSemana: week.data?.total ?? 0,
      dispositivosActivos: week.data?.devices ?? 0,
      ultimaActualizacion: new Date().toISOString(),
      categorias,
      ultimosBloqueos,
      demo: false,
    });
  } catch {
    return NextResponse.json(demoData(familia.nombre_familia));
  }
}
