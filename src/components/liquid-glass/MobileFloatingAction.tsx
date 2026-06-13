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
}

export function MobileFloatingActionButton({
  className,
  icon = <Plus size={24} />,
  expandedIcon = <X size={24} />,
  actions,
  onClick,
  position = "bottom-right",
  color = "from-liquid-blue to-liquid-purple",
}: MobileFloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =
    useLiquidPress<HTMLButtonElement>();

  const toggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) onClick?.();
  };

  const positionClass =
    position === "bottom-right"
      ? "bottom-20 right-4"
      : "bottom-20 left-4";

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
          <>
            {actions.map((action, i) => (
              <ActionButton
                key={action.id}
                action={action}
                index={actions.length - 1 - i}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerCancel}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-2xl",
          "bg-gradient-to-br",
          color,
          "text-white glass-highlight-strong shadow-lg shadow-liquid-blue/30 overflow-hidden isolate"
        )}
      >
        <LiquidGlassPressSplash press={press} size={160} />
        <div className="pointer-events-none absolute inset-x-3 top-0.5 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full z-10" />
        {isOpen ? expandedIcon : icon}
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
      transition={{ delay: index * 0.05 }}
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
        className="relative flex h-10 w-10 items-center justify-center rounded-full glass-blur-sm glass-surface glass-border text-[var(--lg-text-secondary)] overflow-hidden isolate"
      >
        <LiquidGlassPressSplash press={press} size={90} />
        {action.icon}
      </motion.button>
    </motion.div>
  );
}
