import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req: Request) {
  if (!fromEmail) {
    return NextResponse.json(
      { error: 'FROM_EMAIL environment variable is not set' },
      { status: 500 }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}