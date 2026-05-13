"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ReusableSvgs";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "@/components/HomePage/MobileMenu";
import { navLinks, pageNavLinks } from "@/lib/constants";
import { HamburgerIcon } from "@/components/ReusableSvgs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
            <a href={isHome ? "#home" : "/"} aria-label="Home">
              <Logo width={160} height={40} className="text-accent" />
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-7 md:flex">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href={`${isHome ? "" : "/"}#${label.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm font-medium text-foreground/60 transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}

              {pageNavLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      pathname === href
                        ? "text-accent"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile: hamburger only — ThemeToggle lives in the sidebar */}
            <div className="md:hidden">
              <HamburgerIcon onClick={() => setMenuOpen(true)} />
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
