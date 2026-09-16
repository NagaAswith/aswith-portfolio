'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, X, KeyRound, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
}

export function AdminAuthModal({ isOpen, onClose, onAuthenticated }: AdminAuthModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'AUTHENTICATING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleClose = () => {
    setPassword('');
    setShowPassword(false);
    setStatus('IDLE');
    setErrorMessage('');
    onClose();
  };

  // Prefetch admin route when modal opens so bundle and RSC payload are primed
  React.useEffect(() => {
    if (isOpen) {
      router.prefetch('/admin');
    }
  }, [isOpen, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setStatus('AUTHENTICATING');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: password }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('SUCCESS');
        // Initiate navigation immediately without blocking on delay
        if (onAuthenticated) {
          setTimeout(() => {
            handleClose();
            onAuthenticated();
          }, 300);
        } else {
          router.push('/admin');
          setTimeout(() => {
            handleClose();
          }, 300);
        }
      } else {
        setStatus('ERROR');
        setErrorMessage(data.error || 'Invalid credentials. Please verify your admin passkey.');
      }
    } catch {
      setStatus('ERROR');
      setErrorMessage('Network error during authentication. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-zinc-950 border border-white/20 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6 text-white max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Admin Authentication</h3>
                  <p className="text-xs font-mono text-white/40">Secret CMS Access Gateway</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Close admin modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Secret Trigger Notification */}
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
              <span className="flex items-center gap-2 text-xs font-mono text-purple-300 font-medium">
                <KeyRound className="w-4 h-4" /> Secret Command Recognized
              </span>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Enter your administrative passkey to initiate a secure, verified HTTP-only server session.
              </p>
            </div>

            {/* Form */}
            {status === 'SUCCESS' ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                <h4 className="text-base font-light text-white">Authentication Verified</h4>
                <p className="text-xs font-mono text-white/50">Redirecting to Admin Portal...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Admin Passkey
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin passkey..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-11 py-3 text-sm font-mono text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide admin passkey' : 'Show admin passkey'}
                      title={showPassword ? 'Hide admin passkey' : 'Show admin passkey'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-white/40 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs font-mono text-red-400 bg-red-950/30 border border-red-500/20 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'AUTHENTICATING' || !password.trim()}
                  className="w-full py-3 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'AUTHENTICATING' ? (
                    <span>Verifying Session...</span>
                  ) : (
                    <>
                      <span>Authenticate &amp; Open Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
