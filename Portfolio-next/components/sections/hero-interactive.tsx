"use client";

import { ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brands";
import type { ReactNode } from "react";

type HeroInteractiveProps = {
  ctaLabel: string;
  viewWorkLabel: string;
  scrollLabel: string;
  children: ReactNode;
};

export function HeroInteractive({ ctaLabel, viewWorkLabel, scrollLabel, children }: HeroInteractiveProps) {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-3 pt-1">
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Button
            variant="default"
            size="lg"
            className="min-w-44 touch-manipulation"
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="mr-2 h-4 w-4" />
            {ctaLabel}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-44 touch-manipulation"
            onClick={() => scrollToSection("repositories")}
          >
            {viewWorkLabel}
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
              <GithubIcon className="mr-2 h-4 w-4" />
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
              <LinkedinIcon className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 pt-2">
        {children}

        <button
          type="button"
          className="cursor-pointer touch-manipulation text-left"
          onClick={() => scrollToSection("about")}
          aria-label={scrollLabel}
        >
          <div className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground motion-safe:animate-hero-scroll-nudge motion-reduce:animate-none">
            <span className="text-sm font-medium">{scrollLabel}</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </button>
      </div>
    </>
  );
}
