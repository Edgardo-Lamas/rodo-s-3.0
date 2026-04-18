import { WHATSAPP_URL, INSTAGRAM_URLS } from "@/lib/config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.522 5.843L.057 23.882a.75.75 0 0 0 .933.933l6.04-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.214-3.724.904.92-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z" />
    </svg>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

const CARDS = [
  {
    key: "whatsapp",
    icono: (cls: string) => <WhatsAppIcon className={cls} />,
    iconoBg: "bg-[#25D366]/10",
    iconoColor: "text-[#25D366]",
    titulo: "WhatsApp",
    subtitulo: "2215069677",
    boton: "Abrir chat",
    href: WHATSAPP_URL,
    btnClass:
      "bg-brand-orange hover:bg-brand-orangeDark text-white shadow-lg shadow-orange-900/25",
  },
  {
    key: "ig-marca",
    icono: (cls: string) => <IgIcon className={cls} />,
    iconoBg: "bg-brand-blue/10",
    iconoColor: "text-brand-blue",
    titulo: "Instagram",
    subtitulo: "@rodos3.0",
    boton: "Ver perfil",
    href: INSTAGRAM_URLS.marca,
    btnClass:
      "border border-brand-blue text-brand-blue hover:bg-brand-blue/10",
  },
  {
    key: "ig-personal",
    icono: (cls: string) => <IgIcon className={cls} />,
    iconoBg: "bg-brand-blue/10",
    iconoColor: "text-brand-blue",
    titulo: "También en",
    subtitulo: "@rodorodoporahi",
    boton: "Ver perfil",
    href: INSTAGRAM_URLS.personal,
    btnClass:
      "border border-brand-blue text-brand-blue hover:bg-brand-blue/10",
  },
];

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      {/* Fondo — retoma estilo Hero */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #060d1f 0%, #0a1533 50%, #04090f 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -z-10 bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(232,130,10,0.22)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -z-10 top-0 left-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(74,158,255,0.10)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <p className="text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4">
          Contacto
        </p>
        <h2
          id="contacto-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5"
        >
          Hablemos.
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-14">
          La forma más rápida de resolver lo que necesitás. Escribime por
          WhatsApp, te respondo yo directamente.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {CARDS.map((card) => (
            <div
              key={card.key}
              className="flex flex-col items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              {/* Ícono */}
              <div
                className={`w-16 h-16 rounded-2xl ${card.iconoBg} flex items-center justify-center`}
              >
                {card.icono(`w-8 h-8 ${card.iconoColor}`)}
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-1">
                <p className="text-white font-semibold text-base">{card.titulo}</p>
                <p className="text-gray-400 text-sm">{card.subtitulo}</p>
              </div>

              {/* Botón */}
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${card.boton} — ${card.subtitulo}`}
                className={`inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark ${card.btnClass}`}
              >
                {card.boton}
              </a>
            </div>
          ))}
        </div>

        {/* Mensaje final */}
        <p className="text-gray-400 text-sm sm:text-base">
          Respondo personalmente.{" "}
          <span className="text-gray-300">Sin bots, sin esperas largas.</span>
        </p>
      </div>
    </section>
  );
}
