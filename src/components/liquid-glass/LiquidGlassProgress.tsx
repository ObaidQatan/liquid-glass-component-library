import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

interface LiquidGlassProgressProps {
  value?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "segmented";
  showValue?: boolean;
  animated?: boolean;
}

const sizeStyles = {
  sm: "h-1.5 rounded-full",
  md: "h-2.5 rounded-full",
  lg: "h-4 rounded-xl",
};

export function LiquidGlassProgress({
  value = 0,
  max = 100,
  className,
  size = "md",
  variant = "default",
  showValue = false,
  animated = true,
}: LiquidGlassProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  if (variant === "segmented") {
    const segments = 10;
    const filledSegments = Math.round((percentage / 100) * segments);

    return (
      <div className={cn("w-full", className)}>
        <div className="flex gap-1">
          {Array.from({ length: segments }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i < filledSegments ? 1 : 0.2,
                scale: i < filledSegments ? 1 : 0.95,
              }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={cn(
                "flex-1 rounded-full transition-colors",
                sizeStyles[size],
                i < filledSegments
                  ? "bg-gradient-to-r from-liquid-blue to-liquid-purple"
                  : "bg-white/10"
              )}
            />
          ))}
        </div>
        {showValue && (
          <div className="mt-1.5 text-right text-xs text-white/50">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative flex-1 overflow-hidden",
            "glass-blur-sm glass-surface-dark border border-white/5",
            sizeStyles[size]
          )}
        >
          <motion.div
            initial={animated ? { width: 0 } : false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "absolute inset-y-0 left-0 rounded-full",
              variant === "gradient"
                ? "bg-gradient-to-r from-liquid-blue via-liquid-purple to-liquid-pink"
                : "bg-gradient-to-r from-liquid-blue/70 to-liquid-purple/70"
            )}
          >
            {/* Shimmer effect */}
            {animated && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            )}
          </motion.div>
        </div>
        {showValue && (
          <span className="text-xs font-medium text-white/60 tabular-nums w-10 text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
