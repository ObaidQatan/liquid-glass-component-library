import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { useGlassSurface } from "./useGlassSurface";

interface LiquidGlassHoverCardProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  delay?: number;
  width?: string;
}

export function LiquidGlassHoverCard({
  children,
  content,
  className,
  delay = 0.3,
  width = "280px",
}: LiquidGlassHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popover = useGlassSurface({ variant: "popover" });
  const topHighlight = useGlassSurface({ variant: "highlight", opacity: 0.20 });
  const arrowFill = useGlassSurface({ variant: "fill", opacity: 0.12 });
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
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-[100] left-1/2 -translate-x-1/2 top-full mt-2",
              popover.className,
              "rounded-2xl overflow-hidden"
            )}
            style={{ width, ...popover.style }}
          >
            {/* Reflection blob */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full glass-reflection blur-2xl" />
            {/* Top highlight */}
            <div className={topHighlight.className} style={topHighlight.style} />
            {/* Arrow */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t border-[var(--lg-border-subtle)]"
              style={{ background: arrowFill.style.background }}
            />
            <div className="relative p-4">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
