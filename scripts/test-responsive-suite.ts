/**
 * Automated Responsive Layout & Device Adaptation Verification Suite
 *
 * Verifies that the portfolio and admin layout components meet all Phase 2 - 18
 * responsive criteria:
 * 1. Global CSS & Viewport boundaries (overflow-x hidden, safe-area insets, text-size-adjust)
 * 2. 3D Canvas non-interference (pointer-events-none layer isolation)
 * 3. Hero & Portrait fluid responsiveness (clamp sizing, min-h-[100dvh])
 * 4. Navigation & Mobile Drawer (max-h-[100dvh], overflow-y-auto, overscroll-contain)
 * 5. Touch swipe gestures in BoxCarousel and CoverflowCarousel
 * 6. Touch node accessibility in SkillsOrbital (touch click toggle)
 * 7. Modals responsive bounding & internal scroll (ProjectModal, CertificateModal, AIAssistantModal, SearchPalette, AdminAuthModal)
 * 8. Admin Portal responsiveness (scrollable horizontal tabs, max-h-[90dvh] modals)
 */

import * as fs from 'fs';
import * as path from 'path';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failedTests++;
  }
}

function runSuite() {
  console.log('====================================================');
  console.log('STARTING RESPONSIVE LAYOUT & DEVICE ADAPTATION SUITE');
  console.log('====================================================\n');

  const rootDir = process.cwd();

  // ── Area 1: Global CSS & Viewport Bounds ─────────────────────────────────
  console.log('--- Area 1: Global CSS & Viewport Bounds ---');
  const globalsCss = fs.readFileSync(path.join(rootDir, 'app/globals.css'), 'utf-8');
  assert(
    globalsCss.includes('overflow-x: hidden'),
    'Global CSS enforces overflow-x: hidden on html and body'
  );
  assert(
    globalsCss.includes('env(safe-area-inset-bottom)'),
    'Global CSS defines safe-area-inset-bottom support'
  );
  assert(
    globalsCss.includes('env(safe-area-inset-top)'),
    'Global CSS defines safe-area-inset-top support'
  );
  assert(
    globalsCss.includes('-webkit-text-size-adjust: 100%'),
    'Global CSS prevents mobile browser unwanted text inflation (-webkit-text-size-adjust)'
  );

  const layoutTsx = fs.readFileSync(path.join(rootDir, 'app/layout.tsx'), 'utf-8');
  assert(
    layoutTsx.includes('viewportFit: "cover"'),
    'Next.js Viewport export configures viewportFit: "cover" for mobile edge-to-edge rendering'
  );
  assert(
    layoutTsx.includes('overflow-x-hidden'),
    'Root body tag applies overflow-x-hidden to prevent horizontal page scrolling'
  );

  // ── Area 2: 3D Canvas Non-Interference ──────────────────────────────────
  console.log('\n--- Area 2: 3D Canvas Layer Isolation & Non-Interference ---');
  const experienceTsx = fs.readFileSync(path.join(rootDir, 'components/canvas/Experience.tsx'), 'utf-8');
  assert(
    experienceTsx.includes('pointer-events-none'),
    'Experience outer 3D canvas container specifies pointer-events-none'
  );

  // ── Area 3: Hero & Fluid Typography ──────────────────────────────────────
  console.log('\n--- Area 3: Hero & Fluid Portrait Responsiveness ---');
  const heroTsx = fs.readFileSync(path.join(rootDir, 'components/hero/HeroSection.tsx'), 'utf-8');
  assert(
    heroTsx.includes('min-h-[100dvh]'),
    'Hero section adopts dynamic viewport height (100dvh) for mobile address bar resilience'
  );
  assert(
    heroTsx.includes('break-words'),
    'Hero heading applies break-words to avoid viewport clipping on narrow screens'
  );

  const portraitTsx = fs.readFileSync(path.join(rootDir, 'components/hero/ProfilePortrait.tsx'), 'utf-8');
  assert(
    portraitTsx.includes('clamp(170px'),
    'ProfilePortrait uses responsive clamp(170px, 45vw, 320px) preventing 320px phone crowding'
  );

  // ── Area 4: Navigation & Overlays ─────────────────────────────────────────
  console.log('\n--- Area 4: Navigation & Drawer Viewport Sizing ---');
  const overlayMenuTsx = fs.readFileSync(path.join(rootDir, 'components/navigation/OverlayMenu.tsx'), 'utf-8');
  assert(
    overlayMenuTsx.includes('overflow-y-auto') && overlayMenuTsx.includes('max-h-[100dvh]'),
    'OverlayMenu handles phone portrait & landscape via max-h-[100dvh] and overflow-y-auto'
  );
  assert(
    overlayMenuTsx.includes('overscroll-contain'),
    'OverlayMenu applies overscroll-contain to isolate scroll chain'
  );

  const searchPaletteTsx = fs.readFileSync(path.join(rootDir, 'components/navigation/SearchPalette.tsx'), 'utf-8');
  assert(
    searchPaletteTsx.includes('max-h-[85dvh]') || searchPaletteTsx.includes('max-h-[90dvh]'),
    'SearchPalette applies responsive max-h to stay visible on short 720p viewports'
  );

  // ── Area 5: Touch Gestures & Carousels ────────────────────────────────────
  console.log('\n--- Area 5: Touch Swipe Interaction in Carousels ---');
  const boxCarouselTsx = fs.readFileSync(path.join(rootDir, 'components/ui/BoxCarousel.tsx'), 'utf-8');
  assert(
    boxCarouselTsx.includes('onTouchStart') && boxCarouselTsx.includes('onTouchEnd'),
    'BoxCarousel registers touch gesture handlers (onTouchStart, onTouchEnd)'
  );
  assert(
    boxCarouselTsx.includes('isMobile'),
    'BoxCarousel adapts step translation distance dynamically for mobile viewports'
  );

  const coverflowTsx = fs.readFileSync(path.join(rootDir, 'components/ui/CoverflowCarousel.tsx'), 'utf-8');
  assert(
    coverflowTsx.includes('onTouchStart') && coverflowTsx.includes('onTouchEnd'),
    'CoverflowCarousel registers touch gesture handlers for mobile swipe navigation'
  );

  // ── Area 6: Skills Touch Interactivity ───────────────────────────────────
  console.log('\n--- Area 6: Skills Orbital Touch Interaction ---');
  const orbitalTsx = fs.readFileSync(path.join(rootDir, 'components/skills/SkillsOrbital.tsx'), 'utf-8');
  assert(
    orbitalTsx.includes('setActiveSkill((prev) => (prev?.id === skill.id ? null : skill))'),
    'SkillsOrbital allows touch users to toggle active skill details on tap'
  );

  // ── Area 7: Public Modals Viewport Bounds ────────────────────────────────
  console.log('\n--- Area 7: Public Modals Viewport Bounds ---');
  const projectModalTsx = fs.readFileSync(path.join(rootDir, 'components/projects/ProjectModal.tsx'), 'utf-8');
  assert(
    projectModalTsx.includes('max-h-[calc(100dvh-5rem)]') && projectModalTsx.includes('overflow-y-auto'),
    'ProjectModal stays inside viewport with max-h-[calc(100dvh-5rem)] and internal scroll'
  );

  const certModalTsx = fs.readFileSync(path.join(rootDir, 'components/certificates/CertificateModal.tsx'), 'utf-8');
  assert(
    certModalTsx.includes('calc(100dvh - 5rem)') && certModalTsx.includes('overflow-y-auto'),
    'CertificateModal bounds max height to viewport and allows internal scroll'
  );

  const aiModalTsx = fs.readFileSync(path.join(rootDir, 'components/ai/AIAssistantModal.tsx'), 'utf-8');
  assert(
    aiModalTsx.includes('calc(100vw-2rem)') && aiModalTsx.includes('100dvh'),
    'AIAssistantModal stays strictly within mobile viewport dimensions'
  );

  // ── Area 8: Admin Portal Responsiveness ──────────────────────────────────
  console.log('\n--- Area 8: Admin Portal Responsiveness ---');
  const adminDashboardTsx = fs.readFileSync(path.join(rootDir, 'components/admin/AdminDashboard.tsx'), 'utf-8');
  assert(
    adminDashboardTsx.includes('overflow-x-auto') && adminDashboardTsx.includes('md:flex-col'),
    'Admin dashboard navigation transforms into horizontally scrollable tabs on phone/tablet'
  );
  assert(
    adminDashboardTsx.includes('max-h-[90dvh] flex flex-col'),
    'Admin editor modals use max-h-[90dvh] with flex-col layout to preserve header and action buttons'
  );

  const adminAuthModalTsx = fs.readFileSync(path.join(rootDir, 'components/navigation/AdminAuthModal.tsx'), 'utf-8');
  assert(
    adminAuthModalTsx.includes('max-h-[90dvh]'),
    'AdminAuthModal bounds height to 90dvh on mobile screens'
  );

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log('\n====================================================');
  console.log(`RESPONSIVE AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runSuite();
