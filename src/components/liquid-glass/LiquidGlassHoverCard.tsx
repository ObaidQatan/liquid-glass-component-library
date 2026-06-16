import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
  const triggerRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0 });

  const popover = useGlassSurface({ variant: "popover" });
  const topHighlight = useGlassSurface({ variant: "highlight", opacity: 0.20 });
  const arrowFill = useGlassSurface({ variant: "fill", opacity: 0.12 });

  const measurePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ left: rect.left, top: rect.bottom + 8, width: rect.width });
  };

  const scheduleShow = () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    measurePosition();
    showTimerRef.current = setTimeout(() => setIsVisible(true), delay * 1000);
  };

  const scheduleHide = () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const popoverNode = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="fixed z-[100] flex justify-center pointer-events-none"
          style={{
            left: position.left,
            top: position.top,
            width: position.width,
          }}
        >
          <div
            className={cn(
              "pointer-events-auto flex-shrink-0",
              popover.className,
              "rounded-2xl overflow-hidden"
            )}
            style={{ width, ...popover.style }}
            onMouseEnter={scheduleShow}
            onMouseLeave={scheduleHide}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={scheduleShow}
      onMouseLeave={scheduleHide}
    >
      {children}
      {createPortal(popoverNode, document.body)}
    </div>
  );
}
