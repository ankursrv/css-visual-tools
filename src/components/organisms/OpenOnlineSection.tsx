'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';

// ------------------------------------------------------------------
// Data — "Open Online" (Figma node 2403-3236, 1440×557)
// ------------------------------------------------------------------

type OpenLink = {
  label: string;
  href: string;
  whatsapp?: boolean;
};

type OpenCard = {
  title: string;
  image: string;
  links: OpenLink[];
};

const CARDS: OpenCard[] = [
  {
    title: 'Digital Savings Account',
    image: '/images/open-online-savings.jpg',
    links: [
      { label: 'Open Now on Web', href: '#' },
      { label: 'Open Now on Whatsapp', href: '#', whatsapp: true },
    ],
  },
  {
    title: 'Digital Current Accounts',
    image: '/images/open-online-current.jpg',
    links: [{ label: 'Open Now', href: '#' }],
  },
  {
    title: 'Digital Fixed Deposits',
    image: '/images/open-online-fixed-deposit.jpg',
    links: [{ label: 'Open Now', href: '#' }],
  },
];

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === 'left' ? 'rotate-180' : ''}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Icons
// ------------------------------------------------------------------

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11.5 5.5L16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1.7a8.2 8.2 0 0 0-7 12.5L1.7 18.3l4.2-1.1A8.2 8.2 0 1 0 10 1.7Zm0 1.8a6.4 6.4 0 0 1 0 12.8 6.3 6.3 0 0 1-3.3-.9l-.3-.2-2.4.6.6-2.4-.2-.3A6.4 6.4 0 0 1 10 3.5Zm-2.5 3c-.1 0-.4.1-.5.3-.2.2-.6.7-.6 1.5 0 .9.6 1.7.7 1.9.1.2 1.3 2.1 3.3 2.8 1.6.6 2 .5 2.3.5.4-.1 1.1-.5 1.3-1 .1-.4.1-.8.1-.9-.1-.1-.3-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.7-1.2-1.5-1.3-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5V8c0-.2-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Card
// ------------------------------------------------------------------

function OpenCardItem({ card }: { card: OpenCard }) {
  return (
    <article className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-xl lg:h-[437px]">
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(min-width: 1024px) 293px, (min-width: 640px) 288px, 266px"
        className="object-cover"
      />
      {/* Bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5">
        <h3 className="text-[24px] font-bold leading-[1.2] text-white lg:text-[28px]">
          {card.title}
        </h3>
        <div className="flex flex-col gap-4">
          {card.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2 self-start text-[16px] font-medium text-white underline underline-offset-[3px]"
            >
              {link.whatsapp && <WhatsAppIcon />}
              {link.label}
              <ArrowRight />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

/**
 * OpenOnlineSection — "Open Online" with digital product cards in a Swiper
 * slider. Matches Figma node 2403-3236: white section with teal top-corner
 * accents, an orange Ubuntu heading on the left and image cards (dark
 * gradient + underlined "Open Now" links) on the right. Navigation (same UI
 * as the social-media carousel) appears only when more than 3 cards exist
 * or the cards overflow the viewport (mobile / zoomed-in desktop).
 */
export default function OpenOnlineSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  // Swiper's watchOverflow fires lock/unlock when the slides stop/start
  // overflowing the container. Combined with the >3-cards rule, this drives
  // the nav: it appears on mobile (3 cards never fit) and on desktop only
  // when there are more than 3 cards — and it re-evaluates on browser
  // zoom/resize since zoom changes the CSS viewport.
  const [locked, setLocked] = useState(true);
  const showNav = CARDS.length > 3 || !locked;
  const loop = CARDS.length > 3;
  // Active slide + bounds, kept in sync for the dashes and button states.
  const [nav, setNav] = useState({ index: 0, beginning: true, end: false });
  const syncNav = (s: SwiperClass) =>
    setNav({ index: s.realIndex, beginning: s.isBeginning, end: s.isEnd });

  return (
    <section className="relative" aria-labelledby="open-online-heading">
      
      {/* green corner vectors bridge the hero banner into the rounded card bottom */}

      <Image
        src="/images/explore-vector-bl.png"
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="pointer-events-none absolute top-0 left-0 z-0 size-[45px] lg:size-[102px]"
      />
      <Image
        src="/images/explore-vector-br.png"
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="pointer-events-none absolute top-0 right-0 z-0 size-[45px] lg:size-[102px]"
      />
      <div className="overflow-hidden bg-white lg:rounded-t-[48px]">
        <div className="global-container flex flex-col py-8 lg:py-[60px] xl:min-h-[557px] xl:flex-row xl:items-center gap-6">
          {/* Heading */}
          <div className="xl:w-[290px] xl:shrink-0">
            <h2
              id="open-online-heading"
              className="font-bold leading-[1.15] text-[#F58D35] text-[32px] sm:text-[52px] lg:text-[60px] lg:leading-[72px] text-center xl:text-start"
            >
              Open Online
            </h2>
          </div>

          {/* Cards */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <Swiper
              className="w-full min-w-0"
              onSwiper={(instance) => {
                swiperRef.current = instance;
              }}
              observer={true}
              observeParents={true}
              watchOverflow
              onLock={() => setLocked(true)}
              onUnlock={() => setLocked(false)}
              grabCursor
              loop={loop}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                // Per-viewport slider behaviour: phones show one card plus a
                // peek of the next (scroll affordance), sm fits two, and from
                // lg upwards all three cards sit side by side.
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 2.5, spaceBetween: 24 },
                1280: { slidesPerView: 2.3, spaceBetween: 24 },
                1400: { slidesPerView: 3, spaceBetween: 24 },
              }}
              onSlideChange={syncNav}
              onTransitionEnd={syncNav}
            >
              {CARDS.map((card) => (
                <SwiperSlide key={card.title}>
                  <OpenCardItem card={card} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation — same UI as the social-media carousel; visible
                only when more than 3 cards (or when cards overflow). */}
            {showNav && (
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  aria-label="Previous card"
                  disabled={!loop && nav.beginning}
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border border-[#F78F35] bg-white text-[#F78F35] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 lg:h-11 lg:w-11"
                >
                  <Chevron direction="left" />
                </button>

                <div className="flex items-center gap-2">
                  {CARDS.map((card, index) => (
                    <button
                      key={card.title}
                      type="button"
                      aria-label={`Go to ${card.title}`}
                      onClick={() =>
                        loop
                          ? swiperRef.current?.slideToLoop(index)
                          : swiperRef.current?.slideTo(index)
                      }
                      className={cn(
                        'h-[6px] rounded-full transition-all',
                        index === nav.index ? 'w-[54px] bg-[#F78F35]' : 'w-[23px] bg-[#229E82]/20',
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Next card"
                  disabled={!loop && nav.end}
                  onClick={() => swiperRef.current?.slideNext()}
                  className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full bg-[#F78F35] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 lg:h-11 lg:w-11"
                >
                  <Chevron direction="right" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
