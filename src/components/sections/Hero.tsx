import { MessageCircle, ChevronDown, Shield, MapPin, Wifi } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

const TRUST_ITEMS = [
  { icon: MapPin, label: "A domicilio / remoto" },
  { icon: Wifi, label: "Atención personalizada" },
  { icon: Shield, label: "Confidencialidad garantizada" },
];

/* Dot-grid SVG pattern as a data URL */
const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`;

export default function Hero() {
  return (
    <section
      className="relative flex items-center min-h-[80vh] md:min-h-[90vh] overflow-hidden"
      aria-label="Sección principal"
    >
      {/* ── Background layers ── */}

      {/* Base gradient */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(160deg, #0a1533 0%, #060d1f 60%, #04090f 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04]"
        style={{ backgroundImage: DOT_PATTERN }}
        aria-hidden="true"
      />

      {/* Orange glow — bottom-right */}
      <div
        className="absolute -z-10 bottom-0 right-0 w-[480px] h-[480px] md:w-[700px] md:h-[700px] translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(232,130,10,0.28)" }}
        aria-hidden="true"
      />

      {/* Blue glow — top-left accent */}
      <div
        className="absolute -z-10 top-0 left-0 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(74,158,255,0.12)" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <p
            className="animate-fade-up delay-100 text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Técnico informático · +15 años
          </p>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-200 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-balance mb-6"
          >
            Tu PC{" "}
            <span className="text-brand-orange">funcionando</span>
            <br className="hidden sm:block" />
            {" "}como el primer día.
          </h1>

          {/* Subtítulo */}
          <p
            className="animate-fade-up delay-300 text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mb-10"
          >
            Soluciones informáticas para el día a día. Atención personalizada,
            a domicilio o remota, con la confianza de quien resuelve problemas
            reales hace más de 15 años.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Primario — WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar con Rodrigo por WhatsApp"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-base px-7 py-4 rounded-full shadow-lg shadow-orange-900/30 transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Hablar por WhatsApp
            </a>

            {/* Secundario — Ver servicios */}
            <a
              href="#servicios"
              aria-label="Ver todos los servicios"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-blue text-white font-semibold text-base px-7 py-4 rounded-full transition-all duration-200 hover:bg-brand-blue/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Ver servicios
              <ChevronDown size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="animate-fade-up delay-500 flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Indicadores de confianza"
          >
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-sm text-gray-400"
              >
                <Icon size={14} className="text-brand-blue shrink-0" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
