import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useGlassSurface } from "./useGlassSurface";
import { useGlassFluidity } from "./useGlassFluidity";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { GlassSheen } from "./GlassSheen";
import { useLiquidTapScale } from "./useLiquidMotion";

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
  const tapScale = useLiquidTapScale();
  const fluidity = useGlassFluidity();
  const thumbSurface = useGlassSurface({ variant: "thumb" });

  return (
    <nav
      className={cn(
        "relative flex items-center justify-between px-4 py-3",
        "glass-blur-lg glass-surface glass-border glass-highlight",
        "rounded-2xl",
        className
      )}
    >
      <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />

      {logo && <div className="flex-shrink-0 mr-4">{logo}</div>}

      <div className="flex items-center gap-1">
        {items.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: tapScale }}
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
                transition={{ type: "spring", stiffness: 300 + fluidity * 3, damping: 30 }}
                style={thumbSurface.style}
              >
                <div className="absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none" />
                <GlassSheen className="rounded-xl" opacity={0.18} />
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
