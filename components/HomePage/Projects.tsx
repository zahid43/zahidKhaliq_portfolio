"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "FAX Real Estate",
    category: "Bootstrap / SCSS / Drupal",
    year: "2024",
    description:
      "A Canadian Investment and Asset Management Company. Focused on value-add opportunities to enhance returns and deliver strong risk-adjusted performance to investors.",
    tech: ["SCSS", "Bootstrap", "Drupal"],
    liveUrl: "https://www.faxrealestate.com",
    image: "/images/portfolio/p1.png",
  },
  {
    id: 2,
    title: "CreativeFaze",
    category: "Bootstrap / SCSS / Drupal",
    year: "2022",
    description:
      "A full-cycle design and tech agency delivering smart, scalable solutions — combining expert consulting, strategic design, and AI-driven automation.",
    tech: ["Bootstrap 5", "SCSS", "Drupal"],
    liveUrl: "https://www.creativefaze.com",
    image: "/images/portfolio/p3.png",
  },
  {
    id: 3,
    title: "Center of Hope Haiti",
    category: "Bootstrap / SCSS / Drupal",
    year: "2021",
    description:
      "An orphanage and school platform for the future of Haiti — featuring integrated donation capabilities and compelling mission storytelling.",
    tech: ["Bootstrap", "SCSS", "Drupal"],
    liveUrl: "https://www.centerofhope-haiti.org/",
    image: "/images/portfolio/p2.png",
  },
  {
    id: 4,
    title: "CT Health News",
    category: "Rails / TailwindCSS",
    year: "2022",
    description:
      "Connecticut's premier health news portal — featuring real-time medical coverage, career listings, and community health resources via NBC Connecticut.",
    tech: ["Tailwind", "Rails", "PostgreSQL"],
    liveUrl: "https://cthealthnews.com/",
    image: "/images/portfolio/p6.png",
  },
    {
    id: 6,
    title: "CPEC",
    category: "Webflow",
    year: "2021",
    description:
      "Professional government initiative platform with clean, corporate design and comprehensive CMS-driven content management for stakeholders.",
    tech: ["Laravel", "SCSS", "JQuery"],
    liveUrl: "#",
    image: "/images/portfolio/p3.png",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive(a => (a - 1 + projects.length) % projects.length), []);
  const next = useCallback(() => setActive(a => (a + 1) % projects.length), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const project = projects[active];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" id="projects">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-accent/8 dark:bg-accent/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/3 h-80 w-80 rounded-full bg-teal-400/8 dark:bg-teal-500/12 blur-3xl" />
      <Image src="/images/star.svg" alt="" width={20} height={20}
        className="pointer-events-none absolute top-[10%] right-[15%] opacity-25 dark:opacity-45 animate-spin [animation-duration:16s]" />
      <Image src="/images/star.svg" alt="" width={13} height={13}
        className="pointer-events-none absolute bottom-[15%] left-[20%] opacity-20 dark:opacity-35 animate-spin [animation-duration:22s] [animation-direction:reverse]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Portfolio
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">Selected Work</h4>
          <p className="text-sm text-muted mt-3 max-w-sm mx-auto">
            A curated set of projects spanning Webflow builds, React apps, and full design systems.
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">

          {/* Left: project selector */}
          <nav
            aria-label="Projects"
            className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-24 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
          >
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`relative shrink-0 lg:shrink text-left px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer
                  ${active === i
                    ? "bg-accent/10 dark:bg-accent/15 border-accent/30 shadow-sm"
                    : "border-transparent hover:bg-foreground/5 hover:border-foreground/8"
                  }`}
              >
                {active === i && (
                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-r-full bg-accent" />
                )}
                <div className="flex items-center gap-3 lg:gap-2.5">
                  <span className={`text-xs font-mono font-bold tabular-nums shrink-0 ${active === i ? "text-accent" : "text-muted"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs lg:text-sm font-semibold whitespace-nowrap lg:whitespace-normal transition-colors duration-200
                      ${active === i ? "text-foreground" : "text-foreground/70"}`}>
                      {p.title}
                    </p>
                    <p className="text-[10px] lg:text-[11px] text-muted hidden lg:block">{p.category}</p>
                  </div>
                  {active === i && (
                    <svg className="ml-auto hidden lg:block shrink-0 w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </nav>

          {/* Right: browser preview */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 dark:border-white/8 shadow-2xl shadow-black/10 dark:shadow-black/40">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-foreground/8 dark:border-white/6">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400/60 dark:bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60 dark:bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60 dark:bg-green-500/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-background/70 dark:bg-white/5 border border-foreground/8 dark:border-white/8 rounded-full px-3 py-1 w-full max-w-xs">
                    <svg className="w-2.5 h-2.5 text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-[10px] text-muted truncate">
                      {project.liveUrl === "#"
                        ? `www.${project.title.toLowerCase().replace(/\s+/g, "")}.com`
                        : project.liveUrl}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-muted shrink-0">
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Viewport */}
              <div className="relative w-full aspect-video bg-surface overflow-hidden">
                <Image
                  key={project.image}
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 340px)"
                  priority={active === 0}
                />
                {/* Bottom gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{project.category}</span>
                        <span className="h-[3px] w-[3px] rounded-full bg-white/30" />
                        <span className="text-[10px] text-white/40">{project.year}</span>
                      </div>
                      <h5 className="font-bold text-white mb-2 leading-tight">{project.title}</h5>
                      <p className="text-xs leading-relaxed text-white/65 max-w-lg hidden lg:block line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/12 hover:bg-white/22 border border-white/20 px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm group/btn"
                    >
                      Live Site
                      <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/75 backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prev}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <div className="flex items-center gap-1.5">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer
                      ${active === i
                        ? "w-5 h-1.5 bg-accent"
                        : "w-1.5 h-1.5 bg-foreground/20 dark:bg-white/20 hover:bg-accent/60"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
