import nodemailer from 'nodemailer';
import type { ContactFormData } from './schema';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
});

export async function sendContactMail(data: ContactFormData, fromEmail: string) {
  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${fromEmail}>`,
    to: fromEmail,
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.subject}`,
    text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
    `,
  });
  return info;
} 