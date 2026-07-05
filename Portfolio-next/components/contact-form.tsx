"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactSchema, ContactFormData } from "@/lib/validation/contact";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { z } from "zod";

export type ContactFormLabels = {
  name: string;
  email: string;
  subject: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successTitle: string;
  successDescription: string;
  errorTitle: string;
  errorDescription: string;
  loadingDescription: string;
};

interface ContactFormProps {
  labels: ContactFormLabels;
  onSuccess?: () => void;
}

type FormState = ContactFormData & { website?: string };

export function ContactForm({ labels, onSuccess }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSubmitError(null);

    const extendedSchema = ContactSchema.extend({ website: z.string().max(0, "Spam detected") });
    const parseResult = extendedSchema.safeParse(formData);
    if (!parseResult.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      const errorsObj = parseResult.error.flatten().fieldErrors;
      for (const key of Object.keys(errorsObj) as Array<keyof typeof errorsObj>) {
        const err = errorsObj[key];
        if (err && err.length > 0) fieldErrors[key as keyof FormState] = err[0];
      }
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: labels.successTitle,
        description: labels.successDescription,
      });
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      onSuccess?.();
    } catch {
      setSubmitError(labels.errorDescription);
      toast({
        title: labels.errorTitle,
        description: labels.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4" autoComplete="off" aria-live="polite" noValidate>
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">{labels.name}</Label>
        <Input
          id="name"
          name="name"
          placeholder={labels.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
          enterKeyHint="next"
        />
        {errors.name && <p id="name-error" className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{labels.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
        />
        {errors.email && <p id="email-error" className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">{labels.subject}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={labels.subjectPlaceholder}
          value={formData.subject}
          onChange={handleChange}
          required
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          autoComplete="off"
          enterKeyHint="next"
        />
        {errors.subject && <p id="subject-error" className="text-sm text-red-500">{errors.subject}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={labels.messagePlaceholder}
          value={formData.message}
          onChange={handleChange}
          className="min-h-[100px]"
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          autoComplete="off"
          enterKeyHint="send"
          autoCapitalize="sentences"
        />
        {errors.message && <p id="message-error" className="text-sm text-red-500">{errors.message}</p>}
      </div>
      {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
      <Button
        type="submit"
        className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
        disabled={isLoading}
        aria-describedby={isLoading ? "loading-description" : undefined}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            {labels.sending}
          </>
        ) : (
          labels.send
        )}
      </Button>
      {isLoading && (
        <p id="loading-description" className="sr-only">
          {labels.loadingDescription}
        </p>
      )}
      {submitError && (
        <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
          <p className="text-sm text-muted-foreground">{submitError}</p>
        </div>
      )}
    </form>
  );
}
