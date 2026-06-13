import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "thick" | "thin" | "chrome";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  highlight?: boolean;
}

const variantStyles = {
  default: "glass-blur glass-surface",
  thick: "glass-blur-lg glass-surface-strong",
  thin: "glass-blur-sm glass-surface",
  chrome: "glass-blur glass-surface-dark",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function LiquidGlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  padding = "md",
  border = true,
  highlight = true,
}: LiquidGlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { scale: 1.01, y: -2, transition: { duration: 0.3, ease: "easeOut" } }
          : undefined
      }
      className={cn(
        "relative overflow-hidden rounded-3xl",
        variantStyles[variant],
        paddingStyles[padding],
        border && "glass-border",
        highlight && "glass-highlight",
        className
      )}
    >
      {/* Inner highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
      {/* Subtle reflection */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--lg-reflection)] blur-3xl" />
      {children}
    </motion.div>
  );
}
