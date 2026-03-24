"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { useLocaleContext } from "@/components/locale-provider";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const { switchLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const PRIMARY_SECTION_IDS = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "repositories", label: t.nav.repositories },
    { id: "skills", label: t.nav.skills },
    { id: "contact", label: t.nav.contact },
  ];
  const SECONDARY_SECTION_IDS = [
    { id: "leetcode", label: t.nav.leetcode },
    { id: "coding-terminal", label: "Terminal" },
    { id: "education", label: t.nav.education },
  ];

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-11 w-11 md:hidden p-0 hover:bg-accent hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div>
              <SheetTitle>
                {currentLocale === 'en' ? 'Navigation' : 'Navegación'}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {currentLocale === 'en'
                  ? 'Select a section to navigate the portfolio'
                  : 'Selecciona una sección para navegar el portafolio'}
              </SheetDescription>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6" role="navigation" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {PRIMARY_SECTION_IDS.map(({ id, label }, index) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleNavClick(id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      activeId === id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    aria-current={activeId === id ? 'page' : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-base">{label}</span>
                      {activeId === id && (
                        <span className="h-2 w-2 rounded-full bg-primary-foreground" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 border-t border-border/60 pt-4">
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={showMore}
              >
                <span>{currentLocale === "en" ? "More sections" : "Más secciones"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {showMore && (
                <ul className="mt-2 space-y-1">
                  {SECONDARY_SECTION_IDS.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => handleNavClick(id)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          activeId === id
                            ? "bg-primary/20 text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                        aria-current={activeId === id ? "page" : undefined}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              {currentLocale === 'en' ? 'Language' : 'Idioma'}
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentLocale === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  switchLocale('en');
                  setOpen(false);
                }}
                className="h-11 flex-1"
                aria-label="Switch to English"
              >
                EN
              </Button>
              <Button
                variant={currentLocale === 'es' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  switchLocale('es');
                  setOpen(false);
                }}
                className="h-11 flex-1"
                aria-label="Cambiar a Español"
              >
                ES
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="pt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="h-11 w-full"
                onClick={() => {
                  handleNavClick('contact');
                }}
              >
                {t.nav.contact}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
