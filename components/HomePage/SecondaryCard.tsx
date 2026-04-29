"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

interface SecondaryCardProps {
  heading: string;
  desc: string;
  btnText?: string;
  Blink: string;
  bgUpdate?: string;
}

export default function SecondaryCard({
  heading,
  desc,
  btnText = "",
  Blink,
  bgUpdate = "bg-teal-950",
}: SecondaryCardProps) {
  const router = useRouter();

  return (
    <div className="relative rounded-lg bg-purple-800 -rotate-2 text-white">
      <div className={`${bgUpdate} relative overflow-hidden rounded-lg rotate-2 p-10`}>
        <img
          src="/images/wavesCard.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.16),transparent_30%)] pointer-events-none" />
        <div className="relative flex items-center gap-10 justify-between">
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
