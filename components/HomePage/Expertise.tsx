import Image from "next/image";
import GraphicalCard from "@/components/HomePage/GraphicalCard";
import { CodeBraces, Webflow, ReactIcon, TailwindIcon, BootstrapIcon } from "@/components/ReusableSvgs";

const expertiseItems = [
  {
    number: "1",
    title: "Webflow",
    description: "I also use Client First system for class naming structure, which allows me to build any project fast and conveniently.",
    starClass: "absolute -bottom-4 right-20",
    cardSpecial: "-rotate-2 animate-[floatY_2s_ease-in-out_infinite]",
  },
  {
    number: "2",
    title: "CSS/SCSS",
    description: "Clean, maintainable, and semantic CSS following modern best practices and naming conventions.",
    starClass: "absolute -bottom-4 -left-4",
    cardSpecial: "rotate-2 animate-[floatY_3s_ease-in-out_infinite]",
  },
  {
    number: "3",
    title: "Tailwind CSS & Bootstrap",
    description: "Rapidly crafting responsive, custom designs using utility classes without leaving the HTML.",
    starClass: "absolute -top-4 -left-4",
    cardSpecial: "-rotate-2 animate-[floatY_4s_ease-in-out_infinite]",
  },
];

const expertiseIcons = [
  {
    Icon: CodeBraces,
    posClass: "top-1/2 left-1/2",
    bgClass: "bg-[#111] text-white p-7",
    size: 60,
  },
  {
    Icon: Webflow,
    posClass: "top-[18%] left-[22%]",
    bgClass: "bg-blue-600 text-white p-5",
    size: 45,
  },
  {
    Icon: ReactIcon,
    posClass: "top-[28%] left-[82%]",
    bgClass: "bg-[#20232a] text-[#61dafb] p-5",
    size: 45,
  },
  {
    Icon: TailwindIcon,
    posClass: "top-[78%] left-[18%]",
    bgClass: "bg-white text-cyan-400 p-5 shadow-xl border border-gray-100",
    size: 45,
  },
  {
    Icon: BootstrapIcon,
    posClass: "top-[72%] left-[78%]",
    bgClass: "bg-purple-600 text-white p-5",
    size: 45,
  },
];

export default function Expertise() {
  return (
    <>
      <section className="relative">
        <div className="container">
          <div className="grid grid-cols-[1fr_1px_1fr] z-1 relative">

            {/* right section of the expertise section */}
            <div className="w-full h-full grid place-items-center">
              <div className="bg-circles w-full aspect-square relative max-w-[500px]">
                {expertiseIcons.map((item, index) => (
                  <div 
                    key={index} 
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full grid place-items-center shadow-lg transition-transform hover:scale-110 ${item.bgClass} ${item.posClass}`}
                  >
                    <item.Icon width={item.size} height={item.size} />
                  </div>
                ))}
              </div>
            </div>

            {/* divider of the expertise section */}
            <div className="dashed-border-right relative overflow-visible h-full w-full">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-[20px] h-[20px] bg-red-500 rounded-full">
                <img src="/images/dot.svg" alt="dot" className="w-full h-full" />
              </div>
            </div>

            {/* left section of the expertise section */}
            <div className="grid grid-cols-1 gap-12 py-8 pl-8">
              <h4 className="font-bold mb-8">My Specialization</h4>
              {expertiseItems.map((item) => (
                <GraphicalCard
                  key={item.number}
                  number={item.number}
                  title={item.title}
                  description={item.description}
                  cardClassName={item.cardSpecial}
                  starClass={item.starClass}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
