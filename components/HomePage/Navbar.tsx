"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/ReusableSvgs";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "@/components/HomePage/MobileMenu";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-100 glass-header transition-[padding] duration-300 ${scrolled ? "py-0" : ""}`}
      >
        <div className="container">
          <nav className={`flex items-center justify-between transition-[padding] duration-300 ${scrolled ? "py-2" : "py-3"}`}>
            <a href="#home" aria-label="Home">
              <Logo width={160} height={40} className="text-accent" />
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-7 md:flex">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm font-medium text-foreground/60 transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}

              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />

            </div>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
