import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 4,
  slug: "framer-motion",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
