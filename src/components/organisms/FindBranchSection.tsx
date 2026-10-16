import Image from 'next/image';

// ------------------------------------------------------------------
// Data — "Find a Branch" promo banner (Figma node 2403-3239, 1440×400)
// ------------------------------------------------------------------

const HEADLINE = '800+ branches, one could be closer than you think.';
const SUBHEADLINE = 'Find your nearest Ujjivan branch.';
const CTA_LABEL = 'Find a Branch';
const CTA_HREF = '#';
const DISCLAIMER_DATE = 'Data as of June 30, 2026.';
const DISCLAIMER_NOTE = '*Interest rates are subject to change. T&C Apply.';
const DISCLAIMER = `${DISCLAIMER_DATE}   ${DISCLAIMER_NOTE}`;

/**
 * FindBranchSection — "Find a Branch" promotional banner.
 * Matches Figma node 2403-3239: a white panel with large rounded bottom
 * corners sitting on a dark (#2B2B2B) background, a map illustration on
 * the left, and a teal headline, subtext and an orange outline CTA on the
 * right. A small disclaimer runs along the bottom-left. Stacks on mobile.
 */
export default function FindBranchSection() {
  return (
    <section className="bg-[#2B2B2B]" aria-labelledby="find-branch-heading">
      <div className="overflow-hidden rounded-b-[48px] bg-white lg:rounded-b-[100px]">
        {/* Mobile: headline → subtext → map → full-width CTA → disclaimer */}
        <div className="global-container flex flex-col gap-6 py-10 lg:hidden">
          <div className="flex flex-col gap-4">
            <h2
              id="find-branch-heading-mobile"
              className="text-[28px] font-bold leading-[1.15] text-[#219C80]"
            >
              {HEADLINE}
            </h2>
            <p className="text-base leading-[150%] text-[#333333]/80">
              {SUBHEADLINE}
            </p>
          </div>
          <Image
            src="/images/find-branch-map.png"
            alt="Map with a location pin marking a nearby Ujjivan branch"
            width={790}
            height={430}
            sizes="100vw"
            className="mx-auto h-auto w-full max-w-[360px]"
          />
          <a
            href={CTA_HREF}
            className="inline-flex w-full items-center justify-center rounded-[24px] border border-[#F78F35] px-8 py-3 text-[16px] font-semibold text-[#F78F35] transition-colors hover:bg-[#F78F35] hover:text-white"
          >
            {CTA_LABEL}
          </a>
          <p className="text-[13px] leading-[1.6] text-[#333333]">
            {DISCLAIMER_DATE}
            <br />
            {DISCLAIMER_NOTE}
          </p>
        </div>

        {/* Desktop: map + disclaimer on the left, headline/subtext/CTA on the right */}
        <div className="global-container hidden flex-col gap-8 py-[60px] lg:flex lg:flex-row lg:items-center lg:gap-[120px]">
          {/* Left: map illustration + disclaimer */}
          <div className="flex shrink-0 flex-col gap-11">
            <Image
              src="/images/find-branch-map.png"
              alt="Map with a location pin marking a nearby Ujjivan branch"
              width={790}
              height={430}
              sizes="395px"
              className="h-auto w-full max-w-[395px]"
            />
            <p className="max-w-[480px] text-[14px] leading-[1.4] text-[#333333]">
              {DISCLAIMER}
            </p>
          </div>

          {/* Right: headline, subtext and CTA */}
          <div className="flex flex-1 flex-col items-start gap-4">
            <h2
              id="find-branch-heading"
              className="max-w-[720px] text-[32px] font-bold leading-[1.15] text-[#219C80]"
            >
              {HEADLINE}
            </h2>
            <p className="text-base leading-[150%] text-[#333333]/80">
              {SUBHEADLINE}
            </p>
            <a
              href={CTA_HREF}
              className="mt-4 inline-flex items-center justify-center rounded-[24px] border border-[#F78F35] px-8 py-3 text-[18px] font-semibold text-[#F78F35] transition-colors hover:bg-[#F78F35] hover:text-white"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
