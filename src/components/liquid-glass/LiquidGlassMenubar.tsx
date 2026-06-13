import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-0.5 px-2 py-1.5 rounded-xl",
        "glass-blur-sm glass-surface glass-border",
        className
      )}
    >
      {menus.map((menu, i) => (
        <div key={i} className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              activeIndex === i
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            )}
          >
            {menu.label}
          </motion.button>

          <AnimatePresence>
            {activeIndex === i && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.1 }}
                className="absolute left-0 top-full mt-1 min-w-[180px] rounded-xl overflow-hidden glass-blur-xl glass-surface glass-border glass-highlight z-50"
              >
                {/* Top highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="py-1">
                  {menu.items.map((item, j) =>
                    item.separator ? (
                      <div key={`sep-${j}`} className="my-1 h-px bg-white/5 mx-2" />
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
                            ? "text-white/20 cursor-not-allowed"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="text-[10px] text-white/25 ml-4">
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
        </div>
      ))}
    </div>
  );
}
