"use client";

import { ArrowDown, BriefcaseBusiness, Code2, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

export function HeroSection() {
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

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

  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScrollToWork = () => {
    const element = document.getElementById("repositories");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home" className="relative scroll-mt-24 min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="relative z-10 w-full max-w-5xl space-y-6 text-center sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-border/70 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
              aria-label={currentLocale === "en" ? "Open to contractor work only" : "Disponible solo para trabajo como contractor"}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/80" aria-hidden="true" />
              {currentLocale === "en" ? "Open to contractor work only" : "Disponible solo para trabajo como contractor"}
            </Badge>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Juan Hurtado
          </h1>
          <h2 className="mx-auto max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-foreground [text-wrap:balance] sm:text-3xl md:text-4xl lg:text-5xl">
            {t.hero.subtitle}
          </h2>
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
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
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-3 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Button
              variant="default"
              size="lg"
              className="min-w-44 touch-manipulation transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              onClick={handleScrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              {t.hero.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-control min-w-44 touch-manipulation transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:translate-y-0"
              onClick={handleScrollToWork}
            >
              {t.hero.viewWork}
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="text-sm sm:text-base">Cali, Colombia</span>
          </div>
          
          {/* Scroll indicator under Cali, Colombia */}
          <motion.div
            className="cursor-pointer touch-manipulation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={handleScrollToAbout}
            role="button"
            tabIndex={0}
            aria-label={t.hero.scrollToExplore}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollToAbout();
              }
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="text-sm font-medium">
                {t.hero.scrollToExplore}
              </span>
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
