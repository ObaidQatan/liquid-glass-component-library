import type { KubeProfile } from "./profiles";
import { profiles } from "./profiles";

export interface DisplacementSample {
  distance: number;
  displacement: number;
}

/**
 * Compute the lateral displacement of a background pixel as seen through a
 * curved glass surface.
 *
 * Model (matches kube.io article and Apple Liquid Glass visuals):
 * - Light originates at the background plane and travels upward through the glass.
 * - It refracts once at the top surface of the glass (glass -> air).
 * - The viewer looks down from above.
 * - Convex profiles bend the apparent background INWARD; concave profiles
 *   bend it OUTWARD.
 *
 * Assumptions:
 * - Ambient medium index = 1 (air).
 * - Glass index = `indexOfRefraction` (default 1.5).
 * - Incident ray inside the glass is orthogonal to the background plane (upward).
 * - Only one refraction event is considered.
 */
export function displacementAt(
  profile: KubeProfile,
  distance: number,
  thickness: number,
  indexOfRefraction = 1.5
): number {
  const f = profiles[profile];
  const delta = 0.001;

  // Clamp distance to the valid [0, 1] bezel region.
  const t = Math.max(0, Math.min(1, distance));

  // Relative height of the glass surface at this point (0..1).
  const height = f(t);

  // Derivative of the height function approximated numerically.
  const derivative =
    (f(Math.min(1, t + delta)) - f(Math.max(0, t - delta))) / (2 * delta);

  // Incident ray inside the glass, traveling upward toward the top surface.
  const incident = { x: 0, y: 1 };

  // Surface normal pointing OUT of the glass (into air).
  // For a surface y = f(x), the upward/outward normal is (-f'(x), 1).
  const nx = -derivative;
  const ny = 1;
  const normalLen = Math.sqrt(nx * nx + ny * ny) || 1;
  const normal = { x: nx / normalLen, y: ny / normalLen };

  // Angle of incidence: angle between incident ray and normal.
  const cosTheta1 = incident.x * normal.x + incident.y * normal.y;
  const sinTheta1 = Math.sqrt(Math.max(0, 1 - cosTheta1 * cosTheta1));

  // Snell's law: glass (n1) -> air (n2). Ray bends AWAY from the normal.
  const n1 = indexOfRefraction;
  const n2 = 1;
  const sinTheta2 = (n1 / n2) * sinTheta1;
  // Clamp to handle grazing angles / total internal reflection in this simplified model.
  const sinTheta2Clamped = Math.max(-1, Math.min(1, sinTheta2));
  const cosTheta2 = Math.sqrt(Math.max(0, 1 - sinTheta2Clamped * sinTheta2Clamped));

  // Vector form of Snell's law.
  const ratio = n1 / n2;
  const r = ratio * cosTheta1 - cosTheta2;
  const refracted = {
    x: ratio * incident.x + r * normal.x,
    y: ratio * incident.y + r * normal.y,
  };

  // The refracted ray travels upward to the viewer. Trace it backward to the
  // background plane a distance `height * thickness` below the surface.
  // Background displacement = surface x - background x.
  if (refracted.y <= 0) return 0;
  return -(refracted.x * height * thickness) / refracted.y;
}

/**
 * Pre-compute displacement magnitudes for a range of distances from the border.
 */
export function computeDisplacementSamples(
  profile: KubeProfile,
  sampleCount: number,
  thickness: number,
  indexOfRefraction = 1.5
): DisplacementSample[] {
  const samples: DisplacementSample[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const distance = i / (sampleCount - 1);
    samples.push({
      distance,
      displacement: displacementAt(profile, distance, thickness, indexOfRefraction),
    });
  }
  return samples;
}

export interface DisplacementField {
  samples: DisplacementSample[];
  maxDisplacement: number;
}

export function computeDisplacementField(
  profile: KubeProfile,
  sampleCount: number,
  thickness: number,
  indexOfRefraction = 1.5
): DisplacementField {
  const samples = computeDisplacementSamples(profile, sampleCount, thickness, indexOfRefraction);
  const maxDisplacement = Math.max(
    1e-6,
    ...samples.map((s) => Math.abs(s.displacement))
  );
  return { samples, maxDisplacement };
}
