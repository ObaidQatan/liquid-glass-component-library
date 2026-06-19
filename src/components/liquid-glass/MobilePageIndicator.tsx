import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useLiquidTransition } from "./useLiquidMotion";

interface MobilePageIndicatorProps {
  currentPage: number;
  totalPages: number;
  className?: string;
  variant?: "dots" | "line" | "fraction";
  activeColor?: string;
  inactiveColor?: string;
}

export function MobilePageIndicator({
  currentPage,
  totalPages,
  className,
  variant = "dots",
  activeColor = "bg-white",
  inactiveColor = "bg-white/20",
}: MobilePageIndicatorProps) {
  const transition = useLiquidTransition();
  if (variant === "line") {
    return (
      <div className={cn("flex gap-1", className)}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentPage ? 24 : 6,
              opacity: i === currentPage ? 1 : 0.4,
            }}
            transition={transition}
            className={cn("h-1.5 rounded-full", i === currentPage ? activeColor : inactiveColor)}
          />
        ))}
      </div>
    );
  }

  if (variant === "fraction") {
    return (
      <span className={cn(
        "text-sm font-medium tabular-nums",
        className
      )}>
        <span className="text-[var(--lg-text-secondary)]">{currentPage + 1}</span>
        <span className="text-[var(--lg-text-muted)] mx-1">/</span>
        <span className="text-[var(--lg-text-muted)]">{totalPages}</span>
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: totalPages }).map((_, i) => (
        <motion.button
          key={i}
          animate={{
            scale: i === currentPage ? 1.2 : 1,
            width: i === currentPage ? 20 : 8,
          }}
          transition={transition}
          className={cn(
            "h-2 rounded-full transition-colors",
            i === currentPage ? activeColor : inactiveColor
          )}
        />
      ))}
    </div>
  );
}
