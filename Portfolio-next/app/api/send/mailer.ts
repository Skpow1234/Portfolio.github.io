import { Resend } from 'resend';
import type { ContactFormData } from './schema';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Escapes HTML special characters to prevent XSS attacks in email content
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>'); // Preserve line breaks
}

export async function sendContactMail(data: ContactFormData, fromEmail: string) {
  const { name, email, subject, message } = data;
  
  // Sanitize all user inputs before using in HTML
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  
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
    subject: `Portfolio Contact: ${safeSubject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 100px;">Name:</td>
            <td style="padding: 10px;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 10px;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Subject:</td>
            <td style="padding: 10px;">${safeSubject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="font-weight: bold; color: #555; margin-bottom: 10px;">Message:</p>
          <p style="color: #333; line-height: 1.6;">${safeMessage}</p>
        </div>
      </div>
    `,
  });
  if (error) throw new Error(error.message || 'Failed to send email');
  return result;
} 