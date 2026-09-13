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
    const featuredOnly = searchParams.get('featured') === 'true';

    const dbProjects = await db.project.findMany({
      where: {
        isPublished: true,
        ...(featuredOnly ? { featured: true } : {}),
      },
      include: {
        galleryImages: { orderBy: { order: 'asc' } },
      },
      orderBy: { displayOrder: 'asc' },
    });

    let projects = dbProjects.map((p, idx) => ({
      id: p.id,
      slug: p.slug,
      number: formatDisplayNumber(idx),
      displayOrder: p.displayOrder,
      isPublished: p.isPublished,
      title: p.title,
      category: p.category,
      categories: safeJsonParse<string[]>(p.categories, [p.category]),
      domain: p.domain,
      organization: p.organization || undefined,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      technologies: safeJsonParse<string[]>(p.technologies, []),
      features: safeJsonParse<string[]>(p.features, []),
      images: {
        main: resolveSupabaseMediaUrl(p.mainImage),
        gallery: p.galleryImages.map((g) => resolveSupabaseMediaUrl(g.imageUrl)),
      },
      liveUrl: p.liveUrl || undefined,
      githubUrl: p.githubUrl || undefined,
      year: p.year,
      status: p.status,
      featured: p.featured,
    }));

    if (category && category !== 'ALL') {
      projects = projects.filter(
        (p) => p.category === category || p.categories.includes(category)
      );
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    console.error('[Public Projects API] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch public projects' }, { status: 500 });
  }
}
