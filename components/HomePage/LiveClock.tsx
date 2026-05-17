"use client";

import { useState, useEffect } from "react";
import { getLocalTZ } from "@/lib/date-utils";

export default function LiveClock() {
  const [display, setDisplay] = useState<{ city: string; time: string } | null>(null);

  useEffect(() => {
    const { city } = getLocalTZ();
    const tick = () =>
      setDisplay({
        city,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!display) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-darkBlue/40 dark:text-white/30">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      {display.city} · {display.time}
    </span>
  );
}
