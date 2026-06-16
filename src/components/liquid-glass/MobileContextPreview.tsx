import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { GlassTopHighlight } from "./GlassTopHighlight";

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
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div ref={childRef} onContextMenu={handleContextMenu}>
        {children}
      </div>

      <AnimatePresence>
        {isOpen && childRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsOpen(false)}
            />

            {/* Preview */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
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
                transition={{ delay: 0.1 }}
                className={cn(
                  "rounded-2xl overflow-hidden",
                  "glass-blur-xl glass-surface glass-border glass-highlight"
                )}
              >
                <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />
                {actions.map((action, i) => (
                  <motion.button
                    key={action.id}
                    whileTap={{ scale: 0.98 }}
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
    </div>
  );
}
