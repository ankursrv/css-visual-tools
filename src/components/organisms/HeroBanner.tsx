import React from 'react'
import Image from 'next/image'

const HeroBanner = () => {
  return (
    <section
      className="relative flex w-full min-h-[529px] md:min-h-[440px] items-start lg:items-center hero-banner-bg overflow-hidden"
      data-model-id="5006:59341"
      aria-labelledby="banner-heading"
    >
      {/* The banner artwork (1440×440, envelope baked into its right edge) is
          capped to the same 1440px canvas as .global-container and centred, so
          the envelope always lines up with the QuickLinksPanel card below —
          on every viewport width. .hero-banner-bg fills the strips outside
          the capped artwork with the banner's own edge colours. */}
      <div className="absolute inset-0 mx-auto w-full max-w-[1440px]">
        {/* Mobile shows its own portrait artwork; desktop gets the 1440px
            banner with the envelope baked into its right edge.
            Per Next 16 docs (art direction): the two variants stay default
            lazy + fetchPriority="high" — a hidden (display:none) lazy image
            is never fetched, so each viewport downloads exactly one banner.
            (priority/preload on both would double-fetch.) */}
        <Image
          className="hero-banner-img object-cover object-top z-0 md:hidden"
          alt="Ujjivan Small Finance Bank promotional banner"
          src="/images/mobile-banner.jpg"
          fill
          fetchPriority="high"
          sizes="100vw"
        />
        <Image
          className="hero-banner-img object-cover object-right z-0 hidden md:block"
          alt="Ujjivan Small Finance Bank promotional banner"
          src="/images/banner-desktop.jpg"
          fill
          fetchPriority="high"
          sizes="(min-width: 1440px) 1440px, 100vw"
        />
      </div>
      <div className="global-container relative z-10 flex flex-col items-start justify-center gap-5 md:gap-6 py-8 md:py-[60px]">
        <p className="flex items-center w-full max-w-[668px] font-medium text-white text-xl md:text-[28px] tracking-[0] leading-[120%]">
          UJJIVAN SMALL FINANCE BANK
        </p>
        <h1
          id="banner-heading"
          className="flex items-center w-[300px] lg:w-[400px] xl:w-[873px] font-bold text-white text-[44px] md:text-5xl xl:text-8xl tracking-[0] leading-[100%]"
        >
          NOTHING SMALL ABOUT US
        </h1>
      </div>
    </section>
  )
}

export default HeroBanner
