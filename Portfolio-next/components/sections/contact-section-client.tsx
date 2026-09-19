"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brands";

type ContactSectionClientProps = {
  linkedinLabel: string;
  githubLabel: string;
};

export function ContactSectionClient({
  linkedinLabel,
  githubLabel,
}: ContactSectionClientProps) {
  return (
    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <Button size="lg" className="text-lg" asChild>
        <a
          href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="mr-2 h-5 w-5" />
          {linkedinLabel}
        </a>
      </Button>
      <Button size="lg" variant="outline" className="text-lg" asChild>
        <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer">
          <GithubIcon className="mr-2 h-5 w-5" />
          {githubLabel}
        </a>
      </Button>
    </div>
  );
}
