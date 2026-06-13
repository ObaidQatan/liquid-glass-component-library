import { cn } from "../../utils/cn";

interface LiquidGlassSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export function LiquidGlassSkeleton({
  className,
  variant = "text",
  width,
  height,
  lines = 1,
  animate = true,
}: LiquidGlassSkeletonProps) {
  const baseClasses = cn(
    "bg-white/5",
    animate && "animate-pulse",
    variant === "circular" && "rounded-full",
    variant === "rectangular" && "rounded-none",
    variant === "rounded" && "rounded-xl",
    variant === "text" && "rounded-md",
    className
  );

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  if (lines > 1 && variant === "text") {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, i === lines - 1 && "w-3/4")}
            style={{
              ...style,
              width: i === lines - 1 ? "75%" : width,
              height: height || 12,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, "relative overflow-hidden")}
      style={{
        ...style,
        height: height || (variant === "text" ? 12 : undefined),
        width: width || (variant === "text" ? "100%" : undefined),
      }}
    >
      {animate && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s linear infinite",
          }}
        />
      )}
    </div>
  );
}
