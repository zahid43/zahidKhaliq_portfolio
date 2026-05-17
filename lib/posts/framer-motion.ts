import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 4,
  slug: "framer-motion",
  title: "Framer Motion: The 80/20 Guide",
  excerpt:
    "Spring physics, layout animations, and AnimatePresence ~ the 20% of the API you'll use 80% of the time.",
  date: "Oct 2025",
  category: "Animation",
  readTime: "9 min read",
  size: "normal",
  color: {
    gradient:
      "from-pink-50 via-rose-50 to-fuchsia-100 dark:from-[#1a0414] dark:via-[#1e0518] dark:to-[#24061e]",
    glow: "bg-pink-400/20 dark:bg-pink-500/25",
    glowAlt: "bg-fuchsia-400/15 dark:bg-fuchsia-500/20",
    badge:
      "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-300/50 dark:border-pink-500/30",
    accent: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    border:
      "border-pink-200/80 dark:border-pink-500/20 hover:border-pink-400/50 dark:hover:border-pink-400/40",
  },
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [

  // ── Intro ────────────────────────────────────────────────────────────────────
  {
    type: "paragraph",
    text: "Framer Motion is a production-ready animation library for React. It lets you animate anything — from a simple fade-in to complex gesture-driven interactions — using a declarative API that sits right inside your JSX. No timeline config, no manual requestAnimationFrame loops. Just props.",
  },
  {
    type: "quote",
    text: "If CSS transitions are a bicycle, Framer Motion is a motorbike. Same direction, wildly different speed and power.",
  },

  // ── Where it works ───────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Where Can You Use It?",
  },
  {
    type: "paragraph",
    text: "Framer Motion is a React-only library. It works anywhere React runs:",
  },
  {
    type: "list",
    items: [
      "React (JavaScript or TypeScript) — the obvious home",
      "Next.js — works in both App Router (client components only) and Pages Router",
      "Remix — fully supported, mark the component 'use client' isn't needed here",
      "Gatsby — works out of the box",
      "Vite + React — zero config needed",
      "Expo / React Native — use framer-motion/native (limited subset)",
    ],
  },
  {
    type: "paragraph",
    text: "It does not work with Vue, Angular, Svelte, or plain HTML/JS. For those ecosystems, look at Motion One (same author, framework-agnostic) or GSAP.",
  },

  // ── Installation ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Installation",
  },
  {
    type: "terminal",
    title: "bash",
    commands: [
      "# npm",
      "npm install framer-motion",
      "",
      "# yarn",
      "yarn add framer-motion",
      "",
      "# pnpm",
      "pnpm add framer-motion",
    ],
  },
  {
    type: "paragraph",
    text: "No extra config, no peer dependencies beyond React itself. TypeScript types are bundled — no @types package needed.",
  },

  // ── First animation ──────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Your First Animation",
  },
  {
    type: "paragraph",
    text: "The core primitive is motion — a namespace of HTML and SVG elements that accept animation props. Swap any HTML tag for its motion equivalent and you unlock animate, initial, transition, and more.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "FadeIn.tsx",
    code: `import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, I just faded in!
    </motion.div>
  );
}`,
  },
  {
    type: "list",
    items: [
      "initial — the state the element starts in (before it mounts or animates)",
      "animate — the state you want it to animate toward",
      "transition — controls duration, easing, delay, and physics",
    ],
  },

  // ── Variants ─────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Variants — Clean Staggered Lists",
  },
  {
    type: "paragraph",
    text: "Variants let you name animation states and share them between parent and children. The parent orchestrates timing — staggerChildren delays each child by a fixed amount automatically.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "StaggerList.tsx",
    code: `import { motion } from "framer-motion";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const skills = ["React", "Next.js", "TypeScript", "Tailwind"];

export default function StaggerList() {
  return (
    <motion.ul variants={list} initial="hidden" animate="show">
      {skills.map((skill) => (
        <motion.li key={skill} variants={item}>
          {skill}
        </motion.li>
      ))}
    </motion.ul>
  );
}`,
  },

  // ── whileInView ──────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Scroll-Triggered with whileInView",
  },
  {
    type: "paragraph",
    text: "Replace animate with whileInView and the animation fires when the element enters the viewport. Add viewport={{ once: true }} so it only runs once — not every time you scroll back up.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "ScrollCard.tsx",
    code: `import { motion } from "framer-motion";

export default function ScrollCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-white p-6 shadow"
    >
      I animate when I scroll into view.
    </motion.div>
  );
}`,
  },

  // ── Spring physics ───────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Spring Physics",
  },
  {
    type: "paragraph",
    text: "Framer Motion ships a real spring physics engine. Instead of easing curves, you tune stiffness (how snappy) and damping (how much it bounces). This is what makes motion feel alive rather than robotic.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "SpringButton.tsx",
    code: `import { motion } from "framer-motion";

export default function SpringButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold"
    >
      Press me
    </motion.button>
  );
}`,
  },
  {
    type: "list",
    items: [
      "stiffness: 400 — very snappy, good for buttons and small UI elements",
      "stiffness: 80–120 — softer, good for panels and cards sliding in",
      "damping: 17 — slight bounce; increase to 30+ to remove bounce entirely",
    ],
  },

  // ── AnimatePresence ──────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "AnimatePresence — Exit Animations",
  },
  {
    type: "paragraph",
    text: "By default React removes elements from the DOM instantly — no time for an exit animation. Wrap conditionally rendered components in AnimatePresence and add an exit prop to play the animation before the element unmounts.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "Toast.tsx",
    code: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <button onClick={() => setVisible(false)}>Dismiss</button>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl bg-emerald-500 text-white px-4 py-3"
          >
            Saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}`,
  },
  {
    type: "paragraph",
    text: "The key prop is required on the child when you're swapping content — it tells Framer Motion this is a new element, not a mutation of the old one.",
  },

  // ── Quick-ref ─────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Quick Reference",
  },
  {
    type: "list",
    items: [
      "motion.div / motion.span / motion.button — drop-in replacements for any HTML tag",
      "initial + animate — from/to state for mount animations",
      "whileHover / whileTap / whileFocus — interaction states, no useState needed",
      "whileInView + viewport — scroll-triggered animations",
      "variants — named states shared across parent/child for orchestrated sequences",
      "AnimatePresence — enables exit animations before DOM removal",
      "useMotionValue + useTransform — reactive values for scroll-linked or drag-linked UI",
      "layout prop — automatic layout transition when size or position changes",
    ],
  },

  // ── Closing ───────────────────────────────────────────────────────────────────
  {
    type: "quote",
    text: "Start with motion.div, initial, animate, and transition. That alone covers 70% of real UI animation needs. Add variants and AnimatePresence when you need stagger or exits. The rest is refinement.",
  },

  // ── Docs link ────────────────────────────────────────────────────────────────
  {
    type: "link",
    href: "https://www.framer.com/motion/",
    text: "Framer Motion Official Docs",
    description: "Full API reference, examples, and visual playground — framer.com/motion",
    copyable: false,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
