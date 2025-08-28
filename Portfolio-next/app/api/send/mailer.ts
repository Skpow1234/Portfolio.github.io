import { Resend } from 'resend';
import type { ContactFormData } from './schema';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactMail(data: ContactFormData, fromEmail: string) {
  const { name, email, subject, message } = data;
  
  // If no API key is available, simulate success for development/production builds
  if (!resend) {
    console.log('Email would be sent (RESEND_API_KEY not configured):', {
      from: `Portfolio Contact <${fromEmail}>`,
      to: [fromEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      name,
      email,
      message
    });
    return { id: 'simulated-email-id' };
  }

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