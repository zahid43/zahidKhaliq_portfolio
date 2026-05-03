import Image from "next/image";
import SecondaryCard from "./SecondaryCard";
import CustomButton from "./CustomButton";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import { FileText } from "lucide-react";

const contactData = [
  {
    title: (
      <span className="inline-flex items-center gap-2.5">
        <span>HIRE ME</span>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50"></span>
        <span>20+ PROJECTS DELIVERED</span>
      </span>
    ),
    para: "Let's build something great together.",
  },
];

export default function Contacts() {
  return (
    <>
      <section className="container my-20 lg:my-30 relative overflow-hidden">
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
            heading={contactData[0].title}
            desc={contactData[0].para}
            bgUpdate="bg-gradient-to-br from-violet-300 via-indigo-300 to-teal-200 dark:from-[#07021a] dark:via-[#13065e] dark:to-[#0a1a50]"
            backBox="bg-gradient-to-br from-violet-500 via-indigo-500 to-teal-400 dark:from-teal-500 dark:via-indigo-600 dark:to-violet-700"
            cardHeight="min-h-90"
            cardPadding="px-6 md:px-12 lg:px-20 xl:px-30"
          >
            <div className="flex flex-col gap-3 w-full max-w-[320px]">
              {/* Primary Action */}
              <CustomButton textClassName="flex items-center justify-center gap-2 bg-amber-100 text-zinc-950 hover:bg-amber-200 dark:bg-amber-200 dark:text-zinc-900 px-8 py-3 text-base font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all w-full">
                Contact me
              </CustomButton>

              {/* Secondary Actions */}
              <div className="flex flex-row gap-3 w-full">
                <CustomButton textClassName="flex items-center justify-center gap-2 bg-[#0A66C2] px-4 py-2.5 text-sm font-medium w-full transition-transform hover:scale-[1.02]">
                  <LinkedinIcon width={16} height={16} aria-hidden="true" />
                  LinkedIn
                </CustomButton>
                <CustomButton textClassName="flex items-center justify-center gap-2 bg-violet-600 px-4 py-2.5 text-sm font-medium w-full transition-transform hover:scale-[1.02]">
                  <FileText size={16} aria-hidden="true" />
                  Resume
                </CustomButton>
              </div>
            </div>
          </SecondaryCard>
        </div>

      </section>
    </>
  );
}
