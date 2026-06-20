import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { KubeProfile } from "./kube/profiles";
import {
  KubeFilter,
  supportsKubeBackdropFilter,
  kubePropsFromLiquidGlass,
  LIQUID_GLASS_FILTER_ID,
  LIQUID_GLASS_FILTER_LITE_ID,
} from "./kube";

type Theme = "dark" | "light";
export type GlassMode = "glass" | "liquid-glass";

export interface GlassSettings {
  blur: number;
  transparency: number;
  saturation: number;
}

export interface LiquidGlassSettings {
  profile: KubeProfile;
  bezel: number;
  refraction: number;
  thickness: number;
  lightAngle: number;
  specularOpacity: number;
  transparency: number;
  blur: number;
  saturation: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  mode: GlassMode;
  setMode: (mode: GlassMode) => void;
  toggleMode: () => void;
  glass: GlassSettings;
  setGlass: (settings: Partial<GlassSettings>) => void;
  resetGlass: () => void;
  liquidGlass: LiquidGlassSettings;
  setLiquidGlass: (settings: Partial<LiquidGlassSettings>) => void;
  resetLiquidGlass: () => void;
}

const defaultGlass: GlassSettings = {
  blur: 17,
  transparency: 10,
  saturation: 100,
};

const defaultLiquidGlass: LiquidGlassSettings = {
  profile: "convex-circle",
  bezel: 9,
  refraction: 90,
  thickness: 120,
  lightAngle: -150,
  specularOpacity: 10,
  transparency: 20,
  blur: 10,
  saturation: 100,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
  mode: "glass",
  setMode: () => {},
  toggleMode: () => {},
  glass: defaultGlass,
  setGlass: () => {},
  resetGlass: () => {},
  liquidGlass: defaultLiquidGlass,
  setLiquidGlass: () => {},
  resetLiquidGlass: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children, defaultTheme = "dark" }: { children: ReactNode; defaultTheme?: Theme }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lg-theme");
      if (stored === "light" || stored === "dark") return stored;
    }
    return defaultTheme;
  });

  const [mode, setModeState] = useState<GlassMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lg-mode");
      if (stored === "glass" || stored === "liquid-glass") return stored;
    }
    return "glass";
  });

  const [glass, setGlassState] = useState<GlassSettings>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lg-glass");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...defaultGlass, ...parsed };
        } catch {}
      }
    }
    return defaultGlass;
  });

  const [liquidGlass, setLiquidGlassState] = useState<LiquidGlassSettings>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lg-liquid-glass");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...defaultLiquidGlass, ...parsed };
        } catch {}
      }
    }
    return defaultLiquidGlass;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("lg-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-glass-mode", mode);
    localStorage.setItem("lg-mode", mode);
  }, [mode]);

  useEffect(() => {
    const supported = supportsKubeBackdropFilter();
    document.documentElement.setAttribute(
      "data-liquid-glass-supported",
      supported ? "true" : "false"
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--lg-blur", `${glass.blur}`);
    // In liquid-glass mode the single Transparency slider controls the
    // liquid-glass config. Route that value into --lg-transparency so every
    // glass-surface* utility responds to the same control.
    root.style.setProperty(
      "--lg-transparency",
      mode === "liquid-glass" ? `${liquidGlass.transparency}` : `${glass.transparency}`
    );
    // Saturation is mode-aware so the active slider always drives the
    // backdrop-filter saturate() applied by the glass utilities.
    root.style.setProperty(
      "--lg-saturation",
      mode === "liquid-glass" ? `${liquidGlass.saturation}` : `${glass.saturation}`
    );
    localStorage.setItem("lg-glass", JSON.stringify(glass));
  }, [glass, liquidGlass, mode]);

  useEffect(() => {
    localStorage.setItem("lg-liquid-glass", JSON.stringify(liquidGlass));
  }, [liquidGlass]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleMode = () => setModeState((m) => (m === "glass" ? "liquid-glass" : "glass"));

  const setGlass = (settings: Partial<GlassSettings>) => {
    setGlassState((prev) => ({ ...prev, ...settings }));
  };

  const resetGlass = () => setGlassState(defaultGlass);

  const setLiquidGlass = (settings: Partial<LiquidGlassSettings>) => {
    setLiquidGlassState((prev) => ({ ...prev, ...settings }));
  };

  const resetLiquidGlass = () => setLiquidGlassState(defaultLiquidGlass);

  const kubeSupported = supportsKubeBackdropFilter();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === "dark",
        mode,
        setMode: setModeState,
        toggleMode,
        glass,
        setGlass,
        resetGlass,
        liquidGlass,
        setLiquidGlass,
        resetLiquidGlass,
      }}
    >
      {children}
      {mode === "liquid-glass" && kubeSupported && (
        <>
          <style>{`
            .glass-blur,
            .glass-blur-sm {
              backdrop-filter: url(#${LIQUID_GLASS_FILTER_LITE_ID}) saturate(calc(var(--lg-saturation) * 3%)) !important;
              -webkit-backdrop-filter: url(#${LIQUID_GLASS_FILTER_LITE_ID}) saturate(calc(var(--lg-saturation) * 3%)) !important;
              contain: layout !important;
            }
            .glass-blur-lg,
            .glass-blur-xl {
              backdrop-filter: url(#${LIQUID_GLASS_FILTER_ID}) saturate(calc(var(--lg-saturation) * 3%)) !important;
              -webkit-backdrop-filter: url(#${LIQUID_GLASS_FILTER_ID}) saturate(calc(var(--lg-saturation) * 3%)) !important;
              contain: layout !important;
            }
          `}</style>
          <KubeFilter
            id={LIQUID_GLASS_FILTER_ID}
            liteId={LIQUID_GLASS_FILTER_LITE_ID}
            width={1}
            height={1}
            normalized
            {...kubePropsFromLiquidGlass(liquidGlass)}
          />
        </>
      )}
    </ThemeContext.Provider>
  );
}
