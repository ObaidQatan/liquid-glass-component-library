import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTheme } from "./ThemeProvider";
import { useGlassSurface } from "./useGlassSurface";

interface LiquidGlassSurfaceProps {
  children: ReactNode;
  className?: string;
  mode?: "glass" | "liquid-glass";
  borderRadius?: number;
}

export function LiquidGlassSurface({
  children,
  className,
  mode: modeProp,
  borderRadius = 24,
}: LiquidGlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mode: globalMode, liquidGlass } = useTheme();
  const mode = modeProp ?? globalMode;
  const isLiquid = mode === "liquid-glass";

  const surface = useGlassSurface({ variant: "surface-strong" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn(surface.className, className)}
      style={{ ...surface.style, borderRadius }}
    >
      {/* Surface tint — transparency controls how much of the refracted backdrop shows through */}
      {isLiquid && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            borderRadius,
            backgroundColor: `rgba(255, 255, 255, ${1 - liquidGlass.transparency / 100})`,
          }}
        />
      )}

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
