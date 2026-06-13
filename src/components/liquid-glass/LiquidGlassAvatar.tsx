import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LiquidGlassAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string | ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  ring?: boolean;
  ringColor?: string;
}

const sizeStyles = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-lg",
};

const statusColors = {
  online: "bg-liquid-emerald",
  offline: "bg-[var(--lg-text-muted)]",
  away: "bg-liquid-amber",
  busy: "bg-liquid-rose",
};

const statusSizes = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

export function LiquidGlassAvatar({
  src,
  alt,
  fallback,
  className,
  size = "md",
  status,
  ring = false,
  ringColor = "rgba(255,255,255,0.15)",
}: LiquidGlassAvatarProps) {
  const hasImage = src && src.length > 0;
  const fallbackText =
    typeof fallback === "string"
      ? fallback
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : fallback;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn("relative inline-flex", className)}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full overflow-hidden",
          "bg-gradient-to-br from-white/10 to-white/5",
          sizeStyles[size],
        )}
        style={ring ? { boxShadow: `0 0 0 2px ${ringColor}` } : undefined}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-semibold text-[var(--lg-text-secondary)]">{fallbackText}</span>
        )}
        
        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      </div>
      
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-[#0a0a0f]",
            statusColors[status],
            statusSizes[size]
          )}
        />
      )}
    </motion.div>
  );
}
