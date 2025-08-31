"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const SECTION_IDS = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
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
      <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-accent hover:scale-105 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
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
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-accent hover:scale-[1.02] active:scale-[0.98] ${
                        activeId === id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{label}</span>
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
          <div className="p-6 border-t">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {currentLocale === 'en' ? 'Language' : 'Idioma'}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={currentLocale === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    // Handle language change
                  }}
                  className="flex-1"
                >
                  EN
                </Button>
                <Button
                  variant={currentLocale === 'es' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    // Handle language change
                  }}
                  className="flex-1"
                >
                  ES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
