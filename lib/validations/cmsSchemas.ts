import { z } from 'zod';

export const CmsSectionEnum = z.enum([
  'projects',
  'certificates',
  'skills',
  'education',
  'experience',
  'achievements',
  'personal',
]);

export const CmsActionEnum = z.enum(['CREATE', 'UPDATE', 'DELETE', 'REORDER']);

export const ProjectItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  category: z.string().default('SOFTWARE'),
  categories: z.array(z.string()).optional(),
  domain: z.string().optional(),
  organization: z.string().nullable().optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  images: z
    .object({
      main: z.string().optional(),
      gallery: z.array(z.string()).optional(),
    })
    .optional(),
  image: z.string().optional(),
  liveUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  year: z.string().optional(),
  status: z.string().optional(),
  featured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const CertificateItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  score: z.string().nullable().optional(),
  certificationTier: z.string().nullable().optional(),
  credentialId: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
  image: z.string().optional(),
  verificationUrl: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const SkillNodeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  proficiency: z.number().min(0).max(100).optional(),
  connectedIds: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const ExperienceItemSchema = z.object({
  id: z.string().optional(),
  organization: z.string().min(1, 'Organization is required'),
  title: z.string().min(1, 'Title is required'),
  period: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const EducationItemSchema = z.object({
  id: z.string().optional(),
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  period: z.string().optional(),
  cgpa: z.string().optional(),
  expectedGraduation: z.string().optional(),
  field: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const AchievementItemSchema = z.object({
  id: z.string().optional(),
  metric: z.string().min(1, 'Metric is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().optional(),
  description: z.string().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const PersonalInfoSchema = z.object({
  name: z.string().optional(),
  fullName: z.string().optional(),
  greeting: z.string().optional(),
  title: z.string().optional(),
  roles: z.array(z.string()).optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  selfIntroVideo: z.string().optional(),
  educationSummary: z.record(z.string(), z.any()).optional(),
  cta: z.record(z.string(), z.any()).optional(),
  social: z.record(z.string(), z.any()).optional(),
  media: z.record(z.string(), z.any()).optional(),
});

export const AdminDataPayloadSchema = z.object({
  section: CmsSectionEnum,
  action: CmsActionEnum,
  item: z.record(z.string(), z.any()).optional(),
  id: z.string().optional(),
  items: z.array(z.record(z.string(), z.any())).optional(),
});

export type AdminDataPayload = z.infer<typeof AdminDataPayloadSchema>;
