import Icon from "@/components/finpay/Icon";
import { HERO } from "@/data/hero";

// Landing hero: badge, headline, email capture form, partner strip and the
// layered fintech visual cards.
export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-gutter pt-8 md:pt-14 pb-16 md:pb-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: copy + form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              {HERO.badge}
            </span>
          </div>
          <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-display-hero md:text-display-hero text-primary tracking-tight font-bold">
            {HERO.title.line1}
            <br className="hidden sm:inline" />
            {HERO.title.line2}
            <br className="hidden sm:inline" />
            <span className="text-secondary">{HERO.title.accent}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            {HERO.description}
          </p>

          {/* Input + pill button */}
          <div className="pt-2">
            <form
              className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-surface-container-lowest shadow-xl rounded-full max-w-lg w-full"
            >
              <div className="flex items-center gap-2.5 px-4 w-full py-2.5 sm:py-0">
                <Icon name="mail" className="text-outline-variant text-[20px]" />
                <input
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="Enter your business email"
                  type="email"
                  required
                />
              </div>
              <button
                className="w-full sm:w-auto shrink-0 bg-primary text-on-primary hover:bg-primary-container px-6 py-3.5 rounded-full font-label-lg text-label-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                type="button"
              >
                <span>Get started</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </form>
            <div className="flex items-center gap-4 mt-3 px-2 text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <Icon name="check_circle" className="text-secondary text-[16px]" />
                <span className="font-label-md text-label-md">Instant approval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="check_circle" className="text-secondary text-[16px]" />
                <span className="font-label-md text-label-md">No setup fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="check_circle" className="text-secondary text-[16px]" />
                <span className="font-label-md text-label-md">FDIC insured up to $2.5M</span>
              </div>
            </div>
          </div>

          {/* Partner strip */}
          <div className="pt-6">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-3">
              Integrated seamlessly with
            </span>
            <div className="flex flex-wrap items-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-headline-sm text-headline-sm font-black text-on-surface tracking-tighter">
                Klarna.
              </span>
              <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface tracking-tight lowercase">
                coinbase
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight flex items-center gap-1">
                <Icon name="shopping_basket" className="text-[20px] text-secondary" />
                instacart
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tighter italic">
                stripe
              </span>
            </div>
          </div>
        </div>

        {/* Right: layered fintech visuals */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[440px] pt-6">
            {/* Card 1: balance widget */}
            <div className="relative z-20 bg-surface-container-lowest rounded-2xl p-6 shadow-xl mb-4">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <Icon name="account_balance_wallet" className="text-[18px]" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Finpay Treasury
                    </p>
                    <p className="font-label-md text-label-md text-on-surface font-bold">
                      Checking •• 8942
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold">
                  <Icon name="trending_up" className="text-[14px]" />+12.4%
                </span>
              </div>
              <div className="mb-5">
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Total Available Balance
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-hero text-[38px] leading-[44px] font-bold text-primary tracking-tight">
                    $1,075,580
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">USD</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors">
                  <Icon name="north_east" className="text-primary text-[20px] mb-1" />
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">Send</span>
                </button>
                <button className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors">
                  <Icon name="south_west" className="text-primary text-[20px] mb-1" />
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">Receive</span>
                </button>
                <button className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors">
                  <Icon name="receipt_long" className="text-primary text-[20px] mb-1" />
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">Invoice</span>
                </button>
              </div>
            </div>

            {/* Card 2: dark mint VISA */}
            <div className="relative z-30 -mt-10 mx-3 p-5 rounded-2xl bg-gradient-to-br from-primary-container via-primary to-secondary text-on-primary shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-5 rounded bg-surface-container-highest/30 flex items-center justify-center">
                    <div className="w-3.5 h-2.5 rounded-sm bg-secondary-fixed/80" />
                  </div>
                  <Icon name="contactless" className="text-[20px] opacity-80" />
                </div>
                <span className="font-headline-sm text-[22px] font-black tracking-wider italic text-on-primary">
                  VISA
                </span>
              </div>
              <div className="font-headline-sm text-headline-sm tracking-widest font-mono mb-6 text-primary-fixed">
                •••• •••• •••• 4298
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary-fixed-dim block">
                    Cardholder
                  </span>
                  <span className="font-label-lg text-label-lg font-medium text-on-primary">
                    Finpay Global Corp
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary-fixed-dim block">
                    Expires
                  </span>
                  <span className="font-label-md text-label-md font-medium text-on-primary">
                    09/29
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: floating transaction pill */}
            <div className="relative z-40 -mt-6 ml-6 mr-0 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <Icon name="sync_alt" className="text-[20px]" />
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    Auto-Yield Payout
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Reserve #849 • 2m ago
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-lg text-label-lg font-bold text-secondary">
                  +$1,450.00
                </span>
                <span className="font-label-sm text-[10px] text-outline block">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
