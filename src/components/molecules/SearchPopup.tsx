'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Compact search popup that appears just below the header.
 *
 * Design matches the screenshot:
 *  - White card with box shadow (no full-screen overlay)
 *  - Orange ✕ close button at the top-right corner of the card
 *  - Light gray input with "Search..." placeholder
 *  - Orange "Search" button on the right of the input
 *
 * Behaviour:
 *  - Clicking outside the card does NOT close it (no backdrop handler)
 *  - Only the ✕ button or Escape key closes it
 */
export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape key closes the popup
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-16 xl:top-[132px] z-[200]',
        'pointer-events-none',
        'px-4 sm:px-6 lg:px-8',
      )}
      aria-hidden={!isOpen}
    >
      {/* Container aligned with the header content area */}
      <div className="mx-auto max-w-7xl">
        {/* Popup card — transitions in/out */}
        <div
          role="dialog"
          aria-label="Search"
          aria-modal="false"
          className={cn(
            'relative bg-white rounded-lg shadow-2xl',
            'transition-all duration-200 ease-out',
            'pointer-events-auto',
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-3',
          )}
        >
          {/* ✕ close button — orange circle at top-right corner of the card */}
          <button
            id="search-popup-close"
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className={cn(
              'absolute -top-3.5 right-3.5 z-10',
              'flex h-7 w-7 items-center justify-center',
              'rounded-full bg-brand-orange text-white',
              'text-sm font-bold leading-none',
              'hover:bg-brand-orange-dark transition-colors',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-brand-orange focus-visible:ring-offset-2',
              isOpen ? 'pointer-events-auto' : 'pointer-events-none',
            )}
          >
            ✕
          </button>

          {/* Search row */}
          <div className="flex items-center gap-3 p-3">
            {/* Input */}
            <label htmlFor="header-search-input" className="sr-only">
              Search Ujjivan Bank
            </label>
            <input
              ref={inputRef}
              id="header-search-input"
              type="search"
              placeholder="Search..."
              className={cn(
                'flex-1 rounded bg-gray-100 px-4 py-2.5',
                'text-sm text-gray-800 placeholder-gray-400',
                'outline-none focus:bg-gray-50 focus:ring-1 focus:ring-brand-teal/30',
                'transition-colors',
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  /* navigate or trigger search here */
                }
              }}
            />

            {/* Orange "Search" button */}
            <button
              type="button"
              className={cn(
                'flex-shrink-0 rounded-full bg-brand-orange px-6 py-2.5',
                'text-sm font-semibold text-white',
                'hover:bg-brand-orange-dark transition-colors',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-brand-orange focus-visible:ring-offset-2',
              )}
              onClick={() => {
                /* trigger search */
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
