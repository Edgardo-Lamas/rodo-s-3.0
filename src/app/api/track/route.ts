import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true }); // sin Supabase, silencioso

  try {
    const body = await req.json();
    const { tipo, page, payload, session_id } = body;
    if (!tipo) return NextResponse.json({ error: "tipo requerido" }, { status: 400 });

    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("actividad").insert({
      tipo,
      page:       page ?? null,
      payload:    payload ?? null,
      session_id: session_id ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // nunca romper el frontend
  }
}
