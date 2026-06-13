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
              activeIndex === i ? "text-[var(--lg-text)]" : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            )}
          >
            {activeIndex === i && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl glass-blur-lg pointer-events-none overflow-hidden"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.75%), transparent) 0%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.48%), transparent) 45%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.22%), transparent) 100%)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow:
                    "inset 0 1.5px 1px rgba(255,255,255,0.38), inset 0 -1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.18)",
                }}
              >
                <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
                <div
                  className="absolute inset-0 rounded-xl opacity-[0.18] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, transparent 55%)",
                  }}
                />
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
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.75%), transparent) 0%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.48%), transparent) 45%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.22%), transparent) 100%)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow:
                    "inset 0 1.5px 1px rgba(255,255,255,0.38), inset 0 -1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.18)",
                }}
              >
                <div className="absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none" />
                <div
                  className="absolute inset-0 rounded-full opacity-[0.18] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, transparent 55%)",
                  }}
                />
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
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.75%), transparent) 0%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.48%), transparent) 45%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.22%), transparent) 100%)",
                border: "1px solid rgba(255,255,255,0.24)",
                boxShadow:
                  "inset 0 1.5px 1px rgba(255,255,255,0.38), inset 0 -1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.18)",
              }}
            >
              <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
              <div
                className="absolute inset-0 rounded-xl opacity-[0.18] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, transparent 55%)",
                }}
              />
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
