import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronRight,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Layers,
  Hash,
  Sparkles,
  SlidersHorizontal,
  Navigation2,
  LayoutGrid,
  BarChart3,
  Bell,
  Image,
  MoreVertical,
  LayoutTemplate,
  Command,
} from "lucide-react";
import { cn } from "./utils/cn";
import { docsComponents, docsCategories, type DocsComponentEntry } from "./docs-data";

const categoryIcons: Record<string, React.ElementType<{ size?: number; className?: string }>> = {
  "Theme & Glass Primitives": Sparkles,
  "Buttons & FABs": Command,
  "Inputs, Toggles & Pickers": SlidersHorizontal,
  Navigation: Navigation2,
  "Layout & Surfaces": LayoutGrid,
  "Data Display": BarChart3,
  "Feedback & Status": Bell,
  "Media & Content": Image,
  "Overlays, Menus & Tooltips": MoreVertical,
  "Modals, Drawers & Sheets": LayoutTemplate,
};

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelect: (component: DocsComponentEntry) => void;
}

export function SearchPalette({ open, onClose, onSelect }: SearchPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [] as DocsComponentEntry[];
    return docsComponents
      .map((c) => {
        const name = c.name.toLowerCase();
        const desc = c.description.toLowerCase();
        const cat = c.category.toLowerCase();
        const propMatch = c.props.some((p) => p.name.toLowerCase().includes(q));
        let score = 0;
        if (name === q) score += 100;
        else if (name.startsWith(q)) score += 80;
        else if (name.includes(q)) score += 60;
        if (desc.includes(q)) score += 30;
        if (cat.includes(q)) score += 25;
        if (propMatch) score += 15;
        return { component: c, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name))
      .map(({ component }) => component);
  }, [q]);

  const grouped = useMemo(() => {
    const map = new Map<string, DocsComponentEntry[]>();
    for (const c of results) {
      const list = map.get(c.category) || [];
      list.push(c);
      map.set(c.category, list);
    }
    return docsCategories
      .map((cat) => ({ category: cat, items: map.get(cat) || [] }))
      .filter((g) => g.items.length > 0);
  }, [results]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const flatCount = results.length;

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % Math.max(flatCount, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + Math.max(flatCount, 1)) % Math.max(flatCount, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          onSelect(selected);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, flatCount, onClose, onSelect, results, selectedIndex]);

  useEffect(() => {
    const el = listRef.current?.querySelector("[data-selected='true']") as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, open]);

  let globalIndex = -1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-2xl rounded-2xl glass-blur-xl glass-surface-strong glass-border glass-highlight-strong overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--lg-border)]">
              <Search size={18} className="text-[var(--lg-text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components, props, categories..."
                className="flex-1 bg-transparent text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex h-6 px-1.5 items-center rounded text-[10px] font-medium text-[var(--lg-text-muted)] bg-[var(--lg-border)] border border-[var(--lg-border-subtle)]">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="py-12 text-center">
                  {q ? (
                    <>
                      <p className="text-sm font-medium text-[var(--lg-text-secondary)]">No components found</p>
                      <p className="text-xs text-[var(--lg-text-muted)] mt-1">
                        Try a different keyword or prop name.
                      </p>
                    </>
                  ) : (
                    <>
                      <Search size={32} className="mx-auto text-[var(--lg-text-muted)] mb-3 opacity-50" />
                      <p className="text-sm font-medium text-[var(--lg-text-secondary)]">Start typing to search</p>
                      <p className="text-xs text-[var(--lg-text-muted)] mt-1">
                        Find components, props, and categories instantly.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {grouped.map(({ category, items }) => {
                    const Icon = categoryIcons[category] || Layers;
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)] sticky top-0 bg-[var(--lg-surface-strong)]/80 backdrop-blur-sm z-10">
                          <Icon size={12} />
                          {category}
                        </div>
                        {items.map((c) => {
                          globalIndex += 1;
                          const isSelected = globalIndex === selectedIndex;
                          return (
                            <button
                              key={c.id}
                              onClick={() => onSelect(c)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              data-selected={isSelected}
                              className={cn(
                                "w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors",
                                isSelected
                                  ? "bg-liquid-blue/15 text-[var(--lg-text)]"
                                  : "hover:bg-[var(--lg-border-subtle)] text-[var(--lg-text-secondary)]"
                              )}
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-medium truncate">
                                  <Highlight text={c.name} query={query} />
                                </div>
                                <div className="text-xs text-[var(--lg-text-muted)] truncate">
                                  <Highlight text={c.description} query={query} />
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[var(--lg-border-subtle)] text-[10px] font-medium text-[var(--lg-text-muted)]">
                                    <Hash size={10} className="mr-1" />
                                    {c.props.length} prop{c.props.length !== 1 ? "s" : ""}
                                  </span>
                                  {c.props.some((p) => p.name.toLowerCase().includes(q)) && q && (
                                    <span className="text-[10px] text-liquid-blue">prop match</span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight
                                size={14}
                                className={cn(
                                  "flex-shrink-0 transition-opacity",
                                  isSelected ? "opacity-100 text-[var(--lg-text)]" : "opacity-0"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--lg-border)] text-[10px] text-[var(--lg-text-muted)]">
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1">
                  <CornerDownLeft size={11} />
                  to select
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <ArrowUp size={11} />
                  <ArrowDown size={11} />
                  to navigate
                </span>
              </div>
              <span>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${safe})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-liquid-blue/25 text-[var(--lg-text)] rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
