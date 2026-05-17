"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/components/ReusableSvgs";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    localStorage.setItem("themeManual", next);
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
      aria-label="Toggle theme"
    >
      {/* CSS-driven visibility — responds to the .dark class instantly, no mount wait */}
      <SunIcon  width={20} height={20} className="hidden dark:block text-amber-400" />
      <MoonIcon width={20} height={20} className="block dark:hidden text-darkBlue" />
    </button>
  );
}
