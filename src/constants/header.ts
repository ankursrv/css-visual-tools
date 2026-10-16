// ============================================================
// Ujjivan Bank — Header navigation data
// ============================================================

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductLink {
  label: string;
  href: string;
  description?: string;
}

export interface ProductSubSection {
  /** Section header rendered as a distinct sub-heading within a column */
  title: string;
  links: ProductLink[];
}

export interface ProductColumn {
  /** Flat list of links rendered at the top of the column */
  links?: ProductLink[];
  /** Sectioned links with a heading, rendered after the flat list */
  sections?: ProductSubSection[];
}

export interface FeaturedCard {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface QuickLink {
  label: string;
  href: string;
  description?: string;
}

/**
 * Data for a full three-column mega menu panel:
 *  - columns[0]  → left product column
 *  - columns[1]  → middle product column (may have sub-sections)
 *  - featured    → top of the right promo column
 *  - quickLinks  → bottom of the right promo column
 */
export interface MegaMenuData {
  columns: ProductColumn[];
  featured?: FeaturedCard;
  quickLinks?: QuickLink[];
}

export interface MainNavItem {
  label: string;
  /** Used when the item is a plain link (no mega menu) */
  href?: string;
  megaMenu?: MegaMenuData;
}

// ─── Top-bar segment tabs ─────────────────────────────────────────────────────

export const TOP_SEGMENTS = [
  { label: 'Personal',            href: '/',                    segment: 'personal' },
  { label: 'Business',            href: '/business',            segment: 'business' },
  { label: 'NRI',                 href: '/nri',                 segment: 'nri' },
  { label: 'Careers',             href: '/careers',             segment: 'careers' },
  { label: 'Investor Relations',  href: '/investor-relations',  segment: 'investor-relations' },
  { label: 'Media',               href: '/media',               segment: 'media' },
] as const;

// ─── Contact info ─────────────────────────────────────────────────────────────

export const CONTACT_INFO = {
  whatsapp: {
    displayNumber: '900 208 2121',
    href: 'https://wa.me/9002082121',
    ariaLabel: 'Chat with us on WhatsApp at 900 208 2121',
  },
  phone: {
    displayNumber: '1800 208 2121',
    href: 'tel:18002082121',
    ariaLabel: 'Call us toll-free at 1800 208 2121',
  },
} as const;

// ─── Main navigation ──────────────────────────────────────────────────────────

export const MAIN_NAV: MainNavItem[] = [
  // ── Savings ───────────────────────────────────────────────────────────────
  {
    label: 'Savings',
    megaMenu: {
      columns: [
        {
          links: [
            {
              label: 'Ivory by Ujjivan',
              href: '/savings/ivory',
              description: 'Premium Benefits Tailored for Your Lifestyle',
            },
            {
              label: 'Maxima Savings Account',
              href: '/savings/maxima',
              description: 'Your Key to Limitless Banking',
            },
            {
              label: 'Privilege Savings Account',
              href: '/savings/privilege',
              description: 'A world of banking privileges, now open to the world',
            },
            {
              label: 'Classic Savings Account',
              href: '/savings/classic',
              description: 'Give your account a classic edge',
            },
            {
              label: 'Digital Savings Account',
              href: '/savings/digital',
              description: 'For busy savers!',
            },
            {
              label: 'Garima Savings Account',
              href: '/savings/garima',
              description: 'Journey on with pride',
            },
          ],
        },
        {
          links: [
            {
              label: 'Regular Savings Account',
              href: '/savings/regular',
              description: 'Smaller Savings for Better Future',
            },
            {
              label: 'Senior Citizen Savings Account',
              href: '/savings/senior',
              description: 'Banking services with a touch of care',
            },
            {
              label: 'Minor Savings Account',
              href: '/savings/minor',
              description: "Start saving early to secure your child's future",
            },
            {
              label: 'Basic Savings Bank Deposit Account (BSBDA)',
              href: '/savings/bsbda',
            },
          ],
          sections: [
            {
              title: 'Corporate Salary Account',
              links: [
                {
                  label: 'Maxima Salary Account',
                  href: '/savings/maxima-salary',
                  description: 'More Benefits More Freedom',
                },
                {
                  label: 'Regular Corporate Salary Account',
                  href: '/savings/regular-salary',
                  description: 'Experience effortless salary management',
                },
                {
                  label: 'Privilege Corporate Salary Account',
                  href: '/savings/privilege-salary',
                  description: 'For elevated employee benefits',
                },
              ],
            },
          ],
        },
      ],
      featured: {
        title: 'Get up to 7.45%* on our Fixed Deposits',
        subtitle: 'Interest rates are subject to change. T&C Apply',
        ctaLabel: 'Invest Now',
        ctaHref: '/deposits/fixed',
      },
      quickLinks: [
        { label: 'Track Your loan application status', href: '/loans/track' },
        {
          label: 'Video Banking',
          href: '/digital/video-banking',
          description: 'Experience personalized banking on your screen!',
        },
        { label: 'Loan Repayment', href: '/loans/repayment' },
        { label: 'Interest Rates', href: '/rates/interest' },
        {
          label: 'Rupay Debit Card Offers',
          href: '/cards/rupay-offers',
          description: 'Enjoy exclusive Offer on RuPay Debit Cards',
        },
        { label: 'Feedback', href: '/feedback' },
      ],
    },
  },

  // ── Deposits ──────────────────────────────────────────────────────────────
  {
    label: 'Deposits',
    megaMenu: {
      columns: [
        {
          links: [
            {
              label: 'Fixed Deposit',
              href: '/deposits/fixed',
              description: 'Earn up to 7.45%* on your deposits',
            },
            {
              label: 'Recurring Deposit',
              href: '/deposits/recurring',
              description: 'Save monthly with attractive returns',
            },
            {
              label: 'Flexi RD',
              href: '/deposits/flexi-rd',
              description: 'Flexible recurring deposit plan',
            },
            {
              label: 'Tax Saver FD',
              href: '/deposits/tax-saver',
              description: 'Save taxes under Section 80C',
            },
          ],
        },
        {
          links: [
            {
              label: 'Senior Citizen FD',
              href: '/deposits/senior-fd',
              description: 'Additional 0.50% p.a. for senior citizens',
            },
            {
              label: 'NRE Fixed Deposit',
              href: '/deposits/nre-fd',
              description: 'Tax-free returns for NRIs',
            },
            {
              label: 'NRO Fixed Deposit',
              href: '/deposits/nro-fd',
              description: 'Manage India-sourced income for NRIs',
            },
          ],
        },
      ],
      featured: {
        title: 'Earn up to 7.45%* interest on Fixed Deposits',
        ctaLabel: 'Open FD Now',
        ctaHref: '/deposits/fixed',
      },
      quickLinks: [
        { label: 'FD Interest Rates', href: '/rates/fd', description: 'Check current FD interest rates' },
        { label: 'FD Calculator', href: '/calculators/fd', description: 'Calculate your FD maturity amount' },
        { label: 'Premature Withdrawal', href: '/deposits/premature', description: 'Terms and penalties' },
        { label: 'Loan Against FD', href: '/loans/against-fd', description: 'Borrow against your FD' },
      ],
    },
  },

  // ── Loans ─────────────────────────────────────────────────────────────────
  {
    label: 'Loans',
    megaMenu: {
      columns: [
        {
          links: [
            { label: 'Home Loan', href: '/loans/home', description: 'Make your dream home a reality' },
            { label: 'Personal Loan', href: '/loans/personal', description: 'Quick funds for personal needs' },
            { label: 'Vehicle Loan', href: '/loans/vehicle', description: 'Finance your dream vehicle' },
            { label: 'Education Loan', href: '/loans/education', description: 'Invest in your future' },
          ],
        },
        {
          links: [
            { label: 'Gold Loan', href: '/loans/gold', description: 'Quick loans against gold' },
            { label: 'Loan Against Property', href: '/loans/property', description: 'Unlock your property value' },
            { label: 'Loan Against FD', href: '/loans/against-fd', description: 'Borrow against your FD' },
          ],
          sections: [
            {
              title: 'Micro Finance',
              links: [
                { label: 'Group Loan', href: '/loans/group', description: 'Loans for self-help groups' },
                { label: 'Individual Loan', href: '/loans/individual', description: 'Personalised micro finance' },
                { label: 'MSE Loan', href: '/loans/mse', description: 'For micro & small enterprises' },
              ],
            },
          ],
        },
      ],
      featured: {
        title: 'Quick Personal Loan at competitive rates',
        ctaLabel: 'Apply Now',
        ctaHref: '/loans/personal',
      },
      quickLinks: [
        { label: 'Loan EMI Calculator', href: '/calculators/emi', description: 'Calculate your monthly EMI' },
        { label: 'Track Application Status', href: '/loans/track', description: 'Check your loan status online' },
        { label: 'Loan Repayment', href: '/loans/repayment' },
        { label: 'Interest Rates', href: '/rates/interest' },
      ],
    },
  },

  // ── Insurance ─────────────────────────────────────────────────────────────
  {
    label: 'Insurance',
    megaMenu: {
      columns: [
        {
          links: [
            { label: 'Term Insurance', href: '/insurance/term', description: "Protect your family's future" },
            { label: 'Credit Life Insurance', href: '/insurance/credit-life', description: 'Coverage linked to loans' },
            { label: 'Group Life Insurance', href: '/insurance/group-life', description: 'Coverage for organisations' },
            { label: 'PM Jeevan Jyoti Bima Yojana', href: '/insurance/pmjjby', description: 'Govt life insurance scheme' },
          ],
        },
        {
          links: [
            { label: 'Health Insurance', href: '/insurance/health', description: 'Comprehensive health coverage' },
            { label: 'Motor Insurance', href: '/insurance/motor', description: 'Protect your vehicle' },
            { label: 'General Insurance', href: '/insurance/general', description: 'Wide range of protection' },
            { label: 'PM Suraksha Bima Yojana', href: '/insurance/pm-suraksha', description: 'Govt accident insurance' },
          ],
        },
      ],
      featured: {
        title: 'Protect yourself and your family with the right insurance',
        ctaLabel: 'Explore Plans',
        ctaHref: '/insurance',
      },
      quickLinks: [
        { label: 'Compare Plans', href: '/insurance/compare', description: 'Find the best plan for you' },
        { label: 'Claim Process', href: '/insurance/claims', description: 'Easy claims assistance' },
        { label: 'Premium Calculator', href: '/calculators/premium', description: 'Calculate your premium' },
      ],
    },
  },

  // ── Investment ────────────────────────────────────────────────────────────
  {
    label: 'Investment',
    megaMenu: {
      columns: [
        {
          links: [
            { label: 'Mutual Funds', href: '/investments/mutual-funds', description: 'Diversified portfolio options' },
            { label: 'SIP', href: '/investments/sip', description: 'Invest regularly in mutual funds' },
            { label: 'Sovereign Gold Bond', href: '/investments/sgb', description: 'Invest in gold digitally' },
            { label: 'Fixed Deposits', href: '/deposits/fixed', description: 'Guaranteed returns on deposits' },
          ],
        },
        {
          links: [
            { label: 'Public Provident Fund', href: '/investments/ppf', description: 'Tax-free long-term savings' },
            { label: 'National Pension System', href: '/investments/nps', description: 'Plan your retirement' },
            { label: 'Atal Pension Yojana', href: '/investments/apy', description: 'Pension for unorganised sector' },
          ],
        },
      ],
      featured: {
        title: 'Start investing with as little as ₹500 per month',
        ctaLabel: 'Start SIP',
        ctaHref: '/investments/sip',
      },
      quickLinks: [
        { label: 'SIP Calculator', href: '/calculators/sip', description: 'Calculate your SIP returns' },
        { label: 'Investment Guide', href: '/investments/guide', description: 'Beginners guide to investing' },
        { label: 'Interest Rates', href: '/rates/interest' },
        { label: 'Tax Saving Options', href: '/investments/tax-saving' },
      ],
    },
  },

  // ── Forex ─────────────────────────────────────────────────────────────────
  {
    label: 'Forex',
    megaMenu: {
      columns: [
        {
          links: [
            { label: 'Foreign Currency', href: '/forex/currency', description: 'Buy/sell foreign currency' },
            { label: 'Travel Card', href: '/forex/travel-card', description: 'Prepaid multi-currency card' },
            { label: 'Wire Transfer', href: '/forex/wire-transfer', description: 'International money transfers' },
            { label: 'Outward Remittance', href: '/forex/outward', description: 'Send money abroad easily' },
          ],
        },
        {
          links: [
            { label: 'Inward Remittance', href: '/forex/inward', description: 'Receive money from abroad' },
            { label: 'NRE Account', href: '/nri/nre-account', description: 'Repatriable foreign income' },
            { label: 'NRO Account', href: '/nri/nro-account', description: 'Manage Indian income for NRIs' },
            { label: 'FCNR Deposits', href: '/nri/fcnr', description: 'Fixed deposits in foreign currency' },
          ],
        },
      ],
      featured: {
        title: 'Best forex rates for your international needs',
        ctaLabel: 'Check Rates',
        ctaHref: '/forex/rates',
      },
      quickLinks: [
        { label: 'Forex Rates', href: '/forex/rates', description: 'Live foreign exchange rates' },
        { label: 'Forex Calculator', href: '/calculators/forex', description: 'Convert currencies instantly' },
        { label: 'Locate Branch', href: '/branch-locator', description: 'Find nearest Forex branch' },
      ],
    },
  },

  // ── Digi Banking ──────────────────────────────────────────────────────────
  {
    label: 'Digi Banking',
    megaMenu: {
      columns: [
        {
          links: [
            { label: 'Internet Banking', href: '/digital/internet-banking', description: 'Bank from your desktop' },
            { label: 'Go Mobile+ App', href: '/digital/mobile-app', description: 'Bank on the go with our app' },
            { label: 'UPI Payments', href: '/digital/upi', description: 'Instant money transfers' },
            { label: 'WhatsApp Banking', href: '/digital/whatsapp', description: 'Bank via WhatsApp' },
            { label: 'SMS Banking', href: '/digital/sms-banking', description: 'Banking via SMS alerts' },
          ],
        },
        {
          links: [
            { label: 'Debit Card', href: '/cards/debit', description: 'Access your funds anywhere' },
            { label: 'Prepaid Card', href: '/cards/prepaid', description: 'Controlled spending card' },
            { label: 'BBPS Bill Payments', href: '/digital/bbps', description: 'Pay all bills in one place' },
            { label: 'UPI Autopay', href: '/digital/upi-autopay', description: 'Automate recurring payments' },
            { label: 'Video Banking', href: '/digital/video-banking', description: 'Personalised banking on screen' },
          ],
        },
      ],
      featured: {
        title: 'Bank smarter with our Go Mobile+ App',
        ctaLabel: 'Download App',
        ctaHref: '/digital/mobile-app',
      },
      quickLinks: [
        { label: 'Register for Internet Banking', href: '/digital/register', description: 'Set up online banking' },
        { label: 'Reset Net Banking Password', href: '/digital/reset-password' },
        { label: 'Activate Debit Card', href: '/cards/activate' },
        { label: 'Block / Unblock Card', href: '/cards/block' },
      ],
    },
  },

  // ── Rewardz — plain link (no mega menu) ───────────────────────────────────
  {
    label: 'Rewardz',
    href: '/rewardz',
  },

  // ── Blogs — plain link (no mega menu) ─────────────────────────────────────
  {
    label: 'Blogs',
    href: '/blogs',
  },
];

// ─── Apply Now mega menu ──────────────────────────────────────────────────────

export const APPLY_NOW_MENU: MegaMenuData = {
  columns: [
    {
      links: [
        { label: 'Savings Account', href: '/apply/savings-account', description: 'Open an account in minutes' },
        { label: 'Fixed Deposit', href: '/apply/fixed-deposit', description: 'Earn high returns on deposits' },
        { label: 'Recurring Deposit', href: '/apply/recurring-deposit', description: 'Save monthly, earn more' },
        { label: 'Current Account', href: '/apply/current-account', description: 'For your business banking needs' },
      ],
    },
    {
      links: [
        { label: 'Personal Loan', href: '/apply/personal-loan', description: 'Quick personal loan approval' },
        { label: 'Home Loan', href: '/apply/home-loan', description: 'Affordable home loan options' },
        { label: 'Gold Loan', href: '/apply/gold-loan', description: 'Instant loans against your gold' },
        { label: 'Business Loan', href: '/apply/business-loan', description: 'Grow your business with our loans' },
        { label: 'Vehicle Loan', href: '/apply/vehicle-loan', description: 'Finance your dream vehicle' },
      ],
    },
  ],
  featured: {
    title: 'Open your Savings Account in just 5 minutes!',
    subtitle: 'Zero balance account with no hidden charges.',
    ctaLabel: 'Get Started',
    ctaHref: '/apply/savings-account',
  },
  quickLinks: [
    { label: 'Track Application Status', href: '/track', description: 'Check your application status online' },
    { label: 'EMI Calculator', href: '/calculators/emi', description: 'Calculate your loan EMI instantly' },
    { label: 'Eligibility Check', href: '/eligibility', description: 'Check if you are eligible for a loan' },
    { label: 'Documents Required', href: '/documents', description: 'View the list of required documents' },
  ],
};

// ─── Login dropdown ───────────────────────────────────────────────────────────

export const LOGIN_OPTIONS = [
  { label: 'Personal NetBanking',              href: '/login/personal' },
  { label: 'Ujjivan EZY NetBanking (Limited Users)', href: '/login/ezy' },
  { label: 'Business NetBanking',              href: '/login/business' },
] as const;
