import { resolveCertificateImage } from './assetManifest';

export interface CertificateItem {
  id: string; // Permanent internal ID, e.g. "cert_001"
  number: string; // Visible sequential display number, e.g. "01"
  title: string;
  issuer: string;
  category:
    | 'Programming & Computational Logic'
    | 'Cloud Computing & Infrastructure Automation'
    | 'Embedded Systems, Automotive & IoT'
    | 'Artificial Intelligence & Machine Learning'
    | 'Hackathons & National Competitions';
  date: string;
  score?: string;
  certificationTier?: string;
  credentialId?: string;
  duration?: string;
  description: string;
  skills: string[];
  image: string;
  verificationUrl?: string;
  displayOrder?: number;
  isPublished?: boolean;
}

export const certificatesData: CertificateItem[] = [
  {
    id: 'cert_001',
    number: '01',
    displayOrder: 1,
    isPublished: true,
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL / IIT Madras / SWAYAM / MoE',
    category: 'Programming & Computational Logic',
    date: 'Jul–Oct 2025',
    score: '62%',
    certificationTier: 'Elite',
    duration: '12-Week Course',
    description: '12-week intensive course on Python programming, algorithmic logic, data structures, and automation routines.',
    skills: ['Python', 'Algorithmic Logic', 'Data Structures', 'Automation'],
    image: resolveCertificateImage('01', '/media/certificates/certificate1/nptl.jpeg'),
  },
  {
    id: 'cert_002',
    number: '02',
    displayOrder: 2,
    isPublished: true,
    title: 'Python Skill Up',
    issuer: 'GeeksforGeeks — Nation SkillUp',
    category: 'Programming & Computational Logic',
    date: '2025',
    description: 'Hands-on certification covering core Python programming, analytical problem solving, data structures, and algorithms.',
    skills: ['Python Programming', 'Problem Solving', 'Data Structures', 'Algorithmic Implementation'],
    image: resolveCertificateImage('02', '/media/certificates/certificate2/geeks for geeks.jpeg'),
  },
  {
    id: 'cert_003',
    number: '03',
    displayOrder: 3,
    isPublished: true,
    title: 'Introduction to C',
    issuer: 'SoloLearn',
    category: 'Programming & Computational Logic',
    date: 'September 26, 2024',
    credentialId: 'CC-8RUTSOVH',
    description: 'Foundational programming certification in C language, covering memory management, pointers, control flow, and structured programming.',
    skills: ['C Programming', 'Pointers', 'Memory Management', 'Structured Programming'],
    image: resolveCertificateImage('03', '/media/certificates/certificate3/introduction to c.jpeg'),
  },
  {
    id: 'cert_004',
    number: '04',
    displayOrder: 4,
    isPublished: true,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS Training & Certification',
    category: 'Cloud Computing & Infrastructure Automation',
    date: 'August 07, 2026',
    description: 'AWS cloud computing fundamentals covering AWS global infrastructure, IAM, cloud security, scalability, and core AWS services.',
    skills: ['AWS Global Infrastructure', 'IAM', 'Cloud Security', 'Scalability', 'Core AWS Services'],
    image: resolveCertificateImage('04', '/media/certificates/certificate4/aws cloude potential.jpeg'),
  },
  {
    id: 'cert_005',
    number: '05',
    displayOrder: 5,
    isPublished: true,
    title: 'Python with AWS Cloud Training',
    issuer: 'LinuxWorld Informatics',
    category: 'Cloud Computing & Infrastructure Automation',
    date: 'July 13 – July 27, 2026',
    credentialId: 'LW-JPR-2026-5584',
    duration: '20+ Hours Hands-On',
    description: 'Practical cloud training utilizing Python Boto3 SDK, AWS CLI, EC2, S3, DynamoDB, AWS Lambda, SNS, CloudWatch, REST APIs, JSON, and Cloud Automation.',
    skills: ['Boto3', 'AWS CLI', 'EC2', 'S3', 'DynamoDB', 'AWS Lambda', 'SNS', 'CloudWatch', 'REST APIs', 'Cloud Automation'],
    image: resolveCertificateImage('05', '/media/certificates/certificate5/python with aws cloud.jpeg'),
  },
  {
    id: 'cert_006',
    number: '06',
    displayOrder: 6,
    isPublished: true,
    title: 'Embedded Systems Internship Certification',
    issuer: 'Emertxe Information Technologies',
    category: 'Embedded Systems, Automotive & IoT',
    date: 'June 02 – July 03, 2026',
    credentialId: 'EI26_016',
    description: 'Specialized embedded systems internship certification. Capstone Project: Real-Time Electric Vehicle Dashboard & ADAS Warning System.',
    skills: ['Embedded C', 'Microcontroller Interfacing', 'Automotive Telematics', 'ADAS Alert Logic'],
    image: resolveCertificateImage('06', '/media/certificates/certificate6/embeded vehicle dashboard intern.jpeg'),
  },
  {
    id: 'cert_007',
    number: '07',
    displayOrder: 7,
    isPublished: true,
    title: 'Introduction to Generative AI',
    issuer: 'Simplilearn SkillUp / Google Cloud',
    category: 'Artificial Intelligence & Machine Learning',
    date: 'February 15, 2026',
    credentialId: '9847785',
    description: 'Generative AI fundamentals certification covering Large Language Models (LLMs), prompt architecture, and Google Cloud AI services.',
    skills: ['Generative AI', 'LLMs', 'Google Cloud AI', 'Prompt Architecture'],
    image: resolveCertificateImage('07', '/media/certificates/certificate7/gen ai.jpeg'),
  },
  {
    id: 'cert_008',
    number: '08',
    displayOrder: 8,
    isPublished: true,
    title: 'Data Structures & Algorithms in Python',
    issuer: 'Simplilearn SkillUp',
    category: 'Programming & Computational Logic',
    date: '16th April 2026',
    credentialId: '10110495',
    description: 'Certificate of Completion in Data Structures and Algorithms in Python, covering core computational logic, algorithmic problem-solving, and fundamental data structures.',
    skills: ['Data Structures', 'Algorithms', 'Python Programming', 'Computational Logic'],
    image: resolveCertificateImage('08', '/media/certificates/certificate8/dsa in python.jpeg'),
  },
  {
    id: 'cert_009',
    number: '09',
    displayOrder: 9,
    isPublished: true,
    title: 'Project Viksit Bharat 2026 National Innovation Hackathon',
    issuer: 'Frontend Arena / Unstop',
    category: 'Hackathons & National Competitions',
    date: '48-Hour Event (2026)',
    duration: 'Stage 1 – Ideation & Solution Design',
    description: 'National-level innovation hackathon. Team: nagaaswith3. Formulated product architecture, prototyping, and solution design.',
    skills: ['Product Architecture', 'Solution Design', 'Rapid Prototyping', 'Team Leadership'],
    image: resolveCertificateImage('09', '/media/certificates/certificate9/hacth-project viksit.jpeg'),
  },
  {
    id: 'cert_010',
    number: '10',
    displayOrder: 10,
    isPublished: true,
    title: 'AI Startup Buildathon 2026 — Beauty Salon Marketplace',
    issuer: 'SuperXgen / Unstop',
    category: 'Hackathons & National Competitions',
    date: '2026',
    description: 'National AI startup buildathon challenge focused on marketplace architecture, AI product strategy, and rapid prototype development.',
    skills: ['AI Product Strategy', 'Marketplace Architecture', 'Rapid Prototyping'],
    image: resolveCertificateImage('10', '/media/certificates/certificate10/hacth-beauty salon.jpeg'),
  },
];
