"use client";
import { useState } from "react";

const sharedClass =
  "group my-3 flex w-full cursor-pointer items-center gap-4 rounded-xl border border-foreground/[0.07] bg-foreground/[0.02] px-5 py-4 text-left no-underline transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.04] hover:shadow-sm hover:shadow-accent/10";

const Sparkle = ({ glow }: { glow: boolean }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`shrink-0 transition-all duration-300 group-hover:scale-110 ${
      glow
        ? "text-accent drop-shadow-[0_0_4px_var(--color-accent)]"
        : "text-accent/35 group-hover:text-accent group-hover:drop-shadow-[0_0_4px_var(--color-accent)]"
    }`}
  >
    <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5Z" />
  </svg>
);

// ── Copy icon ─────────────────────────────────────────────────────────────────
const CopyIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0 text-foreground/20 transition-all duration-200 group-hover:text-accent"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

// ── Check icon (shown after copy) ─────────────────────────────────────────────
const CheckIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0 text-accent"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Arrow icon (shown on regular links) ──────────────────────────────────────
const ArrowIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0 text-foreground/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// ── Text block ────────────────────────────────────────────────────────────────
const LinkText = ({ text, description, active }: { text: string; description?: string; active: boolean }) => (
  <div className="min-w-0 flex-1">
    <span className={`relative inline-block font-medium text-[14px] transition-colors duration-200 ${active ? "text-accent" : "text-foreground/80 group-hover:text-accent"}`}>
      {text}
      <span className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left rounded-full bg-linear-to-r from-accent to-accentAlt transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
    </span>
    {description && (
      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
        {description}
      </span>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function MagicLink({
  href,
  text,
  description,
  copyable = false,
}: {
  href: string;
  text: string;
  description?: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  if (copyable) {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(href).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <button type="button" onClick={handleCopy} className={sharedClass}>
        <Sparkle glow={copied} />
        <LinkText text={text} description={description} active={copied} />
        <span className="text-[10px] uppercase tracking-widest text-muted transition-colors duration-200 group-hover:text-accent/70 shrink-0">
          {copied ? "copied!" : "click to copy"}
        </span>
        <span className="shrink-0">{copied ? <CheckIcon /> : <CopyIcon />}</span>
      </button>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={sharedClass}
    >
      <Sparkle glow={false} />
      <LinkText text={text} description={description} active={false} />
      <ArrowIcon />
    </a>
  );
}
