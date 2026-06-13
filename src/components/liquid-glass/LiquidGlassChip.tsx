import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useLiquidPress } from "./useLiquidPress";
import { LiquidGlassPressSplash } from "./LiquidGlassPressSplash";

interface LiquidGlassChipProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
  icon?: ReactNode;
}

const variantStyles = {
  default: {
    base: "bg-white/5 text-white/70 border-white/10 hover:bg-white/10",
    active: "bg-white/15 text-white border-white/20",
  },
  primary: {
    base: "bg-liquid-blue/8 text-liquid-blue/70 border-liquid-blue/15 hover:bg-liquid-blue/15",
    active: "bg-liquid-blue/20 text-liquid-blue border-liquid-blue/30",
  },
  success: {
    base: "bg-liquid-emerald/8 text-liquid-emerald/70 border-liquid-emerald/15 hover:bg-liquid-emerald/15",
    active: "bg-liquid-emerald/20 text-liquid-emerald border-liquid-emerald/30",
  },
  warning: {
    base: "bg-liquid-amber/8 text-liquid-amber/70 border-liquid-amber/15 hover:bg-liquid-amber/15",
    active: "bg-liquid-amber/20 text-liquid-amber border-liquid-amber/30",
  },
  danger: {
    base: "bg-liquid-rose/8 text-liquid-rose/70 border-liquid-rose/15 hover:bg-liquid-rose/15",
    active: "bg-liquid-rose/20 text-liquid-rose border-liquid-rose/30",
  },
  info: {
    base: "bg-liquid-cyan/8 text-liquid-cyan/70 border-liquid-cyan/15 hover:bg-liquid-cyan/15",
    active: "bg-liquid-cyan/20 text-liquid-cyan border-liquid-cyan/30",
  },
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-xs rounded-lg gap-1",
  md: "px-3 py-1.5 text-sm rounded-xl gap-1.5",
};

export function LiquidGlassChip({
  children,
  className,
  variant = "default",
  size = "md",
  onRemove,
  onClick,
  active = false,
  icon,
}: LiquidGlassChipProps) {
  const v = variantStyles[variant];
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>(!onClick);

  return (
    <motion.button
      whileHover={{ scale: onClick ? 1.04 : 1 }}
      whileTap={{ scale: onClick ? 0.96 : 1 }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      className={cn(
        "relative inline-flex items-center font-medium transition-all duration-200 overflow-hidden isolate",
        "glass-blur-sm border",
        sizeStyles[size],
        active ? v.active : v.base,
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Liquid-glass press splash */}
      {onClick && <LiquidGlassPressSplash press={press} size={90} />}

      {icon && <span className="relative z-10 flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {onRemove && (
        <motion.span
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="relative z-10 ml-0.5 flex h-4 w-4 items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
        >
          <X size={12} />
        </motion.span>
      )}
    </motion.button>
  );
}
