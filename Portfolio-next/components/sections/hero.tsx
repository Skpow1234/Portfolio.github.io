import { BriefcaseBusiness, Code2, MapPin, Sparkles } from "lucide-react";
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
      className="relative flex min-h-[80vh] scroll-mt-24 items-center justify-center overflow-hidden px-4 sm:min-h-[88vh] sm:px-6 lg:px-8"
    >
      <div className="relative z-10 w-full max-w-4xl space-y-8 text-left sm:space-y-10">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="mr-2 bg-brand px-1.5 py-0.5 font-bold text-brand-foreground">[*]</span>
            {contractorLabel}
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>
          <h2 className="max-w-3xl text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {t.hero.subtitle}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.description}
          </p>
        </div>

        <div className="grid max-w-3xl grid-cols-1 gap-0 border border-border sm:grid-cols-3">
          {proofPoints.map(({ icon: Icon, label, detail }, index) => (
            <div
              key={label}
              className={`flex items-center gap-3 bg-card px-4 py-3 text-left ${
                index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{label}</p>
                <p className="truncate text-xs text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <RevealOnScroll rootMargin="120px 0px 0px 0px" threshold={0}>
          <HeroInteractive ctaLabel={t.hero.cta} viewWorkLabel={t.hero.viewWork} scrollLabel={t.hero.scrollToExplore}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Cali, Colombia</span>
            </div>
          </HeroInteractive>
        </RevealOnScroll>
      </div>
    </section>
  );
}
