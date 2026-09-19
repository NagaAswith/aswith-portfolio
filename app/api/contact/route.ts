import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Server-Side Contact API
 *
 * Delivery backends (in priority order):
 *  1. Telegram Bot API (PRIMARY)  — TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *  2. Resend REST API (SECONDARY) — RESEND_API_KEY
 *
 * Environment Variables Required:
 *  - TELEGRAM_BOT_TOKEN  : Your Telegram Bot API token (from @BotFather)
 *  - TELEGRAM_CHAT_ID    : Your Telegram chat/user ID (e.g. 1762088347)
 *
 * Optional Environment Variables:
 *  - RESEND_API_KEY      : Resend.com API key (fallback email delivery)
 *  - CONTACT_TO_EMAIL    : Destination inbox (default: nagaaswith3@gmail.com)
 *  - CONTACT_FROM_EMAIL  : Sender address (default: onboarding@resend.dev)
 *
 * SECURITY: All tokens are accessed ONLY on the server side via process.env.
 * NEVER expose TELEGRAM_BOT_TOKEN in client-side code or NEXT_PUBLIC_ variables.
 */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  _hp: z.string().optional(), // Honeypot field
});

// Simple in-memory IP rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

function sanitizeText(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

/**
 * Escape special HTML characters to safely embed user content in Telegram HTML mode.
 * Telegram HTML mode only requires escaping: & < >
 * See: https://core.telegram.org/bots/api#html-style
 *
 * This is the ROOT CAUSE fix: previously using parse_mode:'Markdown' caused delivery
 * failures when user content contained Markdown special chars (e.g. _ in email addresses).
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Send message via Telegram Bot API.
 * Uses HTML parse_mode to avoid Markdown special-character parsing failures
 * (e.g. underscores in email addresses causing Telegram 400 errors).
 * Includes AbortController timeout to prevent hanging serverless functions.
 * Returns true if delivery was confirmed by Telegram.
 */
async function sendViaTelegram(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[ContactForm] Telegram credentials not configured. Skipping Telegram delivery.');
    return false;
  }

  // HTML-escape all user-supplied values to prevent Telegram parse errors
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safePhone = escapeHtml(params.phone);
  const safeMessage = escapeHtml(params.message);
  const safeTimestamp = escapeHtml(params.timestamp);

  const text = [
    '🔔 <b>New Portfolio Contact</b>',
    '',
    `<b>Name:</b> ${safeName}`,
    `<b>Email:</b> ${safeEmail}`,
    `<b>Contact:</b> ${safePhone}`,
    '<b>Message:</b>',
    safeMessage,
    '',
    `<b>Timestamp:</b> ${safeTimestamp}`,
  ].join('\n');

  // Attempt up to 2 times in case of transient network connection reset
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
          }),
          signal: controller.signal,
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          console.log('[ContactForm] Telegram delivery confirmed.');
          return true;
        }
        // Telegram returned ok:false — log description class without exposing secrets
        const errCode = data.error_code ?? 'unknown';
        const errDesc = data.description ?? 'No description';
        console.error(`[ContactForm] Telegram API returned ok:false — code:${errCode} description:"${errDesc}"`);
        return false;
      }

      let errData: Record<string, unknown> = {};
      try { errData = await res.json(); } catch { /* ignore */ }
      const errCode = (errData.error_code as number) ?? res.status;
      const errDesc = (errData.description as string) ?? res.statusText;
      console.error(`[ContactForm] Telegram API HTTP error — status:${errCode} description:"${errDesc}"`);
      return false;
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        console.error('[ContactForm] Telegram API request timed out after 15s.');
      } else {
        console.error(`[ContactForm] Failed to reach Telegram API (attempt ${attempt}/2):`, (err as Error)?.message ?? String(err));
      }
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 500));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return false;
}

/**
 * Send message via Resend REST API (fallback).
 * Returns true if delivery was confirmed.
 */
async function sendViaResend(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return false;

  const toEmail = process.env.CONTACT_TO_EMAIL || 'nagaaswith3@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: params.email,
        subject: `[Aswith Portfolio] New Message from ${params.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #09090b; color: #ffffff; border-radius: 12px; border: 1px solid #27272a;">
            <h2 style="color: #38bdf8; margin-top: 0;">New Portfolio Contact</h2>
            <hr style="border: 0; border-top: 1px solid #27272a; margin: 15px 0;" />
            <p><strong>Name:</strong> ${params.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${params.email}" style="color: #38bdf8;">${params.email}</a></p>
            <p><strong>Contact:</strong> ${params.phone}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #18181b; padding: 15px; border-radius: 8px; border: 1px solid #27272a; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
              ${params.message}
            </div>
          </div>
        `,
      }),
      signal: controller.signal,
    });

    if (res.ok) {
      console.log('[ContactForm] Resend email delivery confirmed.');
      return true;
    }
    let errData: Record<string, unknown> = {};
    try { errData = await res.json(); } catch { /* ignore */ }
    console.error('[ContactForm] Resend API error — status:', res.status, 'name:', errData.name ?? 'unknown');
    return false;
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') {
      console.error('[ContactForm] Resend API request timed out after 10s.');
    } else {
      console.error('[ContactForm] Failed to reach Resend API:', (err as Error)?.message ?? String(err));
    }
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            _form: ['Too many message requests. Please wait a few minutes before trying again.'],
          },
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // 3. Honeypot check
    if (parsed.data._hp && parsed.data._hp.trim().length > 0) {
      console.warn('[ContactForm] Honeypot triggered — silently dropping bot submission.');
      // Return fake success to confuse bots, no actual delivery
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    const name = sanitizeText(parsed.data.name);
    const email = sanitizeText(parsed.data.email);
    const phone = parsed.data.phone ? sanitizeText(parsed.data.phone) : 'Not provided';
    const message = sanitizeText(parsed.data.message);
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // 4. Attempt delivery — Telegram (primary) then Resend (fallback)
    let delivered = false;

    // Primary: Telegram
    delivered = await sendViaTelegram({ name, email, phone, message, timestamp });

    // Fallback: Resend (only if Telegram failed)
    if (!delivered) {
      delivered = await sendViaResend({ name, email, phone, message });
    }

    // 5. Return honest response
    if (!delivered) {
      console.error('[ContactForm] All delivery backends failed. No credentials configured or API errors occurred.');
      return NextResponse.json(
        {
          success: false,
          errors: {
            _form: [
              'Failed to deliver your message. Please reach out directly at nagaaswith3@gmail.com',
            ],
          },
        },
        { status: 503 }
      );
    }

    // 6. WhatsApp deep link (optional convenience)
    const whatsappText = encodeURIComponent(
      `Hi Aswith! I sent a message through your portfolio.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    const whatsappLink = `https://wa.me/918328671677?text=${whatsappText}`;

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been delivered to Aswith directly.',
      whatsappLink,
    });
  } catch (err) {
    console.error('[ContactForm] Server error:', err);
    return NextResponse.json(
      {
        success: false,
        errors: {
          _form: ['Server error processing your request. Please try again or email directly.'],
        },
      },
      { status: 500 }
    );
  }
}
