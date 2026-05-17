import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type BlogPost } from "@/lib/blog";
import type { ContentBlock } from "@/lib/blog-types";
import { BlogArticle, FloatingDock, RelativeDate } from "@/components/Blog";
import { Footer } from "@/components/HomePage";
import ScrollProgress from "@/components/ScrollProgress";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryText: Record<string, string> = {
  CSS: "text-violet-600 dark:text-violet-400",
  "Next.js": "text-teal-600 dark:text-teal-400",
  A11y: "text-indigo-600 dark:text-indigo-400",
  Animation: "text-pink-600 dark:text-pink-400",
  React: "text-cyan-600 dark:text-teal-400",
  JavaScript: "text-orange-600 dark:text-orange-400",
};

// ─── Static params & metadata ─────────────────────────────────────────────────

export async function generateStaticParams() {
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── Related card ─────────────────────────────────────────────────────────────

function RelatedCard({ post }: { post: BlogPost }) {
  const tc = categoryText[post.category] ?? "text-accent";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative bg-gradient-to-br ${post.color.gradient} border ${post.color.border} rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className={`pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full ${post.color.glow} blur-2xl`} />
      <Image
        src="/images/star.svg"
        alt=""
        width={11}
        height={11}
        className="pointer-events-none absolute top-3 right-4 opacity-20 dark:opacity-45 animate-spin [animation-duration:14s]"
      />
      <div className="relative z-10">
        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${tc} block mb-2`}>
          {post.category}
        </span>
        <p className="text-[13px] font-bold leading-snug text-darkBlue dark:text-white/90 group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-3">
          {post.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-darkBlue/30 dark:text-white/25">{post.date}</span>
          <span className={`text-[11px] font-semibold ${tc} flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200`}>
            Read <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Prev / Next card ─────────────────────────────────────────────────────────

function PrevNextCard({ post, direction }: { post: BlogPost; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative bg-gradient-to-br ${post.color.gradient} border ${post.color.border} rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isPrev ? "items-start" : "items-end text-right"} flex flex-col gap-2`}
    >
      <div className={`pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full ${post.color.glow} blur-2xl`} />
      <Image
        src="/images/star.svg"
        alt=""
        width={11}
        height={11}
        className="pointer-events-none absolute top-3 right-4 opacity-20 dark:opacity-45 animate-spin [animation-duration:16s]"
      />
      <div className="relative z-10 flex flex-col gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/35 dark:text-white/25">
          {isPrev ? "← Previous" : "Next →"}
        </span>
        <span className={`inline-flex items-center self-start text-[9px] font-bold px-2 py-0.5 rounded-full border ${post.color.badge}`}>
          {post.category}
        </span>
        <span className="text-[12.5px] font-semibold leading-snug text-darkBlue/75 dark:text-white/65 group-hover:text-darkBlue dark:group-hover:text-white transition-colors duration-200 line-clamp-2">
          {post.title}
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post || !post.content) notFound();

  const published = posts.filter((p) => !!p.slug);
  const idx = published.findIndex((p) => p.slug === slug);
  const prevPost = idx > 0 ? published[idx - 1] : null;
  const nextPost = idx < published.length - 1 ? published[idx + 1] : null;
  const related = posts
    .filter((p) => p.slug && p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const tc = categoryText[post.category] ?? "text-accent";

  // TOC extraction (server-side)
  const toc = post.content
    .filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ text: b.text, level: b.level }));

  return (
    <>
      <ScrollProgress />
      <FloatingDock toc={toc} />

      {/* ── Top banner ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-10 lg:py-14">

        {/* Cosmic nebula — same as homepage */}
        <div className="hero-gradient" />
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-400/15 dark:bg-indigo-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-violet-400/15 dark:bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 dark:bg-teal-600/18 blur-3xl" />

        {/* Spinning stars */}
        <Image
          src="/images/star.svg"
          alt=""
          width={28}
          height={28}
          className="pointer-events-none absolute top-[10%] left-[10%] opacity-20 dark:opacity-45 animate-spin [animation-duration:15s]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={18}
          height={18}
          className="pointer-events-none absolute top-[20%] right-[14%] opacity-15 dark:opacity-30 animate-spin [animation-duration:22s] [animation-direction:reverse]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={12}
          height={12}
          className="pointer-events-none absolute bottom-[16%] left-[30%] opacity-10 dark:opacity-22 animate-spin [animation-duration:18s]"
        />

        {/* Galaxy dots */}
        <div className="pointer-events-none absolute top-[30%] right-[8%] h-2 w-2 rounded-full bg-darkBlue/20 dark:bg-white/45" />
        <div className="pointer-events-none absolute bottom-[24%] left-[6%] h-1.5 w-1.5 rounded-full bg-darkBlue/15 dark:bg-white/35" />
        <div className="pointer-events-none absolute top-[55%] right-[25%] h-[3px] w-[3px] rounded-full bg-darkBlue/12 dark:bg-white/28" />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_300px] gap-8 items-center">

            {/* Left — text */}
            <div>
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-darkBlue/50 dark:text-white/45 hover:text-accent dark:hover:text-accent transition-colors duration-200 mb-8 group"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                Back to Blog
              </Link>

              {/* Category badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${post.color.badge}`}>
                  {post.category}
                </span>
              </div>

              {/* Post title */}
              <h1 className="text-[1.75rem] md:text-[2.25rem] font-black leading-[1.1] text-darkBlue dark:text-foreground tracking-tight max-w-2xl mb-3">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-[14px] leading-relaxed text-darkBlue/50 dark:text-white/42 max-w-xl mb-4">
                {post.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-2 flex-wrap">
                <RelativeDate dateStr={post.date} />
                <span className="h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/20" />
                <span className="text-[11px] text-darkBlue/45 dark:text-white/38">{post.readTime}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/20" />
                <span className="text-[11px] text-darkBlue/45 dark:text-white/38">By Zahid Khaliq</span>
              </div>
            </div>

            {/* Right — decorative image */}
            <div className="hidden md:flex items-center justify-center relative">
              {/* Glow behind image */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/20 via-violet-400/15 to-teal-400/15 dark:from-indigo-600/30 dark:via-violet-600/25 dark:to-teal-600/20 blur-3xl scale-125" />
              <Image
                src="/images/circles.svg"
                alt=""
                width={260}
                height={260}
                className="relative opacity-30 dark:opacity-20 animate-spin [animation-duration:40s]"
              />
              {/* Spinning stars layered over */}
              <Image
                src="/images/star.svg"
                alt=""
                width={22}
                height={22}
                className="absolute top-[15%] right-[12%] opacity-40 dark:opacity-60 animate-spin [animation-duration:10s]"
              />
              <Image
                src="/images/star.svg"
                alt=""
                width={14}
                height={14}
                className="absolute bottom-[18%] left-[10%] opacity-30 dark:opacity-45 animate-spin [animation-duration:16s] [animation-direction:reverse]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Main two-column layout ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-10 pb-16">

        {/* Cosmic nebula — same as homepage */}
        <div className="hero-gradient" />
        <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-indigo-400/8 dark:bg-indigo-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 rounded-full bg-violet-400/8 dark:bg-violet-600/12 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-60 w-60 rounded-full bg-teal-400/6 dark:bg-teal-600/10 blur-3xl" />

        {/* Spinning stars */}
        <Image
          src="/images/star.svg"
          alt=""
          width={14}
          height={14}
          className="pointer-events-none absolute top-[8%] right-[7%] opacity-10 dark:opacity-25 animate-spin [animation-duration:20s]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={9}
          height={9}
          className="pointer-events-none absolute bottom-[12%] left-[8%] opacity-8 dark:opacity-18 animate-spin [animation-duration:28s] [animation-direction:reverse]"
        />

        {/* Galaxy dots */}
        <div className="pointer-events-none absolute top-[18%] right-[5%] h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/28" />
        <div className="pointer-events-none absolute bottom-[22%] left-[4%] h-[3px] w-[3px] rounded-full bg-darkBlue/10 dark:bg-white/22" />

        <div className="container relative z-10">
          <article className="max-w-3xl mx-auto">
            <BlogArticle content={post.content} color={post.color} />
          </article>
        </div>
      </section>

      {/* ── Related posts ─────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="relative pb-14">
          <div className="container">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-8">
              <span className="h-[2px] w-4 rounded-full bg-accent" />
              More in {post.category}
              <span className="h-[2px] w-4 rounded-full bg-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Prev / Next ───────────────────────────────────────────────────────── */}
      <div className="container pb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mb-6" />
        <div className={`grid gap-4 ${prevPost && nextPost ? "grid-cols-2" : "grid-cols-1"}`}>
          {prevPost && <PrevNextCard post={prevPost} direction="prev" />}
          {nextPost && <PrevNextCard post={nextPost} direction="next" />}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${tc} hover:gap-3 transition-all duration-200 group`}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            All posts
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
