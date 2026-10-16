"use client";

import { useState } from "react";
import MobileHeader from "@/components/finpay/MobileHeader";
import Icon from "@/components/finpay/Icon";

const SUB_ACCOUNTS = [
  { code: "USD", name: "Operating Checking", ref: "FIN-US-884102", balance: "$1,075,580.40", tag: "Primary Active", style: "bg-primary-container text-on-primary-container", tagStyle: "bg-secondary-container/20 text-secondary" },
  { code: "EUR", name: "Treasury Account", ref: "IBAN DE89•••410", balance: "€340,210.00", tag: "Yield +3.4% APY", style: "bg-surface-container-high text-primary", tagStyle: "text-on-surface-variant" },
  { code: "GBP", name: "Settlement Sub-Account", ref: "Sort 40-12-09", balance: "£185,400.00", tag: "Cleared", style: "bg-surface-container-high text-primary", tagStyle: "text-secondary font-medium" },
];

const ACTIVITY = [
  { icon: "dns", tint: "text-primary", chip: "bg-surface-container-high", name: "Amazon Web Services", sub: "Cloud Services • VISA •• 7842", amount: "-$4,280.50", meta: "Today, 09:14", metaStyle: "text-on-surface-variant" },
  { icon: "flight_takeoff", tint: "text-secondary", chip: "bg-secondary-container/40", name: "British Airways", sub: "Corporate Travel • Metal •• 3019", amount: "-£1,140.20", meta: "Zero FX Applied", metaStyle: "text-secondary" },
  { icon: "payments", tint: "text-secondary", chip: "bg-secondary-container/40", name: "Intercom Technologies", sub: "SaaS Subscription • VISA •• 7842", amount: "-$649.00", meta: "Yesterday", metaStyle: "text-on-surface-variant" },
];

export default function CardsPage() {
  const [cvv, setCvv] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [pin, setPin] = useState(false);
  const [online, setOnline] = useState(true);

  return (
    <>
      <MobileHeader title="Cards And Accounts" />
      <main className="relative w-full pt-16 pb-24 bg-surface min-h-dvh">
        <div className="flex flex-col w-full px-gutter pb-space-xl gap-space-lg">
          {/* Title + Add */}
          <div className="flex items-center justify-between mt-space-sm">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                Treasury &amp; Cards
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface">
                My Cards &amp; Wallets
              </h1>
            </div>
            <button className="flex items-center gap-1.5 px-space-md py-space-sm rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md active:scale-95 transition-transform duration-150">
              <Icon name="add" className="text-[18px]" />
              <span>Add New</span>
            </button>
          </div>

          {/* Active portfolio */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Active Portfolio (2)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-1.5 rounded-full bg-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
              </div>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-space-md pb-2 no-scrollbar scroll-smooth">
              {/* Card 1: Virtual */}
              <div className="snap-center shrink-0 w-[88vw] max-w-[340px] aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-primary-container via-primary to-[#051a1d] text-on-primary p-space-md shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-secondary-fixed/10 blur-xl pointer-events-none" />
                <div className={`flex flex-col justify-between h-full transition-all duration-300 ${frozen ? "grayscale opacity-70" : ""}`}>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-space-xs">
                      <Icon name="contactless" className="text-secondary-fixed text-[26px]" />
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/15 text-primary-fixed font-label-sm text-label-sm backdrop-blur-md">
                        Virtual
                      </span>
                    </div>
                    <span className="font-headline-sm text-headline-sm tracking-widest uppercase italic font-bold text-on-primary">
                      VISA
                    </span>
                  </div>
                  <div className="flex items-center gap-space-md relative z-10 my-auto">
                    <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 p-[2px] shadow-sm flex flex-col justify-between">
                      <div className="w-full h-[1px] bg-amber-600/40" />
                      <div className="w-full h-[1px] bg-amber-600/40" />
                      <div className="w-full h-[1px] bg-amber-600/40" />
                    </div>
                    <span className="font-label-lg text-label-lg tracking-widest text-on-primary font-mono">
                      •••• &nbsp; 7842
                    </span>
                  </div>
                  <div className="flex items-end justify-between relative z-10">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                        Cardholder
                      </span>
                      <span className="font-label-lg text-label-lg text-on-primary font-semibold">
                        FINPAY TECHNOLOGIES
                      </span>
                    </div>
                    <button
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-on-primary hover:bg-surface-container-lowest/25 transition-colors"
                      onClick={() => setCvv((v) => !v)}
                    >
                      <Icon name={cvv ? "visibility_off" : "visibility"} className="text-[15px]" />
                      <span className="font-label-sm text-label-sm">{cvv ? "CVV 842" : "CVV •••"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Metal */}
              <div className="snap-center shrink-0 w-[88vw] max-w-[340px] aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-inverse-surface via-primary to-[#080d1a] text-on-primary p-space-md shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute right-0 bottom-0 w-44 h-44 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-space-xs">
                    <Icon name="contactless" className="text-secondary-container text-[24px]" />
                    <span className="px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-container font-label-sm text-label-sm">
                      Metal Reserve
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-on-primary/80">
                    <Icon name="public" className="text-[16px] text-secondary-container" />
                    <span className="font-label-sm text-label-sm font-semibold tracking-wide">0% FX</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md relative z-10 my-auto">
                  <div className="w-9 h-7 rounded bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-500 p-[2px] shadow-sm flex flex-col justify-between">
                    <div className="w-full h-[1px] bg-slate-700/50" />
                    <div className="w-full h-[1px] bg-slate-700/50" />
                    <div className="w-full h-[1px] bg-slate-700/50" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg tracking-widest text-on-primary font-mono">
                      •••• &nbsp; 3019
                    </span>
                    <span className="font-label-sm text-label-sm text-outline-variant">
                      Physical Metal • Zero FX
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">
                      Account holder
                    </span>
                    <span className="font-label-lg text-label-lg text-on-primary font-semibold">
                      ALEXANDER D. VANCE
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg font-bold text-secondary-fixed">WORLD ELITE</span>
                </div>
              </div>
            </div>

            {/* Budget gauge */}
            <div className="p-space-md rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs mt-1">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Monthly Corporate Limit</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">$12,450 / $50,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: "24.9%" }} />
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
                <span>Spend 24.9%</span>
                <span className="text-secondary font-medium">$37,550 available</span>
              </div>
            </div>
          </div>

          {/* Card controls */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider px-1">
              Card Security &amp; Rules
            </span>
            <div className="grid grid-cols-2 gap-space-sm">
              <button
                className="flex items-center gap-space-sm p-space-md rounded-2xl bg-surface-container-lowest shadow-sm active:scale-95 transition-all text-left"
                onClick={() => setFrozen((v) => !v)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${frozen ? "bg-error-container text-on-error-container" : "bg-surface-container-high text-primary"}`}>
                  <Icon name={frozen ? "ac_unit" : "lock_open"} className="text-[20px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Freeze Card</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{frozen ? "Frozen" : "Instant block"}</span>
                </div>
              </button>

              <button className="flex items-center gap-space-sm p-space-md rounded-2xl bg-surface-container-lowest shadow-sm active:scale-95 transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="tune" className="text-[20px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Limit</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">$7,500 this mo.</span>
                </div>
              </button>

              <button
                className="flex items-center gap-space-sm p-space-md rounded-2xl bg-surface-container-lowest shadow-sm active:scale-95 transition-all text-left"
                onClick={() => setPin((v) => !v)}
              >
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="pin" className="text-[20px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">View PIN</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{pin ? "4 8 2 9" : "Tap to reveal"}</span>
                </div>
              </button>

              <div className="flex items-center justify-between gap-space-sm p-space-md rounded-2xl bg-surface-container-lowest shadow-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="shopping_cart" className="text-[20px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">E-Com.</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Online</span>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={online}
                  aria-label="Toggle e-commerce"
                  onClick={() => setOnline((v) => !v)}
                  className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none flex-shrink-0 ${
                    online ? "bg-secondary" : "bg-surface-container-highest"
                  }`}
                >
                  <span className={`absolute left-1 top-1 w-4 h-4 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${online ? "translate-x-4" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Multi-currency accounts */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Multi-Currency Accounts
              </span>
              <a className="font-label-md text-label-md text-secondary hover:underline" href="#">Manage All</a>
            </div>
            <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container overflow-hidden">
              {SUB_ACCOUNTS.map((a) => (
                <div key={a.code} className="flex items-center justify-between p-space-md">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className={`w-11 h-11 rounded-full ${a.style} flex items-center justify-center font-label-lg text-label-lg font-bold flex-shrink-0`}>
                      {a.code}
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{a.name}</p>
                      <p className={`font-label-sm text-label-sm truncate ${a.tagStyle.includes("text-secondary") ? "text-secondary" : "text-on-surface-variant"}`}>
                        {a.ref} • {a.tag}
                      </p>
                    </div>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface font-bold flex-shrink-0 ml-2">{a.balance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent card activity */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Recent Card Activity
              </span>
              <a className="font-label-md text-label-md text-secondary hover:underline" href="#">View All</a>
            </div>
            <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container overflow-hidden">
              {ACTIVITY.map((r) => (
                <div key={r.name} className="flex items-center justify-between p-space-md">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className={`w-10 h-10 rounded-full ${r.chip} ${r.tint} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={r.icon} className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{r.name}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{r.sub}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="font-label-md text-label-md text-on-surface font-bold block">{r.amount}</span>
                    <span className={`font-label-sm text-label-sm ${r.metaStyle}`}>{r.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
