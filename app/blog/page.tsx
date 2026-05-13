"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/HomePage";
import { posts, type BlogPost } from "@/lib/blog";
import CodeBraces from "@/components/ReusableSvgs/CodeBraces";

const categoryStrip: Record<string, string> = {
  CSS: "bg-violet-500",
  "Next.js": "bg-teal-400",
  A11y: "bg-indigo-500",
  Animation: "bg-pink-500",
  TypeScript: "bg-amber-400",
  React: "bg-cyan-400",
};

const categoryText: Record<string, string> = {
  CSS: "text-violet-600 dark:text-violet-400",
  "Next.js": "text-teal-600 dark:text-teal-400",
  A11y: "text-indigo-600 dark:text-indigo-400",
  Animation: "text-pink-600 dark:text-pink-400",
  TypeScript: "text-amber-600 dark:text-amber-400",
  React: "text-cyan-600 dark:text-cyan-400",
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ post, num }: { post: BlogPost; num: string }) {
  const isPublished = !!post.slug;

  const inner = (
    <div className="relative h-full rounded-2xl overflow-hidden bg-[#06041a] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 group flex flex-col shadow-xl shadow-black/25">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-600/15 blur-3xl" />
      {/* Hover shine */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* CodeBraces watermark — top-left */}
      <div className="pointer-events-none absolute -top-3 -left-3 opacity-[0.055] text-white select-none">
        <CodeBraces width={110} height={110} />
      </div>

      {/* Number watermark — bottom-right */}
      <div className="pointer-events-none absolute -bottom-2 -right-1 select-none font-black leading-none text-white/[0.04] text-[7.5rem] tabular-nums">
        {num}
      </div>

      {/* Top accent line */}
      <div className="h-[3px] w-full flex-shrink-0 bg-linear-to-r from-violet-500 via-indigo-500 to-transparent" />

      <div className="relative z-10 flex flex-col flex-1 p-6 lg:p-8">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
            <span className="h-[2px] w-3 rounded-full bg-white/25" />
            Latest Post
          </span>
          <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${post.color.badge}`}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl lg:text-[1.4rem] font-bold text-white leading-tight mb-4">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/45 text-[13px] leading-relaxed flex-1 mb-6">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/25">{post.date}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-white/15" />
            <span className="text-[11px] text-white/25">{post.readTime}</span>
          </div>

          {isPublished ? (
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-white/80 group-hover:bg-white/[0.11] group-hover:border-white/18 group-hover:text-white transition-all duration-200">
              Read post <span className="group-hover:translate-x-0.5 inline-block transition-transform duration-200">→</span>
            </span>
          ) : (
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/20 uppercase tracking-wider">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
      {isPublished ? (
        <Link href={`/blog/${post.slug}`} className="block h-full">{inner}</Link>
      ) : inner}
    </motion.div>
  );
}

// ─── Normal Card ──────────────────────────────────────────────────────────────
function NormalCard({ post, num }: { post: BlogPost; num: string }) {
  const isPublished = !!post.slug;
  const strip = categoryStrip[post.category] ?? "bg-accent";
  const tc = categoryText[post.category] ?? "text-accent";

  const inner = (
    <div className="relative h-full rounded-2xl overflow-hidden bg-white dark:bg-[#0d0b1e] border border-black/[0.07] dark:border-white/[0.07] hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-all duration-300 group flex shadow-sm hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/30">
      {/* Colored left strip */}
      <div className={`w-[3px] flex-shrink-0 ${strip} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex flex-col flex-1 p-5 min-w-0 relative">
        {/* CodeBraces watermark — center-right */}
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.06] text-darkBlue dark:text-white select-none">
          <CodeBraces width={72} height={72} />
        </div>

        {/* Number watermark — bottom-right */}
        <div className="pointer-events-none absolute -bottom-2 -right-1 select-none font-black leading-none text-darkBlue/[0.04] dark:text-white/[0.04] text-[5.5rem] tabular-nums">
          {num}
        </div>

        {/* Top */}
        <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${tc}`}>
            {post.category}
          </span>
          <span className="font-mono text-[10px] text-darkBlue/20 dark:text-white/18 tabular-nums shrink-0">
            {num}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-[13.5px] font-bold leading-snug text-darkBlue dark:text-white/90 mb-2.5 line-clamp-3 flex-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="relative z-10 text-[11.5px] text-darkBlue/45 dark:text-white/38 leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-darkBlue/28 dark:text-white/22">{post.date}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-darkBlue/12 dark:bg-white/12" />
            <span className="text-[10px] text-darkBlue/28 dark:text-white/22">{post.readTime}</span>
          </div>

          {isPublished ? (
            <span className={`text-[11px] font-semibold ${tc} flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200`}>
              Read <span>→</span>
            </span>
          ) : (
            <span className="text-[9px] font-medium px-2 py-0.5 rounded bg-darkBlue/[0.04] dark:bg-white/[0.04] border border-darkBlue/[0.07] dark:border-white/[0.07] text-darkBlue/22 dark:text-white/18 uppercase tracking-wider">
              Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeUp}>
      {isPublished ? (
        <Link href={`/blog/${post.slug}`} className="block h-full">{inner}</Link>
      ) : inner}
    </motion.div>
  );
}

// ─── Wide Card ────────────────────────────────────────────────────────────────
function WideCard({ post, num }: { post: BlogPost; num: string }) {
  const isPublished = !!post.slug;
  const strip = categoryStrip[post.category] ?? "bg-accent";
  const tc = categoryText[post.category] ?? "text-accent";

  const inner = (
    <div className={`relative h-full rounded-2xl overflow-hidden bg-linear-to-br ${post.color.gradient} border ${post.color.border} transition-all duration-400 group flex flex-col sm:flex-row shadow-sm hover:shadow-md`}>
      {/* Top strip on mobile, left strip on sm+ */}
      <div className={`h-[3px] sm:h-auto sm:w-[3px] flex-shrink-0 ${strip} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* CodeBraces watermark — bottom-left of content area */}
      <div className="pointer-events-none absolute bottom-2 left-6 opacity-[0.04] dark:opacity-[0.06] text-darkBlue dark:text-white select-none">
        <CodeBraces width={80} height={80} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-5 lg:p-7 flex flex-col justify-between min-w-0 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${tc}`}>
              {post.category}
            </span>
          </div>
          <h3 className="text-base lg:text-[17px] font-bold leading-snug text-darkBlue dark:text-white mb-2.5">
            {post.title}
          </h3>
          <p className="text-[12.5px] text-darkBlue/52 dark:text-white/45 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-darkBlue/[0.07] dark:border-white/[0.07]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-darkBlue/32 dark:text-white/28">{post.date}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-darkBlue/12 dark:bg-white/12" />
            <span className="text-[11px] text-darkBlue/32 dark:text-white/28">{post.readTime}</span>
          </div>
          {isPublished ? (
            <span className={`text-[11px] font-semibold ${tc} flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200`}>
              Read <span>→</span>
            </span>
          ) : (
            <span className="text-[9px] font-medium px-2 py-0.5 rounded bg-darkBlue/[0.04] dark:bg-white/[0.04] border border-darkBlue/[0.07] dark:border-white/[0.07] text-darkBlue/22 dark:text-white/18 uppercase tracking-wider">
              Soon
            </span>
          )}
        </div>
      </div>

      {/* Right metadata panel */}
      <div className="hidden sm:flex flex-col items-center justify-center px-7 lg:px-10 border-l border-darkBlue/[0.07] dark:border-white/[0.07] shrink-0 gap-3 min-w-[120px] relative z-10">
        <span className="font-mono text-[3.5rem] font-black leading-none tabular-nums text-darkBlue/[0.07] dark:text-white/[0.08] select-none">
          {num}
        </span>
        <div className="h-px w-6 rounded-full bg-darkBlue/10 dark:bg-white/10" />
        <span className="text-[10px] text-darkBlue/28 dark:text-white/25 uppercase tracking-[0.18em] text-center leading-tight">
          {post.readTime}
        </span>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-3">
      {isPublished ? (
        <Link href={`/blog/${post.slug}`} className="block h-full">{inner}</Link>
      ) : inner}
    </motion.div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
function PostCard({ post, num }: { post: BlogPost; num: string }) {
  if (post.size === "featured") return <FeaturedCard post={post} num={num} />;
  if (post.size === "wide") return <WideCard post={post} num={num} />;
  return <NormalCard post={post} num={num} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const ordered = [
    ...posts.filter(p => p.size !== "wide"),
    ...posts.filter(p => p.size === "wide"),
  ];

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

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:minmax(170px,auto)] gap-4"
          >
            {ordered.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                num={String(i + 1).padStart(2, "0")}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
