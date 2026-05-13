import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 3,
  slug: "accessible-uis",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
