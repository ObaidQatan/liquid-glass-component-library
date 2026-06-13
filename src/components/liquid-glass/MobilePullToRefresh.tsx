import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { ArrowDownToLine, RefreshCw, Check } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface MobilePullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
  threshold?: number;
}

export function MobilePullToRefresh({
  children,
  onRefresh,
  className,
  threshold = 80,
}: MobilePullToRefreshProps) {
  const [refreshState, setRefreshState] = useState<"idle" | "pulling" | "ready" | "loading" | "done">("idle");
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      startScroll.current = containerRef.current.scrollTop;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (refreshState !== "idle" && refreshState !== "pulling") return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      const distance = Math.min(diff * 0.6, threshold * 1.5);
      setPullDistance(distance);
      setRefreshState(distance >= threshold ? "ready" : "pulling");
    }
  }, [refreshState, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (refreshState === "ready") {
      setRefreshState("loading");
      setPullDistance(threshold);
      await onRefresh();
      setRefreshState("done");
      setTimeout(() => {
        setRefreshState("idle");
        setPullDistance(0);
      }, 600);
    } else {
      setRefreshState("idle");
      setPullDistance(0);
    }
  }, [refreshState, threshold, onRefresh]);

  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-y-auto", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-10"
        style={{ height: pullDistance, overflow: "hidden" }}
      >
        <motion.div
          animate={{
            y: Math.max(0, pullDistance - 30),
            rotate: refreshState === "loading" ? 360 : 0,
          }}
          transition={
            refreshState === "loading"
              ? { duration: 1, repeat: Infinity, ease: "linear" }
              : { type: "spring", stiffness: 300, damping: 25 }
          }
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "glass-blur-sm glass-surface glass-border"
          )}
        >
          {refreshState === "loading" ? (
            <RefreshCw size={16} className="text-liquid-blue" />
          ) : refreshState === "done" ? (
            <Check size={16} className="text-liquid-emerald" />
          ) : (
            <ArrowDownToLine
              size={16}
              className={cn("transition-transform", progress > 0.8 && "rotate-180")}
              style={{ opacity: progress }}
            />
          )}
        </motion.div>
      </div>

      <div style={{ minHeight: pullDistance > 0 ? "100%" : undefined }}>
        {children}
      </div>
    </div>
  );
}
