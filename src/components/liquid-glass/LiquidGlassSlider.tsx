import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useTheme } from "./ThemeProvider";
import { useGlassSurface } from "./useGlassSurface";
import { GlassSheen } from "./GlassSheen";

interface LiquidGlassSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  showValue?: boolean;
  disabled?: boolean;
  label?: string;
  valueFormatter?: (value: number) => string;
}

function useGlassFluidity() {
  const [fluidity, setFluidity] = useState(() => {
    if (typeof document === "undefined") return 50;
    return (
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--lg-fluidity",
        ),
      ) || 50
    );
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () =>
      setFluidity(
        parseFloat(getComputedStyle(root).getPropertyValue("--lg-fluidity")) ||
          50,
      );
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return fluidity;
}

export function LiquidGlassSlider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  showValue = true,
  disabled,
  label,
  valueFormatter,
}: LiquidGlassSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const fluidity = useGlassFluidity();
  const thumbSurface = useGlassSurface({ variant: "thumb" });
  const trackFillSurface = useGlassSurface({ variant: "track-active", tint: "#3b82f6", activeTint: "#8b5cf6" });

  const percentage = ((value - min) / (max - min)) * 100;

  // Snappy spring tuned by the global fluidity control.
  const spring = useMemo(() => {
    const stiffness = 720 - fluidity * 3.6;
    const damping = 46 - fluidity * 0.2;
    return { stiffness, damping };
  }, [fluidity]);

  // iOS 26 liquid-glass thumb: a stadium/lozenge that stretches while dragging.
  const thumb = 20;
  const widthRatio = 1.4;
  const idleWidth = thumb * widthRatio;

  const thumbWidth = isDragging ? idleWidth * 1.65 : idleWidth;
  const scaleY = isDragging ? 1.18 : 1;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = x / rect.width;
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;
      onChange?.(Math.max(min, Math.min(max, stepped)));
    },
    [min, max, step, onChange, disabled]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.clientX);

    const handleMouseMove = (ev: MouseEvent) => handleMove(ev.clientX);
    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        {label ? (
          <>
            <span className="text-xs font-medium text-[var(--lg-text-secondary)]">
              {label}
            </span>
            <span className="text-xs tabular-nums text-[var(--lg-text-muted)]">
              {valueFormatter ? valueFormatter(value) : value}
            </span>
          </>
        ) : (
          <>
            {showValue && (
              <span
                className={cn(
                  "text-xs font-medium",
                  isDark ? "text-[var(--lg-text-muted)]" : "text-black/40"
                )}
              >
                {min}
              </span>
            )}
            {showValue && (
              <motion.span
                key={value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  isDark ? "text-[var(--lg-text-secondary)]" : "text-black/70"
                )}
              >
                {value}
              </motion.span>
            )}
          </>
        )}
      </div>
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={cn(
          "relative h-2 rounded-full cursor-pointer overflow-visible",
          "glass-blur-sm glass-surface-dark border",
          isDark ? "border-[var(--lg-border-subtle)]" : "border-black/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Filled track */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${percentage}%`, background: trackFillSurface.style.background }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Thumb — liquid-glass stadium/lozenge that stretches on drag. */}
        <motion.div
          initial={{ width: idleWidth, scaleY: 1 }}
          animate={{
            left: `${percentage}%`,
            width: thumbWidth,
            scaleY,
          }}
          transition={{
            left: {
              type: "spring",
              stiffness: spring.stiffness,
              damping: spring.damping,
              mass: 0.45,
            },
            width: {
              type: "spring",
              stiffness: spring.stiffness,
              damping: spring.damping,
              mass: 0.45,
            },
            scaleY: {
              type: "spring",
              stiffness: spring.stiffness,
              damping: spring.damping,
              mass: 0.45,
            },
          }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full z-10 pointer-events-none",
            thumbSurface.className
          )}
          style={{
            left: `${percentage}%`,
            height: thumb,
            ...thumbSurface.style,
          }}
        >
          {/* Reflection response */}
          <div className="absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none" />

          {/* Subtle specular sheen */}
          <GlassSheen className="rounded-full" opacity={0.18} />
        </motion.div>
      </div>
      {!label && showValue && (
        <span
          className={cn(
            "block text-right text-xs font-medium mt-1",
            isDark ? "text-[var(--lg-text-muted)]" : "text-black/40"
          )}
        >
          {max}
        </span>
      )}
    </div>
  );
}
