'use client';

import React, { useRef, useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';

export type MediaCategory = 'image' | 'video';
export type MediaFileUploadType = 'certificate' | 'project' | 'profile' | 'intro' | 'selfintro';

type UploadState = 'IDLE' | 'UPLOADING' | 'SUCCESS' | 'ERROR';

const ACCEPT_MAP: Record<MediaCategory, string> = {
  image: '.jpg,.jpeg,.png,.webp,.avif,.svg',
  video: '.mp4,.webm,.mov,.m4v',
};

const MAX_DISPLAY_MB: Record<MediaCategory, number> = {
  image: 10,
  video: 100,
};

interface MediaFileUploadProps {
  targetType: MediaFileUploadType;
  targetId?: string;
  slot?: string;
  mediaCategory?: MediaCategory;
  accentColor?: 'cyan' | 'emerald' | 'purple' | 'orange';
  buttonLabel?: string;
  onSuccess?: (storedPath: string, publicUrl: string, allocatedId?: string) => void;
  disabled?: boolean;
}

const ACCENT_CLASSES: Record<string, { btn: string; ring: string; text: string }> = {
  cyan: {
    btn: 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/30 text-cyan-400',
    ring: 'ring-cyan-500/40',
    text: 'text-cyan-400',
  },
  emerald: {
    btn: 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-400',
    ring: 'ring-emerald-500/40',
    text: 'text-emerald-400',
  },
  purple: {
    btn: 'bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/30 text-purple-400',
    ring: 'ring-purple-500/40',
    text: 'text-purple-400',
  },
  orange: {
    btn: 'bg-orange-500/15 hover:bg-orange-500/25 border-orange-500/30 text-orange-400',
    ring: 'ring-orange-500/40',
    text: 'text-orange-400',
  },
};

/**
 * MediaFileUpload
 *
 * A secure, admin-only direct file upload component.
 * Accepts image or video files and uploads them to the server
 * via POST /api/admin/upload (multipart/form-data).
 *
 * Security:
 * - No client-side magic byte inspection (server handles validation)
 * - File size is checked server-side against env limits
 * - targetId is required for project/certificate types
 * - All uploads require valid admin session cookie
 */
export function MediaFileUpload({
  targetType,
  targetId = '',
  slot = '',
  mediaCategory = 'image',
  accentColor = 'cyan',
  buttonLabel,
  onSuccess,
  disabled = false,
}: MediaFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>('IDLE');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successPath, setSuccessPath] = useState<string>('');

  const accent = ACCENT_CLASSES[accentColor] || ACCENT_CLASSES.cyan;
  const acceptAttr = ACCEPT_MAP[mediaCategory];
  const maxMb = MAX_DISPLAY_MB[mediaCategory];
  const defaultLabel = mediaCategory === 'video'
    ? `Upload ${targetType === 'intro' ? 'Intro' : targetType === 'selfintro' ? 'Self-Intro' : 'Project'} Video`
    : 'Upload File';
  const label = buttonLabel || defaultLabel;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setSelectedFile(f);
    setUploadState('IDLE');
    setErrorMessage('');
    setSuccessPath('');
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadState('IDLE');
    setErrorMessage('');
    setSuccessPath('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadState('UPLOADING');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', targetType);
      formData.append('mediaCategory', mediaCategory);
      if (targetId) formData.append('targetId', targetId);
      if (slot) formData.append('slot', slot);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const msg = data.error || `Upload failed (HTTP ${res.status}).`;
        setUploadState('ERROR');
        setErrorMessage(msg);
        return;
      }

      setUploadState('SUCCESS');
      setSuccessPath(data.rawPath || data.url || '');

      if (onSuccess) {
        onSuccess(data.rawPath || data.url || '', data.url || '', undefined);
      }
    } catch (err: unknown) {
      setUploadState('ERROR');
      setErrorMessage((err as Error)?.message || 'Network error during upload. Please try again.');
    }
  };

  const isUploading = uploadState === 'UPLOADING';

  return (
    <div className="space-y-2">
      {/* File picker row */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          onChange={handleFileChange}
          className="hidden"
          id={`media-file-upload-${targetType}-${slot || 'default'}`}
          disabled={disabled || isUploading}
        />
        <label
          htmlFor={`media-file-upload-${targetType}-${slot || 'default'}`}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono',
            'cursor-pointer transition-colors select-none',
            disabled || isUploading
              ? 'opacity-40 pointer-events-none'
              : accent.btn,
          ].join(' ')}
        >
          <Upload className="w-3.5 h-3.5" />
          {selectedFile ? 'Change File' : 'Choose File'}
        </label>

        {selectedFile && (
          <>
            <span className="text-[11px] font-mono text-white/60 truncate max-w-[180px]" title={selectedFile.name}>
              {selectedFile.name}
            </span>
            <span className="text-[10px] font-mono text-white/40">
              ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
            </span>
            <button
              onClick={handleClear}
              disabled={isUploading}
              className="text-white/30 hover:text-white/60 transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Upload button — only shows when file is selected */}
      {selectedFile && uploadState !== 'SUCCESS' && (
        <button
          onClick={handleUpload}
          disabled={disabled || isUploading}
          className={[
            'flex items-center gap-1.5 px-4 py-2 rounded-xl border text-[11px] font-mono font-semibold',
            'transition-colors cursor-pointer',
            disabled || isUploading
              ? 'opacity-40 pointer-events-none bg-white/5 border-white/10 text-white/40'
              : `${accent.btn}`,
          ].join(' ')}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              {label}
            </>
          )}
        </button>
      )}

      {/* Success state */}
      {uploadState === 'SUCCESS' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-mono text-emerald-400">Uploaded successfully.</span>
          {successPath && (
            <span className="text-[10px] font-mono text-white/40 truncate" title={successPath}>
              → {successPath}
            </span>
          )}
        </div>
      )}

      {/* Error state */}
      {uploadState === 'ERROR' && errorMessage && (
        <div className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
          <span className="text-[11px] font-mono text-red-400">{errorMessage}</span>
        </div>
      )}

      {/* Helper text */}
      <p className="text-[10px] font-mono text-white/30">
        {mediaCategory === 'video'
          ? `Accepted: MP4, WebM, MOV, M4V · Max ${maxMb} MB`
          : `Accepted: JPG, PNG, WebP, AVIF, SVG · Max ${maxMb} MB`}
      </p>
    </div>
  );
}
