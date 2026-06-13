import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

interface LiquidGlassContextMenuProps {
  children: React.ReactNode;
  items: MenuItem[];
  className?: string;
}

export function LiquidGlassContextMenu({
  children,
  items,
  className,
}: LiquidGlassContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Clamp position to viewport once we know the menu size
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const padding = 12;
    setPosition((pos) => ({
      x: Math.min(Math.max(pos.x, padding), window.innerWidth - rect.width - padding),
      y: Math.min(Math.max(pos.y, padding), window.innerHeight - rect.height - padding),
    }));
  }, [isOpen, items.length]);

  const menu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed z-[100] min-w-[180px] rounded-xl overflow-hidden glass-blur-xl glass-surface glass-border glass-highlight"
          style={{ left: position.x, top: position.y }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {items.map((item, i) =>
            item.separator ? (
              <div key={`sep-${i}`} className="my-1 h-px bg-[var(--lg-border-subtle)] mx-2" />
            ) : (
              <motion.button
                key={item.id}
                whileHover={item.disabled ? {} : { x: 2 }}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
                  item.disabled
                    ? "text-[var(--lg-text-muted)] cursor-not-allowed"
                    : "text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)]"
                )}
              >
                {item.icon && <span className="text-[var(--lg-text-muted)]">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-[10px] text-[var(--lg-text-muted)] px-1.5 py-0.5 rounded bg-[var(--lg-border-subtle)]">
                    {item.shortcut}
                  </span>
                )}
              </motion.button>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={triggerRef} onContextMenu={handleContextMenu} className={cn("cursor-context-menu", className)}>
      {children}
      {createPortal(menu, document.body)}
    </div>
  );
}
