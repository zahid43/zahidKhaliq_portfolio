import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type ContentBlock } from "@/lib/blog";
import { CodeBlock, TerminalBlock } from "@/components/Blog";
import { Footer } from "@/components/HomePage";
import CodeBraces from "@/components/ReusableSvgs/CodeBraces";

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
    title: `${post.title} — Zahid Khaliq`,
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
          <h2
            key={i}
            className="mt-10 mb-4 flex items-center gap-3 text-xl font-bold text-darkBlue dark:text-foreground"
          >
            <span className="h-[2px] w-5 rounded-full bg-accent flex-shrink-0" />
            {block.text}
          </h2>
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

    default:
      return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post || !post.content) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="hero-gradient" />
        <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 rounded-full bg-cyan-400/10 dark:bg-cyan-600/15 blur-3xl" />

        {/* Stars */}
        <Image
          src="/images/star.svg"
          alt=""
          width={18}
          height={18}
          className="pointer-events-none absolute top-[12%] left-[12%] opacity-20 dark:opacity-45 animate-spin [animation-duration:15s]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={12}
          height={12}
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
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
            Back to Blog
          </Link>

          <div className="max-w-2xl">
            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap mb-5">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${post.color.badge}`}
              >
                {post.category}
              </span>
              <span className="text-xs text-darkBlue/40 dark:text-white/35">
                {post.date}
              </span>
              <span className="text-xs text-darkBlue/30 dark:text-white/25">
                ·
              </span>
              <span className="text-xs text-darkBlue/40 dark:text-white/35">
                {post.readTime}
              </span>
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
      <section className="relative py-10 pb-20">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl">
            {/* Glass card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/55 dark:bg-white/[0.025] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.06] px-7 py-9 lg:px-10 lg:py-12 shadow-sm shadow-black/5 dark:shadow-black/20">

              {/* CodeBraces watermark — top-right */}
              <div className="pointer-events-none absolute -top-5 -right-5 opacity-[0.045] dark:opacity-[0.065] text-darkBlue dark:text-white select-none">
                <CodeBraces width={150} height={150} />
              </div>

              {/* Title watermark — bottom, overflowing + clipped */}
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

      {/* Bottom nav */}
      <div className="container pb-14">
        <div className="mx-auto max-w-2xl">
          <div className="h-px bg-linear-to-r from-transparent via-accent/20 to-transparent mb-8" />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
            All posts
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
