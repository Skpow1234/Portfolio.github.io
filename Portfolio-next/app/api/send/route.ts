import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

export async function POST(req: Request) {
  const fromEmail = process.env.FROM_EMAIL;

  if (!fromEmail) {
    return NextResponse.json(
      { error: 'FROM_EMAIL environment variable is not set' },
      { status: 500 }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${fromEmail}>`,
      to: fromEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    });

    return NextResponse.json({ messageId: info.messageId });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}