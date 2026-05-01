"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/components/locale-provider';
import { getTranslation } from '@/lib/i18n';
import { Code2, Terminal, Play, X } from 'lucide-react';
import { RevealOnScroll } from '@/components/reveal-on-scroll';

const CodingTerminal = dynamic(
  () => import('@/components/coding-terminal').then((module) => ({ default: module.CodingTerminal })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-xl border border-border/60 bg-secondary/30 sm:h-[600px] lg:h-96" />
    ),
  }
);

export function CodingTerminalSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const featureItems = [
    {
      icon: Terminal,
      label: t.terminal.simulatedOutput,
    },
    {
      icon: Play,
      label: t.terminal.languageCount,
    },
    {
      icon: Code2,
      label: t.terminal.copyDownload,
    },
  ];

  return (
    <section id="coding-terminal" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-7 w-7 text-muted-foreground sm:h-8 sm:w-8" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t.terminal.title}
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.terminal.description}
          </p>
        </RevealOnScroll>

        <RevealOnScroll rootMargin="0px 0px -10% 0px" threshold={0.04}>
          {!isTerminalOpen ? (
            <div className="glass-panel mx-auto max-w-3xl rounded-xl border p-5 text-center sm:p-6">
              <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
                {featureItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="glass-control flex items-center gap-2 rounded-full border px-3 py-1.5">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                className="mt-5 min-w-40"
                onClick={() => setIsTerminalOpen(true)}
              >
                <Code2 className="mr-2 h-4 w-4" />
                {t.terminal.open}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="glass-control"
                  onClick={() => {
                    setIsFullscreen(false);
                    setIsTerminalOpen(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  {t.terminal.close}
                </Button>
              </div>
              <CodingTerminal
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                className="shadow-2xl"
              />
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
