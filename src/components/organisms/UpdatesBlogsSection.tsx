'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';

// ------------------------------------------------------------------
// Data — "Explore Updates and blogs" (Figma node 2403-3238, 1440×822)
// ------------------------------------------------------------------

type BlogPost = {
  image: string;
  date: string;
  title: string;
  description?: string;
  href: string;
};

// Large hero card (image with overlaid text on a dark gradient).
const FEATURED: BlogPost = {
  image: '/images/blog-img0.jpg',
  date: 'Published on 31 August 2026',
  title: 'What are the Best FD Rates for NRIs in India?',
  href: '#',
};

// Secondary card in the right column (image on top, text below).
const SECONDARY: BlogPost = {
  image: '/images/blog-img1.jpg',
  date: 'Published on 09 April, 2026',
  title: 'Overdraft or Business Loan: Which Is Better for Short-Term Cash Needs?',
  description:
    'An overdraft and a short-term business loan can both provide short-term funding for your business to cover financial gaps...',
  href: '#',
};

// Three compact horizontal cards along the bottom.
const UPDATES: BlogPost[] = [
  {
    image: '/images/blog-img2.jpg',
    date: 'Published on 09 March, 2026',
    title: 'How Many Points Does a Credit Enquiry Drop Your CIBIL Score?',
    href: '#',
  },
  {
    image: '/images/blog-img3.jpg',
    date: 'Published on 09 March, 2026',
    title: 'How to Fill Form 29 for Car Ownership Transfer Step by Step?',
    href: '#',
  },
  {
    image: '/images/blog-img5.jpg',
    date: 'Published on 09 Jan, 2026',
    title: 'How Do I Download My Home Loan Interest Certificate?',
    href: '#',
  },
];

// All posts in reading order — shown as a horizontal slider on mobile.
const MOBILE_SLIDES: BlogPost[] = [FEATURED, SECONDARY, ...UPDATES];

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

function KnowMoreLink({
  href,
  tone = 'dark',
}: {
  href: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <a
      href={href}
      className={
        tone === 'dark'
          ? 'inline-flex items-center gap-2 self-start text-[16px] font-medium text-[#1a1a1a] underline underline-offset-[3px]'
          : 'inline-flex items-center gap-2 self-start text-[16px] font-medium text-white underline underline-offset-[3px]'
      }
    >
      Know More
      <ArrowRight />
    </a>
  );
}

// ------------------------------------------------------------------
// Cards
// ------------------------------------------------------------------

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 sm:h-[340px] lg:h-full">
      <Image
        src={post.image}
        alt={post.title}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 819px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Bottom gradient for legibility (Figma #04211C → #062B25) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#062B25] via-[#04211C]/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 lg:p-6">
        <span className="text-[14px] text-white/90">
          {post.date}
        </span>
        <h3 className="text-[22px] font-bold leading-[1.2] text-white lg:text-[26px]">
          {post.title}
        </h3>
      </div>
    </article>
  );
}

function SecondaryCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col">
      <div className="relative h-[204px] w-full overflow-hidden rounded-xl border border-white/10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 397px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col pt-5 [&>*:not(:first-child)]:mt-3">
        <span className="text-xs text-[#5b5b5b]">
          {post.date}
        </span>
        <h3 className="text-[20px] font-bold leading-[1.25] text-[#219C80]">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 text-sm leading-[140%] text-[#111111]/80">
            {post.description}
          </p>
        )}
        <div className="pt-2">
          <KnowMoreLink href={post.href} />
        </div>
      </div>
    </article>
  );
}

function UpdateCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex items-start gap-4">
      <div className="relative h-[133px] w-[172px] shrink-0 overflow-hidden rounded-xl border border-white/10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="172px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 self-stretch">
        <span className="text-xs text-[#111111]/80">
          {post.date}
        </span>
        <h3 className="text-base font-bold leading-[120%] text-[#219C80]">
          {post.title}
        </h3>
        <div className="mt-auto items-end">
          <KnowMoreLink href={post.href} />
        </div>
      </div>
    </article>
  );
}

// ------------------------------------------------------------------
// Mobile card + slider controls
// ------------------------------------------------------------------

/** Vertical card (image on top, text below) used inside the mobile slider. */
function MobileBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden lg:rounded-xl lg:border border-black/5 bg-white lg:shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <div className="relative h-[133px] lg:h-[200px] w-full shrink-0 overflow-hidden rounded-lg lg:rounded-none">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 320px, 82vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 pt-4 lg:p-4">
        <span className="text-xs text-[#5b5b5b]">{post.date}</span>
        <h3 className="text-[18px] font-bold leading-[1.25] text-[#219C80]">
          {post.title}
        </h3>
      </div>
    </article>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

/**
 * UpdatesBlogsSection — "Explore Updates and blogs".
 * Matches Figma node 2403-3238: a white section with a teal heading,
 * a large featured card with overlaid text on the left, a secondary
 * card in the right column, and three compact horizontal cards along
 * the bottom. Stacks responsively on smaller screens.
 */
export default function UpdatesBlogsSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="bg-white" aria-labelledby="updates-blogs-heading">
      <div className="global-container flex flex-col gap-8 py-[52px] lg:gap-8 lg:py-20">
        <h2
          id="updates-blogs-heading"
          className="text-[28px] font-bold leading-[1.15] text-[#219C80] lg:text-[40px]"
        >
          Explore Updates and blogs
        </h2>

        {/* Desktop / tablet layout */}
        <div className="hidden flex-col gap-8 lg:flex">
          {/* Top row: featured + secondary */}
          <div className="grid grid-cols-[1fr_397px] gap-6">
            <FeaturedCard post={FEATURED} />
            <SecondaryCard post={SECONDARY} />
          </div>

          {/* Bottom row: three compact cards */}
          <div className="mt-2 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
            {UPDATES.map((post) => (
              <UpdateCard key={post.title} post={post} />
            ))}
          </div>
        </div>

        {/* Mobile: horizontal card slider (bleeds to the right edge so the
            next card peeks, matching the mobile reference). */}
        <div className="lg:hidden">
          <Swiper
            className="-mr-5 w-auto"
            spaceBetween={16}
            slidesPerView={1.45}
            grabCursor
            onSwiper={(instance) => {
              swiperRef.current = instance;
            }}
            onSlideChange={(instance) => setActiveSlide(instance.activeIndex)}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {MOBILE_SLIDES.map((post) => (
              <SwiperSlide key={post.title} className="!h-auto">
                <MobileBlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Slider controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeSlide === 0}
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#F78F35] text-[#F78F35] transition-opacity hover:opacity-80 disabled:opacity-40 lg:h-11 lg:w-11"
            >
              <Chevron direction="left" />
            </button>

            <div className="flex items-center gap-2" role="group" aria-label="Blog slides">
              {MOBILE_SLIDES.map((post, index) => (
                <button
                  key={post.title}
                  type="button"
                  aria-label={`Go to ${post.title}`}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={cn(
                    'h-[6px] rounded-full transition-all',
                    index === activeSlide ? 'w-8 bg-[#F78F35]' : 'w-4 bg-[#E2E2E2]',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#F78F35] text-white transition-opacity hover:opacity-90 lg:h-11 lg:w-11"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
