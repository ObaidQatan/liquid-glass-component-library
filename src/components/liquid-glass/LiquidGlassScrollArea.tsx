import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useState, useRef, useEffect, type ReactNode } from "react";

interface LiquidGlassScrollAreaProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string;
  showScrollbar?: boolean;
}

export function LiquidGlassScrollArea({
  children,
  className,
  maxHeight = "300px",
  showScrollbar = true,
}: LiquidGlassScrollAreaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(30);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      const thumb = Math.max(30, (clientHeight / scrollHeight) * clientHeight);
      setScrollProgress(progress);
      setThumbHeight(thumb);
    };
    el.addEventListener("scroll", update);
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={contentRef}
        className={cn(
          "overflow-y-auto overflow-x-hidden pr-2",
          showScrollbar && "scrollbar-thin"
        )}
        style={{ maxHeight }}
      >
        {children}
      </div>
      {showScrollbar && (
        <div className="absolute right-1 top-2 bottom-2 w-1 rounded-full bg-[var(--lg-border-subtle)]">
          <motion.div
            className="w-full rounded-full bg-[var(--lg-border)] hover:bg-[var(--lg-text-muted)] transition-colors"
            style={{
              height: thumbHeight,
              y: scrollProgress * (parseInt(maxHeight) - thumbHeight - 16),
            }}
          />
        </div>
      )}
    </div>
  );
}
