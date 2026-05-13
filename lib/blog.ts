export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "terminal"; commands: string[]; title?: string }
  | { type: "code"; code: string; language: string; filename?: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type PostSize = "featured" | "wide" | "normal";

export interface PostColor {
  gradient: string;
  glow: string;
  glowAlt: string;
  badge: string;
  accent: string;
  border: string;
}

export interface BlogPost {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  size: PostSize;
  color: PostColor;
  content?: ContentBlock[];
}

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "tailwind-v4",
    title: "Mastering Tailwind CSS v4: What Changed and Why It Matters",
    excerpt:
      "Tailwind v4 moves configuration entirely into CSS via @theme inline — no more tailwind.config.js. I migrated this very portfolio to v4 and learned some important gotchas along the way: cascade layers, the new @custom-variant syntax for dark mode, and how PostCSS integration changed. Here's the full breakdown with before/after examples.",
    date: "May 2025",
    category: "CSS",
    readTime: "6 min read",
    size: "featured",
    color: {
      gradient:
        "from-violet-50 via-purple-50 to-indigo-100 dark:from-[#06041a] dark:via-[#0a0828] dark:to-[#100a30]",
      glow: "bg-violet-400/20 dark:bg-violet-600/25",
      glowAlt: "bg-indigo-400/15 dark:bg-indigo-500/20",
      badge:
        "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300/50 dark:border-violet-500/30",
      accent: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
      border:
        "border-violet-200/80 dark:border-violet-500/20 hover:border-violet-400/50 dark:hover:border-violet-400/40",
    },
    content: [
      {
        type: "paragraph",
        text: "Tailwind CSS v4 is the most significant release since the framework was first introduced. The headline change: there is no more tailwind.config.js. Configuration now lives entirely inside your CSS file using the @theme directive — and while it sounds strange at first, it turns out to be a much better mental model.",
      },
      {
        type: "paragraph",
        text: "I migrated this portfolio from v3 to v4 and hit a few unexpected rough spots along the way. Here's everything you need to know to make the switch confidently.",
      },
      {
        type: "heading",
        level: 2,
        text: "Step 1 — Update Your Dependencies",
      },
      {
        type: "paragraph",
        text: "v4 splits the PostCSS integration into a dedicated package. Install both:",
      },
      {
        type: "terminal",
        commands: ["npm install tailwindcss@^4 @tailwindcss/postcss@^4"],
        title: "Terminal",
      },
      {
        type: "paragraph",
        text: "Then update your PostCSS config to point to the new plugin:",
      },
      {
        type: "code",
        language: "javascript",
        filename: "postcss.config.mjs",
        code: `export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};`,
      },
      {
        type: "heading",
        level: 2,
        text: "Step 2 — Move Config into CSS",
      },
      {
        type: "paragraph",
        text: "Replace tailwind.config.js with @theme declarations inside your global CSS. Instead of a JS config object, you define CSS custom properties directly:",
      },
      {
        type: "code",
        language: "css",
        filename: "globals.css",
        code: `@import "tailwindcss";

/* Scope dark mode to the .dark class */
@custom-variant dark (&:where(.dark, .dark *));

/* Design tokens — replaces your tailwind.config.js theme */
@theme inline {
  --color-accent:    #6366F1;
  --color-accentAlt: #14B8A6;
  --font-sans:       var(--font-geist-sans);
  --font-mono:       var(--font-geist-mono);
}

/* Base color scheme */
:root {
  --background: #FAFBFF;
  --foreground: #1E1B4B;
  color-scheme: light;
}

.dark {
  --background: #07051a;
  --foreground: #E8E6FF;
  color-scheme: dark;
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "Step 3 — Handle the Breaking Changes",
      },
      {
        type: "paragraph",
        text: "v4 renames a handful of utilities to match CSS spec naming. These break silently — no errors, just wrong styles:",
      },
      {
        type: "code",
        language: "diff",
        filename: "migration.diff",
        code: `/* Gradients — renamed to match CSS spec */
- bg-gradient-to-r from-blue-500 to-purple-500
+ bg-linear-to-r from-blue-500 to-purple-500

/* Shadows shifted down one step */
- shadow-sm   →  shadow-xs
- shadow      →  shadow-sm
- shadow-md   →  shadow
- shadow-lg   →  shadow-md

/* Ring utilities */
- ring         →  ring-3
- ring-0       →  ring-0  (unchanged)`,
      },
      {
        type: "heading",
        level: 2,
        text: "Step 4 — Audit Your Custom Utilities",
      },
      {
        type: "paragraph",
        text: "If you were using arbitrary CSS variable values, the syntax changed:",
      },
      {
        type: "code",
        language: "tsx",
        filename: "Component.tsx",
        code: `{/* v3 — arbitrary CSS variable */}
<div className="bg-[--my-color]" />

{/* v4 — new syntax with parentheses */}
<div className="bg-(--my-color)" />`,
      },
      {
        type: "heading",
        level: 2,
        text: "Key Differences at a Glance",
      },
      {
        type: "list",
        items: [
          "No more tailwind.config.js — all config lives in CSS via @theme",
          "bg-gradient-* renamed to bg-linear-* to match CSS spec",
          "@custom-variant replaces the darkMode: 'class' JS config option",
          "shadow-sm is now shadow-xs (shadows shifted down one step)",
          "Arbitrary CSS variables now use bg-(--var) instead of bg-[--var]",
          "JIT is the only mode — there is no full pregenerated build",
        ],
      },
      {
        type: "quote",
        text: "Moving config into CSS means your design tokens and your styles live in the same place. You stop switching mental contexts between JS and CSS to understand your design system.",
      },
      {
        type: "paragraph",
        text: "Overall, v4 is a big step forward. The migration takes about an hour for a medium-sized project. Once you've made the mental switch to CSS-first config, it's genuinely more intuitive — and the @custom-variant syntax for dark mode is cleaner than anything v3 offered.",
      },
    ],
  },
  {
    id: 2,
    title: "Next.js App Router: The Mental Model You Need",
    excerpt:
      "Server components, client boundaries, and the new data fetching patterns — once the mental model clicks, everything becomes obvious.",
    date: "Apr 2025",
    category: "Next.js",
    readTime: "5 min read",
    size: "normal",
    color: {
      gradient:
        "from-teal-50 via-cyan-50 to-emerald-100 dark:from-[#041510] dark:via-[#071e1a] dark:to-[#0c1428]",
      glow: "bg-teal-400/20 dark:bg-teal-500/25",
      glowAlt: "bg-cyan-400/15 dark:bg-cyan-500/20",
      badge:
        "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-500/30",
      accent: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
      border:
        "border-teal-200/80 dark:border-teal-500/20 hover:border-teal-400/50 dark:hover:border-teal-400/40",
    },
  },
  {
    id: 3,
    title: "Accessible UIs from the Start",
    excerpt:
      "Accessibility isn't a post-launch audit — it's a design constraint that leads to better interfaces for everyone.",
    date: "Mar 2025",
    category: "A11y",
    readTime: "4 min read",
    size: "normal",
    color: {
      gradient:
        "from-indigo-50 via-blue-50 to-sky-100 dark:from-[#04061a] dark:via-[#060a1e] dark:to-[#070d24]",
      glow: "bg-indigo-400/20 dark:bg-indigo-500/25",
      glowAlt: "bg-blue-400/15 dark:bg-blue-500/20",
      badge:
        "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30",
      accent: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
      border:
        "border-indigo-200/80 dark:border-indigo-500/20 hover:border-indigo-400/50 dark:hover:border-indigo-400/40",
    },
  },
  {
    id: 4,
    title: "Framer Motion: The 80/20 Guide",
    excerpt:
      "Spring physics, layout animations, and AnimatePresence — the 20% of the API you'll use 80% of the time.",
    date: "Feb 2025",
    category: "Animation",
    readTime: "7 min read",
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
  },
  {
    id: 5,
    title: "TypeScript Generics Without the Pain",
    excerpt:
      "Stop copying utility types from Stack Overflow. Here's how to write your own and understand what you're doing.",
    date: "Jan 2025",
    category: "TypeScript",
    readTime: "8 min read",
    size: "normal",
    color: {
      gradient:
        "from-amber-50 via-orange-50 to-yellow-100 dark:from-[#1a1005] dark:via-[#1e1205] dark:to-[#241508]",
      glow: "bg-amber-400/20 dark:bg-amber-500/25",
      glowAlt: "bg-orange-400/15 dark:bg-orange-500/20",
      badge:
        "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30",
      accent: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
      border:
        "border-amber-200/80 dark:border-amber-500/20 hover:border-amber-400/50 dark:hover:border-amber-400/40",
    },
  },
  {
    id: 6,
    title: "Dark Mode Done Right: CSS Variables + next-themes",
    excerpt:
      "Most dark mode implementations break on hydration or flicker on first load. Here's the SSR-safe pattern I use across all my Next.js projects — CSS custom properties paired with next-themes' class strategy, giving you flicker-free dark mode with proper system preference support out of the box.",
    date: "Dec 2024",
    category: "CSS",
    readTime: "5 min read",
    size: "wide",
    color: {
      gradient:
        "from-slate-50 via-gray-50 to-zinc-100 dark:from-[#0a0a0f] dark:via-[#0d0d14] dark:to-[#101018]",
      glow: "bg-slate-400/20 dark:bg-slate-500/25",
      glowAlt: "bg-zinc-400/15 dark:bg-zinc-500/20",
      badge:
        "bg-slate-100 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-300/50 dark:border-slate-500/30",
      accent: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
      border:
        "border-slate-200/80 dark:border-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-400/40",
    },
  },
  {
    id: 7,
    title: "React Performance: Stop Guessing, Start Measuring",
    excerpt:
      "Profiler, memo, useMemo — knowing when NOT to use them matters as much as knowing when to.",
    date: "Nov 2024",
    category: "React",
    readTime: "6 min read",
    size: "normal",
    color: {
      gradient:
        "from-cyan-50 via-sky-50 to-blue-100 dark:from-[#041218] dark:via-[#06161e] dark:to-[#081a24]",
      glow: "bg-cyan-400/20 dark:bg-cyan-500/25",
      glowAlt: "bg-sky-400/15 dark:bg-sky-500/20",
      badge:
        "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-300/50 dark:border-cyan-500/30",
      accent: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
      border:
        "border-cyan-200/80 dark:border-cyan-500/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/40",
    },
  },
];
