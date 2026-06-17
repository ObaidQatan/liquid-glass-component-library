import { useState, useMemo, useEffect, useRef, type ReactNode, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Layers,
  Palette,
  Sparkles,
  ArrowLeft,
  Moon,
  Sun,
  Terminal,
  Package,
  Code2,
  Hash,
  Bell,
  MoreVertical,
  BarChart3,
  Image,
  Smartphone,
  Command,
  MessageSquare,
  LayoutGrid,
  X,
} from "lucide-react";
import { cn } from "./utils/cn";
import { useTheme } from "./components/liquid-glass";
import { docsComponents, docsCategories, type DocsComponentEntry } from "./docs-data";
import { useRoute, navigate, type Route } from "./router";
import componentDemos from "./docs-demos";

/* ───────── Types & constants ───────── */
type DocsSection = "intro" | "installation" | "theme" | "glass" | "components";

const SECTIONS: DocsSection[] = ["intro", "installation", "theme", "glass", "components"];

const sectionMeta: Record<
  DocsSection,
  { label: string; icon: ElementType<{ size?: number; className?: string }> }
> = {
  intro: { label: "Getting Started", icon: BookOpen },
  installation: { label: "Installation", icon: Package },
  theme: { label: "Theme System", icon: Palette },
  glass: { label: "Glass System", icon: Layers },
  components: { label: "Components", icon: Hash },
};

const categoryIcons: Record<string, ElementType<{ size?: number; className?: string }>> = {
  "Core & Theme": Layers,
  Layout: LayoutGrid,
  "Buttons & Controls": Command,
  "Inputs & Forms": MessageSquare,
  Feedback: Bell,
  "Overlays & Menus": MoreVertical,
  "Data Display": BarChart3,
  "Media & Content": Image,
  Mobile: Smartphone,
};

const CODE_COLLAPSE_LINES = 12;

/* ───────── Router helpers ───────── */
function buildDocsUrl(params: Record<string, string>) {
  const sp = new URLSearchParams(params);
  return `/docs?${sp.toString()}`;
}

function useDocsRoute() {
  const route = useRoute();
  const topic = route.searchParams.get("topic");
  const rawSection = route.searchParams.get("section") as DocsSection | null;
  const section: DocsSection = SECTIONS.includes(rawSection as DocsSection)
    ? (rawSection as DocsSection)
    : "intro";
  const category = route.searchParams.get("category");
  const selectedComponent = useMemo(
    () => docsComponents.find((c) => c.id === topic) || null,
    [topic]
  );
  return { route, topic, section, category, selectedComponent };
}

function useDocsScrollRestore(route: Route) {
  useEffect(() => {
    const key = `docs:scroll:${route.pathname}${route.search}`;
    const saved = sessionStorage.getItem(key);
    let raf = 0;
    if (saved) {
      raf = requestAnimationFrame(() =>
        window.scrollTo({ top: parseInt(saved, 10), behavior: "auto" })
      );
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      sessionStorage.setItem(key, String(window.scrollY));
    };
  }, [route.pathname, route.search]);
}

/* ───────── UI primitives ───────── */
function CodeBlock({
  code,
  filename,
  language = "tsx",
  maxLines = CODE_COLLAPSE_LINES,
}: {
  code: string;
  filename?: string;
  language?: string;
  maxLines?: number;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const lines = useMemo(() => code.split("\n"), [code]);
  const hasMore = lines.length > maxLines;
  const displayCode = !hasMore || expanded ? code : lines.slice(0, maxLines).join("\n");
  const remaining = Math.max(0, lines.length - maxLines);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-[var(--lg-border)] bg-black/40 my-6">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--lg-border-subtle)] bg-white/5">
          <div className="flex items-center gap-2">
            <Code2 size={14} className="text-[var(--lg-text-muted)]" />
            <span className="text-xs font-medium text-[var(--lg-text-secondary)]">{filename}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--lg-text-muted)]">{language}</span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--lg-text-muted)] bg-[var(--lg-border-subtle)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text-secondary)] transition-colors z-10"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        className={cn(
          "p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[var(--lg-text-secondary)]",
          hasMore && "pb-12"
        )}
      >
        <code>{displayCode}</code>
      </pre>
      {hasMore && !expanded && (
        <div className="absolute bottom-10 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      )}
      {hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--lg-text-secondary)] glass-blur-sm glass-surface-strong glass-border hover:bg-white/10 transition-colors"
        >
          {expanded ? "Show less" : `Expand ${remaining} more line${remaining === 1 ? "" : "s"}`}
        </button>
      )}
    </div>
  );
}

function PropTable({ props }: { props: DocsComponentEntry["props"] }) {
  if (!props.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--lg-border)] my-6">
      <table className="w-full text-sm">
        <thead className="bg-[var(--lg-border-subtle)]">
          <tr>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Prop</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Type</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Req</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--lg-border-subtle)]">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-[var(--lg-border-subtle)]/50">
              <td className="px-4 py-3 font-mono text-xs text-[var(--lg-text)] align-top">{p.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-liquid-blue align-top">{p.type}</td>
              <td className="px-4 py-3 text-xs text-[var(--lg-text-muted)] align-top">{p.required ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-xs text-[var(--lg-text-secondary)] align-top">{p.description || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-[var(--lg-text)] mt-12 mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="text-lg font-semibold text-[var(--lg-text)] mt-8 mb-3 scroll-mt-28">
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[var(--lg-text-secondary)] leading-relaxed mb-4">{children}</p>;
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-[var(--lg-border-subtle)] text-xs font-mono text-[var(--lg-text-secondary)]">
      {children}
    </code>
  );
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl glass-blur glass-surface glass-border glass-highlight"
    >
      {isDark ? <Moon size={16} className="text-liquid-amber" /> : <Sun size={16} className="text-liquid-amber" />}
    </motion.button>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return text;
  const re = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-liquid-blue/20 text-[var(--lg-text)] rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ───────── Static docs content ───────── */
const indexCssSample = `@import "tailwindcss";

@theme {
  --color-glass-50: rgba(255, 255, 255, 0.05);
  --color-liquid-blue: #3b82f6;
  --color-liquid-purple: #8b5cf6;
  --color-liquid-pink: #ec4899;
  --color-liquid-cyan: #06b6d4;
  --color-liquid-emerald: #10b981;
  --color-liquid-amber: #f59e0b;
  --color-liquid-rose: #f43f5e;
}

@layer base {
  :root {
    --lg-blur: 50;
    --lg-transparency: 50;
    --lg-reflection: 50;
    --lg-fluidity: 50;
  }

  .dark {
    --lg-bg: #0a0a0f;
    --lg-text: #f8fafc;
    --lg-text-secondary: rgba(255,255,255,0.55);
    --lg-text-muted: rgba(255,255,255,0.35);
    --lg-surface: linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06),rgba(255,255,255,0.02));
    --lg-surface-strong: linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.10),rgba(255,255,255,0.04));
    --lg-border: color-mix(in srgb, white calc(var(--lg-transparency) * 0.24%), transparent);
    color-scheme: dark;
  }

  .light {
    --lg-bg: #f2f1f6;
    --lg-text: #1c1c1e;
    --lg-text-secondary: rgba(0,0,0,0.55);
    --lg-text-muted: rgba(0,0,0,0.32);
    --lg-surface: linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.52),rgba(255,255,255,0.38));
    --lg-surface-strong: linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.62),rgba(255,255,255,0.48));
    --lg-border: color-mix(in srgb, black calc(var(--lg-transparency) * 0.16%), transparent);
    color-scheme: light;
  }
}

@layer utilities {
  .glass-blur { backdrop-filter: blur(calc(var(--lg-blur) * 0.48px)) saturate(180%); }
  .glass-blur-sm { backdrop-filter: blur(calc(var(--lg-blur) * 0.24px)) saturate(160%); }
  .glass-blur-lg { backdrop-filter: blur(calc(var(--lg-blur) * 0.8px)) saturate(200%); }
  .glass-blur-xl { backdrop-filter: blur(calc(var(--lg-blur) * 1.2px)) saturate(220%); }

  .glass-surface {
    background: linear-gradient(135deg,
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-stop-1)), transparent),
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-stop-2)), transparent),
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-stop-3)), transparent)
    );
  }

  .glass-surface-strong {
    background: linear-gradient(135deg,
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-strong-stop-1)), transparent),
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-strong-stop-2)), transparent),
      color-mix(in srgb, white calc(var(--lg-transparency) * var(--lg-surface-strong-stop-3)), transparent)
    );
  }

  .glass-border { border: 1px solid var(--lg-border); }

  .glass-highlight {
    box-shadow:
      inset 0 1px 0 var(--lg-highlight-top),
      inset 0 -1px 0 var(--lg-highlight-bottom),
      0 4px 24px var(--lg-shadow);
  }

  .glass-highlight-strong {
    box-shadow:
      inset 0 1px 0 var(--lg-highlight-top),
      inset 0 -1px 0 var(--lg-highlight-bottom),
      0 8px 32px var(--lg-shadow-strong);
  }
}

.liquid-ripple {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--lg-ripple) 0%, transparent 70%);
  animation: liquidRipple calc(0.7s + var(--lg-fluidity) * 0.004s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none;
}`;

const themeProviderUsage = `import { ThemeProvider } from "./components/liquid-glass";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}`;

const componentUsageExample = `import { LiquidGlassCard, LiquidGlassButton } from "./components/liquid-glass";

function Page() {
  return (
    <LiquidGlassCard>
      <h3 className="text-[var(--lg-text)] font-semibold">Hello Glass</h3>
      <p className="text-[var(--lg-text-secondary)] text-sm mt-1">
        This card uses the global glass system.
      </p>
      <LiquidGlassButton className="mt-4">Get Started</LiquidGlassButton>
    </LiquidGlassCard>
  );
}`;

/* ───────── Main Docs component ───────── */
export default function Docs() {
  const { route, topic, section, category, selectedComponent } = useDocsRoute();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useDocsScrollRestore(route);

  useEffect(() => {
    let title = "Liquid Glass Docs — iOS 26 Design System";
    let desc =
      "Browse 69 copy-paste React components, props, usage examples, and source code for the Liquid Glass UI kit.";
    if (selectedComponent) {
      title = `${selectedComponent.name} — Liquid Glass Docs`;
      desc = `${selectedComponent.description} Copy the source from ${selectedComponent.file}.`;
    } else if (section === "installation") {
      title = "Installation — Liquid Glass Docs";
      desc =
        "Install the peer dependencies and set up the Liquid Glass design system in your React + Vite + Tailwind CSS v4 project.";
    } else if (section === "theme") {
      title = "Theme System — Liquid Glass Docs";
      desc =
        "Learn how ThemeProvider, useTheme, and glass sliders drive light/dark modes and global glass surfaces.";
    } else if (section === "glass") {
      title = "Glass System — Liquid Glass Docs";
      desc =
        "Understand the Tailwind utilities and CSS variables that create Liquid Glass blur, surface, border, and highlight effects.";
    } else if (section === "components") {
      title = category ? `${category} — Liquid Glass Docs` : "Components — Liquid Glass Docs";
      desc = category
        ? `Browse ${category} components in the Liquid Glass UI kit.`
        : "Browse all copy-paste React glass components.";
    }
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [selectedComponent, section, category]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && selectedComponent) {
        e.preventDefault();
        navigate(
          category
            ? buildDocsUrl({ section: "components", category })
            : buildDocsUrl({ section: "components" })
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedComponent, category]);

  const filteredComponents = useMemo(() => {
    const q = search.toLowerCase();
    return docsComponents.filter((c) => {
      const matchesCategory = category ? c.category === category : true;
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const activeSectionForNav = selectedComponent ? "components" : section;
  const activeCategoryForNav = selectedComponent ? selectedComponent.category : category;

  return (
    <div className="min-h-screen bg-[var(--lg-bg)] text-[var(--lg-text)] selection:bg-liquid-blue/30">
      <DocsBackground />
      <DocsHeader search={search} setSearch={setSearch} searchInputRef={searchInputRef} />

      <div className="max-w-7xl mx-auto pt-16 flex relative z-10">
        <DocsSidebar
          section={activeSectionForNav}
          category={activeCategoryForNav}
          onSearchFocus={() => searchInputRef.current?.focus()}
        />

        <main className="flex-1 lg:ml-72 min-h-[calc(100vh-4rem)] px-6 py-10 max-w-4xl">
          <AnimatePresence mode="wait">
            {selectedComponent ? (
              <ComponentDetail key={selectedComponent.id} component={selectedComponent} category={category} />
            ) : topic ? (
              <NotFoundTopic key={topic} topic={topic} />
            ) : (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                {section === "intro" && <IntroSection />}
                {section === "installation" && <InstallationSection />}
                {section === "theme" && <ThemeSection />}
                {section === "glass" && <GlassSection />}
                {section === "components" && (
                  <ComponentGrid
                    components={filteredComponents}
                    categoryLabel={category || "All Components"}
                    search={search}
                    onSearch={setSearch}
                    activeCategory={category}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {selectedComponent && <DetailToc hasDemo={!!componentDemos[selectedComponent.id]} />}
      </div>
    </div>
  );
}

/* ───────── Layout pieces ───────── */
function DocsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[var(--lg-bg)]" />
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-liquid-blue/10 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 40, 0], y: [0, 40, -20, 0], scale: [1, 0.98, 1.04, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-liquid-purple/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 20, -40, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-liquid-pink/8 blur-[100px]"
      />
    </div>
  );
}

function DocsHeader({
  search,
  setSearch,
  searchInputRef,
}: {
  search: string;
  setSearch: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--lg-border)] glass-blur-xl glass-surface-strong">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)] transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Demo</span>
          </button>
          <div className="h-6 w-px bg-[var(--lg-border)]" />
          <button
            onClick={() => navigate("/docs")}
            className="flex items-center gap-2 group"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-liquid-blue to-liquid-purple flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-[var(--lg-text)]">Liquid Glass</span>
              <span className="ml-2 text-xs text-[var(--lg-text-muted)]">Docs</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end max-w-md">
          <div className="relative flex-1 hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lg-text-muted)]" />
            <input
              ref={searchInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-9 pr-20 py-2 rounded-xl text-sm bg-[var(--lg-border-subtle)] text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="hidden md:inline-flex h-5 px-1.5 items-center rounded text-[10px] font-medium text-[var(--lg-text-muted)] bg-[var(--lg-border)] border border-[var(--lg-border-subtle)]">
                ⌘K
              </kbd>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function DocsSidebar({
  section,
  category,
  onSearchFocus,
}: {
  section: DocsSection;
  category: string | null;
  onSearchFocus: () => void;
}) {
  const componentByCategory = useMemo(() => {
    const map = new Map<string, typeof docsComponents>();
    for (const cat of docsCategories) {
      map.set(cat, docsComponents.filter((c) => c.category === cat));
    }
    return map;
  }, []);

  return (
    <aside className="hidden lg:block w-72 fixed top-16 bottom-0 overflow-y-auto border-r border-[var(--lg-border)] px-5 py-8">
      <nav className="space-y-8" aria-label="Docs navigation">
        <div>
          {SECTIONS.map((s) => {
            const { label, icon: Icon } = sectionMeta[s];
            const active = section === s && !category;
            return (
              <button
                key={s}
                onClick={() =>
                  navigate(s === "components" ? buildDocsUrl({ section: s }) : buildDocsUrl({ section: s }))
                }
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors mt-1 first:mt-0",
                  active
                    ? "bg-[var(--lg-border)] text-[var(--lg-text)]"
                    : "text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)]"
                )}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>

        <div>
          <div className="flex items-center gap-2 px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">
            <Hash size={12} />
            Component Categories
          </div>
          <div className="space-y-1">
            {docsCategories.map((cat) => {
              const Icon = categoryIcons[cat] || Layers;
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    navigate(
                      active
                        ? buildDocsUrl({ section: "components" })
                        : buildDocsUrl({ section: "components", category: cat })
                    )
                  }
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--lg-border)] text-[var(--lg-text)]"
                      : "text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={15} />
                    {cat}
                  </span>
                  <span className="text-xs text-[var(--lg-text-muted)] bg-[var(--lg-border-subtle)] px-1.5 py-0.5 rounded-md">
                    {componentByCategory.get(cat)?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onSearchFocus}
          className="lg:hidden w-full px-3 py-2 rounded-xl text-sm text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)] transition-colors"
        >
          Search components
        </button>
      </nav>
    </aside>
  );
}

function DetailToc({ hasDemo }: { hasDemo: boolean }) {
  const items = [
    { id: "overview", label: "Overview" },
    hasDemo && { id: "demo", label: "Demo" },
    { id: "props", label: "Props" },
    { id: "usage", label: "Usage" },
    { id: "source", label: "Source" },
  ].filter(Boolean) as { id: string; label: string }[];
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <aside className="hidden xl:block w-64 fixed right-[max(0px,calc(50%-42rem))] top-24 bottom-0 overflow-y-auto px-6 py-2">
      <nav aria-label="On this page">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)] mb-3">
          On this page
        </div>
        <ul className="space-y-1 border-l border-[var(--lg-border)]">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left pl-3 py-1 text-sm text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:border-l-2 hover:border-liquid-blue transition-all"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

/* ───────── Content sections ───────── */
function IntroSection() {
  return (
    <div>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-blur-sm glass-surface glass-border text-xs font-medium text-[var(--lg-text-secondary)] mb-4">
          <Sparkles size={12} className="text-liquid-blue" />
          iOS 26 Inspired Design System
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--lg-text)] mb-4 tracking-tight">
          Liquid Glass{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-blue via-liquid-purple to-liquid-pink">
            Documentation
          </span>
        </h1>
        <p className="text-lg text-[var(--lg-text-muted)] max-w-2xl leading-relaxed">
          A copy-paste React component library for building translucent, frosted-glass interfaces.
          Every component is built with Tailwind CSS v4, Framer Motion, and a shared glass system.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[
          { icon: <Package size={20} />, title: "69 Components", desc: "Desktop + mobile glass components." },
          { icon: <Palette size={20} />, title: "Theme Aware", desc: "Light/dark modes with CSS variables." },
          { icon: <Layers size={20} />, title: "Glass System", desc: "Blur, transparency, reflection, fluidity." },
          { icon: <Terminal size={20} />, title: "Copy & Paste", desc: "Grab the source, no package install." },
          { icon: <Code2 size={20} />, title: "TypeScript", desc: "Typed props and interfaces." },
          { icon: <Sparkles size={20} />, title: "Motion", desc: "Framer Motion spring animations." },
        ].map((item) => (
          <div
            key={item.title}
            className="p-5 rounded-2xl glass-blur-sm glass-surface glass-border glass-highlight"
          >
            <div className="h-9 w-9 rounded-xl bg-[var(--lg-border-subtle)] flex items-center justify-center text-liquid-blue mb-3">
              {item.icon}
            </div>
            <h3 className="font-semibold text-[var(--lg-text)] mb-1">{item.title}</h3>
            <p className="text-sm text-[var(--lg-text-muted)]">{item.desc}</p>
          </div>
        ))}
      </div>

      <H2>How this library works</H2>
      <P>
        Liquid Glass is not distributed as an npm package. Instead, each component lives as a
        self-contained <InlineCode>.tsx</InlineCode> file that you copy into your own project. This gives you full
        control over styling, behavior, and dependencies.
      </P>
      <P>
        Components share a single design language through CSS custom properties and Tailwind
        utilities: <InlineCode>glass-blur</InlineCode>, <InlineCode>glass-surface</InlineCode>,{" "}
        <InlineCode>glass-border</InlineCode>, and <InlineCode>glass-highlight</InlineCode>. These utilities read from
        the active theme and the global glass sliders.
      </P>

      <H2>Quick start</H2>
      <P>
        1. Add the CSS variables and glass utilities to your stylesheet.
        2. Wrap your app in <InlineCode>ThemeProvider</InlineCode>.
        3. Copy any component file from <InlineCode>src/components/liquid-glass/</InlineCode> into your project.
      </P>
      <CodeBlock code={componentUsageExample} filename="Example usage" />
    </div>
  );
}

function InstallationSection() {
  const depsCode = `npm install framer-motion lucide-react clsx tailwind-merge tailwindcss @tailwindcss/vite`;
  const devDepsCode = `npm install -D @types/react @types/react-dom typescript vite @vitejs/plugin-react`;

  return (
    <div>
      <H2>Installation</H2>
      <P>
        Liquid Glass is built for React 19, Vite, and Tailwind CSS v4. Install the peer dependencies
        and create the project structure below.
      </P>

      <H3>Dependencies</H3>
      <CodeBlock code={depsCode} filename="Terminal" language="bash" />

      <H3>Dev dependencies</H3>
      <CodeBlock code={devDepsCode} filename="Terminal" language="bash" />

      <H3>Project structure</H3>
      <CodeBlock
        code={`src/
├── components/
│   └── liquid-glass/
│       ├── index.ts
│       ├── ThemeProvider.tsx
│       ├── useGlassSurface.ts
│       ├── useLiquidPress.ts
│       ├── GlassSheen.tsx
│       ├── GlassTopHighlight.tsx
│       ├── LiquidGlassPressSplash.tsx
│       ├── LiquidGlassControls.tsx
│       └── ...components you need
├── utils/
│   └── cn.ts
├── index.css
└── main.tsx`}
        filename="Folder structure"
        language="text"
      />

      <H3>Utils</H3>
      <P>
        All components rely on a small <InlineCode>cn()</InlineCode> utility that merges Tailwind classes.
      </P>
      <CodeBlock
        code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        filename="src/utils/cn.ts"
      />

      <H3>Stylesheet</H3>
      <P>
        Copy the CSS variables and glass utilities into your global stylesheet. The full file is
        included in the repository; below is a condensed reference.
      </P>
      <CodeBlock code={indexCssSample} filename="src/index.css (condensed)" language="css" />
    </div>
  );
}

function ThemeSection() {
  return (
    <div>
      <H2>Theme System</H2>
      <P>
        The <InlineCode>ThemeProvider</InlineCode> stores the active theme and glass slider values. It
        persists them to <InlineCode>localStorage</InlineCode> and writes CSS custom properties to the
        document root so every glass utility responds instantly.
      </P>

      <H3>Setup</H3>
      <CodeBlock code={themeProviderUsage} filename="App.tsx" />

      <H3>useTheme API</H3>
      <div className="overflow-hidden rounded-2xl border border-[var(--lg-border)] my-6">
        <table className="w-full text-sm">
          <thead className="bg-[var(--lg-border-subtle)]">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Property</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Type</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--lg-border-subtle)]">
            {[
              ["theme", '"dark" | "light"', "Current theme"],
              ["setTheme", "(theme) => void", "Set theme explicitly"],
              ["toggleTheme", "() => void", "Toggle dark/light"],
              ["isDark", "boolean", "True when theme is dark"],
              ["glass", "GlassSettings", "Current slider values"],
              ["setGlass", "(Partial<GlassSettings>) => void", "Update one or more sliders"],
              ["resetGlass", "() => void", "Reset sliders to defaults"],
            ].map(([name, type, desc]) => (
              <tr key={name} className="hover:bg-[var(--lg-border-subtle)]/50">
                <td className="px-4 py-3 font-mono text-xs text-[var(--lg-text)]">{name}</td>
                <td className="px-4 py-3 font-mono text-xs text-liquid-blue">{type}</td>
                <td className="px-4 py-3 text-xs text-[var(--lg-text-muted)]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Glass settings</H3>
      <P>
        Four sliders drive every glass surface in the library. They are stored as unitless numbers
        0–100 and mapped to CSS values in the utility classes.
      </P>
      <ul className="space-y-2 mb-6 text-sm text-[var(--lg-text-secondary)]">
        <li><strong>Blur</strong> — scales <InlineCode>backdrop-filter</InlineCode> blur radius.</li>
        <li><strong>Transparency</strong> — scales surface alpha via <InlineCode>color-mix</InlineCode>.</li>
        <li><strong>Reflection</strong> — controls reflection blob intensity.</li>
        <li><strong>Fluidity</strong> — tunes spring stiffness/damping for motion.</li>
      </ul>

      <H3>CSS variables</H3>
      <P>
        The provider writes <InlineCode>--lg-blur</InlineCode>, <InlineCode>--lg-transparency</InlineCode>,{" "}
        <InlineCode>--lg-reflection</InlineCode>, and <InlineCode>--lg-fluidity</InlineCode> to the root
        element. Theme colors are applied by toggling the <InlineCode>.dark</InlineCode> /{" "}
        <InlineCode>.light</InlineCode> class on <InlineCode>document.documentElement</InlineCode>.
      </P>
    </div>
  );
}

function GlassSection() {
  return (
    <div>
      <H2>Glass System</H2>
      <P>
        The glass look is achieved by combining <InlineCode>backdrop-filter</InlineCode> blur,
        translucent gradients, subtle borders, and inner/outer highlights. The library exposes
        Tailwind utilities that read from the global CSS variables so all components stay in sync.
      </P>

      <H3>Utility classes</H3>
      <div className="overflow-hidden rounded-2xl border border-[var(--lg-border)] my-6">
        <table className="w-full text-sm">
          <thead className="bg-[var(--lg-border-subtle)]">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Class</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]">Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--lg-border-subtle)]">
            {[
              ["glass-blur", "Base blur + saturation"],
              ["glass-blur-sm", "Half blur (subtle)"],
              ["glass-blur-lg", "Stronger blur"],
              ["glass-blur-xl", "Maximum blur for overlays"],
              ["glass-surface", "Default translucent gradient"],
              ["glass-surface-strong", "More opaque gradient"],
              ["glass-surface-dark", "Subtle dark surface"],
              ["glass-border", "Theme-aware 1px border"],
              ["glass-border-subtle", "Softer border"],
              ["glass-highlight", "Inner top/bottom + drop shadow"],
              ["glass-highlight-strong", "Stronger highlight + shadow"],
              ["glass-inner-glow", "Subtle inner top highlight"],
              ["glass-reflection", "Reflection blob background"],
            ].map(([cls, effect]) => (
              <tr key={cls} className="hover:bg-[var(--lg-border-subtle)]/50">
                <td className="px-4 py-3 font-mono text-xs text-liquid-blue">{cls}</td>
                <td className="px-4 py-3 text-xs text-[var(--lg-text-secondary)]">{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>useGlassSurface hook</H3>
      <P>
        For dynamic surfaces that need inline styles (thumbs, tracks, sheens), use{" "}
        <InlineCode>useGlassSurface</InlineCode>. It returns a <InlineCode>style</InlineCode> object and a{" "}
        <InlineCode>className</InlineCode> string for common glass presets.
      </P>
      <CodeBlock
        code={`import { useGlassSurface } from "./components/liquid-glass";

function MySurface() {
  const { style, className } = useGlassSurface({ variant: "surface-strong" });
  return <div style={style} className={className}>Glass</div>;
}`}
        filename="Usage"
      />

      <H3>Popover / portal requirement</H3>
      <P>
        Components that float above other content (dropdowns, hover cards, context menus) must be
        portaled to <InlineCode>document.body</InlineCode>. If they are rendered inside a parent with{" "}
        <InlineCode>overflow-hidden</InlineCode> or its own <InlineCode>backdrop-filter</InlineCode>, the
        blur will not see the real background.
      </P>
      <CodeBlock
        code={`import { createPortal } from "react-dom";

{createPortal(
  <div className="fixed z-[100] glass-blur-xl glass-surface-strong glass-border">
    Popover content
  </div>,
  document.body
)}`}
        filename="Portal pattern"
      />

      <H3>Common patterns</H3>
      <P>
        Most glass panels share the same recipe. Use this combination for dropdowns, modals, and
        sheets:
      </P>
      <CodeBlock
        code={`<div className="glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-2xl">
  <div className="absolute inset-x-0 top-0 h-px glass-top-highlight" />
  {/* content */}
</div>`}
        filename="Standard glass panel"
      />
    </div>
  );
}

/* ───────── Component grid ───────── */
function ComponentGrid({
  components,
  categoryLabel,
  search,
  onSearch,
  activeCategory,
}: {
  components: DocsComponentEntry[];
  categoryLabel: string;
  search: string;
  onSearch: (q: string) => void;
  activeCategory: string | null;
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--lg-text)] mb-2">{categoryLabel}</h1>
        <p className="text-[var(--lg-text-muted)]">
          {components.length} component{components.length !== 1 ? "s" : ""} available.
        </p>
      </div>

      <div className="space-y-3 mb-6 lg:hidden">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lg-text-muted)]" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Filter components..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm bg-[var(--lg-border-subtle)] text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none focus:ring-2 focus:ring-white/20"
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", ...docsCategories].map((cat) => {
            const isAll = cat === "All";
            const active = isAll ? !activeCategory : activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  navigate(
                    isAll || active
                      ? buildDocsUrl({ section: "components" })
                      : buildDocsUrl({ section: "components", category: cat })
                  )
                }
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                  active
                    ? "bg-[var(--lg-border)] text-[var(--lg-text)]"
                    : "bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {components.length === 0 ? (
        <div className="text-center py-20 rounded-2xl glass-blur-sm glass-surface glass-border">
          <p className="text-[var(--lg-text-muted)] mb-3">No components match your search.</p>
          <button
            onClick={() => onSearch("")}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--lg-border-subtle)] text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)] transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {components.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => navigate(buildDocsUrl({ topic: c.id }))}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="text-left p-5 rounded-2xl glass-blur-sm glass-surface glass-border glass-highlight hover:shadow-lg hover:shadow-black/5 transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[var(--lg-text)]">
                  <Highlight text={c.name} query={search} />
                </span>
                <ChevronRight size={16} className="text-[var(--lg-text-muted)]" />
              </div>
              <p className="text-sm text-[var(--lg-text-muted)] line-clamp-2">
                <Highlight text={c.description} query={search} />
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--lg-border-subtle)] text-[10px] font-medium text-[var(--lg-text-muted)]">
                  {c.category}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--lg-border-subtle)] text-[10px] font-medium text-[var(--lg-text-muted)]">
                  {c.props.length} prop{c.props.length !== 1 ? "s" : ""}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────── Component detail ───────── */
function generateUsage(component: DocsComponentEntry) {
  const isHook = component.name.startsWith("use");
  const requiredProps = component.props.filter((p) => p.required);

  if (isHook) {
    const hookName = component.name;
    if (hookName === "useGlassSurface") {
      return `import { ${hookName} } from "./components/liquid-glass";

function Example() {
  const { style, className } = ${hookName}({ variant: "surface" });
  return <div style={style} className={className} />;
}`;
    }
    if (hookName === "useLiquidPress") {
      return `import { ${hookName} } from "./components/liquid-glass";

function Example() {
  const { state, onPointerDown } = ${hookName}<HTMLButtonElement>();
  return <button onPointerDown={onPointerDown}>Press me</button>;
}`;
    }
    if (hookName === "useTheme") {
      return `import { ${hookName} } from "./components/liquid-glass";

function Example() {
  const { theme, toggleTheme } = ${hookName}();
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}`;
    }
    return `import { ${hookName} } from "./components/liquid-glass";

function Example() {
  const result = ${hookName}();
  return null;
}`;
  }

  const propsString = requiredProps
    .map((p) => {
      if (p.type.includes("ReactNode") || p.type.includes("React.ReactNode")) return `${p.name}={<>Content</>}`;
      if (p.type.includes("string")) return `${p.name}="value"`;
      if (p.type.includes("number")) return `${p.name}={0}`;
      if (p.type.includes("boolean")) return `${p.name}={true}`;
      if (p.type.includes("() => void")) return `${p.name}={() => {}}`;
      if (p.type.includes("Date")) return `${p.name}={new Date()}`;
      if (p.type.includes("[]") || p.type.includes("Array")) return `${p.name}={[]}`;
      return `${p.name}={/* ${p.type} */}`;
    })
    .join(" ");

  const jsx = propsString ? `<${component.name} ${propsString} />` : `<${component.name} />`;

  return `import { ${component.name} } from "./components/liquid-glass";

export default function Example() {
  return (
    ${jsx}
  );
}`;
}

function ComponentDetail({
  component,
  category,
}: {
  component: DocsComponentEntry;
  category: string | null;
}) {
  const usageCode = generateUsage(component);
  const Demo = componentDemos[component.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--lg-text-muted)]">
          <li>
            <button onClick={() => navigate("/docs")} className="hover:text-[var(--lg-text-secondary)] transition-colors">
              Docs
            </button>
          </li>
          <ChevronRight size={14} />
          <li>
            <button
              onClick={() =>
                navigate(buildDocsUrl({ section: "components", category: component.category }))
              }
              className="hover:text-[var(--lg-text-secondary)] transition-colors"
            >
              {component.category}
            </button>
          </li>
          <ChevronRight size={14} />
          <li className="text-[var(--lg-text)] font-medium">{component.name}</li>
        </ol>
      </nav>

      <section id="overview" className="mb-8 scroll-mt-28">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--lg-border-subtle)] text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)] mb-3">
          {component.category}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--lg-text)] mb-3">{component.name}</h1>
        <p className="text-lg text-[var(--lg-text-muted)] max-w-2xl">{component.description}</p>
        <p className="text-xs text-[var(--lg-text-muted)] mt-3 font-mono">{component.file}</p>
      </section>

      {Demo && (
        <>
          <H2 id="demo">Demo</H2>
          <P>Interactive preview of the component and common variants.</P>
          <Demo />
        </>
      )}

      <H2 id="props">Props</H2>
      <PropTable props={component.props} />

      <H2 id="usage">Usage</H2>
      <P>
        Copy the import and example below into your project. Fill in any required props from the
        table above.
      </P>
      <CodeBlock code={usageCode} filename={`${component.name} usage`} />

      <H2 id="source">Source code</H2>
      <P>
        Copy the component below into <InlineCode>{component.file}</InlineCode>. It depends on the
        shared utilities shown in the Installation section.
      </P>
      <CodeBlock code={component.sourceCode} filename={component.file} />

      <div className="mt-10 pt-8 border-t border-[var(--lg-border)]">
        <button
          onClick={() =>
            navigate(
              category
                ? buildDocsUrl({ section: "components", category })
                : buildDocsUrl({ section: "components" })
            )
          }
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[var(--lg-text-secondary)] bg-[var(--lg-border-subtle)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {category || "components"}
        </button>
      </div>
    </motion.div>
  );
}

function NotFoundTopic({ topic }: { topic: string }) {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold text-[var(--lg-text)] mb-3">Topic not found</h1>
      <p className="text-[var(--lg-text-muted)] mb-6">
        No component matches <InlineCode>{topic}</InlineCode>.
      </p>
      <button
        onClick={() => navigate(buildDocsUrl({ section: "components" }))}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--lg-border-subtle)] text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)] transition-colors"
      >
        Browse components
      </button>
    </div>
  );
}
