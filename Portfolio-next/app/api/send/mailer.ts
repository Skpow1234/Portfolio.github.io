import { Resend } from 'resend';
import type { ContactFormData } from './schema';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMail(data: ContactFormData, fromEmail: string) {
  const { name, email, subject, message } = data;
  const { data: result, error } = await resend.emails.send({
    from: `Portfolio Contact <${fromEmail}>`,
    to: [fromEmail],
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });
  if (error) throw new Error(error.message || 'Failed to send email');
  return result;
} 