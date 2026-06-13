import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useState, useRef, useCallback, type ReactNode } from "react";

interface LiquidGlassResizableProps {
  children: ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  direction?: "horizontal" | "vertical" | "both";
}

export function LiquidGlassResizable({
  children,
  className,
  defaultWidth = 300,
  defaultHeight = 200,
  minWidth = 150,
  minHeight = 100,
  direction = "both",
}: LiquidGlassResizableProps) {
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { ...size };

      const handleMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startPos.current.x;
        const dy = ev.clientY - startPos.current.y;
        setSize({
          width: Math.max(minWidth, startSize.current.width + dx),
          height: Math.max(minHeight, startSize.current.height + dy),
        });
      };

      const handleUp = () => {
        setIsResizing(false);
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
    },
    [size, minWidth, minHeight]
  );

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "glass-blur-sm glass-surface glass-border",
        className
      )}
      style={{
        width: direction !== "vertical" ? size.width : undefined,
        height: direction !== "horizontal" ? size.height : undefined,
      }}
      animate={{ cursor: isResizing ? "nwse-resize" : "default" }}
    >
      <div className="p-4 overflow-auto h-full">{children}</div>

      {/* Resize handle */}
      {(direction === "both" || direction === "horizontal") && (
        <div
          onMouseDown={startResize}
          className={cn(
            "absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize",
            "flex items-end justify-end p-0.5"
          )}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-[var(--lg-text-muted)]">
            <path d="M0 8L8 0M2 8L8 2M4 8L8 4" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
