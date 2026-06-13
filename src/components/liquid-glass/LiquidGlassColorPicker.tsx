import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";

interface LiquidGlassColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
  colors?: string[];
  showCustom?: boolean;
}

const defaultColors = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6",
  "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#78716c",
];

export function LiquidGlassColorPicker({
  value,
  onChange,
  className,
  colors = defaultColors,
  showCustom = true,
}: LiquidGlassColorPickerProps) {
  const [customColor, setCustomColor] = useState(value || "#3b82f6");

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange?.(color)}
            className={cn(
              "relative h-8 w-8 rounded-lg transition-all",
              value === color && "ring-2 ring-white/50 ring-offset-2 ring-offset-transparent"
            )}
            style={{ backgroundColor: color }}
          >
            {value === color && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {showCustom && (
        <div className="mt-3 flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-lg ring-1 ring-white/10 flex-shrink-0"
            style={{ backgroundColor: customColor }}
          />
          <div className="flex-1 flex items-center gap-2 glass-blur-sm glass-surface glass-border rounded-xl px-3 py-2">
            <span className="text-[var(--lg-text-muted)] text-xs">#</span>
            <input
              type="text"
              value={customColor.replace("#", "")}
              onChange={(e) => {
                const hex = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
                const full = `#${hex}`;
                setCustomColor(full);
                if (hex.length === 6) onChange?.(full);
              }}
              className="flex-1 bg-transparent text-sm text-[var(--lg-text-secondary)] outline-none uppercase"
              maxLength={6}
            />
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onChange?.(e.target.value);
              }}
              className="h-5 w-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
