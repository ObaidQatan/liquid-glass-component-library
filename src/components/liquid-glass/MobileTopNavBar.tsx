import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ChevronLeft, MoreVertical, Search } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useLiquidPress } from "./useLiquidPress";
import { LiquidGlassPressSplash } from "./LiquidGlassPressSplash";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { GlassSheen } from "./GlassSheen";

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

function BackButton({ onBack }: { onBack?: () => void }) {
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>();

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onBack}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      className="relative flex h-8 w-8 items-center justify-center rounded-xl glass-blur-sm glass-surface glass-border glass-highlight text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] overflow-hidden"
    >
      <LiquidGlassPressSplash press={press} size={80} />
      <ChevronLeft size={20} strokeWidth={2.5} className="relative z-10" />
    </motion.button>
  );
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
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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
            {leftAction || (showBack && <BackButton onBack={onBack} />)}
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
            {leftAction || (showBack && <BackButton onBack={onBack} />)}
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
        {leftAction || (showBack && <BackButton onBack={onBack} />)}
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
        <div className="flex items-center gap-3 px-4 h-12">
          {leftAction || (showBack && <BackButton onBack={onBack} />)}
          <motion.div
            animate={{
              scale: searchFocused ? 1.01 : 1,
              ...(searchFocused && {
                boxShadow:
                  "inset 0 1px 0 var(--lg-highlight-top), inset 0 -1px 0 var(--lg-highlight-bottom), 0 0 24px rgba(255,255,255,0.12)",
              }),
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "relative flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl overflow-hidden",
              "glass-blur glass-surface-strong glass-border glass-highlight",
              searchFocused && "ring-2 ring-white/20"
            )}
          >
            {/* Top highlight */}
            <GlassTopHighlight className="inset-x-3 top-0" opacity={0.25} />
            {/* Reflection blob */}
            <div className="pointer-events-none absolute -top-4 -right-4 h-12 w-12 rounded-full glass-reflection blur-xl" />
            {/* Sheen */}
            <GlassSheen opacity={0.12} />
            <Search size={14} className="relative z-10 text-[var(--lg-text-muted)] flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search..."
              className="relative z-10 flex-1 bg-transparent text-sm text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none"
            />
          </motion.div>
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
        {leftAction || (showBack && <BackButton onBack={onBack} />)}
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
