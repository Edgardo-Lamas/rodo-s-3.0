"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STATS = [
  { valor: "15+", num: 15, suffix: "+", label: "años de experiencia" },
  { valor: "100%", num: 100, suffix: "%", label: "atención personal" },
  { valor: "A domicilio", num: null, suffix: "", label: "o remoto" },
  { valor: "Confidencial", num: null, suffix: "", label: "siempre" },
];

const BADGES = ["PyMEs", "Usuarios domésticos", "Profesionales autónomos"];

/* ── Count-up hook (patrón Magic MCP / animated counter) ── */
function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* Stat individual — numérico usa count-up, texto estático */
function StatItem({
  stat,
  active,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
}) {
  const count = useCountUp(stat.num ?? 0, 1400, active && stat.num !== null);
  const display =
    stat.num !== null ? `${count}${stat.suffix}` : stat.valor;

  return (
    <div className="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 transition-all duration-300 hover:border-brand-orange/40 hover:bg-white/[0.07]">
      <span className="text-brand-orange font-bold text-xl leading-tight tabular-nums">
        {display}
      </span>
      <span className="text-gray-400 text-xs leading-snug capitalize">
        {stat.label}
      </span>
    </div>
  );
}

export default function SobreRodrigo() {
  const { ref, inView } = useReveal();

  return (
    <section
      id="sobre-mi"
      className="relative py-24 md:py-32"
      aria-labelledby="sobre-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Columna izquierda: contenido ── */}
          <div ref={ref} className="reveal-section flex flex-col gap-6">

            <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Quién está detrás
            </p>

            <h2
              id="sobre-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Rodrigo. Más de 15 años resolviendo problemas informáticos.
            </h2>

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

            <blockquote className="border-l-4 border-brand-orange pl-5 py-1">
              <p className="text-white font-medium text-base sm:text-lg leading-relaxed italic">
                &ldquo;Ahora sumo desarrollo web al servicio. La idea es la
                misma de siempre: soluciones reales, cuidadas, que te saquen
                el problema de encima.&rdquo;
              </p>
            </blockquote>

            {/* Mini-stats con count-up */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {STATS.map((s) => (
                <StatItem key={s.label} stat={s} active={inView} />
              ))}
            </div>
          </div>

          {/* ── Columna derecha: visual ── */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-sm mx-auto">
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 60%, #e8820a 0%, #4a9eff 60%, transparent 80%)",
                }}
                aria-hidden="true"
              />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10">
                <Image
                  src="/images/tecnico.jpg"
                  alt="Técnico informático trabajando en reparación de PC"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-orange" aria-hidden="true" />
                    <div>
                      <p className="text-white font-semibold text-lg leading-tight">Rodrigo</p>
                      <p className="text-gray-300 text-sm">Técnico informático · La Plata</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2" aria-label="Tipos de clientes">
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
  );
}
