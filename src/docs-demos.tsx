import { useState } from "react";
import * as LG from "./components/liquid-glass";
import { cn } from "./utils/cn";
import {
  Home,
  Search,
  User,
  Bell,
  Settings,
  Plus,
  Heart,
  Image,
  Share2,
  Trash2,
  Camera,
  Sparkles,
  Palette,
  Zap,
  Command,
  BarChart3,
  Users,
  Activity,
  TrendingDown,
  Check,
} from "lucide-react";

function DemoBox({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--lg-border)] glass-blur-sm glass-surface p-5 my-4",
        className
      )}
    >
      {label && (
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--lg-text-muted)] mb-3">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

const componentDemos: Record<string, React.FC> = {
  "glass-sheen": () => (
    <DemoBox className="relative h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-liquid-blue/30 to-liquid-purple/30 rounded-2xl" />
      <LG.GlassSheen className="absolute inset-0" />
    </DemoBox>
  ),

  "glass-top-highlight": () => (
    <DemoBox className="relative h-24 rounded-2xl bg-[var(--lg-border-subtle)] overflow-hidden">
      <LG.GlassTopHighlight className="absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--lg-text-muted)]">
        Top highlight line
      </div>
    </DemoBox>
  ),

  "press-splash": () => {
    const { state, onPointerDown, onPointerUp, onPointerLeave } = LG.useLiquidPress<HTMLDivElement>();
    return (
      <DemoBox>
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
          className="relative h-24 rounded-2xl bg-[var(--lg-border-subtle)] overflow-hidden flex items-center justify-center select-none"
        >
          <LG.LiquidGlassPressSplash press={state} />
          <span className="text-sm text-[var(--lg-text-muted)]">Press and hold</span>
        </div>
      </DemoBox>
    );
  },

  "theme-provider": () => {
    const { theme, toggleTheme } = LG.useTheme();
    return (
      <DemoBox>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--lg-text-secondary)]">Theme: {theme}</span>
          <LG.LiquidGlassButton size="sm" onClick={toggleTheme}>
            Toggle
          </LG.LiquidGlassButton>
        </div>
      </DemoBox>
    );
  },

  "use-glass-surface": () => {
    const { style, className } = LG.useGlassSurface({ variant: "surface-strong" });
    return (
      <DemoBox>
        <div
          style={style}
          className={cn(className, "h-20 rounded-2xl grid place-items-center text-sm text-[var(--lg-text)]")}
        >
          Glass surface
        </div>
      </DemoBox>
    );
  },

  "use-liquid-press": () => {
    const { state, onPointerDown } = LG.useLiquidPress<HTMLButtonElement>();
    return (
      <DemoBox>
        <button
          onPointerDown={onPointerDown}
          className="px-4 py-2 rounded-xl bg-[var(--lg-border-subtle)] text-sm text-[var(--lg-text)]"
        >
          Pressed: {state.isPressed ? "yes" : "no"}
        </button>
      </DemoBox>
    );
  },

  controls: () => (
    <DemoBox>
      <LG.LiquidGlassControls />
    </DemoBox>
  ),

  card: () => (
    <DemoBox>
      <LG.LiquidGlassCard>
        <h3 className="font-semibold text-[var(--lg-text)]">Card title</h3>
        <p className="text-sm text-[var(--lg-text-secondary)] mt-1">
          A basic glass card container.
        </p>
      </LG.LiquidGlassCard>
    </DemoBox>
  ),

  "fluid-card": () => (
    <DemoBox>
      <LG.LiquidGlassFluidCard variant="ios26">
        <p className="text-sm text-[var(--lg-text-secondary)]">
          Move your cursor over this card to see the liquid refraction glow follow you.
        </p>
      </LG.LiquidGlassFluidCard>
    </DemoBox>
  ),

  "scroll-area": () => (
    <DemoBox>
      <LG.LiquidGlassScrollArea maxHeight="120px" className="pr-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="p-2 mb-1 rounded-lg bg-[var(--lg-border-subtle)] text-sm text-[var(--lg-text)]"
          >
            Item {i + 1}
          </div>
        ))}
      </LG.LiquidGlassScrollArea>
    </DemoBox>
  ),

  resizable: () => (
    <DemoBox>
      <LG.LiquidGlassResizable defaultWidth={260} defaultHeight={120} minWidth={180} minHeight={80}>
        <p className="text-sm text-[var(--lg-text-secondary)]">
          Drag the bottom-right handle to resize this glass panel.
        </p>
      </LG.LiquidGlassResizable>
    </DemoBox>
  ),

  button: () => (
    <DemoBox label="Variants">
      <div className="flex flex-wrap gap-2">
        <LG.LiquidGlassButton variant="primary">Primary</LG.LiquidGlassButton>
        <LG.LiquidGlassButton variant="secondary">Secondary</LG.LiquidGlassButton>
        <LG.LiquidGlassButton variant="ghost">Ghost</LG.LiquidGlassButton>
        <LG.LiquidGlassButton variant="danger">Danger</LG.LiquidGlassButton>
        <LG.LiquidGlassButton loading>Loading</LG.LiquidGlassButton>
      </div>
    </DemoBox>
  ),

  "ios26-button": () => (
    <DemoBox>
      <div className="flex flex-wrap gap-2 items-end">
        <LG.LiquidGlassIos26Button icon={<Sparkles size={16} />}>Chrome</LG.LiquidGlassIos26Button>
        <LG.LiquidGlassIos26Button size="sm">Small</LG.LiquidGlassIos26Button>
        <LG.LiquidGlassIos26Button size="lg" icon={<Zap size={18} />}>
          Large
        </LG.LiquidGlassIos26Button>
      </div>
    </DemoBox>
  ),

  toggle: () => {
    const [on, setOn] = useState(true);
    return (
      <DemoBox label="Variants">
        <div className="space-y-3">
          <LG.LiquidGlassToggle checked={on} onChange={setOn} variant="fluid" label="Fluid" />
          <LG.LiquidGlassToggle checked={on} onChange={setOn} variant="ios26" label="iOS 26" />
        </div>
      </DemoBox>
    );
  },

  slider: () => {
    const [v, setV] = useState(65);
    return (
      <DemoBox>
        <LG.LiquidGlassSlider
          value={v}
          onChange={setV}
          label="Volume"
          valueFormatter={(v) => `${v}%`}
        />
      </DemoBox>
    );
  },

  "segmented-control": () => {
    const [v, setV] = useState("all");
    return (
      <DemoBox>
        <LG.MobileSegmentedControl
          segments={[
            { id: "all", label: "All" },
            { id: "recent", label: "Recent" },
            { id: "favorites", label: "Favorites" },
          ]}
          selected={v}
          onChange={setV}
        />
      </DemoBox>
    );
  },

  "tab-bar": () => {
    const [i, setI] = useState(0);
    const tabs = [
      { label: "General", icon: <Settings size={14} /> },
      { label: "Appearance", icon: <Palette size={14} /> },
      { label: "Security", icon: <Check size={14} /> },
    ];
    return (
      <DemoBox label="Default">
        <LG.LiquidGlassTabBar tabs={tabs} activeIndex={i} onChange={setI} />
      </DemoBox>
    );
  },

  navigation: () => {
    const [active, setActive] = useState("Home");
    const items = [
      { label: "Home", icon: <Home size={16} />, active: active === "Home", onClick: () => setActive("Home") },
      { label: "Explore", icon: <Search size={16} />, active: active === "Explore", onClick: () => setActive("Explore") },
      { label: "Saved", icon: <Heart size={16} />, active: active === "Saved", onClick: () => setActive("Saved") },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassNavigation items={items} />
      </DemoBox>
    );
  },

  breadcrumb: () => (
    <DemoBox>
      <LG.LiquidGlassBreadcrumb
        items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Glass" }]}
      />
    </DemoBox>
  ),

  dock: () => {
    const [active, setActive] = useState("photos");
    const items = [
      { id: "home", icon: <Home size={22} />, label: "Home", active: active === "home", onClick: () => setActive("home") },
      { id: "photos", icon: <Image size={22} />, label: "Photos", active: active === "photos", onClick: () => setActive("photos") },
      { id: "search", icon: <Search size={22} />, label: "Search", active: active === "search", onClick: () => setActive("search") },
      { id: "heart", icon: <Heart size={22} />, label: "Favs", active: active === "heart", onClick: () => setActive("heart") },
      { id: "settings", icon: <Settings size={22} />, label: "Settings", active: active === "settings", onClick: () => setActive("settings") },
    ];
    return (
      <DemoBox className="flex justify-center">
        <LG.LiquidGlassDock items={items} />
      </DemoBox>
    );
  },

  menubar: () => (
    <DemoBox>
      <LG.LiquidGlassMenubar
        menus={[
          {
            label: "File",
            items: [
              { label: "New", shortcut: "⌘N" },
              { label: "Open", shortcut: "⌘O" },
              { separator: true, label: "" },
              { label: "Save", shortcut: "⌘S" },
            ],
          },
          {
            label: "Edit",
            items: [
              { label: "Undo", shortcut: "⌘Z" },
              { label: "Cut", shortcut: "⌘X" },
            ],
          },
        ]}
      />
    </DemoBox>
  ),

  input: () => {
    const [val, setVal] = useState("");
    return (
      <DemoBox>
        <LG.LiquidGlassInput
          value={val}
          onChange={setVal}
          placeholder="Enter your email"
          label="Email"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
        />
        <div className="mt-3">
          <LG.LiquidGlassInput type="password" placeholder="••••••••" error="Min 8 characters" />
        </div>
      </DemoBox>
    );
  },

  select: () => {
    const [val, setVal] = useState("option2");
    return (
      <DemoBox>
        <LG.LiquidGlassSelect
          label="Theme"
          value={val}
          onChange={setVal}
          options={[
            { value: "option1", label: "System Default", icon: <Command size={14} className="text-[var(--lg-text-muted)]" /> },
            { value: "option2", label: "Liquid Glass", icon: <Sparkles size={14} className="text-liquid-blue" /> },
          ]}
        />
      </DemoBox>
    );
  },

  checkbox: () => {
    const [a, setA] = useState(true);
    return (
      <DemoBox>
        <LG.LiquidGlassCheckbox checked={a} onChange={setA} label="Enable notifications" />
      </DemoBox>
    );
  },

  "radio-group": () => {
    const [val, setVal] = useState("personal");
    return (
      <DemoBox>
        <LG.LiquidGlassRadioGroup
          value={val}
          onChange={setVal}
          options={[
            { value: "personal", label: "Personal" },
            { value: "team", label: "Team" },
          ]}
        />
      </DemoBox>
    );
  },

  "color-picker": () => {
    const [c, setC] = useState("#3b82f6");
    return (
      <DemoBox>
        <LG.LiquidGlassColorPicker value={c} onChange={setC} />
        <div className="mt-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: c }} />
          <span className="text-sm font-mono text-[var(--lg-text-secondary)]">{c}</span>
        </div>
      </DemoBox>
    );
  },

  "file-upload": () => (
    <DemoBox>
      <LG.LiquidGlassFileUpload onFilesSelected={(files) => alert(`${files.length} file(s) selected`)} />
    </DemoBox>
  ),

  "search-bar": () => {
    const [q, setQ] = useState("");
    return (
      <DemoBox className="max-w-md mx-auto">
        <LG.MobileSearchBar value={q} onChange={setQ} showCancelButton />
      </DemoBox>
    );
  },

  alert: () => (
    <DemoBox>
      <div className="space-y-2">
        <LG.LiquidGlassAlert variant="info" title="Info">Informational message.</LG.LiquidGlassAlert>
        <LG.LiquidGlassAlert variant="success" title="Success">Saved successfully.</LG.LiquidGlassAlert>
        <LG.LiquidGlassAlert variant="warning" title="Warning">Please review.</LG.LiquidGlassAlert>
        <LG.LiquidGlassAlert variant="error" title="Error">Something went wrong.</LG.LiquidGlassAlert>
      </div>
    </DemoBox>
  ),

  badge: () => (
    <DemoBox>
      <div className="flex flex-wrap gap-2">
        <LG.LiquidGlassBadge>Default</LG.LiquidGlassBadge>
        <LG.LiquidGlassBadge variant="primary" dot>New</LG.LiquidGlassBadge>
        <LG.LiquidGlassBadge variant="success">Active</LG.LiquidGlassBadge>
        <LG.LiquidGlassBadge variant="danger">Error</LG.LiquidGlassBadge>
      </div>
    </DemoBox>
  ),

  progress: () => (
    <DemoBox>
      <LG.LiquidGlassProgress value={75} showValue animated />
      <LG.LiquidGlassProgress value={45} variant="gradient" showValue className="mt-3" />
    </DemoBox>
  ),

  rating: () => {
    const [v, setV] = useState(3.5);
    return (
      <DemoBox>
        <LG.LiquidGlassRating value={v} onChange={setV} showValue />
      </DemoBox>
    );
  },

  toast: () => {
    const [toasts, setToasts] = useState<{ id: string; message: string; variant: any }[]>([]);
    const add = (message: string, variant: any) =>
      setToasts((t) => [...t, { id: Math.random().toString(36).slice(2), message, variant }]);
    return (
      <DemoBox>
        <div className="flex flex-wrap gap-2">
          <LG.LiquidGlassButton size="sm" onClick={() => add("Info", "info")}>Info</LG.LiquidGlassButton>
          <LG.LiquidGlassButton size="sm" variant="success" onClick={() => add("Saved", "success")}>
            Success
          </LG.LiquidGlassButton>
          <LG.LiquidGlassButton size="sm" variant="danger" onClick={() => add("Error", "error")}>
            Error
          </LG.LiquidGlassButton>
        </div>
        <LG.LiquidGlassToast toasts={toasts} onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
      </DemoBox>
    );
  },

  skeleton: () => (
    <DemoBox>
      <LG.LiquidGlassSkeleton lines={4} width="100%" height={12} />
    </DemoBox>
  ),

  "empty-state": () => (
    <DemoBox>
      <LG.LiquidGlassEmptyState
        variant="search"
        title="No results"
        description="Try a different search term."
        action={<LG.LiquidGlassButton size="sm">Clear search</LG.LiquidGlassButton>}
      />
    </DemoBox>
  ),

  snackbar: () => {
    const [key, setKey] = useState(0);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setKey((k) => k + 1)}>
          Show snackbar
        </LG.LiquidGlassButton>
        {key > 0 && (
          <LG.MobileSnackbar
            key={key}
            message="Changes saved"
            action={{ label: "Undo", onClick: () => {} }}
            variant="success"
          />
        )}
      </DemoBox>
    );
  },

  avatar: () => (
    <DemoBox>
      <div className="flex items-center gap-3 flex-wrap">
        <LG.LiquidGlassAvatar size="sm" fallback="JD" status="online" />
        <LG.LiquidGlassAvatar size="md" fallback="MK" status="away" ring />
        <LG.LiquidGlassAvatar size="lg" fallback="SL" status="busy" />
        <LG.LiquidGlassAvatar size="xl" fallback="RW" status="offline" ring />
      </div>
    </DemoBox>
  ),

  chip: () => {
    const [active, setActive] = useState(true);
    return (
      <DemoBox>
        <div className="flex flex-wrap gap-2">
          <LG.LiquidGlassChip active={active} onClick={() => setActive(!active)}>
            Design
          </LG.LiquidGlassChip>
          <LG.LiquidGlassChip variant="primary" onRemove={() => {}} icon={<Check size={12} />}>
            Selected
          </LG.LiquidGlassChip>
        </div>
      </DemoBox>
    );
  },

  carousel: () => {
    const items = [
      {
        id: "1",
        content: (
          <div className="w-full h-full bg-gradient-to-br from-liquid-blue/30 to-liquid-purple/30 flex items-center justify-center rounded-2xl">
            <span className="text-2xl text-[var(--lg-text-muted)]">1</span>
          </div>
        ),
      },
      {
        id: "2",
        content: (
          <div className="w-full h-full bg-gradient-to-br from-liquid-emerald/30 to-liquid-cyan/30 flex items-center justify-center rounded-2xl">
            <span className="text-2xl text-[var(--lg-text-muted)]">2</span>
          </div>
        ),
      },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassCarousel items={items} />
      </DemoBox>
    );
  },

  "music-player": () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassMusicPlayer />
    </DemoBox>
  ),

  "weather-widget": () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassWeatherWidget />
    </DemoBox>
  ),

  table: () => {
    const data = [
      { id: "1", name: "Alice Johnson", role: "Designer", status: "Active", team: "Product" },
      { id: "2", name: "Bob Smith", role: "Developer", status: "Away", team: "Engineering" },
      { id: "3", name: "Carol White", role: "Manager", status: "Active", team: "Operations" },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassTable
          data={data}
          rowKey={(r: any) => r.id}
          columns={[
            { key: "name", header: "Name", sortable: true },
            { key: "role", header: "Role", sortable: true },
            {
              key: "status",
              header: "Status",
              render: (r: any) => (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-md",
                    r.status === "Active"
                      ? "bg-liquid-emerald/15 text-liquid-emerald"
                      : "bg-liquid-amber/15 text-liquid-amber"
                  )}
                >
                  {r.status}
                </span>
              ),
            },
            { key: "team", header: "Team", sortable: true },
          ]}
        />
      </DemoBox>
    );
  },

  pagination: () => {
    const [p, setP] = useState(3);
    return (
      <DemoBox className="flex justify-center">
        <LG.LiquidGlassPagination currentPage={p} totalPages={10} onChange={setP} />
      </DemoBox>
    );
  },

  timeline: () => {
    const items = [
      { id: "1", title: "Project created", description: "Initial setup", timestamp: "2h ago", color: "blue" as const },
      { id: "2", title: "Design review", description: "UI approved", timestamp: "5h ago", color: "purple" as const },
      { id: "3", title: "Deployment", description: "Live", timestamp: "2d ago", color: "emerald" as const },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassTimeline items={items} />
      </DemoBox>
    );
  },

  accordion: () => {
    const items = [
      { id: "1", title: "What is Liquid Glass?", content: "Apple's next-gen design language with translucent, frosted glass surfaces." },
      { id: "2", title: "How does blur work?", content: "CSS backdrop-filter with high blur + saturation creates frosted glass." },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassAccordion items={items} defaultOpen={["1"]} />
      </DemoBox>
    );
  },

  calendar: () => {
    const [d, setD] = useState(new Date());
    return (
      <DemoBox className="flex justify-center">
        <LG.LiquidGlassCalendar value={d} onChange={setD} highlightedDates={[new Date()]} />
      </DemoBox>
    );
  },

  "stat-card": () => {
    const stats = [
      { label: "Users", value: "24.5K", change: 12.5, icon: <Users size={18} />, iconColor: "text-liquid-blue", iconBg: "bg-liquid-blue/10" },
      { label: "Revenue", value: "$84.2K", change: -3.2, icon: <BarChart3 size={18} />, iconColor: "text-liquid-emerald", iconBg: "bg-liquid-emerald/10" },
      { label: "Active", value: "1,284", change: 8.1, icon: <Activity size={18} />, iconColor: "text-liquid-purple", iconBg: "bg-liquid-purple/10" },
      { label: "Bounce", value: "42.3%", change: -1.5, icon: <TrendingDown size={18} />, iconColor: "text-liquid-amber", iconBg: "bg-liquid-amber/10" },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassStatCard stats={stats} />
      </DemoBox>
    );
  },

  stepper: () => {
    const steps = [
      { label: "Account", description: "Create your account" },
      { label: "Profile", description: "Add your details" },
      { label: "Verify", description: "Confirm email" },
    ];
    const [current, setCurrent] = useState(0);
    return (
      <DemoBox>
        <LG.LiquidGlassStepper steps={steps} currentStep={current} />
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="px-2 py-1 rounded-md bg-[var(--lg-border-subtle)] text-xs text-[var(--lg-text-secondary)]"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </DemoBox>
    );
  },

  "mobile-stepper": () => {
    const [v, setV] = useState(1);
    return (
      <DemoBox className="max-w-xs mx-auto">
        <LG.MobileStepper value={v} onChange={setV} label="Qty" />
      </DemoBox>
    );
  },

  kanban: () => {
    const columns = [
      {
        id: "todo",
        title: "To Do",
        color: "#3b82f6",
        tasks: [{ id: "t1", title: "Design system", description: "Define tokens", tag: "Design", tagColor: "#3b82f6" }],
      },
      {
        id: "done",
        title: "Done",
        color: "#10b981",
        tasks: [{ id: "t2", title: "Kickoff", description: "Project started", tag: "Plan", tagColor: "#f43f5e" }],
      },
    ];
    return (
      <DemoBox>
        <LG.LiquidGlassKanban columns={columns} />
      </DemoBox>
    );
  },

  tooltip: () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassTooltip content="I'm a glass tooltip">
        <LG.LiquidGlassButton size="sm" variant="secondary">
          Hover me
        </LG.LiquidGlassButton>
      </LG.LiquidGlassTooltip>
    </DemoBox>
  ),

  "hover-card": () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassHoverCard
        content={
          <div className="text-sm text-[var(--lg-text-secondary)]">
            <p className="font-semibold text-[var(--lg-text)] mb-1">Liquid Glass</p>
            <p>Hover to reveal more details in a glass card.</p>
          </div>
        }
      >
        <LG.LiquidGlassButton size="sm" variant="secondary">
          Hover me
        </LG.LiquidGlassButton>
      </LG.LiquidGlassHoverCard>
    </DemoBox>
  ),

  "notification-dropdown": () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassNotificationDropdown />
    </DemoBox>
  ),

  "context-menu": () => (
    <DemoBox className="flex justify-center">
      <LG.LiquidGlassContextMenu
        items={[
          { id: "share", label: "Share", onClick: () => {} },
          { id: "sep", separator: true, label: "" },
          { id: "delete", label: "Delete", onClick: () => {} },
        ]}
      >
        <div className="p-6 rounded-xl bg-[var(--lg-border-subtle)] text-sm text-[var(--lg-text-muted)] text-center">
          Right click here
        </div>
      </LG.LiquidGlassContextMenu>
    </DemoBox>
  ),

  modal: () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton onClick={() => setOpen(true)}>Open modal</LG.LiquidGlassButton>
        <LG.LiquidGlassModal isOpen={open} onClose={() => setOpen(false)} title="Glass Modal">
          <p className="text-sm text-[var(--lg-text-secondary)]">This is a glass modal dialog.</p>
        </LG.LiquidGlassModal>
      </DemoBox>
    );
  },

  drawer: () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton variant="secondary" onClick={() => setOpen(true)}>
          Open drawer
        </LG.LiquidGlassButton>
        <LG.LiquidGlassDrawer isOpen={open} onClose={() => setOpen(false)} title="Settings" position="right">
          <p className="text-sm text-[var(--lg-text-secondary)]">Drawer content goes here.</p>
        </LG.LiquidGlassDrawer>
      </DemoBox>
    );
  },

  sheet: () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton variant="secondary" onClick={() => setOpen(true)}>
          Open sheet
        </LG.LiquidGlassButton>
        <LG.LiquidGlassSheet isOpen={open} onClose={() => setOpen(false)} title="Actions">
          <p className="text-sm text-[var(--lg-text-secondary)]">Bottom sheet content.</p>
        </LG.LiquidGlassSheet>
      </DemoBox>
    );
  },

  "command-palette": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open command palette
        </LG.LiquidGlassButton>
        <LG.LiquidGlassCommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          items={[
            { id: "1", label: "Search", shortcut: "⌘F", category: "Navigation", icon: <Search size={14} /> },
            { id: "2", label: "Theme", shortcut: "⌘T", category: "Preferences", icon: <Palette size={14} /> },
          ]}
        />
      </DemoBox>
    );
  },

  "action-sheet": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open action sheet
        </LG.LiquidGlassButton>
        <LG.MobileActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Share this item"
          items={[
            { id: "1", title: "Share", icon: <Share2 size={18} /> },
            { id: "2", title: "Delete", destructive: true, icon: <Trash2 size={18} /> },
          ]}
        />
      </DemoBox>
    );
  },

  "alert-dialog": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open alert dialog
        </LG.LiquidGlassButton>
        <LG.MobileAlertDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete Item?"
          message="This action cannot be undone."
          icon="warning"
          options={[{ text: "Delete", style: "destructive" }, { text: "Cancel", style: "cancel" }]}
        />
      </DemoBox>
    );
  },

  "app-rating": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Rate app
        </LG.LiquidGlassButton>
        <LG.MobileAppRating isOpen={open} onClose={() => setOpen(false)} onRate={() => setOpen(false)} appName="Liquid Glass" />
      </DemoBox>
    );
  },

  "permission-dialog": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open permissions
        </LG.LiquidGlassButton>
        <LG.MobilePermissionDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Permissions"
          message="Allow access for the best experience."
          permissions={[
            { id: "1", title: "Camera", description: "Take photos", icon: <Camera size={20} /> },
            { id: "2", title: "Notifications", description: "Stay updated", icon: <Bell size={20} />, granted: true },
          ]}
        />
      </DemoBox>
    );
  },

  "slide-menu": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open slide menu
        </LG.LiquidGlassButton>
        <LG.MobileSlideMenu
          isOpen={open}
          onClose={() => setOpen(false)}
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
      </DemoBox>
    );
  },

  "splash-screen": () => {
    const [open, setOpen] = useState(false);
    return (
      <DemoBox>
        <LG.LiquidGlassButton size="sm" onClick={() => setOpen(true)}>
          Open splash screen
        </LG.LiquidGlassButton>
        <LG.MobileSplashScreen
          isOpen={open}
          onClose={() => setOpen(false)}
          slides={[
            { id: "1", title: "Welcome", subtitle: "Liquid Glass", icon: <Sparkles size={32} />, gradient: "bg-gradient-to-b from-liquid-blue/30 to-transparent" },
          ]}
        />
      </DemoBox>
    );
  },

  "bottom-tab-bar": () => {
    const [tab, setTab] = useState("home");
    const tabs = [
      { id: "home", icon: <Home size={22} />, activeIcon: <Home size={22} />, label: "Home" },
      { id: "search", icon: <Search size={22} />, activeIcon: <Search size={22} />, label: "Search" },
      { id: "notifications", icon: <Bell size={22} />, activeIcon: <Bell size={22} />, label: "Alerts" },
      { id: "profile", icon: <User size={22} />, activeIcon: <User size={22} />, label: "Profile" },
    ];
    return (
      <DemoBox className="flex justify-center">
        <div className="w-full max-w-sm rounded-t-3xl bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 p-4">
          <LG.MobileBottomTabBar tabs={tabs} activeTab={tab} onChange={setTab} variant="ios26-fluid" />
        </div>
      </DemoBox>
    );
  },

  "top-nav-bar": () => (
    <DemoBox className="max-w-md mx-auto">
      <LG.MobileTopNavBar variant="standard" title="Messages" showBack rightActions={[<Search size={20} />]} />
    </DemoBox>
  ),

  "context-preview": () => (
    <DemoBox className="flex justify-center">
      <LG.MobileContextPreview
        actions={[
          { id: "1", title: "Preview", icon: <Search size={14} /> },
          { id: "2", title: "Share", icon: <Share2 size={14} /> },
        ]}
      >
        <div className="p-6 rounded-xl bg-[var(--lg-border-subtle)] text-sm text-[var(--lg-text-muted)] text-center">
          Right click / long press
        </div>
      </LG.MobileContextPreview>
    </DemoBox>
  ),

  "floating-action": () => (
    <DemoBox className="relative h-32 flex items-center justify-center gap-8">
      <LG.MobileFloatingActionButton
        variant="chrome"
        actions={[{ id: "new", icon: <Plus size={18} />, label: "New", onClick: () => {} }]}
      />
      <LG.MobileFloatingActionButton
        variant="colored"
        actions={[{ id: "new", icon: <Plus size={18} />, label: "New", onClick: () => {} }]}
      />
    </DemoBox>
  ),

  "page-indicator": () => {
    const [p, setP] = useState(0);
    return (
      <DemoBox>
        <div className="flex justify-center mb-3">
          <LG.MobilePageIndicator currentPage={p} totalPages={5} variant="dots" />
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setP(i)}
              className="px-2 py-1 rounded-md bg-[var(--lg-border-subtle)] text-xs text-[var(--lg-text-secondary)]"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </DemoBox>
    );
  },

  "swipeable-list": () => {
    const items = [
      {
        id: "1",
        content: (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-liquid-blue/20 grid place-items-center text-xs font-bold text-[var(--lg-text-muted)]">
              A
            </div>
            <div>
              <p className="text-sm text-[var(--lg-text)]">Alice Johnson</p>
              <p className="text-xs text-[var(--lg-text-muted)]">Unread message</p>
            </div>
          </div>
        ),
        rightActions: [{ icon: <Trash2 size={16} className="text-white" />, color: "rgba(244,63,94,0.5)", onClick: () => {} }],
      },
      {
        id: "2",
        content: (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-liquid-emerald/20 grid place-items-center text-xs font-bold text-[var(--lg-text-muted)]">
              B
            </div>
            <div>
              <p className="text-sm text-[var(--lg-text)]">Bob Smith</p>
              <p className="text-xs text-[var(--lg-text-muted)]">Shared a file</p>
            </div>
          </div>
        ),
        rightActions: [{ icon: <Trash2 size={16} className="text-white" />, color: "rgba(244,63,94,0.5)", onClick: () => {} }],
      },
    ];
    return (
      <DemoBox>
        <LG.MobileSwipeableList items={items} />
      </DemoBox>
    );
  },
};

export default componentDemos;
