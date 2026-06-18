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
}: KubeFilterProps) {
  const [displacementUrl, setDisplacementUrl] = useState<string | null>(null);
  const [specularUrl, setSpecularUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const timeout = setTimeout(() => {
      const displacement = generateDisplacementTexture({
        width,
        height,
        bezel,
        profile,
        thickness,
        borderRadius,
      });
      const specular = generateSpecularTexture({
        width,
        height,
        bezel,
        profile,
        lightAngle,
        shininess,
        borderRadius,
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
  }, [width, height, bezel, profile, thickness, lightAngle, shininess, borderRadius]);

  if (!displacementUrl || !specularUrl) return null;

  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter
          id={id}
          colorInterpolationFilters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feImage
            href={displacementUrl}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="displacementMap"
          />
          <feImage
            href={specularUrl}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="specularMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
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
