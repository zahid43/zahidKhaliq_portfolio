"use client";

interface SidebarIconProps {
  onClick: () => void;
  isOpen?: boolean;
  label?: string;
}

export default function SidebarIcon({ onClick, isOpen = false, label = "Open navigation menu" }: SidebarIconProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-surface transition-colors hover:bg-surface/70"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Outer rectangle */}
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" className="text-foreground" />

        {/* Right panel hover fill */}
        <rect x="15" y="3" width="6" height="18" fill="rgb(99 102 241 / 0)" className="transition-all duration-300 group-hover:fill-[rgb(99_102_241_/_0.15)]" />

        {/* Divider line — shifts right when open */}
        <line
          x1={isOpen ? "19" : "15"} y1="3"
          x2={isOpen ? "19" : "15"} y2="21"
          stroke="currentColor"
          className={`transition-all duration-300 ${isOpen ? "text-accent" : "text-foreground"}`}
        />
      </svg>
    </button>
  );
}
