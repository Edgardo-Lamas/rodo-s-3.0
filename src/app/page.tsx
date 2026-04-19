import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import SobreRodrigo from "@/components/sections/SobreRodrigo";
import DesarrolloWeb from "@/components/sections/DesarrolloWeb";
import HerramientasGratuitas from "@/components/sections/HerramientasGratuitas";
import Proceso from "@/components/sections/Proceso";
import FAQs from "@/components/sections/FAQs";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <main>
      <Hero />
      <Servicios />
      <SobreRodrigo />
      <DesarrolloWeb />
      <HerramientasGratuitas />
      <Proceso />
      <FAQs />
      <Contacto />
    </main>
  );
}
