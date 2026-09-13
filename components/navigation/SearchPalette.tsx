'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FolderGit2, Cpu, Award, Briefcase, User, Mail, Trophy, ArrowRight } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { personal } from '@/data/personal';
import { skillsData } from '@/data/skills';
import { experienceData, educationData } from '@/data/experience';
import { achievementsData } from '@/data/achievements';
import { usePortfolioContent } from '@/store/usePortfolioContent';

interface SearchResultItem {
  id: string;
  type: 'Projects' | 'Skills' | 'Experience' | 'Education' | 'Certificates' | 'Achievements' | 'About' | 'Contact';
  title: string;
  subtitle: string;
  targetId: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SearchPaletteProps {
  onTriggerAdminModal?: () => void;
}

export function SearchPalette({ onTriggerAdminModal }: SearchPaletteProps) {
  const isSearchOpen = useSearchStore((state) => state.isSearchOpen);
  const closeSearch = useSearchStore((state) => state.closeSearch);
  const openSearch = useSearchStore((state) => state.openSearch);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Secret phrase detection: "Aswith Change" or "aswith-change"
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query === 'aswith change' || query === 'aswith-change') {
      setSearchQuery('');
      closeSearch();
      if (onTriggerAdminModal) {
        onTriggerAdminModal();
      }
    }
  }, [searchQuery, setSearchQuery, closeSearch, onTriggerAdminModal]);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else openSearch();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, openSearch, closeSearch]);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const projects = usePortfolioContent((state) => state.projects);
  const certificates = usePortfolioContent((state) => state.certificates);

  // Build searchable index items from authentic data sources
  const allSearchItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [
      {
        id: 'about-me',
        type: 'About',
        title: `About ${personal.fullName}`,
        subtitle: `${personal.title} (CGPA ${personal.educationSummary.cgpa})`,
        targetId: 'about',
        icon: User,
      },
      {
        id: 'edu-btech',
        type: 'Education',
        title: educationData.degree,
        subtitle: `Expected ${educationData.expectedGraduation} • CGPA ${educationData.cgpa}`,
        targetId: 'experience',
        icon: User,
      },
      {
        id: 'contact-me',
        type: 'Contact',
        title: 'Get In Touch',
        subtitle: personal.social.email,
        targetId: 'contact',
        icon: Mail,
      },
    ];

    projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        type: 'Projects',
        title: proj.title,
        subtitle: `${proj.domain} — ${proj.technologies.slice(0, 3).join(', ')}`,
        targetId: 'work',
        icon: FolderGit2,
      });
    });

    skillsData.forEach((skill) => {
      items.push({
        id: `skill-${skill.id}`,
        type: 'Skills',
        title: skill.name,
        subtitle: `${skill.category} (${skill.proficiency}% Proficiency)`,
        targetId: 'skills',
        icon: Cpu,
      });
    });

    experienceData.forEach((exp) => {
      items.push({
        id: `exp-${exp.id}`,
        type: 'Experience',
        title: exp.title,
        subtitle: `${exp.organization} (${exp.period})`,
        targetId: 'experience',
        icon: Briefcase,
      });
    });

    certificates.forEach((cert) => {
      items.push({
        id: `cert-${cert.id}`,
        type: 'Certificates',
        title: cert.title,
        subtitle: `${cert.issuer} • ${cert.date}`,
        targetId: 'certificates',
        icon: Award,
      });
    });

    achievementsData.forEach((ach) => {
      items.push({
        id: `ach-${ach.id}`,
        type: 'Achievements',
        title: ach.title,
        subtitle: `${ach.metric} • ${ach.category}`,
        targetId: 'achievements',
        icon: Trophy,
      });
    });

    return items;
  }, []);

  // Filter items based on searchQuery
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return allSearchItems;
    const q = searchQuery.toLowerCase();
    return allSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [allSearchItems, searchQuery]);

  const handleSelectItem = useCallback(
    (item: SearchResultItem) => {
      closeSearch();
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [closeSearch]
  );

  // Keyboard navigation within modal (Up, Down, Enter, ESC)
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % (filteredResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-2xl"
          onClick={closeSearch}
        >
          <motion.div
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            {/* Input Header */}
            <div className="relative flex items-center px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-white/40 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, skills, experience, certificates, achievements..."
                className="w-full bg-transparent text-white placeholder-white/30 text-sm font-sans focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-white/40 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 rounded">
                ESC to close
              </kbd>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-3 space-y-1 divide-y divide-white/5">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={[
                        'w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-150 cursor-pointer',
                        isSelected ? 'bg-white/10 border border-white/15 text-white' : 'text-white/70 hover:bg-white/5 border border-transparent',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2 rounded-md bg-white/5 border border-white/10 text-white/60">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono tracking-wider uppercase text-white/40">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-white truncate">{item.title}</p>
                          <p className="text-xs text-white/40 truncate mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-white/30 transition-transform ${isSelected ? 'translate-x-1 text-white' : ''}`} />
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-white/40 font-mono text-xs uppercase tracking-widest">
                  No matching results found
                </div>
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-white/40">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>{filteredResults.length} Results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
