'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import QuickLinksPanel from '@/components/organisms/QuickLinksPanel';

// ------------------------------------------------------------------
// Data
// ------------------------------------------------------------------

const LANGUAGES = [
  'Hindi',
  'Assameese',
  'Bengali',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Odia',
  'Punjabi',
  'Tamil',
  'Telugu',
] as const;

const CAMPAIGN_VIDEOS = [
  { title: 'Boutique Film', src: '/images/campaign-boutique.jpg' },
  { title: 'Cafe Film', src: '/images/campaign-cafe.jpg' },
  { title: 'Gym Film', src: '/images/campaign-boutique.jpg' },
] as const;

// ------------------------------------------------------------------
// Small presentational pieces
// ------------------------------------------------------------------

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll languages left' : 'Scroll languages right'}
      className={cn(
        'absolute top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center',
        'rounded-full border border-[#558B84] bg-[#0C584E] text-white',
        'shadow-[0_0_19.7px_rgba(0,0,0,0.12)] backdrop-blur-[9.85px] transition-opacity hover:opacity-90',
        direction === 'left' ? 'left-1' : 'right-1',
      )}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
        className={direction === 'left' ? 'rotate-180' : ''}
      >
        <path
          d="M2.5 1L7 5L2.5 9"
          stroke="white"
          strokeWidth="1.72727"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PlayIcon() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111]/80">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
        <path d="M12.5 7.13397C13.1667 7.51887 13.1667 8.48113 12.5 8.86603L2 15C1.33333 15.3849 0.5 14.9038 0.5 14.134L0.5 1.86603C0.5 1.0962 1.33333 0.615137 2 1L12.5 7.13397Z" fill="#F9F9F9" />
      </svg>
    </span>
  );
}

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

/**
 * CampaignVideos — "Watch our Latest Campaign in your favourite language".
 * A language filter pill bar (horizontally scrollable) above a row of
 * video campaign cards. Matches the Figma desktop design at 1440px.
 */
export default function CampaignVideos() {
  const [activeLanguage, setActiveLanguage] = useState<string>('Hindi');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollerRef.current?.scrollBy({
      left: direction === 'left' ? -240 : 240,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="relative w-full bg-white lg:pt-15 lg:pb-[26px]"
      aria-labelledby="campaign-videos-heading"
    >
      {/* Orange corner vectors bridge the hero banner into the rounded card top */}
      <Image
        src="/images/vector-left.png"
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="pointer-events-none absolute left-0 top-0 size-[102px] hidden lg:block"
      />
      <Image
        src="/images/vector-right.png"
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="pointer-events-none absolute right-0 top-0 size-[102px] hidden lg:block"
      />
      <div className="global-container relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-6">
        <div className="order-2 min-w-0 flex-1 lg:order-none">
        <h2
          id="campaign-videos-heading"
          className="mb-6 lg:mb-8 w-[320px] sm:w-full text-[26px] lg:text-[32px] font-bold leading-[1.2] tracking-[0] text-[#219C80]"
        >
          Watch our Latest Campaign in your favourite language
        </h2>

        {/* Language filter bar */}
        <div className="relative max-w-[924px]">
          <div className="relative h-11 overflow-hidden rounded-full border border-black/20 bg-white">
            <ArrowButton direction="left" onClick={() => scroll('left')} />

            <div
              ref={scrollerRef}
              className="no-scrollbar flex h-full items-center gap-1 overflow-x-auto px-11"
            >
              {LANGUAGES.map((language) => {
                const isActive = language === activeLanguage;
                return (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setActiveLanguage(language)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex h-[33px] shrink-0 items-center justify-center rounded-[16.5px] px-[25px]',
                      'text-sm font-medium whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-[#F78F35] text-white'
                        : 'border border-[#219C80] bg-white text-[#219C80]',
                    )}
                  >
                    {language}
                  </button>
                );
              })}
            </div>

            <ArrowButton direction="right" onClick={() => scroll('right')} />
          </div>
        </div>

        {/* Video cards — below 1440px the row becomes a snap-scrolling slider
            with the next card cut off as a scroll affordance (no arrows).
            On phones it bleeds to the viewport edge (negative margin matches
            the 20px container gutter); from lg the QuickLinksPanel sits to
            the right, so the row simply clips inside its own column.
            At 1440px+ all three cards fit exactly → static row. */}
        <div className="no-scrollbar -mx-5 mt-6 lg:mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-1 scroll-pl-5 lg:mx-0 lg:scroll-p-0 lg:px-0 min-[1440px]:overflow-visible">
          {CAMPAIGN_VIDEOS.map((video) => (
            <figure key={video.title} className="w-[292px] shrink-0 snap-start">
              <a
                href="#"
                className="group relative block aspect-[292/177] w-full overflow-hidden rounded-xl bg-[#1A1A1A]"
                aria-label={`Play ${video.title}`}
              >
                <Image
                  src={video.src}
                  alt={video.title}
                  fill
                  sizes="292px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[#111111]/20" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon />
                </span>
              </a>
              <figcaption className="mt-4 text-center text-lg font-medium text-[#333333]">
                {video.title}
              </figcaption>
            </figure>
          ))}
        </div>
        </div>

        {/* On mobile the panel sits right below the hero banner, above the
            campaign heading; from lg it moves to the right column. Pulled up
            from lg upwards so the card always hangs from the envelope flap in
            the hero artwork, at every desktop width */}
        <QuickLinksPanel className="order-1 lg:order-none lg:w-[292px] lg:shrink-0 lg:-mt-[60px]" />
      </div>
    </section>
  );
}
