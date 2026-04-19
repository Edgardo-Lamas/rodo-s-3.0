import {
  MessageCircle,
  Search,
  Wrench,
  CheckCircle,
  MapPin,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/config";

const PASOS: {
  numero: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
}[] = [
  {
    numero: "01",
    titulo: "Me escribís",
    descripcion:
      "Me contás qué te está pasando por WhatsApp. Sin formularios largos.",
    icono: MessageCircle,
  },
  {
    numero: "02",
    titulo: "Diagnostico",
    descripcion:
      "Vemos juntos qué necesita tu equipo o tu proyecto web. Gratis y sin compromiso.",
    icono: Search,
  },
  {
    numero: "03",
    titulo: "Trabajo",
    descripcion:
      "A domicilio o remoto, según el caso. Te mantengo al tanto de cada paso.",
    icono: Wrench,
  },
  {
    numero: "04",
    titulo: "Listo",
    descripcion:
      "Te entrego todo funcionando y quedo disponible por cualquier consulta.",
    icono: CheckCircle,
  },
];

const COBERTURA: {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
}[] = [
  {
    icono: MapPin,
    titulo: "A domicilio",
    descripcion:
      "La Plata y alrededores. Voy yo mismo a tu casa u oficina.",
  },
  {
    icono: Wifi,
    titulo: "Remoto",
    descripcion:
      "Desde cualquier lugar del país. Resuelvo lo que se puede resolver online.",
  },
];

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="relative py-24 md:py-32"
      aria-labelledby="proceso-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Parte A: Pasos ── */}
        <div className="text-center mb-14">
          <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Cómo trabajo
          </p>
          <h2
            id="proceso-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Simple, claro, sin sorpresas.
          </h2>
        </div>

        {/* Pasos */}
        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 mb-20">
          {PASOS.map((paso, idx) => {
            const Icon = paso.icono;
            const isLast = idx === PASOS.length - 1;
            return (
              <li key={paso.numero} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0">

                {/* Conector punteado desktop */}
                {!isLast && (
                  <div
                    className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #4a9eff 0, #4a9eff 6px, transparent 6px, transparent 14px)",
                      opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Conector vertical mobile */}
                {!isLast && (
                  <div
                    className="md:hidden absolute left-[1.15rem] top-[4.5rem] bottom-0 w-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, #4a9eff 0, #4a9eff 6px, transparent 6px, transparent 14px)",
                      opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Ícono con número de fondo */}
                <div className="relative shrink-0 w-20 h-20 md:mb-5 flex items-center justify-center">
                  {/* Número translúcido */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-5xl font-black text-brand-orange/15 select-none leading-none"
                    aria-hidden="true"
                  >
                    {paso.numero}
                  </span>
                  {/* Círculo */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon
                      size={26}
                      className="text-brand-orange"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Texto */}
                <div className="md:text-center md:px-4 pb-10 md:pb-0">
                  <h3 className="text-white font-semibold text-base mb-1.5">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* ── Separador ── */}
        <div
          className="h-px mb-16"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Parte B: Cobertura ── */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            ¿Dónde atiendo?
          </h3>

          {/* Imagen cobertura */}
          <div className="relative rounded-3xl overflow-hidden mb-8 aspect-[16/6]">
            <Image
              src="/images/soporte.jpg"
              alt="Soporte técnico a domicilio en La Plata"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-brand-dark/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {COBERTURA.map(({ icono: Icon, titulo, descripcion }) => (
              <div
                key={titulo}
                className="flex flex-col items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:border-brand-orange/40 hover:bg-white/[0.07]"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Icon size={24} className="text-brand-orange" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">
                    {titulo}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mensaje final ── */}
        <p className="text-center text-gray-300 text-base sm:text-lg">
          ¿Tenés dudas sobre si puedo ayudarte desde donde estás?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue font-medium underline underline-offset-4 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
          >
            Escribime y lo vemos.
          </a>
        </p>

      </div>
    </section>
  );
}
