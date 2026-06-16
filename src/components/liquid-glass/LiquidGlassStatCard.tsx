import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlassTopHighlight } from "./GlassTopHighlight";

interface StatData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
}

interface LiquidGlassStatCardProps {
  stats: StatData[];
  className?: string;
  columns?: number;
}

export function LiquidGlassStatCard({
  stats,
  className,
  columns = 4,
}: LiquidGlassStatCardProps) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <div className={cn("grid gap-4", colClass, className)}>
      {stats.map((stat, i) => {
        const isPositive = stat.change && stat.change > 0;
        const isNegative = stat.change && stat.change < 0;
        const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
        const trendColor = isPositive
          ? "text-liquid-emerald"
          : isNegative
          ? "text-liquid-rose"
          : "text-[var(--lg-text-muted)]";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "relative p-4 rounded-2xl overflow-hidden",
              "glass-blur-sm glass-surface glass-border glass-highlight"
            )}
          >
            {/* Top highlight */}
            <GlassTopHighlight className="inset-x-0 top-0" opacity={0.15} />

            <div className="flex items-start justify-between mb-3">
              {stat.icon && (
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    stat.iconBg || "bg-[var(--lg-border-subtle)]"
                  )}
                >
                  <span className={stat.iconColor || "text-[var(--lg-text-muted)]"}>{stat.icon}</span>
                </div>
              )}
              {stat.change !== undefined && (
                <div className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
                  <TrendIcon size={12} />
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-[var(--lg-text)]">{stat.value}</p>
            <p className="text-xs text-[var(--lg-text-muted)] mt-1">{stat.label}</p>
            {stat.changeLabel && (
              <p className="text-[10px] text-[var(--lg-text-muted)] mt-0.5">{stat.changeLabel}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
