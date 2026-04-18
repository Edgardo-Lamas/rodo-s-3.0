"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { valor: "15+", label: "años de experiencia" },
  { valor: "100%", label: "atención personal" },
  { valor: "A domicilio", label: "o remoto" },
  { valor: "Confidencial", label: "siempre" },
];

const BADGES = ["PyMEs", "Usuarios domésticos", "Profesionales autónomos"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function SobreRodrigo() {
  const ref = useReveal();

  return (
    <>
      <style>{`
        .reveal-section > * {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal-section.in-view > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0ms; }
        .reveal-section.in-view > *:nth-child(2) { opacity:1; transform:none; transition-delay: 100ms; }
        .reveal-section.in-view > *:nth-child(3) { opacity:1; transform:none; transition-delay: 180ms; }
        .reveal-section.in-view > *:nth-child(4) { opacity:1; transform:none; transition-delay: 260ms; }
        .reveal-section.in-view > *:nth-child(5) { opacity:1; transform:none; transition-delay: 340ms; }
        .reveal-section.in-view > *:nth-child(6) { opacity:1; transform:none; transition-delay: 420ms; }
      `}</style>

      <section
        id="sobre-mi"
        className="relative py-24 md:py-32"
        aria-labelledby="sobre-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* ── Columna izquierda: contenido ── */}
            <div ref={ref} className="reveal-section flex flex-col gap-6">

              {/* Eyebrow */}
              <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                Quién está detrás
              </p>

              {/* H2 */}
              <h2
                id="sobre-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                Rodrigo. Más de 15 años resolviendo problemas informáticos.
              </h2>

              {/* Párrafos */}
              <div className="flex flex-col gap-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  Me dedico a esto desde antes de que &ldquo;la nube&rdquo; fuera común.
                  Empecé arreglando PCs para amigos y familia, y con los años
                  fui ampliando a comercios, profesionales y pequeñas empresas
                  de la región.
                </p>
                <p>
                  Lo que me diferencia es simple: atiendo yo, no un call center.
                  Cuando me escribís, me escribís a mí. Y cuando voy a tu casa o
                  a tu oficina, voy con la intención de dejarte la PC —o el
                  sitio web— funcionando de verdad, no con un parche que se caiga
                  la semana que viene.
                </p>
              </div>

              {/* Blockquote destacado */}
              <blockquote className="border-l-4 border-brand-orange pl-5 py-1">
                <p className="text-white font-medium text-base sm:text-lg leading-relaxed italic">
                  &ldquo;Ahora sumo desarrollo web al servicio. La idea es la
                  misma de siempre: soluciones reales, cuidadas, que te saquen
                  el problema de encima.&rdquo;
                </p>
              </blockquote>

              {/* Mini-stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <span className="text-brand-orange font-bold text-xl leading-tight">
                      {s.valor}
                    </span>
                    <span className="text-gray-400 text-xs leading-snug capitalize">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Columna derecha: visual ── */}
            <div className="flex flex-col items-center gap-6">

              {/* Avatar container */}
              <div className="relative w-full max-w-sm mx-auto">
                {/* Glow de fondo */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 60%, #e8820a 0%, #4a9eff 60%, transparent 80%)",
                  }}
                  aria-hidden="true"
                />

                {/* Card visual */}
                <div className="relative bg-gradient-to-br from-[#0f2048] to-[#060d1f] border border-white/10 rounded-3xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-center gap-4 p-8">

                  {/* Decoración circuital sutil */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E\")",
                    }}
                    aria-hidden="true"
                  />

                  {/* Avatar placeholder */}
                  {/* TODO: reemplazar por foto real de Rodrigo cuando esté disponible */}
                  <div
                    className="w-36 h-36 rounded-full border-4 border-brand-orange/50 flex items-center justify-center shadow-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, #1a3a6e, #0a1533)",
                    }}
                    aria-label="Avatar de Rodrigo"
                    role="img"
                  >
                    <span
                      className="text-brand-orange font-bold text-6xl select-none"
                      aria-hidden="true"
                    >
                      R
                    </span>
                  </div>

                  {/* Nombre */}
                  <div className="text-center z-10">
                    <p className="text-white font-semibold text-lg">Rodrigo</p>
                    <p className="text-gray-400 text-sm">Técnico informático · La Plata</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div
                className="flex flex-wrap justify-center gap-2"
                aria-label="Tipos de clientes"
              >
                {BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
