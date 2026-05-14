import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 9,
  slug: "js-snippets",
  title: "JS Snippets ~ Browser Console Tricks Worth Keeping",
  excerpt:
    "Handy one-off scripts I keep reaching for in DevTools. Paste, run, done ~ no libraries, no setup. Starting with the sticky positioning debugger that's saved me more than once.",
  date: "May 2026",
  category: "JavaScript",
  readTime: "3 min read",
  size: "normal",
  color: {
    gradient:
      "from-orange-50 via-amber-50 to-yellow-100 dark:from-[#150f02] dark:via-[#1a1202] dark:to-[#1e1503]",
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
  {
    type: "paragraph",
    text: "These are the scripts I paste straight into the browser console when I hit a wall. No npm, no imports ~ just open DevTools and go.",
  },

  // ── position: sticky debugger ─────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Why Is My sticky Element Not Sticking?",
  },
  {
    type: "paragraph",
    text: "The most common culprit is a parent element with overflow set to hidden, auto, or scroll. That quietly breaks sticky positioning and there's no warning anywhere. This snippet walks up the DOM and logs every offending ancestor.",
  },
  {
    type: "code",
    language: "javascript",
    filename: "sticky-debug.js",
    code: `let parent = document.querySelector('.sticky').parentElement;

while (parent) {
  const hasOverflow = getComputedStyle(parent).overflow;
  if (hasOverflow !== 'visible') {
    console.log(hasOverflow, parent);
  }
  parent = parent.parentElement;
}`,
  },
  {
    type: "paragraph",
    text: "Swap '.sticky' for whatever selector targets your stuck element. Any element that logs is a candidate ~ set its overflow back to visible (or remove it entirely) and your sticky should snap into place.",
  },
  {
    type: "list",
    items: [
      "overflow: hidden on a parent is the #1 cause ~ even if it's set on a grandparent several levels up",
      "overflow: auto and overflow: scroll also break it, even when no scrollbar is visible",
      "position: sticky also requires a defined top / bottom / left / right value to kick in",
      "The parent must have enough height for the sticky element to actually travel within",
    ],
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
