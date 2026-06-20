import type { KubeProfile } from "./profiles";
import { computeDisplacementField } from "./displacementMath";
import { roundedRectangleSdf } from "./sdf";

export interface KubeTextureOptions {
  width: number;
  height: number;
  bezel: number;
  profile: KubeProfile;
  thickness: number;
  samples?: number;
  borderRadius?: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleDisplacement(samples: { distance: number; displacement: number }[], t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  const idx = clamped * (samples.length - 1);
  const i0 = Math.floor(idx);
  const i1 = Math.min(samples.length - 1, i0 + 1);
  const frac = idx - i0;
  return lerp(samples[i0].displacement, samples[i1].displacement, frac);
}

/**
 * Generate a displacement map as a data URL.
 * Red channel = X displacement, Green channel = Y displacement.
 * 128 is neutral (no displacement), range is 0..255 mapping to -1..1.
 */
export function generateDisplacementTexture(
  options: KubeTextureOptions
): { url: string; maxDisplacement: number } | null {
  const {
    width,
    height,
    bezel,
    profile,
    thickness,
    samples = 128,
    borderRadius = 24,
  } = options;

  if (width <= 0 || height <= 0 || bezel <= 0) return null;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width));
  canvas.height = Math.max(1, Math.floor(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  const { samples: dispSamples, maxDisplacement } = computeDisplacementField(
    profile,
    samples,
    thickness
  );

  // Effective bezel in pixels.
  const bezelPx = Math.max(1, bezel);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;

      const sdf = roundedRectangleSdf(x, y, canvas.width, canvas.height, borderRadius);

      if (sdf.distance >= 0) {
        // Outside the shape: neutral.
        data[idx] = 128;
        data[idx + 1] = 128;
        data[idx + 2] = 128;
        data[idx + 3] = 255;
        continue;
      }

      // Distance from the border, normalized to [0, 1] across the bezel.
      const distanceFromBorder = Math.max(0, Math.min(1, -sdf.distance / bezelPx));

      // Displacement magnitude from the pre-computed physics.
      const magnitude = sampleDisplacement(dispSamples, distanceFromBorder);

      // Normalize magnitude to [-1, 1] using the maximum displacement.
      const normalized = maxDisplacement > 0 ? magnitude / maxDisplacement : 0;

      // Direction is inward (opposite to the outward normal).
      const dirX = -sdf.nx;
      const dirY = -sdf.ny;

      const dx = dirX * normalized;
      const dy = dirY * normalized;

      // Map to RGBA.
      data[idx] = Math.round(128 + dx * 127);
      data[idx + 1] = Math.round(128 + dy * 127);
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return { url: canvas.toDataURL("image/png"), maxDisplacement };
}
