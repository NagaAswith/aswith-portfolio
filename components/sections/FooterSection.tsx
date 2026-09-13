'use client';

import React from 'react';
import { Mail, ArrowUpRight, Code2, Globe } from 'lucide-react';
import { personal } from '@/data/personal';

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative z-20 bg-black border-t border-white/10 text-white pt-24 pb-12 px-6 sm:px-12 mt-32"
      aria-label="Footer & Contact Information"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Contact Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-white/10 pb-20">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block">
              05 / GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-7xl font-extralight tracking-tight leading-tight">
              Let&apos;s build something intelligent together.
            </h2>
            <p className="text-lg text-white/50 font-light max-w-xl">
              Open for software engineering opportunities, AI systems integration, and hardware-software projects.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-8">
            <a
              href="mailto:contact@aswith.dev"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={personal.social.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Code2 className="w-5 h-5" />
              </a>
              <a
                href={personal.social.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/30">
          <div className="flex items-center gap-6">
            <span>© 2026 {personal.fullName}</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
