import { projectsData, ProjectItem } from '@/data/projects';
import { certificatesData, CertificateItem } from '@/data/certificates';
import { skillsData, SkillNode } from '@/data/skills';
import { experienceData, educationList, ExperienceItem, EducationItem } from '@/data/experience';
import { achievementsData, AchievementItem } from '@/data/achievements';
import { personal, PersonalInfo } from '@/data/personal';

export interface MediaConfig {
  portrait: string;
  selfIntroVideo: string;
  introVideo: string; // Main hero pre-loader intro video path
  resumePdf: string;
  projectsMediaDir: string;
  certificatesMediaDir: string;
}

const defaultMediaConfig: MediaConfig = {
  portrait: '/media/profile/profile.jpeg',
  selfIntroVideo: '/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4',
  introVideo: '/media/intro/intro-video.mp4',
  resumePdf: '/media/resume.pdf',
  projectsMediaDir: 'public/media/projects/',
  certificatesMediaDir: 'public/media/certificates/',
};


const STORAGE_KEYS = {
  PROJECTS: 'portfolio_cms_projects_v2',
  CERTIFICATES: 'portfolio_cms_certificates_v2',
  SKILLS: 'portfolio_cms_skills_v2',
  EDUCATION: 'portfolio_cms_education_v2',
  EXPERIENCE: 'portfolio_cms_experience_v2',
  ACHIEVEMENTS: 'portfolio_cms_achievements_v2',
  PERSONAL: 'portfolio_cms_personal_v2',
  MEDIA: 'portfolio_cms_media_v2',

  RETIRED_PROJECT_IDS: 'portfolio_cms_retired_project_ids_v2',
  RETIRED_CERT_IDS: 'portfolio_cms_retired_cert_ids_v2',
  RETIRED_SKILL_IDS: 'portfolio_cms_retired_skill_ids_v2',
  RETIRED_EDU_IDS: 'portfolio_cms_retired_edu_ids_v2',
  RETIRED_EXP_IDS: 'portfolio_cms_retired_exp_ids_v2',
  RETIRED_ACH_IDS: 'portfolio_cms_retired_ach_ids_v2',
};

/**
 * Helpers to compute next permanent IDs with retired ID tracking
 */
function getNextPermanentId(
  prefix: string,
  existingIds: string[],
  retiredIds: string[]
): string {
  const allUsed = new Set([...existingIds, ...retiredIds]);
  let counter = 1;

  while (true) {
    const candidate = `${prefix}_${String(counter).padStart(3, '0')}`;
    if (!allUsed.has(candidate)) {
      return candidate;
    }
    counter++;
  }
}

/**
 * Recalculate dynamic sequential display numbering (01, 02, 03...)
 * based on current sorted visible collection.
 */
export function formatDisplayNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

class ContentRepositoryImpl {
  private projects: ProjectItem[] = [];
  private certificates: CertificateItem[] = [];
  private skills: SkillNode[] = [];
  private education: EducationItem[] = [];
  private experience: ExperienceItem[] = [];
  private achievements: AchievementItem[] = [];
  private personal: PersonalInfo = { ...personal };
  private media: MediaConfig = { ...defaultMediaConfig };

  private retiredProjectIds: string[] = [];
  private retiredCertIds: string[] = [];
  private retiredSkillIds: string[] = [];
  private retiredEduIds: string[] = [];
  private retiredExpIds: string[] = [];
  private retiredAchIds: string[] = [];

  private initialized = false;
  private listeners: Array<() => void> = [];

  constructor() {
    this.initDefaultData();
  }

  private initDefaultData() {
    this.projects = JSON.parse(JSON.stringify(projectsData));
    this.certificates = JSON.parse(JSON.stringify(certificatesData));
    this.skills = JSON.parse(JSON.stringify(skillsData));
    this.education = JSON.parse(JSON.stringify(educationList));
    this.experience = JSON.parse(JSON.stringify(experienceData));
    this.achievements = JSON.parse(JSON.stringify(achievementsData));
    this.personal = JSON.parse(JSON.stringify(personal));
    this.media = { ...defaultMediaConfig };

    this.retiredProjectIds = [];
    this.retiredCertIds = [];
    this.retiredSkillIds = [];
    this.retiredEduIds = [];
    this.retiredExpIds = [];
    this.retiredAchIds = [];
  }

  /**
   * Load data from localStorage (browser client) and sync with local API
   */
  public async init() {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;

    try {
      const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      const storedCerts = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      const storedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      const storedEducation = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      const storedExp = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      const storedAch = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      const storedPersonal = localStorage.getItem(STORAGE_KEYS.PERSONAL);
      const storedMedia = localStorage.getItem(STORAGE_KEYS.MEDIA);

      const storedRetiredProj = localStorage.getItem(STORAGE_KEYS.RETIRED_PROJECT_IDS);
      const storedRetiredCerts = localStorage.getItem(STORAGE_KEYS.RETIRED_CERT_IDS);
      const storedRetiredSkills = localStorage.getItem(STORAGE_KEYS.RETIRED_SKILL_IDS);
      const storedRetiredEdu = localStorage.getItem(STORAGE_KEYS.RETIRED_EDU_IDS);
      const storedRetiredExp = localStorage.getItem(STORAGE_KEYS.RETIRED_EXP_IDS);
      const storedRetiredAch = localStorage.getItem(STORAGE_KEYS.RETIRED_ACH_IDS);

      if (storedProjects) this.projects = JSON.parse(storedProjects);
      if (storedCerts) this.certificates = JSON.parse(storedCerts);
      if (storedSkills) this.skills = JSON.parse(storedSkills);
      if (storedEducation) this.education = JSON.parse(storedEducation);
      if (storedExp) this.experience = JSON.parse(storedExp);
      if (storedAch) this.achievements = JSON.parse(storedAch);
      if (storedPersonal) this.personal = JSON.parse(storedPersonal);
      if (storedMedia) this.media = JSON.parse(storedMedia);

      if (storedRetiredProj) this.retiredProjectIds = JSON.parse(storedRetiredProj);
      if (storedRetiredCerts) this.retiredCertIds = JSON.parse(storedRetiredCerts);
      if (storedRetiredSkills) this.retiredSkillIds = JSON.parse(storedRetiredSkills);
      if (storedRetiredEdu) this.retiredEduIds = JSON.parse(storedRetiredEdu);
      if (storedRetiredExp) this.retiredExpIds = JSON.parse(storedRetiredExp);
      if (storedRetiredAch) this.retiredAchIds = JSON.parse(storedRetiredAch);
    } catch (err) {
      console.warn('[ContentRepository] Failed to read from localStorage:', err);
    }

    this.initialized = true;
    this.notify();

    // Sync latest database persistence
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.projects) this.projects = json.data.projects;
          if (json.data.certificates) this.certificates = json.data.certificates;
          if (json.data.skills) this.skills = json.data.skills;
          if (json.data.experience) this.experience = json.data.experience;
          if (json.data.education) this.education = json.data.education;
          if (json.data.achievements) this.achievements = json.data.achievements;
          if (json.data.personal) this.personal = json.data.personal;
          if (json.data.media) this.media = json.data.media;
          this.saveToStorage();
          this.notify();
        }
      }
    } catch {
      // Graceful offline fallback
    }
  }


  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(this.skills));
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(this.education));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(this.experience));
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(this.achievements));
      localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(this.personal));
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(this.media));

      localStorage.setItem(STORAGE_KEYS.RETIRED_PROJECT_IDS, JSON.stringify(this.retiredProjectIds));
      localStorage.setItem(STORAGE_KEYS.RETIRED_CERT_IDS, JSON.stringify(this.retiredCertIds));
      localStorage.setItem(STORAGE_KEYS.RETIRED_SKILL_IDS, JSON.stringify(this.retiredSkillIds));
      localStorage.setItem(STORAGE_KEYS.RETIRED_EDU_IDS, JSON.stringify(this.retiredEduIds));
      localStorage.setItem(STORAGE_KEYS.RETIRED_EXP_IDS, JSON.stringify(this.retiredExpIds));
      localStorage.setItem(STORAGE_KEYS.RETIRED_ACH_IDS, JSON.stringify(this.retiredAchIds));
    } catch (err) {
      console.warn('[ContentRepository] Failed to save to localStorage:', err);
    }
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('[ContentRepository] Listener error:', err);
      }
    });
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 1. PROJECTS (PRESERVED)
  // ─────────────────────────────────────────────────────────────

  public getProjects(options: { includeDrafts?: boolean } = {}): ProjectItem[] {
    const { includeDrafts = false } = options;
    let list = [...this.projects];
    if (!includeDrafts) {
      list = list.filter((p) => p.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list.map((p, idx) => ({
      ...p,
      number: formatDisplayNumber(idx),
    }));
  }

  public getProjectById(id: string): ProjectItem | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public createProject(
    data: Omit<ProjectItem, 'id' | 'number' | 'slug'> & { id?: string; slug?: string }
  ): ProjectItem {
    const existingIds = this.projects.map((p) => p.id);
    const permanentId =
      data.id || getNextPermanentId('project', existingIds, this.retiredProjectIds);

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') ||
      permanentId;

    const nextOrder =
      data.displayOrder ??
      (this.projects.length > 0
        ? Math.max(...this.projects.map((p) => p.displayOrder ?? 0)) + 1
        : 1);

    const newProject: ProjectItem = {
      ...data,
      id: permanentId,
      slug,
      number: formatDisplayNumber(this.projects.length),
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
    };

    this.projects.push(newProject);
    this.saveToStorage();
    this.notify();
    this.syncToApi('projects', 'CREATE', newProject);
    return newProject;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Project with id ${id} not found.`);

    const current = this.projects[index];
    const updated: ProjectItem = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.projects[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('projects', 'UPDATE', updated, id);
    return updated;
  }

  public deleteProject(id: string): boolean {
    const project = this.projects.find((p) => p.id === id);
    if (!project) return false;

    if (!this.retiredProjectIds.includes(id)) {
      this.retiredProjectIds.push(id);
    }
    this.projects = this.projects.filter((p) => p.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('projects', 'DELETE', undefined, id);
    return true;
  }

  public reorderProjects(orderedIds: string[]): ProjectItem[] {
    orderedIds.forEach((id, idx) => {
      const proj = this.projects.find((p) => p.id === id);
      if (proj) proj.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('projects', 'REORDER', undefined, undefined, this.projects);
    return this.getProjects({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 2. CERTIFICATES (PRESERVED)
  // ─────────────────────────────────────────────────────────────

  public getCertificates(options: { includeDrafts?: boolean } = {}): CertificateItem[] {
    const { includeDrafts = false } = options;
    let list = [...this.certificates];
    if (!includeDrafts) {
      list = list.filter((c) => c.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list.map((c, idx) => ({
      ...c,
      number: formatDisplayNumber(idx),
    }));
  }

  public getCertificateById(id: string): CertificateItem | undefined {
    return this.certificates.find((c) => c.id === id);
  }

  public createCertificate(
    data: Omit<CertificateItem, 'id' | 'number'> & { id?: string }
  ): CertificateItem {
    const existingIds = this.certificates.map((c) => c.id);
    const permanentId =
      data.id || getNextPermanentId('cert', existingIds, this.retiredCertIds);

    const nextOrder =
      data.displayOrder ??
      (this.certificates.length > 0
        ? Math.max(...this.certificates.map((c) => c.displayOrder ?? 0)) + 1
        : 1);

    const newCert: CertificateItem = {
      ...data,
      id: permanentId,
      number: formatDisplayNumber(this.certificates.length),
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
    };

    this.certificates.push(newCert);
    this.saveToStorage();
    this.notify();
    this.syncToApi('certificates', 'CREATE', newCert);
    return newCert;
  }

  public updateCertificate(
    id: string,
    updates: Partial<CertificateItem>
  ): CertificateItem {
    const index = this.certificates.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Certificate with id ${id} not found.`);

    const current = this.certificates[index];
    const updated: CertificateItem = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.certificates[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('certificates', 'UPDATE', updated, id);
    return updated;
  }

  public deleteCertificate(id: string): boolean {
    const cert = this.certificates.find((c) => c.id === id);
    if (!cert) return false;

    if (!this.retiredCertIds.includes(id)) {
      this.retiredCertIds.push(id);
    }
    this.certificates = this.certificates.filter((c) => c.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('certificates', 'DELETE', undefined, id);
    return true;
  }

  public reorderCertificates(orderedIds: string[]): CertificateItem[] {
    orderedIds.forEach((id, idx) => {
      const cert = this.certificates.find((c) => c.id === id);
      if (cert) cert.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('certificates', 'REORDER', undefined, undefined, this.certificates);
    return this.getCertificates({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. SKILLS MATRIX (NEW FULL CRUD)
  // ─────────────────────────────────────────────────────────────

  public getSkills(options: { includeDrafts?: boolean } = {}): SkillNode[] {
    const { includeDrafts = false } = options;
    let list = [...this.skills];
    if (!includeDrafts) {
      list = list.filter((s) => s.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list;
  }

  public getSkillById(id: string): SkillNode | undefined {
    return this.skills.find((s) => s.id === id);
  }

  public createSkill(data: Omit<SkillNode, 'id'> & { id?: string }): SkillNode {
    const existingIds = this.skills.map((s) => s.id);
    const permanentId =
      data.id || getNextPermanentId('skill', existingIds, this.retiredSkillIds);

    const nextOrder =
      data.displayOrder ??
      (this.skills.length > 0
        ? Math.max(...this.skills.map((s) => s.displayOrder ?? 0)) + 1
        : 1);

    const newSkill: SkillNode = {
      ...data,
      id: permanentId,
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
      connectedIds: data.connectedIds || [],
    };

    this.skills.push(newSkill);
    this.saveToStorage();
    this.notify();
    this.syncToApi('skills', 'CREATE', newSkill);
    return newSkill;
  }

  public updateSkill(id: string, updates: Partial<SkillNode>): SkillNode {
    const index = this.skills.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Skill with id ${id} not found.`);

    const current = this.skills[index];
    const updated: SkillNode = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.skills[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('skills', 'UPDATE', updated, id);
    return updated;
  }

  public deleteSkill(id: string): boolean {
    const skill = this.skills.find((s) => s.id === id);
    if (!skill) return false;

    if (!this.retiredSkillIds.includes(id)) {
      this.retiredSkillIds.push(id);
    }
    this.skills = this.skills.filter((s) => s.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('skills', 'DELETE', undefined, id);
    return true;
  }

  public reorderSkills(orderedIds: string[]): SkillNode[] {
    orderedIds.forEach((id, idx) => {
      const skill = this.skills.find((s) => s.id === id);
      if (skill) skill.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('skills', 'REORDER', undefined, undefined, this.skills);
    return this.getSkills({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 4. EDUCATION (NEW FULL CRUD)
  // ─────────────────────────────────────────────────────────────

  public getEducation(options: { includeDrafts?: boolean } = {}): EducationItem[] {
    const { includeDrafts = false } = options;
    let list = [...this.education];
    if (!includeDrafts) {
      list = list.filter((e) => e.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list;
  }

  public getEducationById(id: string): EducationItem | undefined {
    return this.education.find((e) => e.id === id);
  }

  public createEducation(data: Omit<EducationItem, 'id'> & { id?: string }): EducationItem {
    const existingIds = this.education.map((e) => e.id);
    const permanentId =
      data.id || getNextPermanentId('edu', existingIds, this.retiredEduIds);

    const nextOrder =
      data.displayOrder ??
      (this.education.length > 0
        ? Math.max(...this.education.map((e) => e.displayOrder ?? 0)) + 1
        : 1);

    const newEdu: EducationItem = {
      ...data,
      id: permanentId,
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
      highlights: data.highlights || [],
    };

    this.education.push(newEdu);
    this.saveToStorage();
    this.notify();
    this.syncToApi('education', 'CREATE', newEdu);
    return newEdu;
  }

  public updateEducation(id: string, updates: Partial<EducationItem>): EducationItem {
    const index = this.education.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Education item with id ${id} not found.`);

    const current = this.education[index];
    const updated: EducationItem = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.education[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('education', 'UPDATE', updated, id);
    return updated;
  }

  public deleteEducation(id: string): boolean {
    const edu = this.education.find((e) => e.id === id);
    if (!edu) return false;

    if (!this.retiredEduIds.includes(id)) {
      this.retiredEduIds.push(id);
    }
    this.education = this.education.filter((e) => e.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('education', 'DELETE', undefined, id);
    return true;
  }

  public reorderEducation(orderedIds: string[]): EducationItem[] {
    orderedIds.forEach((id, idx) => {
      const edu = this.education.find((e) => e.id === id);
      if (edu) edu.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('education', 'REORDER', undefined, undefined, this.education);
    return this.getEducation({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 5. EXPERIENCE (NEW FULL CRUD)
  // ─────────────────────────────────────────────────────────────

  public getExperience(options: { includeDrafts?: boolean } = {}): ExperienceItem[] {
    const { includeDrafts = false } = options;
    let list = [...this.experience];
    if (!includeDrafts) {
      list = list.filter((e) => e.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list;
  }

  public getExperienceById(id: string): ExperienceItem | undefined {
    return this.experience.find((e) => e.id === id);
  }

  public createExperience(data: Omit<ExperienceItem, 'id'> & { id?: string }): ExperienceItem {
    const existingIds = this.experience.map((e) => e.id);
    const permanentId =
      data.id || getNextPermanentId('exp', existingIds, this.retiredExpIds);

    const nextOrder =
      data.displayOrder ??
      (this.experience.length > 0
        ? Math.max(...this.experience.map((e) => e.displayOrder ?? 0)) + 1
        : 1);

    const newExp: ExperienceItem = {
      ...data,
      id: permanentId,
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
      highlights: data.highlights || [],
    };

    this.experience.push(newExp);
    this.saveToStorage();
    this.notify();
    this.syncToApi('experience', 'CREATE', newExp);
    return newExp;
  }

  public updateExperience(id: string, updates: Partial<ExperienceItem>): ExperienceItem {
    const index = this.experience.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Experience with id ${id} not found.`);

    const current = this.experience[index];
    const updated: ExperienceItem = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.experience[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('experience', 'UPDATE', updated, id);
    return updated;
  }

  public deleteExperience(id: string): boolean {
    const exp = this.experience.find((e) => e.id === id);
    if (!exp) return false;

    if (!this.retiredExpIds.includes(id)) {
      this.retiredExpIds.push(id);
    }
    this.experience = this.experience.filter((e) => e.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('experience', 'DELETE', undefined, id);
    return true;
  }

  public reorderExperience(orderedIds: string[]): ExperienceItem[] {
    orderedIds.forEach((id, idx) => {
      const exp = this.experience.find((e) => e.id === id);
      if (exp) exp.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('experience', 'REORDER', undefined, undefined, this.experience);
    return this.getExperience({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 6. ACHIEVEMENTS (NEW FULL CRUD)
  // ─────────────────────────────────────────────────────────────

  public getAchievements(options: { includeDrafts?: boolean } = {}): AchievementItem[] {
    const { includeDrafts = false } = options;
    let list = [...this.achievements];
    if (!includeDrafts) {
      list = list.filter((a) => a.isPublished !== false);
    }
    list.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return list;
  }

  public getAchievementById(id: string): AchievementItem | undefined {
    return this.achievements.find((a) => a.id === id);
  }

  public createAchievement(data: Omit<AchievementItem, 'id'> & { id?: string }): AchievementItem {
    const existingIds = this.achievements.map((a) => a.id);
    const permanentId =
      data.id || getNextPermanentId('ach', existingIds, this.retiredAchIds);

    const nextOrder =
      data.displayOrder ??
      (this.achievements.length > 0
        ? Math.max(...this.achievements.map((a) => a.displayOrder ?? 0)) + 1
        : 1);

    const newAch: AchievementItem = {
      ...data,
      id: permanentId,
      displayOrder: nextOrder,
      isPublished: data.isPublished ?? true,
    };

    this.achievements.push(newAch);
    this.saveToStorage();
    this.notify();
    this.syncToApi('achievements', 'CREATE', newAch);
    return newAch;
  }

  public updateAchievement(id: string, updates: Partial<AchievementItem>): AchievementItem {
    const index = this.achievements.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Achievement with id ${id} not found.`);

    const current = this.achievements[index];
    const updated: AchievementItem = {
      ...current,
      ...updates,
      id: current.id,
    };

    this.achievements[index] = updated;
    this.saveToStorage();
    this.notify();
    this.syncToApi('achievements', 'UPDATE', updated, id);
    return updated;
  }

  public deleteAchievement(id: string): boolean {
    const ach = this.achievements.find((a) => a.id === id);
    if (!ach) return false;

    if (!this.retiredAchIds.includes(id)) {
      this.retiredAchIds.push(id);
    }
    this.achievements = this.achievements.filter((a) => a.id !== id);
    this.saveToStorage();
    this.notify();
    this.syncToApi('achievements', 'DELETE', undefined, id);
    return true;
  }

  public reorderAchievements(orderedIds: string[]): AchievementItem[] {
    orderedIds.forEach((id, idx) => {
      const ach = this.achievements.find((a) => a.id === id);
      if (ach) ach.displayOrder = idx + 1;
    });
    this.saveToStorage();
    this.notify();
    this.syncToApi('achievements', 'REORDER', undefined, undefined, this.achievements);
    return this.getAchievements({ includeDrafts: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 7. PERSONAL INFO & HERO (NEW EDIT & SAVE)
  // ─────────────────────────────────────────────────────────────

  public getPersonal(): PersonalInfo {
    return { ...this.personal };
  }

  public updatePersonal(updates: Partial<PersonalInfo>): PersonalInfo {
    this.personal = {
      ...this.personal,
      ...updates,
      social: {
        ...this.personal.social,
        ...(updates.social || {}),
      },
      educationSummary: {
        ...this.personal.educationSummary,
        ...(updates.educationSummary || {}),
      },
      cta: {
        ...this.personal.cta,
        ...(updates.cta || {}),
      },
    };

    this.saveToStorage();
    this.notify();
    this.syncToApi('personal', 'UPDATE', this.personal);
    return { ...this.personal };
  }

  // ─────────────────────────────────────────────────────────────
  // 8. RESUME SPECIFICATION (NEW MANAGE)
  // ─────────────────────────────────────────────────────────────

  public getResume(): { path: string; lastUpdated: string } {
    return {
      path: this.personal.social.resumeUrl || '/media/resume.pdf',
      lastUpdated: 'August 2026',
    };
  }

  public updateResume(path: string): void {
    this.personal.social.resumeUrl = path;
    this.media.resumePdf = path;
    this.saveToStorage();
    this.notify();
    this.syncToApi('personal', 'UPDATE', this.personal);
  }

  // ─────────────────────────────────────────────────────────────
  // 9. MEDIA MAPPING (NEW MANAGE)
  // ─────────────────────────────────────────────────────────────

  public getMedia(): MediaConfig {
    return { ...this.media };
  }

  public updateMedia(updates: Partial<MediaConfig>): MediaConfig {
    this.media = {
      ...this.media,
      ...updates,
    };
    if (updates.portrait) {
      // portrait sync
    }
    if (updates.selfIntroVideo) {
      this.personal.selfIntroVideo = updates.selfIntroVideo;
    }
    if (updates.resumePdf) {
      this.personal.social.resumeUrl = updates.resumePdf;
    }
    this.saveToStorage();
    this.notify();
    this.syncToApi('personal', 'UPDATE', { ...this.personal, media: this.media });
    return { ...this.media };
  }

  // ─────────────────────────────────────────────────────────────
  // RESET / SEED
  // ─────────────────────────────────────────────────────────────
  public resetToDefault() {
    this.initDefaultData();
    this.saveToStorage();
    this.notify();
  }

  private async syncToApi(
    section: string,
    action: string,
    item?: unknown,
    id?: string,
    items?: unknown
  ) {
    if (typeof window === 'undefined') return;
    try {
      await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, action, item, id, items }),
      });
    } catch {
      // Offline / unauthenticated graceful fallback
    }
  }
}

export const contentRepository = new ContentRepositoryImpl();
