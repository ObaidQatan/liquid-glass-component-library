import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface LiquidGlassSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export function LiquidGlassSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  label,
  disabled,
}: LiquidGlassSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[var(--lg-text-secondary)]">
          {label}
        </label>
      )}
      <motion.button
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "relative flex w-full items-center justify-between gap-3",
          "glass-blur-sm glass-surface glass-border glass-inner-glow",
          "px-4 py-3 rounded-2xl text-left transition-all duration-200",
          "focus:ring-2 focus:ring-white/20 focus:border-[var(--lg-border)]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selected?.icon}
          <span className={cn("truncate", !selected && "text-[var(--lg-text-muted)]")}>
            {selected?.label || placeholder}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[var(--lg-text-muted)]"
        >
          <ChevronDown size={16} />
        </motion.div>
        {/* Top highlight */}
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[var(--lg-border)] rounded-full" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 mt-2 w-full overflow-hidden",
              "glass-blur-xl glass-surface glass-border glass-highlight-strong",
              "rounded-2xl py-1"
            )}
          >
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ x: 2 }}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors",
                  value === option.value
                    ? "bg-[var(--lg-border)] text-[var(--lg-text)]"
                    : "text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] hover:text-[var(--lg-text)]"
                )}
              >
                {option.icon}
                <span className="flex-1 text-left">{option.label}</span>
                {value === option.value && (
                  <Check size={14} className="text-liquid-blue" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
