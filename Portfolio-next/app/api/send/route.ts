import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '../../../lib/validation/contact';
import { sendContactMail } from './mailer';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

export async function POST(req: NextRequest) {
  const fromEmail = process.env.FROM_EMAIL || 'contact@example.com';

  // Check rate limit (single call handles both blocking and headers)
  const { response: rateLimitResponse, headers, allowed } = checkRateLimit(req, 'contact');
  if (!allowed && rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await req.json();
    const parseResult = ContactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parseResult.error.flatten() },
        { status: 400, headers }
      );
    }
    const data = parseResult.data;
    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400, headers }
      );
    }
    const info = await sendContactMail(data, fromEmail);
    return NextResponse.json(
      { success: true, data: info },
      { headers }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500, headers }
    );
  }
}