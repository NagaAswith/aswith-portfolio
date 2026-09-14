'use client';

import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';

export function OverlayMenu() {
  const isMenuOpen = useSearchStore((state) => state.isMenuOpen);
  const closeMenu = useSearchStore((state) => state.closeMenu);
  const personal = usePortfolioContent((state) => state.personalInfo);

  const menuColumns = useMemo(
    () => [
      {
        title: 'EXPLORE',
        links: [
          { label: `About ${personal.name || 'Aswith'}`, href: '#about' },
          { label: 'Selected Works', href: '#work' },
          { label: 'Skills & Tech Matrix', href: '#skills' },
        ],
      },
      {
        title: 'CAREER & ACADEMICS',
        links: [
          { label: 'Experience & Education', href: '#experience' },
          { label: 'Certificates & Credentials', href: '#certificates' },
          { label: 'Achievements & Honors', href: '#achievements' },
        ],
      },
      {
        title: 'CONNECT',
        links: [
          { label: 'Get in Touch', href: '#contact' },
          { label: 'GitHub Repository', href: personal.social.github, external: true },
          { label: 'LinkedIn Profile', href: personal.social.linkedin, external: true },
        ],
      },
    ],
    [personal]
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
      if (external) return;
      e.preventDefault();
      closeMenu();

      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [closeMenu]
  );

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-12 overflow-y-auto max-h-[100dvh] overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              NAVIGATION OVERVIEW
            </span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Columns */}
          <div className="my-auto py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16 max-w-6xl w-full mx-auto shrink-0">
            {menuColumns.map((col, colIdx) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: colIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 border-b border-white/10 pb-3">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        onClick={(e) => handleLinkClick(e, link.href, link.external)}
                        className="group inline-flex items-center text-xl sm:text-2xl font-light text-white/70 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                        </span>
                        {link.external && (
                          <span className="text-xs text-white/30 ml-2 group-hover:text-white/70">↗</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-white/30 gap-4">
            <span>© 2026 {personal.fullName}. All Rights Reserved.</span>
            <span>PRESS ESC TO RETURN</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
