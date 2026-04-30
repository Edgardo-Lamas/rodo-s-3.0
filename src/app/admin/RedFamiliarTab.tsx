"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Plus, ToggleLeft, ToggleRight, RefreshCw, ExternalLink } from "lucide-react";

interface Cliente {
  id: string;
  nombre_familia: string;
  token: string;
  nextdns_profile_id?: string;
  email?: string;
  telefono?: string;
  notas?: string;
  activo: boolean;
  created_at: string;
}

function ClienteCard({ cliente, baseUrl, onToggle }: {
  cliente: Cliente;
  baseUrl: string;
  onToggle: (id: string, activo: boolean) => void;
}) {
  const [copiado, setCopiado] = useState(false);
  const url = `${baseUrl}/familia/${cliente.token}`;

  function copiar() {
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div style={{ background: "#161618", border: "1px solid #2C2C2E", borderRadius: 6, padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#F9FAFB" }}>{cliente.nombre_familia}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3,
              background: cliente.activo ? "#10b98122" : "#6b728022",
              color: cliente.activo ? "#10b981" : "#6b7280",
            }}>
              {cliente.activo ? "ACTIVO" : "INACTIVO"}
            </span>
          </div>
          {(cliente.email || cliente.telefono) && (
            <p style={{ fontSize: 11, color: "#4B5563", marginBottom: 4 }}>
              {[cliente.email, cliente.telefono].filter(Boolean).join(" · ")}
            </p>
          )}
          {cliente.notas && (
            <p style={{ fontSize: 11, color: "#374151", marginBottom: 6, fontStyle: "italic" }}>{cliente.notas}</p>
          )}
          {cliente.nextdns_profile_id && (
            <p style={{ fontSize: 10, color: "#374151", fontFamily: "monospace" }}>
              NextDNS: {cliente.nextdns_profile_id}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver dashboard"
            style={{ display: "flex", alignItems: "center", padding: "5px 8px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: "#6B7280", cursor: "pointer", textDecoration: "none" }}
          >
            <ExternalLink size={13} />
          </a>
          <button
            onClick={copiar}
            title="Copiar link"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: copiado ? "#10b981" : "#9CA3AF", cursor: "pointer", fontSize: 12 }}
          >
            {copiado ? <Check size={13} /> : <Copy size={13} />}
            {copiado ? "Copiado" : "Copiar link"}
          </button>
          <button
            onClick={() => onToggle(cliente.id, !cliente.activo)}
            title={cliente.activo ? "Desactivar" : "Activar"}
            style={{ display: "flex", alignItems: "center", padding: "5px 8px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: cliente.activo ? "#10b981" : "#4B5563", cursor: "pointer" }}
          >
            {cliente.activo ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RedFamiliarTab() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading]   = useState(true);
  const [demo, setDemo]         = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [guardando, setGuardando]     = useState(false);
  const [form, setForm] = useState({
    nombre_familia: "", nextdns_profile_id: "", email: "", telefono: "", notas: "",
  });

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const cargar = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/red-familiar");
    const data = await res.json();
    setClientes(data.clientes ?? []);
    setDemo(data.demo ?? false);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function toggleActivo(id: string, activo: boolean) {
    await fetch("/api/admin/red-familiar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, activo }),
    });
    setClientes((prev) => prev.map((c) => c.id === id ? { ...c, activo } : c));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    const res = await fetch("/api/admin/red-familiar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nombre_familia: "", nextdns_profile_id: "", email: "", telefono: "", notas: "" });
      setMostrarForm(false);
      cargar();
    }
    setGuardando(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "7px 10px", borderRadius: 4, border: "1px solid #2C2C2E",
    background: "#111113", color: "#F9FAFB", fontSize: 13, outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, color: "#4B5563", display: "block", marginBottom: 4,
    textTransform: "uppercase", letterSpacing: "0.04em",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 13, color: "#F9FAFB", fontWeight: 600 }}>
            Clientes — Red Familiar{" "}
            {demo && <span style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", background: "#F59E0B22", padding: "1px 6px", borderRadius: 3 }}>DEMO</span>}
          </p>
          <p style={{ fontSize: 11, color: "#4B5563" }}>{clientes.length} familia{clientes.length !== 1 ? "s" : ""} registrada{clientes.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={cargar} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: "#6B7280", fontSize: 12, cursor: "pointer" }}>
            <RefreshCw size={11} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Actualizar
          </button>
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 4, border: "1px solid #e8820a", background: mostrarForm ? "#e8820a22" : "transparent", color: "#e8820a", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            <Plus size={13} />
            Nueva familia
          </button>
        </div>
      </div>

      {/* Formulario nueva familia */}
      {mostrarForm && (
        <form onSubmit={handleSubmit} style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, padding: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB", marginBottom: 14 }}>Nueva familia</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Nombre de la familia *</label>
              <input style={inputStyle} value={form.nombre_familia} onChange={(e) => setForm({ ...form, nombre_familia: e.target.value })} required placeholder="Familia García" />
            </div>
            <div>
              <label style={labelStyle}>NextDNS Profile ID</label>
              <input style={inputStyle} value={form.nextdns_profile_id} onChange={(e) => setForm({ ...form, nextdns_profile_id: e.target.value })} placeholder="abc123" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="padre@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Teléfono</label>
              <input style={inputStyle} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="221-555-0000" />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Notas internas</label>
            <input style={inputStyle} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} placeholder="Ej: 2 hijos, tablet + celulares" />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={guardando} style={{ padding: "7px 18px", borderRadius: 4, border: "none", background: "#e8820a", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: guardando ? 0.6 : 1 }}>
              {guardando ? "Guardando…" : "Crear familia"}
            </button>
            <button type="button" onClick={() => setMostrarForm(false)} style={{ padding: "7px 14px", borderRadius: 4, border: "1px solid #2C2C2E", background: "transparent", color: "#6B7280", fontSize: 13, cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de clientes */}
      {loading && !clientes.length ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
          <RefreshCw size={18} color="#374151" style={{ animation: "spin 1s linear infinite" }} />
        </div>
      ) : clientes.length === 0 ? (
        <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, padding: 32, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#4B5563" }}>No hay familias registradas aún.</p>
          <p style={{ fontSize: 12, color: "#374151", marginTop: 4 }}>Hacé click en &ldquo;Nueva familia&rdquo; para agregar la primera.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {clientes.map((c) => (
            <ClienteCard key={c.id} cliente={c} baseUrl={baseUrl} onToggle={toggleActivo} />
          ))}
        </div>
      )}

    </div>
  );
}
