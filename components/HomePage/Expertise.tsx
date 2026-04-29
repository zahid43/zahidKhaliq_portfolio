import Image from "next/image";
import GraphicalCard from "@/components/GraphicalCard";

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

export default function Expertise() {
  return (
    <>
      <section className="relative">
        <div className="container">
          <div className="grid grid-cols-[1fr_1px_1fr] z-1 relative">

            <div className="bg-circles w-full h-full"></div>

            <div className="dashed-border-right relative">
              <div className="absolute top-25 w-full">
                <Image src="/images/dot.svg" alt="dot" width={20} height={20} />
              </div>
            </div>
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
