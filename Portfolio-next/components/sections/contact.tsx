import { getTranslation, type Locale } from "@/lib/i18n";
import { ContactSectionClient } from "@/components/sections/contact-section-client";
import { SectionShell } from "@/components/section-shell";

export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <SectionShell
      id="contact"
      variant="accent"
      priority="primary"
      heading={t.contact.heading}
      subheading={t.contact.intro}
      className="max-w-none"
    >
      <div className="mx-auto max-w-2xl text-center">
        <ContactSectionClient
          openFormLabel={t.contact.openForm}
          dialogTitle={t.contact.sendMessage}
          emailDirectLabel={t.contact.emailDirect}
          formLabels={t.contact.form}
        />
      </div>
    </SectionShell>
  );
}
