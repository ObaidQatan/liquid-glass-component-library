import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LiquidGlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  type?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "px-3 py-2 text-sm rounded-xl",
  md: "px-4 py-3 text-sm rounded-2xl",
  lg: "px-5 py-4 text-base rounded-2xl",
};

export function LiquidGlassInput({
  placeholder,
  value,
  onChange,
  className,
  icon,
  iconRight,
  type = "text",
  disabled,
  error,
  label,
  size = "md",
}: LiquidGlassInputProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-white/70">
          {label}
        </label>
      )}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={cn(
          "relative flex items-center gap-3",
          "glass-blur-sm glass-surface glass-border glass-inner-glow",
          "transition-all duration-200",
          "focus-within:ring-2 focus-within:ring-white/20 focus-within:border-white/30",
          error && "border-liquid-rose/50 ring-1 ring-liquid-rose/30",
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {icon && (
          <span className="flex-shrink-0 text-white/40">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-white placeholder-white/30 outline-none",
            disabled && "cursor-not-allowed"
          )}
        />
        {iconRight && (
          <span className="flex-shrink-0 text-white/40">{iconRight}</span>
        )}
        {/* Top highlight */}
        <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/10 rounded-full" />
      </motion.div>
      {error && (
        <p className="mt-1.5 text-xs text-liquid-rose">{error}</p>
      )}
    </div>
  );
}
