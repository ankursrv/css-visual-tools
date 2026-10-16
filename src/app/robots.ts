import type { MetadataRoute } from 'next';

/**
 * Programmatic robots.txt generation.
 * Next.js automatically serves this at /robots.txt.
 * Update the sitemap URL to match your production domain.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow authenticated/private routes from being indexed
        disallow: ['/api/', '/dashboard/', '/accounts/', '/transactions/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
