"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

type HeroInteractiveProps = {
  ctaLabel: string;
  viewWorkLabel: string;
  scrollLabel: string;
  children: ReactNode;
};

export function HeroInteractive({ ctaLabel, viewWorkLabel, scrollLabel, children }: HeroInteractiveProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 pt-2 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both delay-[400ms]">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <Button
            variant="default"
            size="lg"
            className="min-w-44 touch-manipulation transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            onClick={() => scrollToId("contact")}
          >
            <Mail className="mr-2 h-5 w-5" />
            {ctaLabel}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass-control min-w-44 touch-manipulation transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:translate-y-0"
            onClick={() => scrollToId("repositories")}
          >
            {viewWorkLabel}
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 pt-4 animate-in fade-in duration-700 fill-mode-both delay-[600ms]">
        {children}

        <div
          className="cursor-pointer touch-manipulation animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-1000"
          onClick={() => scrollToId("about")}
          role="button"
          tabIndex={0}
          aria-label={scrollLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToId("about");
            }
          }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground motion-reduce:animate-none animate-hero-scroll-nudge">
            <span className="text-sm font-medium">{scrollLabel}</span>
            <ArrowDown className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
}
