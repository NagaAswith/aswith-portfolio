import { create } from 'zustand';
import { ProjectItem } from '@/data/projects';
import { CertificateItem } from '@/data/certificates';
import { SkillNode } from '@/data/skills';
import { ExperienceItem, EducationItem } from '@/data/experience';
import { AchievementItem } from '@/data/achievements';
import { PersonalInfo } from '@/data/personal';
import { contentRepository, MediaConfig } from '@/lib/contentRepository';

interface PortfolioContentState {
  // Collections
  projects: ProjectItem[];
  allProjects: ProjectItem[];
  certificates: CertificateItem[];
  allCertificates: CertificateItem[];
  skills: SkillNode[];
  allSkills: SkillNode[];
  education: EducationItem[];
  allEducation: EducationItem[];
  experience: ExperienceItem[];
  allExperience: ExperienceItem[];
  achievements: AchievementItem[];
  allAchievements: AchievementItem[];

  // Single-instance
  personalInfo: PersonalInfo;
  resume: { path: string; lastUpdated: string };
  media: MediaConfig;

  isInitialized: boolean;

  // Actions
  refresh: () => void;

  // Project Actions
  createProject: (data: Omit<ProjectItem, 'id' | 'number' | 'slug'> & { id?: string; slug?: string }) => ProjectItem;
  updateProject: (id: string, updates: Partial<ProjectItem>) => ProjectItem;
  deleteProject: (id: string) => boolean;
  reorderProjects: (orderedIds: string[]) => void;

  // Certificate Actions
  createCertificate: (data: Omit<CertificateItem, 'id' | 'number'> & { id?: string }) => CertificateItem;
  updateCertificate: (id: string, updates: Partial<CertificateItem>) => CertificateItem;
  deleteCertificate: (id: string) => boolean;
  reorderCertificates: (orderedIds: string[]) => void;

  // Skill Actions
  createSkill: (data: Omit<SkillNode, 'id'> & { id?: string }) => SkillNode;
  updateSkill: (id: string, updates: Partial<SkillNode>) => SkillNode;
  deleteSkill: (id: string) => boolean;
  reorderSkills: (orderedIds: string[]) => void;

  // Education Actions
  createEducation: (data: Omit<EducationItem, 'id'> & { id?: string }) => EducationItem;
  updateEducation: (id: string, updates: Partial<EducationItem>) => EducationItem;
  deleteEducation: (id: string) => boolean;
  reorderEducation: (orderedIds: string[]) => void;

  // Experience Actions
  createExperience: (data: Omit<ExperienceItem, 'id'> & { id?: string }) => ExperienceItem;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => ExperienceItem;
  deleteExperience: (id: string) => boolean;
  reorderExperience: (orderedIds: string[]) => void;

  // Achievement Actions
  createAchievement: (data: Omit<AchievementItem, 'id'> & { id?: string }) => AchievementItem;
  updateAchievement: (id: string, updates: Partial<AchievementItem>) => AchievementItem;
  deleteAchievement: (id: string) => boolean;
  reorderAchievements: (orderedIds: string[]) => void;

  // Personal Info & Media Actions
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => PersonalInfo;
  updateResume: (path: string) => void;
  updateMedia: (updates: Partial<MediaConfig>) => MediaConfig;

  resetToDefault: () => void;
}

const getSnapshot = () => ({
  projects: contentRepository.getProjects({ includeDrafts: false }),
  allProjects: contentRepository.getProjects({ includeDrafts: true }),
  certificates: contentRepository.getCertificates({ includeDrafts: false }),
  allCertificates: contentRepository.getCertificates({ includeDrafts: true }),
  skills: contentRepository.getSkills({ includeDrafts: false }),
  allSkills: contentRepository.getSkills({ includeDrafts: true }),
  education: contentRepository.getEducation({ includeDrafts: false }),
  allEducation: contentRepository.getEducation({ includeDrafts: true }),
  experience: contentRepository.getExperience({ includeDrafts: false }),
  allExperience: contentRepository.getExperience({ includeDrafts: true }),
  achievements: contentRepository.getAchievements({ includeDrafts: false }),
  allAchievements: contentRepository.getAchievements({ includeDrafts: true }),
  personalInfo: contentRepository.getPersonal(),
  resume: contentRepository.getResume(),
  media: contentRepository.getMedia(),
});

export const usePortfolioContent = create<PortfolioContentState>((set) => {
  // Subscribe to repository changes
  contentRepository.subscribe(() => {
    set(getSnapshot());
  });

  // Trigger hydration if running on client
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      contentRepository.init();
      set({
        ...getSnapshot(),
        isInitialized: true,
      });
    }, 0);
  }

  return {
    ...getSnapshot(),
    isInitialized: false,

    refresh: () => {
      set(getSnapshot());
    },

    createProject: (data) => contentRepository.createProject(data),
    updateProject: (id, updates) => contentRepository.updateProject(id, updates),
    deleteProject: (id) => contentRepository.deleteProject(id),
    reorderProjects: (orderedIds) => contentRepository.reorderProjects(orderedIds),

    createCertificate: (data) => contentRepository.createCertificate(data),
    updateCertificate: (id, updates) => contentRepository.updateCertificate(id, updates),
    deleteCertificate: (id) => contentRepository.deleteCertificate(id),
    reorderCertificates: (orderedIds) => contentRepository.reorderCertificates(orderedIds),

    createSkill: (data) => contentRepository.createSkill(data),
    updateSkill: (id, updates) => contentRepository.updateSkill(id, updates),
    deleteSkill: (id) => contentRepository.deleteSkill(id),
    reorderSkills: (orderedIds) => contentRepository.reorderSkills(orderedIds),

    createEducation: (data) => contentRepository.createEducation(data),
    updateEducation: (id, updates) => contentRepository.updateEducation(id, updates),
    deleteEducation: (id) => contentRepository.deleteEducation(id),
    reorderEducation: (orderedIds) => contentRepository.reorderEducation(orderedIds),

    createExperience: (data) => contentRepository.createExperience(data),
    updateExperience: (id, updates) => contentRepository.updateExperience(id, updates),
    deleteExperience: (id) => contentRepository.deleteExperience(id),
    reorderExperience: (orderedIds) => contentRepository.reorderExperience(orderedIds),

    createAchievement: (data) => contentRepository.createAchievement(data),
    updateAchievement: (id, updates) => contentRepository.updateAchievement(id, updates),
    deleteAchievement: (id) => contentRepository.deleteAchievement(id),
    reorderAchievements: (orderedIds) => contentRepository.reorderAchievements(orderedIds),

    updatePersonalInfo: (updates) => contentRepository.updatePersonal(updates),
    updateResume: (path) => contentRepository.updateResume(path),
    updateMedia: (updates) => contentRepository.updateMedia(updates),

    resetToDefault: () => contentRepository.resetToDefault(),
  };
});
