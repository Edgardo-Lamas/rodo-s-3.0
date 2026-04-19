import { Smartphone, Zap, MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/config";
import type { LucideIcon } from "lucide-react";

/* ── datos ── */

const FEATURES: { icono: LucideIcon; titulo: string; descripcion: string }[] = [
  {
    icono: Smartphone,
    titulo: "Adaptado a móviles",
    descripcion:
      "Se ve perfecto en cualquier pantalla, desde un celular hasta un monitor grande.",
  },
  {
    icono: Zap,
    titulo: "Carga rápida",
    descripcion:
      "Optimizado para que tus visitantes no se vayan esperando.",
  },
  {
    icono: MessageCircle,
    titulo: "Integrado con WhatsApp",
    descripcion:
      "Tus clientes te escriben en un clic. Más contactos, menos fricción.",
  },
  {
    icono: Search,
    titulo: "Pensado para Google",
    descripcion:
      "SEO básico incluido para que te encuentren cuando te buscan.",
  },
];

const PROYECTOS: { titulo: string; rubro: string; gradiente: string }[] = [
  {
    titulo: "Estudio profesional",
    rubro: "Asesoría y consultoría",
    gradiente: "from-[#0f2048] via-[#1a3a6e] to-[#0a1533]",
  },
  {
    titulo: "Comercio local",
    rubro: "Venta minorista",
    gradiente: "from-[#1a1a0a] via-[#3a2a05] to-[#0a1533]",
  },
  {
    titulo: "Emprendimiento gastronómico",
    rubro: "Gastronomía y delivery",
    gradiente: "from-[#1a0a0a] via-[#2e1414] to-[#0a1533]",
  },
  {
    titulo: "Servicios técnicos",
    rubro: "Mantenimiento y soporte",
    gradiente: "from-[#081830] via-[#0f2a4a] to-[#060d1f]",
  },
];

/* ── componente ── */

export default function DesarrolloWeb() {
  return (
    <section
      id="desarrollo-web"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="devweb-heading"
    >
      {/* Fondo con presencia de azul eléctrico en los bordes */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(74,158,255,0.10) 0%, transparent 60%)," +
            "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(74,158,255,0.08) 0%, transparent 60%)," +
            "linear-gradient(180deg, #060d1f 0%, #0a1533 50%, #060d1f 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          {/* Eyebrow con badge animado */}
          <div className="inline-flex items-center gap-3 mb-5">
            <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Nuevo servicio
            </p>
            <span className="relative inline-flex items-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange" />
            </span>
          </div>

          <h2
            id="devweb-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Tu negocio, también online.
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Diseñamos tu sitio web con la misma dedicación con la que cuidamos
            tu equipo. Resultados reales, sin vueltas.
          </p>
        </div>

        {/* ── Imagen decorativa ── */}
        <div className="relative rounded-3xl overflow-hidden mb-16 aspect-[21/9]">
          <Image
            src="/images/codigo.jpg"
            alt="Desarrollo web profesional — código en pantalla"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60" />
        </div>

        {/* ── Grid características ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {FEATURES.map(({ icono: Icon, titulo, descripcion }) => (
            <div
              key={titulo}
              className="flex gap-5 bg-brand-blue/5 border border-brand-blue/15 rounded-2xl p-6 transition-all duration-300 hover:border-brand-blue/40 hover:bg-brand-blue/10"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                <Icon size={22} className="text-brand-blue" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">{titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Separador ── */}
        <div
          className="h-px mb-16"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(74,158,255,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Sub-bloque: proyectos ── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Así se ve el trabajo que entregamos.
            </h3>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Una selección de sitios que hicimos para comercios, profesionales
              y emprendedores.
            </p>
          </div>

          {/* TODO: reemplazar por screenshots reales de proyectos cuando Rodrigo los apruebe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROYECTOS.map((proyecto) => (
              <div
                key={proyecto.titulo}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 cursor-default"
              >
                {/* Placeholder visual con gradiente */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${proyecto.gradiente} transition-transform duration-300 group-hover:scale-105`}
                  aria-hidden="true"
                />

                {/* Dot pattern decorativo */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E\")",
                  }}
                  aria-hidden="true"
                />

                {/* Contenido normal */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-white font-semibold text-sm leading-tight">
                    {proyecto.titulo}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{proyecto.rubro}</p>
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
                  <p className="text-white text-sm font-medium text-center leading-snug">
                    Proyecto realizado por{" "}
                    <span className="text-brand-orange font-semibold">Rodo&apos;s 3.0</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA final ── */}
        <div className="rounded-2xl bg-brand-orange/10 border border-brand-orange/30 px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white font-semibold text-xl sm:text-2xl text-center sm:text-left">
            ¿Querés una web así para tu negocio?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar sobre desarrollo web por WhatsApp"
            className="shrink-0 inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-orange-900/25 transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark whitespace-nowrap"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Conversemos por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
