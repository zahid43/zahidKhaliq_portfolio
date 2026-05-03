import Image from "next/image";
import { Mail } from "lucide-react";
import { NextjsIcon, TailwindIcon, FigmaIcon } from "@/components/ReusableSvgs";
import { socialLinks } from "@/lib/socialLinks";

const hoverColors: Record<string, string> = {
  LinkedIn: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
  GitHub: "hover:bg-darkBlue hover:border-darkBlue hover:text-white dark:hover:bg-white dark:hover:text-darkBlue dark:hover:border-white",
  "X / Twitter": "hover:bg-zinc-900 hover:border-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 dark:hover:border-white",
};

const emailLink = {
  label: "Email",
  href: "mailto:zaahid.khaliq@gmail.com",
  Icon: Mail,
  hover: "hover:bg-rose-500 hover:border-rose-500 hover:text-white",
};

export default function Footer() {
  return (
    <footer className="container py-10 relative overflow-hidden">

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={16} height={16}
        className="pointer-events-none absolute top-8 left-1/4 opacity-15 dark:opacity-35 animate-spin [animation-duration:18s]" />
      <Image src="/images/star.svg" alt="" width={10} height={10}
        className="pointer-events-none absolute top-6 right-1/3 opacity-10 dark:opacity-25 animate-spin [animation-duration:12s] [animation-direction:reverse]" />

      {/* Galaxy dust dots */}
      <div className="pointer-events-none absolute top-10 right-[20%] h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/45" />
      <div className="pointer-events-none absolute bottom-8 left-[30%] h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/35" />

      {/* Cosmic top border */}
      <div className="mb-8 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row relative z-10">
        <div>
          <p className="text-lg font-semibold text-darkBlue dark:text-white">
            Zahid Khaliq
          </p>
          <p className="mt-1 text-sm text-darkBlue/50 dark:text-white/45">
            Frontend Engineer
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[...socialLinks, emailLink].map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={[
                "grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-darkBlue shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-white/5 dark:text-white",
                hoverColors[label] ?? emailLink.hover,
              ].join(" ")}
            >
              <Icon width={16} height={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-black/8 pt-6 text-xs text-darkBlue/40 dark:border-white/8 dark:text-white/35 sm:flex-row relative z-10">
        <p>© {new Date().getFullYear()} Zahid Khaliq. All rights reserved.</p>
        <p className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
          Built with{" "}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-all duration-200 hover:scale-110 text-darkBlue/40 dark:text-white/35 hover:text-black dark:hover:text-white">
            <NextjsIcon width={16} height={16} aria-hidden="true" />
            <span className="sr-only">Next.js</span>
          </a>
          {" & "}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-all duration-200 hover:scale-110 text-darkBlue/40 dark:text-white/35 hover:text-cyan-500 dark:hover:text-cyan-400">
            <TailwindIcon width={16} height={16} aria-hidden="true" />
            <span className="sr-only">Tailwind CSS</span>
          </a>
          {" · "}
          Inspired by{" "}
          <a href="https://www.figma.com/design/POGH7JC8mcsWXcCZx8DRuh/Free-Designer-Portfolio-and-Webflow-Template--Community---Community-?node-id=0-1&p=f&t=3xsvJ9aJXVZIHqFJ-0"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 transition-all duration-200 hover:scale-105 text-darkBlue/40 dark:text-white/35 hover:text-[#A259FF] dark:hover:text-[#A259FF]">
            <FigmaIcon width={14} height={14} aria-hidden="true" /> this Figma template
          </a>
        </p>
      </div>
    </footer>
  );
}
