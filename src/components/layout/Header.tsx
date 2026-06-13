"use client";

import { useState, useEffect } from "react";
import { X, Menu, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Desarrollo web", href: "#desarrollo-web", mdHidden: true },
  { label: "Red Familiar", href: "#red-familiar", mdHidden: true },
  { label: "Herramientas gratis", href: "#herramientas", mdHidden: true },
  { label: "Proceso", href: "#proceso", mdHidden: true },
  { label: "FAQs", href: "#faqs" },
  { label: "Contacto", href: "#contacto" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-brand-dark/80 border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <a
              href="#"
              className="text-xl sm:text-2xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              aria-label="Rodo's 3.0 — Inicio"
            >
              <span className="text-white">Rodo&apos;s </span>
              <span className="text-brand-orange">3.0</span>
            </a>

            {/* Nav desktop */}
            <nav
              role="navigation"
              aria-label="Navegación principal"
              className="hidden md:flex items-center gap-6 lg:gap-8"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded${link.mdHidden ? " hidden lg:block" : ""} ${isActive ? "text-brand-orange" : "text-gray-300 hover:text-brand-blue"}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA WhatsApp desktop */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="hidden md:inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-white hover:text-brand-blue transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <nav
          role="navigation"
          aria-label="Navegación móvil"
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-brand-dark flex flex-col pt-20 pb-8 px-8 shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-2 flex-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-lg font-medium text-gray-200 hover:text-brand-blue py-3 border-b border-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            aria-label="Contactar por WhatsApp"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Escribime por WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
