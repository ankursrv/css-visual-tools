import Link from "next/link";

interface ToolPageProps {
  params: Promise<{
    tool: string;
  }>;
}

export function generateStaticParams() {
  return [
    { tool: "grid-generator" },
  ];
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params;

  // Format tool slug into readable title (e.g. "grid-generator" -> "Grid Generator")
  const formattedTitle = tool
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container py-16 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4">
      <div className="max-w-xl w-full p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl shadow-zinc-950/5 flex flex-col items-center">
        {/* Tool Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>CSS Visual Tool • Route Active</span>
        </div>

        {/* Dynamic Tool Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          {formattedTitle}
        </h1>

        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
          Header navigation successfully connected to <code className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 font-mono text-sm text-blue-600 dark:text-blue-400">/{tool}</code>.
        </p>

        {/* Feature Connection Status Card */}
        <div className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/80 mb-8 text-left text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Seamless Multi-Branch Integration</span>
          </div>
          <p className="pl-6 text-[13px] text-zinc-500 leading-normal">
            Jab aap is <span className="font-semibold text-zinc-700 dark:text-zinc-300">header</span> branch ko tool branch (jaise <code className="text-blue-600 dark:text-blue-400">grid-generate</code>) ke sath merge karenge, toh actual interactive generator page bina kisi conflict ke yahan render hoga.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/25"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
