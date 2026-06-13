import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleClick = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [isOpen]);

  return (
    <div ref={ref} onContextMenu={handleContextMenu} className={className}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[100] min-w-[180px] rounded-xl overflow-hidden glass-blur-xl glass-surface glass-border glass-highlight"
            style={{
              left: Math.min(position.x, window.innerWidth - 200),
              top: Math.min(position.y, window.innerHeight - items.length * 36),
            }}
          >
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {items.map((item, i) =>
              item.separator ? (
                <div key={`sep-${i}`} className="my-1 h-px bg-white/5 mx-2" />
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
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.icon && <span className="text-white/40">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[10px] text-white/25 px-1.5 py-0.5 rounded bg-white/5">
                      {item.shortcut}
                    </span>
                  )}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
