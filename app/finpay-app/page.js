"use client";

import { useState } from "react";
import MobileHeader from "@/components/finpay/MobileHeader";
import Icon from "@/components/finpay/Icon";

const ALEX_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAerwC9-7d6TQNdDzet2kfaWVhBlx9iVmlpmMkpVE06ddOrqrjRxvMY-UWTWDOK1UWmXZOVFCrmUOwIPOIN40m59Df0BY7TWhGoFT1fZ5GiJYLqZWjB3vVRFWvE3okuR57-ltRqDFTqL1I0GpVwFSde4TMGprgRQ0SvqQbgL_N37IE3Bf_xbzFhApUNaQYznaq_IYkMVT1AZAzZQCiz_eUikqBqO9PiBMfDziBcBGyNAOemyGZSl3M3";

const QUICK_ACTIONS = [
  { icon: "arrow_upward", label: "Send" },
  { icon: "arrow_downward", label: "Receive" },
  { icon: "swap_horiz", label: "Transfer" },
  { icon: "receipt_long", label: "Pay Bills" },
  { icon: "request_quote", label: "Invoice" },
];

const TRANSACTIONS = [
  { icon: "payments", tint: "text-secondary", chip: "bg-secondary-container/40", title: "Stripe Payout", sub: "Invoiced to Acme Corp • Today, 09:12 AM", amount: "+ $14,250.00", positive: true },
  { icon: "account_balance_wallet", tint: "text-secondary", chip: "bg-secondary-container/40", title: "Klarna Settlement", sub: "BNPL receivables • Yesterday", amount: "+ $3,420.50", positive: true },
  { icon: "cloud", tint: "text-primary", chip: "bg-surface-container-high", title: "AWS Cloud Services", sub: "Infrastructure bill • Oct 24", amount: "- $840.00", positive: false },
  { icon: "apartment", tint: "text-primary", chip: "bg-surface-container-high", title: "Office Rent", sub: "HQ Leasehold wire • Oct 21", amount: "- $4,500.00", positive: false },
];

export default function DashboardPage() {
  const [frozen, setFrozen] = useState(false);

  return (
    <>
      <MobileHeader title="Dashboard" />
      <main className="relative w-full pt-16 pb-24 bg-surface min-h-dvh">
        <div className="flex flex-col w-full px-gutter space-y-space-lg pb-space-xl">
          {/* Greeting */}
          <div className="flex items-center justify-between pt-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Good morning, Alex
                </span>
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container"
                  title="Verified Account"
                >
                  <Icon name="verified" className="text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Treasury &amp; Multi-Currency Checking
              </span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm bg-surface-container-high flex items-center justify-center">
                <img className="w-full h-full object-cover" src={ALEX_AVATAR} alt="Alex" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary-fixed ring-2 ring-surface" />
            </div>
          </div>

          {/* Primary Balance Card */}
          <div className="relative overflow-hidden rounded-lg bg-primary-container text-on-primary p-space-lg shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-primary-fixed-dim/10 blur-xl pointer-events-none" />
            <div className="relative z-10 flex flex-col space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-sm">
                  <Icon name="account_balance" className="text-secondary-fixed text-[16px]" />
                  <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                    Checking •• 8942
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed">
                  <Icon name="trending_up" className="text-[14px]" />
                  <span className="font-label-sm text-label-sm font-semibold">+12.4%</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                  Total Available Balance
                </span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-display-hero-mobile text-display-hero-mobile font-bold tracking-tight text-on-primary">
                    $1,075,580.40
                  </span>
                  <span className="font-label-md text-label-md text-secondary-fixed">USD</span>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                  <span className="font-body-sm text-body-sm text-on-primary-container">
                    Auto-swept &amp; fully insured
                  </span>
                </div>
                <svg className="w-24 h-6 text-secondary-fixed overflow-visible" fill="none" viewBox="0 0 96 24">
                  <path d="M0 20 L20 16 L40 19 L58 10 L76 13 L96 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between px-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Quick Actions
              </span>
              <span className="font-label-sm text-label-sm text-secondary">Manage Shortcuts</span>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="group flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-95 text-center"
                >
                  <div className="w-11 h-11 rounded-full bg-surface-container-high group-hover:bg-secondary-container/40 flex items-center justify-center text-primary transition-colors mb-1.5">
                    <Icon name={a.icon} className="text-[20px]" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Platinum Card + Freeze */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Virtual Platinum Card
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {frozen ? "Frozen" : "Freeze"}
                </span>
                <button
                  role="switch"
                  aria-checked={frozen}
                  aria-label="Freeze card"
                  onClick={() => setFrozen((v) => !v)}
                  className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none ${
                    frozen ? "bg-error" : "bg-surface-container-highest"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${
                      frozen ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div
              className={`relative w-full aspect-[1.586/1] rounded-lg p-space-lg text-on-primary overflow-hidden shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#0c2d31] via-[#0a363a] to-[#006c53] ${
                frozen ? "grayscale opacity-70" : ""
              }`}
            >
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none" />
              <div className="absolute right-6 bottom-4 w-28 h-28 rounded-full bg-primary/30 blur-xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
              <div className="relative h-full flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-7 rounded-sm bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-600 shadow-inner flex items-center justify-center p-0.5">
                      <div className="w-full h-full rounded-sm border border-amber-800/20 grid grid-cols-2 gap-0.5 opacity-70">
                        <span className="border-b border-amber-800/30" />
                        <span className="border-b border-amber-800/30" />
                        <span />
                        <span />
                      </div>
                    </div>
                    <Icon name="wifi" className="text-secondary-fixed text-[22px] rotate-90 opacity-90" />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-headline-sm text-headline-sm font-bold tracking-wider italic text-on-primary">
                      VISA
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary-fixed tracking-widest uppercase">
                      Platinum
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 tracking-widest font-mono text-body-lg text-primary-fixed">
                  <span>••••</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span className="font-bold text-on-primary tracking-normal">4298</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block font-label-sm text-label-sm text-on-primary-container uppercase">
                      Cardholder
                    </span>
                    <span className="font-label-lg text-label-lg text-on-primary font-semibold">
                      ALEX MERCER
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-label-sm text-label-sm text-on-primary-container uppercase">
                      Expires
                    </span>
                    <span className="font-label-lg text-label-lg text-on-primary font-semibold">
                      09/29
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yield Reserve Vault */}
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <Icon name="savings" className="text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Yield Reserve Vault</span>
                  <span className="font-label-sm text-label-sm text-secondary">Auto-Sweep Active</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-md text-label-md font-bold">
                4.85% APY
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-sm pt-1">
              <div className="rounded-xl bg-surface-container-low p-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Principal Balance</span>
                <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">$1,075,580.40</p>
              </div>
              <div className="rounded-xl bg-surface-container-low p-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Yield Accrued (MTD)</span>
                <p className="font-headline-sm text-headline-sm text-secondary mt-0.5">$4,120.00</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Recent Activity
              </span>
              <a className="font-label-md text-label-md text-secondary hover:underline" href="#">View all</a>
            </div>
            <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container overflow-hidden">
              {TRANSACTIONS.map((t) => (
                <div key={t.title} className="flex items-center justify-between p-space-md">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className={`w-10 h-10 rounded-full ${t.chip} ${t.tint} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={t.icon} className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{t.title}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{t.sub}</p>
                    </div>
                  </div>
                  <span
                    className={`font-label-lg text-label-lg font-bold flex-shrink-0 ml-2 ${
                      t.positive ? "text-secondary" : "text-on-surface"
                    }`}
                  >
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
