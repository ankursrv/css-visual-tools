import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

/**
 * 404 Not Found page — Server Component.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
