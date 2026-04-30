"use client";

import { useState } from "react";
import { Logo } from "@/components/ReusableSvgs";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "@/components/HomePage/MobileMenu";

const navLinks = ["Home", "About me", "Projects", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-100 glass-header">
        <div className="container">
          <nav className="flex items-center justify-between py-3">
            <Logo width={200} height={50} className="text-accent" />

            {/* Desktop links */}
            <ul className="hidden items-center gap-18 md:flex">
              {navLinks.map((label) => (
                <li key={label}>{label}</li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-foreground/10 bg-surface transition-colors hover:bg-surface/70 md:hidden"
            >
              <span className="h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 group-hover:w-3.5" />
              <span className="h-0.5 w-5 rounded-full bg-foreground transition-all duration-300" />
              <span className="h-0.5 w-3 rounded-full bg-foreground transition-all duration-300 group-hover:w-5" />
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
