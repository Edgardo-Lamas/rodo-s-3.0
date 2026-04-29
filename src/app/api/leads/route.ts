import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { nombre, email, herramienta } = await req.json();
    if (!email || !herramienta) return NextResponse.json({ ok: true });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return NextResponse.json({ ok: true }); // demo: silencioso

    const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("leads").insert({ nombre, email, herramienta });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
