import Image from "next/image";
import SecondaryCard from "./SecondaryCard";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import WhatsAppIcon from "@/components/ReusableSvgs/WhatsAppIcon";
import XIcon from "@/components/ReusableSvgs/XIcon";
import { FileText, Phone, Mail, ArrowDownToLine } from "lucide-react";

const contactLinks = [
  {
    label: "Call",
    href: "tel:+923213022223",
    icon: <Phone size={15} />,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_0_14px_rgba(16,185,129,0.4)]",
  },
  {
    label: "Email",
    href: "mailto:zaahid.khaliq@gmail.com",
    icon: <Mail size={15} />,
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-[0_0_14px_rgba(14,165,233,0.4)]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923213022223",
    icon: <WhatsAppIcon />,
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_0_14px_rgba(34,197,94,0.4)]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zaahidkhaliq",
    icon: <LinkedinIcon width={15} height={15} />,
    className: "bg-[#0A66C2]/10 text-[#0A66C2] dark:text-[#60a5fa] border-[#0A66C2]/20 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.4)]",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/zaahidkhaliq",
    icon: <XIcon />,
    className: "bg-zinc-900/8 dark:bg-white/8 text-zinc-900 dark:text-white border-zinc-900/12 dark:border-white/12 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 hover:border-zinc-900 dark:hover:border-white hover:shadow-[0_0_14px_rgba(0,0,0,0.3)]",
  },
];

export default function Contacts() {
  return (
    <>
      <section id="contact" className="container my-20 lg:my-30 relative overflow-hidden">
        {/* Galaxy dust dots */}
        <div className="pointer-events-none absolute top-4 left-1/3 h-1 w-1 rounded-full bg-darkBlue/25 dark:bg-white/50" />
        <div className="pointer-events-none absolute bottom-6 right-1/4 h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/40" />
        <div className="pointer-events-none absolute top-1/2 left-[12%] h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/35" />

        {/* Spinning stars */}
        <Image src="/images/star.svg" alt="" width={22} height={22}
          className="pointer-events-none absolute top-2 right-8 opacity-20 dark:opacity-45 animate-spin [animation-duration:13s]" />
        <Image src="/images/star.svg" alt="" width={14} height={14}
          className="pointer-events-none absolute bottom-4 left-6 opacity-15 dark:opacity-35 animate-spin [animation-duration:18s] [animation-direction:reverse]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <SecondaryCard
            heading={
              <span className="inline-flex items-center gap-2.5">
                <span>HIRE ME</span>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                <span>20+ PROJECTS DELIVERED</span>
              </span>
            }
            desc="Let's build something great together."
            bgUpdate="bg-gradient-to-br from-violet-300 via-indigo-300 to-teal-200 dark:from-[#07021a] dark:via-[#13065e] dark:to-[#0a1a50]"
            backBox="bg-gradient-to-br from-violet-500 via-indigo-500 to-teal-400 dark:from-teal-500 dark:via-indigo-600 dark:to-violet-700"
            cardHeight="min-h-90"
            cardPadding="px-6 md:px-12 lg:px-20 xl:px-30"
          >
            <div className="flex flex-col gap-2.5 w-full max-w-[300px]">

              {/* Resume — hero button */}
              <a
                href="/resume/Zahid_Khaliq_Frontend_engineer.pdf"
                download="Zahid Khaliq - Frontend Engineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full rounded-2xl bg-gradient-to-r from-amber-300 to-amber-400 dark:from-amber-400 dark:to-yellow-400 px-5 py-3.5 text-zinc-900 shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_28px_rgba(251,191,36,0.6)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* shimmer */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900/12 shrink-0">
                    <FileText size={17} />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-none">Download Resume</div>
                    <div className="text-[11px] text-zinc-900/55 mt-0.5">PDF · Frontend Engineer</div>
                  </div>
                </div>
                <ArrowDownToLine size={15} className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>

              {/* Contact links — 6-col bento grid */}
              <div className="grid grid-cols-6 gap-2">
                {contactLinks.slice(0, 3).map(({ label, href, icon, className }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className={`col-span-2 flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition-all duration-200 hover:scale-[1.04] ${className}`}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
                {contactLinks.slice(3).map(({ label, href, icon, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`col-span-3 flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition-all duration-200 hover:scale-[1.03] ${className}`}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>

            </div>
          </SecondaryCard>
        </div>

      </section>
    </>
  );
}
