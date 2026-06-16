import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useGlassSurface } from "./useGlassSurface";
import { GlassTopHighlight } from "./GlassTopHighlight";

export interface ToastItem {
  id: string;
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number;
}

interface LiquidGlassToastProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const positionStyles = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const variantIcons = {
  info: <Info size={18} className="text-liquid-blue" />,
  success: <CheckCircle size={18} className="text-liquid-emerald" />,
  warning: <AlertTriangle size={18} className="text-liquid-amber" />,
  error: <AlertCircle size={18} className="text-liquid-rose" />,
};

const variantBorders = {
  info: "border-liquid-blue/20",
  success: "border-liquid-emerald/20",
  warning: "border-liquid-amber/20",
  error: "border-liquid-rose/20",
};

export function LiquidGlassToast({
  toasts,
  onRemove,
  position = "bottom-right",
}: LiquidGlassToastProps) {
  return (
    <div className={cn("fixed z-[100] flex flex-col gap-2", positionStyles[position])}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItemComponent
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItemComponent({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  const progressFill = useGlassSurface({ variant: "fill", opacity: 0.2 });
  const [progress, setProgress] = useState(100);
  const duration = toast.duration || 4000;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onRemove(toast.id);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "relative flex items-center gap-3 min-w-[280px] max-w-[400px] px-4 py-3 rounded-2xl",
        "glass-blur-xl glass-surface border",
        variantBorders[toast.variant || "info"],
        "glass-highlight"
      )}
    >
      {/* Top highlight */}
      <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />
      
      <div className="flex-shrink-0">{variantIcons[toast.variant || "info"]}</div>
      <p className="flex-1 text-sm text-[var(--lg-text-secondary)] leading-relaxed">{toast.message}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors"
      >
        <X size={14} />
      </motion.button>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
        <motion.div
          className="h-full"
          style={{ width: `${progress}%`, background: progressFill.style.background }}
        />
      </div>
    </motion.div>
  );
}
