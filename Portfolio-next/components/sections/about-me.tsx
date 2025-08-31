"use client";

import React from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Code, Rocket, Target } from "lucide-react";

export function AboutMeSection() {
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const highlights = [
    {
      icon: Code,
      title: currentLocale === 'en' ? '6+ Years Experience' : '6+ Años de Experiencia',
      description: currentLocale === 'en' ? 'Full-stack development' : 'Desarrollo full-stack'
    },
    {
      icon: Rocket,
      title: currentLocale === 'en' ? 'High Performance' : 'Alto Rendimiento',
      description: currentLocale === 'en' ? 'Scalable solutions' : 'Soluciones escalables'
    },
    {
      icon: Target,
      title: currentLocale === 'en' ? 'Results Driven' : 'Orientado a Resultados',
      description: currentLocale === 'en' ? 'Measurable outcomes' : 'Resultados medibles'
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t.about.title}
          </h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content */}
          <div className="space-y-6 animate-fade-in-delay">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {currentLocale === 'en' 
                  ? 'Dedicated and results-driven software engineer with 6 years of experience in software development. Highly skilled in backend development using Spring Boot, Node.js, Go and .NET technologies. Demonstrated capacity for effective teamwork and adaptability to changing project requirements.'
                  : 'Ingeniero de software dedicado y orientado a resultados con 6 años de experiencia en desarrollo de software. Altamente capacitado en desarrollo backend usando tecnologías Spring Boot, Node.js, Go y .NET. Capacidad demostrada para el trabajo en equipo efectivo y adaptabilidad a los cambios en los requisitos del proyecto.'
                }
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {currentLocale === 'en'
                  ? 'A self-taught individual who is passionate about continuous learning and staying up-to-date with the latest industry trends and technologies. Committed to delivering high-quality solutions that meet client requirements and exceed expectations.'
                  : 'Un individuo autodidacta que es apasionado por el aprendizaje continuo y mantenerse al día con las últimas tendencias y tecnologías de la industria. Comprometido a entregar soluciones de alta calidad que cumplan con los requisitos del cliente y superen las expectativas.'
                }
              </p>
            </div>

            {/* Key highlights */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              {highlights.map((highlight, index) => (
                <div key={highlight.title} className="animate-fade-in-delay-2">
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
          <div className="relative animate-fade-in-delay-2">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {currentLocale === 'en' ? 'Core Strengths' : 'Fortalezas Principales'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      {currentLocale === 'en' ? 'Backend Development' : 'Desarrollo Backend'}
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
                      {currentLocale === 'en' ? 'Frontend Development' : 'Desarrollo Frontend'}
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
                      {currentLocale === 'en' ? 'DevOps & Cloud' : 'DevOps y Cloud'}
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