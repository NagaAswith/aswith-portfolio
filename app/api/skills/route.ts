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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const dbSkills = await db.skill.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    let skills = dbSkills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      connectedIds: safeJsonParse<string[]>(s.connectedIds, []),
      displayOrder: s.displayOrder,
      isPublished: s.isPublished,
    }));

    if (category && category !== 'ALL') {
      skills = skills.filter((s) => s.category === category);
    }

    return NextResponse.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (err) {
    console.error('[Public Skills API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public skills' }, { status: 500 });
  }
}
