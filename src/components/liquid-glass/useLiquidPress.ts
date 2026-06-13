import { useState, useCallback, type PointerEvent } from "react";

export interface LiquidPressState {
  isPressed: boolean;
  x: number;
  y: number;
}

/**
 * Tracks pointer-based press state and the contact point (0-100%) for a
 * liquid-glass press effect. Respects the `disabled` flag and releases on
 * pointer up / leave / cancel.
 */
export function useLiquidPress<T extends HTMLElement>(disabled = false) {
  const [state, setState] = useState<LiquidPressState>({
    isPressed: false,
    x: 50,
    y: 50,
  });

  const onPointerDown = useCallback(
    (e: PointerEvent<T>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setState({
        isPressed: true,
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [disabled]
  );

  const onPointerUp = useCallback(() => {
    setState((s) => ({ ...s, isPressed: false }));
  }, []);

  const onPointerLeave = useCallback(() => {
    setState((s) => ({ ...s, isPressed: false }));
  }, []);

  const onPointerCancel = useCallback(() => {
    setState((s) => ({ ...s, isPressed: false }));
  }, []);

  return {
    state,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
  };
}
