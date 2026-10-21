import ExperienceCardGrid from "@/components/landing/ExperienceCardGrid";
import SectionHeading from "@/components/landing/SectionHeading";
import SiteHeader from "@/components/landing/SiteHeader";
import Hero from "@/components/landing/Hero";
import { ExperienceCard } from "@/data/experienceCard";
import { STEPS } from "@/data/steps";
import Breadcrumb from "@/components/Breadcrumb";

const LOGO_URL = "/finpay-logo.svg";



const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBK1hRJHK04ZALt5VwMFpl4qMHUlWDZNavSdGfTzhd5VLt-j2_GhNJ0XQRTZ6ZaNlr4cJCm4hzatsLk9oF3WwG1boIeNe-_oPyhvjS4bu-RtaJH_sy7EqxFJLCLOJAu5I8v-z2cXDlfLRdppVRDTi45aUZJd32vGQHxqYe6mw3R6fjsczLAqnzqxQIyfY3z6mzrcy60qexklPmEYO4TTr3MTvoTW-Hz-3OLd0iG41jr8o2dBeFsFV8W",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwebTC0xW1f8fGcVfj8eYA-47vijnbYlInnIOJRmBof4jmdMDYwmRz4JnIjqPcK8BjRWnDKoRNqWWY6F7M0ct-5ryVQIS57jIw6xKPcA7H5kJQkC5xhO9ZKrkIy7tthu_rEv6ne1DC1rMv6hfZylL06fJxQJvVNj93axq_A6d4Cots4EoBtDjLtY1q6ZbkrvYxGs_e0nC2NRHQtL-HrFg6y28FAaGV1F1kfecifDV9MY6tvEWtUzlh",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCG4cH6FW3m3ez_OJwoWXVNSLrnH0uEs1zW4kIEDj6awbg9jOed5zT2CZzcGAcML89qscH_ZHxviHuFAWw4fz65LcLxEFfQ66e-62I5GWCwQZ8k3YFfA7Zf8o3ppxjjJKGnCF3WKHxQm0_K0NGcuDDkVwk8OCaXqPJKLAHQFqgcUJG7FkqGDRiukZnJqpf-DzsUQsXCgYmKubb3Wmtup1AS_F6wR1UaFfNcr7wEYMtGTitN_ys-ZY1y",
];

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {name}
    </span>
  );
}

export default function Page() {
  return (
    <>
      {/* Top Breadcrumb Navigation Bar - Redirects to Home */}
      <div className="w-full bg-zinc-950 text-white border-b border-zinc-800/80 py-2.5 px-4 sm:px-6 lg:px-12 z-50">
        <div className="max-w-[1440px] w-full mx-auto flex items-center">
          <Breadcrumb items={[{ label: "Next.js Foundation" }]} />
        </div>
      </div>

      {/* ============================ HEADER ============================ */}
      <SiteHeader logoUrl={LOGO_URL} />

      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          {/* Ambient glow orbs */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-fixed-dim/20 blur-3xl pointer-events-none" />
            <div className="absolute top-80 right-0 w-[30rem] h-[30rem] rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none" />

            {/* ============================ 1. HERO ============================ */}
            <Hero />

            {/* ==================== 2. VALUE PROPOSITION ==================== */}
            <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-16 w-full">
              <SectionHeading
                eyebrow="Built for Scale"
                title={
                  <>
                    Experience that grows
                    <br className="hidden sm:inline" />
                    with your scale.
                  </>
                }
                description="Simple financial operating software that automates transfers, consolidates accounts, and enforces institutional-grade controls."
              />
              <ExperienceCardGrid cards={ExperienceCard} icon={true} />
            </section>

            {/* ==================== 3. BENTO: WHY THEY PREFER ==================== */}
            <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-16 w-full">
              <SectionHeading
                variant="centered"
                eyebrow="Enterprise Trust"
                title="Why they prefer Finpay"
                description="Join thousands of high-velocity teams operating frictionless global treasury rails."
                descriptionClassName="mt-3"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Bento tile 1 */}
                <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                      <Icon name="corporate_fare" className="text-[20px]" />
                    </div>
                    <div className="font-display-hero text-[40px] sm:text-[52px] leading-tight font-extrabold text-primary mb-2">
                      3k+
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
                      Businesses already running on Finpay
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      From seed-stage startups to international public entities
                      relying on automated payouts.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 flex items-center gap-3">
                    <div className="flex -space-x-3 overflow-hidden">
                      {AVATARS.map((src, i) => (
                        <img
                          key={i}
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-surface-container-lowest object-cover"
                          src={src}
                          alt="Verified operator"
                        />
                      ))}
                      <div className="inline-flex h-10 w-10 rounded-full ring-2 ring-surface-container-lowest bg-surface-container items-center justify-center text-primary font-label-md text-label-md font-bold">
                        +420
                      </div>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Verified operators
                    </span>
                  </div>
                </div>

                {/* Bento tile 2: instant withdraw */}
                <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        Liquid Assets
                      </span>
                      <h3 className="font-headline-md text-headline-md font-bold text-primary">
                        Instant withdraw your funds at any time
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary" />24/7
                      Rail Active
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                    {[
                      { icon: "account_balance", title: "FedNow / SEPA", sub: "< 3 seconds" },
                      { icon: "credit_card", title: "Card Push", sub: "Real-time credit" },
                      { icon: "currency_exchange", title: "Stablecoin Rails", sub: "Instant on-chain" },
                    ].map((r) => (
                      <div
                        key={r.title}
                        className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                          <Icon name={r.icon} className="text-[22px]" />
                        </div>
                        <div>
                          <p className="font-label-md text-label-md font-bold text-on-surface">
                            {r.title}
                          </p>
                          <p className="font-body-sm text-[12px] text-on-surface-variant">
                            {r.sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
                        <Icon name="lock_open" className="text-[18px]" />
                      </div>
                      <span className="font-label-md text-label-md text-on-surface">
                        Zero lock-up periods or arbitrary withdrawal thresholds.
                      </span>
                    </div>
                    <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors">
                      Configure settlement
                    </button>
                  </div>
                </div>

                {/* Bento tile 3: yield graph */}
                <div className="md:col-span-12 bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-4 flex flex-col gap-3">
                      <div className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md font-semibold">
                        <Icon name="verified" className="text-[18px]" />
                        Protected Yield Engine
                      </div>
                      <h3 className="font-headline-md text-headline-md font-bold text-primary">
                        No asset volatility. Pure predictability.
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Every treasury balance is safeguarded with multi-bank
                        sweep coverage, automated yield hedging, and zero
                        speculative risk exposure.
                      </p>
                      <div className="pt-2 flex items-center gap-6">
                        <div>
                          <span className="font-display-hero text-[32px] leading-tight font-bold text-primary">
                            4.85%
                          </span>
                          <span className="font-body-sm text-body-sm text-outline block">
                            Fixed APY Rate
                          </span>
                        </div>
                        <div className="w-px h-10 bg-surface-container" />
                        <div>
                          <span className="font-display-hero text-[32px] leading-tight font-bold text-secondary">
                            0.00%
                          </span>
                          <span className="font-body-sm text-body-sm text-outline block">
                            Market Downside
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Reserve Liquidity Growth
                          </span>
                          <div className="font-headline-sm text-headline-sm font-bold text-primary">
                            $1,075,580.40
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-full text-outline font-label-sm text-label-sm">
                          <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-semibold">
                            6M
                          </span>
                          <span className="px-2.5 py-1 rounded-full hover:text-on-surface cursor-pointer">
                            1Y
                          </span>
                          <span className="px-2.5 py-1 rounded-full hover:text-on-surface cursor-pointer">
                            ALL
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-44">
                        <svg
                          className="w-full h-full overflow-visible"
                          preserveAspectRatio="none"
                          viewBox="0 0 600 160"
                        >
                          <defs>
                            <linearGradient id="yieldGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                              <stop offset="0%" stopColor="#006c53" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#006c53" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="30" y2="30" />
                          <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="80" y2="80" />
                          <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="130" y2="130" />
                          <polygon fill="url(#yieldGradient)" points="0,140 50,130 110,115 170,120 230,95 290,90 350,70 420,60 490,38 550,30 600,18 600,160 0,160" />
                          <polyline
                            fill="none"
                            points="0,140 50,130 110,115 170,120 230,95 290,90 350,70 420,60 490,38 550,30 600,18"
                            stroke="#006c53"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.5"
                          />
                          <circle cx="600" cy="18" fill="#57fccc" r="6" stroke="#002023" strokeWidth="3" />
                        </svg>
                      </div>
                      <div className="flex items-center justify-between text-outline font-label-sm text-[11px] pt-3">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun (Present)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ==================== 4. DARK WORKFLOW (THREE STEPS) ==================== */}
          <section className="w-full bg-primary-container text-on-primary py-14 md:py-20 my-10 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="max-w-[1200px] mx-auto px-gutter relative z-10">              
              <SectionHeading
                variant="stacked"
                tone="dark"
                eyebrow="Three Simple Steps"
                eyebrowClassName="mb-3"
                title="Maximize your returns with a Reserve account that generates."
                description="Activate compounding institutional yields without locking up your operating cash."
                descriptionClassName="mt-3"
              />
              <ExperienceCardGrid cards={STEPS} variant="step" />
            </div>
          </section>

          {/* ==================== 5. SOCIAL PROOF METRICS ==================== */}
          <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-16 w-full text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
              Proven Impact
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-primary tracking-tight mb-4">
              We&apos;ve helped innovative companies
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-10 md:mb-14">
              Empowering finance teams worldwide to reclaim wasted transfer fees
              and generate passive capital from operating balances.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { stat: "24%", color: "text-primary", title: "Revenue increase", body: "Through automated fee reductions and programmatic cross-border routing." },
                { stat: "180K", color: "text-secondary", title: "Active businesses", body: "Relying on our infrastructure for daily payroll, vendor payouts, and invoicing." },
                { stat: "10+", color: "text-primary", title: "Years of trust", body: "Built on rock-solid bank partnerships and zero downtime incidents recorded." },
              ].map((m) => (
                <div key={m.title} className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm">
                  <div className={`font-display-hero text-[42px] sm:text-[54px] leading-tight font-extrabold mb-2 ${m.color}`}>
                    {m.stat}
                  </div>
                  <p className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
                    {m.title}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== 6. PRICING ==================== */}
          <section className="max-w-[1200px] mx-auto px-gutter py-12 md:py-16 w-full">
            <SectionHeading
              variant="centered"
              maxWidth="max-w-xl"
              eyebrow="Transparent Pricing"
              title="Flexible plans for every stage"
              description="No hidden fees or unexpected commission charges. Cancel anytime."
              descriptionClassName="mt-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto items-stretch">
              {/* Plus */}
              <div className="bg-surface-container-lowest p-6 md:p-10 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">Plus</span>
                    <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm font-bold text-primary">
                      Growing Teams
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display-hero text-[36px] sm:text-[44px] font-extrabold text-primary">$2.99</span>
                    <span className="font-body-md text-body-md text-outline">/month</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 pb-6">
                    Essential treasury controls, multi-account routing, and
                    standard instant payouts for modern startups.
                  </p>
                  <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface">
                    {[
                      "Up to 5 business accounts & wallets",
                      "Zero transaction fees on domestic transfers",
                      "Virtual VISA corporate cards (up to 10)",
                      "Standard API & Invoicing webhooks",
                    ].map((li) => (
                      <li key={li} className="flex items-center gap-2.5">
                        <Icon name="check" className="text-secondary text-[18px]" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4">
                  <button className="w-full py-3.5 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-2">
                    <span>Choose Plus</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                </div>
              </div>

              {/* Premium */}
              <div className="bg-gradient-to-b from-primary to-primary-container text-on-primary p-6 md:p-10 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary/15 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-primary">Premium</span>
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display-hero text-[36px] sm:text-[44px] font-extrabold text-on-primary">$5.99</span>
                    <span className="font-body-md text-body-md text-tertiary-fixed-dim">/month</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-primary-container mb-6 pb-6">
                    Comprehensive high-volume payment processing, automated
                    high-yield reserve accounts, and dedicated banker support.
                  </p>
                  <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-primary">
                    {[
                      "Unlimited global sub-accounts & IBANs",
                      "Zero cross-border transfer & FX margin markup",
                      "Unlimited custom metal & virtual cards",
                      "4.85% APY compounding daily reserve yield",
                      "24/7 dedicated treasury manager hotline",
                    ].map((li) => (
                      <li key={li} className="flex items-center gap-2.5">
                        <Icon name="check" className="text-secondary-fixed text-[18px]" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 relative z-10">
                  <button className="w-full py-3.5 px-6 rounded-full bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed font-label-lg text-label-lg transition-colors shadow-lg flex items-center justify-center gap-2">
                    <span>Start 30-day trial</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== 7. BOTTOM CTA ==================== */}
          <section className="max-w-[1200px] mx-auto px-gutter pt-8 pb-16 w-full">
            <div className="rounded-3xl bg-primary text-on-primary p-6 md:p-14 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
                  Take the next leap
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold tracking-tight text-on-primary mb-3">
                  Ready to level up your payment process?
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container">
                  Experience why leading technology companies migrate their core
                  global payment flows to Finpay.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
                <button className="w-full sm:w-auto bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed px-8 py-4 rounded-full font-label-lg text-label-lg transition-all shadow-md flex items-center justify-center gap-2">
                  <span>Get started free</span>
                  <Icon name="bolt" className="text-[18px]" />
                </button>
                <a className="w-full sm:w-auto text-center px-6 py-4 rounded-full font-label-lg text-label-lg text-on-primary hover:text-secondary-fixed transition-colors" href="#">
                  Contact sales
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full bg-surface-container-low mt-space-2xl">
        <div className="max-w-[1200px] mx-auto px-gutter py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-2xl">
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img alt="Finpay Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
                <span className="font-headline-sm text-headline-sm text-primary-container font-bold tracking-tight">
                  Finpay
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Next-generation financial fluidity, automated treasury controls,
                and programmable global payouts built for scaling enterprises.
              </p>
              <div className="flex items-center gap-space-sm">
                {["public", "code", "chat_bubble", "verified_user"].map((ic) => (
                  <a
                    key={ic}
                    aria-label={ic}
                    className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                    href="#"
                  >
                    <Icon name={ic} className="text-[18px]" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { head: "Products", links: ["Treasury Management", "Global Payouts", "Corporate Cards", "Multi-Currency Accounts", "Payment Gateway API"] },
              { head: "Company", links: ["Customers", "About Us", "Careers", "Press & Media", "Contact Sales"] },
              { head: "Resources", links: ["Documentation", "API Reference", "Pricing Calculator", "Compliance & Security", "System Status"] },
            ].map((col) => (
              <div key={col.head} className="flex flex-col gap-space-sm">
                <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider mb-space-xs">
                  {col.head}
                </span>
                {col.links.map((l) => (
                  <a key={l} className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2025 Finpay Inc. All rights reserved. Financial operations
              licensed across international jurisdictions.
            </p>
            <div className="flex items-center gap-space-lg">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
                <a key={l} className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
