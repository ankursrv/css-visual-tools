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

  const isUiActive = pathname.startsWith("/ui");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? "bg-background/90 backdrop-blur-md border-foreground/10 py-3 shadow-md shadow-foreground/5"
          : "bg-background/60 backdrop-blur-sm border-transparent py-5 shadow-sm shadow-foreground/5"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
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
            <ul className="flex items-center gap-7">
              {/* 1. Home */}
              <li>
                <Link
                  href="/"
                  className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${pathname === "/" ? "text-blue-600" : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  Home
                  {pathname === "/" && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>

              {/* 2. Grid-Generator */}
              <li>
                <Link
                  href="/grid-generator"
                  className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${pathname === "/grid-generator"
                      ? "text-blue-600"
                      : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  Grid-Generator
                  {pathname === "/grid-generator" && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>

              {/* 3. UI Dropdown Menu */}
              <li className="relative group/ui">
                <button
                  type="button"
                  className={`relative py-2 text-sm font-semibold flex items-center gap-1.5 transition-colors duration-300 focus:outline-hidden ${isUiActive ? "text-blue-600" : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  <span>UI</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/ui:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {isUiActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </button>

                {/* Level 1 Dropdown Menu */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible -translate-y-2 group-hover/ui:opacity-100 group-hover/ui:visible group-hover/ui:translate-y-0 transition-all duration-200 ease-out pointer-events-none group-hover/ui:pointer-events-auto z-50">
                  <div className="w-64 p-2 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl shadow-zinc-950/15">
                    {/* Item 1: Next.js (With Nested Flyout Submenu) */}
                    <div className="relative group/nextjs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors group-hover/nextjs:bg-zinc-100 dark:group-hover/nextjs:bg-zinc-800/80">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs shadow-xs">
                            ▲
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                              Next.js
                            </span>
                            <span className="text-[11px] text-zinc-500">Custom UI Collection</span>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-zinc-400 group-hover/nextjs:text-blue-600 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* Level 2 Submenu (Flyout to the Right) */}
                      <div className="absolute left-full top-0 pl-3 opacity-0 invisible -translate-x-2 group-hover/nextjs:opacity-100 group-hover/nextjs:visible group-hover/nextjs:translate-x-0 transition-all duration-200 ease-out pointer-events-none group-hover/nextjs:pointer-events-auto">
                        <div className="w-60 p-2 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl shadow-zinc-950/15">
                          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Next.js UI Library
                          </div>

                          <Link
                            href="/banking"
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 transition-all text-xs font-semibold"
                          >
                            <span className="text-base">🏦</span>
                            <div className="flex flex-col text-left">
                              <span>Banking UI</span>
                              <span className="text-[10px] text-zinc-400 font-normal">
                                Accounts, Cards & Transfers
                              </span>
                            </div>
                          </Link>

                          <Link
                            href="/ui/nextjs/templates"
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 transition-all text-xs font-semibold"
                          >
                            <span className="text-base">🚀</span>
                            <div className="flex flex-col text-left">
                              <span>Templates & Blocks</span>
                              <span className="text-[10px] text-zinc-400 font-normal">
                                Hero, Navbars, Pricing
                              </span>
                            </div>
                          </Link>

                          <Link
                            href="/ui/nextjs/animations"
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 text-zinc-700 dark:text-zinc-300 transition-all text-xs font-semibold"
                          >
                            <span className="text-base">✨</span>
                            <div className="flex flex-col text-left">
                              <span>Animation Presets</span>
                              <span className="text-[10px] text-zinc-400 font-normal">
                                Micro-effects & Transitions
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: HTML / CSS */}
                    <Link
                      href="/ui/html-css"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        &lt;/&gt;
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          HTML / CSS
                        </span>
                        <span className="text-[11px] text-zinc-500">Pure CSS Effects & Layouts</span>
                      </div>
                    </Link>

                    {/* Item 3: Tailwind CSS (More than menu items) */}
                    <Link
                      href="/ui/tailwind"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        🎨
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            Tailwind CSS
                          </span>
                          <span className="px-1.5 py-0.2 rounded-sm bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[9px] font-bold">
                            v4
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500">Utilities & Custom Presets</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side: Empty for balance */}
        <div className="flex justify-end"></div>
      </div>
    </header>
  );
}
