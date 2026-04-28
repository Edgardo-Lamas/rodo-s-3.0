import {
  RefreshCw,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Lock,
  Compass,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  badge?: string;
  anchor: string;
  bullets: string[];
  imagen: string;
}

export const SERVICIOS: Servicio[] = [
  {
    id: "actualizaciones",
    titulo: "Actualizaciones",
    descripcion:
      "Sistema operativo, drivers y software siempre al día, para que tu equipo rinda al máximo.",
    icono: RefreshCw,
    anchor: "#servicios",
    imagen: "/images/card_actualizaciones.png",
    bullets: [
      "Windows, drivers y apps al día",
      "Rendimiento y estabilidad garantizados",
      "Sin vulnerabilidades por parches pendientes",
    ],
  },
  {
    id: "antivirus",
    titulo: "Antivirus",
    descripcion:
      "Instalación, configuración y limpieza de amenazas. Tu información, protegida.",
    icono: ShieldCheck,
    anchor: "#servicios",
    imagen: "/images/card_antivirus.png",
    bullets: [
      "Instalación de antivirus profesional",
      "Limpieza completa de virus y malware",
      "Protección activa configurada a tu medida",
    ],
  },
  {
    id: "limpieza",
    titulo: "Limpieza profunda",
    descripcion:
      "Hardware y software a punto. Si tu PC está lenta o con fallas, la devolvemos al ruedo.",
    icono: Sparkles,
    anchor: "#servicios",
    imagen: "/images/card_limpieza.png",
    bullets: [
      "Limpieza física interna del hardware",
      "Eliminación de archivos basura y procesos",
      "PC más rápida, silenciosa y estable",
    ],
  },
  {
    id: "backups",
    titulo: "Back ups",
    descripcion:
      "Resguardo seguro de tus archivos e información importante. Tranquilidad garantizada.",
    icono: HardDrive,
    anchor: "#servicios",
    imagen: "/images/card_backups.png",
    bullets: [
      "Copia de seguridad de archivos clave",
      "Resguardo en disco externo o nube",
      "Plan de recuperación ante pérdida de datos",
    ],
  },
  {
    id: "confidencialidad",
    titulo: "Confidencialidad",
    descripcion:
      "Manejo discreto y responsable de tu información. Lo que pasa en tu PC, se queda en tu PC.",
    icono: Lock,
    anchor: "#servicios",
    imagen: "/images/card_confidencialidad.png",
    bullets: [
      "Acceso a tus datos solo con tu permiso",
      "Trabajo discreto y profesional siempre",
      "Lo que pasa en tu PC queda entre vos y Rodrigo",
    ],
  },
  {
    id: "asesoramiento",
    titulo: "Asesoramiento",
    descripcion:
      "Orientación personalizada para comprar, actualizar o decidir qué te conviene. Sin venderte nada.",
    icono: Compass,
    anchor: "#servicios",
    imagen: "/images/card_asesoramiento.png",
    bullets: [
      "Análisis personalizado de tu situación",
      "Recomendaciones sin interés de venta",
      "Orientación para comprar o actualizar bien",
    ],
  },
  {
    id: "desarrollo-web",
    titulo: "Desarrollo web",
    descripcion:
      "Desde la landing page hasta sistemas completos con dashboard de KPIs, agentes de IA y automatizaciones. Tu negocio digital, con la tecnología que realmente necesita.",
    icono: Globe,
    anchor: "#desarrollo-web",
    badge: "NUEVO",
    imagen: "/images/card_desarrolloweb.png",
    bullets: [
      "Sitios web y landing pages profesionales",
      "Dashboards de KPIs a medida",
      "Agentes de IA y automatizaciones",
      "SEO básico + integración con WhatsApp",
    ],
  },
];
