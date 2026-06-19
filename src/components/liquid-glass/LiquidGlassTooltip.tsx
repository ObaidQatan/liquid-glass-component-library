import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface LiquidGlassTooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-px border-l-transparent border-r-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-px border-l-transparent border-r-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 -ml-px border-t-transparent border-b-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 -mr-px border-t-transparent border-b-transparent border-l-transparent",
};

export function LiquidGlassTooltip({
  children,
  content,
  className,
  position = "top",
  delay = 0.3,
}: LiquidGlassTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  const show = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setIsVisible(true), delay * 1000);
  };

  const hide = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0.01, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-3 py-2 rounded-xl whitespace-nowrap",
              "glass-blur-lg glass-surface glass-border glass-highlight",
              "text-xs font-medium text-[var(--lg-text)]",
              positionStyles[position]
            )}
          >
            {/* Arrow */}
            <div
              className={cn(
                "absolute w-2 h-2 rotate-45",
                "bg-[var(--lg-border)] border border-[var(--lg-border-subtle)]",
                arrowStyles[position]
              )}
            />
            {content}
            {/* Top highlight */}
            <GlassTopHighlight className="inset-x-2 top-0" opacity={0.2} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
