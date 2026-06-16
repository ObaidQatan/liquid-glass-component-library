import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Trash2, MessageSquare, Heart, UserPlus, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect, type CSSProperties } from "react";
import { useGlassSurface } from "./useGlassSurface";

interface Notification {
  id: string;
  type: "message" | "like" | "follow" | "alert";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface LiquidGlassNotificationDropdownProps {
  notifications?: Notification[];
  className?: string;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
  onNotificationClick?: (id: string) => void;
}

const typeConfig = {
  message: { icon: MessageSquare, color: "text-liquid-blue", bg: "bg-liquid-blue/10" },
  like: { icon: Heart, color: "text-liquid-rose", bg: "bg-liquid-rose/10" },
  follow: { icon: UserPlus, color: "text-liquid-emerald", bg: "bg-liquid-emerald/10" },
  alert: { icon: AlertCircle, color: "text-liquid-amber", bg: "bg-liquid-amber/10" },
};

const defaultNotifications: Notification[] = [
  { id: "1", type: "message", title: "New message", description: "Sarah sent you a message", time: "2m ago", read: false },
  { id: "2", type: "like", title: "New like", description: "Alex liked your photo", time: "15m ago", read: false },
  { id: "3", type: "follow", title: "New follower", description: "Jordan started following you", time: "1h ago", read: true },
  { id: "4", type: "alert", title: "System alert", description: "Your storage is 90% full", time: "3h ago", read: true },
];

export function LiquidGlassNotificationDropdown({
  notifications = defaultNotifications,
  className,
  onMarkAllRead,
  onClearAll,
  onNotificationClick,
}: LiquidGlassNotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const topHighlight = useGlassSurface({ variant: "highlight", opacity: 0.25 });
  const unreadFill = useGlassSurface({ variant: "fill", opacity: 0.06 });
  const hoverFill = useGlassSurface({ variant: "fill", opacity: 0.05 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl glass-blur-sm glass-surface glass-border text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors"
      >
        <Bell size={18} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden glass-blur-xl glass-surface-strong glass-border glass-highlight-strong z-[100]"
          >
            {/* Top highlight */}
            <div className={topHighlight.className} style={topHighlight.style} />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--lg-border-subtle)]">
              <h3 className="text-sm font-semibold text-[var(--lg-text)]">Notifications</h3>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onMarkAllRead}
                  className="p-1.5 rounded-lg text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] transition-colors"
                  title="Mark all read"
                >
                  <Check size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClearAll}
                  className="p-1.5 rounded-lg text-[var(--lg-text-muted)] hover:text-liquid-rose hover:bg-[var(--lg-border-subtle)] transition-colors"
                  title="Clear all"
                >
                  <Trash2 size={14} />
                </motion.button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto py-1">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--lg-text-muted)]">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => {
                  const config = typeConfig[n.type];
                  const Icon = config.icon;
                  return (
                    <motion.button
                      key={n.id}
                      whileHover={{ x: 2 }}
                      onClick={() => {
                        onNotificationClick?.(n.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                        !n.read ? "bg-[var(--item-fill)]" : "hover:bg-[var(--item-hover-fill)]"
                      )}
                      style={{
                        "--item-fill": unreadFill.style.background,
                        "--item-hover-fill": hoverFill.style.background,
                      } as CSSProperties}
                    >
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0", config.bg)}>
                        <Icon size={14} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--lg-text-secondary)]">{n.title}</p>
                        <p className="text-xs text-[var(--lg-text-muted)] truncate">{n.description}</p>
                        <p className="text-[10px] text-[var(--lg-text-muted)] mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-liquid-blue" />
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
