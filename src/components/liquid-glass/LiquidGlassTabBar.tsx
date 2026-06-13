import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TabItem {
  label: string;
  icon?: ReactNode;
  badge?: number;
}

interface LiquidGlassTabBarProps {
  tabs: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function LiquidGlassTabBar({
  tabs,
  activeIndex,
  onChange,
  className,
  variant = "default",
}: LiquidGlassTabBarProps) {
  if (variant === "pills") {
    return (
      <div
        className={cn(
          "relative inline-flex p-1 rounded-2xl",
          "glass-blur-sm glass-surface-dark glass-border",
          className
        )}
      >
        {tabs.map((tab, i) => (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors z-10",
              activeIndex === i ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {activeIndex === i && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl bg-white/10 glass-border"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-liquid-rose/80 px-1 text-[10px] font-bold text-white">
                  {tab.badge}
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div className={cn("relative flex border-b border-white/10", className)}>
        {tabs.map((tab, i) => (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeIndex === i ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-liquid-rose/80 px-1 text-[10px] font-bold text-white">
                {tab.badge}
              </span>
            )}
            {activeIndex === i && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-liquid-blue to-liquid-purple rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex",
        "glass-blur-sm glass-surface glass-border rounded-2xl overflow-hidden",
        className
      )}
    >
      {tabs.map((tab, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
            activeIndex === i ? "text-white" : "text-white/40 hover:text-white/70"
          )}
        >
          {activeIndex === i && (
            <motion.div
              layoutId="tab-default"
              className="absolute inset-0 bg-white/5"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-liquid-rose/80 px-1 text-[10px] font-bold text-white">
                {tab.badge}
              </span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
