"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";

const comments = [
  {
    name: "Ayesha Khan",
    desc: "Zahid brings a rare mix of clean engineering and thoughtful design taste. Every handoff felt calm, clear, and production-ready.",
    position: "Product Lead",
    linkedinUrl: "/",
  },
  {
    name: "Hamza Malik",
    desc: "He understood the brief quickly, improved the interaction details, and shipped a polished experience without overcomplicating the build.",
    position: "Founder, Studio Nine",
    linkedinUrl: "/",
  },
  {
    name: "Sarah Ahmed",
    desc: "The work had that extra layer of care you notice immediately: responsive layouts, smooth states, and code that was easy to maintain.",
    position: "UX Designer",
    linkedinUrl: "/",
  },
  {
    name: "Bilal Raza",
    desc: "A dependable collaborator who keeps momentum high. Zahid made the frontend feel elegant while staying practical about timelines.",
    position: "Engineering Manager",
    linkedinUrl: "/",
  },
];

const bgColors = [
  "bg-amber-200",
  "bg-blue-200",
  "bg-rose-200",
  "bg-green-200",
  "bg-pink-200",
  "bg-teal-200",
  "bg-lime-200",
  "bg-orange-200",
];

function getBgClass(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
}

export default function Endorsements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % comments.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? comments.length - 1 : current - 1
    );
  }, []);

  // Auto-play — pauses on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) goToNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToPrev, goToNext]);

  const stackedComments = useMemo(
    () =>
      comments.map((comment, index) => ({
        ...comment,
        stackPosition:
          (index - activeIndex + comments.length) % comments.length,
      })),
    [activeIndex]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? goToNext() : goToPrev();
    touchStartX.current = null;
  };

  return (
    <section className="container mt-40 overflow-hidden">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-darkBlue/50 dark:text-white/45">
          Endorsements
        </p>
        <h4>What People Say</h4>
      </div>

      <div
        className="relative mx-auto mt-24 flex min-h-[360px] max-w-[520px] items-center justify-center sm:min-h-[410px]"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-x-8 top-8 h-64 rounded-[2rem] bg-gradient-to-br from-amber-200/60 via-blue-200/50 to-teal-200/60 blur-3xl dark:from-amber-400/20 dark:via-blue-500/20 dark:to-teal-400/20" />

        {/* Decorative shapes */}
        <div className="pointer-events-none" aria-hidden>
          <div className="bg-purple-500 absolute -left-20 top-15 h-5 w-5 rounded-full opacity-50 animate-ping [animation-duration:3s]" />
          <div className="bg-blue-500 absolute -left-20 top-1/2 h-10 w-10 rotate-45 rounded-xl opacity-80 animate-spin [animation-duration:10s]" />
          <div className="bg-purple-500 absolute -left-5 bottom-10 h-5 w-5 rounded-full opacity-60 animate-ping [animation-duration:1s]" />
          <div className="bg-teal-400 absolute -right-14 top-8 h-10 w-10 rotate-45 rounded-xl opacity-80 animate-spin [animation-duration:7s]" />
          <div className="bg-blue-400 absolute -right-6 bottom-20 h-4 w-4 rounded-full opacity-50 animate-ping [animation-duration:4s]" />
          <div className="bg-purple-400 absolute -right-10 top-1/2 h-3 w-3 rounded-full opacity-40 animate-ping [animation-duration:6s]" />
        </div>

        {stackedComments.map(({ name, desc, position, linkedinUrl, stackPosition }) => {
          const isVisible = stackPosition < 4;
          const isActive = stackPosition === 0;
          const initial = name.trim()[0] || "?";
          const translateY = stackPosition * 18;
          const translateX = stackPosition * 12;
          const rotate = stackPosition === 0 ? 0 : stackPosition * -5;
          const scale = 1 - stackPosition * 0.055;

          return (
            <article
              key={name}
              aria-hidden={!isActive}
              className={[
                "absolute w-[min(88vw,360px)] rounded-[2rem] border border-black/10 bg-amber-100 px-6 pb-7 pt-20 text-center shadow-2xl shadow-slate-900/15 transition-all duration-500 ease-out dark:border-white/10 dark:bg-darkBlue dark:shadow-black/30",
                isVisible ? "opacity-100" : "pointer-events-none opacity-0",
                isActive ? "z-30" : "pointer-events-none",
              ].join(" ")}
              style={{
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex: 40 - stackPosition,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-5 top-16 select-none font-serif text-7xl leading-none text-darkBlue/10 dark:text-white/10"
              >
                &ldquo;
              </span>

              <div
                className={`absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-3xl font-bold text-darkBlue shadow-lg dark:border-darkBlue ${getBgClass(name)}`}
              >
                {initial}
              </div>

              <p className="text-[15px] leading-7 text-darkBlue/75 dark:text-white/75">
                &quot;{desc}&quot;
              </p>
              <h5 className="mt-6 text-base! font-semibold text-darkBlue dark:text-white">
                {name}
              </h5>
              <h6 className="mt-1 text-xs! uppercase tracking-[0.22em] text-darkBlue/45 dark:text-white/45">
                {position}
              </h6>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                className={[
                  "mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#0A66C2]/20 bg-[#0A66C2]/10 px-4 py-1.5 text-xs font-medium text-[#0A66C2] transition-all duration-300 hover:scale-[1.04] hover:bg-[#0A66C2]/15 dark:border-[#4fa3e0]/25 dark:bg-[#4fa3e0]/10 dark:text-[#4fa3e0] dark:hover:bg-[#4fa3e0]/20",
                  isActive ? "opacity-100 delay-200" : "pointer-events-none opacity-0",
                ].join(" ")}
              >
                <LinkedinIcon width={13} height={13} aria-hidden="true" />
                View on LinkedIn
              </a>
            </article>
          );
        })}

        <div className="absolute -bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous endorsement"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-darkBlue shadow-lg transition hover:-translate-x-0.5 hover:bg-lightBlue dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {comments.map((comment, index) => (
              <button
                key={comment.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show endorsement from ${comment.name}`}
                className={[
                  "h-2.5 rounded-full transition-all",
                  activeIndex === index
                    ? "w-8 bg-darkBlue dark:bg-white"
                    : "w-2.5 bg-darkBlue/20 hover:bg-darkBlue/40 dark:bg-white/25 dark:hover:bg-white/45",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next endorsement"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-darkBlue shadow-lg transition hover:translate-x-0.5 hover:bg-lightBlue dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
