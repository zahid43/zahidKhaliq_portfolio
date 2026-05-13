import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 7,
  slug: "react-performance",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
