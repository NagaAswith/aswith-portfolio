import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code2, Cpu, Globe, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Naga Aswith | Software Developer',
  description:
    'Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Naga Aswith | Software Developer',
    description:
      'Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.',
    url: 'https://aswith-portfolio.vercel.app/about',
    type: 'profile',
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Naga Aswith",
    "jobTitle": "Software Developer",
    "description": "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.",
    "url": "https://aswith-portfolio.vercel.app/about",
    "sameAs": [
      "https://github.com/Aswith",
      "https://linkedin.com/in/Aswith",
      "https://www.codechef.com/users/nagaaswith3",
      "https://leetcode.com/u/nagaaswith3"
    ]
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-8 py-16 sm:py-24 max-w-4xl mx-auto selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Navigation Back */}
      <nav className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 mb-12 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>About Developer</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
          Naga Aswith
        </h1>
        <p className="text-lg sm:text-xl font-mono text-cyan-400">
          Software Developer | Web Development | AI &amp; Automation
        </p>
      </header>

      {/* Approved About Me Biography */}
      <article className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-light mb-12">
        <p>
          Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions. The work combines user-friendly design with practical software engineering to create digital experiences that are useful, accessible, and efficient.
        </p>
        <p>
          Areas of focus include website design and development, full-stack web applications, AI integration, automation agents, API integration, database-driven applications, and workflow automation.
        </p>
        <p>
          The goal is to build reliable, intuitive digital products that help people and businesses simplify tasks, access information, and make better use of technology.
        </p>
      </article>

      {/* Core Competencies Matrix */}
      <section className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
          Areas of Focus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
              <Globe className="w-4 h-4" />
              <span>Web Development</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Modern websites, responsive interfaces, client-side interactions, and scalable full-stack web applications.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <Cpu className="w-4 h-4" />
              <span>AI Integration</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Practical integration of large language models, structured context pipelines, and multimodal inference tools.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
              <Workflow className="w-4 h-4" />
              <span>Intelligent Automation</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              Workflow automation, task agents, scheduled background monitors, and automated data processing.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
              <Code2 className="w-4 h-4" />
              <span>API &amp; Database Architecture</span>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              RESTful APIs, relational databases, data schemas, clean interfaces, and resilient integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Professional Profiles */}
      <section className="border-t border-neutral-800 pt-8 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Verified Profiles &amp; Work
        </h2>
        <div className="flex flex-wrap gap-4 text-sm font-mono">
          <a
            href="https://github.com/Aswith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/Aswith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.codechef.com/users/nagaaswith3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <span>CodeChef</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://leetcode.com/u/nagaaswith3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <span>LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Portfolio Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
