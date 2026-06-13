import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

interface LiquidGlassNavigationProps {
  items: NavItem[];
  className?: string;
  logo?: ReactNode;
  actions?: ReactNode;
}

export function LiquidGlassNavigation({
  items,
  className,
  logo,
  actions,
}: LiquidGlassNavigationProps) {
  return (
    <nav
      className={cn(
        "relative flex items-center justify-between px-4 py-3",
        "glass-blur-lg glass-surface glass-border glass-highlight",
        "rounded-2xl",
        className
      )}
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {logo && <div className="flex-shrink-0 mr-4">{logo}</div>}
      
      <div className="flex items-center gap-1">
        {items.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              item.active
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            )}
          >
            {item.active && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-xl bg-white/10 glass-border"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
      
      {actions && <div className="flex-shrink-0 ml-4 flex items-center gap-2">{actions}</div>}
    </nav>
  );
}
