"use client";

import { useState } from "react";

interface TerminalBlockProps {
  commands: string[];
  title?: string;
}

export default function TerminalBlock({
  commands,
  title = "bash",
}: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-7 rounded-xl overflow-hidden shadow-2xl border border-white/8 ring-1 ring-black/10 dark:ring-white/5">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d2d]">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] font-mono text-[#9a9a9a] tracking-wide">
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono text-[#9a9a9a] hover:text-white transition-colors duration-150 px-1.5"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Terminal body */}
      <div className="bg-[#0d1117] px-5 py-4 font-mono text-[13px] leading-6">
        {commands.map((cmd, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-[#4af626] select-none mt-px">$</span>
            <span className="text-[#f0f0f0] break-all">{cmd}</span>
          </div>
        ))}
        {/* Blinking cursor */}
        <div className="flex items-center gap-2.5 mt-1">
          <span className="text-[#4af626] select-none">$</span>
          <span className="inline-block h-[14px] w-[7px] bg-[#f0f0f0] opacity-70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
