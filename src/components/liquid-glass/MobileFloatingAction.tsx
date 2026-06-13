import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { useLiquidPress } from "./useLiquidPress";
import { LiquidGlassPressSplash } from "./LiquidGlassPressSplash";

interface FabAction {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

interface MobileFloatingActionButtonProps {
  className?: string;
  icon?: ReactNode;
  expandedIcon?: ReactNode;
  actions?: FabAction[];
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left";
  color?: string;
  variant?: "chrome" | "colored" | "ghost" | "glow";
}

export function MobileFloatingActionButton({
  className,
  icon = <Plus size={24} />,
  expandedIcon = <X size={24} />,
  actions,
  onClick,
  position = "bottom-right",
  color = "from-liquid-blue to-liquid-purple",
  variant = "chrome",
}: MobileFloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>();

  const toggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) onClick?.();
  };

  const positionClass =
    position === "bottom-right" ? "bottom-20 right-4" : "bottom-20 left-4";

  const isColored = variant === "colored" || variant === "glow";
  const isGlow = variant === "glow";
  const isGhost = variant === "ghost";

  const mainClasses = cn(
    "relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden isolate",
    "transition-all duration-200",
    isGhost
      ? "glass-blur-sm glass-surface glass-border text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]"
      : isColored
        ? cn("bg-gradient-to-br", color, "text-white")
        : "glass-blur-xl glass-surface-strong glass-border glass-highlight-strong text-[var(--lg-text)]",
    isGlow && "shadow-[0_0_30px_rgba(59,130,246,0.35)]",
    !isGhost && !isColored && "shadow-lg shadow-black/20"
  );

  return (
    <div
      className={cn(
        "fixed z-40 flex flex-col items-end gap-3",
        positionClass,
        className
      )}
    >
      <AnimatePresence>
        {isOpen && actions && (
          <div
            className={cn(
              "absolute bottom-full mb-3 flex flex-col gap-3 z-50 pointer-events-auto",
              position === "bottom-right" ? "right-0 items-end" : "left-0 items-start"
            )}
          >
            {actions.map((action, i) => (
              <ActionButton
                key={action.id}
                action={action}
                index={i}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 600, damping: 22 }}
        onClick={toggle}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerCancel}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className={mainClasses}
      >
        {/* Chrome liquid-glass overlays */}
        {!isGhost && !isColored && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-3 top-0.5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent rounded-full z-10" />
            <div className="pointer-events-none absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white/15 blur-xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 45%, transparent 55%)",
              }}
            />
          </>
        )}
        {isColored && (
          <>
            <div className="pointer-events-none absolute inset-x-3 top-0.5 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full z-10" />
            <div className="pointer-events-none absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white/20 blur-lg" />
          </>
        )}

        <LiquidGlassPressSplash press={press} size={160} duration={0.35} />
        <span className="relative z-10">{isOpen ? expandedIcon : icon}</span>
      </motion.button>
    </div>
  );
}

function ActionButton({
  action,
  index,
  onClose,
}: {
  action: FabAction;
  index: number;
  onClose: () => void;
}) {
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      transition={{ type: "spring", stiffness: 500, damping: 25, delay: index * 0.03 }}
      className="flex items-center gap-2"
    >
      <span className="px-2 py-1 rounded-lg glass-blur-sm glass-surface glass-border text-xs text-[var(--lg-text-secondary)] whitespace-nowrap">
        {action.label}
      </span>
      <motion.button
        whileTap={{ scale: 0.88 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerCancel}
        onClick={() => {
          action.onClick();
          onClose();
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full overflow-hidden glass-blur glass-surface-strong glass-border glass-highlight text-[var(--lg-text-secondary)]"
      >
        <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full" />
        <div className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white/10 blur-md" />
        <LiquidGlassPressSplash press={press} size={90} duration={0.3} />
        {action.icon}
      </motion.button>
    </motion.div>
  );
}
