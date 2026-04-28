import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(req: Request) {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true });

  const { id, estado } = await req.json();
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await supabase.from("consultas").update({ estado }).eq("id", id);
  return NextResponse.json({ ok: true });
}
