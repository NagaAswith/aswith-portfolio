import { db } from './db';
import { ProjectItem } from '@/data/projects';
import { CertificateItem } from '@/data/certificates';
import { SkillNode } from '@/data/skills';
import { ExperienceItem, EducationItem } from '@/data/experience';
import { AchievementItem } from '@/data/achievements';
import { PersonalInfo } from '@/data/personal';
import { MediaConfig } from './contentRepository';
import { resolveSupabaseMediaUrl } from './storage/supabaseMedia';

const defaultMediaConfig: MediaConfig = {
  portrait: resolveSupabaseMediaUrl('/media/profile/profile.jpeg'),
  selfIntroVideo: resolveSupabaseMediaUrl('/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4'),
  introVideo: resolveSupabaseMediaUrl('/media/intro/intro-video.mp4'),
  mobileIntroVideo: resolveSupabaseMediaUrl('/media/mobileintro/Mobileintro.mp4'),
  resumePdf: '/media/resume.pdf',
  projectsMediaDir: 'public/media/projects/',
  certificatesMediaDir: 'public/media/certificates/',
};


function safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

export function formatDisplayNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export async function fetchFullAdminData() {
  const [
    dbProjects,
    dbCerts,
    dbSkills,
    dbExp,
    dbEdu,
    dbAch,
    dbPersonal,
  ] = await Promise.all([
    db.project.findMany({
      include: { galleryImages: { orderBy: { order: 'asc' } } },
      orderBy: { displayOrder: 'asc' },
    }),
    db.certificate.findMany({ orderBy: { displayOrder: 'asc' } }),
    db.skill.findMany({ orderBy: { displayOrder: 'asc' } }),
    db.experience.findMany({ orderBy: { displayOrder: 'asc' } }),
    db.education.findMany({ orderBy: { displayOrder: 'asc' } }),
    db.achievement.findMany({ orderBy: { displayOrder: 'asc' } }),
    db.personalInfo.findUnique({ where: { id: 'default' } }),
  ]);

  const projects: ProjectItem[] = dbProjects.map((p, idx) => ({
    id: p.id,
    slug: p.slug,
    number: formatDisplayNumber(idx),
    displayOrder: p.displayOrder,
    isPublished: p.isPublished,
    title: p.title,
    category: p.category as ProjectItem['category'],
    categories: safeJsonParse<ProjectItem['categories']>(p.categories, [p.category as ProjectItem['category']]),
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
    videoUrl: p.videoUrl ? resolveSupabaseMediaUrl(p.videoUrl) : undefined,
    liveUrl: p.liveUrl || undefined,

    githubUrl: p.githubUrl || undefined,
    year: p.year,
    status: p.status,
    featured: p.featured,
  }));

  const certificates: CertificateItem[] = dbCerts.map((c, idx) => ({
    id: c.id,
    number: formatDisplayNumber(idx),
    displayOrder: c.displayOrder,
    isPublished: c.isPublished,
    title: c.title,
    issuer: c.issuer,
    category: c.category as CertificateItem['category'],
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

  const skills: SkillNode[] = dbSkills.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category as SkillNode['category'],
    proficiency: s.proficiency,
    connectedIds: safeJsonParse<string[]>(s.connectedIds, []),
    displayOrder: s.displayOrder,
    isPublished: s.isPublished,
  }));

  const experience: ExperienceItem[] = dbExp.map((e) => ({
    id: e.id,
    organization: e.organization,
    title: e.title,
    period: e.period,
    type: e.type as ExperienceItem['type'],
    location: e.location,
    description: e.description,
    highlights: safeJsonParse<string[]>(e.highlights, []),
    displayOrder: e.displayOrder,
    isPublished: e.isPublished,
  }));

  const education: EducationItem[] = dbEdu.map((e) => ({
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

  const achievements: AchievementItem[] = dbAch.map((a) => ({
    id: a.id,
    metric: a.metric,
    title: a.title,
    category: a.category,
    description: a.description,
    displayOrder: a.displayOrder,
    isPublished: a.isPublished,
  }));

  const personal: PersonalInfo = dbPersonal
    ? {
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
      }
    : {
        name: 'Aswith',
        fullName: 'Ranga Naga Aswith',
        greeting: "HELLO, I'M",
        title: 'B.Tech Electronics & Communication Engineering Student',
        roles: ['B.Tech ECE Student', 'Software & AI Automation Developer'],
        tagline: 'Building practical software and connected systems',
        description: 'ECE undergraduate',
        selfIntroVideo: resolveSupabaseMediaUrl('/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4'),
        educationSummary: { degree: 'B.Tech ECE', cgpa: '8.79 / 10', expectedGraduation: '2028' },
        cta: { primary: { label: 'About Me', action: 'about-me' }, secondary: { label: 'Explore My Work', action: 'explore-work' } },
        social: { phone: '8328671677', email: 'nagaaswith3@gmail.com', github: 'https://github.com/Aswith', linkedin: 'https://linkedin.com/in/Aswith', resumeUrl: '/media/resume.pdf' },
      };

  const rawMedia = dbPersonal
    ? safeJsonParse<MediaConfig>(dbPersonal.media, defaultMediaConfig)
    : defaultMediaConfig;

  const media: MediaConfig = {
    ...rawMedia,
    portrait: resolveSupabaseMediaUrl(rawMedia.portrait),
    selfIntroVideo: resolveSupabaseMediaUrl(rawMedia.selfIntroVideo),
    introVideo: resolveSupabaseMediaUrl(rawMedia.introVideo || defaultMediaConfig.introVideo),
    mobileIntroVideo: resolveSupabaseMediaUrl(rawMedia.mobileIntroVideo || defaultMediaConfig.mobileIntroVideo),
  };

  return {
    projects,
    certificates,
    skills,
    experience,
    education,
    achievements,
    personal,
    media,
  };
}
