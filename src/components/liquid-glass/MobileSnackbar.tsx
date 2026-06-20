import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useGlassSurface } from "./useGlassSurface";
import { GlassTopHighlight } from "./GlassTopHighlight";
import {
  useLiquidSlideVariants,
  useLiquidTransition,
  useGlassOverlayRootStyle,
} from "./useLiquidMotion";


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
  const slideVariants = useLiquidSlideVariants("bottom");
  const transition = useLiquidTransition();
  const overlayRef = useGlassOverlayRootStyle(visible);
  const progressFill = useGlassSurface({ variant: "fill", opacity: 0.2 });

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
    info: { bg: "bg-[var(--lg-border)]", icon: "info" },
    success: { bg: "bg-liquid-emerald/15", icon: "success" },
    error: { bg: "bg-liquid-rose/15", icon: "error" },
    warning: { bg: "bg-liquid-amber/15", icon: "warning" },
  };

  const config = variantConfig[variant];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...slideVariants}
          transition={transition}
          ref={overlayRef}
          className={cn(
            "fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto",
            "rounded-2xl overflow-hidden",
            "glass-blur-xl glass-surface glass-border glass-highlight-strong",
            className
          )}
        >
          {/* Top highlight */}
          <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />

          <div className="flex items-center gap-3 px-4 py-3">
            <div className={cn("flex-1 flex items-center gap-2.5 min-w-0")}>
              <span className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0",
                config.bg
              )}>
                <span className="text-xs font-bold text-[var(--lg-text-secondary)]">
                  {variant[0].toUpperCase()}
                </span>
              </span>
              <p className="text-sm text-[var(--lg-text-secondary)]">{message}</p>
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
              className="flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
              onClick={() => setVisible(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-[var(--lg-border-subtle)]">
            <motion.div
              className="h-full"
              style={{ width: `${progress}%`, background: progressFill.style.background }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
