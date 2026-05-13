import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const PatchSchema = z.object({
  id:     z.uuid(),
  estado: z.enum(["nuevo", "respondido", "cerrado"]),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true });

  const { id, estado } = parsed.data;
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await supabase.from("consultas").update({ estado }).eq("id", id);
  return NextResponse.json({ ok: true });
}
