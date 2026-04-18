import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URLS } from "@/lib/config";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SERVICES = [
  { label: "Mantenimiento de PC", href: "#servicios" },
  { label: "Reparación de hardware", href: "#servicios" },
  { label: "Eliminación de virus", href: "#servicios" },
  { label: "Backups y recuperación", href: "#servicios" },
  { label: "Redes y Wi-Fi", href: "#servicios" },
  { label: "Soporte remoto", href: "#servicios" },
  { label: "Asesoramiento tecnológico", href: "#servicios" },
  { label: "Desarrollo web", href: "#desarrollo-web" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060d1f] border-t border-white/10 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

          {/* Col 1: Logo + descripción */}
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded w-fit"
              aria-label="Rodo's 3.0 — Inicio"
            >
              <span className="text-white">Rodo&apos;s </span>
              <span className="text-brand-orange">3.0</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              Soluciones informáticas para el día a día.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Más de 15 años brindando soporte técnico a usuarios y pequeñas
              empresas en La Plata y alrededores.
            </p>
          </div>

          {/* Col 2: Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Servicios
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-brand-blue transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Contacto
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp al 2215069677"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-blue transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                >
                  <MessageCircle
                    size={18}
                    aria-hidden="true"
                    className="text-brand-orange group-hover:text-brand-blue transition-colors duration-200"
                  />
                  2215069677
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URLS.personal}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram personal @rodorodoporahi"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-blue transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                >
                  <IgIcon className="text-brand-orange group-hover:text-brand-blue transition-colors duration-200" />
                  @rodorodoporahi
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URLS.marca}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de la marca @rodos3.0"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-blue transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                >
                  <IgIcon className="text-brand-orange group-hover:text-brand-blue transition-colors duration-200" />
                  @rodos3.0
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Rodo&apos;s 3.0 · Zona La Plata y alrededores · Atención a domicilio y remota
          </p>
        </div>
      </div>
    </footer>
  );
}
