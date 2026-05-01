import React from "react";
import { getTranslation, type Locale } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Code, Rocket, Target } from "lucide-react";

export function AboutMeSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  const highlights = [
    {
      icon: Code,
      title: t.about.yearsExperience,
      description: t.about.softwareDevelopment
    },
    {
      icon: Rocket,
      title: t.about.highPerformance,
      description: t.about.scalableSolutions
    },
    {
      icon: Target,
      title: t.about.resultsDriven,
      description: t.about.measurableOutcomes
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-secondary/20 border-y border-border/40">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.about.paragraph1}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.about.paragraph2}
              </p>
            </div>

            {/* Key highlights */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              {highlights.map((highlight, index) => (
                <div key={highlight.title}>
                  <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 group">
                    <highlight.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-sm mb-1">{highlight.title}</h3>
                    <p className="text-xs text-muted-foreground">{highlight.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Visual element */}
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {t.about.coreStrengths}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      {t.about.backendDevelopment}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Spring Boot', 'Node.js', 'Go', '.NET'].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">
                      {t.about.frontendDevelopment}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Angular', 'TypeScript', 'Next.js'].map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">
                      {t.about.devopsCloud}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['AWS', 'Docker', 'Kubernetes', 'CI/CD'].map((tech) => (
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
        </div>
      </div>
    </section>
  );
} 