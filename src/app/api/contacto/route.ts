import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

const ContactoSchema = z.object({
  nombre:   z.string().min(1).max(100),
  email:    z.email().max(254),
  telefono: z.string().max(30).optional(),
  servicio: z.enum(["mantenimiento", "antivirus", "backup", "desarrollo-web", "red-familiar", "otro"]),
  mensaje:  z.string().min(1).max(2000),
});

const SERVICIOS: Record<string, string> = {
  "mantenimiento":  "Mantenimiento y reparación de PC",
  "antivirus":      "Antivirus y eliminación de malware",
  "backup":         "Backup y recuperación de datos",
  "desarrollo-web": "Desarrollo web",
  "red-familiar":   "Red Familiar Segura",
  "otro":           "Otro / Consulta general",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { nombre, email, telefono, servicio, mensaje } = parsed.data;
    const servicioLabel = SERVICIOS[servicio] ?? servicio;

    // Guardar en Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      await supabase.from("consultas").insert({
        nombre, email, telefono, servicio: servicioLabel, mensaje, estado: "nuevo",
      });
    }

    // Enviar email a Rodrigo
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const { data: emailData, error: emailError } = await resend.emails.send({
        from:    "Rodo's 3.0 <onboarding@resend.dev>",
        to:      "rodrigo.laporta.spb@gmail.com",
        replyTo: email,
        subject: `Nueva consulta de ${nombre} — ${servicioLabel}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1f2937">
            <div style="background:#0a1533;padding:24px 28px;border-radius:8px 8px 0 0">
              <p style="color:#e8820a;font-weight:700;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 6px">Nueva consulta</p>
              <p style="color:#fff;font-size:22px;font-weight:700;margin:0">Rodo's 3.0</p>
            </div>
            <div style="background:#f9fafb;padding:28px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:110px">Nombre</td><td style="padding:8px 0;font-size:14px;font-weight:600">${nombre}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#e8820a">${email}</a></td></tr>
                ${telefono ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Teléfono</td><td style="padding:8px 0;font-size:14px">${telefono}</td></tr>` : ""}
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Servicio</td><td style="padding:8px 0;font-size:14px">${servicioLabel}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
              <p style="color:#6b7280;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em">Mensaje</p>
              <p style="font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${mensaje}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0 16px">
              <a href="mailto:${email}?subject=Re: Tu consulta a Rodo's 3.0" style="display:inline-block;background:#e8820a;color:#fff;font-size:13px;font-weight:600;padding:10px 20px;border-radius:6px;text-decoration:none">Responder a ${nombre}</a>
            </div>
          </div>
        `,
      });
      if (emailError) {
        console.error("[Resend] error:", JSON.stringify(emailError));
      } else {
        console.log("[Resend] enviado OK, id:", emailData?.id);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
