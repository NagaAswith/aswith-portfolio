import { NextResponse } from 'next/server';
import { assistantEngine } from '@/lib/assistant/assistantEngine';

/**
 * Portfolio AI Chat API
 *
 * Backed by the Authoritative Dynamic CMS & Assistant Engine.
 * Supports:
 * - Deterministic Creator/Boss answer
 * - Intent & Entity Matching with Typo/Abbreviation Normalization
 * - Context Memory (follow-ups & multi-turn conversations)
 * - Clarification & Confirmation for ambiguous queries
 * - Recruiter-oriented technical evaluations
 * - Authoritative Links & Security Hardening
 *
 * Returns { reply: string, action?: 'navigate' | 'openContact', target?: string, confirmationNeeded?: boolean }
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, sessionId } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await assistantEngine.processMessage({
      message,
      history: Array.isArray(history) ? history : undefined,
      sessionId: typeof sessionId === 'string' ? sessionId : undefined,
    });

    return NextResponse.json(response);
  } catch (err) {
    console.error('[ChatAPI] Error processing message:', err);
    return NextResponse.json(
      {
        reply:
          'I apologize, but I encountered an error processing your query. Please ask again about Aswith\'s projects, skills, education, experience, or contact details.',
      },
      { status: 500 }
    );
  }
}

