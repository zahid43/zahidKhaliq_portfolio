"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CloseIcon } from "@/components/ReusableSvgs";
import { Logo } from "@/components/ReusableSvgs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { navLinks, pageNavLinks } from "@/lib/constants";
import { socialLinks } from "@/lib/socialLinks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = !mounted || resolvedTheme !== "light";
  const iconBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(99,102,241,0.08)";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-150 transition-all duration-500"
        style={{
          backdropFilter: isOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(6px)" : "none",
          background: isOpen
            ? isDark ? "rgba(5,3,20,0.55)" : "rgba(99,102,241,0.12)"
            : "transparent",
          pointerEvents: isOpen ? "auto" : "none",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Sidebar panel */}
      <aside
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="fixed right-0 top-0 z-200 h-full w-[min(340px,88vw)] overflow-hidden transition-all duration-480ms ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Gradient base */}
        <div className="absolute inset-0 bg-linear-to-br from-[#f5f4ff] via-indigo-50 to-[#f0fffe] dark:from-[#0d0b26] dark:via-indigo-950 dark:to-[#071a17]" />

        {/* Wave texture */}
        <img
          src="/images/wavesCard.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={
            isDark
              ? { opacity: 0.2, mixBlendMode: "screen" }
              : { opacity: 0.35, filter: "invert(1) hue-rotate(180deg)" }
          }
        />

        {/* Circles pattern */}
        <img
          src="/images/circles.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -left-6 w-64"
          style={
            isDark
              ? { opacity: 0.1 }
              : { opacity: 0.18, filter: "invert(1) hue-rotate(180deg)" }
          }
        />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -right-10 top-20 h-52 w-52 rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-32 h-60 w-60 rounded-full bg-teal-400/15 dark:bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-1/2 h-36 w-36 rounded-full bg-violet-400/15 dark:bg-violet-500/15 blur-2xl" />

        {/* Star decoration */}
        <img
          src="/images/star.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-36 w-8 animate-spin [animation-duration:12s]"
          style={
            isDark
              ? { opacity: 0.3 }
              : { opacity: 0.4, filter: "invert(1) hue-rotate(180deg)" }
          }
        />
        <img
          src="/images/star.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/3 w-5 animate-spin [animation-duration:8s] [animation-direction:reverse]"
          style={
            isDark
              ? { opacity: 0.2 }
              : { opacity: 0.3, filter: "invert(1) hue-rotate(180deg)" }
          }
        />

        {/* Content */}
        <div className="relative flex h-full flex-col px-7 py-6">

          {/* Top row */}
          <div className="flex items-center justify-between">
            <div
              className="transition-all duration-500"
              style={{
                transitionDelay: isOpen ? "120ms" : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(-24px)",
              }}
            >
              <Logo width={148} height={36} className="text-darkBlue dark:text-white" />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-indigo-200 dark:border-white/15 text-indigo-800 dark:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-indigo-100 dark:hover:bg-white/20"
              style={{
                background: iconBg,
                transitionDelay: isOpen ? "200ms" : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1)" : "scale(0.6) rotate(-90deg)",
              }}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>

          {/* Book card profile */}
          <div
            className="mt-6 mb-5 flex justify-center transition-all duration-500"
            style={{
              transitionDelay: isOpen ? "160ms" : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div
              className="group relative flex items-end justify-center [transform-style:preserve-3d]"
              style={{ width: "200px", height: "260px", perspective: "2500px", padding: "0 24px 20px" }}
            >
              {/* Cover — tilts back on hover */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl transition-all duration-500 group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)] dark:group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]"
              >
                {/* Light mode cover */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-100 via-violet-100 to-teal-50 dark:from-[#0d0b26] dark:via-[#130d35] dark:to-[#071a17]" />
                <img
                  src="/images/wavesCard.svg"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-25"
                  style={isDark ? { mixBlendMode: "screen" } : { mixBlendMode: "multiply", filter: "hue-rotate(180deg)" }}
                />
                <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-indigo-400/25 dark:bg-indigo-500/30 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-teal-400/20 dark:bg-teal-500/20 blur-2xl" />
                {/* Top gradient — fades in on hover */}
                <div className="absolute inset-x-0 top-0 h-full bg-linear-to-b from-indigo-200/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-[rgba(12,13,19,0.5)]" />
                {/* Bottom gradient — always present for title readability */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent via-indigo-100/80 to-indigo-50/98 dark:via-[rgba(12,13,19,0.65)] dark:to-[rgba(12,13,19,0.96)]" />
              </div>

              {/* Character — visible by default, pops out on hover */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl opacity-100 transition-all duration-500 group-hover:transform-[translate3d(0%,-18%,100px)]"
                style={{ zIndex: 1 }}
              >
                <Image
                  src="/images/zahidTransparent.png"
                  alt="Zahid Khaliq"
                  fill
                  className="object-contain object-bottom"
                />
                {/* Gradient scrim so title text stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent via-indigo-50/80 to-indigo-50/98 dark:via-[rgba(12,13,19,0.65)] dark:to-[rgba(12,13,19,0.96)]" />
              </div>

              {/* Title — floats forward on hover */}
              <div
                className="relative w-full text-center transition-all duration-500 group-hover:[transform:translate3d(0%,-50px,100px)]"
                style={{ zIndex: 2 }}
              >
                <p className="text-sm font-bold leading-tight text-indigo-900 dark:text-white">Zahid Khaliq</p>
                <p className="mt-0.5 text-[11px] text-indigo-700/60 dark:text-white/55">Frontend Engineer</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Available for work
                </span>
              </div>
            </div>
          </div>

          {/* Top divider */}
          <div
            className="mb-5 h-px bg-linear-to-r from-transparent via-indigo-300/40 dark:via-white/20 to-transparent transition-all duration-500 origin-center"
            style={{
              transitionDelay: isOpen ? "220ms" : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "scaleX(1)" : "scaleX(0)",
            }}
          />

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((label, i) => (
              <a
                key={label}
                href={`${isHome ? "" : "/"}#${label.toLowerCase().replace(/ /g, "-")}`}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-indigo-800/80 dark:text-white/70 transition-all duration-300 hover:translate-x-1.5 hover:bg-indigo-100/60 dark:hover:bg-white/8 hover:text-indigo-900 dark:hover:text-white active:scale-95"
                style={{
                  transitionDelay: isOpen ? `${260 + i * 55}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <span className="h-px w-4 rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 group-hover:w-6 group-hover:bg-teal-500 dark:group-hover:bg-teal-400" />
                {label}
              </a>
            ))}
            {pageNavLinks.map(({ label, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium transition-all duration-300 hover:translate-x-1.5 hover:bg-indigo-100/60 dark:hover:bg-white/8 active:scale-95 ${
                  pathname === href
                    ? "text-accent"
                    : "text-indigo-800/80 dark:text-white/70 hover:text-indigo-900 dark:hover:text-white"
                }`}
                style={{
                  transitionDelay: isOpen ? `${260 + (navLinks.length + i) * 55}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <span className="h-px w-4 rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 group-hover:w-6 group-hover:bg-teal-500 dark:group-hover:bg-teal-400" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Bottom section */}
          <div
            className="transition-all duration-500"
            style={{
              transitionDelay: isOpen ? "490ms" : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="mb-5 h-px bg-linear-to-r from-transparent via-indigo-300/40 dark:via-white/20 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-indigo-200 dark:border-white/15 text-indigo-700 dark:text-white transition-all duration-300 hover:scale-110 hover:bg-indigo-100 dark:hover:bg-white/20"
                    style={{ background: iconBg }}
                  >
                    <Icon width={14} height={14} />
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
