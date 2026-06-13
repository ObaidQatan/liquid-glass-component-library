import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { LiquidGlassSlider } from "./LiquidGlassSlider";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface LiquidGlassControlsProps {
  className?: string;
}

export function LiquidGlassControls({ className }: LiquidGlassControlsProps) {
  const { glass, setGlass, resetGlass } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative w-full max-w-xs rounded-3xl p-5 overflow-hidden",
        "glass-blur-xl glass-surface-strong glass-border",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-liquid-blue" />
          <span className="text-sm font-semibold text-[var(--lg-text)]">Glass Controls</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={resetGlass}
          className="p-1.5 rounded-lg hover:bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)]"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      <div className="space-y-5">
        <LiquidGlassSlider label="Blur" value={glass.blur} onChange={(v) => setGlass({ blur: v })} valueFormatter={(v) => `${v}%`} />
        <LiquidGlassSlider label="Transparency" value={glass.transparency} onChange={(v) => setGlass({ transparency: v })} valueFormatter={(v) => `${v}%`} />
        <LiquidGlassSlider label="Reflection" value={glass.reflection} onChange={(v) => setGlass({ reflection: v })} valueFormatter={(v) => `${v}%`} />
        <LiquidGlassSlider label="Fluidity" value={glass.fluidity} onChange={(v) => setGlass({ fluidity: v })} valueFormatter={(v) => `${v}%`} />
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--lg-border)] grid grid-cols-4 gap-2 text-center">
        {[
          { label: "Blur", value: `${Math.round((glass.blur / 100) * 60)}px` },
          { label: "Alpha", value: `${Math.round((glass.transparency / 100) * 80)}%` },
          { label: "Glow", value: `${Math.round((glass.reflection / 100) * 40)}%` },
          { label: "Snap", value: `${Math.round((glass.fluidity / 100) * 500)}` },
        ].map((stat) => (
          <div key={stat.label} className="space-y-0.5">
            <div className="text-xs font-semibold text-[var(--lg-text)]">{stat.value}</div>
            <div className="text-[10px] text-[var(--lg-text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
