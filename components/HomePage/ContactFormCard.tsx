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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    'w-full rounded-xl border border-foreground/10 bg-background/60 dark:bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-accent/50 focus:ring-2 focus:ring-accent/10 disabled:opacity-40';

  return (
    <div className="relative w-full h-full flex flex-col justify-center">

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center gap-5 py-16 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <CheckCircle size={36} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground">Message Sent!</h3>
              <p className="mt-2 text-sm text-muted">Thanks for reaching out. I&apos;ll reply as soon as possible.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStatus('idle')}
              className="mt-2 rounded-xl border border-foreground/10 px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-all duration-200"
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
            className="flex flex-col gap-5"
          >
            <div className="mb-1">
              <span className="inline-block mb-3 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Send a Message
              </span>
              <h3 className="font-black text-foreground">Drop me a line</h3>
              <p className="mt-1.5 text-sm text-muted">I typically reply within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted">Name</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Zahid Khaliq"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted">Email</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">Message</label>
              <textarea
                id="message" name="message"
                placeholder="Tell me about your project, idea, or just say hi..."
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                required rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: status === 'loading' ? 1 : 1.02, y: status === 'loading' ? 0 : -2 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
              type="submit"
              disabled={status === 'loading'}
              className="group relative mt-2 flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-accent to-fuchsia-500 px-6 py-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_36px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              {status === 'loading' ? (
                <><Loader2 size={15} className="animate-spin" /><span>Sending…</span></>
              ) : (
                <><Send size={15} /><span>Send Message</span></>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
