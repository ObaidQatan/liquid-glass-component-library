# Liquid Glass Component Library

A React component collection exploring **glassmorphism** and Apple-inspired **Liquid Glass** surfaces.

It started as a personal experiment: *how close can you get to iOS 26-style refractive glass in a browser with nothing but React, Tailwind CSS, SVG filters and Framer Motion?* The result is a small but fully interactive library of desktop and mobile components built around a shared glass system that you can tweak in real time.

> **Status:** experimental. Built for my own projects and learning.  
> **Contributions:** not accepted at this time.

---

## ✨ What it looks like

- **Glass mode** — traditional frosted glass with adjustable blur, transparency and saturation.
- **Liquid Glass mode** — a refractive SVG-filter effect that mimics the distorted, glossy look of Apple’s Liquid Glass, with profile, bezel, refraction, thickness, light angle, specular, transparency, blur and saturation controls.
- **Dark & light themes** with persistent user preferences.
- **Spring-driven motion** powered by Framer Motion.

The demo app is a single self-contained `dist/index.html` file that doubles as documentation and a playground.

---

## 🚀 Tech stack

- React 19 + TypeScript 5.9
- Vite 7
- Tailwind CSS 4.1
- Framer Motion
- lucide-react

The production build is inlined into one file by `vite-plugin-singlefile`.

---

## 📦 What’s inside

70+ components organized into categories:

| Category | Examples |
| --- | --- |
| **Theme & Glass Primitives** | `ThemeProvider`, `useTheme`, `useGlassSurface`, `GlassTopHighlight`, `GlassSheen` |
| **Inputs, Toggles & Pickers** | `LiquidGlassInput`, `LiquidGlassSelect`, `LiquidGlassToggle`, `LiquidGlassSlider`, `LiquidGlassCheckbox`, `LiquidGlassRadioGroup`, `LiquidGlassColorPicker`, `LiquidGlassFileUpload` |
| **Buttons & FABs** | `LiquidGlassButton`, `LiquidGlassIos26Button`, `MobileFloatingActionButton` |
| **Layout & Surfaces** | `LiquidGlassCard`, `LiquidGlassFluidCard`, `LiquidGlassResizable`, `LiquidGlassScrollArea`, `LiquidGlassKanban`, `LiquidGlassDock` |
| **Navigation** | `LiquidGlassNavigation`, `LiquidGlassBreadcrumb`, `LiquidGlassMenubar`, `LiquidGlassTabBar`, `MobileBottomTabBar`, `MobileTopNavBar`, `MobileSlideMenu` |
| **Overlays, Menus & Tooltips** | `LiquidGlassTooltip`, `LiquidGlassHoverCard`, `LiquidGlassContextMenu`, `LiquidGlassNotificationDropdown`, `MobileContextPreview` |
| **Modals, Drawers & Sheets** | `LiquidGlassModal`, `LiquidGlassDrawer`, `LiquidGlassSheet`, `LiquidGlassCommandPalette`, `MobileActionSheet`, `MobileAlertDialog`, `MobilePermissionDialog` |
| **Feedback & Status** | `LiquidGlassAlert`, `LiquidGlassBadge`, `LiquidGlassToast`, `LiquidGlassProgress`, `LiquidGlassSkeleton`, `LiquidGlassEmptyState`, `MobileSnackbar`, `MobileAppRating`, `MobileSplashScreen` |
| **Data Display** | `LiquidGlassTable`, `LiquidGlassPagination`, `LiquidGlassTimeline`, `LiquidGlassCalendar`, `LiquidGlassStatCard`, `LiquidGlassRating`, `LiquidGlassStepper` |
| **Media & Content** | `LiquidGlassCarousel`, `LiquidGlassMusicPlayer`, `LiquidGlassWeatherWidget` |

The full source-of-truth for the docs is `src/docs-data.ts`, generated from the component files by `node scripts/generate-docs-data.js`.

---

## 🛠 Getting started

```bash
# clone the repo
git clone https://github.com/YOUR_USERNAME/liquid-glass-component-library.git
cd liquid-glass-component-library

# install dependencies
pnpm install

# start the dev server
pnpm run dev

# build the single-file demo + docs
pnpm run build

# type-check
pnpm exec tsc --noEmit
```

After building, open `dist/index.html` or run `pnpm run preview`.

---

## 🧩 Basic usage

```tsx
import { LiquidGlassButton, LiquidGlassCard, LiquidGlassModal } from "liquid-glass";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <LiquidGlassCard className="p-6">
      <h2 className="text-xl font-semibold text-[var(--lg-text)]">Hello Glass</h2>
      <LiquidGlassButton onClick={() => setOpen(true)}>Open modal</LiquidGlassButton>
      <LiquidGlassModal open={open} onClose={() => setOpen(false)} title="Demo">
        This surface adapts to your glass settings automatically.
      </LiquidGlassModal>
    </LiquidGlassCard>
  );
}
```

---

## 🎚 Glass system

The `ThemeProvider` exposes mode-aware controls.

**Glass mode**

| Slider | CSS variable | Default | Effect |
| --- | --- | --- | --- |
| Blur | `--lg-blur` | 17 | Backdrop-filter blur strength |
| Transparency | `--lg-transparency` | 10 | Surface and border opacity |
| Saturation | `--lg-saturation` | 100 | Backdrop-filter saturation |

**Liquid Glass mode**

| Control | Default | Effect |
| --- | --- | --- |
| Profile | `convex-circle` | Refractive surface shape |
| Bezel | 9 | Edge curvature size |
| Refraction | 90 | Distortion amount |
| Thickness | 120 | Virtual glass thickness |
| Light angle | -150 | Specular light direction |
| Specular | 10 | Highlight intensity |
| Transparency | 20 | Surface opacity |
| Blur | 10 | Base blur |
| Saturation | 100 | Color saturation |

Switch between modes to compare standard frosted glass against the refractive SVG-filter look.

---

## 📁 Project structure

```
src/
├── components/liquid-glass/   # all components
├── App.tsx                    # demo playground
├── Docs.tsx                   # documentation SPA
├── docs-data.ts               # generated component metadata
├── docs-demos.tsx             # interactive demos
├── docs-variants.tsx          # variant grids
├── index.css                  # Tailwind entry + glass utilities
└── utils/cn.ts                # clsx + tailwind-merge

scripts/
└── generate-docs-data.js      # regenerates docs-data.ts
```

---

## 🙅‍♂️ Contributions

This repository is a personal sandbox. I’m not looking for issues, pull requests or maintainers right now. If that changes I’ll update this section.

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

Built with curiosity by [ObekasApps](https://github.com/YOUR_USERNAME).
