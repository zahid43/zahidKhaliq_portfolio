'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getLocalTZ } from "@/lib/date-utils";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import { WhatsAppIcon, XIcon, PhoneIcon, MailIcon, FileTextIcon, SendIcon, AlertCircleIcon, Loader2Icon } from "@/components/ReusableSvgs";

type Status = 'idle' | 'loading' | 'success' | 'error';

const BOOT_LINES = [
  '$ ./contact --init',
  '> Establishing connection to zahid.khaliq...',
  '> Status: ✓  available for new projects',
  '> Ready. Type your message below.',
];

function useTyper(lines: string[], started: boolean, speed = 32) {
  const [output, setOutput] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx <= lines[lineIdx].length) {
      const t = setTimeout(() => {
        setOutput(prev => { const n = [...prev]; n[lineIdx] = lines[lineIdx].slice(0, charIdx); return n; });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 100);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx, lines, speed]);

  return { output, done };
}

const links = [
  { label: 'call()', href: 'tel:+923213022223', icon: <PhoneIcon width={12} height={12} />, cls: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-300' },
  { label: 'mail()', href: 'mailto:zaahid.khaliq@gmail.com', icon: <MailIcon width={12} height={12} />, cls: 'text-sky-400 border-sky-500/30 hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300' },
  { label: 'whatsapp()', href: 'https://wa.me/923213022223', icon: <WhatsAppIcon />, cls: 'text-green-400 border-green-500/30 hover:border-green-400/60 hover:bg-green-500/10 hover:text-green-300' },
  { label: 'linkedin()', href: 'https://linkedin.com/in/zaahidkhaliq', icon: <LinkedinIcon width={12} height={12} />, cls: 'text-blue-400 border-blue-500/30 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-300' },
  { label: 'twitter()', href: 'https://x.com/zaahidkhaliq', icon: <XIcon />, cls: 'text-slate-400 border-slate-500/30 hover:border-slate-400/60 hover:bg-slate-500/10 hover:text-slate-300' },
  { label: 'resume.pdf', href: '/resume/Zahid_Khaliq_Frontend_engineer.pdf', download: true, icon: <FileTextIcon width={12} height={12} />, cls: 'text-amber-400 border-amber-500/30 hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-amber-300' },
];

function TermRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="font-mono text-[10px] text-accent/70">$</span>
      <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [clock, setClock] = useState<{ abbr: string; time: string } | null>(null);
  const { output, done } = useTyper(BOOT_LINES, isInView);

  useEffect(() => {
    const { abbr } = getLocalTZ();
    const tick = () =>
      setClock({
        abbr,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      });
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setShowForm(true), 350);
    return () => clearTimeout(t);
  }, [done]);

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

  const inputCls = 'w-full bg-transparent font-mono text-sm text-emerald-300 placeholder-white/20 outline-none caret-accent py-1 focus:text-white/90 transition-colors duration-200';

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-16 lg:py-24">

      {/* Cosmic background */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-16 left-[18%] h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/45" />
      <div className="pointer-events-none absolute bottom-1/3 right-[14%] h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/35" />
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute top-[10%] left-[12%] opacity-20 dark:opacity-40 animate-spin [animation-duration:16s]" />
      <Image src="/images/star.svg" alt="" width={12} height={12}
        className="pointer-events-none absolute bottom-[18%] right-[15%] opacity-15 dark:opacity-35 animate-spin [animation-duration:22s] [animation-direction:reverse]" />

      <div className="container relative z-10">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-10 lg:mb-14">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Contact
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <motion.h4
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-black"
          >
            Let&apos;s Build{' '} Something Great
          </motion.h4>
        </div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-3xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1e1e22] rounded-t-2xl border border-b-0 border-white/8">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.6)]" />
              <div className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
              <div className="h-3 w-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="font-mono text-[11px] text-white/30 select-none">
                ~/portfolio — contact.sh
              </span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400/70 select-none tabular-nums">
              {clock ? `[${clock.abbr}] ${clock.time}` : ""}
            </span>
          </div>

          {/* Terminal body */}
          <div className="relative bg-[#12121a] rounded-b-2xl border border-t-0 border-white/8 px-6 py-6 lg:px-8 lg:py-7 overflow-hidden">

            {/* CRT scanlines */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.013)_2px,rgba(255,255,255,0.013)_4px)]" />
            {/* Inner glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[500px] rounded-full bg-accent/6 blur-3xl" />

            <div className="relative z-10">

              {/* Boot sequence */}
              <div className="font-mono text-sm space-y-[3px] mb-6 min-h-[5.5rem]">
                {BOOT_LINES.map((line, i) => {
                  const shown = output[i];
                  if (shown === undefined) return null;
                  const isCommand = line.startsWith('$');
                  const isStatus = line.includes('✓');
                  return (
                    <div key={i} className={`${isCommand ? 'text-white/75' : isStatus ? 'text-emerald-400' : 'text-white/40'}`}>
                      {shown}
                      {i === output.length - 1 && !done && (
                        <span className="inline-block w-[7px] h-[13px] bg-accent/80 ml-0.5 align-text-bottom animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                    {/* Quick links */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.18em] shrink-0">─ quick links</span>
                        <div className="flex-1 h-px bg-white/8" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {links.map(link => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            download={link.download ? 'Zahid Khaliq - Frontend Engineer.pdf' : undefined}
                            className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg border bg-white/[0.02] transition-all duration-200 ${link.cls}`}
                          >
                            <span className="opacity-80 flex items-center">{link.icon}</span>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Form */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.18em] shrink-0">─ send a message</span>
                      <div className="flex-1 h-px bg-white/8" />
                    </div>

                    <AnimatePresence mode="wait">
                      {status === 'success' ? (
                        <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-5">
                          <div className="font-mono text-sm space-y-1 mb-5">
                            <p className="text-emerald-400">{'> ✓ message delivered successfully'}</p>
                            <p className="text-white/35">{">"} exit 0 &mdash; I&apos;ll get back to you shortly</p>
                          </div>
                          <button onClick={() => setStatus('idle')} className="font-mono text-xs text-accent hover:text-accent/70 transition-colors">
                            {'$ ./send-another.sh'}
                          </button>
                        </motion.div>
                      ) : (
                        <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <TermRow label="name" />
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white/30 text-sm shrink-0">{'>'}</span>
                                <input name="name" value={formData.name} onChange={handleChange}
                                  disabled={status === 'loading'} required placeholder="your name"
                                  className={inputCls} />
                              </div>
                            </div>
                            <div>
                              <TermRow label="email" />
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white/30 text-sm shrink-0">{'>'}</span>
                                <input name="email" type="email" value={formData.email} onChange={handleChange}
                                  disabled={status === 'loading'} required placeholder="your@email.com"
                                  className={inputCls} />
                              </div>
                            </div>
                          </div>

                          <div>
                            <TermRow label="message" />
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-white/30 text-sm shrink-0 mt-1">{'>'}</span>
                              <textarea name="message" value={formData.message} onChange={handleChange}
                                disabled={status === 'loading'} required rows={4}
                                placeholder="write your message..."
                                className={`${inputCls} resize-none`} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {status === 'error' && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                className="font-mono text-xs text-red-400 flex items-center gap-2">
                                <span>{'>'}</span><AlertCircleIcon width={11} height={11} /><span>{errorMsg}</span>
                              </motion.p>
                            )}
                          </AnimatePresence>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={status === 'loading'}
                            className="group relative inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded-xl bg-accent/12 border border-accent/25 text-accent hover:bg-accent/22 hover:border-accent/45 transition-all duration-200 disabled:opacity-50 overflow-hidden"
                          >
                            <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
                            {status === 'loading'
                              ? <><Loader2Icon width={13} height={13} className="animate-spin" /><span>{'./sending.sh…'}</span></>
                              : <><SendIcon width={13} height={13} /><span>{'./send.sh ↵'}</span></>
                            }
                          </motion.button>

                        </motion.form>
                      )}
                    </AnimatePresence>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
