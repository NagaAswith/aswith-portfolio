/**
 * Structured knowledge context for Ranga Naga Aswith's Personal AI Assistant.
 * All answers provided by the AI Assistant must strictly originate from this data.
 */

export const assistantContext = {
  personal: {
    fullName: 'Ranga Naga Aswith',
    name: 'Aswith',
    title: 'B.Tech Electronics & Communication Engineering Student',
    degree: 'B.Tech in Electronics and Communication Engineering',
    cgpa: '8.79 / 10',
    expectedGraduation: '2028',
    roles: [
      'B.Tech ECE Student',
      'Software & AI Automation Developer',
      'Embedded Systems & IoT Enthusiast',
    ],
    tagline: 'Building practical software, AI automation platforms, and intelligent connected hardware-software systems.',
    bio: 'Electronics and Communication Engineering undergraduate with hands-on software development experience in Python, AI automation, web applications, embedded microcontrollers, and data-driven problem solving.',
    email: 'nagaaswith3@gmail.com',
    phone: '8328671677',
    github: 'https://github.com/Aswith',
    linkedin: 'https://linkedin.com/in/Aswith',
    resumeUrl: '/media/resume.pdf',
  },

  projects: [
    {
      name: 'Aswith AI — Intelligent Desktop Assistant & Automation Platform',
      domain: 'Python Automation, Voice AI, HCI, IoT Control',
      tech: ['Python', 'SpeechRecognition', 'Pyttsx3', 'PyAutoGUI', 'Tkinter', 'PyWhatKit', 'Wikipedia API', 'OS APIs'],
      highlights: [
        'Speech-to-text recognition and text-to-speech voice response',
        'Desktop automation, application launching, web browsing, media control',
        'Password-protected Tkinter authentication interface',
        'Hardware and IoT communication workflows with offline fallback routines',
      ],
    },
    {
      name: 'ShopMore / Aswith Shop',
      liveUrl: 'https://aswithshop.netlify.app',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid/Flexbox', 'Netlify'],
      highlights: [
        'Responsive mobile-first e-commerce retail platform',
        'Product catalog, inventory stock indicators, quantity controls',
        'Client-side cart interactions and lightweight frontend architecture',
      ],
    },
    {
      name: 'Bluetooth-Enabled Autonomous Obstacle Avoidance RC Car',
      domain: 'Embedded Systems, Robotics, Wireless Telematics, Sensor Fusion',
      tech: ['Arduino', 'Embedded C/C++', 'Ultrasonic Distance Sensors', 'HC-05 Bluetooth', 'L293D Motor Driver'],
      highlights: [
        'Autonomous obstacle detection and distance-threshold navigation',
        'HC-05 Bluetooth wireless telematics for manual smartphone steering override',
        'PWM motor speed control and differential steering calibration',
      ],
    },
    {
      name: 'Real-Time Electric Vehicle Dashboard & ADAS Warning System',
      organization: 'Emertxe Information Technologies Internship Capstone',
      tech: ['Embedded C', 'Microcontroller Interfacing', 'Automotive Telematics', 'ADAS Warning Logic'],
      highlights: [
        'Real-time electric vehicle sensor telemetry collection',
        'ADAS hazard warning logic and alert generation in Embedded C',
        'Automotive dashboard telemetry monitoring',
      ],
    },
    {
      name: 'Pratibha — AI Career Discovery Platform',
      liveUrl: 'https://pratibha-opportunity-website.vercel.app/',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Logic', 'Vercel Deployment'],
      highlights: [
        'AI-powered career and opportunity discovery platform for students',
        'Searchable opportunity catalog (scholarships, internships, competitions, mentorship)',
        'AI Resume Generator, Data Saver mode, and multi-language support',
      ],
    },
  ],

  skills: [
    { name: 'Python', category: 'Programming & Logic', proficiency: '95%' },
    { name: 'C Language', category: 'Programming & Logic', proficiency: '85%' },
    { name: 'JavaScript (ES6+)', category: 'Web & Frontend', proficiency: '88%' },
    { name: 'HTML5 & CSS3', category: 'Web & Frontend', proficiency: '92%' },
    { name: 'SQL', category: 'Programming & Logic', proficiency: '82%' },
    { name: 'Generative AI & LLMs', category: 'AI & Automation', proficiency: '88%' },
    { name: 'CrewAI', category: 'AI & Automation', proficiency: '85%' },
    { name: 'n8n Workflow Automation', category: 'AI & Automation', proficiency: '84%' },
    { name: 'IoT Telemetry', category: 'Embedded & IoT', proficiency: '86%' },
    { name: 'Embedded Systems & Arduino', category: 'Embedded & IoT', proficiency: '85%' },
    { name: 'Git & GitHub', category: 'Tools & Workflows', proficiency: '88%' },
  ],

  certificates: [
    'The Joy of Computing using Python — NPTEL / IIT Madras (Elite 62%)',
    'Python Skill Up — GeeksforGeeks',
    'Introduction to C — SoloLearn (Credential CC-8RUTSOVH)',
    'AWS Cloud Practitioner Essentials — AWS Training & Certification',
    'Python with AWS Cloud Training — LinuxWorld Informatics (LW-JPR-2026-5584)',
    'Embedded Systems Internship Certification — Emertxe (EI26_016)',
    'Introduction to Generative AI — Simplilearn / Google Cloud (9847785)',
    'QuizOff 2026: India\'s Biggest AI Quiz — CampusCrew / Unstop',
    'Project Viksit Bharat 2026 National Innovation Hackathon — Frontend Arena / Unstop',
    'AI Startup Buildathon 2026 — SuperXgen / Unstop',
  ],

  experience: [
    {
      role: 'IoT Engineering Intern',
      organization: 'Emertxe Information Technologies',
      period: 'June 2026 – July 2026',
      highlights: 'Engineered hardware/software system integration for connected IoT devices, built ADAS warning system, integrated embedded sensors with real-time dashboards.',
    },
    {
      role: 'Cybersecurity Analyst (Job Simulation)',
      organization: 'Tata Cybersecurity (Forage)',
      period: '2026',
      highlights: 'Analyzed enterprise security scenarios, identity & access management (IAM), threat vector detection, and mitigation protocols.',
    },
  ],

  achievements: [
    'CodeChef 2-Star Coder',
    'Solved 300+ problem solutions on CodeChef',
    'Solved 70+ Data Structures & Algorithms problems on LeetCode',
    '2nd Prize — Project Expo (College Engineering Day, Individual participation)',
    'National Cadet Corps (NCC) Trained with A+ Grade Certificate',
    'National College Event Participant representing institution',
  ],
};
