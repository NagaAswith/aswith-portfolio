import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { formatDisplayNumber } from '@/lib/dbDataMapper';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

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

    const dbCerts = await db.certificate.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    let certificates = dbCerts.map((c, idx) => ({
      id: c.id,
      number: formatDisplayNumber(idx),
      displayOrder: c.displayOrder,
      isPublished: c.isPublished,
      title: c.title,
      issuer: c.issuer,
      category: c.category,
      date: c.date,
      score: c.score || undefined,
      certificationTier: c.certificationTier || undefined,
      credentialId: c.credentialId || undefined,
      duration: c.duration || undefined,
      description: c.description,
      skills: safeJsonParse<string[]>(c.skills, []),
      image: resolveSupabaseMediaUrl(c.image),
      verificationUrl: c.verificationUrl || undefined,
    }));

    if (category && category !== 'ALL') {
      certificates = certificates.filter((c) => c.category === category);
    }

    return NextResponse.json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (err) {
    console.error('[Public Certificates API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public certificates' }, { status: 500 });
  }
}
