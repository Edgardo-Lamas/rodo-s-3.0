"use client";

import { useState } from "react";
import { Download, X, RefreshCw } from "lucide-react";

interface Props {
  herramienta: { nombre: string; href: string };
  onClose: () => void;
}

export default function DescargaModal({ herramienta, onClose }: Props) {
  const [nombre, setNombre]   = useState("");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [listo, setListo]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ nombre, email, herramienta: herramienta.nombre }),
      });
    } catch { /* silencioso */ } finally {
      setLoading(false);
    }
    // Abrir descarga y mostrar confirmación
    window.open(herramienta.href, "_blank", "noopener,noreferrer");
    setListo(true);
    setTimeout(onClose, 1800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 p-7"
        style={{ background: "#0a1533" }}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {listo ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
              <Download size={22} className="text-brand-orange" />
            </div>
            <p className="text-white font-semibold text-base">¡Descarga iniciada!</p>
            <p className="text-gray-400 text-sm">Si podemos ayudarte, te contactamos.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-white font-semibold text-base mb-1">{herramienta.nombre}</p>
              <p className="text-gray-400 text-sm">Dejá tu nombre y email para descargar. No spam, solo te contactamos si podemos ayudarte.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder="Tu nombre"
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none border border-white/10 focus:border-brand-orange/60 transition-colors"
                  style={{ background: "#060d1f" }}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none border border-white/10 focus:border-brand-orange/60 transition-colors"
                  style={{ background: "#060d1f" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-sm px-5 py-3 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-1"
              >
                {loading
                  ? <><RefreshCw size={14} className="animate-spin" /> Procesando…</>
                  : <><Download size={14} /> Descargar gratis</>
                }
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
