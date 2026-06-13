import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LiquidGlassToggle } from "./LiquidGlassToggle";

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  granted?: boolean;
}

interface MobilePermissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  permissions: Permission[];
  onGrantAll?: () => void;
  className?: string;
}

export function MobilePermissionDialog({
  isOpen,
  onClose,
  title,
  message,
  permissions,
  onGrantAll,
  className,
}: MobilePermissionDialogProps) {
  const [permMap, setPermMap] = useState<Record<string, boolean>>(
    Object.fromEntries(permissions.map((p) => [p.id, p.granted ?? false]))
  );

  const togglePerm = (id: string) => {
    setPermMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 glass-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className={cn(
              "relative w-full max-w-lg mx-auto mb-2",
              "glass-blur-xl glass-surface glass-border",
              "rounded-t-3xl overflow-hidden",
              className
            )}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-white/90 mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">{message}</p>

              <div className="space-y-2 mb-6">
                {permissions.map((perm) => (
                  <motion.button
                    key={perm.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => togglePerm(perm.id)}
                    className={cn(
                      "flex w-full items-center gap-3 p-3 rounded-xl transition-colors",
                      permMap[perm.id] ? "bg-white/5" : "bg-white/3 hover:bg-white/5"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                      permMap[perm.id] ? "bg-liquid-blue/15" : "bg-white/5"
                    )}>
                      <span className={cn(
                        permMap[perm.id] ? "text-liquid-blue" : "text-white/30"
                      )}>
                        {perm.icon}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className={cn(
                        "text-sm font-medium",
                        permMap[perm.id] ? "text-white/80" : "text-white/50"
                      )}>
                        {perm.title}
                      </p>
                      <p className="text-xs text-white/30">{perm.description}</p>
                    </div>
                    <LiquidGlassToggle
                      checked={permMap[perm.id] ?? false}
                      onChange={() => togglePerm(perm.id)}
                      variant="ios26"
                      size="sm"
                    />
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/50 hover:bg-white/5 transition-colors"
                >
                  Not Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onGrantAll}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white glass-blur-sm bg-liquid-blue/20 border border-liquid-blue/30"
                >
                  Allow All
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

