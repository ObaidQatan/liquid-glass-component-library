import { useCallback } from "react";
import type { MutableRefObject, Ref } from "react";
import { useTheme } from "./ThemeProvider";

/** Merge a callback ref with one or more mutable/callback refs. */
export function mergeRefs<T>(...refs: Array<Ref<T> | null | undefined>): (value: T | null) => void {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
  };
}

type SlidePosition = "left" | "right" | "top" | "bottom";

/**
 * Ref callback that triggers a CSS animation on all glass children every time
 * an overlay opens. The animation starts blur/saturation at 0 and ramps them
 * up to the inherited global values.
 *
 * Attach the returned ref to the overlay's fixed-position root. We use a
 * data attribute so the animation is driven by CSS instead of React state,
 * avoiding production scheduler delays that were causing the intro style to
 * stick around for multiple frames.
 */
export function useGlassOverlayRootStyle(_isOpen?: boolean) {
  // No-op ref callback. The previous blur/saturation ramp animation has been
  // removed so glass surfaces render at their full configured blur from the
  // first frame, making overlays feel crisp immediately while their opacity
  // and scale still animate.
  return useCallback(() => {
    // No-op ref callback kept for API compatibility.
  }, []);
}

const glassSpring = { type: "spring" as const, stiffness: 400, damping: 30 };
const liquidSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 16,
  mass: 0.9,
};
const liquidStiffSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 38,
};

interface TransitionOptions {
  /** Use a stiffer, less bouncy spring in liquid-glass mode (e.g. for edge-aligned sheets/menus). */
  stiff?: boolean;
  delay?: number;
  [key: string]: unknown;
}

/**
 * Mode-aware default transition.
 * - "glass" keeps the snappy, low-bounce feel.
 * - "liquid-glass" uses a softer, bouncier spring by default.
 * - Pass `{ stiff: true }` for liquid-glass edge panels where spring overshoot
 *   would reveal the screen edge.
 */
export function useLiquidTransition(override?: TransitionOptions) {
  const { mode } = useTheme();

  const { stiff, ...rest } = override || {};

  if (mode === "glass") {
    return { ...glassSpring, ...rest };
  }

  const base = stiff ? liquidStiffSpring : liquidSpring;

  // If the caller passed their own spring params, keep the liquid-glass base
  // feel unless they explicitly override stiffness/damping/mass.
  if (!override || Object.keys(rest).length === 0) {
    return { ...base, ...rest };
  }

  const { type, stiffness, damping, mass, ...extras } = rest;
  return { ...base, ...extras };
}

/** Center overlay enter/exit variants. */
export function useLiquidOverlayVariants() {
  const { mode } = useTheme();

  if (mode === "glass") {
    return {
      // Keep the glass surface fully opaque from frame 1 so the overlay looks
      // crisp immediately. The scale/Y motion still gives it a smooth entrance.
      initial: { opacity: 1, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
    };
  }

  return {
    initial: { opacity: 1, scale: 0.82, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.08, y: -12 },
  };
}

interface SlideVariantsOptions {
  /** Use a shorter 100% offset in liquid-glass mode to prevent overshoot past the screen edge. */
  stiff?: boolean;
}

/** Slide-in overlay variants for drawers/sheets/menus. */
export function useLiquidSlideVariants(
  position: SlidePosition,
  options?: SlideVariantsOptions
) {
  const { mode } = useTheme();
  const offset = mode === "liquid-glass" && !options?.stiff ? "110%" : "100%";

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
