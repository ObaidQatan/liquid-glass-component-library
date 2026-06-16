import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface LiquidGlassRadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  direction?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: { outer: "w-4 h-4", inner: "w-2 h-2" },
  md: { outer: "w-5 h-5", inner: "w-2.5 h-2.5" },
  lg: { outer: "w-6 h-6", inner: "w-3 h-3" },
};

export function LiquidGlassRadioGroup({
  options,
  value,
  onChange,
  className,
  direction = "vertical",
  size = "md",
}: LiquidGlassRadioGroupProps) {
  const s = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex items-start gap-3 cursor-pointer select-none",
              option.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            <motion.div
              whileTap={option.disabled ? {} : { scale: 0.9 }}
              onClick={() => !option.disabled && onChange?.(option.value)}
              className={cn(
                "relative flex items-center justify-center flex-shrink-0 mt-0.5 rounded-full",
                "glass-blur-sm border transition-all duration-200",
                s.outer,
                isSelected
                  ? "bg-liquid-blue/20 border-liquid-blue/50"
                  : "bg-[var(--lg-border-subtle)] border-[var(--lg-border-subtle)] hover:border-[var(--lg-border)]"
              )}
            >
              {/* Top highlight */}
              <GlassTopHighlight className="inset-x-1 top-0.5" opacity={0.2} />
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={cn(
                    "rounded-full bg-liquid-blue",
                    s.inner
                  )}
                />
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "text-sm font-medium",
                  option.disabled ? "text-[var(--lg-text-muted)]" : "text-[var(--lg-text-secondary)]"
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-[var(--lg-text-muted)] mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
