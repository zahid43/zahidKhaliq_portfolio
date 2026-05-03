import Image from "next/image";

interface GraphicalCardProps {
  number: string;
  title: string;
  description: string;
  cardClassName?: string;
  glowClass?: string;
  starClass?: string;
  className?: string;
}

export default function GraphicalCard({
  number,
  title,
  description,
  cardClassName = "",
  glowClass = "",
  starClass,
  className = "",
}: GraphicalCardProps) {
  const padded = number.padStart(2, "0");

  return (
    <div className={`relative ${className}`}>
      {starClass && (
        <Image src="/images/star.svg" alt="" width={36} height={36}
          className={`absolute ${starClass}`} />
      )}

      <div className={`relative z-10 border rounded-xl text-darkBlue dark:text-foreground py-4 px-5 overflow-hidden ${cardClassName}`}>

        {/* Large number watermark */}
        <div className="pointer-events-none absolute -right-3 -top-3 select-none text-[5rem] font-black leading-none text-darkBlue/[0.055] dark:text-white/[0.055]">
          {padded}
        </div>

        {/* Nebula glow orbs */}
        <div className={`pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full blur-3xl ${glowClass}`} />
        <div className={`pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full blur-2xl opacity-60 ${glowClass}`} />

        {/* Inner spinning stars */}
        <Image src="/images/star.svg" alt="" width={18} height={18}
          className="pointer-events-none absolute top-3 right-28 opacity-35 dark:opacity-70 animate-spin [animation-duration:14s]" />
        <Image src="/images/star.svg" alt="" width={12} height={12}
          className="pointer-events-none absolute bottom-5 right-5 opacity-25 dark:opacity-55 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
        <Image src="/images/star.svg" alt="" width={8} height={8}
          className="pointer-events-none absolute top-1/2 right-16 opacity-20 dark:opacity-40 animate-spin [animation-duration:9s]" />

        {/* Galaxy dust dots */}
        <div className="pointer-events-none absolute top-5 left-1/3 h-1 w-1 rounded-full bg-darkBlue/25 dark:bg-white/60" />
        <div className="pointer-events-none absolute top-10 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/40" />
        <div className="pointer-events-none absolute bottom-7 left-1/4 h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/50" />
        <div className="pointer-events-none absolute bottom-12 left-2/3 h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/35" />

        <Image src="/images/rightCard.svg" alt="" width={90} height={180}
          className="absolute top-0 right-0 z-0 opacity-25 dark:opacity-15" />

        <div className="relative z-10">
          {/* Accent line + number badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{padded}</span>
          </div>
          <h6 className="font-bold mb-1.5 leading-tight">{title}</h6>
          <p className="text-xs leading-relaxed opacity-80">{description}</p>
        </div>

        <Image src="/images/bottomCard.svg" alt="" width={160} height={65}
          className="absolute bottom-0 left-0 z-0 opacity-25 dark:opacity-15" />
      </div>
    </div>
  );
}
