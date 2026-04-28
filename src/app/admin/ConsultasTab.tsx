"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

const ESTADO_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  nuevo:      { label: "Nuevo",      color: "#3B82F6", bg: "#3B82F622" },
  respondido: { label: "Respondido", color: "#22C55E", bg: "#22C55E22" },
  cerrado:    { label: "Cerrado",    color: "#6B7280", bg: "#6B728022" },
};

interface Consulta {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  servicio?: string;
  mensaje?: string;
  estado: string;
  created_at: string;
}

export default function ConsultasTab({ consultas: initial }: { consultas: Consulta[] }) {
  const [consultas, setConsultas] = useState<Consulta[]>(initial);
  const [expandido, setExpandido] = useState<string | null>(null);

  async function cambiarEstado(id: string, estado: string) {
    await fetch("/api/admin/consultas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado }),
    });
    setConsultas((prev) => prev.map((c) => c.id === id ? { ...c, estado } : c));
  }

  if (!consultas.length) {
    return (
      <div style={{ background: "#161618", border: "1px dashed #2C2C2E", borderRadius: 6, padding: "48px 24px", textAlign: "center" }}>
        <MessageCircle size={24} color="#2C2C2E" style={{ marginBottom: 12 }} />
        <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>No hay consultas aún — aparecerán cuando alguien complete el formulario de contacto</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {consultas.map((c) => {
        const est = ESTADO_LABELS[c.estado] ?? { label: c.estado, color: "#9CA3AF", bg: "#9CA3AF22" };
        const isOpen = expandido === c.id;
        return (
          <div key={c.id} style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, overflow: "hidden" }}>
            <div
              onClick={() => setExpandido(isOpen ? null : c.id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", cursor: "pointer", gap: 12 }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#F9FAFB" }}>{c.nombre}</span>
                  {c.servicio && (
                    <span style={{ fontSize: 11, color: "#e8820a", background: "#e8820a22", padding: "1px 7px", borderRadius: 3, fontWeight: 600 }}>
                      {c.servicio}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>
                  {c.email} {c.telefono ? `· ${c.telefono}` : ""}
                  {" · "}
                  {new Date(c.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                </p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: est.color, background: est.bg, padding: "2px 8px", borderRadius: 3, whiteSpace: "nowrap" }}>
                {est.label}
              </span>
            </div>

            {isOpen && (
              <div style={{ borderTop: "1px solid #2C2C2E", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {c.mensaje && (
                  <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, lineHeight: 1.6, background: "#161618", padding: "10px 12px", borderRadius: 4 }}>
                    {c.mensaje}
                  </p>
                )}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {c.telefono && (
                    <a
                      href={`https://wa.me/${c.telefono.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 4, background: "#22C55E22", color: "#22C55E", fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid #22C55E44" }}
                    >
                      <MessageCircle size={13} /> Responder por WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${c.email}`}
                    style={{ padding: "6px 12px", borderRadius: 4, background: "#3B82F622", color: "#3B82F6", fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid #3B82F644" }}
                  >
                    Responder por email
                  </a>
                  {["nuevo", "respondido", "cerrado"].filter((e) => e !== c.estado).map((e) => (
                    <button
                      key={e}
                      onClick={() => cambiarEstado(c.id, e)}
                      style={{ padding: "6px 12px", borderRadius: 4, background: "transparent", color: "#6B7280", fontSize: 12, cursor: "pointer", border: "1px solid #2C2C2E" }}
                    >
                      Marcar como {ESTADO_LABELS[e]?.label ?? e}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
