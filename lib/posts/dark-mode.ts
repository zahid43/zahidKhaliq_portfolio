import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 6,
  slug: "dark-mode",
  title: "Dark Mode Done Right: CSS Variables + next-themes",
  excerpt:
    "Most dark mode implementations break on hydration or flicker on first load. Here's the SSR-safe pattern I use across all my Next.js projects ~ CSS custom properties paired with next-themes' class strategy, giving you flicker-free dark mode with proper system preference support out of the box.",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
