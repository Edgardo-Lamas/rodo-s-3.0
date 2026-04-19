import { Download, Trash2, Search, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/15dLflR97SAuXhPvVaTgEDxbNDXNEH6Cb?usp=sharing";

const HERRAMIENTAS: {
  icono: LucideIcon;
  nombre: string;
  descripcion: string;
  etiqueta: string;
  color: "orange" | "blue";
  href: string;
}[] = [
  {
    icono: Trash2,
    nombre: "Limpieza Exprés",
    descripcion:
      "Elimina archivos temporales, vacía la papelera y limpia la caché DNS con un doble clic. Sin instalación.",
    etiqueta: "Windows · .bat",
    color: "orange",
    href: DRIVE_FOLDER,
  },
  {
    icono: Search,
    nombre: "Diagnóstico del Sistema",
    descripcion:
      "Genera un reporte completo de tu PC: hardware, disco, programas al inicio y actualizaciones. Mandáselo a Rodrigo y te dice qué tiene en minutos.",
    etiqueta: "Windows · .bat",
    color: "blue",
    href: DRIVE_FOLDER,
  },
  {
    icono: FileText,
    nombre: "Guía de Seguridad Digital",
    descripcion:
      "PDF con los pasos básicos para protegerte de virus, estafas y phishing. Ideal para imprimir y tenerla a mano.",
    etiqueta: "PDF · Descargable",
    color: "orange",
    href: DRIVE_FOLDER,
  },
  {
    icono: FileText,
    nombre: "Checklist de Mantenimiento",
    descripcion:
      "Qué revisar cada 3 meses para que tu PC dure más. Lista descargable con logo de Rodo's 3.0.",
    etiqueta: "PDF · Descargable",
    color: "blue",
    href: DRIVE_FOLDER,
  },
];

export default function HerramientasGratuitas() {
  return (
    <section
      id="herramientas"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="herramientas-heading"
    >
      {/* Fondo con glow sutil */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,130,10,0.07) 0%, transparent 60%)," +
            "linear-gradient(180deg, #060d1f 0%, #0a1533 50%, #060d1f 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            De Rodrigo para vos
          </p>
          <h2
            id="herramientas-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Herramientas gratuitas.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Pequeñas herramientas que uso con mis clientes. Las comparto porque
            creo que te pueden servir hoy mismo, sin necesitar llamar a nadie.
          </p>
        </div>

        {/* ── Grid de herramientas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {HERRAMIENTAS.map(({ icono: Icon, nombre, descripcion, etiqueta, color, href }) => {
            const isBlue = color === "blue";
            const isPronto = etiqueta.includes("Próximamente");

            return (
              <div
                key={nombre}
                className={`group relative flex flex-col gap-5 rounded-2xl border p-7 transition-all duration-300 ${
                  isBlue
                    ? "bg-brand-blue/5 border-brand-blue/15 hover:border-brand-blue/40 hover:bg-brand-blue/10"
                    : "bg-brand-orange/5 border-brand-orange/15 hover:border-brand-orange/40 hover:bg-brand-orange/10"
                }`}
              >
                {/* Icono + etiqueta */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isBlue ? "bg-brand-blue/10" : "bg-brand-orange/10"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={isBlue ? "text-brand-blue" : "text-brand-orange"}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isPronto
                        ? "text-gray-400 border-white/10 bg-white/5"
                        : isBlue
                        ? "text-brand-blue border-brand-blue/30 bg-brand-blue/10"
                        : "text-brand-orange border-brand-orange/30 bg-brand-orange/10"
                    }`}
                  >
                    {etiqueta}
                  </span>
                </div>

                {/* Texto */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
                    {nombre}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {descripcion}
                  </p>
                </div>

                {/* Botón descarga */}
                {isPronto ? (
                  <span
                    className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border w-fit text-gray-500 border-white/10 bg-white/5 cursor-not-allowed"
                    aria-disabled="true"
                  >
                    <Download size={15} aria-hidden="true" />
                    Pronto disponible
                  </span>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Descargar ${nombre}`}
                    className={`inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border transition-all duration-200 w-fit ${
                      isBlue
                        ? "text-brand-blue border-brand-blue/40 hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                        : "text-brand-orange border-brand-orange/40 hover:bg-brand-orange hover:text-white hover:border-brand-orange"
                    }`}
                  >
                    <Download size={15} aria-hidden="true" />
                    Descargar gratis
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Nota al pie ── */}
        <p className="text-center text-gray-500 text-sm">
          100% gratis · Sin registro · Sin publicidad · Sin trampas.
        </p>

      </div>
    </section>
  );
}
