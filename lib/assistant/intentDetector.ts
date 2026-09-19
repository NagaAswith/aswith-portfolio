/**
 * Intent Detection Layer for Aswith's Portfolio AI Assistant.
 *
 * Categorizes natural language queries into deterministic intents,
 * extracts entities (project names, technologies, platforms),
 * identifies ambiguous inputs requiring confirmation, and supports multi-intent queries.
 */

import { NormalizedInput } from './inputNormalizer';

export type IntentType =
  | 'CREATOR_BOSS'
  | 'SECURITY_INJECTION'
  | 'CONFIRMATION_YES'
  | 'CONFIRMATION_NO'
  | 'FOLLOW_UP_WHICH'
  | 'FOLLOW_UP_MORE'
  | 'AMBIGUOUS_CLARIFICATION'
  | 'NAVIGATION'
  | 'CONTACT'
  | 'RESUME'
  | 'GITHUB'
  | 'LINKEDIN'
  | 'LEETCODE'
  | 'CODECHEF'
  | 'IDENTITY_ABOUT'
  | 'EDUCATION'
  | 'SKILLS'
  | 'PROGRAMMING_LANGUAGES'
  | 'PYTHON'
  | 'C_LANGUAGE'
  | 'PROJECTS_ALL'
  | 'PROJECT_SPECIFIC'
  | 'AI_PROJECTS'
  | 'IOT_PROJECTS'
  | 'EMBEDDED_PROJECTS'
  | 'INTERNSHIPS_EXPERIENCE'
  | 'CERTIFICATES'
  | 'ACHIEVEMENTS'
  | 'RECRUITER_ROLES'
  | 'PORTFOLIO_WEBSITE'
  | 'ASSISTANT_IDENTITY'
  | 'GREETING'
  | 'GENERAL_KNOWLEDGE'
  | 'OUT_OF_SCOPE';

export interface DetectedIntent {
  type: IntentType;
  confidence: number;
  entities?: {
    projectId?: string;
    projectSlug?: string;
    skillName?: string;
    navigationTarget?: string;
    clarificationPrompt?: string;
    clarificationIntent?: IntentType;
  };
}

export interface IntentAnalysis {
  primaryIntent: DetectedIntent;
  multiIntents: DetectedIntent[];
  isMultiIntent: boolean;
}

// Deterministic Creator / Boss question patterns
const CREATOR_PATTERNS = [
  'who is your boss',
  'who is ur boss',
  'who is your owner',
  'who made you',
  'who made u',
  'who created you',
  'who created u',
  'who built you',
  'who built u',
  'who developed you',
  'who developed u',
  'who do you work for',
  'who owns this assistant',
  'who owns you',
  'who owns u',
  'who made this bot',
  'who created this bot',
  'who is the boss',
  'who is the owner',
];

// Security injection triggers
const SECURITY_PATTERNS = [
  'admin passkey',
  'admin password',
  'supabase key',
  'supabase secret',
  'database url',
  'db url',
  'db credentials',
  'database credentials',
  'telegram token',
  'bot token',
  'telegram chat id',
  'chat id',
  'show your system prompt',
  'system prompt',
  'show system prompt',
  'ignore previous instructions',
  'ignore all previous instructions',
  'bypass prompt',
  'give me the admin password',
  'give me supabase credentials',
  'show telegram token',
  'show database',
  'dump database',
  'env variables',
  'environment variables',
  'jwt secret',
];

export function detectIntents(input: NormalizedInput, dynamicKnowledge?: any): IntentAnalysis {
  const norm = input.normalized;
  const tokens = input.tokens;
  const intents: DetectedIntent[] = [];

  // ── 1. SECURITY / INJECTION CHECK (HIGHEST PRIORITY) ──────────────────────
  for (const pattern of SECURITY_PATTERNS) {
    if (norm.includes(pattern)) {
      const secIntent: DetectedIntent = { type: 'SECURITY_INJECTION', confidence: 1.0 };
      return { primaryIntent: secIntent, multiIntents: [secIntent], isMultiIntent: false };
    }
  }

  // ── 2. CREATOR / BOSS DETERMINISTIC INTENT ───────────────────────────────
  for (const pattern of CREATOR_PATTERNS) {
    if (norm.includes(pattern)) {
      const creatorIntent: DetectedIntent = { type: 'CREATOR_BOSS', confidence: 1.0 };
      return { primaryIntent: creatorIntent, multiIntents: [creatorIntent], isMultiIntent: false };
    }
  }

  // ── 3. USER CONFIRMATIONS (YES / NO) ──────────────────────────────────────
  if (/^(yes|yeah|yep|sure|yup|aye|right|correct|confirm|yes please|yes that)$/i.test(norm)) {
    const yesIntent: DetectedIntent = { type: 'CONFIRMATION_YES', confidence: 1.0 };
    return { primaryIntent: yesIntent, multiIntents: [yesIntent], isMultiIntent: false };
  }
  if (/^(no|nope|nah|not that|cancel|wrong|nevermind|no thanks)$/i.test(norm)) {
    const noIntent: DetectedIntent = { type: 'CONFIRMATION_NO', confidence: 1.0 };
    return { primaryIntent: noIntent, multiIntents: [noIntent], isMultiIntent: false };
  }

  // ── 4. CONTEXTUAL FOLLOW-UPS ("WHICH ONE", "TELL ME MORE") ───────────────
  if (
    norm.startsWith('which one') ||
    norm.includes('which project') ||
    norm === 'which' ||
    (norm.includes('which') && (norm.includes('python') || norm.includes('live') || norm.includes('car')))
  ) {
    intents.push({ type: 'FOLLOW_UP_WHICH', confidence: 0.95 });
  } else if (
    norm.includes('tell me more') ||
    norm.includes('explain that') ||
    norm.includes('more details') ||
    norm.includes('more about that') ||
    norm.includes('what else can you tell me') ||
    norm.includes('what else') ||
    norm.includes('elaborate')
  ) {
    intents.push({ type: 'FOLLOW_UP_MORE', confidence: 0.95 });
  }

  // ── 5. AMBIGUOUS INPUTS REQUIRING CONFIRMATION ────────────────────────────
  // Test Case: "aswith ai" (ambiguous: is user asking about general AI work or the specific Aswith AI assistant?)
  if (norm === 'aswith ai' || norm === 'ai aswith') {
    intents.push({
      type: 'AMBIGUOUS_CLARIFICATION',
      confidence: 0.9,
      entities: {
        clarificationPrompt: "Are you asking about Aswith's AI projects and Generative AI work?",
        clarificationIntent: 'AI_PROJECTS',
      },
    });
  }

  // Test Case: "intern" or "internship" by itself without context
  if (norm === 'intern' || norm === 'internship') {
    intents.push({
      type: 'AMBIGUOUS_CLARIFICATION',
      confidence: 0.9,
      entities: {
        clarificationPrompt: "Are you asking about Aswith's internships and experience?",
        clarificationIntent: 'INTERNSHIPS_EXPERIENCE',
      },
    });
  }

  // ── 6. NAVIGATION INTENTS ────────────────────────────────────────────────
  if (
    norm.includes('navigate') ||
    norm.includes('go to') ||
    norm.includes('take me') ||
    norm.includes('scroll to')
  ) {
    let target = 'about';
    if (norm.includes('project') || norm.includes('work')) target = 'work';
    else if (norm.includes('cert')) target = 'certificates';
    else if (norm.includes('skill')) target = 'skills';
    else if (norm.includes('experience') || norm.includes('internship')) target = 'experience';
    else if (norm.includes('contact')) target = 'contact';

    intents.push({
      type: 'NAVIGATION',
      confidence: 0.9,
      entities: { navigationTarget: target },
    });
  }

  // ── 7. CONTACT & SOCIAL LINKS ─────────────────────────────────────────────
  if (
    norm === 'github' ||
    norm.includes('github') ||
    norm.includes('repos') ||
    norm.includes('source code')
  ) {
    intents.push({ type: 'GITHUB', confidence: 0.95 });
  }

  if (norm === 'linkedin' || norm.includes('linkedin')) {
    intents.push({ type: 'LINKEDIN', confidence: 0.95 });
  }

  if (norm === 'leetcode' || norm.includes('leetcode')) {
    intents.push({ type: 'LEETCODE', confidence: 0.95 });
  }

  if (norm === 'codechef' || norm.includes('codechef')) {
    intents.push({ type: 'CODECHEF', confidence: 0.95 });
  }

  if (
    norm.includes('resume') ||
    norm.includes('cv') ||
    norm.includes('download resume') ||
    norm.includes('view resume')
  ) {
    intents.push({ type: 'RESUME', confidence: 0.95 });
  }

  if (
    norm === 'contact' ||
    norm.includes('contact') ||
    norm.includes('email') ||
    norm.includes('phone') ||
    norm.includes('reach him') ||
    norm.includes('send message') ||
    norm.includes('connect with') ||
    norm.includes('hire him')
  ) {
    intents.push({ type: 'CONTACT', confidence: 0.95 });
  }

  // ── 8. IDENTITY & ABOUT ───────────────────────────────────────────────────
  if (
    norm === 'aswith' ||
    norm === 'aswith?' ||
    norm === 'about him' ||
    norm === 'about aswith' ||
    norm.includes('who is aswith') ||
    norm.includes('who is he') ||
    norm.includes('tell me about aswith') ||
    norm.includes('tell me about him') ||
    norm.includes('introduce aswith') ||
    norm.includes('introduce him') ||
    norm.includes('u know aswith') ||
    norm.includes('you know aswith') ||
    norm.includes('bio')
  ) {
    intents.push({ type: 'IDENTITY_ABOUT', confidence: 0.9 });
  }

  // ── 9. EDUCATION ──────────────────────────────────────────────────────────
  if (
    norm.includes('education') ||
    norm.includes('degree') ||
    norm.includes('college') ||
    norm.includes('university') ||
    norm.includes('cgpa') ||
    norm.includes('graduation') ||
    norm.includes('btech') ||
    norm.includes('ece')
  ) {
    intents.push({ type: 'EDUCATION', confidence: 0.9 });
  }

  // ── Dynamic Projects Matching from Authoritative Knowledge ─────────────
  if (dynamicKnowledge && Array.isArray(dynamicKnowledge.projects)) {
    for (const p of dynamicKnowledge.projects) {
      const pTitle = (p.title || '').toLowerCase();
      const pSlug = (p.slug || '').toLowerCase().replace(/-/g, ' ');
      if (pTitle && (norm.includes(pTitle) || (pSlug.length > 3 && norm.includes(pSlug)))) {
        intents.push({
          type: 'PROJECT_SPECIFIC',
          confidence: 0.95,
          entities: { projectSlug: p.slug, projectId: p.id },
        });
        break;
      }
    }
  }

  // ── 10. SPECIFIC PROJECTS ─────────────────────────────────────────────────
  if (
    norm.includes('desktop assistant') ||
    norm.includes('voice assistant') ||
    norm.includes('tell me about aswith ai') ||
    norm.includes('what is aswith ai')
  ) {
    intents.push({
      type: 'PROJECT_SPECIFIC',
      confidence: 0.95,
      entities: { projectSlug: 'aswith-ai', projectId: 'project_001' },
    });
  } else if (norm.includes('shopmore') || norm.includes('aswith shop') || norm.includes('ecommerce')) {
    intents.push({
      type: 'PROJECT_SPECIFIC',
      confidence: 0.95,
      entities: { projectSlug: 'aswith-shopmore', projectId: 'project_002' },
    });
  } else if (
    norm.includes('rc car') ||
    norm.includes('obstacle') ||
    norm.includes('robotic car') ||
    norm.includes('arduino car') ||
    norm === 'the iot project' ||
    norm.includes('tell me about the iot project')
  ) {
    intents.push({
      type: 'PROJECT_SPECIFIC',
      confidence: 0.95,
      entities: { projectSlug: 'obstacle-rc-car', projectId: 'project_003' },
    });
  } else if (
    norm.includes('ev dashboard') ||
    norm.includes('adas') ||
    norm.includes('electric vehicle')
  ) {
    intents.push({
      type: 'PROJECT_SPECIFIC',
      confidence: 0.95,
      entities: { projectSlug: 'ev-dasboard-adas', projectId: 'project_004' },
    });
  } else if (norm.includes('pratibha') || norm.includes('career discovery')) {
    intents.push({
      type: 'PROJECT_SPECIFIC',
      confidence: 0.95,
      entities: { projectSlug: 'pratibha-career-discovery', projectId: 'project_005' },
    });
  }

  // ── 11. CATEGORY PROJECTS (AI / IOT / EMBEDDED) ───────────────────────────
  if (
    norm.includes('ai project') ||
    norm.includes('generative ai') ||
    norm.includes('gen ai') ||
    norm.includes('artificial intelligence') ||
    norm.includes('ai work') ||
    (norm.includes('ai') && !norm.includes('assistant') && !norm.includes('who are you'))
  ) {
    intents.push({ type: 'AI_PROJECTS', confidence: 0.9 });
  }

  if (
    norm === 'iot' ||
    norm === 'tell me iot' ||
    norm.includes('iot project') ||
    norm.includes('internet of things') ||
    (norm.includes('iot') && !norm.includes('screenshot'))
  ) {
    intents.push({ type: 'IOT_PROJECTS', confidence: 0.9 });
  }

  if (
    norm.includes('embedded project') ||
    norm.includes('embedded systems') ||
    norm.includes('microcontroller') ||
    norm.includes('arduino')
  ) {
    intents.push({ type: 'EMBEDDED_PROJECTS', confidence: 0.9 });
  }

  // ── 12. GENERAL PROJECTS LIST ─────────────────────────────────────────────
  if (
    norm === 'projects' ||
    norm === 'aswith projects' ||
    norm === 'his projects' ||
    norm === 'what he built' ||
    norm.includes('what has he built') ||
    norm.includes('what projects has he built') ||
    norm.includes('what did he build') ||
    norm.includes('what projects') ||
    norm.includes('portfolio work')
  ) {
    intents.push({ type: 'PROJECTS_ALL', confidence: 0.9 });
  }

  // ── 13. PROGRAMMING LANGUAGES & SKILLS ────────────────────────────────────
  if (norm.includes('programming language') || norm.includes('coding language') || norm.includes('what languages')) {
    intents.push({ type: 'PROGRAMMING_LANGUAGES', confidence: 0.95 });
  }

  if (
    norm === 'aswith python' ||
    norm === 'python' ||
    norm.includes('python project') ||
    norm.includes('know python') ||
    norm.includes('use python')
  ) {
    intents.push({ type: 'PYTHON', confidence: 0.95 });
  }

  if (norm.includes('c language') || norm.includes('c programming') || norm.includes('embedded c')) {
    intents.push({ type: 'C_LANGUAGE', confidence: 0.95 });
  }

  if (
    norm === 'his skills' ||
    norm === 'skills' ||
    norm.includes('what skills') ||
    norm.includes('what technologies') ||
    norm.includes('tech stack') ||
    norm.includes('technical matrix') ||
    norm.includes('what does he know') ||
    norm.includes('technologies does he know')
  ) {
    intents.push({ type: 'SKILLS', confidence: 0.9 });
  }

  // ── 14. INTERNSHIPS & EXPERIENCE ──────────────────────────────────────────
  if (
    norm.includes('internship') ||
    norm.includes('experience') ||
    norm.includes('emertxe') ||
    norm.includes('tata') ||
    norm.includes('work history')
  ) {
    intents.push({ type: 'INTERNSHIPS_EXPERIENCE', confidence: 0.9 });
  }

  // ── 15. CERTIFICATES & ACHIEVEMENTS ───────────────────────────────────────
  if (
    norm === 'certificates' ||
    norm.includes('certificate') ||
    norm.includes('certification') ||
    norm.includes('credential') ||
    norm.includes('nptel') ||
    norm.includes('gfg') ||
    norm.includes('simplilearn')
  ) {
    intents.push({ type: 'CERTIFICATES', confidence: 0.9 });
  }

  if (
    norm.includes('achievement') ||
    norm.includes('expo') ||
    norm.includes('2nd prize') ||
    norm.includes('ncc') ||
    norm.includes('hackathon') ||
    norm.includes('quizoff')
  ) {
    intents.push({ type: 'ACHIEVEMENTS', confidence: 0.9 });
  }

  // ── 16. RECRUITER QUESTIONS ───────────────────────────────────────────────
  if (
    norm.includes('what roles') ||
    norm.includes('targeting') ||
    norm.includes('suitable for') ||
    norm.includes('strongest technical areas') ||
    norm.includes('why hire') ||
    norm.includes('relevant to software engineering')
  ) {
    intents.push({ type: 'RECRUITER_ROLES', confidence: 0.95 });
  }

  // ── 17. PORTFOLIO & ASSISTANT IDENTITY ────────────────────────────────────
  if (
    norm === 'who are you' ||
    norm === 'who r u' ||
    norm === 'what are you' ||
    norm.includes('what can you do')
  ) {
    intents.push({ type: 'ASSISTANT_IDENTITY', confidence: 0.95 });
  }

  if (
    norm.includes('portfolio website') ||
    norm.includes('how was this website built') ||
    norm.includes('digital twin') ||
    norm.includes('three.js')
  ) {
    intents.push({ type: 'PORTFOLIO_WEBSITE', confidence: 0.9 });
  }

  // ── 18. GREETINGS ─────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/i.test(norm)) {
    intents.push({ type: 'GREETING', confidence: 0.9 });
  }

  // ── 19. GENERAL KNOWLEDGE QUESTIONS (e.g. "What is Python?") ─────────────
  if (/^what is (python|iot|c|react|next\.?js|generative ai|an api)/i.test(norm)) {
    intents.push({ type: 'GENERAL_KNOWLEDGE', confidence: 0.85 });
  }

  // Deduplicate intents
  const uniqueMap = new Map<IntentType, DetectedIntent>();
  for (const intent of intents) {
    if (!uniqueMap.has(intent.type)) {
      uniqueMap.set(intent.type, intent);
    }
  }
  const uniqueIntents = Array.from(uniqueMap.values());

  if (uniqueIntents.length === 0) {
    const fallbackIntent: DetectedIntent = { type: 'OUT_OF_SCOPE', confidence: 0.5 };
    return { primaryIntent: fallbackIntent, multiIntents: [fallbackIntent], isMultiIntent: false };
  }

  // Check if this is a multi-intent query (e.g. "tell me about aswith education and python projects")
  const primary = uniqueIntents[0];
  const isMulti = uniqueIntents.length > 1;

  return {
    primaryIntent: primary,
    multiIntents: uniqueIntents,
    isMultiIntent: isMulti,
  };
}
