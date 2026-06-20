import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { GlassTopHighlight } from "./GlassTopHighlight";
import {
  useLiquidOverlayVariants,
  useLiquidTransition,
  useLiquidTapScale,
  useGlassOverlayRootStyle,
} from "./useLiquidMotion";

interface ContextAction {
  id: string;
  title: string;
  icon: ReactNode;
  destructive?: boolean;
  onClick?: () => void;
}

interface MobileContextPreviewProps {
  children: ReactNode;
  actions: ContextAction[];
  previewContent?: ReactNode;
  className?: string;
}

export function MobileContextPreview({
  children,
  actions,
  previewContent,
  className,
}: MobileContextPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayVariants = useLiquidOverlayVariants();
  const transition = useLiquidTransition();
  const tapScale = useLiquidTapScale();
  const overlayRef = useGlassOverlayRootStyle(isOpen);
  const [childRect, setChildRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = childRef.current?.getBoundingClientRect();
    if (rect) {
      setChildRect(rect);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const overlay = (
    <AnimatePresence>
      {isOpen && childRect && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          ref={overlayRef}
          className="fixed inset-0 z-[80] flex items-center justify-center"
        >
          <div
            className="glass-backdrop-subtle"
            onClick={() => setIsOpen(false)}
          />

          {/* Preview */}
          <motion.div
            {...overlayVariants}
            transition={transition}
            className="relative w-full max-w-xs mx-auto"
          >
            <motion.div
              className={cn(
                "relative rounded-2xl overflow-hidden mb-4",
                "glass-blur-xl glass-surface glass-border glass-highlight-strong",
                previewContent ? "p-4" : "h-32 bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20"
              )}
            >
              <GlassTopHighlight className="inset-x-0 top-0" opacity={0.25} />
              {previewContent || (
                <div className="flex h-full items-center justify-center text-[var(--lg-text-muted)] text-sm">
                  Preview
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={useLiquidTransition({ delay: 0.1 })}
              className={cn(
                "rounded-2xl overflow-hidden",
                "glass-blur-xl glass-surface glass-border glass-highlight"
              )}
            >
              <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />
              {actions.map((action, i) => (
                <motion.button
                  key={action.id}
                  whileTap={{ scale: tapScale }}
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[var(--lg-border-subtle)]",
                    i < actions.length - 1 && "border-b border-[var(--lg-border-subtle)]",
                    action.destructive ? "text-liquid-rose" : "text-[var(--lg-text-secondary)]"
                  )}
                >
                  <span className={cn(
                    action.destructive ? "text-liquid-rose" : "text-[var(--lg-text-muted)]"
                  )}>
                    {action.icon}
                  </span>
                  <span className="text-sm">{action.title}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div ref={childRef} onContextMenu={handleContextMenu}>
        {children}
      </div>
      {createPortal(overlay, document.body)}
    </div>
  );
}
