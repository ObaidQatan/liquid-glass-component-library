import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

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
  const { glass } = useTheme();

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
                ? "text-[var(--lg-text)]"
                : "text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            )}
          >
            {item.active && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-xl glass-blur-lg pointer-events-none overflow-hidden"
                transition={{ type: "spring", stiffness: 300 + glass.fluidity * 3, damping: 30 }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.75%), transparent) 0%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.48%), transparent) 45%, color-mix(in srgb, white calc(var(--lg-transparency) * 0.22%), transparent) 100%)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow:
                    "inset 0 1.5px 1px rgba(255,255,255,0.38), inset 0 -1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.18)",
                }}
              >
                <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
                <div
                  className="absolute inset-0 rounded-xl opacity-[0.18] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, transparent 55%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-[var(--lg-border)] rounded-full" />
              </motion.div>
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
