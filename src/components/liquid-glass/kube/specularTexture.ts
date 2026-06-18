import type { KubeProfile } from "./profiles";
import { profiles } from "./profiles";
import { roundedRectangleSdf } from "./sdf";

export interface SpecularTextureOptions {
  width: number;
  height: number;
  bezel: number;
  profile: KubeProfile;
  lightAngle: number; // degrees from vertical
  shininess: number;
  borderRadius?: number;
  /**
   * Optional alpha multiplier baked into the texture. Used by the lite filter
   * so it can skip the feComponentTransfer primitive.
   */
  opacity?: number;
}

/**
 * Generate a specular highlight texture as a data URL.
 * The highlight is a rim light based on the angle between the surface normal
 * and a fixed light direction, matching the kube.io article.
 */
export function generateSpecularTexture(
  options: SpecularTextureOptions
): string | null {
  const {
    width,
    height,
    bezel,
    profile,
    lightAngle,
    shininess,
    borderRadius = 24,
    opacity = 1,
  } = options;

  if (width <= 0 || height <= 0 || bezel <= 0) return null;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width));
  canvas.height = Math.max(1, Math.floor(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  const f = profiles[profile];
  const delta = 0.001;
  const bezelPx = Math.max(1, bezel);

  // Light direction in surface space.
  const lightRad = (lightAngle * Math.PI) / 180;
  const lightX = Math.sin(lightRad);
  const lightY = Math.cos(lightRad);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;

      const sdf = roundedRectangleSdf(x, y, canvas.width, canvas.height, borderRadius);

      if (sdf.distance >= 0) {
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = 0;
        continue;
      }

      // Clamp to the bezel band so the highlight never bleeds into the flat
      // interior with invalid normals.
      const distanceFromBorder = Math.max(0, Math.min(1, -sdf.distance / bezelPx));

      // Surface normal from the profile derivative.
      const t = distanceFromBorder;
      const derivative =
        (f(Math.min(1, t + delta)) - f(Math.max(0, t - delta))) / (2 * delta);
      const surfaceNormalAngle = Math.atan2(1, -derivative);

      // Combine the geometric normal (direction from border) with the surface slope.
      const geoNx = -sdf.nx;
      const geoNy = -sdf.ny;

      const slopeNx = Math.cos(surfaceNormalAngle);
      const slopeNy = Math.sin(surfaceNormalAngle);

      // Blend slope into geometric normal so the highlight follows the curved bezel.
      const nx = geoNx * 0.7 + slopeNx * 0.3;
      const ny = geoNy * 0.7 + slopeNy * 0.3;
      const len = Math.sqrt(nx * nx + ny * ny) || 1;

      const dot = (nx / len) * lightX + (ny / len) * lightY;
      const intensity = Math.pow(Math.max(0, dot), shininess);

      // Falloff toward the flat interior.
      const edgeFalloff = 1 - Math.pow(distanceFromBorder, 0.5);
      const alpha = intensity * edgeFalloff;

      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.round(alpha * 255 * opacity);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}
