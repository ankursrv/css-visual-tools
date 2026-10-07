"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Columns,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Undo2,
  Trash2,
  MousePointer,
  Sparkles,
  Wand2,
} from 'lucide-react';

export interface GridCellItem {
  id: string;
  name: string;
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  color: string;
  height?: string; // Particular item height: e.g. '225px'
}

export interface LayoutState {
  columns: number;
  rows: number;
  gapMode: 'uniform' | 'split';
  overallGap: number;
  xGap: number;
  yGap: number;
  layoutMode: 'standard' | 'masonry';
  items: GridCellItem[];
  selectedItemId: string | null;
}

const PRESET_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#a855f7', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#84cc16', // lime
  '#f97316', // orange
  '#d946ef', // fuchsia
  '#14b8a6', // teal
  '#eab308', // yellow
];

const GAP_OPTIONS = [0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64];

// Pristine default layout state
const DEFAULT_LAYOUT: LayoutState = {
  columns: 3,
  rows: 2,
  gapMode: 'uniform',
  overallGap: 16,
  xGap: 16,
  yGap: 16,
  layoutMode: 'standard',
  items: [
    {
      id: 'item-1',
      name: 'Item 1',
      colStart: 1,
      colEnd: 2,
      rowStart: 1,
      rowEnd: 2,
      color: '#3b82f6',
      height: undefined,
    },
    {
      id: 'item-2',
      name: 'Item 2',
      colStart: 2,
      colEnd: 3,
      rowStart: 1,
      rowEnd: 2,
      color: '#10b981',
      height: undefined,
    },
    {
      id: 'item-3',
      name: 'Item 3',
      colStart: 3,
      colEnd: 4,
      rowStart: 1,
      rowEnd: 2,
      color: '#f59e0b',
      height: undefined,
    },
    {
      id: 'item-4',
      name: 'Item 4',
      colStart: 1,
      colEnd: 2,
      rowStart: 2,
      rowEnd: 3,
      color: '#a855f7',
      height: undefined,
    },
    {
      id: 'item-5',
      name: 'Item 5',
      colStart: 2,
      colEnd: 3,
      rowStart: 2,
      rowEnd: 3,
      color: '#ec4899',
      height: undefined,
    },
    {
      id: 'item-6',
      name: 'Item 6',
      colStart: 3,
      colEnd: 4,
      rowStart: 2,
      rowEnd: 3,
      color: '#06b6d4',
      height: undefined,
    },
  ],
  selectedItemId: 'item-1',
};

export default function App() {
  const [layout, setLayout] = useState<LayoutState>(DEFAULT_LAYOUT);

  // Undo History Stack
  const [history, setHistory] = useState<LayoutState[]>([]);

  // Selection & UI state
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'html' | 'tailwind'>('css');
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Update layout with history tracking
  const updateLayout = useCallback(
    (updater: (prev: LayoutState) => LayoutState, recordHistory = true) => {
      setLayout((curr) => {
        const next = updater(curr);
        if (recordHistory) {
          setHistory((h) => [...h.slice(-30), curr]);
        }
        return next;
      });
    },
    []
  );

  // Undo action
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, h.length - 1));
    setLayout(prev);
    showToast('Undone!');
  }, [history, showToast]);

  // Reset action: restores layout to pristine default, saves previous to history
  const handleReset = useCallback(() => {
    setHistory((h) => [...h, layout]);
    setLayout(JSON.parse(JSON.stringify(DEFAULT_LAYOUT)));
    showToast('Layout reset. Click Undo to restore.');
  }, [layout, showToast]);

  // Keyboard shortcut (Ctrl+Z / Cmd+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo]);

  // Effective Gaps
  const effectiveXGap = layout.gapMode === 'uniform' ? layout.overallGap : layout.xGap;
  const effectiveYGap = layout.gapMode === 'uniform' ? layout.overallGap : layout.yGap;

  // Active Selected Item
  const selectedItem = layout.items.find((it) => it.id === layout.selectedItemId);

  // Cell Click (select existing item or create new item)
  const handleCellClick = (r: number, c: number) => {
    const existing = layout.items.find(
      (it) => r >= it.rowStart && r < it.rowEnd && c >= it.colStart && c < it.colEnd
    );

    if (existing) {
      updateLayout((prev) => ({ ...prev, selectedItemId: existing.id }), false);
    } else {
      const nextIndex = layout.items.length + 1;
      const color = PRESET_COLORS[(nextIndex - 1) % PRESET_COLORS.length];
      const newItem: GridCellItem = {
        id: `item-${Date.now()}`,
        name: `Item ${nextIndex}`,
        colStart: c,
        colEnd: c + 1,
        rowStart: r,
        rowEnd: r + 1,
        color,
        height: undefined,
      };
      updateLayout((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
        selectedItemId: newItem.id,
      }));
    }
  };

  // Set Particular Item Height (ONLY affects the selected item!)
  const handleSetItemHeight = (itemId: string, height: string | undefined) => {
    updateLayout((prev) => ({
      ...prev,
      items: prev.items.map((it) => {
        if (it.id !== itemId) return it;
        return {
          ...it,
          height: height || undefined,
        };
      }),
    }));
  };

  const handleAddAutoItem = () => {
    const newId = `item-${layout.items.length + 1}`;
    const colorClasses = [
      '#4f46e5', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0ea5e9',
    ];
    const color = colorClasses[layout.items.length % colorClasses.length];
    
    updateLayout((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: newId,
          name: `Item ${prev.items.length + 1}`,
          colStart: 1,
          colEnd: 2,
          rowStart: 1,
          rowEnd: 2,
          color,
        },
      ],
      selectedItemId: newId,
    }));
  };

  // Delete Item
  const handleDeleteItem = (itemId: string) => {
    updateLayout((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== itemId),
      selectedItemId: prev.selectedItemId === itemId ? null : prev.selectedItemId,
    }));
  };

  // Column Buckets for Compact Masonry flow mode
  const columnBuckets = useMemo(() => {
    const buckets: Record<number, GridCellItem[]> = {};
    for (let c = 1; c <= layout.columns; c++) {
      buckets[c] = [];
    }
    layout.items.forEach((it) => {
      const col = it.colStart;
      if (buckets[col]) {
        buckets[col].push(it);
      } else {
        buckets[1].push(it);
      }
    });
    for (let c = 1; c <= layout.columns; c++) {
      buckets[c].sort((a, b) => a.rowStart - b.rowStart);
    }
    return buckets;
  }, [layout.columns, layout.items]);

  // Generated CSS
  const generatedCSS = useMemo(() => {
    if (layout.layoutMode === 'masonry') {
      let css = `/* Compact Masonry Grid (${effectiveYGap}px gap) */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${layout.columns}, 1fr);\n  column-gap: ${effectiveXGap}px;\n  width: 100%;\n}\n\n.grid-col-stack {\n  display: flex;\n  flex-direction: column;\n  row-gap: ${effectiveYGap}px;\n}\n\n`;
      layout.items.forEach((item) => {
        const cls = item.name.toLowerCase().replace(/\s+/g, '-');
        css += `.${cls} {\n`;
        if (item.height) {
          css += `  height: ${item.height};\n`;
        }
        css += `}\n`;
      });
      return css;
    }

    let css = `/* Generated CSS Grid Layout */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${layout.columns}, 1fr);\n  grid-template-rows: repeat(${layout.rows}, auto);\n`;

    if (layout.gapMode === 'uniform') {
      css += `  gap: ${layout.overallGap}px;\n`;
    } else {
      css += `  column-gap: ${layout.xGap}px; /* X-Gap */\n  row-gap: ${layout.yGap}px;    /* Y-Gap */\n`;
    }

    css += `  width: 100%;\n}\n`;

    if (layout.items.length > 0) {
      css += `\n/* Grid Items */\n`;
      layout.items.forEach((item) => {
        const cls = item.name.toLowerCase().replace(/\s+/g, '-');
        css += `.${cls} {\n`;
        css += `  grid-column: span ${item.colEnd - item.colStart};\n`;
        css += `  grid-row: span ${item.rowEnd - item.rowStart};\n`;
        if (item.height) {
          css += `  height: ${item.height}; /* Individual item height */\n`;
        }
        css += `}\n`;
      });
    }

    return css;
  }, [layout, effectiveXGap, effectiveYGap]);

  // Generated HTML
  const generatedHTML = useMemo(() => {
    if (layout.layoutMode === 'masonry') {
      let html = `<div class="grid-container">\n`;
      for (let c = 1; c <= layout.columns; c++) {
        html += `  <!-- Column ${c} -->\n  <div class="grid-col-stack">\n`;
        (columnBuckets[c] || []).forEach((item) => {
          const cls = item.name.toLowerCase().replace(/\s+/g, '-');
          html += `    <div class="${cls}">${item.name}</div>\n`;
        });
        html += `  </div>\n`;
      }
      html += `</div>`;
      return html;
    }

    let html = `<div class="grid-container">\n`;
    layout.items.forEach((item) => {
      const cls = item.name.toLowerCase().replace(/\s+/g, '-');
      html += `  <div class="${cls}">${item.name}</div>\n`;
    });
    html += `</div>`;
    return html;
  }, [layout, columnBuckets]);

  // Generated Tailwind
  const generatedTailwind = useMemo(() => {
    const gapClass =
      layout.gapMode === 'uniform'
        ? `gap-[${layout.overallGap}px]`
        : `gap-x-[${layout.xGap}px] gap-y-[${layout.yGap}px]`;

    if (layout.layoutMode === 'masonry') {
      let tw = `<!-- Tailwind CSS Compact Masonry -->\n<div className="grid grid-cols-${layout.columns} gap-x-[${effectiveXGap}px] w-full">\n`;
      for (let c = 1; c <= layout.columns; c++) {
        tw += `  <div className="flex flex-col gap-y-[${effectiveYGap}px]">\n`;
        (columnBuckets[c] || []).forEach((item) => {
          tw += `    <div className="p-4 rounded-xl bg-zinc-800 text-white${item.height ? ` h-[${item.height}]` : ''}">\n      ${item.name}\n    </div>\n`;
        });
        tw += `  </div>\n`;
      }
      tw += `</div>`;
      return tw;
    }

    let tw = `<!-- Tailwind CSS Grid -->\n<div className="grid grid-cols-${layout.columns} ${gapClass} w-full">\n`;

    layout.items.forEach((item) => {
      const colSpan = item.colEnd - item.colStart;
      const rowSpan = item.rowEnd - item.rowStart;
      let classes = `col-span-${colSpan} row-span-${rowSpan}`;
      if (item.height) {
        classes += ` h-[${item.height}]`;
      }

      tw += `  <div className="${classes} p-4 rounded-xl bg-zinc-800 text-white shadow">\n    ${item.name}\n  </div>\n`;
    });

    tw += `</div>`;
    return tw;
  }, [layout, effectiveXGap, effectiveYGap, columnBuckets]);

  const copyToClipboard = () => {
    const textToCopy =
      activeCodeTab === 'css'
        ? generatedCSS
        : activeCodeTab === 'html'
          ? generatedHTML
          : generatedTailwind;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 font-sans antialiased select-none overflow-hidden flex-1">
      {/* 1. TOP HEADER */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/90 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
              Grid Generator
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {layout.layoutMode === 'masonry' ? 'Compact Masonry' : 'Standard Grid'}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* UNDO BUTTON */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${history.length > 0
              ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border-zinc-700 cursor-pointer shadow-sm'
              : 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
              }`}
            title="Undo last change (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
            {history.length > 0 && (
              <span className="text-[10px] font-mono bg-zinc-700 px-1 rounded text-zinc-300">
                {history.length}
              </span>
            )}
          </button>

          {/* RESET BUTTON (Clean neutral button, fresh layout reset) */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors border border-zinc-700 cursor-pointer shadow-sm"
            title="Reset layout to default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Reset</span>
          </button>

          <div className="w-px h-5 bg-zinc-800 mx-1 hidden sm:block" />

          {/* COPY CSS BUTTON */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT COLUMN: Controls Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 border-r border-zinc-800 bg-zinc-900/60 flex flex-col h-auto lg:h-full overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* SECTION 1: Columns & Rows Dropdowns */}
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2 mb-3.5">
              <Columns className="w-3.5 h-3.5 text-emerald-400" />
              Columns &amp; Rows
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Columns Dropdown */}
              <div>
                <div className="text-[12px] mb-1.5">
                  <label htmlFor="col-select" className="text-zinc-300 font-medium">
                    Cols
                  </label>
                </div>
                <select
                  id="col-select"
                  value={layout.columns}
                  onChange={(e) => {
                    const newCols = parseInt(e.target.value, 10);
                    updateLayout((prev) => {
                      let updatedItems = [...prev.items];

                      // Clamp existing items to stay within new column bounds
                      updatedItems = updatedItems.map((item) => {
                        let colStart = item.colStart;
                        let colEnd = item.colEnd;
                        const span = Math.min(item.colEnd - item.colStart, newCols);
                        if (colStart > newCols) {
                          colStart = ((colStart - 1) % newCols) + 1;
                        }
                        colEnd = Math.min(colStart + span, newCols + 1);
                        if (colEnd <= colStart) colEnd = colStart + 1;
                        return { ...item, colStart, colEnd };
                      });

                      // Automatically add items if items count is less than newCols
                      if (updatedItems.length < newCols) {
                        for (let i = updatedItems.length + 1; i <= newCols; i++) {
                          const colPos = ((i - 1) % newCols) + 1;
                          const rowPos = Math.floor((i - 1) / newCols) + 1;
                          const color = PRESET_COLORS[(i - 1) % PRESET_COLORS.length];
                          updatedItems.push({
                            id: `item-${Date.now()}-${i}`,
                            name: `Item ${i}`,
                            colStart: colPos,
                            colEnd: colPos + 1,
                            rowStart: rowPos,
                            rowEnd: rowPos + 1,
                            color,
                            height: undefined,
                          });
                        }
                      }

                      return {
                        ...prev,
                        columns: newCols,
                        items: updatedItems,
                      };
                    });
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/70 focus:border-emerald-500 rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-100 transition-colors cursor-pointer outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={`col-${n}`} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rows Dropdown */}
              <div>
                <div className="text-[12px] mb-1.5">
                  <label htmlFor="row-select" className="text-zinc-300 font-medium">
                    Rows
                  </label>
                </div>
                <select
                  id="row-select"
                  value={layout.rows}
                  onChange={(e) =>
                    updateLayout((prev) => ({ ...prev, rows: parseInt(e.target.value, 10) }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/70 focus:border-emerald-500 rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-100 transition-colors cursor-pointer outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={`row-${n}`} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: 3 Gap Controls (Clean Simple Select Boxes) */}
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2 mb-3.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Gap Controls
            </h2>

            <div className="grid grid-cols-3 gap-2">
              {/* 1. Gap Dropdown (Uniform / All Grid) */}
              <div>
                <div className="text-[12px] mb-1.5">
                  <label htmlFor="gap-select" className="text-zinc-300 font-medium">
                    All
                  </label>
                </div>
                <select
                  id="gap-select"
                  value={layout.gapMode === 'uniform' ? layout.overallGap : ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    updateLayout((prev) => ({
                      ...prev,
                      gapMode: 'uniform',
                      overallGap: val,
                      xGap: val,
                      yGap: val,
                    }));
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/70 focus:border-emerald-500 rounded-lg px-1.5 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors cursor-pointer outline-none"
                >
                  {layout.gapMode !== 'uniform' && (
                    <option value="" disabled>Split</option>
                  )}
                  {GAP_OPTIONS.map((g) => (
                    <option key={`gap-opt-${g}`} value={g}>
                      {g}px
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Gap-X Dropdown (Column Gap) */}
              <div>
                <div className="text-[12px] mb-1.5">
                  <label htmlFor="gap-x-select" className="text-zinc-300 font-medium">
                    X-Gap
                  </label>
                </div>
                <select
                  id="gap-x-select"
                  value={layout.xGap}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    updateLayout((prev) => ({
                      ...prev,
                      gapMode: 'split',
                      xGap: val,
                    }));
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700 hover:border-sky-500/70 focus:border-sky-500 rounded-lg px-1.5 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors cursor-pointer outline-none"
                >
                  {GAP_OPTIONS.map((g) => (
                    <option key={`gap-x-opt-${g}`} value={g}>
                      {g}px
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Gap-Y Dropdown (Row Gap) */}
              <div>
                <div className="text-[12px] mb-1.5">
                  <label htmlFor="gap-y-select" className="text-zinc-300 font-medium">
                    Y-Gap
                  </label>
                </div>
                <select
                  id="gap-y-select"
                  value={layout.yGap}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    updateLayout((prev) => ({
                      ...prev,
                      gapMode: 'split',
                      yGap: val,
                    }));
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700 hover:border-amber-500/70 focus:border-amber-500 rounded-lg px-1.5 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors cursor-pointer outline-none"
                >
                  {GAP_OPTIONS.map((g) => (
                    <option key={`gap-y-opt-${g}`} value={g}>
                      {g}px
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add New Item Button */}
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 shadow-sm flex justify-center">
            <button
              type="button"
              onClick={handleAddAutoItem}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              + Add New Item
            </button>
          </div>

          {/* SECTION 3: PARTICULAR ITEM CONTROL */}
          {selectedItem ? (
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-4 shadow-md animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shadow"
                    style={{ backgroundColor: selectedItem.color }}
                  />
                  <h3 className="text-xs font-bold text-white">
                    {selectedItem.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(selectedItem.id)}
                  className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                  title="Remove this item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Individual Item Height */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">
                    Item Height
                  </span>
                  <span className="font-mono text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
                    {selectedItem.height || 'Auto'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  Applies only to <strong className="text-zinc-200">{selectedItem.name}</strong>.
                </p>

                {/* Custom Item Height Input */}
                <div className="pt-2">
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1.5">
                    Custom Height
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedItem.height || ''}
                      onChange={(e) => handleSetItemHeight(selectedItem.id, e.target.value)}
                      placeholder="e.g. 200px or 10rem"
                      className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/50 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none transition-colors"
                    />
                    {selectedItem.height && (
                      <button
                        type="button"
                        onClick={() => handleSetItemHeight(selectedItem.id, undefined)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-zinc-800 text-zinc-300 hover:text-white px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        Reset to Auto
                      </button>
                    )}
                  </div>
                </div>

                {/* Column and Row Span Controls */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/50 mt-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1.5">
                      Col Span (Width)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={layout.columns}
                      value={selectedItem.colEnd - selectedItem.colStart}
                      onChange={(e) => {
                        const span = parseInt(e.target.value, 10) || 1;
                        updateLayout(prev => ({
                          ...prev,
                          items: prev.items.map(it => 
                            it.id === selectedItem.id 
                              ? { ...it, colEnd: it.colStart + span } 
                              : it
                          )
                        }));
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/50 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1.5">
                      Row Span (Height)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={layout.rows}
                      value={selectedItem.rowEnd - selectedItem.rowStart}
                      onChange={(e) => {
                        const span = parseInt(e.target.value, 10) || 1;
                        updateLayout(prev => ({
                          ...prev,
                          items: prev.items.map(it => 
                            it.id === selectedItem.id 
                              ? { ...it, rowEnd: it.rowStart + span } 
                              : it
                          )
                        }));
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 hover:border-emerald-500/50 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-dashed border-zinc-800 text-center space-y-2">
              <MousePointer className="w-5 h-5 text-emerald-400 mx-auto" />
              <p className="text-xs font-medium text-zinc-300">Select an item</p>
              <p className="text-[11px] text-zinc-500">
                Click any item in the grid to customize its individual height.
              </p>
            </div>
          )}
        </aside>

        {/* CENTER COLUMN: Live Grid Preview */}
        <main className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden relative">
          {/* Top Status Bar of Preview */}
          <div className="p-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-zinc-300">Live Grid Preview</span>
              <span className="text-zinc-600">|</span>
              <span className="font-mono text-emerald-400 font-bold">
                {layout.columns} Columns &times; {layout.rows} Rows
              </span>
              <span className="text-zinc-600">|</span>
              <span className="font-mono text-zinc-400">
                {layout.gapMode === 'uniform'
                  ? `Gap: ${layout.overallGap}px`
                  : `X-Gap: ${layout.xGap}px, Y-Gap: ${layout.yGap}px`}
              </span>
            </div>

            {/* Mode Switcher: Compact Masonry / Standard Grid */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  updateLayout((prev) => ({
                    ...prev,
                    layoutMode: prev.layoutMode === 'standard' ? 'masonry' : 'standard',
                  }))
                }
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${layout.layoutMode === 'masonry'
                  ? 'bg-emerald-600 border-emerald-500 text-white font-semibold'
                  : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                  }`}
                title="Toggle between Standard Grid and Compact Masonry"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{layout.layoutMode === 'masonry' ? 'Compact Masonry' : 'Standard Grid'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Grid Canvas */}
          <div
            className="flex-1 overflow-auto p-6 sm:p-10 flex items-center justify-center bg-zinc-950"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          >
            {/* RENDER MODE A: COMPACT MASONRY */}
            {layout.layoutMode === 'masonry' ? (
              <div
                className="w-full max-w-4xl rounded-2xl border-2 border-emerald-500/60 bg-zinc-900/50 p-5 transition-all shadow-2xl relative"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                  columnGap: `${effectiveXGap}px`,
                  minHeight: '280px',
                  width: '100%',
                }}
              >
                {Array.from({ length: layout.columns }).map((_, cIdx) => {
                  const colNumber = cIdx + 1;
                  const colItems = columnBuckets[colNumber] || [];

                  return (
                    <div
                      key={`masonry-col-${colNumber}`}
                      className="flex flex-col"
                      style={{ rowGap: `${effectiveYGap}px` }}
                    >
                      {colItems.map((item) => {
                        const isSelected = layout.selectedItemId === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateLayout((prev) => ({ ...prev, selectedItemId: item.id }), false);
                            }}
                            style={{
                              backgroundColor: `${item.color}25`,
                              borderColor: isSelected ? '#ffffff' : item.color,
                              height: item.height || 'auto',
                              minHeight: item.height ? undefined : '110px',
                              boxShadow: isSelected
                                ? `0 0 0 2px ${item.color}, 0 10px 25px -5px rgba(0, 0, 0, 0.5)`
                                : undefined,
                            }}
                            className={`
                              rounded-xl border-2 p-4 flex flex-col justify-between transition-all cursor-pointer backdrop-blur-sm
                              ${isSelected ? 'ring-2 ring-white/50' : 'hover:scale-[1.01]'}
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className="w-3 h-3 rounded-full shrink-0 shadow"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="font-bold text-sm text-white truncate drop-shadow">
                                  {item.name}
                                </span>
                              </div>
                              {item.height && (
                                <span className="text-[10px] font-mono bg-zinc-900/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold shadow">
                                  H: {item.height}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* RENDER MODE B: STANDARD CSS GRID */
              <div
                className="w-full max-w-4xl rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 p-5 transition-all shadow-2xl relative"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${layout.rows}, minmax(110px, auto))`,
                  columnGap: `${effectiveXGap}px`,
                  rowGap: `${effectiveYGap}px`,
                  width: '100%',
                }}
              >
                {/* Background Matrix Slots (removed for auto-flow) */}

                {/* Placed Grid Items */}
                {layout.items.map((item) => {
                  const isSelected = layout.selectedItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateLayout((prev) => ({ ...prev, selectedItemId: item.id }), false);
                      }}
                      style={{
                        gridColumn: `span ${item.colEnd - item.colStart}`,
                        gridRow: `span ${item.rowEnd - item.rowStart}`,
                        backgroundColor: `${item.color}25`,
                        borderColor: isSelected ? '#ffffff' : item.color,
                        boxShadow: isSelected
                          ? `0 0 0 2px ${item.color}, 0 10px 25px -5px rgba(0, 0, 0, 0.5)`
                          : undefined,
                        height: item.height || 'auto',
                        minHeight: item.height ? undefined : '110px',
                      }}
                      className={`
                        z-20 rounded-xl border-2 p-4 flex flex-col justify-between transition-all cursor-pointer backdrop-blur-sm
                        ${isSelected ? 'ring-2 ring-white/50' : 'hover:scale-[1.01]'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-bold text-sm text-white truncate drop-shadow">
                            {item.name}
                          </span>
                        </div>

                        {item.height && (
                          <span className="text-[10px] font-mono bg-zinc-900/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold shadow">
                            H: {item.height}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: Generated Code Output */}
        <section className="w-full lg:w-96 shrink-0 border-l border-zinc-800 bg-zinc-950 flex flex-col h-auto lg:h-full">
          {/* Code Tab Switcher */}
          <div className="flex border-b border-zinc-800 bg-zinc-900/60 shrink-0">
            {(['css', 'html', 'tailwind'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCodeTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold capitalize transition-colors border-b-2 cursor-pointer ${activeCodeTab === tab
                  ? 'border-emerald-500 text-emerald-400 bg-zinc-900/80'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                  }`}
              >
                {tab === 'css' ? 'CSS Code' : tab === 'html' ? 'HTML' : 'Tailwind'}
              </button>
            ))}
          </div>

          {/* Code Editor Preview */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-emerald-300 bg-zinc-950">
            <pre className="whitespace-pre-wrap leading-relaxed select-text">
              {activeCodeTab === 'css'
                ? generatedCSS
                : activeCodeTab === 'html'
                  ? generatedHTML
                  : generatedTailwind}
            </pre>
          </div>

          {/* Bottom Code Actions */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-zinc-400">
              {activeCodeTab.toUpperCase()} Output
            </span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </section>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-emerald-500/60 shadow-2xl backdrop-blur-md text-xs font-medium text-emerald-300 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

