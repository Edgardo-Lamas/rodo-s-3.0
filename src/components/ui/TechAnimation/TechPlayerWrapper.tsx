"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const TechPlayer = dynamic(() => import("./TechPlayer"), { ssr: false });

const Placeholder = () => (
  <div
    className="w-full aspect-[560/640] rounded-3xl bg-[#0c1b33] border border-white/10"
    aria-hidden="true"
  />
);

export default function TechPlayerWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Servidor y primer render de cliente devuelven lo mismo → sin hydration mismatch */
  if (!mounted) return <Placeholder />;

  return <TechPlayer />;
}
