"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { Backpack } from "lucide-react";

interface SecondaryCardProps {
  heading: string;
  desc: string;
  btnText?: string;
  Blink: string;
  bgUpdate?: string;
  backBox?: string;
  cardHeight?: string;
  cardPadding: string;
}

export default function SecondaryCard({
  heading,
  desc,
  btnText = "",
  Blink,
  bgUpdate = "bg-teal-950",
  backBox = "bg-purple-800",
  cardHeight = "",
  cardPadding = "p-10",
}: SecondaryCardProps) {
  const router = useRouter();

  return (
    <div className={`relative rounded-lg  -rotate-2 text-white ${backBox}`}>
      <div className={`${bgUpdate} ${cardHeight} ${cardPadding} relative flex items-center justify-center overflow-hidden rounded-lg rotate-2`}>
        <img
          src="/images/wavesCard.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.16),transparent_30%)] pointer-events-none" />
        <div className="relative flex w-full items-center justify-between gap-6">
          <div>
            <h6>{heading}</h6>
            <p>{desc}</p>
          </div>
          <CustomButton
            onClick={() => router.push(Blink)}
            className="shrink-0"
            textClassName="bg-amber-100 text-zinc-950 group-hover:bg-amber-200"
          >
            {btnText}
          </CustomButton>
        </div>
      </div>
    </div>
  );

}
