import { Card } from "@/components/ui/card";
import { education } from "@/lib/data/education";
import { getTranslation, type Locale } from "@/lib/i18n";
import { SectionShell } from "@/components/section-shell";

export function EducationSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <SectionShell id="education" variant="muted" priority="secondary" heading={t.education.title}>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card
            key={`${edu.institution}-${edu.degree}-${edu.period}-${index}`}
            className="p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">{edu.institution}</h3>
            <p className="text-muted-foreground">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">{edu.period}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
