import { useEffect, useId, useState } from "react";
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
   * When true, the filter is authored in objectBoundingBox units so a single
   * filter can scale to elements of any size. Width/height are ignored and a
   * fixed-resolution unit-square texture is generated; bezel and borderRadius
   * are interpreted as fractions of the element's smaller dimension.
   */
  normalized?: boolean;
}

export const LIQUID_GLASS_FILTER_ID = "lg-liquid-glass-filter";

const NORMALIZED_TEXTURE_SIZE = 512;

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
  normalized = false,
}: KubeFilterProps) {
  const [displacementUrl, setDisplacementUrl] = useState<string | null>(null);
  const [specularUrl, setSpecularUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const timeout = setTimeout(() => {
      const texWidth = normalized ? NORMALIZED_TEXTURE_SIZE : width;
      const texHeight = normalized ? NORMALIZED_TEXTURE_SIZE : height;
      const texBezel = normalized
        ? Math.max(1, bezel * NORMALIZED_TEXTURE_SIZE)
        : bezel;
      const texBorderRadius = normalized
        ? Math.max(0, (borderRadius ?? 0.15) * NORMALIZED_TEXTURE_SIZE)
        : borderRadius;

      const displacement = generateDisplacementTexture({
        width: texWidth,
        height: texHeight,
        bezel: texBezel,
        profile,
        thickness,
        borderRadius: texBorderRadius,
      });
      const specular = generateSpecularTexture({
        width: texWidth,
        height: texHeight,
        bezel: texBezel,
        profile,
        lightAngle,
        shininess,
        borderRadius: texBorderRadius,
      });

      if (mounted) {
        setDisplacementUrl(displacement?.url ?? null);
        setSpecularUrl(specular);
      }
    }, 16);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [
    width,
    height,
    bezel,
    profile,
    thickness,
    lightAngle,
    shininess,
    borderRadius,
    normalized,
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
