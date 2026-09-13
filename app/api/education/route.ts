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
    const dbEdu = await db.education.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    const education = dbEdu.map((e) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      period: e.period,
      cgpa: e.cgpa,
      expectedGraduation: e.expectedGraduation,
      field: e.field,
      highlights: safeJsonParse<string[]>(e.highlights, []),
      displayOrder: e.displayOrder,
      isPublished: e.isPublished,
    }));

    return NextResponse.json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (err) {
    console.error('[Public Education API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public education' }, { status: 500 });
  }
}
