/**
 * Personal portfolio data for Ranga Naga Aswith.
 */

export interface PersonalInfo {
  name: string;
  fullName: string;
  greeting: string;
  title: string;
  roles: string[];
  tagline: string;
  description: string;
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
  name: 'Aswith',
  fullName: 'Ranga Naga Aswith',
  greeting: "HELLO, I'M",

  title: 'B.Tech Electronics & Communication Engineering Student',
  roles: [
    'B.Tech ECE Student',
    'Software & AI Automation Developer',
    'Embedded Systems & IoT Enthusiast',
  ],

  tagline: 'Building practical software, AI automation platforms,\nand intelligent connected hardware-software systems.',

  description:
    'Electronics and Communication Engineering undergraduate with hands-on software development experience in Python, AI automation, web applications, embedded microcontrollers, and data-driven problem solving.',

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
