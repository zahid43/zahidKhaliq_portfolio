import Image from "next/image";
import {
  Html5Icon, CssIcon, ReactIcon, NextjsIcon,
  TailwindIcon, BootstrapIcon, FigmaIcon, GithubIcon,
  Webflow, SketchIcon,
} from "@/components/ReusableSvgs";

type Tool =
  | { name: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; bg: string; iconClass: string; abbr?: never }
  | { name: string; abbr: string; bg: string; iconClass: string; Icon?: never };

type Category = {
  label: string;
  cardGradient: string;
  borderColor: string;
  glowColor: string;
  labelColor: string;
  dotColor: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    label: "Languages",
    cardGradient: "from-teal-50 via-cyan-50 to-emerald-100 dark:from-[#041510] dark:via-[#071e1a] dark:to-[#0c1428]",
    borderColor: "border-teal-200/80 dark:border-teal-500/20",
    glowColor: "bg-teal-400/20 dark:bg-teal-500/25",
    labelColor: "text-teal-600 dark:text-teal-400",
    dotColor: "bg-teal-500",
    tools: [
      { name: "HTML5",      Icon: Html5Icon,  bg: "bg-orange-500",  iconClass: "text-white" },
      { name: "CSS3",       Icon: CssIcon,    bg: "bg-blue-500",    iconClass: "text-white" },
      { name: "JavaScript", abbr: "JS",       bg: "bg-yellow-400",  iconClass: "text-black font-black text-xs" },
      { name: "TypeScript", abbr: "TS",       bg: "bg-blue-600",    iconClass: "text-white font-black text-xs" },
      { name: "SCSS",       abbr: "S",        bg: "bg-pink-500",    iconClass: "text-white font-black text-sm" },
      { name: "PHP",        abbr: "php",      bg: "bg-violet-600",  iconClass: "text-white font-bold text-[10px]" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    cardGradient: "from-indigo-50 via-blue-50 to-violet-100 dark:from-[#06061e] dark:via-[#0a0828] dark:to-[#100a30]",
    borderColor: "border-indigo-200/80 dark:border-indigo-500/20",
    glowColor: "bg-indigo-400/20 dark:bg-indigo-500/25",
    labelColor: "text-indigo-600 dark:text-indigo-400",
    dotColor: "bg-indigo-500",
    tools: [
      { name: "React",      Icon: ReactIcon,     bg: "bg-[#20232a]",   iconClass: "text-[#61dafb]" },
      { name: "Next.js",    Icon: NextjsIcon,    bg: "bg-black",       iconClass: "text-white" },
      { name: "Tailwind",   Icon: TailwindIcon,  bg: "bg-white",       iconClass: "text-cyan-400" },
      { name: "Bootstrap",  Icon: BootstrapIcon, bg: "bg-purple-600",  iconClass: "text-white" },
      { name: "Rails",      abbr: "RoR",         bg: "bg-red-600",     iconClass: "text-white font-bold text-[10px]" },
      { name: "jQuery",     abbr: "$",           bg: "bg-blue-500",    iconClass: "text-white font-black text-base" },
    ],
  },
  {
    label: "CMS & Platforms",
    cardGradient: "from-violet-50 via-purple-50 to-fuchsia-100 dark:from-[#0e0520] dark:via-[#140728] dark:to-[#1c0a32]",
    borderColor: "border-violet-200/80 dark:border-violet-500/20",
    glowColor: "bg-violet-400/20 dark:bg-violet-500/25",
    labelColor: "text-violet-600 dark:text-violet-400",
    dotColor: "bg-violet-500",
    tools: [
      { name: "Webflow",    Icon: Webflow,  bg: "bg-blue-600",     iconClass: "text-white" },
      { name: "Drupal",     abbr: "D",      bg: "bg-[#0678be]",    iconClass: "text-white font-black text-sm" },
      { name: "WordPress",  abbr: "WP",     bg: "bg-[#21759b]",    iconClass: "text-white font-bold text-[10px]" },
      { name: "Laravel",    abbr: "L",      bg: "bg-red-500",      iconClass: "text-white font-black text-sm" },
      { name: "Vercel",     abbr: "▲",      bg: "bg-black",        iconClass: "text-white text-xs" },
    ],
  },
  {
    label: "Design & Tooling",
    cardGradient: "from-amber-50 via-orange-50 to-yellow-100 dark:from-[#1a1005] dark:via-[#1e1205] dark:to-[#241508]",
    borderColor: "border-amber-200/80 dark:border-amber-500/20",
    glowColor: "bg-amber-400/20 dark:bg-amber-500/25",
    labelColor: "text-amber-600 dark:text-amber-400",
    dotColor: "bg-amber-500",
    tools: [
      { name: "Figma",    Icon: FigmaIcon,  bg: "bg-white",        iconClass: "text-black" },
      { name: "GitHub",   Icon: GithubIcon, bg: "bg-[#24292f]",    iconClass: "text-white" },
      { name: "Sketch",   Icon: SketchIcon, bg: "bg-yellow-400",   iconClass: "text-black" },
      { name: "Git",      abbr: "Git",      bg: "bg-orange-500",   iconClass: "text-white font-bold text-[10px]" },
      { name: "VS Code",  abbr: "VS",       bg: "bg-blue-600",     iconClass: "text-white font-black text-xs" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-teal-400/10 dark:bg-teal-600/15 blur-3xl" />
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute top-[8%] left-[22%] opacity-25 dark:opacity-45 animate-spin [animation-duration:17s]" />
      <Image src="/images/star.svg" alt="" width={12} height={12}
        className="pointer-events-none absolute bottom-[12%] right-[18%] opacity-20 dark:opacity-35 animate-spin [animation-duration:23s] [animation-direction:reverse]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Tech Stack
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">Tools I Work With</h4>
          <p className="text-sm text-muted mt-3 max-w-sm mx-auto">
            The technologies and tools I reach for across design, development, and deployment.
          </p>
        </div>

        {/* 2×2 category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`relative bg-gradient-to-br ${cat.cardGradient} border ${cat.borderColor} rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Glow */}
              <div className={`pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full ${cat.glowColor} blur-2xl`} />

              {/* Spinning star */}
              <Image src="/images/star.svg" alt="" width={12} height={12}
                className="pointer-events-none absolute top-3 right-5 opacity-20 dark:opacity-50 animate-spin [animation-duration:14s]" />

              <div className="relative z-10">
                {/* Category label */}
                <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-4 ${cat.labelColor}`}>
                  {cat.label}
                </p>

                {/* Tool chips */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex items-center gap-2 bg-white/60 dark:bg-white/5 border border-foreground/8 dark:border-white/8 rounded-full pl-1 pr-3 py-1 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                    >
                      {/* Icon bubble */}
                      <div className={`w-6 h-6 rounded-full ${tool.bg} grid place-items-center shrink-0`}>
                        {tool.Icon ? (
                          <tool.Icon width={14} height={14} className={tool.iconClass} />
                        ) : (
                          <span className={`leading-none ${tool.iconClass}`}>{tool.abbr}</span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-foreground/75 whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
