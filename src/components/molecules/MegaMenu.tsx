'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { MegaMenuData } from '@/constants/header';

interface MegaMenuProps {
  id: string;
  data: MegaMenuData;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  align?: 'left' | 'right';
}

/**
 * Three-column Mega Menu Panel matching the Ujjivan SFB design screenshot:
 *
 * Layout (left → right):
 *   [Col 1: Product links] | [Col 2: Product links + Corporate Salary Account] | [Col 3: Promo Banner + Quick links]
 *
 * - Clean white card with soft drop shadow and subtle border
 * - Continuous vertical gray dividers between columns
 * - Column 3 features the Fixed Deposit promo card with leaf emblem, custom gradient, and quick access links
 */
export function MegaMenu({
  id,
  data,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  className,
  align = 'left',
}: MegaMenuProps) {
  const hasPromoCol = !!(data.featured || (data.quickLinks && data.quickLinks.length));

  if (!isOpen) return null;

  return (
    <div
      id={id}
      role="region"
      aria-hidden={!isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        // Anchored below header
        'absolute top-full z-50',
        align === 'right' ? 'right-0' : '-left-[90px]',
        'w-[940px] max-w-[calc(100vw-32px)]',
        'bg-white rounded-b-xl',
        'shadow-[0_16px_36px_rgba(0,0,0,0.12)]',
        'border-x border-b border-gray-100',
        // Transitions
        'transition-all duration-200 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-1 pointer-events-none',
        className,
      )}
    >
      {/* ── 3-Column Grid ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          'grid divide-x divide-gray-200',
          hasPromoCol
            ? data.columns.length >= 2
              ? 'grid-cols-[1fr_1.1fr_1fr]'
              : 'grid-cols-[1fr_1fr]'
            : data.columns.length === 2
              ? 'grid-cols-2'
              : 'grid-cols-3',
        )}
      >
        {/* ── Columns 1 & 2 ───────────────────────────────────────────────── */}
        {data.columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={cn(
              'flex flex-col py-6',
              colIdx === 0 ? 'px-6 pr-7' : 'px-6',
            )}
          >
            {/* Flat product links */}
            <div className="space-y-4">
              {col.links?.map((link) => (
                <ProductLinkItem key={link.href} link={link} />
              ))}
            </div>

            {/* Sub-section groups (e.g. Corporate Salary Account) */}
            {col.sections?.map((section) => (
              <div key={section.title} className="mt-5 pt-1">
                <p className="mb-3 text-[14px] font-semibold text-[#333333]">
                  {section.title}
                </p>
                <div className="space-y-3.5">
                  {section.links.map((link) => (
                    <ProductLinkItem key={link.href} link={link} indent />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* ── Column 3: Promo Banner + Quick Links ──────────────────────────── */}
        {hasPromoCol && (
          <div className="flex flex-col px-6 py-6">
            {/* Featured Promo Card */}
            {data.featured && (
              <div className="relative mb-4 h-[168px] w-full overflow-hidden rounded-lg shadow-sm">
                {/* Background family photo */}
                <Image
                  src="/images/icons/fd_promo.jpg"
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover object-right"
                  aria-hidden="true"
                />

                {/* Dark gradient overlay on the left so white text is crystal clear */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

                {/* Text & Button content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-4">
                  <div>
                    {/* Ujjivan Leaf Motif Icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mb-2" aria-hidden="true">
                      <path
                        d="M10.5 4C10.5 4 6 7 6 13C6 16.5 8.8 19.5 12 19.5C12 19.5 10.5 15 10.5 12C10.5 9 12 6 10.5 4Z"
                        fill="#00B074"
                      />
                      <path
                        d="M12.5 6.5C12.5 6.5 17 9.5 17 14.5C17 17.5 14.8 20 12 20C12 20 13.2 16 13.2 13C13.2 10 12 7.5 12.5 6.5Z"
                        fill="#F78F35"
                      />
                    </svg>

                    {/* Headline */}
                    <div className="text-[14.5px] font-bold leading-[1.25] text-white">
                      Get up to 7.45%*<br />
                      on our Fixed<br />
                      Deposits
                    </div>
                  </div>

                  <div>
                    {/* CTA pill */}
                    <Link
                      href={data.featured.ctaHref}
                      className="inline-flex items-center rounded-full bg-[#F78F35] px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#e07e2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {data.featured.ctaLabel}
                    </Link>

                    {/* Disclaimer subtitle */}
                    {data.featured.subtitle && (
                      <p className="mt-2 text-[9px] leading-tight text-white/80">
                        {data.featured.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick links */}
            <div className="space-y-3">
              {data.quickLinks?.map((ql) => (
                <div key={ql.href}>
                  <Link
                    href={ql.href}
                    className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:rounded"
                  >
                    <span className="block text-[13.5px] font-semibold text-[#333333] transition-colors group-hover:text-brand-teal leading-tight">
                      {ql.label}
                    </span>
                    {ql.description && (
                      <span className="block text-[11.5px] text-[#717171] mt-0.5 leading-tight font-normal">
                        {ql.description}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helper: ProductLinkItem ──────────────────────────────────────────────────

interface ProductLinkItemProps {
  link: { label: string; href: string; description?: string };
  indent?: boolean;
}

function ProductLinkItem({ link, indent = false }: ProductLinkItemProps) {
  return (
    <div className={cn(indent && 'pl-3')}>
      <Link
        href={link.href}
        className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:rounded"
      >
        <span className="block text-[13.5px] font-semibold text-[#333333] transition-colors group-hover:text-brand-teal leading-tight">
          {link.label}
        </span>
        {link.description && (
          <span className="block text-[12px] text-[#717171] mt-1 leading-snug font-normal">
            {link.description}
          </span>
        )}
      </Link>
    </div>
  );
}
