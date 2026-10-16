import { TopHeader } from '@/components/organisms/TopHeader';
import { MainHeader } from '@/components/organisms/MainHeader';

/**
 * Site-wide header organism.
 *
 * Composed of two tiers:
 *  1. `<TopHeader>` — teal `#056262` bar with segment tabs and contact info.
 *  2. `<MainHeader>` — white bar with logo, nav mega-menus, Apply Now, Login, Search.
 *
 * The outer `<header>` provides `sticky` positioning and a high z-index so
 * both tiers move as a single unit when scrolling.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <TopHeader />
      <MainHeader />
    </header>
  );
}
