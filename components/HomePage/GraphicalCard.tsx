import Image from "next/image";

interface GraphicalCardProps {
  number: string;
  title: string;
  description: string;
  cardClassName?: string;
  starClass?: string;
  className?: string;
}

export default function GraphicalCard({
  number,
  title,
  description,
  cardClassName = "",
  starClass,
  className = "",
}: GraphicalCardProps) {
  return (
    <div className={`relative ${className}`}>
      {starClass && (
        <Image src="/images/star.svg" alt="" width={32} height={32} className={`absolute ${starClass}`} />
      )}
      <div className={`relative z-10 bg-lightBlue dark:bg-teal-900 border border-darkBlue/20 dark:border-foreground/15 rounded-md text-darkBlue dark:text-foreground py-6 px-6 overflow-hidden ${cardClassName}`}>
        <Image src="/images/rightCard.svg" alt="" width={90} height={180} className="absolute top-0 right-0 z-0 dark:opacity-20" />
        <div className="relative z-10">
          <h6>{number}</h6>
          <h4 className="mb-4">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
        <Image src="/images/bottomCard.svg" alt="" width={160} height={65} className="absolute bottom-0 left-0 z-0 dark:opacity-20" />
      </div>
    </div>
  );
}
