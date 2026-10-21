import Link from "next/link";
import Icon from "@/components/finpay/Icon";
import { NAV_LINKS } from "@/data/nav";

// Sticky landing page header: brand, desktop nav, sign-in + mobile CSS-only menu.
// Sticky (not fixed) so the top breadcrumb bar stays visible above it, mirroring the banking template.
export default function SiteHeader({ logoUrl }) {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1200px] mx-auto px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <a className="flex items-center gap-space-sm" href="#">
            <img
              alt="Finpay Logo"
              className="h-8 w-auto object-contain"
              src={logoUrl}
            />
            <span className="font-headline-sm text-headline-sm text-primary-container font-bold tracking-tight">
              Finpay
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-space-lg ml-space-md">
            {NAV_LINKS.map((link) => {
              // Internal routes get client-side navigation (prefetch); '#' placeholders stay plain <a>.
              const Tag = link.href.startsWith("/") ? Link : "a";
              return (
                <Tag
                  key={link.label}
                  className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Tag>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-space-md">
          {/* Desktop actions */}
          <a className="hidden md:inline font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors px-space-sm py-space-xs" href="#">
            Sign in
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
          {/* Mobile menu (CSS-only disclosure, no JS needed in a Server Component) */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors [&::-webkit-details-marker]:hidden">
              <Icon name="menu" className="text-[24px]" />
            </summary>
            <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container p-space-sm flex flex-col gap-1 z-50">
              {NAV_LINKS.map((link) => {
                const Tag = link.href.startsWith("/") ? Link : "a";
                return (
                  <Tag key={link.label} className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-xl px-space-md py-space-sm transition-colors" href={link.href}>
                    {link.label}
                  </Tag>
                );
              })}
              <div className="my-1 h-px bg-surface-container" />
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface rounded-xl px-space-md py-space-sm transition-colors" href="#">
                Sign in
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
