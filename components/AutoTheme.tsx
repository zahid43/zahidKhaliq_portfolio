"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const MANUAL_KEY = "themeManual";

function timeBasedTheme(): "light" | "dark" {
  return new Date().getHours() >= 6 && new Date().getHours() < 18 ? "light" : "dark";
}

export default function AutoTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const manual = localStorage.getItem(MANUAL_KEY) as "light" | "dark" | null;

    // Respect saved manual preference; otherwise apply time-based default
    setTheme(manual ?? timeBasedTheme());

    // At 6 AM / 6 PM, only auto-switch if the user hasn't manually chosen
    const id = setInterval(() => {
      if (localStorage.getItem(MANUAL_KEY)) return;
      const h = new Date().getHours();
      if (h === 6) setTheme("light");
      if (h === 18) setTheme("dark");
    }, 60_000);

    return () => clearInterval(id);
  }, [setTheme]);

  return null;
}
