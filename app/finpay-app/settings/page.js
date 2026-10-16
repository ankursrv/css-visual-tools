"use client";

import { useState } from "react";
import MobileHeader from "@/components/finpay/MobileHeader";
import Icon from "@/components/finpay/Icon";

const ALEX_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAerwC9-7d6TQNdDzet2kfaWVhBlx9iVmlpmMkpVE06ddOrqrjRxvMY-UWTWDOK1UWmXZOVFCrmUOwIPOIN40m59Df0BY7TWhGoFT1fZ5GiJYLqZWjB3vVRFWvE3okuR57-ltRqDFTqL1I0GpVwFSde4TMGprgRQ0SvqQbgL_N37IE3Bf_xbzFhApUNaQYznaq_IYkMVT1AZAzZQCiz_eUikqBqO9PiBMfDziBcBGyNAOemyGZSl3M3";

const TOGGLES = [
  { key: "biometric", icon: "fingerprint", label: "Biometric Login", desc: "Face ID & fingerprint", tint: "text-secondary", chip: "bg-secondary-container/40" },
  { key: "push", icon: "notifications_active", label: "Push Notifications", desc: "Real-time transfer alerts", tint: "text-primary", chip: "bg-surface-container-high" },
  { key: "twofa", icon: "shield", label: "2-Factor Auth", desc: "Extra login security", tint: "text-tertiary", chip: "bg-tertiary-fixed" },
];

const LINKS = [
  { icon: "account_balance", label: "Linked Accounts", value: "3 connected", tint: "text-primary", chip: "bg-surface-container-high" },
  { icon: "credit_card", label: "Cards & Limits", value: "2 active", tint: "text-secondary", chip: "bg-secondary-container/40" },
  { icon: "receipt_long", label: "Statements & Tax", value: "", tint: "text-primary", chip: "bg-surface-container-high" },
  { icon: "help_center", label: "Help & Support", value: "24/7", tint: "text-tertiary", chip: "bg-tertiary-fixed" },
];

export default function SettingsPage() {
  const [state, setState] = useState({ biometric: true, push: true, twofa: false });

  const toggle = (key) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      <MobileHeader title="Settings" />
      <main className="relative w-full pt-16 pb-24 bg-surface min-h-dvh">
        <div className="flex flex-col w-full px-gutter space-y-space-lg pb-space-xl">
          {/* Profile */}
          <div className="flex items-center gap-space-md pt-space-sm">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-md bg-surface-container-high flex items-center justify-center ring-2 ring-secondary-container/50">
              <img className="w-full h-full object-cover" src={ALEX_AVATAR} alt="Alex Vance" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface">Alexander Vance</span>
                <Icon name="verified" className="text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">alex@finpay.com</span>
              <span className="font-label-sm text-label-sm text-secondary mt-0.5 uppercase tracking-wider">
                Treasury Elite
              </span>
            </div>
          </div>

          {/* Security toggles */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider px-1">
              Security &amp; Privacy
            </span>
            <div className="rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container">
              {TOGGLES.map((t) => (
                <div key={t.key} className="flex items-center justify-between p-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className={`w-10 h-10 rounded-full ${t.chip} ${t.tint} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={t.icon} className="text-[20px]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface">{t.label}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{t.desc}</span>
                    </div>
                  </div>
                  <button
                    role="switch"
                    aria-checked={state[t.key]}
                    aria-label={t.label}
                    onClick={() => toggle(t.key)}
                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                      state[t.key] ? "bg-secondary" : "bg-surface-container-highest"
                    }`}
                  >
                    <span className={`absolute left-1 top-1 w-4 h-4 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${state[t.key] ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences / links */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider px-1">
              Preferences
            </span>
            <div className="rounded-2xl bg-surface-container-lowest shadow-sm divide-y divide-surface-container">
              {LINKS.map((l) => (
                <button key={l.label} className="w-full flex items-center justify-between p-space-md text-left hover:bg-surface-container/50 transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <div className={`w-10 h-10 rounded-full ${l.chip} ${l.tint} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={l.icon} className="text-[20px]" />
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">{l.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {l.value && <span className="font-label-sm text-label-sm text-on-surface-variant">{l.value}</span>}
                    <Icon name="chevron_right" className="text-[20px] text-outline" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* App info + sign out */}
          <div className="flex flex-col gap-space-sm">
            <button className="w-full py-space-md rounded-full bg-error-container text-on-error-container font-label-lg text-label-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Icon name="logout" className="text-[20px]" />
              Sign Out
            </button>
            <p className="text-center font-label-sm text-label-sm text-outline">
              Finpay v2.4.0 · FDIC Insured up to $5M
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
