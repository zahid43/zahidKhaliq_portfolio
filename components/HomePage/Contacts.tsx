'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import WhatsAppIcon from "@/components/ReusableSvgs/WhatsAppIcon";
import XIcon from "@/components/ReusableSvgs/XIcon";
import FloatingField from "@/components/UI/FloatingField";
import { FileText, Phone, Mail, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = 'idle' | 'loading' | 'success' | 'error';

const links = [
  { label: 'Call', sub: '+92 321 302 2223', href: 'tel:+923213022223', icon: <Phone size={18} />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/15', border: 'border-emerald-500/20' },
  { label: 'Email', sub: 'zaahid.khaliq@gmail.com', href: 'mailto:zaahid.khaliq@gmail.com', icon: <Mail size={18} />, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10 group-hover:bg-sky-500/15', border: 'border-sky-500/20' },
  { label: 'WhatsApp', sub: 'Send a quick message', href: 'https://wa.me/923213022223', icon: <WhatsAppIcon />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 group-hover:bg-green-500/15', border: 'border-green-500/20' },
  { label: 'LinkedIn', sub: '/in/zaahidkhaliq', href: 'https://linkedin.com/in/zaahidkhaliq', icon: <LinkedinIcon width={18} height={18} />, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 group-hover:bg-blue-500/15', border: 'border-blue-500/20' },
  { label: 'X / Twitter', sub: '@zaahidkhaliq', href: 'https://x.com/zaahidkhaliq', icon: <XIcon />, color: 'text-foreground', bg: 'bg-foreground/5 group-hover:bg-foreground/10', border: 'border-foreground/15' },
  { label: 'Resume', sub: 'PDF · Frontend Engineer', href: '/resume/Zahid_Khaliq_Frontend_engineer.pdf', icon: <FileText size={18} />, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 group-hover:bg-amber-500/15', border: 'border-amber-500/20', download: true },
];

export default function Contacts() {
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
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setFormData({ name: '', email: '', message: '' }); }
      else { setErrorMsg(data.error ?? 'Something went wrong.'); setStatus('error'); }
    } catch { setErrorMsg('Network error. Please try again.'); setStatus('error'); }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-32">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-accent/5 dark:bg-accent/8 blur-[140px]" />

      <div className="container relative z-10 max-w-6xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 lg:mb-20">
          <span className="inline-block mb-4 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Get In Touch
          </span>
          <h2 className="font-black text-foreground leading-[1.1] max-w-lg">
            Let&apos;s Build<br />
            <span className="bg-gradient-to-r from-accent via-fuchsia-500 to-accentAlt bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">

          {/* LEFT — Links */}
          <div className="flex flex-col gap-3">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Reach me via
            </motion.p>

            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                download={link.download ? 'Zahid Khaliq - Frontend Engineer.pdf' : undefined}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-center gap-4 rounded-2xl border border-transparent hover:border-foreground/8 hover:bg-foreground/[0.02] px-4 py-3.5 transition-all duration-200"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${link.color} ${link.bg} ${link.border}`}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{link.label}</p>
                  <p className="text-xs text-muted truncate">{link.sub}</p>
                </div>
                <ArrowUpRight size={15} className="text-muted/40 group-hover:text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </motion.a>
            ))}

            {/* Available badge */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/8 px-4 py-2 self-start">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Available for new projects</span>
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-5 py-20 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/25">
                    <CheckCircle size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-black text-foreground">Message Sent!</p>
                    <p className="mt-1.5 text-sm text-muted">I&apos;ll get back to you as soon as possible.</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-sm text-accent hover:underline transition-all">Send another →</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-4">

                  <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Send a message</p>
                    <h3 className="font-black text-foreground">Drop me a line</h3>
                    <p className="text-sm text-muted mt-1">I typically reply within 24 hours.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FloatingField label="Name" name="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'} required />
                    <FloatingField label="Email" name="email" as="input" type="email" value={formData.email} onChange={handleChange} disabled={status === 'loading'} required />
                  </div>
                  <FloatingField label="Message" name="message" as="textarea" rows={6} value={formData.message} onChange={handleChange} disabled={status === 'loading'} required />

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle size={14} className="shrink-0" /><span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    type="submit" disabled={status === 'loading'}
                    className="group relative mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-fuchsia-500 px-6 py-4 text-sm font-bold text-white shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_32px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-60 overflow-hidden"
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    {status === 'loading'
                      ? <><Loader2 size={15} className="animate-spin" /><span>Sending…</span></>
                      : <><Send size={15} /><span>Send Message</span></>
                    }
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
