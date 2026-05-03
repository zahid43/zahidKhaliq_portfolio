import React from "react";
import Image from "next/image";
import GraphicalCard from "@/components/HomePage/GraphicalCard";
import { CodeBraces, Webflow, ReactIcon, TailwindIcon, BootstrapIcon } from "@/components/ReusableSvgs";

const expertiseItems = [
  {
    number: "1",
    title: "Webflow",
    description: "I also use Client First system for class naming structure, which allows me to build any project fast and conveniently.",
    starClass: "-bottom-4 right-20 animate-spin [animation-duration:10s] dark:[filter:brightness(1.6)]",
    cardSpecial: "-rotate-2 animate-[floatY_2s_ease-in-out_infinite] bg-linear-to-br from-teal-50 via-cyan-50 to-indigo-100 dark:from-[#041510] dark:via-[#071e1a] dark:to-[#0c1428] border-teal-200/80 dark:border-teal-500/20",
    glowClass: "bg-teal-400/30 dark:bg-teal-500/25",
  },
  {
    number: "2",
    title: "CSS / SCSS",
    description: "Clean, maintainable, and semantic CSS following modern best practices and naming conventions.",
    starClass: "-bottom-4 -left-4 animate-spin [animation-duration:8s] [animation-direction:reverse] [filter:hue-rotate(60deg)_saturate(1.2)] dark:[filter:hue-rotate(60deg)_saturate(1.2)_brightness(1.6)]",
    cardSpecial: "rotate-2 animate-[floatY_3s_ease-in-out_infinite] bg-linear-to-br from-indigo-50 via-blue-50 to-violet-100 dark:from-[#06061e] dark:via-[#0a0828] dark:to-[#100a30] border-indigo-200/80 dark:border-indigo-500/20",
    glowClass: "bg-indigo-400/30 dark:bg-indigo-500/25",
  },
  {
    number: "3",
    title: "Tailwind CSS & Bootstrap",
    description: "Rapidly crafting responsive, custom designs using utility classes without leaving the HTML.",
    starClass: "-top-4 -left-4 animate-spin [animation-duration:12s] [filter:hue-rotate(90deg)_saturate(1.1)] dark:[filter:hue-rotate(90deg)_saturate(1.1)_brightness(1.6)]",
    cardSpecial: "-rotate-2 animate-[floatY_4s_ease-in-out_infinite] bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-100 dark:from-[#0e0520] dark:via-[#140728] dark:to-[#1c0a32] border-violet-200/80 dark:border-violet-500/20",
    glowClass: "bg-violet-400/30 dark:bg-violet-500/25",
  },
  {
    number: "4",
    title: "React & Next.js",
    description: "Crafting performant, SEO-friendly apps with React and Next.js — from component design to full-stack deployment.",
    starClass: "-top-4 right-16 animate-spin [animation-duration:14s] [animation-direction:reverse] [filter:hue-rotate(160deg)_saturate(1.2)] dark:[filter:hue-rotate(160deg)_saturate(1.2)_brightness(1.6)]",
    cardSpecial: "rotate-2 animate-[floatY_3.5s_ease-in-out_infinite] bg-linear-to-br from-cyan-50 via-sky-50 to-blue-100 dark:from-[#040d18] dark:via-[#071528] dark:to-[#06122a] border-cyan-200/80 dark:border-cyan-500/20",
    glowClass: "bg-cyan-400/25 dark:bg-cyan-500/20",
  },
];

const centerIcon = {
  Icon: CodeBraces,
  bgClass: "bg-[#111] dark:bg-[#1a1830] text-white p-4 md:p-5 lg:p-7",
  size: 60,
};

// Middle ring of circles.svg scaled to 500px container (500/726)
const RING_PATH =
  "M 115.80,115.80 C 141.47,90.14 179.70,81.84 220.81,89.25 C 261.92,96.65 305.91,119.76 342.91,156.81 C 380.02,193.90 403.14,237.84 410.55,278.93 C 417.96,320.13 409.67,358.34 383.96,383.96 C 358.34,409.67 320.13,417.96 278.93,410.55 C 237.84,403.14 193.90,380.02 156.81,342.91 C 119.76,305.91 96.65,261.92 89.25,220.81 C 81.84,179.70 90.14,141.47 115.80,115.80 Z";

const orbitIcons = [
  {
    Icon: Webflow,
    bgClass: "bg-blue-600 text-white p-3 md:p-4 lg:p-5",
    size: 38,
    label: "Webflow",
    duration: "25s",
    delay: "0s",
  },
  {
    Icon: ReactIcon,
    bgClass: "bg-[#20232a] text-[#61dafb] p-3 md:p-4 lg:p-5",
    size: 38,
    label: "React",
    duration: "20s",
    delay: "-5s",
  },
  {
    Icon: TailwindIcon,
    bgClass: "bg-white text-cyan-400 p-3 md:p-4 lg:p-5 shadow-xl border border-gray-100 dark:border-white/10",
    size: 38,
    label: "Tailwind",
    duration: "28s",
    delay: "-14s",
  },
  {
    Icon: BootstrapIcon,
    bgClass: "bg-purple-600 text-white p-3 md:p-4 lg:p-5",
    size: 38,
    label: "Bootstrap",
    duration: "22s",
    delay: "-16.5s",
  },
];

export default function Expertise() {
  return (
    <>
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
      <section id="about-me" className="relative">
        {/* Galaxy glow orbs */}
        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-teal-400/10 dark:bg-teal-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-20 h-80 w-80 rounded-full bg-indigo-400/10 dark:bg-indigo-600/15 blur-3xl" />

        {/* Section stars */}
        <Image src="/images/star.svg" alt="" width={24} height={24}
          className="pointer-events-none absolute top-10 left-[15%] opacity-30 dark:opacity-50 animate-spin [animation-duration:14s]" />
        <Image src="/images/star.svg" alt="" width={16} height={16}
          className="pointer-events-none absolute bottom-10 right-[15%] opacity-20 dark:opacity-40 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] z-1 relative gap-y-16 lg:gap-y-0">

            {/* Icon wheel — left */}
            <div className="w-full flex items-center justify-center order-last lg:order-0 py-8 lg:py-0 lg:pr-16 overflow-hidden">
              <div className="bg-circles w-full aspect-square relative max-w-[500px]">

                {/* Nebula glow behind wheel */}
                <div className="pointer-events-none absolute inset-[15%] rounded-full bg-linear-to-br from-indigo-400/15 via-violet-400/12 to-teal-400/15 dark:from-indigo-600/20 dark:via-violet-600/18 dark:to-teal-600/20 blur-3xl" />

                {/* Center icon with glow ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="absolute inset-0 scale-[2.8] rounded-full bg-accent/12 dark:bg-accent/22 blur-2xl animate-pulse [animation-duration:3s]" />
                  <div className="absolute inset-0 scale-[1.7] rounded-full border border-accent/25 dark:border-accent/35 animate-ping [animation-duration:3s]" />
                  <div className={`relative rounded-full grid place-items-center shadow-xl ${centerIcon.bgClass}`}>
                    <centerIcon.Icon width={centerIcon.size} height={centerIcon.size} />
                  </div>
                </div>

                {/* Orbiting icons using pure CSS transforms (bulletproof scaling for all mobile browsers) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="relative w-[67.2%] h-[67.2%]">
                    {orbitIcons.map(({ Icon, bgClass, size, label, duration, delay }) => (
                      <div
                        key={label}
                        className="absolute w-full h-full pointer-events-auto"
                        style={{
                          animation: `orbit-spin ${duration} linear ${delay} infinite`,
                        }}
                      >
                        {/* Position at top-center of the spinning track */}
                        <div className="absolute left-1/2 top-0" style={{ transform: 'translate(-50%, -50%)' }}>
                          <div
                            style={{
                              animation: `orbit-spin-reverse ${duration} linear ${delay} infinite`,
                            }}
                          >
                            <div className="group relative">
                              <div className={`rounded-full grid place-items-center shadow-lg transition-transform duration-300 hover:scale-125 cursor-pointer ${bgClass}`}>
                                <Icon width={size} height={size} />
                              </div>
                              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-darkBlue/70 dark:text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 dark:bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none">
                                {label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block relative h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-accent/40 to-transparent" />
              <div className="absolute left-1/2 top-[-20px] -translate-x-1/2 translate-y-2 z-10">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 scale-[2] rounded-full bg-accent/30 animate-ping [animation-duration:2.5s]" />
                  <div className="relative w-full h-full rounded-full bg-background border-[3px] border-accent shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                </div>
              </div>
            </div>

            {/* Cards — left */}
            <div className="grid grid-cols-1 gap-5 lg:gap-6 lg:pl-16 relative lg:-bottom-15 order-first lg:order-none">
              <div className="text-center lg:text-left mb-2 lg:mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-2">
                  <span className="h-[2px] w-4 rounded-full bg-accent" />
                  What I Do
                  <span className="h-[2px] w-4 rounded-full bg-accent" />
                </span>
                <h4 className="font-bold">My Specialization</h4>
              </div>
              {expertiseItems.map((item) => (
                <GraphicalCard
                  key={item.number}
                  number={item.number}
                  title={item.title}
                  description={item.description}
                  cardClassName={item.cardSpecial}
                  glowClass={item.glowClass}
                  starClass={item.starClass}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
