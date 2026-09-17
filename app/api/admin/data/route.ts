import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { db } from '@/lib/db';
import { fetchFullAdminData } from '@/lib/dbDataMapper';
import { AdminDataPayloadSchema } from '@/lib/validations/cmsSchemas';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import { apiErrorResponse } from '@/lib/apiError';
import { logger } from '@/lib/logger';
import { allocatePermanentId } from '@/lib/permanentId';

export async function GET() {
  try {
    const data = await fetchFullAdminData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    logger.error('[AdminData GET] Error:', err);
    return apiErrorResponse('Failed to fetch admin data.', 500);
  }
}

export async function POST(req: Request) {
  // 1. Authorization Check
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return apiErrorResponse('Unauthorized. Admin session required.', 401);
  }

  // 2. CSRF Origin Check
  if (!validateCsrfOrigin(req)) {
    return apiErrorResponse('Forbidden. Invalid request origin header.', 403);
  }

  // 3. Rate Limiting Check (60 mutations per minute per IP)
  const clientIp = getClientIp(req);
  const rateLimit = await rateLimiter.check(`admin_data_${clientIp}`, 60, 60000);
  if (!rateLimit.allowed) {
    return apiErrorResponse('Too many requests. Please wait a moment before trying again.', 429);
  }

  try {
    const rawBody = await req.json();

    // 4. Zod Schema Payload Validation
    const parseResult = AdminDataPayloadSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return apiErrorResponse('Validation error. Invalid payload structure.', 400, parseResult.error.format());
    }

    const { section, action, id, items } = parseResult.data;
    const item: Record<string, any> | undefined = parseResult.data.item;

    // ─────────────────────────────────────────────────────────────
    // REORDER (Atomic Transaction)
    // ─────────────────────────────────────────────────────────────
    if (action === 'REORDER' && Array.isArray(items)) {
      await db.$transaction(async (tx) => {
        for (let idx = 0; idx < items.length; idx++) {
          const it = items[idx];
          const displayOrder = idx + 1;
          const targetId = it.id || id;

          if (!targetId) continue;

          if (section === 'projects') {
            await tx.project.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          } else if (section === 'certificates') {
            await tx.certificate.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          } else if (section === 'skills') {
            await tx.skill.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          } else if (section === 'experience') {
            await tx.experience.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          } else if (section === 'education') {
            await tx.education.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          } else if (section === 'achievements') {
            await tx.achievement.update({ where: { id: targetId }, data: { displayOrder } }).catch(() => null);
          }
        }
      });

      revalidatePath('/');
      const updatedData = await fetchFullAdminData();
      return NextResponse.json({ success: true, data: updatedData });
    }

    // ─────────────────────────────────────────────────────────────
    // CREATE (Atomic Transaction with Permanent ID Allocation)
    // ─────────────────────────────────────────────────────────────
    if (action === 'CREATE' && item) {
      let createdTargetId = item.id as string | undefined;

      await db.$transaction(async (tx) => {
        if (!createdTargetId) {
          createdTargetId = await allocatePermanentId(section, tx);
        }

        const targetId = createdTargetId;

        if (section === 'projects') {
          const slug =
            (item.slug as string)?.trim() ||
            (item.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
            targetId;

          const count = await tx.project.count();
          await tx.project.create({
            data: {
              id: targetId,
              slug,
              number: String(count + 1).padStart(2, '0'),
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
              title: item.title,
              category: item.category || 'SOFTWARE',
              categories: JSON.stringify(item.categories || [item.category || 'SOFTWARE']),
              domain: item.domain || '',
              organization: item.organization || null,
              shortDescription: item.shortDescription || '',
              fullDescription: item.fullDescription || '',
              technologies: JSON.stringify(item.technologies || []),
              features: JSON.stringify(item.features || []),
              mainImage: item.images?.main || item.image || '',
              videoUrl: item.videoUrl || null,
              liveUrl: item.liveUrl || null,

              githubUrl: item.githubUrl || null,
              year: item.year || String(new Date().getFullYear()),
              status: item.status || 'Active',
              featured: item.featured ?? false,
              galleryImages: {
                create: (item.images?.gallery || []).map((imgUrl: string, idx: number) => ({
                  imageUrl: imgUrl,
                  order: idx + 1,
                })),
              },
            },
          });
        } else if (section === 'certificates') {
          const count = await tx.certificate.count();
          await tx.certificate.create({
            data: {
              id: targetId,
              number: String(count + 1).padStart(2, '0'),
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
              title: item.title,
              issuer: item.issuer || '',
              category: item.category || 'Programming & Computational Logic',
              date: item.date || String(new Date().getFullYear()),
              score: item.score || null,
              certificationTier: item.certificationTier || null,
              credentialId: item.credentialId || null,
              duration: item.duration || null,
              description: item.description || '',
              skills: JSON.stringify(item.skills || []),
              image: item.image || '',
              verificationUrl: item.verificationUrl || null,
            },
          });
        } else if (section === 'skills') {
          const count = await tx.skill.count();
          await tx.skill.create({
            data: {
              id: targetId,
              name: item.name,
              category: item.category || 'Programming & Logic',
              proficiency: item.proficiency || 80,
              connectedIds: JSON.stringify(item.connectedIds || []),
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
            },
          });
        } else if (section === 'experience') {
          const count = await tx.experience.count();
          await tx.experience.create({
            data: {
              id: targetId,
              organization: item.organization || '',
              title: item.title || '',
              period: item.period || '',
              type: item.type || 'INTERNSHIP',
              location: item.location || '',
              description: item.description || '',
              highlights: JSON.stringify(item.highlights || []),
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
            },
          });
        } else if (section === 'education') {
          const count = await tx.education.count();
          await tx.education.create({
            data: {
              id: targetId,
              degree: item.degree || '',
              institution: item.institution || '',
              period: item.period || '',
              cgpa: item.cgpa || '',
              expectedGraduation: item.expectedGraduation || '',
              field: item.field || '',
              highlights: JSON.stringify(item.highlights || []),
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
            },
          });
        } else if (section === 'achievements') {
          const count = await tx.achievement.count();
          await tx.achievement.create({
            data: {
              id: targetId,
              metric: item.metric || '',
              title: item.title || '',
              category: item.category || '',
              description: item.description || '',
              displayOrder: item.displayOrder ?? count + 1,
              isPublished: item.isPublished ?? true,
            },
          });
        }
      });

      revalidatePath('/');
      const updatedData = await fetchFullAdminData();
      return NextResponse.json({ success: true, item: { ...item, id: createdTargetId }, data: updatedData });
    }

    // ─────────────────────────────────────────────────────────────
    // UPDATE (Atomic Transaction for relational sync)
    // ─────────────────────────────────────────────────────────────
    if (action === 'UPDATE' && item) {
      const targetId = id || item.id;

      if (section === 'projects' && targetId) {
        await db.$transaction(async (tx) => {
          const updateData: Record<string, any> = {};
          if (item.title !== undefined) updateData.title = item.title;
          if (item.slug !== undefined) updateData.slug = item.slug;
          if (item.category !== undefined) updateData.category = item.category;
          if (item.categories !== undefined) updateData.categories = JSON.stringify(item.categories);
          if (item.domain !== undefined) updateData.domain = item.domain;
          if (item.organization !== undefined) updateData.organization = item.organization;
          if (item.shortDescription !== undefined) updateData.shortDescription = item.shortDescription;
          if (item.fullDescription !== undefined) updateData.fullDescription = item.fullDescription;
          if (item.technologies !== undefined) updateData.technologies = JSON.stringify(item.technologies);
          if (item.features !== undefined) updateData.features = JSON.stringify(item.features);
          if (item.images?.main !== undefined) updateData.mainImage = item.images.main;
          if (item.videoUrl !== undefined) updateData.videoUrl = item.videoUrl || null;
          if (item.liveUrl !== undefined) updateData.liveUrl = item.liveUrl;

          if (item.githubUrl !== undefined) updateData.githubUrl = item.githubUrl;
          if (item.year !== undefined) updateData.year = item.year;
          if (item.status !== undefined) updateData.status = item.status;
          if (item.featured !== undefined) updateData.featured = item.featured;
          if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
          if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

          await tx.project.update({ where: { id: targetId }, data: updateData });

          if (item.images?.gallery) {
            await tx.projectGalleryImage.deleteMany({ where: { projectId: targetId } });
            await tx.projectGalleryImage.createMany({
              data: item.images.gallery.map((imgUrl: string, idx: number) => ({
                projectId: targetId,
                imageUrl: imgUrl,
                order: idx + 1,
              })),
            });
          }
        });
      } else if (section === 'certificates' && targetId) {
        const updateData: Record<string, any> = {};
        if (item.title !== undefined) updateData.title = item.title;
        if (item.issuer !== undefined) updateData.issuer = item.issuer;
        if (item.category !== undefined) updateData.category = item.category;
        if (item.date !== undefined) updateData.date = item.date;
        if (item.score !== undefined) updateData.score = item.score;
        if (item.certificationTier !== undefined) updateData.certificationTier = item.certificationTier;
        if (item.credentialId !== undefined) updateData.credentialId = item.credentialId;
        if (item.duration !== undefined) updateData.duration = item.duration;
        if (item.description !== undefined) updateData.description = item.description;
        if (item.skills !== undefined) updateData.skills = JSON.stringify(item.skills);
        if (item.image !== undefined) updateData.image = item.image;
        if (item.verificationUrl !== undefined) updateData.verificationUrl = item.verificationUrl;
        if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
        if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

        await db.certificate.update({ where: { id: targetId }, data: updateData });
      } else if (section === 'skills' && targetId) {
        const updateData: Record<string, any> = {};
        if (item.name !== undefined) updateData.name = item.name;
        if (item.category !== undefined) updateData.category = item.category;
        if (item.proficiency !== undefined) updateData.proficiency = item.proficiency;
        if (item.connectedIds !== undefined) updateData.connectedIds = JSON.stringify(item.connectedIds);
        if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
        if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

        await db.skill.update({ where: { id: targetId }, data: updateData });
      } else if (section === 'experience' && targetId) {
        const updateData: Record<string, any> = {};
        if (item.organization !== undefined) updateData.organization = item.organization;
        if (item.title !== undefined) updateData.title = item.title;
        if (item.period !== undefined) updateData.period = item.period;
        if (item.type !== undefined) updateData.type = item.type;
        if (item.location !== undefined) updateData.location = item.location;
        if (item.description !== undefined) updateData.description = item.description;
        if (item.highlights !== undefined) updateData.highlights = JSON.stringify(item.highlights);
        if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
        if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

        await db.experience.update({ where: { id: targetId }, data: updateData });
      } else if (section === 'education' && targetId) {
        const updateData: Record<string, any> = {};
        if (item.degree !== undefined) updateData.degree = item.degree;
        if (item.institution !== undefined) updateData.institution = item.institution;
        if (item.period !== undefined) updateData.period = item.period;
        if (item.cgpa !== undefined) updateData.cgpa = item.cgpa;
        if (item.expectedGraduation !== undefined) updateData.expectedGraduation = item.expectedGraduation;
        if (item.field !== undefined) updateData.field = item.field;
        if (item.highlights !== undefined) updateData.highlights = JSON.stringify(item.highlights);
        if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
        if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

        await db.education.update({ where: { id: targetId }, data: updateData });
      } else if (section === 'achievements' && targetId) {
        const updateData: Record<string, any> = {};
        if (item.metric !== undefined) updateData.metric = item.metric;
        if (item.title !== undefined) updateData.title = item.title;
        if (item.category !== undefined) updateData.category = item.category;
        if (item.description !== undefined) updateData.description = item.description;
        if (item.isPublished !== undefined) updateData.isPublished = item.isPublished;
        if (item.displayOrder !== undefined) updateData.displayOrder = item.displayOrder;

        await db.achievement.update({ where: { id: targetId }, data: updateData });
      } else if (section === 'personal') {
        const existing = await db.personalInfo.findUnique({ where: { id: 'default' } });
        if (existing) {
          const updateData: Record<string, any> = {};
          if (item.name !== undefined) updateData.name = item.name;
          if (item.fullName !== undefined) updateData.fullName = item.fullName;
          if (item.greeting !== undefined) updateData.greeting = item.greeting;
          if (item.title !== undefined) updateData.title = item.title;
          if (item.roles !== undefined) updateData.roles = JSON.stringify(item.roles);
          if (item.tagline !== undefined) updateData.tagline = item.tagline;
          if (item.description !== undefined) updateData.description = item.description;
          if (item.selfIntroVideo !== undefined) updateData.selfIntroVideo = item.selfIntroVideo;
          if (item.educationSummary !== undefined) updateData.educationSummary = JSON.stringify(item.educationSummary);
          if (item.cta !== undefined) updateData.cta = JSON.stringify(item.cta);
          if (item.social !== undefined) updateData.social = JSON.stringify(item.social);
          if (item.media !== undefined) updateData.media = JSON.stringify(item.media);

          await db.personalInfo.update({ where: { id: 'default' }, data: updateData });
        }
      }

      revalidatePath('/');
      const updatedData = await fetchFullAdminData();
      return NextResponse.json({ success: true, data: updatedData });
    }

    // ─────────────────────────────────────────────────────────────
    // DELETE (Atomic Transaction for delete + retiredId insertion)
    // ─────────────────────────────────────────────────────────────
    if (action === 'DELETE' && id) {
      await db.$transaction(async (tx) => {
        if (section === 'projects') {
          await tx.project.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'project' } });
        } else if (section === 'certificates') {
          await tx.certificate.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'certificate' } });
        } else if (section === 'skills') {
          await tx.skill.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'skill' } });
        } else if (section === 'experience') {
          await tx.experience.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'experience' } });
        } else if (section === 'education') {
          await tx.education.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'education' } });
        } else if (section === 'achievements') {
          await tx.achievement.delete({ where: { id } }).catch(() => null);
          await tx.retiredId.upsert({ where: { id }, update: {}, create: { id, entity: 'achievement' } });
        }
      });

      revalidatePath('/');
      const updatedData = await fetchFullAdminData();
      return NextResponse.json({ success: true, data: updatedData });
    }

    return apiErrorResponse('Invalid action or missing payload parameters.', 400);
  } catch (err: any) {
    logger.error('[AdminData POST] Error:', err?.message || err);
    return apiErrorResponse('Internal server error during data operation.', 500);
  }
}
