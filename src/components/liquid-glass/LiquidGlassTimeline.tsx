import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useGlassSurface } from "./useGlassSurface";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  color?: "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan";
}

interface LiquidGlassTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const colorMap = {
  blue: "bg-liquid-blue",
  purple: "bg-liquid-purple",
  emerald: "bg-liquid-emerald",
  amber: "bg-liquid-amber",
  rose: "bg-liquid-rose",
  cyan: "bg-liquid-cyan",
};

export function LiquidGlassTimeline({
  items,
  className,
}: LiquidGlassTimelineProps) {
  const dotFill = useGlassSurface({ variant: "fill", opacity: 0.4 });
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-[var(--lg-border)]" />

      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex items-start gap-4"
          >
            {/* Dot */}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                "glass-blur-sm glass-border",
                item.color ? colorMap[item.color] + "/20" : "bg-[var(--lg-border-subtle)]"
              )}
            >
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  item.color ? colorMap[item.color] : ""
                )}
                style={item.color ? undefined : { background: dotFill.style.background }}
              />
              {item.icon && (
                <span className="absolute text-[var(--lg-text-secondary)]">{item.icon}</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium text-[var(--lg-text-secondary)]">{item.title}</h4>
                {item.timestamp && (
                  <span className="text-xs text-[var(--lg-text-muted)] flex-shrink-0">{item.timestamp}</span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-[var(--lg-text-muted)] mt-1 leading-relaxed">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
