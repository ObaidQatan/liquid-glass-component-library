import { useTheme } from "./ThemeProvider";

type SlidePosition = "left" | "right" | "top" | "bottom";

const glassSpring = { type: "spring" as const, stiffness: 400, damping: 30 };
const liquidSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 16,
  mass: 0.9,
};

/**
 * Mode-aware default transition.
 * - "glass" keeps the snappy, low-bounce feel.
 * - "liquid-glass" uses a softer, bouncier spring.
 */
export function useLiquidTransition(override?: {
  delay?: number;
  [key: string]: unknown;
}) {
  const { mode } = useTheme();

  if (mode === "glass") {
    return override ?? glassSpring;
  }

  if (!override) return liquidSpring;

  // Keep the liquid-glass base feel; merge only extras like `delay`.
  const { type, stiffness, damping, mass, ...rest } = override;
  return { ...liquidSpring, ...rest };
}

/** Center overlay enter/exit variants. */
export function useLiquidOverlayVariants() {
  const { mode } = useTheme();

  if (mode === "glass") {
    return {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
    };
  }

  return {
    initial: { opacity: 0, scale: 0.82, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.08, y: -12 },
  };
}

/** Slide-in overlay variants for drawers/sheets/menus. */
export function useLiquidSlideVariants(position: SlidePosition) {
  const { mode } = useTheme();
  const offset = mode === "liquid-glass" ? "110%" : "100%";

  const isX = position === "left" || position === "right";
  const isNegative = position === "left" || position === "top";
  const value = isNegative ? `-${offset}` : offset;

  const initial = isX ? { x: value } : { y: value };
  const animate = isX ? { x: 0 } : { y: 0 };
  const exit = initial;

  return { initial, animate, exit };
}

/** `whileTap` scale factor. */
export function useLiquidTapScale() {
  const { mode } = useTheme();
  return mode === "liquid-glass" ? 0.84 : 0.9;
}

/** `whileHover` lift amount. */
export function useLiquidHoverLift() {
  const { mode } = useTheme();
  return mode === "liquid-glass" ? -6 : -2;
}
