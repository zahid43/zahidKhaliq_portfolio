"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomButton from "./CustomButton";

interface SecondaryCardProps {
  heading: React.ReactNode;
  desc: string;
  btnText?: string;
  Blink?: string;
  bgUpdate?: string;
  backBox?: string;
  cardHeight?: string;
  cardPadding?: string;
  children?: React.ReactNode;
}

export default function SecondaryCard({
  heading,
  desc,
  btnText = "",
  Blink,
  bgUpdate = "bg-indigo-50 dark:bg-indigo-950",
  backBox = "bg-indigo-200 dark:bg-violet-700",
  cardHeight = "",
  cardPadding = "p-10",
  children,
}: SecondaryCardProps) {
  const router = useRouter();

  return (
    <div className={`relative rounded-lg -rotate-2 text-darkBlue dark:text-white ${backBox}`}>
      <div className={`${bgUpdate} ${cardHeight} ${cardPadding} relative flex items-center justify-center overflow-hidden rounded-lg rotate-2`}>
        <img
          src="/images/wavesCard.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay dark:opacity-90 dark:mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,0,0,0.05),transparent_30%)] dark:bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.16),transparent_30%)] pointer-events-none" />

        {/* Inner spinning stars */}
        <Image
          src="/images/star.svg"
          alt=""
          width={24}
          height={24}
          className="pointer-events-none absolute top-4 right-1/4 opacity-50 dark:opacity-35 animate-spin [animation-duration:14s]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={14}
          height={14}
          className="pointer-events-none absolute bottom-6 right-8 opacity-40 dark:opacity-25 animate-spin [animation-duration:20s] [animation-direction:reverse]"
        />
        <Image
          src="/images/star.svg"
          alt=""
          width={10}
          height={10}
          className="pointer-events-none absolute top-1/2 right-12 opacity-30 dark:opacity-20 animate-spin [animation-duration:9s]"
        />

        {/* Galaxy dust dots */}
        <div className="pointer-events-none absolute top-6 left-1/4 h-1 w-1 rounded-full bg-darkBlue/40 dark:bg-white/60" />
        <div className="pointer-events-none absolute top-12 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/30 dark:bg-white/40" />
        <div className="pointer-events-none absolute bottom-8 left-1/5 h-1 w-1 rounded-full bg-darkBlue/35 dark:bg-white/50" />
        <div className="pointer-events-none absolute bottom-14 left-2/3 h-[3px] w-[3px] rounded-full bg-darkBlue/25 dark:bg-white/35" />

        <div className="relative flex flex-col md:flex-row w-full items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-darkBlue/60 dark:text-white/60">
              {heading}
            </p>
            <h4 className="text-xl md:text-2xl font-bold leading-tight">{desc}</h4>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start shrink-0 mt-6 md:mt-0">
            {children ? (
              children
            ) : (
              btnText && Blink && (
                <CustomButton
                  onClick={() => router.push(Blink)}
                  textClassName="bg-amber-100 text-zinc-950 group-hover:bg-amber-200 dark:bg-amber-200 dark:text-zinc-900"
                >
                  {btnText}
                </CustomButton>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
