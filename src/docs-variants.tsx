import { useState } from "react";
import * as LG from "./components/liquid-glass";
import { PortalOverlay, PortalWrap } from "./docs-demos";
import {
  Home,
  Search,
  User,
  Bell,
  Settings,
  Plus,
  Share2,
  Trash2,
  Check,
} from "lucide-react";

export const variantDemos: Record<string, React.FC<{ variant: string }>> = {
  button: ({ variant }) => (
    <LG.LiquidGlassButton variant={variant as any}>{variant}</LG.LiquidGlassButton>
  ),

  alert: ({ variant }) => (
    <LG.LiquidGlassAlert variant={variant as any} title={variant} className="w-full">
      This is a {variant} alert.
    </LG.LiquidGlassAlert>
  ),

  badge: ({ variant }) => (
    <LG.LiquidGlassBadge variant={variant as any}>{variant}</LG.LiquidGlassBadge>
  ),

  card: ({ variant }) => (
    <LG.LiquidGlassCard variant={variant as any} className="w-full">
      <p className="text-sm text-[var(--lg-text-secondary)] capitalize">{variant}</p>
    </LG.LiquidGlassCard>
  ),

  chip: ({ variant }) => (
    <LG.LiquidGlassChip variant={variant as any}>{variant}</LG.LiquidGlassChip>
  ),

  "empty-state": ({ variant }) => (
    <LG.LiquidGlassEmptyState
      variant={variant as any}
      title={variant}
      description="Variant preview"
      className="py-6"
    />
  ),

  "fluid-card": ({ variant }) => (
    <LG.LiquidGlassFluidCard variant={variant as any} className="w-full">
      <p className="text-sm text-[var(--lg-text-secondary)] capitalize">{variant}</p>
    </LG.LiquidGlassFluidCard>
  ),

  progress: ({ variant }) => (
    <LG.LiquidGlassProgress value={60} variant={variant as any} showValue className="w-full" />
  ),

  skeleton: ({ variant }) =>
    variant === "text" ? (
      <LG.LiquidGlassSkeleton variant="text" lines={2} width="100%" height={10} />
    ) : (
      <LG.LiquidGlassSkeleton variant={variant as any} width={48} height={48} />
    ),

  toggle: ({ variant }) => {
    const [on, setOn] = useState(true);
    return (
      <LG.LiquidGlassToggle checked={on} onChange={setOn} variant={variant as any} />
    );
  },

  "tab-bar": ({ variant }) => {
    const [i, setI] = useState(0);
    const tabs = [
      { label: "General", icon: <Settings size={14} /> },
      { label: "Appearance", icon: <PaletteIcon size={14} /> },
      { label: "Security", icon: <Check size={14} /> },
    ];
    return (
      <LG.LiquidGlassTabBar
        variant={variant as any}
        tabs={tabs}
        activeIndex={i}
        onChange={setI}
        className="w-full"
      />
    );
  },

  "segmented-control": ({ variant }) => {
    const [v, setV] = useState("all");
    return (
      <LG.MobileSegmentedControl
        variant={variant as any}
        selected={v}
        onChange={setV}
        segments={[
          { id: "all", label: "All" },
          { id: "recent", label: "Recent" },
          { id: "favs", label: "Favs" },
        ]}
        className="w-full"
      />
    );
  },

  sheet: ({ variant }) => (
    <PortalOverlay
      trigger={(setOpen) => (
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          {variant}
        </LG.LiquidGlassButton>
      )}
    >
      {(open, setOpen) => (
        <LG.LiquidGlassSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title={`${variant} sheet`}
          variant={variant as any}
        >
          <p className="text-sm text-[var(--lg-text-secondary)]">{variant} sheet content.</p>
        </LG.LiquidGlassSheet>
      )}
    </PortalOverlay>
  ),

  "action-sheet": ({ variant }) => (
    <PortalOverlay
      trigger={(setOpen) => (
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          {variant}
        </LG.LiquidGlassButton>
      )}
    >
      {(open, setOpen) => (
        <LG.MobileActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title={`${variant} sheet`}
          variant={variant as any}
          items={[
            { id: "1", title: "Share", icon: <Share2 size={18} /> },
            { id: "2", title: "Delete", destructive: true, icon: <Trash2 size={18} /> },
          ]}
        />
      )}
    </PortalOverlay>
  ),

  "slide-menu": ({ variant }) => (
    <PortalOverlay
      trigger={(setOpen) => (
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          {variant}
        </LG.LiquidGlassButton>
      )}
    >
      {(open, setOpen) => (
        <LG.MobileSlideMenu
          isOpen={open}
          onClose={() => setOpen(false)}
          variant={variant as any}
          sections={[
            {
              title: "Navigation",
              items: [
                { id: "1", label: "Home", icon: <Home size={18} /> },
                { id: "2", label: "Search", icon: <Search size={18} /> },
              ],
            },
          ]}
        />
      )}
    </PortalOverlay>
  ),

  snackbar: ({ variant }) => {
    const [key, setKey] = useState(0);
    return (
      <>
        <LG.LiquidGlassButton size="sm" onClick={() => setKey((k) => k + 1)}>
          {variant}
        </LG.LiquidGlassButton>
        {key > 0 && (
          <PortalWrap>
            <LG.MobileSnackbar
              key={key}
              message={`${variant} snackbar`}
              variant={variant as any}
              action={{ label: "Undo", onClick: () => {} }}
            />
          </PortalWrap>
        )}
      </>
    );
  },

  "top-nav-bar": ({ variant }) => (
    <LG.MobileTopNavBar
      variant={variant as any}
      title={variant}
      showBack
      rightActions={[<Search size={20} />]}
      className="w-full"
    />
  ),

  "bottom-tab-bar": ({ variant }) => {
    const [tab, setTab] = useState("home");
    const tabs = [
      { id: "home", icon: <Home size={22} />, activeIcon: <Home size={22} />, label: "Home" },
      { id: "search", icon: <Search size={22} />, activeIcon: <Search size={22} />, label: "Search" },
      { id: "notifications", icon: <Bell size={22} />, activeIcon: <Bell size={22} />, label: "Alerts" },
      { id: "profile", icon: <User size={22} />, activeIcon: <User size={22} />, label: "Profile" },
    ];
    return (
      <div className="w-full rounded-t-3xl bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 p-4">
        <LG.MobileBottomTabBar
          variant={variant as any}
          tabs={tabs}
          activeTab={tab}
          onChange={setTab}
          className="!relative !left-auto !right-auto !bottom-auto !translate-x-0"
        />
      </div>
    );
  },

  "page-indicator": ({ variant }) => (
    <LG.MobilePageIndicator currentPage={1} totalPages={5} variant={variant as any} />
  ),

  "floating-action": ({ variant }) => (
    <LG.MobileFloatingActionButton
      variant={variant as any}
      actions={[{ id: "new", icon: <Plus size={18} />, label: "New", onClick: () => {} }]}
      className="!relative !left-auto !right-auto !top-auto !bottom-auto !translate-x-0 !translate-y-0"
    />
  ),
};

function PaletteIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <path d="M12 7v6" />
    </svg>
  );
}

export function VariantDemo({ id, variant }: { id: string; variant: string }) {
  const Demo = variantDemos[id];
  if (!Demo) return null;
  return <Demo variant={variant} />;
}
