"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ReusableSvgs";
import Sidebar from "@/components/HomePage/Sidebar";
import { SidebarIcon } from "@/components/ReusableSvgs";

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

            <SidebarIcon onClick={() => setMenuOpen(true)} isOpen={menuOpen} />
          </nav>
        </div>
      </header>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
