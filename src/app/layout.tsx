import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { PageTracker } from "@/components/PageTracker";

const SITE_URL = "https://rodo-s-3-0.vercel.app"; // actualizar a dominio propio cuando esté disponible

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rodo's 3.0 — Soluciones informáticas para el día a día",
    template: "%s | Rodo's 3.0",
  },
  description:
    "Técnico informático con más de 15 años de experiencia en La Plata. Reparación de PC, antivirus, backups, soporte técnico a domicilio y remoto, y desarrollo web profesional.",
  keywords: [
    "técnico informático La Plata",
    "reparación PC La Plata",
    "antivirus La Plata",
    "soporte técnico domicilio",
    "backup recuperación datos",
    "mantenimiento computadoras",
    "desarrollo web La Plata",
    "limpieza PC",
    "soporte remoto",
    "técnico informático a domicilio",
  ],
  authors: [{ name: "Rodrigo — Rodo's 3.0" }],
  creator: "Rodo's 3.0",
  publisher: "Rodo's 3.0",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Rodo's 3.0 — Soluciones informáticas para el día a día",
    description:
      "Técnico informático con más de 15 años de experiencia en La Plata. Reparación de PC, antivirus, backups, soporte a domicilio/remoto y desarrollo web.",
    type: "website",
    locale: "es_AR",
    siteName: "Rodo's 3.0",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Rodo's 3.0 — Técnico informático en La Plata" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodo's 3.0 — Soluciones informáticas para el día a día",
    description:
      "Técnico informático con más de 15 años de experiencia en La Plata. Reparación de PC, antivirus, backups, soporte a domicilio/remoto y desarrollo web.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rodo's 3.0",
  description:
    "Técnico informático con más de 15 años de experiencia. Mantenimiento, reparación de PC, antivirus, backups, soporte técnico y desarrollo web en La Plata y alrededores.",
  url: SITE_URL,
  telephone: "+5492215069677",
  areaServed: [
    { "@type": "City", name: "La Plata" },
    { "@type": "AdministrativeArea", name: "Gran La Plata" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Plata",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://instagram.com/rodorodoporahi",
    "https://instagram.com/rodos3.0",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios informáticos",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mantenimiento y reparación de PC" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eliminación de virus y malware" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backups y recuperación de datos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soporte técnico remoto" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo web profesional" } },
    ],
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "20:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <head>
        <meta name="theme-color" content="#0a1533" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${GeistSans.variable} antialiased`}>
        {/* Skip link para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-brand-dark focus:font-semibold focus:rounded-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        <PageTracker />
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
