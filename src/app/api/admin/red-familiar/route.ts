import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64url");
}

export async function GET() {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({
      clientes: [
        { id: "demo-1", nombre_familia: "Familia García", activo: true, token: "demo-token-1", nextdns_profile_id: "", email: "garcia@email.com", telefono: "221-555-0001", notas: "3 hijos", created_at: new Date().toISOString() },
        { id: "demo-2", nombre_familia: "Familia López",  activo: true, token: "demo-token-2", nextdns_profile_id: "", email: "lopez@email.com",  telefono: "221-555-0002", notas: "1 hijo, tablet incluida", created_at: new Date().toISOString() },
      ],
      demo: true,
    });
  }

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await supabase
    .from("clientes_red_familiar")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ clientes: data ?? [], demo: false });
}

export async function POST(req: Request) {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { nombre_familia, nextdns_profile_id, email, telefono, notas } = await req.json();
  if (!nombre_familia) return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });

  const token = generateToken();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ token, demo: true });

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await supabase
    .from("clientes_red_familiar")
    .insert({ nombre_familia, token, nextdns_profile_id, email, telefono, notas })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cliente: data });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id, activo } = await req.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true, demo: true });

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await supabase.from("clientes_red_familiar").update({ activo }).eq("id", id);
  return NextResponse.json({ ok: true });
}
