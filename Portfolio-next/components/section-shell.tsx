import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionVariant = "plain" | "muted" | "accent";
type SectionPriority = "primary" | "secondary";

const variantClasses: Record<SectionVariant, string> = {
  plain: "border-y border-border/40",
  muted: "bg-secondary/15 border-y border-border/40",
  accent: "bg-secondary/30 border-y border-border/40",
};

const headingClasses: Record<SectionPriority, string> = {
  primary: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  secondary: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight",
};

type SectionShellProps = {
  id: string;
  variant?: SectionVariant;
  priority?: SectionPriority;
  heading?: string;
  subheading?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  variant = "plain",
  priority = "primary",
  heading,
  subheading,
  className,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
        variantClasses[variant],
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">
        {heading && (
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className={headingClasses[priority]}>{heading}</h2>
            {subheading && (
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {subheading}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
