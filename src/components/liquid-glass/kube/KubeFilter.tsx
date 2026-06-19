import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { generateDisplacementTexture } from "./displacementTexture";
import { generateSpecularTexture } from "./specularTexture";
import type { KubeProfile } from "./profiles";

export interface KubeFilterProps {
  id: string;
  width: number;
  height: number;
  bezel: number;
  profile: KubeProfile;
  thickness: number;
  refractionScale: number;
  lightAngle: number;
  shininess: number;
  borderRadius?: number;
  specularOpacity: number;
  blur?: number;
  /**
   * Optional id for a second, cheaper filter used by small/medium glass
   * elements. When provided, two filters are rendered: the full-quality
   * filter at `id` and a lite variant at `liteId`.
   */
  liteId?: string;
  /**
   * When true, the filter is authored in objectBoundingBox units so a single
   * filter can scale to elements of any size. Width/height are ignored and a
   * fixed-resolution unit-square texture is generated; bezel and borderRadius
   * are interpreted as fractions of the element's smaller dimension.
   */
  normalized?: boolean;
}

export type KubeFilterBaseProps = Omit<
  KubeFilterProps,
  "id" | "width" | "height" | "liteId" | "normalized"
>;

interface LiquidGlassSettingsLike {
  profile?: KubeProfile;
  bezel?: number;
  refraction?: number;
  thickness?: number;
  lightAngle?: number;
  specularOpacity?: number;
  blur?: number;
}

/**
 * Convert user-facing liquid-glass settings into the derived KubeFilter props.
 * Shared by ThemeProvider (global filter) and useCustomKubeFilter (per-component
 * overrides).
 */
export function kubePropsFromLiquidGlass(
  settings: Partial<LiquidGlassSettingsLike>
): KubeFilterBaseProps {
  const profile = settings.profile ?? "convex-circle";
  const bezel = settings.bezel ?? 55;
  const refraction = settings.refraction ?? 90;
  const thickness = settings.thickness ?? 90;

  return {
    profile,
    bezel: bezel / 400,
    thickness: thickness / 100,
    refractionScale:
      (refraction / 100) * 0.15 * (thickness / 90),
    lightAngle: settings.lightAngle ?? -150,
    shininess: 6,
    specularOpacity: (settings.specularOpacity ?? 50) / 100,
    borderRadius: 0.03,
    blur: ((settings.blur ?? 25) / 100) * (30 / 400),
  };
}

export const LIQUID_GLASS_FILTER_ID = "lg-liquid-glass-filter";
export const LIQUID_GLASS_FILTER_LITE_ID = "lg-liquid-glass-filter-lite";

const NORMALIZED_TEXTURE_SIZE = 256;

const GENERATION_DEBOUNCE_MS = 100;

/**
 * Generate a filter texture immediately on first mount (so the SVG filter is
 * ready before paint), then debounce + schedule in requestAnimationFrame for
 * subsequent dependency changes (e.g. dragging sliders).
 */
function useFilterTextureEffect(
  generate: () => (() => void) | void,
  deps: React.DependencyList
) {
  const first = useRef(true);

  // First render: run synchronously in the layout phase so the filter is
  // already in the DOM on the first paint. This avoids the ~100-300 ms
  // visible delay where glass overlays open before the texture is ready.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subsequent changes: debounce to avoid regenerating on every slider tick.
  useEffect(() => {
    if (first.current) return;
    let mounted = true;
    let raf = 0;
    let cleanup: (() => void) | void;

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(() => {
        if (mounted) {
          cleanup = generate();
        }
      });
    }, GENERATION_DEBOUNCE_MS);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function KubeFilter({
  id,
  width,
  height,
  bezel,
  profile,
  thickness,
  refractionScale,
  lightAngle,
  shininess,
  borderRadius,
  specularOpacity,
  blur = 0,
  liteId,
  normalized = false,
}: KubeFilterProps) {
  const [displacementUrl, setDisplacementUrl] = useState<string | null>(null);
  const [specularUrl, setSpecularUrl] = useState<string | null>(null);
  const [specularLiteUrl, setSpecularLiteUrl] = useState<string | null>(null);

  const texWidth = normalized ? NORMALIZED_TEXTURE_SIZE : width;
  const texHeight = normalized ? NORMALIZED_TEXTURE_SIZE : height;
  const texBezel = normalized
    ? Math.max(1, bezel * NORMALIZED_TEXTURE_SIZE)
    : bezel;
  // Keep the displacement/specular corner radius at least as large as the
  // bezel. If the bezel reaches past the rounded corner into the flat interior,
  // the texture samples the flat-SDF region with bad normals and produces
  // sharp triangular artifacts.
  const effectiveBorderRadius = Math.max(borderRadius ?? 0.15, bezel);
  const texBorderRadius = normalized
    ? Math.max(0, effectiveBorderRadius * NORMALIZED_TEXTURE_SIZE)
    : effectiveBorderRadius;

  // Displacement only depends on geometry and physics profile.
  useFilterTextureEffect(() => {
    const displacement = generateDisplacementTexture({
      width: texWidth,
      height: texHeight,
      bezel: texBezel,
      profile,
      thickness,
      borderRadius: texBorderRadius,
    });

    setDisplacementUrl(displacement?.url ?? null);
  }, [texWidth, texHeight, texBezel, profile, thickness, texBorderRadius]);

  // Specular depends on lighting; the lite variant bakes in specularOpacity
  // so it can drop the feComponentTransfer primitive.
  useFilterTextureEffect(() => {
    const full = generateSpecularTexture({
      width: texWidth,
      height: texHeight,
      bezel: texBezel,
      profile,
      lightAngle,
      shininess,
      borderRadius: texBorderRadius,
      opacity: 1,
    });

    const lite = liteId
      ? generateSpecularTexture({
          width: texWidth,
          height: texHeight,
          bezel: texBezel,
          profile,
          lightAngle,
          shininess,
          borderRadius: texBorderRadius,
          opacity: specularOpacity,
        })
      : null;

    setSpecularUrl(full);
    setSpecularLiteUrl(lite);
  }, [
    texWidth,
    texHeight,
    texBezel,
    profile,
    lightAngle,
    shininess,
    texBorderRadius,
    specularOpacity,
    liteId,
  ]);

  if (!displacementUrl || !specularUrl) return null;

  const filterAttrs = normalized
    ? {
        filterUnits: "objectBoundingBox",
        primitiveUnits: "objectBoundingBox",
        x: "0",
        y: "0",
        width: "1",
        height: "1",
      }
    : {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
      };

  const imageAttrs = normalized
    ? { x: "0", y: "0", width: "1", height: "1" }
    : { x: "0", y: "0", width, height };

  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" {...filterAttrs}>
          <feImage
            href={displacementUrl}
            {...imageAttrs}
            preserveAspectRatio="none"
            result="displacementMap"
          />
          <feImage
            href={specularUrl}
            {...imageAttrs}
            preserveAspectRatio="none"
            result="specularMap"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blurred"
          />
          <feDisplacementMap
            in="blurred"
            in2="displacementMap"
            scale={refractionScale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />
          <feComponentTransfer in="specularMap" result="specularAlpha">
            <feFuncA type="linear" slope={specularOpacity} />
          </feComponentTransfer>
          <feBlend
            in="specularAlpha"
            in2="refracted"
            mode="screen"
          />
        </filter>

        {liteId && specularLiteUrl && (
          <filter
            id={liteId}
            colorInterpolationFilters="sRGB"
            {...filterAttrs}
          >
            <feImage
              href={displacementUrl}
              {...imageAttrs}
              preserveAspectRatio="none"
              result="displacementMap"
            />
            <feImage
              href={specularLiteUrl}
              {...imageAttrs}
              preserveAspectRatio="none"
              result="specularMap"
            />
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blur}
              result="blurred"
            />
            <feDisplacementMap
              in="blurred"
              in2="displacementMap"
              scale={refractionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="refracted"
            />
            <feBlend
              in="specularMap"
              in2="refracted"
              mode="screen"
            />
          </filter>
        )}
      </defs>
    </svg>
  );
}

let backdropFilterSupportChecked = false;
let backdropFilterSupportResult = false;

/**
 * True when the browser supports SVG filters applied via `backdrop-filter`,
 * which is the technique described by kube.io. Currently this is Chrome-only.
 */
export function supportsKubeBackdropFilter(): boolean {
  if (backdropFilterSupportChecked) return backdropFilterSupportResult;
  if (typeof CSS === "undefined" || !CSS.supports) {
    backdropFilterSupportChecked = true;
    backdropFilterSupportResult = false;
    return false;
  }
  backdropFilterSupportResult = CSS.supports(
    "backdrop-filter",
    "url(#kube-support-test)"
  );
  backdropFilterSupportChecked = true;
  return backdropFilterSupportResult;
}

export function useKubeFilterId(): string {
  return useId().replace(/:/g, "-");
}
