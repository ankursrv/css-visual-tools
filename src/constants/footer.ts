// ============================================================
// Ujjivan Bank — Footer data
//
// Mirrors the Figma footer (node 2403-3240): a 4-column accordion grid of
// 18 sections, the branch/ATM locator picker, social links and the legal bar.
// Column order below is the design's visual order (left → right).
// ============================================================

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  label: string;
  /** Section header link — the accordion body holds the child links */
  href: string;
  links: FooterLink[];
}

export interface FooterColumn {
  sections: FooterSection[];
}

// ─── Accordion columns ───────────────────────────────────────────────────────

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    sections: [
      {
        label: 'About Us',
        href: '/about',
        links: [
          { label: 'Our Story', href: '/about/our-story' },
          { label: 'Board of Directors', href: '/about/board-of-directors' },
          { label: 'Management Team', href: '/about/management' },
          { label: 'Awards & Recognitions', href: '/about/awards' },
          { label: 'Corporate Social Responsibility', href: '/about/csr' },
        ],
      },
      {
        label: 'Products & Services',
        href: '/products',
        links: [
          { label: 'Savings Account', href: '/savings' },
          { label: 'Fixed & Recurring Deposits', href: '/deposits' },
          { label: 'Loans', href: '/loans' },
          { label: 'Insurance', href: '/insurance' },
          { label: 'Investment', href: '/investments' },
          { label: 'Forex', href: '/forex' },
        ],
      },
      {
        label: 'Banking Suites',
        href: '/banking-suites',
        links: [
          { label: 'Retail Banking', href: '/banking-suites/retail' },
          { label: 'Business Banking', href: '/business' },
          { label: 'NRI Banking', href: '/nri' },
          { label: 'Rural & Semi-urban Banking', href: '/banking-suites/rural' },
          { label: 'Microfinance', href: '/loans/micro-finance' },
        ],
      },
      {
        label: 'Investor Relations',
        href: '/investor-relations',
        links: [
          { label: 'Financial Results', href: '/investor-relations/financial-results' },
          { label: 'Annual Reports', href: '/investor-relations/annual-reports' },
          { label: 'Shareholding Pattern', href: '/investor-relations/shareholding-pattern' },
          { label: 'Listing Details', href: '/investor-relations/listing' },
          { label: 'Policies & Disclosures', href: '/investor-relations/policies' },
        ],
      },
      {
        label: 'Lodge a complaint',
        href: '/complaints',
        links: [
          { label: 'Raise a Complaint', href: '/complaints/new' },
          { label: 'Complaint Status', href: '/complaints/status' },
          { label: 'Escalation Matrix', href: '/complaints/escalation' },
          { label: 'Grievance Officers', href: '/complaints/grievance-officers' },
          { label: 'RBI Ombudsman Scheme', href: '/complaints/ombudsman' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        label: 'Smart Banking',
        href: '/digital',
        links: [
          { label: 'Internet Banking', href: '/digital/internet-banking' },
          { label: 'Go Mobile+ App', href: '/digital/mobile-app' },
          { label: 'UPI Payments', href: '/digital/upi' },
          { label: 'WhatsApp Banking', href: '/digital/whatsapp' },
          { label: 'Video Banking', href: '/digital/video-banking' },
        ],
      },
      {
        label: 'Careers',
        href: '/careers',
        links: [
          { label: 'Current Openings', href: '/careers/openings' },
          { label: 'Life at Ujjivan', href: '/careers/life' },
          { label: 'Internships', href: '/careers/internships' },
          { label: 'Diversity & Inclusion', href: '/careers/diversity' },
        ],
      },
      {
        label: 'Media',
        href: '/media',
        links: [
          { label: 'Press Releases', href: '/media/press-releases' },
          { label: 'News Coverage', href: '/media/news' },
          { label: 'Brand Guidelines', href: '/media/brand' },
          { label: 'Media Kit', href: '/media/media-kit' },
        ],
      },
      {
        label: 'Rates & Charges',
        href: '/rates',
        links: [
          { label: 'Interest Rates', href: '/rates/interest' },
          { label: 'FD Interest Rates', href: '/rates/fd' },
          { label: 'Loan Interest Rates', href: '/rates/loans' },
          { label: 'Service Charges', href: '/rates/charges' },
          { label: 'E-banking Charges', href: '/rates/ebanking' },
        ],
      },
      {
        label: 'Calculator',
        href: '/calculators',
        links: [
          { label: 'FD Calculator', href: '/calculators/fd' },
          { label: 'SIP Calculator', href: '/calculators/sip' },
          { label: 'Home Loan EMI', href: '/calculators/home-loan-emi' },
          { label: 'Personal Loan EMI', href: '/calculators/personal-loan-emi' },
          { label: 'Premium Calculator', href: '/calculators/premium' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        label: 'Miscellaneous',
        href: '/miscellaneous',
        links: [
          { label: 'Financial Literacy', href: '/financial-literacy' },
          { label: 'Scam Alert', href: '/scam-alert' },
          { label: 'Notifications', href: '/notifications' },
          { label: 'Rewardz', href: '/rewardz' },
        ],
      },
      {
        label: 'Customer Care Support',
        href: '/contact',
        links: [
          { label: 'Contact Us', href: '/contact' },
          { label: 'FAQs', href: '/faq' },
          { label: 'Track Application Status', href: '/loans/track' },
          { label: 'Feedback', href: '/feedback' },
        ],
      },
      {
        label: 'Forms & Agreements',
        href: '/forms',
        links: [
          { label: 'Account Opening', href: '/forms/account-opening' },
          { label: 'Nomination Forms', href: '/forms/nomination' },
          { label: 'KYC Forms', href: '/forms/kyc' },
          { label: 'Terms & Conditions', href: '/forms/terms' },
        ],
      },
      {
        label: 'Sustainability',
        href: '/sustainability',
        links: [
          { label: 'ESG Framework', href: '/sustainability/esg' },
          { label: 'Green Initiatives', href: '/sustainability/green-initiatives' },
          { label: 'CSR Impact', href: '/sustainability/csr-impact' },
          { label: 'Sustainability Reports', href: '/sustainability/reports' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        label: 'Apply Now',
        href: '/apply',
        links: [
          { label: 'Savings Account', href: '/apply/savings-account' },
          { label: 'Fixed Deposit', href: '/apply/fixed-deposit' },
          { label: 'Current Account', href: '/apply/current-account' },
          { label: 'Personal Loan', href: '/apply/personal-loan' },
          { label: 'Home Loan', href: '/apply/home-loan' },
        ],
      },
      {
        label: 'API Banking',
        href: '/api-banking',
        links: [
          { label: 'API Suite', href: '/api-banking/suite' },
          { label: 'Developer Documentation', href: '/api-banking/docs' },
          { label: 'Sandbox Access', href: '/api-banking/sandbox' },
          { label: 'Partner Programme', href: '/api-banking/partners' },
        ],
      },
      {
        label: 'Banking Blogs',
        href: '/blogs',
        links: [
          { label: 'Savings & Deposits', href: '/blogs/savings' },
          { label: 'Personal Finance', href: '/blogs/personal-finance' },
          { label: 'Loans & Credit', href: '/blogs/loans' },
          { label: 'Digital Banking', href: '/blogs/digital' },
        ],
      },
      {
        label: 'Locate Us',
        href: '/branch-locator',
        links: [
          { label: 'Branch Locator', href: '/branch-locator' },
          { label: 'ATM Locator', href: '/atm-locator' },
          { label: 'Cash Recycler Locator', href: '/cash-recyclers' },
          { label: 'Digital Banking Points', href: '/digital-banking-points' },
        ],
      },
    ],
  },
];

// ─── Branch / ATM locator picker ─────────────────────────────────────────────

export const LOCATOR_OPTIONS = [
  { label: 'Branch Locator', href: '/branch-locator' },
  { label: 'ATM Locator', href: '/atm-locator' },
  { label: 'Cash Recycler Locator', href: '/cash-recyclers' },
  { label: 'Digital Banking Points', href: '/digital-banking-points' },
] as const;

// ─── Social links ────────────────────────────────────────────────────────────

export const FOOTER_SOCIAL = [
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/UjjivanSmallFinanceBank' },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/ujjivansmallfinancebank',
  },
  { key: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/9002082121' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ujjivan-small-finance-bank',
  },
  { key: 'x', label: 'X', href: 'https://twitter.com/UjjivanBank' },
] as const;

export const FOOTER_SOCIAL_ICONS: Record<string, string> = {
  facebook: '/images/social/icon-facebook.png',
  instagram: '/images/social/icon-instagram.png',
  whatsapp: '/images/social/icon-whatsapp.png',
  linkedin: '/images/social/icon-linkedin.png',
  x: '/images/social/icon-x.png',
};

// ─── Legal bar ───────────────────────────────────────────────────────────────

export const FRAUD_REPORT = {
  label: 'Report a Fraud',
  href: 'https://cybercrime.gov.in',
} as const;

export const COPYRIGHT_TEXT = 'Ujjivan Small Finance Bank Ltd. CIN NO: L65110KA2016PLC142162';

export const SITEMAP_LINK = { label: 'Sitemap', href: '/sitemap' } as const;
