import { BriefcaseBusiness, Code2, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslation, type Locale } from "@/lib/i18n";
import { HeroInteractive } from "@/components/sections/hero-interactive";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export function HeroSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);
  const contractorLabel =
    locale === "en" ? "Open to contractor work only" : "Disponible solo para trabajo como contractor";

  const proofPoints = [
    {
      icon: BriefcaseBusiness,
      label: t.hero.proofRole,
      detail: t.hero.proofRoleDetail,
    },
    {
      icon: Sparkles,
      label: t.hero.proofExperience,
      detail: t.hero.proofExperienceDetail,
    },
    {
      icon: Code2,
      label: t.hero.proofFocus,
      detail: t.hero.proofFocusDetail,
    },
  ];

  return (
    <section
      id="home"
      className="relative scroll-mt-24 min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-5xl space-y-6 text-center sm:space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-border/70 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
              aria-label={contractorLabel}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/80" aria-hidden="true" />
              {contractorLabel}
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Juan Hurtado
          </h1>
          <h2 className="mx-auto max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-foreground [text-wrap:balance] sm:text-3xl md:text-4xl lg:text-5xl">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.hero.description}</p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {proofPoints.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="glass-control flex items-center gap-3 rounded-xl border px-4 py-3 text-left"
            >
              <Icon className="h-4 w-4 shrink-0 text-foreground/80" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{label}</p>
                <p className="truncate text-xs text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <RevealOnScroll rootMargin="120px 0px 0px 0px" threshold={0}>
          <HeroInteractive ctaLabel={t.hero.cta} viewWorkLabel={t.hero.viewWork} scrollLabel={t.hero.scrollToExplore}>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-sm sm:text-base">Cali, Colombia</span>
            </div>
          </HeroInteractive>
        </RevealOnScroll>
      </div>
    </section>
  );
}
