"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chatbot = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.Chatbot })),
  { ssr: false }
);

export function ChatbotLazy() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;

    const mount = () => setShouldMount(true);
    const idleId = window.requestIdleCallback?.(mount, { timeout: 3500 });
    const fallbackId = window.setTimeout(mount, 4500);
    const events: Array<keyof WindowEventMap> = ["keydown", "pointermove", "scroll", "touchstart"];

    events.forEach((eventName) => {
      window.addEventListener(eventName, mount, { once: true, passive: true });
    });

    return () => {
      if (idleId !== undefined) {
        window.cancelIdleCallback?.(idleId);
      }
      window.clearTimeout(fallbackId);
      events.forEach((eventName) => {
        window.removeEventListener(eventName, mount);
      });
    };
  }, [shouldMount]);

  if (!shouldMount) return null;

  return <Chatbot />;
}
