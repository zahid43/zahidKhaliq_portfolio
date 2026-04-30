import { Mail } from "lucide-react";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import GithubIcon from "@/components/ReusableSvgs/GithubIcon";

const socials = [
  {
    label: "LinkedIn",
    href: "/",
    icon: <LinkedinIcon width={16} height={16} aria-hidden="true" />,
    hover: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
  },
  {
    label: "GitHub",
    href: "/",
    icon: <GithubIcon width={16} height={16} aria-hidden="true" />,
    hover: "hover:bg-darkBlue hover:border-darkBlue hover:text-white dark:hover:bg-white dark:hover:text-darkBlue dark:hover:border-white",
  },
  {
    label: "Email",
    href: "mailto:zaahid.khaliq@gmail.com",
    icon: <Mail size={16} aria-hidden="true" />,
    hover: "hover:bg-rose-500 hover:border-rose-500 hover:text-white",
  },
];

export default function Footer() {
  return (
    <footer className="container py-10">
      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
        <div>
          <p className="text-lg font-semibold text-darkBlue dark:text-white">
            Zahid Khaliq
          </p>
          <p className="mt-1 text-sm text-darkBlue/50 dark:text-white/45">
            Frontend Engineer
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, icon, hover }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={[
                "grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-darkBlue shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-white/5 dark:text-white",
                hover,
              ].join(" ")}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-black/8 pt-6 text-xs text-darkBlue/40 dark:border-white/8 dark:text-white/35 sm:flex-row">
        <p>© {new Date().getFullYear()} Zahid Khaliq. All rights reserved.</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition hover:text-darkBlue dark:hover:text-white"
          >
            Next.js
          </a>
          {" & "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition hover:text-darkBlue dark:hover:text-white"
          >
            Tailwind CSS
          </a>
          {" · "}
          Inspired by{" "}
          <a
            href="https://www.figma.com/design/POGH7JC8mcsWXcCZx8DRuh/Free-Designer-Portfolio-and-Webflow-Template--Community---Community-?node-id=0-1&p=f&t=3xsvJ9aJXVZIHqFJ-0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition hover:text-darkBlue dark:hover:text-white"
          >
            this Figma template
          </a>
        </p>
      </div>
    </footer>
  );
}
