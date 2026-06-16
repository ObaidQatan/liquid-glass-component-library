import { cn } from "../../utils/cn";
import { useGlassSurface } from "./useGlassSurface";

interface GlassSheenProps {
  className?: string;
  opacity?: number;
}

export function GlassSheen({ className, opacity = 0.12 }: GlassSheenProps) {
  const { style, className: baseClass } = useGlassSurface({ variant: "sheen", opacity });
  return <div className={cn(baseClass, className)} style={style} />;
}
