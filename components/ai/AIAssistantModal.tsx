'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, Navigation } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  hasAction?: boolean;
}

interface ChatAPIResponse {
  reply: string;
  action?: 'navigate' | 'openContact';
  target?: string;
}

const suggestedPrompts = [
  "What projects has he built?",
  "Does he have an AI project?",
  "What certificates does he have?",
  "Show me his skills",
  "Does he have internship experience?",
  "Connect with him",
];

let idCounter = 0;
function createUniqueId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Smooth scroll to a section by ID, with a small offset for the navbar.
 */
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const offset = 80; // navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I'm Aswith's AI Assistant. Ask me about his projects, skills, certificates, internship experience, or type "connect with him" to open the contact form!`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = useCallback(async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query || loading) return;

    const userMsg: Message = { id: createUniqueId('user'), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });
      const data: ChatAPIResponse = await res.json();
      const replyText = data.reply || 'I can answer questions about Aswith\'s projects, skills, and experience.';

      // Handle navigation / contact actions
      if (data.action === 'navigate' && data.target) {
        // Small delay so user reads the reply first
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => scrollToSection(data.target!), 200);
        }, 800);
      } else if (data.action === 'openContact') {
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => scrollToSection('contact'), 200);
        }, 800);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createUniqueId('assistant'),
          sender: 'assistant',
          text: replyText,
          hasAction: !!(data.action),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createUniqueId('fallback'),
          sender: 'assistant',
          text: `Aswith is a B.Tech ECE student (CGPA 8.79). Ask about Aswith AI, ShopMore, the Bluetooth RC Car, or his EV Dashboard project!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <>
      {/* Floating Assistant Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
          aria-expanded={isOpen}
          className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-zinc-900 border border-white/20 text-white shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl hover:border-white/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <div className="p-1.5 rounded-full bg-purple-500/20 text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono tracking-wider uppercase font-medium">AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.button>
      </div>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Aswith AI Assistant"
            className="fixed bottom-36 sm:bottom-40 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-zinc-950/95 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[min(520px,calc(100dvh-180px))] backdrop-blur-2xl text-white"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-none">Aswith AI Assistant</h3>
                  <span className="text-[10px] font-mono text-white/40">Verified Portfolio Knowledge</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-white text-black font-medium rounded-br-none'
                        : 'bg-white/5 border border-white/10 text-white/80 font-light rounded-bl-none'
                    }`}
                  >
                    {/* Preserve newlines in assistant replies */}
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                    {/* Action indicator */}
                    {msg.hasAction && msg.sender === 'assistant' && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80">
                        <Navigation className="w-3 h-3" />
                        <span>Navigating...</span>
                      </div>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching portfolio records...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedPrompts.slice(0, 3).map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-white/60 hover:text-white shrink-0 cursor-pointer transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, certificates..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-sans text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                aria-label="Ask the AI assistant"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-30 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
