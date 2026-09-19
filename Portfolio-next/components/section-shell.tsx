import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionVariant = "plain" | "muted" | "accent";
type SectionPriority = "primary" | "secondary";

const variantClasses: Record<SectionVariant, string> = {
  plain: "border-y border-border",
  muted: "border-y border-border bg-secondary/50",
  accent: "border-y border-border bg-card",
};

const headingClasses: Record<SectionPriority, string> = {
  primary: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight",
  secondary: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight",
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
        "scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8",
        variantClasses[variant],
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        {heading && (
          <div className="mb-8 text-left sm:mb-10">
            <h2 className={headingClasses[priority]}>{heading}</h2>
            {subheading && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
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
