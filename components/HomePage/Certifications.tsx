"use client";

import Image from "next/image";
import { useRef } from "react";
import { ExternalLinkIcon, CourseraLogo } from "@/components/ReusableSvgs";

const certifications = [
  {
    title: "HTML and CSS in Depth",
    date: "Feb 2023",
    credentialId: "VG8G34ABH2Y2",
  },
  {
    title: "Create a No-Code Responsive Website with Webflow",
    date: "Nov 2022",
    credentialId: "AEAT5BX5TKZF",
  },
  {
    title: "Design and Develop a Website using Figma and CSS",
    date: "Sep 2022",
    credentialId: "DQLD9V8Y7D6K",
  },
  {
    title: "Version Control",
    date: "Sep 2022",
    credentialId: "FFBRNVF4EJ3B",
  },
  {
    title: "Introduction to Front-End Development",
    date: "Jul 2022",
    credentialId: "AR34BBL3TZUG",
  },
];

export default function Certifications() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" id="certifications">
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 rounded-full bg-blue-400/8 dark:bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 rounded-full bg-indigo-400/8 dark:bg-indigo-600/10 blur-3xl" />
      <Image src="/images/star.svg" alt="" width={14} height={14}
        className="pointer-events-none absolute top-[15%] right-[12%] opacity-15 dark:opacity-35 animate-spin [animation-duration:19s]" />

      <div className="container relative z-10 mb-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Certifications
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">Licenses & Credentials</h4>
          <p className="text-sm text-muted mt-3">Issued by Coursera — click any badge to verify</p>
        </div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-background to-transparent" />

        {/* Marquee track */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
        >
          <div
            ref={trackRef}
            className="flex gap-4 w-max"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {/* Render twice for seamless loop */}
            {[...certifications, ...certifications].map((cert, i) => (
              <a
                key={i}
                href={`https://www.coursera.org/verify/${cert.credentialId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-[#0056D2]/15 dark:border-[#4a90d9]/15 bg-[#0056D2]/6 dark:bg-[#0056D2]/10 px-5 py-3.5 transition-all duration-300 hover:border-[#0056D2]/40 dark:hover:border-[#4a90d9]/40 hover:bg-[#0056D2]/12 dark:hover:bg-[#0056D2]/18 hover:shadow-lg hover:shadow-[#0056D2]/10 shrink-0"
              >
                {/* Coursera badge */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0056D2] shadow-sm shadow-[#0056D2]/40">
                  <span className="text-white font-black text-sm leading-none">C</span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-darkBlue dark:text-white whitespace-nowrap group-hover:text-[#0056D2] dark:group-hover:text-[#4a90d9] transition-colors duration-200">
                    {cert.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CourseraLogo className="h-2.5 w-auto text-darkBlue/45 dark:text-white/40" />
                    <span className="text-[11px] text-darkBlue/45 dark:text-white/40">· {cert.date}</span>
                  </div>
                </div>

                <ExternalLinkIcon className="ml-1 shrink-0 w-3 h-3 text-darkBlue/25 dark:text-white/25 group-hover:text-[#0056D2] dark:group-hover:text-[#4a90d9] transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
