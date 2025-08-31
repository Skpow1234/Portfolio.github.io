"use client";

import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

export function HeroSection() {
  const [open, setOpen] = useState(false);
  const { currentLocale } = useLocale();
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-secondary/30 rounded-full"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-1 h-1 bg-accent/40 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="text-center space-y-6 sm:space-y-8 max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {currentLocale === 'en' 
              ? 'Juan Hurtado'
              : 'Juan Hurtado'
            }
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {currentLocale === 'en' 
              ? 'Senior Software Engineer who ships reliable, performant platforms'
              : 'Ingeniero de Software Senior que entrega plataformas confiables y de alto rendimiento'
            }
          </h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentLocale === 'en'
              ? 'Focused on Go, Node.js, Dotnet and Java, delivering measurable outcomes like faster delivery, lower latency, and resilient systems.'
              : 'Enfocado en Go, Node.js, Dotnet y Java, entregando resultados medibles como entrega más rápida, menor latencia y sistemas resilientes.'
            }
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
                  {currentLocale === 'en' ? 'Send me a message' : 'Envíame un mensaje'}
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
            aria-label={currentLocale === 'en' ? 'Scroll to about section' : 'Desplázate a la sección acerca de'}
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
                {currentLocale === 'en' ? 'Scroll to explore' : 'Desplázate para explorar'}
              </span>
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}