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
    <div className={`relative h-full ${className}`}>
      {starClass && (
        <Image src="/images/star.svg" alt="" width={36} height={36}
          className={`absolute ${starClass}`} />
      )}

      <div className={`relative z-10 border border-white/10 rounded-2xl text-darkBlue dark:text-foreground py-5 px-5 lg:py-6 lg:px-7 overflow-hidden h-full backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:bg-white/5 dark:hover:bg-black/20 group/card animate-float shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ${cardClassName}`}>

        {/* Interactive Shine Effect */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

        {/* Large number watermark - Re-introduced with better visibility */}
        <div className="pointer-events-none absolute -right-4 -top-4 select-none text-[8rem] font-black leading-none text-darkBlue/[0.08] dark:text-white/[0.12] transition-all duration-700 group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:text-accent/15 [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]">
          {padded}
        </div>

        {/* Nebula glow orbs */}
        <div className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-500 ${glowClass}`} />
        <div className={`pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full blur-[60px] opacity-20 group-hover/card:opacity-40 transition-opacity duration-500 ${glowClass}`} />

        {/* Galaxy dust dots */}
        <div className="pointer-events-none absolute top-10 left-1/4 h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/40" />
        <div className="pointer-events-none absolute top-24 right-1/4 h-[2px] w-[2px] rounded-full bg-darkBlue/15 dark:bg-white/30" />
        <div className="pointer-events-none absolute bottom-16 left-1/2 h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/30" />

        <Image src="/images/rightCard.svg" alt="" width={90} height={180}
          className="absolute top-0 right-0 z-0 opacity-10 dark:opacity-5 group-hover/card:opacity-20 transition-opacity" />

        <div className="relative z-10">
          {/* Accent line + number badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">{padded}</span>
          </div>
          <h3 className="text-lg lg:text-xl font-bold mb-2.5 leading-tight group-hover/card:text-accent transition-colors relative z-20 drop-shadow-xs">{title}</h3>
          <p className="text-xs lg:text-[13px] leading-relaxed text-darkBlue/80 dark:text-white/70 group-hover/card:text-darkBlue/90 dark:group-hover/card:text-white transition-colors duration-300 line-clamp-3 lg:line-clamp-none relative z-20 drop-shadow-sm">{description}</p>
        </div>

        <Image src="/images/bottomCard.svg" alt="" width={160} height={65}
          className="absolute bottom-0 left-0 z-0 opacity-10 dark:opacity-5 group-hover/card:opacity-20 transition-opacity" />
      </div>
    </div>
  );
}
