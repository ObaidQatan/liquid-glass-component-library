import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface LiquidGlassAlertProps {
  children: ReactNode;
  className?: string;
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  onClose?: () => void;
  icon?: ReactNode;
}

const variantStyles = {
  info: {
    border: "border-liquid-blue/20",
    bg: "bg-liquid-blue/8",
    icon: <Info size={18} className="text-liquid-blue" />,
    glow: "bg-liquid-blue/10",
  },
  success: {
    border: "border-liquid-emerald/20",
    bg: "bg-liquid-emerald/8",
    icon: <CheckCircle size={18} className="text-liquid-emerald" />,
    glow: "bg-liquid-emerald/10",
  },
  warning: {
    border: "border-liquid-amber/20",
    bg: "bg-liquid-amber/8",
    icon: <AlertTriangle size={18} className="text-liquid-amber" />,
    glow: "bg-liquid-amber/10",
  },
  error: {
    border: "border-liquid-rose/20",
    bg: "bg-liquid-rose/8",
    icon: <AlertCircle size={18} className="text-liquid-rose" />,
    glow: "bg-liquid-rose/10",
  },
};

export function LiquidGlassAlert({
  children,
  className,
  variant = "info",
  title,
  onClose,
  icon,
}: LiquidGlassAlertProps) {
  const v = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "relative flex gap-3 rounded-2xl p-4",
        "glass-blur-sm border",
        v.border,
        v.bg,
        className
      )}
    >
      {/* Glow */}
      <div className={cn("absolute -top-4 -left-4 h-16 w-16 rounded-full blur-2xl", v.glow)} />
      
      <div className="relative flex-shrink-0 mt-0.5">{icon || v.icon}</div>
      <div className="relative flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-semibold text-[var(--lg-text)] mb-1">{title}</h4>
        )}
        <div className="text-sm text-[var(--lg-text-secondary)] leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors"
        >
          <X size={16} />
        </motion.button>
      )}
      {/* Top highlight */}
      <GlassTopHighlight className="inset-x-0 top-0" opacity={0.15} />
    </motion.div>
  );
}
