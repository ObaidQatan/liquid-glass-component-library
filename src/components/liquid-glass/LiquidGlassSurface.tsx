import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useGlassSurface } from "./useGlassSurface";

interface LiquidGlassSurfaceProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
}

export function LiquidGlassSurface({
  children,
  className,
  borderRadius = 24,
}: LiquidGlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  // surface-lg uses the full kube filter in liquid-glass mode, so the Blur
  // slider and the shared transparency system apply consistently.
  const surface = useGlassSurface({ variant: "surface-lg" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn(surface.className, className)}
      style={{ ...surface.style, borderRadius }}
    >
      {/* Top sheen */}
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full z-20"
        style={{ borderRadius }}
      />

      {/* Rim specular highlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
