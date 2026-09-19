/**
 * Master AI Assistant Engine for Aswith's Portfolio.
 *
 * Implements:
 * - Dynamic authoritative knowledge retrieval from Prisma CMS with caching
 * - Deterministic Creator/Boss answer ("...my portfolio owner and creator is Naga Aswith")
 * - Strict security & prompt injection defense
 * - Multi-turn conversational context memory (follow-ups like "which one uses Python?", "tell me more")
 * - Clarification & confirmation protocol for ambiguous inputs ("aswith ai", "intern")
 * - Multi-intent query synthesis
 * - Recruiter-oriented professional evaluations
 * - Clear distinction between general programming knowledge and Aswith's specific work
 * - Direct authoritative links (GitHub, LinkedIn, LeetCode, CodeChef, Resume, Email, Phone)
 */

import { getAuthoritativeKnowledge, AuthoritativeKnowledge } from './knowledgeProvider';
import { normalizeInput } from './inputNormalizer';
import { detectIntents, DetectedIntent, IntentType } from './intentDetector';
import { ProjectItem } from '@/data/projects';
import { CertificateItem } from '@/data/certificates';
import { SkillNode } from '@/data/skills';
import { ExperienceItem } from '@/data/experience';
import { AchievementItem } from '@/data/achievements';

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

export interface ProcessMessageOptions {
  message: string;
  history?: ChatMessage[];
  sessionId?: string;
}

export interface AssistantResponse {
  reply: string;
  action?: 'navigate' | 'openContact';
  target?: string;
  confirmationNeeded?: boolean;
}

// In-memory session store to preserve context when clients do not transmit full history
const sessionContextMap = new Map<string, { lastTopic?: string; lastEntities?: string[]; pendingClarification?: string }>();

export class AssistantEngine {
  /**
   * Main entry point to process a user message.
   */
  public async processMessage(options: ProcessMessageOptions): Promise<AssistantResponse> {
    const rawMessage = options.message || '';
    const history = options.history || [];
    const sessionId = options.sessionId || 'default';

    const normalized = normalizeInput(rawMessage);
    const knowledge = await getAuthoritativeKnowledge();
    const intentAnalysis = detectIntents(normalized, knowledge);

    // ── STEP 1: SECURITY CHECK (IMMEDIATE HARD REFUSAL) ───────────────────────
    if (intentAnalysis.primaryIntent.type === 'SECURITY_INJECTION') {
      return {
        reply:
          'I cannot disclose internal system configuration, credentials, or administrative keys. I am here to answer questions about Aswith\'s engineering work, skills, projects, and background.',
      };
    }

    // ── STEP 2: CREATOR / BOSS QUESTIONS (DETERMINISTIC) ─────────────────────
    if (intentAnalysis.primaryIntent.type === 'CREATOR_BOSS') {
      return {
        reply: 'I was created for Aswith\'s portfolio, and my portfolio owner and creator is Naga Aswith.',
      };
    }

    // ── STEP 3: AMBIGUOUS INPUT CONFIRMATION ─────────────────────────────────
    if (intentAnalysis.primaryIntent.type === 'AMBIGUOUS_CLARIFICATION') {
      const prompt =
        intentAnalysis.primaryIntent.entities?.clarificationPrompt ||
        'Could you please clarify what you would like to know?';
      const pending = intentAnalysis.primaryIntent.entities?.clarificationIntent || 'PROJECTS_ALL';

      // Record in session
      sessionContextMap.set(sessionId, { pendingClarification: pending });

      return {
        reply: prompt,
        confirmationNeeded: true,
      };
    }

    // ── STEP 4: CONVERSATIONAL CONFIRMATION HANDLING (YES / NO) ──────────────
    const lastAssistantMessage = [...history]
      .reverse()
      .find((m) => m.sender === 'assistant')?.text || '';

    const sessionData = sessionContextMap.get(sessionId);

    // If user says YES to a previous confirmation
    if (intentAnalysis.primaryIntent.type === 'CONFIRMATION_YES') {
      if (
        lastAssistantMessage.includes('AI projects and Generative AI work') ||
        sessionData?.pendingClarification === 'AI_PROJECTS'
      ) {
        if (sessionData) sessionData.pendingClarification = undefined;
        return this.generateAiProjectsAnswer(knowledge);
      }
      if (
        lastAssistantMessage.includes('internships and experience') ||
        sessionData?.pendingClarification === 'INTERNSHIPS_EXPERIENCE'
      ) {
        if (sessionData) sessionData.pendingClarification = undefined;
        return this.generateExperienceAnswer(knowledge);
      }
      return {
        reply:
          'Great! How can I help you explore Aswith\'s projects, technical skills, certifications, or background?',
      };
    }

    // If user says NO to a previous confirmation
    if (intentAnalysis.primaryIntent.type === 'CONFIRMATION_NO') {
      if (sessionData) sessionData.pendingClarification = undefined;
      return {
        reply:
          'Understood. What would you like to know about Aswith? You can ask about his engineering projects, technical skills, education, internships, or contact details.',
      };
    }

    // ── STEP 5: CONTEXTUAL FOLLOW-UPS ("WHICH ONE", "TELL ME MORE") ───────────
    if (intentAnalysis.primaryIntent.type === 'FOLLOW_UP_WHICH') {
      return this.handleWhichOneFollowUp(normalized.normalized, history, knowledge);
    }

    if (intentAnalysis.primaryIntent.type === 'FOLLOW_UP_MORE') {
      return this.handleTellMeMoreFollowUp(normalized.normalized, history, knowledge);
    }

    // ── STEP 6: MULTI-INTENT QUERIES ──────────────────────────────────────────
    if (intentAnalysis.isMultiIntent) {
      return this.handleMultiIntent(intentAnalysis.multiIntents, knowledge);
    }

    // ── STEP 7: DIRECT INTENT HANDLERS ────────────────────────────────────────
    const primary = intentAnalysis.primaryIntent;

    switch (primary.type) {
      case 'NAVIGATION':
        return this.handleNavigation(primary, knowledge);

      case 'GITHUB':
        return {
          reply: `Aswith's official GitHub profile: ${knowledge.personal.github}\nYou can explore his open-source repositories and code implementations there.`,
        };

      case 'LINKEDIN':
        return {
          reply: `Aswith's official LinkedIn profile: ${knowledge.personal.linkedin}\nConnect with him for software engineering and technology opportunities.`,
        };

      case 'LEETCODE':
        return {
          reply: `Aswith's LeetCode profile: ${knowledge.personal.leetcode}\nHe has solved 70+ algorithmic problems across data structures, arrays, dynamic programming, and graphs.`,
        };

      case 'CODECHEF':
        return {
          reply: `Aswith is a **CodeChef 2-Star Coder** with over 300+ problem solutions.\nProfile: ${knowledge.personal.codechef}`,
        };

      case 'RESUME':
        return {
          reply: `You can view or download Aswith's resume at: ${knowledge.personal.resumeUrl}\nIt summarizes his B.Tech ECE academics (CGPA 8.79), software engineering projects, IoT internship, and certifications.`,
        };

      case 'CONTACT':
        return {
          reply: `You can reach Ranga Naga Aswith directly through:\n• **Email:** ${knowledge.personal.email}\n• **Phone:** ${knowledge.personal.phone}\n• **WhatsApp:** https://wa.me/918328671677\n• Or submit the direct contact form located in the footer.`,
          action: 'openContact',
          target: 'contact',
        };

      case 'IDENTITY_ABOUT':
        return {
          reply: `${knowledge.personal.fullName} is an ${knowledge.personal.title} with a CGPA of ${knowledge.personal.cgpa} (graduating ${knowledge.personal.expectedGraduation}).\n\n${knowledge.personal.bio}`,
        };

      case 'EDUCATION':
        return {
          reply: `Aswith is pursuing his **${knowledge.personal.degree}** with a cumulative CGPA of **${knowledge.personal.cgpa}** (expected graduation: **${knowledge.personal.expectedGraduation}**).\nHis coursework spans embedded microcontrollers, digital logic, signals and systems, and practical computer science software engineering.`,
        };

      case 'SKILLS':
        return this.generateSkillsAnswer(knowledge);

      case 'PROGRAMMING_LANGUAGES':
        return {
          reply: `Aswith is proficient in:\n• **Python (95%):** Primary language used for Aswith AI desktop assistant, automation workflows, and algorithmic programming.\n• **C Language (85%):** System programming and embedded microcontroller development.\n• **JavaScript / TypeScript (88%):** Modern full-stack web applications (React, Next.js).\n• **SQL (82%):** Relational database querying and data modeling.\n• **Embedded C/C++:** Microcontroller firmware on Arduino and ADAS systems.`,
        };

      case 'PYTHON':
        return {
          reply: `Python is Aswith's primary programming language (95% proficiency).\nHe has utilized Python to engineer:\n1. **Aswith AI:** Desktop voice assistant and automation platform using SpeechRecognition, Pyttsx3, PyAutoGUI, and Tkinter.\n2. **Cloud Automation:** Cloud integrations and infrastructure scripting using AWS Boto3.\n3. **Problem Solving:** Data structures and algorithmic solutions (300+ CodeChef solutions).`,
        };

      case 'C_LANGUAGE':
        return {
          reply: `Aswith possesses strong foundations in **C Language** (85% proficiency). He earned the SoloLearn C Certification and applies Embedded C/C++ for hardware telematics, microcontroller programming, and ADAS hazard alert logic.`,
        };

      case 'PROJECTS_ALL':
        return this.generateAllProjectsAnswer(knowledge);

      case 'PROJECT_SPECIFIC':
        return this.generateSpecificProjectAnswer(primary.entities?.projectSlug, knowledge);

      case 'AI_PROJECTS':
        return this.generateAiProjectsAnswer(knowledge);

      case 'IOT_PROJECTS':
        return this.generateIotProjectsAnswer(knowledge);

      case 'EMBEDDED_PROJECTS':
        return this.generateEmbeddedProjectsAnswer(knowledge);

      case 'INTERNSHIPS_EXPERIENCE':
        return this.generateExperienceAnswer(knowledge);

      case 'CERTIFICATES':
        return this.generateCertificatesAnswer(knowledge);

      case 'ACHIEVEMENTS':
        return this.generateAchievementsAnswer(knowledge);

      case 'RECRUITER_ROLES':
        return this.generateRecruiterRolesAnswer(knowledge);

      case 'PORTFOLIO_WEBSITE':
        return {
          reply: `This portfolio was built with ${knowledge.websiteCapabilities.framework}, ${knowledge.websiteCapabilities.styling}, and ${knowledge.websiteCapabilities.threeD}.\nKey capabilities include:\n• ${knowledge.websiteCapabilities.integrations.join('\n• ')}`,
        };

      case 'ASSISTANT_IDENTITY':
        return {
          reply: `I am Aswith's Portfolio AI Assistant, designed to provide verified information about his software engineering projects, technical skills, certifications, internships, and background.`,
        };

      case 'GREETING':
        return {
          reply: `Hello! I'm Aswith's AI Assistant. How can I assist you today? You can ask about his engineering projects, technical stack, internships, or contact options.`,
        };

      case 'GENERAL_KNOWLEDGE':
        return this.handleGeneralQuestion(normalized.raw, knowledge);

      case 'OUT_OF_SCOPE':
      default: {
        // Dynamic entity check before falling back to generic out-of-scope response
        const dynamicProject = this.findDynamicProject(normalized.normalized, knowledge);
        if (dynamicProject) {
          return this.generateSpecificProjectAnswer(dynamicProject.slug, knowledge);
        }

        const dynamicCert = this.findDynamicCertificate(normalized.normalized, knowledge);
        if (dynamicCert) {
          return this.generateSpecificCertificateAnswer(dynamicCert);
        }

        const dynamicSkill = this.findDynamicSkill(normalized.normalized, knowledge);
        if (dynamicSkill) {
          return this.generateSpecificSkillAnswer(dynamicSkill);
        }

        const dynamicExp = this.findDynamicExperience(normalized.normalized, knowledge);
        if (dynamicExp) {
          return {
            reply: `**${dynamicExp.title} at ${dynamicExp.organization}** (${dynamicExp.period})\n\n${dynamicExp.description}\n\n• Location: ${dynamicExp.location || 'India'}\n• Type: ${dynamicExp.type || 'Experience'}`,
          };
        }

        const dynamicAch = this.findDynamicAchievement(normalized.normalized, knowledge);
        if (dynamicAch) {
          return {
            reply: `**${dynamicAch.metric} — ${dynamicAch.title}**\n\n${dynamicAch.description}\n• Category: ${dynamicAch.category}`,
          };
        }

        return {
          reply:
            'That information isn\'t currently available in my portfolio knowledge base. I can help with questions about Aswith, his projects, skills, education, experience, achievements, or this portfolio.',
        };
      }
    }
  }

  // ── HELPER: NAVIGATION ──────────────────────────────────────────────────
  private handleNavigation(intent: DetectedIntent, knowledge: AuthoritativeKnowledge): AssistantResponse {
    const target = intent.entities?.navigationTarget || 'work';
    const sectionNames: Record<string, string> = {
      work: 'Engineering Projects',
      skills: 'Skills Matrix',
      certificates: 'Certificates & Credentials',
      experience: 'Experience & Education',
      contact: 'Contact Form',
      about: 'About Aswith',
    };

    return {
      reply: `Navigating to the ${sectionNames[target] || target} section now.`,
      action: target === 'contact' ? 'openContact' : 'navigate',
      target,
    };
  }

  // ── HELPER: ALL PROJECTS ────────────────────────────────────────────────
  private generateAllProjectsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const list = knowledge.projects
      .map((p) => `• **${p.title}** (${p.domain || p.category})`)
      .join('\n');
    return {
      reply: `Aswith has engineered ${knowledge.projects.length} key projects:\n\n${list}\n\nAsk about any specific project for architecture, tech stack, and feature details!`,
    };
  }

  // ── HELPER: SPECIFIC PROJECT ────────────────────────────────────────────
  private generateSpecificProjectAnswer(slug: string | undefined, knowledge: AuthoritativeKnowledge): AssistantResponse {
    const proj = slug
      ? knowledge.projects.find((p) => p.slug === slug || p.id === slug || p.title.toLowerCase() === slug.toLowerCase()) || knowledge.projects[0]
      : knowledge.projects[0];
    if (!proj) {
      return { reply: 'That project is not currently available in the portfolio records.' };
    }

    const techList = proj.technologies.join(', ');
    const featuresList = proj.features.slice(0, 4).map((f) => `• ${f}`).join('\n');
    const liveLink = proj.liveUrl ? `\n• **Live Link:** ${proj.liveUrl}` : '';
    const ghLink = proj.githubUrl ? `\n• **GitHub:** ${proj.githubUrl}` : '';

    return {
      reply: `**${proj.title}**\n\n• **Domain:** ${proj.domain}\n• **Technologies:** ${techList}\n• **Summary:** ${proj.shortDescription}\n\n**Key Features & Highlights:**\n${featuresList}${liveLink}${ghLink}`,
    };
  }

  // ── HELPER: AI PROJECTS ─────────────────────────────────────────────────
  private generateAiProjectsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const aiProjects = knowledge.projects.filter(
      (p) =>
        p.category === 'AI' ||
        p.categories?.includes('AI') ||
        p.title.toLowerCase().includes('ai') ||
        p.technologies.some((t) => /python|ai|llm/i.test(t))
    );

    const bullets = aiProjects
      .map((p) => `• **${p.title}:** ${p.shortDescription} (Built with ${p.technologies.slice(0, 4).join(', ')})`)
      .join('\n\n');

    return {
      reply: `Aswith has developed key AI & Generative AI engineering work:\n\n${bullets}\n\nHe also completed certified training in **Introduction to Generative AI** (Google Cloud / Simplilearn) and AI workflow orchestration using CrewAI and n8n.`,
    };
  }

  // ── HELPER: IOT & EMBEDDED PROJECTS ─────────────────────────────────────
  private generateIotProjectsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const iotProjects = knowledge.projects.filter(
      (p) =>
        p.category === 'IOT' ||
        p.category === 'EMBEDDED' ||
        p.categories?.includes('IOT') ||
        p.categories?.includes('EMBEDDED')
    );

    const bullets = iotProjects
      .map((p) => `• **${p.title}:** ${p.shortDescription} (Tech: ${p.technologies.join(', ')})`)
      .join('\n\n');

    return {
      reply: `Aswith has hands-on IoT engineering experience spanning hardware, microcontrollers, and telematics:\n\n${bullets}\n\nHe also completed an IoT Engineering Internship at Emertxe Information Technologies focusing on real-time vehicle telemetry and dashboards.`,
    };
  }

  private generateEmbeddedProjectsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    return this.generateIotProjectsAnswer(knowledge);
  }

  // ── HELPER: SKILLS ──────────────────────────────────────────────────────
  private generateSkillsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const skillsByCategory: Record<string, string[]> = {};
    for (const s of knowledge.skills) {
      const cat = s.category || 'General';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(`${s.name} (${s.proficiency}%)`);
    }

    const sections = Object.entries(skillsByCategory)
      .map(([cat, list]) => `• **${cat}:** ${list.join(', ')}`)
      .join('\n');

    return {
      reply: `Aswith's technical matrix spans four core domains:\n\n${sections}\n\nCore strengths: Python, Software Development, Embedded IoT, and AI Automation.`,
    };
  }

  // ── HELPER: INTERNSHIPS & EXPERIENCE ────────────────────────────────────
  private generateExperienceAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const list = knowledge.experience
      .map((e) => `• **${e.title} at ${e.organization}** (${e.period})\n  ${e.description}`)
      .join('\n\n');

    return {
      reply: `Aswith's engineering experience:\n\n${list}`,
    };
  }

  // ── HELPER: CERTIFICATES ────────────────────────────────────────────────
  private generateCertificatesAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const list = knowledge.certificates
      .slice(0, 8)
      .map((c) => `• **${c.title}** — ${c.issuer}${c.score ? ` (${c.score})` : ''}`)
      .join('\n');

    return {
      reply: `Aswith holds ${knowledge.certificates.length} verified technical credentials including:\n\n${list}\n\nSpanning Python, AWS Cloud, Generative AI, Embedded Systems, and National Hackathons.`,
    };
  }

  // ── HELPER: ACHIEVEMENTS ────────────────────────────────────────────────
  private generateAchievementsAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const list = knowledge.achievements
      .map((a) => `• **${a.metric} — ${a.title}:** ${a.description}`)
      .join('\n');

    return {
      reply: `Key engineering achievements:\n\n${list}`,
    };
  }

  // ── HELPER: RECRUITER ROLES ─────────────────────────────────────────────
  private generateRecruiterRolesAnswer(knowledge: AuthoritativeKnowledge): AssistantResponse {
    const rolesList = knowledge.personal.targetRoles.map((r) => `• ${r}`).join('\n');

    return {
      reply: `**Recruiter Overview for Aswith:**\n\n• **Target Roles:**\n${rolesList}\n\n• **Academic Background:** B.Tech ECE (CGPA: 8.79 / 10, expected graduation 2028).\n• **Strongest Technical Areas:** Python software development, Full-Stack web engineering, AI/LLM integration, and Embedded IoT systems.\n• **Coding Track Record:** CodeChef 2-Star Coder with 300+ problems solved, 70+ LeetCode DSA solutions.\n• **Practical Experience:** IoT Engineering Internship at Emertxe, multiple delivered software projects.\n\nAswith is immediately available for Software Engineering Internships and related technical roles.`,
    };
  }

  // ── HELPER: MULTI-INTENT RESOLUTION ─────────────────────────────────────
  private async handleMultiIntent(
    intents: DetectedIntent[],
    knowledge: AuthoritativeKnowledge
  ): Promise<AssistantResponse> {
    const parts: string[] = [];

    for (const intent of intents) {
      if (intent.type === 'EDUCATION') {
        parts.push(
          `**Education:** Aswith is pursuing a ${knowledge.personal.degree} with CGPA ${knowledge.personal.cgpa} (graduating ${knowledge.personal.expectedGraduation}).`
        );
      } else if (intent.type === 'PYTHON' || intent.type === 'PROJECTS_ALL' || intent.type === 'AI_PROJECTS') {
        parts.push(
          `**Projects & Python:** Aswith engineered Aswith AI (voice assistant automation platform in Python), ShopMore (e-commerce platform), Pratibha (AI career discovery), and an Autonomous Obstacle Avoidance RC Car.`
        );
      } else if (intent.type === 'SKILLS') {
        const topSkills = knowledge.skills.slice(0, 6).map((s) => s.name).join(', ');
        parts.push(`**Technologies:** Key technologies include ${topSkills}.`);
      } else if (intent.type === 'CONTACT') {
        parts.push(`**Contact:** Reach Aswith at ${knowledge.personal.email} or +91 ${knowledge.personal.phone}.`);
      }
    }

    if (parts.length > 0) {
      return { reply: parts.join('\n\n') };
    }

    return this.generateAllProjectsAnswer(knowledge);
  }

  // ── HELPER: FOLLOW-UP "WHICH ONE" ───────────────────────────────────────
  private handleWhichOneFollowUp(
    query: string,
    history: ChatMessage[],
    knowledge: AuthoritativeKnowledge
  ): AssistantResponse {
    const priorDiscussion = history.slice(-4).map((m) => m.text).join(' ');

    if (query.includes('python') || priorDiscussion.includes('AI project') || priorDiscussion.includes('Aswith AI')) {
      return {
        reply: `Between his AI and automation projects, **Aswith AI** is built primarily with Python (SpeechRecognition, Pyttsx3, PyAutoGUI, and Tkinter). In contrast, Pratibha uses Next.js, React, and TypeScript with AI logic.`,
      };
    }

    return {
      reply: `Could you specify which area you'd like to compare? For example, Python projects, embedded IoT systems, or web applications.`,
    };
  }

  // ── HELPER: FOLLOW-UP "TELL ME MORE" ────────────────────────────────────
  private handleTellMeMoreFollowUp(
    query: string,
    history: ChatMessage[],
    knowledge: AuthoritativeKnowledge
  ): AssistantResponse {
    const qLower = (query || '').toLowerCase();

    // 1. Direct query topic matching
    if (
      qLower.includes('degree') ||
      qLower.includes('education') ||
      qLower.includes('btech') ||
      qLower.includes('b.tech') ||
      qLower.includes('cgpa') ||
      qLower.includes('college') ||
      qLower.includes('university') ||
      qLower.includes('academic') ||
      qLower.includes('coursework')
    ) {
      return {
        reply: `**Academic Details:**\nAswith's ${knowledge.personal.degree} program balances hardware engineering (microcontrollers, digital logic, VLSI basics) with computer science fundamentals (data structures, algorithms, software design). He maintains an ${knowledge.personal.cgpa} CGPA (expected graduation: ${knowledge.personal.expectedGraduation}).\nHis coursework spans embedded microcontrollers, digital logic, signals and systems, and practical computer science software engineering.`,
      };
    }

    // Check if query mentions a specific dynamic project
    for (const proj of knowledge.projects) {
      if (
        qLower.includes(proj.title.toLowerCase()) ||
        qLower.includes(proj.slug.toLowerCase().replace(/-/g, ' '))
      ) {
        return this.generateSpecificProjectAnswer(proj.slug, knowledge);
      }
    }

    if (qLower.includes('internship') || qLower.includes('experience') || qLower.includes('work')) {
      return this.generateExperienceAnswer(knowledge);
    }

    if (qLower.includes('certif')) {
      return this.generateCertificatesAnswer(knowledge);
    }

    if (qLower.includes('skill')) {
      return this.generateSkillsAnswer(knowledge);
    }

    // 2. Contextual follow-up: inspect history in REVERSE order to find the most recent active topic
    for (let i = history.length - 1; i >= 0; i--) {
      const hText = (history[i].text || '').toLowerCase();

      // Most recent topic: Education
      if (
        hText.includes('education') ||
        hText.includes('degree') ||
        hText.includes('b.tech') ||
        hText.includes('btech') ||
        hText.includes('cgpa') ||
        hText.includes('college') ||
        hText.includes('university')
      ) {
        return {
          reply: `**Academic Details:**\nAswith's ${knowledge.personal.degree} program balances hardware engineering (microcontrollers, digital logic, VLSI basics) with computer science fundamentals (data structures, algorithms, software design). He maintains an ${knowledge.personal.cgpa} CGPA (expected graduation: ${knowledge.personal.expectedGraduation}).\nHis coursework spans embedded microcontrollers, digital logic, signals and systems, and practical computer science software engineering.`,
        };
      }

      // Most recent topic: Specific dynamic project
      for (const proj of knowledge.projects) {
        if (
          hText.includes(proj.title.toLowerCase()) ||
          hText.includes(proj.slug.toLowerCase().replace(/-/g, ' '))
        ) {
          return this.generateSpecificProjectAnswer(proj.slug, knowledge);
        }
      }

      // Most recent topic: Aswith AI / Python automation
      if (
        hText.includes('aswith ai') ||
        hText.includes('speechrecognition') ||
        hText.includes('desktop assistant')
      ) {
        const p = knowledge.projects.find((pr) => pr.slug === 'aswith-ai') || knowledge.projects[0];
        return {
          reply: `**Deep Dive into Aswith AI:**\n\n• **Architecture:** Combines voice input recognition with system API controls and a password-protected Tkinter UI.\n• **Technologies:** Python, SpeechRecognition, Pyttsx3, PyAutoGUI, Tkinter, Wikipedia API, OS APIs.\n• **Key Features:** Hands-free application control, web search automation, media controls, and offline fallback routines.\n• **GitHub Repository:** ${knowledge.personal.github}`,
        };
      }

      // Most recent topic: Internships / Experience
      if (hText.includes('internship') || hText.includes('experience') || hText.includes('emertxe')) {
        return this.generateExperienceAnswer(knowledge);
      }

      // Most recent topic: Certificates
      if (hText.includes('certificate') || hText.includes('credential') || hText.includes('nptel') || hText.includes('aws')) {
        return this.generateCertificatesAnswer(knowledge);
      }

      // Most recent topic: Skills / Programming languages
      if (hText.includes('skill') || hText.includes('programming language') || hText.includes('technologies')) {
        return this.generateSkillsAnswer(knowledge);
      }
    }

    return {
      reply: `Aswith has extensive experience across Python automation, embedded systems, and full-stack web engineering. Which project or skill would you like me to elaborate on?`,
    };
  }

  // ── HELPER: DYNAMIC ENTITY MATCHERS ──────────────────────────────────────
  private findDynamicProject(norm: string, knowledge: AuthoritativeKnowledge): ProjectItem | undefined {
    const cleanQuery = norm.toLowerCase().replace(/^(tell me about|what is|tell me more about|show me|details on|info on|what about)\s+/i, '').trim();

    // 1. Direct title or slug exact/substring match
    for (const p of knowledge.projects) {
      const pTitle = (p.title || '').toLowerCase();
      const pSlug = (p.slug || '').toLowerCase().replace(/-/g, ' ');
      if (norm.includes(pTitle) || cleanQuery === pTitle || norm.includes(pSlug) || cleanQuery === pSlug) {
        return p;
      }
    }

    // 2. Token overlap match (e.g. "quantum sensor telematics platform")
    const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 2 && !['the', 'and', 'for', 'about', 'his', 'project', 'platform', 'app', 'system'].includes(w));
    if (queryWords.length > 0) {
      let bestMatch: ProjectItem | undefined;
      let maxScore = 0;
      for (const p of knowledge.projects) {
        const targetText = `${p.title} ${p.slug.replace(/-/g, ' ')} ${p.domain || ''} ${(p.technologies || []).join(' ')}`.toLowerCase();
        let score = 0;
        for (const word of queryWords) {
          if (targetText.includes(word)) score++;
        }
        if (score >= 2 && score > maxScore) {
          maxScore = score;
          bestMatch = p;
        } else if (queryWords.length === 1 && score === 1 && (p.title || '').toLowerCase().includes(queryWords[0])) {
          if (score > maxScore) {
            maxScore = score;
            bestMatch = p;
          }
        }
      }
      if (bestMatch && maxScore > 0) {
        return bestMatch;
      }
    }

    return undefined;
  }

  private findDynamicCertificate(norm: string, knowledge: AuthoritativeKnowledge): CertificateItem | undefined {
    const clean = norm.toLowerCase().replace(/^(tell me about|what is|show me|certificate|cert)\s+/i, '').trim();
    for (const c of knowledge.certificates) {
      const cTitle = (c.title || '').toLowerCase();
      const cIssuer = (c.issuer || '').toLowerCase();
      if (norm.includes(cTitle) || (clean.length > 3 && cTitle.includes(clean)) || (clean.length > 3 && cIssuer.includes(clean))) {
        return c;
      }
    }
    return undefined;
  }

  private generateSpecificCertificateAnswer(cert: CertificateItem): AssistantResponse {
    const scoreText = cert.score ? ` (Score: ${cert.score})` : '';
    const tierText = cert.certificationTier ? ` • Tier: ${cert.certificationTier}` : '';
    const skillsText = cert.skills && cert.skills.length > 0 ? `\n• **Skills Covered:** ${cert.skills.join(', ')}` : '';
    const urlText = cert.verificationUrl ? `\n• **Verification:** ${cert.verificationUrl}` : '';

    return {
      reply: `**${cert.title}**\n\n• **Issuer:** ${cert.issuer}${scoreText}${tierText}\n• **Summary:** ${cert.description}${skillsText}${urlText}`,
    };
  }

  private findDynamicSkill(norm: string, knowledge: AuthoritativeKnowledge): SkillNode | undefined {
    for (const s of knowledge.skills) {
      const sName = (s.name || '').toLowerCase();
      if (norm === sName || norm.includes(sName)) {
        return s;
      }
    }
    return undefined;
  }

  private generateSpecificSkillAnswer(skill: SkillNode): AssistantResponse {
    return {
      reply: `**${skill.name}**\n\n• **Proficiency:** ${skill.proficiency}%\n• **Category:** ${skill.category}\n• **Domain:** Technical Skills Matrix\n\nAswith applies ${skill.name} across his engineering projects and technical solutions.`,
    };
  }

  private findDynamicExperience(norm: string, knowledge: AuthoritativeKnowledge): ExperienceItem | undefined {
    for (const e of knowledge.experience) {
      const org = (e.organization || '').toLowerCase();
      const title = (e.title || '').toLowerCase();
      if (norm.includes(org) || norm.includes(title)) {
        return e;
      }
    }
    return undefined;
  }

  private findDynamicAchievement(norm: string, knowledge: AuthoritativeKnowledge): AchievementItem | undefined {
    for (const a of knowledge.achievements) {
      const title = (a.title || '').toLowerCase();
      if (norm.includes(title)) {
        return a;
      }
    }
    return undefined;
  }

  // ── HELPER: GENERAL QUESTION DISTINCTION ────────────────────────────────
  private handleGeneralQuestion(raw: string, knowledge: AuthoritativeKnowledge): AssistantResponse {
    const lower = raw.toLowerCase();

    if (lower.includes('what is python')) {
      return {
        reply: `**Python** is a high-level, interpreted, general-purpose programming language renowned for its readable syntax, versatility, and extensive library ecosystem spanning web development, automation, and machine learning.\n\n**Aswith's Application:** In Aswith's portfolio, Python is his primary language (95% proficiency). He used it to build **Aswith AI** (desktop voice automation), cloud scripts using AWS Boto3, and to solve 300+ algorithmic problems on CodeChef.`,
      };
    }

    if (lower.includes('what is iot')) {
      return {
        reply: `**IoT (Internet of Things)** refers to a network of physical devices equipped with sensors, software, and connectivity to exchange data in real time.\n\n**Aswith's Application:** Aswith applies IoT through microcontrollers (Arduino, Embedded C), wireless telematics (HC-05 Bluetooth), and completed an IoT Engineering Internship at Emertxe working on EV telematics dashboards.`,
      };
    }

    return {
      reply: `That information isn't currently available in my portfolio knowledge base. I can help with questions about Aswith, his projects, skills, education, experience, achievements, or this portfolio.`,
    };
  }
}

export const assistantEngine = new AssistantEngine();
