"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/command-palette-events";

export function CommandPaletteHost() {
  const shouldOpen = useRef(false);
  const [Palette, setPalette] = useState<ComponentType<{ initialOpen?: boolean }> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      void import("@/components/command-palette").then((mod) => {
        if (!cancelled) setPalette(() => mod.CommandPalette);
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        shouldOpen.current = true;
        load();
      }
    };

    const onOpen = () => {
      shouldOpen.current = true;
      load();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);

    const timeoutId = window.setTimeout(load, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    };
  }, []);

  if (!Palette) return null;
  return <Palette initialOpen={shouldOpen.current} />;
}
