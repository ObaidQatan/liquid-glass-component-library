import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ChevronLeft, MoreVertical } from "lucide-react";
import type { ReactNode } from "react";

interface MobileTopNavBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  leftAction?: ReactNode;
  rightActions?: ReactNode[];
  className?: string;
  variant?: "standard" | "large" | "inline" | "search" | "prominent";
  translucent?: boolean;
}

export function MobileTopNavBar({
  title,
  subtitle,
  showBack = true,
  onBack,
  leftAction,
  rightActions,
  className,
  variant = "standard",
  translucent = true,
}: MobileTopNavBarProps) {
  if (variant === "large") {
    return (
      <div className={cn(
        "relative z-40",
        translucent ? "glass-blur-lg glass-surface glass-border" : "bg-[var(--lg-bg)] border-b border-[var(--lg-border)]",
        "rounded-2xl overflow-hidden",
        className
      )}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl" />
        <div className="flex items-center justify-between px-4 h-11">
          <div className="flex items-center min-w-12">
            {leftAction || (showBack && (
              <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="flex items-center gap-0.5 text-liquid-blue">
                <ChevronLeft size={22} strokeWidth={2.5} />
                <span className="text-sm font-medium">Back</span>
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-1 min-w-12 justify-end">
            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}
          </div>
        </div>
        <div className="px-5 pb-3">
          <h1 className="text-2xl font-bold text-[var(--lg-text)]">{title}</h1>
          {subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
    );
  }

  if (variant === "prominent") {
    return (
      <div className={cn(
        "relative z-40",
        translucent ? "glass-blur-xl glass-surface-strong glass-border glass-highlight-strong" : "bg-[var(--lg-bg)]",
        "rounded-2xl overflow-hidden",
        className
      )}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl" />
        <div className="flex items-center justify-between px-4 h-11">
          <div className="flex items-center min-w-12">
            {leftAction || (showBack && (
              <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="flex items-center gap-0.5 text-liquid-blue">
                <ChevronLeft size={22} strokeWidth={2.5} /><span className="text-sm font-medium">Back</span>
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-1 min-w-12 justify-end">
            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}
          </div>
        </div>
        <div className="px-5 pb-4 pt-1 text-center">
          <h1 className="text-xl font-bold text-[var(--lg-text)]">{title}</h1>
          {subtitle && <p className="text-xs text-[var(--lg-text-muted)] mt-1">{subtitle}</p>}
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "relative z-40 flex items-center gap-3 px-4 h-11",
        translucent ? "glass-blur glass-surface glass-border" : "bg-[var(--lg-bg)] border-b border-[var(--lg-border)]",
        "rounded-2xl overflow-hidden",
        className
      )}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
        {leftAction || (showBack && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="text-liquid-blue">
            <ChevronLeft size={22} strokeWidth={2.5} />
          </motion.button>
        ))}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-[var(--lg-text)] truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          {rightActions?.map((action, i) => <span key={i}>{action}</span>)}
        </div>
      </div>
    );
  }

  if (variant === "search") {
    return (
      <div className={cn(
        "relative z-40",
        translucent ? "glass-blur-lg glass-surface glass-border" : "bg-[var(--lg-bg)]",
        "rounded-2xl overflow-hidden",
        className
      )}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
        <div className="flex items-center gap-3 px-4 h-11">
          {leftAction || (showBack && (
            <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="text-liquid-blue flex-shrink-0">
              <ChevronLeft size={22} strokeWidth={2.5} />
            </motion.button>
          ))}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--lg-border)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--lg-text-muted)]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span className="text-sm text-[var(--lg-text-muted)]">Search...</span>
          </div>
          <div className="flex items-center gap-1">
            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}
          </div>
        </div>
      </div>
    );
  }

  // Standard
  return (
    <div className={cn(
      "relative z-40 flex items-center justify-between px-4 h-12",
      translucent ? "glass-blur-lg glass-surface glass-border" : "bg-[var(--lg-bg)] border-b border-[var(--lg-border)]",
      "rounded-2xl overflow-hidden",
      className
    )}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight" />
      <div className="pointer-events-none absolute -top-10 -right-10 h-20 w-20 rounded-full bg-[var(--lg-reflection)] blur-2xl" />
      <div className="flex items-center min-w-12">
        {leftAction || (showBack && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="flex items-center gap-0.5 text-liquid-blue">
            <ChevronLeft size={22} strokeWidth={2.5} /><span className="text-sm font-medium">Back</span>
          </motion.button>
        ))}
      </div>
      <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        {title && <h1 className="text-sm font-medium text-[var(--lg-text)]">{title}</h1>}
        {subtitle && <p className="text-[10px] text-[var(--lg-text-muted)]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-1 min-w-12 justify-end">
        {rightActions?.map((action, i) => <span key={i}>{action}</span>)}
        {!rightActions?.length && (
          <motion.button whileTap={{ scale: 0.9 }} className="p-1 text-[var(--lg-text-muted)]"><MoreVertical size={18} /></motion.button>
        )}
      </div>
    </div>
  );
}
