import { resolveProjectImages } from './assetManifest';

export interface ProjectImages {
  main: string;
  gallery?: string[];
}

export interface ProjectItem {
  id: string; // Permanent internal ID, e.g. "project_001"
  slug: string; // Public URL slug, e.g. "aswith-ai"
  number: string; // Visible sequential display number, e.g. "01"
  title: string;
  category: 'SOFTWARE' | 'AI' | 'WEB' | 'IOT' | 'EMBEDDED';
  categories: Array<'SOFTWARE' | 'AI' | 'WEB' | 'IOT' | 'EMBEDDED'>;
  domain: string;
  organization?: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  images: ProjectImages;
  videoUrl?: string; // Optional project video (local upload or import)
  liveUrl?: string;

  githubUrl?: string;
  year: string;
  status: string;
  featured?: boolean;
  displayOrder?: number;
  isPublished?: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'project_001',
    slug: 'aswith-ai',
    number: '01',
    displayOrder: 1,
    isPublished: true,
    title: 'Aswith AI – Intelligent Desktop Assistant & Automation Platform',
    category: 'AI',
    categories: ['SOFTWARE', 'AI', 'IOT'],
    domain: 'Python Automation • Voice AI • HCI • IoT Control',
    shortDescription: 'Speech-driven intelligent desktop assistant providing voice command recognition, OS automation, information retrieval, and IoT hardware communication.',
    fullDescription: 'Comprehensive intelligent desktop assistant and automation platform engineered in Python. Combines speech recognition and text-to-speech synthesis with system-level API integrations to execute desktop automation, web browsing, application launching, information retrieval via Wikipedia API, weather/media control, password-protected Tkinter authentication, hardware/IoT communication workflows, and offline-oriented fallback routines.',
    technologies: [
      'Python',
      'SpeechRecognition',
      'Pyttsx3',
      'PyAutoGUI',
      'Tkinter',
      'PyWhatKit',
      'Wikipedia API',
      'OS APIs',
    ],
    features: [
      'Speech-to-text recognition & text-to-speech voice response',
      'Desktop automation & OS controls (application launching, web browsing)',
      'Media control & weather/information API retrieval',
      'Password-protected Tkinter authentication interface',
      'Hardware & IoT communication workflows',
      'Fallback routines for noise and API latency',
      'Offline-oriented operational routines',
    ],
    images: resolveProjectImages('01', {
      main: '/media/projects/project1/main.webp',
      gallery: [
        '/media/projects/project1/screenshot1.jpeg',
        '/media/projects/project1/screenshot2.webp',
        '/media/projects/project1/screenshot3.webp',
      ],
    }),
    githubUrl: 'https://github.com/Aswith',
    year: '2025',
    status: 'Active / Maintained',
    featured: true,
  },
  {
    id: 'project_002',
    slug: 'aswith-shopmore',
    number: '02',
    displayOrder: 2,
    isPublished: true,
    title: 'ShopMore (Aswith Shop)',
    category: 'WEB',
    categories: ['WEB', 'SOFTWARE'],
    domain: 'Frontend Web Development • Web Performance • UI/UX',
    shortDescription: 'Responsive mobile-first e-commerce web platform featuring product catalog browsing, inventory tracking, and client-side cart interactions.',
    fullDescription: 'Responsive mobile-first retail e-commerce platform engineered for fast render performance, intuitive UI/UX, and clean web standards. Built with HTML5, CSS3 Grid/Flexbox layouts, and client-side JavaScript for product catalog presentation, inventory/out-of-stock indicators, cart interactions, and lightweight mobile navigation.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Grid/Flexbox',
      'Netlify Deployment',
    ],
    features: [
      'Responsive mobile-first grid layout',
      'Product catalog & inventory stock states',
      'Out-of-stock indicators & quantity controls',
      'Cart manipulation & client-side interaction',
      'Lightweight navigation & Netlify deployment',
    ],
    images: resolveProjectImages('02', {
      main: '/media/projects/project2/main.webp',
      gallery: [
        '/media/projects/project2/screenshot1.webp',
        '/media/projects/project2/screenshot2.webp',
      ],
    }),
    liveUrl: 'https://aswithshop.netlify.app',
    githubUrl: 'https://github.com/Aswith',
    year: '2025',
    status: 'Live Production',
    featured: true,
  },
  {
    id: 'project_003',
    slug: 'obstacle-rc-car',
    number: '03',
    displayOrder: 3,
    isPublished: true,
    title: 'Bluetooth-Enabled Autonomous Obstacle Avoidance RC Car',
    category: 'EMBEDDED',
    categories: ['IOT', 'EMBEDDED'],
    domain: 'Embedded Systems • Robotics • Wireless Telematics • Sensor Fusion',
    shortDescription: 'Dual-mode robotic vehicle combining autonomous ultrasonic distance navigation with HC-05 Bluetooth smartphone telematics and PWM motor control.',
    fullDescription: 'Robotic telematics vehicle built on the Arduino microcontroller platform. Integrates ultrasonic distance sensors for autonomous obstacle detection and directional threshold navigation, alongside HC-05 Bluetooth wireless telematics for smartphone steering override, L293D PWM motor driver speed control, and differential steering sensor calibration.',
    technologies: [
      'Arduino',
      'Embedded C/C++',
      'Ultrasonic Distance Sensors',
      'HC-05 Bluetooth',
      'L293D Motor Driver',
      'Actuators & Chassis',
    ],
    features: [
      'Autonomous obstacle detection & distance-threshold navigation',
      'Directional avoidance algorithms & sensor calibration',
      'Bluetooth HC-05 manual override & smartphone steering',
      'PWM motor speed control via L293D driver',
      'Differential steering & power management',
    ],
    images: resolveProjectImages('03', {
      main: '/media/projects/project3/main.webp',
      gallery: [
        '/media/projects/project3/screenshot1.webp',
        '/media/projects/project3/screenshot2.webp',
      ],
    }),
    githubUrl: 'https://github.com/Aswith',
    year: '2024',
    status: 'Hardware Completed',
    featured: true,
  },
  {
    id: 'project_004',
    slug: 'ev-dasboard-adas',
    number: '04',
    displayOrder: 4,
    isPublished: true,
    title: 'Real-Time Electric Vehicle Dashboard & ADAS Warning System',
    category: 'IOT',
    categories: ['IOT', 'EMBEDDED'],
    domain: 'Embedded Systems • Automotive • IoT Telematics',
    organization: 'Emertxe Information Technologies',
    shortDescription: 'Real-time automotive telematics dashboard and ADAS warning logic system engineered during embedded systems internship at Emertxe.',
    fullDescription: 'Real-time automotive telematics dashboard and Advanced Driver Assistance System (ADAS) warning platform engineered during the Embedded Systems Internship at Emertxe (June 02, 2026 – July 03, 2026). Features microcontroller interfacing in Embedded C, sensor telemetry collection, real-time alert logic, and EV dashboard telemetry visualization.',
    technologies: [
      'Embedded C',
      'Microcontroller Interfacing',
      'Automotive Telematics',
      'ADAS Warning Logic',
      'Sensor Data Processing',
    ],
    features: [
      'Real-time electric vehicle sensor telemetry data collection',
      'ADAS hazard warning logic & alert generation',
      'Microcontroller peripheral interfacing in Embedded C',
      'Automotive dashboard monitoring UI concepts',
    ],
    images: resolveProjectImages('04', {
      main: '/media/projects/project4/main.webp',
      gallery: [
        '/media/projects/project4/screenshot1.webp',
        '/media/projects/project4/screenshot2.webp',
      ],
    }),
    githubUrl: 'https://github.com/Aswith',
    year: '2026',
    status: 'Internship Capstone',
    featured: true,
  },
  {
    id: 'project_005',
    slug: 'pratibha-career-discovery',
    number: '05',
    displayOrder: 5,
    isPublished: true,
    title: 'Pratibha – AI Career Discovery Platform',
    category: 'SOFTWARE',
    categories: ['SOFTWARE', 'WEB'],
    domain: 'Frontend Web Development • AI Integration • Educational Technology',
    shortDescription: 'AI-powered career and opportunity discovery platform designed to help students explore scholarships, internships, competitions and mentorship opportunities through a searchable, student-focused interface.',
    fullDescription: 'Pratibha is an AI-powered career and opportunity discovery platform designed to empower students by streamlining access to scholarships, internships, competitions, and mentorship programs. Featuring an intuitive, searchable student interface, automated AI resume generation, data-saving performance optimizations, multi-language support, and curated opportunity filtering.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'AI Logic',
      'Vercel Deployment',
    ],
    features: [
      'Searchable opportunity catalog (Scholarships, Competitions, Internships, Mentorship)',
      'AI Resume Generator & Profile Builder',
      'Data Saver mode & accessibility features',
      'Multi-language selection support',
      'Student-focused career discovery workflows',
    ],
    images: resolveProjectImages('05', {
      main: '/media/projects/project5/main.webp',
      gallery: [
        '/media/projects/project5/screenshot1.webp',
        '/media/projects/project5/screenshot2.webp',
      ],
    }),
    liveUrl: 'https://pratibha-opportunity-website.vercel.app/',
    year: '2026',
    status: 'Live Production',
    featured: true,
  },
];
