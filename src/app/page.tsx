import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import SobreRodrigo from "@/components/sections/SobreRodrigo";
import DesarrolloWeb from "@/components/sections/DesarrolloWeb";
import RedFamiliar from "@/components/sections/RedFamiliar";
import HerramientasGratuitas from "@/components/sections/HerramientasGratuitas";
import Proceso from "@/components/sections/Proceso";
import FAQs from "@/components/sections/FAQs";
import Contacto from "@/components/sections/Contacto";
import { FAQS } from "@/lib/faqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.pregunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.respuesta,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Hero />
        <Servicios />
        <SobreRodrigo />
        <DesarrolloWeb />
        <RedFamiliar />
        <HerramientasGratuitas />
        <Proceso />
        <FAQs />
        <Contacto />
      </main>
    </>
  );
}
