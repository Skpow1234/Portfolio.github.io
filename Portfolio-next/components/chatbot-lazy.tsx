"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";

const Chatbot = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.Chatbot })),
  { ssr: false },
);

export function ChatbotLazy() {
  const [shouldMount, setShouldMount] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);
  const { locale } = useLocaleContext();
  const t = getTranslation(locale);

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
          aria-label={t.chatbot.title}
          title={t.chatbot.title}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return <Chatbot defaultOpen={openOnMount} />;
}
