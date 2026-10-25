'use client';

import React, { useRef, useState, useId } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, X, RefreshCw, FileText, Music, Video, Image as ImageIcon } from 'lucide-react';
import { processImageForUpload, processVideoForUpload, VideoCompressionProgress } from '@/lib/media/clientMediaProcessor';

export type MediaCategory = 'image' | 'video' | 'document' | 'audio';
export type MediaFileUploadType =
  | 'certificate'
  | 'project'
  | 'profile'
  | 'intro'
  | 'selfintro'
  | 'mobileintro'
  | 'background'
  | 'resume'
  | 'music';

type UploadState = 'IDLE' | 'PROCESSING' | 'UPLOADING' | 'SUCCESS' | 'ERROR';

const ACCEPT_MAP: Record<MediaCategory, string> = {
  image: 'image/*,.jpg,.jpeg,.png,.webp,.avif,.bmp,.tiff,.svg',
  video: 'video/*,.mp4,.webm,.mov,.m4v,.avi,.mkv',
  document: '.pdf,.docx,.doc,.odt,.rtf,.txt,application/pdf',
  audio: 'audio/*,.mp3,.mpeg,.wav,.ogg,.m4a',
};

const MAX_DISPLAY_MB: Record<MediaCategory, number> = {
  image: 15,
  video: 50, // 50 MB Free Supabase plan upload ceiling
  document: 25,
  audio: 25,
};

interface MediaFileUploadProps {
  targetType: MediaFileUploadType;
  targetId?: string;
  slot?: string;
  mediaCategory?: MediaCategory;
  accentColor?: 'cyan' | 'emerald' | 'purple' | 'orange';
  buttonLabel?: string;
  onSuccess?: (storedPath: string, publicUrl: string, allocatedId?: string) => void;
  onDiscard?: () => void;
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

export function MediaFileUpload({
  targetType,
  targetId = '',
  slot = '',
  mediaCategory = 'image',
  accentColor = 'cyan',
  buttonLabel,
  onSuccess,
  onDiscard,
  disabled = false,
}: MediaFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>('IDLE');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successPath, setSuccessPath] = useState<string>('');

  const accent = ACCENT_CLASSES[accentColor] || ACCENT_CLASSES.cyan;
  const acceptAttr = ACCEPT_MAP[mediaCategory] || ACCEPT_MAP.image;
  const maxMb = MAX_DISPLAY_MB[mediaCategory] || 50;

  const defaultLabel =
    mediaCategory === 'video'
      ? `Upload ${targetType === 'intro' ? 'Intro' : targetType === 'mobileintro' ? 'Mobile Intro' : targetType === 'background' ? 'Background' : 'Project'} Video`
      : mediaCategory === 'document'
      ? 'Upload Resume Document'
      : mediaCategory === 'audio'
      ? 'Upload Background Music'
      : 'Upload Image File';

  const label = buttonLabel || defaultLabel;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0] || null;
    if (!rawFile) return;

    setSelectedFile(rawFile);
    setProcessedFile(rawFile);
    setUploadState('IDLE');
    setErrorMessage('');
    setSuccessPath('');
    setProcessingStatus('');

    // Pre-processing
    if (mediaCategory === 'image') {
      try {
        setUploadState('PROCESSING');
        setProcessingStatus('Standardizing image to high-quality JPEG...');
        const result = await processImageForUpload(rawFile);
        setProcessedFile(result.file);
        setUploadState('IDLE');
        setProcessingStatus(
          result.converted
            ? `Standardized: ${(result.originalSize / (1024 * 1024)).toFixed(1)} MB → ${(result.processedSize / (1024 * 1024)).toFixed(1)} MB`
            : ''
        );
      } catch {
        setUploadState('IDLE');
      }
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setProcessedFile(null);
    setUploadState('IDLE');
    setErrorMessage('');
    setSuccessPath('');
    setProcessingStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onDiscard) onDiscard();
  };

  const handleUpload = async () => {
    let fileToUpload = processedFile || selectedFile;
    if (!fileToUpload) return;

    // Check if large video needs compression before sending to storage
    if (mediaCategory === 'video' && fileToUpload.size > 48 * 1024 * 1024) {
      try {
        setUploadState('PROCESSING');
        const compressed = await processVideoForUpload(fileToUpload, (prog: VideoCompressionProgress) => {
          setProcessingStatus(prog.message);
        });
        fileToUpload = compressed.file;
        setProcessedFile(fileToUpload);
      } catch (compErr: any) {
        console.warn('Video compression notice:', compErr);
      }
    }

    setUploadState('UPLOADING');
    setErrorMessage('');
    setProcessingStatus('Authorizing storage upload...');

    try {
      // Step 1: Request upload signature from server endpoint
      const signRes = await fetch('/api/admin/upload/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileToUpload.name,
          fileSize: fileToUpload.size,
          type: targetType,
          mediaCategory,
          targetId,
          slot,
        }),
        credentials: 'include',
      });

      const isSignJson = signRes.headers.get('content-type')?.includes('application/json');
      let signData: any = null;
      if (isSignJson) {
        signData = await signRes.json();
      } else {
        const textErr = await signRes.text();
        throw new Error(
          signRes.status === 413
            ? `File exceeds server limit (${(fileToUpload.size / (1024 * 1024)).toFixed(1)} MB). Max limit is ${maxMb} MB.`
            : `Upload authorization failed (HTTP ${signRes.status}): ${textErr.slice(0, 100)}`
        );
      }

      if (!signRes.ok || !signData.success) {
        throw new Error(signData.error || `Upload authorization failed (HTTP ${signRes.status})`);
      }

      let finalRawPath = '';
      let finalPublicUrl = '';

      if (!signData.useDirectApi && signData.signedUrl) {
        // Step 2A: Direct upload to Supabase Storage via signed URL (bypasses Vercel 4.5 MB proxy limit)
        setProcessingStatus('Uploading directly to cloud storage CDN...');
        const directRes = await fetch(signData.signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': fileToUpload.type || 'application/octet-stream',
          },
          body: fileToUpload,
        });

        if (!directRes.ok) {
          const directErr = await directRes.text();
          throw new Error(`Direct cloud storage upload failed (HTTP ${directRes.status}): ${directErr.slice(0, 100)}`);
        }

        finalRawPath = signData.rawPath;
        finalPublicUrl = signData.publicUrl;
      } else {
        // Step 2B: Local Dev / Direct API fallback
        setProcessingStatus('Uploading to local storage endpoint...');
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('type', targetType);
        formData.append('mediaCategory', mediaCategory);
        if (targetId) formData.append('targetId', targetId);
        if (slot) formData.append('slot', slot);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        const isUploadJson = uploadRes.headers.get('content-type')?.includes('application/json');
        let uploadData: any = null;
        if (isUploadJson) {
          uploadData = await uploadRes.json();
        } else {
          const text = await uploadRes.text();
          if (uploadRes.status === 413) {
            throw new Error(`Payload too large (${(fileToUpload.size / (1024 * 1024)).toFixed(1)} MB). Server returned HTTP 413.`);
          }
          throw new Error(`Upload returned non-JSON response (HTTP ${uploadRes.status}): ${text.slice(0, 100)}`);
        }

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || `Upload failed (HTTP ${uploadRes.status})`);
        }

        finalRawPath = uploadData.rawPath || uploadData.url || '';
        finalPublicUrl = uploadData.url || '';
      }

      setUploadState('SUCCESS');
      setProcessingStatus('');
      setSuccessPath(finalRawPath);

      if (onSuccess) {
        onSuccess(finalRawPath, finalPublicUrl, targetId);
      }
    } catch (err: unknown) {
      setUploadState('ERROR');
      setProcessingStatus('');
      setErrorMessage((err as Error)?.message || 'Network error during upload. Please try again.');
    }
  };

  const isUploading = uploadState === 'UPLOADING';
  const isProcessing = uploadState === 'PROCESSING';

  const CategoryIcon =
    mediaCategory === 'video'
      ? Video
      : mediaCategory === 'document'
      ? FileText
      : mediaCategory === 'audio'
      ? Music
      : ImageIcon;

  const reactId = useId();
  const inputId = `media-upload-${targetType}-${slot || 'default'}-${reactId.replace(/:/g, '')}`;

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
          id={inputId}
          disabled={disabled || isUploading || isProcessing}
        />
        <label
          htmlFor={inputId}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono',
            'cursor-pointer transition-colors select-none',
            disabled || isUploading || isProcessing
              ? 'opacity-40 pointer-events-none'
              : accent.btn,
          ].join(' ')}
        >
          <CategoryIcon className="w-3.5 h-3.5" />
          {selectedFile ? 'Change File' : 'Choose Local File'}
        </label>

        {selectedFile && (
          <>
            <span
              className="text-[11px] font-mono text-white/70 truncate max-w-[200px]"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </span>
            <span className="text-[10px] font-mono text-white/40">
              ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
            </span>
            <button
              onClick={handleClear}
              disabled={isUploading || isProcessing}
              className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Processing status */}
      {processingStatus && (
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
          {isProcessing && <RefreshCw className="w-3 h-3 animate-spin" />}
          <span>{processingStatus}</span>
        </div>
      )}

      {/* Upload button — only shows when file is selected and not yet uploaded */}
      {selectedFile && uploadState !== 'SUCCESS' && (
        <button
          onClick={handleUpload}
          disabled={disabled || isUploading || isProcessing}
          className={[
            'flex items-center gap-1.5 px-4 py-2 rounded-xl border text-[11px] font-mono font-semibold',
            'transition-colors cursor-pointer',
            disabled || isUploading || isProcessing
              ? 'opacity-40 pointer-events-none bg-white/5 border-white/10 text-white/40'
              : `${accent.btn}`,
          ].join(' ')}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading to Storage...</span>
            </>
          ) : isProcessing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Processing Media...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>{label}</span>
            </>
          )}
        </button>
      )}

      {/* Success state */}
      {uploadState === 'SUCCESS' && (
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 overflow-hidden">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-mono text-emerald-400">
              Uploaded as draft. Click Save to persist change.
            </span>
            {successPath && (
              <span className="text-[10px] font-mono text-white/40 truncate max-w-[220px]" title={successPath}>
                → {successPath}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] font-mono text-white/40 hover:text-red-400 transition-colors px-2 py-0.5 rounded border border-white/10 hover:border-red-500/30 shrink-0"
            title="Discard this draft and choose another file"
          >
            Discard
          </button>
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
          ? `Supported: MP4, MOV, WebM, M4V, AVI · Target: < 50 MB (auto-compressed if large)`
          : mediaCategory === 'document'
          ? `Supported: PDF, DOCX, DOC, ODT, RTF, TXT · Max ${maxMb} MB`
          : mediaCategory === 'audio'
          ? `Supported: MP3, MPEG, WAV, OGG, M4A · Max ${maxMb} MB`
          : `Supported: JPG, PNG, WebP, AVIF, BMP, TIFF, SVG · Standardized to JPEG · Max ${maxMb} MB`}
      </p>
    </div>
  );
}
