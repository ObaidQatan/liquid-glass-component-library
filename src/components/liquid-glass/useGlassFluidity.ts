import { useState, useEffect } from "react";

/**
 * Reads the global `--lg-fluidity` CSS variable for motion spring tuning.
 * The variable is no longer tied to a mode-specific config slider; it falls
 * back to the CSS default (50) so components keep a consistent default feel
 * without exposing a control that doesn't belong to the active mode.
 */
export function useGlassFluidity() {
  const [fluidity, setFluidity] = useState(() => {
    if (typeof document === "undefined") return 50;
    return (
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--lg-fluidity",
        ),
      ) || 50
    );
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () =>
      setFluidity(
        parseFloat(getComputedStyle(root).getPropertyValue("--lg-fluidity")) ||
          50,
      );
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return fluidity;
}
