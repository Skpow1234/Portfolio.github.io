"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? header.offsetHeight + 8 : 88;
}

function isScrollSpyPaused(): boolean {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) return false;
  return Boolean(active.closest("select, input, textarea, [contenteditable='true']"));
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("home");
  const sectionIdsRef = useRef(sectionIds);
  sectionIdsRef.current = sectionIds;
  const pendingClickRef = useRef<string | null>(null);

  const selectSection = useCallback((sectionId: string) => {
    pendingClickRef.current = sectionId;
    setActiveSection(sectionId);
    window.setTimeout(() => {
      if (pendingClickRef.current === sectionId) {
        pendingClickRef.current = null;
      }
    }, 800);
  }, []);

  useEffect(() => {
    let frame = 0;
    let headerOffset = getHeaderOffset();

    const updateFromScroll = () => {
      frame = 0;
      if (pendingClickRef.current || isScrollSpyPaused()) return;

      const ids = sectionIdsRef.current;
      let current = ids[0] ?? "home";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - headerOffset <= 48) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFromScroll);
    };

    const onResize = () => {
      headerOffset = getHeaderOffset();
      onScroll();
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds.join("|")]);

  return { activeSection, selectSection };
}
