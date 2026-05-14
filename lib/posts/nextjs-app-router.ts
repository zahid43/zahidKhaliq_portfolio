import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 2,
  slug: "nextjs-app-router",
  title: "Next.js App Router: The Mental Model You Need",
  excerpt:
    "Server components, client boundaries, and the new data fetching patterns ~ once the mental model clicks, everything becomes obvious.",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
