import Image from "next/image";
import {
  Wifi,
  Shield,
  MapPin,
  Activity,
  MessageCircle,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP_RED = `https://wa.me/5492215069677?text=${encodeURIComponent(
  "Hola Rodrigo, me interesa la Red Familiar Segura"
)}`;

const FEATURES: {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
  color: "blue" | "orange";
}[] = [
  {
    icono: Wifi,
    titulo: "Control de red doméstica",
    descripcion:
      "Administrá todos los dispositivos del WiFi desde un panel central. Sabés quién está conectado y a qué sitios entra en tiempo real.",
    color: "blue",
  },
  {
    icono: Shield,
    titulo: "Filtro de contenido a medida",
    descripcion:
      "Bloqueá sitios adultos, apuestas, redes sociales o cualquier categoría. Configurado según la edad de cada hijo.",
    color: "orange",
  },
  {
    icono: MapPin,
    titulo: "Protección fuera del hogar",
    descripcion:
      "Los filtros viajan con el celular del chico. Aunque use el WiFi de un amigo o datos móviles, la protección sigue activa.",
    color: "blue",
  },
  {
    icono: Activity,
    titulo: "Reportes de actividad",
    descripcion:
      "Con el abono completo recibís un informe mensual de qué sitios visitaron los dispositivos de tu familia.",
    color: "orange",
  },
];

const PLANES: {
  nombre: string;
  tipo: string;
  descripcion: string;
  bullets: string[];
  destacado: boolean;
}[] = [
  {
    nombre: "Instalación",
    tipo: "Pago único",
    descripcion:
      "El hardware y la configuración inicial. Protección real desde el primer día.",
    bullets: [
      "Kit Raspberry Pi + instalación",
      "AdGuard Home configurado",
      "Filtros personalizados por dispositivo",
      "Prueba funcional garantizada",
    ],
    destacado: false,
  },
  {
    nombre: "Abono Básico",
    tipo: "Mensual",
    descripcion:
      "Para quienes ya tienen el sistema y quieren mantenerlo siempre actualizado.",
    bullets: [
      "Actualización mensual de filtros",
      "Soporte por WhatsApp",
      "Monitoreo remoto del sistema",
    ],
    destacado: false,
  },
  {
    nombre: "Abono Completo",
    tipo: "Mensual",
    descripcion:
      "Protección extendida que sigue a los chicos también fuera de casa.",
    bullets: [
      "Todo lo del Abono Básico",
      "VPN en dispositivos móviles",
      "Reportes mensuales de actividad",
      "Ajustes de configuración incluidos",
    ],
    destacado: true,
  },
];

export default function RedFamiliar() {
  return (
    <section
      id="red-familiar"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="red-familiar-heading"
    >
      {/* Fondo con imagen animada */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Imagen con zoom lento */}
        <div
          className="absolute inset-0"
          style={{
            animation: "slowZoom 8s ease-in-out infinite alternate",
          }}
        >
          <Image
            src="/images/bg_red_familiar.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        {/* Overlay oscuro para legibilidad del contenido */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,13,31,0.82) 0%, rgba(6,13,31,0.70) 50%, rgba(6,13,31,0.88) 100%)",
          }}
        />
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.12); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <p className="text-brand-blue text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Nuevo servicio
            </p>
            <span className="relative inline-flex items-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-blue" />
            </span>
          </div>

          <h2
            id="red-familiar-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Internet segura
            <br className="hidden sm:block" />
            para toda la familia.
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Un sistema instalado en tu casa que filtra el contenido, controla
            los dispositivos de tus hijos y los protege aunque salgan de tu WiFi.
            Sin apps raras, sin suscripciones extranjeras.
          </p>

          {/* CTA 1 — mid-header */}
          <a
            href={WHATSAPP_RED}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar Red Familiar Segura por WhatsApp"
            className="inline-flex items-center gap-2.5 bg-brand-blue hover:brightness-110 text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-900/25 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Quiero saber más
          </a>
        </div>

        {/* ── Separador ── */}
        <div
          className="h-px my-14"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(74,158,255,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Features grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {FEATURES.map(({ icono: Icon, titulo, descripcion, color }) => {
            const isBlue = color === "blue";
            return (
              <div
                key={titulo}
                className={`flex gap-5 rounded-2xl border p-6 transition-all duration-300 ${
                  isBlue
                    ? "bg-brand-blue/5 border-brand-blue/15 hover:border-brand-blue/40 hover:bg-brand-blue/10"
                    : "bg-brand-orange/5 border-brand-orange/15 hover:border-brand-orange/40 hover:bg-brand-orange/10"
                }`}
              >
                <div
                  className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                    isBlue ? "bg-brand-blue/10" : "bg-brand-orange/10"
                  }`}
                >
                  <Icon
                    size={22}
                    className={isBlue ? "text-brand-blue" : "text-brand-orange"}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    {titulo}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Separador ── */}
        <div
          className="h-px mb-14"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(74,158,255,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Planes ── */}
        <div className="mb-14">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Elegí el nivel de protección.
            </h3>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Empezá con la instalación y sumá el abono que mejor se adapte a
              tu familia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  plan.destacado
                    ? "bg-brand-blue/10 border-brand-blue/50 shadow-lg shadow-blue-900/20"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                {plan.destacado && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                    Más completo
                  </span>
                )}

                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                    plan.destacado ? "text-brand-blue" : "text-gray-500"
                  }`}
                >
                  {plan.tipo}
                </p>
                <h4 className="text-white font-bold text-xl mb-3">
                  {plan.nombre}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {plan.descripcion}
                </p>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className={`shrink-0 mt-0.5 ${
                          plan.destacado ? "text-brand-blue" : "text-brand-orange"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-gray-300 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP_RED}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Consultar precio de ${plan.nombre}`}
                  className={`inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border transition-all duration-200 ${
                    plan.destacado
                      ? "bg-brand-blue text-white border-brand-blue hover:brightness-110 hover:scale-105"
                      : "text-gray-300 border-white/20 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Consultar precio
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA 2 — bottom ── */}
        <div className="rounded-2xl bg-brand-blue/10 border border-brand-blue/30 px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-xl sm:text-2xl mb-1">
              ¿Querés proteger a tu familia?
            </p>
            <p className="text-gray-400 text-sm">
              Escribime y te cuento cómo funciona, sin compromiso.
            </p>
          </div>
          <a
            href={WHATSAPP_RED}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar Red Familiar Segura por WhatsApp"
            className="shrink-0 inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-orange-900/25 transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark whitespace-nowrap"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Escribime por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
