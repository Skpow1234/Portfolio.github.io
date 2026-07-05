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
    const updateFromScroll = () => {
      if (pendingClickRef.current || isScrollSpyPaused()) return;

      const offset = getHeaderOffset();
      const ids = sectionIdsRef.current;
      let current = ids[0] ?? "home";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top - offset;
        if (top <= 48) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (pendingClickRef.current || isScrollSpyPaused()) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${Math.round(getHeaderOffset())}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const observeSections = () => {
      sectionIdsRef.current.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
      updateFromScroll();
    };

    const timeoutId = window.setTimeout(observeSections, 100);
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateFromScroll);
      observer.disconnect();
    };
  }, [sectionIds.join("|")]);

  return { activeSection, selectSection };
}
