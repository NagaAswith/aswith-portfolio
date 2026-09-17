'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  Award,
  Cpu,
  Briefcase,
  GraduationCap,
  Trophy,
  FileText,
  User,
  Image as ImageIcon,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  Layers,
  Sparkles,
  Link as LinkIcon,
  Globe,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProjectItem } from '@/data/projects';
import { CertificateItem } from '@/data/certificates';
import { SkillNode } from '@/data/skills';
import { ExperienceItem, EducationItem } from '@/data/experience';
import { AchievementItem } from '@/data/achievements';
import { PersonalInfo } from '@/data/personal';
import { usePortfolioContent } from '@/store/usePortfolioContent';
import { formatImageUrl } from '@/data/assetManifest';
import { MediaImportControl } from './MediaImportControl';
import { MediaFileUpload } from './MediaFileUpload';


type AdminTab =
  | 'DASHBOARD'
  | 'PROJECTS'
  | 'CERTIFICATES'
  | 'SKILLS'
  | 'EXPERIENCE'
  | 'EDUCATION'
  | 'ACHIEVEMENTS'
  | 'RESUME'
  | 'PERSONAL'
  | 'MEDIA'
  | 'SETTINGS';

const PROJECT_CATEGORIES: Array<'SOFTWARE' | 'AI' | 'WEB' | 'IOT' | 'EMBEDDED'> = [
  'SOFTWARE',
  'AI',
  'WEB',
  'IOT',
  'EMBEDDED',
];

const CERTIFICATE_CATEGORIES = [
  'Programming & Computational Logic',
  'Cloud Computing & Infrastructure Automation',
  'Embedded Systems, Automotive & IoT',
  'Artificial Intelligence & Machine Learning',
  'Hackathons & National Competitions',
] as const;

const SKILL_CATEGORIES: Array<SkillNode['category']> = [
  'Programming & Logic',
  'AI & Automation',
  'Embedded & IoT',
  'Web & Frontend',
  'Tools & Workflows',
];

const EXPERIENCE_TYPES: Array<ExperienceItem['type']> = [
  'INTERNSHIP',
  'JOB SIMULATION',
  'EDUCATION',
  'FULL TIME',
];

/**
 * Thumbnail preview helper with safe error fallback
 */
function ImagePreview({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  const formatted = src ? formatImageUrl(src) : '';

  if (!formatted || error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900 border border-white/10 text-white/30 rounded-lg p-2 text-center ${className}`}>
        <Layers className="w-5 h-5 mb-1 text-white/20" />
        <span className="text-[10px] font-mono uppercase">No Preview</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-zinc-900 border border-white/15 ${className}`}>
      <Image
        src={formatted}
        alt={alt}
        fill
        sizes="200px"
        className="object-cover object-center"
        onError={() => setError(true)}
      />
    </div>
  );
}

/**
 * Universal Delete Safety Confirmation Modal
 */
function DeleteConfirmModal({
  isOpen,
  title,
  itemId,
  itemType,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  itemId: string;
  itemType: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md max-h-[90dvh] overflow-y-auto bg-zinc-950 border border-red-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-red-400">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Delete {itemType}?</h3>
            <p className="text-xs font-mono text-white/40">Permanent Action Required</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2 text-xs">
          <p className="text-white/80 font-medium">
            Are you sure you want to delete <strong className="text-white">&ldquo;{title}&rdquo;</strong>?
          </p>
          <p className="text-white/50 font-mono text-[11px]">
            Permanent ID <span className="text-red-300 font-bold">{itemId}</span> will be RETIRED and never reused.
            Public display numbering will dynamically adjust.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-black text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirm Deletion</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Full Project Editor Modal (Level 1 Card + Level 2 Detail Page with 4-Slot Gallery)
 */
function ProjectEditorModal({
  project,
  isOpen,
  onSave,
  onCancel,
}: {
  project: ProjectItem | null;
  isOpen: boolean;
  onSave: (proj: ProjectItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProjectItem | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'CARD' | 'GALLERY' | 'DETAIL' | 'LINKS' | 'MEDIA'>('CARD');


  // Input state for new tag / highlight
  const [newHighlight, setNewHighlight] = useState('');
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    if (project) {
      setForm(JSON.parse(JSON.stringify(project)));
      setValidationError(null);
    }
  }, [project]);

  if (!isOpen || !form) return null;

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setForm({
      ...form,
      technologies: [...(form.technologies || []), newTech.trim()],
    });
    setNewTech('');
  };

  const handleRemoveTech = (techToRemove: string) => {
    setForm({
      ...form,
      technologies: (form.technologies || []).filter((t) => t !== techToRemove),
    });
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm({
      ...form,
      features: [...(form.features || []), newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setForm({
      ...form,
      features: (form.features || []).filter((_, i) => i !== idx),
    });
  };

  const handleGalleryChange = (slotIndex: number, url: string) => {
    const currentGallery = [...(form.images?.gallery || [])];
    currentGallery[slotIndex] = url;
    setForm({
      ...form,
      images: {
        ...form.images,
        main: form.images?.main || '',
        gallery: currentGallery,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setValidationError('Project title is required.');
      return;
    }
    if (!form.shortDescription.trim()) {
      setValidationError('Short description (Level 1 Card) is required.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 shrink-0 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Project: ${form.title}` : 'New Engineering Project'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-cyan-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span> • Display Pos: #{form.number || 'NEXT'}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 px-6 border-b border-white/10 bg-zinc-950 shrink-0 text-xs font-mono overflow-x-auto">
          {[
            { id: 'CARD', label: '1. Card Overview' },
            { id: 'GALLERY', label: '2. 4-Slot Gallery' },
            { id: 'DETAIL', label: '3. Detail & Architecture' },
            { id: 'LINKS', label: '4. External Links & Repo' },
            { id: 'MEDIA', label: '5. Project Video' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>


        {/* Editor Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* SUBTAB 1: CARD OVERVIEW */}
          {activeSubTab === 'CARD' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">PROJECT TITLE *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Aswith AI — Voice & Desktop Automation"
                    className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">URL SLUG (Clean permalink)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. aswith-ai-automation"
                    className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">PRIMARY CATEGORY</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as typeof form.category,
                        categories: [e.target.value as typeof form.category],
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">DOMAIN / FOCUS</label>
                  <input
                    type="text"
                    value={form.domain}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    placeholder="e.g. Python Automation, Voice AI, HCI"
                    className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">YEAR / TIMEFRAME</label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="font-mono text-white/50 block">
                  CARD SUMMARY DESCRIPTION (Level 1 Card Display) *
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  rows={3}
                  placeholder="Concise 1-2 sentence engineering overview displayed on the public project card..."
                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed"
                  required
                />
              </div>

              {/* Technology Tags */}
              <div className="space-y-2">
                <label className="font-mono text-white/50 block">TECHNOLOGIES & TOOLS</label>
                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-white/[0.02] border border-white/10 rounded-lg">
                  {(form.technologies || []).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-white font-mono text-[11px]"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-white/40 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Type technology (e.g. Next.js, PyTorch) and press Enter"
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: 4-SLOT GALLERY */}
          {activeSubTab === 'GALLERY' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300">
                Configure up to 4 screenshots / architectural diagrams for this project.
                Slot 1 serves as the primary card cover; Slots 2–4 populate the detail gallery.
              </div>

              {/* Slot 1: Main Cover */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 font-medium">Slot 1: Primary Cover Image *</span>
                  {form.images?.main && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          images: { ...form.images, main: '' },
                        })
                      }
                      className="text-[10px] font-mono text-red-400 hover:text-red-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8 space-y-3">
                    <MediaImportControl
                      currentValue={form.images?.main}
                      targetType="project"
                      targetId={form.id}
                      slot="main"
                      accentColor="cyan"
                      buttonLabel="Import & Replace"
                      placeholder="Paste image URL or public Google Drive link..."
                      onSuccess={(newPath, _publicUrl, allocatedId) => {
                        setForm((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            id: prev.id || allocatedId || prev.id,
                            images: {
                              ...prev.images,
                              main: newPath,
                              gallery: prev.images?.gallery || [],
                            },
                          };
                        });
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase shrink-0">Path:</span>
                      <input
                        type="text"
                        value={form.images?.main || ''}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            images: { ...form.images, main: e.target.value },
                          })
                        }
                        placeholder="/media/projects/project1/main.webp"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-white/70"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <ImagePreview src={form.images?.main} alt="Main Cover Preview" className="w-full h-24" />
                  </div>
                </div>
              </div>

              {/* Slots 2-4: Secondary Gallery */}
              {[0, 1, 2].map((slotIdx) => {
                const galleryUrl = form.images?.gallery?.[slotIdx] || '';
                return (
                  <div key={slotIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-white/70 font-medium">
                        Slot {slotIdx + 2}: Secondary Image {slotIdx + 1}
                      </span>
                      {galleryUrl && (
                        <button
                          type="button"
                          onClick={() => handleGalleryChange(slotIdx, '')}
                          className="text-[10px] font-mono text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-8 space-y-3">
                        <MediaImportControl
                          currentValue={galleryUrl}
                          targetType="project"
                          targetId={form.id}
                          slot={String(slotIdx + 1)}
                          accentColor="cyan"
                          buttonLabel="Import & Replace"
                          placeholder="Paste screenshot URL or public Google Drive link..."
                          onSuccess={(newPath, _publicUrl, allocatedId) => {
                            if (allocatedId && !form.id) {
                              setForm((prev) => (prev ? { ...prev, id: allocatedId } : prev));
                            }
                            handleGalleryChange(slotIdx, newPath);
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-white/40 uppercase shrink-0">Path:</span>
                          <input
                            type="text"
                            value={galleryUrl}
                            onChange={(e) => handleGalleryChange(slotIdx, e.target.value)}
                            placeholder={`/media/projects/project1/screenshot${slotIdx + 1}.webp`}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-white/70"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <ImagePreview src={galleryUrl} alt={`Screenshot ${slotIdx + 1}`} className="w-full h-20" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SUBTAB 5: PROJECT VIDEO */}
          {activeSubTab === 'MEDIA' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300">
                Attach an optional video to this project. Accepted formats: MP4, WebM, MOV, M4V (max 100 MB).
                The video will be associated with this project's permanent ID folder.
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-purple-400 font-medium">Project Video</span>
                  {form.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, videoUrl: undefined })}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300"
                    >
                      Clear Video
                    </button>
                  )}
                </div>

                {/* Direct File Upload */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase">Upload from Device</span>
                  {form.id ? (
                    <MediaFileUpload
                      targetType="project"
                      targetId={form.id}
                      slot="video"
                      mediaCategory="video"
                      accentColor="purple"
                      buttonLabel="Upload Project Video"
                      onSuccess={(newPath) => {
                        setForm((prev) => prev ? { ...prev, videoUrl: newPath } : prev);
                      }}
                    />
                  ) : (
                    <p className="text-[11px] font-mono text-amber-400/70">
                      ⚠ Save the project first to assign a permanent ID before uploading video.
                    </p>
                  )}
                </div>

                {/* URL / Google Drive Import */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase">Import from URL / Google Drive</span>
                  <MediaImportControl
                    currentValue={form.videoUrl}
                    targetType="project"
                    targetId={form.id}
                    slot="video"
                    accentColor="purple"
                    buttonLabel="Import Video"
                    placeholder="Paste MP4 URL or public Google Drive video link..."
                    onSuccess={(newPath, _publicUrl, allocatedId) => {
                      setForm((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          id: prev.id || allocatedId || prev.id,
                          videoUrl: newPath,
                        };
                      });
                    }}
                  />
                </div>

                {/* Path display */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase shrink-0">Video Path:</span>
                  <input
                    type="text"
                    value={form.videoUrl || ''}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value || undefined })}
                    placeholder="/media/projects/project1/video.mp4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-white/70"
                  />
                </div>

                {/* Current video preview */}
                {form.videoUrl && (
                  <video
                    src={form.videoUrl}
                    controls
                    muted
                    className="w-full max-h-48 rounded-xl object-contain bg-black border border-white/10"
                  />
                )}
              </div>
            </div>
          )}


          {activeSubTab === 'DETAIL' && (
            <div className="space-y-6">
              {/* Full System Architecture Overview */}
              <div className="space-y-2">
                <label className="font-mono text-white/60 block font-semibold">
                  SYSTEM ARCHITECTURE OVERVIEW (Full Description)
                </label>
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  rows={6}
                  placeholder="Detailed breakdown of system architecture, pipelines, algorithms, hardware interfacing, or engineering workflows displayed in the detail modal."
                  className="w-full bg-white/5 border border-white/15 rounded-lg p-3 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed font-sans"
                />
              </div>

              {/* Key Engineering Highlights list */}
              <div className="space-y-3">
                <label className="font-mono text-white/60 block font-semibold">
                  KEY ENGINEERING HIGHLIGHTS (Bullet Points)
                </label>
                <div className="space-y-2">
                  {(form.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-xs text-white/90">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="text-white/40 hover:text-red-400 px-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="Add bullet highlight (e.g. Sub-200ms latency voice inference pipeline)"
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                  >
                    Add Highlight
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4: EXTERNAL LINKS & REPO */}
          {activeSubTab === 'LINKS' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-white/50 block">GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  value={form.githubUrl || ''}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  placeholder="https://github.com/Aswith/aswith-ai"
                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-white/50 block">LIVE DEMO / PRODUCTION DEPLOYMENT URL</label>
                <input
                  type="url"
                  value={form.liveUrl || ''}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  placeholder="https://aswithshop.netlify.app"
                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Status and Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">PROJECT STATUS</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as typeof form.status })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Active">Active / In Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Development">In Development</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-white/50 block">PUBLICATION VISIBILITY</label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                        form.isPublished !== false
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{form.isPublished !== false ? 'Published (Public)' : 'Draft (Hidden)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, featured: !form.featured })}
                      className={`px-3 py-2 rounded-lg font-mono text-xs cursor-pointer border ${
                        form.featured
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : 'bg-white/5 text-white/50 border-white/10'
                      }`}
                    >
                      {form.featured ? '★ Featured' : '☆ Not Featured'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
            <span className="font-mono text-[11px] text-white/40">
              Permanent ID: {form.id || 'Will be auto-generated'}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.25)]"
              >
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Full Certificate Editor Modal
 */
function CertificateEditorModal({
  certificate,
  isOpen,
  onSave,
  onCancel,
}: {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onSave: (cert: CertificateItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CertificateItem | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (certificate) {
      setForm(JSON.parse(JSON.stringify(certificate)));
      setValidationError(null);
    }
  }, [certificate]);

  if (!isOpen || !form) return null;

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setForm({
      ...form,
      skills: [...(form.skills || []), newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setForm({
      ...form,
      skills: (form.skills || []).filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setValidationError('Certificate title is required.');
      return;
    }
    if (!form.issuer.trim()) {
      setValidationError('Issuing organization is required.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 shrink-0 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Certificate: ${form.title}` : 'New Certificate Credential'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-emerald-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span> • Display Pos: #{form.number || 'NEXT'}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">TITLE *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Certificate Title"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">ISSUER / ORGANIZATION *</label>
              <input
                type="text"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="e.g. AWS Training / NPTEL / SoloLearn"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
                className="w-full bg-zinc-900 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              >
                {CERTIFICATE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">DATE / YEAR</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="e.g. 2026 or Jan 2026"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-white/50 block">CREDENTIAL / CERTIFICATE IMAGE</label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8 space-y-2">
                <MediaImportControl
                  currentValue={form.image}
                  targetType="certificate"
                  targetId={form.id}
                  accentColor="emerald"
                  buttonLabel="Import & Replace"
                  placeholder="Paste certificate image URL or public Google Drive link..."
                  onSuccess={(newPath, _publicUrl, allocatedId) => {
                    setForm((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        id: prev.id || allocatedId || prev.id,
                        image: newPath,
                      };
                    });
                  }}
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase shrink-0">Path:</span>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/media/certificates/certificate1/nptl.jpeg"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-white/70 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <ImagePreview src={form.image} alt={form.title} className="w-full h-20" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-white/50 block">CURRICULUM & SYLLABUS DETAILS</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Curriculum breakdown, competencies verified, evaluation metrics..."
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Competency Skills */}
          <div className="space-y-2">
            <label className="font-mono text-white/50 block">COMPETENCIES VERIFIED</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-white/[0.02] border border-white/10 rounded-lg min-h-[36px]">
              {(form.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-white font-mono text-[11px]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-white/40 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add verified skill (e.g. Embedded C)"
                className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white font-mono"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Publication and Order */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                  form.isPublished !== false
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{form.isPublished !== false ? 'Published' : 'Draft'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-white/50">Display Order:</span>
              <input
                type="number"
                min="1"
                value={form.displayOrder ?? 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                className="w-16 bg-white/5 border border-white/15 rounded p-1 text-xs font-mono text-white text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
            <span className="font-mono text-[11px] text-white/40">Permanent ID: {form.id || 'Will be auto-generated'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Certificate
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Full Skill Node Editor Modal
 */
function SkillEditorModal({
  skill,
  isOpen,
  onSave,
  onCancel,
}: {
  skill: SkillNode | null;
  isOpen: boolean;
  onSave: (skill: SkillNode) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<SkillNode | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (skill) {
      setForm(JSON.parse(JSON.stringify(skill)));
      setValidationError(null);
    }
  }, [skill]);

  if (!isOpen || !form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setValidationError('Skill name is required.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-lg bg-zinc-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90dvh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Skill: ${form.name}` : 'New Technical Skill'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-amber-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300 shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="space-y-1">
            <label className="font-mono text-white/50 block">SKILL NAME *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Python, Docker, Next.js"
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-white/50 block">MATRIX CATEGORY</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as SkillNode['category'] })}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-white/70 font-semibold">PROFICIENCY LEVEL</span>
              <span className="font-mono text-amber-400 font-bold text-sm">{form.proficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value, 10) || 50 })}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                form.isPublished !== false
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{form.isPublished !== false ? 'Published (Active Node)' : 'Draft (Hidden)'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-white/50">Display Order:</span>
              <input
                type="number"
                min="1"
                value={form.displayOrder ?? 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                className="w-16 bg-white/5 border border-white/15 rounded p-1 text-xs font-mono text-white text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-mono text-[11px] text-white/40">Permanent ID: {form.id || 'Auto'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Skill
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Full Experience Item Editor Modal
 */
function ExperienceEditorModal({
  experience,
  isOpen,
  onSave,
  onCancel,
}: {
  experience: ExperienceItem | null;
  isOpen: boolean;
  onSave: (item: ExperienceItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ExperienceItem | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [newHighlight, setNewHighlight] = useState('');

  useEffect(() => {
    if (experience) {
      setForm(JSON.parse(JSON.stringify(experience)));
      setValidationError(null);
    }
  }, [experience]);

  if (!isOpen || !form) return null;

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm({
      ...form,
      highlights: [...(form.highlights || []), newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setForm({
      ...form,
      highlights: (form.highlights || []).filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setValidationError('Role / Title is required.');
      return;
    }
    if (!form.organization.trim()) {
      setValidationError('Organization is required.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90dvh] flex flex-col bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Experience: ${form.title}` : 'New Experience / Internship'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-blue-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">ROLE / POSITION TITLE *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. IoT Engineering Intern"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">ORGANIZATION / COMPANY *</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                placeholder="e.g. Emertxe Information Technologies"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">TYPE</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ExperienceItem['type'] })}
                className="w-full bg-zinc-900 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-blue-400 focus:outline-none"
              >
                {EXPERIENCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">PERIOD / DATES</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="June 2026 – July 2026"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">LOCATION</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="India / Virtual"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-white/50 block">ROLE SUMMARY DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Engineered and tested IoT applications, telemetry dashboards..."
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <label className="font-mono text-white/50 block">ACHIEVEMENTS & RESPONSIBILITIES (Highlights)</label>
            <div className="space-y-2">
              {(form.highlights || []).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-1 text-xs text-white/90">{hl}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-white/40 hover:text-red-400 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                placeholder="Add bullet highlight and press Enter"
                className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
              >
                Add Bullet
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                form.isPublished !== false
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{form.isPublished !== false ? 'Published' : 'Draft'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-white/50">Display Order:</span>
              <input
                type="number"
                min="1"
                value={form.displayOrder ?? 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                className="w-16 bg-white/5 border border-white/15 rounded p-1 text-xs font-mono text-white text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-mono text-[11px] text-white/40">Permanent ID: {form.id || 'Auto'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-400 hover:bg-blue-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Experience
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Full Education Item Editor Modal
 */
function EducationEditorModal({
  education,
  isOpen,
  onSave,
  onCancel,
}: {
  education: EducationItem | null;
  isOpen: boolean;
  onSave: (item: EducationItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<EducationItem | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [newHighlight, setNewHighlight] = useState('');

  useEffect(() => {
    if (education) {
      setForm(JSON.parse(JSON.stringify(education)));
      setValidationError(null);
    }
  }, [education]);

  if (!isOpen || !form) return null;

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm({
      ...form,
      highlights: [...(form.highlights || []), newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setForm({
      ...form,
      highlights: (form.highlights || []).filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.degree.trim()) {
      setValidationError('Degree title is required.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90dvh] flex flex-col bg-zinc-950 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Education: ${form.degree}` : 'New Academic Qualification'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-emerald-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="space-y-1">
            <label className="font-mono text-white/50 block">DEGREE / PROGRAM *</label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              placeholder="e.g. B.Tech in Electronics and Communication Engineering"
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">INSTITUTION</label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="Undergraduate Program / University"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">CGPA / GRADE</label>
              <input
                type="text"
                value={form.cgpa}
                onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                placeholder="8.79 / 10"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">GRADUATION / PERIOD</label>
              <input
                type="text"
                value={form.expectedGraduation}
                onChange={(e) => setForm({ ...form, expectedGraduation: e.target.value })}
                placeholder="2028 (or 2024–2028)"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">FIELD OF STUDY</label>
              <input
                type="text"
                value={form.field}
                onChange={(e) => setForm({ ...form, field: e.target.value })}
                placeholder="Electronics, Communication & Computer Science Fundamentals"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <label className="font-mono text-white/50 block">ACADEMIC HIGHLIGHTS & KEY FOCUS</label>
            <div className="space-y-2">
              {(form.highlights || []).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-1 text-xs text-white/90">{hl}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-white/40 hover:text-red-400 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                placeholder="Add bullet highlight and press Enter"
                className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
              >
                Add Bullet
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                form.isPublished !== false
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{form.isPublished !== false ? 'Published' : 'Draft'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-white/50">Display Order:</span>
              <input
                type="number"
                min="1"
                value={form.displayOrder ?? 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                className="w-16 bg-white/5 border border-white/15 rounded p-1 text-xs font-mono text-white text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-mono text-[11px] text-white/40">Permanent ID: {form.id || 'Auto'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Education
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Full Achievement Item Editor Modal
 */
function AchievementEditorModal({
  achievement,
  isOpen,
  onSave,
  onCancel,
}: {
  achievement: AchievementItem | null;
  isOpen: boolean;
  onSave: (item: AchievementItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AchievementItem | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (achievement) {
      setForm(JSON.parse(JSON.stringify(achievement)));
      setValidationError(null);
    }
  }, [achievement]);

  if (!isOpen || !form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setValidationError('Achievement title is required.');
      return;
    }
    if (!form.metric.trim()) {
      setValidationError('Badge / Metric is required (e.g. 2-STAR, 300+).');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-lg max-h-[90dvh] flex flex-col bg-zinc-950 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {form.id ? `Edit Achievement: ${form.title}` : 'New Honor / Achievement'}
              </h3>
              <p className="text-xs font-mono text-white/40">
                Permanent ID: <span className="text-purple-400 font-bold">{form.id || 'AUTO_ASSIGN'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">METRIC / BADGE *</label>
              <input
                type="text"
                value={form.metric}
                onChange={(e) => setForm({ ...form, metric: e.target.value })}
                placeholder="e.g. 2-STAR, 300+, 2nd PRIZE"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-emerald-400 font-bold focus:border-purple-400 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-white/50 block">CATEGORY</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Competitive Programming / Awards"
                className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-white/50 block">TITLE *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. CodeChef 2-Star Coder"
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-purple-400 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-white/50 block">DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Summary of performance, contest rank, or project expo..."
              className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublished: form.isPublished === false ? true : false })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold cursor-pointer ${
                form.isPublished !== false
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {form.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{form.isPublished !== false ? 'Published' : 'Draft'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-white/50">Display Order:</span>
              <input
                type="number"
                min="1"
                value={form.displayOrder ?? 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                className="w-16 bg-white/5 border border-white/15 rounded p-1 text-xs font-mono text-white text-center"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-mono text-[11px] text-white/40">Permanent ID: {form.id || 'Auto'}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-400 hover:bg-purple-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Achievement
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/**
 * Main Admin Dashboard Component
 */
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('DASHBOARD');
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  // Unified Central Content Repository State
  const {
    allProjects,
    allCertificates,
    allSkills,
    allEducation,
    allExperience,
    allAchievements,
    personalInfo,
    resume,
    media,

    createProject,
    updateProject,
    deleteProject,
    reorderProjects,

    createCertificate,
    updateCertificate,
    deleteCertificate,
    reorderCertificates,

    createSkill,
    updateSkill,
    deleteSkill,
    reorderSkills,

    createEducation,
    updateEducation,
    deleteEducation,
    reorderEducation,

    createExperience,
    updateExperience,
    deleteExperience,
    reorderExperience,

    createAchievement,
    updateAchievement,
    deleteAchievement,
    reorderAchievements,

    updatePersonalInfo,
    updateResume,
    updateMedia,
    resetToDefault,
  } = usePortfolioContent();

  // Personal Info Form State
  const [personalForm, setPersonalForm] = useState<PersonalInfo>(personalInfo);
  const [newRole, setNewRole] = useState('');

  // Resume Form State
  const [resumePath, setResumePath] = useState(resume.path);

  // Media Form State
  const [mediaForm, setMediaForm] = useState(media);

  useEffect(() => {
    setPersonalForm(personalInfo);
  }, [personalInfo]);

  useEffect(() => {
    setResumePath(resume.path);
  }, [resume.path]);

  useEffect(() => {
    setMediaForm(media);
  }, [media]);

  // Modals state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingCertificate, setEditingCertificate] = useState<CertificateItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillNode | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
    type: 'Project' | 'Certificate' | 'Skill' | 'Education' | 'Experience' | 'Achievement';
  } | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/');
  };

  // ── Project Actions ────────────────────────────────────────────────────────
  const handleOpenAddProject = () => {
    const draft: ProjectItem = {
      id: '',
      slug: '',
      number: '',
      title: 'New Engineering Project',
      category: 'SOFTWARE',
      categories: ['SOFTWARE'],
      domain: 'Software Engineering • Architecture',
      shortDescription: 'Project overview summary description...',
      fullDescription: 'Comprehensive system architecture, technical workflows, and engineering highlights...',
      technologies: ['TypeScript', 'Python', 'Next.js'],
      features: ['Automated execution workflow', 'Sensor data processing telemetry'],
      images: {
        main: '/media/projects/project1/main.webp',
        gallery: [
          '/media/projects/project1/screenshot1.jpeg',
          '/media/projects/project1/screenshot2.webp',
        ],
      },
      year: new Date().getFullYear().toString(),
      status: 'Active',
      isPublished: true,
      featured: false,
    };
    setEditingProject(draft);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (proj: ProjectItem) => {
    if (!proj.id) {
      const created = createProject(proj);
      notify(`Project "${created.title}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateProject(proj.id, proj);
      notify(`Project "${updated.title}" updated successfully.`);
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleMoveProject = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allProjects.length) return;

    const copy = [...allProjects];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderProjects(copy.map((p) => p.id));
    notify('Project order updated.');
  };

  // ── Certificate Actions ───────────────────────────────────────────────────
  const handleOpenAddCertificate = () => {
    const draft: CertificateItem = {
      id: '',
      number: '',
      title: 'New Technical Certification',
      issuer: 'Certification Authority',
      category: 'Programming & Computational Logic',
      date: '2026',
      description: 'Comprehensive curriculum and practical evaluation details...',
      skills: ['Python', 'System Architecture'],
      image: '/media/certificates/certificate1/nptl.jpeg',
      isPublished: true,
    };
    setEditingCertificate(draft);
    setIsCertModalOpen(true);
  };

  const handleSaveCertificate = (cert: CertificateItem) => {
    if (!cert.id) {
      const created = createCertificate(cert);
      notify(`Certificate "${created.title}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateCertificate(cert.id, cert);
      notify(`Certificate "${updated.title}" updated.`);
    }
    setIsCertModalOpen(false);
    setEditingCertificate(null);
  };

  const handleMoveCertificate = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allCertificates.length) return;

    const copy = [...allCertificates];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderCertificates(copy.map((c) => c.id));
    notify('Certificate order updated.');
  };

  // ── Skill Actions ─────────────────────────────────────────────────────────
  const handleOpenAddSkill = () => {
    const draft: SkillNode = {
      id: '',
      name: '',
      category: 'Programming & Logic',
      proficiency: 85,
      connectedIds: [],
      isPublished: true,
    };
    setEditingSkill(draft);
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = (skill: SkillNode) => {
    if (!skill.id) {
      const created = createSkill(skill);
      notify(`Skill "${created.name}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateSkill(skill.id, skill);
      notify(`Skill "${updated.name}" updated.`);
    }
    setIsSkillModalOpen(false);
    setEditingSkill(null);
  };

  const handleMoveSkill = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allSkills.length) return;

    const copy = [...allSkills];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderSkills(copy.map((s) => s.id));
    notify('Skill order updated.');
  };

  // ── Education Actions ─────────────────────────────────────────────────────
  const handleOpenAddEducation = () => {
    const draft: EducationItem = {
      id: '',
      degree: 'New Degree / Academic Qualification',
      institution: 'Institution Name',
      field: 'Field of Study',
      period: 'Present',
      cgpa: '8.5 / 10',
      expectedGraduation: '2028',
      highlights: ['Academic achievement and coursework focus'],
      isPublished: true,
    };
    setEditingEducation(draft);
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = (item: EducationItem) => {
    if (!item.id) {
      const created = createEducation(item);
      notify(`Education "${created.degree}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateEducation(item.id, item);
      notify(`Education "${updated.degree}" updated.`);
    }
    setIsEducationModalOpen(false);
    setEditingEducation(null);
  };

  const handleMoveEducation = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allEducation.length) return;

    const copy = [...allEducation];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderEducation(copy.map((e) => e.id));
    notify('Education order updated.');
  };

  // ── Experience Actions ────────────────────────────────────────────────────
  const handleOpenAddExperience = () => {
    const draft: ExperienceItem = {
      id: '',
      title: 'New Position / Internship',
      organization: 'Organization Name',
      period: '2026',
      type: 'INTERNSHIP',
      location: 'India',
      description: 'Role overview and technical responsibilities...',
      highlights: ['Key project deliverable and performance highlight'],
      isPublished: true,
    };
    setEditingExperience(draft);
    setIsExperienceModalOpen(true);
  };

  const handleSaveExperience = (item: ExperienceItem) => {
    if (!item.id) {
      const created = createExperience(item);
      notify(`Experience "${created.title}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateExperience(item.id, item);
      notify(`Experience "${updated.title}" updated.`);
    }
    setIsExperienceModalOpen(false);
    setEditingExperience(null);
  };

  const handleMoveExperience = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allExperience.length) return;

    const copy = [...allExperience];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderExperience(copy.map((e) => e.id));
    notify('Experience order updated.');
  };

  // ── Achievement Actions ───────────────────────────────────────────────────
  const handleOpenAddAchievement = () => {
    const draft: AchievementItem = {
      id: '',
      metric: 'NEW BADGE',
      title: 'New Achievement Honor',
      category: 'Competitive Programming',
      description: 'Description of recognition, rank, contest, or evaluation...',
      isPublished: true,
    };
    setEditingAchievement(draft);
    setIsAchievementModalOpen(true);
  };

  const handleSaveAchievement = (item: AchievementItem) => {
    if (!item.id) {
      const created = createAchievement(item);
      notify(`Achievement "${created.title}" created with permanent ID ${created.id}`);
    } else {
      const updated = updateAchievement(item.id, item);
      notify(`Achievement "${updated.title}" updated.`);
    }
    setIsAchievementModalOpen(false);
    setEditingAchievement(null);
  };

  const handleMoveAchievement = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allAchievements.length) return;

    const copy = [...allAchievements];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    reorderAchievements(copy.map((a) => a.id));
    notify('Achievement order updated.');
  };

  // ── Universal Delete Confirmation ─────────────────────────────────────────
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'Project') {
      deleteProject(deleteTarget.id);
      notify(`Project "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    } else if (deleteTarget.type === 'Certificate') {
      deleteCertificate(deleteTarget.id);
      notify(`Certificate "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    } else if (deleteTarget.type === 'Skill') {
      deleteSkill(deleteTarget.id);
      notify(`Skill "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    } else if (deleteTarget.type === 'Education') {
      deleteEducation(deleteTarget.id);
      notify(`Education "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    } else if (deleteTarget.type === 'Experience') {
      deleteExperience(deleteTarget.id);
      notify(`Experience "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    } else if (deleteTarget.type === 'Achievement') {
      deleteAchievement(deleteTarget.id);
      notify(`Achievement "${deleteTarget.title}" deleted (ID ${deleteTarget.id} retired).`);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Admin Navbar */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide uppercase">
              ASWITH PORTFOLIO — CMS PORTAL
            </h1>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Authenticated Session Active • Content Engine Connected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)] px-4 py-2.5 rounded-xl bg-zinc-900 border border-cyan-500/40 text-white text-xs font-mono shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-zinc-950/40 p-3 sm:p-4 flex flex-row overflow-x-auto md:flex-col gap-1.5 md:space-y-1 shrink-0 scrollbar-none">
          {[
            { id: 'DASHBOARD', label: 'Overview', icon: LayoutDashboard },
            { id: 'PROJECTS', label: 'Projects', icon: FolderGit2, badge: allProjects.length },
            { id: 'CERTIFICATES', label: 'Certificates', icon: Award, badge: allCertificates.length },
            { id: 'SKILLS', label: 'Skills Matrix', icon: Cpu, badge: allSkills.length },
            { id: 'EXPERIENCE', label: 'Experience', icon: Briefcase, badge: allExperience.length },
            { id: 'EDUCATION', label: 'Education', icon: GraduationCap, badge: allEducation.length },
            { id: 'ACHIEVEMENTS', label: 'Achievements', icon: Trophy, badge: allAchievements.length },
            { id: 'RESUME', label: 'Resume Spec', icon: FileText },
            { id: 'PERSONAL', label: 'Personal Info', icon: User },
            { id: 'MEDIA', label: 'Media Library', icon: ImageIcon },
            { id: 'SETTINGS', label: 'Settings & Secrets', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={[
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider text-left transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full gap-3',
                  isActive
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-5xl overflow-x-hidden min-w-0">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light text-white tracking-tight">Portfolio Content Architecture</h2>
                <p className="text-xs font-mono text-white/40 mt-1">
                  Active content instances managed via central CMS repository
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Engineering Projects', count: allProjects.length, tag: 'Level 1+2 Ready', tab: 'PROJECTS' },
                  { label: 'Verified Certificates', count: allCertificates.length, tag: 'Coverflow Gallery', tab: 'CERTIFICATES' },
                  { label: 'Skills Matrix Nodes', count: allSkills.length, tag: 'Orbital System', tab: 'SKILLS' },
                  { label: 'Work Experiences', count: allExperience.length, tag: 'Timeline', tab: 'EXPERIENCE' },
                  { label: 'Education Degrees', count: allEducation.length, tag: 'Academic', tab: 'EDUCATION' },
                  { label: 'Honors & Achievements', count: allAchievements.length, tag: 'Grid Matrix', tab: 'ACHIEVEMENTS' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveTab(stat.tab as AdminTab)}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-2 hover:border-white/30 cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{stat.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-light text-white font-mono">{stat.count}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                        {stat.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-white/60">Quick Management Operations</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('PROJECTS');
                      handleOpenAddProject();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-mono font-semibold hover:bg-cyan-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('CERTIFICATES');
                      handleOpenAddCertificate();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-black text-xs font-mono font-semibold hover:bg-emerald-300 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" /> Add Certificate
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('SKILLS');
                      handleOpenAddSkill();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-mono font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" /> Add Skill
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('EXPERIENCE');
                      handleOpenAddExperience();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-400 text-black text-xs font-mono font-semibold hover:bg-blue-300 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Add Experience
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('EDUCATION');
                      handleOpenAddEducation();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Add Education
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('ACHIEVEMENTS');
                      handleOpenAddAchievement();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-400 text-black text-xs font-mono font-semibold hover:bg-purple-300 transition-colors cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Add Achievement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS (PRESERVED LEVEL 1+2 & 4-SLOT GALLERY) */}
          {activeTab === 'PROJECTS' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Engineering Projects</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage full project records: Card + 4-Slot Gallery + Detail Page Architecture
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProject}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="space-y-3">
                {allProjects.map((proj, idx) => {
                  const isPublished = proj.isPublished !== false;
                  return (
                    <div
                      key={proj.id}
                      className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <ImagePreview
                            src={proj.images?.main}
                            alt={proj.title}
                            className="w-16 h-12 shrink-0 hidden sm:block"
                          />

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono text-cyan-400 font-bold">
                                #{proj.number}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                                {proj.category}
                              </span>
                              <span className="text-[10px] font-mono text-white/40 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                                ID: {proj.id}
                              </span>
                              <span className="text-[10px] font-mono text-white/30">
                                slug: {proj.slug}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  isPublished
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}
                              >
                                {isPublished ? 'Published' : 'Draft'}
                              </span>
                              {proj.featured && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                  Featured
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-light text-white leading-snug">{proj.title}</h3>
                            <p className="text-xs text-white/50 line-clamp-1">{proj.domain}</p>
                          </div>
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleMoveProject(idx, 'UP')}
                            disabled={idx === 0}
                            aria-label="Move project up in display order"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveProject(idx, 'DOWN')}
                            disabled={idx === allProjects.length - 1}
                            aria-label="Move project down in display order"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsProjectModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit (Level 1+2)</span>
                          </button>

                          <button
                            onClick={() =>
                              setDeleteTarget({
                                id: proj.id,
                                title: proj.title,
                                type: 'Project',
                              })
                            }
                            aria-label={`Delete project ${proj.title}`}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATES (PRESERVED) */}
          {activeTab === 'CERTIFICATES' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Verified Certifications</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage credentials, verified competencies, issuing bodies, and certificates
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCertificate}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(52,211,153,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Certificate
                </button>
              </div>

              <div className="space-y-3">
                {allCertificates.map((cert, idx) => {
                  const isPublished = cert.isPublished !== false;
                  return (
                    <div
                      key={cert.id}
                      className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <ImagePreview
                            src={cert.image}
                            alt={cert.title}
                            className="w-16 h-12 shrink-0 hidden sm:block"
                          />

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono text-emerald-400 font-bold">
                                #{cert.number}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                                {cert.category}
                              </span>
                              <span className="text-[10px] font-mono text-white/40 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                                ID: {cert.id}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  isPublished
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}
                              >
                                {isPublished ? 'Published' : 'Draft'}
                              </span>
                            </div>

                            <h3 className="text-base font-light text-white leading-snug">{cert.title}</h3>
                            <p className="text-xs text-white/50">
                              {cert.issuer} • {cert.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleMoveCertificate(idx, 'UP')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveCertificate(idx, 'DOWN')}
                            disabled={idx === allCertificates.length - 1}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingCertificate(cert);
                              setIsCertModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() =>
                              setDeleteTarget({
                                id: cert.id,
                                title: cert.title,
                                type: 'Certificate',
                              })
                            }
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS (NEW FULL CRUD & REORDER) */}
          {activeTab === 'SKILLS' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Skills Matrix &amp; Technical Proficiency</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage 3D orbital network nodes, proficiency meters, and categories
                  </p>
                </div>
                <button
                  onClick={handleOpenAddSkill}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allSkills.map((skill, idx) => {
                  const isPublished = skill.isPublished !== false;
                  return (
                    <div
                      key={skill.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{skill.name}</span>
                            <span className="text-[10px] font-mono text-white/40 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                              {skill.id}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-400">{skill.proficiency}%</span>
                        </div>

                        {/* Progress meter */}
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                          <span className="uppercase">{skill.category}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded ${
                              isPublished ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveSkill(idx, 'UP')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveSkill(idx, 'DOWN')}
                            disabled={idx === allSkills.length - 1}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setIsSkillModalOpen(true);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-[11px] cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                id: skill.id,
                                title: skill.name,
                                type: 'Skill',
                              })
                            }
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE (NEW FULL CRUD & REORDER) */}
          {activeTab === 'EXPERIENCE' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Work Experience &amp; Internships</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage professional career milestones, simulation programs, and roles
                  </p>
                </div>
                <button
                  onClick={handleOpenAddExperience}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-400 hover:bg-blue-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(96,165,250,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              <div className="space-y-3">
                {allExperience.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {exp.type}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                            ID: {exp.id}
                          </span>
                          <span className="text-xs font-mono text-white/50">{exp.period}</span>
                        </div>
                        <h3 className="text-base font-medium text-white">{exp.title}</h3>
                        <p className="text-xs text-white/60 font-mono">
                          {exp.organization} • {exp.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleMoveExperience(idx, 'UP')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveExperience(idx, 'DOWN')}
                          disabled={idx === allExperience.length - 1}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingExperience(exp);
                            setIsExperienceModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: exp.id,
                              title: exp.title,
                              type: 'Experience',
                            })
                          }
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed">{exp.description}</p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 pl-3 border-l border-white/10 pt-1">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-[11px] text-white/60 list-disc">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION (NEW FULL CRUD & REORDER) */}
          {activeTab === 'EDUCATION' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Academic Qualifications &amp; Degrees</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage university degrees, coursework, CGPA ratings, and graduation years
                  </p>
                </div>
                <button
                  onClick={handleOpenAddEducation}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(52,211,153,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>

              <div className="space-y-3">
                {allEducation.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            CGPA: {edu.cgpa}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                            ID: {edu.id}
                          </span>
                          <span className="text-xs font-mono text-white/50">Graduation: {edu.expectedGraduation}</span>
                        </div>
                        <h3 className="text-base font-medium text-white">{edu.degree}</h3>
                        <p className="text-xs text-white/60 font-mono">{edu.institution} • {edu.field}</p>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleMoveEducation(idx, 'UP')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveEducation(idx, 'DOWN')}
                          disabled={idx === allEducation.length - 1}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingEducation(edu);
                            setIsEducationModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: edu.id,
                              title: edu.degree,
                              type: 'Education',
                            })
                          }
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-1 pl-3 border-l border-white/10 pt-1">
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-[11px] text-white/60 list-disc">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ACHIEVEMENTS (NEW FULL CRUD & REORDER) */}
          {activeTab === 'ACHIEVEMENTS' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-white">Honors &amp; Achievements</h2>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Manage competitive programming accolades, hackathons, and certifications
                  </p>
                </div>
                <button
                  onClick={handleOpenAddAchievement}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-400 hover:bg-purple-300 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(192,132,252,0.25)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Achievement
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allAchievements.map((ach, idx) => (
                  <div
                    key={ach.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <span className="text-base font-mono font-bold text-emerald-400">{ach.metric}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                          {ach.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-white">{ach.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">{ach.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveAchievement(idx, 'UP')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveAchievement(idx, 'DOWN')}
                          disabled={idx === allAchievements.length - 1}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingAchievement(ach);
                            setIsAchievementModalOpen(true);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-[11px] cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: ach.id,
                              title: ach.title,
                              type: 'Achievement',
                            })
                          }
                          className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: RESUME (NEW WORKING SPECIFICATION) */}
          {activeTab === 'RESUME' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-white">Resume Specification &amp; Download Mapping</h2>
                <p className="text-xs font-mono text-white/40 mt-1">
                  Manage the authoritative resume document path linked across all public CTA buttons
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-5">
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50">
                    IMPORT RESUME (DIRECT PDF URL OR GOOGLE DRIVE)
                  </label>
                  <MediaImportControl
                    currentValue={resumePath}
                    targetType="resume"
                    accentColor="cyan"
                    buttonLabel="Import & Save PDF"
                    placeholder="Paste direct PDF URL or public Google Drive PDF link..."
                    onSuccess={(newPath) => {
                      setResumePath(newPath);
                      updateResume(newPath);
                      notify('Resume PDF imported and saved successfully.');
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50">AUTHORITATIVE RESUME PATH</label>
                  <input
                    type="text"
                    value={resumePath}
                    onChange={(e) => setResumePath(e.target.value)}
                    placeholder="/media/resume.pdf"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-white/40">
                    This file is referenced by Contact, Hero, and Navigation resume download buttons.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      updateResume(resumePath);
                      notify('Resume path updated successfully.');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4" /> Save Resume Path
                  </button>

                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Preview Current PDF
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PERSONAL INFO (FULL EDIT & SAVE) */}
          {activeTab === 'PERSONAL' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-white">Personal Information &amp; Hero Details</h2>
                <p className="text-xs font-mono text-white/40 mt-1">
                  Edit core personal identity, title, bio, contact details, and social links
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-6">
                {/* Identity */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">1. Identity &amp; Titles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">FULL LEGAL NAME</label>
                      <input
                        type="text"
                        value={personalForm.fullName}
                        onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">PREFERRED / SHORT NAME</label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">HERO GREETING</label>
                      <input
                        type="text"
                        value={personalForm.greeting}
                        onChange={(e) => setPersonalForm({ ...personalForm, greeting: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">ENGINEERING TITLE</label>
                      <input
                        type="text"
                        value={personalForm.title}
                        onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Rotating Roles Tag Manager */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 block">ROTATING ENGINEERING ROLES</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-white/[0.02] border border-white/10 rounded-lg min-h-[36px]">
                    {personalForm.roles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-white font-mono text-[11px]"
                      >
                        {role}
                        <button
                          type="button"
                          onClick={() =>
                            setPersonalForm({
                              ...personalForm,
                              roles: personalForm.roles.filter((r) => r !== role),
                            })
                          }
                          className="text-white/40 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newRole.trim()) {
                            setPersonalForm({
                              ...personalForm,
                              roles: [...personalForm.roles, newRole.trim()],
                            });
                            setNewRole('');
                          }
                        }
                      }}
                      placeholder="Add role and press Enter"
                      className="flex-1 bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newRole.trim()) {
                          setPersonalForm({
                            ...personalForm,
                            roles: [...personalForm.roles, newRole.trim()],
                          });
                          setNewRole('');
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                    >
                      Add Role
                    </button>
                  </div>
                </div>

                {/* Tagline & Bio */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">2. Story &amp; Descriptions</h3>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 block">HERO TAGLINE</label>
                    <textarea
                      rows={2}
                      value={personalForm.tagline}
                      onChange={(e) => setPersonalForm({ ...personalForm, tagline: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 block">FULL PROFESSIONAL BIO</label>
                    <textarea
                      rows={4}
                      value={personalForm.description}
                      onChange={(e) => setPersonalForm({ ...personalForm, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>

                {/* Contact Endpoints & Profiles */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">3. Contact &amp; Profiles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">GMAIL ADDRESS</label>
                      <input
                        type="email"
                        value={personalForm.social.email}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, email: e.target.value },
                          })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={personalForm.social.phone}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, phone: e.target.value },
                          })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">GITHUB PROFILE URL</label>
                      <input
                        type="url"
                        value={personalForm.social.github}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, github: e.target.value },
                          })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">LINKEDIN PROFILE URL</label>
                      <input
                        type="url"
                        value={personalForm.social.linkedin}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, linkedin: e.target.value },
                          })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">CODECHEF PROFILE URL</label>
                      <input
                        type="url"
                        value={personalForm.social.codechef || ''}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, codechef: e.target.value },
                          })
                        }
                        placeholder="https://www.codechef.com/users/nagaaswith3"
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 block mb-1">LEETCODE PROFILE URL</label>
                      <input
                        type="url"
                        value={personalForm.social.leetcode || ''}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            social: { ...personalForm.social, leetcode: e.target.value },
                          })
                        }
                        placeholder="https://leetcode.com/u/nagaaswith3"
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      updatePersonalInfo(personalForm);
                      notify('Personal identity & profile information saved.');
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4" /> Save Profile Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: MEDIA (ACTIVE MEDIA MANAGER) */}
          {activeTab === 'MEDIA' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-white">Media Library &amp; Asset Mapping</h2>
                <p className="text-xs font-mono text-white/40 mt-1">
                  Manage primary portrait photography, self-intro video, and public directory paths
                </p>
              </div>

              <div className="space-y-4">
                {/* Profile Portrait */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Profile Portrait</h4>
                    <span className="text-[11px] font-mono text-cyan-400">Hero &amp; Personal Identity</span>
                  </div>
                  <MediaImportControl
                    currentValue={mediaForm.portrait}
                    targetType="profile"
                    accentColor="cyan"
                    buttonLabel="Import & Replace Portrait"
                    placeholder="Paste image URL or public Google Drive link..."
                    onSuccess={(newPath) => {
                      const updated = { ...mediaForm, portrait: newPath };
                      setMediaForm(updated);
                      updateMedia(updated);
                      notify('Profile portrait updated and saved successfully.');
                    }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
                    <div className="sm:col-span-9 space-y-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase">Storage Path</span>
                      <input
                        type="text"
                        value={mediaForm.portrait}
                        onChange={(e) => setMediaForm({ ...mediaForm, portrait: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <ImagePreview src={mediaForm.portrait} alt="Portrait" className="w-20 h-20 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Self-Intro Video */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Self-Introduction Video</h4>
                    <span className="text-[11px] font-mono text-cyan-400">About Me Modal</span>
                  </div>

                  {/* Direct File Upload */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Upload from Device</span>
                    <MediaFileUpload
                      targetType="selfintro"
                      mediaCategory="video"
                      accentColor="cyan"
                      buttonLabel="Upload Self-Intro Video"
                      onSuccess={(newPath) => {
                        const updated = { ...mediaForm, selfIntroVideo: newPath };
                        setMediaForm(updated);
                        updateMedia(updated);
                        notify('Self-introduction video uploaded and saved successfully.');
                      }}
                    />
                  </div>

                  {/* Remote URL / Google Drive Import */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Import from URL / Google Drive</span>
                    <MediaImportControl
                      currentValue={mediaForm.selfIntroVideo}
                      targetType="selfintro"
                      accentColor="cyan"
                      buttonLabel="Import & Replace Video"
                      placeholder="Paste video URL (MP4) or public Google Drive link..."
                      onSuccess={(newPath) => {
                        const updated = { ...mediaForm, selfIntroVideo: newPath };
                        setMediaForm(updated);
                        updateMedia(updated);
                        notify('Self-introduction video updated and saved successfully.');
                      }}
                    />
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Storage Path</span>
                    <input
                      type="text"
                      value={mediaForm.selfIntroVideo}
                      onChange={(e) => setMediaForm({ ...mediaForm, selfIntroVideo: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white"
                    />
                    <p className="text-[11px] font-mono text-white/40">
                      Played when visitor triggers the &ldquo;About Me&rdquo; hero action button.
                    </p>
                  </div>
                </div>

                {/* Main Intro Sequence Video */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Main Intro Sequence Video</h4>
                    <span className="text-[11px] font-mono text-purple-400">Hero Pre-loader Sequence</span>
                  </div>

                  {/* Direct File Upload */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Upload from Device</span>
                    <MediaFileUpload
                      targetType="intro"
                      mediaCategory="video"
                      accentColor="purple"
                      buttonLabel="Upload Intro Video"
                      onSuccess={(newPath) => {
                        const updated = { ...mediaForm, introVideo: newPath };
                        setMediaForm(updated);
                        updateMedia(updated);
                        notify('Main intro video uploaded and deployed successfully.');
                      }}
                    />
                  </div>

                  {/* Remote URL / Google Drive Import */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Import from URL / Google Drive</span>
                    <MediaImportControl
                      currentValue={mediaForm.introVideo || '/media/intro/intro-video.mp4'}
                      targetType="intro"
                      accentColor="purple"
                      buttonLabel="Import & Replace Intro Video"
                      placeholder="Paste intro MP4 URL or public Google Drive link..."
                      onSuccess={(newPath) => {
                        const updated = { ...mediaForm, introVideo: newPath };
                        setMediaForm(updated);
                        updateMedia(updated);
                        notify('Main intro video updated and deployed to storage successfully.');
                      }}
                    />
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Storage Path</span>
                    <input
                      type="text"
                      value={mediaForm.introVideo || '/media/intro/intro-video.mp4'}
                      onChange={(e) => setMediaForm({ ...mediaForm, introVideo: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-xs font-mono text-white"
                    />
                    <p className="text-[11px] font-mono text-white/40">
                      Authoritative intro video container stored at <code>{mediaForm.introVideo || '/media/intro/intro-video.mp4'}</code>.
                    </p>
                  </div>
                </div>

                {/* Media Directories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-white/60">Projects Media Folder</h4>
                    <p className="text-xs font-mono text-cyan-400">{mediaForm.projectsMediaDir}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-white/60">Certificates Media Folder</h4>
                    <p className="text-xs font-mono text-cyan-400">{mediaForm.certificatesMediaDir}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    updateMedia(mediaForm);
                    notify('Media asset mappings saved successfully.');
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  <Save className="w-4 h-4" /> Save Media Mappings
                </button>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'SETTINGS' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-white">Settings &amp; Secrets</h2>
                <p className="text-xs font-mono text-white/40 mt-1">
                  Server environment variables, passkeys, and content database management
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60">Configured Variables</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">ADMIN_PASSKEY</span>
                    <span className="text-emerald-400 font-bold">aswith-enter4</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">CONTACT_TO_EMAIL</span>
                    <span className="text-white/80">nagaaswith3@gmail.com</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-red-400">Content Database Reset</h4>
                  <p className="text-xs text-white/50">
                    If you ever need to discard local testing modifications and restore initial seed data across all sections:
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all portfolio content to initial seed data?')) {
                        resetToDefault();
                        notify('Portfolio content reset to initial seed values.');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-mono cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Portfolio To Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Full Project Editor Modal */}
      <ProjectEditorModal
        project={editingProject}
        isOpen={isProjectModalOpen}
        onSave={handleSaveProject}
        onCancel={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
      />

      {/* Full Certificate Editor Modal */}
      <CertificateEditorModal
        certificate={editingCertificate}
        isOpen={isCertModalOpen}
        onSave={handleSaveCertificate}
        onCancel={() => {
          setIsCertModalOpen(false);
          setEditingCertificate(null);
        }}
      />

      {/* Full Skill Editor Modal */}
      <SkillEditorModal
        skill={editingSkill}
        isOpen={isSkillModalOpen}
        onSave={handleSaveSkill}
        onCancel={() => {
          setIsSkillModalOpen(false);
          setEditingSkill(null);
        }}
      />

      {/* Full Education Editor Modal */}
      <EducationEditorModal
        education={editingEducation}
        isOpen={isEducationModalOpen}
        onSave={handleSaveEducation}
        onCancel={() => {
          setIsEducationModalOpen(false);
          setEditingEducation(null);
        }}
      />

      {/* Full Experience Editor Modal */}
      <ExperienceEditorModal
        experience={editingExperience}
        isOpen={isExperienceModalOpen}
        onSave={handleSaveExperience}
        onCancel={() => {
          setIsExperienceModalOpen(false);
          setEditingExperience(null);
        }}
      />

      {/* Full Achievement Editor Modal */}
      <AchievementEditorModal
        achievement={editingAchievement}
        isOpen={isAchievementModalOpen}
        onSave={handleSaveAchievement}
        onCancel={() => {
          setIsAchievementModalOpen(false);
          setEditingAchievement(null);
        }}
      />

      {/* Universal Delete Safety Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={deleteTarget?.title || ''}
        itemId={deleteTarget?.id || ''}
        itemType={deleteTarget?.type || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
