'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/components/canvas/Experience';
import { IntroExperience } from '@/components/intro/IntroExperience';
import { FallbackNotice } from '@/components/ui/FallbackNotice';
import { HeroSection } from '@/components/hero/HeroSection';
import { Navbar } from '@/components/navigation/Navbar';
import { SearchPalette } from '@/components/navigation/SearchPalette';
import { AdminAuthModal } from '@/components/navigation/AdminAuthModal';
import { AIAssistantModal } from '@/components/ai/AIAssistantModal';
import { OverlayMenu } from '@/components/navigation/OverlayMenu';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { CertificatesSection } from '@/components/certificates/CertificatesSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { AsciiRain } from '@/components/ui/AsciiRain';
import { CinematicBackground } from '@/components/background/CinematicBackground';
import { SectionTransition } from '@/components/ui/SectionTransition';
import { useIntroStore } from '@/store/useIntroStore';

export default function Home() {
  const introState = useIntroStore((state) => state.introState);
  const isPortfolioActive = introState === 'PORTFOLIO_ACTIVE';
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  // Section-aware background: Activates ONLY from Section 2 (Projects) onwards
  useEffect(() => {
    if (!isPortfolioActive) return;

    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.45;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPortfolioActive]);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 3D Canvas — Fixed viewport background */}
      <Experience />

      {/* Cinematic Multi-Layered Portfolio Background Environment */}
      <CinematicBackground />

      {/* Special Background (ASCII Digital Rain) — Page 2+ only, smooth fade-in */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out"
        style={{ opacity: isPastHero && isPortfolioActive ? 1 : 0 }}
      >
        <AsciiRain />
      </div>

      {/* Intro Opening Experience */}
      <IntroExperience />

      {/* WebGL fallback notice */}
      <FallbackNotice />

      {/* Portfolio World Content */}
      {isPortfolioActive && (
        <>
          {/* Global Header Navigation */}
          <Navbar />

          {/* Search Command Palette (Cmd+K / Ctrl+K) */}
          <SearchPalette onTriggerAdminModal={() => setAdminModalOpen(true)} />

          {/* Secret Admin Authentication Modal */}
          <AdminAuthModal
            isOpen={adminModalOpen}
            onClose={() => setAdminModalOpen(false)}
          />

          {/* Personal AI Assistant Floating Widget */}
          <AIAssistantModal />

          {/* Overlay Navigation Menu */}
          <OverlayMenu />

          {/* Hero / Introduction (Page 1) */}
          <div id="about">
            <HeroSection isActive={isPortfolioActive} />
          </div>

          {/* Section 2+: Selected Projects */}
          <SectionTransition id="work-transition">
            <ProjectsSection />
          </SectionTransition>

          {/* Section 3: Skills & Technical Matrix */}
          <SectionTransition id="skills-transition">
            <SkillsSection />
          </SectionTransition>

          {/* Section 4: Experience & Education */}
          <SectionTransition id="experience-transition">
            <ExperienceSection />
          </SectionTransition>

          {/* Section 5: Certificates & Specializations */}
          <SectionTransition id="certificates-transition">
            <CertificatesSection />
          </SectionTransition>

          {/* Section 6: Achievements & Honors */}
          <SectionTransition id="achievements-transition">
            <AchievementsSection />
          </SectionTransition>

          {/* Section 7: Contact / Final CTA */}
          <SectionTransition id="contact-transition">
            <ContactSection />
          </SectionTransition>
        </>
      )}
    </main>
  );
}
