"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

/**
 * Format raw URL slugs into human-readable titles.
 */
function formatSegmentTitle(segment: string): string {
  const dictionary: Record<string, string> = {
    banking: "Banking UI",
    "grid-generator": "Grid Generator",
    ui: "UI Library",
    nextjs: "Next.js",
    "html-css": "HTML & CSS",
    tailwind: "Tailwind CSS",
    components: "Components",
    templates: "Templates",
    animations: "Animations",
  };

  if (dictionary[segment.toLowerCase()]) {
    return dictionary[segment.toLowerCase()];
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Breadcrumb({
  items,
  className = "",
  showHome = true,
}: BreadcrumbProps) {
  const pathname = usePathname();

  // If custom items are provided, use them; otherwise automatically parse from pathname
  const breadcrumbItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    if (!pathname || pathname === "/") {
      return [];
    }

    const segments = pathname.split("/").filter(Boolean);
    const generated: BreadcrumbItem[] = [];

    let currentHref = "";
    segments.forEach((segment, index) => {
      currentHref += `/${segment}`;
      const isLast = index === segments.length - 1;

      generated.push({
        label: formatSegmentTitle(segment),
        href: isLast ? undefined : currentHref,
      });
    });

    return generated;
  }, [items, pathname]);

  if (breadcrumbItems.length === 0 && (!showHome || pathname === "/")) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-medium ${className}`}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Home Link */}
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Return to Home"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
        )}

        {/* Separator after Home */}
        {showHome && breadcrumbItems.length > 0 && (
          <li aria-hidden="true" className="text-zinc-600 select-none">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
        )}

        {/* Dynamic Items */}
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <React.Fragment key={item.label + index}>
              <li className="inline-flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-semibold text-zinc-100"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {!isLast && (
                <li aria-hidden="true" className="text-zinc-600 select-none">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
