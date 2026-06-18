import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { cn } from "./utils/cn";
import {
  KubeFilter,
  supportsKubeBackdropFilter,
  useKubeFilterId,
  profileLabels,
} from "./components/liquid-glass/kube";
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
      {/* {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-10 md:h-14 rounded-xl w-full",
            i % 4 === 0 && "bg-gradient-to-r from-liquid-blue to-liquid-purple",
            i % 4 === 1 && "bg-gradient-to-r from-liquid-pink to-liquid-rose",
            i % 4 === 2 && "bg-gradient-to-r from-liquid-emerald to-liquid-cyan",
            i % 4 === 3 && "bg-gradient-to-r from-liquid-amber to-liquid-orange"
          )}
        />
      ))} */}
      {/* Keep the image background for a better demo */}
      <img
        src={`https://picsum.photos/id/19/${window.innerWidth}/${window.innerHeight}`}
        alt=""
        className="w-screen h-screen object-cover"
      />
    </div>
  );
}

export default function Kube() {
  const cardRef = useRef<HTMLDivElement>(null);
  const filterId = useKubeFilterId();
  const supported = supportsKubeBackdropFilter();

  const [size, setSize] = useState({ width: 600, height: 400 });
  const [scrollY, setScrollY] = useState(0);
  const [profile, setProfile] = useState<KubeProfile>("convex-circle");
  const [bezel, setBezel] = useState(55);
  const [refraction, setRefraction] = useState(90);
  const [thickness, setThickness] = useState(90);
  const [lightAngle, setLightAngle] = useState(-150);
  const [specularOpacity, setSpecularOpacity] = useState(50);
  const [shininess] = useState(6);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const update = () => {
      // Use offsetWidth/offsetHeight so transforms (e.g. the mount scale
      // animation) do not skew the displacement map size.
      setSize({
        width: Math.max(1, el.offsetWidth),
        height: Math.max(1, el.offsetHeight),
      });
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const refractionScale =
    (refraction / 100) * Math.max(size.width, size.height) * 0.28;

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
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pointer-events-auto relative w-full max-w-3xl min-h-[420px] rounded-3xl overflow-hidden border border-white/25 shadow-2xl"
          style={
            supported ? { backdropFilter: `url(#${filterId})` } : undefined
          }
        >
          {/* Fallback blurred background for browsers without SVG backdrop-filter support */}
          {!supported && (
            <div className="absolute inset-0 -z-10 glass-blur-xl glass-surface-strong" />
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

          {/* Card content */}
          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[inherit]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-liquid-blue to-liquid-purple flex items-center justify-center text-white text-sm font-bold">
                  K
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--lg-text)]">
                    Refraction Lab
                  </h2>
                  <p className="text-xs text-[var(--lg-text-muted)]">
                    {profileLabels[profile]} profile
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-liquid-blue/15 text-liquid-blue text-[10px] font-semibold uppercase tracking-wider">
                {supported ? "Chrome only" : "Fallback"}
              </span>
            </div>

            <p className="text-sm text-[var(--lg-text-secondary)] leading-relaxed mb-8">
              {supported
                ? "The fixed glass card refracts the real scrolling background behind it using backdrop-filter: url(#id), exactly as kube.io describes."
                : "Your browser does not support SVG filters in backdrop-filter. The card falls back to a regular glass blur."}
            </p>

            {/* Controls */}
            <div className="mt-auto grid md:grid-cols-2 gap-x-8 gap-y-5">
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
                        active={profile === p}
                        onClick={() => setProfile(p)}
                      />
                    ))}
                  </div>
                </div>
                <Slider
                  label="Bezel width"
                  value={bezel}
                  min={8}
                  max={80}
                  onChange={setBezel}
                  formatter={(v) => `${v}px`}
                />
                <Slider
                  label="Refraction"
                  value={refraction}
                  min={0}
                  max={100}
                  onChange={setRefraction}
                  formatter={(v) => `${v}%`}
                />
              </div>
              <div className="space-y-4">
                <Slider
                  label="Glass thickness"
                  value={thickness}
                  min={10}
                  max={120}
                  onChange={setThickness}
                />
                <Slider
                  label="Light angle"
                  value={lightAngle}
                  min={-180}
                  max={180}
                  step={5}
                  onChange={setLightAngle}
                  formatter={(v) => `${v}°`}
                />
                <Slider
                  label="Specular opacity"
                  value={specularOpacity}
                  min={0}
                  max={100}
                  onChange={setSpecularOpacity}
                  formatter={(v) => `${v}%`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => navigate("/")}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl glass-blur glass-surface glass-border text-sm text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] transition-colors"
      >
        Back to playground
      </motion.button>

      {/* SVG filter definition */}
      {supported && (
        <KubeFilter
          id={filterId}
          width={size.width}
          height={size.height}
          bezel={bezel}
          profile={profile}
          thickness={thickness / 100}
          refractionScale={refractionScale}
          lightAngle={lightAngle}
          shininess={shininess}
          specularOpacity={specularOpacity / 100}
          borderRadius={24}
        />
      )}
    </div>
  );
}
