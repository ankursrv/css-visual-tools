/**
 * Global loading UI — shown while a page segment is loading.
 * Displayed automatically by Next.js Suspense boundary.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="flex flex-1 items-center justify-center py-24"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
