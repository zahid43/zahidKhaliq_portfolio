import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 5,
  slug: "typescript-generics",
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
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  // Add article content here
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
