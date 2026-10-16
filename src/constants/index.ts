// ============================================================
// Application-wide constants.
// Keep environment-specific values in .env.local — not here.
// ============================================================

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'MyBanking';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
export const APP_DESCRIPTION =
  'A modern, secure banking platform for managing your finances with confidence.';

// ------------------------------------
// Navigation
// ------------------------------------

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/transactions', label: 'Transactions' },
] as const;

// ------------------------------------
// Pagination
// ------------------------------------

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ------------------------------------
// Date / Locale
// ------------------------------------

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_CURRENCY = 'USD';
