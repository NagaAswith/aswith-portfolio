import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

function safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const dbExp = await db.experience.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    const experience = dbExp.map((e) => ({
      id: e.id,
      organization: e.organization,
      title: e.title,
      period: e.period,
      type: e.type,
      location: e.location,
      description: e.description,
      highlights: safeJsonParse<string[]>(e.highlights, []),
      displayOrder: e.displayOrder,
      isPublished: e.isPublished,
    }));

    return NextResponse.json({
      success: true,
      count: experience.length,
      data: experience,
    });
  } catch (err) {
    console.error('[Public Experience API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public experience' }, { status: 500 });
  }
}
