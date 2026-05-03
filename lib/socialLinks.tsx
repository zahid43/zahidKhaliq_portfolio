import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import GithubIcon from "@/components/ReusableSvgs/GithubIcon";
import { XIcon } from "@/components/ReusableSvgs";
import type { ComponentType } from "react";

interface SocialLink {
  href: string;
  label: string;
  Icon: ComponentType<{ width?: number; height?: number }>;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com/in/zaahidkhaliq",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  {
    href: "https://github.com/zaahidkhaliq",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    href: "https://x.com/zaahidkhaliq",
    label: "X / Twitter",
    Icon: XIcon,
  },
];
