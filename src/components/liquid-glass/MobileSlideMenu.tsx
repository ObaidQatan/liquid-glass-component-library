import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { X, ChevronRight } from "lucide-react";

interface MenuSection { title: string; items: MenuItem[]; }
interface MenuItem { id: string; label: string; icon: ReactNode; badge?: number; destructive?: boolean; onClick?: () => void; }

interface MobileSlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: MenuSection[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  position?: "left" | "right";
  width?: string;
  variant?: "default" | "compact" | "floating";
}

export function MobileSlideMenu({
  isOpen, onClose, sections, header, footer, className,
  position = "left", width = "280px", variant = "default",
}: MobileSlideMenuProps) {
  const isLeft = position === "left";
  const isFloating = variant === "floating";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[55]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-[var(--lg-overlay)] glass-blur-sm" />
          <motion.div
            initial={{ x: isLeft ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className={cn(
              "absolute top-0 bottom-0",
              isLeft ? "left-0" : "right-0",
              isFloating ? "m-3 rounded-3xl" : "",
              "glass-blur-xl glass-surface-strong glass-border glass-highlight-strong",
              "flex flex-col overflow-hidden",
              className
            )}
            style={{ width, maxWidth: isFloating ? "calc(85vw - 24px)" : "85vw" }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl" />

            {header || (
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--lg-border)]">
                <h3 className="text-base font-semibold text-[var(--lg-text)]">Menu</h3>
                <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lg-border)] text-[var(--lg-text-muted)]">
                  <X size={16} />
                </motion.button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto py-2">
              {sections.map((section, si) => (
                <div key={si}>
                  {section.title && (
                    <div className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">
                      {section.title}
                    </div>
                  )}
                  {section.items.map((item) => (
                    <motion.button key={item.id} whileTap={{ scale: 0.98 }}
                      onClick={() => { item.onClick?.(); onClose(); }}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[var(--lg-border)]",
                        item.destructive ? "text-liquid-rose" : "text-[var(--lg-text)]"
                      )}>
                      <span className={item.destructive ? "text-liquid-rose" : "text-[var(--lg-text-muted)]"}>{item.icon}</span>
                      <span className="flex-1 text-sm">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-liquid-rose/80 px-1 text-[10px] font-bold text-white">{item.badge}</span>
                      )}
                      {!item.badge && !item.destructive && <ChevronRight size={14} className="text-[var(--lg-text-muted)]" />}
                    </motion.button>
                  ))}
                  {si < sections.length - 1 && <div className="mx-5 my-1 h-px bg-[var(--lg-border)]" />}
                </div>
              ))}
            </div>

            {footer && <div className="border-t border-[var(--lg-border)] p-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
