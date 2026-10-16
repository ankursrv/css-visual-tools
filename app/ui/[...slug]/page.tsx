import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  return [
    { slug: ["nextjs", "components"] },
    { slug: ["nextjs", "templates"] },
    { slug: ["nextjs", "animations"] },
    { slug: ["html-css"] },
    { slug: ["tailwind"] },
  ];
}

export default async function UiSubmenuPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  // Determine section details based on path
  const isComponents = path.includes("components");
  const isTemplates = path.includes("templates");
  const isAnimations = path.includes("animations");
  const isHtmlCss = path.includes("html-css");
  const isTailwind = path.includes("tailwind");

  let title = "UI Showcase";
  let subtitle = "Explore modern responsive component blocks & interactive visual styles.";
  let badge = "Next.js UI Module";

  if (isComponents) {
    title = "Next.js UI Components";
    subtitle = "Interactive Buttons, Glassmorphic Cards, Badges, and Form Elements built for modern web applications.";
    badge = "Next.js • Components";
  } else if (isTemplates) {
    title = "Next.js Templates & Blocks";
    subtitle = "Pre-designed Hero Sections, Feature Cards, and Application Navigation patterns.";
    badge = "Next.js • Templates";
  } else if (isAnimations) {
    title = "Next.js Animation Presets";
    subtitle = "Smooth interactive micro-animations, glass pulses, and hover transitions.";
    badge = "Next.js • Animations";
  } else if (isHtmlCss) {
    title = "Pure HTML & CSS Effects";
    subtitle = "Modern CSS visual generators: Glassmorphism, Neumorphism, 3D Transforms, and Gradients.";
    badge = "HTML5 / CSS3";
  } else if (isTailwind) {
    title = "Tailwind CSS v4 Presets";
    subtitle = "High-efficiency utility classes, inline themes, and rapid layout configurations.";
    badge = "Tailwind CSS v4";
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      {/* Header Badge & Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>{badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Interactive Showcase Preview Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Interactive Buttons Showcase */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Live Element
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                &lt;Button /&gt;
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Glow & Gradient Actions
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Smooth hover micro-interactions with dynamic shadow diffusion.
            </p>
          </div>

          <div className="flex flex-col gap-3 py-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 shadow-md shadow-blue-500/25 transition-all duration-200"
            >
              Primary Action
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-98 transition-all duration-200 border border-zinc-200/80 dark:border-zinc-700/80"
            >
              Secondary Outline
            </button>
          </div>
        </div>

        {/* Card 2: Glassmorphism Card Showcase */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Visual Style
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                Backdrop-Blur
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Frosted Glass Panel
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Ultra-modern glassmorphism with dynamic light reflection borders.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/40 dark:bg-zinc-800/40 border border-white/60 dark:border-zinc-700/40 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-base font-bold shadow-md">
                ✦
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Glass Layer</p>
                <p className="text-[10px] text-zinc-500">blur-md • border-white/40</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Code Snippet Preview */}
        <div className="p-6 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-xl flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Clean Code
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Ready to Export
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Copy-pasteable Next.js & Tailwind markup.
            </p>
          </div>

          <pre className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
            <code>{`<div className="backdrop-blur-md
     border border-white/20
     shadow-xl rounded-2xl">
  <span>Modern UI</span>
</div>`}</code>
          </pre>
        </div>
      </div>

      {/* Navigation Return Link */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700"
        >
          <span>← Back to Home</span>
        </Link>
        <Link
          href="/grid-generator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
        >
          <span>Open Grid Generator →</span>
        </Link>
      </div>
    </div>
  );
}
