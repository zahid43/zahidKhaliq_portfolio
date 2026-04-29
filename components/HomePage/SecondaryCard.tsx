import Link from "next/link";
import { CustomButtonContent, customButtonClassName } from "./CustomButton";

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
  return (
    <div className="relative rounded-lg bg-purple-800 -rotate-2 text-white">
      <div className={`${bgUpdate} rounded-lg rotate-2 p-10 bg-waves`}>
        <div className="flex items-center gap-10 justify-between">
          <div>
            <h6>{heading}</h6>
            <p>{desc}</p>
          </div>
          <Link
            key={id}
            href={Blink}
            className={`${customButtonClassName} shrink-0`}
          >
            <CustomButtonContent textClassName="bg-amber-100 text-zinc-950">
              {linkText}
            </CustomButtonContent>
          </Link>
        </div>
      </div>
    </div>
  );
}
