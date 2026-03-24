"use client";

import { Card } from "@/components/ui/card";
import { education } from "@/lib/data/education";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

const sectionMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

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
            <motion.div
              key={index}
              initial={sectionMotion.initial}
              whileInView={sectionMotion.whileInView}
              viewport={sectionMotion.viewport}
              transition={{ ...sectionMotion.transition, delay: index * 0.08 }}
            >
              <Card className="p-6 transform transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-muted-foreground">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.period}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}