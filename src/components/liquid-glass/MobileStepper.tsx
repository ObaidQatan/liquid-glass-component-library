import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface MobileStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function MobileStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  className,
  label,
  size = "md",
}: MobileStepperProps) {
  const sizeClasses = {
    sm: "gap-1.5 px-1.5 py-1",
    md: "gap-2 px-2 py-1.5",
    lg: "gap-3 px-3 py-2",
  };

  const buttonSizes = {
    sm: 24,
    md: 30,
    lg: 36,
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className={cn("inline-flex items-center", className)}>
      {label && <span className="text-sm text-white/50 mr-3">{label}</span>}
      <div
        className={cn(
          "inline-flex items-center rounded-xl",
          "glass-blur-sm glass-surface glass-border",
          sizeClasses[size]
        )}
      >
        {/* Top highlight */}
        <div className="absolute inset-x-1 top-0 h-px bg-white/10 rounded-full" />

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={decrement}
          disabled={value <= min}
          className={cn(
            "flex items-center justify-center rounded-lg transition-all",
            "text-white/50 hover:text-white/80",
            value <= min && "opacity-30 cursor-not-allowed"
          )}
          style={{ width: buttonSizes[size], height: buttonSizes[size] }}
        >
          <Minus size={buttonSizes[size] * 0.35} strokeWidth={2.5} />
        </motion.button>

        <motion.span
          key={value}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className={cn(
            "min-w-[2ch] text-center tabular-nums font-semibold text-white/90",
            textSizes[size]
          )}
        >
          {value}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={increment}
          disabled={value >= max}
          className={cn(
            "flex items-center justify-center rounded-lg transition-all",
            "text-white/50 hover:text-white/80",
            value >= max && "opacity-30 cursor-not-allowed"
          )}
          style={{ width: buttonSizes[size], height: buttonSizes[size] }}
        >
          <Plus size={buttonSizes[size] * 0.35} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
