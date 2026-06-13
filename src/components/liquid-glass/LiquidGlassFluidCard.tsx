import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useState, type ReactNode, type MouseEvent } from "react";

interface LiquidGlassFluidCardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "strong" | "ios26";
  onClick?: () => void;
}

export function LiquidGlassFluidCard({
  children,
  className,
  padding = "md",
  variant = "default",
  onClick,
}: LiquidGlassFluidCardProps) {
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const isIos26 = variant === "ios26";

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-3xl isolate",
        isIos26 ? "glass-blur-xl glass-surface-strong glass-border" : "glass-blur-lg glass-surface glass-border",
        "shadow-xl shadow-black/10",
        paddingClasses[padding],
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Liquid refraction follows cursor */}
      <motion.div
        animate={{
          opacity: glow.active ? 0.6 : 0,
          scale: glow.active ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-none absolute -inset-8 z-0"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12) 0%, transparent 45%)`,
        }}
      />

      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Subtle border glow */}
      {isIos26 && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[var(--lg-border-subtle)] z-10" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
