"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const HIDDEN_REVEAL_CLASS =
  "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100";
const VISIBLE_REVEAL_CLASS = "translate-y-0 opacity-100";
const REVEAL_TRANSITION_CLASS =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out";

export type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
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
        REVEAL_TRANSITION_CLASS,
        visible ? VISIBLE_REVEAL_CLASS : HIDDEN_REVEAL_CLASS,
        className,
      )}
    >
      {children}
    </div>
  );
}

export type RevealOnScrollGroupProps = {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
};

/**
 * Reveals each child independently with one shared IntersectionObserver instance.
 */
export function RevealOnScrollGroup({
  children,
  rootMargin = "0px 0px -6% 0px",
  threshold = 0.08,
}: RevealOnScrollGroupProps) {
  const childCount = Children.count(children);
  const items = Children.toArray(children);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => Array(childCount).fill(false));

  useEffect(() => {
    setVisible(Array(childCount).fill(false));
    itemRefs.current = itemRefs.current.slice(0, childCount);
  }, [childCount]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealAll = () => setVisible(Array(childCount).fill(true));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          let changed = false;
          const next = [...prev];
          for (const entry of entries) {
            const idx = Number((entry.target as HTMLElement).dataset.revealIndex);
            if (Number.isNaN(idx) || !entry.isIntersecting || next[idx]) continue;
            next[idx] = true;
            changed = true;
            obs.unobserve(entry.target);
          }
          return changed ? next : prev;
        });
      },
      { root: null, rootMargin, threshold },
    );

    itemRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [childCount, rootMargin, threshold]);

  return (
    <>
      {items.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          data-reveal-index={index}
          className={cn(
            REVEAL_TRANSITION_CLASS,
            visible[index] ? VISIBLE_REVEAL_CLASS : HIDDEN_REVEAL_CLASS,
          )}
        >
          {child}
        </div>
      ))}
    </>
  );
}
