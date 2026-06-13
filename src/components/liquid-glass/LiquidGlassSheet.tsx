import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface LiquidGlassSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  maxHeight?: string;
  variant?: "default" | "compact" | "full" | "inset" | "detached";
}

export function LiquidGlassSheet({
  isOpen,
  onClose,
  children,
  className,
  title,
  maxHeight = "70vh",
  variant = "default",
}: LiquidGlassSheetProps) {
  const isFullScreen = variant === "full";
  const isDetached = variant === "detached";
  const isInset = variant === "inset";
  const isCompact = variant === "compact";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn(
          "fixed inset-0 z-50 flex items-end justify-center",
          isDetached && "p-4",
          isInset && "p-3"
        )}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={cn(
              "absolute inset-0",
              "bg-[var(--lg-overlay)] glass-blur-sm"
            )}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className={cn(
              "relative w-full overflow-hidden",
              "glass-blur-xl glass-surface-strong glass-border glass-highlight-strong",
              isFullScreen ? "h-full rounded-none" :
              isDetached ? "max-w-lg mx-auto rounded-3xl" :
              isInset ? "max-w-lg mx-auto rounded-3xl" :
              isCompact ? "max-w-lg mx-auto rounded-t-3xl" :
              "max-w-lg mx-auto rounded-t-3xl",
              className
            )}
            style={isFullScreen ? undefined : { maxHeight }}
          >
            {/* Handle bar */}
            {!isFullScreen && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[var(--lg-border)]" />
              </div>
            )}
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl" />

            {title && (
              <div className="px-6 pt-2 pb-3">
                <h3 className="text-lg font-semibold text-[var(--lg-text)] text-center">{title}</h3>
              </div>
            )}
            <div className={cn(
              "overflow-y-auto",
              isCompact ? "px-6 pb-6" : "px-6 pb-8"
            )}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
