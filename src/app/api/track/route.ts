import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const TrackSchema = z.object({
  tipo:       z.enum(["pageview", "click_whatsapp", "descarga_herramienta"]),
  page:       z.string().max(200).optional(),
  session_id: z.string().max(100).optional(),
  payload:    z.record(z.string().max(100), z.unknown()).optional(),
});

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true });

  try {
    const body = await req.json();
    const parsed = TrackSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: true }); // silencioso al cliente

    const { tipo, page, payload, session_id } = parsed.data;

    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("actividad").insert({
      tipo,
      page:       page ?? null,
      payload:    payload ?? null,
      session_id: session_id ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
