"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLocaleContext } from "@/components/locale-provider";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const { switchLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const SECTION_IDS = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "coding-terminal", label: "Terminal" },
    { id: "repositories", label: t.nav.repositories },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
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
          className="md:hidden p-2 hover:bg-accent hover:scale-105 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">
              {currentLocale === 'en' ? 'Navigation' : 'Navegación'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-accent"
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6" role="navigation" aria-label="Mobile navigation">
            <ul className="space-y-3">
              <AnimatePresence>
                {SECTION_IDS.map(({ id, label }, index) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(id)}
                      className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 hover:bg-accent hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        activeId === id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={activeId === id ? 'page' : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-base">{label}</span>
                        {activeId === id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 bg-primary-foreground rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
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
                className="flex-1"
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
                className="flex-1"
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
                className="w-full"
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
