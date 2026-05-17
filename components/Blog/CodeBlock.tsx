"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

const languageIcon: Record<string, string> = {
  tsx: "⚛",
  ts: "⚡",
  typescript: "⚡",
  javascript: "◈",
  js: "◈",
  css: "✦",
  scss: "✦",
  bash: "›",
  diff: "±",
  json: "{ }",
};

export default function CodeBlock({
  code,
  language,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const icon = languageIcon[language] ?? "◇";
  const displayName = filename ?? language;

  return (
    <div className="my-7 rounded-xl overflow-hidden shadow-2xl border border-white/8 ring-1 ring-black/10 dark:ring-white/5">
      {/* Window chrome / title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e1e22]">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] font-mono text-[#9a9a9a] tracking-wide">
          {displayName}
        </span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono text-[#9a9a9a] hover:text-white transition-colors duration-150 px-1.5"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex bg-[#18181f] border-b border-white/5">
        <div className="flex items-center gap-2 px-4 py-[7px] bg-[#12121a] border-t-[1.5px] border-t-[#6366f1]">
          <span className="text-[10px] text-[#858585]">{icon}</span>
          <span className="text-[12px] font-mono text-[#cccccc]">
            {displayName}
          </span>
        </div>
      </div>

      {/* Code area */}
      <div className="bg-[#12121a] overflow-x-auto">
        <SyntaxHighlighter
          language={language === "diff" ? "diff" : language}
          style={vscDarkPlus}
          showLineNumbers
          lineNumberStyle={{
            color: "#495162",
            minWidth: "2.5em",
            paddingRight: "1.2em",
            paddingLeft: "0.5em",
            borderRight: "1px solid #2a2d2e",
            marginRight: "1em",
            userSelect: "none",
            fontSize: "0.75rem",
          }}
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: "1.65",
            padding: "1rem 1rem 1.25rem",
          }}
          codeTagProps={{
            style: { fontFamily: "var(--font-geist-mono), monospace" },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
