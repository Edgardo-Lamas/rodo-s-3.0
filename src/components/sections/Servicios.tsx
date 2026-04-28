"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, RotateCcw } from "lucide-react";
import { SERVICIOS } from "@/lib/servicios";
import { WHATSAPP_URL } from "@/lib/config";

const CAPACIDADES = [
  "Sistemas web",
  "Dashboards de KPIs",
  "Agentes de IA",
  "Automatizaciones",
];

export default function Servicios() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const toggle = (id: string) =>
    setFlippedId((prev) => (prev === id ? null : id));

  const webService = SERVICIOS.find((s) => s.id === "desarrollo-web")!;
  const regularServices = SERVICIOS.filter((s) => s.id !== "desarrollo-web");

  return (
    <section
      id="servicios"
      className="relative py-24 md:py-32"
      aria-labelledby="servicios-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Qué hago
          </p>
          <h2
            id="servicios-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Servicios que resuelven
            <br className="hidden sm:block" /> problemas reales
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Desde la PC del escritorio hasta la presencia web de tu negocio, me
            ocupo de que todo funcione. Sin vueltas ni tecnicismos.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5" role="list">

          {/* ── Desarrollo Web — ancho completo, giro vertical ── */}
          <div
            role="listitem"
            style={{ perspective: "1000px", minHeight: "200px" }}
          >
            {(() => {
              const Icon = webService.icono;
              const isFlipped = flippedId === webService.id;
              return (
                <div
                  className="relative w-full transition-transform duration-500 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
                    minHeight: "200px",
                  }}
                  onClick={() => toggle(webService.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                  aria-label={
                    isFlipped
                      ? `Cerrar detalle de ${webService.titulo}`
                      : `Ver detalle de ${webService.titulo}`
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(webService.id);
                    }
                  }}
                >
                  {/* ── Cara frontal ── */}
                  <div
                    className="absolute inset-0 flex flex-col sm:flex-row items-start gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-orange/60 hover:bg-white/[0.07] transition-colors duration-300"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {webService.badge && (
                      <span className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {webService.badge}
                      </span>
                    )}

                    {/* Icono */}
                    <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Icon size={28} className="text-brand-orange" aria-hidden="true" />
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-xl leading-snug">
                        {webService.titulo}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {webService.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {CAPACIDADES.map((cap) => (
                          <span
                            key={cap}
                            className="text-[11px] font-semibold text-brand-orange border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 rounded-full"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hint */}
                    <p className="text-[11px] text-brand-orange/60 font-medium flex items-center gap-1 self-end sm:self-auto sm:mt-auto shrink-0">
                      <RotateCcw size={11} aria-hidden="true" />
                      Tocá para ver más
                    </p>
                  </div>

                  {/* ── Cara trasera ── */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-brand-orange/40"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)",
                    }}
                  >
                    <Image
                      src={webService.imagen}
                      alt={webService.titulo}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1200px) 100vw, 1152px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(6,13,31,0.55) 0%, rgba(6,13,31,0.2) 100%)",
                      }}
                    />
                    <p className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-brand-orange/70 font-medium flex items-center justify-center gap-1">
                      <RotateCcw size={11} aria-hidden="true" />
                      Tocá para volver
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ── Cards regulares — 3 columnas simétricas ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {regularServices.map((servicio) => {
              const Icon = servicio.icono;
              const isFlipped = flippedId === servicio.id;

              return (
                <div
                  key={servicio.id}
                  role="listitem"
                  style={{ perspective: "1000px", minHeight: "240px" }}
                >
                  <div
                    className="relative w-full transition-transform duration-500 cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      minHeight: "240px",
                    }}
                    onClick={() => toggle(servicio.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                    aria-label={
                      isFlipped
                        ? `Cerrar detalle de ${servicio.titulo}`
                        : `Ver detalle de ${servicio.titulo}`
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(servicio.id);
                      }
                    }}
                  >
                    {/* ── Cara frontal ── */}
                    <div
                      className="absolute inset-0 flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-orange/60 hover:bg-white/[0.07] transition-colors duration-300"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {servicio.badge && (
                        <span className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                          {servicio.badge}
                        </span>
                      )}
                      <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                        <Icon size={24} className="text-brand-orange" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-white font-semibold text-base leading-snug">
                          {servicio.titulo}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {servicio.descripcion}
                        </p>
                      </div>
                      <p className="text-[11px] text-brand-orange/60 font-medium flex items-center gap-1 mt-auto">
                        <RotateCcw size={11} aria-hidden="true" />
                        Tocá para ver más
                      </p>
                    </div>

                    {/* ── Cara trasera ── */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-brand-orange/40"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Image
                        src={servicio.imagen}
                        alt={servicio.titulo}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(6,13,31,0.55) 0%, rgba(6,13,31,0.2) 100%)",
                        }}
                      />
                      <p className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-brand-orange/70 font-medium flex items-center justify-center gap-1">
                        <RotateCcw size={11} aria-hidden="true" />
                        Tocá para volver
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 text-base sm:text-lg mb-6">
            ¿No estás seguro de qué necesitás?{" "}
            <span className="text-white font-medium">
              Escribime por WhatsApp y lo vemos juntos.
            </span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            className="inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-orange-900/25 transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Consultar ahora
          </a>
        </div>

      </div>
    </section>
  );
}
