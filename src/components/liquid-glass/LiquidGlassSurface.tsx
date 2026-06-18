import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTheme } from "./ThemeProvider";
import { useGlassSurface } from "./useGlassSurface";
import { KubeFilter, supportsKubeBackdropFilter } from "./kube";

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

  const [size, setSize] = useState({ width: 600, height: 400 });

  const surface = useGlassSurface(
    mode === "liquid-glass" ? { variant: "liquid-glass" } : { variant: "surface-strong" }
  );

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const update = () => {
      setSize({
        width: Math.max(1, el.offsetWidth),
        height: Math.max(1, el.offsetHeight),
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const isLiquid = mode === "liquid-glass";
  const supported = isLiquid ? supportsKubeBackdropFilter() : true;

  const refractionScale = isLiquid
    ? (liquidGlass.refraction / 100) *
      Math.max(size.width, size.height) *
      0.28 *
      (liquidGlass.thickness / 90)
    : 0;

  const blurPx = isLiquid ? (liquidGlass.blur / 100) * 30 : 0;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(surface.className, className)}
        style={surface.style}
      >
        {/* Fallback for browsers without SVG backdrop-filter support */}
        {isLiquid && !supported && (
          <div className="absolute inset-0 -z-10 glass-blur-xl glass-surface-strong" />
        )}

        {/* Surface tint — transparency controls how much of the refracted backdrop shows through */}
        {isLiquid && (
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${1 - liquidGlass.transparency / 100})`,
            }}
          />
        )}

        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full z-20" />

        {/* Rim specular highlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-0"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
          }}
        />

        <div className="relative z-10 h-full">{children}</div>
      </motion.div>

      {isLiquid && supported && surface.filterId && (
        <KubeFilter
          id={surface.filterId}
          width={size.width}
          height={size.height}
          bezel={liquidGlass.bezel}
          profile={liquidGlass.profile}
          thickness={liquidGlass.thickness / 100}
          refractionScale={refractionScale}
          lightAngle={liquidGlass.lightAngle}
          shininess={6}
          specularOpacity={liquidGlass.specularOpacity / 100}
          borderRadius={borderRadius}
          blur={blurPx}
        />
      )}
    </>
  );
}
