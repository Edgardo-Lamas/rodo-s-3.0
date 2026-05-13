import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const HERRAMIENTAS_VALIDAS = [
  "Generador de Contraseñas Seguras",
  "Verificador de Disco (CrystalDiskInfo)",
  "Limpiador de Archivos Basura (BleachBit)",
  "Escáner de Malware (Malwarebytes)",
  "Gestor de Contraseñas (Bitwarden)",
  "Guía de Seguridad Digital",
  "Internet Segura — Windows",
  "Internet Segura — iPhone y iPad",
];

const LeadSchema = z.object({
  nombre:      z.string().max(100).optional(),
  email:       z.email().max(254),
  herramienta: z.string().max(120).refine((v) => HERRAMIENTAS_VALIDAS.includes(v), {
    message: "Herramienta no válida",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: true }); // silencioso al cliente

    const { nombre, email, herramienta } = parsed.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return NextResponse.json({ ok: true });

    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("leads").insert({ nombre, email, herramienta });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
