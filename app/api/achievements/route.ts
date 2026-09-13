import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const dbAch = await db.achievement.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    const achievements = dbAch.map((a) => ({
      id: a.id,
      metric: a.metric,
      title: a.title,
      category: a.category,
      description: a.description,
      displayOrder: a.displayOrder,
      isPublished: a.isPublished,
    }));

    return NextResponse.json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (err) {
    console.error('[Public Achievements API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public achievements' }, { status: 500 });
  }
}
