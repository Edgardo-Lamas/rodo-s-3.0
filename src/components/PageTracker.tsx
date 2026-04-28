"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  if (typeof window === "undefined") return null;
  let sid = sessionStorage.getItem("rodos_sid");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("rodos_sid", sid);
  }
  return sid;
}

function track(tipo: string, payload?: Record<string, unknown>) {
  const session_id = getSessionId();
  fetch("/api/track", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ tipo, page: window.location.pathname, session_id, payload }),
  }).catch(() => {});
}

export function PageTracker() {
  const pathname    = usePathname();
  const trackedRef  = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === trackedRef.current) return;
    trackedRef.current = pathname;
    // No trackear el panel admin
    if (pathname.startsWith("/admin")) return;
    track("pageview");
  }, [pathname]);

  return null;
}

// Helper exportado para trackear clicks de WhatsApp y descargas desde cualquier componente
export function trackWhatsApp() { track("click_whatsapp"); }
export function trackDescarga(nombre: string) { track("descarga_herramienta", { nombre }); }
