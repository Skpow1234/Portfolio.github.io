"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { currentLocale, switchLocale } = useLocale();
  const t = getTranslation(currentLocale);

  const SECTION_IDS = useMemo(() => [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "repositories", label: t.nav.repositories },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ], [t.nav]);

  const handleNavClick = (sectionId: string) => {
    console.log('Mobile menu click:', sectionId);
    
    // Close the menu immediately
    setOpen(false);
    
    // Use a longer delay to ensure menu is fully closed
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        console.log('Scrolling to:', sectionId);
        
        // Use window.scrollTo for more reliable scrolling
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top - 80; // Account for header height
        
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        
      } else {
        console.error('Section not found:', sectionId);
      }
    }, 300);
  };

  const handleLanguageChange = (locale: 'en' | 'es') => {
    setOpen(false);
    setTimeout(() => {
      switchLocale(locale);
    }, 300);
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
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
              {SECTION_IDS.map(({ id, label }) => (
                <li key={id}>
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
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                  </button>
                </li>
              ))}
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
                  onClick={() => handleLanguageChange('en')}
                  className="flex-1"
                >
                  EN
                </Button>
                <Button
                  variant={currentLocale === 'es' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange('es')}
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
