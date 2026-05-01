"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

type ContactSectionClientProps = {
  openFormLabel: string;
  dialogTitle: string;
  emailDirectLabel: string;
};

export function ContactSectionClient({ openFormLabel, dialogTitle, emailDirectLabel }: ContactSectionClientProps) {
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <>
      <Dialog open={openDesktop} onOpenChange={setOpenDesktop}>
        <DialogTrigger asChild>
          <Button size="lg" className="hidden text-lg sm:inline-flex">
            <Mail className="mr-2 h-5 w-5" />
            {openFormLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-panel sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <ContactForm onSuccess={() => setOpenDesktop(false)} />
        </DialogContent>
      </Dialog>

      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerTrigger asChild>
          <Button size="lg" className="w-full text-lg sm:hidden">
            <Mail className="mr-2 h-5 w-5" />
            {openFormLabel}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="glass-panel max-h-[88vh]">
          <DrawerHeader>
            <DrawerTitle>{dialogTitle}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">
            <ContactForm onSuccess={() => setOpenMobile(false)} />
          </div>
        </DrawerContent>
      </Drawer>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <a href="mailto:jfhvjfhv0015@gmail.com" className="underline-offset-2 hover:underline">
          {emailDirectLabel}
        </a>
      </div>
    </>
  );
}
