import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useMemo, type MouseEvent } from "react";
import { useGlassSurface } from "./useGlassSurface";

interface LiquidGlassToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
  description?: string;
  variant?: "ios26" | "fluid";
  /**
   * Tint color for the active track. iOS 26 uses system green by default,
   * but can be overridden per context.
   */
  activeTint?: string;
}

const sizeStyles = {
  // Wide recessed track with a lozenge thumb that bulges out when pressed.
  sm: { track: "w-12 h-6", thumb: 18, widthRatio: 1.4, padding: 3.5 },
  md: { track: "w-[4rem] h-7", thumb: 22, widthRatio: 1.4, padding: 3.5 },
  lg: { track: "w-[5rem] h-9", thumb: 28, widthRatio: 1.4, padding: 3.5 },
};

function useGlassFluidity() {
  const [fluidity, setFluidity] = useState(() => {
    if (typeof document === "undefined") return 50;
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--lg-fluidity")) || 50;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () => setFluidity(parseFloat(getComputedStyle(root).getPropertyValue("--lg-fluidity")) || 50);
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return fluidity;
}

export function LiquidGlassToggle({
  checked = false,
  onChange,
  className,
  size = "md",
  disabled,
  label,
  description,
  variant = "fluid",
  activeTint,
}: LiquidGlassToggleProps) {
  const tint = activeTint ?? (variant === "ios26" ? "#34c759" : "#3b82f6");
  const s = sizeStyles[size];
  const idleWidth = s.thumb * s.widthRatio;
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [pressPoint, setPressPoint] = useState({ x: 50, y: 50 });
  const [isPressed, setIsPressed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const fluidity = useGlassFluidity();

  const thumbSurface = useGlassSurface({ variant: "thumb" });
  const trackSurface = useGlassSurface({ variant: "track" });
  const trackActiveSurface = useGlassSurface({ variant: "track-active", tint, activeTint: tint });

  // Snappy spring so the shape snaps back immediately when the state change finishes.
  const spring = useMemo(() => {
    const stiffness = 720 - fluidity * 3.6;
    const damping = 46 - fluidity * 0.2;
    return { stiffness, damping };
  }, [fluidity]);

  const createRipple = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPressPoint({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    },
    [disabled]
  );

  // Compute travel from the idle width so the lozenge stays within the track at rest.
  const trackWidth = useMemo(() => {
    // Parse Tailwind class widths into pixels (rem = 16px).
    if (s.track.includes("w-[")) {
      const match = s.track.match(/w-\[(.+?)\]/);
      const val = match?.[1] ?? "3rem";
      if (val.endsWith("rem")) return parseFloat(val) * 16;
      return parseFloat(val);
    }
    // Tailwind w-12 = 48.
    if (s.track.includes("w-12")) return 48;
    return 48;
  }, [s.track]);

  const travel = trackWidth - idleWidth - s.padding * 2;

  // Width-based stretch keeps semicircular ends (stadium/lozenge) instead of an ellipse.
  const thumbWidth = isPressed
    ? idleWidth * 1.65
    : isMoving
      ? idleWidth * 1.45
      : idleWidth;

  // Slight vertical expansion so the thumb bulges out of the track when active.
  const scaleY = isPressed
    ? 1.18
    : isMoving
      ? 1.12
      : 1;

  return (
    <div className={cn("inline-flex items-center gap-4", className)}>
      <motion.button
        disabled={disabled}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onClick={(e) => {
          createRipple(e);
          if (!disabled) {
            setIsMoving(true);
            onChange?.(!checked);
          }
        }}
        className={cn(
          "relative inline-flex items-center rounded-full isolate",
          "overflow-visible",
          s.track,
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        {/* Track — recessed glass pill underneath the thumb */}
        <div
          className={cn(
            "absolute inset-0 rounded-full -z-10",
            "glass-blur-xl",
            "border border-[var(--lg-border)]"
          )}
          style={{
            background: checked ? trackActiveSurface.style.background : trackSurface.style.background,
            boxShadow: trackSurface.style.boxShadow,
          }}
        >
          {/* Lensing backdrop layer */}
          <div
            className="absolute inset-[-1px] rounded-full opacity-70 pointer-events-none"
            style={{
              background: checked
                ? `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.24) 0%, transparent 45%), radial-gradient(circle at 75% 85%, ${tint}18 0%, transparent 45%)`
                : "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.14) 0%, transparent 45%)",
            }}
          />

          {/* Top highlight line */}
          <div className="pointer-events-none absolute inset-x-3 top-[1px] h-px bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-full" />
        </div>

        {/* Thumb — lozenge at rest; expands into a wider, taller stadium shape when active. */}
        <motion.div
          initial={{ width: idleWidth, marginLeft: -idleWidth / 2 }}
          animate={{
            x: checked ? travel : 0,
            width: thumbWidth,
            marginLeft: -thumbWidth / 2,
            scaleY,
          }}
          transition={{
            x: { type: "spring", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },
            width: { type: "spring", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },
            marginLeft: { type: "spring", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },
            scaleY: { type: "spring", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },
          }}
          onAnimationComplete={() => {
            // Return to idle exactly when the motion finishes.
            if (!isPressed) setIsMoving(false);
          }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full z-10 pointer-events-none",
            thumbSurface.className
          )}
          style={{
            left: s.padding + idleWidth / 2,
            height: s.thumb,
            ...thumbSurface.style,
          }}
        >
          {/* Reflection response */}
          <div className="absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none" />

          {/* Subtle specular sheen */}
          <div
            className="absolute inset-0 rounded-full opacity-18"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, transparent 55%)",
            }}
          />

          {/* Touch-point shimmer */}
          <AnimatePresence>
            {isPressed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.55, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-[-2px] rounded-full"
                style={{
                  background: `radial-gradient(circle at ${pressPoint.x}% ${pressPoint.y}%, rgba(255,255,255,0.45) 0%, transparent 55%)`,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ripple */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5, borderRadius: "45% 55% 50% 50% / 55% 45% 50% 50%" }}
              animate={{ scale: 2.8, opacity: 0, borderRadius: "50%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute pointer-events-none z-20"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 40,
                height: 40,
                marginLeft: -20,
                marginTop: -20,
                background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
              }}
            />
          ))}
        </AnimatePresence>
      </motion.button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className={cn("text-sm font-medium", disabled ? "text-[var(--lg-text-muted)]" : "text-[var(--lg-text)]")}>
              {label}
            </span>
          )}
          {description && <span className="text-xs text-[var(--lg-text-muted)]">{description}</span>}
        </div>
      )}
    </div>
  );
}
