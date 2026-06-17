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
  if (["ThemeProvider", "useGlassSurface", "useLiquidPress", "GlassSheen", "GlassTopHighlight", "LiquidGlassPressSplash", "LiquidGlassControls"].includes(componentName)) {
    return "Core & Theme";
  }
  if (componentName.startsWith("Mobile")) {
    return "Mobile";
  }
  if (["LiquidGlassButton", "LiquidGlassIos26Button", "LiquidGlassToggle", "LiquidGlassSlider"].includes(componentName)) {
    return "Buttons & Controls";
  }
  if (["LiquidGlassInput", "LiquidGlassSelect", "LiquidGlassCheckbox", "LiquidGlassRadioGroup", "LiquidGlassColorPicker", "LiquidGlassFileUpload"].includes(componentName)) {
    return "Inputs & Forms";
  }
  if (["LiquidGlassAlert", "LiquidGlassBadge", "LiquidGlassProgress", "LiquidGlassRating", "LiquidGlassToast", "LiquidGlassSkeleton", "LiquidGlassEmptyState"].includes(componentName)) {
    return "Feedback";
  }
  if (["LiquidGlassModal", "LiquidGlassDrawer", "LiquidGlassSheet", "LiquidGlassCommandPalette", "LiquidGlassTooltip", "LiquidGlassHoverCard", "LiquidGlassNotificationDropdown", "LiquidGlassContextMenu", "LiquidGlassMenubar"].includes(componentName)) {
    return "Overlays & Menus";
  }
  if (["LiquidGlassTable", "LiquidGlassPagination", "LiquidGlassTimeline", "LiquidGlassAccordion", "LiquidGlassCalendar", "LiquidGlassStatCard", "LiquidGlassStepper", "LiquidGlassKanban"].includes(componentName)) {
    return "Data Display";
  }
  if (["LiquidGlassAvatar", "LiquidGlassChip", "LiquidGlassCarousel", "LiquidGlassMusicPlayer", "LiquidGlassWeatherWidget"].includes(componentName)) {
    return "Media & Content";
  }
  return "Layout";
}

function getDescription(componentName) {
  const map = {
    ThemeProvider: "Wraps your app to provide theme state, glass settings, and persistence.",
    useGlassSurface: "Hook returning theme-aware glass surface styles and class names.",
    useLiquidPress: "Hook tracking pointer press state for liquid-glass press effects.",
    GlassSheen: "Reusable specular sheen overlay for glass surfaces.",
    GlassTopHighlight: "Reusable top highlight line used across glass components.",
    LiquidGlassPressSplash: "Animated press splash used by buttons and chips.",
    LiquidGlassControls: "Interactive panel to adjust blur, transparency, reflection, and fluidity.",
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
    MobilePullToRefresh: "Pull-to-refresh wrapper for touch scrolling.",
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

function generateProps(source) {
  const props = [];
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
          description: "",
        });
      }
    }
  }
  return props;
}

const files = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

const entries = files.map((file) => {
  const componentName = getComponentName(file);
  const source = fs.readFileSync(path.join(componentsDir, file), "utf8");
  return {
    id: toKebab(componentName.replace(/^(LiquidGlass|Mobile)/, "")).replace(/^-/, ""),
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
  "Core & Theme",
  "Layout",
  "Buttons & Controls",
  "Inputs & Forms",
  "Feedback",
  "Overlays & Menus",
  "Data Display",
  "Media & Content",
  "Mobile",
];

export const docsComponents: DocsComponentEntry[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(outputFile, content);
console.log(`Generated ${outputFile} with ${entries.length} components.`);
