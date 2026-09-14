'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { usePortfolioContent } from '@/store/usePortfolioContent';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const openSearch = useSearchStore((state) => state.openSearch);
  const toggleMenu = useSearchStore((state) => state.toggleMenu);
  const isMenuOpen = useSearchStore((state) => state.isMenuOpen);
  const personal = usePortfolioContent((state) => state.personalInfo);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-out',
        isScrolled
          ? 'py-3.5 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 min-[380px]:px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand Logo / Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-125" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/90 group-hover:text-white transition-colors">
            {personal.fullName}
          </span>
        </a>

        {/* Center: Minimal Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300 relative py-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Search & Menu Actions */}
        <div className="flex items-center gap-4">
          {/* Cmd+K Search Trigger */}
          <button
            onClick={openSearch}
            aria-label="Open search command palette (Ctrl+K or Cmd+K)"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-mono transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] tracking-wider">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-white/10 rounded text-white/50 border border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Overlay Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 text-white/70 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
