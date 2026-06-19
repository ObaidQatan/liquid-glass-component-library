import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useTheme } from "./ThemeProvider";
import { useGlassSurface } from "./useGlassSurface";
import { useGlassFluidity } from "./useGlassFluidity";
import { GlassTopHighlight } from "./GlassTopHighlight";
import { GlassSheen } from "./GlassSheen";

interface TabItem {
  id: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}

export type MobileBottomTabVariant =
  | "default"
  | "pill"
  | "floating"
  | "ios26-fluid"
  | "ios26-chrome"
  | "ios26-glow"
  | "ios26-dock"
  | "ios26-super-pill";

interface MobileBottomTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChange?: (id: string) => void;
  className?: string;
  showLabels?: boolean;
  hideActiveLabel?: boolean;
  variant?: MobileBottomTabVariant;
  centerTabButton?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  };
  trailingButton?: {
    icon: ReactNode;
    label?: string;
    onClick: () => void;
  };
}

export function MobileBottomTabBar({
  tabs,
  activeTab,
  onChange,
  className,
  showLabels = true,
  hideActiveLabel = false,
  variant = "default",
  centerTabButton,
  trailingButton,
}: MobileBottomTabBarProps) {
  const [ripples, setRipples] = useState<Record<string, { id: number; x: number; y: number }[]>>({});
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const fluidity = useGlassFluidity();

  const createRipple = useCallback((tabId: string, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => ({
      ...prev,
      [tabId]: [...(prev[tabId] || []), { id, x, y }],
    }));
    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [tabId]: (prev[tabId] || []).filter((r) => r.id !== id),
      }));
    }, 900);
  }, []);

  const measureIndicator = useCallback(() => {
    const container = tabsContainerRef.current;
    const activeButton = tabRefs.current[activeTab] || Object.values(tabRefs.current)[0];
    if (!container || !activeButton) return;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    setIndicator({
      left: buttonRect.left - containerRect.left,
      top: buttonRect.top - containerRect.top,
      width: buttonRect.width,
      height: buttonRect.height,
    });
  }, [activeTab, variant]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  const containerClasses: Record<MobileBottomTabVariant, string> = {
    default:
      "fixed bottom-0 left-0 right-0 z-40 px-2 pb-2 pt-1 glass-blur-xl glass-surface-dark glass-border-t border-t-white/10",
    pill:
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2rem] shadow-2xl",
    floating:
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 glass-blur-xl glass-surface glass-border rounded-[2rem] shadow-2xl shadow-black/20",
    "ios26-fluid":
      "fixed bottom-2 left-2 right-2 z-40 px-3 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-2xl",
    "ios26-chrome":
      "fixed bottom-0 left-0 right-0 z-40 px-2 pb-3 pt-2 glass-blur-xl glass-surface-chrome glass-border-t border-t-white/10 rounded-t-[2rem]",
    "ios26-glow":
      "fixed bottom-3 left-3 right-3 z-40 px-3 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    "ios26-dock":
      "fixed bottom-3 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2rem] shadow-2xl shadow-black/20",
    "ios26-super-pill":
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-2xl shadow-black/20",
  };

  const isPillLike =
    variant === "pill" ||
    variant === "floating" ||
    variant === "ios26-fluid" ||
    variant === "ios26-glow" ||
    variant === "ios26-dock" ||
    variant === "ios26-super-pill";

  const isSuperPill = variant === "ios26-super-pill";

  const widthClass =
    variant === "ios26-dock"
      ? "max-w-xs"
      : isSuperPill
        ? "max-w-md"
        : isPillLike
          ? "max-w-sm"
          : "max-w-lg";

  const renderTabs = (tabList: TabItem[]) =>
    tabList.map((tab) => (
      <TabButton
        key={tab.id}
        tab={tab}
        isActive={activeTab === tab.id}
        showLabel={showLabels}
        hideActiveLabel={hideActiveLabel}
        variant={variant}
        ripples={ripples[tab.id] || []}
        onRipple={(e) => createRipple(tab.id, e)}
        onClick={() => onChange?.(tab.id)}
        fluidity={fluidity}
        buttonRef={(el) => {
          tabRefs.current[tab.id] = el;
        }}
      />
    ));

  const trailingFill = useGlassSurface({ variant: "fill", opacity: 0.1 });
  const trailingGlow = useGlassSurface({ variant: "fill", opacity: 0.2 });

  const TrailingButton = trailingButton ? (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={trailingButton.onClick}
      className="relative flex flex-col items-center justify-center"
    >
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full overflow-hidden glass-blur-xl glass-surface-strong glass-border"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div className="absolute inset-0" style={{ background: trailingFill.style.background }} />
        <GlassTopHighlight className="inset-x-2 top-0.5" opacity={0.45} />
        <div className="pointer-events-none absolute -top-3 -right-3 h-8 w-8 rounded-full blur-lg" style={{ background: trailingGlow.style.background }} />
        <span className="relative z-10 text-[var(--lg-text)]">{trailingButton.icon}</span>
      </div>
      {showLabels && trailingButton.label && (
        <span className="text-[10px] font-medium text-[var(--lg-text-muted)] mt-1">{trailingButton.label}</span>
      )}
    </motion.button>
  ) : null;

  if (centerTabButton) {
    const midIndex = Math.floor(tabs.length / 2);
    const leftTabs = tabs.slice(0, midIndex);
    const rightTabs = tabs.slice(midIndex);

    return (
      <div className={cn(containerClasses[variant], className)}>
        <TopHighlight variant={variant} />
        <div ref={tabsContainerRef} className={cn("relative flex items-center justify-around", widthClass, "mx-auto")}>
          <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />
          {renderTabs(leftTabs)}

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={centerTabButton.onClick}
            className="flex flex-col items-center -mt-5 relative"
          >
            <CenterTabButton icon={centerTabButton.icon} />
            {showLabels && (
              <span className="text-[10px] font-medium text-liquid-blue mt-1">{centerTabButton.label}</span>
            )}
          </motion.button>

          {renderTabs(rightTabs)}
        </div>
      </div>
    );
  }

  // Super-pill: main bar and trailing button are two separate glass pieces
  if (isSuperPill && TrailingButton) {
    return (
      <div className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-40", className)}>
        <div className="flex items-center gap-3">
          <div
            className="relative px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem]"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <TopHighlight variant={variant} />
            <div ref={tabsContainerRef} className={cn("relative flex items-center justify-around", widthClass)}>
              <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />
              {renderTabs(tabs)}
            </div>
          </div>
          {TrailingButton}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(containerClasses[variant], className)}>
      <TopHighlight variant={variant} />
      <div ref={tabsContainerRef} className={cn("relative flex items-center justify-around", widthClass, "mx-auto")}>
        <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />
        {renderTabs(tabs)}
      </div>
    </div>
  );
}

function TopHighlight({ variant }: { variant: MobileBottomTabVariant }) {
  if (
    variant === "pill" ||
    variant === "floating" ||
    variant === "ios26-fluid" ||
    variant === "ios26-glow" ||
    variant === "ios26-dock" ||
    variant === "ios26-super-pill"
  ) {
    return <GlassTopHighlight className="inset-x-4 top-0" opacity={0.4} />;
  }
  return <GlassTopHighlight className="inset-x-0 top-0" opacity={0.2} />;
}

function ActiveIndicator({
  layout,
  variant,
  fluidity,
}: {
  layout: { left: number; top: number; width: number; height: number };
  variant: MobileBottomTabVariant;
  fluidity: number;
}) {
  const thumbSurface = useGlassSurface({ variant: "thumb" });
  const hasBackground =
    variant === "pill" ||
    variant === "ios26-fluid" ||
    variant === "ios26-glow" ||
    variant === "ios26-dock" ||
    variant === "ios26-super-pill";

  const isSuperPill = variant === "ios26-super-pill";
  const radius = isSuperPill ? "1.6rem" : "1rem";

  if (hasBackground) {
    return (
      <motion.div
        layoutId="mobile-tab-bg"
        initial={false}
        animate={{
          left: layout.left,
          top: layout.top,
          width: layout.width,
          height: layout.height,
        }}
        transition={{ type: "spring", stiffness: 300 + fluidity * 3, damping: 30 }}
        className="absolute z-0 pointer-events-none glass-blur-lg overflow-hidden"
        style={{
          borderRadius: radius,
          ...thumbSurface.style,
        }}
      >
        <div
          className="absolute inset-0 glass-reflection mix-blend-soft-light pointer-events-none"
          style={{ borderRadius: radius }}
        />
        <GlassSheen opacity={0.18} />
        <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-[var(--lg-border)] rounded-full" />
      </motion.div>
    );
  }

  // default / floating / ios26-chrome: a glowing top-line indicator
  return (
    <motion.div
      layoutId="mobile-tab-line"
      initial={false}
      animate={{
        left: layout.left + 8,
        top: layout.top + 4,
        width: Math.max(20, layout.width - 16),
        height: 6,
      }}
      transition={{ type: "spring", stiffness: 300 + fluidity * 3, damping: 30 }}
      className="absolute z-0 pointer-events-none glass-blur-lg overflow-hidden rounded-full"
      style={thumbSurface.style}
    >
      <div className="absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none" />
      <GlassSheen opacity={0.18} />
    </motion.div>
  );
}

function CenterTabButton({ icon }: { icon: ReactNode }) {
  const centerFill = useGlassSurface({ variant: "fill", opacity: 0.1 });
  const centerGlow = useGlassSurface({ variant: "fill", opacity: 0.2 });

  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden glass-blur-lg glass-surface-strong glass-border glass-highlight-strong">
      {/* Fluid chrome gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-liquid-blue/40 via-liquid-purple/30 to-liquid-pink/20" />
      <div className="absolute inset-0" style={{ background: centerFill.style.background }} />
      {/* Inner reflection */}
      <GlassTopHighlight className="inset-x-2 top-0.5" opacity={0.4} />
      <div className="pointer-events-none absolute -top-4 -right-4 h-10 w-10 rounded-full blur-lg" style={{ background: centerGlow.style.background }} />
      <span className="relative z-10 text-white">{icon}</span>
    </div>
  );
}

function TabButton({
  tab,
  isActive,
  showLabel,
  hideActiveLabel,
  variant,
  ripples,
  onRipple,
  onClick,
  fluidity,
  buttonRef,
}: {
  tab: TabItem;
  isActive: boolean;
  showLabel: boolean;
  hideActiveLabel: boolean;
  variant: MobileBottomTabVariant;
  ripples: { id: number; x: number; y: number }[];
  onRipple: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick?: () => void;
  fluidity: number;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  const isFluid = variant === "ios26-fluid" || variant === "ios26-glow" || variant === "ios26-dock";
  const isPill = variant === "pill" || variant === "ios26-dock";
  const isSuperPill = variant === "ios26-super-pill";
  const { isDark } = useTheme();

  return (
    <motion.button
      ref={buttonRef}
      whileTap={{ scale: isFluid || isSuperPill ? 0.92 : 0.85 }}
      onClick={(e) => {
        onRipple(e);
        tab.onClick?.();
        onClick?.();
      }}
      className={cn(
        "relative flex flex-col items-center gap-0.5 overflow-hidden",
        isPill && "rounded-xl py-1.5 px-3",
        isFluid && "rounded-2xl py-1.5 px-4",
        isSuperPill && "rounded-[1.6rem] py-2 px-5",
        !isPill && !isFluid && !isSuperPill && "rounded-xl px-5 py-2"
      )}
    >
      <div className="relative z-10">
        <motion.div
          animate={{
            scale: isActive ? 1.12 : 1,
            y: isActive ? -1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300 + fluidity * 3, damping: 25 }}
          className={cn(
            "transition-colors duration-200",
            isActive
              ? isFluid || isSuperPill
                ? "text-[var(--lg-text)] drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                : "text-liquid-blue"
              : isDark
                ? "text-[var(--lg-text-muted)]"
                : "text-black/40"
          )}
        >
          {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
        </motion.div>
      </div>

      {showLabel && !hideActiveLabel && (
        <motion.span
          animate={{
            opacity: isActive ? 1 : 0.6,
            y: isActive ? 0 : 1,
          }}
          className={cn(
            "text-[10px] font-medium transition-colors duration-200 relative z-10",
            isActive
              ? isFluid || isSuperPill
                ? "text-[var(--lg-text)]"
                : "text-liquid-blue"
              : isDark
                ? "text-[var(--lg-text-muted)]"
                : "text-black/40"
          )}
        >
          {tab.label}
        </motion.span>
      )}

      {/* Fluid press ripple */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{
              scale: 0,
              opacity: 0.5,
              borderRadius: "45% 55% 50% 50% / 55% 45% 50% 50%",
            }}
            animate={{
              scale: 2.2,
              opacity: 0,
              borderRadius: "50%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute pointer-events-none z-0"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
