/**
 * Input Normalizer for Aswith's Portfolio AI Assistant.
 *
 * Handles natural, unformatted human input:
 * - Imperfect spelling and common abbreviations
 * - Inconsistent capitalization and punctuation
 * - Preserves meaningful symbols (+, #, &, _)
 * - Normalizes token sequences for intent matching
 */

const ABBREVIATION_MAP: Record<string, string> = {
  u: 'you',
  r: 'are',
  ur: 'your',
  pls: 'please',
  plz: 'please',
  thx: 'thanks',
  ty: 'thanks',
  proj: 'project',
  projs: 'projects',
  projectz: 'projects',
  cert: 'certificate',
  certs: 'certificates',
  certif: 'certificate',
  certifs: 'certificates',
  certifcate: 'certificate',
  certifcates: 'certificates',
  exp: 'experience',
  expr: 'experience',
  intern: 'internship',
  interns: 'internship',
  internshp: 'internship',
  internshps: 'internships',
  edu: 'education',
  deg: 'degree',
  btech: 'btech',
  ece: 'ece',
  cgpa: 'cgpa',
  gpa: 'cgpa',
  gh: 'github',
  git: 'github',
  li: 'linkedin',
  in: 'linkedin',
  lc: 'leetcode',
  cc: 'codechef',
  aswth: 'aswith',
  ashwith: 'aswith',
  aswit: 'aswith',
  ashwth: 'aswith',
  py: 'python',
  pythn: 'python',
  pyhton: 'python',
  js: 'javascript',
  ts: 'typescript',
  genai: 'generative ai',
  llm: 'llm',
  llms: 'llms',
  cv: 'resume',
  resum: 'resume',
  msg: 'message',
  msgs: 'messages',
  wa: 'whatsapp',
  ph: 'phone',
  mob: 'phone',
  tele: 'telegram',
};

export interface NormalizedInput {
  raw: string;
  normalized: string;
  tokens: string[];
}

export function normalizeInput(raw: string): NormalizedInput {
  if (!raw || typeof raw !== 'string') {
    return { raw: '', normalized: '', tokens: [] };
  }

  // 1. Lowercase and trim
  let text = raw.toLowerCase().trim();

  // 2. Normalize symbols while keeping +, #, &, _, -, .
  // Replace weird punctuation (quotes, question marks, exclamation marks, commas) with spaces
  text = text.replace(/[?!,;:`"()\[\]{}~*^$|\\]/g, ' ');

  // 3. Compress whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // 4. Tokenize and map abbreviations
  const rawTokens = text.split(' ').filter(Boolean);
  const mappedTokens = rawTokens.map((t) => {
    // Strip trailing punctuation from individual token if any
    const cleanToken = t.replace(/^[./-]+|[./-]+$/g, '');
    return ABBREVIATION_MAP[cleanToken] || cleanToken;
  });

  const normalized = mappedTokens.join(' ');

  return {
    raw,
    normalized,
    tokens: mappedTokens,
  };
}
