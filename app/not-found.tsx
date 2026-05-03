"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { CodeBraces } from "@/components/ReusableSvgs";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">

      {/* Galaxy wave texture */}
      <img src="/images/wavesCard.svg" alt="" aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] dark:opacity-[0.18] dark:[mix-blend-mode:screen]" />

      {/* Circles pattern — bottom-right corner */}
      <img src="/images/circles.svg" alt="" aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-[520px] opacity-[0.06] dark:opacity-[0.10]" />

      {/* Circles pattern — top-left echo */}
      <img src="/images/circles.svg" alt="" aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 w-80 opacity-[0.04] dark:opacity-[0.07] rotate-180" />

      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-indigo-400/12 dark:bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet-400/12 dark:bg-violet-600/18 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/8 dark:bg-teal-600/12 blur-3xl" />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={24} height={24}
        className="pointer-events-none absolute left-[10%] top-[18%] opacity-25 dark:opacity-50 animate-spin [animation-duration:14s]" />
      <Image src="/images/star.svg" alt="" width={16} height={16}
        className="pointer-events-none absolute right-[12%] top-[22%] opacity-20 dark:opacity-40 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
      <Image src="/images/star.svg" alt="" width={12} height={12}
        className="pointer-events-none absolute bottom-[28%] left-[18%] opacity-15 dark:opacity-30 animate-spin [animation-duration:10s]" />
      <Image src="/images/star.svg" alt="" width={20} height={20}
        className="pointer-events-none absolute bottom-[22%] right-[16%] opacity-20 dark:opacity-40 animate-spin [animation-duration:17s] [animation-direction:reverse]" />

      {/* Galaxy dust dots */}
      <div className="pointer-events-none absolute left-[25%] top-[35%] h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/40" />
      <div className="pointer-events-none absolute right-[30%] top-[28%] h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/30" />
      <div className="pointer-events-none absolute bottom-[32%] left-[40%] h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/35" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Code icon with glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 scale-[3] rounded-full bg-accent/15 dark:bg-accent/20 blur-2xl animate-pulse [animation-duration:3s]" />
          <div className="absolute inset-0 scale-[1.8] rounded-full border border-accent/20 dark:border-accent/30 animate-ping [animation-duration:3s]" />
          <div className="relative grid place-items-center rounded-full bg-[#111] dark:bg-[#1a1830] p-5 shadow-xl ring-1 ring-accent/20">
            <CodeBraces width={36} height={36} className="text-accent" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-[7rem] sm:text-[10rem] md:text-[13rem] font-black leading-none tracking-tighter bg-linear-to-b from-foreground via-foreground/70 to-foreground/10 bg-clip-text text-transparent select-none">
          404
        </h1>

        {/* Divider line */}
        <div className="my-5 h-px w-24 rounded-full bg-linear-to-r from-transparent via-accent/50 to-transparent" />

        <p className="text-lg md:text-xl font-semibold text-foreground mb-2">
          Page not found
        </p>
        <p className="max-w-xs text-sm text-muted leading-relaxed mb-8">
          This page doesn't exist or may have been moved. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/85 hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]"
          >
            <Home size={14} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-6 py-2.5 text-sm font-medium text-foreground/60 transition-all duration-200 hover:bg-foreground/10 hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
