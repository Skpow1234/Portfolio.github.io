import { NextResponse } from 'next/server';
import { ContactSchema } from '../../../lib/validation/contact';
import { sendContactMail } from './mailer';

export async function POST(req: Request) {
  const fromEmail = process.env.FROM_EMAIL;

  if (!fromEmail) {
    return NextResponse.json(
      { error: 'FROM_EMAIL environment variable is not set' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const parseResult = ContactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const data = parseResult.data;
    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }
    const info = await sendContactMail(data, fromEmail);
    return NextResponse.json({ messageId: info.messageId });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}