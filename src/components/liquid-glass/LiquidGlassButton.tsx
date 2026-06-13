import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, type ReactNode, type MouseEvent } from "react";
import { useLiquidPress } from "./useLiquidPress";
import { LiquidGlassPressSplash } from "./LiquidGlassPressSplash";

interface RippleData {
  id: number;
  x: number;
  y: number;
}

interface LiquidGlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fluid?: boolean;
}

const variantStyles = {
  primary:
    "glass-blur glass-surface-strong glass-border glass-highlight text-[var(--lg-text)]",
  secondary:
    "glass-blur-sm glass-surface glass-border-subtle glass-inner-glow text-[var(--lg-text)]",
  ghost:
    "bg-transparent hover:glass-surface text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]",
  danger:
    "glass-blur glass-surface glass-border glass-highlight text-liquid-rose",
  success:
    "glass-blur glass-surface glass-border glass-highlight text-liquid-emerald",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-2xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
};

export function LiquidGlassButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled,
  onClick,
  type = "button",
  fluid = true,
}: LiquidGlassButtonProps) {
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>(disabled || loading);

  const createRipple = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 900);
    },
    [disabled, loading]
  );

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      onClick={(e: any) => {
        createRipple(e);
        onClick?.();
      }}
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center font-medium overflow-hidden isolate",
        "transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-2 top-0 h-px glass-top-highlight rounded-full z-20" />

      {/* Liquid-glass press splash */}
      {fluid && <LiquidGlassPressSplash press={press} size={140} />}

      {/* Fluid compression shadow — mimics glass being pressed */}
      {fluid && (
        <motion.div
          animate={{
            opacity: press.isPressed ? 0.5 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
          style={{
            boxShadow:
              "inset 0 6px 18px rgba(0,0,0,0.28), inset 0 -2px 6px rgba(255,255,255,0.12)",
          }}
        />
      )}

      {/* Subtle refraction blob */}
      <div className="pointer-events-none absolute -top-8 -right-8 h-16 w-16 rounded-full glass-reflection blur-2xl z-0" />

      {/* Liquid ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{
              scale: 0,
              opacity: 0.55,
              borderRadius: "45% 55% 50% 50% / 55% 45% 50% 50%",
            }}
            animate={{
              scale: 2.8,
              opacity: 0,
              borderRadius: "50%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute pointer-events-none z-0"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              background:
                "radial-gradient(circle, var(--lg-ripple) 0%, transparent 65%)",
            }}
          />
        ))}
      </AnimatePresence>

      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mr-2 h-4 w-4 rounded-full border-2 border-current/30 border-t-current relative z-10"
        />
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="flex-shrink-0 relative z-10">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0 relative z-10">{icon}</span>
      )}
    </motion.button>
  );
}
