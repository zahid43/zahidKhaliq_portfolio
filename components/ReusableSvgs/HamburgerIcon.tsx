"use client";

interface HamburgerIconProps {
  onClick: () => void;
  label?: string;
}

export default function HamburgerIcon({ onClick, label = "Open navigation menu" }: HamburgerIconProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-foreground/10 bg-surface transition-colors hover:bg-surface/70"
    >
      <span className="h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 group-hover:w-3.5" />
      <span className="h-0.5 w-5 rounded-full bg-foreground transition-all duration-300" />
      <span className="h-0.5 w-3 rounded-full bg-foreground transition-all duration-300 group-hover:w-5" />
    </button>
  );
}
