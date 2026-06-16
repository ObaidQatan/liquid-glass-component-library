import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useGlassSurface } from "./useGlassSurface";
import { GlassSheen } from "./GlassSheen";

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
  const thumbSurface = useGlassSurface({ variant: "thumb" });
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
              activeIndex === i ? "text-[var(--lg-text)]" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            )}
          >
            {activeIndex === i && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl glass-blur-lg pointer-events-none overflow-hidden"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={thumbSurface.style}
              >
                <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
                <GlassSheen className="rounded-xl" opacity={0.18} />
              </motion.div>
            )}
            <span className="relative flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div className={cn("relative flex border-b border-[var(--lg-border-subtle)]", className)}>
        {tabs.map((tab, i) => (
          <motion.button
            key={i}
            onClick={() => onChange(i)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeIndex === i ? "text-[var(--lg-text)]" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            )}
          >
            {tab.icon}
            {tab.label}
            {activeIndex === i && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-2 right-2 h-1.5 rounded-full glass-blur-lg pointer-events-none overflow-hidden"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={thumbSurface.style}
              >
                <div className="absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none" />
                <GlassSheen className="rounded-full" opacity={0.18} />
              </motion.div>
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
            activeIndex === i ? "text-[var(--lg-text)]" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
          )}
        >
          {activeIndex === i && (
            <motion.div
              layoutId="tab-default"
              className="absolute inset-0.5 rounded-xl glass-blur-lg pointer-events-none overflow-hidden"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={thumbSurface.style}
            >
              <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
              <GlassSheen className="rounded-xl" opacity={0.18} />
            </motion.div>
          )}
          <span className="relative flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
