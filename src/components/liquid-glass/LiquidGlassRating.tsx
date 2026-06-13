import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

interface LiquidGlassRatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
}

const sizeMap = {
  sm: 14,
  md: 20,
  lg: 28,
};

export function LiquidGlassRating({
  value = 0,
  max = 5,
  onChange,
  className,
  size = "md",
  readonly = false,
  showValue = false,
}: LiquidGlassRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;
  const s = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const filled = starValue <= displayValue;
          const halfFilled = !filled && starValue - 0.5 <= displayValue;

          return (
            <motion.button
              key={i}
              whileHover={readonly ? {} : { scale: 1.2 }}
              whileTap={readonly ? {} : { scale: 0.9 }}
              onMouseEnter={() => !readonly && setHoverValue(starValue)}
              onMouseLeave={() => !readonly && setHoverValue(0)}
              onClick={() => !readonly && onChange?.(starValue)}
              className={cn(
                "relative transition-colors",
                readonly ? "cursor-default" : "cursor-pointer"
              )}
            >
              <Star
                size={s}
                className={cn(
                  "transition-colors",
                  filled
                    ? "text-liquid-amber fill-liquid-amber"
                    : halfFilled
                    ? "text-liquid-amber"
                    : "text-[var(--lg-text-muted)]"
                )}
              />
              {halfFilled && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                  <Star size={s} className="text-liquid-amber fill-liquid-amber" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-[var(--lg-text-muted)] tabular-nums">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
