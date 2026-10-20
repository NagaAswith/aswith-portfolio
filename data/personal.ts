/**
 * Personal portfolio data for Naga Aswith.
 * Standardized public name: Naga Aswith
 * Professional description: Software Developer | Web Development | AI & Automation
 */

export interface PersonalInfo {
  name: string;
  fullName: string;
  greeting: string;
  title: string;
  roles: string[];
  tagline: string;
  description: string;
  aboutMe?: string;
  selfIntroVideo: string;
  educationSummary: {
    degree: string;
    cgpa: string;
    expectedGraduation: string;
  };
  cta: {
    primary: {
      label: string;
      action: 'about-me';
    };
    secondary: {
      label: string;
      action: 'explore-work';
    };
  };
  social: {
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    codechef?: string;
    leetcode?: string;
    location?: string;
  };
}

export const personal: PersonalInfo = {
  name: 'Naga Aswith',
  fullName: 'Naga Aswith',
  greeting: "HELLO, I'M",

  title: 'Software Developer | Web Development | AI & Automation',
  roles: [
    'Software Developer',
    'Web Development Specialist',
    'AI & Automation Engineer',
  ],

  tagline: 'Designing and developing modern websites, responsive web applications,\nAI-powered tools, and intelligent automation solutions.',

  description:
    'Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions. The work combines user-friendly design with practical software engineering to create digital experiences that are useful, accessible, and efficient.',

  aboutMe:
    'Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions. The work combines user-friendly design with practical software engineering to create digital experiences that are useful, accessible, and efficient.\n\nAreas of focus include website design and development, full-stack web applications, AI integration, automation agents, API integration, database-driven applications, and workflow automation.\n\nThe goal is to build reliable, intuitive digital products that help people and businesses simplify tasks, access information, and make better use of technology.',

  selfIntroVideo: '/media/selfintro/WhatsApp Video 2026-08-18 at 4.02.51 PM.mp4',

  educationSummary: {
    degree: 'B.Tech in Electronics and Communication Engineering',
    cgpa: '8.79 / 10',
    expectedGraduation: '2028',
  },

  cta: {
    primary: {
      label: 'About Me',
      action: 'about-me',
    },
    secondary: {
      label: 'Explore My Work',
      action: 'explore-work',
    },
  },

  social: {
    phone: '8328671677',
    email: 'nagaaswith3@gmail.com',
    github: 'https://github.com/Aswith',
    linkedin: 'https://linkedin.com/in/Aswith',
    resumeUrl: '/media/resume.pdf',
    codechef: 'https://www.codechef.com/users/nagaaswith3',
    leetcode: 'https://leetcode.com/u/nagaaswith3',
    location: 'India',
  },
};

export type Personal = typeof personal;
