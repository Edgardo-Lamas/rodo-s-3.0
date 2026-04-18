import {
  RefreshCw,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Lock,
  Compass,
  Coins,
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
}

export const SERVICIOS: Servicio[] = [
  {
    id: "actualizaciones",
    titulo: "Actualizaciones",
    descripcion:
      "Sistema operativo, drivers y software siempre al día, para que tu equipo rinda al máximo.",
    icono: RefreshCw,
    anchor: "#servicios",
  },
  {
    id: "antivirus",
    titulo: "Antivirus",
    descripcion:
      "Instalación, configuración y limpieza de amenazas. Tu información, protegida.",
    icono: ShieldCheck,
    anchor: "#servicios",
  },
  {
    id: "limpieza",
    titulo: "Limpieza profunda",
    descripcion:
      "Hardware y software a punto. Si tu PC está lenta o con fallas, la devolvemos al ruedo.",
    icono: Sparkles,
    anchor: "#servicios",
  },
  {
    id: "backups",
    titulo: "Back ups",
    descripcion:
      "Resguardo seguro de tus archivos e información importante. Tranquilidad garantizada.",
    icono: HardDrive,
    anchor: "#servicios",
  },
  {
    id: "confidencialidad",
    titulo: "Confidencialidad",
    descripcion:
      "Manejo discreto y responsable de tu información. Lo que pasa en tu PC, se queda en tu PC.",
    icono: Lock,
    anchor: "#servicios",
  },
  {
    id: "asesoramiento",
    titulo: "Asesoramiento",
    descripcion:
      "Orientación personalizada para comprar, actualizar o decidir qué te conviene. Sin venderte nada.",
    icono: Compass,
    anchor: "#servicios",
  },
  {
    id: "cryptos",
    titulo: "Cryptos y más",
    descripcion:
      "Asesoría en herramientas digitales emergentes. Te acompaño en lo nuevo.",
    icono: Coins,
    anchor: "#servicios",
  },
  {
    id: "desarrollo-web",
    titulo: "Desarrollo web",
    descripcion:
      "Landing pages y sitios web profesionales. Tu negocio online, rápido y bien hecho.",
    icono: Globe,
    anchor: "#desarrollo-web",
    badge: "NUEVO",
  },
];
