"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

  const handleNavClick = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2 h-9 w-9"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <div className="fixed inset-y-0 left-0 h-full w-[280px] sm:w-[350px] bg-background border-r shadow-lg z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Navigation Items */}
            <nav className="flex-1 p-6">
              <ul className="space-y-2">
                {SECTION_IDS.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => handleNavClick(id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        activeId === id 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Footer */}
            <div className="p-6 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-9 w-9 p-0"
                >
                  <a 
                    href="https://github.com/Skpow1234" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-9 w-9 p-0"
                >
                  <a 
                    href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetPortal>
    </Sheet>
  );
}
