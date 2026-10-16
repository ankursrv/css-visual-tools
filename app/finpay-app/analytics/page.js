"use client";

import { useState } from "react";
import MobileHeader from "@/components/finpay/MobileHeader";
import Icon from "@/components/finpay/Icon";

const PERIODS = ["1W", "1M", "6M", "1Y", "5Y"];

const PERIOD_DATA = {
  "1W": { display: "$1,075,580", delta: "+2.1%", curve: "M 0,120 C 40,118 70,110 110,104 C 150,98 185,100 220,80 C 255,60 285,45 320,30" },
  "1M": { display: "$1,048,220", delta: "+6.4%", curve: "M 0,132 C 45,128 75,118 110,110 C 150,100 185,108 220,86 C 255,62 285,48 320,34" },
  "6M": { display: "$1,075,580", delta: "+31.1%", curve: "M 0,140 C 45,135 75,120 110,112 C 150,103 185,115 220,78 C 255,48 285,32 320,22" },
  "1Y": { display: "$980,100", delta: "+18.7%", curve: "M 0,150 C 45,142 75,138 110,124 C 150,110 185,120 220,92 C 255,66 285,50 320,38" },
  "5Y": { display: "$1,075,580", delta: "+42.3%", curve: "M 0,155 C 45,150 75,132 110,120 C 150,104 185,112 220,74 C 255,44 285,30 320,18" },
};

const TIMELINE = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const METRICS = [
  { label: "Total Inflow", value: "+$148,200", meta: "12.4% vs last period", icon: "south_west", tint: "text-secondary", chip: "bg-secondary-container/40" },
  { label: "Total Outflow", value: "-$32,450", meta: "3.1% vs last period", icon: "north_east", tint: "text-primary", chip: "bg-surface-container-high" },
  { label: "Fixed Yield", value: "+$4,120", meta: "4.85% APY", icon: "savings", tint: "text-secondary", chip: "bg-secondary-container/40" },
  { label: "Zero-Fee", value: "$1,280", meta: "Fees saved", icon: "verified", tint: "text-tertiary", chip: "bg-tertiary-fixed" },
];

const ALLOCATION = [
  { name: "Payroll & Subscriptions", pct: 42, amount: "$13,629", bar: "bg-secondary" },
  { name: "Cloud Infrastructure", pct: 34, amount: "$11,033", bar: "bg-primary" },
  { name: "Vendor Settlements", pct: 16, amount: "$5,192", bar: "bg-tertiary" },
  { name: "Operational Travel", pct: 8, amount: "$2,596", bar: "bg-secondary-fixed-dim" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6M");
  const [yieldOn, setYieldOn] = useState(true);
  const [exportState, setExportState] = useState("idle");

  const active = PERIOD_DATA[period];

  const handleExport = () => {
    if (exportState !== "idle") return;
    setExportState("loading");
    setTimeout(() => setExportState("done"), 1400);
    setTimeout(() => setExportState("idle"), 3200);
  };

  return (
    <>
      <MobileHeader title="Analytics And Yield" />
      <main className="relative w-full pt-16 pb-24 bg-surface min-h-dvh">
        <div className="flex flex-col w-full px-gutter space-y-space-lg pb-space-xl">
          {/* Overview */}
          <div className="relative overflow-hidden rounded-lg bg-primary-container text-on-primary p-space-lg shadow-xl mt-space-sm">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="account_balance" className="text-secondary-fixed text-[18px]" />
                  <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                    Reserve Vault v4
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                  Live Rebalancing
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                  Total Liquidity
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-hero-mobile text-display-hero-mobile font-bold tracking-tight text-on-primary">
                    $1,075,580.40
                  </span>
                  <span className="font-label-md text-label-md text-secondary-fixed">USD</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-primary-container">
                  Performance over last 6 months
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="trending_up" className="text-secondary-fixed text-[16px]" />
                <span className="font-label-md text-label-md text-secondary-fixed">+31.1%</span>
                <span className="font-body-sm text-body-sm text-on-primary-container">yield this quarter</span>
              </div>
            </div>
          </div>

          {/* Period switcher */}
          <div className="flex items-center justify-between gap-2 bg-surface-container-low rounded-full p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 py-2 rounded-full font-label-md text-label-md transition-all ${
                  period === p
                    ? "bg-primary text-on-primary shadow-md"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Interactive chart card */}
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">Yield Accrual Curve</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Projected treasury growth</span>
              </div>
              <div className="text-right">
                <span className="block font-label-lg text-label-lg text-secondary font-semibold">{active.display}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{active.delta}</span>
              </div>
            </div>

            <div className="relative w-full">
              <svg className="w-full h-40" viewBox="0 0 320 170" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-secondary-fixed-dim)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                  <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d={`${active.curve} L 320,170 L 0,170 Z`} fill="url(#curveGradient)" />
                <path d={active.curve} stroke="url(#strokeGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
                <circle cx="320" cy="22" r="4" fill="var(--color-secondary)" />
              </svg>
              <div className="absolute top-0 right-0 px-2 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm shadow-lg">
                {active.display}
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              {TIMELINE.map((t) => (
                <span key={t} className="font-label-sm text-label-sm text-on-surface-variant">{t}</span>
              ))}
            </div>
          </div>

          {/* Key Metrics 2x2 */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider px-1">
              Key Metrics
            </span>
            <div className="grid grid-cols-2 gap-space-sm">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-2xl bg-surface-container-low p-space-md flex flex-col gap-2 shadow-sm">
                  <div className={`w-9 h-9 rounded-full ${m.chip} ${m.tint} flex items-center justify-center`}>
                    <Icon name={m.icon} className="text-[18px]" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</span>
                  <span className={`font-headline-sm text-headline-sm ${m.tint} leading-none`}>{m.value}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{m.meta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Allocation */}
          <div className="rounded-2xl bg-surface-container-low p-space-md flex flex-col gap-space-md shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Expense Allocation</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Last 30 days · $32,450</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              {ALLOCATION.map((a) => (
                <div key={a.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface">{a.name}</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {a.pct}% <span className="text-on-surface">· {a.amount}</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className={`h-full rounded-full ${a.bar} transition-all duration-500`} style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Treasury Autopilot banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-container/60 via-surface-container-high to-surface-container-low p-space-md flex flex-col gap-space-sm shadow-sm">
            <div className="flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-11 h-11 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="autorenew" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">Treasury Autopilot</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Auto-Sweep to 4.85% APY
                  </span>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={yieldOn}
                aria-label="Toggle yield autopilot"
                onClick={() => setYieldOn((v) => !v)}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none flex-shrink-0 ${
                  yieldOn ? "bg-secondary" : "bg-surface-container-highest"
                }`}
              >
                <span className={`absolute left-1 top-1 w-4 h-4 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${yieldOn ? "translate-x-5" : ""}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                FDIC Insured up to $5M
              </span>
              <a className="font-label-md text-label-md text-secondary hover:underline" href="#">Configure Rules</a>
            </div>
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="w-full py-space-md rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {exportState === "idle" && (
              <>
                <Icon name="download" className="text-[20px]" />
                Export Official Statement (CSV/PDF)
              </>
            )}
            {exportState === "loading" && (
              <>
                <Icon name="progress_activity" className="text-[20px] animate-spin" />
                Generating…
              </>
            )}
            {exportState === "done" && (
              <>
                <Icon name="check_circle" className="text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                Downloaded
              </>
            )}
          </button>
          <p className="text-center font-label-sm text-label-sm text-outline -mt-space-sm">
            Real-time analytics based on SOC2 Type II Certified Partners
          </p>
        </div>
      </main>
    </>
  );
}
