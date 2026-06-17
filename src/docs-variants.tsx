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

/* ───────── Variant demos (component.props.variant) ───────── */

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
    return <LG.LiquidGlassToggle checked={on} onChange={setOn} variant={variant as any} />;
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
      <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-[var(--lg-border)] bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 p-4 flex items-end justify-center">
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

/* ───────── Option demos (size, position, direction, orientation, etc.) ───────── */

export const optionDemos: Record<string, Record<string, React.FC<{ value: string }>>> = {
  button: {
    size: ({ value }) => <LG.LiquidGlassButton size={value as any}>{value}</LG.LiquidGlassButton>,
  },
  "ios26-button": {
    size: ({ value }) => <LG.LiquidGlassIos26Button size={value as any}>{value}</LG.LiquidGlassIos26Button>,
  },
  badge: {
    size: ({ value }) => <LG.LiquidGlassBadge size={value as any}>{value}</LG.LiquidGlassBadge>,
  },
  chip: {
    size: ({ value }) => <LG.LiquidGlassChip size={value as any}>{value}</LG.LiquidGlassChip>,
  },
  input: {
    size: ({ value }) => {
      const [val, setVal] = useState("");
      return (
        <LG.LiquidGlassInput
          value={val}
          onChange={setVal}
          placeholder={value}
          size={value as any}
          className="w-full"
        />
      );
    },
  },
  checkbox: {
    size: ({ value }) => {
      const [checked, setChecked] = useState(true);
      return (
        <LG.LiquidGlassCheckbox
          checked={checked}
          onChange={setChecked}
          size={value as any}
          label={value}
        />
      );
    },
  },
  "radio-group": {
    size: ({ value }) => {
      const [val, setVal] = useState("a");
      return (
        <LG.LiquidGlassRadioGroup
          value={val}
          onChange={setVal}
          size={value as any}
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ]}
        />
      );
    },
    direction: ({ value }) => {
      const [val, setVal] = useState("a");
      return (
        <LG.LiquidGlassRadioGroup
          value={val}
          onChange={setVal}
          direction={value as any}
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ]}
        />
      );
    },
  },
  rating: {
    size: ({ value }) => {
      const [v, setV] = useState(3);
      return <LG.LiquidGlassRating value={v} onChange={setV} size={value as any} />;
    },
  },
  toggle: {
    size: ({ value }) => {
      const [on, setOn] = useState(true);
      return <LG.LiquidGlassToggle checked={on} onChange={setOn} size={value as any} />;
    },
  },
  modal: {
    size: ({ value }) => (
      <PortalOverlay
        trigger={(setOpen) => (
          <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
            {value}
          </LG.LiquidGlassButton>
        )}
      >
        {(open, setOpen) => (
          <LG.LiquidGlassModal
            isOpen={open}
            onClose={() => setOpen(false)}
            size={value as any}
            title={`${value} modal`}
          >
            <p className="text-sm text-[var(--lg-text-secondary)]">{value} modal content.</p>
          </LG.LiquidGlassModal>
        )}
      </PortalOverlay>
    ),
  },
  progress: {
    size: ({ value }) => (
      <LG.LiquidGlassProgress value={60} size={value as any} showValue className="w-full" />
    ),
  },
  avatar: {
    size: ({ value }) => <LG.LiquidGlassAvatar size={value as any} fallback="AB" />,
  },
  "mobile-stepper": {
    size: ({ value }) => {
      const [v, setV] = useState(1);
      return <LG.MobileStepper value={v} onChange={setV} size={value as any} />;
    },
  },
  "segmented-control": {
    size: ({ value }) => {
      const [v, setV] = useState("all");
      return (
        <LG.MobileSegmentedControl
          selected={v}
          onChange={setV}
          size={value as any}
          segments={[
            { id: "all", label: "All" },
            { id: "recent", label: "Recent" },
            { id: "favs", label: "Favs" },
          ]}
          className="w-full"
        />
      );
    },
  },
  drawer: {
    position: ({ value }) => (
      <PortalOverlay
        trigger={(setOpen) => (
          <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
            {value}
          </LG.LiquidGlassButton>
        )}
      >
        {(open, setOpen) => (
          <LG.LiquidGlassDrawer
            isOpen={open}
            onClose={() => setOpen(false)}
            position={value as any}
            title={`${value} drawer`}
          >
            <p className="text-sm text-[var(--lg-text-secondary)]">{value} drawer content.</p>
          </LG.LiquidGlassDrawer>
        )}
      </PortalOverlay>
    ),
  },
  tooltip: {
    position: ({ value }) => (
      <LG.LiquidGlassTooltip content="Tooltip text" position={value as any}>
        <LG.LiquidGlassButton size="sm">{value}</LG.LiquidGlassButton>
      </LG.LiquidGlassTooltip>
    ),
  },
  dock: {
    position: ({ value }) => {
      const [active, setActive] = useState("home");
      const items = [
        { id: "home", icon: <Home size={22} />, label: "Home", active: active === "home", onClick: () => setActive("home") },
        { id: "search", icon: <Search size={22} />, label: "Search", active: active === "search", onClick: () => setActive("search") },
        { id: "photos", icon: <ImageIcon size={22} />, label: "Photos", active: active === "photos", onClick: () => setActive("photos") },
        { id: "settings", icon: <Settings size={22} />, label: "Settings", active: active === "settings", onClick: () => setActive("settings") },
      ];
      const placement =
        value === "bottom"
          ? "!absolute !bottom-3 !left-1/2 !-translate-x-1/2"
          : value === "top"
          ? "!absolute !top-3 !left-1/2 !-translate-x-1/2"
          : value === "left"
          ? "!absolute !left-3 !top-1/2 !-translate-y-1/2"
          : "!absolute !right-3 !top-1/2 !-translate-y-1/2";
      return (
        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[var(--lg-border)] bg-gradient-to-br from-liquid-blue/10 to-liquid-purple/10">
          <LG.LiquidGlassDock position={value as any} items={items} className={placement} />
        </div>
      );
    },
  },
  "slide-menu": {
    position: ({ value }) => (
      <PortalOverlay
        trigger={(setOpen) => (
          <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
            {value}
          </LG.LiquidGlassButton>
        )}
      >
        {(open, setOpen) => (
          <LG.MobileSlideMenu
            isOpen={open}
            onClose={() => setOpen(false)}
            position={value as any}
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
  },
  "floating-action": {
    position: ({ value }) => (
      <LG.MobileFloatingActionButton
        position={value as any}
        actions={[{ id: "new", icon: <Plus size={18} />, label: "New", onClick: () => {} }]}
        className="!relative !left-auto !right-auto !top-auto !bottom-auto !translate-x-0 !translate-y-0"
      />
    ),
  },
  toast: {
    position: ({ value }) => {
      const [toasts, setToasts] = useState<{ id: string; message: string; variant: any }[]>([]);
      return (
        <>
          <LG.LiquidGlassButton
            size="sm"
            onClick={() =>
              setToasts([
                {
                  id: Math.random().toString(36).slice(2),
                  message: value,
                  variant: "info",
                },
              ])
            }
          >
            {value}
          </LG.LiquidGlassButton>
          <PortalWrap>
            <LG.LiquidGlassToast
              toasts={toasts}
              position={value as any}
              onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
            />
          </PortalWrap>
        </>
      );
    },
  },
  stepper: {
    orientation: ({ value }) => {
      const steps = [
        { label: "Account", description: "Create your account" },
        { label: "Profile", description: "Add your details" },
        { label: "Verify", description: "Confirm email" },
      ];
      return (
        <LG.LiquidGlassStepper
          orientation={value as any}
          steps={steps}
          currentStep={1}
        />
      );
    },
  },
  resizable: {
    direction: ({ value }) => (
      <LG.LiquidGlassResizable
        direction={value as any}
        defaultWidth={160}
        defaultHeight={90}
        minWidth={100}
        minHeight={60}
      >
        <p className="text-xs text-[var(--lg-text-secondary)] capitalize">{value}</p>
      </LG.LiquidGlassResizable>
    ),
  },
};

/* ───────── Shared helpers ───────── */

export function BottomTabBarLayoutDemos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-[var(--lg-border)] glass-blur-sm glass-surface p-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--lg-text-muted)] mb-2">
          Center button
        </p>
        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-[var(--lg-border)] bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 p-4 flex items-end justify-center">
          <CenterTabBarDemo />
        </div>
      </div>
      <div className="rounded-xl border border-[var(--lg-border)] glass-blur-sm glass-surface p-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--lg-text-muted)] mb-2">
          Trailing button
        </p>
        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-[var(--lg-border)] bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 p-4 flex items-center justify-center">
          <TrailingTabBarDemo />
        </div>
      </div>
    </div>
  );
}

function CenterTabBarDemo() {
  const [tab, setTab] = useState("home");
  const tabs = [
    { id: "home", icon: <Home size={22} />, activeIcon: <Home size={22} />, label: "Home" },
    { id: "search", icon: <Search size={22} />, activeIcon: <Search size={22} />, label: "Search" },
    { id: "notifications", icon: <Bell size={22} />, activeIcon: <Bell size={22} />, label: "Alerts" },
    { id: "profile", icon: <User size={22} />, activeIcon: <User size={22} />, label: "Profile" },
  ];
  return (
    <LG.MobileBottomTabBar
      variant="ios26-fluid"
      tabs={tabs}
      activeTab={tab}
      onChange={setTab}
      centerTabButton={{ icon: <Plus size={24} />, label: "Create", onClick: () => {} }}
      className="!relative !left-auto !right-auto !bottom-auto !translate-x-0"
    />
  );
}

function TrailingTabBarDemo() {
  const [tab, setTab] = useState("home");
  const tabs = [
    { id: "home", icon: <Home size={22} />, activeIcon: <Home size={22} />, label: "Home" },
    { id: "search", icon: <Search size={22} />, activeIcon: <Search size={22} />, label: "Search" },
    { id: "notifications", icon: <Bell size={22} />, activeIcon: <Bell size={22} />, label: "Alerts" },
    { id: "profile", icon: <User size={22} />, activeIcon: <User size={22} />, label: "Profile" },
  ];
  return (
    <LG.MobileBottomTabBar
      variant="ios26-super-pill"
      tabs={tabs}
      activeTab={tab}
      onChange={setTab}
      trailingButton={{ icon: <Share2 size={22} />, label: "Share", onClick: () => {} }}
      className="!relative !left-auto !right-auto !bottom-auto !translate-x-0"
    />
  );
}

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

function ImageIcon({ size }: { size: number }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export function VariantDemo({ id, variant }: { id: string; variant: string }) {
  const Demo = variantDemos[id];
  if (!Demo) return null;
  return <Demo variant={variant} />;
}

export function OptionDemo({
  id,
  prop,
  value,
}: {
  id: string;
  prop: string;
  value: string;
}) {
  const Demo = optionDemos[id]?.[prop];
  if (!Demo) return null;
  return <Demo value={value} />;
}
