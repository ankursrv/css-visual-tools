'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';

// ------------------------------------------------------------------
// Data — "Explore everything Ujjivan has to offer" (Figma 1440×758)
// ------------------------------------------------------------------

type Product = {
  title: string;
  description: string;
  icon: 'growth' | 'crown' | 'coins' | 'document' | 'globe' | 'gift';
};

type Category = {
  id: string;
  label: string;
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: 'savings',
    label: 'Savings',
    products: [
      {
        title: 'Maxima Savings Account',
        description: 'Enjoy elite benefits and maximize your savings potential',
        icon: 'growth',
      },
      {
        title: 'Privilege Savings Account',
        description:
          'Ujjivan SFB Privilege Savings Account comes with a host of benefits and privileges that gives you more value for money.',
        icon: 'crown',
      },
      {
        title: 'Basic Savings Account',
        description:
          'A simple, no-frills savings account with all the essential banking services.',
        icon: 'coins',
      },
      {
        title: 'Senior Citizen Savings',
        description:
          'Exclusive benefits and higher savings for our senior citizens.',
        icon: 'gift',
      },
    ],
  },
  {
    id: 'deposit',
    label: 'Deposit',
    products: [
      {
        title: 'Fixed Deposit',
        description:
          'Grow your money with attractive interest rates and flexible tenures that suit your goals.',
        icon: 'coins',
      },
      {
        title: 'Recurring Deposit',
        description:
          'Save a fixed amount every month and build a disciplined savings habit with great returns.',
        icon: 'growth',
      },
      {
        title: 'Cumulative Interest',
        description:
          'Let your interest compound over the tenure and maximise your maturity payout.',
        icon: 'growth',
      },
      {
        title: 'Non-Cumulative Interest',
        description:
          'Receive regular interest payouts to keep a steady income stream flowing.',
        icon: 'coins',
      },
    ],
  },
  {
    id: 'loans',
    label: 'Loans',
    products: [
      {
        title: 'Personal Loan',
        description:
          'Instant funds for life’s moments with minimal documentation and competitive rates.',
        icon: 'document',
      },
      {
        title: 'Gold Loan',
        description:
          'Unlock the value of your gold with quick, secure and affordable loans.',
        icon: 'coins',
      },
      {
        title: 'Home Loan',
        description:
          'Make your dream home a reality with flexible repayment and attractive rates.',
        icon: 'document',
      },
      {
        title: 'Education Loan',
        description:
          'Invest in your future with hassle-free loans to support your education.',
        icon: 'growth',
      },
    ],
  },
  {
    id: 'current-accounts',
    label: 'Current Accounts',
    products: [
      {
        title: 'Business Current Account',
        description:
          'Everything your business needs to manage transactions, cash flow and growth.',
        icon: 'document',
      },
      {
        title: 'Prime Current Account',
        description:
          'Higher transaction limits and value-added services for established businesses.',
        icon: 'growth',
      },
      {
        title: 'Women Entrepreneur Account',
        description:
          'A dedicated current account empowering women-led businesses to thrive.',
        icon: 'gift',
      },
      {
        title: 'Specimen Current Account',
        description:
          'Specially designed banking solutions for proprietary and partnership firms.',
        icon: 'document',
      },
    ],
  },
  {
    id: 'nri-forex',
    label: 'NRI & Forex',
    products: [
      {
        title: 'NRE Savings Account',
        description:
          'Repatriable savings account for NRIs to manage foreign earnings effortlessly.',
        icon: 'globe',
      },
      {
        title: 'FCNR Deposit',
        description:
          'Protect your foreign currency income with attractive, tax-efficient deposit rates.',
        icon: 'coins',
      },
      {
        title: 'NRO Savings Account',
        description:
          'Manage your income earned in India seamlessly while living abroad.',
        icon: 'globe',
      },
      {
        title: 'Money Transfer',
        description:
          'Fast, secure and affordable ways to send money across the globe.',
        icon: 'document',
      },
    ],
  },
  {
    id: 'rewards',
    label: 'Rewards',
    products: [
      {
        title: 'Ujjivan Rewards',
        description:
          'Earn reward points on every transaction and redeem them for exciting lifestyle benefits.',
        icon: 'gift',
      },
      {
        title: 'Cashback Offers',
        description:
          'Get more value on everyday spends with handpicked partner offers and cashbacks.',
        icon: 'growth',
      },
      {
        title: 'Privilege Banking',
        description:
          'Priority services and curated benefits reserved for our valued customers.',
        icon: 'crown',
      },
      {
        title: 'Partner Discounts',
        description:
          'Exclusive discounts across shopping, dining, travel and more with our partners.',
        icon: 'coins',
      },
    ],
  },
];

// ------------------------------------------------------------------
// Icons (line style on a cream circular badge, matching Figma)
// ------------------------------------------------------------------

function ProductIcon({ name }: { name: Product['icon'] }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      {name === 'growth' && (
        <g {...common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M7 15l3-3 2 2 4-4" />
          <circle cx="16.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'crown' && (
        <g {...common}>
          <path d="M4 8l3.5 3L12 5.5 16.5 11 20 8l-1.6 10H5.6L4 8z" />
          <circle cx="4" cy="8" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="8" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="5.5" r="1.1" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'coins' && (
        <g {...common}>
          <ellipse cx="9" cy="7" rx="5.5" ry="2.5" />
          <path d="M3.5 7v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7" />
          <path d="M14.5 10.5c3 .2 6 1.2 6 2.7v3.3c0 1.4-2.5 2.5-5.5 2.5s-5.5-1.1-5.5-2.5v-3" />
        </g>
      )}
      {name === 'document' && (
        <g {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </g>
      )}
      {name === 'globe' && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
        </g>
      )}
      {name === 'gift' && (
        <g {...common}>
          <rect x="4" y="9" width="16" height="11" rx="1.5" />
          <path d="M4 13h16M12 9v11M8.5 9C6.5 9 6 5.5 8.5 5.5S12 9 12 9m3.5 0c2 0 2.5-3.5 0-3.5S12 9 12 9" />
        </g>
      )}
    </svg>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
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
        stroke="currentColor"
        strokeWidth="1.72727"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Small pieces
// ------------------------------------------------------------------

function TabArrow({
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
      aria-label={direction === 'left' ? 'Previous categories' : 'Next categories'}
      className={cn(
        'flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-lg',
        'border border-[#558B84] bg-[#0C584E] text-white transition-opacity hover:opacity-90',
        direction === 'right' && 'text-[#F78F35]',
      )}
    >
      <Chevron direction={direction} />
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full lg:min-h-[380px] flex-col rounded-xl border border-white/10 bg-[#111111]/32 py-5 px-4 sm:p-8 backdrop-blur-[6.5px]">
      <span className="flex size-[54px] lg:size-15 items-center justify-center rounded-full bg-[#FEF1E3] text-[#0C584E]">
        <ProductIcon name={product.icon} />
      </span>
      <h3 className="mt-11 text-base lg:text-[22px] font-bold leading-[1.2] tracking-[0] text-white">
        {product.title}
      </h3>
      <p className="mt-3 text-sm lg:text-base leading-[1.5] text-white/80">
        {product.description}
      </p>
      <a
        href="#"
        className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-[15px] font-medium text-white underline underline-offset-[3px]"
      >
        Know More
        <ArrowRight />
      </a>
    </article>
  );
}

// ------------------------------------------------------------------
// Section
// ------------------------------------------------------------------

/**
 * ExploreSection — "Explore everything Ujjivan has to offer".
 * A teal brand section with the ambassador on the left and a glass
 * category tab bar + a Swiper-powered product-card carousel on the
 * right. Matches the Figma desktop design at 1440px and stacks
 * responsively on mobile.
 */
export default function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const active = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const scrollTabs = (direction: 'left' | 'right') => {
    tabsRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  const goToCategory = (id: string) => {
    setActiveCategory(id);
    setActiveSlide(0);
    requestAnimationFrame(() => swiperRef.current?.slideTo(0, 0));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0B9385] lg:min-h-[760px]"
      aria-labelledby="explore-heading"
    >
      {/* Blurred teal brand background — a portrait asset for mobile and a
          landscape asset for tablet/desktop (matches Figma) */}
      <Image
        src="/images/explore-section-mobile-bg.jpg"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover lg:hidden"
      />
      <Image
        src="/images/bg-image1.jpg"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="hidden object-cover lg:block"
      />

      {/* Desktop ambassador — madhavan-image1.png (1836×1448 landscape canvas:
          the figure itself is 974×1389, bottom-anchored, with ~676px of
          transparent padding on the right). The container is sized to 57% so
          the figure fills ~80% of the section height without its visible part
          ever reaching the cards; object-contain keeps it clipped inside the
          box at any zoom level. */}
      <div className="pointer-events-none absolute inset-y-0 left-10 z-0 hidden w-[57%] lg:block">
        <Image
          src="/images/madhavan-image1.png"
          alt="R. Madhavan exploring Ujjivan products"
          fill
          loading="lazy"
          sizes="57vw"
          className="object-contain object-left-bottom"
        />
      </div>

      <div className="global-container relative z-10">
        {/* Content column */}
        <div className="flex flex-col gap-6 pb-16 pt-20 lg:ml-auto lg:w-[62%] lg:gap-8 lg:pb-24">
          <h2
            id="explore-heading"
            className="font-bold leading-[1.2] tracking-[0] text-white text-[26px] xl:text-[36px] 2xl:text-[40px]"
          >
            Explore everything Ujjivan has to offer
          </h2>

          {/* Mobile / tablet ambassador — sits under the heading; the negative
              bottom margin (mobile only) pulls the tab bar up so it overlaps
              the figure at hip level, matching the mobile reference */}
          <div className="relative max-lg:-mb-[160px] lg:hidden">
            <Image
              src="/images/madhavan-mobile.png"
              alt="R. Madhavan exploring Ujjivan products"
              width={598}
              height={796}
              loading="lazy"
              className="h-full w-auto max-w-full object-contain"
            />
          </div>

          {/* Category tab bar */}
          <div className="flex items-center gap-1.5 lg:gap-2 rounded-xl border border-white/40 bg-[#111111]/32 p-1.5 backdrop-blur-[6.5px]">
            <TabArrow direction="left" onClick={() => scrollTabs('left')} />

            <div
              ref={tabsRef}
              className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto lg:px-1"
            >
              {CATEGORIES.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToCategory(category.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex h-[45px] lg:h-[46px] shrink-0 items-center justify-center rounded-lg px-4 lg:px-5',
                      'text-sm lg:text-base font-medium whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-[#F58D35] text-white'
                        : 'text-white/90 hover:text-white',
                    )}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <TabArrow direction="right" onClick={() => scrollTabs('right')} />
          </div>

          {/* Product cards carousel (Swiper) */}
          <Swiper
            key={active.id}
            className="w-full min-w-0"
            onSwiper={(instance) => {
              swiperRef.current = instance;
            }}
            onSlideChange={(instance) => setActiveSlide(instance.activeIndex)}
            spaceBetween={24}
            slidesPerView={1.4}
            grabCursor
            breakpoints={{
              640: { slidesPerView: 1.6 },
              1024: { slidesPerView: 2 },
            }}
          >
            {active.products.map((product) => (
              <SwiperSlide key={product.title} className="!h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel controls */}
          <div className="mt-2 flex items-center justify-center gap-4 lg:mt-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeSlide === 0}
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-white/50 text-white transition-opacity hover:opacity-90 disabled:opacity-40 lg:h-11 lg:w-11"
            >
              <Chevron direction="left" />
            </button>

            <div className="flex items-center gap-2" role="group" aria-label="Product slides">
              {active.products.map((product, index) => (
                <button
                  key={product.title}
                  type="button"
                  aria-label={`Go to ${product.title}`}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={cn(
                    'h-[6px] rounded-full transition-all',
                    index === activeSlide ? 'w-[54px] bg-[#F78F35]' : 'w-[23px] bg-white/[32%]',
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
