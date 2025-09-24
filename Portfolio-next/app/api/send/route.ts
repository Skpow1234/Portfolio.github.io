import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '../../../lib/validation/contact';
import { sendContactMail } from './mailer';
import { createRateLimitMiddleware, getClientIP, createRateLimitHeaders } from '../../../lib/middleware/rate-limit';
import { rateLimit } from '../../../lib/rate-limit';

export async function POST(req: NextRequest) {
  const fromEmail = process.env.FROM_EMAIL || 'contact@example.com';

  // Apply rate limiting middleware
  const rateLimitMiddleware = createRateLimitMiddleware('contact');
  const rateLimitResponse = rateLimitMiddleware(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Get rate limit info for response headers
  const ip = getClientIP(req);
  const limiter = rateLimit({ interval: 60000, limit: 5 });
  const rateLimitResult = limiter(ip);

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
        headers: createRateLimitHeaders(5, rateLimitResult.remaining, rateLimitResult.resetTime)
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