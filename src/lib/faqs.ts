export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
}

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    pregunta: "¿Trabajás solo con empresas o también con usuarios particulares?",
    respuesta:
      "Ambos. Atiendo tanto a usuarios domésticos como a profesionales y pequeñas empresas. El trato es el mismo: personalizado y directo.",
  },
  {
    id: "faq-2",
    pregunta: "¿Tengo que llevar la PC o vas vos?",
    respuesta:
      "Como vos prefieras. Voy a tu casa u oficina si estás en la zona de La Plata, o lo resolvemos de forma remota si es posible. Lo charlamos antes.",
  },
  {
    id: "faq-3",
    pregunta: "¿Atendés fuera de La Plata?",
    respuesta:
      "A domicilio trabajo en La Plata y alrededores. Para otras zonas, muchas cosas las puedo resolver de forma remota sin que tengas que moverte.",
  },
  {
    id: "faq-4",
    pregunta: "¿Cuánto cuesta una reparación o una web?",
    respuesta:
      "Depende de lo que necesites. Por eso primero charlamos por WhatsApp, vemos tu caso puntual, y te paso un presupuesto claro antes de empezar. Sin sorpresas.",
  },
  {
    id: "faq-5",
    pregunta: "¿Mi información está segura?",
    respuesta:
      "Totalmente. La confidencialidad es parte del servicio. Lo que encuentro en tu equipo o en tus archivos queda entre vos y yo, siempre.",
  },
  {
    id: "faq-6",
    pregunta: "¿Hacen falta 'cosas técnicas' que yo no entiendo?",
    respuesta:
      "No. Te explico todo en lenguaje común, sin tecnicismos. Mi trabajo es resolverte el problema, no hacerte sentir perdido.",
  },
  {
    id: "faq-7",
    pregunta: "¿Hacen mantenimiento continuo o solo arreglos puntuales?",
    respuesta:
      "Las dos cosas. Podemos hacer una intervención puntual, o acordar mantenimiento periódico para que tu equipo (o tu web) esté siempre al día.",
  },
  {
    id: "faq-8",
    pregunta: "¿Cómo empezamos?",
    respuesta:
      "Me escribís por WhatsApp al 2215069677 contándome qué te está pasando. Yo te respondo, charlamos, y vemos el próximo paso. No hay compromiso hasta que te cierre todo.",
  },
];
