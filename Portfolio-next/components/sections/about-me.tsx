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
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">{t.about.paragraph1}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">{t.about.paragraph2}</p>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <Card key={highlight.title} className="p-4 text-center transition-all duration-300 group hover:shadow-lg">
                <highlight.icon className="mx-auto mb-3 h-8 w-8 text-brand transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mb-1 text-sm font-semibold">{highlight.title}</h3>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-2 border-brand/10 bg-gradient-to-br from-brand/5 to-secondary/5 p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-brand" />
              <h3 className="text-xl font-semibold">{t.about.coreStrengths}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">{t.about.backendDevelopment}</h4>
                <div className="flex flex-wrap gap-2">
                  {["Spring Boot", "Node.js", "Go", ".NET"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">{t.about.frontendDevelopment}</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Angular", "TypeScript", "Next.js"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">{t.about.devopsCloud}</h4>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Docker", "Kubernetes", "CI/CD"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
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
