"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/HomePage";
import { posts, type BlogPost } from "@/lib/blog";

// ─── Category config ──────────────────────────────────────────────────────────
const cfg: Record<string, { text: string; strip: string; top: string; badge: string }> = {
  CSS:        { text: "text-violet-600 dark:text-violet-400", strip: "bg-violet-500",  top: "bg-violet-500",  badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300/50 dark:border-violet-500/30" },
  "Next.js":  { text: "text-teal-600 dark:text-teal-400",    strip: "bg-teal-400",    top: "bg-teal-400",    badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-500/30" },
  A11y:       { text: "text-indigo-600 dark:text-indigo-400",strip: "bg-indigo-500",  top: "bg-indigo-500",  badge: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30" },
  Animation:  { text: "text-pink-600 dark:text-pink-400",    strip: "bg-pink-500",    top: "bg-pink-500",    badge: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-300/50 dark:border-pink-500/30" },
  TypeScript: { text: "text-amber-600 dark:text-amber-400",  strip: "bg-amber-400",   top: "bg-amber-400",   badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30" },
  React:      { text: "text-cyan-600 dark:text-cyan-400",    strip: "bg-cyan-400",    top: "bg-cyan-400",    badge: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-300/50 dark:border-cyan-500/30" },
  JavaScript: { text: "text-orange-600 dark:text-orange-400",strip: "bg-orange-400",  top: "bg-orange-400",  badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-300/50 dark:border-orange-500/30" },
};

const COLUMN_ORDER = ["React", "Next.js", "CSS", "TypeScript", "Animation", "A11y", "JavaScript"];

// ─── Kanban card ─────────────────────────────────────────────────────────────
function KanbanCard({ post, index }: { post: BlogPost; index: number }) {
  const c = cfg[post.category] ?? { text: "text-accent", strip: "bg-accent", top: "bg-accent", badge: "" };
  const isPublished = !!post.slug;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      className="group flex rounded-xl overflow-hidden bg-white dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.13] shadow-sm hover:shadow-md hover:shadow-black/8 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Left strip */}
      <div className={`w-[3px] shrink-0 ${c.strip} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex flex-col flex-1 p-4 min-w-0">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${c.text}`}>
            {post.category}
          </span>
          <span className="text-[9px] text-foreground/28 dark:text-white/22 shrink-0">{post.readTime}</span>
        </div>

        {/* Title */}
        <h6 className={`text-[13px] font-bold leading-snug text-darkBlue dark:text-white/90 mb-2 line-clamp-2 transition-colors duration-200 ${isPublished ? `group-hover:${c.text.split(" ")[0].replace("text-", "text-")}` : ""}`}>
          {post.title}
        </h6>

        {/* Excerpt */}
        <p className="text-[11px] text-darkBlue/42 dark:text-white/35 leading-relaxed line-clamp-3 flex-1 mb-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
          <span className="text-[9.5px] text-darkBlue/30 dark:text-white/22">{post.date}</span>
          {isPublished ? (
            <span className={`text-[10px] font-semibold ${c.text} flex items-center gap-0.5 group-hover:gap-1.5 transition-all duration-200`}>
              Read <span>→</span>
            </span>
          ) : (
            <span className="text-[8.5px] font-medium px-1.5 py-0.5 rounded border border-black/[0.08] dark:border-white/[0.08] text-darkBlue/25 dark:text-white/20 uppercase tracking-wider">
              Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (!isPublished) return inner;
  return <Link href={`/blog/${post.slug}`} className="block">{inner}</Link>;
}

// ─── Placeholder card ─────────────────────────────────────────────────────────
function PlaceholderCard({ category }: { category: string }) {
  const c = cfg[category] ?? { text: "text-accent", strip: "bg-accent", top: "bg-accent", badge: "" };
  return (
    <div className="flex rounded-xl overflow-hidden border border-dashed border-black/[0.08] dark:border-white/[0.07] bg-transparent">
      <div className={`w-[3px] shrink-0 ${c.strip} opacity-20`} />
      <div className="flex flex-col items-center justify-center flex-1 py-5 px-4 gap-1.5">
        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${c.text} opacity-40`}>More coming</span>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className={`h-1 w-1 rounded-full ${c.strip} opacity-25`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Kanban column ────────────────────────────────────────────────────────────
function KanbanColumn({ category, colPosts, colIndex }: { category: string; colPosts: BlogPost[]; colIndex: number }) {
  const c = cfg[category] ?? { text: "text-accent", strip: "bg-accent", top: "bg-accent", badge: "" };
  const published = colPosts.filter(p => !!p.slug).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: colIndex * 0.08, ease: "easeOut" }}
      className="w-[272px] shrink-0 flex flex-col"
    >
      {/* Column header */}
      <div className="mb-3">
        {/* Top accent bar */}
        <div className={`h-[3px] w-full rounded-full ${c.top} mb-3 opacity-80`} />
        <div className="flex items-center justify-between px-1">
          <span className={`text-[11px] font-black uppercase tracking-[0.25em] ${c.text}`}>
            {category}
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>
            {published} post{published !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        {colPosts.map((post, i) => (
          <KanbanCard key={post.id} post={post} index={i} />
        ))}
        {colPosts.length < 2 && <PlaceholderCard category={category} />}
      </div>
    </motion.div>
  );
}

// ─── Board stats bar ─────────────────────────────────────────────────────────
function BoardStats({
  published,
  comingSoon,
  topics,
}: {
  published: number;
  comingSoon: number;
  topics: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
      className="container relative z-10 mb-6"
    >
      <div className="flex items-center justify-between gap-4 px-1">
        {/* Stats chips */}
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex items-center gap-2 rounded-full border border-black/[0.07] dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[11px] font-bold text-darkBlue dark:text-white/80">{published}</span>
            <span className="text-[10px] text-darkBlue/40 dark:text-white/35 uppercase tracking-wider">Published</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-black/[0.07] dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span className="text-[11px] font-bold text-darkBlue dark:text-white/80">{comingSoon}</span>
            <span className="text-[10px] text-darkBlue/40 dark:text-white/35 uppercase tracking-wider">Coming Soon</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-black/[0.07] dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-[11px] font-bold text-darkBlue dark:text-white/80">{topics}</span>
            <span className="text-[10px] text-darkBlue/40 dark:text-white/35 uppercase tracking-wider">Topics</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-darkBlue/30 dark:text-white/25 shrink-0 select-none">
          <span>Scroll to explore</span>
          <span className="flex gap-0.5">
            <span className="h-[3px] w-[3px] rounded-full bg-current" />
            <span className="h-[3px] w-[3px] rounded-full bg-current opacity-70" />
            <span className="h-[3px] w-[3px] rounded-full bg-current opacity-40" />
          </span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const columns = COLUMN_ORDER
    .filter(cat => posts.some(p => p.category === cat))
    .map(cat => ({ category: cat, posts: posts.filter(p => p.category === cat) }));

  const published = posts.filter(p => !!p.slug).length;
  const comingSoon = posts.filter(p => !p.slug).length;
  const topics = columns.length;

  return (
    <>
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="hero-gradient" />
        <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/15 blur-3xl" />

        <Image src="/images/star.svg" alt="" width={22} height={22}
          className="pointer-events-none absolute top-[10%] left-[14%] opacity-25 dark:opacity-50 animate-spin [animation-duration:15s]" />
        <Image src="/images/star.svg" alt="" width={15} height={15}
          className="pointer-events-none absolute top-[18%] right-[18%] opacity-20 dark:opacity-40 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

        <div className="pointer-events-none absolute top-[28%] right-[9%] h-2 w-2 rounded-full bg-darkBlue/20 dark:bg-white/50" />
        <div className="pointer-events-none absolute bottom-[28%] left-[7%] h-1.5 w-1.5 rounded-full bg-darkBlue/15 dark:bg-white/40" />

        {/* Header */}
        <div className="container relative z-10 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4">
              <span className="h-[2px] w-4 rounded-full bg-accent" />
              Mini Blog
              <span className="h-[2px] w-4 rounded-full bg-accent" />
            </span>
            <h4 className="font-bold mb-3">My Learnings</h4>
            <p className="text-darkBlue/60 dark:text-white/55 text-[15px] leading-relaxed">
              Short, practical articles on frontend development ~ patterns I&apos;ve adopted, tools I&apos;ve found useful, and things I wish I&apos;d learned sooner.
            </p>
          </motion.div>
        </div>

        {/* Stats bar */}
        <BoardStats published={published} comingSoon={comingSoon} topics={topics} />

        {/* Kanban board — edge-to-edge horizontal scroll */}
        <div className="relative z-10 w-full overflow-x-auto pb-4">
          <div className="flex gap-4 px-6 lg:px-10 min-w-max">
            {columns.map((col, i) => (
              <KanbanColumn
                key={col.category}
                category={col.category}
                colPosts={col.posts}
                colIndex={i}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
