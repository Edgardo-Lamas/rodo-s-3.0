import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Rodo's 3.0 — Técnico informático en La Plata";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0a1533 0%, #060d1f 60%, #04090f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow naranja bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,130,10,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Glow azul top-left */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,158,255,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Badge superior */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(232,130,10,0.12)",
            border: "1px solid rgba(232,130,10,0.3)",
            borderRadius: 999,
            padding: "8px 24px",
            marginBottom: 36,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8820a" }} />
          <span style={{ fontSize: 22, fontWeight: 600, color: "#e8820a", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Técnico informático · La Plata
          </span>
        </div>

        {/* Título principal */}
        <div
          style={{
            display: "flex",
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: "-3px",
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ffffff" }}>Rodo&apos;s </span>
          <span style={{ color: "#e8820a" }}>3.0</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 34,
            color: "#D1D5DB",
            fontWeight: 400,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Tu PC funcionando como el primer día.
        </div>

        {/* Descripción */}
        <div
          style={{
            fontSize: 22,
            color: "#4B5563",
            textAlign: "center",
          }}
        >
          Reparación · Antivirus · Backups · Soporte a domicilio o remoto
        </div>

        {/* Línea separadora */}
        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(to right, transparent, #e8820a, transparent)",
            marginTop: 40,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
