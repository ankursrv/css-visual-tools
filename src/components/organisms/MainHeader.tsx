'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MegaMenu } from '@/components/molecules/MegaMenu';
import { SearchPopup } from '@/components/molecules/SearchPopup';
import {
  APPLY_NOW_MENU,
  CONTACT_INFO,
  LOGIN_OPTIONS,
  MAIN_NAV,
  TOP_SEGMENTS,
} from '@/constants/header';

/** Sentinel key for the Apply Now hover state */
const APPLY_NOW_KEY = '__apply-now__';

/**
 * Main Header component:
 *
 * 1. Desktop View (xl+):
 *    - Left: Ujjivan Small Finance Bank brand logo
 *    - Center: Desktop nav (Savings, Deposits, Loans, Insurance, Investment, Forex, Digi Banking, Rewardz, Blogs)
 *    - Right: Apply Now dropdown + Login pill button + Search trigger
 *
 * 2. Mobile / Zoomed View (< xl):
 *    - Left: Hamburger menu toggle + Ujjivan Logo
 *    - Right: Search trigger + Accessibility icon + WhatsApp icon + Login pill button
 *
 * 3. Mobile Navigation Drawer:
 *    - Top: Ujjivan Logo + Close (✕) button
 *    - Row 2: Teal band with horizontal scrollable segment tabs (Personal, Business, NRI, Careers, etc.)
 *    - Body: Smooth accordion navigation matching the mobile design screenshot
 */
export function MainHeader() {
  const pathname = usePathname();

  // ── State ─────────────────────────────────────────────────────────────────
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const loginMobileBtnRef = useRef<HTMLButtonElement>(null);
  const loginPanelRef = useRef<HTMLDivElement>(null);

  // ── Active Segment Helper ─────────────────────────────────────────────────
  function isActiveSegment(segment: (typeof TOP_SEGMENTS)[number]): boolean {
    if (segment.segment === 'personal') {
      return (
        pathname === '/' ||
        !TOP_SEGMENTS.slice(1).some(
          (s) => pathname === s.href || pathname.startsWith(s.href + '/'),
        )
      );
    }
    return pathname === segment.href || pathname.startsWith(segment.href + '/');
  }

  // ── Hover helpers ─────────────────────────────────────────────────────────
  const handleNavEnter = useCallback((key: string) => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setIsLoginOpen(false);
    setActiveMenu(key);
  }, []);

  const handleNavLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 80);
  }, []);

  const handleMenuEnter = useCallback(() => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 80);
  }, []);

  // ── Login dropdown — click-outside close ──────────────────────────────────
  useEffect(() => {
    if (!isLoginOpen) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (
        !loginPanelRef.current?.contains(t) &&
        !loginBtnRef.current?.contains(t) &&
        !loginMobileBtnRef.current?.contains(t)
      ) {
        setIsLoginOpen(false);
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isLoginOpen]);

  useEffect(() => {
    if (!isLoginOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setIsLoginOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isLoginOpen]);

  // ── Mobile — scroll lock + resize close ───────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    function onResize() { if (window.innerWidth >= 1280) setIsMobileOpen(false); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── White background band (full viewport width) ──────────────────── */}
      <div className="bg-white border-b border-gray-200 relative z-40">
        <div
          className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0"
          onMouseLeave={handleNavLeave}
        >
          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP HEADER ROW (xl:flex)
          ══════════════════════════════════════════════════════════════════ */}
          <div className="hidden xl:flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Ujjivan Small Finance Bank — Go to homepage"
              className="max-w-[280px] 2xl:max-w-[304px] flex-shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
            >
              <Image
                src="/images/icons/Ujjivan_Logo.webp"
                alt="Ujjivan Small Finance Bank"
                width={160}
                height={48}
                loading="eager"
                fetchPriority="high"
                className="h-[46px] 2xl:h-[48px] w-auto object-contain"
              />
            </Link>

            {/* ── Desktop nav ──────────────────────────────────────────── */}
            <nav aria-label="Main navigation" className="relative flex items-center h-full">
              <ul className="flex items-center gap-x-1 2xl:gap-x-[10px]" role="list">
                {MAIN_NAV.map((item) => {
                  const isActive = activeMenu === item.label;
                  const hasMenu = !!item.megaMenu;

                  return (
                    <li key={item.label}>
                      {hasMenu ? (
                        /* Nav item WITH mega menu — rendered as button */
                        <button
                          type="button"
                          onMouseEnter={() => handleNavEnter(item.label)}
                          aria-expanded={isActive}
                          aria-haspopup="true"
                          aria-controls={`mega-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                          className={cn(
                            'flex items-center gap-0.5 py-7 text-[13px] 2xl:text-sm font-medium',
                            'transition-colors duration-150 whitespace-nowrap',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-brand-teal focus-visible:ring-inset',
                            isActive ? 'text-brand-teal' : 'text-gray-700 hover:text-brand-teal',
                          )}
                        >
                          {item.label}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className={cn('flex-shrink-0 transition-transform duration-200', isActive ? 'rotate-180' : '')}
                          >
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      ) : (
                        /* Nav item WITHOUT mega menu — plain link (Rewardz, Blogs) */
                        <Link
                          href={item.href ?? '#'}
                          className={cn(
                            'flex items-center px-1.5 2xl:px-2.5 py-5 text-[13px] 2xl:text-sm font-medium whitespace-nowrap',
                            'text-gray-700 hover:text-brand-teal transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-brand-teal focus-visible:ring-inset',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Nav item mega menus — anchored relative to <nav> left edge (aligned with Savings) */}
              {MAIN_NAV.map((item) =>
                item.megaMenu ? (
                  <MegaMenu
                    key={item.label}
                    id={`mega-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    data={item.megaMenu}
                    isOpen={activeMenu === item.label}
                    onMouseEnter={handleMenuEnter}
                    onMouseLeave={handleMenuLeave}
                    align="left"
                  />
                ) : null,
              )}
            </nav>

            {/* ── Desktop CTAs ─────────────────────────────────────────── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Apply Now — hover triggers full mega menu */}
              <button
                type="button"
                onMouseEnter={() => handleNavEnter(APPLY_NOW_KEY)}
                aria-expanded={activeMenu === APPLY_NOW_KEY}
                aria-haspopup="true"
                aria-controls="mega-apply-now"
                className={cn(
                  'flex items-center gap-1 rounded-full bg-brand-orange px-4 py-1.5 h-10',
                  'text-[13px] font-semibold text-white whitespace-nowrap',
                  'transition-all hover:bg-brand-orange-dark hover:shadow-md',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-brand-orange focus-visible:ring-offset-2',
                )}
              >
                Apply Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  className={cn('flex-shrink-0 transition-transform', activeMenu === APPLY_NOW_KEY ? 'rotate-180' : '')}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Login — click toggle */}
              <div className="relative">
                <button
                  ref={loginBtnRef}
                  id="header-login-button"
                  type="button"
                  onClick={() => { setActiveMenu(null); setIsLoginOpen((p) => !p); }}
                  aria-expanded={isLoginOpen}
                  aria-haspopup="listbox"
                  aria-controls="login-dropdown"
                  className={cn(
                    'flex items-center gap-1 rounded-full bg-brand-orange px-4 py-1.5 h-10',
                    'text-[13px] font-semibold text-white whitespace-nowrap transition-all',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-brand-orange focus-visible:ring-offset-2',
                    isLoginOpen
                      ? 'bg-brand-orange-dark text-white'
                      : 'bg-brand-orange text-white',
                  )}
                >
                  Login
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                    className={cn('flex-shrink-0 transition-transform', isLoginOpen ? 'rotate-180' : '')}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Search icon */}
              <button
                type="button"
                id="header-search-trigger"
                onClick={() => { setActiveMenu(null); setIsLoginOpen(false); setIsSearchOpen((p) => !p); }}
                aria-label="Open search"
                className={cn(
                  'rounded-full py-2 pl-2 text-gray-600',
                  'hover:bg-gray-100 hover:text-brand-teal transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-brand-teal focus-visible:ring-offset-2',
                )}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16.5 16.5l4 4" />
                </svg>
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              MOBILE & ZOOMED HEADER ROW (< xl) — EXACTLY MATCHING SCREENSHOT 1
          ══════════════════════════════════════════════════════════════════ */}
          <div className="flex xl:hidden h-14 sm:h-16 items-center justify-between gap-2">
            
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
             

              <Link
                href="/"
                aria-label="Ujjivan Small Finance Bank — Go to homepage"
                className="inline-flex items-center min-w-[130px] h-9"
              >
                <Image
                  src="/images/icons/Ujjivan_Logo.webp"
                  alt="Ujjivan Small Finance Bank"
                  width={130}
                  height={34}
                  loading="eager"
                  fetchPriority="high"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right: Search, Accessibility, WhatsApp, Login Pill */}
            <div className="flex items-center sm:gap-2.5 flex-shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="p-1 text-gray-700 hover:text-brand-teal transition-colors rounded"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16.5 16.5l4 4" />
                </svg>
              </button>

              {/* Accessibility Icon */}
              <button
                type="button"
                aria-label="Accessibility options"
                className="p-1 text-gray-700 hover:text-brand-teal transition-colors rounded"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                  <path d="M9 10h6M12 10v4M10 18l2-4 2 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* WhatsApp Icon */}
              <a
                href={CONTACT_INFO.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CONTACT_INFO.whatsapp.ariaLabel}
                className="flex items-center justify-center p-1 w-10 h-10 hover:opacity-85 transition-opacity"
              >
                <Image
                  src="/images/icons/Frame.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="size-10 object-contain"
                />
              </a>

              {/* Login Pill Button */}
              <button
                ref={loginMobileBtnRef}
                type="button"
                onClick={() => setIsLoginOpen((p) => !p)}
                aria-expanded={isLoginOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1 rounded-full bg-brand-orange px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                Login
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn('transition-transform duration-200', isLoginOpen ? 'rotate-180' : '')}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {/* Right: Hamburger + Brand Logo */}
               <button
                type="button"
                id="mobile-menu-trigger"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-nav-drawer"
                className="pl-2 text-gray-700 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Login dropdown panel (Shared for desktop & mobile) ────────── */}
          <div
            ref={loginPanelRef}
            id="login-dropdown"
            role="listbox"
            aria-label="Login options"
            className={cn(
              'absolute right-4 sm:right-6 lg:right-8 top-full z-50 mt-1 w-64 sm:w-72',
              'rounded-xl bg-white shadow-2xl ring-1 ring-black/10',
              'transition-all duration-150 ease-out origin-top-right',
              isLoginOpen
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none hidden',
            )}
          >
            <div className="py-2">
              {LOGIN_OPTIONS.map((opt, idx) => (
                <Link
                  key={opt.href}
                  href={opt.href}
                  role="option"
                  aria-selected={false}
                  onClick={() => setIsLoginOpen(false)}
                  className={cn(
                    'block px-5 py-3 text-[13px] font-medium text-gray-800',
                    'hover:bg-gray-50 hover:text-brand-teal transition-colors',
                    'focus-visible:outline-none focus-visible:ring-inset',
                    'focus-visible:ring-2 focus-visible:ring-brand-teal',
                    idx < LOGIN_OPTIONS.length - 1 && 'border-b border-gray-100',
                  )}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Apply Now mega menu — aligned to right ────────────────────── */}
          <MegaMenu
            id="mega-apply-now"
            data={APPLY_NOW_MENU}
            isOpen={activeMenu === APPLY_NOW_KEY}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
            align="right"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE NAV DRAWER — EXACTLY MATCHING SCREENSHOT 2
      ══════════════════════════════════════════════════════════════════════ */}
      {isMobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Site navigation"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex flex-col bg-white xl:hidden translate-x-0 pointer-events-auto"
        >
        {/* Drawer Header: Logo + Close Button */}
        <div className="flex h-14 sm:h-16 flex-shrink-0 items-center justify-between px-4 sm:px-6 border-b border-gray-100">
          <Link href="/" onClick={() => setIsMobileOpen(false)} aria-label="Home">
            <Image
              src="/images/icons/Ujjivan_Logo.webp"
              alt="Ujjivan Small Finance Bank"
              width={140}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
            className="p-1.5 text-gray-700 hover:text-black transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Teal Segment Strip: Personal, Business, NRI, Careers, Investor Relations, Media */}
        <div className="flex-shrink-0 bg-brand-teal px-3 py-2.5 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-2 sm:gap-3" role="list">
            {TOP_SEGMENTS.map((seg) => {
              const active = isActiveSegment(seg);
              return (
                <li key={seg.segment} className="flex-shrink-0">
                  <Link
                    href={seg.href}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex items-center px-3.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors',
                      active
                        ? 'rounded-full bg-brand-orange text-white'
                        : 'text-white hover:text-brand-orange',
                    )}
                  >
                    {seg.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Scrollable Accordion Nav List matching Screenshot 2 */}
        <nav aria-label="Mobile site navigation" className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-100" role="list">
            {MAIN_NAV.map((item) => {
              const isExpanded = mobileExpanded === item.label;
              const hasMega = !!item.megaMenu;

              return (
                <li key={item.label}>
                  {hasMega ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-center justify-between px-4 sm:px-6 py-3.5 text-left hover:bg-gray-50/70 transition-colors"
                      >
                        <span className="text-[15px] font-semibold text-brand-teal">
                          {item.label}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn(
                            'flex-shrink-0 text-brand-teal transition-transform duration-200',
                            isExpanded ? 'rotate-180' : '',
                          )}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Accordion Sub-items */}
                      {isExpanded && item.megaMenu && (
                        <div className="border-t border-gray-100 bg-white">
                          {item.megaMenu.columns.map((col, cIdx) => (
                            <div key={cIdx} className={cn(cIdx > 0 && 'border-t border-gray-200')}>
                              {col.links?.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="block px-6 py-2.5 text-[14px] text-brand-teal hover:text-brand-orange hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {link.label}
                                </Link>
                              ))}
                              {col.sections?.map((sec) => (
                                <div key={sec.title} className="border-t border-gray-100">
                                  <p className="px-6 py-2 text-[12px] font-bold text-gray-700 bg-gray-50/80">
                                    {sec.title}
                                  </p>
                                  {sec.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => setIsMobileOpen(false)}
                                      className="block pl-8 pr-6 py-2.5 text-[14px] text-brand-teal hover:text-brand-orange hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}

                          {/* Quick links if available for this category */}
                          {item.megaMenu.quickLinks && item.megaMenu.quickLinks.length > 0 && (
                            <div className="border-t border-gray-200">
                              {item.megaMenu.quickLinks.map((ql) => (
                                <Link
                                  key={ql.href}
                                  href={ql.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="block px-6 py-2.5 text-[14px] text-brand-teal hover:text-brand-orange hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {ql.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href ?? '#'}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 sm:px-6 py-3.5 text-[15px] font-semibold text-brand-teal hover:bg-gray-50/70 hover:text-brand-orange transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      )}

      {/* ── Search popup ──────────────────────────────────────────────────── */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
