"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

const sectionMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function ContactSection() {
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/40">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={sectionMotion.initial}
        whileInView={sectionMotion.whileInView}
        viewport={sectionMotion.viewport}
        transition={sectionMotion.transition}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          {currentLocale === 'en' ? "Let's Connect" : "Conectemos"}
        </h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 text-lg">
          {currentLocale === 'en'
            ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
            : "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones."
          }
        </p>
        <Dialog open={openDesktop} onOpenChange={setOpenDesktop}>
          <DialogTrigger asChild>
            <Button size="lg" className="hidden text-lg sm:inline-flex">
              <Mail className="mr-2 h-5 w-5" />
              {currentLocale === 'en' ? 'Get In Touch' : 'Ponte en Contacto'}
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentLocale === 'en' ? 'Send me a message' : 'Envíame un mensaje'}
              </DialogTitle>
            </DialogHeader>
            <ContactForm onSuccess={() => setOpenDesktop(false)} />
          </DialogContent>
        </Dialog>

        <Drawer open={openMobile} onOpenChange={setOpenMobile}>
          <DrawerTrigger asChild>
            <Button size="lg" className="w-full text-lg sm:hidden">
              <Mail className="mr-2 h-5 w-5" />
              {currentLocale === 'en' ? 'Get In Touch' : 'Ponte en Contacto'}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="glass-panel max-h-[88vh]">
            <DrawerHeader>
              <DrawerTitle>
                {currentLocale === 'en' ? 'Send me a message' : 'Envíame un mensaje'}
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-4">
              <ContactForm onSuccess={() => setOpenMobile(false)} />
            </div>
          </DrawerContent>
        </Drawer>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <a href="mailto:jfhvjfhv0015@gmail.com" className="underline-offset-2 hover:underline">
            {currentLocale === 'en' ? 'Email directly' : 'Enviar email directamente'}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
