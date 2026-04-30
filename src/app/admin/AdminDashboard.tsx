"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { RefreshCw, TrendingUp, MousePointerClick, Download, MessageCircle, Percent, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AgenteTab from "./AgenteTab";
import ConsultasTab from "./ConsultasTab";
import RedFamiliarTab from "./RedFamiliarTab";

interface StatsData {
  kpis: {
    visitasHoy: number; visitasUnicasHoy: number;
    visitas7d: number;  visitasUnicas7d: number;
    clicksWAHoy: number; clicksWA7d: number;
    descargasHoy: number; descargas7d: number;
    consultasTotal: number; consultasNuevas: number;
    leadsTotal: number; leads7d: number;
    conversionPct: number;
  };
  visitasPorDia: { fecha: string; visitas: number; unicos: number }[];
  seccionesMasVistas: { seccion: string; visitas: number }[];
  herramientasMasDescargadas: { nombre: string; descargas: number }[];
  consultas: {
    id: string; nombre: string; email: string; telefono?: string;
    servicio?: string; mensaje?: string; estado: string; created_at: string;
  }[];
  leads: {
    id: string; nombre?: string; email: string; herramienta: string; created_at: string;
  }[];
  demo?: boolean;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111113", border: "1px solid #2C2C2E", borderRadius: 4, padding: "8px 12px" }}>
      <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: "2px 0" }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #2C2C2E" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB", letterSpacing: "0.01em" }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function KpiCard({ label, value, sub, color, icon: Icon }: { label: string; value: string | number; sub: string; color: string; icon: LucideIcon }) {
  return (
    <div style={{ background: "#161618", border: "1px solid #2C2C2E", borderRadius: 5, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <Icon size={11} color={color} />
        <p style={{ fontSize: 11, color: "#6B7280", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
      </div>
      <p style={{ fontSize: 22, fontWeight: 700, color, margin: "0 0 3px", letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>{sub}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab]         = useState("panel");
  const [data, setData]       = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/stats");
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <div style={{ minHeight: "100vh", background: "#111113", paddingTop: 64, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 600, color: "#F9FAFB", margin: "0 0 2px" }}>Panel de control</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>Rodo&apos;s 3.0 · datos últimos 30 días</p>
              {data?.demo && (
                <span style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", background: "#F59E0B22", padding: "1px 6px", borderRadius: 3 }}>
                  DEMO
                </span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {lastUpdate && <span style={{ fontSize: 11, color: "#374151" }}>Act. {lastUpdate}</span>}
            <a href="/" target="_blank" rel="noopener noreferrer" style={{ padding: "5px 12px", borderRadius: 4, border: "1px solid #2C2C2E", color: "#6B7280", fontSize: 12, textDecoration: "none" }}>
              Ver sitio ↗
            </a>
            <button
              onClick={fetchData}
              disabled={loading}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: "#9CA3AF", fontSize: 12, cursor: "pointer", opacity: loading ? 0.5 : 1 }}
            >
              <RefreshCw size={11} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #2C2C2E" }}>
          {[
            { key: "panel",     label: "Panel" },
            { key: "consultas", label: `Consultas${data?.kpis.consultasNuevas ? ` (${data.kpis.consultasNuevas})` : ""}` },
            { key: "leads",       label: `Leads${data?.kpis.leads7d ? ` (${data.kpis.leads7d})` : ""}` },
            { key: "red-familiar", label: "🛡 Red Familiar" },
            { key: "agente",      label: "✦ Agente" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer",
              background: "transparent", border: "none",
              borderBottom: tab === t.key ? "2px solid #e8820a" : "2px solid transparent",
              color: tab === t.key ? "#F9FAFB" : "#4B5563",
              marginBottom: -1, transition: "color 0.2s",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "red-familiar" && <RedFamiliarTab />}
        {tab === "agente" && <AgenteTab />}
        {tab === "consultas" && data && <ConsultasTab consultas={data.consultas} />}
        {tab === "leads" && data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title={`Leads capturados — total ${data.kpis.leadsTotal} · últimos 7 días ${data.kpis.leads7d}`}>
              {!data.leads?.length ? (
                <p style={{ fontSize: 12, color: "#374151" }}>Sin leads aún. Cuando alguien descargue una herramienta aparecerá acá.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data.leads.map((l) => (
                    <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 5, background: "#161618", border: "1px solid #2C2C2E" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e8820a22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Mail size={14} color="#e8820a" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, color: "#F9FAFB", fontWeight: 500, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {l.nombre ? `${l.nombre} · ` : ""}<span style={{ color: "#e8820a" }}>{l.email}</span>
                        </p>
                        <p style={{ fontSize: 11, color: "#4B5563", margin: 0 }}>{l.herramienta}</p>
                      </div>
                      <span style={{ fontSize: 11, color: "#374151", flexShrink: 0 }}>
                        {new Date(l.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>
        )}

        {tab === "panel" && loading && !data && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
            <RefreshCw size={20} color="#374151" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        )}

        {tab === "panel" && data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* KPIs */}
            <Panel title="Actividad del sitio — últimos 7 días">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 20 }}>
                <KpiCard label="Visitas hoy"       value={data.kpis.visitasHoy}      sub={`${data.kpis.visitasUnicasHoy} únicos`}    color="#3B82F6" icon={TrendingUp} />
                <KpiCard label="Visitas 7 días"    value={data.kpis.visitas7d}       sub={`${data.kpis.visitasUnicas7d} únicos`}     color="#3B82F6" icon={TrendingUp} />
                <KpiCard label="Clicks WhatsApp"   value={data.kpis.clicksWA7d}      sub={`${data.kpis.clicksWAHoy} hoy`}           color="#22C55E" icon={MousePointerClick} />
                <KpiCard label="Descargas"         value={data.kpis.descargas7d}     sub={`${data.kpis.descargasHoy} hoy`}          color="#8B5CF6" icon={Download} />
                <KpiCard label="Consultas"         value={data.kpis.consultasTotal}  sub={`${data.kpis.consultasNuevas} sin leer`}  color="#F59E0B" icon={MessageCircle} />
                <KpiCard label="Leads 7 días"      value={data.kpis.leads7d}             sub={`${data.kpis.leadsTotal} en total`} color="#e8820a" icon={Mail} />
                <KpiCard label="Conversión WA"     value={`${data.kpis.conversionPct}%`} sub="Visitantes → WhatsApp"              color="#10B981" icon={Percent} />
              </div>

              <p style={{ fontSize: 11, color: "#4B5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Visitas diarias — últimos 14 días
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data.visitasPorDia} margin={{ top: 0, right: 8, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F21" />
                  <XAxis dataKey="fecha" tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="visitas" name="Visitas" fill="#3B82F6" radius={[2,2,0,0]} opacity={0.8} />
                  <Bar dataKey="unicos"  name="Únicos"  fill="#8B5CF6" radius={[2,2,0,0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            {/* Secciones + Herramientas */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Panel title="Secciones más vistas — 7 días">
                {!data.seccionesMasVistas.length
                  ? <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún</p>
                  : data.seccionesMasVistas.map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: "#4B5563", width: 16, textAlign: "right" }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 12, color: "#D1D5DB", fontWeight: 500 }}>{s.seccion}</span>
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{s.visitas}</span>
                          </div>
                          <div style={{ height: 3, background: "#1F1F21", borderRadius: 2 }}>
                            <div style={{ height: "100%", borderRadius: 2, background: "#3B82F6", width: `${Math.round((s.visitas / data.seccionesMasVistas[0].visitas) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    ))
                }
              </Panel>

              <Panel title="Herramientas más descargadas — 7 días">
                {!data.herramientasMasDescargadas.length
                  ? <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún</p>
                  : data.herramientasMasDescargadas.map((h, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: "#4B5563", width: 16, textAlign: "right" }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 12, color: "#D1D5DB", fontWeight: 500 }}>{h.nombre}</span>
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{h.descargas}</span>
                          </div>
                          <div style={{ height: 3, background: "#1F1F21", borderRadius: 2 }}>
                            <div style={{ height: "100%", borderRadius: 2, background: "#8B5CF6", width: `${Math.round((h.descargas / data.herramientasMasDescargadas[0].descargas) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    ))
                }
              </Panel>
            </div>

            {/* Referencia */}
            <Panel title="Referencia de métricas">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  { color: "#22C55E", label: "Conversión WA saludable",   valor: "> 15%",    desc: "Visitantes que hacen click en WhatsApp" },
                  { color: "#F59E0B", label: "Tiempo respuesta consultas", valor: "< 24 hs",  desc: "Para no perder el interés del cliente" },
                  { color: "#3B82F6", label: "Visitas objetivo semanal",   valor: "> 60",     desc: "Con buen SEO local y redes activas" },
                  { color: "#8B5CF6", label: "Descargas por semana",       valor: "> 10",     desc: "Indica que el contenido genera confianza" },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 4, background: "#161618", border: "1px solid #2C2C2E" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 11, color: "#4B5563", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.label}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: "0 0 2px" }}>{m.valor}</p>
                      <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
