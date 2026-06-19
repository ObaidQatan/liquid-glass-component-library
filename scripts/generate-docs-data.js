import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentsDir = path.resolve(__dirname, "../src/components/liquid-glass");
const outputFile = path.resolve(__dirname, "../src/docs-data.ts");

function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/^-/, "")
    .toLowerCase();
}

function getComponentName(file) {
  return path.basename(file, ".tsx");
}

function getCategory(componentName) {
  const map = {
    "Theme & Glass Primitives": [
      "ThemeProvider",
      "useGlassSurface",
      "useLiquidPress",
      "GlassSheen",
      "GlassTopHighlight",
      "LiquidGlassPressSplash",
      "LiquidGlassControls",
    ],
    "Buttons & FABs": [
      "LiquidGlassButton",
      "LiquidGlassIos26Button",
      "MobileFloatingActionButton",
    ],
    "Inputs, Toggles & Pickers": [
      "LiquidGlassInput",
      "LiquidGlassSelect",
      "LiquidGlassCheckbox",
      "LiquidGlassRadioGroup",
      "LiquidGlassColorPicker",
      "LiquidGlassFileUpload",
      "MobileSearchBar",
      "LiquidGlassSlider",
      "LiquidGlassToggle",
      "MobileSegmentedControl",
      "MobileStepper",
    ],
    "Navigation": [
      "LiquidGlassNavigation",
      "LiquidGlassBreadcrumb",
      "LiquidGlassDock",
      "LiquidGlassTabBar",
      "MobileBottomTabBar",
      "MobileTopNavBar",
    ],
    "Layout & Surfaces": [
      "LiquidGlassCard",
      "LiquidGlassFluidCard",
      "LiquidGlassScrollArea",
      "LiquidGlassResizable",
    ],
    "Data Display": [
      "LiquidGlassAccordion",
      "LiquidGlassCalendar",
      "LiquidGlassKanban",
      "LiquidGlassPagination",
      "LiquidGlassStatCard",
      "LiquidGlassStepper",
      "LiquidGlassTable",
      "LiquidGlassTimeline",
      "MobileSwipeableList",
    ],
    "Feedback & Status": [
      "LiquidGlassAlert",
      "LiquidGlassBadge",
      "LiquidGlassEmptyState",
      "LiquidGlassProgress",
      "LiquidGlassRating",
      "LiquidGlassSkeleton",
      "LiquidGlassToast",
      "MobileSnackbar",
    ],
    "Media & Content": [
      "LiquidGlassAvatar",
      "LiquidGlassChip",
      "LiquidGlassCarousel",
      "LiquidGlassMusicPlayer",
      "LiquidGlassWeatherWidget",
      "MobilePageIndicator",
    ],
    "Overlays, Menus & Tooltips": [
      "LiquidGlassCommandPalette",
      "LiquidGlassContextMenu",
      "MobileContextPreview",
      "LiquidGlassHoverCard",
      "LiquidGlassMenubar",
      "LiquidGlassNotificationDropdown",
      "LiquidGlassTooltip",
    ],
    "Modals, Drawers & Sheets": [
      "LiquidGlassModal",
      "LiquidGlassDrawer",
      "LiquidGlassSheet",
      "MobileActionSheet",
      "MobileAlertDialog",
      "MobilePermissionDialog",
      "MobileAppRating",
      "MobileSlideMenu",
      "MobileSplashScreen",
    ],
  };
  for (const [category, names] of Object.entries(map)) {
    if (names.includes(componentName)) return category;
  }
  return "Layout & Surfaces";
}

function getDescription(componentName) {
  const map = {
    ThemeProvider: "Wraps your app to provide theme state, glass settings, and persistence.",
    useGlassSurface: "Hook returning theme-aware glass surface styles and class names.",
    useLiquidPress: "Hook tracking pointer press state for liquid-glass press effects.",
    GlassSheen: "Reusable specular sheen overlay for glass surfaces.",
    GlassTopHighlight: "Reusable top highlight line used across glass components.",
    LiquidGlassPressSplash: "Animated press splash used by buttons and chips.",
    LiquidGlassControls: "Interactive panel to adjust blur, transparency, and saturation.",
    LiquidGlassCard: "Basic glass card container with variants, padding, and hover lift.",
    LiquidGlassFluidCard: "Card with a cursor-following liquid refraction glow.",
    LiquidGlassButton: "Primary button with liquid ripple and glass surface styles.",
    LiquidGlassIos26Button: "iOS 26 inspired chrome button with rich glass effects.",
    LiquidGlassToggle: "Fluid or iOS 26 style toggle switch.",
    LiquidGlassSlider: "Range slider with a stretching liquid-glass thumb.",
    LiquidGlassInput: "Glass text input with icons, label, and error states.",
    LiquidGlassSelect: "Dropdown select portaled to document.body for working blur.",
    LiquidGlassCheckbox: "Glass checkbox with indeterminate support.",
    LiquidGlassRadioGroup: "Radio group with glass selection indicators.",
    LiquidGlassColorPicker: "Color palette picker with custom hex input.",
    LiquidGlassFileUpload: "Drag-and-drop file upload with file list.",
    LiquidGlassAlert: "Theme-aware alert banners with status variants.",
    LiquidGlassBadge: "Small status badge with dot and color variants.",
    LiquidGlassProgress: "Progress bar with default, gradient, and segmented variants.",
    LiquidGlassRating: "Star rating with half-star support.",
    LiquidGlassToast: "Stacked toast notifications with progress bars.",
    LiquidGlassSkeleton: "Loading placeholder with shimmer animation.",
    LiquidGlassEmptyState: "Empty state illustration with icon variants.",
    LiquidGlassModal: "Centered modal dialog with glass blur.",
    LiquidGlassDrawer: "Side drawer that slides in from left or right.",
    LiquidGlassSheet: "Bottom sheet with default, compact, full, inset, and detached variants.",
    LiquidGlassCommandPalette: "Cmd+K style searchable command palette.",
    LiquidGlassTooltip: "Hover tooltip with directional positioning.",
    LiquidGlassHoverCard: "Hover-triggered popover portaled to document.body.",
    LiquidGlassNotificationDropdown: "Bell dropdown panel portaled to document.body.",
    LiquidGlassContextMenu: "Right-click context menu portaled to document.body.",
    LiquidGlassMenubar: "Dropdown menubar for desktop-style menus.",
    LiquidGlassNavigation: "Horizontal glass navigation bar with animated active indicator.",
    LiquidGlassBreadcrumb: "Breadcrumb navigation with separators.",
    LiquidGlassTabBar: "Tab bar with default, pills, and underline variants.",
    LiquidGlassDock: "macOS-style floating dock.",
    LiquidGlassTable: "Sortable data table with glass styling.",
    LiquidGlassPagination: "Pagination controls with ellipsis handling.",
    LiquidGlassTimeline: "Vertical timeline component.",
    LiquidGlassAccordion: "Collapsible accordion panels.",
    LiquidGlassCalendar: "Month calendar with highlighted and disabled dates.",
    LiquidGlassStatCard: "Grid of stat cards with change indicators.",
    LiquidGlassStepper: "Horizontal or vertical stepper.",
    LiquidGlassKanban: "Drag-and-drop kanban board.",
    LiquidGlassAvatar: "Avatar with fallback, status, and ring.",
    LiquidGlassChip: "Filter/removable chip component.",
    LiquidGlassCarousel: "Image/content carousel with arrows and indicators.",
    LiquidGlassMusicPlayer: "Glass music player card.",
    LiquidGlassWeatherWidget: "Weather widget with hourly forecast.",
    LiquidGlassScrollArea: "Custom scrollbar scroll area.",
    LiquidGlassResizable: "Resizable panel with drag handle.",
    MobileBottomTabBar: "iOS/Android bottom tab bar with 8 visual variants.",
    MobileTopNavBar: "Mobile top navigation bar with 5 layout variants.",
    MobileActionSheet: "Bottom action sheet with default, grouped, minimal, and grid variants.",
    MobileSegmentedControl: "iOS segmented control.",
    MobileStepper: "Plus/minus stepper control.",
    MobileSearchBar: "iOS-style search bar with cancel button.",
    MobileSwipeableList: "Swipeable list items with action buttons.",
    MobileSnackbar: "Bottom snackbar with progress and action.",
    MobileAlertDialog: "Mobile alert dialog with options.",
    MobilePermissionDialog: "Permission request sheet with toggles.",
    MobileAppRating: "App rating modal with star selection.",
    MobileSplashScreen: "Onboarding splash screen with slides.",
    MobileSlideMenu: "Slide-in side menu for mobile.",
    MobilePageIndicator: "Dots, line, or fraction page indicator.",
    MobileFloatingActionButton: "Expandable floating action button.",
    MobileContextPreview: "Context menu preview modal.",
  };
  return map[componentName] || `Liquid Glass ${componentName.replace(/^(LiquidGlass|Mobile)/, "")} component.`;
}

function generateUsage(componentName) {
  return `<${componentName} />`;
}

function cleanJsdoc(raw) {
  return raw
    .split("\n")
    .map((l) => l.replace(/^\s*\/\*\*\s?/, "").replace(/^\s*\*\s?/, "").trim())
    .filter((l) => l && !l.startsWith("@"))
    .join(" ")
    .trim();
}

const knownPropDescriptions = {
  className: "Additional Tailwind CSS classes.",
  children: "Child React nodes rendered inside the component.",
  style: "Inline CSS styles.",
  onClick: "Callback when the element is clicked.",
  onChange: "Callback when the value changes.",
  onClose: "Callback when the component requests to close.",
  onOpen: "Callback when the component opens.",
  value: "Current value of the control.",
  defaultValue: "Initial value for uncontrolled usage.",
  disabled: "Whether the component is disabled.",
  required: "Whether the field is required.",
  placeholder: "Placeholder text.",
  type: "Input type or visual variant.",
  variant: "Visual variant to use.",
  size: "Size preset.",
  icon: "Icon element to display.",
  label: "Label text.",
  title: "Title text.",
  description: "Description text.",
  message: "Message content.",
  open: "Controlled open state.",
  isOpen: "Controlled open state.",
};

function fillDescription(name, desc) {
  if (desc) return desc;
  return knownPropDescriptions[name] || "";
}

function generateProps(source) {
  const props = [];
  // Capture JSDoc comments directly preceding each prop.
  const jsdocRegex = /\/\*\*([\s\S]*?)\*\/\s*(\w+)\??\s*:\s*([^;]+);/g;
  let match;
  while ((match = jsdocRegex.exec(source)) !== null) {
    const desc = cleanJsdoc(match[1]);
    props.push({
      name: match[2],
      type: match[3].trim(),
      required: !match[0].includes("?"),
      description: fillDescription(match[2], desc),
    });
  }
  // Fallback to line-by-line scanning if no JSDoc props were found.
  if (props.length === 0) {
    const interfaceMatch = source.match(/interface\s+\w+Props\s*\{([\s\S]*?)\n\}/);
    if (interfaceMatch) {
      const body = interfaceMatch[1];
      const lines = body.split("\n").filter((l) => l.trim() && !l.trim().startsWith("//") && !l.trim().startsWith("/**") && !l.trim().startsWith("*"));
      for (const line of lines) {
        const m = line.match(/^\s*(\w+)\??\s*:\s*([^;]+);?\s*$/);
        if (m) {
          props.push({
            name: m[1],
            type: m[2].trim(),
            required: !line.includes("?"),
            description: fillDescription(m[1], ""),
          });
        }
      }
    }
  }
  return props;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function componentArticle(c) {
  const propsRows = c.props
    .map(
      (p) => `
    <tr>
      <td><code>${escapeHtml(p.name)}</code></td>
      <td><code>${escapeHtml(p.type)}</code></td>
      <td>${p.required ? "Yes" : "No"}</td>
      <td>${p.description ? escapeHtml(p.description) : "-"}</td>
    </tr>`
    )
    .join("");
  return `
  <article id="topic-${c.id}" data-topic="${c.id}">
    <h2>${escapeHtml(c.name)}</h2>
    <p><strong>Category:</strong> ${escapeHtml(c.category)}</p>
    <p>${escapeHtml(c.description)}</p>
    <h3>Props</h3>
    ${c.props.length ? `<table>
      <thead><tr><th>Prop</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
      <tbody>${propsRows}</tbody>
    </table>` : "<p>No props documented.</p>"}
    <h3>Usage</h3>
    <pre><code>${escapeHtml(c.usage)}</code></pre>
    <h3>Source</h3>
    <pre><code>${escapeHtml(c.sourceCode)}</code></pre>
    <p><a href="/docs?topic=${encodeURIComponent(c.id)}">Open in interactive docs</a></p>
  </article>`;
}

function generateStaticDocsHtml(entries) {
  const componentListItems = entries
    .map(
      (c) => `<li><a href="#topic-${c.id}">${escapeHtml(c.name)}</a> — ${escapeHtml(c.description)}</li>`
    )
    .join("");
  const componentArticles = entries.map(componentArticle).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Liquid Glass component library documentation. ${entries.length} copy-paste React components with props, usage, and source code." />
<meta name="robots" content="index, follow" />
<title>Liquid Glass Docs — Copy-paste React glass components</title>
<link rel="canonical" href="/docs.html" />
<link rel="sitemap" type="application/xml" href="/docs-sitemap.xml" />
<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Liquid Glass Docs",
  description: "Copy-paste React glass component library documentation.",
  url: "/docs.html",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
})}
</script>
<style>
:root { color-scheme: dark; }
body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0f; color: #f8fafc; line-height: 1.65; margin: 0; }
a { color: #60a5fa; text-decoration: none; }
a:hover { text-decoration: underline; }
header, main, footer { max-width: 960px; margin: 0 auto; padding: 1.5rem; }
header { display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid #1f1f2e; }
header h1 { font-size: 1.25rem; margin: 0; }
nav.toc { background: #11111a; border: 1px solid #1f1f2e; border-radius: 0.75rem; padding: 1rem; margin-bottom: 2rem; }
nav.toc h2 { font-size: 0.875rem; margin: 0 0 0.75rem; color: #94a3b8; }
nav.toc ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.35rem; }
nav.toc li { font-size: 0.9rem; }
article { border: 1px solid #1f1f2e; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; background: #11111a; }
h2 { margin-top: 0; color: #f8fafc; }
h3 { color: #e2e8f0; }
pre { background: #0b0b12; border: 1px solid #1f1f2e; border-radius: 0.75rem; padding: 1rem; overflow-x: auto; font-size: 0.85rem; line-height: 1.5; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
th, td { border: 1px solid #2a2a35; padding: 0.5rem 0.75rem; text-align: left; font-size: 0.875rem; }
th { background: #181822; color: #94a3b8; }
mark { background: #1e3a8a; color: #f8fafc; padding: 0 0.15rem; border-radius: 0.15rem; }
footer { color: #64748b; font-size: 0.8rem; border-top: 1px solid #1f1f2e; }
.logo { width: 2rem; height: 2rem; border-radius: 0.5rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: grid; place-items: center; color: white; font-weight: bold; }
</style>
</head>
<body>
<header>
  <div class="logo">LG</div>
  <h1>Liquid Glass Docs</h1>
</header>
<main>
  <section id="intro">
    <p>Liquid Glass is a copy-paste React component library for translucent, frosted-glass interfaces inspired by iOS 26. It includes <strong>${entries.length} components</strong> built with Tailwind CSS v4, Framer Motion, and a shared glass system.</p>
    <p>Each component is a self-contained <code>.tsx</code> file. Copy the source into your own project and customize it.</p>
    <h2>Quick start</h2>
    <ol>
      <li>Add the CSS variables and glass utilities to your stylesheet.</li>
      <li>Wrap your app in <code>ThemeProvider</code>.</li>
      <li>Copy any component file from <code>src/components/liquid-glass/</code> into your project.</li>
    </ol>
    <p><a href="/docs">Open the interactive docs</a></p>
  </section>

  <section id="components">
    <h2>Components</h2>
    <nav class="toc" aria-label="Component list">
      <h2>Browse by component</h2>
      <ul>
        ${componentListItems}
      </ul>
    </nav>
    ${componentArticles}
  </section>
</main>
<footer>
  <p>Generated from the Liquid Glass component library. Source files live in <code>src/components/liquid-glass</code>.</p>
</footer>
</body>
</html>`;
}

function generateSitemap(entries) {
  const siteUrl = process.env.SITE_URL || "https://liquid-glass-ui.example.com";
  const urls = [
    `${siteUrl}/docs.html`,
    `${siteUrl}/docs`,
    ...entries.map((c) => `${siteUrl}/docs?topic=${encodeURIComponent(c.id)}`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.replace(/&/g, "&amp;")}</loc></url>`).join("\n")}
</urlset>`;
}

const files = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

const usedIds = new Set();

const entries = files.map((file) => {
  const componentName = getComponentName(file);
  const source = fs.readFileSync(path.join(componentsDir, file), "utf8");
  let id = toKebab(componentName.replace(/^(LiquidGlass|Mobile)/, "")).replace(/^-/, "");
  // Disambiguate when a Mobile component collides with a regular one.
  if (usedIds.has(id) && componentName.startsWith("Mobile")) {
    id = `mobile-${id}`;
  }
  usedIds.add(id);
  return {
    id,
    name: componentName,
    file: `src/components/liquid-glass/${file}`,
    category: getCategory(componentName),
    description: getDescription(componentName),
    usage: generateUsage(componentName),
    sourceCode: source,
    props: generateProps(source),
  };
});

const content = `export interface DocsComponentEntry {
  id: string;
  name: string;
  file: string;
  category: string;
  description: string;
  usage: string;
  sourceCode: string;
  props: { name: string; type: string; required: boolean; description: string }[];
}

export const docsCategories = [
  "Theme & Glass Primitives",
  "Buttons & FABs",
  "Inputs, Toggles & Pickers",
  "Navigation",
  "Layout & Surfaces",
  "Data Display",
  "Feedback & Status",
  "Media & Content",
  "Overlays, Menus & Tooltips",
  "Modals, Drawers & Sheets",
];

export const docsComponents: DocsComponentEntry[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(outputFile, content);
console.log(`Generated ${outputFile} with ${entries.length} components.`);

const publicDir = path.resolve(__dirname, "../public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "docs.html"), generateStaticDocsHtml(entries));
fs.writeFileSync(path.join(publicDir, "docs-sitemap.xml"), generateSitemap(entries));
fs.writeFileSync(
  path.join(publicDir, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: /docs-sitemap.xml\n"
);
console.log(`Generated static docs in ${publicDir}`);
