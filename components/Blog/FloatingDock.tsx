"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TocItem {
  text: string;
  level: 2 | 3;
}

interface FloatingDockProps {
  toc: TocItem[];
}

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function TocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 4h11M2 7.5h7M2 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.5 8.5l3-3M8 5.5l1-.5a2.5 2.5 0 010 5l-1 .5M6 8.5l-1 .5a2.5 2.5 0 010-5l1-.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 11V3M4 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FloatingDock({ toc }: FloatingDockProps) {
  const [progressVal, setProgressVal] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgressVal(Math.max(0, Math.min(1, progress)));
      setShowTop(el.scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close TOC panel when clicking outside
  useEffect(() => {
    if (!tocOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-floating-dock]")) setTocOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tocOpen]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const r = 15;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progressVal);

  return (
    <motion.div
      data-floating-dock
      className="hidden lg:flex fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-40 items-start gap-3 flex-row-reverse"
      initial={{ x: 64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
    >
      {/* ── Dock pill ──────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1 bg-[#1e1e22]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/30">

        {/* Progress ring */}
        <div className="relative h-9 w-9 flex items-center justify-center">
          <svg width="36" height="36" className="absolute -rotate-90" style={{ overflow: "visible" }}>
            <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
            <circle
              cx="18" cy="18" r={r} fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.15s ease" }}
            />
          </svg>
          <span className="relative text-[8px] font-bold text-white/50 tabular-nums">
            {Math.round(progressVal * 100)}%
          </span>
        </div>

        <div className="h-px w-5 bg-white/8" />

        {/* TOC toggle */}
        {toc.length > 0 && (
          <button
            onClick={() => setTocOpen((o) => !o)}
            title="Table of contents"
            className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-150 ${
              tocOpen
                ? "bg-accent/20 text-accent"
                : "text-white/38 hover:text-white/75 hover:bg-white/5"
            }`}
          >
            <TocIcon />
          </button>
        )}

        <div className="h-px w-5 bg-white/8" />

        {/* Copy link */}
        <button
          onClick={copyLink}
          title={copied ? "Copied!" : "Copy link"}
          className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-150 ${
            copied
              ? "text-teal-400 bg-teal-400/10"
              : "text-white/38 hover:text-white/75 hover:bg-white/5"
          }`}
        >
          {copied ? <CheckIcon /> : <LinkIcon />}
        </button>

        {/* Scroll to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.85 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={scrollTop}
              title="Back to top"
              className="h-9 w-9 flex items-center justify-center rounded-xl text-white/38 hover:text-white/75 hover:bg-white/5 transition-colors duration-150"
            >
              <ArrowUpIcon />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* ── TOC slide-out panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {tocOpen && (
          <motion.div
            data-floating-dock
            initial={{ opacity: 0, x: -10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#1e1e22]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/30 w-52 max-h-[65vh] overflow-y-auto"
          >
            {/* CRT scanlines */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.012)_2px,rgba(255,255,255,0.012)_4px)]" />

            <div className="relative z-10">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/28 mb-3">
                Contents
              </p>
              <nav className="flex flex-col gap-2">
                {toc.map((item, i) => (
                  <a
                    key={i}
                    href={`#${toSlug(item.text)}`}
                    onClick={() => setTocOpen(false)}
                    className={`text-[11.5px] leading-snug text-white/48 hover:text-accent transition-colors duration-150 block${
                      item.level === 3 ? " pl-3" : ""
                    }`}
                  >
                    {item.level === 3 && (
                      <span className="inline-block mr-1 text-[9px] opacity-35">–</span>
                    )}
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
