/**
 * Dynamic Knowledge Provider for Aswith's Portfolio AI Assistant.
 *
 * Sourced dynamically from the authoritative Prisma Database / CMS layer.
 * Includes in-memory caching with a short TTL (60s) to guarantee fast sub-10ms
 * responses while immediately reflecting any admin CMS modifications.
 */

import { fetchFullAdminData } from '@/lib/dbDataMapper';
import { assistantContext } from '@/data/assistantContext';
import { ProjectItem } from '@/data/projects';
import { CertificateItem } from '@/data/certificates';
import { SkillNode } from '@/data/skills';
import { ExperienceItem, EducationItem } from '@/data/experience';
import { AchievementItem } from '@/data/achievements';
import { PersonalInfo } from '@/data/personal';

export interface AuthoritativeKnowledge {
  personal: {
    fullName: string;
    displayName: string;
    title: string;
    degree: string;
    cgpa: string;
    expectedGraduation: string;
    bio: string;
    tagline: string;
    roles: string[];
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    leetcode: string;
    codechef: string;
    resumeUrl: string;
    location: string;
    interests: string[];
    targetRoles: string[];
  };
  projects: ProjectItem[];
  certificates: CertificateItem[];
  skills: SkillNode[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  websiteCapabilities: {
    framework: string;
    styling: string;
    threeD: string;
    animations: string;
    database: string;
    integrations: string[];
    features: string[];
  };
}

let cachedKnowledge: AuthoritativeKnowledge | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export function invalidateKnowledgeCache(): void {
  cachedKnowledge = null;
  cacheTimestamp = 0;
}

export async function getAuthoritativeKnowledge(): Promise<AuthoritativeKnowledge> {
  const now = Date.now();
  if (cachedKnowledge && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedKnowledge;
  }

  try {
    const adminData = await fetchFullAdminData();

    const pers = adminData.personal || assistantContext.personal;
    const social = (pers as any).social || {};

    const fullName = pers.fullName || assistantContext.personal.fullName || 'Ranga Naga Aswith';
    const displayName = pers.name || assistantContext.personal.name || 'Aswith';
    const title = pers.title || 'Electronics & Communication Engineering Student | Software Developer | IoT Innovator';
    const degree =
      (pers as any).educationSummary?.degree ||
      assistantContext.personal.degree ||
      'B.Tech in Electronics and Communication Engineering';
    const cgpa =
      (pers as any).educationSummary?.cgpa ||
      assistantContext.personal.cgpa ||
      '8.79 / 10';
    const expectedGraduation =
      (pers as any).educationSummary?.expectedGraduation ||
      assistantContext.personal.expectedGraduation ||
      '2028';
    const bio =
      pers.description ||
      assistantContext.personal.bio ||
      'Electronics and Communication Engineering undergraduate with hands-on software development experience in Python, AI automation, web applications, embedded microcontrollers, and data-driven problem solving.';
    const tagline =
      pers.tagline ||
      assistantContext.personal.tagline ||
      'Building practical software, AI automation platforms, and intelligent connected hardware-software systems.';
    const roles =
      pers.roles && pers.roles.length > 0
        ? pers.roles
        : [
            'Software Developer',
            'Full Stack Developer',
            'AI & Automation Developer',
            'Embedded Systems & IoT Innovator',
          ];

    const email = social.email || (pers as any).email || 'nagaaswith3@gmail.com';
    const phone = social.phone || (pers as any).phone || '+91 8328671677';
    const github = social.github || (pers as any).github || 'https://github.com/Aswith';
    const linkedin = social.linkedin || (pers as any).linkedin || 'https://linkedin.com/in/Aswith';
    const leetcode = social.leetcode || 'https://leetcode.com/u/nagaaswith3';
    const codechef = social.codechef || 'https://www.codechef.com/users/nagaaswith3';
    const resumeUrl = social.resumeUrl || (pers as any).resumeUrl || '/media/resume.pdf';

    const knowledge: AuthoritativeKnowledge = {
      personal: {
        fullName,
        displayName,
        title,
        degree,
        cgpa,
        expectedGraduation,
        bio,
        tagline,
        roles,
        email,
        phone,
        github,
        linkedin,
        leetcode,
        codechef,
        resumeUrl,
        location: 'India',
        interests: [
          'Software Development',
          'Full Stack Development',
          'Python',
          'AI Automation',
          'Generative AI',
          'Prompt Engineering',
          'IoT',
          'Embedded Systems',
        ],
        targetRoles: [
          'Software Engineering Intern',
          'Software Developer (Entry Level / Full Time)',
          'AI / Automation Engineer Intern',
          'IoT & Embedded Systems Engineer Intern',
          'Full Stack Web Developer',
        ],
      },
      projects: (adminData.projects || []).filter((p) => p.isPublished !== false),
      certificates: (adminData.certificates || []).filter((c) => c.isPublished !== false),
      skills: (adminData.skills || []).filter((s) => s.isPublished !== false),
      experience: (adminData.experience || []).filter((e) => e.isPublished !== false),
      education: (adminData.education || []).filter((e) => e.isPublished !== false),
      achievements: (adminData.achievements || []).filter((a) => a.isPublished !== false),
      websiteCapabilities: {
        framework: 'Next.js 16 (App Router + Turbopack)',
        styling: 'Tailwind CSS v4 + Glassmorphism aesthetic',
        threeD: 'Three.js WebGL Interactive Particle Grid & Digital Twin',
        animations: 'Framer Motion smooth layout transitions',
        database: 'Prisma ORM with dual SQLite/PostgreSQL support',
        integrations: [
          'Telegram Bot API for instant contact notifications',
          'Resend REST API for secondary email delivery fallback',
          'Supabase Storage for media CDN delivery',
          'AI Assistant with natural language intent understanding',
        ],
        features: [
          'Interactive 3D particle canvas background',
          'Interactive skills radar & proficiency matrix',
          'Dynamic CMS with password-protected admin dashboard',
          'Real-time Telegram & Email contact dispatch with rate-limiting',
          'Offline-safe state recovery',
        ],
      },
    };

    cachedKnowledge = knowledge;
    cacheTimestamp = now;
    return knowledge;
  } catch (err) {
    console.warn('[KnowledgeProvider] Failed to query database, falling back to static context:', err);

    // Fallback if database query encounters error
    const fallbackKnowledge: AuthoritativeKnowledge = {
      personal: {
        fullName: assistantContext.personal.fullName,
        displayName: assistantContext.personal.name,
        title: assistantContext.personal.title,
        degree: assistantContext.personal.degree,
        cgpa: assistantContext.personal.cgpa,
        expectedGraduation: assistantContext.personal.expectedGraduation,
        bio: assistantContext.personal.bio,
        tagline: assistantContext.personal.tagline,
        roles: assistantContext.personal.roles,
        email: assistantContext.personal.email,
        phone: assistantContext.personal.phone,
        github: assistantContext.personal.github,
        linkedin: assistantContext.personal.linkedin,
        leetcode: 'https://leetcode.com/u/nagaaswith3',
        codechef: 'https://www.codechef.com/users/nagaaswith3',
        resumeUrl: assistantContext.personal.resumeUrl,
        location: 'India',
        interests: [
          'Software Development',
          'Full Stack Development',
          'Python',
          'AI Automation',
          'Generative AI',
          'Prompt Engineering',
          'IoT',
          'Embedded Systems',
        ],
        targetRoles: [
          'Software Engineering Intern',
          'Software Developer',
          'AI / Automation Engineer',
          'IoT & Embedded Systems Engineer',
        ],
      },
      projects: assistantContext.projects.map((p, idx) => ({
        id: `project_${idx + 1}`,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        number: String(idx + 1).padStart(2, '0'),
        title: p.name,
        category: 'SOFTWARE',
        categories: ['SOFTWARE'],
        domain: (p as any).domain || '',
        organization: (p as any).organization,
        shortDescription: p.highlights.join('. '),
        fullDescription: p.highlights.join('. '),
        technologies: p.tech,
        features: p.highlights,
        images: { main: '' },
        liveUrl: (p as any).liveUrl,
        githubUrl: 'https://github.com/Aswith',
        year: '2025',
        status: 'Active',
      })),
      certificates: assistantContext.certificates.map((c, idx) => ({
        id: `cert_${idx + 1}`,
        number: String(idx + 1).padStart(2, '0'),
        title: c,
        issuer: 'Verified Authority',
        category: 'Programming & Computational Logic',
        date: '2025',
        description: c,
        skills: [],
        image: '',
      })),
      skills: assistantContext.skills.map((s, idx) => ({
        id: `skill_${idx + 1}`,
        name: s.name,
        category: s.category as any,
        proficiency: parseInt(s.proficiency) || 85,
      })),
      experience: assistantContext.experience.map((e, idx) => ({
        id: `exp_${idx + 1}`,
        title: e.role,
        organization: e.organization,
        period: e.period,
        type: 'INTERNSHIP',
        location: 'India',
        description: e.highlights,
        highlights: [e.highlights],
      })),
      education: [
        {
          id: 'edu_001',
          degree: assistantContext.personal.degree,
          institution: 'Undergraduate Program',
          period: 'Present',
          cgpa: assistantContext.personal.cgpa,
          expectedGraduation: assistantContext.personal.expectedGraduation,
          field: 'Electronics and Communication Engineering',
          highlights: ['CGPA: ' + assistantContext.personal.cgpa],
        },
      ],
      achievements: assistantContext.achievements.map((a, idx) => ({
        id: `ach_${idx + 1}`,
        metric: 'VERIFIED',
        title: a,
        category: 'Achievement',
        description: a,
      })),
      websiteCapabilities: {
        framework: 'Next.js 16 (App Router + Turbopack)',
        styling: 'Tailwind CSS v4 + Glassmorphism aesthetic',
        threeD: 'Three.js WebGL Interactive Particle Grid & Digital Twin',
        animations: 'Framer Motion smooth layout transitions',
        database: 'Prisma ORM with dual SQLite/PostgreSQL support',
        integrations: [
          'Telegram Bot API for instant contact notifications',
          'Resend REST API for secondary email delivery fallback',
        ],
        features: [
          'Interactive 3D particle canvas background',
          'Interactive skills radar & proficiency matrix',
          'Dynamic CMS with password-protected admin dashboard',
        ],
      },
    };

    cachedKnowledge = fallbackKnowledge;
    cacheTimestamp = now;
    return fallbackKnowledge;
  }
}
