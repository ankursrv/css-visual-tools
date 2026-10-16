import { cn } from '@/lib/utils';

// ------------------------------------------------------------------
// Data — matches the Figma "About / Our Offers" panel
// ------------------------------------------------------------------

const BANK_STATS = [
  'A Scheduled Commercial Bank',
  'Over 26,500 Employees',
  '₹48,129 Cr. Deposits And ₹42,903 Cr. Gross Loan Book',
  'Up To 7.80% Interest P.A. On Fixed Deposits',
  'Up To 7.15% Interest P.A. On Savings Account',
] as const;

const OFFER_LINKS = [
  { label: 'Savings Accounts', href: '#' },
  { label: 'Current Accounts', href: '#' },
  { label: 'Term Deposits Loans', href: '#' },
  { label: 'Co-Branded Credit Cards', href: '#' },
  { label: 'Loans', href: '#' },
  { label: 'Debit Cards', href: '#' },
  { label: 'NRI Services & Forex', href: '#' },
  { label: 'Investment & Wealth Solutions', href: '#' },
  { label: 'Ivory Programme', href: '#' },
  { label: 'Ujjivan Rewardz', href: '#' },
] as const;

// ------------------------------------------------------------------
// Small presentational pieces
// ------------------------------------------------------------------

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-[7px]">
      <span
        aria-hidden="true"
        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#009F7F]"
      />
      <span className="text-[13px] leading-[1.45] text-[#009F7F]">
        {children}
      </span>
    </li>
  );
}

// ------------------------------------------------------------------
// Panel
// ------------------------------------------------------------------

/**
 * QuickLinksPanel — "About / Our Offers" info card.
 * Reproduces the Figma export: a white card (292px wide) with a drop
 * shadow and rounded bottom corners, holding two bordered boxes — a
 * list of bank statistics and an "OUR OFFERS" list of quick links.
 */
export default function QuickLinksPanel({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-[17px] rounded-b-[12px] bg-white p-[13px]',
        'shadow-[0_15px_28px_rgba(0,0,0,0.12)]',
        className,
      )}
      aria-label="About Ujjivan and our offers"
    >
      {/* Bank statistics */}
      <div className="rounded-[7.5px] border border-[#111111]/12 p-5">
        <ul className="space-y-[10px]">
          {BANK_STATS.map((stat) => (
            <BulletItem key={stat}>{stat}</BulletItem>
          ))}
        </ul>
      </div>

      {/* Our offers */}
      <div className="rounded-[7.5px] border border-[#111111]/12 p-5">
        <h3 className="mb-[14px] text-[15px] font-bold tracking-[0.3px] text-[#009F7F] uppercase">
          Our Offers
        </h3>
        <ul className="space-y-[10px]">
          {OFFER_LINKS.map((offer) => (
            <li key={offer.label} className="flex items-start gap-[7px]">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#009F7F]"
              />
              <a
                href={offer.href}
                className="text-[13px] leading-[1.45] text-[#009F7F] transition-opacity hover:opacity-80"
              >
                {offer.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
