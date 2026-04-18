"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Plus } from "lucide-react";
import { FAQS, type FAQ } from "@/lib/faqs";
import { WHATSAPP_URL } from "@/lib/config";

/* ── Item individual del accordion ── */

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const triggerId = `${uid}-trigger`;
  const panelId = `${uid}-panel`;

  /* Anima height de 0 al scrollHeight real */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (isOpen) {
      panel.style.height = `${panel.scrollHeight}px`;
    } else {
      /* Fija la altura actual antes de colapsar para que la transición arranque bien */
      panel.style.height = `${panel.scrollHeight}px`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.height = "0px";
        });
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10">
      {/* Trigger */}
      <h3>
        <button
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-inset rounded"
        >
          <span
            className={`text-base sm:text-lg font-medium leading-snug transition-colors duration-200 ${
              isOpen ? "text-brand-orange" : "text-white group-hover:text-brand-blue"
            }`}
          >
            {faq.pregunta}
          </span>

          {/* Ícono + rotado cuando abierto */}
          <span
            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "border-brand-orange bg-brand-orange/10 rotate-45"
                : "border-white/20 bg-white/5 group-hover:border-brand-blue/50 rotate-0"
            }`}
            aria-hidden="true"
          >
            <Plus
              size={14}
              className={`transition-colors duration-200 ${
                isOpen ? "text-brand-orange" : "text-gray-400 group-hover:text-brand-blue"
              }`}
            />
          </span>
        </button>
      </h3>

      {/* Panel colapsable */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        ref={panelRef}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height: isOpen ? undefined : "0px" }}
      >
        <p className="text-gray-300 text-base leading-relaxed pb-5 pr-10">
          {faq.respuesta}
        </p>
      </div>
    </div>
  );
}

/* ── Sección principal ── */

export default function FAQs() {
  /* Mobile: primera pregunta abierta por defecto */
  const [openId, setOpenId] = useState<string>(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? FAQS[0].id : ""
  );

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <section
      id="faqs"
      className="relative py-24 md:py-32"
      aria-labelledby="faqs-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            FAQs
          </p>
          <h2
            id="faqs-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Lo que más me preguntan.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Si tu duda no está acá,{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline underline-offset-4 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
            >
              escribime por WhatsApp
            </a>
            . Respondo yo.
          </p>
        </div>

        {/* Accordion */}
        <div
          className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-8 divide-y-0"
          role="list"
        >
          {FAQS.map((faq) => (
            <div key={faq.id} role="listitem">
              <AccordionItem
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
