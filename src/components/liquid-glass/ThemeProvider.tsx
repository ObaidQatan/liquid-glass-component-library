import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

export interface GlassSettings {
  blur: number;
  transparency: number;
  reflection: number;
  fluidity: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  glass: GlassSettings;
  setGlass: (settings: Partial<GlassSettings>) => void;
  resetGlass: () => void;
}

const defaultGlass: GlassSettings = {
  blur: 50,
  transparency: 50,
  reflection: 50,
  fluidity: 50,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
  glass: defaultGlass,
  setGlass: () => {},
  resetGlass: () => {},
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
    root.style.setProperty("--lg-blur", `${glass.blur}`);
    root.style.setProperty("--lg-transparency", `${glass.transparency}`);
    root.style.setProperty("--lg-reflection", `${glass.reflection}`);
    root.style.setProperty("--lg-fluidity", `${glass.fluidity}`);
    localStorage.setItem("lg-glass", JSON.stringify(glass));
  }, [glass]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const setGlass = (settings: Partial<GlassSettings>) => {
    setGlassState((prev) => ({ ...prev, ...settings }));
  };

  const resetGlass = () => setGlassState(defaultGlass);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark", glass, setGlass, resetGlass }}>
      {children}
    </ThemeContext.Provider>
  );
}
