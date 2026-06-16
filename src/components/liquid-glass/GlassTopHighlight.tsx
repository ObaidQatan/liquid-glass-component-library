import { cn } from "../../utils/cn";
import { useGlassSurface } from "./useGlassSurface";

interface GlassTopHighlightProps {
  className?: string;
  opacity?: number;
}

export function GlassTopHighlight({ className, opacity = 0.2 }: GlassTopHighlightProps) {
  const { style, className: baseClass } = useGlassSurface({ variant: "highlight", opacity });
  return <div className={cn(baseClass, className)} style={style} />;
}
