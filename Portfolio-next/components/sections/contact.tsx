"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function ContactSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Let's Connect</h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 text-lg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="text-lg w-full sm:w-auto">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send me a message</DialogTitle>
            </DialogHeader>
            <ContactForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <a href="mailto:juan@example.com" className="underline-offset-2 hover:underline">Email directly</a>
        </div>
      </div>
    </section>
  );
}