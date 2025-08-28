"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";

export function ContactSection() {
  const [open, setOpen] = useState(false);
  const { currentLocale } = useLocale();
  const t = getTranslation(currentLocale);

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          {currentLocale === 'en' ? "Let's Connect" : "Conectemos"}
        </h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 text-lg">
          {currentLocale === 'en'
            ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
            : "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones."
          }
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="text-lg w-full sm:w-auto">
              <Mail className="mr-2 h-5 w-5" />
              {currentLocale === 'en' ? 'Get In Touch' : 'Ponte en Contacto'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentLocale === 'en' ? 'Send me a message' : 'Envíame un mensaje'}
              </DialogTitle>
            </DialogHeader>
            <ContactForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <a href="mailto:juan@example.com" className="underline-offset-2 hover:underline">
            {currentLocale === 'en' ? 'Email directly' : 'Enviar email directamente'}
          </a>
        </div>
      </div>
    </section>
  );
}