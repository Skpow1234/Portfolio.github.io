"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AboutMeSection } from "./about-me";

export function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 sm:space-y-6 max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
          Hi, I'm <span className="text-primary bg-clip-text">Juan Hurtado</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Senior Software Engineer specializing in building exceptional digital experiences
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="https://github.com/Skpow1234" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Send me a message</DialogTitle>
              </DialogHeader>
              <ContactForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground pt-2">
          <MapPin className="h-5 w-5" />
          <span className="text-sm sm:text-base">Cali, Colombia</span>
        </div>
      </div>
    </section>
  );
}