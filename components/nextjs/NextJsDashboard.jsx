"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NEXT_TOPICS } from "@/data/nextjsTopics";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {name}
    </span>
  );
}

// Dark code block with a one-click copy button.
function CodeBlock({ s }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — fail silently */
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-primary-container shadow-lg shadow-primary/10 ring-1 ring-primary/20 group/code">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/70" />
          </span>
          {s.title && (
            <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider ml-1">
              {s.title}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-colors ${
            copied
              ? "bg-secondary text-on-secondary"
              : "text-primary-fixed hover:bg-white/10"
          }`}
        >
          <Icon
            name={copied ? "check" : "content_copy"}
            className="text-[16px]"
          />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto scroll-thin text-[13px] leading-relaxed text-primary-fixed font-mono whitespace-pre">
        {s.code}
      </pre>
    </div>
  );
}

// Renders one section from the structured data in data/nextjsTopics.js.
function Section({ s }) {
  return (
    <div className="mb-9">
      {s.heading && (
        <h3 className="flex items-center gap-2.5 font-headline-sm text-headline-sm font-bold text-primary mb-3.5">
          <span className="w-1 h-5 rounded-full bg-secondary shrink-0" />
          {s.heading}
        </h3>
      )}

      {s.type === "text" && (
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {s.text}
        </p>
      )}

      {s.type === "list" && (
        <ul
          className={`flex flex-col gap-2.5 ${
            s.ordered ? "list-decimal" : "list-none"
          } pl-6`}
        >
          {s.items.map((item, i) => (
            <li
              key={i}
              className={`font-body-md text-body-md text-on-surface-variant leading-relaxed ${
                s.ordered
                  ? "marker:text-secondary marker:font-bold"
                  : "before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary before:mr-2.5 before:-translate-y-[3px]"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {s.type === "code" && <CodeBlock s={s} />}

      {s.type === "table" && (
        <div className="rounded-xl overflow-hidden border border-surface-container shadow-sm overflow-x-auto scroll-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-primary-container">
                {s.head.map((h) => (
                  <th
                    key={h}
                    className="font-label-md text-label-md text-on-primary px-4 py-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors hover:bg-surface-container-low ${
                    i % 2 ? "bg-surface-container-lowest" : "bg-white"
                  }`}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 align-top ${
                        j === 0
                          ? "font-mono text-[13px] text-primary font-semibold whitespace-nowrap border-r border-surface-container"
                          : "font-body-sm text-body-sm text-on-surface-variant"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.type === "note" && (
        <div className="flex items-start gap-3 rounded-xl bg-secondary-container border-l-4 border-secondary p-4 shadow-sm">
          <Icon
            name="lightbulb"
            className="text-on-secondary-container text-[20px] shrink-0 mt-0.5"
          />
          <p className="font-body-md text-body-md text-on-secondary-container leading-relaxed">
            {s.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default function NextJsDashboard() {
  // Which topic is open — defaults to the first item in NEXT_TOPICS.
  const [activeId, setActiveId] = useState(NEXT_TOPICS[0].id);
  const active =
    NEXT_TOPICS.find((t) => t.id === activeId) ?? NEXT_TOPICS[0];
  const contentRef = useRef(null);

  // Topic badalte hi content ko start (top) se dikhao —
  // desktop pe panel ki apni scrollbar reset hoti hai, mobile pe page window ki.
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [activeId]);

  return (
    <div className="relative w-full mx-auto px-gutter py-6 lg:h-full lg:flex lg:flex-col lg:min-h-0">
      {/* Ambient glow orbs (same visual language as the landing page) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-fixed-dim/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-surface-container-high/50 blur-3xl pointer-events-none" />

      {/* Back to home */}
      <div className="relative z-10 mb-5 shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container shadow-sm text-on-surface-variant hover:text-on-surface hover:shadow-md hover:border-surface-container-high transition-all font-label-lg text-label-lg"
        >
          <Icon
            name="arrow_back"
            className="text-[18px] text-secondary"
          />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-stretch lg:flex-1 lg:min-h-0">
        {/* ==================== LEFT: topic list (full height, scrolls when long) ==================== */}
        <aside className="w-full lg:w-80 shrink-0 lg:h-full lg:min-h-0">
          <div className="h-full rounded-2xl bg-surface-container-lowest shadow-lg shadow-primary/5 border border-surface-container p-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden scroll-thin lg:overflow-y-auto">
            {/* Sidebar header */}
            <div className="hidden lg:flex items-center justify-between px-3 pt-2 pb-3 mb-1 border-b border-surface-container">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold">
                Topics
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold">
                {NEXT_TOPICS.length}
              </span>
            </div>

            {NEXT_TOPICS.map((topic) => {
              const isActive = topic.id === active.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveId(topic.id)}
                  aria-pressed={isActive}
                  className={`group relative flex items-center gap-3 w-full min-w-max lg:min-w-0 text-left pl-3 pr-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/25"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  {/* Active accent bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-secondary transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors ${
                      isActive
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container text-secondary group-hover:bg-surface-container-high"
                    }`}
                  >
                    <Icon name={topic.icon} className="text-[18px]" />
                  </span>
                  <span className="font-label-md text-label-md lg:font-label-lg lg:text-label-lg font-medium leading-snug">
                    {topic.label}
                  </span>
                </button>
              );
            })}

            {/* Footer hint */}
            <div className="hidden lg:flex items-center gap-2 mt-auto pt-3 px-3 border-t border-surface-container text-outline">
              <Icon name="tips_and_updates" className="text-[16px]" />
              <span className="font-body-sm text-body-sm">
                Topic chuno, explanation right side me
              </span>
            </div>
          </div>
        </aside>

        {/* ==================== RIGHT: active topic content (own scroll area) ==================== */}
        <section
          ref={contentRef}
          className="flex-1 w-full min-w-0 rounded-2xl bg-surface-container-lowest shadow-lg shadow-primary/5 border border-surface-container p-6 md:p-10 lg:h-full lg:min-h-0 lg:overflow-y-auto scroll-thin"
        >
          {/* key → topic switch par fade-up animation replay hoti hai */}
          <div key={active.id} className="animate-fade-up max-w-4xl">
            <div className="flex items-center gap-3 mb-4 pb-5 border-b border-surface-container">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container shrink-0">
                <Icon name={active.icon} className="text-[24px]" />
              </span>
              <div className="min-w-0">
                {active.tagline && (
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                    {active.tagline}
                  </span>
                )}
                <h2 className="font-headline-md text-headline-md font-bold text-primary leading-tight">
                  {active.title}
                </h2>
              </div>
            </div>
            {active.intro && (
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                {active.intro}
              </p>
            )}

            {active.sections.map((s, i) => (
              <Section key={i} s={s} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
