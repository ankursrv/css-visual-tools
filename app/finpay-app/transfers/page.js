"use client";

import { useState } from "react";
import MobileHeader from "@/components/finpay/MobileHeader";
import Icon from "@/components/finpay/Icon";

const SARAH =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrGSOy1OXE2ICpNQtEpFlb6sdOVebo4XEQ08cauF9Kej6XfbTAgZ8XQ9HSphFGTqNjyUcx6V1cIQhM9EkK9gYqxYKaCaXfDDSDhBqPhIHjG1Nr9DZN3XeVpvhZ-aqFb8C5LbrfROp2qITbavzn9QRzs1Ls_MBoYNdYsnKlZ5y7bGWMXHpeX1eB_HNUGn6z7FozRMgGhtDCBSjLIPrOBnIkq0aPbvmnqvjb79nbl_LRsZh5G3jX9kul";
const TECHVENDOR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4uzX5A58DZMWSdG9QzjPrI1mxlwlUKiptZTjpMQOUmA_gGl47lK_dUuF9lG9vYuouU-UsJDa80Ckzv856BcbEjhd6uXlGym4EUhGweXy67mwOOeOP-QTQkZAxjCBr0fWaPj8o5OKTfehgAk-cw_-4besmbeOspf0m3Z2rfFD34UwpxNmS0c3KJ7X0d5q4oQAvXU6gZwmoeIv4KUly9KvPimzxz8HnBY78jqUwkNbQKKjAGe6Vq9jV";

const RAILS = [
  { id: "fednow", icon: "speed", title: "Instant ACH / FedNow", badge: "Fastest", badgeStyle: "bg-secondary-container text-on-secondary-container", sub: "$0 network fees • Settles in < 3 secs", iconStyle: "bg-secondary/10 text-secondary" },
  { id: "swift", icon: "language", title: "Global Wire / SWIFT", badge: "180+ Ctry", badgeStyle: "bg-surface-container text-on-surface-variant", sub: "Zero FX markups • Mid-market pricing", iconStyle: "bg-surface-container-high text-primary" },
  { id: "finpay-id", icon: "alternate_email", title: "Send to Finpay ID", badge: "Internal", badgeStyle: "bg-secondary-container/30 text-secondary", sub: "Instant peer settlement • No account info", iconStyle: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { id: "payroll", icon: "schedule_send", title: "Automated Payroll Rail", badge: "Recurring", badgeStyle: "bg-surface-container text-on-surface-variant", sub: "Bi-weekly / Monthly batch disbursements", iconStyle: "bg-surface-container-highest text-primary" },
];

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "SGD", symbol: "S$" },
];

export default function TransfersPage() {
  const [selected, setSelected] = useState("fednow");
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [submitState, setSubmitState] = useState("idle");
  const cur = CURRENCIES[currencyIndex];

  const cycleCurrency = () => setCurrencyIndex((i) => (i + 1) % CURRENCIES.length);

  const handleSubmit = () => {
    if (submitState !== "idle") return;
    setSubmitState("securing");
    setTimeout(() => setSubmitState("ready"), 800);
    setTimeout(() => setSubmitState("idle"), 2300);
  };

  return (
    <>
      <MobileHeader title="Transfers And Pay" />
      <main className="relative w-full pt-16 pb-24 bg-surface min-h-dvh">
        <div className="flex flex-col w-full px-gutter space-y-space-lg pb-space-xl">
          {/* Amount card */}
          <div className="w-full bg-primary-container rounded-lg p-space-lg shadow-xl relative overflow-hidden text-on-primary">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed mr-1.5 animate-pulse" />
                    FedNow Active
                  </span>
                  <span className="text-on-primary-container font-label-sm text-label-sm">Instant Rail</span>
                </div>
                <button
                  className="flex items-center space-x-1 bg-surface/10 hover:bg-surface/20 active:scale-95 transition-all px-space-sm py-1 rounded-full text-on-primary"
                  onClick={cycleCurrency}
                >
                  <span className="font-label-md text-label-md">{cur.code}</span>
                  <Icon name="expand_more" className="text-[16px]" />
                </button>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">
                  Amount to Transfer
                </span>
                <div className="flex items-baseline mt-1">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-secondary-fixed mr-1">
                    {cur.symbol}
                  </span>
                  <input
                    className="bg-transparent font-display-hero-mobile text-display-hero-mobile text-on-primary font-bold focus:outline-none w-full tracking-tight"
                    defaultValue="1,250.00"
                    placeholder="0.00"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-space-xs">
                <div className="flex items-center justify-between py-2 px-space-sm rounded bg-surface/5 backdrop-blur-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="verified" className="text-secondary-fixed text-[18px]" />
                    <span className="font-body-sm text-body-sm text-on-primary-container">
                      Finpay Instant Rail: <span className="text-secondary-fixed font-semibold">$0.00 Fee</span>
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-primary-container">Settles &lt;3s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full">
            <div className="flex items-center bg-surface-container-low rounded-full px-space-md py-space-sm shadow-sm transition-all focus-within:shadow-md focus-within:bg-surface-container-lowest">
              <Icon name="search" className="text-outline text-[22px] mr-space-xs" />
              <input
                className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                placeholder="Search name, @finpay-id, IBAN, routing..."
                type="text"
              />
              <button aria-label="Scan QR or Invoice" className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <Icon name="qr_code_scanner" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Recent contacts */}
          <div className="flex flex-col space-y-space-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Contacts</h2>
              <a className="font-label-md text-label-md text-secondary hover:underline" href="#">View All</a>
            </div>
            <div className="flex items-center space-x-space-md overflow-x-auto pb-space-xs -mx-gutter px-gutter no-scrollbar">
              <button className="flex flex-col items-center space-y-space-xs group flex-shrink-0 focus:outline-none text-left">
                <div className="relative">
                  <img className="w-14 h-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" src={SARAH} alt="Sarah M." />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary-container rounded-full flex items-center justify-center">
                    <Icon name="bolt" className="text-[10px] text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-label-md text-on-surface truncate max-w-[70px]">Sarah M.</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Finpay</span>
                </div>
              </button>

              <button className="flex flex-col items-center space-y-space-xs group flex-shrink-0 focus:outline-none text-left">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Icon name="account_balance" className="text-[26px] text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary-container rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-[10px] text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-label-md text-on-surface truncate max-w-[70px]">Stripe Inc.</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Merchant</span>
                </div>
              </button>

              <button className="flex flex-col items-center space-y-space-xs group flex-shrink-0 focus:outline-none text-left">
                <div className="relative">
                  <img className="w-14 h-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" src={TECHVENDOR} alt="TechVendor" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary-fixed rounded-full flex items-center justify-center">
                    <Icon name="public" className="text-[10px] text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-label-md text-on-surface truncate max-w-[70px]">TechVendor</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Vendor</span>
                </div>
              </button>

              <button className="flex flex-col items-center space-y-space-xs group flex-shrink-0 focus:outline-none text-left">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-headline-sm text-headline-sm text-on-error-container">K</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary-container rounded-full flex items-center justify-center">
                    <Icon name="sync" className="text-[10px] text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-label-md text-on-surface truncate max-w-[70px]">Klarna</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Payout</span>
                </div>
              </button>

              <button className="flex flex-col items-center space-y-space-xs group flex-shrink-0 focus:outline-none text-left">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Icon name="groups" className="text-[26px] text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary-container rounded-full flex items-center justify-center">
                    <Icon name="repeat" className="text-[10px] text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-label-md text-on-surface truncate max-w-[70px]">Payroll Acme</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Recurring</span>
                </div>
              </button>
            </div>
          </div>

          {/* Transfer rail selection */}
          <div className="flex flex-col space-y-space-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Transfer Rail</h2>
              <span className="font-label-sm text-label-sm text-secondary">Select protocol</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              {RAILS.map((rail) => {
                const isSel = selected === rail.id;
                return (
                  <button
                    key={rail.id}
                    onClick={() => setSelected(rail.id)}
                    className={`flex items-center gap-space-sm p-space-md rounded-2xl text-left transition-all active:scale-[0.99] ${
                      isSel ? "bg-surface-container-lowest ring-2 ring-secondary shadow-md" : "bg-surface-container-low shadow-sm"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full ${rail.iconStyle} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={rail.icon} className="text-[22px]" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">{rail.title}</span>
                        <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${rail.badgeStyle}`}>{rail.badge}</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{rail.sub}</span>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSel ? "border-secondary" : "border-outline-variant"
                      }`}
                    >
                      {isSel && <span className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scheduled transfer */}
          <div className="flex items-center gap-space-sm p-space-md rounded-2xl bg-surface-container-low border border-dashed border-outline-variant">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0">
              <Icon name="event_repeat" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-label-md text-label-md text-on-surface font-semibold">Scheduled Transfer Active</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Monthly IT Vendor Contract ($4,200.00)
              </span>
            </div>
            <Icon name="chevron_right" className="text-[22px] text-outline flex-shrink-0" />
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className={`w-full py-space-md rounded-full font-label-lg text-label-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
              submitState === "ready" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"
            }`}
          >
            {submitState === "idle" && (
              <>
                Continue Transfer
                <Icon name="arrow_forward" className="text-[20px]" />
              </>
            )}
            {submitState === "securing" && (
              <>
                <Icon name="lock" className="text-[18px]" />
                Securing…
              </>
            )}
            {submitState === "ready" && (
              <>
                <Icon name="check_circle" className="text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                Ready to send
              </>
            )}
          </button>
          <p className="text-center font-label-sm text-label-sm text-outline -mt-space-sm">
            Encrypted end-to-end • PCI DSS Level 1 Certified Partners
          </p>
        </div>
      </main>
    </>
  );
}
