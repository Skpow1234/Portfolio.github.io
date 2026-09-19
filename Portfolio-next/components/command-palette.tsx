"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brands";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation, type Locale } from "@/lib/i18n";
import {
  getPrimaryNavSections,
  getSecondaryNavSections,
} from "@/lib/navigation-sections";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

export const OPEN_COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}

function buildLocaleHref(pathname: string | null, target: Locale): string {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  if (segments.length === 0) return `/${target}`;
  if (segments[0] === "en" || segments[0] === "es") {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `/${segments.join("/")}`;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocaleContext();
  const t = getTranslation(locale);
  const pathname = usePathname();
  const router = useRouter();

  const navSections = useMemo(
    () => [...getPrimaryNavSections(locale), ...getSecondaryNavSections(locale)],
    [locale],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    window.requestAnimationFrame(action);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-background/80"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.commandPalette.openHint}
        className="absolute left-1/2 top-[14%] z-[121] w-[min(100%-1.5rem,32rem)] -translate-x-1/2 border border-border bg-background shadow-lg"
      >
        <Command label={t.commandPalette.openHint} className="overflow-hidden" loop>
          <Command.Input
            autoFocus
            placeholder={t.commandPalette.placeholder}
            className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Command.List className="max-h-80 overflow-y-auto p-1">
            <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
              {t.commandPalette.empty}
            </Command.Empty>

            <Command.Group
              heading={t.commandPalette.navigation}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {navSections.map((section) => (
                <Command.Item
                  key={section.id}
                  value={`${section.label} ${section.id}`}
                  onSelect={() => runCommand(() => scrollToSection(section.id))}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-muted-foreground",
                    "data-[selected=true]:bg-secondary data-[selected=true]:text-foreground",
                  )}
                >
                  <span className="text-brand">[*]</span>
                  {section.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={t.commandPalette.actions}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              <Command.Item
                value={t.commandPalette.switchToEnglish}
                onSelect={() =>
                  runCommand(() => router.replace(buildLocaleHref(pathname, "en")))
                }
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-muted-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
              >
                EN — {t.commandPalette.switchToEnglish}
              </Command.Item>
              <Command.Item
                value={t.commandPalette.switchToSpanish}
                onSelect={() =>
                  runCommand(() => router.replace(buildLocaleHref(pathname, "es")))
                }
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-muted-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
              >
                ES — {t.commandPalette.switchToSpanish}
              </Command.Item>
              <Command.Item
                value={t.commandPalette.openGithub}
                onSelect={() =>
                  runCommand(() =>
                    window.open("https://github.com/Skpow1234", "_blank", "noopener,noreferrer"),
                  )
                }
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-muted-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
                {t.commandPalette.openGithub}
              </Command.Item>
              <Command.Item
                value={t.commandPalette.openLinkedin}
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      "https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/",
                      "_blank",
                      "noopener,noreferrer",
                    ),
                  )
                }
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm text-muted-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
              >
                <LinkedinIcon className="h-4 w-4" />
                {t.commandPalette.openLinkedin}
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

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
