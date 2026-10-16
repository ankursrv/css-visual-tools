"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/finpay/Icon";

const TABS = [
  { href: "/finpay-app", icon: "dashboard", label: "Home" },
  { href: "/finpay-app/cards", icon: "credit_card", label: "Cards" },
  { href: "/finpay-app/transfers", icon: "sync_alt", label: "Transfer" },
  { href: "/finpay-app/analytics", icon: "insights", label: "Insights" },
  { href: "/finpay-app/settings", icon: "tune", label: "Settings" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-4px_20px_rgba(10,54,58,0.06)]">
      <div className="flex items-center justify-around h-16 px-space-xs">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
                active ? "text-secondary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon name={tab.icon} className="text-[22px]" />
              <span className="font-label-sm text-label-sm mt-0.5">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
