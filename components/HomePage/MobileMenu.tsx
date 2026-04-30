"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ReusableSvgs";
import AvatarGraphic from "@/components/ReusableSvgs/AvatarGraphic";
import GithubIcon from "@/components/ReusableSvgs/GithubIcon";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = ["Home", "About me", "Projects", "Contact"];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        className="fixed inset-0 z-[150] transition-all duration-500"
        style={{
          backdropFilter: isOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(6px)" : "none",
          background: isOpen ? "rgba(5,3,20,0.55)" : "transparent",
          pointerEvents: isOpen ? "auto" : "none",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Sidebar panel */}
      <aside
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="fixed right-0 top-0 z-[200] h-full w-[min(340px,88vw)] overflow-hidden transition-all duration-[480ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b26] via-indigo-950 to-[#071a17]" />

        {/* Wave texture */}
        <img
          src="/images/wavesCard.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
        />

        {/* Circles pattern */}
        <img
          src="/images/circles.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -left-6 w-64 opacity-10"
        />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -right-10 top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-32 h-60 w-60 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-1/2 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl" />

        {/* Star decoration */}
        <img
          src="/images/star.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-36 w-8 opacity-30 animate-spin [animation-duration:12s]"
        />
        <img
          src="/images/star.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/3 w-5 opacity-20 animate-spin [animation-duration:8s] [animation-direction:reverse]"
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
              <Logo width={148} height={36} className="text-white" />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.07)",
                transitionDelay: isOpen ? "200ms" : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1)" : "scale(0.6) rotate(-90deg)",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Avatar graphic */}
          <div
            className="pointer-events-none -mx-4 mt-2 select-none transition-all duration-700"
            style={{
              transitionDelay: isOpen ? "150ms" : "0ms",
              opacity: isOpen ? 0.7 : 0,
              transform: isOpen ? "translateY(0) scale(1)" : "translateY(28px) scale(0.92)",
            }}
          >
            <AvatarGraphic className="mx-auto w-full max-w-[230px]" />
          </div>

          {/* Top divider */}
          <div
            className="mb-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 origin-center"
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
                href={`#${label.toLowerCase().replace(/ /g, "-")}`}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-white/70 transition-all duration-300 hover:translate-x-1.5 hover:bg-white/8 hover:text-white active:scale-95"
                style={{
                  transitionDelay: isOpen ? `${260 + i * 55}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <span className="h-px w-4 rounded-full bg-indigo-400 transition-all duration-300 group-hover:w-6 group-hover:bg-teal-400" />
                {label}
              </a>
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
            <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition-all duration-300 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2]"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <LinkedinIcon width={14} height={14} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <GithubIcon width={14} height={14} />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
