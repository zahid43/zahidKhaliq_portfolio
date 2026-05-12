"use client";

import Image from "next/image";
import AvatarGraphic from "@/components/ReusableSvgs/AvatarGraphic";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Framer Motion variants ──────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

// ── Typewriter hook (infinite loop) ────────────────────────────────────────
function useTypewriter(text: string, typeSpeed = 55, deleteSpeed = 35, pauseMs = 1800, startDelay = 750) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = (i: number, deleting: boolean) => {
      if (!deleting) {
        setDisplayed(text.slice(0, i));
        setDone(i >= text.length);
        if (i < text.length) {
          id = setTimeout(() => tick(i + 1, false), typeSpeed);
        } else {
          id = setTimeout(() => tick(i, true), pauseMs);
        }
      } else {
        setDisplayed(text.slice(0, i));
        setDone(false);
        if (i > 0) {
          id = setTimeout(() => tick(i - 1, true), deleteSpeed);
        } else {
          id = setTimeout(() => tick(0, false), typeSpeed * 3);
        }
      }
    };
    const start = setTimeout(() => tick(0, false), startDelay);
    return () => { clearTimeout(start); clearTimeout(id); };
  }, [text, typeSpeed, deleteSpeed, pauseMs, startDelay]);
  return { displayed, done };
}

// ── Scramble hook ──────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function useScramble(original: string) {
  const [output, setOutput] = useState(original);
  const iterRef = useRef(0);
  const timerId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const scramble = useCallback(() => {
    iterRef.current = 0;
    clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setOutput(
        original.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < iterRef.current) return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      iterRef.current += 0.4;
      if (iterRef.current >= original.length) {
        clearInterval(timerId.current);
        setOutput(original);
      }
    }, 30);
  }, [original]);
  useEffect(() => () => clearInterval(timerId.current), []);
  return { output, scramble };
}

// ── Letter-stagger entrance — "Zahid" ──────────────────────────────────────
function LetterStagger({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 52, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: startDelay + i * 0.065, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

// ── Shimmer + scramble on hover — "Khaliq" ─────────────────────────────────
function ShimmerScramble({ text, startDelay }: { text: string; startDelay: number }) {
  const { output, scramble } = useScramble(text);
  return (
    <motion.span className="inline-block" onHoverStart={scramble}>
      {output.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block hero-name-shimmer cursor-default select-none"
          initial={{ opacity: 0, y: 52, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: startDelay + i * 0.065, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const id = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * target));
      if (frame >= totalFrames) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return { ref, count };
}

// ── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Years exp.", target: 4, plus: true },
  { label: "Projects",   target: 30, plus: true },
  { label: "Companies",  target: 3,  plus: false },
];
const techStack = ["React", "Next.js", "Tailwind", "Webflow"];

// ── StatItem ────────────────────────────────────────────────────────────────
function StatItem({ stat }: { stat: typeof stats[0] }) {
  const { ref, count } = useCountUp(stat.target);
  return (
    <div ref={ref}>
      <p className="text-2xl font-black text-darkBlue dark:text-white">
        {count}{stat.plus ? "+" : ""}
      </p>
      <p className="text-xs text-darkBlue/50 dark:text-white/45 uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { displayed, done } = useTypewriter("Frontend Engineer");

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 18 });
  const avatarX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const avatarY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const glowX  = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const glowY  = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section
      className="relative h-auto lg:h-200 overflow-hidden py-20 lg:py-0"
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cosmic nebula glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-400/15 dark:bg-indigo-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet-400/15 dark:bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 dark:bg-teal-600/20 blur-3xl" />

      {/* Galaxy dust dots */}
      <div className="pointer-events-none absolute top-16 left-1/4 h-1 w-1 rounded-full bg-darkBlue/30 dark:bg-white/60" />
      <div className="pointer-events-none absolute top-32 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/45" />
      <div className="pointer-events-none absolute bottom-28 left-[15%] h-1 w-1 rounded-full bg-darkBlue/25 dark:bg-white/55" />
      <div className="pointer-events-none absolute top-1/3 right-[22%] h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/40" />
      <div className="pointer-events-none absolute bottom-1/3 right-[40%] h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/35" />
      <div className="pointer-events-none absolute top-[55%] left-[8%] h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/30" />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={28} height={28}
        className="pointer-events-none absolute top-14 right-[26%] opacity-20 dark:opacity-45 animate-spin [animation-duration:15s]" />
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute bottom-20 left-14 opacity-15 dark:opacity-35 animate-spin [animation-duration:22s] [animation-direction:reverse]" />
      <Image src="/images/star.svg" alt="" width={12} height={12}
        className="pointer-events-none absolute top-[45%] left-[38%] opacity-10 dark:opacity-30 animate-spin [animation-duration:10s]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden opacity-25 dark:opacity-40">
        <Image src="/images/graphics01.svg" alt="Hero" width={1920} height={1080} />
      </div>
      <div className="hero-gradient" />

      <div className="container h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] z-1 relative h-full gap-16 lg:gap-0">

          {/* ── LEFT: staggered text entrance ── */}
          <motion.div
            className="grid place-items-center order-first lg:order-0 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full">

              {/* Availability badge */}
              <motion.div variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 mb-5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Available for work</span>
              </motion.div>

              {/* Name */}
              <h1 className="font-black leading-[1.05] mb-2">
                <LetterStagger text="Zahid" startDelay={0.15} />
                <br />
                <ShimmerScramble text="Khaliq" startDelay={0.52} />
              </h1>

              {/* Typewriter subtitle */}
              <motion.p variants={itemVariants}
                className="text-base font-medium text-darkBlue/60 dark:text-white/55 mb-4 uppercase tracking-widest min-h-[1.5em]">
                {displayed}
                <span
                  className={`inline-block w-[2px] h-[0.85em] ml-[2px] bg-accent align-middle transition-opacity duration-300 ${done ? "animate-pulse" : "opacity-100"}`}
                />
              </motion.p>

              {/* Description */}
              <motion.p variants={itemVariants}
                className="text-sm leading-relaxed text-darkBlue/70 dark:text-white/65 max-w-md mx-auto lg:mx-0">
                Crafting fast, beautiful, and accessible web experiences — from pixel-perfect UI to production-ready code.
              </motion.p>

              {/* Stats count-up */}
              <motion.div variants={itemVariants}
                className="flex items-center gap-6 mt-6 justify-center lg:justify-start">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    {i > 0 && <div className="h-8 w-px bg-darkBlue/15 dark:bg-white/15" />}
                    <StatItem stat={stat} />
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants}
                className="flex gap-3 mt-7 justify-center lg:justify-start flex-wrap">
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/85 hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]">
                  Contact me
                </a>
                <a href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-darkBlue/15 dark:border-white/15 px-6 py-2.5 text-sm font-semibold text-darkBlue/70 dark:text-white/70 hover:border-accent/40 hover:text-accent transition-all duration-200">
                  View work ↓
                </a>
              </motion.div>

              {/* Tech stack */}
              <motion.div variants={itemVariants}
                className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                {techStack.map((t) => (
                  <span key={t}
                    className="text-[11px] font-medium px-3 py-1 rounded-full bg-darkBlue/5 dark:bg-white/8 border border-darkBlue/10 dark:border-white/10 text-darkBlue/60 dark:text-white/55">
                    {t}
                  </span>
                ))}
              </motion.div>

            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden lg:block relative self-stretch">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-accent/40 to-transparent" />
          </div>

          {/* ── RIGHT: avatar with parallax ── */}
          <motion.div
            className="grid place-items-center order-last lg:order-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <motion.div
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-130 lg:h-130 mt-10 lg:mt-0 mx-auto"
              style={{ x: avatarX, y: avatarY }}
            >
              {/* Glow halo — moves opposite direction for depth */}
              <motion.div
                className="absolute inset-0 scale-125 rounded-full bg-linear-to-br from-indigo-300/25 via-violet-300/20 to-teal-300/25 dark:from-indigo-600/30 dark:via-violet-700/25 dark:to-teal-600/20 blur-3xl"
                style={{ x: glowX, y: glowY }}
              />

              <div className="circle w-full h-full rounded-full bg-linear-to-br from-violet-100 via-indigo-100 to-teal-50 dark:from-[#100828] dark:via-[#0d0620] dark:to-[#071a14] relative overflow-hidden">
                <Image src="/images/star.svg" alt="" width={32} height={32}
                  className="pointer-events-none absolute top-[15%] right-[20%] opacity-40 dark:opacity-60 animate-spin [animation-duration:14s]" />
                <Image src="/images/star.svg" alt="" width={20} height={20}
                  className="pointer-events-none absolute bottom-[30%] left-[12%] opacity-30 dark:opacity-50 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
                <Image src="/images/star.svg" alt="" width={14} height={14}
                  className="pointer-events-none absolute top-[45%] right-[8%] opacity-25 dark:opacity-45 animate-spin [animation-duration:9s]" />
                <div className="pointer-events-none absolute top-[20%] left-[30%] h-2 w-2 rounded-full bg-darkBlue/25 dark:bg-white/60" />
                <div className="pointer-events-none absolute top-[50%] right-[30%] h-1.5 w-1.5 rounded-full bg-darkBlue/20 dark:bg-white/40" />
                <div className="pointer-events-none absolute bottom-[20%] left-[40%] h-2 w-2 rounded-full bg-darkBlue/20 dark:bg-white/50" />
              </div>

              <div className="absolute -top-12 lg:-top-20 left-0 w-full overflow-hidden rounded-b-full h-[calc(100%+3rem)] lg:h-[calc(100%+5rem)]">
                <Image src="/images/zahidTransparent.png" alt="Zahid Khaliq" fill
                  style={{ objectFit: "contain", objectPosition: "bottom center" }} />
              </div>

              <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <div className="bg-accent w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl absolute top-10 lg:top-14 left-0 lg:left-5 rotate-45 animate-spin [animation-duration:10s]" />
                <AvatarGraphic className="w-11/12 mt-12 sm:mt-16 lg:mt-25 ml-4 sm:ml-6 lg:ml-8" />
                <div className="bg-violet-600 w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl absolute bottom-8 lg:bottom-14 right-0 lg:right-5 rotate-45 animate-spin [animation-duration:5s]" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
