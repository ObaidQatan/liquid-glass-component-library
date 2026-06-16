import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface LiquidGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function LiquidGlassModal({
  isOpen,
  onClose,
  children,
  className,
  title,
  size = "md",
}: LiquidGlassModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 glass-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full",
              "glass-blur-xl glass-surface glass-border glass-highlight-strong",
              "rounded-3xl overflow-hidden",
              sizeStyles[size],
              className
            )}
          >
            {/* Top highlight */}
            <GlassTopHighlight className="inset-x-0 top-0" opacity={0.3} />
            {/* Reflection */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--lg-border-subtle)] blur-2xl" />

            {title && (
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h3 className="text-lg font-semibold text-[var(--lg-text)]">{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text-secondary)] transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
