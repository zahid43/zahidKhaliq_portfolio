"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/components/ReusableSvgs";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
      aria-label="Toggle theme"
    >
      {/* CSS-driven visibility — responds to the .dark class instantly, no mount wait */}
      <SunIcon  width={20} height={20} className="hidden dark:block text-amber-400" />
      <MoonIcon width={20} height={20} className="block dark:hidden text-darkBlue" />
    </button>
  );
}
