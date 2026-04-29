"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

interface SecondaryCardProps {
  id: string;
  heading: string;
  desc: string;
  linkText?: string;
  Blink: string;
  bgUpdate?: string;
}

export default function SecondaryCard({
  id,
  heading,
  desc,
  linkText = "",
  Blink,
  bgUpdate = "bg-teal-950",
}: SecondaryCardProps) {
  const router = useRouter();

  return (
    <div className="relative rounded-lg bg-purple-800 -rotate-2 text-white">
      <div className={`${bgUpdate} rounded-lg rotate-2 p-10 bg-waves`}>
        <div className="flex items-center gap-10 justify-between">
          <div>
            <h6>{heading}</h6>
            <p>{desc}</p>
          </div>
          <CustomButton
            key={id}
            onClick={() => router.push(Blink)}
            className="shrink-0"
            textClassName="bg-amber-100 text-zinc-950 group-hover:bg-amber-200"
          >
            {linkText}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
