"use client";

import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useLocaleContext } from "@/components/locale-provider";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

export function HeroSection() {
  const [open, setOpen] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="relative scroll-mt-24 min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="text-center space-y-6 sm:space-y-8 max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Juan Hurtado
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t.hero.subtitle}
          </h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.description}
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto group hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg touch-manipulation" 
            asChild
          >
            <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              GitHub
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto group hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg touch-manipulation" 
            asChild
          >
            <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
              <Linkedin className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              LinkedIn
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto group hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg touch-manipulation"
              >
                <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                {t.nav.contact}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {t.contact.sendMessage}
                </DialogTitle>
              </DialogHeader>
              <ContactForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="text-sm sm:text-base">Cali, Colombia</span>
          </div>
          
          {/* Scroll indicator under Cali, Colombia */}
          <motion.div
            className="cursor-pointer touch-manipulation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={handleScrollToAbout}
            onTouchStart={(e) => e.preventDefault()}
            role="button"
            tabIndex={0}
            aria-label={t.hero.scrollToExplore}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollToAbout();
              }
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="text-sm font-medium">
                {t.hero.scrollToExplore}
              </span>
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}