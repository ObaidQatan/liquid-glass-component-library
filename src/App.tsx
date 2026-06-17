import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search, Home, User, Heart, Settings, Bell, Plus,
  Sparkles, LayoutGrid, List, Layers, Command,
  Palette, MessageSquare, SlidersHorizontal, Shield,
  Zap, Send, Download, Check, Trash2,
  Image, Bookmark, Share2, ExternalLink, Copy,
  BarChart3, Activity, TrendingDown, Users,
  MoreVertical, MapPin, Camera, Mic,
  Sun, Moon, BookOpen,
} from "lucide-react";

import * as LG from "./components/liquid-glass";
import { cn } from "./utils/cn";
import type { ToastItem } from "./components/liquid-glass/LiquidGlassToast";
import type { MobileBottomTabVariant } from "./components/liquid-glass/MobileBottomTabBar";
import Docs from "./Docs";
import { useRoute, navigate } from "./router";

/* ───────── Animated Background ───────── */
function AnimatedBackground() {
  const { isDark } = LG.useTheme();
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500">
      <div className="absolute inset-0 bg-[var(--lg-bg)]" />
      <motion.div animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={cn("absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[120px]", isDark ? "bg-liquid-blue/15" : "bg-liquid-blue/10")} />
      <motion.div animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={cn("absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full blur-[100px]", isDark ? "bg-liquid-purple/15" : "bg-liquid-purple/8")} />
      <motion.div animate={{ x: [0, 50, -100, 0], y: [0, -40, 80, 0], scale: [1, 1.1, 0.8, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={cn("absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full blur-[100px]", isDark ? "bg-liquid-pink/10" : "bg-liquid-pink/6")} />
      <motion.div animate={{ x: [0, -60, 80, 0], y: [0, 100, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={cn("absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[90px]", isDark ? "bg-liquid-cyan/10" : "bg-liquid-cyan/6")} />
    </div>
  );
}

/* ───────── Helpers ───────── */
function SectionHeader({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lg-border)] text-[var(--lg-text-secondary)]">{icon}</div>
        <h2 className="text-xl font-semibold text-[var(--lg-text)]">{title}</h2>
      </div>
      <p className="text-sm text-[var(--lg-text-muted)] ml-11">{description}</p>
    </div>
  );
}

function ComponentGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) {
  const cc = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return <div className={cn("grid gap-6", cc)}>{children}</div>;
}

function DemoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[11px] font-medium uppercase tracking-wider text-[var(--lg-text-muted)] mb-3", className)}>{children}</p>;
}

/* ───────── Theme Toggle Button ───────── */
function ThemeToggle() {
  const { isDark, toggleTheme } = LG.useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.85, rotate: isDark ? -180 : 180 }}
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl glass-blur glass-surface glass-border glass-highlight overflow-hidden"
    >
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ y: 20, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -20, opacity: 0, rotate: 90 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {isDark ? <Moon size={18} className="text-liquid-amber" /> : <Sun size={18} className="text-liquid-amber" />}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-2 top-0 h-px glass-top-highlight" />
    </motion.button>
  );
}


/* ───────── Main App ───────── */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetVariant, setSheetVariant] = useState<"default" | "compact" | "full" | "inset" | "detached">("default");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [actionSheetVariant, setActionSheetVariant] = useState<"default" | "grouped" | "minimal" | "grid">("default");
  const [alertOpen, setAlertOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [splashOpen, setSplashOpen] = useState(false);
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);
  const [slideMenuVariant, setSlideMenuVariant] = useState<"default" | "compact" | "floating">("default");
  const [snackbarKey, setSnackbarKey] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activePillTab, setActivePillTab] = useState(0);
  const [chipActive, setChipActive] = useState<string[]>(["design"]);
  const [selectValue, setSelectValue] = useState("option2");
  const [inputValue, setInputValue] = useState("");
  const [checkboxes, setCheckboxes] = useState({ a: true, b: false, c: false });
  const [radioValue, setRadioValue] = useState("option1");
  const [currentPage, setCurrentPage] = useState(3);
  const [ratingValue, setRatingValue] = useState(3.5);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [colorValue, setColorValue] = useState("#3b82f6");
  const [stepperValue, setStepperValue] = useState(1);
  const [segmentValue, setSegmentValue] = useState("all");
  const [mobileTab, setMobileTab] = useState("home");
  const [mobileTabVariant, setMobileTabVariant] = useState<MobileBottomTabVariant>("ios26-fluid");
  const [pageIndicator, setPageIndicator] = useState(0);
  const [navBarVariant, setNavBarVariant] = useState<"standard" | "large" | "inline" | "search" | "prominent">("standard");
  const [toggleOn, setToggleOn] = useState(true);
  const [ios26ToggleOn, setIos26ToggleOn] = useState(true);
  const [fluidToggleOn, setFluidToggleOn] = useState(false);
  const [sliderVolume, setSliderVolume] = useState(65);
  const [sliderBrightness, setSliderBrightness] = useState(40);
  const [drawerDarkMode, setDrawerDarkMode] = useState(true);
  const [drawerReduceMotion, setDrawerReduceMotion] = useState(false);

  // Orphaned component demo states
  const [activeUnderlineTab, setActiveUnderlineTab] = useState(0);
  const [navActive, setNavActive] = useState("Home");
  const [dockActive, setDockActive] = useState("photos");
  const [stepperCurrent, setStepperCurrent] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [showCenterTabBar, setShowCenterTabBar] = useState(false);


  const addToast = useCallback((msg: string, v: ToastItem["variant"] = "info") => {
    setToasts((p) => [...p, { id: Math.random().toString(36).slice(2), message: msg, variant: v }]);
  }, []);
  const removeToast = useCallback((id: string) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const toggleChip = (id: string) => setChipActive((p) => p.includes(id) ? p.filter((c) => c !== id) : [...p, id]);

  const tabs = [{ label: "General", icon: <Settings size={14} /> }, { label: "Appearance", icon: <Palette size={14} /> }, { label: "Security", icon: <Shield size={14} /> }];
  const pillTabs = [{ label: "All", icon: <LayoutGrid size={14} /> }, { label: "Active", icon: <Zap size={14} /> }, { label: "Archived", icon: <Layers size={14} /> }];
  const selectOptions = [
    { value: "option1", label: "System Default", icon: <Command size={14} className="text-[var(--lg-text-muted)]" /> },
    { value: "option2", label: "Liquid Glass", icon: <Sparkles size={14} className="text-liquid-blue" /> },
  ];
  const accordionItems = [
    { id: "1", title: "What is Liquid Glass?", icon: <Sparkles size={16} />, content: "Apple's next-gen design language with translucent, frosted glass surfaces." },
    { id: "2", title: "How does blur work?", icon: <Layers size={16} />, content: "CSS backdrop-filter with high blur + saturation creates frosted glass." },
  ];
  const timelineItems = [
    { id: "1", title: "Project created", description: "Initial setup", timestamp: "2h ago", color: "blue" as const },
    { id: "2", title: "Design review", description: "UI approved", timestamp: "5h ago", color: "purple" as const },
    { id: "3", title: "Deployment", description: "Live", timestamp: "2d ago", color: "emerald" as const },
  ];
  const tableData = [
    { id: "1", name: "Alice Johnson", role: "Designer", status: "Active", team: "Product" },
    { id: "2", name: "Bob Smith", role: "Developer", status: "Away", team: "Engineering" },
    { id: "3", name: "Carol White", role: "Manager", status: "Active", team: "Operations" },
  ];
  const commandItems = [
    { id: "1", label: "Dashboard", shortcut: "⌘D", icon: <LayoutGrid size={14} />, category: "Navigation" },
    { id: "2", label: "Search", shortcut: "⌘F", icon: <Search size={14} />, category: "Navigation" },
    { id: "3", label: "Theme", shortcut: "⌘T", icon: <Palette size={14} />, category: "Preferences" },
  ];
  const stats = [
    { label: "Users", value: "24.5K", change: 12.5, icon: <Users size={18} />, iconColor: "text-liquid-blue", iconBg: "bg-liquid-blue/10" },
    { label: "Revenue", value: "$84.2K", change: -3.2, icon: <BarChart3 size={18} />, iconColor: "text-liquid-emerald", iconBg: "bg-liquid-emerald/10" },
    { label: "Active", value: "1,284", change: 8.1, icon: <Activity size={18} />, iconColor: "text-liquid-purple", iconBg: "bg-liquid-purple/10" },
    { label: "Bounce", value: "42.3%", change: -1.5, icon: <TrendingDown size={18} />, iconColor: "text-liquid-amber", iconBg: "bg-liquid-amber/10" },
  ];
  const mobileTabs = [
    { id: "home", icon: <Home size={22} />, activeIcon: <Home size={22} />, label: "Home" },
    { id: "search", icon: <Search size={22} />, activeIcon: <Search size={22} />, label: "Search" },
    { id: "notifications", icon: <Bell size={22} />, activeIcon: <Bell size={22} />, label: "Alerts" },
    { id: "profile", icon: <User size={22} />, activeIcon: <User size={22} />, label: "Profile" },
  ];
  const mobileTabVariants: MobileBottomTabVariant[] = ["default", "pill", "floating", "ios26-fluid", "ios26-chrome", "ios26-glow", "ios26-dock", "ios26-super-pill"];
  const splashSlides = [
    { id: "1", title: "Welcome to Liquid Glass", subtitle: "Next-gen UI design with glass surfaces.", icon: <Sparkles size={32} />, gradient: "bg-gradient-to-b from-liquid-blue/30 to-transparent" },
    { id: "2", title: "Beautiful & Intuitive", subtitle: "Crafted with light, depth, and smooth interactions.", icon: <Palette size={32} />, gradient: "bg-gradient-to-b from-liquid-purple/30 to-transparent" },
    { id: "3", title: "Ready to Build", subtitle: "Start creating stunning experiences.", icon: <Zap size={32} />, gradient: "bg-gradient-to-b from-liquid-pink/30 to-transparent" },
  ];
  const slideMenuSections = [
    { title: "Navigation", items: [
      { id: "1", label: "Home", icon: <Home size={18} /> },
      { id: "2", label: "Search", icon: <Search size={18} /> },
      { id: "3", label: "Notifications", icon: <Bell size={18} /> },
    ]},
    { title: "Settings", items: [
      { id: "4", label: "Profile", icon: <User size={18} /> },
      { id: "5", label: "Preferences", icon: <Settings size={18} /> },
    ]},
  ];
  const actionSheetItems = [
    { id: "1", title: "Share", subtitle: "Share with friends", icon: <Share2 size={18} /> },
    { id: "2", title: "Save", subtitle: "Save for later", icon: <Bookmark size={18} /> },
    { id: "3", title: "Copy Link", icon: <ExternalLink size={18} /> },
    { id: "4", title: "Delete", destructive: true, icon: <Trash2 size={18} /> },
  ];
  const permissionItems = [
    { id: "1", title: "Camera", description: "Take photos", icon: <Camera size={20} /> },
    { id: "2", title: "Location", description: "Find nearby", icon: <MapPin size={20} />, granted: true },
    { id: "3", title: "Notifications", description: "Stay updated", icon: <Bell size={20} /> },
    { id: "4", title: "Microphone", description: "Voice commands", icon: <Mic size={20} /> },
  ];
  const carouselItems = [
    { id: "1", content: <div className="w-full h-full bg-gradient-to-br from-liquid-blue/30 to-liquid-purple/30 flex items-center justify-center rounded-2xl"><Sparkles size={48} className="text-[var(--lg-text-muted)]" /></div> },
    { id: "2", content: <div className="w-full h-full bg-gradient-to-br from-liquid-emerald/30 to-liquid-cyan/30 flex items-center justify-center rounded-2xl"><Zap size={48} className="text-[var(--lg-text-muted)]" /></div> },
    { id: "3", content: <div className="w-full h-full bg-gradient-to-br from-liquid-rose/30 to-liquid-pink/30 flex items-center justify-center rounded-2xl"><Heart size={48} className="text-[var(--lg-text-muted)]" /></div> },
  ];
  const contextPreviewActions = [
    { id: "1", title: "Preview", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
    { id: "2", title: "Share", icon: <Share2 size={14} /> },
    { id: "3", title: "Delete", icon: <Trash2 size={14} />, destructive: true },
  ];
  const swipeableItems = [
    { id: "1", content: <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 flex items-center justify-center"><span className="text-xs font-bold text-[var(--lg-text-muted)]">AJ</span></div><div className="flex-1"><p className="text-sm text-[var(--lg-text)]">Alice Johnson</p><p className="text-xs text-[var(--lg-text-muted)]">Unread message</p></div></div>, rightActions: [{ icon: <Trash2 size={16} className="text-white" />, color: "rgba(244,63,94,0.5)", onClick: () => addToast("Deleted", "error") }] },
    { id: "2", content: <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-gradient-to-br from-liquid-emerald/20 to-liquid-cyan/20 flex items-center justify-center"><span className="text-xs font-bold text-[var(--lg-text-muted)]">BS</span></div><div className="flex-1"><p className="text-sm text-[var(--lg-text)]">Bob Smith</p><p className="text-xs text-[var(--lg-text-muted)]">Shared a file</p></div></div>, rightActions: [{ icon: <Trash2 size={16} className="text-white" />, color: "rgba(244,63,94,0.5)", onClick: () => addToast("Deleted", "error") }] },
  ];

  const navItems = [
    { label: "Home", icon: <Home size={16} />, active: navActive === "Home", onClick: () => setNavActive("Home") },
    { label: "Explore", icon: <Search size={16} />, active: navActive === "Explore", onClick: () => setNavActive("Explore") },
    { label: "Saved", icon: <Bookmark size={16} />, active: navActive === "Saved", onClick: () => setNavActive("Saved") },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Glass Cases" },
  ];

  const menubarMenus = [
    { label: "File", items: [
      { label: "New", shortcut: "⌘N", onClick: () => addToast("New file", "info") },
      { label: "Open", shortcut: "⌘O" },
      { separator: true, label: "" },
      { label: "Save", shortcut: "⌘S" },
    ]},
    { label: "Edit", items: [
      { label: "Undo", shortcut: "⌘Z" },
      { label: "Cut", shortcut: "⌘X" },
    ]},
  ];

  const dockItems = [
    { id: "finder", icon: <Home size={22} />, label: "Home", active: dockActive === "finder", onClick: () => setDockActive("finder") },
    { id: "photos", icon: <Image size={22} />, label: "Photos", active: dockActive === "photos", onClick: () => setDockActive("photos") },
    { id: "search", icon: <Search size={22} />, label: "Search", active: dockActive === "search", onClick: () => setDockActive("search") },
    { id: "heart", icon: <Heart size={22} />, label: "Favorites", active: dockActive === "heart", onClick: () => setDockActive("heart") },
    { id: "settings", icon: <Settings size={22} />, label: "Settings", active: dockActive === "settings", onClick: () => setDockActive("settings") },
  ];

  const stepperSteps = [
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Add your details" },
    { label: "Verify", description: "Confirm email" },
    { label: "Done", description: "Start exploring" },
  ];

  const kanbanColumns = [
    { id: "todo", title: "To Do", color: "#3b82f6", tasks: [
      { id: "t1", title: "Design system", description: "Define tokens", tag: "Design", tagColor: "#3b82f6" },
      { id: "t2", title: "Prototype", description: "Build interactions", tag: "UX", tagColor: "#8b5cf6" },
    ]},
    { id: "doing", title: "In Progress", color: "#f59e0b", tasks: [
      { id: "t3", title: "Components", description: "Glass variants", tag: "Dev", tagColor: "#10b981", assignees: ["JD"] },
    ]},
    { id: "done", title: "Done", color: "#10b981", tasks: [
      { id: "t4", title: "Kickoff", description: "Project started", tag: "Plan", tagColor: "#f43f5e" },
    ]},
  ];

  const contextMenuItems = [
    { id: "share", label: "Share", icon: <Share2 size={14} />, onClick: () => addToast("Shared", "success") },
    { id: "copy", label: "Copy", icon: <Copy size={14} />, onClick: () => addToast("Copied", "info") },
    { id: "sep", separator: true, label: "" },
    { id: "delete", label: "Delete", icon: <Trash2 size={14} />, onClick: () => addToast("Deleted", "error") },
  ];

  const fabActions = [
    { id: "new", icon: <Plus size={18} />, label: "New task", onClick: () => addToast("New task", "info") },
    { id: "photo", icon: <Camera size={18} />, label: "Take photo", onClick: () => addToast("Camera", "info") },
    { id: "message", icon: <MessageSquare size={18} />, label: "Message", onClick: () => addToast("Message", "success") },
  ];

  const route = useRoute();

  if (route.pathname === "/docs") {
    return <Docs />;
  }

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <AnimatedBackground />
      <LG.LiquidGlassToast toasts={toasts} onRemove={removeToast} position="bottom-right" />
      <LG.LiquidGlassCommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} items={commandItems} />
      <LG.MobileSplashScreen isOpen={splashOpen} onClose={() => setSplashOpen(false)} slides={splashSlides} />
      <LG.MobileAlertDialog isOpen={alertOpen} onClose={() => setAlertOpen(false)} title="Delete Item?" message="This action cannot be undone." icon="warning" options={[
        { text: "Delete", style: "destructive", onClick: () => addToast("Deleted", "error") },
        { text: "Cancel", style: "cancel" },
      ]} />
      <LG.MobilePermissionDialog isOpen={permissionOpen} onClose={() => setPermissionOpen(false)} title="Permissions" message="Allow to get the best experience." permissions={permissionItems} onGrantAll={() => addToast("Granted!", "success")} />
      <LG.MobileAppRating isOpen={ratingOpen} onClose={() => setRatingOpen(false)} onRate={(r) => addToast(`Rated ${r}★`, "success")} appName="Liquid Glass" />
      <LG.MobileActionSheet isOpen={actionSheetOpen} onClose={() => setActionSheetOpen(false)} title="Share this item" subtitle="Choose how to share" items={actionSheetItems} variant={actionSheetVariant} />
      <LG.MobileSlideMenu isOpen={slideMenuOpen} onClose={() => setSlideMenuOpen(false)} sections={slideMenuSections} variant={slideMenuVariant}
        header={<div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--lg-border)]"><div className="h-10 w-10 rounded-xl bg-gradient-to-br from-liquid-blue to-liquid-purple flex items-center justify-center"><Sparkles size={18} className="text-white" /></div><div><p className="text-sm font-semibold text-[var(--lg-text)]">Liquid Glass</p><p className="text-xs text-[var(--lg-text-muted)]">v2.0.0</p></div></div>} />
      {snackbarKey > 0 && <LG.MobileSnackbar key={`snackbar-${snackbarKey}`} message="Changes saved" action={{ label: "Undo", onClick: () => {} }} variant="success" duration={5000} />}

      <div className="relative z-10">
        {/* Hero */}
        <header className="pt-16 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Theme toggle */}
              <div className="flex justify-center mb-6">
                <ThemeToggle />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blur glass-surface glass-border mb-6">
                <Sparkles size={14} className="text-liquid-blue" />
                <span className="text-xs font-medium text-[var(--lg-text-secondary)]">iOS 26 Design System — 51+ Components</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--lg-text)] mb-4 tracking-tight">
                Liquid Glass
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-liquid-blue via-liquid-purple to-liquid-pink">
                  Mobile UI Kit
                </span>
              </h1>
              <p className="text-lg text-[var(--lg-text-muted)] max-w-xl mx-auto leading-relaxed">
                Comprehensive mobile-first components with real glass blur, light/dark themes, liquid ripple animations, and buttery-smooth transitions.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
                <LG.LiquidGlassButton onClick={() => setCmdOpen(true)} icon={<Command size={14} />}>Command Palette</LG.LiquidGlassButton>
                <LG.LiquidGlassButton variant="secondary" onClick={() => setSplashOpen(true)} icon={<Sparkles size={14} />}>Splash Screen</LG.LiquidGlassButton>
                <LG.LiquidGlassButton variant="ghost" onClick={() => addToast("Liquid ripple!", "success")}>Click Me</LG.LiquidGlassButton>
                <LG.LiquidGlassButton variant="secondary" onClick={() => navigate("/docs")} icon={<BookOpen size={14} />}>Docs</LG.LiquidGlassButton>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-32 space-y-20">
          {/* Glass Controls */}
          <section>
            <SectionHeader icon={<SlidersHorizontal size={18} />} title="Glass Controls" description="Adjust blur, transparency, reflection, and fluidity in real-time" />
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <LG.LiquidGlassControls />
              <div className="flex-1 w-full grid md:grid-cols-2 gap-6">
                <LG.LiquidGlassCard>
                  <DemoLabel>Blur Preview</DemoLabel>
                  <div className="h-24 rounded-2xl bg-gradient-to-br from-liquid-blue/30 to-liquid-purple/30 flex items-center justify-center glass-blur-lg glass-surface-strong glass-border">
                    <span className="text-sm font-medium text-[var(--lg-text)]">Drag blur slider</span>
                  </div>
                </LG.LiquidGlassCard>
                <LG.LiquidGlassFluidCard variant="ios26">
                  <DemoLabel>iOS 26 Fluid Card</DemoLabel>
                  <p className="text-sm text-[var(--lg-text-secondary)]">Move your cursor over this card to see the liquid refraction effect follow your movement.</p>
                </LG.LiquidGlassFluidCard>
              </div>
            </div>
          </section>

          {/* iOS 26 Components */}
          <section>
            <SectionHeader icon={<Sparkles size={18} />} title="iOS 26 Components" description="New fluid glass components inspired by iOS 26" />
            <ComponentGrid cols={2}>
              <LG.LiquidGlassCard>
                <DemoLabel>iOS 26 Toggles</DemoLabel>
                <div className="flex flex-col gap-5">
                  <LG.LiquidGlassToggle checked={toggleOn} onChange={setToggleOn} variant="fluid" label="Fluid" activeTint="#3b82f6" />
                  <LG.LiquidGlassToggle checked={ios26ToggleOn} onChange={setIos26ToggleOn} variant="ios26" label="iOS 26" activeTint="#34c759" />
                  <LG.LiquidGlassToggle checked={fluidToggleOn} onChange={setFluidToggleOn} variant="fluid" size="lg" label="Fluid" description="Larger liquid-filled switch" activeTint="#3b82f6" />
                  <div className="flex items-center gap-4">
                    <LG.LiquidGlassToggle checked={ios26ToggleOn} onChange={setIos26ToggleOn} variant="ios26" size="sm" />
                    <LG.LiquidGlassToggle checked={ios26ToggleOn} onChange={setIos26ToggleOn} variant="ios26" />
                    <LG.LiquidGlassToggle checked={ios26ToggleOn} onChange={setIos26ToggleOn} variant="ios26" size="lg" />
                  </div>
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>iOS 26 Buttons</DemoLabel>
                <div className="flex flex-wrap gap-3">
                  <LG.LiquidGlassIos26Button icon={<Sparkles size={16} />}>Chrome</LG.LiquidGlassIos26Button>
                  <LG.LiquidGlassIos26Button size="sm">Small</LG.LiquidGlassIos26Button>
                  <LG.LiquidGlassIos26Button size="lg" icon={<Zap size={18} />}>Large</LG.LiquidGlassIos26Button>
                </div>
                <DemoLabel className="mt-5">Segmented (iOS 26)</DemoLabel>
                <LG.MobileSegmentedControl
                  variant="ios26"
                  segments={[{ id: "all", label: "All" }, { id: "recent", label: "Recent" }, { id: "favorites", label: "Favorites" }]}
                  selected={segmentValue}
                  onChange={setSegmentValue}
                />
              </LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Liquid Glass Sliders */}
          <section>
            <SectionHeader icon={<SlidersHorizontal size={18} />} title="Liquid Glass Sliders" description="Range sliders with a fluid glass thumb that stretches while dragging" />
            <ComponentGrid cols={2}>
              <LG.LiquidGlassCard>
                <DemoLabel>Volume</DemoLabel>
                <LG.LiquidGlassSlider value={sliderVolume} onChange={setSliderVolume} label="Volume" valueFormatter={(v) => `${v}%`} />
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Brightness</DemoLabel>
                <LG.LiquidGlassSlider value={sliderBrightness} onChange={setSliderBrightness} label="Brightness" valueFormatter={(v) => `${v}%`} />
              </LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Nav Bar Variants */}
          <section>
            <SectionHeader icon={<Home size={18} />} title="Navigation Bar Variants" description="5 nav bar styles: standard, large title, inline, search, and prominent" />
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {(["standard", "large", "inline", "search", "prominent"] as const).map((v) => (
                <LG.LiquidGlassButton key={v} size="sm" variant={navBarVariant === v ? "primary" : "secondary"} onClick={() => setNavBarVariant(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </LG.LiquidGlassButton>
              ))}
            </div>
            <div className="max-w-md mx-auto">
              <LG.MobileTopNavBar
                variant={navBarVariant}
                title="Messages"
                subtitle={navBarVariant === "large" || navBarVariant === "prominent" ? "12 new conversations" : undefined}
                showBack
                onBack={() => addToast("Back", "info")}
                rightActions={[
                  <Search size={20} className="text-[var(--lg-text-muted)]" />,
                  <Plus size={20} className="text-[var(--lg-text-muted)]" />,
                ]}
              />
            </div>
          </section>

          {/* Buttons */}
          <section>
            <SectionHeader icon={<Command size={18} />} title="Buttons — Liquid Ripple" description="Click any button to see the liquid ripple animation" />
            <ComponentGrid cols={2}>
              <LG.LiquidGlassCard>
                <DemoLabel>Variants</DemoLabel>
                <div className="flex flex-wrap gap-3">
                  <LG.LiquidGlassButton variant="primary">Primary</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton variant="secondary">Secondary</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton variant="ghost">Ghost</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton variant="danger">Danger</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton variant="success">Success</LG.LiquidGlassButton>
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Icons & Sizes</DemoLabel>
                <div className="flex flex-wrap gap-3 items-end">
                  <LG.LiquidGlassButton size="sm" icon={<Plus size={14} />}>Small</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton icon={<Send size={14} />}>Medium</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton size="lg" icon={<Download size={18} />}>Large</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton loading>Loading</LG.LiquidGlassButton>
                </div>
              </LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Action Sheet Variants */}
          <section>
            <SectionHeader icon={<SlidersHorizontal size={18} />} title="Action Sheet Variants" description="4 styles: default, grouped (iOS), minimal, and grid" />
            <div className="flex flex-wrap gap-3 justify-center">
              {(["default", "grouped", "minimal", "grid"] as const).map((v) => (
                <LG.LiquidGlassButton key={v} size="sm" variant="secondary" onClick={() => { setActionSheetVariant(v); setActionSheetOpen(true); }}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </LG.LiquidGlassButton>
              ))}
            </div>
          </section>

          {/* Bottom Sheet Variants */}
          <section>
            <SectionHeader icon={<Layers size={18} />} title="Bottom Sheet Variants" description="5 styles: default, compact, full screen, inset, and detached" />
            <div className="flex flex-wrap gap-3 justify-center">
              {(["default", "compact", "full", "inset", "detached"] as const).map((v) => (
                <LG.LiquidGlassButton key={v} size="sm" variant="secondary" onClick={() => { setSheetVariant(v); setSheetOpen(true); }}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </LG.LiquidGlassButton>
              ))}
            </div>
          </section>

          {/* Menu Variants */}
          <section>
            <SectionHeader icon={<MoreVertical size={18} />} title="Slide Menu Variants" description="3 styles: default, compact, and floating" />
            <div className="flex flex-wrap gap-3 justify-center">
              {(["default", "compact", "floating"] as const).map((v) => (
                <LG.LiquidGlassButton key={v} size="sm" variant="secondary" onClick={() => { setSlideMenuVariant(v); setSlideMenuOpen(true); }}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </LG.LiquidGlassButton>
              ))}
            </div>
          </section>

          {/* Inputs */}
          <section>
            <SectionHeader icon={<MessageSquare size={18} />} title="Inputs & Forms" description="Glass inputs, selects, checkboxes, radio, and color picker" />
            <ComponentGrid>
              <LG.LiquidGlassCard>
                <DemoLabel>Text Inputs</DemoLabel>
                <div className="space-y-4">
                  <LG.LiquidGlassInput placeholder="Enter email" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>} value={inputValue} onChange={setInputValue} />
                  <LG.LiquidGlassInput label="Password" type="password" placeholder="••••••••" error="Min 8 characters" />
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Select</DemoLabel>
                <LG.LiquidGlassSelect label="Theme" options={selectOptions} value={selectValue} onChange={setSelectValue} />
                <DemoLabel className="mt-4">Checkboxes</DemoLabel>
                <div className="space-y-2">
                  <LG.LiquidGlassCheckbox checked={checkboxes.a} onChange={(v) => setCheckboxes(p => ({...p, a: v}))} label="Analytics" />
                  <LG.LiquidGlassCheckbox checked={checkboxes.b} onChange={(v) => setCheckboxes(p => ({...p, b: v}))} label="Newsletter" />
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Radio & Stepper</DemoLabel>
                <LG.LiquidGlassRadioGroup value={radioValue} onChange={setRadioValue} options={[
                  { value: "option1", label: "Personal" },
                  { value: "option2", label: "Team" },
                ]} />
                <DemoLabel className="mt-4">Stepper</DemoLabel>
                <LG.MobileStepper value={stepperValue} onChange={setStepperValue} label="Qty" />
              </LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Segmented & Tabs */}
          <section>
            <SectionHeader icon={<List size={18} />} title="Tabs & Segmented" description="Segmented controls and animated tab bars" />
            <div className="flex justify-center mb-6">
              <LG.MobileSegmentedControl segments={[{ id: "all", label: "All" }, { id: "recent", label: "Recent" }, { id: "favorites", label: "Favorites" }]} selected={segmentValue} onChange={setSegmentValue} />
            </div>
            <ComponentGrid cols={3}>
              <LG.LiquidGlassCard><DemoLabel>Default Tabs</DemoLabel><LG.LiquidGlassTabBar tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} /></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Pill Tabs</DemoLabel><LG.LiquidGlassTabBar variant="pills" tabs={pillTabs} activeIndex={activePillTab} onChange={setActivePillTab} /></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Underline Tabs</DemoLabel><LG.LiquidGlassTabBar variant="underline" tabs={tabs} activeIndex={activeUnderlineTab} onChange={setActiveUnderlineTab} /></LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Mobile Bottom Tab */}
          <section>
            <SectionHeader icon={<LayoutGrid size={18} />} title="Mobile Bottom Tab Bar" description="iOS 26 visual identity variants with fluid press effects" />
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {mobileTabVariants.map((v) => (
                <LG.LiquidGlassButton key={v} size="sm" variant={mobileTabVariant === v ? "primary" : "secondary"} onClick={() => setMobileTabVariant(v)}>
                  {v.replace("ios26-", "")}
                </LG.LiquidGlassButton>
              ))}
            </div>
            <div className="flex justify-center mb-4">
              <LG.LiquidGlassToggle checked={showCenterTabBar} onChange={setShowCenterTabBar} size="sm" label="Center tab button" />
            </div>
            <div className="flex justify-center">
              <div className={cn(
                "relative h-[110px] mx-auto flex items-end justify-center overflow-visible",
                mobileTabVariant === "default" || mobileTabVariant === "ios26-chrome"
                  ? "w-full max-w-lg"
                  : "w-fit",
                mobileTabVariant === "ios26-super-pill" ? "rounded-3xl" : "rounded-t-3xl"
              )}>
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20",
                  mobileTabVariant === "ios26-super-pill" ? "rounded-3xl" : "rounded-t-3xl"
                )} />
                <LG.MobileBottomTabBar
                  tabs={mobileTabs}
                  activeTab={mobileTab}
                  onChange={setMobileTab}
                  variant={mobileTabVariant}
                  className="!relative !left-auto !right-auto !bottom-auto !translate-x-0"
                  trailingButton={mobileTabVariant === "ios26-super-pill" ? { icon: <Search size={20} />, label: "Search", onClick: () => addToast("Search", "info") } : undefined}
                  centerTabButton={showCenterTabBar ? { icon: <Plus size={24} />, label: "Create", onClick: () => addToast("Create", "success") } : undefined}
                />
              </div>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <SectionHeader icon={<MessageSquare size={18} />} title="Feedback" description="Alerts, badges, progress, ratings, toasts, snackbars" />
            <ComponentGrid cols={2}>
              <div className="space-y-4">
                <LG.LiquidGlassAlert variant="info" title="Info" onClose={() => {}}>Informational alert.</LG.LiquidGlassAlert>
                <LG.LiquidGlassAlert variant="success" title="Success">Saved successfully.</LG.LiquidGlassAlert>
                <LG.LiquidGlassAlert variant="warning" title="Warning">Review settings.</LG.LiquidGlassAlert>
                <LG.LiquidGlassAlert variant="error" title="Error">Something went wrong.</LG.LiquidGlassAlert>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <LG.LiquidGlassBadge>Default</LG.LiquidGlassBadge>
                  <LG.LiquidGlassBadge variant="primary" dot>New</LG.LiquidGlassBadge>
                  <LG.LiquidGlassBadge variant="success" dot>Active</LG.LiquidGlassBadge>
                  <LG.LiquidGlassBadge variant="danger">Error</LG.LiquidGlassBadge>
                </div>
                <LG.LiquidGlassProgress value={75} showValue animated />
                <LG.LiquidGlassProgress value={45} variant="gradient" showValue className="mt-2" />
                <DemoLabel className="mt-4">Rating</DemoLabel>
                <LG.LiquidGlassRating value={ratingValue} onChange={setRatingValue} showValue />
                <DemoLabel className="mt-4">Toasts & Snackbar</DemoLabel>
                <div className="flex flex-wrap gap-2">
                  <LG.LiquidGlassButton size="sm" onClick={() => addToast("Info", "info")}>Info</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton size="sm" variant="success" onClick={() => addToast("Saved!", "success")}>Success</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton size="sm" variant="danger" onClick={() => addToast("Error", "error")}>Error</LG.LiquidGlassButton>
                  <LG.LiquidGlassButton size="sm" variant="secondary" onClick={() => setSnackbarKey(k => k + 1)}>Snackbar</LG.LiquidGlassButton>
                </div>
              </div>
            </ComponentGrid>
          </section>

          {/* Mobile Overlays */}
          <section>
            <SectionHeader icon={<SlidersHorizontal size={18} />} title="Mobile Overlays" description="Alert dialog, permission dialog, and app rating" />
            <ComponentGrid cols={3}>
              <LG.LiquidGlassCard><DemoLabel>Alert</DemoLabel><LG.LiquidGlassButton fullWidth size="sm" onClick={() => setAlertOpen(true)}>Alert Dialog</LG.LiquidGlassButton></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Permissions</DemoLabel><LG.LiquidGlassButton fullWidth size="sm" onClick={() => setPermissionOpen(true)}>Permissions</LG.LiquidGlassButton></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Rate App</DemoLabel><LG.LiquidGlassButton fullWidth size="sm" onClick={() => setRatingOpen(true)}>Rate</LG.LiquidGlassButton></LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Interactive Lists */}
          <section>
            <SectionHeader icon={<List size={18} />} title="Interactive Lists" description="Swipeable items and glass scroll area" />
            <ComponentGrid cols={2}>
              <LG.LiquidGlassCard><DemoLabel>Swipeable</DemoLabel><LG.MobileSwipeableList items={swipeableItems} /></LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Scroll Area</DemoLabel>
                <LG.LiquidGlassScrollArea maxHeight="180px" className="pr-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--lg-border)] mb-2 last:mb-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 flex items-center justify-center text-xs font-bold text-[var(--lg-text-muted)]">{i + 1}</div>
                      <p className="text-sm text-[var(--lg-text)]">Item {i + 1}</p>
                    </div>
                  ))}
                </LG.LiquidGlassScrollArea>
              </LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* Data Display */}
          <section>
            <SectionHeader icon={<LayoutGrid size={18} />} title="Data Display" description="Tables, timeline, stats, accordion, pagination, calendar, carousel" />
            <div className="space-y-6">
              <LG.LiquidGlassCard>
                <DemoLabel>Table</DemoLabel>
                <LG.LiquidGlassTable columns={[
                  { key: "name", header: "Name", sortable: true },
                  { key: "role", header: "Role", sortable: true },
                  { key: "status", header: "Status", render: (r: any) => <span className={cn("text-xs px-2 py-0.5 rounded-md", r.status === "Active" ? "bg-liquid-emerald/15 text-liquid-emerald" : "bg-liquid-amber/15 text-liquid-amber")}>{r.status}</span> },
                  { key: "team", header: "Team", sortable: true },
                ]} data={tableData} rowKey={(r: any) => r.id} />
              </LG.LiquidGlassCard>
              <ComponentGrid cols={2}>
                <LG.LiquidGlassCard><DemoLabel>Timeline</DemoLabel><LG.LiquidGlassTimeline items={timelineItems} /></LG.LiquidGlassCard>
                <LG.LiquidGlassCard><DemoLabel>Accordion</DemoLabel><LG.LiquidGlassAccordion items={accordionItems} defaultOpen={["1"]} /></LG.LiquidGlassCard>
              </ComponentGrid>
              <LG.LiquidGlassStatCard stats={stats} />
              <ComponentGrid cols={3}>
                <div className="flex justify-center"><LG.LiquidGlassMusicPlayer /></div>
                <div className="flex justify-center"><LG.LiquidGlassWeatherWidget /></div>
                <div className="flex justify-center"><LG.LiquidGlassCalendar value={calendarDate} onChange={setCalendarDate} highlightedDates={[new Date()]} /></div>
              </ComponentGrid>
              <LG.LiquidGlassCard><DemoLabel>Carousel</DemoLabel><LG.LiquidGlassCarousel items={carouselItems} /></LG.LiquidGlassCard>
              <div className="flex justify-center"><LG.LiquidGlassPagination currentPage={currentPage} totalPages={10} onChange={setCurrentPage} /></div>
            </div>
          </section>

          {/* Media & Content */}
          <section>
            <SectionHeader icon={<Image size={18} />} title="Media & Content" description="Avatars, chips, page indicators, color picker, context preview" />
            <ComponentGrid cols={3}>
              <LG.LiquidGlassCard>
                <DemoLabel>Avatars</DemoLabel>
                <div className="flex items-center gap-3 flex-wrap">
                  <LG.LiquidGlassAvatar size="sm" fallback="JD" status="online" />
                  <LG.LiquidGlassAvatar size="md" fallback="MK" status="away" ring />
                  <LG.LiquidGlassAvatar size="lg" fallback="SL" status="busy" />
                  <LG.LiquidGlassAvatar size="xl" fallback="RW" status="offline" ring />
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Chips</DemoLabel>
                <div className="flex flex-wrap gap-2">
                  {["design", "dev", "marketing"].map(id => (
                    <LG.LiquidGlassChip key={id} active={chipActive.includes(id)} onClick={() => toggleChip(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</LG.LiquidGlassChip>
                  ))}
                  <LG.LiquidGlassChip variant="primary" onRemove={() => {}} icon={<Check size={12} />}>Selected</LG.LiquidGlassChip>
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Page Indicators</DemoLabel>
                <div className="space-y-4">
                  <div className="flex justify-center"><LG.MobilePageIndicator currentPage={pageIndicator} totalPages={5} variant="dots" /></div>
                  <div className="flex justify-center"><LG.MobilePageIndicator currentPage={pageIndicator} totalPages={5} variant="line" /></div>
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2, 3, 4].map(i => (
                      <LG.LiquidGlassButton key={i} size="sm" variant={i === pageIndicator ? "primary" : "secondary"} onClick={() => setPageIndicator(i)}>{i + 1}</LG.LiquidGlassButton>
                    ))}
                  </div>
                </div>
              </LG.LiquidGlassCard>
            </ComponentGrid>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <LG.LiquidGlassCard>
                <DemoLabel>Color Picker</DemoLabel>
                <LG.LiquidGlassColorPicker value={colorValue} onChange={setColorValue} />
                <div className="mt-3 flex items-center gap-3"><div className="h-10 w-10 rounded-xl" style={{ backgroundColor: colorValue }} /><span className="text-sm font-mono text-[var(--lg-text-secondary)]">{colorValue}</span></div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Context Preview</DemoLabel>
                <LG.MobileContextPreview actions={contextPreviewActions}>
                  <div className="p-6 rounded-xl bg-[var(--lg-border)] text-center text-sm text-[var(--lg-text-muted)]">Right click here</div>
                </LG.MobileContextPreview>
              </LG.LiquidGlassCard>
            </div>
          </section>

          {/* Overlays */}
          <section>
            <SectionHeader icon={<Layers size={18} />} title="Overlays" description="Modal, drawer, and bottom sheet" />
            <ComponentGrid cols={3}>
              <LG.LiquidGlassCard><DemoLabel>Modal</DemoLabel><LG.LiquidGlassButton fullWidth onClick={() => setModalOpen(true)}>Open Modal</LG.LiquidGlassButton></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Drawer</DemoLabel><LG.LiquidGlassButton fullWidth variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer</LG.LiquidGlassButton></LG.LiquidGlassCard>
              <LG.LiquidGlassCard><DemoLabel>Sheet</DemoLabel><LG.LiquidGlassButton fullWidth variant="secondary" onClick={() => { setSheetVariant("default"); setSheetOpen(true); }}>Open Sheet</LG.LiquidGlassButton></LG.LiquidGlassCard>
            </ComponentGrid>
          </section>

          {/* More Components */}
          <section>
            <SectionHeader icon={<LayoutGrid size={18} />} title="More Components" description="Additional glass components and variants not shown above" />

            {/* Navigation & Menus */}
            <div className="mb-10 space-y-6">
              <DemoLabel>Navigation & Menus</DemoLabel>
              <div className="space-y-4">
                <LG.LiquidGlassNavigation
                  items={navItems}
                  logo={<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-liquid-blue to-liquid-purple"><Sparkles size={16} className="text-white" /></div>}
                  actions={<ThemeToggle />}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <LG.LiquidGlassBreadcrumb items={breadcrumbItems} />
                  <LG.LiquidGlassMenubar menus={menubarMenus} />
                </div>
                <div className="flex justify-center py-2">
                  <LG.LiquidGlassDock
                    items={dockItems}
                    className="!relative !left-auto !right-auto !top-auto !bottom-auto !translate-x-0 !translate-y-0"
                  />
                </div>
              </div>
            </div>

            {/* Popovers */}
            <ComponentGrid cols={3}>
              <LG.LiquidGlassCard>
                <DemoLabel>Tooltip</DemoLabel>
                <div className="flex justify-center py-2">
                  <LG.LiquidGlassTooltip content="I'm a glass tooltip">
                    <LG.LiquidGlassButton size="sm" variant="secondary">Hover me</LG.LiquidGlassButton>
                  </LG.LiquidGlassTooltip>
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard className="overflow-visible relative z-30">
                <DemoLabel>Hover Card</DemoLabel>
                <div className="flex justify-center py-2">
                  <LG.LiquidGlassHoverCard
                    content={
                      <div className="text-sm text-[var(--lg-text-secondary)]">
                        <p className="font-semibold text-[var(--lg-text)] mb-1">Liquid Glass</p>
                        <p>Hover to reveal more details in a glass card.</p>
                      </div>
                    }
                  >
                    <LG.LiquidGlassButton size="sm" variant="secondary">Hover me</LG.LiquidGlassButton>
                  </LG.LiquidGlassHoverCard>
                </div>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard className="overflow-visible relative z-30">
                <DemoLabel>Notification Dropdown</DemoLabel>
                <div className="flex justify-center py-2">
                  <LG.LiquidGlassNotificationDropdown
                    onMarkAllRead={() => addToast("Marked read", "success")}
                    onClearAll={() => addToast("Cleared", "info")}
                  />
                </div>
              </LG.LiquidGlassCard>
            </ComponentGrid>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <LG.LiquidGlassCard>
                <DemoLabel>Context Menu</DemoLabel>
                <LG.LiquidGlassContextMenu items={contextMenuItems}>
                  <div className="p-6 rounded-xl bg-[var(--lg-border)] text-center text-sm text-[var(--lg-text-muted)]">Right click here</div>
                </LG.LiquidGlassContextMenu>
              </LG.LiquidGlassCard>
              <LG.LiquidGlassCard>
                <DemoLabel>Resizable Panel</DemoLabel>
                <LG.LiquidGlassResizable defaultWidth={260} defaultHeight={140} minWidth={180} minHeight={100}>
                  <p className="text-sm text-[var(--lg-text-secondary)]">Drag the bottom-right handle to resize this glass panel.</p>
                </LG.LiquidGlassResizable>
              </LG.LiquidGlassCard>
            </div>

            {/* Loading & Empty States */}
            <div className="mt-10 space-y-6">
              <DemoLabel>Loading & Empty States</DemoLabel>
              <ComponentGrid cols={2}>
                <LG.LiquidGlassCard>
                  <DemoLabel>Skeleton</DemoLabel>
                  <LG.LiquidGlassSkeleton lines={3} width="100%" height={12} />
                </LG.LiquidGlassCard>
                <LG.LiquidGlassCard>
                  <DemoLabel>Empty State</DemoLabel>
                  <LG.LiquidGlassEmptyState
                    variant="search"
                    title="No results"
                    description="Try a different search term."
                    action={<LG.LiquidGlassButton size="sm">Clear search</LG.LiquidGlassButton>}
                  />
                </LG.LiquidGlassCard>
              </ComponentGrid>
            </div>

            {/* Data & Progress */}
            <div className="mt-10 space-y-6">
              <DemoLabel>Data & Progress</DemoLabel>
              <ComponentGrid cols={2}>
                <LG.LiquidGlassCard>
                  <DemoLabel>Stepper</DemoLabel>
                  <LG.LiquidGlassStepper steps={stepperSteps} currentStep={stepperCurrent} />
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: stepperSteps.length }).map((_, i) => (
                      <LG.LiquidGlassButton
                        key={i}
                        size="sm"
                        variant={stepperCurrent === i ? "primary" : "secondary"}
                        onClick={() => setStepperCurrent(i)}
                      >
                        {i + 1}
                      </LG.LiquidGlassButton>
                    ))}
                  </div>
                </LG.LiquidGlassCard>
                <LG.LiquidGlassCard>
                  <DemoLabel>Kanban</DemoLabel>
                  <LG.LiquidGlassKanban columns={kanbanColumns} />
                </LG.LiquidGlassCard>
              </ComponentGrid>
            </div>

            {/* Inputs & Mobile Extras */}
            <div className="mt-10 space-y-6">
              <DemoLabel>Inputs & Mobile Extras</DemoLabel>
              <ComponentGrid cols={2}>
                <LG.LiquidGlassCard>
                  <DemoLabel>File Upload</DemoLabel>
                  <LG.LiquidGlassFileUpload onFilesSelected={(files) => addToast(`Selected ${files.length} file(s)`, "success")} />
                </LG.LiquidGlassCard>
                <LG.LiquidGlassCard>
                  <DemoLabel>Mobile Search Bar</DemoLabel>
                  <LG.MobileSearchBar value={searchValue} onChange={setSearchValue} showCancelButton />
                </LG.LiquidGlassCard>
              </ComponentGrid>
            </div>

            {/* Floating Action Button */}
            <div className="mt-10">
              <DemoLabel>Floating Action Button</DemoLabel>
              <div className="relative h-32 flex items-center justify-center gap-8 rounded-2xl bg-[var(--lg-border-subtle)] overflow-visible">
                <LG.MobileFloatingActionButton variant="chrome" actions={fabActions} className="!relative !bottom-auto !right-auto" />
                <LG.MobileFloatingActionButton variant="colored" actions={fabActions} className="!relative !bottom-auto !right-auto" />
                <LG.MobileFloatingActionButton variant="ghost" actions={fabActions} className="!relative !bottom-auto !right-auto" />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section>
            <LG.LiquidGlassCard variant="thick" padding="lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "51+", label: "Components", icon: <LayoutGrid size={20} /> },
                  { value: "17", label: "Mobile Only", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg> },
                  { value: "2", label: "Themes", icon: <Palette size={20} /> },
                  { value: "∞", label: "Variants", icon: <Zap size={20} /> },
                ].map(s => (
                  <div key={s.label} className="space-y-2">
                    <div className="flex justify-center text-[var(--lg-text-muted)]">{s.icon}</div>
                    <div className="text-3xl font-bold text-[var(--lg-text)]">{s.value}</div>
                    <div className="text-xs text-[var(--lg-text-muted)] uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </LG.LiquidGlassCard>
          </section>
        </main>

        <footer className="border-t border-[var(--lg-border)] py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2"><div className="h-6 w-6 rounded-lg bg-gradient-to-br from-liquid-blue to-liquid-purple flex items-center justify-center"><Sparkles size={12} className="text-white" /></div><span className="text-sm text-[var(--lg-text-muted)]">Liquid Glass UI</span></div>
            <p className="text-xs text-[var(--lg-text-muted)]">Inspired by iOS 26 Liquid Glass design language</p>
          </div>
        </footer>
      </div>

      {/* Overlays */}
      <LG.LiquidGlassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Glass Modal" size="md">
        <div className="space-y-4">
          <p className="text-sm text-[var(--lg-text-secondary)] leading-relaxed">This modal demonstrates the Liquid Glass overlay effect with backdrop blur and theme-aware glass materials.</p>
          <div className="flex gap-3 pt-2">
            <LG.LiquidGlassButton onClick={() => setModalOpen(false)} fullWidth>Confirm</LG.LiquidGlassButton>
            <LG.LiquidGlassButton variant="ghost" onClick={() => setModalOpen(false)} fullWidth>Cancel</LG.LiquidGlassButton>
          </div>
        </div>
      </LG.LiquidGlassModal>
      <LG.LiquidGlassDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings" position="right">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><span className="text-sm text-[var(--lg-text)]">Dark mode</span><LG.LiquidGlassToggle checked={drawerDarkMode} onChange={setDrawerDarkMode} variant="ios26" /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-[var(--lg-text)]">Reduce motion</span><LG.LiquidGlassToggle checked={drawerReduceMotion} onChange={setDrawerReduceMotion} variant="ios26" /></div>
        </div>
      </LG.LiquidGlassDrawer>
      <LG.LiquidGlassSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Actions" variant={sheetVariant}>
        <div className="space-y-2">
          {[{ icon: <Share2 size={18} />, label: "Share" }, { icon: <Bookmark size={18} />, label: "Save" }, { icon: <Copy size={18} />, label: "Copy" }, { icon: <ExternalLink size={18} />, label: "Open" }].map((a, i) => (
            <motion.button key={i} whileTap={{ scale: 0.98 }} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-[var(--lg-border)] text-[var(--lg-text)]"><span className="text-[var(--lg-text-muted)]">{a.icon}</span><span className="text-sm font-medium">{a.label}</span></motion.button>
          ))}
        </div>
      </LG.LiquidGlassSheet>
    </div>
  );
}
