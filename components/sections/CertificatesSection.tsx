'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import { portfolioData, CertificateItem } from '@/data/portfolioData';
import { SpatialCard } from '@/components/ui/SpatialCard';

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section
      id="certificates"
      className="relative z-20 min-h-screen py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
      aria-label="Certificates & Verified Credentials"
    >
      {/* Section Header */}
      <div className="space-y-3 mb-16 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block">
          04 / CREDENTIALS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white">
          Certificates & Specializations
        </h2>
      </div>

      {/* Editorial Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.certificates.map((cert, idx) => (
          <SpatialCard
            key={cert.id}
            depth="md"
            delay={idx * 0.1}
            onClick={() => setSelectedCert(cert)}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                  {cert.date}
                </span>
              </div>

              <h3 className="text-lg font-light text-white leading-snug group-hover:text-white/90">
                {cert.title}
              </h3>

              <div className="text-xs font-mono space-y-1">
                <p className="text-white/50">{cert.issuer}</p>
                <p className="text-white/30 uppercase tracking-wider">{cert.domain}</p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white transition-colors">
              <span>View Credential</span>
              <span>→</span>
            </div>
          </SpatialCard>
        ))}
      </div>

      {/* Certificate Expansion Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                    VERIFIED CREDENTIAL
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-light text-white">{selectedCert.title}</h3>
                <p className="text-sm font-mono text-white/50 mt-2">{selectedCert.issuer}</p>
                <p className="text-xs font-mono text-white/30 mt-1 uppercase tracking-wider">
                  Domain: {selectedCert.domain} • Year: {selectedCert.date}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <a
                  href={selectedCert.credentialUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-mono uppercase tracking-wider font-medium hover:bg-zinc-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Certificate
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
