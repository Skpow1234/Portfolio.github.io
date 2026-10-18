"use client";

import { useEffect, useState } from "react";
import { useLocaleContext } from "@/components/locale-provider";
import { openCommandPalette } from "@/components/command-palette-events";
import { getTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const { locale } = useLocaleContext();
  const t = getTranslation(locale);
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    setShortcut(isMac ? "⌘K" : "Ctrl K");
  }, []);

  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      className={cn(
        "hidden items-center gap-2 border border-border px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground md:inline-flex",
        className,
      )}
      aria-label={t.commandPalette.openHint}
    >
      <span className="sr-only sm:not-sr-only sm:inline">{t.commandPalette.openHint}</span>
      <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px]">{shortcut}</kbd>
    </button>
  );
}
