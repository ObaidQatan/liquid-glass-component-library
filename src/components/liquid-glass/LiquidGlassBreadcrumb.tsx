import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface LiquidGlassBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export function LiquidGlassBreadcrumb({
  items,
  className,
  separator = <ChevronRight size={14} className="text-[var(--lg-text-muted)]" />,
}: LiquidGlassBreadcrumbProps) {
  return (
    <nav
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl",
        "glass-blur-sm glass-surface glass-border",
        className
      )}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && separator}
            {item.href ? (
              <motion.a
                href={item.href}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-1.5 text-sm text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors"
              >
                {item.icon || (i === 0 && <Home size={14} />)}
                {item.label}
              </motion.a>
            ) : (
              <span
                className={cn(
                  "flex items-center gap-1.5 text-sm",
                  isLast ? "text-[var(--lg-text-secondary)] font-medium" : "text-[var(--lg-text-muted)]"
                )}
              >
                {item.icon || (i === 0 && <Home size={14} />)}
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
