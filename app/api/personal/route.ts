import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveSupabaseMediaUrl } from '@/lib/storage/supabaseMedia';

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
    const dbPersonal = await db.personalInfo.findUnique({
      where: { id: 'default' },
    });

    if (!dbPersonal) {
      return NextResponse.json({ success: false, error: 'Personal info record not found' }, { status: 404 });
    }

    const personal = {
      name: dbPersonal.name,
      fullName: dbPersonal.fullName,
      greeting: dbPersonal.greeting,
      title: dbPersonal.title,
      roles: safeJsonParse<string[]>(dbPersonal.roles, []),
      tagline: dbPersonal.tagline,
      description: dbPersonal.description,
      selfIntroVideo: resolveSupabaseMediaUrl(dbPersonal.selfIntroVideo),
      educationSummary: safeJsonParse(dbPersonal.educationSummary, { degree: '', cgpa: '', expectedGraduation: '' }),
      cta: safeJsonParse(dbPersonal.cta, { primary: { label: '', action: 'about-me' }, secondary: { label: '', action: 'explore-work' } }),
      social: safeJsonParse(dbPersonal.social, { phone: '', email: '', github: '', linkedin: '', resumeUrl: '' }),
    };

    return NextResponse.json({
      success: true,
      data: personal,
    });
  } catch (err) {
    console.error('[Public Personal Info API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public personal info' }, { status: 500 });
  }
}
