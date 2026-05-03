"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, X } from "lucide-react";

export default function DarkModeToast() {
  const [visible, setVisible] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "dark") return;
    if (localStorage.getItem("darkToastSeen")) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, [resolvedTheme]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("darkToastSeen", "1");
  };

  const switchDark = () => {
    setTheme("dark");
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0e0a26]/90 backdrop-blur-xl px-5 py-3 shadow-2xl shadow-black/30 text-white animate-[floatY_0.4s_ease-out]"
    >
      <Moon size={16} className="text-accent shrink-0" />
      <p className="text-sm font-medium whitespace-nowrap">
        Best experienced in{" "}
        <span className="text-accent font-semibold">dark mode</span>
      </p>
      <button
        onClick={switchDark}
        className="ml-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent/80 transition-colors shrink-0"
      >
        Try it →
      </button>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="ml-1 text-white/40 hover:text-white/80 transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
