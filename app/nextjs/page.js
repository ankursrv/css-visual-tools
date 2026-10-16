import NextJsDashboard from "@/components/nextjs/NextJsDashboard";

export const metadata = {
  title: "Next.js Notes — Learning Dashboard",
  description:
    "Interactive study dashboard: App Router, routing conventions aur Next.js concepts, ek-ek topic karke.",
};

// Server Component page shell — the interactive sidebar/content switching
// lives inside the client boundary of <NextJsDashboard />.
export default function NextJsPage() {
  return (
    <main className="w-full min-h-dvh bg-surface lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <NextJsDashboard />
    </main>
  );
}
