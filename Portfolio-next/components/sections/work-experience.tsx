"use client";

import { Card } from "@/components/ui/card";
import { workExperience } from "@/lib/data/work-experience";

import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";

export function WorkExperienceSection() {
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t.experience.title}
        </h2>
        <div className="space-y-6">
          {workExperience.map((experience, index) => (
            <div key={index} className="animate-fade-in">
              <Card className="p-6 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <p className="text-muted-foreground mb-1">{experience.company}</p>
                <p className="text-sm text-muted-foreground mb-3">{experience.period}</p>
                {experience.description && (
                  <p className="mb-3 text-base text-foreground">{experience.description}</p>
                )}
                {experience.skills && experience.skills.length > 0 && (
                  <div className="mb-2">
                    <span className="font-semibold">
                      {currentLocale === 'en' ? 'Skills: ' : 'Habilidades: '}
                    </span>
                    <span className="text-sm text-muted-foreground">{experience.skills.join(", ")}</span>
                  </div>
                )}
                {experience.methodologies && experience.methodologies.length > 0 && (
                  <div>
                    <span className="font-semibold">
                      {currentLocale === 'en' ? 'Methodologies: ' : 'Metodologías: '}
                    </span>
                    <span className="text-sm text-muted-foreground">{experience.methodologies.join(", ")}</span>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}