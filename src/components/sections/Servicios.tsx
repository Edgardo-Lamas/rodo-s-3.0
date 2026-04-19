"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, RotateCcw } from "lucide-react";
import { SERVICIOS } from "@/lib/servicios";
import { WHATSAPP_URL } from "@/lib/config";

export default function Servicios() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setFlippedId((prev) => (prev === id ? null : id));

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

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          role="list"
        >
          {SERVICIOS.map((servicio) => {
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
                    {/* Imagen de fondo */}
                    <Image
                      src={servicio.imagen}
                      alt={servicio.titulo}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Overlay oscuro para legibilidad */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(6,13,31,0.55) 0%, rgba(6,13,31,0.2) 100%)",
                      }}
                    />

                    {/* Hint volver */}
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
