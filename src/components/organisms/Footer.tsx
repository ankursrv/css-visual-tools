'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  COPYRIGHT_TEXT,
  FOOTER_COLUMNS,
  FOOTER_SOCIAL,
  FOOTER_SOCIAL_ICONS,
  FRAUD_REPORT,
  LOCATOR_OPTIONS,
  SITEMAP_LINK,
  type FooterSection,
} from '@/constants/footer';

// ------------------------------------------------------------------
// "Footer" — built from the real Figma export (frame 1440×676, node
// 2403-3240). Geometry read straight from the Copy-as-SVG output:
//   • content column 100 → 1340 (1240px wide), page bg #2B2B2B
//   • logo 286×36 at y=60, social icons 34×34 on a 50px pitch at y=140
//   • locator pill 263×38 r19, #F1F1F1 @20%, 16px inner padding
//   • hairlines white @20% (y=198 and y=590)
//   • 4 accordion columns 280px wide, 40px gutter, 53px rows with a
//     bottom hairline, 14px label + 13.3px "+" at 10px from the column edge
//   • "Report a Fraud" 174×54 r27 white pill, 20px icon, #333333 label
//   • legal bar white @80%, sitemap right-aligned
// ------------------------------------------------------------------

const SOCIAL_ICON_SIZES: Record<string, number> = {
  instagram: 136,
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn('flex-shrink-0 transition-transform duration-300', open && 'rotate-45')}
    >
      <path d="M1 7h12M7 1v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Bandit icon lifted from the Figma artwork (20×19.5). */
function FraudIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="126 529.25 20 19.5"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path
        d="M146 538C146 538.53 145.789 539.039 145.414 539.414C145.039 539.789 144.53 540 144 540H128C127.47 540 126.961 539.789 126.586 539.414C126.211 539.039 126 538.53 126 538C126 537.47 126.211 536.961 126.586 536.586C126.961 536.211 127.47 536 128 536H128.322C128.815 532.198 132.066 529.25 136 529.25C139.934 529.25 143.185 532.198 143.678 536H144C144.53 536 145.039 536.211 145.414 536.586C145.789 536.961 146 537.47 146 538ZM144 541.5C144.26 541.5 144.51 541.47 144.75 541.42V543.76C144.75 546.51 142.51 548.75 139.76 548.75C138.42 548.75 137.17 548.23 136.23 547.29L136 547.06L135.77 547.29C134.83 548.23 133.58 548.75 132.24 548.75C129.49 548.75 127.25 546.51 127.25 543.76V541.42C127.49 541.47 127.74 541.5 128 541.5H144ZM133.75 545C133.75 544.801 133.671 544.61 133.53 544.47C133.39 544.329 133.199 544.25 133 544.25H131C130.801 544.25 130.61 544.329 130.47 544.47C130.329 544.61 130.25 544.801 130.25 545C130.25 545.199 130.329 545.39 130.47 545.53C130.61 545.671 130.801 545.75 131 545.75H133C133.199 545.75 133.39 545.671 133.53 545.53C133.671 545.39 133.75 545.199 133.75 545ZM141.75 545C141.75 544.801 141.671 544.61 141.53 544.47C141.39 544.329 141.199 544.25 141 544.25H139C138.801 544.25 138.61 544.329 138.47 544.47C138.329 544.61 138.25 544.801 138.25 545C138.25 545.199 138.329 545.39 138.47 545.53C138.61 545.671 138.801 545.75 139 545.75H141C141.199 545.75 141.39 545.671 141.53 545.53C141.671 545.39 141.75 545.199 141.75 545Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LocatorPicker() {
  const router = useRouter();
  const [value, setValue] = useState<string>(LOCATOR_OPTIONS[0].href);

  return (
    <div className="w-full lg:w-[263px]">
      <h2 className="text-[15px] leading-none text-white lg:text-[16px]">Branch Locator</h2>

      <div className="relative mt-[10px] lg:mt-[12px]">
        <select
          aria-label="Choose a locator"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            router.push(e.target.value);
          }}
          className="h-[38px] w-full cursor-pointer appearance-none rounded-full bg-[#F1F1F1]/20 pl-4 pr-10 text-[15px] text-white transition-colors hover:bg-[#F1F1F1]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {LOCATOR_OPTIONS.map((option) => (
            <option key={option.href} value={option.href} className="bg-white text-gray-900">
              {option.label}
            </option>
          ))}
        </select>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="white"
            strokeWidth="1.667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: FooterSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `footer-section-${section.label.replace(/[^a-z]+/gi, '-').toLowerCase()}`;

  return (
    <li className="border-b border-white/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex h-[53px] w-full items-center justify-between gap-3 text-left text-[14px] text-white transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40"
      >
        {section.label}
        <PlusIcon open={isOpen} />
      </button>

      {/* grid-rows trick keeps the expand/collapse animatable without measuring */}
      <div
        id={panelId}
        role="region"
        aria-label={section.label}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="pb-3 pt-[2px]" role="list">
            <li>
              <Link
                href={section.href}
                className="block py-[7px] text-[13px] text-white/70 transition-colors hover:text-white hover:underline"
              >
                Overview
              </Link>
            </li>
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-[7px] text-[13px] text-white/70 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/**
 * Site-wide footer organism (Figma node 2403-3240).
 *
 * Dark #2B2B2B band: brand logo + social links and the branch/ATM locator
 * picker on top, a four-column accordion of every site section in the middle,
 * then the fraud-reporting CTA and the legal bar.
 */
export function Footer() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (label: string) =>
    setOpenSections((current) =>
      current.includes(label) ? current.filter((l) => l !== label) : [...current, label],
    );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-[43px] pt-[48px] lg:px-0 lg:pt-[60px]">
        {/* ── Brand + locator ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Ujjivan Small Finance Bank — Go to homepage"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Image
                src="/images/icons/ujjivan-logo-footer.svg"
                alt="Ujjivan Small Finance Bank — Build a Better Life"
                width={286}
                height={36}
                className="h-auto w-[240px] max-w-full sm:w-[286px]"
              />
            </Link>

            <ul className="mt-[36px] flex items-center gap-4 lg:mt-[44px]" role="list">
              {FOOTER_SOCIAL.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ujjivan Small Finance Bank on ${item.label}`}
                    className="block rounded-full transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <Image
                      src={FOOTER_SOCIAL_ICONS[item.key]}
                      alt=""
                      width={SOCIAL_ICON_SIZES[item.key] ?? 80}
                      height={SOCIAL_ICON_SIZES[item.key] ?? 80}
                      className="h-[34px] w-[34px] rounded-full object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LocatorPicker />
        </div>

        <div className="mt-[24px] h-px w-full bg-white/20 lg:mt-[25px]" />

        {/* ── Accordion columns ───────────────────────────────────────────── */}
        <div className="mt-[2px] grid gap-x-[40px] sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((column, index) => (
            <ul key={index} role="list" className="min-w-0">
              {column.sections.map((section) => (
                <AccordionItem
                  key={section.label}
                  section={section}
                  isOpen={openSections.includes(section.label)}
                  onToggle={() => toggleSection(section.label)}
                />
              ))}
            </ul>
          ))}
        </div>

        {/* ── Fraud reporting ─────────────────────────────────────────────── */}
        <div className="mt-[24px]">
          <a
            href={FRAUD_REPORT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[54px] items-center gap-[13px] rounded-full bg-white pl-[26px] pr-7 text-[15px] text-[#333333] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2B2B]"
          >
            <FraudIcon />
            {FRAUD_REPORT.label}
          </a>
        </div>

        <div className="mt-[24px] h-px w-full bg-white/20" />

        {/* ── Legal bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 pt-[24px] text-[13px] text-white/80 sm:flex-row sm:items-center sm:justify-between sm:text-[14px]">
          <p>
            {currentYear} {COPYRIGHT_TEXT}
          </p>
          <Link
            href={SITEMAP_LINK.href}
            className="transition-colors hover:text-white hover:underline"
          >
            {SITEMAP_LINK.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}
