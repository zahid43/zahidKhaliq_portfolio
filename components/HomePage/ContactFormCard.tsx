'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactFormCard() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMsg(data.error ?? 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-foreground/10 bg-white/5 dark:bg-black/20 backdrop-blur-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/10 dark:focus:bg-black/40 focus:ring-4 focus:ring-accent/10 disabled:opacity-50 shadow-sm';

  return (
    <div // Removed motion props here, as the parent Contacts.tsx will handle the animation for this column
      className="relative w-full h-full rounded-3xl border border-foreground/10 bg-linear-to-br from-white/40 to-white/10 dark:from-[#0d0b26]/60 dark:to-[#071a17]/40 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-center"
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-teal-500/10" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
              <p className="mt-1 text-sm text-muted">Thanks for reaching out. I&apos;ll reply as soon as possible.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStatus('idle')}
              className="mt-2 rounded-xl border border-foreground/10 px-5 py-2 text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-all duration-200"
            >
              Send another
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4"
          >
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted mb-1">
                SEND A MESSAGE
              </p>
              <h3 className="text-lg font-bold text-foreground">Drop me a line</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Zahid Khaliq"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project, idea, or just say hi..."
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500"
                >
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className="group relative mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              {status === 'loading' ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}