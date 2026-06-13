import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

interface AlertOption {
  text: string;
  style?: "default" | "destructive" | "cancel";
  onClick?: () => void;
}

interface MobileAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options?: AlertOption[];
  icon?: "info" | "warning" | "success" | "error" | ReactNode;
  className?: string;
}

export function MobileAlertDialog({
  isOpen,
  onClose,
  title = "Alert",
  message,
  options,
  icon = "info",
  className,
}: MobileAlertDialogProps) {
  const defaultOptions: AlertOption[] = options || [
    { text: "OK", style: "cancel", onClick: onClose },
  ];

  const iconMap = {
    info: <InfoIcon />,
    warning: <AlertTriangle size={22} className="text-liquid-amber" />,
    success: <Check size={22} className="text-liquid-emerald" />,
    error: <X size={22} className="text-liquid-rose" />,
  };

  const alertIcon = typeof icon === "string" ? iconMap[icon as keyof typeof iconMap] : icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 glass-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "relative w-full max-w-sm",
              "glass-blur-xl glass-surface glass-border glass-highlight-strong",
              "rounded-2xl overflow-hidden",
              className
            )}
          >
            {/* Top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Content */}
            <div className="px-6 py-5 text-center">
              <div className="flex justify-center mb-3">{alertIcon}</div>
              <h3 className="text-base font-semibold text-[var(--lg-text)] mb-1.5">
                {title}
              </h3>
              {message && (
                <p className="text-sm text-[var(--lg-text-muted)] leading-relaxed">{message}</p>
              )}
            </div>

            {/* Options */}
            <div className="px-3 pb-3 space-y-1">
              {defaultOptions.map((option, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    option.onClick?.();
                    onClose();
                  }}
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-semibold transition-colors",
                    i < defaultOptions.length - 1 && "border-b border-[var(--lg-border-subtle)]",
                    option.style === "destructive"
                      ? "text-liquid-rose hover:bg-liquid-rose/5"
                      : option.style === "cancel"
                      ? "text-[var(--lg-text-muted)] hover:bg-[var(--lg-border-subtle)]"
                      : "text-liquid-blue hover:bg-[var(--lg-border-subtle)]"
                  )}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-liquid-blue">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
