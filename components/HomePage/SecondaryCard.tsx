import Link from "next/link";

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
            className="bg-amber-100 text-zinc-950 w-fit h-fit px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}