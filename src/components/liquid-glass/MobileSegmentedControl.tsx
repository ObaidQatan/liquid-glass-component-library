import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import type { ReactNode } from "react";

interface Segment {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
}

interface MobileSegmentedControlProps {
  segments: Segment[];
  selected: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
  variant?: "default" | "ios26";
}

export function MobileSegmentedControl({
  segments,
  selected,
  onChange,
  className,
  size = "md",
  variant = "default",
}: MobileSegmentedControlProps) {
  const { isDark } = useTheme();
  const selectedIndex = segments.findIndex((s) => s.id === selected);
  const isIos26 = variant === "ios26";

  return (
    <div
      className={cn(
        "relative inline-flex rounded-xl overflow-hidden",
        isIos26 ? "glass-blur-lg glass-surface-strong glass-border p-1" : "bg-white/5 border border-white/10 p-0.5",
        size === "sm" ? "h-8" : "h-10",
        className
      )}
    >
      {/* Animated background pill */}
      <motion.div
        layout
        className={cn(
          "absolute top-1 bottom-1 rounded-lg",
          isIos26
            ? "glass-surface-strong border border-white/10 shadow-inner"
            : "bg-white/12 border border-white/10"
        )}
        style={{
          left: `calc(${100 / segments.length * selectedIndex}% + 4px)`,
          width: `calc(${100 / segments.length}% - 8px)`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {isIos26 && <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-white/30 rounded-full" />}
      </motion.div>

      {segments.map((segment) => (
        <button
          key={segment.id}
          onClick={() => onChange(segment.id)}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-1.5",
            "transition-colors select-none",
            selected === segment.id
              ? isDark ? "text-white font-medium" : "text-black font-medium"
              : isDark ? "text-white/40 hover:text-white/60" : "text-black/40 hover:text-black/60",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          {segment.icon}
          {segment.label}
        </button>
      ))}
    </div>
  );
}
