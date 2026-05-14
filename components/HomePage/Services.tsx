"use client";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "React & Next.js Apps",
    description:
      "Building responsive, interactive UIs with React and Next.js ~ clean component architecture, smooth rendering, and polished user experiences.",
    points: ["Component architecture", "App Router & layouts", "Tailwind CSS styling", "State management (hooks / Zustand)"],
    cardGradient: "from-indigo-50 via-blue-50 to-violet-100 dark:from-[#06061e] dark:via-[#0a0828] dark:to-[#100a30]",
    borderColor: "border-indigo-200/80 dark:border-indigo-500/20 hover:border-indigo-400/50 dark:hover:border-indigo-400/40",
    glowColor: "bg-indigo-400/20 dark:bg-indigo-500/25",
    badgeColor: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30",
    dotColor: "bg-indigo-500",
    icon: (
      <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "HTML / CSS / SCSS",
    description:
      "Pixel-perfect UI implementation from any Figma or design file ~ clean, maintainable, and cross-browser ready.",
    points: ["Bootstrap 5 layouts", "Custom SCSS architecture", "BEM / utility-first", "Cross-browser compatibility"],
    cardGradient: "from-violet-50 via-purple-50 to-fuchsia-100 dark:from-[#0e0520] dark:via-[#140728] dark:to-[#1c0a32]",
    borderColor: "border-violet-200/80 dark:border-violet-500/20 hover:border-violet-400/50 dark:hover:border-violet-400/40",
    glowColor: "bg-violet-400/20 dark:bg-violet-500/25",
    badgeColor: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300/50 dark:border-violet-500/30",
    dotColor: "bg-violet-500",
    icon: (
      <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Shopify & WordPress UI",
    description:
      "Crafting storefront themes, landing pages, and CMS templates ~ plus designing layouts handed off to ROR, PHP, and backend teams.",
    points: ["Shopify Liquid theme UI", "WordPress theme & page design", "Layout handoff for ROR / PHP teams", "Headless CMS frontend integration"],
    cardGradient: "from-amber-50 via-orange-50 to-yellow-100 dark:from-[#1a1005] dark:via-[#1e1205] dark:to-[#241508]",
    borderColor: "border-amber-200/80 dark:border-amber-500/20 hover:border-amber-400/50 dark:hover:border-amber-400/40",
    glowColor: "bg-amber-400/20 dark:bg-amber-500/25",
    badgeColor: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30",
    dotColor: "bg-amber-500",
    icon: (
      <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    title: "Responsive Design & Animations",
    description:
      "Bringing designs to life with fluid layouts, smooth transitions, and delightful micro-interactions ~ looking great on every screen size.",
    points: ["Mobile-first responsive layouts", "CSS & Framer Motion animations", "Micro-interactions & transitions", "Figma to code handoff"],
    cardGradient: "from-teal-50 via-emerald-50 to-cyan-100 dark:from-[#031a14] dark:via-[#051e16] dark:to-[#062018]",
    borderColor: "border-teal-200/80 dark:border-teal-500/20 hover:border-teal-400/50 dark:hover:border-teal-400/40",
    glowColor: "bg-teal-400/20 dark:bg-teal-500/25",
    badgeColor: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-500/30",
    dotColor: "bg-teal-500",
    icon: (
      <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M6 8l3 3-3 3" />
        <line x1="13" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
];

export default function Services() {
  const [flippedIdx, setFlippedIdx] = useState<number | null>(null);

  const toggle = (i: number) => setFlippedIdx(prev => prev === i ? null : i);

  return (
    <section aria-label="Services" className="relative overflow-hidden py-16 lg:py-24">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-teal-400/10 dark:bg-teal-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />

      <Image src="/images/star.svg" alt="" width={20} height={20}
        className="pointer-events-none absolute top-[12%] left-[18%] opacity-25 dark:opacity-45 animate-spin [animation-duration:14s]" />
      <Image src="/images/star.svg" alt="" width={13} height={13}
        className="pointer-events-none absolute bottom-[18%] right-[22%] opacity-20 dark:opacity-35 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Services
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">What I Build</h4>
          <p className="text-sm text-muted mt-3 max-w-md mx-auto">
            From Figma to deployment ~ I cover the full frontend spectrum, with deep experience in the tools that ship fast and scale well.
          </p>
        </div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const isFlipped = flippedIdx === i;
            return (
              <div
                key={service.title}
                className="group h-72 perspective-[1000px] cursor-pointer"
                onClick={() => toggle(i)}
                onMouseLeave={() => flippedIdx === i && setFlippedIdx(null)}
              >
                {/* Flip container */}
                <div className={`relative w-full h-full transform-3d transition-transform duration-500
                  group-hover:transform-[rotateY(180deg)]
                  ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}
                >
                  {/* ── Front ── */}
                  <div className={`absolute inset-0 backface-hidden overflow-hidden rounded-2xl border bg-linear-to-br ${service.cardGradient} ${service.borderColor} flex flex-col items-center justify-center gap-4 p-6 text-center`}>
                    {/* Glow orb */}
                    <div className={`pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full ${service.glowColor} blur-2xl`} />
                    {/* Spinning star */}
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="pointer-events-none absolute top-4 right-5 opacity-20 dark:opacity-50 animate-spin [animation-duration:12s]">
                      <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5Z" />
                    </svg>

                    {/* Icon */}
                    <div className={`relative z-10 rounded-2xl p-3.5 border bg-linear-to-br ${service.badgeColor}`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h6 className="relative z-10 font-bold leading-snug">{service.title}</h6>

                    {/* Hint */}
                    <span className="relative z-10 text-[10px] uppercase tracking-widest text-foreground/30 flex items-center gap-1.5">
                      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
                      </svg>
                      Tap to explore
                    </span>
                  </div>

                  {/* ── Back ── */}
                  <div className={`absolute inset-0 backface-hidden transform-[rotateY(180deg)] overflow-hidden rounded-2xl border bg-linear-to-br ${service.cardGradient} ${service.borderColor} flex flex-col p-6`}>
                    {/* Glow orb */}
                    <div className={`pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full ${service.glowColor} blur-2xl`} />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Title */}
                      <h6 className="font-bold text-sm mb-2">{service.title}</h6>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-muted mb-4">{service.description}</p>

                      {/* Points */}
                      <ul className="flex flex-col gap-2 mt-auto">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-center gap-2 text-xs text-foreground/70">
                            <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
