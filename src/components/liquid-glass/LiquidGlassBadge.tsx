import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

interface LiquidGlassBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  dot?: boolean;
}

const variantStyles = {
  default: "bg-white/10 text-white/80 border-white/10",
  primary: "bg-liquid-blue/15 text-liquid-blue border-liquid-blue/20",
  success: "bg-liquid-emerald/15 text-liquid-emerald border-liquid-emerald/20",
  warning: "bg-liquid-amber/15 text-liquid-amber border-liquid-amber/20",
  danger: "bg-liquid-rose/15 text-liquid-rose border-liquid-rose/20",
  info: "bg-liquid-cyan/15 text-liquid-cyan border-liquid-cyan/20",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs rounded-lg gap-1",
  md: "px-2.5 py-1 text-xs rounded-xl gap-1.5",
};

const dotColors = {
  default: "bg-white/60",
  primary: "bg-liquid-blue",
  success: "bg-liquid-emerald",
  warning: "bg-liquid-amber",
  danger: "bg-liquid-rose",
  info: "bg-liquid-cyan",
};

export function LiquidGlassBadge({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
}: LiquidGlassBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        "glass-blur-sm border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
