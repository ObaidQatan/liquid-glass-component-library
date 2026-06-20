import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { useGlassOverlayRootStyle, mergeRefs } from "./useLiquidMotion";

interface MenuItem {
  label: string;
  items: {
    label: string;
    shortcut?: string;
    disabled?: boolean;
    separator?: boolean;
    onClick?: () => void;
  }[];
}

interface LiquidGlassMenubarProps {
  menus: MenuItem[];
  className?: string;
}

export function LiquidGlassMenubar({ menus, className }: LiquidGlassMenubarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const overlayRef = useGlassOverlayRootStyle(activeIndex !== null);
  const barRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        barRef.current &&
        !barRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      setMenuPos(null);
      return;
    }
    const btn = triggerRefs.current[activeIndex];
    if (!btn) return;
    const update = () => {
      const rect = btn.getBoundingClientRect();
      setMenuPos({ left: rect.left, top: rect.bottom + 6 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex]);

  const dropdown = (
    <AnimatePresence>
      {activeIndex !== null && menuPos && (
        <motion.div
          ref={mergeRefs(dropdownRef, overlayRef)}
          initial={{ opacity: 0.2, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.1 }}
          style={{left: menuPos.left, top: menuPos.top}}
          className="fixed z-[100] min-w-[180px] rounded-xl overflow-hidden glass-blur-xl glass-surface glass-border glass-highlight"
        >
          {/* Top highlight */}
          <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />
          <div className="py-1">
            {menus[activeIndex]?.items.map((item, j) =>
              item.separator ? (
                <div key={`sep-${j}`} className="my-1 h-px bg-[var(--lg-border-subtle)] mx-2" />
              ) : (
                <button
                  key={j}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setActiveIndex(null);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors",
                    item.disabled
                      ? "text-[var(--lg-text-muted)] cursor-not-allowed"
                      : "text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)]"
                  )}
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[10px] text-[var(--lg-text-muted)] ml-4">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={barRef}
      className={cn(
        "inline-flex items-center gap-0.5 px-2 py-1.5 rounded-xl",
        "glass-blur-sm glass-surface glass-border",
        className
      )}
    >
      {menus.map((menu, i) => (
        <div key={i} className="relative">
          <motion.button
            ref={(el) => { triggerRefs.current[i] = el; }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              activeIndex === i
                ? "bg-[var(--lg-border)] text-[var(--lg-text)]"
                : "text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)]"
            )}
          >
            {menu.label}
          </motion.button>
        </div>
      ))}
      {createPortal(dropdown, document.body)}
    </div>
  );
}
