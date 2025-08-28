"use client";

import React from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";

export function AboutMeSection() {
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h2>
        <p className="text-lg text-muted-foreground">
          {currentLocale === 'en' 
            ? 'Dedicated and results-driven software engineer with 6 years of experience in software development. Highly skilled in backend development using Spring Boot, Node.js, Go and .NET technologies. Demonstrated capacity for effective teamwork and adaptability to changing project requirements. A self-taught individual who is passionate about continuous learning and staying up-to-date with the latest industry trends and technologies. Committed to delivering high-quality solutions that meet client requirements and exceed expectations. Proven track record of successfully completing projects on time and within budget. A proactive problem-solver with excellent analytical and troubleshooting skills.'
            : 'Ingeniero de software dedicado y orientado a resultados con 6 años de experiencia en desarrollo de software. Altamente capacitado en desarrollo backend usando tecnologías Spring Boot, Node.js, Go y .NET. Capacidad demostrada para el trabajo en equipo efectivo y adaptabilidad a los cambios en los requisitos del proyecto. Un individuo autodidacta que es apasionado por el aprendizaje continuo y mantenerse al día con las últimas tendencias y tecnologías de la industria. Comprometido a entregar soluciones de alta calidad que cumplan con los requisitos del cliente y superen las expectativas. Historial comprobado de completar proyectos exitosamente a tiempo y dentro del presupuesto. Un solucionador de problemas proactivo con excelentes habilidades analíticas y de resolución de problemas.'
          }
        </p>
      </div>
    </section>
  );
} 