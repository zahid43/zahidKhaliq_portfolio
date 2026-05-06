'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
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
    'w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50';

  return (
    <section id="contact-form" className="container py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute top-8 left-1/4 h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/40" />
      <div className="pointer-events-none absolute bottom-10 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/30" />
      <div className="pointer-events-none absolute top-1/2 right-[8%] h-1 w-1 rounded-full bg-darkBlue/10 dark:bg-white/25" />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute top-6 right-12 opacity-20 dark:opacity-40 animate-spin [animation-duration:16s]" />
      <Image src="/images/star.svg" alt="" width={11} height={11}
        className="pointer-events-none absolute bottom-8 left-10 opacity-15 dark:opacity-30 animate-spin [animation-duration:22s] [animation-direction:reverse]" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            SEND A MESSAGE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-2 text-sm text-muted">
            Have a project in mind? Drop me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl border border-foreground/8 bg-surface/60 backdrop-blur-sm p-6 md:p-8 shadow-[0_4px_32px_rgba(99,102,241,0.08)]"
        >
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-accent/5 via-transparent to-accentAlt/5" />

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

                {/* Error message */}
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
                  className="group relative flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_28px_rgba(99,102,241,0.55)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
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
        </motion.div>
      </div>
    </section>
  );
}
