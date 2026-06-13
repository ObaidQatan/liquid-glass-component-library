import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DockItem {
  id: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
  active?: boolean;
}

interface LiquidGlassDockProps {
  items: DockItem[];
  className?: string;
  position?: "bottom" | "top" | "left" | "right";
}

export function LiquidGlassDock({
  items,
  className,
  position = "bottom",
}: LiquidGlassDockProps) {
  const isVertical = position === "left" || position === "right";

  return (
    <div
      className={cn(
        "fixed z-50",
        position === "bottom" && "bottom-4 left-1/2 -translate-x-1/2",
        position === "top" && "top-4 left-1/2 -translate-x-1/2",
        position === "left" && "left-4 top-1/2 -translate-y-1/2",
        position === "right" && "right-4 top-1/2 -translate-y-1/2",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1 p-2 rounded-2xl",
          "glass-blur-xl glass-surface glass-border glass-highlight-strong",
          isVertical ? "flex-col" : "flex-row"
        )}
      >
        {/* Top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />

        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.15, y: isVertical ? 0 : -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={item.onClick}
            className={cn(
              "relative flex items-center justify-center rounded-xl transition-colors",
              isVertical ? "w-11 h-11" : "w-12 h-12",
              item.active
                ? "bg-[var(--lg-border)]"
                : "hover:bg-[var(--lg-border-subtle)]"
            )}
          >
            <span
              className={cn(
                "transition-colors",
                item.active ? "text-[var(--lg-text)]" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
              )}
            >
              {item.icon}
            </span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-liquid-rose px-1 text-[9px] font-bold text-white">
                {item.badge}
              </span>
            )}
            {/* Tooltip on hover */}
            <div
              className={cn(
                "absolute opacity-0 group-hover:opacity-100 pointer-events-none",
                "px-2 py-1 rounded-lg glass-blur-sm glass-surface glass-border",
                "text-[10px] font-medium text-[var(--lg-text-secondary)] whitespace-nowrap",
                "transition-opacity",
                position === "bottom" && "bottom-full mb-2",
                position === "top" && "top-full mt-2",
                position === "left" && "left-full ml-2",
                position === "right" && "right-full mr-2"
              )}
            >
              {item.label}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
