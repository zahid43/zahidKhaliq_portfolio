"use client";

import Image from "next/image";
import AvatarGraphic from "@/components/ReusableSvgs/AvatarGraphic";

const stats = [
  { value: "4+", label: "Years exp." },
  { value: "20+", label: "Projects" },
  { value: "3", label: "Companies" },
];

const techStack = ["React", "Next.js", "Tailwind", "Webflow"];

export default function Hero() {
  return (
    <>
      <section className="relative h-auto lg:h-200 overflow-hidden py-20 lg:py-0" id="home">

        {/* Cosmic nebula glow orbs */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-400/15 dark:bg-indigo-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet-400/15 dark:bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 dark:bg-teal-600/20 blur-3xl" />

        {/* Galaxy dust dots */}
        <div className="pointer-events-none absolute top-16 left-1/4 h-1 w-1 rounded-full bg-darkBlue/30 dark:bg-white/60" />
        <div className="pointer-events-none absolute top-32 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/45" />
        <div className="pointer-events-none absolute bottom-28 left-[15%] h-1 w-1 rounded-full bg-darkBlue/25 dark:bg-white/55" />
        <div className="pointer-events-none absolute top-1/3 right-[22%] h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/40" />
        <div className="pointer-events-none absolute bottom-1/3 right-[40%] h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/35" />
        <div className="pointer-events-none absolute top-[55%] left-[8%] h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/30" />

        {/* Spinning stars */}
        <Image src="/images/star.svg" alt="" width={28} height={28}
          className="pointer-events-none absolute top-14 right-[26%] opacity-20 dark:opacity-45 animate-spin [animation-duration:15s]" />
        <Image src="/images/star.svg" alt="" width={18} height={18}
          className="pointer-events-none absolute bottom-20 left-14 opacity-15 dark:opacity-35 animate-spin [animation-duration:22s] [animation-direction:reverse]" />
        <Image src="/images/star.svg" alt="" width={12} height={12}
          className="pointer-events-none absolute top-[45%] left-[38%] opacity-10 dark:opacity-30 animate-spin [animation-duration:10s]" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden opacity-25 dark:opacity-40">
          <Image src="/images/graphics01.svg" alt="Hero" width={1920} height={1080} />
        </div>
        <div className="hero-gradient" />

        <div className="container h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] z-1 relative h-full gap-16 lg:gap-0">

            <div className="grid place-items-center order-first lg:order-none text-center lg:text-left">
              <div className="w-full">

                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 mb-5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Available for work</span>
                </div>

                {/* Name + title */}
                <h1 className="font-black leading-[1.05] mb-2">
                  Zahid<br />
                  <span className="text-accent">Khaliq</span>
                </h1>
                <p className="text-base font-medium text-darkBlue/60 dark:text-white/55 mb-4 uppercase tracking-widest">
                  Frontend Engineer
                </p>

                {/* Description */}
                <p className="text-sm leading-relaxed text-darkBlue/70 dark:text-white/65 max-w-md mx-auto lg:mx-0">
                  Crafting fast, beautiful, and accessible web experiences — from pixel-perfect UI to production-ready code.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 justify-center lg:justify-start">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {i > 0 && <div className="h-8 w-px bg-darkBlue/15 dark:bg-white/15" />}
                      <div>
                        <p className="text-2xl font-black text-darkBlue dark:text-white">{stat.value}</p>
                        <p className="text-xs text-darkBlue/50 dark:text-white/45 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3 mt-7 justify-center lg:justify-start flex-wrap">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/85 hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]"
                  >
                    Contact me
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full border border-darkBlue/15 dark:border-white/15 px-6 py-2.5 text-sm font-semibold text-darkBlue/70 dark:text-white/70 hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    View work ↓
                  </a>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                  {techStack.map((t) => (
                    <span key={t} className="text-[11px] font-medium px-3 py-1 rounded-full bg-darkBlue/5 dark:bg-white/8 border border-darkBlue/10 dark:border-white/10 text-darkBlue/60 dark:text-white/55">
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            <div className="hidden lg:block relative self-stretch">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-accent/40 to-transparent" />
            </div>

            <div className="grid place-items-center order-last lg:order-none">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-130 lg:h-130 mt-10 lg:mt-0 mx-auto">
                {/* Galaxy glow halo behind the circle */}
                <div className="absolute inset-0 scale-125 rounded-full bg-linear-to-br from-indigo-300/25 via-violet-300/20 to-teal-300/25 dark:from-indigo-600/30 dark:via-violet-700/25 dark:to-teal-600/20 blur-3xl" />
                <div className="circle w-full h-full rounded-full bg-linear-to-br from-violet-100 via-indigo-100 to-teal-50 dark:from-[#100828] dark:via-[#0d0620] dark:to-[#071a14] relative overflow-hidden">
                  {/* Inner spinning stars */}
                  <Image src="/images/star.svg" alt="" width={32} height={32} className="pointer-events-none absolute top-[15%] right-[20%] opacity-40 dark:opacity-60 animate-spin [animation-duration:14s]" />
                  <Image src="/images/star.svg" alt="" width={20} height={20} className="pointer-events-none absolute bottom-[30%] left-[12%] opacity-30 dark:opacity-50 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
                  <Image src="/images/star.svg" alt="" width={14} height={14} className="pointer-events-none absolute top-[45%] right-[8%] opacity-25 dark:opacity-45 animate-spin [animation-duration:9s]" />

                  {/* Galaxy dust dots */}
                  <div className="pointer-events-none absolute top-[20%] left-[30%] h-2 w-2 rounded-full bg-darkBlue/25 dark:bg-white/60" />
                  <div className="pointer-events-none absolute top-[50%] right-[30%] h-1.5 w-1.5 rounded-full bg-darkBlue/20 dark:bg-white/40" />
                  <div className="pointer-events-none absolute bottom-[20%] left-[40%] h-2 w-2 rounded-full bg-darkBlue/20 dark:bg-white/50" />
                </div>
                <div className="absolute -top-12 lg:-top-20 left-0 w-full overflow-hidden rounded-b-full h-[calc(100%+3rem)] lg:h-[calc(100%+5rem)]">
                  <Image src="/images/zahidTransparent.png" alt="Zahid Khaliq" fill style={{ objectFit: "contain", objectPosition: "bottom center" }} />
                </div>

                {/* Shapes — after photo so they render in front */}
                <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                  <div className="bg-accent w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl absolute top-10 lg:top-14 left-0 lg:left-5 rotate-45 animate-spin [animation-duration:10s]" />
                  <AvatarGraphic className="w-11/12 mt-12 sm:mt-16 lg:mt-25 ml-4 sm:ml-6 lg:ml-8" />
                  <div className="bg-violet-600 w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl absolute bottom-8 lg:bottom-14 right-0 lg:right-5 rotate-45 animate-spin [animation-duration:5s]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
