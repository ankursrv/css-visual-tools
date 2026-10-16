'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';

// ------------------------------------------------------------------
// "Connect with us on social media" — built from the real Figma export
// (frame 1440×702, node 2403-3237). Values below are read straight from
// the Copy-as-SVG geometry, not guessed from a screenshot:
//   • cards 292×436, radius 12, border #111111 @12%, 20px inner padding
//   • image 252×315 (top), meta text #333333 12px, 1px divider, 5 icons 24px
//   • heading #219C80 (Ubuntu bold)
//   • controls: 44×44 #F78F35 circles, active dash 54×6 #F78F35,
//     inactive dash 23×6 #229E82 @20%
// ------------------------------------------------------------------

type Social = 'facebook' | 'instagram' | 'whatsapp' | 'linkedin' | 'x';

const SOCIAL_ICONS: Record<Social, string> = {
  facebook: '/images/social/icon-facebook.png',
  instagram: '/images/social/icon-instagram.png',
  whatsapp: '/images/social/icon-whatsapp.png',
  linkedin: '/images/social/icon-linkedin.png',
  x: '/images/social/icon-x.png',
};

// Order matches the Figma card footer: Facebook · Instagram · WhatsApp · LinkedIn · X
const SOCIAL_ORDER: Social[] = ['facebook', 'instagram', 'whatsapp', 'linkedin', 'x'];

type Post = {
  image: string;
  alt: string;
  date: string;
  time: string;
};

const POSTS: Post[] = [
  {
    image: '/images/social/post-rank8.jpg',
    alt: 'Trusted by our people. Guided by our values — 8th rank in India’s Best Companies to Work For 2026.',
    date: '05 Sept 2025',
    time: '4:56 PM',
  },
  {
    image: '/images/social/post-senior-citizens.jpg',
    alt: 'Thank you for showing that dreams don’t come with an age limit. Happy Senior Citizens Day!',
    date: '05 Sept 2025',
    time: '4:56 PM',
  },
  {
    image: '/images/social/post-onam.jpg',
    alt: 'How do we know Mahabali visited? Happy Onam!',
    date: '05 Sept 2025',
    time: '4:56 PM',
  },
  {
    image: '/images/social/post-winning-journey.jpg',
    alt: 'Behind every winning journey is a partner you can bank on.',
    date: '05 Sept 2025',
    time: '4:56 PM',
  },
  {
    image: '/images/social/post-handloom.jpg',
    alt: 'Some aspirations are handwoven. Happy National Handloom Day!',
    date: '05 Sept 2025',
    time: '4:56 PM',
  },
];

// Repeat the posts so the looped carousel always has enough slides to fill
// wide viewports edge-to-edge. This keeps the outer cards clipped at the
// screen edges, so the orange band only ever shows through the gaps (never as
// a trailing block), and gives Swiper enough slides for a seamless loop.
const TOTAL = POSTS.length;
const SLIDES = [...POSTS, ...POSTS, ...POSTS];

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
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Card
// ------------------------------------------------------------------

function PostCard({ post, dim = 0 }: { post: Post; dim?: number }) {
  return (
    <article className="relative flex h-[389px] lg:h-[436px] w-full flex-col overflow-hidden rounded-lg lg:rounded-xl border border-[#111111]/12 bg-white p-4 lg:p-5 lg:shadow-[0_10px_30px_rgba(17,17,17,0.08)]">
      {/* Post image (Ujjivan logo is part of the exported artwork) */}
      <div className="relative w-full flex-1 overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 1024px) 292px, 260px"
          className="object-cover"
        />
      </div>

      {/* Meta row */}
      <div className="mt-3 flex items-center justify-between text-[12px] text-[#333333]">
        <span>Posted on: {post.date}</span>
        <span>{post.time}</span>
      </div>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-[#111111]/12" />

      {/* Social platforms */}
      <div className="mt-3 flex items-center justify-between">
        {SOCIAL_ORDER.map((platform) => (
          <Image
            key={platform}
            src={SOCIAL_ICONS[platform]}
            alt={platform}
            width={24}
            height={24}
            className="h-6 w-6"
          />
        ))}
      </div>

      {/* Distance-based fade (matches the design: the center card and its two
          neighbours stay fully crisp, only the outer cards recede). A white
          overlay keeps the card opaque so the orange band behind only peeks
          through the gaps and never bleeds through a card. */}
      {dim > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-white transition-opacity duration-300"
          style={{ opacity: dim }}
        />
      )}
    </article>
  );
}

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

/**
 * SocialMediaSection — "Connect with us on social media".
 * A full-bleed, centered Swiper carousel of real Ujjivan social-post cards
 * (center active, neighbours faded) with orange prev/next buttons and
 * progress dashes, matching the Figma frame exactly.
 */
export default function SocialMediaSection() {
  const [activeSlide, setActiveSlide] = useState<number>(2);
  const swiperRef = useRef<SwiperClass | null>(null);
  // Slides are manually duplicated for the seamless loop, so Swiper's realIndex
  // runs over the whole duplicated set (0–14). Normalise it back to the logical
  // post index (0–4) that the 5 pagination dashes and the fade math expect.
  const activeIndex = ((activeSlide % TOTAL) + TOTAL) % TOTAL;

  return (
    <section className="bg-white py-8 lg:py-[60px]" aria-labelledby="social-heading">
      <h2
        id="social-heading"
        className="px-5 text-center text-[26px] font-bold leading-[1.2] text-[#219C80] sm:text-[28px] lg:text-[30px]"
      >
        Connect with us on social media
      </h2>

      {/* Full-bleed carousel so the edge cards peek exactly like the design */}
      <div className="relative mt-8 lg:mt-[38px]">
        {/* Orange band behind the cards (Figma #F58D35, 48px tall, card-centered);
            the opaque cards cover it so it only shows through the 24px gaps
            (and the 20px left gutter on mobile, where the band peeks at both
            ends of the card row like the mobile reference). */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-12 -translate-y-1/2 bg-[#F58D35]" />
        <Swiper
          className="relative z-10 w-full min-w-0"
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(instance) => setActiveSlide(instance.realIndex)}
          // Mobile: no centering + a 20px left gutter → active card is
          // left-aligned with the next card peeking at the right edge and the
          // orange band showing at both ends, like the mobile reference.
          // From lg the centered/faded carousel behaves as before.
          centeredSlides
          loop
          loopAdditionalSlides={4}
          slidesPerView="auto"
          spaceBetween={24}
          initialSlide={2}
          breakpoints={{
            0: { centeredSlides: false, slidesOffsetBefore: 20, spaceBetween: 20 },
            1024: { centeredSlides: true, slidesOffsetBefore: 0, spaceBetween: 24 },
          }}
        >
          {SLIDES.map((post, index) => {
            // Circular distance from the centered (active) card, using the
            // real position so the looped duplicates fade correctly too.
            const real = index % TOTAL;
            const diff = Math.abs(real - activeIndex);
            const dist = Math.min(diff, TOTAL - diff);
            // Center + immediate neighbours stay crisp; outer cards fade out.
            const dim = dist <= 1 ? 0 : dist === 2 ? 0.55 : 0.72;
            return (
              <SwiperSlide
                key={`${post.image}-${index}`}
                className="!w-[240px] flex justify-center sm:!w-[260px] lg:!w-[292px]"
              >
                <PostCard post={post} dim={dim} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4 lg:mt-8">
        <button
          type="button"
          aria-label="Previous post"
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#F78F35] transition-opacity hover:opacity-90 lg:h-11 lg:w-11"
        >
          <Chevron direction="left" />
        </button>

        <div className="flex items-center gap-2" role="group" aria-label="Social media posts slides">
          {POSTS.map((post, index) => (
            <button
              key={post.image}
              type="button"
              aria-label={`Go to post ${index + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={cn(
                'h-[6px] rounded-full transition-all',
                index === activeIndex ? 'w-[54px] bg-[#F78F35]' : 'w-[23px] bg-[#229E82]/20',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next post"
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#F78F35] transition-opacity hover:opacity-90 lg:h-11 lg:w-11"
        >
          <Chevron direction="right" />
        </button>
      </div>
    </section>
  );
}
