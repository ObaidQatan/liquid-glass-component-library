import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Command } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
}

interface LiquidGlassCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

export function LiquidGlassCommandPalette({
  isOpen,
  onClose,
  items,
  placeholder = "Type a command or search...",
}: LiquidGlassCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.category?.toLowerCase().includes(q)
    );
  }, [query, items]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const cat = item.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          item.onSelect?.();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, onClose]);

  let globalIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 glass-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-blur-xl glass-surface glass-border glass-highlight-strong"
          >
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search size={18} className="text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-white/30 text-xs">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-white/30">
                  No results found
                </div>
              ) : (
                Array.from(grouped.entries()).map(([category, catItems]) => (
                  <div key={category}>
                    <div className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/25">
                      {category}
                    </div>
                    {catItems.map((item) => {
                      const idx = globalIndex++;
                      const isSelected = idx === selectedIndex;
                      return (
                        <motion.button
                          key={item.id}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          onClick={() => {
                            item.onSelect?.();
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors",
                            isSelected
                              ? "bg-white/10"
                              : "hover:bg-white/5"
                          )}
                        >
                          {item.icon && (
                            <span className="text-white/40">{item.icon}</span>
                          )}
                          <span className="flex-1 text-sm text-white/80">
                            {item.label}
                          </span>
                          {item.shortcut && (
                            <span className="text-xs text-white/30 px-1.5 py-0.5 rounded bg-white/5">
                              {item.shortcut}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
