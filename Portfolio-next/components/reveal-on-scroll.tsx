"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Passed to `IntersectionObserver` (e.g. start animation slightly before entering viewport). */
  rootMargin?: string;
  /** 0–1; fraction of the target that must be visible to trigger. */
  threshold?: number;
};

/**
 * Fades/slides content in when it enters the viewport. Uses a single IntersectionObserver
 * (no animation runtime beyond CSS transitions). Respects `prefers-reduced-motion`.
 */
export function RevealOnScroll({
  children,
  className,
  rootMargin = "0px 0px -6% 0px",
  threshold = 0.08,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveal = () => setVisible(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
