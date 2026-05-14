import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type ContentBlock, type BlogPost } from "@/lib/blog";
import { CodeBlock, TerminalBlock, MagicLink } from "@/components/Blog";
import { Footer } from "@/components/HomePage";
import CodeBraces from "@/components/ReusableSvgs/CodeBraces";
import ReactIcon from "@/components/ReusableSvgs/React";
import TailwindIcon from "@/components/ReusableSvgs/TailwindIcon";
import NextjsIcon from "@/components/ReusableSvgs/NextjsIcon";

const categoryText: Record<string, string> = {
  CSS: "text-violet-600 dark:text-violet-400",
  "Next.js": "text-teal-600 dark:text-teal-400",
  A11y: "text-indigo-600 dark:text-indigo-400",
  Animation: "text-pink-600 dark:text-pink-400",
  TypeScript: "text-amber-600 dark:text-amber-400",
  React: "text-cyan-600 dark:text-cyan-400",
  JavaScript: "text-orange-600 dark:text-orange-400",
};

const categoryStrip: Record<string, string> = {
  CSS: "bg-violet-500",
  "Next.js": "bg-teal-400",
  A11y: "bg-indigo-500",
  Animation: "bg-pink-500",
  TypeScript: "bg-amber-400",
  React: "bg-cyan-400",
  JavaScript: "bg-orange-400",
};

export async function generateStaticParams() {
  return posts
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
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
    title: `${post.title} ~ Zahid Khaliq`,
    description: post.excerpt,
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={i}
          className="text-[15px] leading-[1.8] text-darkBlue/80 dark:text-white/70 mb-5"
        >
          {block.text}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h4
            key={i}
            className="mt-10 mb-4 flex items-center gap-3 text-xl font-bold text-darkBlue dark:text-foreground"
          >
            <span className="h-[2px] w-5 rounded-full bg-accent flex-shrink-0" />
            {block.text}
          </h4>
        );
      }
      return (
        <h3
          key={i}
          className="mt-7 mb-3 text-lg font-bold text-darkBlue dark:text-foreground"
        >
          {block.text}
        </h3>
      );

    case "terminal":
      return <TerminalBlock key={i} commands={block.commands} title={block.title} />;

    case "code":
      return (
        <CodeBlock
          key={i}
          code={block.code}
          language={block.language}
          filename={block.filename}
        />
      );

    case "list":
      return (
        <ul key={i} className="mb-6 flex flex-col gap-2.5">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-darkBlue/75 dark:text-white/70"
            >
              <span className="mt-1 text-accent text-xs opacity-70 flex-shrink-0">
                ✦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          key={i}
          className="my-7 relative pl-5 border-l-2 border-accent/60"
        >
          <div className="pointer-events-none absolute -left-2 -top-1 text-3xl text-accent/20 font-serif select-none">
            "
          </div>
          <p className="text-[15px] leading-relaxed text-darkBlue/70 dark:text-white/60 italic">
            {block.text}
          </p>
        </blockquote>
      );

    case "link":
      return (
        <MagicLink
          key={i}
          href={block.href}
          text={block.text}
          description={block.description}
          copyable={block.copyable}
        />
      );

    default:
      return null;
  }
}

// ─── Related card ─────────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: BlogPost }) {
  const tc = categoryText[post.category] ?? "text-accent";
  const strip = categoryStrip[post.category] ?? "bg-accent";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex rounded-xl overflow-hidden bg-white dark:bg-white/3 border border-black/7 dark:border-white/7 hover:border-black/14 dark:hover:border-white/14 shadow-sm hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className={`w-[3px] shrink-0 ${strip} opacity-75 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="flex flex-col flex-1 p-4 min-w-0">
        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${tc} mb-1.5`}>
          {post.category}
        </span>
        <span className="text-[13px] font-bold leading-snug text-darkBlue dark:text-white/90 group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200 line-clamp-2 flex-1 mb-3">
          {post.title}
        </span>
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
      className={`group flex flex-col gap-2 p-4 rounded-xl border ${post.color.border} bg-white/60 dark:bg-white/3 hover:bg-white dark:hover:bg-white/5 transition-all duration-300 ${isPrev ? "items-start" : "items-end text-right"}`}
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30 dark:text-white/25">
        {isPrev ? "← Previous" : "Next →"}
      </span>
      <span className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full border ${post.color.badge}`}>
        {post.category}
      </span>
      <span className="text-[12.5px] font-semibold leading-snug text-foreground/70 dark:text-white/65 group-hover:text-foreground dark:group-hover:text-white transition-colors duration-200 line-clamp-2">
        {post.title}
      </span>
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

  // Prev / Next among published posts
  const published = posts.filter((p) => !!p.slug);
  const idx = published.findIndex((p) => p.slug === slug);
  const prevPost = idx > 0 ? published[idx - 1] : null;
  const nextPost = idx < published.length - 1 ? published[idx + 1] : null;

  // Related — same category, exclude current, max 3
  const related = posts
    .filter((p) => p.slug && p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero — colors adapt to the post */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="hero-gradient" />
        <div className={`pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full ${post.color.glow} blur-3xl`} />
        <div className={`pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 rounded-full ${post.color.glowAlt} blur-3xl`} />

        {/* Stars */}
        <Image
          src="/images/star.svg" alt=""
          width={18} height={18}
          className="pointer-events-none absolute top-[12%] left-[12%] opacity-20 dark:opacity-45 animate-spin [animation-duration:15s]"
        />
        <Image
          src="/images/star.svg" alt=""
          width={12} height={12}
          className="pointer-events-none absolute top-[20%] right-[16%] opacity-15 dark:opacity-35 animate-spin [animation-duration:22s] [animation-direction:reverse]"
        />
        <div className="pointer-events-none absolute top-[35%] right-[8%] h-1.5 w-1.5 rounded-full bg-darkBlue/20 dark:bg-white/45" />
        <div className="pointer-events-none absolute bottom-[25%] left-[6%] h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/35" />

        <div className="container relative z-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-darkBlue/50 dark:text-white/45 hover:text-accent dark:hover:text-accent transition-colors duration-200 mb-10 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            Back to Blog
          </Link>

          <div className="max-w-2xl">
            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap mb-5">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${post.color.badge}`}>
                {post.category}
              </span>
              <span className="text-xs text-darkBlue/40 dark:text-white/35">{post.date}</span>
              <span className="text-xs text-darkBlue/30 dark:text-white/25">·</span>
              <span className="text-xs text-darkBlue/40 dark:text-white/35">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-darkBlue dark:text-foreground mb-5">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-[15px] leading-relaxed text-darkBlue/60 dark:text-white/50 max-w-xl">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div className="mt-8 h-px bg-linear-to-r from-accent/30 via-accent/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="relative py-10 pb-16">
        <div className={`pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-96 w-96 rounded-full ${post.color.glow} blur-3xl opacity-40`} />

        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl">
            {/* Glass card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/55 dark:bg-white/[0.025] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.06] px-7 py-9 lg:px-10 lg:py-12 shadow-sm shadow-black/5 dark:shadow-black/20">

              {/* CodeBraces — top-right */}
              <div className="pointer-events-none absolute -top-5 -right-5 opacity-[0.045] dark:opacity-[0.065] text-darkBlue dark:text-white select-none">
                <CodeBraces width={150} height={150} />
              </div>

              {/* React — top-left */}
              <div className="pointer-events-none absolute -top-4 -left-4 opacity-[0.04] dark:opacity-[0.055] text-darkBlue dark:text-white select-none">
                <ReactIcon width={120} height={120} />
              </div>

              {/* Tailwind — mid-right, partially clipped */}
              <div className="pointer-events-none absolute top-1/2 -right-8 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] text-darkBlue dark:text-white select-none">
                <TailwindIcon width={110} height={110} />
              </div>

              {/* Next.js — bottom-left */}
              <div className="pointer-events-none absolute -bottom-6 -left-6 opacity-[0.035] dark:opacity-[0.05] text-darkBlue dark:text-white select-none">
                <NextjsIcon width={130} height={130} />
              </div>

              {/* Title watermark */}
              <div className="pointer-events-none absolute bottom-0 right-0 left-0 select-none overflow-hidden h-28 flex items-end justify-end pr-4 pb-1">
                <span className="font-black text-[3.5rem] lg:text-[4.5rem] leading-none text-darkBlue/[0.028] dark:text-white/[0.035] whitespace-nowrap">
                  {post.title}
                </span>
              </div>

              {/* Content */}
              <article className="relative z-10">
                {post.content.map((block, i) => renderBlock(block, i))}
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="relative pb-12">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/35 dark:text-white/30">
                  More in {post.category}
                </span>
                <div className="flex-1 h-px bg-foreground/8 dark:bg-white/8" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {related.map((p) => (
                  <RelatedCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <div className="container pb-14">
        <div className="mx-auto max-w-2xl">
          <div className="h-px bg-linear-to-r from-transparent via-accent/20 to-transparent mb-6" />
          <div className={`grid gap-3 ${prevPost && nextPost ? "grid-cols-2" : "grid-cols-1"}`}>
            {prevPost && <PrevNextCard post={prevPost} direction="prev" />}
            {nextPost && <PrevNextCard post={nextPost} direction="next" />}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] text-foreground/35 dark:text-white/30 hover:text-accent dark:hover:text-accent transition-colors duration-200 group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              All posts
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
