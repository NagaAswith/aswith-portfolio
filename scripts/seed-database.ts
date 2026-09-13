import { db } from '../lib/db';
import { projectsData } from '../data/projects';
import { certificatesData } from '../data/certificates';
import { skillsData } from '../data/skills';
import { experienceData, educationList } from '../data/experience';
import { achievementsData } from '../data/achievements';
import { personal } from '../data/personal';

const defaultMediaConfig = {
  portrait: '/media/profile/profile.jpeg',
  selfIntroVideo: '/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4',
  resumePdf: '/media/resume.pdf',
  projectsMediaDir: 'public/media/projects/',
  certificatesMediaDir: 'public/media/certificates/',
};

async function seed() {
  console.log('Seeding portfolio database...');

  // 1. Projects
  for (let idx = 0; idx < projectsData.length; idx++) {
    const p = projectsData[idx];
    await db.project.upsert({
      where: { id: p.id },
      update: {
        slug: p.slug,
        number: p.number,
        displayOrder: p.displayOrder ?? idx + 1,
        isPublished: p.isPublished ?? true,
        title: p.title,
        category: p.category,
        categories: JSON.stringify(p.categories),
        domain: p.domain,
        organization: p.organization || null,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        technologies: JSON.stringify(p.technologies),
        features: JSON.stringify(p.features),
        mainImage: p.images.main,
        liveUrl: p.liveUrl || null,
        githubUrl: p.githubUrl || null,
        year: p.year,
        status: p.status,
        featured: p.featured ?? false,
      },
      create: {
        id: p.id,
        slug: p.slug,
        number: p.number,
        displayOrder: p.displayOrder ?? idx + 1,
        isPublished: p.isPublished ?? true,
        title: p.title,
        category: p.category,
        categories: JSON.stringify(p.categories),
        domain: p.domain,
        organization: p.organization || null,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        technologies: JSON.stringify(p.technologies),
        features: JSON.stringify(p.features),
        mainImage: p.images.main,
        liveUrl: p.liveUrl || null,
        githubUrl: p.githubUrl || null,
        year: p.year,
        status: p.status,
        featured: p.featured ?? false,
        galleryImages: {
          create: (p.images.gallery || []).map((imageUrl, gIdx) => ({
            imageUrl,
            order: gIdx + 1,
          })),
        },
      },
    });
  }
  console.log(`[SEED] ${projectsData.length} projects seeded.`);

  // 2. Certificates
  for (let idx = 0; idx < certificatesData.length; idx++) {
    const c = certificatesData[idx];
    await db.certificate.upsert({
      where: { id: c.id },
      update: {
        number: c.number,
        displayOrder: c.displayOrder ?? idx + 1,
        isPublished: c.isPublished ?? true,
        title: c.title,
        issuer: c.issuer,
        category: c.category,
        date: c.date,
        score: c.score || null,
        certificationTier: c.certificationTier || null,
        credentialId: c.credentialId || null,
        duration: c.duration || null,
        description: c.description,
        skills: JSON.stringify(c.skills),
        image: c.image,
        verificationUrl: c.verificationUrl || null,
      },
      create: {
        id: c.id,
        number: c.number,
        displayOrder: c.displayOrder ?? idx + 1,
        isPublished: c.isPublished ?? true,
        title: c.title,
        issuer: c.issuer,
        category: c.category,
        date: c.date,
        score: c.score || null,
        certificationTier: c.certificationTier || null,
        credentialId: c.credentialId || null,
        duration: c.duration || null,
        description: c.description,
        skills: JSON.stringify(c.skills),
        image: c.image,
        verificationUrl: c.verificationUrl || null,
      },
    });
  }
  console.log(`[SEED] ${certificatesData.length} certificates seeded.`);

  // 3. Skills
  for (let idx = 0; idx < skillsData.length; idx++) {
    const s = skillsData[idx];
    await db.skill.upsert({
      where: { id: s.id },
      update: {
        name: s.name,
        category: s.category,
        proficiency: s.proficiency,
        connectedIds: JSON.stringify(s.connectedIds || []),
        displayOrder: s.displayOrder ?? idx + 1,
        isPublished: s.isPublished ?? true,
      },
      create: {
        id: s.id,
        name: s.name,
        category: s.category,
        proficiency: s.proficiency,
        connectedIds: JSON.stringify(s.connectedIds || []),
        displayOrder: s.displayOrder ?? idx + 1,
        isPublished: s.isPublished ?? true,
      },
    });
  }
  console.log(`[SEED] ${skillsData.length} skills seeded.`);

  // 4. Education
  for (let idx = 0; idx < educationList.length; idx++) {
    const e = educationList[idx];
    await db.education.upsert({
      where: { id: e.id },
      update: {
        degree: e.degree,
        institution: e.institution,
        period: e.period,
        cgpa: e.cgpa,
        expectedGraduation: e.expectedGraduation,
        field: e.field,
        highlights: JSON.stringify(e.highlights || []),
        displayOrder: e.displayOrder ?? idx + 1,
        isPublished: e.isPublished ?? true,
      },
      create: {
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        period: e.period,
        cgpa: e.cgpa,
        expectedGraduation: e.expectedGraduation,
        field: e.field,
        highlights: JSON.stringify(e.highlights || []),
        displayOrder: e.displayOrder ?? idx + 1,
        isPublished: e.isPublished ?? true,
      },
    });
  }
  console.log(`[SEED] ${educationList.length} education records seeded.`);

  // 5. Experience
  for (let idx = 0; idx < experienceData.length; idx++) {
    const e = experienceData[idx];
    await db.experience.upsert({
      where: { id: e.id },
      update: {
        organization: e.organization,
        title: e.title,
        period: e.period,
        type: e.type,
        location: e.location,
        description: e.description,
        highlights: JSON.stringify(e.highlights || []),
        displayOrder: e.displayOrder ?? idx + 1,
        isPublished: e.isPublished ?? true,
      },
      create: {
        id: e.id,
        organization: e.organization,
        title: e.title,
        period: e.period,
        type: e.type,
        location: e.location,
        description: e.description,
        highlights: JSON.stringify(e.highlights || []),
        displayOrder: e.displayOrder ?? idx + 1,
        isPublished: e.isPublished ?? true,
      },
    });
  }
  console.log(`[SEED] ${experienceData.length} experience records seeded.`);

  // 6. Achievements
  for (let idx = 0; idx < achievementsData.length; idx++) {
    const a = achievementsData[idx];
    await db.achievement.upsert({
      where: { id: a.id },
      update: {
        metric: a.metric,
        title: a.title,
        category: a.category,
        description: a.description,
        displayOrder: a.displayOrder ?? idx + 1,
        isPublished: a.isPublished ?? true,
      },
      create: {
        id: a.id,
        metric: a.metric,
        title: a.title,
        category: a.category,
        description: a.description,
        displayOrder: a.displayOrder ?? idx + 1,
        isPublished: a.isPublished ?? true,
      },
    });
  }
  console.log(`[SEED] ${achievementsData.length} achievements seeded.`);

  // 7. Personal Info
  await db.personalInfo.upsert({
    where: { id: 'default' },
    update: {
      name: personal.name,
      fullName: personal.fullName,
      greeting: personal.greeting,
      title: personal.title,
      roles: JSON.stringify(personal.roles),
      tagline: personal.tagline,
      description: personal.description,
      selfIntroVideo: personal.selfIntroVideo,
      educationSummary: JSON.stringify(personal.educationSummary),
      cta: JSON.stringify(personal.cta),
      social: JSON.stringify(personal.social),
      media: JSON.stringify(defaultMediaConfig),
    },
    create: {
      id: 'default',
      name: personal.name,
      fullName: personal.fullName,
      greeting: personal.greeting,
      title: personal.title,
      roles: JSON.stringify(personal.roles),
      tagline: personal.tagline,
      description: personal.description,
      selfIntroVideo: personal.selfIntroVideo,
      educationSummary: JSON.stringify(personal.educationSummary),
      cta: JSON.stringify(personal.cta),
      social: JSON.stringify(personal.social),
      media: JSON.stringify(defaultMediaConfig),
    },
  });
  console.log('[SEED] Personal info seeded.');

  console.log('Database seeding completed successfully!');
}

seed()
  .catch((err) => {
    console.error('Database seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
