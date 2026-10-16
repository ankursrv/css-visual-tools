'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary — catches unhandled errors in Server Components.
 * Must be a Client Component per Next.js requirements.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <div className="max-w-md">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600"
            aria-hidden="true"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-3 text-sm text-gray-600">
            An unexpected error occurred. Our team has been notified. Please try again or come
            back later.
          </p>

          {error.digest && (
            <p className="mt-2 font-mono text-xs text-gray-400">Error ID: {error.digest}</p>
          )}

          <div className="mt-8 flex justify-center gap-3">
            <Button variant="primary" onClick={reset}>
              Try again
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Go home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
