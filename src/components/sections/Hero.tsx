import { MessageCircle, ChevronDown, Shield, MapPin, Wifi } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import TechPlayerWrapper from "@/components/ui/TechAnimation/TechPlayerWrapper";

const TRUST_ITEMS = [
  { icon: MapPin,  label: "A domicilio / remoto" },
  { icon: Wifi,    label: "Atención personalizada" },
  { icon: Shield,  label: "Confidencialidad garantizada" },
];

/* RetroGrid extraído de Magic MCP — perspectiva 3D animada */
function RetroGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden opacity-[0.18]"
      style={{ perspective: "200px" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ transform: "rotateX(65deg)" }}>
        <div
          className="animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4a9eff 1px, transparent 0), linear-gradient(to bottom, #4a9eff 1px, transparent 0)",
            backgroundRepeat: "repeat",
            backgroundSize: "60px 60px",
            height: "300vh",
            inset: "0% 0px",
            marginLeft: "-200%",
            transformOrigin: "100% 0 0",
            width: "600vw",
          }}
        />
      </div>
      {/* fade hacia abajo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-transparent to-transparent" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex items-center min-h-[80vh] md:min-h-[90vh] overflow-hidden"
      aria-label="Sección principal"
    >
      {/* ── Fondo base ── */}
      <div
        className="absolute inset-0 -z-30"
        style={{ background: "linear-gradient(160deg, #0a1533 0%, #060d1f 60%, #04090f 100%)" }}
        aria-hidden="true"
      />

      {/* RetroGrid animado (Magic MCP) */}
      <RetroGrid />

      {/* Blobs de color */}
      <div
        className="absolute -z-10 bottom-0 right-0 w-[480px] h-[480px] md:w-[700px] md:h-[700px] translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(232,130,10,0.22)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -z-10 top-0 left-0 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(74,158,255,0.10)" }}
        aria-hidden="true"
      />

      {/* ── Layout 2 columnas ── */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Col izquierda — texto */}
          <div>
            <p className="animate-fade-up delay-100 text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-5">
              Técnico informático en La Plata · +15 años
            </p>

            <h1 className="animate-fade-up delay-200 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-balance mb-6">
              Tu PC{" "}
              <span className="text-brand-orange">funcionando</span>
              <br className="hidden sm:block" />
              {" "}como el primer día.
            </h1>

            <p className="animate-fade-up delay-300 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mb-10">
              Soluciones informáticas para el día a día. Atención personalizada,
              a domicilio o remota, con la confianza de quien resuelve problemas
              reales hace más de 15 años.
            </p>

            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 mb-12">

              {/* WhatsApp CTA — con glow pulsante (Magic MCP) */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablar con Rodrigo por WhatsApp"
                className="animate-pulse-glow-orange inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-base px-7 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Hablar por WhatsApp
              </a>

              {/* Ver servicios — borde giratorio (Magic MCP) */}
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span
                  className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4a9eff_0%,#060d1f_50%,#4a9eff_100%)]"
                  aria-hidden="true"
                />
                <a
                  href="#servicios"
                  aria-label="Ver todos los servicios"
                  className="relative inline-flex items-center justify-center gap-2.5 bg-[#060d1f] text-white font-semibold text-base px-7 py-4 rounded-full transition-all duration-200 hover:bg-brand-blue/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  Ver servicios
                  <ChevronDown size={18} aria-hidden="true" />
                </a>
              </span>

            </div>

            <div
              className="animate-fade-up delay-500 flex flex-wrap gap-x-6 gap-y-2"
              aria-label="Indicadores de confianza"
            >
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                  <Icon size={14} className="text-brand-blue shrink-0" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Col derecha — animación Remotion */}
          <div className="animate-fade-up delay-300 hidden lg:flex items-center justify-center">
            <div className="w-full max-w-[480px] drop-shadow-2xl">
              <TechPlayerWrapper />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
        aria-label="Ver servicios"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
