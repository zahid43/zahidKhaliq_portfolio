import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 2,
  slug: "nextjs-app-router",
  title: "Next.js App Router: The Mental Model You Need",
  excerpt:
    "Server components, client boundaries, and the new data fetching patterns ~ once the mental model clicks, everything becomes obvious.",
  date: "Feb 2026",
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

  // ── Intro ────────────────────────────────────────────────────────────────────
  {
    type: "paragraph",
    text: "The App Router confused me for weeks. I kept reaching for getServerSideProps that didn't exist, wrapping everything in 'use client' out of habit, and wondering why my data fetching felt wrong. The moment it clicked was when I stopped thinking about routing and started thinking about components.",
  },
  {
    type: "quote",
    text: "The App Router isn't a new way to route — it's a new way to think about where your code runs.",
  },

  // ── The Core Model ───────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Server First, Client When Needed",
  },
  {
    type: "paragraph",
    text: "Every component in the App Router is a Server Component by default. Server Components run only on the server — they can be async, they can fetch data directly, and they never ship JavaScript to the browser. That's the key insight: the default behavior reduces your bundle size automatically.",
  },
  {
    type: "list",
    items: [
      "Server Components — run on the server, can be async, no browser APIs, no hooks, no event handlers",
      "Client Components — marked with 'use client', run on both server (for the initial HTML) and client, can use hooks, state, browser APIs",
      "The boundary is opt-in — you choose which components go client, everything else stays server",
    ],
  },
  {
    type: "paragraph",
    text: "This is backwards from what we were used to. In the Pages Router, everything was client-side by default unless you explicitly moved it to getServerSideProps. Now everything is server-side by default unless you explicitly opt into 'use client'.",
  },

  // ── Data Fetching ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Data Fetching Without the Ceremony",
  },
  {
    type: "paragraph",
    text: "This is my favourite part. Because Server Components can be async, you just await your data directly in the component. No useEffect, no useState, no getServerSideProps — just async/await like you'd write any Node.js code.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "app/posts/page.tsx",
    code: `// This is a Server Component — async by default, no 'use client' needed
export default async function PostsPage() {
  // Fetch directly — no useEffect, no loading state, no useState
  const posts = await fetch("https://api.example.com/posts").then(r => r.json());

  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    type: "paragraph",
    text: "Next.js extends the native fetch API with caching options. By default, fetches in Server Components are cached. You can opt out with { cache: 'no-store' } for always-fresh data, or use { next: { revalidate: 60 } } for ISR-style revalidation.",
  },

  // ── When to use client ───────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "When to Reach for 'use client'",
  },
  {
    type: "paragraph",
    text: "The rule I follow: stay server until you can't. You need 'use client' when your component uses any of these:",
  },
  {
    type: "list",
    items: [
      "useState or useReducer — for local state",
      "useEffect — for side effects and browser-only code",
      "Event handlers — onClick, onChange, onSubmit, etc.",
      "Browser APIs — window, document, localStorage, navigator",
      "Third-party client-only libraries — most animation libraries, drag-and-drop, etc.",
      "Context providers with dynamic values — the provider needs 'use client', consumers don't necessarily",
    ],
  },
  {
    type: "code",
    language: "tsx",
    filename: "components/SearchBar.tsx",
    code: `"use client"; // <-- only here because we need useState and onChange

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}`,
  },
  {
    type: "paragraph",
    text: "Marking a file 'use client' creates a boundary — that component and everything it imports becomes client code. So keep client components as small as possible and push them toward the leaves of your component tree.",
  },

  // ── File conventions ─────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "The File Conventions You Actually Use",
  },
  {
    type: "paragraph",
    text: "The App Router uses special filenames to handle states that used to require manual wiring. You don't need to learn them all at once — these four cover 95% of real apps:",
  },
  {
    type: "list",
    items: [
      "page.tsx — the actual route UI, exported as default",
      "layout.tsx — wraps all pages in its segment and their children, persists across navigation",
      "loading.tsx — shown automatically while the page is streaming in, built on React Suspense",
      "error.tsx — catches runtime errors in the segment, must be a Client Component",
    ],
  },
  {
    type: "code",
    language: "tsx",
    filename: "app/posts/loading.tsx",
    code: `// Shown automatically while posts/page.tsx is fetching
// No manual Suspense boundary or loading state needed
export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}`,
  },

  // ── The biggest mistake ───────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "The Most Common Mistake",
  },
  {
    type: "paragraph",
    text: "Putting 'use client' at the top of every file. I see this constantly — developers who are used to the Pages Router and just want things to work, so they mark everything as client. It works, but you lose all the benefits: larger bundles, no async components, no direct data fetching.",
  },
  {
    type: "paragraph",
    text: "The better habit: start every new component without 'use client'. Only add it when TypeScript or the Next.js error tells you a hook or browser API is being used in a Server Component. Let the errors guide you to the boundary.",
  },

  // ── Closing ───────────────────────────────────────────────────────────────────
  {
    type: "quote",
    text: "Server Component for data, layout, and static UI. Client Component for interactivity. Keep the boundary as far down the tree as possible. That's the whole mental model.",
  },
  {
    type: "link",
    href: "https://nextjs.org/docs/app/building-your-application/rendering",
    text: "Next.js Rendering Docs",
    description: "Official deep-dive into Server and Client Components, Streaming, and the rendering lifecycle",
    copyable: false,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
