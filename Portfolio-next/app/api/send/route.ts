import { NextResponse } from 'next/server';
import { ContactSchema } from '../../../lib/validation/contact';
import { sendContactMail } from './mailer';
import { rateLimit } from '../../../lib/rate-limit';

export async function POST(req: Request) {
  const fromEmail = process.env.FROM_EMAIL || 'contact@example.com';

  // Rate limiting: 5 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const limiter = rateLimit({ interval: 60000, limit: 5 });
  const rateLimitResult = limiter(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
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
    return NextResponse.json(
      { success: true, data: info },
      {
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        }
      }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}