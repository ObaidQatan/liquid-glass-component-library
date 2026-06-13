import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
          : "text-white/30";

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
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="flex items-start justify-between mb-3">
              {stat.icon && (
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    stat.iconBg || "bg-white/5"
                  )}
                >
                  <span className={stat.iconColor || "text-white/50"}>{stat.icon}</span>
                </div>
              )}
              {stat.change !== undefined && (
                <div className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
                  <TrendIcon size={12} />
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-white/90">{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            {stat.changeLabel && (
              <p className="text-[10px] text-white/25 mt-0.5">{stat.changeLabel}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
