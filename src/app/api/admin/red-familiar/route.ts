import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Session } from "next-auth";

function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64url");
}

function isAdmin(session: Session | null) {
  return (session?.user as { rol?: string })?.rol === "admin";
}

const PostSchema = z.object({
  nombre_familia:      z.string().min(1).max(100),
  nextdns_profile_id:  z.string().max(50).optional(),
  email:               z.email().max(254).optional(),
  telefono:            z.string().max(30).optional(),
  notas:               z.string().max(500).optional(),
});

const PatchSchema = z.object({
  id:     z.uuid(),
  activo: z.boolean(),
});

export async function GET() {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

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
  if (!isAdmin(session)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { nombre_familia, nextdns_profile_id, email, telefono, notas } = parsed.data;
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
  if (!isAdmin(session)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ ok: true, demo: true });

  const { id, activo } = parsed.data;
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await supabase.from("clientes_red_familiar").update({ activo }).eq("id", id);
  return NextResponse.json({ ok: true });
}
