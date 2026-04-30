"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldCheck, ShieldOff, RefreshCw, MessageCircle } from "lucide-react";

const WA = "https://wa.me/5492215069677?text=" + encodeURIComponent("Hola Rodrigo, tengo una consulta sobre el sistema de Internet Segura");

interface Categoria {
  nombre: string;
  bloqueados: number;
  porcentaje: number;
  color: string;
}
interface Bloqueo {
  hora: string;
  categoria: string;
  dispositivo: string;
  color: string;
}
interface FamiliaData {
  nombre: string;
  activo: boolean;
  bloqueadosHoy: number;
  bloqueadosSemana: number;
  dispositivosActivos: number;
  ultimaActualizacion: string;
  categorias: Categoria[];
  ultimosBloqueos: Bloqueo[];
  demo: boolean;
}

function KpiBloque({ valor, etiqueta, color }: { valor: number | string; etiqueta: string; color: string }) {
  return (
    <div style={{ background: "#0a1533", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 16px", textAlign: "center", flex: 1 }}>
      <p style={{ fontSize: 32, fontWeight: 700, color, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{valor}</p>
      <p style={{ fontSize: 11, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{etiqueta}</p>
    </div>
  );
}

export default function FamiliaDashboard({ params }: { params: { token: string } }) {
  const [data, setData]       = useState<FamiliaData | null>(null);
  const [estado, setEstado]   = useState<"cargando" | "ok" | "error" | "inactivo">("cargando");
  const [ultimaAct, setUltimaAct] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      const res = await fetch(`/api/familia/${params.token}`, { cache: "no-store" });
      if (res.status === 404) { setEstado("error"); return; }
      if (res.status === 403) { setEstado("inactivo"); return; }
      const json: FamiliaData = await res.json();
      setData(json);
      setEstado("ok");
      setUltimaAct(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setEstado("error");
    }
  }, [params.token]);

  useEffect(() => {
    cargar();
    const id = setInterval(cargar, 60000);
    return () => clearInterval(id);
  }, [cargar]);

  const base: React.CSSProperties = {
    minHeight: "100vh",
    background: "#060d1f",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#F9FAFB",
  };

  if (estado === "cargando") return (
    <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <RefreshCw size={24} color="#4a9eff" style={{ animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (estado === "error") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, textAlign: "center" }}>
      <ShieldOff size={40} color="#374151" />
      <p style={{ fontSize: 16, color: "#9CA3AF" }}>Este enlace no es válido o fue desactivado.</p>
      <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#e8820a", color: "#fff", padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
        <MessageCircle size={16} /> Contactar a Rodrigo
      </a>
    </div>
  );

  if (estado === "inactivo") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, textAlign: "center" }}>
      <ShieldOff size={40} color="#f59e0b" />
      <p style={{ fontSize: 16, color: "#9CA3AF" }}>El servicio está momentáneamente pausado.</p>
      <p style={{ fontSize: 13, color: "#374151" }}>Contactá a Rodrigo para más información.</p>
      <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#e8820a", color: "#fff", padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  );

  if (!data) return null;

  return (
    <div style={base}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Rodo&apos;s 3.0 · Red Familiar Segura</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <ShieldCheck size={22} color="#4a9eff" />
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#F9FAFB", margin: 0 }}>{data.nombre}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 6px #10b981" }} />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 500 }}>Sistema activo</span>
              {data.demo && <span style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", background: "#F59E0B22", padding: "1px 6px", borderRadius: 3, marginLeft: 4 }}>DEMO</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {ultimaAct && <span style={{ fontSize: 11, color: "#374151" }}>Act. {ultimaAct}</span>}
              <button onClick={cargar} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "#374151" }}>
                <RefreshCw size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <KpiBloque valor={data.bloqueadosHoy}       etiqueta="Bloqueados hoy"    color="#e8820a" />
          <KpiBloque valor={data.bloqueadosSemana}    etiqueta="Esta semana"       color="#4a9eff" />
          <KpiBloque valor={data.dispositivosActivos} etiqueta="Dispositivos"      color="#10b981" />
        </div>

        {/* Categorías */}
        <div style={{ background: "#0a1533", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Categorías bloqueadas esta semana</p>
          {data.categorias.length === 0
            ? <p style={{ fontSize: 13, color: "#374151" }}>Sin bloqueos esta semana. Todo en orden.</p>
            : data.categorias.map((cat) => (
              <div key={cat.nombre} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: "#D1D5DB" }}>{cat.nombre}</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{cat.bloqueados}</span>
                </div>
                <div style={{ height: 6, background: "#1a2744", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: cat.color, width: `${cat.porcentaje}%`, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))
          }
        </div>

        {/* Últimos bloqueos */}
        <div style={{ background: "#0a1533", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ fontSize: 11, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Últimos intentos bloqueados</p>
          {data.ultimosBloqueos.length === 0
            ? <p style={{ fontSize: 13, color: "#374151" }}>Sin intentos bloqueados hoy.</p>
            : data.ultimosBloqueos.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < data.ultimosBloqueos.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.categoria}</p>
                  <p style={{ fontSize: 11, color: "#4B5563", margin: 0 }}>{b.dispositivo}</p>
                </div>
                <span style={{ fontSize: 11, color: "#374151", flexShrink: 0 }}>{b.hora}</span>
              </div>
            ))
          }
        </div>

        {/* CTA soporte */}
        <div style={{ background: "rgba(232,130,10,0.08)", border: "1px solid rgba(232,130,10,0.2)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "#F9FAFB", fontWeight: 600, margin: "0 0 2px" }}>¿Algo no funciona?</p>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>Escribile a Rodrigo por WhatsApp.</p>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#e8820a", color: "#fff", padding: "9px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
