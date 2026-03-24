"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-24 right-4 z-[60] transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleClick}
        aria-label="Back to top"
        className="h-10 w-10 rounded-full border-border/70 bg-background/90 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:shadow-md"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
