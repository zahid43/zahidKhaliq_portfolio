import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 6,
  slug: "dark-mode",
  title: "Dark Mode Done Right: CSS Variables + next-themes",
  excerpt:
    "Most dark mode implementations break on hydration or flicker on first load. Here's the SSR-safe pattern I use across all my Next.js projects ~ CSS custom properties paired with next-themes' class strategy, giving you flicker-free dark mode with proper system preference support out of the box.",
  date: "Aug 2025",
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

  // ── Intro ────────────────────────────────────────────────────────────────────
  {
    type: "paragraph",
    text: "I've implemented dark mode at least a dozen times across different projects. The first few times I did it wrong — users would see a white flash on load, or the toggle would snap instead of persist, or server and client would disagree on which theme to render. Here's the pattern I've settled on that actually works in production.",
  },
  {
    type: "quote",
    text: "A dark mode that flickers on load is worse than no dark mode. It signals to the user that something broke, even if it corrects itself in milliseconds.",
  },

  // ── The Problem ──────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Why Dark Mode Is Harder Than It Looks",
  },
  {
    type: "paragraph",
    text: "The root issue is that Next.js renders on the server — but the user's theme preference lives in the browser (localStorage or system preference). The server doesn't know which theme to render, so it makes a guess. If that guess is wrong, you get a flash of the wrong theme when the JavaScript loads and corrects it. This is called a hydration mismatch.",
  },
  {
    type: "list",
    items: [
      "localStorage is not available on the server — so you can't read the saved theme during SSR",
      "System preference (prefers-color-scheme) is a CSS media query — also not available server-side",
      "Naively toggling a class on <html> in a useEffect fires too late — after the first paint",
      "Storing theme in React state causes a mismatch between the server-rendered HTML and what the client expects",
    ],
  },

  // ── The Solution ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "The Fix: next-themes",
  },
  {
    type: "paragraph",
    text: "next-themes solves this by injecting a tiny blocking script into the <head> — before the page renders — that reads localStorage and applies the correct class to <html> synchronously. No flash. It also handles system preference, persistence, and a clean React API on top.",
  },
  {
    type: "terminal",
    title: "bash",
    commands: [
      "npm install next-themes",
    ],
  },
  {
    type: "paragraph",
    text: "Then wrap your root layout with ThemeProvider. The attribute='class' option tells it to toggle a class on the html element — this is the strategy that pairs best with Tailwind's dark mode.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "app/layout.tsx",
    code: `import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  },
  {
    type: "paragraph",
    text: "suppressHydrationWarning on the html element is intentional — next-themes modifies that element before React hydrates, which would otherwise trigger a warning. It's one of the rare places where suppressing the warning is the right call.",
  },

  // ── Tailwind config ──────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Tailwind Dark Mode Config",
  },
  {
    type: "paragraph",
    text: "Tell Tailwind to use class-based dark mode instead of the media query strategy. This matches next-themes' attribute='class' setup.",
  },
  {
    type: "code",
    language: "ts",
    filename: "tailwind.config.ts",
    code: `import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // <-- this is the key line
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // ... rest of config
} satisfies Config;`,
  },
  {
    type: "paragraph",
    text: "Now dark: utilities respond to the .dark class on html — which next-themes manages automatically. You can use dark:bg-gray-900, dark:text-white, etc. everywhere in your components.",
  },

  // ── CSS Variables ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "CSS Variables for Design Tokens",
  },
  {
    type: "paragraph",
    text: "For anything beyond Tailwind utilities — like chart colors, custom gradients, or third-party library theming — CSS custom properties are your friend. Define them in :root and override them under .dark.",
  },
  {
    type: "code",
    language: "css",
    filename: "globals.css",
    code: `:root {
  --background: 255 255 255;
  --foreground: 15 23 42;
  --accent: 99 102 241;
  --card: 248 250 252;
  --border: 226 232 240;
}

.dark {
  --background: 7 5 26;
  --foreground: 248 250 252;
  --accent: 129 140 248;
  --card: 15 12 35;
  --border: 255 255 255 / 0.08;
}`,
  },
  {
    type: "paragraph",
    text: "I store colors as space-separated RGB channels (not hex) so I can compose them with opacity in Tailwind using the slash syntax — bg-[rgb(var(--background)/0.5)] or by registering them in the theme config.",
  },

  // ── Toggle ───────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "The Toggle Component",
  },
  {
    type: "paragraph",
    text: "next-themes exposes a useTheme hook with setTheme and theme values. One thing to watch: the hook is only valid inside a client component and the theme value is undefined on first render (to avoid hydration mismatches), so always mount-guard your toggle.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "ThemeToggle.tsx",
    code: `"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render nothing until mounted — avoids hydration mismatch
  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}`,
  },

  // ── Closing ───────────────────────────────────────────────────────────────────
  {
    type: "quote",
    text: "Get the ThemeProvider in the root layout, set darkMode: 'class' in Tailwind, mount-guard anything that reads the theme. That's the whole pattern. Everything else is just styling.",
  },
  {
    type: "link",
    href: "https://github.com/pacocoursey/next-themes",
    text: "next-themes on GitHub",
    description: "Full API docs, configuration options, and examples — github.com/pacocoursey/next-themes",
    copyable: false,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
