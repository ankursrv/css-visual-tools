"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check on initial load
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-foreground/10 py-3 shadow-md shadow-foreground/5"
          : "bg-background/40 backdrop-blur-sm border-transparent py-5 shadow-sm shadow-foreground/5"
      }`}
    >
      <div className="container grid grid-cols-3 items-center">
        {/* Left Side: Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <span className="text-white font-bold text-xl leading-none font-serif italic">C</span>
            </div>
            {/* Logo Text */}
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hidden sm:block">
              CSS Visual Tools
            </span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="flex justify-center">
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/"
                  className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                    pathname === "/" ? "text-blue-600" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Home
                  {pathname === "/" && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/grid-generator"
                  className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                    pathname === "/grid-generator" ? "text-blue-600" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Grid-Generator
                  {pathname === "/grid-generator" && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side: Empty for balance (can be used for Theme Toggle, GitHub link, etc. later) */}
        <div className="flex justify-end"></div>
      </div>
    </header>
  );
}
