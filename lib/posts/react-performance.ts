import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 7,
  slug: "react-performance",
  title: "React Performance: Stop Guessing, Start Measuring",
  excerpt:
    "Profiler, memo, useMemo ~ knowing when NOT to use them matters as much as knowing when to.",
  date: "Jun 2025",
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

  // ── Intro ────────────────────────────────────────────────────────────────────
  {
    type: "paragraph",
    text: "I've spent hours wrapping components in memo and sprinkling useMemo everywhere, then running a Profiler and finding it made zero difference — or occasionally made things slower. Performance optimization in React is one of those areas where instinct lies to you. Here's what I've learned from actually measuring.",
  },
  {
    type: "quote",
    text: "Premature optimization is the root of all evil. In React, that usually means memo on every component and useMemo on every calculation.",
  },

  // ── Measure first ────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Measure Before You Touch Anything",
  },
  {
    type: "paragraph",
    text: "Open React DevTools, go to the Profiler tab, hit Record, interact with the slow part of your UI, stop recording. You'll see a flame chart showing exactly which components rendered, how long each took, and why they rendered. Don't guess — this takes two minutes and tells you where the actual problem is.",
  },
  {
    type: "list",
    items: [
      "A grey component in the flame chart didn't render this cycle — it was skipped",
      "A coloured component rendered — the colour intensity shows relative render time",
      "The 'why did this render?' tooltip tells you which prop or state change triggered it",
      "Renders under ~2ms are almost always fine — don't chase those",
    ],
  },
  {
    type: "paragraph",
    text: "Most performance issues I've found in the Profiler were not what I expected. The slow component was usually two levels up from where I was looking, or a context update was triggering far more re-renders than it should have.",
  },

  // ── memo ─────────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "React.memo — Use It Sparingly",
  },
  {
    type: "paragraph",
    text: "React.memo wraps a component and skips re-rendering if its props haven't changed (shallow comparison). It sounds like a free win, but it has a cost: React now has to store the previous props and run the comparison on every parent render. For cheap components, the comparison costs more than just re-rendering.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "ExpensiveChart.tsx",
    code: `import { memo } from "react";

// memo makes sense here — rendering this component is genuinely expensive
// and its props rarely change even when the parent re-renders
const ExpensiveChart = memo(function ExpensiveChart({
  data,
  width,
}: {
  data: number[];
  width: number;
}) {
  // imagine a complex D3 calculation here
  return <svg width={width}>{/* ... */}</svg>;
});

export default ExpensiveChart;`,
  },
  {
    type: "list",
    items: [
      "Good candidate for memo — component is slow to render AND its props change less often than its parent re-renders",
      "Bad candidate — component renders fast, or its props change every time the parent renders anyway",
      "Passing object/array/function props without stabilising them defeats memo completely — the reference is new on every render",
    ],
  },

  // ── useMemo and useCallback ───────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "useMemo and useCallback — The Real Rules",
  },
  {
    type: "paragraph",
    text: "These two are overused more than any other React API. useMemo caches the result of a calculation. useCallback caches a function reference. Both have their place — but that place is not 'everywhere'.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "FilteredList.tsx",
    code: `import { useMemo, useCallback, useState } from "react";

function FilteredList({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");

  // useMemo makes sense — filtering a large array is measurably expensive
  const filtered = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  // useCallback makes sense — this is passed to a memoised child
  // Without it, the child would re-render every time because the reference changes
  const handleSelect = useCallback((item: string) => {
    console.log("Selected:", item);
  }, []); // no deps — this function never needs to change

  return <List items={filtered} onSelect={handleSelect} />;
}`,
  },
  {
    type: "paragraph",
    text: "The heuristic I use: useMemo only for calculations that take more than ~1ms (sort, filter on large datasets, complex derivations). useCallback only when the function is a dependency of another hook, or a prop to a memoised child component. Everywhere else, skip it.",
  },

  // ── State colocation ──────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "State Colocation — The Underrated Fix",
  },
  {
    type: "paragraph",
    text: "Before reaching for memo or useMemo, ask whether state is in the right place. State lifted too high in the tree causes every component below it to re-render when it changes, even components that don't use it. Moving state down to where it's actually used — colocation — is often a 5-line fix that memo can't replicate.",
  },
  {
    type: "code",
    language: "tsx",
    filename: "before-after.tsx",
    code: `// ❌ Before — query state at the top level re-renders the whole page
function Page() {
  const [query, setQuery] = useState(""); // causes ALL children to re-render
  return (
    <>
      <Header />       {/* re-renders on every keystroke, doesn't use query */}
      <SearchBar query={query} onChange={setQuery} />
      <ExpensiveList />  {/* re-renders on every keystroke, doesn't use query */}
    </>
  );
}

// ✅ After — query state colocated in SearchBar, nothing else re-renders
function Page() {
  return (
    <>
      <Header />
      <SearchBar />  {/* state lives here now */}
      <ExpensiveList />
    </>
  );
}`,
  },

  // ── Context ──────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Context Is Not a State Manager",
  },
  {
    type: "paragraph",
    text: "Context re-renders every consumer when its value changes — even if the consumer only uses one field out of ten. If you're storing a large object in context and updating it frequently, you'll see unnecessary renders across the tree. Split contexts by update frequency, or reach for Zustand or Jotai for genuinely global state that changes often.",
  },

  // ── Closing ───────────────────────────────────────────────────────────────────
  {
    type: "quote",
    text: "Profile first. Colocate state. Then, and only then, reach for memo or useMemo — and only on the specific component the Profiler pointed at.",
  },
  {
    type: "link",
    href: "https://react.dev/learn/render-and-commit",
    text: "React Docs — Render and Commit",
    description: "How React decides when to render, what the render phase actually does, and how to think about re-renders",
    copyable: false,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
