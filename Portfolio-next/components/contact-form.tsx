"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactSchema, ContactFormData } from "@/lib/validation/contact";
import { z } from "zod";

interface ContactFormProps {
  onSuccess?: () => void;
}

type FormState = ContactFormData & { website?: string };

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Client-side validation
    const extendedSchema = ContactSchema.extend({ website: z.string().max(0, "Spam detected") });
    const parseResult = extendedSchema.safeParse(formData);
    if (!parseResult.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const key in parseResult.error.formErrors.fieldErrors) {
        const err = parseResult.error.formErrors.fieldErrors[key];
        if (err && err.length > 0) fieldErrors[key as keyof FormState] = err[0];
      }
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4" autoComplete="off">
      {/* Honeypot field (hidden from users) */}
      <div style={{ display: 'none' }} aria-hidden="true">
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleChange}
          required
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          className="min-h-[100px]"
          required
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>
      {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}