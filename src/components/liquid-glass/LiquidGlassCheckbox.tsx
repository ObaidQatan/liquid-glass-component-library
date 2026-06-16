import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { useGlassSurface } from "./useGlassSurface";

interface LiquidGlassCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: { box: "w-4 h-4 rounded-md", icon: 10 },
  md: { box: "w-5 h-5 rounded-lg", icon: 12 },
  lg: { box: "w-6 h-6 rounded-xl", icon: 14 },
};

export function LiquidGlassCheckbox({
  checked = false,
  indeterminate = false,
  onChange,
  className,
  label,
  disabled,
  size = "md",
}: LiquidGlassCheckboxProps) {
  const uncheckedFill = useGlassSurface({ variant: "fill", opacity: 0.05 });
  const s = sizeStyles[size];
  const isActive = checked || indeterminate;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      <motion.div
        whileTap={disabled ? {} : { scale: 0.9 }}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "relative flex items-center justify-center flex-shrink-0",
          "glass-blur-sm border transition-all duration-200",
          s.box,
          isActive
            ? "bg-liquid-blue/30 border-liquid-blue/50"
            : "border-white/10 hover:border-white/20"
        )}
        style={isActive ? undefined : { background: uncheckedFill.style.background }}
      >
        {/* Top highlight */}
        <GlassTopHighlight className="inset-x-1 top-0" opacity={0.2} />
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {indeterminate ? (
                <Minus size={s.icon} className="text-white" />
              ) : (
                <Check size={s.icon} className="text-white" strokeWidth={3} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {label && (
        <span className={cn("text-sm", disabled ? "text-[var(--lg-text-muted)]" : "text-[var(--lg-text-secondary)]")}>
          {label}
        </span>
      )}
    </label>
  );
}


