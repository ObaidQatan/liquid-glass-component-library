import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { GlassTopHighlight } from "./GlassTopHighlight";
import {
  useLiquidSlideVariants,
  useLiquidTransition,
  useGlassOverlayRootStyle,
} from "./useLiquidMotion";

interface LiquidGlassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  position?: "left" | "right";
  width?: string;
  title?: string;
}

export function LiquidGlassDrawer({
  isOpen,
  onClose,
  children,
  className,
  position = "right",
  width = "400px",
  title,
}: LiquidGlassDrawerProps) {
  const isLeft = position === "left";
  const slideVariants = useLiquidSlideVariants(position, { stiff: true });
  const transition = useLiquidTransition({ stiff: true });
  const overlayRef = useGlassOverlayRootStyle(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" ref={overlayRef}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="glass-backdrop-subtle"
          />
          {/* Drawer */}
          <motion.div
            {...slideVariants}
            transition={transition}
            className={cn(
              "absolute top-0 bottom-0",
              isLeft ? "left-0" : "right-0",
              "glass-blur-xl glass-surface glass-border",
              "flex flex-col overflow-hidden",
              className
            )}
            style={{ width, maxWidth: "90vw" }}
          >
            {/* Top highlight */}
            <GlassTopHighlight className="inset-x-0 top-0 z-10" opacity={0.25} />
            {/* Reflection */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--lg-border-subtle)] blur-2xl" />

            {title && (
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--lg-border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--lg-text)]">{title}</h3>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
