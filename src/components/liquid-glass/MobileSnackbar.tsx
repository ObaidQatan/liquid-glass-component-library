import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


interface MobileSnackbarProps {
  message: string;
  action?: { label: string; onClick: () => void };
  variant?: "info" | "success" | "error" | "warning";
  duration?: number;
  className?: string;
}

export function MobileSnackbar({
  message,
  action,
  variant = "info",
  duration = 4000,
  className,
}: MobileSnackbarProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setVisible(true);
    setProgress(100);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setVisible(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, message]);

  const variantConfig = {
    info: { bg: "bg-white/10", icon: "info" },
    success: { bg: "bg-liquid-emerald/15", icon: "success" },
    error: { bg: "bg-liquid-rose/15", icon: "error" },
    warning: { bg: "bg-liquid-amber/15", icon: "warning" },
  };

  const config = variantConfig[variant];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto",
            "rounded-2xl overflow-hidden",
            "glass-blur-xl glass-surface glass-border glass-highlight-strong",
            className
          )}
        >
          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex items-center gap-3 px-4 py-3">
            <div className={cn("flex-1 flex items-center gap-2.5 min-w-0")}>
              <span className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0",
                config.bg
              )}>
                <span className="text-xs font-bold text-white/70">
                  {variant[0].toUpperCase()}
                </span>
              </span>
              <p className="text-sm text-white/80">{message}</p>
            </div>

            {action && (
              <button
                className="flex-shrink-0 text-sm font-semibold text-liquid-blue"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )}

            <button
              className="flex-shrink-0 text-white/30 hover:text-white/60"
              onClick={() => setVisible(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-white/20"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
