"use client";

import { Card } from "@/components/ui/card";
import { education } from "@/lib/data/education";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";

export function EducationSection() {
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t.education.title}
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <p className="text-muted-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}