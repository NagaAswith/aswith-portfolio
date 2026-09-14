'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2, AlertTriangle, Loader2, Link2 } from 'lucide-react';

interface MediaImportControlProps {
  currentValue?: string;
  targetType: 'project' | 'certificate' | 'profile' | 'intro' | 'selfintro' | 'resume';
  targetId?: string;
  slot?: string;
  onSuccess: (newPath: string, publicUrl: string, targetId?: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  accentColor?: 'cyan' | 'emerald' | 'purple' | 'amber';
}

export function MediaImportControl({
  currentValue = '',
  targetType,
  targetId,
  slot,
  onSuccess,
  placeholder = 'Paste direct file URL or public Google Drive link...',
  buttonLabel = 'Import & Replace',
  accentColor = 'cyan',
}: MediaImportControlProps) {
  const [urlInput, setUrlInput] = useState('');
  const [status, setStatus] = useState<
    'IDLE' | 'DOWNLOADING' | 'VALIDATING' | 'UPLOADING' | 'UPDATING' | 'SUCCESS' | 'ERROR'
  >('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const colorStyles = {
    cyan: {
      btn: 'bg-cyan-500 hover:bg-cyan-400 text-black',
      border: 'focus:border-cyan-400',
      tag: 'text-cyan-400',
    },
    emerald: {
      btn: 'bg-emerald-500 hover:bg-emerald-400 text-black',
      border: 'focus:border-emerald-400',
      tag: 'text-emerald-400',
    },
    purple: {
      btn: 'bg-purple-500 hover:bg-purple-400 text-white',
      border: 'focus:border-purple-400',
      tag: 'text-purple-400',
    },
    amber: {
      btn: 'bg-amber-500 hover:bg-amber-400 text-black',
      border: 'focus:border-amber-400',
      tag: 'text-amber-400',
    },
  }[accentColor];

  const handleImport = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a valid URL or Google Drive link.');
      setStatus('ERROR');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setStatus('DOWNLOADING');

    // Smooth status progression feedback
    const progressTimer = setTimeout(() => {
      setStatus('VALIDATING');
    }, 700);
    const progressTimer2 = setTimeout(() => {
      setStatus('UPLOADING');
    }, 1500);
    const progressTimer3 = setTimeout(() => {
      setStatus('UPDATING');
    }, 2400);

    try {
      const res = await fetch('/api/admin/media/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: trimmed,
          targetType,
          targetId,
          slot,
        }),
      });

      clearTimeout(progressTimer);
      clearTimeout(progressTimer2);
      clearTimeout(progressTimer3);

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to import media.');
      }

      setStatus('SUCCESS');
      setSuccessMessage('✓ Media updated successfully');
      setUrlInput('');
      onSuccess(data.mediaPath, data.publicUrl, data.targetId);

      setTimeout(() => {
        setStatus('IDLE');
        setSuccessMessage('');
      }, 4000);
    } catch (err: any) {
      clearTimeout(progressTimer);
      clearTimeout(progressTimer2);
      clearTimeout(progressTimer3);

      setStatus('ERROR');
      setErrorMessage(err?.message || 'Unable to import media from remote URL.');
    }
  };

  const isWorking =
    status === 'DOWNLOADING' ||
    status === 'VALIDATING' ||
    status === 'UPLOADING' ||
    status === 'UPDATING';

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <Link2 className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              if (status === 'ERROR') setStatus('IDLE');
            }}
            placeholder={placeholder}
            disabled={isWorking}
            className={`w-full bg-white/5 border border-white/15 rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none ${colorStyles.border} disabled:opacity-50`}
          />
        </div>

        <button
          type="button"
          onClick={handleImport}
          disabled={isWorking || !urlInput.trim()}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 ${colorStyles.btn}`}
        >
          {isWorking ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>
                {status === 'DOWNLOADING' && 'Downloading...'}
                {status === 'VALIDATING' && 'Validating...'}
                {status === 'UPLOADING' && 'Uploading...'}
                {status === 'UPDATING' && 'Updating...'}
              </span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>{buttonLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Progress & Error / Success Indicators */}
      {status === 'SUCCESS' && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {status === 'ERROR' && (
        <div className="flex items-start gap-2 text-[11px] font-mono text-red-400 bg-red-950/30 border border-red-500/20 p-2 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">✕ Unable to import media:</span>
            <p className="text-white/80 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
