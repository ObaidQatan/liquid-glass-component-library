import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { KubeProfile } from "./kube/profiles";

type Theme = "dark" | "light";
export type GlassMode = "glass" | "liquid-glass";

export interface GlassSettings {
  blur: number;
  transparency: number;
  reflection: number;
  fluidity: number;
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
  blur: 50,
  transparency: 50,
  reflection: 50,
  fluidity: 50,
};

const defaultLiquidGlass: LiquidGlassSettings = {
  profile: "convex-circle",
  bezel: 55,
  refraction: 90,
  thickness: 90,
  lightAngle: -150,
  specularOpacity: 50,
  transparency: 50,
  blur: 25,
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
    const root = document.documentElement;
    root.style.setProperty("--lg-blur", `${glass.blur}`);
    root.style.setProperty("--lg-transparency", `${glass.transparency}`);
    root.style.setProperty("--lg-reflection", `${glass.reflection}`);
    root.style.setProperty("--lg-fluidity", `${glass.fluidity}`);
    localStorage.setItem("lg-glass", JSON.stringify(glass));
  }, [glass]);

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
    </ThemeContext.Provider>
  );
}
