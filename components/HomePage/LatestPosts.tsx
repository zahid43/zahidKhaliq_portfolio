import Link from "next/link";
import { posts } from "@/lib/blog";

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

export default function LatestPosts() {
  const published = posts.filter((p) => !!p.slug).slice(0, 3);

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-10 lg:mb-14">
          <div className="text-center flex-1">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
              <span className="h-[2px] w-4 rounded-full bg-accent" />
              From the Blog
              <span className="h-[2px] w-4 rounded-full bg-accent" />
            </span>
            <h4 className="font-bold">Latest Writings</h4>
          </div>
          <Link
            href="/blog"
            className="shrink-0 hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent group transition-all duration-200"
          >
            View all posts
            <svg
              aria-hidden="true"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {published.map((post) => {
            const tc = categoryText[post.category] ?? "text-accent";
            const strip = categoryStrip[post.category] ?? "bg-accent";

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex rounded-xl overflow-hidden bg-white dark:bg-white/3 border border-black/[0.07] dark:border-white/[0.07] hover:border-black/[0.14] dark:hover:border-white/[0.14] shadow-sm hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Color strip */}
                <div className={`w-[3px] shrink-0 ${strip} opacity-75 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex flex-col flex-1 p-5 min-w-0">
                  {/* Category + date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${tc}`}>
                      {post.category}
                    </span>
                    <span className="text-[10px] text-darkBlue/30 dark:text-white/25 shrink-0">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="text-[13.5px] font-bold leading-snug text-darkBlue dark:text-white/90 mb-2 line-clamp-2 flex-1 group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h5>

                  {/* Excerpt */}
                  <p className="text-[11.5px] text-darkBlue/45 dark:text-white/38 leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-darkBlue/28 dark:text-white/22">{post.date}</span>
                    <span className={`text-[11px] font-semibold ${tc} flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200`}>
                      Read <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "View all" */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent group transition-all duration-200"
          >
            View all posts
            <svg
              aria-hidden="true"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
