import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { cn } from "./utils/cn";
import {
  LiquidGlassSurface,
  LiquidGlassToggle,
  LiquidGlassSlider,
  useTheme,
} from "./components/liquid-glass";
import { profileLabels } from "./components/liquid-glass/kube";
import type { KubeProfile } from "./components/liquid-glass/kube";
import { navigate } from "./router";

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  formatter?: (v: number) => string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-[var(--lg-text-secondary)]">
        <span>{label}</span>
        <span>{formatter ? formatter(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-liquid-blue"
      />
    </div>
  );
}

function ProfileChip({
  profile,
  active,
  onClick,
}: {
  profile: KubeProfile;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
        active
          ? "bg-liquid-blue text-white"
          : "bg-white/10 text-[var(--lg-text-secondary)] hover:bg-white/15",
      )}
    >
      {profileLabels[profile]}
    </button>
  );
}

/**
 * The scrolling page background that the glass card refracts through
 * backdrop-filter. This is the real content behind the card, not a clone.
 */
function ColorBars({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <img
        src={`https://picsum.photos/id/15/${window.innerWidth}/${window.innerHeight}`}
        alt=""
        className="w-screen h-screen object-cover"
      />
    </div>
  );
}

export default function Playground() {
  const { mode, toggleMode, glass, setGlass, liquidGlass, setLiquidGlass } =
    useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-[250vh] transition-colors duration-500">
      <AnimatedBackground />

      {/* Scrolling page background behind the fixed card */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute left-0 right-0" style={{ y: -scrollY }}>
          <ColorBars />
        </motion.div>
      </div>

      {/* Fixed card in the center */}
      <div className="fixed inset-0 z-10 flex items-center justify-center px-6 py-12 pointer-events-none">
        <LiquidGlassSurface className="pointer-events-auto w-full max-w-3xl min-h-[420px]">
          <div className="p-8 md:p-10 flex flex-col h-full min-h-[inherit]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-liquid-blue to-liquid-purple flex items-center justify-center text-white text-sm font-bold">
                  {mode === "liquid-glass" ? "L" : "G"}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--lg-text)]">
                    {mode === "liquid-glass" ? "Liquid Glass Lab" : "Glass Lab"}
                  </h2>
                  <p className="text-xs text-[var(--lg-text-muted)]">
                    {mode === "liquid-glass"
                      ? `${profileLabels[liquidGlass.profile]} profile`
                      : "Standard frosted glass"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-liquid-blue/15 text-liquid-blue text-[10px] font-semibold uppercase tracking-wider">
                  {mode === "liquid-glass" ? "Chrome only" : "All browsers"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-6 p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-sm text-[var(--lg-text-secondary)]">
                {mode === "liquid-glass" ? "Liquid glass mode" : "Glass mode"}
              </span>
              <LiquidGlassToggle
                checked={mode === "liquid-glass"}
                onChange={toggleMode}
                variant="ios26"
                activeTint="#3b82f6"
              />
            </div>

            <p className="text-sm text-[var(--lg-text-secondary)] leading-relaxed mb-8">
              {mode === "liquid-glass"
                ? "The fixed glass card refracts the real scrolling background behind it using backdrop-filter: url(#id), inspired by kube.io's liquid glass article."
                : "The card uses the standard frosted glass utilities from the library—backdrop-filter blur, translucent surface, border, and highlight."}
            </p>

            {/* Controls */}
            <div className="mt-auto grid md:grid-cols-2 gap-x-8 gap-y-5">
              {mode === "liquid-glass" ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-[var(--lg-text-secondary)] block mb-2">
                        Surface profile
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            "convex-circle",
                            "convex-squircle",
                            "concave",
                            "lip",
                          ] as KubeProfile[]
                        ).map((p) => (
                          <ProfileChip
                            key={p}
                            profile={p}
                            active={liquidGlass.profile === p}
                            onClick={() => setLiquidGlass({ profile: p })}
                          />
                        ))}
                      </div>
                    </div>
                    <Slider
                      label="Bezel width"
                      value={liquidGlass.bezel}
                      min={8}
                      max={80}
                      onChange={(v) => setLiquidGlass({ bezel: v })}
                      formatter={(v) => `${v}px`}
                    />
                    <Slider
                      label="Refraction"
                      value={liquidGlass.refraction}
                      min={0}
                      max={100}
                      onChange={(v) => setLiquidGlass({ refraction: v })}
                      formatter={(v) => `${v}%`}
                    />
                  </div>
                  <div className="space-y-4">
                    <Slider
                      label="Glass thickness"
                      value={liquidGlass.thickness}
                      min={10}
                      max={120}
                      onChange={(v) => setLiquidGlass({ thickness: v })}
                    />
                    <Slider
                      label="Light angle"
                      value={liquidGlass.lightAngle}
                      min={-180}
                      max={180}
                      step={5}
                      onChange={(v) => setLiquidGlass({ lightAngle: v })}
                      formatter={(v) => `${v}°`}
                    />
                    <Slider
                      label="Specular opacity"
                      value={liquidGlass.specularOpacity}
                      min={0}
                      max={100}
                      onChange={(v) => setLiquidGlass({ specularOpacity: v })}
                      formatter={(v) => `${v}%`}
                    />
                    <Slider
                      label="Transparency"
                      value={liquidGlass.transparency}
                      min={0}
                      max={100}
                      onChange={(v) => setLiquidGlass({ transparency: v })}
                      formatter={(v) => `${v}%`}
                    />
                    <Slider
                      label="Blur"
                      value={liquidGlass.blur}
                      min={0}
                      max={100}
                      onChange={(v) => setLiquidGlass({ blur: v })}
                      formatter={(v) => `${Math.round((v / 100) * 30)}px`}
                    />
                    <Slider
                      label="Saturation"
                      value={liquidGlass.saturation}
                      min={0}
                      max={200}
                      onChange={(v) => setLiquidGlass({ saturation: v })}
                      formatter={(v) => `${v}%`}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
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
                  </div>
                  <div className="space-y-4">
                    <LiquidGlassSlider
                      label="Saturation"
                      value={glass.saturation}
                      min={0}
                      max={200}
                      onChange={(v) => setGlass({ saturation: v })}
                      valueFormatter={(v) => `${v}%`}
                    />
                  </div>
                </>
              )}
            </div>

            {mode === "liquid-glass" && (
              <p className="mt-6 text-[10px] text-[var(--lg-text-muted)]">
                Liquid glass implementation inspired by{" "}
                <a
                  href="https://www.kube.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[var(--lg-text-secondary)]"
                >
                  kube.io
                </a>
                .
              </p>
            )}
          </div>
        </LiquidGlassSurface>
      </div>

      {/* Floating back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => navigate("/")}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl glass-blur glass-surface glass-border text-sm text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] transition-colors"
      >
        Back to home
      </motion.button>
    </div>
  );
}
