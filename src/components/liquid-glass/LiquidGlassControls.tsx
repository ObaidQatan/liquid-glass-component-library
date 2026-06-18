import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { LiquidGlassSlider } from "./LiquidGlassSlider";
import { SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { profileLabels } from "./kube";
import type { KubeProfile } from "./kube";

interface LiquidGlassControlsProps {
  className?: string;
}

const profiles: KubeProfile[] = [
  "convex-circle",
  "convex-squircle",
  "concave",
  "lip",
];

export function LiquidGlassControls({ className }: LiquidGlassControlsProps) {
  const {
    mode,
    glass,
    setGlass,
    resetGlass,
    liquidGlass,
    setLiquidGlass,
    resetLiquidGlass,
  } = useTheme();

  const isLiquid = mode === "liquid-glass";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative w-full max-w-xs rounded-3xl p-5 overflow-hidden",
        "glass-blur-xl glass-surface-strong glass-border",
        className
      )}
    >
      <GlassTopHighlight className="inset-x-4 top-0" opacity={0.3} />
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {isLiquid ? (
            <Sparkles size={16} className="text-liquid-blue" />
          ) : (
            <SlidersHorizontal size={16} className="text-liquid-blue" />
          )}
          <span className="text-sm font-semibold text-[var(--lg-text)]">
            {isLiquid ? "Liquid Glass Controls" : "Glass Controls"}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={isLiquid ? resetLiquidGlass : resetGlass}
          className="p-1.5 rounded-lg hover:bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)]"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {isLiquid ? (
        <div className="space-y-5">
          <div>
            <span className="text-xs text-[var(--lg-text-secondary)] block mb-2">
              Surface profile
            </span>
            <div className="flex flex-wrap gap-2">
              {profiles.map((p) => (
                <button
                  key={p}
                  onClick={() => setLiquidGlass({ profile: p })}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors",
                    liquidGlass.profile === p
                      ? "bg-liquid-blue text-white"
                      : "bg-white/10 text-[var(--lg-text-secondary)] hover:bg-white/15"
                  )}
                >
                  {profileLabels[p]}
                </button>
              ))}
            </div>
          </div>

          <LiquidGlassSlider
            label="Bezel"
            value={liquidGlass.bezel}
            min={8}
            max={80}
            onChange={(v) => setLiquidGlass({ bezel: v })}
            valueFormatter={(v) => `${v}px`}
          />
          <LiquidGlassSlider
            label="Refraction"
            value={liquidGlass.refraction}
            min={0}
            max={100}
            onChange={(v) => setLiquidGlass({ refraction: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Thickness"
            value={liquidGlass.thickness}
            min={10}
            max={120}
            onChange={(v) => setLiquidGlass({ thickness: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Light angle"
            value={liquidGlass.lightAngle}
            min={-180}
            max={180}
            step={5}
            onChange={(v) => setLiquidGlass({ lightAngle: v })}
            valueFormatter={(v) => `${v}°`}
          />
          <LiquidGlassSlider
            label="Specular"
            value={liquidGlass.specularOpacity}
            min={0}
            max={100}
            onChange={(v) => setLiquidGlass({ specularOpacity: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Transparency"
            value={liquidGlass.transparency}
            min={0}
            max={100}
            onChange={(v) => setLiquidGlass({ transparency: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Blur"
            value={liquidGlass.blur}
            min={0}
            max={100}
            onChange={(v) => setLiquidGlass({ blur: v })}
            valueFormatter={(v) => `${v}%`}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <LiquidGlassSlider
            label="Blur"
            value={glass.blur}
            onChange={(v) => setGlass({ blur: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Transparency"
            value={glass.transparency}
            onChange={(v) => setGlass({ transparency: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Reflection"
            value={glass.reflection}
            onChange={(v) => setGlass({ reflection: v })}
            valueFormatter={(v) => `${v}%`}
          />
          <LiquidGlassSlider
            label="Fluidity"
            value={glass.fluidity}
            onChange={(v) => setGlass({ fluidity: v })}
            valueFormatter={(v) => `${v}%`}
          />
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[var(--lg-border)] grid grid-cols-4 gap-2 text-center">
        {isLiquid ? (
          <>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--lg-text)]">
                {profileLabels[liquidGlass.profile]}
              </div>
              <div className="text-[10px] text-[var(--lg-text-muted)]">Profile</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--lg-text)]">
                {liquidGlass.bezel}px
              </div>
              <div className="text-[10px] text-[var(--lg-text-muted)]">Bezel</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--lg-text)]">
                {liquidGlass.refraction}%
              </div>
              <div className="text-[10px] text-[var(--lg-text-muted)]">Refract</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[var(--lg-text)]">
                {liquidGlass.thickness}%
              </div>
              <div className="text-[10px] text-[var(--lg-text-muted)]">Thick</div>
            </div>
          </>
        ) : (
          <>
            {[
              {
                label: "Blur",
                value: `${Math.round((glass.blur / 100) * 60)}px`,
              },
              {
                label: "Alpha",
                value: `${Math.round((glass.transparency / 100) * 80)}%`,
              },
              {
                label: "Glow",
                value: `${Math.round((glass.reflection / 100) * 40)}%`,
              },
              {
                label: "Snap",
                value: `${Math.round((glass.fluidity / 100) * 500)}`,
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <div className="text-xs font-semibold text-[var(--lg-text)]">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[var(--lg-text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
