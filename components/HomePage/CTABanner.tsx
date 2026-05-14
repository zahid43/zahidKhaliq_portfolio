import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="container relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-accent/20 dark:border-accent/15 bg-linear-to-br from-indigo-50 via-violet-50 to-purple-100 dark:from-[#06061e] dark:via-[#0d0828] dark:to-[#100a30] p-10 lg:p-16 shadow-2xl shadow-indigo-200/40 dark:shadow-indigo-950/60">

          {/* Background glow orbs */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-accent/20 dark:bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-violet-400/20 dark:bg-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-400/10 dark:bg-teal-500/15 blur-3xl" />

          {/* Spinning stars */}
          <Image src="/images/star.svg" alt="" width={24} height={24}
            className="pointer-events-none absolute top-6 right-[20%] opacity-30 dark:opacity-60 animate-spin [animation-duration:12s]" />
          <Image src="/images/star.svg" alt="" width={16} height={16}
            className="pointer-events-none absolute bottom-8 left-[15%] opacity-20 dark:opacity-50 animate-spin [animation-duration:18s] [animation-direction:reverse]" />
          <Image src="/images/star.svg" alt="" width={12} height={12}
            className="pointer-events-none absolute top-1/2 right-[8%] opacity-15 dark:opacity-40 animate-spin [animation-duration:10s]" />

          {/* Galaxy dust dots */}
          <div className="pointer-events-none absolute top-8 left-[35%] h-1.5 w-1.5 rounded-full bg-accent/40 dark:bg-white/50" />
          <div className="pointer-events-none absolute bottom-10 right-[30%] h-1 w-1 rounded-full bg-accent/30 dark:bg-white/35" />
          <div className="pointer-events-none absolute top-1/3 left-[8%] h-1 w-1 rounded-full bg-violet-500/40 dark:bg-white/40" />

          {/* Large background number — decorative */}
          <span className="pointer-events-none select-none absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 text-[10rem] lg:text-[14rem] font-black leading-none text-accent/5 dark:text-accent/8 hidden md:block">
            {"</>"}
          </span>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">

            {/* Text block */}
            <div className="max-w-xl">
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 mb-5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  Available for work
                </span>
              </div>

              <h3 className="font-black leading-tight mb-4">
                Let&apos;s Build{" "}
                <span className="text-accent">Something</span>{" "}
                Great
              </h3>

              <p className="text-sm leading-relaxed text-foreground/65 max-w-md mx-auto lg:mx-0">
                Whether it&apos;s a Webflow site, a React app, or a full design-to-deployment build ~ I&apos;m open to freelance projects, full-time roles, and long-term collaborations.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start a Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="mailto:zaahid.khaliq@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/8 dark:bg-accent/12 px-7 py-3 text-sm font-bold text-accent hover:bg-accent/15 hover:-translate-y-0.5 transition-all duration-200"
              >
                Send an Email
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
