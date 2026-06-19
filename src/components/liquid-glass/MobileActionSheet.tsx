import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import {
  useLiquidSlideVariants,
  useLiquidTransition,
  useLiquidTapScale,
} from "./useLiquidMotion";

interface ActionSheetItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  destructive?: boolean;
  onClick?: () => void;
}

interface MobileActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  items: ActionSheetItem[];
  cancelText?: string;
  className?: string;
  variant?: "default" | "grouped" | "minimal" | "grid";
}

export function MobileActionSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  items,
  cancelText = "Cancel",
  className,
  variant = "default",
}: MobileActionSheetProps) {
  const slideVariants = useLiquidSlideVariants("bottom", { stiff: true });
  const transition = useLiquidTransition({ stiff: true });
  const tapScale = useLiquidTapScale();
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onClose}
            className="glass-backdrop-overlay" />

          <motion.div
            {...slideVariants}
            transition={transition}
            className={cn(
              "relative w-full max-w-lg mx-auto",
              variant === "grouped" ? "px-3 pb-3" : "pb-2",
              className
            )}
          >
            {/* ─── GROUPED ─── */}
            {variant === "grouped" && (
              <>
                <div className="glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-2xl overflow-hidden mb-2">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
                  {(title || subtitle) && (
                    <div className="px-5 pt-4 pb-3 text-center border-b border-[var(--lg-border)]">
                      {title && <h3 className="text-sm font-semibold text-[var(--lg-text)]">{title}</h3>}
                      {subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-1">{subtitle}</p>}
                    </div>
                  )}
                  {items.map((item, i) => (
                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />
                  ))}
                </div>
                <motion.button whileTap={{ scale: tapScale }} onClick={onClose}
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold text-liquid-blue glass-blur-xl glass-surface-strong glass-border glass-highlight-strong">
                  {cancelText}
                </motion.button>
              </>
            )}

            {/* ─── GRID ─── */}
            {variant === "grid" && (
              <div className="glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
                <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[var(--lg-border)]" /></div>
                {(title || subtitle) && (
                  <div className="px-5 pt-1 pb-3 text-center">
                    {title && <h3 className="text-sm font-semibold text-[var(--lg-text)]">{title}</h3>}
                    {subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-1">{subtitle}</p>}
                  </div>
                )}
                <div className="grid grid-cols-4 gap-2 px-4 pb-6">
                  {items.map((item) => (
                    <motion.button key={item.id} whileTap={{ scale: tapScale }} onClick={() => { item.onClick?.(); onClose(); }}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-[var(--lg-border)] transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lg-border)]">
                        <span className={item.destructive ? "text-liquid-rose" : "text-[var(--lg-text-secondary)]"}>{item.icon}</span>
                      </div>
                      <span className={cn("text-[10px] font-medium", item.destructive ? "text-liquid-rose" : "text-[var(--lg-text-muted)]")}>
                        {item.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── MINIMAL ─── */}
            {variant === "minimal" && (
              <div className="glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
                <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[var(--lg-border)]" /></div>
                <div className="px-4 pb-6 pt-2 space-y-0.5">
                  {items.map((item, i) => (
                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />
                  ))}
                </div>
              </div>
            )}

            {/* ─── DEFAULT ─── */}
            {variant === "default" && (
              <div className="glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
                <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl" />
                <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[var(--lg-border)]" /></div>
                {(title || subtitle) && (
                  <div className="px-6 pt-2 pb-4 text-center">
                    {title && <h3 className="text-base font-semibold text-[var(--lg-text)]">{title}</h3>}
                    {subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-1">{subtitle}</p>}
                  </div>
                )}
                <div className="px-2 pb-6 space-y-0.5">
                  {items.map((item, i) => (
                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />
                  ))}
                  <motion.button whileTap={{ scale: tapScale }} onClick={onClose}
                    className="flex w-full items-center justify-center py-3.5 rounded-xl text-sm font-semibold text-[var(--lg-text-muted)] hover:bg-[var(--lg-border)] transition-colors mt-2">
                    {cancelText}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ActionButton({ item, onClose, isLast }: { item: ActionSheetItem; onClose: () => void; isLast: boolean }) {
  const actionTapScale = useLiquidTapScale();
  return (
    <motion.button
      whileTap={{ scale: actionTapScale }}
      onClick={() => { item.onClick?.(); onClose(); }}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors hover:bg-[var(--lg-border)]",
        !isLast && "border-b border-[var(--lg-border-subtle)]",
        item.destructive ? "text-liquid-rose" : "text-[var(--lg-text)]"
      )}
    >
      {item.icon && <span className={item.destructive ? "text-liquid-rose" : "text-[var(--lg-text-muted)]"}>{item.icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{item.title}</p>
        {item.subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-0.5">{item.subtitle}</p>}
      </div>
    </motion.button>
  );
}
