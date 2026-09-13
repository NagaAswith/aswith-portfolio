export interface ExperienceItem {
  id: string; // Permanent internal ID, e.g. "exp_001"
  title: string;
  organization: string;
  period: string;
  type: 'INTERNSHIP' | 'JOB SIMULATION' | 'EDUCATION' | 'FULL TIME';
  location: string;
  description: string;
  highlights: string[];
  displayOrder?: number;
  isPublished?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp_001',
    displayOrder: 1,
    isPublished: true,
    title: 'IoT Engineering Intern',
    organization: 'Emertxe Information Technologies',
    period: 'June 2026 – July 2026',
    type: 'INTERNSHIP',
    location: 'India',
    description: 'Engineered and tested IoT applications, integrating embedded systems with software-driven dashboards for real-time hardware telemetry, data monitoring, and analysis.',
    highlights: [
      'Executed hardware/software system integration for connected IoT devices',
      'Integrated embedded sensor platforms with software-driven monitoring dashboards',
      'Applied structured debugging techniques to resolve device data flow anomalies',
      'Collaborated on troubleshooting routines to improve IoT system reliability and performance',
    ],
  },
  {
    id: 'exp_002',
    displayOrder: 2,
    isPublished: true,
    title: 'Cybersecurity Analyst',
    organization: 'Tata Cybersecurity Job Simulation (Forage)',
    period: '2026',
    type: 'JOB SIMULATION',
    location: 'Virtual',
    description: 'Completed enterprise cybersecurity workflow simulation covering identity & access management (IAM), threat vector analysis, risk assessment, and mitigation strategy design.',
    highlights: [
      'Analyzed enterprise security scenarios & identity access management (IAM) frameworks',
      'Evaluated system vulnerabilities and formulated structured mitigation recommendations',
      'Simulated threat vector detection and security risk mitigation protocols',
    ],
  },
];

export interface EducationItem {
  id: string; // Permanent internal ID, e.g. "edu_001"
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  expectedGraduation: string;
  field: string;
  highlights: string[];
  displayOrder?: number;
  isPublished?: boolean;
}

export const educationList: EducationItem[] = [
  {
    id: 'edu_001',
    displayOrder: 1,
    isPublished: true,
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: 'Undergraduate Program',
    period: 'Present',
    cgpa: '8.79 / 10',
    expectedGraduation: '2028',
    field: 'Electronics, Communication & Computer Science Fundamentals',
    highlights: [
      'Academic Excellence: CGPA 8.79 / 10',
      'Core Focus: Embedded Microcontrollers, Digital Logic, Signals & Systems, Software Development',
      'Hands-on software application building & AI automation integration',
    ],
  },
];

export const educationData: EducationItem = educationList[0];
