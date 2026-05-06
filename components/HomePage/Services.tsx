import Image from "next/image";

const services = [
  {
    title: "Webflow Development",
    description:
      "End-to-end Webflow builds — from blank canvas to a fully responsive, CMS-powered live site using Client First methodology.",
    points: ["Webflow CMS & collections", "GSAP / Lottie animations", "Client First structure", "Responsive across all devices"],
    cardGradient: "from-teal-50 via-cyan-50 to-emerald-100 dark:from-[#041510] dark:via-[#071e1a] dark:to-[#0c1428]",
    borderColor: "border-teal-200/80 dark:border-teal-500/20 hover:border-teal-400/50 dark:hover:border-teal-400/40",
    glowColor: "bg-teal-400/20 dark:bg-teal-500/25",
    badgeColor: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-500/30",
    dotColor: "bg-teal-500",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l2.5 2.5L7 13" />
        <path d="M13 13h4" />
      </svg>
    ),
  },
  {
    title: "React & Next.js Apps",
    description:
      "Scalable, performant web applications built with React and Next.js — from component systems to full-stack deployments.",
    points: ["Component architecture", "SSR / SSG / ISR", "API routes & integrations", "Tailwind CSS styling"],
    cardGradient: "from-indigo-50 via-blue-50 to-violet-100 dark:from-[#06061e] dark:via-[#0a0828] dark:to-[#100a30]",
    borderColor: "border-indigo-200/80 dark:border-indigo-500/20 hover:border-indigo-400/50 dark:hover:border-indigo-400/40",
    glowColor: "bg-indigo-400/20 dark:bg-indigo-500/25",
    badgeColor: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30",
    dotColor: "bg-indigo-500",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "HTML / CSS / SCSS",
    description:
      "Pixel-perfect UI implementation from any Figma or design file — clean, maintainable, and cross-browser ready.",
    points: ["Bootstrap 5 layouts", "Custom SCSS architecture", "BEM / utility-first", "Cross-browser compatibility"],
    cardGradient: "from-violet-50 via-purple-50 to-fuchsia-100 dark:from-[#0e0520] dark:via-[#140728] dark:to-[#1c0a32]",
    borderColor: "border-violet-200/80 dark:border-violet-500/20 hover:border-violet-400/50 dark:hover:border-violet-400/40",
    glowColor: "bg-violet-400/20 dark:bg-violet-500/25",
    badgeColor: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300/50 dark:border-violet-500/30",
    dotColor: "bg-violet-500",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "CMS & Backend Integration",
    description:
      "Connecting frontends to Drupal, WordPress, Rails and more — structured content, APIs, and database-driven features.",
    points: ["Drupal & WordPress themes", "Ruby on Rails + Tailwind", "REST API consumption", "PostgreSQL / MySQL"],
    cardGradient: "from-amber-50 via-orange-50 to-yellow-100 dark:from-[#1a1005] dark:via-[#1e1205] dark:to-[#241508]",
    borderColor: "border-amber-200/80 dark:border-amber-500/20 hover:border-amber-400/50 dark:hover:border-amber-400/40",
    glowColor: "bg-amber-400/20 dark:bg-amber-500/25",
    badgeColor: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30",
    dotColor: "bg-amber-500",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-teal-400/10 dark:bg-teal-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl" />

      <Image src="/images/star.svg" alt="" width={20} height={20}
        className="pointer-events-none absolute top-[12%] left-[18%] opacity-25 dark:opacity-45 animate-spin [animation-duration:14s]" />
      <Image src="/images/star.svg" alt="" width={13} height={13}
        className="pointer-events-none absolute bottom-[18%] right-[22%] opacity-20 dark:opacity-35 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
            <span className="h-[2px] w-4 rounded-full bg-accent" />
            Services
            <span className="h-[2px] w-4 rounded-full bg-accent" />
          </span>
          <h4 className="font-bold">What I Build</h4>
          <p className="text-sm text-muted mt-3 max-w-md mx-auto">
            From Figma to deployment — I cover the full frontend spectrum, with deep experience in the tools that ship fast and scale well.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative bg-gradient-to-br ${service.cardGradient} border ${service.borderColor} rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl group overflow-hidden`}
            >
              {/* Glow orb */}
              <div className={`pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full ${service.glowColor} blur-2xl`} />

              {/* Spinning star */}
              <Image src="/images/star.svg" alt="" width={14} height={14}
                className="pointer-events-none absolute top-4 right-6 opacity-20 dark:opacity-50 animate-spin [animation-duration:12s]" />

              <div className="relative z-10">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className={`rounded-xl p-2.5 border ${service.badgeColor} bg-gradient-to-br`}>
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h6 className="font-bold mb-2">{service.title}</h6>

                {/* Description */}
                <p className="text-xs leading-relaxed text-muted mb-5">{service.description}</p>

                {/* Points */}
                <ul className="flex flex-col gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-xs text-foreground/70">
                      <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
