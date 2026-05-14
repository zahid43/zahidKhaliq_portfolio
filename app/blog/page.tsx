"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/HomePage";
import { posts, type BlogPost } from "@/lib/blog";
import CodeBraces from "@/components/ReusableSvgs/CodeBraces";

const categoryText: Record<string, string> = {
  CSS: "text-violet-600 dark:text-violet-400",
  "Next.js": "text-teal-600 dark:text-teal-400",
  A11y: "text-indigo-600 dark:text-indigo-400",
  Animation: "text-pink-600 dark:text-pink-400",
  TypeScript: "text-amber-600 dark:text-amber-400",
  React: "text-cyan-600 dark:text-cyan-400",
  JavaScript: "text-orange-600 dark:text-orange-400",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

// ─── Preview Panel ────────────────────────────────────────────────────────────
function PreviewPanel({ post }: { post: BlogPost }) {
  const isPublished = !!post.slug;
  const tc = categoryText[post.category] ?? "text-accent";

  return (
    <div className="relative h-[460px] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className={`absolute inset-0 rounded-2xl overflow-hidden bg-linear-to-br ${post.color.gradient} border ${post.color.border} p-7 lg:p-9 flex flex-col shadow-md`}
        >
          {/* CodeBraces watermark */}
          <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.045] dark:opacity-6 text-darkBlue dark:text-white select-none">
            <CodeBraces width={140} height={140} />
          </div>

          {/* Post number watermark */}
          <div className="pointer-events-none absolute top-4 right-6 font-black text-[5rem] leading-none tabular-nums text-darkBlue/5 dark:text-white/6 select-none">
            {String(posts.findIndex(p => p.id === post.id) + 1).padStart(2, "0")}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border ${post.color.badge}`}>
                {post.category}
              </span>
              <span className="text-[10px] text-darkBlue/35 dark:text-white/30">{post.date}</span>
              <span className="h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/15" />
              <span className="text-[10px] text-darkBlue/35 dark:text-white/30">{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold leading-tight text-darkBlue dark:text-white mb-4">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[13px] leading-relaxed text-darkBlue/55 dark:text-white/50 flex-1 line-clamp-4">
              {post.excerpt}
            </p>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-darkBlue/8 dark:border-white/7">
              {isPublished ? (
                <Link
                  href={`/blog/${post.slug}`}
                  className={`inline-flex items-center gap-2 text-[13px] font-semibold ${tc} hover:gap-3 transition-all duration-200`}
                >
                  Read post
                  <span className="text-[16px] leading-none">→</span>
                </Link>
              ) : (
                <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-darkBlue/5 dark:bg-white/5 border border-darkBlue/8 dark:border-white/8 text-darkBlue/30 dark:text-white/25 uppercase tracking-wider">
                  Coming soon
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────
function PostRow({
  post, num, active, onHover,
}: {
  post: BlogPost; num: string; active: boolean; onHover: () => void;
}) {
  const isPublished = !!post.slug;
  const tc = categoryText[post.category] ?? "text-accent";

  const inner = (
    <div
      onMouseEnter={onHover}
      className={`group relative flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200 ${
        active
          ? "bg-foreground/4 dark:bg-white/4"
          : "hover:bg-foreground/[0.025] dark:hover:bg-white/2.5"
      }`}
    >
      {/* Active left bar */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] rounded-full bg-accent transition-all duration-300 ${
          active ? "h-[60%] opacity-100" : "h-[30%] opacity-0 group-hover:opacity-40 group-hover:h-[40%]"
        }`}
      />

      {/* Number */}
      <span className="font-mono text-[11px] tabular-nums text-foreground/22 dark:text-white/20 w-6 shrink-0 ml-1 select-none">
        {num}
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${tc} block mb-0.5`}>
          {post.category}
        </span>
        <span
          className={`text-[13.5px] font-semibold leading-snug block truncate transition-colors duration-200 ${
            active
              ? "text-foreground dark:text-white"
              : "text-foreground/65 dark:text-white/55 group-hover:text-foreground/85 dark:group-hover:text-white/80"
          }`}
        >
          {post.title}
        </span>
        <span className="lg:hidden mt-1 block text-[11.5px] leading-relaxed text-foreground/45 dark:text-white/38 line-clamp-2">
          {post.excerpt}
        </span>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] text-foreground/28 dark:text-white/25">{post.date}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-foreground/12 dark:bg-white/12" />
        <span className="text-[10px] text-foreground/22 dark:text-white/20">{post.readTime}</span>
      </div>

      {/* Arrow */}
      <svg
        aria-hidden="true"
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className={`shrink-0 transition-all duration-200 ${
          active ? "text-accent translate-x-0.5" : "text-foreground/18 dark:text-white/15 group-hover:text-foreground/45 dark:group-hover:text-white/40"
        }`}
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </div>
  );

  if (!isPublished) return <motion.div variants={fadeUp}>{inner}</motion.div>;

  return (
    <motion.div variants={fadeUp}>
      <Link href={`/blog/${post.slug}`} className="block">{inner}</Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activePost, setActivePost] = useState<BlogPost>(posts[0]);

  return (
    <>
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="hero-gradient" />
        <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/15 blur-3xl" />

        <Image src="/images/star.svg" alt="" width={22} height={22}
          className="pointer-events-none absolute top-[10%] left-[14%] opacity-25 dark:opacity-50 animate-spin [animation-duration:15s]" />
        <Image src="/images/star.svg" alt="" width={15} height={15}
          className="pointer-events-none absolute top-[18%] right-[18%] opacity-20 dark:opacity-40 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
        <Image src="/images/star.svg" alt="" width={11} height={11}
          className="pointer-events-none absolute bottom-[12%] left-[28%] opacity-15 dark:opacity-30 animate-spin [animation-duration:26s]" />

        <div className="pointer-events-none absolute top-[28%] right-[9%] h-2 w-2 rounded-full bg-darkBlue/20 dark:bg-white/50" />
        <div className="pointer-events-none absolute bottom-[28%] left-[7%] h-1.5 w-1.5 rounded-full bg-darkBlue/15 dark:bg-white/40" />

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center mb-14 lg:mb-18"
          >
            <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4">
              <span className="h-[2px] w-4 rounded-full bg-accent" />
              Mini Blog
              <span className="h-[2px] w-4 rounded-full bg-accent" />
            </span>
            <h4 className="font-bold mb-4">My Learnings</h4>
            <p className="text-darkBlue/60 dark:text-white/55 text-[15px] leading-relaxed">
              Short, practical articles on frontend development — patterns I&apos;ve adopted, tools I&apos;ve found useful, and things I wish I&apos;d learned sooner.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start max-w-5xl mx-auto">

            {/* List */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex-1 w-full space-y-1"
            >
              {/* Divider top */}
              <div className="h-px bg-foreground/6 dark:bg-white/5 mb-3" />

              {posts.map((post, i) => (
                <PostRow
                  key={post.id}
                  post={post}
                  num={String(i + 1).padStart(2, "0")}
                  active={activePost.id === post.id}
                  onHover={() => setActivePost(post)}
                />
              ))}

              {/* Divider bottom */}
              <div className="h-px bg-foreground/6 dark:bg-white/5 mt-3" />
            </motion.div>

            {/* Preview panel — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
              className="hidden lg:block w-[400px] shrink-0 sticky top-24"
            >
              <PreviewPanel post={activePost} />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
