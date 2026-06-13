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
        "relative flex items-center gap-2 mx-4 my-2 px-3 py-2 rounded-xl transition-all duration-200",
        "glass-blur-sm glass-surface glass-border",
        isActive && "ring-2 ring-white/10",
        className
      )}
    >
      {/* Top highlight */}
      <div className="absolute inset-x-2 top-0 h-px bg-white/10 rounded-full" />

      <Search size={16} className="text-white/40 flex-shrink-0" />

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
        className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
      />

      <AnimatePresence>
        {displayValue.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleClear}
            className="flex-shrink-0 text-white/40 hover:text-white/70"
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {(showCancelButton || isActive) && (
        <button
          className="flex-shrink-0 text-sm font-medium text-liquid-blue"
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
