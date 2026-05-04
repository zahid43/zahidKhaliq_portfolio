import React from 'react';
import Image from 'next/image';

const experiences = [
  {
    id: 1,
    company: "Devfied",
    location: "Lahore, Pakistan",
    date: "2026 - Present",
    role: "Frontend Developer",
    logo: "/images/logo/devfiedDarkLogo.webp",
    logoClass: "",
    description: [],
    cardGradient: "from-teal-50 via-cyan-50 to-emerald-100 dark:from-[#041510] dark:via-[#071e1a] dark:to-[#0c1428]",
    borderColor: "border-teal-200/80 dark:border-teal-500/20 hover:border-teal-400/50 dark:hover:border-teal-400/40",
    glowTop: "bg-teal-400/15 dark:bg-teal-500/20",
    glowBottom: "bg-cyan-400/10 dark:bg-cyan-500/15",
    badgeColor: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-500/30",
    accentColor: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
  },
  {
    id: 2,
    company: "Square 63",
    location: "Lahore, Pakistan",
    date: "2021 - Present",
    role: "Software Engineer (Design)",
    logo: "/images/logo/square63-logo.svg",
    logoClass: "",
    description: [
      "Over 4 years of experience delivering high-quality projects, consistently meeting deadlines and exceeding client expectations.",
      "Collaborate effectively with PHP, React, and Ruby on Rails (ROR) teams to ensure seamless integration of design and functionality.",
      "Specialized in crafting responsive and adaptive designs, ensuring optimal user experience across a wide range of devices and screen sizes.",
      "Committed to developing scalable and reusable code, driving long-term efficiency and maintainability in all design and development efforts."
    ],
    cardGradient: "from-indigo-50 via-violet-50 to-purple-100 dark:from-[#06061e] dark:via-[#0a0828] dark:to-[#100a30]",
    borderColor: "border-indigo-200/80 dark:border-indigo-500/20 hover:border-indigo-400/50 dark:hover:border-indigo-400/40",
    glowTop: "bg-indigo-400/15 dark:bg-indigo-500/20",
    glowBottom: "bg-violet-400/10 dark:bg-violet-500/15",
    badgeColor: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30",
    accentColor: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
  },
  {
    id: 3,
    company: "Freelancer",
    location: "Lahore, Pakistan",
    date: "2020 - 2021",
    role: "UI Developer",
    logo: null,
    logoClass: "",
    description: [
      "Delivered custom web designs with a focus on scalability and reusability, utilizing Bootstrap, CSS, and SCSS for responsive layouts.",
      "Developed clean, maintainable code to ensure seamless functionality across different platforms and devices."
    ],
    cardGradient: "from-amber-50 via-orange-50 to-yellow-100 dark:from-[#1a1005] dark:via-[#1e1205] dark:to-[#241508]",
    borderColor: "border-amber-200/80 dark:border-amber-500/20 hover:border-amber-400/50 dark:hover:border-amber-400/40",
    glowTop: "bg-amber-400/15 dark:bg-amber-500/20",
    glowBottom: "bg-orange-400/10 dark:bg-orange-500/15",
    badgeColor: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30",
    accentColor: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
  }
];

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  const initial = exp.company.trim()[0].toUpperCase();

  return (
    <div className={`relative bg-linear-to-br ${exp.cardGradient} backdrop-blur-xl border ${exp.borderColor} rounded-2xl p-6 lg:p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden`}>

      {/* Nebula glow orbs */}
      <div className={`pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full ${exp.glowTop} blur-3xl`} />
      <div className={`pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full ${exp.glowBottom} blur-2xl opacity-70`} />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute top-4 right-8 opacity-20 dark:opacity-50 animate-spin [animation-duration:14s]" />
      <Image src="/images/star.svg" alt="" width={12} height={12}
        className="pointer-events-none absolute bottom-5 right-5 opacity-15 dark:opacity-40 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

      {/* Galaxy dust dots */}
      <div className="pointer-events-none absolute top-5 left-1/3 h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/50" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/35" />
      <div className="pointer-events-none absolute bottom-7 left-1/4 h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/40" />

      <div className="relative z-10">
        {/* Top row: date badge + logo */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${exp.badgeColor}`}>
            {exp.date}
          </div>
          {exp.logo ? (
            <div className={exp.logoClass}>
              <Image src={exp.logo} alt={exp.company} width={80} height={28}
                className="object-contain h-7 w-auto" />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-darkBlue shadow">
              {initial}
            </div>
          )}
        </div>

        {/* Role */}
        <p className={`text-base font-bold mb-1 transition-colors duration-300 ${exp.accentColor}`}>{exp.role}</p>

        {/* Company + location */}
        <p className="text-sm font-medium text-darkBlue/60 dark:text-white/60 mb-4 flex items-center gap-1.5">
          {exp.company}
          <span className="opacity-50">·</span>
          <span className="text-xs font-normal opacity-70">{exp.location}</span>
        </p>

        {/* Description */}
        {exp.description.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {exp.description.map((desc, i) => (
              <li key={i} className="text-xs leading-relaxed text-darkBlue/75 dark:text-white/75 flex items-start">
                <span className="mr-2.5 mt-1 text-accent text-xs opacity-70">✦</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">Currently building</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-16 lg:py-24">
      {/* Galaxy Background Effects */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/15 blur-3xl" />
      <Image src="/images/star.svg" alt="" width={20} height={20}
        className="pointer-events-none absolute top-[15%] left-[20%] opacity-30 dark:opacity-50 animate-spin [animation-duration:15s]" />
      <Image src="/images/star.svg" alt="" width={14} height={14}
        className="pointer-events-none absolute bottom-[15%] right-[25%] opacity-20 dark:opacity-40 animate-spin [animation-duration:18s] [animation-direction:reverse]" />
      <div className="pointer-events-none absolute top-[25%] right-[15%] h-2 w-2 rounded-full bg-darkBlue/25 dark:bg-white/50" />
      <div className="pointer-events-none absolute bottom-[35%] left-[10%] h-1.5 w-1.5 rounded-full bg-darkBlue/20 dark:bg-white/40" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Experience
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">Professional Journey</h4>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-linear-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
          <div className="absolute left-[20px] lg:hidden top-4 bottom-4 w-[2px] -translate-x-1/2 bg-linear-to-b from-transparent via-accent/30 to-transparent" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.id} className={`relative flex flex-col lg:flex-row w-full items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>

                  {/* Pulsing center dot */}
                  <div className="absolute left-[20px] lg:left-1/2 -translate-x-1/2 z-20 top-8 lg:top-1/2 lg:-translate-y-1/2">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 scale-[2] rounded-full bg-accent/30 animate-ping [animation-duration:2.5s]" />
                      <div className="relative w-full h-full rounded-full bg-background border-[3px] border-accent shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                    </div>
                  </div>

                  {/* Horizontal connecting line */}
                  <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2rem)] h-[2px] bg-linear-to-r ${isEven ? 'right-1/2 from-transparent to-accent/20' : 'left-1/2 from-accent/20 to-transparent'} z-10`} />

                  <div className="hidden lg:block w-1/2" />

                  <div className={`w-full lg:w-1/2 pl-14 lg:pl-0 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <ExperienceCard exp={exp} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
