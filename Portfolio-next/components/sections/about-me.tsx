import { getTranslation, type Locale } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Code, Rocket, Target } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

export function AboutMeSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  const highlights = [
    {
      icon: Code,
      title: t.about.yearsExperience,
      description: t.about.softwareDevelopment,
    },
    {
      icon: Rocket,
      title: t.about.highPerformance,
      description: t.about.scalableSolutions,
    },
    {
      icon: Target,
      title: t.about.resultsDriven,
      description: t.about.measurableOutcomes,
    },
  ];

  return (
    <SectionShell id="about" variant="muted" priority="primary" heading={t.about.title}>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="max-w-none space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.about.paragraph1}</p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.about.paragraph2}</p>
          </div>

          <div className="grid gap-0 border border-border sm:grid-cols-3">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`bg-card p-4 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
              >
                <highlight.icon className="mb-3 h-5 w-5 text-brand-foreground" />
                <h3 className="mb-1 text-sm font-semibold">{highlight.title}</h3>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="border border-border p-6 shadow-none">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">{t.about.coreStrengths}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">{t.about.backendDevelopment}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Spring Boot", "Node.js", "Go", ".NET"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-none text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">{t.about.frontendDevelopment}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Angular", "TypeScript", "Next.js"].map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-none text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">{t.about.devopsCloud}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["AWS", "Docker", "Kubernetes", "CI/CD"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-none text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
