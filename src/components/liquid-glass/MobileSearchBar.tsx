import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MobileSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export function MobileSearchBar({
  placeholder = "Search",
  value: controlledValue,
  onChange,
  onCancel,
  showCancelButton,
  className,
  autoFocus = false,
}: MobileSearchBarProps) {
  const [value, setValue] = useState(controlledValue || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(controlledValue || "");
  }, [controlledValue]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const isActive = isFocused || value.length > 0;
  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : value;

  const handleClear = () => {
    if (isControlled) {
      onChange?.("");
    } else {
      setValue("");
    }
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 overflow-hidden",
        "glass-blur glass-surface-strong glass-border glass-highlight",
        isActive && "ring-2 ring-white/10",
        className
      )}
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
      {/* Reflection blob */}
      <div className="pointer-events-none absolute -top-5 -right-5 h-14 w-14 rounded-full glass-reflection blur-2xl" />
      {/* Sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 45%, transparent 55%)",
        }}
      />

      <Search size={16} className="relative z-10 text-[var(--lg-text-muted)] flex-shrink-0" />

      <input
        ref={inputRef}
        value={displayValue}
        onChange={(e) => {
          if (isControlled) onChange?.(e.target.value);
          else setValue(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="relative z-10 flex-1 bg-transparent text-sm text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none"
      />

      <AnimatePresence>
        {displayValue.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleClear}
            className="relative z-10 flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {(showCancelButton || isActive) && (
        <button
          className="relative z-10 flex-shrink-0 text-sm font-medium text-liquid-blue"
          onClick={() => {
            handleClear();
            onCancel?.();
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
