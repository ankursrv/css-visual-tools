'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TOP_SEGMENTS, CONTACT_INFO } from '@/constants/header';

/**
 * Top teal bar:
 *  - Hidden on mobile/tablet (rendered inside mobile drawer on smaller viewports)
 *  - On desktop (xl+):
 *    - Segment tabs (Personal, Business, NRI, Careers, Investor Relations, Media) centered
 *    - Active segment shown as an orange rounded-pill badge
 *    - Accessibility, WhatsApp, and phone pinned to the right
 *    - Uses responsive flex layouts so zooming in never breaks or overlaps
 */
export function TopHeader() {
  const pathname = usePathname();

  function isActive(segment: (typeof TOP_SEGMENTS)[number]): boolean {
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

  return (
    <div className="hidden xl:block bg-brand-teal" role="navigation" aria-label="Site section navigation">
      <div className="mx-auto h-[52px] max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="relative flex h-full items-center justify-center">
          {/* ── Centred segment tabs ──────────────────────────────────────── */}
          <div className="flex justify-center min-w-0">
            <ul className="flex items-center gap-1.5 2xl:gap-[10px]" role="list">
              {TOP_SEGMENTS.map((seg) => {
                const active = isActive(seg);
                return (
                  <li key={seg.segment}>
                    <Link
                      href={seg.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex items-center py-1 text-[13px] 2xl:text-sm font-medium whitespace-nowrap',
                        'transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-white focus-visible:ring-offset-1',
                        'focus-visible:ring-offset-brand-teal rounded',
                        active
                          ? 'rounded-full bg-brand-orange text-white px-[14px]'
                          : 'text-white hover:text-brand-orange px-2',
                      )}
                    >
                      {seg.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: contact info ───────────────────────────────────────── */}
          <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3">
            {/* Accessibility icon */}
            <button
              type="button"
              aria-label="Accessibility options"
              className={cn(
                'flex items-center justify-center rounded-full p-1',
                'text-white hover:text-brand-orange transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              )}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                <path
                  d="M9 10h6M12 10v4M10 18l2-4 2 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* WhatsApp icon + number */}
            <a
              href={CONTACT_INFO.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CONTACT_INFO.whatsapp.ariaLabel}
              className={cn(
                'flex items-center gap-1.5 text-white/90 text-[12px]',
                'hover:text-brand-orange transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded',
              )}
            >
              <Image
                src="/images/icons/Frame.svg"
                alt="WhatsApp"
                width={28}
                height={28}
                aria-hidden="true"
                className="flex-shrink-0 h-7 w-7"
              />
              <span className="hidden 2xl:inline">{CONTACT_INFO.whatsapp.displayNumber}</span>
            </a>

            {/* Phone icon + number */}
            <a
              href={CONTACT_INFO.phone.href}
              aria-label={CONTACT_INFO.phone.ariaLabel}
              className={cn(
                'flex items-center gap-1.5 text-white/90 text-[12px]',
                'hover:text-brand-orange transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/Frame (1).svg"
                alt="Call us"
                width={22}
                height={22}
                aria-hidden="true"
                className="flex-shrink-0 h-5 w-5"
              />
              <span className="hidden 2xl:inline">{CONTACT_INFO.phone.displayNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
