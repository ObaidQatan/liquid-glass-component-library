export type KubeProfile = "convex-circle" | "convex-squircle" | "concave" | "lip";

function smootherstep(x: number): number {
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function convexCircle(x: number): number {
  return Math.sqrt(1 - Math.pow(1 - x, 2));
}

function convexSquircle(x: number): number {
  return Math.pow(1 - Math.pow(1 - x, 4), 1 / 4);
}

function concave(x: number): number {
  return 1 - convexCircle(x);
}

function lip(x: number): number {
  const s = smootherstep(x);
  return (1 - s) * convexCircle(x) + s * concave(x);
}

export const profiles: Record<KubeProfile, (x: number) => number> = {
  "convex-circle": convexCircle,
  "convex-squircle": convexSquircle,
  "concave": concave,
  "lip": lip,
};

export const profileLabels: Record<KubeProfile, string> = {
  "convex-circle": "Convex Circle",
  "convex-squircle": "Convex Squircle",
  "concave": "Concave",
  "lip": "Lip",
};
