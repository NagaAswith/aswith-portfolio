/**
 * Portfolio Data Source — Projects, Skills, Certificates, Experience
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'SOFTWARE' | 'AI' | 'IOT' | 'WEB' | 'OTHER';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  year: string;
  status: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Core & Languages' | 'Frameworks & Web' | 'AI & Data' | 'Embedded & Systems' | 'Tools & Infra';
  proficiency: number; // Percentage 0-100
  connectedIds: string[]; // Related skills for network visualization
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  description: string;
  keyAchivements: string[];
}

export const portfolioData = {
  projects: [
    {
      id: 'ai-code-analyzer',
      number: '01',
      title: 'Autonomous Code Quality & Architecture Inspector',
      category: 'AI',
      shortDescription: 'AI-driven static & dynamic code quality analyzer leveraging LLMs and AST parsing to diagnose architectural bottlenecks.',
      fullDescription: 'Designed and engineered an automated code review engine that constructs abstract syntax trees (ASTs) and feeds code slices into LLMs to detect architectural anti-patterns, memory leak risks, and security vulnerabilities before deployment.',
      technologies: ['TypeScript', 'Python', 'Next.js', 'OpenAI / Gemini API', 'Tailwind CSS'],
      image: '/media/projects/project1.png',
      year: '2025',
      status: 'Active / Completed',
      featured: true,
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      highlights: [
        'Reduced code review turnaround time by 65%',
        'Context-aware AST parsing to eliminate false positive lints',
        'Interactive dependency graph visualization',
      ],
    },
    {
      id: 'iot-smart-telemetry',
      number: '02',
      title: 'Industrial Edge IoT Telemetry Node',
      category: 'IOT',
      shortDescription: 'Real-time telemetry and environmental sensor monitoring hub built with ESP32 microcontrollers and WebSockets API.',
      fullDescription: 'Hardware-to-cloud IoT bridge utilizing ESP32 microcontrollers with custom PCB sensor modules. Communicates via MQTT over WebSockets to provide ultra-low latency telemetry rendering in web dashboards.',
      technologies: ['Embedded C++', 'ESP32', 'FreeRTOS', 'React', 'MQTT / WebSockets'],
      image: '/media/projects/project2.png',
      year: '2025',
      status: 'Hardware Deployed',
      featured: true,
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      highlights: [
        'Sub-15ms sensor polling with FreeRTOS multitasking',
        'Custom PCB schematic designed for high noise tolerance',
        'End-to-end telemetry encryption',
      ],
    },
    {
      id: 'nexus-web-platform',
      number: '03',
      title: 'Spatial Product Showcase & Web Framework',
      category: 'WEB',
      shortDescription: 'Modern web product experience with dynamic R3F canvas, Framer Motion transitions, and editorial design language.',
      fullDescription: 'High-performance interactive web application emphasizing editorial typography, spatial micro-interactions, GPU-accelerated 3D depth, and seamless multi-device responsiveness.',
      technologies: ['Next.js 16', 'React Three Fiber', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      image: '/media/projects/project3.png',
      year: '2026',
      status: 'Production',
      featured: true,
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      highlights: [
        'Custom device tier adaptation for smooth 60 FPS on mobile',
        'Zero layout shifts with fluid typography scale',
        'Framer Motion spatial transitions',
      ],
    },
    {
      id: 'automated-pipeline-suite',
      number: '04',
      title: 'Distributed System Automation & Monitoring',
      category: 'SOFTWARE',
      shortDescription: 'High-throughput automation suite for continuous integration monitoring and automated incident detection.',
      fullDescription: 'Modular Python automation service monitoring API health endpoints, analyzing log distributions for anomalies, and generating automated diagnostic summaries.',
      technologies: ['Python', 'Docker', 'FastAPI', 'Redis', 'PostgreSQL'],
      image: '/media/projects/project4.png',
      year: '2025',
      status: 'Maintained',
      featured: false,
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      highlights: [
        'Monitors 100+ endpoints concurrently with asyncio',
        'Automated alert dispatch to Slack and email',
      ],
    },
  ] as ProjectItem[],

  skills: [
    { id: 'python', name: 'Python', category: 'Core & Languages', proficiency: 92, connectedIds: ['ai', 'sql'] },
    { id: 'js-ts', name: 'JavaScript / TypeScript', category: 'Core & Languages', proficiency: 95, connectedIds: ['react', 'nextjs'] },
    { id: 'c-cpp', name: 'C / C++', category: 'Core & Languages', proficiency: 84, connectedIds: ['iot'] },
    { id: 'sql', name: 'SQL', category: 'Core & Languages', proficiency: 86, connectedIds: ['python'] },
    { id: 'react', name: 'React', category: 'Frameworks & Web', proficiency: 95, connectedIds: ['js-ts', 'nextjs', 'r3f'] },
    { id: 'nextjs', name: 'Next.js 16', category: 'Frameworks & Web', proficiency: 92, connectedIds: ['react', 'js-ts'] },
    { id: 'r3f', name: 'Three.js / R3F', category: 'Frameworks & Web', proficiency: 88, connectedIds: ['react'] },
    { id: 'ai', name: 'AI & LLM Integration', category: 'AI & Data', proficiency: 90, connectedIds: ['python'] },
    { id: 'iot', name: 'IoT & Microcontrollers', category: 'Embedded & Systems', proficiency: 87, connectedIds: ['c-cpp'] },
    { id: 'git', name: 'Git & Linux', category: 'Tools & Infra', proficiency: 90, connectedIds: ['python', 'js-ts'] },
  ] as SkillNode[],

  certificates: [
    {
      id: 'cert-1',
      title: 'Full Stack Web Development & Modern Architecture',
      issuer: 'Professional Credential',
      domain: 'Software Engineering',
      date: '2025',
      credentialUrl: '#',
    },
    {
      id: 'cert-2',
      title: 'Embedded Systems & Microcontroller Programming',
      issuer: 'ECE Engineering Specialization',
      domain: 'Hardware & IoT',
      date: '2024',
      credentialUrl: '#',
    },
    {
      id: 'cert-3',
      title: 'AI & Machine Learning Application Design',
      issuer: 'AI Certification Authority',
      domain: 'Artificial Intelligence',
      date: '2025',
      credentialUrl: '#',
    },
  ] as CertificateItem[],

  experience: [
    {
      id: 'exp-1',
      role: 'Software & Systems Developer',
      organization: 'Academic & Personal Projects',
      period: '2024 — Present',
      type: 'Engineering',
      location: 'India',
      description: 'Building end-to-end software applications, intelligent web systems, and IoT sensor platforms. Focused on performance optimization and sleek UX.',
      keyAchivements: [
        'Developed full-stack web applications using Next.js and TypeScript',
        'Engineered embedded sensor platforms with real-time telemetry capabilities',
        'Implemented AI application pipelines leveraging state-of-the-art models',
      ],
    },
    {
      id: 'exp-2',
      role: 'B.Tech Student in Electronics & Communication',
      organization: 'University',
      period: '2022 — Present',
      type: 'Education',
      location: 'India',
      description: 'Specializing in computer architecture, signals & systems, digital electronics, software development, and embedded systems programming.',
      keyAchivements: [
        'Strong foundational mastery in digital logic, microcontrollers, and communication protocols',
        'Led hands-on hardware-software integration projects',
      ],
    },
  ] as ExperienceItem[],
} as const;
