import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(5).max(2000),
  website: z.string().optional(), // honeypot
});

export type ContactFormData = z.infer<typeof ContactSchema>; 