"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Briefcase, ChevronDown, Code2, FolderGit2, GraduationCap, House, Mail, Menu, Terminal, User, Wrench } from "lucide-react";
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

  const PRIMARY_SECTION_IDS = useMemo(
    () => [
      { id: "home", label: t.nav.home, icon: House },
      { id: "about", label: t.nav.about, icon: User },
      { id: "experience", label: t.nav.experience, icon: Briefcase },
      { id: "repositories", label: t.nav.repositories, icon: FolderGit2 },
      { id: "skills", label: t.nav.skills, icon: Wrench },
      { id: "contact", label: t.nav.contact, icon: Mail },
    ],
    [t.nav]
  );
  const SECONDARY_SECTION_IDS = useMemo(
    () => [
      { id: "education", label: t.nav.education, icon: GraduationCap },
      { id: "leetcode", label: t.nav.leetcode, icon: Code2 },
      { id: "coding-terminal", label: "Terminal", icon: Terminal },
    ],
    [t.nav]
  );
  const secondarySectionIdSet = useMemo(
    () => new Set(SECONDARY_SECTION_IDS.map((section) => section.id)),
    [SECONDARY_SECTION_IDS]
  );

  useEffect(() => {
    if (open && secondarySectionIdSet.has(activeId)) {
      setShowMore(true);
    }
  }, [activeId, open, secondarySectionIdSet]);

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
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setShowMore(false);
        }
      }}
    >
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
      <SheetContent side="right" className="glass-panel w-[280px] p-0 sm:w-[350px]">
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
              {PRIMARY_SECTION_IDS.map(({ id, label, icon: Icon }, index) => (
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
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium text-base">{label}</span>
                      </span>
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
                  {SECONDARY_SECTION_IDS.map(({ id, label, icon: Icon }) => (
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
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{label}</span>
                        </span>
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
