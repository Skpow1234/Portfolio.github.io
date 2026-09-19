"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Chatbot = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.Chatbot })),
  { ssr: false },
);

export function ChatbotLazy() {
  const [shouldMount, setShouldMount] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  if (!shouldMount) {
    return (
      <div
        className="fixed right-4 z-50"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <Button
          onClick={() => {
            setOpenOnMount(true);
            setShouldMount(true);
          }}
          className="h-12 w-12 border border-border bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
          aria-label="Open Juan AI chatbot"
          title="Juan AI"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            🤖
          </span>
        </Button>
      </div>
    );
  }

  return <Chatbot defaultOpen={openOnMount} />;
}
