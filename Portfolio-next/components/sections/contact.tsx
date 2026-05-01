import { getTranslation, type Locale } from "@/lib/i18n";
import { ContactSectionClient } from "@/components/sections/contact-section-client";

export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/40">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t.contact.heading}</h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 text-lg">{t.contact.intro}</p>
        <ContactSectionClient
          openFormLabel={t.contact.openForm}
          dialogTitle={t.contact.sendMessage}
          emailDirectLabel={t.contact.emailDirect}
        />
      </div>
    </section>
  );
}
