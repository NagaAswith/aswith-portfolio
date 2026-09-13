import { NextResponse } from 'next/server';
import { assistantContext } from '@/data/assistantContext';

/**
 * Portfolio AI Chat API
 *
 * Returns { reply: string, action?: 'navigate' | 'openContact', target?: string }
 * The front-end uses `action` to smoothly scroll to portfolio sections.
 */

interface ChatResponse {
  reply: string;
  action?: 'navigate' | 'openContact';
  target?: string;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const q = message.toLowerCase().trim();
    const result: ChatResponse = { reply: '' };

    // ── NAVIGATION INTENTS ──────────────────────────────────────────────────
    if (
      (q.includes('show') || q.includes('go to') || q.includes('take me') || q.includes('navigate')) &&
      (q.includes('project') || q.includes('work'))
    ) {
      result.reply = "Sure! Scrolling to the Engineering Projects section now.";
      result.action = 'navigate';
      result.target = 'work';
    } else if (
      (q.includes('show') || q.includes('go to') || q.includes('take me') || q.includes('navigate')) &&
      (q.includes('certificate') || q.includes('credential'))
    ) {
      result.reply = "Navigating to Certificates & Specializations now.";
      result.action = 'navigate';
      result.target = 'certificates';
    } else if (
      (q.includes('show') || q.includes('go to') || q.includes('take me') || q.includes('navigate')) &&
      q.includes('skill')
    ) {
      result.reply = "Scrolling to the Skills & Technical Matrix section.";
      result.action = 'navigate';
      result.target = 'skills';
    } else if (
      (q.includes('show') || q.includes('go to') || q.includes('take me') || q.includes('navigate')) &&
      (q.includes('experience') || q.includes('internship') || q.includes('education'))
    ) {
      result.reply = "Taking you to Experience & Education now.";
      result.action = 'navigate';
      result.target = 'experience';
    } else if (
      (q.includes('show') || q.includes('go to') || q.includes('take me') || q.includes('navigate')) &&
      (q.includes('about') || q.includes('bio') || q.includes('hero'))
    ) {
      result.reply = "Scrolling back to the top — About Aswith.";
      result.action = 'navigate';
      result.target = 'about';

    // ── CONNECT / CONTACT INTENTS ──────────────────────────────────────────
    } else if (
      q.includes('connect') ||
      q.includes('contact him') ||
      q.includes('send message') ||
      q.includes('send him') ||
      q.includes('reach him') ||
      q.includes('i want to reach') ||
      q.includes('message him') ||
      q.includes('hire him')
    ) {
      result.reply =
        "Sure! Opening the contact form so you can send Aswith a message directly. You can reach him by email at nagaaswith3@gmail.com or fill in your name, email, and message below.";
      result.action = 'openContact';
      result.target = 'contact';

    // ── IDENTITY ───────────────────────────────────────────────────────────
    } else if (
      q.includes('who is') || q.includes('about aswith') || q.includes('introduce') ||
      q.includes('tell me about him') || q.includes('who are you')
    ) {
      result.reply = `${assistantContext.personal.fullName} is a ${assistantContext.personal.title} with CGPA ${assistantContext.personal.cgpa} (graduating ${assistantContext.personal.expectedGraduation}). ${assistantContext.personal.bio}`;

    } else if (
      q.includes('education') || q.includes('degree') || q.includes('cgpa') ||
      q.includes('college') || q.includes('study') || q.includes('university') || q.includes('btech')
    ) {
      result.reply = `Aswith is pursuing a ${assistantContext.personal.degree} with a CGPA of ${assistantContext.personal.cgpa}, expected graduation: ${assistantContext.personal.expectedGraduation}.`;

    // ── SPECIFIC PROJECTS ──────────────────────────────────────────────────
    } else if (q.includes('aswith ai') || (q.includes('desktop assistant') || q.includes('voice assistant'))) {
      const proj = assistantContext.projects[0];
      result.reply = `Aswith AI is an ${proj.domain}. Built using ${proj.tech.join(', ')}. Key highlights: ${proj.highlights.join('; ')}.`;

    } else if (q.includes('shopmore') || q.includes('aswith shop') || (q.includes('shop') && q.includes('website'))) {
      const proj = assistantContext.projects[1];
      result.reply = `${proj.name} is a live e-commerce platform at ${proj.liveUrl}. Built with ${proj.tech.join(', ')}. Features: ${proj.highlights.join('; ')}.`;

    } else if (
      q.includes('rc car') || q.includes('bluetooth car') || q.includes('obstacle') ||
      q.includes('robotic car') || q.includes('arduino car')
    ) {
      const proj = assistantContext.projects[2];
      result.reply = `${proj.name}: ${proj.domain}. Built with ${proj.tech.join(', ')}. Features: ${proj.highlights.join('; ')}.`;

    } else if (
      q.includes('ev dashboard') || q.includes('adas') || q.includes('electric vehicle') ||
      q.includes('internship project') || q.includes('emertxe project')
    ) {
      const proj = assistantContext.projects[3];
      result.reply = `${proj.name} (${proj.organization}): Built with ${proj.tech.join(', ')}. Features: ${proj.highlights.join('; ')}.`;

    // ── CATEGORY EXISTENCE QUESTIONS ───────────────────────────────────────
    } else if (
      (q.includes('web project') || q.includes('web projects') || q.includes('website project') ||
       (q.includes('web') && q.includes('project'))) && !q.includes('any') === false ||
      q.includes('web project') || q.includes('website project') ||
      (q.includes('does he have') && (q.includes('web') || q.includes('website')))
    ) {
      result.reply = `Yes! Aswith built ShopMore (Aswith Shop) — a responsive e-commerce web platform live at https://aswithshop.netlify.app. Built with HTML5, CSS3, JavaScript, and deployed on Netlify.`;

    } else if (
      q.includes('ai project') || q.includes('artificial intelligence project') ||
      (q.includes('does he have') && q.includes('ai')) ||
      (q.includes('any ai') && q.includes('project'))
    ) {
      result.reply = `Yes! Aswith AI is his AI project — an Intelligent Desktop Assistant & Automation Platform built with Python, SpeechRecognition, Pyttsx3, PyAutoGUI, and Tkinter. It handles voice commands, desktop automation, and IoT control.`;

    } else if (
      q.includes('embedded project') || q.includes('embedded systems project') ||
      (q.includes('does he have') && q.includes('embedded')) ||
      (q.includes('any embedded') && q.includes('project'))
    ) {
      result.reply = `Yes! Aswith has two embedded systems projects: (1) Bluetooth-Enabled Autonomous Obstacle Avoidance RC Car (Arduino/HC-05/L293D), and (2) Real-Time EV Dashboard & ADAS Warning System built during his internship at Emertxe.`;

    } else if (
      q.includes('iot project') || q.includes('internet of things project') ||
      (q.includes('does he have') && q.includes('iot')) ||
      (q.includes('any iot') && q.includes('project'))
    ) {
      result.reply = `Yes! The RC Car integrates HC-05 Bluetooth IoT wireless control, and the EV Dashboard & ADAS System is an IoT telematics platform built during his Emertxe internship. Aswith also integrated IoT communication into Aswith AI.`;

    } else if (
      q.includes('software project') ||
      (q.includes('does he have') && q.includes('software')) ||
      (q.includes('any software') && q.includes('project'))
    ) {
      result.reply = `Yes! Aswith AI (Python automation platform) and ShopMore (web application) are his primary software engineering projects, alongside the embedded systems projects.`;

    // ── ALL PROJECTS LIST ──────────────────────────────────────────────────
    } else if (
      q.includes('project') || q.includes('built') || q.includes('what has he made') ||
      q.includes('what did he build') || q.includes('portfolio work')
    ) {
      const names = assistantContext.projects.map((p) => p.name).join(' | ');
      result.reply = `Aswith has engineered 4 major projects: ${names}. Ask about any specific one for full details!`;

    // ── SKILLS ─────────────────────────────────────────────────────────────
    } else if (
      q.includes('skill') || q.includes('know') || q.includes('technology') ||
      q.includes('stack') || q.includes('what can he do') || q.includes('expertise')
    ) {
      const skillsStr = assistantContext.skills.map((s) => `${s.name} (${s.proficiency})`).join(', ');
      result.reply = `Aswith's technical stack: ${skillsStr}. Core domains: Software Engineering, AI/Automation, Embedded IoT, and Web Development.`;

    // ── CERTIFICATES ───────────────────────────────────────────────────────
    } else if (q.includes('certificate') || q.includes('certification') || q.includes('credential')) {
      result.reply = `Aswith holds 10 verified certifications: ${assistantContext.certificates.join('; ')}.`;

    } else if (q.includes('aws')) {
      result.reply = `Aswith holds the AWS Cloud Practitioner Essentials certificate (AWS Training & Certification, August 2026) and completed Python with AWS Cloud Training at LinuxWorld Informatics — covering Boto3, AWS CLI, EC2, S3, DynamoDB, Lambda, SNS, and CloudWatch.`;

    } else if (q.includes('nptel') || q.includes('iit madras') || q.includes('joy of computing')) {
      result.reply = `Aswith earned "The Joy of Computing using Python" from NPTEL / IIT Madras / SWAYAM with Elite certification (62%), a 12-week intensive course.`;

    } else if (q.includes('python certificate') || q.includes('geeksforgeeks') || q.includes('gfg')) {
      result.reply = `Aswith completed "Python Skill Up" from GeeksforGeeks — covering core Python, data structures, and algorithmic implementation.`;

    } else if (q.includes('generative ai') || q.includes('gen ai') || q.includes('simplilearn')) {
      result.reply = `Aswith earned "Introduction to Generative AI" from Simplilearn SkillUp / Google Cloud (credential 9847785, February 2026) covering LLMs, prompt architecture, and Google Cloud AI.`;

    // ── PYTHON ─────────────────────────────────────────────────────────────
    } else if (q.includes('python')) {
      result.reply = `Python is Aswith's primary language (95% proficiency). He used it for Aswith AI (voice assistant + automation), cloud integrations with Boto3, data structures, and algorithmic programming.`;

    // ── IOT / EMBEDDED ─────────────────────────────────────────────────────
    } else if (q.includes('iot') || q.includes('embedded') || q.includes('hardware') || q.includes('arduino')) {
      result.reply = `In Embedded & IoT, Aswith built the Bluetooth Obstacle Avoidance RC Car (Arduino/HC-05/L293D) and completed an IoT Engineering Internship at Emertxe — building an EV Telematics & ADAS Warning System in Embedded C.`;

    // ── HACKATHONS / ACHIEVEMENTS ──────────────────────────────────────────
    } else if (
      q.includes('hackathon') || q.includes('contest') || q.includes('buildathon') ||
      q.includes('competition') || q.includes('quizoff')
    ) {
      result.reply = `Aswith participated in national events: Project Viksit Bharat 2026 National Innovation Hackathon, AI Startup Buildathon 2026, and QuizOff 2026 (India's Biggest AI Quiz) via CampusCrew/Unstop.`;

    } else if (
      q.includes('achievement') || q.includes('codechef') || q.includes('leetcode') ||
      q.includes('ncc') || q.includes('rank') || q.includes('honor')
    ) {
      result.reply = `Aswith's achievements: 2nd Prize at College Engineering Day Project Expo (Individual), CodeChef 2-Star Coder with 300+ solutions, 70+ DSA problems on LeetCode, and NCC trained with A+ Grade Certificate.`;

    // ── EXPERIENCE / INTERNSHIP ────────────────────────────────────────────
    } else if (
      q.includes('internship') || q.includes('experience') || q.includes('work') ||
      q.includes('emertxe') || q.includes('tata') || q.includes('job')
    ) {
      const expStr = assistantContext.experience
        .map((e) => `${e.role} at ${e.organization} (${e.period}): ${e.highlights}`)
        .join(' | ');
      result.reply = `Aswith's engineering experience: ${expStr}.`;

    // ── CONTACT ────────────────────────────────────────────────────────────
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
      result.reply = `You can contact Ranga Naga Aswith via:\n• Email: ${assistantContext.personal.email}\n• Phone: +91 ${assistantContext.personal.phone}\n• Or use the contact form in the portfolio footer.`;

    } else if (q.includes('github')) {
      result.reply = `Aswith's GitHub: ${assistantContext.personal.github}`;

    } else if (q.includes('linkedin')) {
      result.reply = `Aswith's LinkedIn: ${assistantContext.personal.linkedin}`;

    } else if (q.includes('resume') || q.includes('cv')) {
      result.reply = `You can view or download Aswith's resume via the Resume button in the portfolio footer, or directly at ${assistantContext.personal.resumeUrl}.`;

    // ── FALLBACK ───────────────────────────────────────────────────────────
    } else {
      result.reply =
        `I can answer questions about Aswith's projects, skills, certificates, internship experience, education, and contact details. Try asking: "What projects has he built?", "Does he have an AI project?", "What certificates does he have?", or "Show me his skills."`;
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Server error processing request' }, { status: 500 });
  }
}
