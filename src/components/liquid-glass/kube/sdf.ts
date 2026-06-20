export interface RoundedRectangleSdf {
  /** Signed distance: negative inside the rounded rectangle, positive outside. */
  distance: number;
  /** Outward-pointing normal (gradient of the SDF). */
  nx: number;
  ny: number;
}

/**
 * Signed-distance field and outward normal for an axis-aligned rounded
 * rectangle centered in a width×height box.
 *
 * The returned normal is the analytical gradient of the distance field. In the
 * flat interior (where the SDF is constant -r) it falls back to the direction
 * toward the nearest corner arc so displacement/specular falloff stays radial
 * instead of snapping to axis-aligned edges.
 */
export function roundedRectangleSdf(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): RoundedRectangleSdf {
  // Work in the first quadrant relative to the center.
  const cx = width / 2;
  const cy = height / 2;
  const dx = Math.abs(x - cx);
  const dy = Math.abs(y - cy);

  const halfW = width / 2;
  const halfH = height / 2;
  const r = Math.min(radius, halfW, halfH);

  const cornerX = halfW - r;
  const cornerY = halfH - r;

  const distX = Math.max(0, dx - cornerX);
  const distY = Math.max(0, dy - cornerY);
  const cornerDist = Math.sqrt(distX * distX + distY * distY);

  const distance = cornerDist - r;

  let nx = 0;
  let ny = 0;

  if (dx > cornerX && dy > cornerY) {
    // True corner region: normal points from the corner center to the point.
    const len = cornerDist || 1;
    nx = distX / len;
    ny = distY / len;
  } else if (dx > cornerX) {
    // Close to a vertical edge.
    nx = 1;
    ny = 0;
  } else if (dy > cornerY) {
    // Close to a horizontal edge.
    nx = 0;
    ny = 1;
  } else {
    // Inside the corner square. The SDF is flat here (-r), so pick the
    // direction toward the nearest corner arc for smooth falloff.
    const vx = dx - cornerX;
    const vy = dy - cornerY;
    const len = Math.sqrt(vx * vx + vy * vy) || 1;
    nx = vx / len;
    ny = vy / len;
  }

  // Restore quadrant signs.
  nx *= x < cx ? -1 : 1;
  ny *= y < cy ? -1 : 1;

  return { distance, nx, ny };
}
