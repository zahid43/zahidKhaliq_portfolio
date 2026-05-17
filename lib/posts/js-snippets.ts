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

  // ── Images missing alt text ────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Find Every Image Missing Alt Text",
  },
  {
    type: "paragraph",
    text: "A quick accessibility audit without any tooling. This logs every img element that has no alt attribute or an empty one, and highlights them in red so they're easy to spot visually.",
  },
  {
    type: "code",
    language: "javascript",
    filename: "a11y-images.js",
    code: `const bad = [...document.querySelectorAll('img')]
  .filter(img => !img.alt || img.alt.trim() === '');

bad.forEach(img => {
  img.style.outline = '3px solid red';
  console.log('Missing alt:', img.src);
});

console.log(\`Found \${bad.length} image(s) without alt text\`);`,
  },

  // ── Find largest DOM nodes ─────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Find the Heaviest Elements on the Page",
  },
  {
    type: "paragraph",
    text: "When a page feels sluggish to render, deep DOM trees are often the culprit. This snippet counts child nodes per element and surfaces the top offenders — the ones most likely to be causing layout thrashing or slow paint.",
  },
  {
    type: "code",
    language: "javascript",
    filename: "dom-weight.js",
    code: `const results = [...document.querySelectorAll('*')]
  .map(el => ({
    el,
    children: el.querySelectorAll('*').length,
    tag: el.tagName.toLowerCase(),
    classes: el.className,
  }))
  .sort((a, b) => b.children - a.children)
  .slice(0, 10);

console.table(results.map(r => ({
  tag: r.tag,
  children: r.children,
  classes: typeof r.classes === 'string' ? r.classes.slice(0, 60) : '',
})));`,
  },

  // ── Monitor all fetch calls ────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Log Every fetch Request on the Page",
  },
  {
    type: "paragraph",
    text: "Sometimes Network tab is too noisy and you just want a clean log of what URLs are being fetched and what came back. This patches the global fetch so every call prints its URL and status to the console.",
  },
  {
    type: "code",
    language: "javascript",
    filename: "fetch-logger.js",
    code: `const _fetch = window.fetch;

window.fetch = async (...args) => {
  const url = typeof args[0] === 'string' ? args[0] : args[0].url;
  console.log('[fetch →]', url);

  const res = await _fetch(...args);

  console.log(\`[fetch ←] \${res.status} \${res.statusText}\`, url);
  return res;
};

console.log('Fetch logger active. Refresh won\\'t persist this.');`,
  },
  {
    type: "paragraph",
    text: "Remember this only lasts for the current page session — a refresh wipes it. If you need something persistent, use the Network tab's filter or a browser extension instead.",
  },

  {
    type: "quote",
    text: "The browser console is one of the most underrated debugging environments. Most developers use it for console.log — it can do a lot more.",
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
