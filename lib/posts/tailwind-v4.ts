import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
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
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
