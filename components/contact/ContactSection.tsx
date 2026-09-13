'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, FileText, ArrowUpRight, Send, CheckCircle, AlertCircle, MessageSquare, Globe, Code2 } from 'lucide-react';
import { MovingGradientButton } from '@/components/ui/MovingGradientButton';
import { usePortfolioContent } from '@/store/usePortfolioContent';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  _hp?: string; // Honeypot field for spam prevention
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  _hp?: string;
  _form?: string[];
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function validateClient(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (fields.phone && !/^[+]?[\d\s\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export function ContactSection() {
  const personal = usePortfolioContent((state) => state.personalInfo);
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', message: '', _hp: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    // Honeypot check on client
    if (form._hp) {
      setStatus('error');
      setErrors({ _form: ['Spam submission detected.'] });
      return;
    }

    const clientErrors = validateClient(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you. Your message has been delivered successfully.');
        setWhatsappLink(data.whatsappLink || null);
        setForm({ name: '', email: '', phone: '', message: '', _hp: '' });
      } else {
        setErrors(data.errors || { _form: [data.error || 'Failed to deliver message.'] });
        setStatus('error');
      }
    } catch {
      setStatus('error');
      setErrors({ _form: ['Network error. Please try again or reach out directly via email.'] });
    }
  };

  const inputClass = (fieldError?: string) =>
    [
      'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/25',
      'focus:outline-none focus:ring-1 transition-all',
      fieldError
        ? 'border-red-500/50 focus:border-red-400 focus:ring-red-400/20'
        : 'border-white/10 focus:border-white/30 focus:ring-white/10',
    ].join(' ');

  return (
    <footer
      id="contact"
      className="relative z-20 bg-black border-t border-white/10 text-white pt-20 pb-12 px-6 sm:px-12 mt-28"
      aria-label="Contact & Footer Information"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Contact Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-white/10 pb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-extralight tracking-tight leading-tight uppercase">
              LET&apos;S BUILD SOMETHING USEFUL.
            </h2>
            <p className="text-base sm:text-lg text-white/50 font-light max-w-xl">
              Open for software engineering opportunities, AI automation platforms, and embedded IoT hardware-software systems.
            </p>
          </div>

          {/* Vertical Order: GMAIL -> PHONE NUMBER -> RESUME */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between h-full gap-4">
            {/* 1. GMAIL */}
            <div className="w-full lg:w-auto">
              <MovingGradientButton
                variant="primary"
                onClick={() => {
                  window.location.href = `mailto:${personal.social.email}`;
                }}
                ariaLabel="Send email to Ranga Naga Aswith"
                className="w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="normal-case">{personal.social.email}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </MovingGradientButton>
            </div>

            {/* 2. PHONE NUMBER */}
            <a
              href={`tel:${personal.social.phone}`}
              aria-label="Phone Contact: +91 8328671677"
              className="w-full sm:w-auto group inline-flex items-center justify-center lg:justify-start gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+91 {personal.social.phone}</span>
            </a>

            {/* 3. RESUME */}
            <a
              href={personal.social.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume PDF"
              className="w-full sm:w-auto group inline-flex items-center justify-center lg:justify-start gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <FileText className="w-4 h-4 text-purple-400 shrink-0" />
              <span>VIEW RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile of Ranga Naga Aswith"
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile of Ranga Naga Aswith"
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-light text-white tracking-tight">Send a Direct Message</h3>
            </div>
            <p className="text-sm font-light text-white/40 leading-relaxed">
              Have a project inquiry, software engineering role, or technical collaboration? Submit your details below to reach Aswith directly.
            </p>
            <div className="pt-4 space-y-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Responses typically within 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Direct email dispatch configured</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 space-y-4 rounded-2xl border border-emerald-400/25 bg-emerald-950/20 backdrop-blur-xl"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                  <div>
                    <h4 className="text-white text-lg font-light">MESSAGE SENT</h4>
                    <p className="text-white/60 text-xs mt-1.5 font-mono max-w-sm">
                      {statusMessage || 'Thank you. Your message has been delivered successfully.'}
                    </p>
                  </div>
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-mono hover:bg-green-500/25 transition-all mt-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Also connect on WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => { setStatus('idle'); setWhatsappLink(null); }}
                    className="text-xs font-mono text-white/40 hover:text-white transition-colors mt-2 cursor-pointer"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                  aria-label="Contact form"
                >
                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="_hp"
                    value={form._hp}
                    onChange={handleChange('_hp')}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Global form error */}
                  {errors._form && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors._form[0]}</span>
                    </div>
                  )}

                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        placeholder="Your name"
                        className={inputClass(errors.name)}
                        autoComplete="name"
                        required
                      />
                      {errors.name && (
                        <p className="text-[11px] font-mono text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="your@email.com"
                        className={inputClass(errors.email)}
                        autoComplete="email"
                        required
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-mono text-white/40 uppercase tracking-widest">
                      Phone <span className="text-white/25">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass(errors.phone)}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="text-[11px] font-mono text-red-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-white/40 uppercase tracking-widest">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={handleChange('message')}
                      placeholder="Your message... (min 10 characters)"
                      rows={5}
                      className={`${inputClass(errors.message)} resize-none`}
                      required
                    />
                    <div className="flex items-center justify-between">
                      {errors.message ? (
                        <p className="text-[11px] font-mono text-red-400">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[11px] font-mono text-white/25">
                        {form.message.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    {status === 'error' && !errors._form && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-red-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Please fix the marked fields above.</span>
                      </div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/40 pt-4 border-t border-white/5">
          <span className="tracking-wider uppercase">ASWITH PORTFOLIO • {personal.fullName}</span>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
